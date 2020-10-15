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
import router from './router'
import $ from 'jquery'
import {
    Dialog
} from 'vant';
export default {
    name: 'app',
    components: {
        // info
    },
    data() {
        return {
            routePath: '',
            fromPath: '',
            toPath: '',
            showAlert: false
        }
    },
    created() {
        this.pushHistory();
    },
    mounted() {
        var that = this
        let historyObj = window.history.state
        // console.log(window.history, window.history.pushState)
        if (window.history && window.history.pushState) {
            $(window).on('popstate', function () {
                //alert('事件被触发')
                var hashLocation = location.hash;
                var hashSplit = hashLocation.split("#!/");
                var hashName = hashSplit[1];
                // that.fromPath = that.fromPath == undefined ? '/indexPage' : that.fromPath
                // console.log('hashLocation====' + hashLocation)
                // console.log('hashSplit====' + hashLocation)
                // console.log('hashName====' + hashName)
                // console.log('fromPath====' + that.fromPath)
                // console.log('toPath====' + that.toPath)
                if (hashName !== '') {
                    var hash = window.location.hash;
                    if (hash === '') {
                        var bol = confirm("是否退出该页面？");
                        if (bol) {
                            that.weixinClosePage()
                        } else {
                            that.$router.go(0);
                        }
                    }
                }
            });
            window.history.pushState('', null, '')
        }
    },
    methods: {
        pushHistory() {
            var state = {
                title: "title",
                url: "#"
            };
            window.history.replaceState(state, state.title, state.url);
        },
        realod() {
            var {
                search,
                href
            } = window.location;
            href = href.replace(/&?t_reload=(\d+)/g, '')
            window.location.href = href + (search ? '&' : '?') + "t_reload=" + new Date().getTime()
        },
        weixinClosePage() {
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', weixin_ClosePage, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', weixin_ClosePage);
                    document.attachEvent('onWeixinJSBridgeReady', weixin_ClosePage);
                }
            } else {
                this.weixin_ClosePage();
            }
        },
        weixin_ClosePage() {
            WeixinJSBridge.call('closeWindow');
        }
    },
    // 监听,当路由发生变化的时候执行
    watch: {
        $route(to, from) {
            let toPath = to.path
            let fromPath = from.path
            this.toPath = toPath
            this.fromPath = fromPath
            // console.log('let toPath===' + toPath)
            // console.log('let fromPath===' + fromPath)
            // alert(fromPath)

            if (fromPath == '/indexPage') {
                // this.lisPopstate()
                // console.log('程序被触发')

            } else {

            }
            // console.log(to.path);
            // window.addEventListener("popstate", function (e) {
            //     var bol = this.confirm("是否关闭当前页面"); //根据自己的需求实现自己的功能

            // }, false);
        }
    },
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
