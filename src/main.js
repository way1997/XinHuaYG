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
import {
  Lazyload
} from 'mint-ui'
import {
  Loadmore
} from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer';
import 'vue-directive-image-previewer/dist/assets/style.css';
import VueRouter from 'vue-router'
import VuePreview from 'vue-preview';
import VueFingerDirective from 'vue-finger-directive'

Vue.use(VueFingerDirective)
Vue.use(VuePreview)

Vue.prototype.axios = axios

fastclick.attach(document.body)

Vue.use(infiniteScroll)

Vue.use(Mint)

Vue.use(Vant);

Vue.use(Toast, {
  defaultType: 'center',
  duration: 2500,
  wordWrap: true
})

Vue.use(Lazyload, {
  error: require('assets/img/LODING.gif'),
  loading: require('assets/img/LODING.gif')
})
Vue.component(Loadmore.name, Loadmore);
Vue.config.productionTip = false
Vue.config.ignoredElements = ['wx-open-launch-weapp']

Vue.use(VueDirectiveImagePreviewer)


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 过滤器
import filter from "assets/js/filter"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
