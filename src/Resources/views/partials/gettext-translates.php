window.CATranslates = {
    translates : <?php echo $translations ?>,
    requests : {
        update : '<?php echo action('\Admin\Controllers\GettextController@updateTranslations', request('lang')) ?>',
    },
    texts : {
        update : '<?php echo _('Upravte preklad') ?>',
        cannotUpdate : '<?php echo _('Tento text je možné upraviť len z administrácie v sekcii Jazykové mutácie.') ?>',
    },
};