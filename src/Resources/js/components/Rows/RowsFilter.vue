<template>
    <div class="buttons-wrapper" v-show="filtersValues.length">
        <div v-if="filtersValues.length <= model.getSettings('filter.max_buttons', 5)">
            <button
                v-for="(filter, key) in filters"
                @click="setFilter(key)"
                data-toggle="tooltip"
                :title="filter.title"
                type="button"
                class="btn"
                :class="[filter.class, {
                    'btn--icon' : filter.icon || filter.color,
                    'btn-default': filterId.includes(key),
                    'btn-secondary': !filterId.includes(key),
                }]"
            >
                <i class="fa" :class="filter.icon" v-if="filter.icon"></i>
                <i v-else-if="filter.color" class="--dot" :style="{ backgroundColor : filter.color }"></i>
                {{ filter.name }}
            </button>
        </div>
        <div v-else>
            <div class="dropdown fields-list">
                <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    {{ filterId.length == 0 ? __('Vyberte filter') : __('Upravte filter (%s)', filterId.length) }}
                    <i class="--icon-right fa fa-angle-down"></i>
                </button>
                <ul class="dropdown-menu menu-left dropdown-menu-right">
                    <li @click="$event.stopPropagation()" v-for="(filter, key) in filters" :class="{ active : filterId.includes(key) }" class="--no-item-padding">
                        <label class="--dropdown-item-padding --dropdown-item-vertical" @click="setFilter(key)">
                            <div v-if="hasAnyIconOrColor" class="icon-wrapper --icon-left">
                                <i class="fa" :class="filter.icon" v-if="filter.icon"></i>
                                <i v-else-if="filter.color" class="--dot" :style="{ backgroundColor : filter.color }"></i>
                            </div>
                            {{ filter.name }}
                        </label>
                    </li>
                    <li class="default-reset" @click.prevent="setFilter()">
                        <a>
                            {{ __('Resetovať') }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    props: ['model'],

    data() {
        return {
            filterId: [],
        };
    },
    computed : {
        filters(){
            return (this.model.getSettings('rows.filter.items')||[]);
        },
        filtersValues(){
            return Object.values(this.filters);
        },
        hasAnyIconOrColor(){
            return this.filtersValues.filter(item => item.color||item.icon).length > 0;
        }
    },
    methods: {
        setFilter(filterId) {
            if ( _.isNil(filterId) ) {
                this.filterId = [];
            } if ( this.model.getSettings('rows.filter.single') ){
                this.filterId = this.filterId.includes(filterId) == false ? [filterId].filter(item => !_.isNil(item)) : [];
            } else {
                this.filterId = _.xor(this.filterId, [filterId]).filter(item => !_.isNil(item));
            }

            if ( this.filterId.length ){
                this.model.setScope('filterProperty', this.filterId.join(','));
            } else {
                this.model.removeScope('filterProperty');
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.buttons-wrapper {
    button {
        display: inline-flex;
        align-items: center;

        &:not(:last-child) {
            margin-right: 1rem;
        }
    }
}

.--dot {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    display: block;
}

.dropdown-menu {
    .icon-wrapper {
        margin-right: 10px;
        min-width: 1rem;
    }

    label {
        cursor: pointer;
    }
}
</style>