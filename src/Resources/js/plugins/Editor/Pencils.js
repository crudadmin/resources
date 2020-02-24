import Observer from './Observer';
import Editor from './Editor';
import Helpers from './Helpers';

var Pencils = {
    className : 'CAE_Pencil',
    classNameSaved : 'CAE_Pencil--saved',
    classNameHidden : 'CAE_Pencil--hidden',
    classNameMoving : 'CAE_Pencil--moving',
    classNameActive : 'CAE_Pencil--active',

    init(){
        this.initHovers();
        this.registerClicks();
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
                this.bindPosition(element);
                continue;
            }

            element._CAPencil = this.createPencil(element, i);

            this.bindPosition(element);
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

            //Add all childs with pencil into potentionaly moved elements
            for ( var i = 0; i < childs.length; i++ ) {
                //If child has pencil
                if ( childs[i]._CAPencil ) {
                    elementsToMove.push(childs[i]);
                }
            }

            //See for position changed of every element till position wont changes.
            for ( var i = 0; i < elementsToMove.length; i++ ) {
                this.observePencilMovement(elementsToMove[i]);
            }
        };

        for ( var i = 0; i < allElements.length; i++ ) {
            allElements[i].addEventListener('mouseenter', checkHoverChanges);
            allElements[i].addEventListener('mouseleave', checkHoverChanges);
        }
    },
    observePencilMovement(element){
        var prevPositionKey = null,
            checkPosition = () => {
                var position = element.getBoundingClientRect(),
                    positionKey = position.x+'-'+position.y;

                if ( prevPositionKey != positionKey ) {
                    Pencils.bindPosition(element);

                    prevPositionKey = positionKey;

                    setTimeout(checkPosition, 100);
                }

                //Position is not moving
                //We want remove moving class
                else {
                    element._CAPencil.className = element._CAPencil.className.replace(this.classNameMoving, '').trim();
                }
            }

        if ( element._CAPencil.className.indexOf(this.classNameMoving) === - 1 ) {
            element._CAPencil.className += ' '+this.classNameMoving;
        }

        checkPosition();
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
    registerClicks(){
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
                //Check if is pencil element
                if ( Helpers.hasClass(list[i], Pencils.className) ) {
                    Pencils.onClick(list[i]);

                    e.preventDefault();
                    break;
                }
            }

            return false;
        });
    },
    isInvisibleElement(element){
        //If is textNode
        if ( element.nodeName == '#text' ) {
            element = element.parentElement;
        }

        var css = window.getComputedStyle(element),
            opacity = parseInt(css.opacity);

        //If is invisible element
        if ( opacity <= 0.5 ) {
            return true;
        }

        return false;
    },
    onClick(pencil){
        var element = pencil._CAElement,
            actualValue = CAEditor.nodeValue(element);

        //We cant allow update duplicate translates. Because change may be updated on right source translate.
        if ( CAEditor.duplicates.indexOf(actualValue) > -1 ) {
            alert(CAEditor.texts.cannotUpdate);
            return;
        }

        //Invisible element cannot be edited in editor style
        if ( this.isInvisibleElement(element) ) {
            this.openAlertModal(element, actualValue);
        } else {
            Editor.makeEditableNode(element, actualValue);
        }
    },
    openAlertModal(element, actualValue){
        var newText = prompt(CATranslates.texts.update, actualValue);

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
            Pencils.bindPosition(CAEditor.matchedElements[i]);
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
    bindPosition(element){
        var pencil = element._CAPencil,
            pencilHeight = 20,
            pencilWidth = 20;

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
            positionX -= pencilWidth;

            //Point pencil on center of text
            if ( textAlign == 'center' ){
                positionX += (element.offsetWidth - paddingLeft - paddingRight) / 2;
            }
        }

        pencil.style.left = (window.scrollX + positionX)+'px';
        pencil.style.top = (window.scrollY + positionY - pencilHeight)+'px';

        //Check if element is visible
        pencil.style.display = (!positionY || !positionX || positionY == 0 || positionX === 0) ? 'none' : 'block';

        //Automatically set zIndex of point
        this.setPencilZindex(element, pencil);
    },
    setPencilZindex(element, pencil){
        var maxZindex = 'auto';

        while(element.parentElement) {
            var zIndex = element.nodeType == 1 ? parseInt(window.document.defaultView.getComputedStyle(element).zIndex) : NaN;

            element = element.parentElement;

            if ( isNaN(zIndex) ) {
                continue;
            }

            maxZindex = zIndex;
        }

        pencil.style.zIndex = maxZindex;
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

                this.bindPosition(CAEditor.matchedElements[i]);
            }
        }
    }
}

export default Pencils;