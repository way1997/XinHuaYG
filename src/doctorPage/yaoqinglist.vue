<template>
  <div>
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian"></div>
    <section style="clear: both; margin-top: 0.2rem"></section>
    <!--<div class="list">
      <div class="detail" v-for="(item, index) in lists" :key="item.id">
        <p>被邀医生：{{ item.beuserName }}</p>
        <section style="clear: both; margin-top: 0.1rem"></section>
        <p>活动名称：{{ item.activitiesName }}</p>
        <p>活动金额: ￥ {{ item.money }}</p>
        <section style="clear: both; margin-top: 0.4rem"></section>
        <span>邀请时间： {{ item.createDate }}</span>
    </div> -->
    <div v-for="(item, index) in lists" :key="item.id">
        <section class="vant_card">
         <van-card :price="item.money" :desc="'活动名称：'+item.activitiesName" :title="item.beuserName">
            <template #tags>
              <van-tag plain type="danger">{{statusName[item.status]}}</van-tag>
            </template>
            <template #footer>
              <div>邀请时间： {{ item.createDate}}</div>
            </template>
        </van-card>
        <span class="bgline"></span>
        </section>
        <section style="clear: both; margin-top: 0.2rem"></section>
      </div>
    </div>
  </div>
</template>
<script>
import { findInviteList } from "api/doctor";
import { formatDate } from "../util/util";
import cookie from "js-cookie";
export default {
  name: "yaiqinglist",
  data() {
    return {
      doctorId: "",
      token: "",
      lists: [],
      statusName: ["", "未生效", "已生效"],
    };
  },
  created() {
    this.doctorId = cookie.get("doctorId");
    this.token = cookie.get("token");
    console.log(this.token);
    this.findInviteList();
  },
  methods: {
    findInviteList() {
      let list = {
        doctorId: this.doctorId,
        token: this.token,
      };
      findInviteList(list)
        .then((res) => {
          console.log(res);
          if(res.type == true){
            this.lists = res.list;
          }else{
            this.$toast.center(res.massage)
          }
          
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goBack() {
      this.$router.push("/homePage");
    },
  }
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";
.backHome {
  width: 81.4%;
  height: 76px;
  background: #00afc2;
  border-radius: 13px;
  text-align: center;
  line-height: 76px;
  color: #fff;
  font-size: 25px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
.xian {
  width: 100%;
  height: 10px;
  background: #efefef;
  clear: both;
}

/deep/.van-card {
  font-size: 0.26rem;
}
/deep/.van-card__footer {
  margin-top: -0.35rem;
}
/deep/.van-tag {
  margin: 0.2rem 0 0.1rem 0;
}
.vant_card {
  overflow: hidden;
  width: 98%;
  margin: 0 auto;
  position: relative;
  border-radius: 9px;
  box-shadow: 5px 1px 6px 1px #d8d7d7;
}
.van-card__title {
  line-height: 29px;
  margin-bottom: 0.2rem;
}
.list_detail {
  background: #fff;
  width: 89.6%;
  height: 1.4rem;
  line-height: 0.4rem;
  margin: 0 auto;
  position: relative;
  top: 0rem;
  padding-bottom: 0.2rem;

  section {
    float: left;
    width: 50%;
    color: #666;
    font-size: 0.3rem;
    padding-top: 0.1rem;
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
    font-size: 0.28rem;
    text-align: center;
    float: left;
  }

  .btn_box {
    width: 100%;
    padding-bottom: 0.1rem;
    background: #fff;
  }

  .botton-t {
    margin-top: 0.1rem;
  }

  .botton-fl {
    float: left;
  }

  .botton-fr {
    float: right;
  }
}

.list {
  width: 89.6%;
  height: 58%;
  overflow-y: scroll;
  margin: 0 auto;
  padding-top: 0.1rem;

  .detail {
    width: 100;
    height: 2.4rem;
    border-bottom: 1px solid #cecece;
    font-size: 25px;

    div {
      width: 70px;
      height: 70px;
      background: #00afc2;
      color: #fff;
      font-size: 25px;
      line-height: 70px;
      text-align: center;
      border-radius: 50%;
      float: left;
      margin-top: 25px;
      margin-bottom: 1rem;
    }

    p {
      float: left;
      color: #828282;
      width: 60%;
      padding-left: 30px;
      padding-top: 15px;

      &:nth-of-type(1) {
        padding-top: 30px;
      }
    }

    span {
      float: right;
      color: #828282;
    }

    .detail_sect {
      padding-left: 0.5rem;

      p {
        padding: 0.2rem 0 0 0.3rem;
      }
    }
  }
}
</style>