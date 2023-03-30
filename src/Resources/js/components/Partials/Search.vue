<template>
<!-- Search bar -->
<div class="search-bar" data-search-bar :class="{ interval : search.interval, resetRightBorders : canBeInterval || canResetSearch, hasResetButton : canResetSearch  }">
    <div class="input-group">
        <div class="dropdown">
            <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                {{ getSearchingColumnName(search.column||false) }}
                <i class="--icon-right fa fa-angle-down"></i>
            </button>
            <ul class="dropdown-menu">
                <li data-field="" :class="{ active : !search.column }" @click="search.column = null">{{ trans('search-all') }}</li>
                <li data-field="id" :class="{ active : search.column == 'id' }" @click="search.column = 'id'">{{ getSearchingColumnName('id') }}</li>
                <li :data-field="key" v-for="key in getSearchableFields" :class="{ active : search.column == key }" @click="search.column = key">{{ getSearchingColumnName(key) }}</li>
                <li data-field="created_at" :class="{ active : search.column == 'created_at' }" @click="search.column = 'created_at'">{{ getSearchingColumnName('created_at') }}</li>
            </ul>
        </div>
        <!-- /btn-group -->

        <!-- Search columns -->
        <input type="text" v-show="isSearch" data-search-text :placeholder="trans('search')+'...'" :value="search.query" @input="updateSearchQuery('query', $event)" class="form-control">

        <input type="text" v-show="isDate" :value="search.query" data-search-date readonly class="form-control js_date" :placeholder="__('Vyberte dátum')" ref="datePicker1">

        <select type="text" v-show="isCheckbox" v-model="search.query" class="form-control">
            <option :value="0">{{ trans('off') }}</option>
            <option :value="1">{{ trans('on') }}</option>
        </select>

        <div class="select" v-show="isSelect">
            <select v-model="search.query" data-search-select class="form-control js_chosen" ref="chosenSelect" :data-placeholder="trans('get-value')">
                <option value="">{{ trans('show-all') }}</option>
                <option v-for="data in languageOptionsSearchFilter(isSelect ? model.fields[search.column].options : [])" :value="data[0]">{{ data[1] }}</option>
            </select>
        </div>
        <!-- Search columns -->

        <div class="interval-btn" data-interval v-if="canBeInterval" data-toggle="tooltip" data-original-title="Interval">
            <button type="button" class="btn" :class="{ 'btn-default' : !search.interval, 'btn-primary' : search.interval }" @click="search.interval = !search.interval">
                <i class="fa fa-arrows-alt-h"></i>
            </button>
        </div>

        <input type="text" data-inerval-input data-search-interval-text v-show="search.interval && isSearch" :placeholder="trans('search')+'...'" :value="search.query_to" @input="updateSearchQuery('query_to', $event)" class="form-control">

        <input type="text" data-inerval-input data-search-interval-date v-show="search.interval && isDate" :value="search.query_to" readonly class="form-control js_date" :placeholder="__('Vyberte dátum')" ref="datePicker2">

        <div class="interval" data-reset-interval v-if="canResetSearch" data-toggle="tooltip" :data-original-title="trans('reset')">
            <button type="button" class="btn btn-default" @click="resetIterval">
                <i class="fa fa-times"></i>
            </button>
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
export default {
    props : ['search', 'model'],

    watch: {
        search : {
            deep : true,
            handler(search, oldsearch){
                //Update select
                this.reloadSearchBarSelect();
            },
        },
        'search.column'(column){
            if ( this.isCheckbox ){
                this.search.query = 1;
            }
        }
    },

    mounted(){
        this.initSearchSelectboxes();

        this.resetSearchBar();

        if ( this.isSelect ) {
            this.$watch('model.fields.'+this.search.column+'.options', options => {
                this.initSearchSelectboxes();
            });
        }
    },

    computed: {
        canResetSearch(){
            return this.search.query || this.search.query_to;
        },
        canBeInterval(){
            var column = this.search.column;

            if ( ['created_at', 'id'].indexOf(column) > -1 )
                return true;

            let field = this.model.fields[column];

            if ( field ){
                if ( field.encrypted ){
                    return false;
                }

                if ( field.isNumber() || field.isDatepicker() ){
                    return true;
                }
            }

            return false;
        },
        getSearchableFields(){
            var keys = [];

            //Get searchable fields
            for ( var key in this.model.fields ) {
                var field = this.model.fields[key];

                if (
                        ! field.name
                        || (!('belongsToMany' in field) && 'multiple' in field)
                        || ( 'removeFromForm' in field && 'hidden' in field )
                        || field.isPassword()
                ) {
                    continue;
                }

                keys.push(key);
            }

            return keys;
        },

        /*
         * Search columns
         */
        getColumnField(){
            var column = this.search.column;

            if ( column && column in this.model.fields && this.model.fields[column] ){
                return this.model.fields[column];
            }
        },
        isSearch(){
            return (this.isCheckbox || this.isDate || this.isSelect) ? false : true;
        },
        isCheckbox(){
            if ( !this.getColumnField ) {
                return false;
            }

            return this.getColumnField.isCheckbox() ? true : false;
        },
        isDate(){
            var column = this.search.column;

            if ( ['created_at'].indexOf(column) > -1 ) {
                return true;
            }

            if ( this.getColumnField ) {
                return this.getColumnField.isDatepicker();
            }

            return false;
        },
        isSelect(){
            if ( this.getColumnField ) {
                return this.getColumnField.isSelect() || this.getColumnField.isRadio();
            }

            return false;
        },
    },

    methods: {
        updateSearchQuery: _.debounce(function(input, e){
            this.search[input] = e.target.value;
        }, 300),
        /*
         * Returns correct values into multilangual select
         */
        languageOptionsSearchFilter(array){
            return this.$root.languageOptions(array, this.model.fields[this.search.column]);
        },
        getSearchingColumnName(key){
            if ( key === false ) {
                return this.trans('search-all');
            }

            return this.model.fieldName(key);
        },
        reloadSearchBarSelect(){
            this.$nextTick(() => {
                $(this.$refs.chosenSelect).trigger("chosen:updated");
            });
        },
        initSearchSelectboxes(){
            this.$nextTick(() => {
                window.js_date_event = document.createEvent('HTMLEvents');

                var dispached = false;

                js_date_event.initEvent('change', true, true);

                $(this.$refs.chosenSelect).chosen({disable_search_threshold: 5}).on('change', function(){
                    if ( dispached == false ) {
                        dispached = true;
                        this.dispatchEvent(js_date_event);
                    } else {
                        dispached = false;
                    }
                }).trigger('chosen:updated');
            });
        },
        resetSearchBar(){
            //On change column reset input
            this.$watch('search.column', function(column, prevcolumn){
                //Reset searched value if previous column was select or option
                if ( prevcolumn && prevcolumn in this.model.fields && ['select', 'option'].indexOf(this.model.fields[prevcolumn].type) !== -1 ) {
                    this.search.query = null;
                }

                this.search.interval = false;

                this.reloadDatetimeSearch();
            });

            this.reloadDatetimeSearch();
        },
        reloadDatetimeSearch(){
            if ( ! this.isDate )
                return;

            var column = this.search.column,
                elements = [this.$refs.datePicker1, this.$refs.datePicker2].filter(el => el);

            //Add datepickers
            $(elements).datetimepicker({
                lang: this.$root.locale,
                format: column == 'created_at' ? 'd.m.Y' : this.model.getFieldFormat(column),
                timepicker: column == 'created_at' ? false : this.model.fields[column].type != 'date',
                datepicker: column == 'created_at' ? true : this.model.fields[column].type != 'time',
                scrollInput: false,
                onChangeDateTime : (current_date_time, e) => {
                    if ( !current_date_time ){
                        return;
                    }

                    this.search[e.attr('data-search-date') === undefined ? 'query_to' : 'query'] = moment(current_date_time).format('DD.MM.Y');
                }
            });
        },
        resetIterval(){
            this.search.query = '';
            this.search.query_to = '';
            this.search.interval = false;
        },
    }
}
</script>

<style lang="scss" scoped>
.select {
    min-width: 175px;
}
</style>