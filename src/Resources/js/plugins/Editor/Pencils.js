import Observer from './Observer';
import Helpers from './Helpers';

var Pencils = {
    wrapperId : 'CAE_Pencils__wrapper',
    className : 'CAE_Pencil',
    classNameSaved : 'CAE_Pencil--saved',
    classNameHidden : 'CAE_Pencil--hidden',
    classNameMoving : 'CAE_Pencil--moving',
    classNameAppears : 'CAE_Pencil--appears',
    classNameError : 'CAE_Pencil--error',
    classNameActive : 'CAE_Pencil--active',
    classNameLoading : 'CAE_Pencil--loading',
    classNameImage : 'CAE_Pencil--image',

    //Wrapper element
    pointersWrapper : null,

    init(){
        this.createPointersWrapper();
        this.initHovers();
        this.registerClicks();
        this.registerResize();
        this.registerScroll();
        this.buildPencils();
        Observer.observeNewElements();
    },

    refresh(){
        this.buildPencils();
    },

    createPointersWrapper(){
        var e = document.createElement('div');
            e.id = Pencils.wrapperId;

        document.getElementsByTagName('body')[0].appendChild(e);

        this.pointersWrapper = e;
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
                var position,
                    style;

                //Get element position by node type
                if ( element.nodeName == '#text' ) {
                    var range = document.createRange();
                        range.selectNodeContents(element);

                    position = range.getClientRects()[0];
                    style = getComputedStyle(element.parentElement);
                } else {
                    position = element.getBoundingClientRect();
                    style = getComputedStyle(element);
                }

                var positionKey = position ? [position.x, position.y, style.opacity, style.visibility].join('-') : null;

                if ( position && prevPositionKey != positionKey ) {
                    Pencils.bindPosition(element);

                    prevPositionKey = positionKey;

                    setTimeout(checkPosition, 100);
                }

                //Position is not moving
                //We want remove moving class
                else {
                    Helpers.removeClass(element._CAPencil, this.classNameMoving);
                }
            }

        //We want turn off moving animation for smother effect
        Helpers.addClass(element._CAPencil, this.classNameMoving);

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

        document.body.addEventListener('mouseup', (e) => {
            var elements = CAEditor.allMatchedElements();

            elements.forEach(item => {
                this.observePencilMovement(item);
            });
        });
    },
    registerResize(){
        var resize;

        window.addEventListener('resize', () => {
            if ( resize ) {
                clearTimeout(resize);
            }

            resize = setTimeout(this.repaintPencils, 100);
        });
    },
    registerScroll(){
        var scroll;

        window.addEventListener('scroll', () => {
            if ( scroll ) {
                clearTimeout(scroll);
            }

            scroll = setTimeout(this.repaintPencils, 30);
        });
    },
    onClick(pencil){
        var element = pencil._CAElement,
            handler = element.getPointerSetting('onPointerClick');

        //Reset error state on click
        Helpers.removeClass(pencil, Pencils.classNameError);

        if ( handler ) {
            handler(element, pencil);
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
            e.className = Pencils.className;
            e._CAElement = element;

        //Fire onCreate event
        var onCreate = element.getPointerSetting('onPointerCreate');
        if ( onCreate ) {
            onCreate(e, element, key);
        }

        this.pointersWrapper.appendChild(e);

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
        var isHidden = false,
            position = element.getBoundingClientRect ? element.getBoundingClientRect() : null,
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

            //We want show images on the right side
            if ( element.nodeName === 'IMG' ){
                positionX = positionX + element.getBoundingClientRect().width;

                var windowWidth = window.outerWidth,
                    maxRadiusAfterWidth = windowWidth + pencilWidth;

                //If position of image pointer is just above window width
                //Show this pointer on right corner. Not after screen width.
                if ( positionX >= windowWidth && positionX <= maxRadiusAfterWidth ) {
                    positionX = windowWidth - pencilWidth;
                }
            } else {
                //Icons are aligned on the left, so we need move pencil to the edge
                positionX -= pencilWidth;

                //Point pencil on center of text
                if ( textAlign == 'center' ){
                    positionX += (element.offsetWidth - paddingLeft - paddingRight) / 2;
                }
            }
        }

        var isFixed = this.isPositionFixed(element);

        //Check if position is visible
        if ( !isHidden ) {
            isHidden = (!positionY || !positionX || positionY == 0 || positionX == 0) || this.isHiddenElement(element);
        }

        pencil.style.position = isFixed ? 'fixed' : 'absolute';
        pencil.style.left = ((isFixed ? 0 : window.scrollX) + positionX)+'px';
        pencil.style.top = ((isFixed ? 0 : window.scrollY) + positionY - pencilHeight)+'px';

        //Check if element is visible
        pencil.style.display = isHidden ? 'none' : 'block';

        //Automatically set zIndex of point
        this.setPencilZindex(element, pencil);
    },
    isPositionFixed(element, pencil){
        var fixed = false;

        while(element.parentElement) {
            var position = element.nodeType == 1 ? window.document.defaultView.getComputedStyle(element).position : null;

            if ( position == 'fixed' ) {
                fixed = true;
                break;
            }

            element = element.parentElement;
        }

        return fixed;
    },
    isHiddenElement(element, pencil){
        var hidden = false;

        while(element.parentElement) {
            var styles = element.nodeType == 1 ? window.document.defaultView.getComputedStyle(element) : null;

            if ( styles && (styles.opacity < 0.2 || styles.visibility == 'hidden') ) {
                hidden = true;

                if ( !element.observer ) {
                    Observer.observeDOM(element, () => {
                        this.observePencilMovement(element);
                    });

                    element.observer = true;
                }
                break;
            }

            element = element.parentElement;
        }

        return hidden;
    },
    setPencilZindex(element, pencil){
        var maxZindex = 'auto';

        while(element.parentElement) {
            var zIndex = element.nodeType == 1 ? parseInt(window.document.defaultView.getComputedStyle(element).zIndex) : NaN;

            element = element.parentElement;

            if ( isNaN(zIndex) || zIndex < 0 ) {
                continue;
            }

            maxZindex = zIndex;
        }

        pencil.style.zIndex = maxZindex;
    },
    hideAllPencils(){
        for ( var i = 0; i < CAEditor.matchedElements.length; i++ ) {
            var pencil = CAEditor.matchedElements[i]._CAPencil;

            //We need remove all pencils
            if ( pencil ) {
                Helpers.addClass(pencil, Pencils.classNameHidden);
            }
        }
    },
    showAllPencils(){
        for ( var i = 0; i < CAEditor.matchedElements.length; i++ ) {
            var pencil = CAEditor.matchedElements[i]._CAPencil;

            //We need remove all pencils
            if ( pencil ) {
                Helpers.removeClass(pencil, Pencils.classNameHidden);

                this.bindPosition(CAEditor.matchedElements[i]);
            }
        }
    }
}

export default Pencils;