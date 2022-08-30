<template>
    <Modal :modal="modal">
        <table class="table data-table table-bordered table-striped">
            <thead>
                <tr>
                    <th class="td-id">{{ trans('number') }}</th>
                    <th>{{ trans('history.who') }}</th>
                    <th>{{ __('Akcia') }}</th>
                    <th>{{ trans('history.count') }}</th>
                    <th>{{ trans('history.date') }}</th>
                    <th class="th-history-buttons"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, $index) in sortedHistory" :key="row.id" :data-history-id="row.id">
                    <td class="td-id">{{ history.rows.length - $index }}</td>
                    <td>{{ row.user ? row.user.username : trans('history.system') }}</td>
                    <td>{{ row.actionName }}</td>
                    <td data-changes-length>
                        <span data-toggle="tooltip" title="" :data-original-title="changedFields(row)" v-if="isEditableAction(row)">
                            {{ row.changedFields.length }} <i class="fa fa-eye"></i>
                        </span>
                    </td>
                    <td>{{ date(row.created_at) }}</td>
                    <td>
                        <div class="history-actions">
                            <button v-if="isEditableAction(row)" type="button" @click="applyChanges(row)" class="btn btn-sm btn-success" :class="{ 'enabled-history' : history.history_id == row.id }" data-toggle="tooltip" :title="trans('history.show')">
                                <i class="fa fa-eye"></i>
                            </button>

                            <button type="button" v-if="canDeleteHistoryItem(row, $index)" @click="deleteHistoryRow(row)" class="btn btn-sm btn-danger" data-toggle="tooltip" :title="_('Zmazať zmenu z histórie')">
                                <i class="far fa-trash-alt"></i>
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
    props : ['modal', 'model'],

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
        canDeleteHistoryItem(item, index){
            //We cannot delete last item
            if ( index + 1 == this.history.rows.length ) {
                return false;
            }

            //We need has delete permissions
            return this.getFreshModel('models_histories').hasAccess('delete');
        },
        async applyChanges(item){
            this.history.fields = item.changedFields;
            this.history.history_id = item.id;

            await this.model.selectRow(
                { id : this.history.id },
                null,
                null,
                item.id, this.model.getRow()
            );

            this.closeModal({ modal : this.modal });
        },
        deleteHistoryRow(row){
            this.warningModal({
                message : this.trans('delete-warning'),
                success: () => {
                    this.$http.post(this.$root.requests.removeFromHistory, {
                        model : this.model.table,
                        id : row.id,
                    })
                    .then(response => {
                        var data = response.data;

                        this.history.rows = data;
                    })

                    .catch(response => {
                        $app.errorResponseLayer(response);
                    });
                },
                close : true
            });
        },
        date(date){
            return moment(date).format('D.M.Y H:mm');
        },
        changedFields(items){
            var changes = [];

            for ( var k in items.changedFields ) {
                var key = items.changedFields[k];

                if ( key in this.model.fields ) {
                    changes.push(this.model.fields[key].name);
                } else {
                    changes.push(key);
                }
            }

            return changes.join(', ');
        },
        isEditableAction(row){
            return ['insert', 'update'].includes(row.action);
        }
    },
}
</script>

<style lang="scss">
.message-modal {
    &[data-modal].--history {
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