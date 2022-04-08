<template>
    <div>
        <button
            v-for="(filter, key) in model.getSettings('rows.filters.items')"
            @click="setFilter(key)"
            data-toggle="tooltip"
            :title="filter.title"
            type="button"
            class="btn mr-1"
            :class="[filter.class, {
                'btn--icon' : filter.icon,
                'btn-primary': filterId.includes(key),
                'btn-default': !filterId.includes(key),
            }]"
        >
            <i class="fa" :class="filter.icon" v-if="filter.icon"></i>
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
            if ( this.model.getSettings('rows.filters.single') ){
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

<style lang="scss" scoped></style>