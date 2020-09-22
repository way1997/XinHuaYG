<template>
  <div class="houzhen">
    <!--  <div class="myevm">
      <span class="fxevm" @click="clickevm">点击分享我的二维码</span>
    </div>-->
    <div class="erweima">
      <div class="qrcode" ref="qrCodeUrl" id="ewm"></div>
      <!-- <img src="../assets/img/erweima.png" alt=""> -->
    </div>
    <div class="userList">
      <p class="title"><span></span>候诊区<span></span></p>
      <div class="detail" v-for="(item,index) in list" :key="index">
        <img :src="item.imgUrl||item.patientImgUrl" alt="">
        <div class="info">
          <span>{{item.patientName}}</span>
          <label :class="{nan:item.patientSex==1}">
            <img :src="item.patientSex==1?require('../assets/img/sex2.png'):require('../assets/img/sex1.png')" alt="">{{item.age||item.patientAge}}岁
          </label>
        </div>
        <div class="shijian">{{item.createDate}}</div>
        <div class="liaotian" @click="goLiaotian(item.patientId2)">聊天</div>
        <div class="kaifang" @click="showkf(item.patientId2,item.patientName,item.patientSex,item.patientAge)">开方</div>
      </div>
    </div>
    <!--选择开方-->
    <div class="zhezhao" v-show="kaifang" @click.stop="hidekf">
      <div class="choose">
        <p>选择开方方式</p>
        <div @click="goxianshangkf">
          <img src="../assets/img/xianshangkf.png" alt="">
          <span>线上开方</span>
        </div>
        <div @click="paizhaokf">
          <img src="../assets/img/paizhaokf.png" alt="">
          <span>拍照开方</span>
        </div>
      </div>
    </div>
    <!--选择开方-->
    <div class="zhezhao1" v-show="fenxiang" @click.stop="hidekf">
      <div class="choose">
        <p>选择分享方式</p>
        <div @click="fenxiang_py">
          <img src="../assets/img/fenxiang.png" alt="">
          <span>分享给朋友</span>
        </div>
        <div @click="fenxiang_pyq">
          <img src="../assets/img/weixinpengyouquan.png" alt="">
          <span>分享到朋友圈</span>
        </div>
      </div>
    </div>
    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp">
    <tabBar />
  </div>
</template>

<script>
  import {
    doctorChoosepri,
    findPatientByTel,
    findPatient,
    findWaitDoctor
  } from "api/doctor"
  import HeadTop from 'base/header/header'
  import router from '../router'
  import $ from 'jquery'
  import cookie from "js-cookie"
  import tabBar from '../components/patientTabBar'
  import QRCode from 'qrcodejs2'
  import wx from "weixin-js-sdk"
  export default {
    name: "houzhen",
    data() {
      return {
        kaifang: false,
        fenxiang: false,
        token: '',
        doctorId: '',
        list: '',
        patientId: '',
        patientName: '',
        patientSex: '',
        age: '',
        loadUp: true
      }
    },
    created() {
      this.token = cookie.get('token');
      this.doctorId = cookie.get('doctorId');
      this.findWaitDoctor();
      this.getWxConfig();
    },
    computed: {

    },
    mounted() {
      this.creatQrCode();
    },
    methods: {
      creatQrCode() {
        var h = this.$refs.qrCodeUrl.offsetHeight;
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: 'https://www.mfzhosp.com/H5/#/indexPage?doctorId=' + this.doctorId, // 需要转换为二维码的内容
          colorDark: '#000000',
          colorLight: '#ffffff',
          width: h - 20,
          height: h - 20,
          correctLevel: QRCode.CorrectLevel.H
        })

      },
      goLiaotian(patientId) {
        this.$router.push({
          path: '/liaotian',
          query: {
            patientId: patientId,
            page: 'houzhen'
          }
        })
      },
      doctorChoosepri() {
        let list = {
          token: this.token,
          doctorId: this.doctorId
        }
        doctorChoosepri(list).then((res) => {
          //console.log(res);
          this.list = res.lists_dopa;
          this.loadUp = false;
        })
      },
      findWaitDoctor() {
        let list = {
          token: this.token,
          doctorId: this.doctorId
        }
        findWaitDoctor(list).then((res) => {
          //console.log(res);
          this.list = res.data;
          this.loadUp = false;
        })

      },
      showkf(patientId, patientName, patientSex, age) {
        this.kaifang = true;
        this.patientId = patientId;
        this.patientName = patientName;
        this.patientSex = patientSex;
        this.age = age;
      },
      hidekf() {
        this.kaifang = false;
        this.fenxiang = false;
      },
      goxianshangkf() {
        cookie.set('patientId', this.patientId);
        cookie.set('patientName', this.patientName);
        cookie.set('patientSex', this.patientSex);
        cookie.set('age', this.age);
        this.$router.push({
          path: '/zaixiankf',
          query: {}
        })
      },
      paizhaokf() {
        cookie.set('patientId', this.patientId);
        cookie.set('patientName', this.patientName);
        cookie.set('patientSex', this.patientSex);
        cookie.set('age', this.age);
        this.$router.push({
          path: '/paizhaokf',
          query: {}
        })
      },
      getWxConfig() {
        var d1=cookie.get("doctorId");
        var d2=cookie.get("doctorName");
        var d3=cookie.get("doctorImgUrl");
        var d4=cookie.get("token");
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
              jsApiList: ['checkJsApi', 'updateAppMessageShareData',
                'updateTimelineShareData'
              ]
            });
            wx.ready(function() {
              console.log("获权OK")
              wx.checkJsApi({
                jsApiList: ['updateAppMessageShareData','updateTimelineShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                  console.log(res)
                  // 以键值对的形式返回，可用的api值true，不可用为false
                  // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                  if (res.errMsg == "checkJsApi:ok") {
                    wx.updateAppMessageShareData({
                      title: d2+'医生的邀请|新华医馆', // 分享标题
                      desc: '这是我的二维码名片，如有需要可随时线上咨询', // 分享描述
                      link: 'https://www.mfzhosp.com/H5/#/myevm?doctorId='+d1+"&doctorName="+d2+"&token="+d4, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: d3, // 分享图标
                      success: function() {
                        // 设置成功
                        console.log(123)
                      }
                    })
                    wx.updateTimelineShareData({
                      title: d2+'医生的邀请|新华医馆'+'这是我的二维码名片，如有需要可随时线上咨询', // 分享标题
                      link: 'https://www.mfzhosp.com/H5/#/myevm?doctorId='+d1+"&doctorName="+d2+"&token="+d4, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: d3, // 分享图标
                      success: function() {
                        // 设置成功
                        console.log(456)
                      }
                    })
                  }
                }
              });
            })
            wx.error(function(res) {
              //alert(res)
            })
          }
        });
      },
      fenxiang_py() {
        console.log(111)
      },
      fenxiang_pyq() {
        console.log(222)
      },
      clickevm() {
        this.fenxiang = true;
      }
    },
    components: {
      tabBar
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/less/base.less';

  .houzhen {
    width: 100%;
    min-height: 100%;
    background: url('../assets/img/bg.jpg') repeat-y;
    background-position: 0% 0%;
    padding-top: 74px;
  }

  .fxevm {
    width: 2.5rem;
    height: 0.5rem;
    background: linear-gradient(-47deg, #fde272, #fe807c);
    border-radius: 0.07rem;
    color: #fff;
    font-size: 0.25rem;
    position: absolute;
    right: 0.29rem;
    top: 0.29rem;
    text-align: center;
    line-height: 0.5rem;
  }

  .evmimg {
    height: 0.4rem;
    width: 0.6rem;
  }

  .myevm {
    width: 100%;
    height: 0.3rem;
  }

  .erweima {
    width: 325px;
    height: 325px;
    background: linear-gradient(-47deg, rgba(188, 247, 233, 1), rgba(186, 249, 229, 1), rgba(164, 227, 245, 1));
    box-shadow: 1px 26px 21px 0px rgba(4, 0, 0, 0.24);
    border-radius: 19px;
    margin: 0 auto;
    position: relative;

    .qrcode {
      background: #fff;
      padding: 15px;
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 270px;
      height: 270px;

      canvas {
        width: 120px;
        height: 120px;
      }

      img {
        width: 130px;
        height: 130px;
      }
    }
  }

  .userList {
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    padding: 20px 0 210px 0;
    margin: 0 auto;
    border-radius: 10px;
    margin-top: 86px;
  }

  .title {
    width: 100%;
    text-align: center;
    font-size: 0.5rem;
    color: #7d7d7d;

    span {
      width: 170px;
      border-bottom: 1px solid #bfcfd3;
    }
  }

  .detail {
    width: 95%;
    height: 150px;
    margin: 0 auto;
    border-bottom: 1px solid #d1ddde;
    position: relative;

    >img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      float: left;
      margin-top: 20px;
    }

    .info {
      width: 58%;
      float: left;
      font-size: 27px;
      padding-left: 20px;
      padding-top: 30px;
      color: #5d5d5d;

      label {
        width: 134px;
        height: 41px;
        display: inline-block;
        background: rgba(247, 124, 124, 1);
        border-radius: 21px;
        line-height: 41px;
        color: #fff;
      }

      label img {
        width: 29px;
        height: 29px;
        margin: 0 10px 0 10px;
        vertical-align: middle;
      }

      label.nan {
        width: 134px;
        height: 41px;
        background: #2eb0d5;
        border-radius: 21px;
        line-height: 41px;
        color: #fff;
      }
    }

    .shijian {
      font-size: 25px;
      padding-left: 20px;
      padding-top: 15px;
      float: left;
      width: 58%;
      color: #7c7c7c;
    }

    .kaifang,
    .liaotian {
      width: 126px;
      height: 49px;
      text-align: center;
      line-height: 49px;
      background: #4bced6;
      border-radius: 7px;
      font-size: 27px;
      color: #fff;
      position: absolute;
      right: 10px;
      top: 0.85rem;
    }

    .kaifang {
      right: 160px;
    }
  }

  .zhezhao {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);

    .choose {
      width: 643px;
      height: 408px;
      background: rgba(255, 255, 255, 1);
      border-radius: 13px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      p {
        width: 100%;
        height: 86px;
        border-bottom: 1px solid #a7a7a7;
        text-align: center;
        line-height: 86px;
        font-size: 25px;
        color: #878787;
      }

      div {
        width: 224px;
        height: 213px;
        background: linear-gradient(-47deg, rgba(84, 201, 204, 1), rgba(110, 156, 221, 1));
        border-radius: 12px;
        float: left;
        margin-top: 40px;
        margin-left: 65px;

        img {
          width: 73px;
          height: 106px;
          margin: 0 auto;
          display: block;
          padding-top: 23px;
        }

        span {
          width: 100%;
          display: block;
          text-align: center;
          font-size: 27px;
          color: #fff;
          padding-top: 32px;
        }

        &:nth-of-type(2) img {
          width: 90px;
          height: 80px;
          padding-top: 35px;
        }

        &:nth-of-type(2) span {
          padding-top: 46px;
        }
      }
    }
  }

  .zhezhao1 {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);

    .choose {
      width: 643px;
      height: 408px;
      background: rgba(255, 255, 255, 1);
      border-radius: 13px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      p {
        width: 100%;
        height: 86px;
        border-bottom: 1px solid #a7a7a7;
        text-align: center;
        line-height: 86px;
        font-size: 25px;
        color: #878787;
      }

      div {
        width: 224px;
        height: 213px;
        background: linear-gradient(-47deg, rgba(84, 201, 204, 1), rgba(110, 156, 221, 1));
        border-radius: 12px;
        float: left;
        margin-top: 40px;
        margin-left: 65px;

        img {
          width: 100px;
          height: 100px;
          margin: 0 auto;
          display: block;
          padding-top: 23px;
        }

        span {
          width: 100%;
          display: block;
          text-align: center;
          font-size: 27px;
          color: #fff;
          padding-top: 32px;
        }

        &:nth-of-type(2) img {
          width: 90px;
          height: 80px;
          padding-top: 35px;
        }

        &:nth-of-type(2) span {
          padding-top: 46px;
        }
      }
    }
  }

  .loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
