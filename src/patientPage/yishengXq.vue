<template>
<div class="yishengxq">
    <div class="backHome" @click="goBack">返回上一级</div>
    <img src="../assets/img/LODING.gif" alt class="loading" v-if="loadUp" />
    <div class="xian"></div>
    <div class="doctor">
        <img :src="lists.doctorPhoto" alt />
        <div>{{lists.doctorName}} {{lists.levelName}}</div>
        <div>{{lists.doctorHospital}}</div>
        <div>服务{{lists.countServer}}人 {{lists.subDiagnoseRate}}%复诊率 {{lists.countComment}}条评论</div>
        <div @click="godaxie">答谢医生</div>
    </div>
    <div class="gonggao">
        <h1>医生公告</h1>
        <div @click="gogonggaolist">查看公告</div>
    </div>
    <div class="tiaoli">
        <h1>擅长调理</h1>
        <div>
            <span v-for="(item,index) in list3" :key="index">{{item.medicineSubjectName}}</span>
        </div>
    </div>
    <div class="jianjie">
        <h1>医生简介</h1>
        <p>{{lists.doctorRemark}}</p>
    </div>
    <div class="wenzhang" v-if="showWz">
        <h1>相关文章</h1>
        <div class="detailList">
            <div v-for="(item,index) in lists.list_article" :key="index" @click="gowenxq(item,item.articleId)">
                <img src="../assets/img/head1.jpg" alt />
                <div>{{item.title}}</div>
                <p>来自：{{lists.doctorName}} {{item.levelName}}</p>
                <p style="padding-bottom: .9rem;">浏览量：123</p>
            </div>
        </div>
    </div>
    <div class="zixun" @click="goLiaotian">
        立即咨询
        <div style="width:2.5rem;height:0.9rem;text-align:center;line-height:0.9rem;font-size:0.36rem;margin:0 auto;">
            <!-- <wx-open-launch-weapp
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
        </wx-open-launch-weapp>-->
        </div>
    </div>
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
      loadUp: true,
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
    // console.log(this.doctorId)
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
    gogonggaolist(){
      let doctorId = this.doctorId
      let token = this.token
      console.log(token)
      this.$router.push({
        name:"proclamationlist",
        query:{
          doctorId:doctorId,
          token:token
        }
      })
    },
    goLiaotian() {
      if (this.isRelation == 1) {
        this.$router.push({
          path: "/wenzhenZx",
          query: {
            doctorId: this.doctorId,
            doctorImg: this.lists.doctorPhoto,
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
        this.loadUp = false
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
    gowenxq(item, id) {
      let detailItem = JSON.stringify(item);
      // console.log(detailItem)
      this.$router.push({
        name: "wenzhangXq",
        params: {
          id: id,
          item: detailItem,
        },
      });
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
    width: 81.666%;
    height: 0.76rem;
    background: #00afc2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    color: #fff;
    font-size: 0.3rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
}

.loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    padding-bottom: 0.3rem;
    border-bottom: 0.01rem solid #ececec;
    margin: 0 auto;
    position: relative;

    img {
        width: 0.98rem;
        height: 0.98rem;
        border-radius: 50%;
        float: left;
        margin-top: 0.38rem;
        margin-bottom: 0.38rem;
    }

    div {
        float: left;
        padding-left: 0.2rem;
    }

    div:nth-of-type(1) {
        color: #808080;
        font-size: 0.32rem;
        width: 60%;
        padding-top: 0.37rem;
    }

    div:nth-of-type(2),
    div:nth-of-type(3) {
        color: #bababa;
        font-size: 0.26rem;
        width: 60%;
        padding-top: 0.1rem;
        line-height: 0.3rem;
    }

    div:nth-of-type(4) {
        width: 20%;
        height: 0.56rem;
        background: #00afc2;
        border-radius: 0.13rem;
        text-align: center;
        line-height: 0.56rem;
        font-size: 0.28rem;
        color: #fff;
        position: absolute;
        right: 0.24rem;
        top: 0.25rem;
        padding-left: 0;
    }

}

.gonggao {
    width: 92.4%;
    margin: 0 auto;
    height: .4rem;
    padding-bottom: 0.82rem;
    border-bottom: 0.01rem solid #ececec;
    position: relative;

    h1 {
        font-size: 0.32rem;
        color: #7c7c7c;
        position: relative;
        top: .4rem;
    }

    div {
        width: 22%;
        height: 0.56rem;
        background: #00afc2;
        border-radius: 0.13rem;
        text-align: center;
        line-height: 0.56rem;
        font-size: 0.28rem;
        color: #fff;
        position: absolute;
        right: 0rem;
        top: .25rem;
        padding-left: 0;
    }
}

.tiaoli {
    width: 92.4%;
    height: 2.4rem;
    margin: 0 auto;
    padding-bottom: 0.82rem;
    border-bottom: 0.01rem solid #ececec;

    h1 {
        font-size: 0.32rem;
        padding: 0.3rem 0 0.25rem 0rem;
        color: #7c7c7c;
    }

    div {
        color: #fff;
        font-size: 0.26rem;

        span {
            float: left;
            margin-right: 0.1rem;
            padding: 0.08rem 0.15rem;
            background: #00afc2;
            border-radius: 0.3rem;
            margin-bottom: 0.1rem;
        }
    }
}

.jianjie {
    //height:196px;
    width: 92.4%;
    padding-bottom: 2rem;
    margin: 0 auto;
    border-bottom: 0.01rem solid #ececec;

    h1 {
        font-size: 0.32rem;
        padding: 0.3rem 0 0.25rem 0rem;
        color: #7c7c7c;
    }

    p {
        font-size: 0.26rem;
        color: #b4b4b4;
        line-height: 0.37rem;
        padding: 0 0.1rem;
    }
}

.wenzhang {
    width: 92.4%;
    padding-bottom: 1rem;
    margin: 0 auto;

    h1 {
        font-size: 0.32rem;
        padding: 0.3rem 0 0.25rem 0rem;
        color: #7c7c7c;
    }

    .detailList {
        padding: 0 .1rem;

        >div {
            width: 100%;
            height: 1.57rem;
            border-bottom: 0.01rem solid #f1f1f1;
            padding-bottom: 1.666rem;

            div {
                font-size: 0.28rem;
                color: #7a7a7a;
                padding-top: 32px;
                float: left;
                line-height: .32rem;
                width: 67%;
            }

            p {
                font-size: 0.26rem;
                color: #bbbbbb;
                padding-top: 10px;
                float: left;

                width: 67%;
            }

            img {
                width: 1rem;
                height: 0.7rem;
                border-radius: 0.13rem;
                float: right;
                margin-top: 0.2rem;
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
