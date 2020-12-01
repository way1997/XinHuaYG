<template>
  <div class="houzhen">
    <!-- <div class="myevm">
          <span class="fxevm" @click="clickevm">点击分享我的二维码</span>
      </div> -->
    <div class="erweima">
      <div class="qrcode" ref="qrCodeUrl" id="ewm"></div>
      <!-- <img src="../assets/img/erweima.png" alt=""> -->
    </div>
    <div class="userList">
      <p class="title"><span></span>候诊区<span></span></p>
      <div class="detail" v-for="(item, index) in list" :key="index">
        <img :src="item.imgUrl || item.patientImgUrl" alt="" />
        <div class="info">
          <span>{{ item.patientName }}</span>
          <label :class="{ nan: item.patientSex == 1 }"> <img :src="item.patientSex == 1 ? require('../assets/img/sex2.png') : require('../assets/img/sex1.png')" alt="" />{{ item.age || item.patientAge }}岁 </label>
        </div>
        <div class="shijian">{{ item.createDate }}</div>
        <div class="liaotian" @click="goLiaotian(item.patientId2)">聊天</div>
        <div class="kaifang" @click="showkf(item.patientId2, item.patientName, item.patientSex, item.patientAge)">开方</div>
      </div>
    </div>
    <!--选择开方-->
    <div class="zhezhao" v-show="kaifang" @click.stop="hidekf">
      <div class="choose">
        <p>选择开方方式</p>
        <div @click="goxianshangkf">
          <img src="../assets/img/xianshangkf.png" alt="" />
          <span>线上开方</span>
        </div>
        <div @click="paizhaokf">
          <img src="../assets/img/paizhaokf.png" alt="" />
          <span>拍照开方</span>
        </div>
      </div>
    </div>
    <!--选择开方-->
    <div class="zhezhao1" v-show="fenxiang" @click.stop="hidekf">
      <div class="choose">
        <p>选择分享方式</p>
        <div @click="fenxiang_py">
          <img src="../assets/img/fenxiang.png" alt="" />
          <span>分享给朋友</span>
        </div>
        <div @click="fenxiang_pyq">
          <img src="../assets/img/weixinpengyouquan.png" alt="" />
          <span>分享到朋友圈</span>
        </div>
      </div>
    </div>
    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp" />
    <tabBar />
  </div>
</template>

<script>
import { doctorChoosepri, findPatientByTel, findPatient, findWaitDoctor } from "api/doctor";
import HeadTop from "base/header/header";
import router from "../router";
import $ from "jquery";
import cookie from "js-cookie";
import tabBar from "../components/patientTabBar";
import QRCode from "qrcodejs2";
import wx from "weixin-js-sdk";
export default {
  name: "houzhen",
  data() {
    return {
      kaifang: false,
      fenxiang: false,
      token: "",
      doctorId: "",
      list: "",
      patientId: "",
      patientName: "",
      patientSex: "",
      age: "",
      loadUp: true,
    };
  },
  created() {
    this.token = cookie.get("token");
    this.doctorId = cookie.get("doctorId");
    this.findWaitDoctor();
    this.getWxConfig();
  },
  computed: {},
  mounted() {
    this.creatQrCode();
  },
  methods: {
    creatQrCode() {
      var h = this.$refs.qrCodeUrl.offsetHeight;
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: "https://www.mfzhosp.com/H5/#/indexPage?doctorId=" + this.doctorId, // 需要转换为二维码的内容
        colorDark: "#000000",
        colorLight: "#ffffff",
        width: h - 20,
        height: h - 20,
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    goLiaotian(patientId) {
      this.$router.push({
        path: "/liaotian",
        query: {
          patientId: patientId,
          page: "houzhen",
        },
      });
    },
    doctorChoosepri() {
      let list = {
        token: this.token,
        doctorId: this.doctorId,
      };
      doctorChoosepri(list).then((res) => {
        //console.log(res);
        this.list = res.lists_dopa;
        this.loadUp = false;
      });
    },
    findWaitDoctor() {
      let list = {
        token: this.token,
        doctorId: this.doctorId,
      };
      findWaitDoctor(list).then((res) => {
        console.log(res);
        this.list = res.data;
        this.loadUp = false;
      });
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
      cookie.set("patientId", this.patientId);
      cookie.set("patientName", this.patientName);
      cookie.set("patientSex", this.patientSex);
      cookie.set("age", this.age);
      this.$router.push({
        path: "/zaixiankf",
        query: {},
      });
    },
    paizhaokf() {
      cookie.set("patientId", this.patientId);
      cookie.set("patientName", this.patientName);
      cookie.set("patientSex", this.patientSex);
      cookie.set("age", this.age);
      this.$router.push({
        path: "/paizhaokf",
        query: {
          token: this.token,
          doctorId: this.doctorId,
        },
      });
    },
    getWxConfig() {
      var d1 = cookie.get("doctorId");
      var d2 = cookie.get("doctorName");
      var d3 = cookie.get("doctorImgUrl");
      var d4 = cookie.get("token");
      $.ajax({
        url: "https://www.mfzhosp.com/mkkMoblie/accessToken/getWxConfig",
        type: "post",
        dataType: "json",
        data: {
          url: location.href.split("#")[0],
        },
        success: function (data) {
          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ["checkJsApi", "updateAppMessageShareData", "updateTimelineShareData"],
          });
          wx.ready(function () {
            console.log("获权OK");
            wx.checkJsApi({
              jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function (res) {
                console.log(res);
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                if (res.errMsg == "checkJsApi:ok") {
                  wx.updateAppMessageShareData({
                    title: d2 + "医生的邀请|新华医馆", // 分享标题
                    desc: "这是我的二维码名片，如有需要可随时线上咨询", // 分享描述
                    link: "https://www.mfzhosp.com/H5/#/myevm?doctorId=" + d1 + "&doctorName=" + d2 + "&token=" + d4, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: d3, // 分享图标
                    success: function () {
                      // 设置成功
                      console.log(123);
                    },
                  });
                  wx.updateTimelineShareData({
                    title: d2 + "医生的邀请|新华医馆" + "这是我的二维码名片，如有需要可随时线上咨询", // 分享标题
                    link: "https://www.mfzhosp.com/H5/#/myevm?doctorId=" + d1 + "&doctorName=" + d2 + "&token=" + d4, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: d3, // 分享图标
                    success: function () {
                      // 设置成功
                      console.log(456);
                    },
                  });
                }
              },
            });
          });
          wx.error(function (res) {
            //alert(res)
          });
        },
      });
    },
    fenxiang_py() {
      console.log(111);
    },
    fenxiang_pyq() {
      console.log(222);
    },
    clickevm() {
      this.fenxiang = true;
    },
  },
  components: {
    tabBar,
  },
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";

.houzhen {
  width: 100%;
  min-height: 100%;
  background: url("../assets/img/bg.jpg") repeat-y;
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
  width: 3.25rem;
  height: 3.25rem;
  background: linear-gradient(-47deg, #bcf7e9, #baf9e5, #a4e3f5);
  -webkit-box-shadow: 0.01rem 0.26rem 0.21rem 0 rgba(4, 0, 0, 0.24);
  box-shadow: 0.01rem 0.26rem 0.21rem 0 rgba(4, 0, 0, 0.24);
  border-radius: 0.19rem;
  margin: 0 auto;
  position: relative;

  .qrcode {
    background: #fff;
    padding: 0.15rem;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2.7rem;
    height: 2.7rem;

    canvas {
      width: 1.2rem;
      height: 1.2rem;
    }

    img {
      width: 1.3rem;
      height: 1.3rem;
    }
  }
}

.userList {
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
  padding: 0.2rem 0 2.1rem 0;
  margin: 0 auto;
  border-radius: 0.1rem;
  margin-top: 0.86rem;
}

.title {
  width: 100%;
  text-align: center;
  font-size: 0.5rem;
  color: #7d7d7d;

  span {
    width: 1.7rem;
    border-bottom: 0.01rem solid #bfcfd3;
  }
}

.detail {
  width: 95%;
  height: 1.5rem;
  margin: 0 auto;
  border-bottom: 0.01rem solid #d1ddde;
  position: relative;

  > img {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    float: left;
    margin-top: 0.2rem;
  }

  .info {
    width: 78%;
    float: left;
    font-size: 0.27rem;
    padding-left: 0.2rem;
    padding-top: 0.3rem;
    color: #5d5d5d;

    label {
      width: 1.34rem;
      height: 0.41rem;
      display: inline-block;
      background: #f77c7c;
      border-radius: 0.21rem;
      line-height: 0.41rem;
      color: #fff;
    }

    label img {
      width: 0.29rem;
      height: 0.29rem;
      margin: 0 0.1rem 0 0.1rem;
      vertical-align: middle;
    }

    label.nan {
      width: 1.34rem;
      height: 0.41rem;
      background: #2eb0d5;
      border-radius: 0.21rem;
      line-height: 0.41rem;
      color: #fff;
    }
  }

  .shijian {
    font-size: 0.25rem;
    padding-left: 0.2rem;
    padding-top: 0.15rem;
    float: left;
    width: 58%;
    color: #7c7c7c;
  }

  .kaifang,
  .liaotian {
    width: 1.26rem;
    height: 0.49rem;
    text-align: center;
    line-height: 0.49rem;
    background: #4bced6;
    border-radius: 0.07rem;
    font-size: 0.27rem;
    color: #fff;
    position: absolute;
    right: 0.1rem;
    top: 0.85rem;
  }

  .kaifang {
    right: 1.6rem;
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
    width: 6.43rem;
    height: 4.08rem;
    background: #ffffff;
    border-radius: 0.13rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    p {
      width: 100%;
      height: 0.86rem;
      border-bottom: 0.01rem solid #a7a7a7;
      text-align: center;
      line-height: 0.86rem;
      font-size: 0.25rem;
      color: #878787;
    }

    div {
      width: 2.24rem;
      height: 2.13rem;
      background: linear-gradient(-47deg, #54c9cc, #6e9cdd);
      border-radius: 0.12rem;
      float: left;
      margin-top: 0.4rem;
      margin-left: 0.65rem;

      img {
        width: 0.73rem;
        height: 1.06rem;
        margin: 0 auto;
        display: block;
        padding-top: 0.23rem;
      }

      span {
        width: 100%;
        display: block;
        text-align: center;
        font-size: 0.27rem;
        color: #fff;
        padding-top: 0.32rem;
      }

      &:nth-of-type(2) img {
        width: 0.9rem;
        height: 0.8rem;
        padding-top: 0.35rem;
      }

      &:nth-of-type(2) span {
        padding-top: 0.46rem;
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
    width: 6.43rem;
    height: 4.08rem;
    background: #ffffff;
    border-radius: 0.13rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    p {
      width: 100%;
      height: 0.86rem;
      border-bottom: 0.02rem solid #a7a7a7;
      text-align: center;
      line-height: 0.86rem;
      font-size: 0.25rem;
      color: #878787;
    }

    div {
      width: 2.24rem;
      height: 2.13rem;
      background: linear-gradient(-47deg, #54c9cc, #6e9cdd);
      border-radius: 0.12rem;
      float: left;
      margin-top: 0.4rem;
      margin-left: 0.65rem;

      img {
        width: 1rem;
        height: 1rem;
        margin: 0 auto;
        display: block;
        padding-top: 0.23rem;
      }

      span {
        width: 100%;
        display: block;
        text-align: center;
        font-size: 0.27rem;
        color: #fff;
        padding-top: 0.32rem;
      }

      &:nth-of-type(2) img {
        width: 0.9rem;
        height: 0.8rem;
        padding-top: 0.35rem;
      }

      &:nth-of-type(2) span {
        padding-top: 0.46rem;
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
