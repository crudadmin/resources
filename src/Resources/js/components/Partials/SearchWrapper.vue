<template>
<div class="searchbar__wrapper" :class="{ '--hasMoreButton' : model.getData('searching') }" v-show="model.canShowSearchBar()">
    <div class="searchbar__wrapper__queries">
        <search
            v-for="(query, $index) in search.queries"
            :key="$index"
            :search="query"
            :model="model"
        ></search>
    </div>
    <button
        data-toggle="tooltip"
        :data-original-title="_('Pridať ďalšie vyhľadávacie pravidlo')"
        v-if="model.getData('searching')"
        type="button"
        class="btn btn-primary --addQuery"
        @click="addSearchQuery">
        <i class="fa fa-plus"></i>
    </button>
</div>
</template>

<script>
import Search from './Search.vue';
import _ from 'lodash';
import { defaultSearchQuery } from '@components/Helpers/Model/Model';

export default {
    props : ['model'],
    components : { Search },
    created(){
        //Set default search query
        if ( this.model.getData('search').queries.length == 0 ) {
            this.model.getData('search').queries.push({
                ..._.cloneDeep(defaultSearchQuery),
                column : this.model.getSettings('search.column', null),
            });
        }
    },
    computed: {
        search(){
            return this.model.getData('search');
        },
    },
    methods : {
        addSearchQuery(){
            this.model.getData('search').queries.push(
                _.cloneDeep(defaultSearchQuery),
            );
        },
    }
}
</script>

<style scoped lang="scss">
.searchbar__wrapper {
    display: flex;

    &__queries {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    &.--hasMoreButton {
        .searchbar__wrapper__queries {
            margin-right: $navbarPadding / 2;
            margin-bottom: -($navbarPadding / 2);
        }

        .search-bar {
            margin-bottom: $navbarPadding / 2;
        }
    }

    .--addQuery {
        border-radius: 0;
    }
}
</style>