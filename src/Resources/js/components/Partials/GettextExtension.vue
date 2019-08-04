<template>
    <div class="gettext-table modal-open">
        <!-- MODAL -->
        <div class="example-modal">
            <div class="modal modal-default" style="display: block">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" @click="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 class="modal-title">{{ trans('gettext-update') }} - {{ gettext_editor.name }}</h4>
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
                                    <tr v-for="(values, key) in filtratedTranslates" :class="{ missing : isMissing(key) }">
                                        <td>{{ key }}</td>
                                        <td class="input" :class="{ edited : hasChange(key), plural : isPlural(key) }">
                                            <textarea
                                                data-toggle="tooltip"
                                                class="form-control"
                                                v-for="i in getPluralLength(key)"
                                                :disabled="isMissing(key)"
                                                :title="isMissing(key) ? trans('gettext-missing') : getPluralsPlaceholder(key, i-1)"
                                                :class="{ long : getValue(values, i-1).length > 80 }"
                                                :value="getValue(values, i-1)"
                                                :placeholder="getPluralsPlaceholder(key, i-1)"
                                                @input="changeText($event, key, i-1)">
                                            </textarea>
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
                            <button type="button" @click="saveAndClose" class="btn btn-primary">{{ trans('gettext-save') }}</button>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
            <!-- /.modal -->
        </div>
    </div>
</template>

<script>
export default {
    name : 'gettext-extension',

    props : ['gettext_editor'],

    data(){
        return {
            translates : {},
            showMissing : false,
            missing : [],
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
            for ( var key in this.translates )
                if ( this.missing.indexOf(key) === -1 || this.showMissing === true )
                    obj[key] = this.translates[key];

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
        getPluralsIntervals(){
            var forms = this.plural_forms.split(';')[1].replace('plural=', ''),
                    plurals = [],
                    is_double = this.pluralLength == 2;

            for ( var i = 0; i < this.pluralLength; i++ )
            {
                var start = null,
                        end = null;

                for ( var a = 1; a < 100; a++ )
                {
                    var statement = forms.replace(/n/g, a),
                            condition = eval(statement),
                            result = parseInt(condition);

                    if (
                        start === null
                        && (
                            is_double && ((i == 0 && condition === false) || (i > 0 && condition === true))
                            || result === i
                        )
                    )
                        start = a;

                    if ( start !== null && end === null && (!is_double && result != i) ){
                        if ( i > 0 )
                            end = a - 1;

                        break;
                    }
                }

                plurals.push([start, start == end ? null : end]);
            }

            plurals = plurals.map((items, i) => {
                var items = items.filter(item => item);

                if ( i + 1 == plurals.length && items.length == 1 )
                    return items[0] + '+';

                return items.join(' - ');
            });

            return plurals;
        },
    },

    methods: {
        close(){
            this.$parent.gettext_editor = null;
        },
        loadTranslations(){
            this.$http.get(this.$root.requests.translations.replace(':id', this.gettext_editor.id)).then(function(response){
                var messages = response.data.messages;

                this.missing = response.data.missing;
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
        getPluralLength(text){
            return this.isPlural(text) ? this.pluralLength : 1;
        },
        getPluralsPlaceholder(text, i){
            //If is no plural
            if ( ! this.isPlural(text) )
                return '';

            if ( text.indexOf('%d') > -1 )
                return text.replace('%d', this.getPluralsIntervals[i]);

            return this.getPluralsIntervals[i];
        },
        getValue(value, i){
            if ( ! value )
                return '';

            return value[i]||'';
        },
        changeText(e, src, i){
            var value = e.target.value;

            //Plural forms translates
            if ( this.isPlural(src) )
            {
                //Build plural forms array
                if ( ! (src in this.changes) )
                    this.$set(this.changes, src, this.translates[src]);

                //Update specific plural form
                this.changes[src][i] = value;
            }

            //Non plural forms
            else {
                this.$set(this.changes, src, value);
            }

            //Update core translates object
            this.translates[src][i] = value;
        },
        saveAndClose(){
            var url = this.$root.requests.get('update_translations', { id : this.gettext_editor.id});

            this.$http.post(url, { changes : JSON.stringify(this.changes) }).then(() => {
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