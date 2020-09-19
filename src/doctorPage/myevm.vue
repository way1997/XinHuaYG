
<template>
  <div>
    <div class="img_bg">
      <div class="flex flex__center">
        <div class="mt-30 mb-40 border-100">
          <!-- img 占位 -->
          <img :src="lists.doctorPhoto" />
        </div>
      </div>
      <div class="flex f-white ml-10" style="width: 20rem;">
        <div class="f-1 mb-10">
          {{doctorName}} -
          <span class="f-30">{{levelName}}</span>
        </div>
      </div>
    </div>
    <div class="flex flex1 flex__justify bg-white">
      <div class="ml-10 mt-10" style="margin-left: 1rem;font-size: 1.1rem;">"这是我二维码名片</br>长按图片或扫码</br>直接与我交流"</div>

      <!-- img占位 -->
      <div class="erweima">
        <div class="qrcode" ref="qrCodeUrl" id="ewm"></div>
        <!-- <img src="../assets/img/erweima.png" alt=""> -->

      </div>
    </div>
    <div style="border:1px solid #f0eeee;margin-top: 2rem;"></div>
    <div class="mt-10 bg-white">
      <div class="flex flex__center mb-10">
        <div style="margin-top: 0.1rem;">---擅长调理---</div>
      </div>
      <div class="flex is">
              <template v-for="(value,index) in list">
                <div class="border border-box mb-10 ml-10" :key="index" style="width: 7rem;">
                  <span class="ml-5 mr-5">{{value.medicineSubjectName}}</span>
                </div>
              </template>
            </div>
    </div>
    <div style="border:1px solid #f0eeee;margin-top: 2rem;"></div>
    <!-- 医师简介 -->
    <div class="mt-10 bg-white">
      <div class="flex flex__center mb-10">
        <div style="margin-top: 0.1rem;">---医师简介---</div>
      </div>
      <div class="mb-10" style="height: 15rem;">
        <p class="ml-10">{{doctorRemark}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { doctorDetails} from "api/patient";
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
        doctorId: '',
        doctorName: '',
        list:[],
        levelName:'',
        doctorRemark:'',
        doctorPhoto:'',
        lists:[]
      }
    },
    created() {
      $('html').css('font-size','15px');
      this.doctorId = this.$route.query.doctorId;
      this.doctorName = this.$route.query.doctorName;
      this.token = this.$route.query.token;
      console.log(this.doctorId)
      this.doctorDetails();
    },
    computed: {

    },
    mounted() {
      this.creatQrCode();
    },
    methods: {
      creatQrCode() {
        var h = this.$refs.qrCodeUrl.offsetHeight;
        console.log(h)
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: 'https://www.mfzhosp.com/H5/#/indexPage?doctorId=' + this.doctorId, // 需要转换为二维码的内容
          colorDark: '#000000',
          colorLight: '#ffffff',
          width: h +20,
          height: h +20,
          correctLevel: QRCode.CorrectLevel.H
        })
      },
      doctorDetails() {
        let list = {
          patientId: '',
          token: '9876543210',
          doctorId: this.doctorId,
        };
        doctorDetails(list).then((res) => {
          console.log(res)
          this.lists=res.data;
          this.doctorName=res.data.doctorName;
          this.list=res.data.list_adept;
          this.levelName=res.data.levelName;
          this.doctorRemark=res.data.doctorRemark;
          //this.list = res.data;
           console.log(res.data.list_adept[0].medicineSubjectName)
        });
      },
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/less/base.less';
  .erweima {
    width: 10rem;
    height: 10rem;
    background: linear-gradient(-47deg, rgba(188, 247, 233, 1), rgba(186, 249, 229, 1), rgba(164, 227, 245, 1));
    box-shadow: 1px 26px 21px 0px rgba(4, 0, 0, 0.24);
    border-radius: 19px;
    margin: 0 auto;
    position: relative;
    margin-top: 0.8rem;

    .qrcode {
      background: #fff;
      padding: 15px;
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 9rem;
      height: 9rem;

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
  .flex {
    display: flex;
  }
  .flex1 {
    flex: 1;
  }
  .is {
    flex-wrap: wrap;
    margin-left: -0.5rem;
  }
  .flex__justify {
    justify-content: space-between;
  }
  .flex__v {
    flex-direction: column;
  }
  .flex__center {
    justify-content: center;
    align-items: center;
  }
  .border-100 {
    width: 6rem;
    height: 6rem;
    border-radius: 100%;
    border: 2px solid #fff;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .img_bg {
    background: linear-gradient(to right, #65aed7, #93e4de);
  }
  .f-white {
    color: #fff;
  }
  .ml-10 {
    margin-left: 1rem;
    width: 10rem;
        line-height: 2rem;
  }
  .mr-10 {
    margin-right: 1rem;
  }
  .mb-10 {
    margin-bottom: 1rem;
  }
  .mt-30 {
    margin-top: 3rem;
  }
  .mt-10 {
    margin-top: 2.5rem;
  }
  .mb-40 {
    margin-bottom: 4rem;
  }
  .mb-1 {
    margin-bottom: 0.8rem;
  }
  .f-1 {
    font-size: 1.8rem;
  }
  .f-30 {
    font-size: 1rem;
  }
  .bg-white {
    background: #fff;
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
  .ml-5 {
    margin-left: 0.5rem;
  }
  .mr-5 {
    margin-right: 0.5rem;
  }
  .mt-1 {
    margin-top: 0.5rem;
  }
  img {
    display: inline-block;
    margin: 0;
    padding: 0;
  }
</style>
