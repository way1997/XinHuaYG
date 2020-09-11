<template>
  <!-- loading 效果 -->
  <div class="loading">
    <img width="50" height="50" v-if="type==0" src="./pageLoading.gif">
    <img width="25" height="25" v-if="type==1" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      },
      type: {
        type: Number,
        default: 0 //两种loading效果的切换
      }
    }
  }
</script>
<style lang="less" scoped>

  .loading{
    width: 100%;
    text-align: center;
    background-color: #fff;
    .desc{
      line-height: 20px;
      font-size: 15px;
      color: #666 ;      
    }
  }
</style>
