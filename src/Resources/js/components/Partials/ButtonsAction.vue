<template>
<button
    type="button"
    :data-button="'action-'+button.key"
    @click="model.buttonAction(button.key, row)"
    :class="['btn', 'btn-sm', button.class]"
    data-toggle="tooltip"
    :data-html="button.tooltipEncode ? 'false' : 'true'"
    :data-original-title="button.name">
        <i :class="iconClasses"></i>
</button>
</template>

<script type="text/javascript">
export default {
    props : ['model', 'button', 'row'],

    computed: {
        iconClasses(){
            let loading = this.model.getData('button_loading');

            return [
                'fa',
                (
                    loading == this.model.getButtonKey(this.row.id, this.button)
                        ? 'fa-sync-alt'
                        : this.faMigrator(this.button.icon)
                ),
                {
                    'fa-spin' : loading == this.model.getButtonKey(this.row.id, this.button)
                }
            ];
        }
    }
}
</script>