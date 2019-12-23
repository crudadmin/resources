<template>
    <div class="alert alert-warning --mb" v-if="isDifferent">
        <p><i class="icon fa" :class="faMigrator('fa-warning')"></i> <strong>Oooops!</strong></p>
        <p>Vaša nainštalovaná verzia administrácie <strong>CrudAdmin {{ version }}</strong> v systéme Laravel sa nezhoduje s verziou <strong v-if="version_assets">({{ version_assets }})</strong> v public priečinku.<br>
        Z dôvodu lepšej stability odporúčame spustiť príkaz <strong>php artisan admin:update</strong> pre synchronizáciu vendor priečinkov.</p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            version : this.$root.version_resources,
            version_assets : this.$root.version_assets,
        };
    },

    computed: {
        isDifferent(){
            if ( this.version == 'dev-master' )
                return false;

            return this.version != this.version_assets;
        },
    },
}
</script>