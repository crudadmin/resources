<template>
    <div class="box__overlay">
      <i class="fa fa-sync fa-spin"></i>
      <p>{{ trans('loading') }}</p>
    </div>
</template>

<script>
export default {
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.box__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.7);
    z-index: 100;

    p {
        position: absolute;
        top: calc(50% + 28px);
        text-align: center;
        width: 100%;
        font-weight: bold;
    }

    i {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -15px;
        margin-top: -15px;
        color: #000;
        font-size: 3rem;
    }
}
</style>