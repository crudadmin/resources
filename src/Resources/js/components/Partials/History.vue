<template>
    <div class="message-modal message-modal--history">
        <!-- MODAL -->
        <div class="modal modal-default" style="display: block">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ trans('history.changes') }}</h4>
                        <button type="button" class="close" @click="model.closeHistory(true)" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
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
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="model.closeHistory(true)" class="btn btn-primary">{{ trans('close') }}</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->
    </div>
</template>

<script>
export default {
    props : ['model'],

    computed: {
        history(){
            return this.model.getData('history');
        },
        sortedHistory(){
            return _.orderBy(this.history.rows, 'id', 'desc');
        }
    },

    methods: {
        canDeleteHistoryItem(item, index){
            //We cannot delete last item
            if ( index + 1 == this.history.rows.length ) {
                return false;
            }

            //We need has delete permissions
            return this.getFreshModel('models_histories').hasAccess('delete');
        },
        applyChanges(item){
            this.history.fields = item.changed_fields;
            this.history.history_id = item.id;

            eventHub.$emit('selectHistoryRow', {
                table : this.model.slug,
                row_id : this.history.id,
                history_id : item.id,
                row : this.model.getRow(),
            });
        },
        deleteHistoryRow(row){
            this.$root.openAlert(this.trans('warning'), this.trans('delete-warning'), 'warning', () => {
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
            }, true);
        },
        date(date){
            return moment(date).format('D.M.Y H:mm');
        },
        changedFields(items){
            var changes = [];

            for ( var k in items.changed_fields ) {
                var key = items.changed_fields[k];

                if ( key in this.$parent.model.fields ) {
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