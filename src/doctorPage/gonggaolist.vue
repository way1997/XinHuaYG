<template>
  <div class="page2">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div
      class="bg-white mb-1 flex flex__v"
      v-for="(value, index) in list"
      :key="index"
    >
      <div class="border-bottom">
        <div class="mt-1 ml-1 f-600 mb-1">{{ value.title }}</div>
      </div>
      <div class="mt-1 ml-1 mr-1 mb-1" style="font-size: 0.3rem">
        <div>{{ value.proclamationContent }}</div>
        <div>
          <div
            class="img flex mt-1 ml-1"
            v-for="(val, index) in value.proclamationImage"
            :key="index"
          >
            <img :src="val.img" />
          </div>
        </div>
        <div class="flex flex__justify">
          <div style="margin-top: 0.1rem">{{ value.proclamationDate }}</div>
          <div class="flex">
            <img
              class="icon-1"
              src="../assets/img/xiugai.png"
              @click="edit(value.proclamationId)"
              :data-id="value.proclamationId"
            />
            <img
              class="icon-1"
              src="../assets/img/shanchu.png"
              @click="del(value.proclamationId)"
              :data-id="value.proclamationId"
            />
          </div>
        </div>
      </div>
    </div>
    <confirm
      :text="tipText"
      ref="confirm"
      @cancel="cancel"
      @confirm="confirm"
    ></confirm>
    <div class="border-radius flex flex__center fixed">
      <!-- <div class="f-3">+</div> -->
      <img src="../assets/img/jia.png" @click="detial" />
    </div>
  </div>
</template>

<script>
import { proclamationList, deleteProclamation } from "api/doctor";
import HeadTop from "base/header/header";
import router from "../router";
import $ from "jquery";
import cookie from "js-cookie";
import confirm from "base/confirm/confirm";
export default {
  name: "page2",
  data() {
    return {
      list: "",
      cardid: "",
      tipText: "’",
    };
  },
  created() {
    //$('html').css('font-size', '15px');
    this.showgonggao();
  },
  methods: {
    showgonggao() {
      let token = cookie.get("token");
      let doctorId = cookie.get("doctorId");
      let list = {
        token: token,
        doctorId: doctorId,
      };
      proclamationList(list).then((res) => {
        console.log(res);
        this.list = res.data;
      });
    },
    tixian() {
      this.$refs.confirm.show();
    },
    cancel() {
      this.$refs.confirm.hide();
    },
    confirm() {
      let cardid = this.cardid;
      let token = cookie.get("token");
      if (cardid != "") {
        let list = {
          token: token,
          proclamationId: cardid,
        };
        deleteProclamation(list).then((res) => {
          console.log(res);
          alert(res.massage);
          this.cancel();
          window.location.reload();
        });
      }
    },
    detial() {
      this.$router.push("/gonggaodetail");
    },
    del(card) {
      console.log(card);
      this.cardid = card;
      this.tipText = "您确定删除此公告吗？";
      this.$refs.confirm.show();
    },
    edit(card) {
      console.log(card);
      this.$router.push({
        name: "gonggaoedit",
        params: {
          proclamationId: card,
        },
      });
    },
    goBack() {
      this.$router.push("/homePage");
    },
  },
  components: {
    confirm,
  },
};
</script>

<style lang="less" scoped>
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
.page2 {
  font-size: 0.2rem;

  .flex {
    display: flex;
  }

  .flex__v {
    flex-direction: column;
  }

  .flex__justify {
    justify-content: space-between;
  }

  .flex__center {
    justify-content: center;
    align-items: center;
  }

  .bg-white {
    background: #fff;
  }

  .mt-1 {
    margin-top: 0.3rem;
  }

  .ml-1 {
    margin-left: 0.3rem;
  }

  .mr-1 {
    margin-right: 0.3rem;
  }

  .mb-1 {
    margin-bottom: 0.3rem;
  }

  .f-600 {
    font-weight: 600;
  }

  .border-bottom {
    border-bottom: 1px solid #eee;
  }

  .img {
    display: inline-block;
    width: 1rem;
    height: 1rem;

    img {
      width: 1rem;
      height: 1rem;
    }
  }

  .icon-1 {
    width: 0.3rem;
    height: 0.3rem;
    margin-left: 0.3rem;
  }

  .border-radius {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 100%;
    background: #0cb4c5;
    line-height: 3rem;

    img {
      width: 80%;
      height: 80%;
    }
  }

  .f-3 {
    font-size: 3rem;
    color: #fff;
  }

  .fixed {
    position: fixed;
    left: 43%;
    bottom: 10%;
  }
}
</style>
