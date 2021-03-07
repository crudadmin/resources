<template>
<div class="sitetree__item__wrapper">
    <div class="sitetree__item">
        <div class="sitetree__item__drag" v-if="row.id">
            <i class="fa fa-grip-vertical"></i>
        </div>
        <div class="sitetree__item__inputs">
            <div class="form-group" :class="{ 'has-error' : hasError('name') }">
                <input
                    type="text"
                    :value="rowName"
                    @keyup="updateName"
                    :placeholder="getLocaleFieldValue(row.name)||_('Zadajte názov odkazu')"
                    class="form-control">
            </div>

            <div class="form-group" :class="{ 'has-error' : hasError('type') }" v-if="!isGroup || model.sitetree_editor">
                <vue-chosen
                    :placeholder="_('Vyberte typ podstránky')"
                    v-model="row.type"
                    :options="modelsOptions"></vue-chosen>
            </div>

            <div class="form-group" :class="{ 'has-error' : hasError('key') }" v-if="isGroup && model.sitetree_editor">
                <input
                    type="text"
                    v-model="row.key"
                    :placeholder="_('Zadajte identifikátor skupiny [a-Z|0-9]')"
                    class="form-control">
            </div>

            <div class="form-group" :class="{ 'has-error' : hasError('row_id') }" v-if="row.type && !isGroup">
                <vue-chosen
                    :placeholder="_('Vyberte typ podstránky')"
                    v-model="row.row_id"
                    track-by="id"
                    label="name"
                    :options="selectedModelRows"></vue-chosen>
            </div>
            <button class="btn btn-primary" @click="saveItem" v-if="!row.id">{{ _('Pridať') }}</button>
        </div>
        <div class="sitetree__item__actions">
            <a class="btn btn-sm" target="_blank" :href="selectedLink" v-if="selectedLink">
                <i class="fa fa-link"></i>
            </a>

            <button
                class="btn btn-sm btn-primary"
                @click="showSubTree = !showSubTree"
                v-if="row.id && isGroup"
            >
                <i class="fa" :class="{ 'fa-angle-down' : !showSubTree, 'fa-angle-up' : showSubTree }"></i>
            </button>

            <button
                data-toggle="tooltip"
                :title="_('Zámok na pridavanie do skupiny')"
                class="btn btn-sm btn-default"
                @click="row.group_locked = !row.group_locked"
                v-if="isGroup && model.sitetree_editor"
            >
                <i class="fa" :class="{ 'fa-lock' : row.group_locked, 'fa-lock-open' : !row.group_locked }"></i>
            </button>

            <publish-button
                v-if="row.id && model.canUnpublishRow(row)"
                :model="model"
                :row="item" />

            <button
                v-if="row.id"
                class="btn btn-sm btn-danger"
                @click="removeItem(row)"
            >
                <i class="fa fa-trash"></i>
            </button>
        </div>
    </div>
    <div class="sitetree__subtree" v-if="showSubTree">
        <draggable
            :group="{ put : false }"
            @start="model.onDragStart($event)"
            @end="model.onDragEnd($event, nextLevel)"
            v-bind="model.getDragOptions()"
            handle=".sitetree__item__drag">
            <TreeItem
                v-for="subItem in nextLevel"
                :item="subItem"
                :parentRow="item"
                :items="items"
                :key="subItem.id" />
        </draggable>

        <TreeItem
            v-if="isGroup && !row.group_locked"
            :parentRow="item" />
    </div>
</div>
</template>

<script type="text/javascript">
import TreeItem from './TreeItem';
import PublishButton from '@components/Partials/PublishButton.vue';
import { mapState } from 'vuex';
import _ from 'lodash';
import draggable from 'vuedraggable'

export default {
    name : 'TreeItem',

    props : ['item', 'parentRow', 'items'],

    components : { TreeItem, PublishButton, draggable },

    data(){
        let model = this.getActiveModel('site_trees');

        return {
            showSubTree : false,
            row : _.cloneDeep(this.item||model.emptyRowInstance()),
            model : model,

            errors : [],
        }
    },

    watch: {
        rowValues : _.debounce(function(old, n){
            //If row does exists
            if ( this.row.id ) {
                this.saveItem();
            }
        }, 1000),
    },

    computed: {
        selectedLink(){
            if ( this.isGroup || !this.row.type || !this.row.row_id || !this.models[this.row.type] ){
                return;
            }

            let row = _.find(this.models[this.row.type].rows, { id : this.row.row_id })

            if ( !row ){
                return;
            }

            return row._url;
        },
        rowValues(){
            return [
                JSON.stringify(this.row.name),
                this.row.key,
                this.row.group_locked,
                this.row.type,
                this.row.row_id,
            ].join(',');
        },
        ...mapState('sitetree', [
            'models',
        ]),
        isLocaledName(){
            return 'locale' in this.model.fields.name;
        },
        rowName(){
            if ( this.isLocaledName ){
                return (this.row.name||{})[this.model.selectedLanguage().slug];
            }

            return this.row.name;
        },
        nextLevel(){
            if ( !this.item ){
                return [];
            }

            return _.filter(this.items, {
                parent_id : this.item.id
            });
        },
        isGroup(){
            return this.row.type == '$group';
        },
        modelsOptions(){
            let data = {};

            for ( var key in this.models ){
                data[key] = this.models[key].name;
            }

            if ( this.model.sitetree_editor ) {
                data['$group'] = this._('Skupina');
            }

            return data;
        },
        selectedModelRows(){
            let data = {},
                model = this.models[this.row.type];

            if ( !model || model.rows.length == 0 ){
                return {};
            }

            let rows = model.rows.map(row => {
                row.name = this.getLocaleFieldValue(row.name);

                return row;
            });

            return rows;
        },
    },

    methods: {
        updateName(e){
            var value;

            if ( this.isLocaledName ){
                value = this.row.name||{};

                value[this.model.selectedLanguage().slug] = e.target.value;
            } else {
                value = e.target.value;
            }

            this.$set(this.row, 'name', value);
        },
        hasError(key){
            return this.errors.indexOf(key) > -1;
        },
        castRow(row){
            row = _.cloneDeep(row);

            if ( this.isLocaledName ){
                for ( var key in row.name||{} ){
                    if ( !row.name[key] ){
                        delete row.name[key];
                    }
                }

                //If none language is present
                if ( row.name && Object.values(row.name).filter(item => item).length == 0 ){
                    delete row.name;
                }
            }

            return row;
        },
        async saveItem(){
            this.errors = [];

            try {
                let response = await this.$http.post(crudadmin.baseURL+'/sitetree/store', {
                    ...this.castRow(this.row),
                    parent_id : this.parentRow ? this.parentRow.id : null,
                });

                //We want reset row and fetch created row
                if ( !this.row.id ){
                    this.row = this.model.emptyRowInstance();

                    this.model.loadRows();
                }
            } catch (response){
                console.error(response);
                if ( response.status == 422 ) {
                    this.errors = Object.keys(response.body.errors).map(key => {
                        if ( key.split('.').length > 1 ){
                            return key.split('.')[0];
                        }

                        return key;
                    })
                }
            }
        },
        removeItem(row){
            this.model.removeRow(row.id);
        },
    }
}
</script>

<style lang="scss" scoped>
.sitetree__item__wrapper {
    .sitetree__item {
        display: flex;
        align-items: center;
        background: rgb(249 249 249);
        padding: $form-group-margin-bottom / 2;
        margin-bottom: $form-group-margin-bottom / 2;

        &__drag {
            padding: 6px;
            padding-right: 12px;

            i {
                color: $navbarBorderColor;
            }
        }

        &__inputs {
            display: flex;
            width: 100%;

            .form-group {
                width: 20%;
                margin-right: $form-group-margin-bottom / 2;
                margin-bottom: 0;
            }
        }

        &__actions {
            display: flex;

            > .btn:not(:last-child) {
                margin-right: 5px;
            }
        }
    }

    .sitetree__subtree {
        margin-left: $form-group-margin-bottom * 2;
    }
}
</style>