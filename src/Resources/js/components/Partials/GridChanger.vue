<template>
<!-- Grid size -->
<ul class="change-grid-size d-none d-lg-flex">
    <li
        v-for="size in sizes"
        :data-size="size.key"
        v-if="!size.disabled"
        :class="{ 'active' : size.active, 'disabled' : size.disabled }"
        data-toggle="tooltip"
        :data-original-title="size.name"
        @click="changeSize(size)">
        <GridIcons :type="size.key" :active="size.active" />
    </li>
</ul>
</template>

<script>
import GridIcons from './GridIcons.vue';

export default {
    props : ['sizes'],
    components : {GridIcons},
    methods : {
        changeSize(row){
            if ( row.disabled == true ){
                return false;
            }

            for ( var key in this.sizes ) {
                this.sizes[key].active = false;
            }

            row.active = true;
        },
    }
}
</script>