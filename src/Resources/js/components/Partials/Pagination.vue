<template>
    <div>
        <ul v-if="rows.count>pagination.limit" data-pagination class="pagination">
            <li data-pagination-prev :class="{ disabled : pagination.position <= 1 }">
                <a class="page-link" v-on:click.prevent="setPosition(pagination.position - 1)"><i class="fa fa-chevron-left"></i></a>
            </li>
            <li v-bind:class="{ active : pagination.position == i }" v-for="i in paginateItems">
                <a class="page-link" @click.prevent="setPosition(i)">{{ i == 0 ? '...' : i }}</a>
            </li>
            <li data-pagination-next :class="{ disabled : pagination.position > rows.count/pagination.limit }">
                <a class="page-link" v-on:click.prevent="setPosition(pagination.position + 1)"><i class="fa fa-chevron-right"></i></a>
            </li>
        </ul>
    </div>
</template>

<script type="text/javascript">
export default {
    props : ['rows', 'pagination'],

    mounted(){

    },

    computed: {
        paginateItems(){
            var items = [];

            for ( var i = 1; i <= Math.ceil(this.rows.count / this.pagination.limit); i++ ) {
                if ( this.showLimit(i) ) {
                    items.push(i);
                } else if ( items[items.length-1] != 0 ) {
                    items.push(0);
                }
            }

            return items;
        }
    },

    methods : {
        setPosition(position){
            this.$parent.setPosition(position);
        },
        showLimit(i){
            var max = Math.ceil(this.rows.count / this.pagination.limit);

            //If is first or last page, then show it
            if ( i == 1 || i == max )
                return true;

            //Middle range
            var radius = 3,
                interval = [[100, 0.3], [100, 0.7], [1000, 0.1], [1000, 0.85]],
                in_middle_active = 0;

            for (var a = 0; a < interval.length; a++) {
                if ( max > interval[a][0] )
                {
                    var level = parseInt(max * interval[a][1]);
                    if ( i >= level && i < level + radius )
                        return true;

                    in_middle_active++;
                }
            }


            var maxpages = this.pagination.maxpages - (in_middle_active * radius),
                maxpages = maxpages < 6 ? 6 : maxpages;

            var offset = this.pagination.position < (maxpages/2) ? (maxpages/2) - this.pagination.position : 0,
                offset = max - this.pagination.position < ( maxpages / 2 ) ? (maxpages/2) - (max - this.pagination.position) : offset;

            var disabledFromLeft = this.pagination.position - offset >= i + Math.ceil(maxpages/2) - 1,
                disabledFromRight = this.pagination.position < i - (maxpages/2) - offset;

            if ( disabledFromLeft || disabledFromRight )
                return false;

            return true;
        },
    }
}
</script>