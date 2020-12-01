<template>
  <div class="mydevm">
    <div class="img_bg">
      <div class="flex flex__center f-white">
        <div class="mt-30 mb-40 border-100">
          <!-- img 占位 -->
          <img :src="lists.doctorPhoto" ref="logoimg" />
        </div>
      </div>
      <div class="flex f-white ml-10">
        <div class="f-1 mb-10" style="font-size: 0.5rem; font-weight: bold">
          {{ doctorName }} -
          <span class="f-30">{{ levelName }}</span>
        </div>
      </div>
    </div>

    <div style="border: 2px solid #f0eeee; margin-top: 0rem"></div>
    <div class="flex flex1 share_patient_box">
      <div class="ml-10 mt-10 share_txt" style="font-weight: 550; color: rgb(90, 90, 90)">"这是我二维码名片,长按图片、扫码或点击关注我，直接与我交流"</div>
      <div class="renzheng poabl" @click="goZinxun">关注咨询</div>
      <div class="erweima">
        <div class="qrcode" id="ewmNone"></div>
        <div class="qrcode" ref="qrCodeUrlPat" id="ewm"></div>
      </div>
    </div>
    <div style="border: 1px solid #f0eeee; margin-top: 0.2rem"></div>
    <div class="flex flex1 share_patient_box">
      <div class="erweima" style="left: 0.3rem">
        <!--<div class="qrcode" ref="qrCodeUrlDoc" id="ewm2"></div> -->
        <div class="qrcode" id="ewm2None"></div>
        <div class="qrcode" ref="qrCodeUrlDoc" id="ewm2"></div>
      </div>
      <div class="ml-10 mt-10 share_txt" style="margin-left: 3.5rem">
        <span style="font-weight: 550; line-height: 0.3rem; color: rgb(90, 90, 90)">这是我二维码名片<br />长按图片、扫码或点击注册认证 可获得现金奖励！ </span>
        <br />
        <span style="font-size: 0.24rem; line-height: 0.4rem"></span>
      </div>
      <div class="renzheng poabr" @click="goRenzheng">注册认证</div>
    </div>

    <div style="border: 1px solid #f0eeee; margin-top: 0.4rem"></div>
    <div class="mt-10 ysjj_box">
      <div class="flex flex__center">
        <div class="ysjj_tit" style="margin-top: 0.1rem">. 医师简介 .</div>
      </div>
      <div class="flex is">
        <div class="ysjj_cont">
          <p style="margin-left: 0.9rem">
            {{ doctorRemark }}
          </p>
        </div>
      </div>
    </div>
    <div style="border: 1px solid #f0eeee; margin-top: 0.2rem"></div>
    <div class="mt-10 ex_box">
      <div class="flex flex__center">
        <div class="ex_tit" style="margin-top: 0.1rem">. 擅长调理 .</div>
      </div
>      <div class="flex is">
        <template v-for="(value, index) in list">
          <div class="border border-box mb-10 ml-10 ex_item" :key="index">
            <span class="ml-5 mr-5">{{ value.medicineSubjectName }}</span>
          </div>
        </template>
      </div>
    </div>
    <div style="border: 1px solid #f0eeee; margin-top: 0.2rem"></div>
    <div style="overflow: hidden; margin-bottom: 1rem">
      <van-divider>已到底</van-divider>
    </div>
  </div>
</template>
<script>
import { doctorDetails } from "api/patient";
import HeadTop from "base/header/header";
import router from "../router";
import $ from "jquery";
import cookie from "js-cookie";
import tabBar from "../components/patientTabBar";
import QRCode from "qrcodejs2";
import wx from "weixin-js-sdk";
import VueDirectiveImagePreviewer from "vue-directive-image-previewer";
import "vue-directive-image-previewer/dist/assets/style.css";

export default {
  name: "houzhen",
  data() {
    return {
      doctorId: "",
      doctorName: "",
      list: [],
      levelName: "",
      doctorRemark: "",
      doctorPhoto: "",
      lists: [],
    };
  },
  created() {
    this.doctorId = this.$route.query.doctorId ? this.$route.query.doctorId : "";
    console.log(this.doctorId);
    this.doctorDetails();
  },
  computed: {},
  mounted() {
    // $("html").css("font-size", "15px");
    this.creatQrCodePatt();
    this.creatQrCodeDoct();
    var h = this.$refs.logoimg.offsetHeight;
    console.log(h);
    if (h > 200) {
      location.reload();
    }
  },
  methods: {
    creatQrCodePatt() {
      var h = this.$refs.qrCodeUrlPat.offsetHeight - 18;
      console.log(h);
      var qrcode = new QRCode(document.getElementById("ewmNone"), {
        text: "https://www.mfzhosp.com/H5/#/indexPage?doctorId=" + this.doctorId, // 需要转换为二维码的内容
        render: "canvas", //渲染方式有table方式（IE兼容）和canvas方式
        colorDark: "#000000",
        colorLight: "#ffffff",
        width: h,
        height: h,
        correctLevel: QRCode.CorrectLevel.H,
      });
      //在小米或者华为手机上生成的二维码是通过canvas展示的，img标签被隐藏,所以需要特殊处理一下，将canvas标签隐藏，拿到生成的url放到img里面再展示出来
      var myCanvas = document.getElementsByTagName("canvas")[0];
      var img = this.convertCanvasToImagePt(myCanvas);
      console.log(img);
      $("#ewm").append(img);
    },

    creatQrCodeDoct() {
      var h = this.$refs.qrCodeUrlDoc.offsetHeight - 18;
      console.log(h);
      var qrcode = new QRCode(document.getElementById("ewm2None"), {
        text: "https://www.mfzhosp.com/H5/#/docZhuCe?doctorId=" + this.doctorId, // 需要转换为二维码的内容
        render: "canvas", //渲染方式有table方式（IE兼容）和canvas方式
        colorDark: "#000000",
        colorLight: "#ffffff",
        width: h,
        height: h,
        correctLevel: QRCode.CorrectLevel.H,
      });
      //在小米或者华为手机上生成的二维码是通过canvas展示的，img标签被隐藏,所以需要特殊处理一下，将canvas标签隐藏，拿到生成的url放到img里面再展示出来
      var myCanvas = document.getElementsByTagName("canvas")[1];
      var img = this.convertCanvasToImageDc(myCanvas);
      console.log(img);
      $("#ewm2").append(img);
      // $("#ewm2").append(img); // 添加DOM
      //从 canvas 提取图片 image
    },
    convertCanvasToImagePt(canvas) {
      //新建Image对象
      var image = new Image();
      // canvas.toDataURL 返回的是一串Base64编码的URL
      image.src = canvas.toDataURL("https://www.mfzhosp.com/H5/#/indexPage");
      return image;
    },
    convertCanvasToImageDc(canvas) {
      //新建Image对象
      var image = new Image();
      // canvas.toDataURL 返回的是一串Base64编码的URL
      image.src = canvas.toDataURL("https://www.mfzhosp.com/H5/#/docZhuCe?doctorId=" + this.doctorId);
      return image;
    },
    goZinxun() {
      console.log(22222);
      this.$router.push({
        name: "indexPage",
      });
      //window.open("http://localhost:8080/H5/#/indexPage", "_blank");
    },
    goRenzheng() {
      console.log(111111);
      this.$router.push({
        name: "docZhuCe",
        query: {
          doctorId: this.doctorId,
        },
      });
    },
    doctorDetails() {
      let list = {
        patientId: "",
        token: "9876543210",
        //doctorId: this.doctorId,
        doctorId: "3c77b651aedd4f0b8e7a80d0786f74c4",
      };
      doctorDetails(list).then((res) => {
        console.log(res);
        this.lists = res.data;
        this.doctorName = res.data.doctorName;
        this.list = res.data.list_adept;
        this.levelName = res.data.levelName;
        this.doctorRemark = res.data.doctorRemark;
        //this.list = res.data;
        console.log(res.data.list_adept[0].medicineSubjectName);
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";
.mydevm {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.img_bg {
  width: 100%;
  padding-bottom: 0.1rem;
  background: linear-gradient(to right, #65aed7, #93e4de);
  .border-100 {
    width: 1.34rem;
    height: 1.34rem;
    border-radius: 100%;
    border: 2px solid #fff;
    margin: 0 auto;
    overflow: hidden;
  }
}
.ex_box {
  width: 100%;
  height: 5.8rem;
  .ex_tit {
    color: #504e4e;
    font-weight: 550;
    font-size: 0.3rem;
  }
  .ex_item {
    width: 2rem;
    height: 0.6rem;
    text-align: center;
    font-size: 0.28rem;
    float: left;
  }
  .ex_item:nth-child(2n) {
    margin-left: 1.3rem;
  }
}
.share_patient_box {
  position: relative;
  padding-bottom: 0.3rem;
  .share_txt {
    margin-left: 0.3rem;
    margin-top: -0.186rem;
    font-size: 0.28rem;
    width: 41%;
    height: 3rem;
  }
  .renzheng {
    width: 1.8rem;
    height: 0.5rem;
    background: linear-gradient(-47deg, #fde272, #fe807c);
    border-radius: 0.07rem;
    color: #fff;
    font-size: 0.3rem;
    font-weight: 600;
    position: absolute;
    text-align: center;
    line-height: 0.5rem;
    top: 2.7rem;
  }
  .poabl {
    left: 0.6rem;
  }
  .poabr {
    right: 0.6rem;
  }
  .erweima {
    width: 2.8rem;
    height: 2.8rem;
    background: linear-gradient(-47deg, rgba(188, 247, 233, 1), rgba(186, 249, 229, 1), rgba(164, 227, 245, 1));
    box-shadow: 1px 26px 21px 0px rgba(4, 0, 0, 0.24);
    border-radius: 19px;
    position: absolute;
    right: 0.3rem;
    top: 0.2rem;
    .qrcode {
      background: #fff;
      padding: 15px;
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 2.5rem;
      height: 2.5rem;

      canvas {
        width: 160px;
        height: 160px;
      }

      img {
        position: absolute;
        left: -75px;
        top: -75px;
        width: 150px;
        height: 150px;
        display: block;
        border: none;
        opacity: 0;
      }
    }
  }
}
.ysjj_box {
  .ysjj_tit {
    margin-top: 0.3rem;
    line-height: 0.2rem;
    color: #504e4e;
    font-weight: 550;
    font-size: 0.3rem;
  }
  .ysjj_cont {
    color: #504e4e;
    width: 90%;
    line-height: 0.35rem;
    font-size: 0.28rem;
    p {
      /* 显示两行，省略号 */
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.flex {
  padding-top: 0.3rem;
}
.flex__center {
  text-align: center;
}
.ml-10 {
  margin-left: 0.3rem;
  width: 90%;
  line-height: 0.6rem;
}
.mr-10 {
  margin-right: 0.3rem;
}

.mb-10 {
  margin-bottom: 0.3rem;
}
.f-white {
  color: #fff;
}
.border {
  border: 1px solid #eee;
}
.border-box {
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
</style>
