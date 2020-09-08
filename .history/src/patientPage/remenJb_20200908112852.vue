<template>
<div class="recordNum">
    <div class="back" @click="goBack">返回上一级</div>
    <div class="search">当前搜索条件：{{doctorTel}}</div>
    <div class="xian"></div>
    <div class="list">
        <div class="tuijian">
            <div v-for="(item,index) in yishengList" :key="index" @click="goDetail(item.doctorId)">
                <img :src="item.doctorPhoto" alt="">
                <div>{{item.doctorName}} {{item.doctorLevelName}}</div>
                <div>{{item.doctorHospitalName}} {{item.departmentName}} </div>
                <div><span v-for="(item,index) in item.doctorAdept" :key="index">{{item.medicineSubjectName}}</span></div>
            </div>

        </div>
    </div>
    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp">
    <img class="zanwuxinxi" v-show="ifShow" src='../assets/img/zanwuxinxi.png' />
</div>
</template>

<script>
import {
    getDoctorByTel
} from "api/patient"
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "recordNum",
    data() {
        return {
            doctorTel: '',
            token: '',
            patientId: '',
            yishengList: [],
            loadUp: true,
            ifShow: false
        }
    },
    created() {
        this.token = cookie.get("token")
        this.patientId = cookie.get("patientId")
        this.doctorTel = this.$route.query.doctorTel;
        this.getDoctorByTel();
    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },
        goDetail(doctorId) {
            this.$router.push({
                path: '/yishengXq',
                query: {
                    doctorId: doctorId
                }
            })
        },
        getDoctorByTel() {
            let list = {
                token: this.token,
                patientId: this.patientId,
                doctorTel: this.doctorTel
            }
            getDoctorByTel(list).then((res) => {
                console.log(res);
                this.yishengList = res.data;
                this.loadUp = false;
                if (res.data.length == 0) {
                    this.ifShow = true;
                } else {
                    this.ifShow = false
                }
            })
        },
    },
    components: {

    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.back {
    width: 26%;
    height: 0.76rem;
    background: #00afc2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    color: #fff;
    font-size: 0.23rem;
    float: left;
    margin: 0.15rem 0.2rem 0.15rem 0.2rem;
}

.xian {
    width: 100%;
    height: .1rem;
    background: #efefef;
    clear: both;
}

.search {
    width: 62%;
    float: left;
    height: 0.76rem;
    border: 0.01rem solid #d6d6d6;
    border-radius: 0.1rem;
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
    background: #00afc2;
    color: #fff;
    text-align: center;
    line-height: 0.76rem;
    font-size: 0.25rem;
}

.tuijian {
    >div {
        width: 89.6%;
        margin: 0 auto;
        height: 4.7rem;
        border-bottom: 0.01rem solid #e9e9e9;
        font-size: 0.25rem;

        img {
            float: left;
            width: 0.88rem;
            height: 0.88rem;
            border-radius: 50%;
            margin-top: 0.19rem;
            margin-bottom: 1rem;
        }

        div {
            float: left;
            width: 73%;
            padding-left: 0.2rem;

            &:nth-of-type(1) {
                color: #606060;
                margin-top: 0.19rem;
                padding-left: 0.2rem;
            }

            &:nth-of-type(2) {
                color: #BABABA;
                padding-top: 0.16rem;
                height: 0.9rem;
                line-height: 0.3rem;
                overflow: hidden;
            }

            &:nth-of-type(3) {
                color: #fff;
                padding-top: 0.19rem;

                span {
                    float: left;
                    font-size: 0.22rem;
                    margin-right: 0.1rem;
                    padding: 0.08rem 0.12rem;
                    background: #00afc2;
                    border-radius: 0.3rem;
                    margin-bottom: 0.1rem;
                }
            }
        }
    }
}

.zanwuxinxi {
    width: 3.30rem;
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
