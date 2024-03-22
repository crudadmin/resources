<template>
<button
    type="button"
    :data-button="'action-'+button.key"
    @click="model.buttonAction(button.key, row)"
    :class="['btn', 'btn-sm', buttonClass(button)]"
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
    },

    methods : {
        buttonClass(button){
            let name = button.class;

            name = name.replace('primary', 'light-primary');
            name = name.replace('info', 'light-info');
            name = name.replace('warning', 'light-warning');
            name = name.replace('danger', 'light-danger');
            name = name.replace('default', 'light-default');

            return name;
        }
    }
}
</script>