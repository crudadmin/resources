<template>
<div
    class="dropdown multi-languages"
    data-form-language-switch
    v-if="(model.hasLocaleFields() && model.localization != true) && model.selectedLanguage() && languages.length > 1"
>
    <button class="btn btn-secondary dropdown-toggle" type="button" id="languageDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        <i class="--icon-left fa fa-globe-americas"></i>
        <span class="text">{{ getLangName(model.selectedLanguage()) }}</span>
        <i class="--icon-right fa fa-angle-down"></i>
    </button>
    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="languageDropdown">
        <li
            v-for="lang in languages"
            v-if="model.selectedLanguage().id != lang.id"
            class="--no-item-padding"
            :data-slug="lang.slug">
            <a href="#" class="--dropdown-item-padding" @click.prevent="changeLanguage(lang.id)">
                {{ getLangName(lang) }}
            </a>
        </li>
    </ul>
</div>
</template>

<script type="text/javascript">
export default {
    props : ['model'],

    computed: {
        languages(){
            return this.$root.languages;
        },
    },

    methods: {
        changeLanguage(id){
            this.model.setData('selected_language_id', id);
        },
    }
}
</script>