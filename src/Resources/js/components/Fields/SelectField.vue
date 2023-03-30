<template>
    <div class="form-group" :class="{ disabled : disabled || readonly || hasNoFilterValues }" v-show="required || !hasNoFilterValues" data-toggle="tooltip" :title="field.tooltip">
        <FieldLabel :model="model" :field="field" :field_key="field_key" :required="required" />

        <div class="form-group__chosen-container" :class="{ canPerformActions : hasRelationModal }">
            <select ref="select" :disabled="disabled" :name="!isMultiple ? name : ''" :data-placeholder="field.placeholder ? field.placeholder : trans('select-option-multi')" :multiple="isMultiple" class="form-control">
                <option v-if="!isMultiple" value="">{{ trans('select-option') }}</option>
                <option
                    v-for="mvalue in missingValueInSelectOptions"
                    :key="mvalue"
                    :value="mvalue"
                    :selected="hasValue(mvalue, value, isMultiple)">{{ mvalue }}</option>
                <option
                    v-for="data in fieldOptions"
                    :key="data[0]"
                    :selected="hasValue(data[0], value, isMultiple) ? 'selected' : ''"
                    :value="data[0]">{{ data[1] == null ? trans('number') + ' ' + data[0] : data[1] }}</option>
            </select>
            <button v-if="canAddRow" data-add-relation-row @click="performRelationAction('add')" type="button" :data-target="'#'+getModalId" data-toggle="modal" class="action-button btn-success">
                <i class="fa fa-plus"></i>
            </button>
            <button v-if="canViewRow" data-add-relation-row @click="performRelationAction('view')" type="button" :data-target="'#'+getModalId" data-toggle="modal" class="action-button btn-default">
                <i class="fa fa-folder-open"></i>
            </button>
            <button v-if="canEditRow" data-add-relation-row @click="performRelationAction('edit')" type="button" :data-target="'#'+getModalId" data-toggle="modal" class="action-button btn-default">
                <i class="fa fa-edit"></i>
            </button>
        </div>
        <small>{{ field.title }}</small>
        <input v-if="isRequiredIfHasValues" type="hidden" :name="'$required_'+name" value="1">

        <!-- Modal for adding relation -->
        <div class="modal fade" select-field :class="{ '--inModal' : isModalInModal }" v-if="hasRelationModal" :id="getModalId" ref="relationModalRef" data-keyboard="false" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">&nbsp;</h4>
                    </div>
                    <div class="modal-body">
                        <model-builder
                            v-if="allowRelation && relationModel"
                            :key="modelBuilderId"
                            :langid="langid"
                            :hasParentModel="getRelationModelParent"
                            :parentRow="getRelationRow"
                            :scopes="canAddScopes"
                            :model_builder="relationModel">
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
        props: ['id', 'model', 'name', 'field_key', 'field', 'value', 'disabled', 'readonly', 'depth_level'],

        data(){
            return {
                allowRelation : false,
                relationAction : null,
            };
        },

        watch: {
            value(value){
                this.$nextTick(() => {
                    this.reloadSelectWithMultipleOrders(false);
                });
            },
            //If disabled state has been changed, we need reload field
            disabled(){
                this.$nextTick(this.reloadSelectWithMultipleOrders);
            },
            readonly(){
                this.$nextTick(this.reloadSelectWithMultipleOrders);
            },
            allowRelation(state){
                if ( state == true ) {
                    this.setRelationModel();

                    this.setModelEvents();
                }
            },
            hasRelationModal(state){
                if ( state == false ){
                    this.allowRelation = false;
                }
            }
        },

        mounted(){
            /*
             * Fix for double recursion in VueJS
             */
            this.$options.components['model-builder'] = Vue.extend(ModelBuilder);

            this.onChangeSelect();

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
            required(){
                return this.model.isFieldRequired(this.field_key) || this.isRequiredIfHasValues;
            },
            langid(){
                return this.model.getSelectedLanguageId();
            },
            row(){
                return this.model.getRow();
            },
            hasRelationModal(){
                return this.canAddRow || this.canViewRow || this.canEditRow;
            },
            isCanAddInParentMode(){
                return ['parent'].indexOf(this.field.canAdd) > -1;
            },
            modelBuilderId(){
                if ( this.isCanAddInParentMode ){
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
            getRelationRow(){
                var filterBy = this.getFilterBy;

                if ( !this.getRelationModelParent || ! filterBy || ! this.row[filterBy[0]] ) {
                    return {};
                }

                return {
                    id : this.row[filterBy[0]],
                }
            },
            /*
             * Return model of parent filtration field
             */
            getRelationModelParent(){
                var filterBy = this.getFilterBy;

                if ( ! filterBy || ! this.row[filterBy[0]] ) {
                    return false;
                }

                var field = this.model.fields[filterBy[0]],
                    relationTable = ((field.belongsTo||field.belongsToMany)||'').split(',')[0];

                if ( relationTable ) {
                    return this.getFreshModel(relationTable);
                }
            },
            isModalInModal(){
                return this.model.hasParentFormModel() === false
            },
            /*
             * Can show adding row just for first level of forms (not when user click to add new row in form),
             * and also when is filter activated, then show just when is filter also selected
             */
            canAddRow(){
                if ( !this.field.canAdd ){
                    return false;
                }

                var temporaryRelationModel = this.getFreshModel(this.relationTable);
                return (temporaryRelationModel && temporaryRelationModel.hasAccess('insert'))
                        && (this.field.canAdd === true || this.isCanAddInParentMode)
                        && (!this.getFilterBy || this.filterByValue);
            },
            canViewRow(){
                if ( !(this.field.canView && this.field.value) ){
                    return false;
                }

                var temporaryRelationModel = this.getFreshModel(this.relationTable);
                return (temporaryRelationModel && temporaryRelationModel.hasAccess('read'))
                        && (!this.getFilterBy || this.filterByValue);
            },
            canEditRow(){
                if ( !(this.field.canEdit && this.field.value) ){
                    return false;
                }

                var temporaryRelationModel = this.getFreshModel(this.relationTable);
                return (temporaryRelationModel && temporaryRelationModel.hasAccess('update'))
                        && (!this.getFilterBy || this.filterByValue);
            },
            canAddScopes(){
                if ( this.isCanAddInParentMode == false ){
                    return [];
                }

                return [{
                    key : 'filterByParentField',
                    params : [this.model.table, this.field_key, this.row.id].join(';')
                }];
            },
            getFilterBy(){
                return this.model.getFilterBy(this.field_key);
            },
            isMultiple(){
                return this.model.isFieldMultiple(this.field_key);
            },
            fieldOptions(){
                if ( typeof this.field.options != 'object' )
                    return [];

                //On change fields options rebuild select
                this.$nextTick(this.reloadSelectWithMultipleOrders);

                return this.$root.languageOptions(this.field.options, this.field, this.getFilter(this.field.options));
            },
            missingValueInSelectOptions(){
                if ( !this.model.isOpenedRow() ){
                    return [];
                }

                var options = this.fieldOptions,
                    missing = [],
                    originalValue = this.$parent.getLocalizedValue(
                        !_.isNil(this.field.$originalValue) ? this.field.$originalValue : this.field.value
                    );

                //For multiple selects
                if ( this.isMultiple )
                {
                    if ( originalValue )
                    {
                        for (var i = 0; i < originalValue.length; i++)
                        {
                            var searched = options.filter(function(item){
                                return item[0] == originalValue[i];
                            }.bind(this));

                            //Add missing values, when is filter off
                            if (searched.length == 0 && !this.filterByValue){
                                missing.push(originalValue[i]);
                            }
                        }
                    }
                }

                //For single select
                else {
                    //Check if is value in options
                    for ( let option of options )
                    {
                        if ( option[0] == originalValue ){
                            return [];
                        }
                    }

                    return this.filterByValue || _.isNil(originalValue) ? [] : [originalValue];
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

                return this.getFilterBy && (!this.filterByValue || this.fieldOptions.length == 0);
            },
            isStaticFilterColumn(){
                return this.getFilterBy && !(this.filterByColumn in this.model.fields);
            },
            isParentFilterColumn(){
                return this.getFilterBy && this.filterByColumn.split('.').length > 1;
            },
            /*
             * Return value of relation column from actual model or parent model by slug
             */
            getStaticFilterBy()
            {
                var column = this.filterByColumn.split('.'),
                    model = column.length == 2 ? this.getModelBuilder(column[0]) : this;

                return model.row[column[column.length - 1]];
            },
            filterByColumn(){
                return this.getFilterBy[0];
            },
            filterByColumnOption(){
                return this.getFilterBy[2];
            },
            //If field has filters, then check of other fields values for filtrating
            filterByValue(){
                //If is filterer key is not from parent model
                if ( !this.getFilterBy || this.isParentFilterColumn ){
                    return;
                }

                let relatedField = this.model.fields[this.filterByColumn],
                    value = relatedField.value;

                if ( this.filterByColumnOption ){
                    let option = (this.model.getOptionValue(this.filterByColumn, value)||{});

                    return option[this.filterByColumnOption];
                }

                //If is empty value setted after reseting form, then set null or default field value
                if ( value === null ) {
                    return this.$parent.defaultFieldValue(relatedField);
                }

                //If is empty value type '', or value, then set given input
                else {
                    return value;
                }
            },
        },

        methods : {
            performRelationAction(action){
                this.relationAction = action;

                this.allowRelation = true;
            },
            setModelEvents(){
                let originalInsertable = this.relationModel.insertable;
                let originalEditable = this.relationModel.editable;

                let onFormCreate = () => {
                    $(this.$refs.relationModalRef).modal('hide');
                };

                $(this.$refs.relationModalRef).on('show.bs.modal', () => {
                    if ( ['view', 'edit'].indexOf(this.relationAction) > -1 ) {
                        this.relationModel.insertable = false;
                        this.relationModel.displayable = true;

                        //In preview mode we want disable edit
                        if ( this.relationAction == 'view' ) {
                            this.relationModel.editable = false;
                        }

                        this.relationModel.enableOnlyFullScreen();

                        this.relationModel.selectRow({ id : this.field.value });
                    } else if ( ['add'].indexOf(this.relationAction) > -1 ) {
                        this.relationModel.openForm();
                        this.relationModel.on('onCreate', onFormCreate);
                    }
                });

                //Close only this modal, not all opened. Because canAdd can be opened multiple times inside another modal
                $(this.$refs.relationModalRef).on('hidden.bs.modal', () => {
                    if ( ['view', 'edit'].indexOf(this.relationAction) > -1 ){
                        this.relationModel.insertable = originalInsertable;
                        this.relationModel.editable = originalEditable;
                        this.relationModel.exitFullScreenMode();
                    } else if ( ['add'].indexOf(this.relationAction) > -1 ) {
                        this.relationModel.off('onCreate', onFormCreate);
                    }

                    //Close relation form
                    this.relationModel.closeForm();

                    //If multiple modals are opened all the time, also after modal close. We want add
                    //model-open class into body, for support of scrolling modal.
                    if ( $('.modal[select-field] .modal-header:visible').length > 0 ) {
                        $('body').addClass('modal-open');
                    } else {
                        $('body').removeClass('modal-open');
                    }
                });
            },
            setRelationModel(){
                if ( !this.hasRelationModal ) {
                    return;
                }

                let model = this.getFreshModel(this.relationTable);

                //We want disable refresh interval in model
                if ( this.isCanAddInParentMode ) {
                    model.settings.refresh_interval = false;
                }

                this.relationModel = model;

                this.relationModel.on('onCreate', this.onRelationCreated = (row) => {
                    this.model.pushOption(this.field_key, row, 'store');

                    this.reloadSetters(row.id);
                });

                this.relationModel.on('onUpdate', this.onRelationUpdate = (row) => {
                    this.model.pushOption(this.field_key, row, 'update');
                });

                this.relationModel.on('onDelete', this.onRelationDeleted = (ids) => {
                    ids.forEach(id => {
                        this.model.pushOption(this.field_key, id, 'delete');
                    });
                });
            },
            changeValue(e, value, no_field){
                this.$parent.changeValue(e, value, no_field);
            },
            /*
             * Apply on change events into selectbox
             */
            onChangeSelect(){
                var select = $(this.$refs.select),
                    is_change = false;

                select.change((e) => {
                    is_change = true;

                    if ( this.isMultiple ){
                        //Chosen need to be updated after delay for correct selection order
                        setTimeout(() => {
                            //Send values in correct order
                            this.changeValue(null, select.getSelectionOrder());

                            //Update fake select on change value
                            this.rebuildSelect();
                        }, 50);
                    } else {
                        var value = select.val();

                        this.changeValue(null, value);

                        this.reloadSetters(value);
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
                if ( multiple == true && $.isArray(value) ) {
                    if ( value.indexOf( $.isNumeric(key) ? parseInt(key) : key ) > -1 ) {
                        return true;
                    }
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
            reloadSelectWithMultipleOrders(canUpdate){
                var select = $(this.$refs.select).chosen({
                    disable_search_threshold: 10,
                    search_contains : true
                });

                //We cant update select on value change, because scroll will jump on the top
                //when options are opened.
                if ( canUpdate !== false ) {
                    select.trigger('chosen:updated');
                }

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

                if ( (options && options[0] && typeof options[0][1] == 'object' && options[0][1] !== null) && ('language_id' in options[0][1]) == true ) {
                    filter['language_id'] = this.row.language_id||this.model.getSelectedLanguageId();
                }

                if ( this.getFilterBy )
                    filter[this.getFilterBy[1]] = this.isStaticFilterColumn ? this.getStaticFilterBy : this.filterByValue;

                return filter;
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

<style lang="scss" scoped>
.form-group.disabled {
    position: relative;

    &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .action-button {
        z-index: 1;
    }
}
</style>