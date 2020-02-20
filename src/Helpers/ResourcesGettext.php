<?php

namespace Admin\Resources\Helpers;

use Gettext\Translations;
use Gettext;
use Cache;

class ResourcesGettext
{
    public function getPoPath($locale)
    {
        return __DIR__.'/../Resources/lang/gettext/'.$locale.'.po';
    }

    public function getCacheKey($locale)
    {
        return 'admin.translates.syncLocale.'.$locale;
    }

    /**
     * Sync language files from vendor folder into application translations in storage/langs/admin_gettext...
     *
     * @param  AdminModel  $language
     * @return  void
     */
    public function syncResourceLocales($language)
    {
        $locale = Gettext::getLocale($language->slug);

        //If resource translates for this language does not exists
        if ( !file_exists($poPath = $this->getPoPath($locale)) ) {
            return;
        }

        $resourcesLanguageTimestamp = filemtime($poPath);

        //If there is no change in resource files
        if ( Cache::get($this->getCacheKey($locale)) == $resourcesLanguageTimestamp ) {
            return;
        }

        //Cache
        Cache::set($this->getCacheKey($locale), $resourcesLanguageTimestamp);

        //If source file does not exists
        if ( !$language->poedit_po || $language->poedit_po->exists() === false ) {
            $translations = new Translations;
        }

        //Else load from existing po file
        else {
            $translations = Translations::fromPoFile($language->poedit_po->basepath);
        }

        $resourceTranslations = Translations::fromPoFile($poPath);

        $translations->mergeWith($resourceTranslations);

        Gettext::rebuildGettextFiles($language, $translations);
    }
}