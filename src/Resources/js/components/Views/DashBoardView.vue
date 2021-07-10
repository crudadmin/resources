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
            <div class="box" v-if="!isCustomLayout">
                <div class="box-body">
                    <div class="box-body-wrapper">
                        <h2 v-if="user">{{ trans('welcome') }} {{ user.username }}</h2>
                    </div>
                </div>
            </div>

            <div v-else>
                <div v-if="htmlLayout" v-html="htmlLayout"></div>
                <component v-if="dashboard.vue" :is="dashboard.vue"></component>
            </div>
        </section>
        <!-- /.content -->
    </div>
</template>

<script>
    export default {
        props : ['langid'],

        mounted(){
            console.log(this.dashboard);
        },

        computed: {
            user(){
                return this.$root.user;
            },
            dashboard(){
                return this.$root.dashboard;
            },
            isCustomLayout(){
                return this.dashboard;
            },
            htmlLayout(){
                if ( !(this.dashboard && this.dashboard.html) ) {
                    return;
                }

                this.$nextTick(() => {
                    this.$root.runInlineScripts(this.dashboard.html)
                });

                return this.dashboard.html;
            },
        },

        methods: {
            trans(key){
                return this.$root.trans(key);
            }
        }
    }
</script>