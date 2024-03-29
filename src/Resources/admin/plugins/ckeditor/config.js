/**
 * @license Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */
CKEDITOR.editorConfig = function( config ) {
    var lang = $('html').attr('lang')||'sk';

    // Define changes to default configuration here. For example:
    config.language = lang;
    config.defaultLanguage = lang;

    var fileManagerPath;
    if ( window.crudadmin.ckfinder ) {
        fileManagerPath = window.crudadmin.baseURL + '/api/ckfinder/browser';
    } else {
        fileManagerPath = window.crudadmin.baseURL + '/filemanager';
    }

    config.skin = 'moono-lisa';

    //CKFinder
    config.filebrowserBrowseUrl = fileManagerPath;
    config.filebrowserImageBrowseUrl = fileManagerPath + '?type=Images';
    config.filebrowserFlashBrowseUrl = fileManagerPath + '?type=Flash';
    // config.filebrowserUploadUrl = fileManagerPath + '?command=QuickUpload&type=Files';
    // config.filebrowserImageUploadUrl = fileManagerPath + '?command=QuickUpload&type=Images';
    // config.filebrowserFlashUploadUrl = fileManagerPath + '?command=QuickUpload&type=Flash';
    config.filebrowserWindowWidth = '50%';
    config.filebrowserWindowHeight = '50%';

    config.toolbar = [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Save', '-', 'Source', '-', 'Undo', 'Redo' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord' ] },
        { name: 'editing', groups: [ 'find', ], items: [ 'Find' ] },
        { name: 'links', items: [ 'Link', 'Unlink' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
        { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule'] },
        { name: 'styles', items: [ 'Styles', 'Format', 'FontSize' ] },
        { name: 'colors', items: [ 'TextColor', 'BGColor', 'Iframe', 'oembed' ] },
        { name: 'tools', items: [ 'Maximize'] },
        { name: 'others', items: [ '-' ] },
        // { name: 'about', items: [ 'About' ] }
    ];

    // Toolbar groups configuration.
    config.toolbarGroups = [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        { name: 'links' },
        { name: 'insert' },
        { name: 'oembed' },
        { name: 'styles' },
        { name: 'colors' },
        { name: 'tools' },
        { name: 'others' },
        { name: 'about' }
    ];

    config.allowedContent = {
        script: true,
        $1: {
            // This will set the default set of elements
            elements: CKEDITOR.dtd,
            attributes: true,
            styles: 'text-align,font-weight',
            classes: false
        }
    };

    config.format_tags = 'p;h1;h2;h3;pre';
    config.entities = false;
    config.basicEntities = true;
    config.extraPlugins = 'save,oembed,widget,justify,font,lineutils';

    if ( crudadmin.ckeditorConfig ) {
        crudadmin.ckeditorConfig(config);
    }
};