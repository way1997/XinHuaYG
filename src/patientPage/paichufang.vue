<template>
  <div class="paichufang">
    <div class="zhezhao" v-if="loadUpz"></div>
    <img src="../assets/img/LODING.gif" v-if="loadUp" alt="" class="loading" />
    <div class="backHome" @click="backHome">返回上一级</div>
    <div class="xian"></div>
    <div class="photoBox">
      <p class="btn_uppto">
        <span class="btn_txt"></span>
        <img :src="uploadImg" />
        <input ref="input" type="file" accept="image/*" @change="handleFileChange" />
      </p>
      <p class="btn_posinpto">
        <img src="../assets/img/cfxx.png" class="img1" @click="changjianwenti" />
        <span>常见问题</span>
      </p>
    </div>
    <div class="xian"></div>
    <div></div>
    <div class="tan_content">
      <div style="width: 100%; height: 0px"></div>
      <!-- 空状态-->
      <van-empty description="暂无订单" v-if="chufangDatalist == false"> </van-empty>

      <div>
        <div class="wrap002" v-for="(item, index) in chufangDatalist" :key="index">
          <div style="width: 100%; height: 100%" @click="upchufang_xq(item)">
            <div class="wrap_tit">
              <div class="wrap_tit1">处方信息</div>
              <div class="wrap_tit1 wrap_tit2"></div>
              <!--<div class='wrap_tit3'>查看详情</div> -->
            </div>
            <div class="wrap_tit5"></div>
            <div class="wrap_tit6">{{ item.createDate }}</div>
            <div class="wrap_tit7">{{ statusName[item.preStatus] }}</div>
          </div>
          <div class="wrap_tit8" v-if="item.indentStates == '0'">
            <div class="patDelate" type="info" @click="patDelate(item)">删除</div>
          </div>
          <div class="wrap_tit9" v-if="item.preStatus == '3'">
            <div v-if="item.indentStates == '0'" class="patPay" type="info" @click="patPay(item)">缴费购买</div>
            <div v-if="item.indentStates == '1'" class="patPayok" type="info" @click="patPayok(item)">已支付</div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog v-model="dialogShow" @confirm="confirmUpdata" @cancel="cancelUpdata" title="是否上传此处方？" show-cancel-button>
      <img style="width: 100%; max-height: 8rem" :src="saveImg" />
    </van-dialog>
    <van-dialog v-model="delateShow" @confirm="confirmDelate" title="是否删除此处方？" show-cancel-button> </van-dialog>
  </div>
</template>

<script>
import { findPatient, findPatPrescriptionList, PatPrescriptionSaveMsg, delMsg } from "api/patient";
import { Toast } from "vant";
import HeadTop from "base/header/header";
import router from "../router";
import cookie from "js-cookie";
import baseURI from "api/env";
import VueDirectiveImagePreviewer from "vue-directive-image-previewer";
import "vue-directive-image-previewer/dist/assets/style.css";
export default {
  name: "paichufang",
  data() {
    return {
      token: "",
      saveImg: "",
      patientId: "",
      resStatus: "",
      doctorId: "",
      patPreId: "",
      prescriptionId: "",
      dialogShow: false,
      delateShow: false,
      loadUp: false,
      loadUpz: false,
      patientName: "",
      loop2: false,
      active: 1,
      patientSex: "",
      patientSexnum: "",
      patientId: "",
      delatepatientId: "",
      age: "",
      preEnjoin: "",
      uploadImg: require("../assets/img/addBtn.png"),
      imgDatas: [],
      photo1: "",
      medicineType: 1,
      imgcount: 0,
      chufangDatalist: false,
      statusName: ["", "已上传，待录入", "已打回", "已完成"],
      transmit_paicf: 1, //拍处方跳支付信号
    };
  },
  created() {
    this.token = this.$route.query.token ? this.$route.query.token : cookie.get("token");
    this.patientId = this.$route.query.patientId ? this.$route.query.patientId : cookie.get("patientId");
    this.findPatient();
    this.findPatPrescriptionList();
  },
  computed: {},
  methods: {
    backHome() {
      this.$router.push({
        name: "indexPage",
      });
    },
    findPatient() {
      let list = {
        token: this.token,
        patientId: this.patientId,
      };
      this.loadUp = true;
      findPatient(list).then((res) => {
        console.log(res);
        this.loadUp = false;
        this.patientName = res.patientName;
        this.imgUrl = res.imgUrl;
        this.age = res.age;
        this.patientSexnum = res.patientSex;
        if (res.patientSex == 1) {
          this.patientSex = "男";
        } else {
          this.patientSex = "女";
        }
      });
    },
    //获取患者上传处方列表
    findPatPrescriptionList() {
      let list = {
        token: this.token,
        patientId: this.patientId,
      };
      findPatPrescriptionList(list)
        .then((res) => {
          //console.log(res)
          this.chufangDatalist = res.list;

          console.log(this.chufangDatalist);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFileChange(event) {
      //上传图片
      var files = this.$refs.input.files;
      var that = this;
      this.loadUp = true;
      this.loadUpz = true;

      function readAndPreview(file) {
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          var reader = new FileReader();
          reader.onload = function (e) {
            // 防止重复上传
            that.saveImg = e.target.result;
            //console.log(that.saveImg)
            if (that.imgDatas.indexOf(e.target.result) === -1) {
              that.imgDatas.push(e.target.result);
              // that.uploadImg = e.target.result;
              that.imgcount = 1;
            }
          };
          reader.readAsDataURL(file);
        }
      }
      let param = new FormData(); // 创建form对象
      param.append("file", files[0]);
      //console.log(files[0])
      that.axios
        .post(baseURI + "/mkkMoblie/uploadFile/picture", param, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          //console.log(response)
          this.loadUp = false;
          this.loadUpz = false;
          if (escape(response.data).indexOf("%u") < 0) {
            //console.log(response);

            this.photo1 = baseURI + "/mkkMoblie/" + response.data;
            that.resStatus = response.status;
          } else {
            this.$toast.center("该图片路径包含中文，请修改图片名称在上传");
          }
          console.log(that.resStatus);
        })
        .catch((error) => {
          alert("上传图片出错！");
        });
      readAndPreview(files[0]);
      if (files.length === 0) {
        return;
      }
    },

    dialogImg() {
      this.dialogShow = true;
    },
    confirmUpdata() {
      console.log("确认上传");
      let patientName = this.patientName;
      let patientAge = this.patientAge;
      let patientSex = this.patientSex;
      let photo = this.photo1;
      let medicineType = "1";

      let list = {
        token: this.token,
        patientId: this.patientId,
        patientName: this.patientName,
        patientAge: this.age,
        patientSex: this.patientSexnum,
        photo: this.photo1,
        medicineType: "1",
      };
      console.log(list);
      PatPrescriptionSaveMsg(list)
        .then((res) => {
          console.log(res);
          if (res.type) {
            Toast.success(res.massage);
            clearTimeout(this.loop2); //再次清空定时器，防止重复注册定时器
            this.loop2 = setTimeout(() => {
              window.location.reload();
            }, 1800);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancelUpdata() {},
    upchufang_xq(e) {
      //console.log(e)
      let patPreId = e.patPreId;
      let preStatus = e.preStatus;
      this.$router.push({
        name: "upchufangDetail",
        query: {
          patPreId: patPreId,
          preStatus: preStatus,
        },
      });
    },
    patDelate(e) {
      console.log(e);
      this.delateShow = true;
      this.delatepatientId = e.patPreId;
      //this.confirmDelate(e)
    },
    confirmDelate(e) {
      let patPreId = this.delatepatientId;
      let token = this.token;
      let list = {
        token: token,
        patPreId: patPreId,
      };
      delMsg(list)
        .then((res) => {
          console.log(res);
          if (res.type == true) {
            Toast.success(res.idMsg);
            clearTimeout(this.loop2); //再次清空定时器，防止重复注册定时器
            this.loop2 = setTimeout(() => {
              window.location.reload();
            }, 1800);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    patPay(e) {
      console.log(e);
      this.doctorId = e.doctorId;
      this.patPreId = e.patPreId;
      this.prescriptionId = e.prescriptionId;
      this.$router.push({
        name: "chufangXq",
        query: {
          doctorId: this.doctorId,
          patientId: this.patientId,
          indentId: this.prescriptionId,
          signal: this.transmit_paicf,
        },
      });
    },
    patPayok(e) {
      this.$toast.center("已完成购买 *^_^*");
    },
    changjianwenti() {
      this.$router.push("/paizhaowenti");
    },
  },
  watch: {
    photo1() {
      console.log("状态发生改变==" + this.photo1);
      if (this.resStatus == 200) {
        this.dialogImg();
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";

.zhezhao {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.loading {
  width: 1rem;
  height: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
}

.backHome {
  width: 81.666%;
  height: 0.76rem;
  background: #00afc2;
  border-radius: 0.13rem;
  text-align: center;
  line-height: 0.76rem;
  color: #fff;
  font-size: 0.32rem;
  margin: 0 auto;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}

.xian {
  width: 100%;
  height: 10px;
  background: #efefef;
  clear: both;
}

.updataBtn {
  width: 1.8rem;
  height: 1.8rem;
  position: fixed;
  bottom: 0.2%;
  right: 50%;
  transform: translateX(50%);
  z-index: 66;

  p {
    position: relative;
    width: 1.6rem;
    height: 1.6rem;
    float: right;

    .btn_txt {
      width: 82%;
      height: 0.27rem;
      font-size: 0.3rem;
      position: absolute;
      bottom: -0.1rem;
      font-weight: 400;
      margin-left: 0.15rem;
      font-weight: 600;
      text-align: center;
      color: #5a5555;
      background-color: #fff;
    }

    img {
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      //background-color: #fff;
    }

    input {
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}

.tan_content {
  width: 100%;
  height: 100%;

  .wrap002 {
    width: 100%;
    height: 2rem;
    background: #fff;
    padding: 0 0.24rem;
    box-sizing: border-box;
    margin-bottom: 0.17rem;
    position: relative;
    border-bottom: 0.01rem dashed #d2d2d2;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      color: transparent;
    }

    .wrap_tit {
      width: 100%;
      height: 0.92rem;
      font-size: 0.3rem;
      color: #828282;
      line-height: 0.92rem;
    }

    .wrap_tit1 {
      float: left;
      margin-right: 0.36rem;
    }

    .wrap_tit2 {
      color: #717171;
      font-size: 0.3rem;
    }

    .wrap_tit3 {
      float: right;
    }

    .wrap_tit4 {
      width: 0.4rem;
      height: 0.4rem;
      float: right;
      margin-top: 0.27rem;
      margin-left: 0.08rem;
    }

    .wrap_tit5 {
      float: left;
      font-size: 0.3rem;
      color: #828282;
      line-height: 0.92rem;
    }

    .wrap_tit6 {
      float: left;
      clear: both;
      color: #717171;
      font-size: 0.3rem;
      margin-top: 0.4rem;
    }

    .wrap_tit6 div {
      display: inline;
    }

    .wrap_tit7 {
      color: #00b0c2;
      font-size: 0.3rem;
      // float: right;
      position: absolute;
      top: -0.1rem;
      left: 1.65rem;
      margin-top: 0.4rem;
    }

    .wrapwu {
      width: 100%;
      height: 98.5%;
      background: #fff;
    }

    .wrap_tit8 {
      width: 1.2rem;
      height: 0.6rem;
      display: block;
      position: absolute;
      bottom: 13%;
      right: 2.4%;
      font-size: 0.28rem;
    }

    .wrap_tit9 {
      width: 1.2rem;
      height: 0.6rem;
      display: block;
      position: absolute;
      top: 7%;
      right: 2.4%;
      font-size: 0.28rem;
    }

    .patDelate {
      width: 0.9rem;
      height: 0.28rem;
      padding: 0.1rem 0.1rem;
      border: 1px solid #00b0c2;
      text-align: center;
      background-color: #00b0c2;
      color: #fff;
      position: absolute;
      bottom: 0rem;
      right: 0.01rem;
      font-size: 0.28rem;
      border-radius: 0.1234rem;
    }

    .patPay {
      width: 1.2rem;
      height: 0.28rem;
      padding: 0.1rem 0.1rem;
      border: 1px solid #00b0c2;
      text-align: center;
      background-color: #00b0c2;
      color: #fff;
      position: absolute;
      top: 0rem;
      right: 0.01rem;
      border-radius: 0.1234rem;
      font-size: 0.28rem;
    }

    .patPayok {
      width: 1.2rem;
      height: 0.28rem;
      padding: 0.1rem 0.1rem;
      border: 1px solid #90a0a2;
      text-align: center;
      background-color: #90a0a2;
      color: #fff;
      position: absolute;
      top: 0rem;
      right: 0.01rem;
      border-radius: 0.1234rem;
      font-size: 0.28rem;
    }
  }
}

.photoBox {
  width: 98%;
  margin: 0 auto;
  height: 1.6rem;
  position: relative;
  p {
    position: absolute;
    overflow: hidden;
    top: 2%;
    width: 1.5rem;
    height: 1.5rem;
    img {
      position: absolute;
      right: 0;
      top: 0;
      width: 1.5rem;
      height: 1.5rem;
    }

    input {
      position: absolute;
      right: 0;
      top: 0;
      width: 1.5rem;
      height: 1.5rem;
      opacity: 0;
    }
  }
  .btn_uppto {
    left: 20%;
  }
  .btn_posinpto {
    right: 20%;
    width: 1.47rem;
    height: 1.47rem;
    border: 2px solid darkgray;
    span {
      position: absolute;
      margin-top: 73%;
      margin-left: -1px;
      background-color: darkgray;
      width: 1.6rem;
      height: 0.4rem;
      text-align: center;
      vertical-align: middle;
      font-size: 0.28rem;
      color: white;
      line-height: 0.5rem;
    }
  }
}

/deep/.van-dialog__header {
  padding-top: 26px;
}

/deep/.van-dialog {
  top: 46%;
}

.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>
