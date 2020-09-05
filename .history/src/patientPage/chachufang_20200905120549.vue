<template>
<div class="chufang">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian" style="clear:both;"></div>
    <div class="list">
        <div class="doctor" v-for="(item,index) in message" :key="index">
            <img :src="item.doctorPhoto" alt />
            <div>{{item.doctorName}} 的辩证及处方{{item.doctorLevelName}}</div>
            <div>主诉及辩证:{{item.symptom.substring(0,10)}}</div>
            <p class="zi1" v-show="item.isPayLook==0&&item.indentStates==0">
                <span>购买后即可查看药方</span>
                <span>共{{item.sum}}味</span>
            </p>
            <p>{{item.preShapeName}} {{item.creatDate}}</p>
            <div @click="goXq(item.prescriptionId,item.indentStates,item.isPayLook)">查看详情</div>
            <div v-show="item.indentStates == 0" @click="goBuy(item.indentId,item.prescriptionId,item.doctorId)">缴费购买</div>
            <div v-show="item.indentStates == 1">完成购买</div>
        </div>
    </div>
    <!--<img src="../assets/img/LODING.gif" alt class="loading" v-if="loadUp" />
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
    width: 81.46%;
    height: 0.76rem;
    background: #00afc2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    color: #fff;
    font-size: 0.25rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
}

.xian {
    width: 100%;
    height: 0.1rem;
    background: #efefef;
    clear: both;
}

.list {
    .doctor {
        width: 92.4%;
        height: 2.5rem;
        border-bottom: 0.01rem solid #ececec;
        margin: 0 auto;
        position: relative;
        padding-bottom: .5rem;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            float: left;
            margin-top: 0.5rem;
            margin-bottom: 2rem;
        }

        div {
            float: left;
            padding-left: 0.2rem;
        }

        div:nth-of-type(1) {
            color: #808080;
            font-size: 0.25rem;
            width: 60%;
            padding-top: 0.47rem;
        }

        div:nth-of-type(2) {
            //color:#BABABA;
            color: #808080;
            font-size: 0.25rem;
            width: 60%;
            padding-top: 0.2rem;
        }

        div:nth-of-type(4),
        div:nth-of-type(3),
        div:nth-of-type(5) {
            width: 20%;
            height: 0.54rem;
            background: #00afc2;
            border-radius: 0.13rem;
            text-align: center;
            line-height: 0.56rem;
            font-size: 0.22rem;
            color: #fff;
            padding-left: 0;
        }

        div:nth-of-type(3) {
            position: absolute;
            right: 0rem;
            top: 0.3rem;
        }

        div:nth-of-type(4) {
            position: absolute;
            right: 0rem;
            bottom: 0.3rem;
        }

        div:nth-of-type(5) {
            background: #b4b4b4;
            position: absolute;
            right: 0rem;
            bottom: 0.3rem;
        }

        p {
            color: #828282;
            font-size: 0.25rem;
            float: left;
            padding-left: 0.2rem;
            padding-top: 0rem;
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
