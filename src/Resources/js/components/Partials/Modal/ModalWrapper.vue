<template>
<div>
    <Modal v-for="modal in modals" :key="modal.openedAt" :modal="modal" />
</div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import Modal from '@components/Partials/Modal.vue';

export default {
    components : { Modal },
    mounted(){
        console.log('modals');
    },
    computed : {
        ...mapState('modal', ['modals']),
    }
}
</script>