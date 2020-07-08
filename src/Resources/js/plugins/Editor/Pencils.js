import Observer from './Observer';
import Helpers from './Helpers';
import Navigation from './Navigation';

var Pencils = {
    wrapperId : 'CAE_Pencils__wrapper',
    wrapperTooltipNavbar : 'CAE_Pencils__tooltip_wrapper',
    className : 'CAE_Pencil',
    classNameMultiple : 'CAE_Pencil--multiple',
    classNameSaved : 'CAE_Pencil--saved',
    classNameHidden : 'CAE_Pencil--hidden',
    classNameMoving : 'CAE_Pencil--moving',
    classNameAppears : 'CAE_Pencil--appears',
    classNameError : 'CAE_Pencil--error',
    classNameActive : 'CAE_Pencil--active',
    classNameLoading : 'CAE_Pencil--loading',
    classNameIcon : 'CAE_Pencil--icon',
    classNameImage : 'CAE_Pencil--image',
    classNameLinkable : 'CAE_Pencil--linkable',
    classNameEditor : 'CAE_Pencil--editor',
    classNameSubmenu : 'CAE_Pencil--subpointers',

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

                    style = element.parentElement ? getComputedStyle(element.parentElement) : {};

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

                    this.removeAdditionalPointers(null, e.originalPointer||list[i]);
                    return;
                }
            }

            //Remove all additional pointers on missclick
            this.removeAdditionalPointers();

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
            helpers = Object.keys(element.getPointerSettings()),
            handler = element.getPointerSetting('onPointerClick', pencil.pointerType||(helpers.length == 1 ? helpers[0] : null));

        //Reset error state on click
        Helpers.removeClass(pencil, Pencils.classNameError);

        //If handler has been selected
        if ( handler ) {
            handler(element, pencil);
        }

        //When pointer has multiple listeners
        else if ( helpers.length > 1 ) {
            //If pointer has been removed, we want only hide subpointers
            if ( this.removeAdditionalPointers(pencil) ) {
                return;
            }

            //Add pointer active class
            Helpers.addClass(pencil, Pencils.classNameSubmenu);

            var offsetMargin = 10,
                offsetLeft = parseInt(pencil.offsetWidth / 2) + offsetMargin;

            //We want add additional pointers with offsets
            for ( var i = 0; i < helpers.length; i++ ) {
                let clonedPointer = this.createPencil(element, null, helpers[i]);

                pencil.additionalPointers.push(clonedPointer);

                //This is offset of given pointer
                clonedPointer.originalPointer = pencil;
                clonedPointer.leftOffset = (clonedPointer.offsetWidth / 2) + offsetLeft;

                //We want animation
                clonedPointer.style.left = pencil.style.left;
                clonedPointer.pointerType = helpers[i];

                //We want set position for given pointer by element properties
                this.bindPosition(element, clonedPointer);

                //Set offset for next pointer
                offsetLeft += clonedPointer.offsetWidth + offsetMargin;
            }
        }
    },
    removeAdditionalPointers(pointer, excepPointer){
        var removed = false;

        var pointers = [];

        //Find active pointer with additional pointers
        if ( !pointer ){
            for ( var i = 0; i < CAEditor.matchedElements.length; i++ ) {
                let additional = CAEditor.matchedElements[i]._CAPencil.additionalPointers;

                if (
                    additional && additional.length > 0
                    && CAEditor.matchedElements[i]._CAPencil !== excepPointer
                ) {
                    pointers.push(CAEditor.matchedElements[i]._CAPencil);
                    break;
                }
            }
        } else {
            pointers.push(pointer);
        }

        //Turn off all active pointers
        for ( var a = 0; a < pointers.length; a++ ) {
            let pointer = pointers[a];

            //Remove multipencils
            if ( pointer.additionalPointers && pointer.additionalPointers.length > 0 ) {
                for ( var i = 0; i < pointer.additionalPointers.length; i++ ){
                    pointer.additionalPointers[i].style.left = pointer.style.left;

                    setTimeout(function(){
                        this.remove();
                    }.bind(pointer.additionalPointers[i]), 200);

                    removed = true;
                }
            }

            pointer.additionalPointers = [];

            Helpers.removeClass(pointer, Pencils.classNameSubmenu);
        }

        return removed;
    },
    repaintPencils(){
        for ( var i = 0; i < CAEditor.matchedElements.length; i++ ) {
            Pencils.bindPosition(CAEditor.matchedElements[i]);
        }
    },
    createPencil(element, key, type){
        var helpers = Object.keys(element.getPointerSettings());

        var e = document.createElement('div');
            e.setAttribute('data-key', key);
            e.className = Pencils.className + (helpers.length > 1 && !type ? (' '+Pencils.classNameMultiple) : '');
            e._CAElement = element;

        //Fire onCreate event
        var handlers = element.getAllPointerSetting('onPointerCreate', type);

        handlers.forEach((callback) => {
            if ( callback ) {
                callback(e, element);
            }
        })

        this.pointersWrapper.appendChild(e);

        return e;
    },
    bindPosition(element, pencil){
        pencil = pencil||element._CAPencil;

        var pencilHeight = 20,
            pencilWidth = 20;

        //If element does not have pencil
        if ( pencil === undefined ){
            return;
        }

        //textNode does not have getBoundingClientRect
        var isHidden = false,
            hasNoPosition = false,
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
            hasNoPosition = (!positionY || !positionX || positionY == 0 || positionX == 0);

            isHidden = hasNoPosition || this.isHiddenElement(element);
        }

        //If pencil has set offset
        if ( pencil.leftOffset ){
            positionX += pencil.leftOffset;
        }

        pencil.style.position = isFixed ? 'fixed' : 'absolute';
        pencil.style.left = ((isFixed ? 0 : window.scrollX) + positionX)+'px';
        pencil.style.top = ((isFixed ? 0 : window.scrollY) + positionY - pencilHeight)+'px';

        //If element is gonne be hidden and has been visible in previosu state
        if ( pencil.style.display && pencil.style.display != 'none' && isHidden && !hasNoPosition ) {
            var handlers = element.getAllPointerSetting('onPointerHide');

            handlers.forEach(callback => {
                callback(element, pencil);
            });

            //When dot has been visible, we want hide this dot after one second delay
            //Because element may dissapear, but we may edit content in alert.
            if ( pencil.disappearTimaout ) {
                clearTimeout(pencil.disappearTimaout);
            }

            //We want dessapear dott after 750ms
            pencil.disappearTimaout = setTimeout(() => {
                //Check if element is visible
                pencil.style.display = isHidden ? 'none' : 'block';
            }, 750);
        } else {
            //Check if element is visible
            pencil.style.display = isHidden ? 'none' : 'block';

            //If element is visible again, we want turn off dissappear from previous state
            if ( !isHidden ){
                clearTimeout(pencil.disappearTimaout);
            }
        }

        //Automatically set zIndex of point
        this.setPencilZindex(element, pencil);

        //We want repaint all additional pointers
        if ( pencil.additionalPointers && pencil.additionalPointers.length ) {
            for ( var i = 0; i < pencil.additionalPointers.length; i++ ) {
                this.bindPosition(element, pencil.additionalPointers[i]);
            }
        }
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