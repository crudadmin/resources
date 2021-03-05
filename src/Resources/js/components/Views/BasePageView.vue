<template>
    <div>
        <!-- Content Header (model header) -->
        <section class="content-header" v-if="model">
            <ol class="breadcrumb">
                <li v-if="getGroup">{{ getGroup.name }}</li>
                <li class="active">
                    <a class="active">{{ model.name }}</a>
                    <span class="breadcrumb__title">{{ model.title }}</span>
                </li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="crudadmin-wrapper" v-if="model">
            <license></license>
            <check-assets-version v-if="version"></check-assets-version>
            <model-builder
                :key="model.slug"
                :model_builder="model"
                :langid="langid"
                dusk="model-builder"
                :data-model="model.table">
            </model-builder>
        </section>
        <!-- /.content -->
    </div>
</template>

<script>
import ModelBuilder from './ModelBuilder.vue';
import ModelHelper from '../Helpers/ModelHelper.js';
import License from '../Partials/License.vue';
import CheckAssetsVersion from '../Partials/CheckAssetsVersion.vue';

export default {
    name : 'base-page-view',

    props : ['langid'],

    components : { ModelBuilder, License, CheckAssetsVersion },

    mounted(){
        if ( typeof ga == 'function' ) {
            ga('send', 'pageview', 'auto');
        }
    },

    computed: {
        version(){
            return this.$root.version;
        },
        /*
         * Return model from actual page
         */
        model(){
            var model = _.cloneDeep(this.$root.models[this.$route.params.model]);

            return model ? ModelHelper(model) : null;
        },
        getGroup(){
            if ( this.model.slug in this.$root.models ) {
                return false;
            }

            for ( var key in this.$root.models ) {
                if ( this.model.slug in this.$root.models[key].submenu ) {
                    return this.$root.models[key];
                }
            }

            return false;
        }
    }
}
</script>