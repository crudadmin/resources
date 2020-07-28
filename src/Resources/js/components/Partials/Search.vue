<template>
<!-- Search bar -->
<div :id="getFilterId" class="search-bar" data-search-bar :class="{ interval : search.interval, resetRightBorders : canBeInterval || canResetSearch, hasResetButton : canResetSearch  }">
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
        <input type="text" v-show="isSearch" data-search-text :placeholder="trans('search')+'...'" @input="updateSearchQuery('query', $event)" class="form-control">

        <input type="text" v-show="isDate" data-search-date readonly class="form-control js_date">

        <select type="text" v-show="isCheckbox" v-model="search.query" class="form-control">
            <option value="0">{{ trans('off') }}</option>
            <option value="1">{{ trans('on') }}</option>
        </select>

        <div class="select" v-show="isSelect">
            <select v-model="search.query" data-search-select class="form-control js_chosen" :data-placeholder="trans('get-value')">
                <option value="">{{ trans('show-all') }}</option>
                <option v-for="data in languageOptionsSearchFilter(isSelect ? model.fields[search.column].options : [])" :value="data[0]">{{ data[1] }}</option>
            </select>
        </div>
        <!-- Search columns -->

        <div class="interval-btn" data-interval v-if="canBeInterval" data-toggle="tooltip" data-original-title="Interval">
            <button class="btn" :class="{ 'btn-default' : !search.interval, 'btn-primary' : search.interval }" @click="search.interval = !search.interval"><i class="fa fa-arrows-alt-h"></i></button>
        </div>

        <input type="text" data-inerval-input data-search-interval-text v-show="search.interval && isSearch" :placeholder="trans('search')+'...'"  @input="updateSearchQuery('query_to', $event)" class="form-control">

        <input type="text" data-inerval-input data-search-interval-date v-show="search.interval && isDate" readonly class="form-control js_date">

        <div class="interval" data-reset-interval v-if="canResetSearch" data-toggle="tooltip" :data-original-title="trans('reset')">
            <button class="btn btn-default" @click="resetIterval"><i class="fa fa-times"></i></button>
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
    },

    mounted(){
        this.initSearchSelectboxes();

        this.resetSearchBar();
    },

    computed: {
        canResetSearch(){
            return this.search.query || this.search.query_to;
        },
        getFilterId(){
            return 'js_filter' + this.getModelKey;
        },
        canBeInterval(){
            var column = this.search.column,
                intervalColumns = ['integer', 'decimal', 'date', 'datetime', 'time'];

            if ( ['created_at', 'id'].indexOf(column) > -1 )
                return true;

            return column in this.model.fields
                    && (intervalColumns.indexOf(this.model.fields[column].type) > -1) ? true : false;
        },
        getSearchableFields(){
            var keys = [];

            //Get searchable fields
            for ( var key in this.model.fields ) {
                var field = this.model.fields[key];

                if (
                        ! field.name
                        || 'belongToMany' in field
                        || 'multiple' in field
                        || ( 'removeFromForm' in field && 'hidden' in field )
                        || field.type == 'password'
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
        isSearch(){
            return (this.isCheckbox || this.isDate || this.isSelect) ? false : true;
        },
        isCheckbox(){
            var column = this.search.column;

            return column && column in this.model.fields && this.model.fields[column].type == 'checkbox' ? true : false;
        },
        isDate(){
            var column = this.search.column;

            if ( ['created_at'].indexOf(column) > -1 ) {
                return true;
            }

            return column && column in this.model.fields && (['date', 'datetime', 'time'].indexOf(this.model.fields[column].type) > -1) ? true : false;
        },
        isSelect(){
            var column = this.search.column;

            return column && column in this.model.fields && (['select', 'radio'].indexOf(this.model.fields[column].type) > -1) ? true : false;
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
                $('#'+this.getFilterId+' .js_chosen').trigger("chosen:updated");
            });
        },
        initSearchSelectboxes(){
            window.js_date_event = document.createEvent('HTMLEvents');

            var dispached = false;

            js_date_event.initEvent('change', true, true);

            $('#'+this.getFilterId+' .js_chosen').chosen({disable_search_threshold: 5}).on('change', function(){
                if ( dispached == false ) {
                    dispached = true;
                    this.dispatchEvent(js_date_event);
                } else {
                    dispached = false;
                }
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
        },
        reloadDatetimeSearch(){
            if ( ! this.isDate )
                return;

            var column = this.search.column;

            //Add datepickers
            $('#'+this.getFilterId+' .js_date').datetimepicker({
                lang: this.$root.locale,
                format: column == 'created_at' ? 'd.m.Y' : this.model.fields[column].date_format,
                timepicker: column == 'created_at' ? false : this.model.fields[column].type != 'date',
                datepicker: column == 'created_at' ? true : this.model.fields[column].type != 'time',
                scrollInput: false,
                onChangeDateTime : (current_date_time, e) => {
                    this.search[e.attr('data-search-date') === undefined ? 'query_to' : 'query'] = moment(current_date_time).format('DD.MM.Y');
                }
            });
        },
        resetIterval(){
            this.search.query = '';
            this.search.query_to = '';
        },
    }
}
</script>