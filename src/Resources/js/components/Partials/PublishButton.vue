<template>
    <button
        data-button="publishable"
        type="button"
        @click="model.togglePublishedAt(row.id)"
        :class="['btn', 'btn-sm', btnStateClass]"
        :data-published="row.published_at ? 'true' : 'false'"
        data-toggle="tooltip"
        :data-original-title="btnStateName"
    >
        <i :class="{ 'fa' : true, 'fa-eye' : row.published_at, 'fa-eye-slash' : !row.published_at }"></i>
    </button>
</template>

<script type="text/javascript">
export default {
    props : ['model', 'row'],
    computed: {
        isAdminPublished(){
            return (this.row.published_state||{}).av == 1;
        },
        btnStateClass(){
            if ( this.row.published_at ) {
                return 'btn-warning';
            }

            if ( this.isAdminPublished == true ) {
                return 'btn-danger';
            }

            return 'btn-info';
        },
        btnStateName(){
            if ( this.row.published_at ) {
                return this.trans('hide');
            }

            if ( this.isAdminPublished == true ) {
                return this.trans('publish');
            }

            return this.model.publishableState == true ? this.trans('publish-logged') : this.trans('publish');
        }
    }
}
</script>