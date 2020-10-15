<template>
  <div class="page9">
    <van-tabs v-model="active">
      <van-tab title="提现历史详情">
        <div class="flex flex__justify flex__center bg-white" v-for="(value,index) in list" :key="index" >
          <div>
            <div class="ms mt">{{value.source}}</div>
            <div class="ms mb">{{value.createDate}}</div>
          </div>
          <div class="ms num">{{value.money}}</div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import {
    doctorMoneyMsg
  } from "api/doctor";
  import HeadTop from 'base/header/header'
  import router from '../router'
  import $ from 'jquery'
  import cookie from "js-cookie"
  export default {
    name: "Page9",
    data() {
      return {
        active: 2,
        list:""
      };
    },
    created() {
      this.showmoney();
    },
    methods: {
      showmoney(){
        let token = cookie.get("token");
        let doctorId = cookie.get("doctorId");
        console.log(doctorId)
        let list = {
          token: token,
          doctorId: doctorId,
        };
        doctorMoneyMsg(list).then((res) => {
          console.log(res)
          this.list=res.list_return2;
        });
      }
    }
  };
</script>
<style lang="less">
  .page9 {
    width: 100%;
    height: 100%;
    background: #eee;
    font-size: 0.2rem;

    .van-tab--active {
      color: #00c1de;
    }

    .van-tabs__line {
      background: #00c1de;
    }

    .flex {
      display: flex;
    }

    .flex__justify {
      justify-content: space-between;
    }

    .flex__center {
      align-items: center;
    }

    .bg-white {
      background: #fff;
      border-top: 1px solid #eee;
    }

    .ms {
      margin-left: 0.3rem;
      margin-right: 0.3rem;
    }

    .mt {
      margin-top: 0.2rem;
    }

    .mb {
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
    }

    .num {
      color: #00c1de;
    }

    .icon {
      width: 0.8rem;
      height: 0.8rem;
      display: inline-block;
    }

    .mr {
      margin-right: 0.3rem;
    }

    .ml {
      margin-left: 0.3rem;
    }

    .z {
      margin-left: 0.2rem;
    }
  }
</style>
