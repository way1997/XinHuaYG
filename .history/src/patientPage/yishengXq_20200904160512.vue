<template>
<div class="yishengxq">
    <div class="backHome" @touchstart="goBack">返回上一级</div>
    <div class="xian"></div>
    <div class="doctor">
        <img :src="lists.doctorPhoto" alt />
        <div>{{lists.doctorName}} {{lists.levelName}}</div>
        <div>{{lists.doctorHospital}}</div>
        <div>服务{{lists.countServer}}人 {{lists.subDiagnoseRate}}%复诊率 {{lists.countComment}}条评论</div>
        <div @touchstart="godaxie">答谢医生</div>
    </div>
    <div class="tiaoli">
        <h1>擅长调理</h1>
        <div>
            <span v-for="(item,index) in list3" :key="index">{{item.medicineSubjectName}}</span>
        </div>
    </div>
    <!--<div class="jianjie">
        <h1>医生简介</h1>
        <p>{{lists.doctorRemark}}</p>
    </div>
    <div class="wenzhang" v-if="showWz">
        <h1>相关文章</h1>
        <div class="detailList">
            <div v-for="(item,index) in lists.list_article" :key="index" @touchstart="gowenxq(item.id)">
                <img src="../assets/img/head1.jpg" alt />
                <div>{{item.title}}</div>
                <p>来自：{{lists.doctorName}} {{item.levelName}}</p>
                <p>浏览量：123</p>
            </div>
        </div>
    </div> -->
    <!-- <div class="zixun" @touchstart="goLiaotian">
        立即咨询
        <!-- <div style="width:2.5rem;height:0.9rem;text-align:center;line-height:0.9rem;font-size:0.36rem;margin:0 auto;">
                <wx-open-launch-weapp
                id="launch-btn"
                username="gh_071ecdb915dd"
                @launch="handleLaunchFn"
                @error="handleErrorFn"
                path="pages/ysxx/ysxx1.html">

<script>
<
style > .btn {
    font - size: 19 px;
    border: none;
    background: none;
    color: #fff;
    line - height: 51 px;
} < /style> <
button class = "btn" > 立即咨询 < /button>
</script>
                </wx-open-launch-weapp>
      </div>
    </div>-->
    <confirm :text="tipText" ref="confirm" @cancel="cancel" @confirm="confirm"></confirm>
</div>
</template>

<script>
import { doctorDetails, relation } from "api/patient";
import HeadTop from "base/header/header";
import router from "../router";
import cookie from "js-cookie";
import wx from "weixin-js-sdk";
import $ from "jquery";
import confirm from "base/confirm/confirm";
export default {
  name: "yishengxq",

  data() {
    return {
      token: "",
      patientId: "",
      doctorId: "",
      lists: [],
      list3: "",
      showWz: true,
      tipText: "您还没有与此医生建立连接 是否立即建立连接？",
    };
  },

  created() {
    this.token = cookie.get("token");
    this.patientId = cookie.get("patientId");
    this.doctorId = this.$route.query.doctorId;
    this.doctorDetails();
    this.getWxConfig();
  },

  computed: {},

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    godaxie() {
      this.$router.push({
        path: "/daxieYs",
        query: {
          doctorId: this.doctorId,
          doctorPhoto: this.lists.doctorPhoto,
          doctorName: this.lists.doctorName,
        },
      });
    },
    goLiaotian() {
      if (this.isRelation == 1) {
        this.$router.push({
          path: "/wenzhenZx",
          query: {
            doctorId: this.doctorId,
            doctorPhoto: this.lists.doctorPhoto,
            doctorName: this.lists.doctorName,
            patientIds: "",
          },
        });
      } else {
        this.$refs.confirm.show();
      }
    },
    cancel() {
      this.$refs.confirm.hide();
    },
    confirm() {
      let list = {
        token: this.token,
        doctorId: this.doctorId,
        patientId: this.patientId,
      };
      relation(list).then((res) => {
        if (res.type == true) {
          this.$toast("建立成功");
          this.$refs.confirm.hide();
          this.$router.push({
            path: "/wenzhenZx",
            query: {
              doctorId: this.doctorId,
              doctorPhoto: this.lists.doctorPhoto,
              doctorName: this.lists.doctorName,
            },
          });
        }
      });
    },

    doctorDetails() {
      let list = {
        patientId: this.patientId,
        token: this.token,
        doctorId: this.doctorId,
      };
      doctorDetails(list).then((res) => {
        this.lists = res.data;
        this.list3 = res.data.list_adept;
        this.isRelation = res.isRelation;
        if (res.data.list_article.length == 0) {
          this.showWz = false;
        } else {
          this.showWz = true;
        }
        // console.log(res.data.isRelation)
      });
    },
    gowenxq(id) {
      this.$router.push({ path: "/wenzhangXq", query: { id: id } });
    },
    getWxConfig() {
      $.ajax({
        url: "https://www.mfzhosp.com/mkkMoblie/accessToken/getWxConfig",
        type: "post",
        dataType: "json",
        data: {
          url: location.href.split("#")[0],
        },
        success: function (data) {
          // console.log(data)
          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
              "checkJsApi",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareWeibo",
              "hideMenuItems",
              "showMenuItems",
              "hideAllNonBaseMenuItem",
              "showAllNonBaseMenuItem",
              "translateVoice",
              "startRecord",
              "stopRecord",
              "onRecordEnd",
              "playVoice",
              "pauseVoice",
              "stopVoice",
              "uploadVoice",
              "downloadVoice",
              "chooseImage",
              "previewImage",
              "uploadImage",
              "downloadImage",
              "getNetworkType",
              "openLocation",
              "getLocation",
              "hideOptionMenu",
              "showOptionMenu",
              "closeWindow",
              "scanQRCode",
              "chooseWXPay",
              "openProductSpecificView",
              "addCard",
              "chooseCard",
              "openCard",
            ],
            openTagList: ["wx-open-launch-weapp"],
          });
          wx.ready(function () {});
          wx.error(function (res) {
            //alert(res)
          });
        },
      });
    },
    handleLaunchFn(e) {
      console.log(e);
    },
    handleErrorFn(e) {
      console.log("fail", e.detail);
    },
  },

  components: {
    confirm,
  },
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";

.backHome {
    width: 100%;
    height: 0.76rem;
    background: #00afc2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    color: #fff;
    font-size: 0.25rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
}

.xian {
    width: 100%;
    height: 0.1rem;
    background: #efefef;
    clear: both;
}

.doctor {
    width: 98%;
    padding: 0 1%;
    height: 1.79rem;
    border-bottom: 0.01rem solid #ececec;
    margin: 0 auto;
    position: relative;

    img {
        width: 12%;
        height: 48%;
        border-radius: 50%;
        float: left;
        margin-top: 0.38rem;
    }

    div {
        float: left;
        padding-left: 0.2rem;
    }

    div:nth-of-type(1) {
        color: #808080;
        font-size: 0.25rem;
        width: 60%;
        padding-top: 0.37rem;
    }

    div:nth-of-type(2),
    div:nth-of-type(3) {
        color: #bababa;
        font-size: 0.23rem;
        width: 60%;
        padding-top: 0.1rem;
    }

    div:nth-of-type(4) {
        position: fixed;
        width: 80%;
        height: 0.9rem;
        left: 50%;
        bottom: 0.08rem;
        background: #00b0c2;
        border-radius: 0.5rem;
        line-height: 0.99rem;
        color: #fff;
        font-size: 0.36rem;
        text-align: center;
        margin-top: 0.2rem;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }
}

.tiaoli {
    width: 92.4%;
    height: 240px;
    margin: 0 auto;
    border-bottom: 1px solid #ececec;

    h1 {
        font-size: 25px;
        padding: 30px 0 25px 13px;
        color: #7c7c7c;
    }

    div {
        color: #fff;
        font-size: 25px;

        span {
            float: left;
            margin-right: 10px;
            padding: 8px 15px;
            background: #00afc2;
            border-radius: 30px;
            margin-bottom: 10px;
        }
    }
}

.jianjie {
    width: 693px;
    //height:196px;
    padding-bottom: 20px;
    margin: 0 auto;
    border-bottom: 1px solid #ececec;

    h1 {
        font-size: 25px;
        padding: 30px 0 25px 13px;
        color: #7c7c7c;
    }

    p {
        font-size: 24px;
        color: #b4b4b4;
        line-height: 37px;
        padding: 0 10px;
    }
}

.wenzhang {
    h1 {
        font-size: 25px;
        padding: 30px 0 25px 43px;
        color: #7c7c7c;
    }

    .detailList {
        padding: 0 36px;

        >div {
            width: 100%;
            height: 157px;
            border-bottom: 1px solid #f1f1f1;

            div {
                font-size: 25px;
                color: #7a7a7a;
                padding-top: 32px;
                float: left;
                width: 67%;
            }

            p {
                font-size: 22px;
                color: #bbbbbb;
                padding-top: 10px;
                float: left;
                width: 67%;
            }

            img {
                width: 177px;
                height: 114px;
                border-radius: 13px;
                float: right;
                margin-top: 20px;
            }
        }
    }
}

.zixun {
    position: fixed;
    width: 80%;
    height: 0.9rem;
    left: 50%;
    bottom: 0.08rem;
    background: #00b0c2;
    border-radius: 0.5rem;
    line-height: 0.99rem;
    color: #fff;
    font-size: 0.36rem;
    text-align: center;
    margin-top: 0.2rem;
    transform: translateX(-50%);
}
</style>
