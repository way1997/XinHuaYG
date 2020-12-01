<template>
  <div class="center">
    <div class="wrap">
      <div class="head">
        <img src="../assets/img/head1.jpg" />
        <p>{{ doctorName }}</p>
        <div class="renzhengShc"></div>
        <div class="renzheng">去认证<span style="font-size: 0.28rem"> ></span></div>
      </div>
      <div class="tabBtn"></div>
      <div style="clear: both"></div>
    </div>
    <!--注册-->
    <div class="xiugaimima">
      <div class="xiugai">
        <div class="fangshi">
          <p class="lineD">新用户注册</p>
        </div>
        <div>
          <section style="clear: both"></section>
          <div class="mima">
            <span>姓名:</span>
            <input type="text" placeholder="输入姓名" v-model="zhuceName" />
          </div>
          <div class="mima"><span>手机号:</span><input type="tel" placeholder="输入手机号" v-model="zhucePhone" /></div>

          <div class="mima">
            <span>验证码:</span><input type="number" placeholder="输入验证码" v-model="zhuceYzm" class="yanZm" /><em @click="doctorRegisteredNum">{{ yanText }}</em>
          </div>
          <div class="denglu" @click="doctorRegister">注册</div>
        </div>
      </div>
    </div>
    <tabBar />
  </div>
</template>
<script>
import { doctorRegisteredNum, addInviteMsg } from "api/doctor";
import router from "../router";
import cookie from "js-cookie";
import $ from "jquery";
import tabBar from "../components/patientTabBar";
export default {
  name: "docZhuCe",
  data() {
    return {
      pageName: "个人中心",
      doctorImgUrl: require("../assets/img/head1.jpg"),
      state: "",
      yqdoctorId: "", //邀请医生的id
      doctorName: "未注册",
      renzhengtate: "去认证 >",
      renzhentext: "医疗资质未认证",
      zhuceName: "",
      zhucePhone: "",
      zhuceYzm: "",
      yanzhengmaZ: "",
      disBtn: false,
      yanText: "获取验证码",
      countdown: 60,
      countDownNum: "获取验证码",
    };
  },
  created() {
    let isShare = this.$route.query.share;
    this.yqdoctorId = this.$route.query.doctorId;
    console.log(this.yqdoctorId);
  },
  mounted() {},
  computed: {},
  methods: {
    doctorRegisteredNum() {
      //注册获取验证码
      if (this.testZ()) {
        let list = {
          phone: this.zhucePhone,
        };
        if (this.disBtn == true) {
          return this.$toast("已发送成功，请稍后获取");
        }
        doctorRegisteredNum(list).then((res) => {
          this.disBtn = true;
          console.log(res);
          this.$toast("发送成功");
          this.yanzhengmaZ = res.info;
          this.timeOutZ();
        });
      }
    },
    doctorRegister() {
      if (this.zhuceName == "" || this.zhucePhone == "" || this.zhuceYzm == "") {
        this.$toast("信息填写不完整");
        return false;
      }
      if (this.yanzhengmaZ == this.zhuceYzm) {
        let list = {
          userId: this.yqdoctorId,
          openId: "",
          doctorName: this.zhuceName,
          phone: this.zhucePhone,
        };
        console.log(list);
        addInviteMsg(list).then((res) => {
          console.log(res);
          if (res.info == 1005) {
            this.$toast("注册成功");
            cookie.set("token", res.token);
            cookie.set("doctorId", res.doctorId);
            let loop0 = false;
            clearTimeout(loop0); //再次清空定时器，防止重复注册定时器
            loop0 = setTimeout(() => {
              this.$router.push({
                name: "homePage",
              });
            }, 2000);
          } else if (res.info == "0000") {
            this.$toast("已经注册过了,换个手机号继续注册吧");
          } else if (res.info == 1004) {
            this.$toast("注册失败请重新注册");
          } else {
            console.log(res);
            this.$toast(res.info);
          }
        });
      } else {
        this.$toast("验证码不正确");
      }
    },
    testZ() {
      if (this.zhucePhone == "") {
        this.$toast("请输入手机号");
        return false;
      } else if (!/^1[3|4|5|7|8]\d{9}$/.test(this.zhucePhone)) {
        this.$toast("手机号码格式不正确");
        return false;
      } else {
        return true;
      }
    },
    timeOutD() {
      let _this = this;
      _this.countdown = 60;
      _this.disBtn = true;
      if (_this.countdown == 0) {
        _this.disBtn = false;
        _this.countDownNum = "获取验证码";
        _this.countdown = 60;
      } else {
        _this.disBtn = true;
        _this.countdown--;
        _this.countDownNum = "重新发送" + _this.countdown + "s";
        setTimeout(function () {
          _this.timeOutD();
        }, 1000);
      }
    },
    timeOutZ() {
      let _this = this;
      //_this.countdown = 60;
      _this.disBtn = true;
      if (_this.countdown == 0) {
        _this.disBtn = false;
        _this.yanText = "获取验证码";
        _this.countdown = 60;
      } else {
        _this.disBtn = true;
        _this.countdown--;
        _this.yanText = "重新发送" + _this.countdown + "s";
        setTimeout(function () {
          _this.timeOutZ();
        }, 1000);
      }
    },
  },
  components: {
    tabBar,
  },
};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";

.wrap {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 200px;
}

.head {
  width: 100%;
  height: 244px;
  background: linear-gradient(-47deg, rgba(188, 247, 233, 1), rgba(84, 202, 204, 1), rgba(110, 156, 222, 1));
  box-shadow: 1px 10px 39px 0px rgba(4, 0, 0, 0.35);
  border-radius: 13px;
  padding-top: 37px;
  margin-top: 16px;

  img {
    width: 132px;
    height: 132px;
    display: block;
    margin: 0 auto;
    border-radius: 50%;
  }

  p {
    width: 100%;
    text-align: center;
    font-size: 25px;
    color: #fff;
    padding-top: 33px;
  }

  .renzheng {
    width: 128px;
    height: 50px;
    background: linear-gradient(-47deg, rgba(253, 226, 114, 1), rgba(254, 128, 124, 1));
    border-radius: 7px;
    color: #fff;
    font-size: 25px;
    position: absolute;
    right: 29px;
    top: 29px;
    text-align: center;
    line-height: 50px;
  }

  .renzhengShc {
    width: 200px;
    height: 50px;
    color: rgb(114, 114, 114);
    font-size: 23px;
    position: absolute;
    right: 29px;
    top: 80px;
    right: -0.05rem;
    text-align: center;
    line-height: 50px;
  }
}

.tabBtn {
  width: 100%;
  height: 127px;
  background: linear-gradient(-47deg, rgba(188, 247, 233, 1), rgba(84, 202, 204, 1), rgba(110, 156, 222, 1));
  box-shadow: 1px 10px 39px 0px rgba(4, 0, 0, 0.35);
  border-radius: 13px;
  margin-top: 10px;
}
.xiugaimima {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  .xiugai {
    width: 658px;
    height: 696px;
    background: rgba(255, 255, 255, 1);
    border-radius: 13px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .headXiu {
      width: 100%;
      height: 86px;
      border-bottom: 1px solid #a7a7a7;
      text-align: center;
      line-height: 86px;
      font-size: 25px;
      color: #878787;
    }

    .mima {
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.25rem;
      color: #878787;
      padding-top: 0.3rem;
      padding-left: 0.42rem;

      span {
        float: left;
        width: 111px;
      }

      input {
        width: 414px;
        height: 68px;
        border: 1px solid #c9c9c9;
        font-size: 25px;
        border-radius: 68px;
        padding-left: 20px;
        color: #878787;
        background: none;
        -webkit-appearance: none;
      }

      input::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size: 25px;
      }

      input.yanZm {
        width: 260px;
      }

      em {
        font-size: 25px;
        color: #42cac6;
        float: right;
        padding-right: 60px;
      }
    }

    button {
      width: 275px;
      height: 65px;
      background: rgba(84, 213, 210, 1);
      border-radius: 13px;
      color: #fff;
      font-size: 25px;
      border: none;
      margin-top: 80px;

      &:nth-of-type(1) {
        margin-left: 36px;
      }

      &:nth-of-type(2) {
        background: rgba(253, 126, 126, 1);
      }
    }
  }

  .mimaDl {
    color: #42cac6;
    font-size: 25px;
    padding-top: 40px;
    float: right;
    width: 150px;
  }

  .fangshi {
    width: 570px;
    height: 96px;
    color: #828282;
    font-size: 27px;
    margin: 0 auto;

    p {
      width: 50%;
      height: 100%;
      line-height: 96px;
      text-align: center;
      float: left;
    }

    p.lineD {
      text-align: center;
      width: 100%;
      border-bottom: 1px solid #42cac6;
      color: #42cac6;
    }
  }

  .denglu {
    width: 570px;
    height: 75px;
    background: #42cac6;
    color: #fff;
    text-align: center;
    line-height: 75px;
    margin: 0 auto;
    font-size: 27px;
    margin-top: 60px;
  }
}
</style>
