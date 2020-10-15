<template>
  <div class="page10">
    <div class="flex flex__justify flex__center">
      <div class="flex flex__center">
        <div class="my card">我的银行卡</div>
      </div>

    </div>
    <template v-for="(value,index) in list">
      <div class="fc-f flex flex__v box1" :class="
          index == 0 ? 'box1' : index == 1 ? 'box2' : index == 2 ? 'box3' : ''"
        :key="value">
        <div class="flex">
          <div class="pf">{{value.bankName}}</div>
          <div class="cx">{{value.index}}银行卡</div>
          <div @click="delcard(value.bankName)" :data-id='value.bankName' style="margin-top: 0.8rem;float: right;position: fixed;right: 0.5rem;font-size: 0.25rem;">选择银行卡</div>
        </div>
        <div class="number">**** **** **** **** {{value.bankCard}}</div>

      </div>
    </template>
    <confirm :text="tipText" ref="confirm" @cancel="cancel" @confirm="confirm"></confirm>
  </div>
</template>

<script>
  import {
    cardListOK
  } from "api/doctor";
  import HeadTop from 'base/header/header'
  import router from '../router'
  import $ from 'jquery'
  import confirm from 'base/confirm/confirm'
  import cookie from "js-cookie"
  export default {
    name: "Page10",
    data() {
      return {
        list: '',
        cardid:'',
        tipText:''
      };
    },
    created() {
      this.showcard();
    },
    methods: {
      showcard() {
        let token = cookie.get("token");
        let doctorId = cookie.get("doctorId");
        console.log(doctorId)
        let list = {
          token: token,
          doctorId: doctorId,
        };
        cardListOK(list).then((res) => {
          console.log(res)
          this.list = res.list;
        });
      },
      delcard(card) {
        console.log(card);
        this.cardid=card;
        this.tipText="您确定用"+card+"的这张银行卡提现吗？";
        this.$refs.confirm.show();
      },
      cancel(){
        this.$refs.confirm.hide();
      },
      confirm(){

      }

    },
    components: {
        confirm
    }

  };
</script>
<style lang="less">
  .page10 {
    width: 100%;
    height: 100vh;
    background: #eee;
    font-size: 0.2rem;

    .flex {
      display: flex;
    }

    .flex__justify {
      justify-content: space-between;
    }

    .flex__center {
      align-items: center;
    }

    .flex__v {
      flex-direction: column;
    }

    .icon {
      width: 0.8rem;
      height: 0.8rem;
      display: inline-block;
      margin-right: 0.3rem;
    }

    .card {
      font-size: 0.3rem;
    }

    .my {
      margin-top: 0.3rem;
      margin-left: 0.3rem;
    }

    .zhang {
      margin-left: 0.3rem;
    }

    .fc-f {
      color: #fff;
    }

    .box1 {
      background: linear-gradient(#378bcc, #3665bd);
      border-radius: 0.2rem;
      margin-top: 0.3rem;
      margin-left: 0.3rem;
      margin-right: 0.3rem;
    }

    .box2 {
      background: linear-gradient(#03aa99, #038fac);
      border-radius: 0.2rem;
      margin-top: 0.3rem;
      margin-left: 0.3rem;
      margin-right: 0.3rem;
    }

    .box3 {
      background: linear-gradient(#fa756b, #fa5463);
      border-radius: 0.2rem;
      margin-top: 0.3rem;
      margin-left: 0.3rem;
      margin-right: 0.3rem;
    }

    .pf {
      margin-left: 0.3rem;
      margin-top: 0.3rem;
      font-size: 0.3rem;
    }

    .cx {
      margin-left: 0.3rem;
      margin-top: 0.3rem;
      font-size: 0.3rem;
    }

    .number {
      margin-top: 0.3rem;
      margin-left: 0.3rem;
      margin-bottom: 0.3rem;
      font-size: 0.3rem;
    }

    .bg-w {
      background: #fff;
      border-radius: 0.1rem;
      margin-left: 0.3rem;
      margin-right: 0.3rem;
      margin-top: 0.3rem;
    }

    .bottom {
      border-radius: 0.1rem;
      background: #00b0c2;
      margin: 0.3rem auto;
      width: 5rem;
      height: 0.6rem;
      color: #fff;
      line-height: 0.6rem;
      text-align: center;
    }
  }
</style>
