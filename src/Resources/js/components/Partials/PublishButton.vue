<template>
    <button
        data-button="publishable"
        type="button"
        @click="model.togglePublishedAt(row.id)"
        :class="['btn', 'btn-sm', { 'btn-info' : !row.published_at, 'btn-warning' : row.published_at}]"
        :data-published="row.published_at ? 'true' : 'false'"
        data-toggle="tooltip"
        :data-original-title="row.published_at ? trans('hide') : trans('show')"
    >
        <i :class="{ 'fa' : true, 'fa-eye' : row.published_at, 'fa-eye-slash' : !row.published_at }"></i>
    </button>
</template>

<script type="text/javascript">
export default {
    props : ['model', 'row']
}
</script>