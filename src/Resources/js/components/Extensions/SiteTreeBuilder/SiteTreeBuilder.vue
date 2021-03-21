<template>
<div>
    <div class="box box--presets">
        <div class="box-header box-header--actions">
            <div class="box-header__left">
                <div>
                    <h1 class="box-header__title">{{ model.name }}</h1>
                    <p class="box-header__description" v-if="model.title">{{ model.title }}</p>
                </div>
            </div>

            <div class="box-header__right">
                <model-language-switch :model="model" />
            </div>
        </div>

        <div class="box-body">
            <TreeItem
                v-for="item in firstLevel"
                :item="item"
                :items="items"
                :sortable="false"
                :disabledTypes="firstLevelDisabledTypes"
                :key="item.id" />

            <TreeItem
                v-if="model.sitetree_editor"
                :disabledTypes="firstLevelDisabledTypes" />
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import TreeItem from './TreeItem';
import { mapMutations } from 'vuex';
import draggable from 'vuedraggable'
import ModelLanguageSwitch from '@components/Partials/ModelLanguageSwitch.vue';

export default {
    props : ['model'],

    components : {
        TreeItem, draggable, ModelLanguageSwitch
    },

    mounted(){
        this.setModels(this.model.getData('sitetree_models'));
    },

    computed: {
        items(){
            return this.model.getRows();
        },
        firstLevel(){
            let items = _.filter(this.items, {
                parent_id : null
            });

            return items;
        },
        firstLevelDisabledTypes(){
            return ['url', 'model'];
        },
    },

    methods: {
        ...mapMutations('sitetree', [
            'setModels',
        ]),
    }
}
</script>

<style lang="scss" scoped>

</style>