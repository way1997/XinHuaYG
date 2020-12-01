<template>
  <div class="tnblink" id="tnblink">
    <div class="backHome" @click="backHome">返回上一级</div>
    <div class="xian"></div>
    <div class="wrapBox">
      <div class="wrapConten">
        <p class="wrapLink">
          <span class="wrap_tit">
            <a href="https://mp.weixin.qq.com/mp/homepage?__biz=MzI3MjczMDYyNg==&hid=1&sn=b8ba76ceaf6874d31a6dc5f9519ffa57&scene=18">
              <span>合理饮食，科学控糖！</span>
            </a>
          </span>
        </p>
        <p class="wrapLink">
          <span class="wrap_tit">
            <a href="https://mp.weixin.qq.com/s/6xe5MtJPX3Gqc2EPoqzUAA">最全的476种食物升糖指数一览表，看完不再糊涂</a>
          </span>
        </p>
        <p class="wrapLink">
          <span class="wrap_tit">
            <a href="https://mp.weixin.qq.com/s/psrFCp-wtJZJ7X9rgY9qnw">问答：糖尿病并发症太痛苦了，怎样合理控制？</a>
          </span>
        </p>
        <p class="wrapLink">
          <span class="wrap_tit">
            <a href="https://mp.weixin.qq.com/s/V2Lcul_wsPXNnblhVFzQlA">问答：多年糖尿病控制不理想怎么办？</a>
          </span>
        </p>
        <p class="wrapLink">
          <span class="wrap_tit">
            <a href="https://mp.weixin.qq.com/s/lI3egrlv5iqcOiM1mTkUsQ">一对一问答●控制饮食，血糖还是不稳定？肯定是忽略了这1点！</a>
          </span>
        </p>
      </div>
    </div>
    <div style="overflow: hidden; margin: 1rem 0">
      <van-divider>已到底</van-divider>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "tangniaobinglink",
  created() {},
  methods: {
    backHome() {
      this.$router.push({
        name: "indexPage",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.xian {
  width: 100%;
  height: 10px;
  background: #efefef;
  clear: both;
}
.tnblink {
  width: 100%;
  height: 100%;
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
.wrapBox {
  width: 100%;
  .wrapLink {
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
      height: 100%;
      display: block;
      font-size: 0.3rem;
      color: #828282;
      line-height: 0.9rem;
      a {
        width: 100%;
        height: 100%;
        display: block;

        span {
          //   border-bottom: 1.5px solid#7E8C8D;
        }
      }
    }
  }
}
</style>
