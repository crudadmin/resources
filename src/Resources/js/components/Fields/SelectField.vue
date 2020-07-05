<template>
    <div class="form-group" :class="{ disabled : disabled || readonly || hasNoFilterValues }" v-show="required || !hasNoFilterValues" data-toggle="tooltip" :title="field.tooltip">
        <label>
            <i v-if="field.locale" class="fa localized fa-globe" data-toggle="tooltip" :title="trans('languages-field')"></i>
            {{ field.name }}
            <span v-if="required || isRequiredIfHasValues" class="required">*</span>
        </label>
        <div :class="{ 'can-add-select' : canAddRow }">
            <select v-if="readonly" :name="!isMultiple ? field_key : ''" class="d-none">
                <option v-if="!isMultiple" value=""></option>
                <option v-for="mvalue in missingValueInSelectOptions" :value="mvalue" :selected="hasValue(mvalue, value, isMultiple)"></option>
                <option v-for="data in fieldOptions" :selected="hasValue(data[0], value, isMultiple)" :value="data[0]">{{ data[0] }}</option>
            </select>

            <select ref="select" :disabled="disabled || readonly" :name="!isMultiple ? field_key : ''" :data-placeholder="field.placeholder ? field.placeholder : trans('select-option-multi')" :multiple="isMultiple" class="form-control">
                <option v-if="!isMultiple" value="">{{ trans('select-option') }}</option>
                <option v-for="mvalue in missingValueInSelectOptions" :value="mvalue" :selected="hasValue(mvalue, value, isMultiple)">{{ mvalue }}</option>
                <option v-for="data in fieldOptions" :selected="hasValue(data[0], value, isMultiple)" :value="data[0]">{{ data[1] == null ? trans('number') + ' ' + data[0] : data[1] }}</option>
            </select>
            <button v-if="canAddRow" data-add-relation-row @click="allowRelation = true" type="button" :data-target="'#'+getModalId" data-toggle="modal" class="btn-success">
                <i class="fa fa-plus"></i>
            </button>
        </div>
        <small>{{ field.title }}</small>
        <input v-if="isRequiredIfHasValues" type="hidden" :name="'$required_'+field_key" value="1">

        <!-- Modal for adding relation -->
        <div class="modal fade" :class="{ '--inModal' : isModalInModal }" v-if="canAddRow" :id="getModalId" data-keyboard="false" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="closeOpenedCanAddModal"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">&nbsp;</h4>
                    </div>
                    <div class="modal-body">
                        <model-builder
                            v-if="allowRelation"
                            :key="modelBuilderId"
                            :langid="langid"
                            :hasparentmodel="getRelationModelParent"
                            :parentrow="getRelationRow"
                            :scopes="canAddScopes"
                            :model_builder="getRelationModel">
                        </model-builder>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
    import ModelBuilder from '../Views/ModelBuilder.vue';

    export default {
        props: ['id', 'row', 'model', 'field_name', 'field_key', 'field', 'value', 'required', 'disabled', 'readonly', 'inputlang', 'langid', 'depth_level'],

        data(){
            return {
                filterBy : null,
                allowRelation : false,
            };
        },

        watch: {
            value(value){
                this.$nextTick(this.reloadSelectWithMultipleOrders);
            },
            //If disabled state has been changed, we need reload field
            disabled(){
                this.$nextTick(this.reloadSelectWithMultipleOrders);
            },
            readonly(){
                this.$nextTick(this.reloadSelectWithMultipleOrders);
            },
        },

        mounted(){
            /*
             * Fix for double recursion in VueJS
             */
            this.$options.components['model-builder'] = Vue.extend(ModelBuilder);

            this.onChangeSelect();

            this.bindFilters();

            eventHub.$on('updateField', this.onUpdateEvent = data => {
                if ( data.table != this.model.slug || data.depth_level != this.depth_level || data.key != this.$parent.field_key )
                    return;

                this.$nextTick(this.reloadSelectWithMultipleOrders);
            });
        },

        destroyed(){
            eventHub.$off('updateField', this.onUpdateEvent);
        },

        computed: {
            modelBuilderId(){
                if ( this.field.canAdd == 'parent' ){
                    return this.id+this.row.id;
                }

                return 'key';
            },
            getModalId(){
                return 'form-relation-modal-'+this.id;
            },
            relationTable(){
                return (this.field.belongsTo||this.field.belongsToMany||'').split(',')[0];
            },
            getRelationModel(){
                if ( ! this.canAddRow ) {
                    return;
                }

                return _.cloneDeep(this.$root.models[this.relationTable]);
            },
            getRelationRow(){
                var filterBy = this.getFilterBy;

                if ( ! filterBy || ! this.row[filterBy[0]] )
                    return {};

                return {
                    id : this.row[filterBy[0]],
                }
            },
            /*
             * Return model of parent filtration field
             */
            getRelationModelParent(){
                var filterBy = this.getFilterBy;

                if ( ! filterBy || ! this.row[filterBy[0]] )
                    return false;

                var field = this.model.fields[filterBy[0]],
                    relationTable = (field.belongsTo||field.belongsToMany).split(',')[0];

                return _.cloneDeep(this.$root.models[relationTable]);
            },
            /*
             * Can show adding row just for first level of forms (not when user click to add new row in form),
             * and also when is filter activated, then show just when is filter also selected
             */
            canAddRow(){
                if ( !this.field.canAdd ){
                    return false;
                }

                var relatedModel = this.$root.models[this.relationTable];

                return (!relatedModel || relatedModel.hasAccess('insert'))
                        && (this.field.canAdd === true || ['parent'].indexOf(this.field.canAdd) > -1)
                        && (!this.getFilterBy || this.filterBy);

                        //if we would like to disable canAdd option in already opened form throught canAdd button
                        // && this.isModalInModal == false
            },
            isModalInModal(){
                return this.$parent.hasparentmodel === false
            },
            canAddScopes(){
                if ( ['parent'].indexOf(this.field.canAdd) == -1 ){
                    return {};
                }

                return {
                    'filterByParentField' : [this.model.table, this.field_key, this.row.id],
                };
            },
            getFilterBy(){
                if ( !('filterBy' in this.field) )
                    return null;

                var filterBy = this.field.filterBy.split(','),
                    column;

                //Get column of relation field
                this.model.fields[column = filterBy[0]+'_id']||this.model.fields[column = filterBy[0]]

                filterBy[0] = column;

                return filterBy;
            },
            isMultiple(){
                return this.field.multiple && this.field.multiple === true || ('belongsToMany' in this.field);
            },
            fieldOptions(){
                if ( typeof this.field.options != 'object' )
                    return [];

                //On change fields options rebuild select
                this.$nextTick(this.reloadSelectWithMultipleOrders);

                return this.$root.languageOptions(this.field.options, this.field, this.getFilter(this.field.options));
            },
            missingValueInSelectOptions(){
                if ( !this.row )
                    return [];

                var options = this.fieldOptions,
                    missing = [],
                    original_value = this.$parent.getLocalizedValue(this.field.$original_value);

                //For multiple selects
                if ( this.isMultiple )
                {
                    if ( original_value )
                    {
                        for (var i = 0; i < original_value.length; i++)
                        {
                            var searched = options.filter(function(item){
                                return item[0] == original_value[i];
                            }.bind(this));

                            //Add missing values, when is filter off
                            if (searched.length == 0 && !this.filterBy){
                                missing.push(original_value[i]);
                            }
                        }
                    }
                }

                //For single select
                else {
                    //Check if is value in options
                    for ( var i = 0; i < options.length; i++ )
                    {
                        if ( options[i][0] == original_value )
                            return [];
                    }

                    return this.filterBy || [null, undefined].indexOf(original_value) > -1 ? [] : [original_value];
                }

                return missing;
            },
            isRequiredIfHasValues(){
                return 'required_with_values' in this.field && this.field.required_with_values == true && this.fieldOptions.length > 0;
            },
            hasNoFilterValues(){
                //If foreign key identificator is not field, bud static foreign key column
                if ( this.isStaticFilterColumn )
                    return false;

                return this.getFilterBy && (!this.filterBy || this.fieldOptions.length == 0);
            },
            isStaticFilterColumn(){
                return this.getFilterBy && !(this.getFilterBy[0] in this.model.fields);
            },
            isParentFilterColumn(){
                return this.getFilterBy && this.getFilterBy[0].split('.').length > 1;
            },
            /*
             * Return value of relation column from actual model or parent model by slug
             */
            getStaticFilterBy()
            {
                var column = this.getFilterBy[0].split('.'),
                    model = column.length == 2 ? this.$parent.getModelBuilder(column[0]) : this;

                return model.row[column[column.length - 1]];
            },
        },

        methods : {
            /*
             * Close only this modal, not all opened. Because canAdd can be opened multiple times inside another modal
             */
            closeOpenedCanAddModal(){
                $('#'+this.getModalId).modal('hide').on('hidden.bs.modal', () => {
                    //If multiple modals are opened all the time, also after modal close. We want add
                    //model-open class into body, for support of scrolling modal.
                    if ( $('.modal .modal-header:visible').length > 0 ) {
                        $('body').addClass('modal-open');
                    }
                });
            },
            /*
             * If field has filters, then check of other fields values for filtrating
             */
            bindFilters(){
                //If is filterer key is not from parent model
                if ( !this.getFilterBy || this.isParentFilterColumn )
                    return;

                this.$watch('model.fields.'+this.getFilterBy[0]+'.value', function(value){
                    //If is empty value setted after reseting form, then set null or default field value
                    if ( value === null ) {
                        this.filterBy = this.$parent.defaultFieldValue(this.model.fields[this.getFilterBy[0]]);
                    }

                    //If is empty value type '', or value, then set given input
                    else {
                        this.filterBy = value;
                    }
                });

                this.filterBy = this.$parent.defaultFieldValue(this.model.fields[this.getFilterBy[0]]);
            },
            changeValue(e, value, no_field){
                this.$parent.changeValue(e, value, no_field);
            },
            /*
             * Apply on change events into selectbox
             */
            onChangeSelect(){
                var select = $(this.$refs.select),
                    is_change = false,
                    _this = this;

                select.change(function(e){
                    is_change = true;

                    if ( _this.isMultiple ){
                        //Chosen need to be updated after delay for correct selection order
                        setTimeout(() => {
                            //Send values in correct order
                            _this.changeValue(null, $(this).getSelectionOrder());

                            //Update fake select on change value
                            _this.rebuildSelect();
                        }, 50);
                    } else {
                        var value = $(this).val();

                        _this.changeValue(null, value);

                        _this.reloadSetters(value);
                    }
                });

                //If field value has been updated by setter and not by the user
                this.$watch('field.value', (value, oldvalue) => {
                    if (
                        is_change === true
                        || _.isNil(value)
                        || (value === oldvalue || _.isEqual(value, oldvalue))
                    ){
                        is_change = false;
                        return;
                    }

                    //Update selects when vuejs is fully rendered
                    this.$nextTick(this.reloadSelectWithMultipleOrders);
                });
            },
            hasValue(key, value, multiple)
            {
                if ( multiple == true && $.isArray(value) )
                {
                    if ( value.indexOf( $.isNumeric(key) ? parseInt(key) : key ) > -1 )
                        return true;
                } else if ((key || key == 0) && (value || value == 0) && key == value) {
                    return true;
                }

                return false;
            },
            rebuildSelect(){
                //If is not multiple select
                if ( !this.isMultiple )
                    return;

                var select = $(this.$refs.select),
                    fake_select = select.prev();

                var values = select.getSelectionOrder();

                if ( !fake_select.is('select') )
                    fake_select = select.before('<select name="'+this.field_key+'[]" multiple="multiple" style="display: none"></select>').prev();

                //Remove inserted options
                fake_select.find('option').remove();

                for ( var i = 0; i < values.length; i++ )
                    fake_select.append($('<option></option>').attr('selected', true).attr('value', values[i]).text(values[i]));
            },
            reloadSelectWithMultipleOrders(){
                var select = $(this.$refs.select).chosen({
                    disable_search_threshold: 10,
                    search_contains : true
                }).trigger('chosen:updated');

                //Rebuild multiple order into fake select which will send data into request
                if ( this.isMultiple ){
                    //Set selection order into multiple select
                    if ( this.field.value ){
                        //Error exception when is some options missing, or filtrated by filters
                        try {
                            select.setSelectionOrder(this.field.value);
                        } catch(e){

                        }
                    }

                    this.rebuildSelect();
                }
            },
            getFilter(options){
                var filter = {};

                if ( (options && options[0] && typeof options[0][1] == 'object' && options[0][1] !== null) && ('language_id' in options[0][1]) == true )
                    filter['language_id'] = this.row.language_id||(this.inputlang ? this.inputlang.id : null)||this.langid;

                if ( this.getFilterBy )
                    filter[this.getFilterBy[1]] = this.isStaticFilterColumn ? this.getStaticFilterBy : this.filterBy;

                return filter;
            },
            pushOption(row, action){
                //Store or update option field
                if ( action == 'store' )
                {
                    var filterBy = this.getFilterBy;

                    //Add relation into added row
                    if ( filterBy && this.row[filterBy[0]] )
                        row[filterBy[1]] = this.row[filterBy[0]];

                    //Push added option into array
                    this.field.options.unshift([row.id, row]);

                    //Set multiple values or one value
                    if ( this.isMultiple ){
                        if ( ! this.field.value )
                            this.field.value = [row.id];
                        else
                            this.field.value.push(row.id);

                        this.changeValue(null, this.field.value, false);
                    } else {
                        this.changeValue(null, row.id);
                    }
                } else if ( action == 'update' ) {
                    for ( var i = 0; i < this.field.options.length; i++ )
                        if ( this.field.options[i][0] == row.id ){
                            for ( var key in row )
                                this.field.options[i][1][key] = row[key];
                        }
                } else if ( action == 'delete' ) {
                    //Remove value also from field values
                    if ( this.isMultiple ){
                        if ( $.isArray(this.field.value) ){
                            this.field.value.splice(this.field.value.indexOf(row), 1);

                            this.changeValue(null, this.field.value, false);
                        }
                    } else if ( this.field.value == row ) {
                        this.changeValue(null, null);
                    }

                    //Remove deleted field from options
                    for ( var key in this.field.options ){
                        if ( this.field.options[key][0] == row ){
                            this.field.options.splice(key, 1)

                            break;
                        }
                    }
                }
            },
            /*
             * If field has setters, then check for change of changer field
             */
            reloadSetters(value){
                for ( var key in this.model.fields )
                {
                    var field = this.model.fields[key],
                        fillBy = this.getFillBy(field);

                    if ( ! fillBy || ! fillBy[0] || (fillBy[0] != this.field_key && fillBy[0] + '_id' != this.field_key) )
                        continue;

                    var options = this.field.options||[];

                    for ( var k in options )
                    {
                        //Skip other values
                        if ( options[k][0] != value )
                            continue;

                        this.$set(this.row, key, options[k][1][fillBy[1]||key]);

                        break;
                    }
                }
            },
            getFillBy(field){
                if ( !('fillBy' in field) )
                    return null;

                var filterBy = field.fillBy.replace(',', '.').split('.'),
                    column;

                //Get column of relation field
                this.model.fields[column = filterBy[0]+'_id']||this.model.fields[column = filterBy[0]]

                filterBy[0] = column;

                return filterBy;
            },
        },
    }
</script>