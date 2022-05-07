<template>
    <Modal :modal="modal">
        <table class="table data-table table-bordered table-striped">
            <thead>
                <tr>
                    <th class="td-id">{{ trans('number') }}</th>
                    <th>{{ trans('history.who') }}</th>
                    <th>{{ trans('history.count') }}</th>
                    <th>{{ trans('history.date') }}</th>
                    <th class="th-history-buttons"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, $index) in sortedHistory" :key="item.id" :data-history-id="item.id">
                    <td class="td-id">{{ history.rows.length - $index }}</td>
                    <td>{{ item.user ? item.user.username : trans('history.system') }}</td>
                    <td data-changes-length>
                        <span data-toggle="tooltip" title="" :data-original-title="changedFields(item)">{{ item.changed_fields.length }} <i class="fa fa-eye"></i></span>
                    </td>
                    <td>{{ date(item.created_at) }}</td>
                    <td>
                        <div class="history-actions">
                            <button type="button" @click="applyChanges(item)" class="btn btn-sm btn-success" :class="{ 'enabled-history' : history.history_id == item.id }" data-toggle="tooltip" :title="trans('history.show')">
                                <i class="fa fa-eye"></i>
                            </button>

                            <button type="button" v-if="canDeleteHistoryItem(item, $index)" @click="deleteHistoryRow(item)" class="btn btn-sm btn-danger" data-toggle="tooltip" :title="_('Zmazať zmenu z histórie')">
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
            this.history.fields = item.changed_fields;
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

            for ( var k in items.changed_fields ) {
                var key = items.changed_fields[k];

                if ( key in this.model.fields ) {
                    changes.push(this.model.fields[key].name);
                } else {
                    changes.push(key);
                }
            }

            return changes.join(', ');
        }
    },
}
</script>

<style lang="scss">
.message-modal {
    &[data-modal].--history {
        .modal-dialog {
            max-width: 70rem;

            table {
                background: white;
                width: 100%;
                max-width: 70rem;
                margin-bottom: 0;
            }

            .modal-body {
                max-height: 380px;
                overflow-y: auto;
            }

            .history-actions {
                display: flex;

                button:not(:last-child) {
                    margin-right: 3px;
                }
            }
        }
    }

    .th-history-buttons { width: 51px }
}
</style>