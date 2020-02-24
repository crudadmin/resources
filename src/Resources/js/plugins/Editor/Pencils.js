import Observer from './Observer';
import Editor from './Editor';

var Pencils = {
    className : 'CAEPencil',
    classNameSaved : 'CAEPencil--saved',
    classNameHidden : 'CAEPencil--hidden',

    init(){
        this.initHovers();
        this.initClicks();
        this.buildPencils();
        Observer.observeNewElements();
    },

    refresh(){
        this.buildPencils();
    },

    buildPencils(){
        //Add pencils
        for ( var i = 0; i < CAEditor.matchedElements.length; i++ ) {
            var element = CAEditor.matchedElements[i];

            //If element already has pencil, skip it.
            //Also pdate position of pencil, because element may be deleted.
            if ( element._CAPencil ) {
                this.bindPositions(element);
                continue;
            }

            element._CAPencil = this.createPencil(element, i);

            this.bindPositions(element);
        }
    },
    /*
     * Check hovers of all elements for creating and hidding pencils.
     * Because on hover elements some pencil may dissapear or may be visible...
     */
    initHovers(){
        var allElements = document.getElementsByTagName('*');

        var checkHoverChanges = (e) => {
            var hoveredParent = e.target,
                childs = hoveredParent.getElementsByTagName('*'),
                elementsToMove = [];

            //Add parent element if does have pencil
            if ( hoveredParent._CAPencil ) {
                elementsToMove.push(hoveredParent);
            }

            //Merge childs with parent
            for ( var i = 0; i < childs.length; i++ ) {
                //If child has pencil
                if ( childs[i]._CAPencil ) {
                    elementsToMove.push(childs[i]);
                }
            }

            //See for position changed of every element till position wont changes.
            for ( var i = 0; i < elementsToMove.length; i++ ) {
                ((element) => {
                    var prevPositionKey = null,
                        checkPosition = () => {
                            var position = element.getBoundingClientRect(),
                                positionKey = position.x+'-'+position.y;

                            if ( prevPositionKey != positionKey ) {
                                Pencils.bindPositions(element);

                                prevPositionKey = positionKey;

                                setTimeout(checkPosition, 50);
                            }
                        }

                    checkPosition();
                })(elementsToMove[i]);
            }
        };

        for ( var i = 0; i < allElements.length; i++ ) {
            allElements[i].addEventListener('mouseenter', checkHoverChanges);
            allElements[i].addEventListener('mouseleave', checkHoverChanges);
        }
    },
    placeCaretAtEnd(el) {
        el.focus();
        if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    },
    /*
     * We need have this super complicated clics handler, because pencils may not be visible in some ceses.
     * That's why pencils are user-select none. And not all the time are on the top of z-index.
     */
    initClicks(){
        document.body.addEventListener('click', (e) => {
            var clickX = e.pageX,
                clickY = e.pageY,
                allElements = document.getElementsByTagName('*'),
                list = [];

            for ( var i = 0; i < allElements.length; i++ ) {
                var rect = allElements[i].getBoundingClientRect(),
                    offset = {
                      top: rect.top + window.scrollY,
                      left: rect.left + window.scrollX
                    },
                    range = {
                        x : [ offset.left, offset.left + allElements[i].offsetWidth ],
                        y : [ offset.top, offset.top + allElements[i].offsetHeight ]
                    };

                if ( (clickX >= range.x[0] && clickX <= range.x[1]) && (clickY >= range.y[0] && clickY <= range.y[1]) ) {
                    list.push(allElements[i]);
                }
            }

            for ( var i = 0; i < list.length; i++ ) {
                if ( list[i].className.indexOf(Pencils.className) > -1 ) {
                    ((pencil) => {
                        var element = pencil._CAElement,
                            actualValue = CAEditor.nodeValue(element);

                        //We cant allow update duplicate translates. Because change may be updated on right source translate.
                        if ( CAEditor.duplicates.indexOf(actualValue) > -1 ) {
                            alert(CAEditor.texts.cannotUpdate);
                            return;
                        }

                        //Text node can be edited in DOM
                        // Pencils.openAlertModal(element, actualValue);
                        Editor.makeEditableNode(element, actualValue);
                    })(list[i]);

                    e.preventDefault();
                    break;
                }
            }

            return false;
        });
    },
    openAlertModal(element, actualValue){
        var newText = prompt(CAEditor.texts.update, actualValue);

        //On cancel
        if ( newText == null ) {
            return;
        }

        //We need update node, or innerHTML tag value
        if ( element.nodeName == '#text' ) {
            element.data = newText;
        } else {
            element.innerHTML = newText;
        }

        Pencils.repaintPencils();
        Pencils.updateTranslation(element);
    },
    updateSameTranslationElements(element){
        for ( var i = 0; i < CAEditor.matchedElements.length; i++ ) {
            if ( CAEditor.matchedElements[i]._CAOriginTranslate == element._CAOriginTranslate ) {
                if ( CAEditor.matchedElements[i] != element ) {
                    CAEditor.matchedElements[i].innerHTML = element.innerHTML;
                }
            }
        }
    },
    repaintPencils(){
        for ( var i = 0; i < CAEditor.matchedElements.length; i++ ) {
            Pencils.bindPositions(CAEditor.matchedElements[i]);
        }
    },
    createPencil(element, key){
        var e = document.createElement('div');
            e.setAttribute('data-key', key);
            e.setAttribute('data-translate', element._CAOriginTranslate);
            e.className = Pencils.className;
            e._CAElement = element;

        document.getElementsByTagName('body')[0].appendChild(e);

        return e;
    },
    bindPositions(element){
        var pencil = element._CAPencil;

        //If element does not have pencil
        if ( pencil === undefined ){
            return;
        }

        //textNode does not have getBoundingClientRect
        var position = element.getBoundingClientRect ? element.getBoundingClientRect() : null,
            positionX = position ? position.x : null,
            positionY = position ? position.y : null;

        //Get position of text node
        var textNode = element.nodeName == '#text' ? element : (
                element.childNodes.length == 1 ? element.firstChild : null //we want position with elements with one textNode
            ),
            rects;

        //If textnode is present
        if ( textNode ) {
            var range = document.createRange();
                range.selectNodeContents(textNode);
                rects = range.getClientRects();
        }

        //Get real position of textNode
        if (rects && rects.length > 0) {
            positionX = rects[0].x + rects[0].width;
            positionY = rects[0].y;
        }

        //Try guess position
        else if ( position ) {
            var styles = getComputedStyle(element),
                textAlign = styles['text-align'],
                paddingLeft = parseFloat(styles['padding-left'].replace('px', '')),
                paddingRight = parseFloat(styles['padding-right'].replace('px', '')),
                paddingTop = parseFloat(styles['padding-top'].replace('px', ''));

            //Add paddings offset
            positionX += paddingLeft;
            positionY += paddingTop;

            //Icons are aligned on the left, so we need move pencil to the edge
            positionX -= pencil.offsetWidth;

            //Point pencil on center of text
            if ( textAlign == 'center' ){
                positionX += (element.offsetWidth - paddingLeft - paddingRight) / 2;
            }
        }

        //Check if element is visible
        pencil.style.display = (!positionY || !positionX || positionY == 0 || positionX === 0) ? 'none' : 'block';

        pencil.style.left = (window.scrollX + positionX)+'px';
        pencil.style.top = (window.scrollY + positionY - pencil.offsetHeight)+'px';
    },
    updateTranslation(e){
        var data = { changes : {} };
            data.changes[e._CAOriginTranslate] = CAEditor.nodeValue(e);

        //Clear previous key change
        if ( this._ajaxSend ) {
            clearTimeout(this._ajaxSend);
        }

        this._ajaxSend = setTimeout(function(){
            var url = CAEditor.config.requests.updateText;

            CAEditor.ajax.post(url, data, function(xhr){
                e._CAPencil.className += ' '+Pencils.classNameSaved;
            });

            Pencils.updateSameTranslationElements(e);
        }, 500);
    },
    hideAllPencils(){
        for ( var i = 0; i < CAEditor.matchedElements.length; i++ ) {
            var pencil = CAEditor.matchedElements[i]._CAPencil;

            //We need remove all pencils
            if ( pencil ) {
                pencil.className += ' '+Pencils.classNameHidden;
            }
        }
    },
    showAllPencils(){
        for ( var i = 0; i < CAEditor.matchedElements.length; i++ ) {
            var pencil = CAEditor.matchedElements[i]._CAPencil;

            //We need remove all pencils
            if ( pencil ) {
                pencil.className = pencil.className.replace(new RegExp(Pencils.classNameHidden, 'g'), '');
            }
        }
    }
}

export default Pencils;