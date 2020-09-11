<template>
<div class="chufangshu">
    <div class="backHome" @touchstart="goBack">返回上一级</div>
    <div class="xian" style="clear:both;"></div>
    <div class="swiper-tab">
        <div class="swiper-tab-item" :class="{active:currentTab==0}" :data-current="0" v-show="length!=0" @touchstart="quanbu">全部({{length}})</div>
        <div class="swiper-tab-item" :class="{active:currentTab==1}" :data-current="1" v-show="lengths!=0" @touchstart="yizhifu">已支付({{lengths}})</div>
    </div>
    <div class="list">
        <div class="doctor" v-for="(item,index) in lists" :key="index" @touchstart="goDetail(item.prescriptionId)">
            <div>患者：{{item.patientName}}
                <label :class="{nan:item.patientSex==1}">
                    <img :src="item.patientSex==1?require('../assets/img/sex2.png'):require('../assets/img/sex1.png')" alt="">{{item.age||item.patientAge}}岁
                </label>
            </div>
            <div>时间：{{item.creatDate||item.createDate}}</div>
            <div>辩证；{{item.symptom.substring(0,13)}}</div>
            <div class="wrap_tit7" v-if="item.preStatus==2">待支付</div>
            <div class="wrap_tit7" v-if="item.preStatus==4||item.preStatus==0">已支付</div>
            <div class="wrap_tit7" v-if="item.preStatus==5">已配送</div>
            <div class="wrap_tit7" v-if="item.preStatus==6">已取货</div>
            <div class="wrap_tit7" v-if="item.preStatus==7">已完成</div>
        </div>
    </div>
    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp">
    <img class="zanwuxinxi" v-show="lists.length == 0" src='../assets/img/zanwuxinxi.png' />
</div>
</template>

<script>
import {
    doctorSelAllPrescription,
    doctorSelPayPrescription
} from "api/doctor"
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "chufangshu",
    data() {
        return {
            token: '',
            doctorId: '',
            message: '',
            loadUp: true,
            currentTab: 0,
            lengths: 0,
            length: 0,
            lists: '',
        }
    },
    created() {
        this.token = cookie.get("token")
        this.doctorId = cookie.get("doctorId")
        this.doctorSelAllPrescription()
    },
    computed: {

    },

    methods: {
        quanbu() {
            this.currentTab = 0
            this.doctorSelAllPrescription();
        },
        yizhifu() {
            this.currentTab = 1
            this.doctorSelPayPrescription();
        },
        goDetail(prescriptionId) {
            this.$router.push({
                path: '/chakanCf',
                query: {
                    prescriptionId: prescriptionId
                }
            })
        },
        doctorSelAllPrescription() {
            let list = {
                token: this.token,
                doctorId: this.doctorId
            }
            doctorSelAllPrescription(list).then((res) => {
                //console.log(res);
                this.loadUp = false;
                this.yizhifuLen();
                this.lists = res.data;
                this.length = res.data.length;
            })
        },
        doctorSelPayPrescription() {
            let list = {
                token: this.token,
                doctorId: this.doctorId
            }
            doctorSelPayPrescription(list).then((res) => {
                //console.log(res);
                this.lists = res.data;
                this.lengths = res.data.length;
            })
        },
        yizhifuLen() {
            let list = {
                token: this.token,
                doctorId: this.doctorId
            }
            doctorSelPayPrescription(list).then((res) => {
                this.lengths = res.data.length;
            })
        },
        goBack() {
            this.$router.push('/homePage')
        }

    },
    components: {

    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.chufangshu {
    width: 100%;
    height: 100%;
}

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

.swiper-tab {
    background: #fff;
    width: 100%;
    height: .80rem;
    line-height: .80rem;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    font-size: 27px;
}

.swiper-tab-item {
    color: #828282;
    width: 1.90rem;
    text-align: center;
    margin: 0 auto;
}

.swiper-tab-item img {
    width: .47rem;
    height: .47rem;
    display: block;
    float: left;
    margin-left: 27%;
    margin-top: 6%;
    margin-right: .18rem;
}

.active {
    color: #00b0c2;
    border-bottom: 1px solid #00b0c2;
    display: inline-block;
    width: 1.90rem;
    text-align: center;
    margin: 0 auto;

}

.list {
    width: 100%;
    height: 80%;
    overflow-y: scroll;

    .doctor {
        width: 693px;
        height: 179px;
        border-bottom: 1px solid #ececec;
        margin: 0 auto;
        position: relative;

        label {
            width: 134px;
            height: 41px;
            display: inline-block;
            background: rgba(247, 124, 124, 1);
            border-radius: 21px;
            line-height: 41px;
            color: #fff;
        }

        label img {
            width: 29px;
            height: 29px;
            margin: 0 10px 0 10px;
            vertical-align: middle;
        }

        label.nan {
            width: 134px;
            height: 41px;
            background: #2eb0d5;
            border-radius: 21px;
            line-height: 41px;
            color: #fff;
        }

        div {
            float: left;
            padding-left: 20px;
            color: #808080;
            font-size: 25px;
            width: 60%;
            padding-top: 27px;
        }

        div.wrap_tit7 {
            width: auto;
            text-align: center;
            line-height: 56px;
            font-size: 25px;
            color: #00afc2;
            padding-left: 0;
            position: absolute;
            right: 20px;
            bottom: 45px;
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
    width: 3.30rem;
    height: 4.17rem;
    display: block;
    margin: 0 auto;
    margin-top: 100px;
}

::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}
</style>
