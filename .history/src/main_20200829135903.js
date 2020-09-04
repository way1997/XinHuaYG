import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import fastclick from 'fastclick'
// import VueLazyLoad from 'vue-lazyLoad'
import infiniteScroll from 'vue-infinite-scroll'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import Mint from 'mint-ui'
import { Lazyload } from 'mint-ui'
import { Loadmore } from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.prototype.axios = axios

fastclick.attach(document.body)

Vue.use(infiniteScroll)

Vue.use(Mint)

Vue.use(Toast, {
    defaultType: 'center',
    duration: 2500,
    wordWrap: true
})

Vue.use(Lazyload, {
	error :require('assets/img/LODING.gif'),
	loading :require('assets/img/LODING.gif')
})
Vue.component(Loadmore.name, Loadmore);
Vue.config.productionTip = false
Vue.config.ignoredElements = ['wx-open-launch-weapp']

// 过滤器
import filter from "assets/js/filter"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
