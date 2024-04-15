<template>
    <div>
        <button v-if="hasProgress" type="button" data-action-type="updating" :class="['btn', 'btn-' + (model.isOpenedRow() ? 'success' : 'primary')]">
            <i class="fa fa-spin fa-sync mr-1"></i>
            {{ sendingButtonText }}
        </button>
        <button
            v-else
            type="submit"
            :data-action-type="model.isOpenedRow() ? 'update' : 'create'"
            name="submit"
            class="btn btn-primary"
            :form="model.getFormId()"
        >
            {{ model.isOpenedRow() ? saveButtonText : sendButtonText }}
        </button>
    </div>
</template>

<script type="text/javascript">
export default {
    props: ['model'],

    computed: {
        progress() {
            return this.model.getData('progress');
        },
        hasProgress() {
            return _.isNumber(this.progress) || this.progress === true;
        },
        saveButtonText() {
            return this.model.getSettings('buttons.update') || this.trans('save');
        },
        sendButtonText() {
            return this.model.getSettings('buttons.insert') || this.trans('send');
        },
        sendingButtonText() {
            let text = this.model.isOpenedRow() ? this.trans('saving') : this.trans('sending');

            return text + (_.isNumber(this.progress) ? ' (' + this.progress + '%)' : '');
        },
    },
};
</script>
