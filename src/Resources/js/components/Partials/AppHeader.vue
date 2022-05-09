<template>
<!-- Main Header -->
<header class="main-header">
    <div class="main-header__wrapper">
        <nav class="navbar-left">
            <div class="mobile-menu d-flex d-md-none d-lg-none" @click="toggleMobileMenu">
                <i class="fa fa-bars" :class="{ 'fa-bars' : !isActiveMobileMenu, 'fa-times' : isActiveMobileMenu }"></i>
            </div>

            <!-- Logo -->
            <a href="#/dashboard" class="logo">
                <AppLogo v-if="isGlobalComponent('AppLogo')" :user="user">
                    <slot name="logo"></slot>
                </AppLogo>

                <slot name="logo" v-else></slot>
            </a>
        </nav>

        <!-- Header Navbar -->
        <nav class="navbar-right">
            <right-navbar :user="user" />
        </nav>
    </div>
</header>
</template>

<script type="text/javascript">
import RightNavbar from '@components/Partials/RightNavbar.vue';
import { mapState, mapMutations } from 'vuex';

export default {
    props : ['user'],
    components : {
        RightNavbar
    },
    computed : {
        ...mapState('header', [
            'isActiveMobileMenu',
        ]),
    },
    methods : {
        ...mapMutations('header', [
            'toggleMobileMenu',
        ]),
    }
}
</script>