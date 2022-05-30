<template>
    <div class="buttons-wrapper">
        <button
            v-for="(filter, key) in model.getSettings('rows.filter.items')"
            @click="setFilter(key)"
            data-toggle="tooltip"
            :title="filter.title"
            type="button"
            class="btn mr-1"
            :class="[filter.class, {
                'btn--icon' : filter.icon || filter.color,
                'btn-primary': filterId.includes(key),
                'btn-default': !filterId.includes(key),
            }]"
        >
            <i class="fa" :class="filter.icon" v-if="filter.icon"></i>
            <i v-else-if="filter.color" class="--dot" :style="{ backgroundColor : filter.color }"></i>
            {{ filter.name }}
        </button>
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
    methods: {
        setFilter(filterId) {
            if ( this.model.getSettings('rows.filter.single') ){
                this.filterId = this.filterId.includes(filterId) == false ? [filterId] : [];
            } else {
                this.filterId = _.xor(this.filterId, [filterId]);
            }

            this.model.setScope('filterProperty', this.filterId.join(','));

            this.model.loadRows();
        },
    },
};
</script>

<style lang="scss" scoped>
button {
    display: inline-flex;
    align-items: center;

    .--dot {
        width: 8px;
        height: 8px;
        border-radius: 100%;
        display: block;
    }
}
</style>