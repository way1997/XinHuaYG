<template>
  <div class="TabBar">
    <div class="bottom-tab">
      <div class="tab-item" @click="didClickedItem(0)">
        <img :src="'/houzhen' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="在线咨询">
        <span :class="{active: '/houzhen' === $route.path}" style="font-size: 0.3rem;">候诊区</span>
      </div>
      <div class="tab-item" @click="didClickedItem(1)">
        <img :src="'/huanzhe' === $route.path ? tabBarImgArr[1].selected : tabBarImgArr[1].normal" alt="处方信息">
        <span :class="{active: '/huanzhe' === $route.path}" style="font-size: 0.3rem;">我的患者</span>
      </div>
      <div class="tab-item" @click="didClickedItem(2)">
        <img :src="'/zixunHuan' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal" alt="处方信息">
        <span :class="{active: '/zixunHuan' === $route.path}" style="font-size: 0.3rem;">咨询</span>
      </div>
      <!-- <div class="tab-item">
            <img :src="tabBarImgArr[2].normal" alt="咨询" style="margin-bottom:-0.06rem;">
            <span>
                <wx-open-launch-weapp
                    id="launch-btn"
                    username="gh_8d318250cbd9"
                    @launch="handleLaunchFn"
                    @error="handleErrorFn"
                    path="pages/shi/shi.html"
                    >
                    <script type="text/wxtag-template">
                        <style>.btn {border:none;background:none;color:#979797;font-size:0.36rem;margin-top:-4px;}</style>
                        <button class="btn">咨询</button>
                    </script>
                </wx-open-launch-weapp>
            </span>
        </div> -->
      <div class="tab-item" @click="didClickedItem(3)">
        <img :src="'/homePage' === $route.path ? tabBarImgArr[3].selected : tabBarImgArr[3].normal" alt="我的信息">
        <span :class="{active: '/homePage' === $route.path}" style="font-size: 0.3rem;">个人中心</span>
      </div>
    </div>
    <div class="tabNums" v-if="tabBarnum!=0">{{tabBarnum}}</div>
    <div class="totalNum" v-show="totalNum!=0">{{totalNum}}</div>
  </div>
</template>
<script>
  import {
    findPhotoPrescription,
    findChatPatient
  } from 'api/doctor'
  import router from '../router'
  import cookie from "js-cookie"
  import wx from "weixin-js-sdk"
  import $ from 'jquery'
  export default {
    name: "TabBar",
    props: [],
    data() {
      return {
        tabBarImgArr: [ //图片切换
          {
            normal: require('../assets/img/houzhen.png'),
            selected: require('../assets/img/houzhen1.png')
          },
          {
            normal: require('../assets/img/huanzhe.png'),
            selected: require('../assets/img/huanzhe1.png')
          },
          {
            normal: require('../assets/img/xiaoxi.png'),
            selected: require('../assets/img/xiaoxi1.png')
          },
          {
            normal: require('../assets/img/user.png'),
            selected: require('../assets/img/user1.png')
          }
        ],
        actives: [true, false, false, false],
        tabBarnum: 0,
        totalNum: 0
      }
    },
    created() {
      this.getWxConfig();
      this.findPhotoPrescription()
      this.findChatPatient()
    },
    computed: {

    },

    methods: {
      findPhotoPrescription() {
        let list = {
          token: cookie.get('token'),
          doctorId: cookie.get('doctorId')
        }
        findPhotoPrescription(list).then((res) => {
          //console.log(res);
          let numArr = [];
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].sendStatus == 0) {
              numArr.push(res.data[i]);
            }
          }
          this.tabBarnum = numArr.length;
        })
      },
      findChatPatient() {
        let list = {
          token: cookie.get('token'),
          doctorId: cookie.get('doctorId')
        }
        findChatPatient(list).then((res) => {
          //console.log(res);
          if (res.data.length == 0) {
            this.totalNum = 0;
          } else {
            for (var i = 0; i < res.data.length; i++) {
              this.totalNum += (res.data[i].sum) * 1
            }
            //console.log(this.totalNum)
          }
        })
      },
      didClickedItem: function(tag) {
        let doctorName = cookie.get("doctorId");
        console.log(doctorName)
        if (doctorName == "undefined" || doctorName==undefined) {
          alert("您还未登陆，请点击头像后登录查看！");
        } else {
          if (tag === 0) {
            this.actives = this.actives.map(function() {
              return false;
            });
            this.actives[0] = true;
            this.$router.replace('/houzhen');
          } else if (tag === 1) {
            this.actives = this.actives.map(function() {
              return false;
            });
            this.actives[1] = true;
            this.$router.replace('/huanzhe?page=3');
          } else if (tag === 2) {
            this.actives = this.actives.map(function() {
              return false;
            });
            this.actives[2] = true;
            this.$router.replace('/zixunHuan');
          } else if (tag === 3) {
            this.actives = this.actives.map(function() {
              return false;
            });
            this.actives[3] = true;
            this.$router.replace('/homePage');
          }
          //this.$emit('select-item', tag);
        }
      },
      getWxConfig() {
        $.ajax({
          url: "https://www.mfzhosp.com/mkkMoblie/accessToken/getWxConfig",
          type: 'post',
          dataType: 'json',
          data: {
            'url': location.href.split('#')[0]
          },
          success: function(data) {
            wx.config({
              debug: false,
              appId: data.appId,
              timestamp: data.timestamp,
              nonceStr: data.nonceStr,
              signature: data.signature,
              jsApiList: ['checkJsApi', 'onMenuShareTimeline',
                'onMenuShareAppMessage', 'onMenuShareQQ',
                'onMenuShareWeibo', 'hideMenuItems',
                'showMenuItems', 'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem', 'translateVoice',
                'startRecord', 'stopRecord', 'onRecordEnd',
                'playVoice', 'pauseVoice', 'stopVoice',
                'uploadVoice', 'downloadVoice', 'chooseImage',
                'previewImage', 'uploadImage', 'downloadImage',
                'getNetworkType', 'openLocation', 'getLocation',
                'hideOptionMenu', 'showOptionMenu', 'closeWindow',
                'scanQRCode', 'chooseWXPay',
                'openProductSpecificView', 'addCard', 'chooseCard',
                'openCard'
              ],
              openTagList: ['wx-open-launch-weapp']
            });
            wx.ready(function() {

            })
            wx.error(function(res) {
              //alert(res)
            })
          }
        });
      },
      handleLaunchFn(e) {
        console.log(e)
      },
      handleErrorFn(e) {
        console.log('fail', e.detail);
      },
    },
    components: {

    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/less/base.less';

  .bottom-tab {
    width: 100%;
    height: 1.2rem;
    background-color: #fff;
    position: fixed;
    left: 0px;
    bottom: 0px;
    display: flex;
    z-index: 999;
  }

  .tab-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.12rem;
    color: #979797;
  }

  img {
    width: 35%;
    margin-bottom: 0.08rem;
  }

  .active {
    color: #3acbc8;
    font-size: 0.12rem;
  }

  .tabNums {
    position: fixed;
    bottom: 70px;
    right: 50px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff;
    background: red;
    font-size: 22px;
    text-align: center;
    line-height: 30px;
    z-index: 999;
  }

  .totalNum {
    width: 0.3rem;
    height: 0.3rem;
    position: fixed;
    bottom: 0.7rem;
    right: 31%;
    background: red;
    color: #fff;
    font-size: 22px;
    border-radius: 50%;
    text-align: center;
    line-height: 0.3rem;
    z-index: 999;
  }
</style>
