<template>
    <div>
        <!-- Content Header (dashboard header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li class="active"><a class="active">Dashboard</a></li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="crudadmin-wrapper" v-show="user">
            <div class="box" v-if="!layout">
                <div class="box-body">
                    <div class="box-body-wrapper">
                        <h2 v-if="user">{{ trans('welcome') }} {{ user.username }}</h2>
                    </div>
                </div>
            </div>

            <div v-html="layout"></div>
        </section>
        <!-- /.content -->
    </div>
</template>

<script>
    export default {
        props : ['langid'],

        mounted(){

        },

        computed: {
            user(){
                return this.$root.user;
            },
            layout(){
                this.$nextTick(() => {
                    this.$root.runInlineScripts(this.$root.dashboard)
                });

                return this.$root.dashboard;
            },
        },

        methods: {
            trans(key){
                return this.$root.trans(key);
            }
        }
    }
</script>