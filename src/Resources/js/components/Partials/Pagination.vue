<template>
    <div>
        <ul v-if="rows.count>rows.limit" data-pagination class="pagination">
            <li data-pagination-prev :class="{ disabled : rows.page <= 1 }">
                <a class="page-link" v-on:click.prevent="model.setPage(rows.page - 1)"><i class="fa fa-chevron-left"></i></a>
            </li>
            <li v-bind:class="{ active : rows.page == i }" v-for="i in paginateItems">
                <a class="page-link" @click.prevent="model.setPage(i)">{{ i == 0 ? '...' : i }}</a>
            </li>
            <li data-pagination-next :class="{ disabled : rows.page > rows.count/rows.limit }">
                <a class="page-link" v-on:click.prevent="model.setPage(rows.page + 1)"><i class="fa fa-chevron-right"></i></a>
            </li>
        </ul>
    </div>
</template>

<script type="text/javascript">
export default {
    props : ['model'],

    mounted(){

    },

    computed: {
        rows(){
            return this.model.getData('rows');
        },
        paginateItems(){
            if ( !this.rows.limit ){
                return [];
            }

            var items = [];

            for ( var i = 1; i <= Math.ceil(this.rows.count / this.rows.limit); i++ ) {
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
        showLimit(i){
            var max = Math.ceil(this.rows.count / this.rows.limit);

            //If is first or last page, then show it
            if ( i == 1 || i == max )
                return true;

            //Middle range
            var radius = max < 1000 ? 3 : (max < 1500 ? 2 : 1),
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


            var maxpages = this.rows.maxpages - (in_middle_active * radius),
                maxpages = maxpages < 6 ? 6 : maxpages;

            var offset = this.rows.page < (maxpages/2) ? (maxpages/2) - this.rows.page : 0,
                offset = max - this.rows.page < ( maxpages / 2 ) ? (maxpages/2) - (max - this.rows.page) : offset;

            var disabledFromLeft = this.rows.page - offset >= i + Math.ceil(maxpages/2) - 1,
                disabledFromRight = this.rows.page < i - (maxpages/2) - offset;

            if ( disabledFromLeft || disabledFromRight ) {
                return false;
            }

            return true;
        },
    }
}
</script>