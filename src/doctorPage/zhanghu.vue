<template>
  <div class="page">
    <div class="fixed zindex_2" style="background: rgb(251, 250, 250, 0.7)">
      <div class="bg-l flex h-10 flex__center">
        <p class="ml-1 f-c f-2 trsc_t">我的账户</p>
      </div>
      <div class="bg-blue border-radius ml-10 mr-10 h-10 mt-4 trsc_t">
        <div class="flex flex__justify">
          <div>
            <div class="flex ml-1 f-c-6">
              <div class="f-35 mt-1">￥</div>
              <div class="f-3 mt-1">{{ flag ? "****" : total }}</div>
            </div>
            <div class="ml-1 zzc f-c-9">总资产(元)</div>
            <div class="ml-1 zzd f-c-9">
              已提金额(元)：<span class="f-c-6"
                >￥ {{ flag ? "****" : accountUsed }}</span
              >
            </div>
            <div class="ml-1 zzd f-c-9">
              剩余金额(元)：<span class="f-c-6"
                >￥ {{ flag ? "****" : accountResidual }}</span
              >
            </div>
          </div>
          <div class="flex flex__v">
            <div class="mr-1 f-c-9 flex" @click="handleShow">
              <div class="mt-1 icon mr-1">
                <img v-if="flag" src="../assets/img/yanjing.png" />
                <img v-if="!flag" src="../assets/img/biyan_huaban1.png" />
              </div>
              <div class="mt-1" style="font-size: 0.3rem">显示余额</div>
            </div>
            <div class="f-c-9 mr-1 botton-t button" @click="tixian">
              我要提现
            </div>
            <div class="f-c-9 button botton-t" @click="jiaoyixq">提现详情</div>
          </div>
        </div>
        <div class="flex"></div>
      </div>
    </div>

    <div class="bg-white mt-50 zindex_1" style="line-height: 0.3rem">
      <van-tabs v-model="active" title-active-color="#00b0c2">
        <van-tab title="礼物">
          <div
            class="flex flex__v"
            v-for="(value, index) in list1"
            :key="index"
          >
            <div class="flex">
              <div
                class="border-radius1 flex__center flex__j_c flex mt-5 f-c ml-1"
              >
                +{{ value.money }}
              </div>
              <div class="flex flex__justify ml-10">
                <div class="mt-5 mb-5">
                  <div>获得{{ value.money }}元</div>
                  <div>{{ value.patientName }}的{{ value.source }}</div>
                  <div>
                    <span class="f-c-6"> 预扣 {{ value.expectMoney }} </span>
                    <span class="f-c-6" style="padding-left: 0.6rem">
                      剩余 {{ value.surplus }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex__justify">
              <div></div>
              <div class="mr-10 mb-5">{{ stateArr[value.states] }}</div>
            </div>
            <div class="flex flex__justify border-b">
              <div></div>
              <div class="mr-10 mb-5">{{ value.createDate }}</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="开方">
          <div
            class="flex flex__v"
            v-for="(value, index) in list2"
            :key="index"
          >
            <div class="flex">
              <div
                class="border-radius1 flex__center flex__j_c flex mt-5 f-c ml-1"
              >
                +{{ value.money }}
              </div>
            <div class="flex flex__justify ml-10">
                <div class="mt-5 mb-5">
                  <div>获得{{ value.money }}积分</div>
                  <div>{{ value.patientName }}的{{ value.source }}</div>
                  <div>
                    <span class="f-c-6"> 预扣 {{ value.expectMoney }} </span>
                    <span class="f-c-6" style="padding-left: 0.6rem">
                      剩余 {{ value.surplus }}
                    </span>
                  </div>
                </div>
            </div>
            </div>
            <div class="flex flex__justify">
              <div></div>
              <div class="mr-10 mb-5">{{ stateArr[value.states] }}</div>
            </div>
            <div class="flex flex__justify border-b">
              <div></div>
              <div class="mr-10 mb-5">{{ value.createDate }}</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="邀请医生">
          <div
            class="flex flex__v"
            v-for="(value, index) in list3"
            :key="index"
          >
            <div class="flex">
              <div
                class="border-radius1 flex__center flex__j_c flex mt-5 f-c ml-1"
              >
                ￥{{ value.money }}
              </div>
            <div class="flex flex__justify ml-10">
                <div class="mt-5 mb-5">
                  <div>获得{{ value.money }}元</div>
                  <div>{{value.patientName}} 的奖励</div>
                  <div>
                    <span class="f-c-6"> 预扣 {{ value.expectMoney }} </span>
                    <span class="f-c-6" style="padding-left: 0.6rem">
                      剩余 {{ value.surplus }}
                    </span>
                  </div>
                </div>
            </div>
            </div>
            <div class="flex flex__justify">
              <div></div>
              <div class="mr-10 mb-5">{{ stateArr[value.states] }}</div>
            </div>
            <div class="flex flex__justify border-b">
              <div></div>
              <div class="mr-10 mb-5">{{ value.createDate }}</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <confirm1
      :text="tipText"
      ref="confirm1"
      @cancel="cancel1"
      @confirm="confirm1"
    ></confirm1>
    <confirm2
      :text="tipText"
      ref="confirm2"
      @cancel="cancel2"
      @confirm="confirm2"
    ></confirm2>
  </div>
</template>

<script>
import {
  accountPage,
  doctorMoneyMsg,
  saveAccountMsg,
} from "api/doctor";
import { formatDate } from "../util/util";
import HeadTop from "base/header/header";
import router from "../router";
import $ from "jquery";
import cookie from "js-cookie";
import confirm2 from "base/confirm/confirm2";
import confirm1 from "base/confirm/confirm1";
import { Toast } from "vant";
export default {
  name: "Page",
  data() {
    return {
      num: 5,
      flag: true,
      list1: "", // 礼物
      list2: "", //开方
      list3: "", //邀请医生
      active: 0,
      total: "0",
      tipText: "",
      accountUsed: "", //已提现金额
      accountResidual: "", //剩余金额
      accountId: "",
      subMethod: "", //提现方式
      expectMoney: "", //预扣
      surplus: "", //剩余
      states: "", //兑换状态
      stateArr: ["未兑换", "已兑换", "部分兑换"],
    };
  },
  created() {
    //$('html').css('font-size', '15px');
    this.showmeony();
    this.showzhanghu();
  },
  methods: {
    handleShow() {
      if (this.flag) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    jiaoyixq() {
      this.$router.push({
        name: "jiaoyi",
        params: {
          accountId: this.accountId,
        },
      });
    },
    showzhanghu() {
      let token = cookie.get("token");
      let doctorId = cookie.get("doctorId");
      let list = {
        token: token,
        doctorId: doctorId,
      };
      doctorMoneyMsg(list).then((res) => {
        console.log(res);
        this.list1 = res.list_return;
        this.list2 = res.list_return1;
        this.list3 = res.list_return4;
      });
      
    },
    showmeony() {
      let token = cookie.get("token");
      let doctorId = cookie.get("doctorId");
      console.log(doctorId);
      let list = {
        token: token,
        doctorId: doctorId,
      };
      accountPage(list).then((res) => {
        console.log(res);
        this.total = res.data.remainder;
        this.accountId = res.accountId;
        this.tipText = String(res.data.accountResidual);
        this.accountUsed = res.data.accountUsed;
        this.accountResidual = res.data.accountResidual;
      });
    },
    tixian() {
      this.$refs.confirm1.show();
    },
    cancel1() {
      this.$refs.confirm1.hide();
    },
    cancel2() {
      this.$refs.confirm2.hide();
    },
    confirm1(msg) {
      this.cancel1();
      console.log(msg);
      this.subMethod = msg;
      this.$refs.confirm2.show();
    },
    confirm2(msg) {
      // this.cancel();
      console.log(msg);
      let sendMoney = msg;
      let accountId = this.accountId;
      if (this.subMethod == 1) {
        this.$router.push({
          name: "cardlist",
          params: {
            money: sendMoney,
            accountId: accountId,
          },
        });
      } else if (this.subMethod == 2) {
        console.log("线下提现金额==" + msg);
        let token = cookie.get("token");
        let accountId = this.accountId;
        let accountUsed = msg;
        let txmode = this.subMethod - 1;
        let list = {
          token: token,
          accountId: accountId,
          accountUsed: accountUsed,
          cardNo: "",
          bankCode: "",
          accountName: "",
          txmode: txmode,
        };
        console.log(list);

        saveAccountMsg(list)
          .then((res) => {
            console.log(res);
            if (res.type == false) {
              this.$toast.center(
                "您有待审核或有需要确认的订单，请在审核通过后及时确认订单再提现 *^_^*"
              );
            } else {
              Toast.success("申请成功，等待审核");
              this.cancel2();
            }
            clearTimeout(this.loop2); //再次清空定时器，防止重复注册定时器
            this.loop2 = setTimeout(() => {
              this.$router.push({
                name: "jiaoyi",
                params: {
                  accountId: this.accountId,
                },
              });
            }, 1800);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  components: {
    confirm2,
    confirm1,
  },
  // 转换时间戳
  filters: {
    formatDate(time) {
      time = time;
      let date = new Date(time);
      //console.log(date);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-tabs__line {
  background-color: rgb(0, 176, 194);
}

/deep/.van-tab__text--ellipsis {
  font-size: 0.3rem;
}

.page {
  font-size: 0.2rem !important;

  .bg-e {
    background: red;
  }

  .flex__v {
    flex-direction: column;
  }

  .flex {
    display: flex;
  }

  .flex__center {
    align-items: center;
  }

  .flex__j_c {
    justify-content: center;
  }

  .flex__justify {
    justify-content: space-between;
    position: relative;
  }

  .bg-l {
    background: linear-gradient(#00b0c2, #5cf5e4);
  }

  .bg-white {
    background: #fff;
  }

  .bg-e {
    background: #f0eeee;
  }

  .bg-blue {
    background: lavenderblush;
  }

  .f-c {
    color: #fff;
  }

  .ml-1 {
    margin-left: 0.3rem;
    margin-top: 0.2rem;
  }

  .ml-10 {
    margin-left: 0.3rem;
  }

  .mr-10 {
    margin-right: 0.3rem;
  }

  .mt-1 {
    margin-top: 0.3rem;
  }

  .mt-4 {
    margin-top: -1rem;
  }

  .mt-5 {
    margin-top: 0.3rem;
  }

  .mb-5 {
    margin-bottom: 0.1rem;
  }

  .mt-50 {
    position: relative;
    top: 5.2rem;
  }

  .mr-1 {
    margin-right: 0.3rem;
  }

  .f-c {
    color: #fff;
  }

  .f-2 {
    font-size: 0.4rem;
    font-weight: 300;
  }

  .f-3 {
    font-size: 0.6rem;
  }

  .f-35 {
    font-size: 0.8rem;
  }

  .border-radius {
    border-radius: 0.3rem;
  }

  .h-10 {
    height: 3rem;
  }

  .h-8 {
    height: 2.6rem;
  }

  .h-11 {
    height: 3.5rem;
  }

  .f-c-6 {
    color: #666;
  }

  .f-c-9 {
    color: #999;
  }

  .icon {
    width: 0.3rem;
    height: 0.3rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .border-radius1 {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 100%;
    background: #4eacbf;
  }

  .w {
    width: 100%;
  }

  .border-b {
    border-bottom: 1px solid #eee;
  }

  .margin {
    margin: -15% auto;
  }

  .button {
    background: linear-gradient(#37dad6, #00b0c2);
    color: #fff;
    border-radius: 0.1rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    width: 1.4rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
  }

  .botton-t {
    margin-top: 0.2rem;
  }

  .fixed {
    width: 100%;
    //height: 100%;
    position: fixed;
    top: 0;
  }

  .zzc {
    font-size: 0.3rem;
  }

  .zzd {
    font-size: 0.25rem;
  }

  .trsc_t {
    transform: translateY(-0.8rem);
  }

  .zindex_1 {
    z-index: 1;
  }

  .zindex_2 {
    z-index: 2;
  }
}
</style>
