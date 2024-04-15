import Ajax from './Ajax';
import Pencils from './Pencils';
import Helpers from './Helpers';
import Editor from './Editor';

var Editable = {
    boot() {
        this.registerAllEditors();
    },

    isEditableElement(element) {
        return element.getAttribute('data-crudadmin-editor') == '' && parseInt(element.getAttribute('data-id')) > 0;
    },

    registerAllEditors() {
        var elements = document.getElementsByTagName('*');

        for (var i = 0; i < elements.length; i++) {
            if (this.isEditableElement(elements[i])) {
                this.registerEditableElement(elements[i]);
            }
        }
    },

    registerEditableElement(element, url, id) {
        CAEditor.pushPointerElement(element, 'editable', {
            onPointerCreate: this.events.onPointerCreate.bind(this),
            onPointerClick: this.events.onPointerClick.bind(this),
        });
    },

    updateContent(element, data) {
        var obj = {
            language: CAEditor.config.language,
            model: element.getAttribute('data-model'),
            key: element.getAttribute('data-key'),
            id: element.getAttribute('data-id'),
            hash: element.getAttribute('data-hash'),
            content: data,
        };

        CAEditor.ajax.post(CAEditor.config.requests.updateContent, obj, {
            success(response) {
                Helpers.addClass(element._CAPencil, Pencils.classNameSaved);

                Pencils.removeAdditionalPointers(element._CAPencil);
            },
            error(response) {
                //Add red pointer color
                Helpers.addClass(element._CAPencil, Pencils.classNameError);
            },
        });
    },

    events: {
        onPointerCreate(pointer, element) {
            Helpers.addClass(pointer, Pencils.classNameIcon);
            Helpers.addClass(pointer, Pencils.classNameEditor);
        },
        onPointerClick(element, pointer) {
            var updated;

            Editor.makeInlineCKEditor(element, (editor) => {
                if (updated) {
                    clearTimeout(updated);
                }

                updated = setTimeout(() => {
                    Editable.updateContent(element, editor.editor.getData());
                }, 1000);
            });
        },
    },
};

export default Editable;
