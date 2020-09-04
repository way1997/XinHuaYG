import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'indexPage'
    },
    {
      path: '/indexPage',
      name: 'indexPage',
      component: (indexPage) => require(['@/patientPage/indexPage'], indexPage)
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: (homePage) => require(['@/doctorPage/homePage'], homePage)
    },
    {
      path: '/houzhen',
      name: 'houzhen',
      component: (houzhen) => require(['@/doctorPage/houzhen'], houzhen)
    },
    {
      path: '/zaixiankf',
      name: 'zaixiankf',
      component: (zaixiankf) => require(['@/doctorPage/zaixiankf'], zaixiankf)
    },
    {
      path: '/huanzhe',
      name: 'huanzhe',
      component: (huanzhe) => require(['@/doctorPage/huanzhe'], huanzhe)
    },
    {
      path: '/zixun',
      name: 'zixun',
      component: (zixun) => require(['@/doctorPage/zixun'], zixun)
    },
    {
      path: '/huanzheInfo',
      name: 'huanzheInfo',
      component: (huanzheInfo) => require(['@/doctorPage/huanzheInfo'], huanzheInfo)
    },
    {
      path: '/yaofangDetail',
      name: 'yaofangDetail',
      component: (yaofangDetail) => require(['@/doctorPage/yaofangDetail'], yaofangDetail)
    },
    {
      path: '/moban',
      name: 'moban',
      component: (moban) => require(['@/doctorPage/moban'], moban)
    },
    {
      path: '/mobanList',
      name: 'mobanList',
      component: (mobanList) => require(['@/doctorPage/mobanList'], mobanList)
    },
    {
      path: '/addMoban',
      name: 'addMoban',
      component: (addMoban) => require(['@/doctorPage/addMoban'], addMoban)
    },
    {
      path: '/bianjiCenter',
      name: 'bianjiCenter',
      component: (bianjiCenter) => require(['@/doctorPage/bianjiCenter'], bianjiCenter)
    },
    {
      path: '/paizhaokf',
      name: 'paizhaokf',
      component: (paizhaokf) => require(['@/doctorPage/paizhaokf'], paizhaokf)
    },
    {
      path: '/liwushu',
      name: 'liwushu',
      component: (liwushu) => require(['@/doctorPage/liwushu'], liwushu)
    },
    {
      path: '/chufangshu',
      name: 'chufangshu',
      component: (chufangshu) => require(['@/doctorPage/chufangshu'], chufangshu)
    },
    {
      path: '/chakanCf',
      name: 'chakanCf',
      component: (chakanCf) => require(['@/doctorPage/chakanCf'], chakanCf)
    },
    {
      path: '/myjifen',
      name: 'myjifen',
      component: (myjifen) => require(['@/doctorPage/myjifen'], myjifen)
    },
    {
      path: '/bukejian',
      name: 'bukejian',
      component: (bukejian) => require(['@/doctorPage/bukejian'], bukejian)
    },
    {
      path: '/zixunHuan',
      name: 'zixunHuan',
      component: (zixunHuan) => require(['@/doctorPage/zixunHuan'], zixunHuan)
    },
    {
      path: '/liaotian',
      name: 'liaotian',
      component: (liaotian) => require(['@/doctorPage/liaotian'], liaotian)
    },
    {
      path: '/tiaoli',
      name: 'tiaoli',
      component: (tiaoli) => require(['@/doctorPage/tiaoli'], tiaoli)
    },
    {
      path: '/querenchufang',
      name: 'querenchufang',
      component: (querenchufang) => require(['@/doctorPage/querenchufang'], querenchufang)
    },
    {
      path: '/paizhaoXq',
      name: 'paizhaoXq',
      component: (paizhaoXq) => require(['@/doctorPage/paizhaoXq'], paizhaoXq)
    },
    //患者端
    // {
    //   path: '/indexPage',
    //   name: 'indexPage',
    //   component: (indexPage) => require(['@/patientPage/indexPage'], indexPage)
    // },
    {
      path: '/myDoctor',
      name: 'myDoctor',
      component: (myDoctor) => require(['@/patientPage/myDoctor'], myDoctor)
    },
    {
      path: '/yishengXq',
      name: 'yishengXq',
      component: (yishengXq) => require(['@/patientPage/yishengXq'], yishengXq)
    },
    {
      path: '/remenJb',
      name: 'remenJb',
      component: (remenJb) => require(['@/patientPage/remenJb'], remenJb)
    },
    {
      path: '/zhaoyisheng',
      name: 'zhaoyisheng',
      component: (zhaoyisheng) => require(['@/patientPage/zhaoyisheng'], zhaoyisheng)
    },
    {
      path: '/chachufang',
      name: 'chachufang',
      component: (chachufang) => require(['@/patientPage/chachufang'], chachufang)
    },
    {
      path: '/chufangXq',
      name: 'chufangXq',
      component: (chufangXq) => require(['@/patientPage/chufangXq'], chufangXq)
    },
    {
      path: '/wenzhangXq',
      name: 'wenzhangXq',
      component: (wenzhangXq) => require(['@/patientPage/wenzhangXq'], wenzhangXq)
    },
    {
      path: '/dingdan',
      name: 'dingdan',
      component: (dingdan) => require(['@/patientPage/dingdan'], dingdan)
    },
    {
      path: '/zitidian',
      name: 'zitidian',
      component: (zitidian) => require(['@/patientPage/zitidian'], zitidian)
    },
    {
      path: '/peisongDizhi',
      name: 'peisongDizhi',
      component: (peisongDizhi) => require(['@/patientPage/peisongDizhi'], peisongDizhi)
    },
    {
      path: '/address',
      name: 'address',
      component: (address) => require(['@/patientPage/address'], address)
    },
    {
      path: '/addDizhi',
      name: 'addDizhi',
      component: (addDizhi) => require(['@/patientPage/addDizhi'], addDizhi)
    },
    {
      path: '/mine',
      name: 'mine',
      component: (mine) => require(['@/patientPage/mine'], mine)
    },
    {
      path: '/jiuzhenren',
      name: 'jiuzhenren',
      component: (jiuzhenren) => require(['@/patientPage/jiuzhenren'], jiuzhenren)
    },
    {
      path: '/daxieYs',
      name: 'daxieYs',
      component: (daxieYs) => require(['@/patientPage/daxieYs'], daxieYs)
    },
    {
      path: '/buyLiwu',
      name: 'buyLiwu',
      component: (buyLiwu) => require(['@/patientPage/buyLiwu'], buyLiwu)
    },
    {
      path: '/lookYaofang',
      name: 'lookYaofang',
      component: (lookYaofang) => require(['@/patientPage/lookYaofang'], lookYaofang)
    },
    {
      path: '/jiankangda',
      name: 'jiankangda',
      component: (jiankangda) => require(['@/patientPage/jiankangda'], jiankangda)
    },
    {
      path: '/chengyuanxinxi',
      name: 'chengyuanxinxi',
      component: (chengyuanxinxi) => require(['@/patientPage/chengyuanxinxi'], chengyuanxinxi)
    },
    {
      path: '/chengyuanadd',
      name: 'chengyuanadd',
      component: (chengyuanadd) => require(['@/patientPage/chengyuanadd'], chengyuanadd)
    },
    {
      path: '/jibingAdd',
      name: 'jibingAdd',
      component: (jibingAdd) => require(['@/patientPage/jibingAdd'], jibingAdd)
    },
    {
      path: '/jiwangbingshi',
      name: 'jiwangbingshi',
      component: (jiwangbingshi) => require(['@/patientPage/jiwangbingshi'], jiwangbingshi)
    },
    {
      path: '/jiazubingshi',
      name: 'jiazubingshi',
      component: (jiazubingshi) => require(['@/patientPage/jiazubingshi'], jiazubingshi)
    },
    {
      path: '/guominshi',
      name: 'guominshi',
      component: (guominshi) => require(['@/patientPage/guominshi'], guominshi)
    },
    {
      path: '/wenzhenZx',
      name: 'wenzhenZx',
      component: (wenzhenZx) => require(['@/patientPage/wenzhenZx'], wenzhenZx)
    },
		  {
      path: '/wsgrxx',
      name: 'wsgrxx',
      component: (wsgrxx) => require(['@/patientPage/wsgrxx'], wsgrxx)
    },
    { //账号认证vant
      path: '/renzhengUser',
      name: 'renzhengUser',
      component: (renzhengUser) => require(['@/doctorPage/renzhengUser'], renzhengUser)
    },
    { //证书认证vant
      path: '/zhengshurenzheng',
      name: 'zhengshurenzheng',
      component: (zhengshurenzheng) => require(['@/doctorPage/zhengshurenzheng'], zhengshurenzheng)
    }
  ]
})
