<template>
    <div class="sitetree__item__wrapper">
        <div class="sitetree__item">
            <div class="sitetree__item__drag" v-if="sortable && row.id">
                <i class="fa fa-grip-vertical"></i>
            </div>
            <div class="sitetree__item__inputs">
                <div class="form-group" :class="{ 'has-error': hasError('name') }" data-toggle="tooltip" :title="_('Zadajte názov odkazu/sekcie')">
                    <input
                        type="text"
                        :value="getValueOrLocalized('name')"
                        @keyup="updateValue('name', $event)"
                        :placeholder="getLocaleFieldValue(row.name) || _('Zadajte názov odkazu/sekcie')"
                        class="form-control"
                    />
                </div>

                <div
                    class="form-group"
                    :class="{ 'has-error': hasError('type') }"
                    v-if="!isGroup || editorMode"
                    data-toggle="tooltip"
                    :title="_('Vyberte typ podstránky')"
                >
                    <vue-chosen
                        :placeholder="_('Vyberte typ podstránky')"
                        :value="rowGroupType('type')"
                        @input="onGroupTypeChange('type', $event)"
                        :options="modelsOptions()"
                    ></vue-chosen>
                </div>

                <div
                    class="form-group"
                    :class="{ 'has-error': hasError('group_type') }"
                    v-if="isGroupLink"
                    data-toggle="tooltip"
                    :title="_('Vyberte typ presmerovania')"
                >
                    <vue-chosen
                        :placeholder="_('Vyberte typ presmerovania')"
                        :value="rowGroupType('group_type')"
                        @input="onGroupTypeChange('group_type', $event)"
                        :options="modelsOptions(true)"
                    ></vue-chosen>
                </div>

                <div
                    class="form-group"
                    :class="{ 'has-error': hasError('url') }"
                    v-if="isUrl"
                    data-toggle="tooltip"
                    :title="_('Zadajte url adresu odkazu')"
                >
                    <input
                        type="text"
                        :value="getValueOrLocalized('url')"
                        @keyup="updateValue('url', $event)"
                        :placeholder="getLocaleFieldValue(row.url) || _('Zadajte url adresu odkazu')"
                        class="form-control"
                    />
                </div>

                <div class="form-group" :key="rowGroupType('type')" :class="{ 'has-error': hasError('row_id') }" v-if="isModelSelect">
                    <vue-chosen
                        :placeholder="_('Vyberte záznam podstránky')"
                        v-model="row.row_id"
                        track-by="id"
                        label="name"
                        :options="selectedModelRows"
                    ></vue-chosen>
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
                    v-if="row.id && isGroup && (row.insertable || nextLevel.length > 0)"
                >
                    <i class="fa" :class="{ 'fa-angle-down': !showSubTree, 'fa-angle-up': showSubTree }"></i>
                </button>

                <button
                    data-toggle="tooltip"
                    :title="_('Upraviť skupinu')"
                    class="btn btn-sm"
                    :class="{ 'btn-success': model.isActiveRow(row), 'btn-default': !model.isActiveRow(row) }"
                    v-if="isGroup && editorMode"
                    @click="model.selectRow(row)"
                >
                    <i class="far fa-edit"></i>
                </button>

                <button
                    data-toggle="tooltip"
                    :title="_('Zámok na pridavanie do skupiny')"
                    class="btn btn-sm btn-default"
                    @click="row.insertable = !row.insertable"
                    v-if="isGroup && editorMode"
                >
                    <i class="fa" :class="{ 'fa-lock': !row.insertable, 'fa-lock-open': row.insertable }"></i>
                </button>

                <buttons-action
                    v-for="(button, buttonKey) in model.getButtonsForRow(row)"
                    :key="buttonKey"
                    :button="button"
                    :row="row"
                    :buttonKey="buttonKey"
                    :model="model"
                />
            </div>
        </div>
        <div class="sitetree__subtree" v-if="showSubTree">
            <component
                :is="item.sortable ? 'draggable' : 'div'"
                :group="{ put: false }"
                @start="model.onDragStart($event)"
                @end="model.onDragEnd($event, nextLevel)"
                v-bind="model.getDragOptions()"
                handle=".sitetree__item__drag"
            >
                <TreeItem
                    v-for="subItem in nextLevel"
                    :item="subItem"
                    :parentRow="item"
                    :sortable="item.sortable"
                    :disabledTypes="item.disabled_types"
                    :items="items"
                    :key="subItem.id"
                />
            </component>

            <TreeItem v-if="isGroup && row.insertable" :disabledTypes="item.disabled_types" :parentRow="item" />
        </div>
    </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import _ from 'lodash';
import draggable from 'vuedraggable';
export default {
    name: 'TreeItem',

    props: ['item', 'parentRow', 'items', 'sortable', 'disabledTypes'],

    components: {
        draggable,
        TreeItem: () => import('./TreeItem.vue'),
    },

    data() {
        let model = this.getActiveModel('site_trees');

        return {
            showSubTree: false,
            row: _.cloneDeep(this.item || model.emptyRowInstance()),
            model: model,

            errors: [],
        };
    },

    watch: {
        'row.type'(value) {
            //If group link has been removed
            if (value !== 'group-link') {
                this.row.group_type = null;
            }
        },
        rowValuesWatcher: _.debounce(function (old, n) {
            //If row does exists
            if (this.row.id) {
                this.saveItem();
            }
        }, 1000),
    },

    computed: {
        selectedLink() {
            if (this.isUrl) {
                return this.getValueOrLocalized('url');
            }

            if (this.isGroup || !this.row.type || !this.row.row_id || !this.models[this.row.model]) {
                return;
            }

            let row = _.find(this.models[this.row.model].rows, { id: this.row.row_id });
            if (!row) {
                return;
            }

            return row._url;
        },
        rowValuesWatcher() {
            return [
                JSON.stringify(this.row.name),
                JSON.stringify(this.row.url),
                this.row.type,
                this.row.group_type,
                this.row.model,
                this.row.insertable,
                this.row.row_id,
            ].join(',');
        },
        ...mapState('sitetree', ['models']),
        nextLevel() {
            if (!this.item) {
                return [];
            }

            return _.filter(this.items, {
                parent_id: this.item.id,
            });
        },
        isModelSelect() {
            return this.row.type == 'model' || this.row.group_type == 'model';
        },
        isGroup() {
            return ['group', 'group-link'].indexOf(this.row.type) > -1;
        },
        isGroupLink() {
            return ['group-link'].indexOf(this.row.type) > -1;
        },
        isUrl() {
            return this.row.type == 'url' || this.row.group_type == 'url';
        },
        editorMode() {
            return this.model.getData('sitetree_editor') == true;
        },
        selectedModelRows() {
            let data = {},
                model = this.models[this.row.model];

            if (!model || model.rows.length == 0) {
                return {};
            }

            let rows = model.rows.map((row) => {
                row.name = this.getLocaleFieldValue(row[model.column]);

                return row;
            });

            return rows;
        },
    },

    methods: {
        modelsOptions(withoutGroups) {
            let data = {};

            if (!this.disabledTypes || this.disabledTypes.indexOf('model') == -1) {
                for (var key in this.models) {
                    data[key] = this.models[key].name;
                }
            }

            this.model.fields.type.options.forEach((type) => {
                //Skip groups for group item
                if (withoutGroups === true && ['group', 'group-link'].indexOf(type[0]) > -1) {
                    return false;
                }

                //Skip adding models
                if (['model'].indexOf(type[0]) > -1) {
                    return;
                }

                //Skip disabled types
                if (this.disabledTypes && this.disabledTypes.indexOf(type[0]) > -1) {
                    return;
                }

                data['$' + type[0]] = type[1];
            });

            return data;
        },
        rowGroupType(key) {
            if (this.row[key] == 'model') {
                return this.row.model;
            } else if (this.row[key]) {
                return '$' + this.row[key];
            }
        },
        isLocalized(field) {
            return 'locale' in this.model.fields[field];
        },
        getValueOrLocalized(key) {
            if (this.isLocalized(key)) {
                return (this.row[key] || {})[this.model.selectedLanguage().slug];
            }

            return this.row[key];
        },
        onGroupTypeChange(key, value) {
            if (value.substr(0, 1) == '$') {
                this.row[key] = value.substr(1);
            } else {
                this.row[key] = 'model';
                this.row.model = value;
            }
        },
        updateValue(key, e) {
            var value;

            if (this.isLocalized(key)) {
                value = this.row[key] || {};
                //Empty array fix, property wont be reactive
                value = _.isArray(value) ? {} : value;

                this.$set(value, this.model.selectedLanguage().slug, e.target.value);
            } else {
                value = e.target.value;
            }

            this.$set(this.row, key, value);
        },
        hasError(key) {
            return this.errors.indexOf(key) > -1;
        },
        castRow(row) {
            row = _.cloneDeep(row);

            ['name', 'url'].forEach((key) => {
                if (this.isLocalized(key)) {
                    for (var k in row[key] || {}) {
                        if (!row[key][k]) {
                            delete row[key][k];
                        }
                    }

                    //If none language is present
                    if (row[key] && Object.values(row[key]).filter((item) => item).length == 0) {
                        delete row[key];
                    }
                }
            });

            return row;
        },
        async saveItem() {
            this.errors = [];

            try {
                let response = await this.$http.post(crudadmin.baseURL + '/sitetree/store', {
                    ...this.castRow(this.row),
                    parent_id: this.parentRow ? this.parentRow.id : null,
                });

                //We want reset row and fetch created row
                if (!this.row.id) {
                    this.row = this.model.emptyRowInstance();

                    this.model.loadRows();
                }
            } catch (response) {
                if (response.status == 422) {
                    this.errors = Object.keys(response.body.errors).map((key) => {
                        if (key.split('.').length > 1) {
                            return key.split('.')[0];
                        }

                        return key;
                    });
                }
            }
        },
        removeItem(row) {
            this.model.removeRow(row.id);
        },
    },
};
</script>
