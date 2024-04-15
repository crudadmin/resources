<template>
    <Modal :modal="modal" :options="{ class : 'gettext-table', actions : actions }">
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
                    <td>{{ translatedSource(key) }}</td>
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
    </Modal>
</template>

<script>
import GettextField from '@components/Partials/GettextField.vue';

export default {
    props : ['modal', 'model', 'row'],

    components : {
        GettextField
    },

    data(){
        return {
            translates : {},
            sourceTranslates : {},
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

    created() {
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
                let finalKey = this.translatedSource(key);

                //If is under limit, and if has query match
                if (
                    (this.limit == false || i < this.limit)
                    && (!this.query || this.hasChange(key) || this.availableTranslated[key].join('').toLowerCase().indexOf(query) > -1 || finalKey.toLowerCase().indexOf(query) > -1 )
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
        actions(){
            const saveModal = () => {
                this.openModal({
                    message : this.trans('success-save'),
                    type : 'success',
                    toast : true,
                });
            };

            return [
                {
                    name : this.__('Uložiť'),
                    class : 'btn-light-primary',
                    callback : async () => {
                        await this.save();

                        saveModal()

                        return false;
                    }
                },
                {
                    name : trans('gettext-save'),
                    class : 'btn-primary',
                    callback : async () => {
                        await this.save();

                        saveModal();
                    }
                },
            ];
        },
        sourceTranslator(){
            return new CATranslator(this.sourceTranslates);
        }
    },

    methods: {
        translateId(key){
            return 'id-'+Object.keys(this.availableTranslated).indexOf(key);
        },
        async loadTranslations(){
            var url = this.$root.requests.translations
                          .replace(':id', this.row.id)
                          .replace(':table', this.model.table);

            try {
                let response = await this.$http.get(url).then(res => res.data),
                    translation = response.translations,
                    messages = translation.messages;

                this.missing = response.missing;
                this.raw = response.raw;
                this.plurals = response.plurals;
                this.sourceTranslates = response.source;
                this.plural_forms = translation['plural-forms'];
                this.translates = translation.messages[Object.keys(messages)[0]]||{};

                this.loaded = true;
            } catch (e){
                this.errorResponseLayer(e);
            }
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
        async save(){
            try {
                var url = this.$root.requests.get('update_translations', { id : this.row.id, table : this.model.table });

                await this.$http.post(url, {
                    changes : this.changes
                });
            } catch (e){
                this.errorModal();
            }
        },
        //Check if value has been changed
        hasChange(key){
            return key in this.changes;
        },
        translatedSource(key){
            return this.sourceTranslator.__(key);
        }
    },
}
</script>

<style lang="scss">
.gettext-table {
    table { background: white; width: 100%; max-width: 700px; margin-bottom: 0;}

    .modal-body { overflow-y: auto; }

    @media (min-width: 1000px) {
        .modal-dialog {
            width: 1000px;
            max-width: 90%;
        }
    }

    .modal-dialog {
        table { max-width: none }

        tr.missing { background: #555; color: white; }

        td {
            padding: 5px 5px;
            line-height: 155% !important;

            &:last-child { width: 50%; }

            &.input { background: white; padding: 0; position: relative; }
            &.input.edited { background: #ffe5e5 }

            .form-control {
                background: none;
                border: none;
                box-shadow: none !important
            }

            textarea.form-control {
                padding: 7px 10px 0;
                width: 100% !important;
                resize: none;
                min-height: 35px;
                height: 100%;

                &.long {
                    resize: auto;
                    height: auto;
                }
            }

            &.plural {
                textarea.form-control:not(:last-child) {
                    border-bottom: 1px solid #f4f4f4;
                }
            }
        }

        .translation-actions {
            text-align: center;
            margin-top: 15px;

            a {
                color: #007bff;
                cursor: pointer;
            }

            a:not(:last-child) {
                margin-right: 12px;
                border-right: 1px solid #eee;
                display: inline-block;
                padding-right: 15px;
            }
        }

        .loading {
            text-align: center;

            i {
                margin-right: 5px;
            }
        }
    }
}
</style>