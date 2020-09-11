<template>
<div class="myDoctor">
    <div class="back" @click="goBack">返回上一级</div>
    <div class="search">
        <input type="text" placeholder="输入医生名字" v-model="name" @input="getDoctorByTel" style="border:1px solid #e9e9e9;" />
    </div>
    <div class="xian"></div>
    <div class="tuijian">
        <div v-for="(item,index) in xz" :key="index" @click="goDetail(item.doctorId)">
            <img :src="item.doctorPhoto" alt />
            <div>{{item.doctorName}} {{item.doctorLevelName}}</div>
            <div>{{item.doctorHospitalName}} {{item.departmentName}}</div>
            <div>
                <span v-for="(item,index) in item.list_adept||item.doctorAdept" :key="index">{{item.medicineSubjectName}}</span>
            </div>
        </div>
    </div>
    <img src="../assets/img/LODING.gif" alt class="loading" v-if="loadUp" />
    <img class="zanwuxinxi" v-show="ifShow" src="../assets/img/zanwuxinxi.png" />
</div>
</template>

<script>
import {
    doctorList,
    getDoctorByTel
} from "api/patient";
import HeadTop from "base/header/header";
import router from "../router";
import cookie from "js-cookie";
export default {
    name: "myDoctor",
    data() {
        return {
            token: "",
            patientId: "",
            xz: [],
            name: "",
            loadUp: true,
            ifShow: false,
        };
    },
    created() {
        this.token = cookie.get("token");
        this.patientId = cookie.get("patientId");
        this.doctorList();
    },
    computed: {},

    methods: {
        goBack() {
            this.$router.go(-1);
        },
        doctorList() {
            let list = {
                token: this.token,
                patientId: this.patientId,
            };
            doctorList(list).then((res) => {
                //console.log(res);
                if (res.type == true) {
                    this.xz = res.data;
                    this.loadUp = false;
                    if (res.data.length == 0) {
                        this.ifShow = true;
                    } else {
                        this.ifShow = false;
                    }
                }
            });
        },
        getDoctorByTel() {
            let list = {
                token: this.token,
                patientId: this.patientId,
                doctorTel: this.name,
            };
            getDoctorByTel(list).then((res) => {
                //console.log(res);
                if (res.type == true) {
                    this.xz = res.data;
                } else {
                    // this.getDoctorByTel();
                    this.$toast("查询失败");
                }
            });
        },
        goDetail(doctorId) {
            this.$router.push({
                path: "/yishengXq",
                query: {
                    doctorId: doctorId,
                },
            });
        },
    },
    components: {},
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";

.myDoctor {
    width: 100%;
}

.back {
    width: 26.668%;
    height: 0.76rem;
    background: #00afc2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    color: #fff;
    font-size: 0.28rem;
    float: left;
    margin: 0.15rem 0.2rem 0.15rem 0.2rem;
}

.xian {
    width: 100%;
    height: 0.1rem;
    background: #efefef;
    clear: both;
}

.search {
    width: 62.93%;
    float: left;
    height: 0.76rem;
    border: 0.01rem solid #e9e9e9;
    border-radius: 0.38rem;
    line-height: 0.76rem;
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;

    input {
        width: 100%;
        height: 0.74rem;
        border-radius: 0.38rem;
        color: #ccc;
        font-size: 0.26rem;
        float: left;
        text-align: center;
    }

    input::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size: .25rem;
    }
}

.tuijian {
    padding-bottom: .666rem;

    >div {
        width: 89.6%;
        margin: 0 auto;
        height: 3rem;
        border-bottom: 0.01rem solid #e9e9e9;
        font-size: 0.25rem;
        padding-bottom: 1.2rem;

        img {
            float: left;
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            margin-top: .19rem;
            margin-bottom: .6rem;

        }

        div {
            float: left;
            width: 75%;
            padding-left: 0.2rem;

            &:nth-of-type(1) {
                color: #606060;
                padding-top: 0.28rem;
                font-size: .30rem;
            }

            &:nth-of-type(2) {
                color: #bababa;
                padding-top: 0.16rem;
                height: 0.8rem;
                font-size: .26rem;
                line-height: 0.3rem;
                overflow: hidden;
            }

            &:nth-of-type(3) {
                color: #fff;
                padding-top: 0.01rem;

                span {
                    float: left;
                    margin-right: 0.1rem;
                    font-size: .26rem;
                    padding: 0.08rem 0.15rem;
                    background: #00afc2;
                    border-radius: 0.3rem;
                    margin-bottom: 0.2rem;
                }
            }
        }
    }
}

.zanwuxinxi {
    width: 3.3rem;
    height: 4.17rem;
    display: block;
    margin: 0 auto;
    margin-top: 100px;
}

.loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
