<template>
<div class="dropdown fields-list" fields-list v-if="canShow">
    <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        <i class="fa fa-list" />
        <i class="--icon-right fa fa-angle-down"></i>
    </button>
    <ul class="dropdown-menu menu-left dropdown-menu-right">
        <li @click="$event.stopPropagation()" v-for="(column, key) in enabled_columns" v-if="canShowColumn(column, key)" :class="{ active : column.enabled }" class="--no-item-padding">
            <label class="--dropdown-item-padding --dropdown-item-vertical">
                <div class="checkbox-box mr-1">
                    <input type="checkbox" :data-column="key"  @click="toggleColumnEnabled(key)" :checked="column.enabled">
                    <span class="checkmark fa"></span>
                </div>

                <div>{{ model.fieldName(key) }}</div>
            </label>
        </li>
        <li class="default-reset">
            <a href="#" @click.prevent="toggleColumnsList">{{ isDefaultColumnsList ? _('Zobraziť všetky') : trans('default') }}</a>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    props : ['model'],
    computed : {
        canShow(){
            //Don't show for zero rows
            if ( !this.model.getData('rows').count ){
                return false;
            }

            return this.model.getSettings('table.switchcolumns', true);
        },
        enabled_columns(){
            return this.model.getData('enabled_columns');
        },
        isDefaultColumnsList(){
            var defaultColumns = this.model.getData('default_columns'),
                defaultColumnsKeys = Object.keys(_.cloneDeep(defaultColumns));

            return defaultColumnsKeys.filter(column => defaultColumns[column].enabled != (this.enabled_columns[column]||{}).enabled).length == 0;
        },
    },
    methods : {
        canShowColumn(column, key){
            if ( ! column.name )
                return false;

            if ( key in this.model.fields && this.model.fields[key].type == 'password' )
                return false;

            return true;
        },
        toggleColumnEnabled(column){
            this.model.setColumnVisibility(column, !this.enabled_columns[column].enabled);

            this.model.loadRows();
        },
        toggleColumnsList(){
            if ( this.isDefaultColumnsList ) {
                let defaultColumns = this.model.getData('default_columns');

                for ( var key in defaultColumns ){
                    this.model.setColumnVisibility(key, true);
                }

                this.model.loadRows();
            } else {
                this.model.resetAllowedColumns();
            }
        },
    }
}
</script>