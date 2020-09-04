<template>
<div class="recordNum">
    <div class="back" @touchstart="goBack">返回上一级</div>
    <div class="search">当前搜索条件：{{doctorTel}}</div>
    <div class="xian"></div>
    <div class="list">
        <div class="tuijian">
            <div v-for="(item,index) in yishengList" :key="index" @touchstart="goDetail(item.doctorId)">
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
                // console.log(res);
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
    width: 200px;
    height: 76px;
    background: #00afc2;
    border-radius: 13px;
    text-align: center;
    line-height: 76px;
    color: #fff;
    font-size: 25px;
    float: left;
    margin: 15px 20px 15px 20px;
}

.xian {
    width: 100%;
    height: 10px;
    background: #efefef;
    clear: both;
}

.search {
    width: 468px;
    float: left;
    height: 76px;
    border: 1px solid rgba(214, 214, 214, 1);
    border-radius: 10px;
    line-height: 76px;
    margin-top: 15px;
    margin-bottom: 15px;
    background: #00afc2;
    color: #fff;
    text-align: center;
    line-height: 76px;
    font-size: 25px;
}

.tuijian {
    >div {
        width: 672px;
        margin: 0 auto;
        height: 300px;
        border-bottom: 1px solid #e9e9e9;
        font-size: 25px;

        img {
            float: left;
            width: 89px;
            height: 89px;
            border-radius: 50%;
            margin-top: 19px;
        }

        div {
            float: left;
            width: 80%;
            padding-left: 20px;

            &:nth-of-type(1) {
                color: #606060;
                padding-top: 28px;
            }

            &:nth-of-type(2) {
                color: #BABABA;
                padding-top: 16px;
                height: 25px;
                line-height: 30px;
                overflow: hidden;
            }

            &:nth-of-type(3) {
                color: #fff;
                padding-top: 19px;

                span {
                    float: left;
                    margin-right: 10px;
                    padding: 8px 15px;
                    background: #00afc2;
                    border-radius: 30px;
                    margin-bottom: 10px;
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
