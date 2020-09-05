<template>
<div class="chufang">
    <div class="backHome" @touchstart="goBack">返回上一级</div>
    <div class="xian" style="clear:both;"></div>
    <!--<div class="list">
      <div class="doctor" v-for="(item,index) in message" :key="index">
        <img :src="item.doctorPhoto" alt />
        <div>{{item.doctorName}} 的辩证及处方{{item.doctorLevelName}}</div>
        <div>主诉及辩证:{{item.symptom.substring(0,10)}}</div>
        <p class="zi1" v-show="item.isPayLook==0&&item.indentStates==0">
          <span>购买后即可查看药方</span>
          <span>共{{item.sum}}味</span>
        </p>
        <p>{{item.preShapeName}} {{item.creatDate}}</p>
        <div @touchstart="goXq(item.prescriptionId,item.indentStates,item.isPayLook)">查看详情</div>
        <div
          v-show="item.indentStates == 0"
          @touchstart="goBuy(item.indentId,item.prescriptionId,item.doctorId)"
        >缴费购买</div>
        <div v-show="item.indentStates == 1">完成购买</div>
      </div>
    </div>
    <img src="../assets/img/LODING.gif" alt class="loading" v-if="loadUp" />
    <img class="zanwuxinxi" v-show="message.length == 0" src="../assets/img/zanwuxinxi.png" /> -->
</div>
</template>

<script>
import {
    myCase
} from "api/patient";
import HeadTop from "base/header/header";
import router from "../router";
import cookie from "js-cookie";
export default {
    name: "chufang",
    data() {
        return {
            token: "",
            patientId: "",
            message: "",
            loadUp: true,
        };
    },
    created() {
        this.token = cookie.get("token");
        this.patientId = cookie.get("patientId");
        this.myCase();
    },
    computed: {},

    methods: {
        myCase() {
            let list = {
                token: this.token,
                patientId: this.patientId,
            };
            myCase(list).then((res) => {
                this.message = res.data;
                this.loadUp = false;
            });
        },
        goBuy(indentId, prescriptionId, doctorId) {
            this.$router.push({
                path: "/chufangXq",
                query: {
                    prescriptionId: indentId,
                    indentId: prescriptionId,
                    doctorId: doctorId,
                },
            });
        },
        goXq(prescriptionId, indentStates, isPayLook) {
            if (indentStates != 0 || isPayLook != 0) {
                this.$router.push({
                    path: "/lookYaofang",
                    query: {
                        prescriptionId: prescriptionId,
                    },
                });
            } else {
                this.$toast("购买后就可以查看了哟");
            }
        },
        goBack() {
            this.$router.push("/indexPage");
        },
    },
    components: {},
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";

.backHome {
    width: 611px;
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

.list {
    .doctor {
        width: 693px;
        height: 250px;
        border-bottom: 1px solid #ececec;
        margin: 0 auto;
        position: relative;

        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            float: left;
            margin-top: 70px;
        }

        div {
            float: left;
            padding-left: 20px;
        }

        div:nth-of-type(1) {
            color: #808080;
            font-size: 25px;
            width: 60%;
            padding-top: 47px;
        }

        div:nth-of-type(2) {
            //color:#BABABA;
            color: #808080;
            font-size: 25px;
            width: 60%;
            padding-top: 20px;
        }

        div:nth-of-type(4),
        div:nth-of-type(3),
        div:nth-of-type(5) {
            width: 135px;
            height: 56px;
            background: #00afc2;
            border-radius: 13px;
            text-align: center;
            line-height: 56px;
            font-size: 25px;
            color: #fff;
            padding-left: 0;
        }

        div:nth-of-type(3) {
            position: absolute;
            right: 20px;
            top: 25px;
        }

        div:nth-of-type(4) {
            position: absolute;
            right: 20px;
            bottom: 25px;
        }

        div:nth-of-type(5) {
            background: #b4b4b4;
            position: absolute;
            right: 20px;
            bottom: 25px;
        }

        p {
            color: #828282;
            font-size: 25px;
            float: left;
            padding-left: 20px;
            padding-top: 20px;
            width: 60%;
        }
    }
}

.loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.zanwuxinxi {
    width: 3.3rem;
    height: 4.17rem;
    display: block;
    margin: 0 auto;
    margin-top: 100px;
}
</style>
