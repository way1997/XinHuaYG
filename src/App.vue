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
    }, // 监听,当路由发生变化的时候执行
}
</script>

<style>
#app {
    /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
    /* -webkit-font-smoothing: antialiased; */
    /* -moz-osx-font-smoothing: grayscale; */
    height: 100%;
}

/*图片预览 缩略图*/
.preview figure {
    float: left;
    width: 30%;
    height: calc(30vw - 0px);
    margin: 1.5%;
}

.preview figure img {
    width: 100%;
}
</style>
