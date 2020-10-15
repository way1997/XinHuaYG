<template>
  <div  class="page">
    <div class="fixed">
      <div class="bg-l flex h-10 flex__center">
        <p class="ml-1 f-c f-2" >我的账户</p>
      </div>
      <div class="bg-blue border-radius ml-10 mr-10 h-8 mt-4">
        <div class="flex flex__justify">
         <div>
            <div class="flex ml-1 f-c-6">
            <div class="f-35 mt-1">￥</div>
            <div class="f-3 mt-1">{{flag?'****':total}}</div>
          </div>
          <div class="ml-1 zzc f-c-9">总资产(元)</div>
         </div>
          <div class="flex flex__v">
            <div class="mr-1 f-c-9 flex" @click="handleShow">
            <div class="mt-1 icon mr-1">
              <img v-if="flag" src="../assets/img/yanjing.png" />
              <img v-if="!flag" src="../assets/img/biyan_huaban1.png" />
            </div>
            <div class="mt-1" style="font-size: 0.3rem;">显示余额</div>
          </div>
          <div class="f-c-9 mr-1 botton-t  button" @click="tixian">我要提现</div>
          <div class="f-c-9 button  botton-t" @click="jiaoyixq">提现详情</div>
          </div>
        </div>
        <div class="flex">
        </div>
      </div>
      <confirm :text="tipText" ref="confirm" @cancel="cancel" @confirm="confirm"></confirm>
    </div>

    <div class="bg-white mt-50" style="line-height: 0.3rem;">
      <div class="flex flex__v" v-for="(value,index) in list" :key="index" >
        <div class="flex" >
          <div class="border-radius1 flex__center flex__j_c flex mt-5 f-c ml-1">+{{value.money}}</div>
          <div class="flex flex__justify ml-10">
            <div class="mt-5 mb-5">
              <div>获得{{value.money}}积分</div>
              <div>{{value.patientName}}的{{value.source}}</div>
            </div>
          </div>
        </div>
        <div class="flex flex__justify border-b">
          <div></div>
          <div class="mr-10  mb-5">{{value.createDate}}</div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import {
    accountPage,
    doctorMoneyMsg
  } from "api/doctor";
  import HeadTop from 'base/header/header'
  import router from '../router'
  import $ from 'jquery'
  import cookie from "js-cookie"
  import confirm from 'base/confirm/confirm'
  export default {
    name: "Page",
    data() {
      return {
        num: 5,
        flag: true,
        list:"",
        total: '0',
        tipText:''
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
        this.$router.push("/jiaoyi");
      },
      showzhanghu() {
        let token = cookie.get("token");
        let doctorId = cookie.get("doctorId");
        let list = {
          token: token,
          doctorId: doctorId,
        };
        doctorMoneyMsg(list).then((res) => {
          console.log(res)
          this.list = res.list_return;
        });
      },
      showmeony() {
        let token = cookie.get("token");
        let doctorId = cookie.get("doctorId");
        console.log(doctorId)
        let list = {
          token: token,
          doctorId: doctorId,
        };
        accountPage(list).then((res) => {
          console.log(res)
          this.total = res.data.income;
          this.tipText="您的账户余额"+res.data.income+"元，是否提现？";
        });

      },
      tixian(){
        this.$refs.confirm.show();
      },
      cancel(){
        this.$refs.confirm.hide();
      },
      confirm(){
        this.cancel();
        this.$router.push({ name: 'cardlist', params: { userId: 123 }});
      }
    },
    components: {
        confirm
    }
  };
</script>

<style lang="less" scoped>
  .page {
  font-size: 0.2rem !important;
    .bg-e {
      background: red;
    }

    .flex__v{
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
      margin-top: .2rem;
    }

    .ml-10 {
      margin-left: .3rem;
    }

    .mr-10 {
      margin-right: .3rem;
    }

    .mt-1 {
      margin-top: .3rem;
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
      margin-top: 4.6rem;
    }

    .mr-1 {
      margin-right: 0.3rem;
    }

    .f-c {
      color: #fff;
    }

    .f-2 {
      font-size: .4rem;
      font-weight: 300;
    }

    .f-3 {
      font-size: .6rem;
    }

    .f-35 {
      font-size: .8rem;
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

    .f-c-6 {
      color: #666;
    }

    .f-c-9 {
      color: #999;
    }

    .icon {
      width: .3rem;
      height: .3rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .border-radius1 {
      width: .6rem;
      height: .6rem;
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
      border-radius: .1rem;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      width: 1.4rem;
      height: .6rem;
      line-height:.6rem;
      text-align: center;
    }
    .botton-t{
      margin-top:.2rem;
    }

    .fixed {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
    }
    .zzc{
      font-size:.3rem;
    }
  }
</style>
