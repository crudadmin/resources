<template>
<ul class="change-grid-size d-none d-lg-flex" v-if="model.isEnabledGrid()">
    <li
        v-for="size in sizes"
        :data-size="size.key"
        :key="size.key"
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
    props : ['model'],
    components : {GridIcons},
    mounted(){
        this.checkParentGridSize();
    },
    watch : {
        parentActiveGridSizes(){
            this.checkParentGridSize();
        },
    },
    computed: {
        sizes(){
            return this.model.getData('sizes');
        },
        parentModel(){
            return this.model.getParentModel();
        },
        parentActiveGridSizes(){
            let parentSizes = [],
                size = null,
                model = this.model;

            do {
                model = model?.getParentModel();

                size = model?.activeGridSize();

                if ( !_.isNil(size) ){
                    parentSizes.push(size);
                }
            } while (model && !_.isNil(size))

            return parentSizes;
        },
    },
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
        checkParentGridSize(){
            const parentSizes = this.parentActiveGridSizes,
                depthLevel = this.model.getData('depth_level');

            let disabledSizes = {};

            for ( var parentSize of parentSizes ) {
                for ( var key in this.sizes ){
                    const size = this.sizes[key];

                    //If grid parent size is on full width, then enable all grid sizes in this model
                    if ( parentSize == 0 && depthLevel <= 1 ) {
                        size.disabled = false;
                    }

                    //If grid parent size has small form, or model is sub in third level, then disable all except full screen
                    else if ( ([6, 8].includes(parentSize)) && [0].includes(size.size) == false ) {
                        disabledSizes[key] = true;
                    }

                    //Disable all small sizes
                    else if ( [0, 6].indexOf(size.size) === -1  ) {
                        disabledSizes[key] = true;
                    }

                    //Enable other options
                    else {
                        size.disabled = false;
                    }
                }
            }

            //Set final disabled states
            for ( var key in disabledSizes){
                this.sizes[key].disabled = true;
            }
        },
    }
}
</script>