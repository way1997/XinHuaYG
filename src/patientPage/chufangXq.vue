<template>
  <div class="chufangxq" id="chufangxq">
    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp" />
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian" style="clear: both"></div>
    <div class="four">
      <h1>医生信息</h1>
      <div class="info">
        <p>
          <span>医生:</span><label>{{ lists.doctorName }}</label>
        </p>
        <p>
          <span>医院:</span><label>{{ lists.hospitalName }}</label>
        </p>
        <p>
          <span>职称:</span><label>{{ lists.levelName }}</label>
        </p>
        <p>
          <span>科室:</span><label>{{ lists.departmentName }}</label>
        </p>
      </div>
      <div class="xian"></div>
      <h1 v-if="lists.isLook != 0">药方信息</h1>
      <div class="info" v-if="lists.isLook != 0">
        <p>
          <span>辩证:</span><label>{{ lists.symptom }}</label>
        </p>
        <p><span>类型:</span><label v-if="medicineType == 1">中药</label></p>
        <p>
          <span>药态:</span><label>{{ lists.preShapeName }}</label>
        </p>
        <p class="yaofang">
          <span>药方:</span><label class="yaoList" v-for="(item, index) in lists.lists_medicine" :key="index">{{ item.medicineName }}{{ item.howWeight }}</label>
        </p>
        <p class="jiFu">
          <span>剂量:</span><label>共{{ lists.preNum }}剂</label>
        </p>
      </div>
      <div class="xian" style="clear: both"></div>
      <h1>其他信息</h1>
      <div class="info">
        <p>
          <span>诊金:</span><label>{{ zhenjinT }}</label>
        </p>
        <p><span>购药前查看药方:</span><label v-show="lists.isLook == 0">不可看</label><label v-show="lists.isLook == 1">可看</label></p>
        <p class="fuyaojinji" style="height: auto">
          <span>服药禁忌:</span><label v-for="(item, index) in lists.taboo" :key="index">{{ item.tabooName }}、</label>
        </p>
        <section style="clear: both"></section>
        <p class="buchongshuoming">
          <span>补充说明:</span><label>{{ lists.sickName }}</label>
        </p>
      </div>
      <div class="xian" style="clear: both"></div>
      <h1>配送信息</h1>
      <div class="info" style="">
        <div class="chooseWay">
          <!--<label v-for="(item,index) in peisong1" :key="index" @click="peisong(index)"><img :src="content1==index?require('../assets/img/danxuan.png'):require('../assets/img/danxuang1.png')" class="tu2">{{item.name}}</label> -->
          <label @click="peisong(peisong1[0].id)"><img :src="contentXu == peisong1[0].id ? require('../assets/img/danxuan.png') : require('../assets/img/danxuang1.png')" class="tu2" />{{ peisong1[0].name }}</label>
          <label @click="peisong(peisong1[1].id)"><img :src="contentXu == peisong1[1].id ? require('../assets/img/danxuan.png') : require('../assets/img/danxuang1.png')" class="tu2" />{{ peisong1[1].name }}</label>
        </div>
        <p style="padding-bottom: 0.9rem; line-height: 0.6rem">
          <span>最近药房:</span><label>{{ yaodiantext }}</label>
        </p>
        <div v-if="content1 == 1" style="padding-bottom: 0.8rem; line-height: 0.6rem">
          <p><label style="color: #00afc2" @click="showAdd">更改地址</label></p>
          <section style="clear: both"></section>
          <p>
            <span>收货人:</span><label>{{ userAddress.recipient }}</label>
          </p>
          <p>
            <span>手机号码:</span><label>{{ userAddress.tel || userAddress.repPhone }}</label>
          </p>
          <p style="height: auto">
            <span>收货地址:</span><label style="line-height: 0.4rem; margin-top: 0.18rem">{{ userAddress.address }}</label>
          </p>
          <section style="clear: both"></section>
          <p v-if="content1 == 1" style="margin-top: 0.5rem; padding-bottom: 0.2rem">
            <span>快递费:</span><label>{{ prices.price4 }}</label>
          </p>
        </div>
      </div>
      <h1 v-if="isAgency == 1">是否代煎</h1>
      <!-- <van-radio-group v-model="radio">
            <van-cell-group>
                <van-cell v-for="(item,idx) in daijianMeth" :title="item.name" :key="idx" clickable @click="getSelect(item)" :border="false">
                    <van-radio slot="right-icon" checked-color="#009e96" :name="item.name" />
                </van-cell>

            </van-cell-group>
        </van-radio-group> -->
      <div style="padding-bottom: 1.3rem" class="info" v-if="isAgency == 1">
        <div class="chooseWay">
          <label @click="daijian(index)" v-for="(item, index) in daijian1" :key="index"><img :src="content2 == index ? require('../assets/img/danxuan.png') : require('../assets/img/danxuang1.png')" class="tu2" />{{ item.name }}</label>
        </div>
        <section style="clear: both"></section>
        <div>
          <div v-if="content2 == 1">
            <section class="info_box info_box2" v-if="isshahuoj">
              <span>代煎方式:</span>
              <label>
                <van-radio-group v-model="radio" direction="horizontal" @change="getSelect(radio)">
                  <van-radio checked-color="#00afc2" name="1">普通煎</van-radio>
                  <van-radio checked-color="#00afc2" name="2">砂锅煎</van-radio>
                </van-radio-group>
              </label>
            </section>
          </div>
          <section style="clear: both"></section>
          <p class="info_box" v-if="content2 == 1">
            <span>代煎费:</span><label>{{ this.sendDaijian }}</label>
          </p>
        </div>
      </div>
      <div class="xian" style="clear: both"></div>
    </div>
    <van-divider style="padding: 0.2rem 0 0.999rem 0">已到底</van-divider>
    <div class="total">
      <div>
        费用：
        <span v-if="isPatientPrescription == 0">{{ prices.price1 }}</span>
        <span v-if="isPatientPrescription == 1" style="text-decoration: line-through; margin-right: 0.1rem; font-size: 0.24rem; color: #8a8a8a">原价{{ prices.price1 }}</span>
        <span v-if="isPatientPrescription == 1">折扣价{{ prices.pricezk }}</span>
        元(药费)+{{ zhenjinT }}元(诊金)<em v-if="content1 == 1">+{{ prices.price4 }}(邮寄费)</em>
        <em v-if="content2 == 1">+{{ sendDaijian }}元(代煎费)</em>
      </div>
      <div @click="indentPay">
        支付
        <span v-if="isPatientPrescription == 0">{{ total_sum }}</span>
        <span v-if="isPatientPrescription == 1">{{ total_sumzk }}</span>
        元
      </div>
    </div>
    <div class="addDizhi" v-if="huanDizhi" @click.stop="hideDizhi"></div>
    <div class="addressL" v-if="huanDizhi">
      <div class="list">
        <div v-for="(item, index) in shou" :key="index" @click="changeAddress(item)">
          <div>{{ item.recipient }} {{ item.repPhone }}</div>
          <div>{{ item.address }}</div>
        </div>
        <div class="addXin" @click="goAdd">使用新地址</div>
      </div>
    </div>
  </div>
</template>

<script>
import { patientPayPage, mateShop, indentPay, addressList, sendMsg7 } from "api/patient";
import HeadTop from "base/header/header";
import router from "../router";
import cookie from "js-cookie";
import wx from "weixin-js-sdk";
import $ from "jquery";
export default {
  name: "chufangxq",
  data() {
    return {
      content1: 0,
      content2: 0,
      contentXu: null,
      token: "",
      signal: 0, //接收跳转页信号
      nodaijian: 0,
      patientId: "",
      doctorId: "",
      indentId: "",
      prescriptionId: "",
      lists: "",
      isAgency: "",
      yaodiantext: "",
      recipient: "",
      receiptPlace: "",
      repPhone: "",
      prices: "", // price1-药费;price2-制作费;price3-代煎费;price4-配送费
      pricezk: "", //药材费折扣金额
      money: "",
      shopId: "",
      zhenjinT: "",
      loadUp: true,
      total_sum: "", //原总价
      total_sumzk: "", //折扣总价
      addressId: "",
      appid: "wx60af22e8126cde6a",
      mch_id: "1511807751",
      peisong1: [
        {
          name: "到店自提",
          id: 0,
        },
        {
          name: "配送到家",
          id: 1,
        },
      ],
      daijian1: [
        {
          name: "否",
        },
        {
          name: "是",
        },
      ],
      shou: "",
      huanDizhi: false,
      userAddress: "",
      medicineType: "1",
      dingdanPageQi: 0, // 传输都订单页发送的信号
      pageInd: "",
      active: "",
      isshahuoj: false, //是否开启砂锅煎   =>长风诊所  (5块)
      radio: "1",
      dosage: "", //剂量
      shaguoPirce: "", //砂锅煎费用，
      changfengId: "1d5e5f42fdcf41e3a3e50ae8e09118fd", //长风诊所id
      daijianMeth: [
        {
          id: 1,
          name: "普通煎",
        },
        {
          id: 2,
          name: "砂锅煎",
        },
      ],
      putdaijian: "", //普通代煎费储存值
      sendDaijian: "", //需要提交的代煎费  即view层
      isPatientPrescription: "", //折扣状态返回 0-无折扣 1-有折扣
      // isshowzk:false, //判断是否显示折扣价
    };
  },
  created() {
    $("#chufangxq").scrollTop(0);
    this.token = cookie.get("token");
    this.patientId = this.$route.query.patientId ? this.$route.query.patientId : cookie.get("patientId");
    this.doctorId = this.$route.query.doctorId;
    this.indentId = this.$route.query.indentId;
    this.prescriptionId = this.$route.query.prescriptionId;
    this.dingdanPageQi = this.$route.query.dingdanPageQi; //定向传输信号
    this.pageInd = this.$route.query.pageInd;
    this.active = this.$route.query.active;
    this.signal = this.$route.query.signal ? this.$route.query.signal : 0;

    // console.log(this.pageInd, this.active)
    this.addressList();
  },
  computed: {},

  methods: {
    goBack() {
      if (this.dingdanPageQi == 1) {
        this.$router.push({
          name: "dingdan",
          params: {
            pageInd: this.pageInd,
            active: this.active,
          },
        });
      } else {
        this.$router.go(-1);
      }
    },
    goAdd() {
      this.$router.push("/addDizhi");
    },
    showAdd() {
      this.huanDizhi = true;
    },
    hideDizhi() {
      this.huanDizhi = false;
    },
    changeAddress(item) {
      this.receiptPlace = item.address;
      this.userAddress = item;
      this.huanDizhi = false;
      this.addressId = item.recipientId;
      console.log("this.addressId=" + this.addressId);
      // this.patientPayPage();
      let list = {
        token: this.token,
        patientId: this.patientId,
        indentId: this.indentId,
        doctorId: this.doctorId,
        addressId: this.addressId,
      };
      patientPayPage(list).then((res) => {
        this.loadUp = false;
        this.lists = res.data;
        console.log(res.data);
        this.yaodiantext = res.map_return_money.shopName;
        console.log(this.yaodiantext);
      });
    },
    addressList() {
      let list = {
        token: this.token,
        patientId: this.patientId,
      };
      addressList(list).then((res) => {
        this.loadUp = false;
        this.shou = res.data;
        console.log(res);
        if (res.data.length == 0) {
          alert("无收货地址请先添加收货地址！");
          this.$router.push("/addDizhi");
        } else {
          this.patientPayPage();
        }
        // for (var i = 0; i < res.data.length; i++) {
        // if (res.data[i].isDefault == "1") {
        //   this.addressId = res.data[i].recipientId;

        // }
        //  }
      });
    },
    patientPayPage() {
      let list = {
        token: this.token,
        patientId: this.patientId,
        indentId: this.indentId,
        doctorId: this.doctorId,
        addressId: this.addressId,
      };
      let that = this;
      console.log(list);
      patientPayPage(list).then((res) => {
        this.lists = res.data;
        this.isPatientPrescription = res.isPatientPrescription;
        console.log(res);
        if (res.type == false) {
          that.$toast.center(res.massage);
          let loop0 = false;
          clearTimeout(loop0); //再次清空定时器，防止重复注册定时器
          loop0 = setTimeout(() => {
            that.goBack();
          }, 2000);
        }
        this.isAgency = res.data.isAgency;
        this.yaodiantext = res.map_return_money.shopName;
        this.recipient = res.data.address.recipient;
        this.receiptPlace = res.data.address.address;
        this.userAddress = res.data.address;
        this.addressId = res.data.address.addressId;
        this.repPhone = res.data.address.tel;
        this.prices = res.big;
        this.money = res.data.list;
        this.shopId = res.map_return_money.medicineShopId;
        this.dosage = res.data.preNum;
        for (var i = 0; i < this.money.length; i++) {
          if (this.money[i].moneyDescribe == 5) {
            this.zhenjinT = this.money[i].money;
          }
        }

        // console.log(this.content2)
        this.prescriptionId = res.data.indentId;
        this.medicineType = res.data.medicineType;
        this.total_sum = (this.prices.price1 + this.prices.price2 + this.zhenjinT).toFixed(2);
        if (this.isPatientPrescription == 1) {
          this.total_sumzk = (this.prices.pricezk + this.prices.price2 + this.zhenjinT).toFixed(2);
          // console.log('折扣价'+this.total_sumzk)
        }

        //console.log(this.prices)
        this.putdaijian = this.prices.price3;
        this.sendDaijian = this.putdaijian;
      });
    },
    indentPay() {
      //去支付
      if (this.contentXu == null) {
        this.$toast.center("请先选择配送方式");
      } else {
        //daijian
        let agencyMoney = 0;
        // console.log(this.content2)
        if (this.content2 == 0) {
          agencyMoney = 0;
        } else {
          agencyMoney = this.sendDaijian;
        }
        //peisong

        let dispatchingMoney = 0;
        // console.log(this.content2)
        dispatchingMoney = this.content1 == 0 ? 0 : this.prices.price4;
        let that = this;
        let list = {
          token: this.token,
          appid: this.appid,
          indentId: this.prescriptionId,
          mch_id: this.mch_id,
          patientId: this.patientId,
          shopId: this.shopId,
          money: this.isPatientPrescription == 1 ? this.total_sumzk : this.total_sum, //折扣总价
          moneyzkq: this.total_sum, //原总价
          is_dispatching: this.content1,
          dispatchingMoney: dispatchingMoney,
          is_to_agency: this.content2,
          agencyMoney: agencyMoney,
          makeMoney: this.prices.price2,
          medicinalMoney: this.prices.price1,
          addressId: this.addressId,
          recipient: this.recipient,
          receiptPlace: this.receiptPlace,
          phone: this.repPhone,
        };

        console.log(list);

        indentPay(list).then((res) => {
          let total_sum = this.isPatientPrescription == 1 ? this.total_sumzk : this.total_sum;
          let that = this;
          //console.log(res.packageP);
          WeixinJSBridge.invoke(
            "getBrandWCPayRequest",
            {
              appId: res.packageP.appId, //公众号名称，由商户传入
              timeStamp: res.packageP.timeStamp, //时间戳，自1970年以来的秒数
              nonceStr: res.packageP.nonceStr, //随机串
              package: res.packageP.package,
              signType: res.packageP.signType, //微信签名方式：
              paySign: res.packageP.paySign, //微信签名sign
            },
            function (res) {
              //   alert(res.err_msg)
              let json = [
                {
                  lx: "hz",
                  id: that.patientId,
                },
              ];
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                that.$toast("付款成功!");
                let json = [
                  {
                    lx: "hz",
                    id: that.patientId,
                  },
                ];
                let listArr = {
                  json: JSON.stringify(json),
                  d1: "您好！您有一笔订单支付成功。",
                  d2: that.recipient,
                  d3: that.repPhone,
                  d4: "新华医馆网上问诊平台",
                  d5: total_sum,
                  d6: that.receiptPlace,
                  d7: "请您点击详情进入查看。",
                  type: "9",
                  path: "pages/order/order",
                  appid: "wx2061bee8caa00a0d",
                  url: "https://www.mfzhosp.com/H5/#/dingdan",
                };
                let json2 = [
                  {
                    lx: "yd",
                    id: that.shopId,
                  },
                ];
                let listArr2 = {
                  json: JSON.stringify(json2),
                  d1: "您好！您的药店有一笔订单，请关注。",
                  d2: that.recipient,
                  d3: that.repPhone,
                  d4: "新华医馆网上问诊平台",
                  d5: total_sum,
                  d6: that.receiptPlace,
                  d7: "请您点击详情进入查看。",
                  type: "9",
                  path: "pages/index/index",
                  appid: "wx39a214e57af00eba",
                  url: "https://www.mfzhosp.com/H5",
                };
                sendMsg7(listArr).then((res) => {
                  console.log(res);
                });
                sendMsg7(listArr2).then((res) => {
                  console.log(res);
                });

                that.submithid = false;
                setTimeout(function () {
                  if (that.signal == 0) {
                    that.$router.push({
                      name: "chachufang",
                    });
                  } else if (that.signal == 1) {
                    that.$router.push({
                      name: "paichufang",
                    });
                  }
                }, 1500);
              } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                alert("支付失败！");
                that.submithid = false;
              } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                alert("调起微信支付失败");
                that.submithid = false;
              }
            }
          );
        });
      }
    },
    daijian(index) {
      this.content2 = index;
      // console.log(index)

      console.log(this.shopId == this.changfengId);
      if (this.shopId == this.changfengId) {
        this.isshahuoj = true;
      } else {
        this.isshahuoj = false;
      }

      if (this.content2 == 0 && this.content1 == 1) {
        this.total_sum = (this.prices.price1 + this.prices.price2 + this.prices.price4 + this.zhenjinT).toFixed(2);

        if (this.isPatientPrescription == 1) {
          //折扣总价
          this.total_sumzk = (this.prices.pricezk + this.prices.price2 + this.prices.price4 + this.zhenjinT).toFixed(2);
        }
      } else if (this.content2 == 1 && this.content1 == 1) {
        this.total_sum = (this.prices.price1 + this.prices.price2 + this.sendDaijian + this.prices.price4 + this.zhenjinT).toFixed(2);
        if (this.isPatientPrescription == 1) {
          //折扣总价
          this.total_sumzk = (this.prices.pricezk + this.prices.price2 + this.sendDaijian + this.prices.price4 + this.zhenjinT).toFixed(2);
        }
      } else if (this.content2 == 1 && this.content1 == 0) {
        this.total_sum = (this.prices.price1 + this.prices.price2 + this.sendDaijian + this.zhenjinT).toFixed(2);

        if (this.isPatientPrescription == 1) {
          //折扣总价
          this.total_sumzk = (this.prices.pricezk + this.prices.price2 + this.sendDaijian + this.zhenjinT).toFixed(2);
        }
      } else if (this.content2 == 0 && this.content1 == 0) {
        this.total_sum = (this.prices.price1 + this.prices.price2 + this.zhenjinT).toFixed(2);

        if (this.isPatientPrescription == 1) {
          //折扣总价
          this.total_sumzk = (this.prices.pricezk + this.prices.price2 + this.zhenjinT).toFixed(2);
        }
      }
    },
    peisong(index) {
      // alert(index)
      this.content1 = index;
      this.contentXu = this.content1;
      //this.price3 = index;
      if (this.content2 == 0 && this.content1 == 1) {
        this.total_sum = (this.prices.price1 + this.prices.price2 + this.prices.price4 + this.zhenjinT).toFixed(2);

        if (this.isPatientPrescription == 1) {
          //折扣总价
          this.total_sumzk = (this.prices.pricezk + this.prices.price2 + this.prices.price4 + this.zhenjinT).toFixed(2);
        }
      } else if (this.content2 == 1 && this.content1 == 1) {
        this.total_sum = (this.prices.price1 + this.prices.price2 + this.sendDaijian + this.prices.price4 + this.zhenjinT).toFixed(2);

        if (this.isPatientPrescription == 1) {
          //折扣总价
          this.total_sumzk = (this.prices.pricezk + this.prices.price2 + this.sendDaijian + this.prices.price4 + this.zhenjinT).toFixed(2);
        }
      } else if (this.content2 == 1 && this.content1 == 0) {
        this.total_sum = (this.prices.price1 + this.prices.price2 + this.sendDaijian + this.zhenjinT).toFixed(2);

        if (this.isPatientPrescription == 1) {
          //折扣总价
          this.total_sumzk = (this.prices.pricezk + this.prices.price2 + this.sendDaijian + this.zhenjinT).toFixed(2);
        }
      } else if (this.content2 == 0 && this.content1 == 0) {
        this.total_sum = (this.prices.price1 + this.prices.price2 + this.zhenjinT).toFixed(2);

        if (this.isPatientPrescription == 1) {
          //折扣总价
          this.total_sumzk = (this.prices.pricezk + this.prices.price2 + this.zhenjinT).toFixed(2);
        }
      }
    },
    change1(index) {
      this.content1 = index;
    },
    change2(index) {
      this.content2 = index;
    },
    getSelect(e) {
      this.radio = e;
      if (e == 2) {
        this.shaguoPirce = this.dosage * 5;
        //console.log('砂锅煎费==' + this.shaguoPirce)
        this.sendDaijian = this.shaguoPirce;
      } else if (e == 1) {
        this.sendDaijian = this.putdaijian;
      }
      this.daijian(1);
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";

.chufangxq {
  overflow: hidden;
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
  height: 0.1rem;
  background: #efefef;
  clear: both;
}

.four {
  width: 100%;

  h1 {
    width: 22%;
    height: 0.53rem;
    line-height: 0.53rem;
    text-align: center;
    font-size: 0.29rem;
    color: #fff;
    background: #00afc2;
    border-radius: 0 0.27rem 0.27rem 0;
    margin-top: 0.2rem;
  }

  .info {
    widows: 100%;
    //height:268px;
    background: #fff;

    p {
      width: 90%;
      height: 0.77rem;
      border-bottom: 0.02rem solid #f5f5f5;
      color: #828282;
      font-size: 0.28rem;
      line-height: 0.77rem;
      margin: 0 auto;
      padding: 0 0.1rem;

      span {
        float: left;
      }

      label {
        float: right;
      }
    }

    .info_box {
      width: 90%;
      height: 0.77rem;
      border-bottom: 0.02rem solid #f5f5f5;
      color: #828282;
      font-size: 0.28rem;
      line-height: 0.77rem;
      margin: 0 auto;
      padding: 0 0.1rem;

      span {
        float: left;
      }

      label {
        float: right;
      }
    }

    /deep/.van-radio__label {
      color: #828282;
    }

    .info_box2 {
      width: 90%;
      height: 0.3rem;
      line-height: 0.3rem;
      border: none;
    }

    p.yaofang {
      height: auto;
      float: left;
      margin-left: 0.24rem;
      line-height: 0.5rem;
    }

    p.buchongshuoming {
      margin-top: 10%;
    }

    .yaoList {
      width: 70%;
    }

    p.jiFu {
      float: left;
      margin-left: 0.2rem;
    }

    div.chooseWay {
      width: 100%;
      height: 0.77rem;
      font-size: 0.21rem;
      color: #828282;
      padding-top: 0.2rem;

      label {
        float: left;
        width: 32%;
        padding-left: 0.4rem;
        font-size: 0.3rem;

        &:nth-of-type(2) {
          padding-left: 1rem;
        }
      }

      img {
        width: 0.38rem;
        height: 0.38rem;
        vertical-align: middle;
        margin: 0.1rem;
      }
    }
  }
}

.total {
  width: 100%;
  height: 1.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;

  div:nth-of-type(1) {
    width: 53%;
    font-size: 0.25rem;
    color: #4e4747;
    line-height: 0.37rem;
    padding: 0.3rem 0 0 0.32rem;
    float: left;
    border-top: 0.01rem solid #f1f1f1;
  }

  div:nth-of-type(2) {
    width: 35.7%;
    height: 1.5rem;
    float: right;
    background: #00afc2;
    font-size: 0.32rem;
    color: #fff;
    text-align: center;
    line-height: 1.5rem;
  }
}

.addDizhi {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
}

.addressL {
  width: 100%;
  height: 576px;
  overflow-y: scroll;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;

  .list {
    width: 100%;

    > div {
      width: 100%;
      height: 1.57rem;
      border-bottom: 0.01rem solid #e4e4e4;
      padding-bottom: 0.25rem;

      div {
        padding: 0 0.3rem;

        span {
          color: #00b0c2;
          float: right;

          img {
            width: 0.29rem;
            height: 0.3rem;
            vertical-align: middle;
            margin: 0 0.1rem;
          }
        }
      }

      div:nth-of-type(1) {
        font-size: 0.2666rem;
        color: #757575;
        padding-top: 0.5rem;
      }

      div:nth-of-type(2) {
        font-size: 0.2666rem;
        color: #b7b7b7;
        padding-top: 0.25rem;
      }
    }

    .addXin {
      width: 80%;
      height: 0.5rem;
      margin: 0 auto;
      font-size: 0.3rem;
      color: #fff;
      text-align: center;
      line-height: 0.8rem;
      background: #00afc2;
      border-radius: 0.2rem;
      margin-top: 0.2rem;
    }
  }
}

::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}

.loading {
  width: 1rem;
  height: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.zanwuxinxi {
  width: 3.3rem;
  height: 4.17rem;
  display: block;
  margin: 0 auto;
  margin-top: 1rem;
}
</style>
