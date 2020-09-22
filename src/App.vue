<template>
<div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <info></info> -->
</div>
</template>

<script>
// import info from './components/info.vue'
import axios from 'axios'
export default {
    name: 'app',
    components: {
        // info
    },
    mounted() {},
    methods: {}
}
</script>

<style>
#app {
    /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
    /* -webkit-font-smoothing: antialiased; */
    /* -moz-osx-font-smoothing: grayscale; */
    height: 100%;
}
</style>
