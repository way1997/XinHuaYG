<template>
  <div class="page8 flex">
    <div class="box">
      <van-cell-group class="li">
        <van-field v-model="name" label="持卡人" input-align="right" placeholder="请输入开卡人姓名" />
        <van-field v-model="account" label="银行卡号" input-align="right" placeholder="请输入银行卡账号" />
        <van-field readonly clickable name="picker" :value="value" input-align="right" label="开户银行" placeholder="请选择开户银行"
          @click="showPicker = true" />
        <!-- <van-field
          v-model="type"
          label="卡类型"
          input-align="right"
          placeholder="请输入银行卡类型"
        />

        <van-field v-model="phone" label="手机号" input-align="right" placeholder="请输入预留手机号" />-->
      </van-cell-group>

      <div class="bottom" @click="addcard">添加</div>

      <!-- <div class="flex flex__justify border-b">
        <div>卡类型</div>
        <select class="sele">
          <option value="11111111111111111">11111111111111111</option>
          <option value="222">222</option>
          <option value="333">333</option>
        </select>
      </div> -->
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" value-key="bankName" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
  </div>
</template>

<script>
  import {
    findAllBankNumber,bindCard
  } from "api/doctor";
  import HeadTop from 'base/header/header'
  import router from '../router'
  import $ from 'jquery'
  import cookie from "js-cookie"
  export default {
    name: "Page8",
    data() {
      return {
        name: "",
        account: "",
        phone: "",
        showPicker: false,
        value: '',
        code:'',
        columns: ""
      }
    },
    created() {
      this.showbank();
    },
    methods: {
      onConfirm(value) {
        this.code = value.bankCode;
        this.value=value.bankName;
        this.showPicker = false;
      },
      showbank(){
        let token = cookie.get("token");
        let list = {
          token: token
        };
        findAllBankNumber(list).then((res) => {
          console.log(res)
          this.columns=res.list;
        });
      },
      addcard(){
        if(this.name=="")
        {
          alert("持卡人不能为空！");
          return false;
        }
        if(this.account=="")
        {
          alert("银行卡卡号！");
          return false;
        }
        if(this.code=="")
        {
          alert("开户银行！");
          return false;
        }
        console.log(this.account)
        let token = cookie.get("token");
        let doctorId = cookie.get("doctorId");
        let name=this.name;
        let account=this.account;
        let bankName=this.value;
        let bankDeposit=this.code;
        let list = {
          doctorId: doctorId,
          token: token,
          realName:name,
          bankName:bankName,
          bankCard:account,
          bankDeposit:bankDeposit
        };
        bindCard(list).then((res) => {
          console.log(res)
          alert(res.massage);
          this.$router.go(-1);
        });
      }
    },
  };
</script>
<style lang="less" scoped>
  .flex {
    display: flex;
  }

  .flex__justify {
    justify-content: space-between;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    margin-top: 0.2rem;
    color: #646566;
    font-size: 0.25rem;

    .sele {
      color: #646566;
      border: none;
    }
  }

  .border-b {
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #ebedf0;
  }

  .box {
    width: 90%;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    margin: 0.3rem auto;
    background: #fff;
    border-radius: 0.2rem;
    height: 5rem;
    font-size: 0.2rem !important;
  }

  .page8 {
    width: 100%;
    height: 100vh;
    background: #eee;
  }

  .li {
    margin-top: 0.3rem;
  }

  .bottom {
    background: #00b0c2;
    color: #fff;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    border-radius: 0.1rem;
    margin: 0.3rem auto;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
  }
</style>
