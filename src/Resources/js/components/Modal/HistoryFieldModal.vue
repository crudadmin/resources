<template>
    <Modal :modal="modal">
        <table class="table data-table table-bordered table-striped">
            <thead>
                <tr>
                    <th class="td-id">{{ trans('number') }}</th>
                    <th>{{ trans('history.who') }}</th>
                    <th>{{ __('Hodnota') }}</th>
                    <th>{{ trans('history.date') }}</th>
                    <th class="th-history-buttons"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, $index) in sortedHistory" :key="row.id" :data-history-id="row.id">
                    <td class="td-id">{{ history.rows.length - $index }}</td>
                    <td>{{ row.user ? row.user.username : trans('history.system') }}</td>
                    <td>
                        <!-- We need use form, to fix multiple radio names -->
                        <form>
                            <form-input-builder
                                v-for="langslug in model.getFieldLangs(field_key)"
                                :key="langslug"
                                :model="historyModel(row)"
                                :langslug="langslug"
                                :index="$index"
                                :field_key="field_key"
                                :field="historyModel(row).fields[field_key]">
                            </form-input-builder>
                        </form>
                    </td>
                    <td>{{ date(row.created_at) }}</td>
                    <td>
                        <div class="history-actions">
                            <button type="button" @click="applyChanges(row)" class="btn btn-sm btn-success" :class="{ 'enabled-history' : history.history_id == row.id }" data-toggle="tooltip" :title="trans('history.show')">
                                <i class="fa fa-eye"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </Modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props : ['modal', 'model', 'field_key'],

    computed: {
        history(){
            return this.model.getData('history');
        },
        sortedHistory(){
            return _.orderBy(this.history.rows, 'id', 'desc');
        }
    },

    destroyed(){
        this.model.closeHistory(true);
    },

    methods: {
        ...mapActions('modal', ['closeModal']),
        historyModel(row){
            if ( !this._historyModel ){
                this._historyModel = {};
            }

            if ( !this._historyModel[row.id] ){
                this._historyModel[row.id] = _.cloneDeep(this.model);
            }

            let model = this._historyModel[row.id];

            model.setRow(row.fieldRow);

            let field = model.fields[this.field_key];

            field.value = row.fieldRow[this.field_key];
            field.disabled = true;
            field.readonly = true;
            field.label.visible = false;

            return model;
        },
        async applyChanges(item){
            this.history.fields = item.changedFields;
            this.history.history_id = item.id;

            await this.model.selectRow(
                { id : this.history.id },
                null,
                item.id
            );

            this.closeModal({ modal : this.modal });
        },
        date(date){
            return moment(date).format('D.M.Y H:mm');
        },
    },
}
</script>

<style lang="scss">
.message-modal {
    &[data-modal].--history-field {
        .modal-dialog {
            table {
                background: white;
                width: 100%;
                max-width: 100%;
                margin-bottom: 0;
            }

            .modal-body {
                max-height: 380px;
                overflow-y: auto;

                .form-group {
                    margin-bottom: 0;
                }
            }

            .history-actions {
                display: flex;
                justify-content: flex-end;

                button:not(:last-child) {
                    margin-right: 3px;
                }
            }
        }
    }

    .th-history-buttons { width: 51px }
}
</style>