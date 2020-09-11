<template>
    <div :class="{header:true,backNone:backNone,backBlack:backBlack}" v-if="headShow">
      <em @click="back()" v-show="showBack"></em>
      <span>{{title}}</span>
      <!-- <label>...</label> -->
    </div>
</template>
<script>
  import { backPage } from 'common/js/mixin.js'  //基于vue的公开js  vue中可调用
  import util from '../../util/util.js'
  export default {
    data(){
        return{
          headShow : true
        }
    },
    mixins :[backPage] , //引用mixins中的const 对象
    props :{
      title :{
        type :String ,
        default(){
          return ''
        }
      },
      backNone:{
        type : Boolean,
        default(){
          return false;
        }
      },
      backBlack:{
        type : Boolean,
        default(){
          return false;
        }
      },
      showBack:{
        type : Boolean,
        default(){
          return true;
        }
      }
    },
    created(){
       var isApp = util.isApp();
       // console.log(isApp);
       //判断是否是客户端隐藏头部
        if(isApp.status == true){
           this.headShow = false;
        }else{
          this.headShow = true;
        }
    },
    method:{
      getApp(){
        
      }
    }
  }
</script>
<style lang="less" scoped>
    .header{
      position: relative;
      z-index: 999;
      width: 100%;
      height: 90px;
      line-height: 90px;
      color: white;
      text-align: center;
      font-size: 32px;
      background-color: #0d8059;
        em{
          position: absolute;
          width: 24px;
          height: 44px;
          background: url(../../assets/arrow-return.png) no-repeat;
          background-size: cover;
          left: 40px ;
          top: 23px;
        }
      }
      .backNone{
        background: none;
        position: relative;
        z-index: 999;
        width: 100%;
        height: 90px;
        line-height: 90px;
        color: white;
        text-align: center;
        font-size: 32px;
          em{
            position: absolute;
            width: 24px;
            height: 44px;
            background: url(../../assets/arrow-return.png) no-repeat;
            background-size: cover;
            left: 40px ;
            top: 23px;
          }
      }
      .backBlack{
        position: relative;
        z-index: 999;
        width: 100%;
        height: 88px;
        line-height: 88px;
        color: #fff;
        text-align: center;
        font-size: 30px;
        background-color:#00b0c2;
          em{
            position: absolute;
            width: 12px;
            height: 24px;
            background: url(../../assets/arrow-return.png) no-repeat;
            background-size: cover;
            left: 34px ;
            top: 32px;
          }
          label{
            position: absolute;
            height:12px;
            line-height:12px;
            right: 44px;
            top: 38px;
          }
      }
</style>
