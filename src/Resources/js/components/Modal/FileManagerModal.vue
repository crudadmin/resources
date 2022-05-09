<template>
    <Modal :modal="modal" :options="{ actions : false, escClose : true }">
        <iframe :src="url"></iframe>
    </Modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props : ['modal', 'url'],

    computed: {},

    destroyed(){},

    methods: {},
}
</script>

<style lang="scss">
[data-modal].--fileManager {
    iframe {
        border: 0;
        width: 100%;
        min-height: 40rem;
        height: calc(100vh - 20rem);
    }

    .modal-body {
        padding: 0;
    }
}
</style>