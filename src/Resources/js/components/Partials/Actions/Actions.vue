<template>
    <div :class="{ '--active': model.isActiveRow(row), '--history-active': model.isActiveRow(row) && history.history_id }">
        <!-- display row -->
        <div class="buttons-options__item" v-if="model.isEditable() || model.isDisplayable()">
            <button
                data-button="edit"
                :data-id="row.id"
                type="button"
                @click="model.selectRow(row)"
                :class="['btn', 'btn-sm', { 'btn-primary': model.isActiveRow(row), 'btn-light-default': !model.isActiveRow(row) }]"
                data-toggle="tooltip"
                title=""
                :data-original-title="model.hasAccess('update') && model.isEditable() ? trans('edit') : trans('show')"
            >
                <i :class="{ 'fas fa-spinner fa-spin': loadingRow == row.id, 'far fa-edit': loadingRow != row.id }"></i>
            </button>
        </div>

        <!-- gettext -->
        <div class="buttons-options__item" v-if="canShowGettext">
            <button
                data-button="gettext"
                type="button"
                v-on:click="model.openGettextEditor(row)"
                class="btn btn-sm btn-light-default"
                data-toggle="tooltip"
                title=""
                :data-original-title="trans('gettext-update')"
            >
                <i class="fa fa-globe-americas"></i>
            </button>
        </div>

        <!-- info -->
        <div class="buttons-options__item" v-if="canShowInfo">
            <button
                type="button"
                data-button="show"
                v-on:click="showInfo(row)"
                class="btn btn-sm btn-light-default"
                data-toggle="tooltip"
                title=""
                :data-original-title="trans('row-info')"
            >
                <i class="far fa-question-circle"></i>
            </button>
        </div>

        <!-- actions -->
        <div class="buttons-options__item" v-for="(button, buttonKey) in model.getButtonsForRow(row)">
            <buttons-action :button="button" :row="row" :buttonKey="buttonKey" :model="model" />
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    props: ['model', 'row'],
    computed: {
        loadingRow() {
            return this.model.getData('loadingRow');
        },
        history() {
            return this.model.getData('history');
        },
        isEnabledHistory() {
            //Check if history is enabled, and user has acces to read data from history
            return this.model.history == true && this.getFreshModel('models_histories').hasAccess('read');
        },
        canShowGettext() {
            if (['languages', 'admin_languages'].indexOf(this.model.slug) > -1 && this.$root.gettext == true && this.model.hasAccess('update')) {
                return true;
            }

            return false;
        },
        canShowInfo() {
            if (this.model.getSettings('dates') == true) {
                return true;
            }

            return false;
        },
    },
    methods: {
        getDateByField(row, key) {
            if (key in this.model.fields) {
                return row[key];
            }

            return moment(row[key]).format('DD.MM.Y HH:mm');
        },
        showInfo(row) {
            var data = '';

            if (row.created_at != null) data += this.trans('created-at') + ': <strong>' + this.getDateByField(row, 'created_at') + '</strong><br>';

            if (row.updated_at != null && this.model.editable != false)
                data += this.trans('last-change') + ': <strong>' + this.getDateByField(row, 'updated_at') + '</strong><br>';

            if (row.published_at != null) data += this.trans('published-at') + ': <strong>' + this.getDateByField(row, 'published_at') + '</strong>';

            this.openModal({
                title: this.trans('row-info-n') + ' ' + row.id,
                message: data,
                type: 'primary',
            });
        },
    },
};
</script>
