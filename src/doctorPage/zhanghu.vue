<template>
  <div style="background-color: #eee;">
    <div class="fixed">
      <div class="bg-l flex h-10 flex__center">
        <p class="ml-1 f-c f-2" style="margin-top: -2rem;margin-left: 2rem;">我的账户</p>
      </div>
      <div class="bg-blue border-radius ml-10 mr-10 h-8 mt-4">
        <div class="flex flex__justify">
          <div class="flex ml-1 f-c-6">
            <div class="f-35 mt-1">￥</div>
            <div class="f-3 mt-1">{{flag?'****':total}}</div>
          </div>
          <div class="mr-1 f-c-9 flex" @click="handleShow">
            <div class="mt-1 icon mr-1">
              <img v-if="flag" src="../assets/img/yanjing.png" />
              <img v-if="!flag" src="../assets/img/biyan_huaban1.png" />
            </div>
            <div class="mt-1">显示余额</div>
          </div>
        </div>
        <div class="ml-1 f-c-9">总资产(元)</div>
        <div class="flex mr-1" style="margin-left: 10rem;margin-top: -1.5rem;">
          <div class="f-c-9 mr-1 button">我要兑换</div>
          <div class="f-c-9 button">兑换详情</div>
        </div>
      </div>
    </div>
    <div class="bg-white mt-50">
      <div v-for="(value,index) in list">
        <div class="flex">
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
          <div class="mr-10" style="margin-top: -0.2rem;margin-bottom: 0.5rem;">{{value.createDate}}</div>
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

  export default {
    name: "Page5",
    data() {
      return {
        num: 5,
        flag: true,
        list: '',
        total: '0'
      };
    },
    created() {
      $('html').css('font-size', '15px');
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
        });
      }
    },
  };
</script>

<style lang="less" scoped>
  .bg-e {
    background: red;
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
    margin-left: 0.5rem;
    margin-top: 1rem;
  }

  .ml-10 {
    margin-left: 1rem;
  }

  .mr-10 {
    margin-right: 1rem;
  }

  .mt-1 {
    margin-top: 1rem;
  }

  .mt-4 {
    margin-top: -4rem;
  }

  .mt-5 {
    margin-top: 0.5rem;
  }

  .mb-5 {
    margin-bottom: 0.5rem;
  }

  .mt-50 {
    margin-top: 15rem;
  }

  .mr-1 {
    margin-right: 0.5rem;
  }

  .f-c {
    color: #fff;
  }

  .f-2 {
    font-size: 1.3rem;
    font-weight: 300;
  }

  .f-3 {
    font-size: 1.8rem;
  }

  .f-35 {
    font-size: 2.5rem;
  }

  .border-radius {
    border-radius: 0.5rem;
  }

  .h-10 {
    height: 10rem;
  }

  .h-8 {
    height: 8rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .f-c-6 {
    color: #666;
  }

  .f-c-9 {
    color: #999;
  }

  .icon {
    width: 1rem;
    height: 1rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .border-radius1 {
    width: 3rem;
    height: 3rem;
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
    border-radius: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.6rem;
    padding-bottom: 0.1rem;
    width: 5rem;
    height: 1.5rem;
    text-align: center;
  }

  .fixed {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
  }
</style>
