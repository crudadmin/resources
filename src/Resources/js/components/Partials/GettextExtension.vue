<template>
    <div class="message-modal gettext-table modal-open">
        <!-- MODAL -->
        <div class="modal modal-default" style="display: block">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ trans('gettext-update') }} - {{ gettext_editor.name }}</h4>
                        <button type="button" class="close" @click="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label>{{ trans('search') }}</label>
                        <input type="text" class="form-control" :placeholder="trans('gettext-search')" v-model="query">

                        <hr>
                        <p v-if="loaded && resultLength == 0">{{ trans('gettext-no-match') }}</p>

                        <p v-if="!loaded" class="loading"><i class="fa fa-refresh fa-spin"></i> {{ trans('gettext-loading') }}</p>

                        <table v-show="resultLength > 0" class="table data-table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>{{ trans('gettext-source') }}</th>
                                    <th>{{ trans('gettext-translation') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(values, key) in filtratedTranslates" :key="translateId(key)" :class="{ missing : isMissing(key) }">
                                    <td>{{ key }}</td>
                                    <td class="input" :class="{ edited : hasChange(key), plural : isPlural(key) }">
                                        <gettext-field
                                            v-for="i in  getPluralLength(key)"
                                            :i="i"
                                            :key="i"
                                            :id="translateId(key)+'-'+i"
                                            :pluralLength="getPluralLength(key)"
                                            :textKey="key"
                                            :values="values"
                                            :changes="changes"
                                            :translates="translates"
                                            :plural_forms="plural_forms"
                                            :isMissing="isMissing(key)"
                                            :isRaw="isRaw(key)"
                                            :isPlural="isPlural(key)"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="translation-actions">
                            <a @click="showMissing = true" v-if="missing.length > 0 && showMissing == false">{{ trans('gettext-showmissing') }} ({{ missing.length }})</a>
                            <a @click="limit = false" v-if="limit != false && fullCount > limit">{{ trans('gettext-count') }} ({{ fullCount }})</a>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="saveAndClose" data-save-translations class="btn btn-primary">{{ trans('gettext-save') }}</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->
    </div>
</template>

<script>
import GettextField from './GettextField.vue';

export default {
    name : 'gettext-extension',

    props : ['gettext_editor', 'gettext_table'],

    components : {
        GettextField
    },

    data(){
        return {
            translates : {},
            showMissing : false,
            missing : [],
            raw : [],
            plurals : [],
            plural_forms : '',
            query : null,
            changes : {},
            limit : 20,
            loaded : false,
        };
    },

    mounted() {
        this.loadTranslations();
    },

    computed: {
        availableTranslated(){
            var obj = {};

            //Filter missing translates
            for ( var key in this.translates ) {
                if ( this.missing.indexOf(key) === -1 || this.showMissing === true ) {
                    obj[key] = this.translates[key];
                }
            }

            return obj;
        },
        filtratedTranslates(){
            var obj = {},
                query = (this.query+'').toLowerCase(),
                i = 0;

            for ( var key in this.availableTranslated )
            {
                //If is under limit, and if has query match
                if (
                    (this.limit == false || i < this.limit)
                    && (!this.query || this.hasChange(key) || this.availableTranslated[key].join('').toLowerCase().indexOf(query) > -1 || key.toLowerCase().indexOf(query) > -1 )
                ){
                    obj[key] = this.availableTranslated[key];

                    i++;
                }
            }

            return obj;
        },
        fullCount(){
            return Object.keys(this.availableTranslated).length;
        },
        resultLength(){
            return Object.keys(this.filtratedTranslates).length;
        },
        pluralLength(){
            var match = this.plural_forms.match(/nplurals\=(\d+)/);

            return parseInt(match[1]||2);
        },
    },

    methods: {
        translateId(key){
            return 'id-'+Object.keys(this.availableTranslated).indexOf(key);
        },
        close(){
            this.$parent.gettext_editor = null;
        },
        loadTranslations(){
            var url = this.$root.requests.translations
                          .replace(':id', this.gettext_editor.id)
                          .replace(':table', this.gettext_table);
            this.$http.get(url).then(function(response){
                var messages = response.data.messages;

                this.missing = response.data.missing;
                this.raw = response.data.raw;
                this.plurals = response.data.plurals;
                this.plural_forms = response.data['plural-forms'];
                this.translates = response.data.messages[Object.keys(messages)[0]]||{};

                this.loaded = true;
            });
        },
        isPlural(text){
            return this.plurals.indexOf(text) > -1;
        },
        isMissing(text){
            return this.missing.indexOf(text) > -1;
        },
        isRaw(text){
            return this.raw.indexOf(text) > -1;
        },
        getPluralLength(text){
            return this.isPlural(text) ? this.pluralLength : 1;
        },
        saveAndClose(){
            var url = this.$root.requests.get('update_translations', { id : this.gettext_editor.id, table : this.gettext_table });

            this.$http.post(url, {
                changes : this.changes
            }).then(() => {
                this.close();
            });
        },
        //Check if value has been changed
        hasChange(key){
            return key in this.changes;
        }
    },
}
</script>