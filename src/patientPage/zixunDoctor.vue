<template>
<div class="zixun">
    <HeadTop :title="pageName" :backBlack="true" :showBack="false"></HeadTop>
    <div style="width:100%;height:78%;overflow-y:scroll;">
        <div>
            <div class="tan_content" style=" white-space: nowrap;">
                <img class="zanwuxinxi" :style="{display:display1}" src="../assets/img/zanwuxinxi.png">
                <!-- 患者列表 -->
                <div v-for="(item,index) in doctor" :key="item.doctorId" @click="goLiaotian(item)" style="margin:.12rem 0">
                    <div class="doctor" style="padding-bottom:.9rem">
                        <img :src="item.doctorImgUrl" class="doctor_img">
                        <div class="doctor_text">
                            <div>{{item.doctorName}}</div>
                            <div>
                                {{item.doctorLevel}}
                            </div>
                            <section style="clear:both"></section>
                            <div>
                                <span>{{item.doctorHospital.hospitalName}}</span>
                                <span style="padding-left:0.32rem">{{item.departmentName}}</span>
                            </div>
                            <section style="clear:both"></section>
                            <section style="clear:both"></section>
                            <div>条未读消息</div>
                            <div>{{item.sum}}</div>
                            <div>您有</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="wrap" v-if="beijing" style="position:absolute;top:0rem">
            <div class="hidden">
                <img class="jlu" src="../assets/img/mobanwu.png">
                <div>暂无消息记录</div>
            </div>
        </div>
    </div>

    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp">
    <TabBar />
</div>
</template>

<script>
import {
    purchaseList,
    findChatPatient,
    remindPurchase,
    delChatNum
} from "api/doctor"
import {
    findChatDoctor
} from "api/patient"
import HeadTop from "base/header/header"
import TabBar from "../components/tabBar"
import router from "../router"
import cookie from "js-cookie"
import wx from "weixin-js-sdk"
import $ from 'jquery'
import confirm from 'base/confirm/confirm'
export default {
    name: "zixun",
    data() {
        return {
            pageName: "咨询",
            currentTab: 0,
            countDownNum: '60',
            indexP: '',
            display1: 'none',
            display2: 'none',
            huanzhe: [],
            doctor: [],
            lists: '',
            beijing: '',
            token: '',
            patientId: '',

            doctorId: '',
            daiwenzhen: true,
            daigouyao: false,
            beijingtext: '',
            totalNum: 0,
            loadUp: true,
            tipText: '确定要清除此条消息？'
        }
    },
    created() {
        this.token = cookie.get("token");
        this.patientId = cookie.get("patientId");
        this.findChatDoctor();

    },
    computed: {

    },

    methods: {
        findChatDoctor() {

            let list = {
                token: this.token,
                patientId: this.patientId
            }
            console.log(list);
            findChatDoctor(list).then((res) => {
                console.log(res);
                this.loadUp = false;
                if (res.data.length == 0) {
                    this.beijing = true;
                    this.lists = []
                } else {
                    this.doctor = res.data;
                    console.log(this.doctor)
                    // for(var i=0;i<res.data.length;i++){
                    //   this.totalNum += (res.data[i].sum)*1
                    // }
                    // console.log(this.totalNum)
                }
            })
        },
        goLiaotian(doctor) {
            console.log(doctor)
            this.$router.push({
                path: '/wenzhenZx',
                query: {
                    doctorId: doctor.doctorId,
                    doctorImg: doctor.doctorImgUrl,
                    doctorName: doctor.doctorName,
                }
            })
        }
    },
    components: {
        HeadTop,
        TabBar,
        confirm
    }
}
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";

.zixun {
    height: 100%;
    background: #f1f1f1;
    // padding-bottom: 100px;
}

.swiper-tab {
    background: #fff;
    width: 100%;
    height: .92rem;
    line-height: .92rem;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    font-size: .32rem;
}

.loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.tan_content {
    width: 100%;
    height: 100%;

}

::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
}

.swiper-tab-item {
    /* width: 50%;  */
    color: #434343;
    width: 2.11rem;
    text-align: center;
    margin: 0 auto;

}

.swiper-tab-item img {
    width: .47rem;
    height: .47rem;
    display: block;
    float: left;
    margin-left: 19%;
    margin-top: 12%;
    margin-right: -0.20rem;

}

.active {
    color: #00b0c2;
    border-bottom: 4px solid #00b0c2;
    display: inline-block;
}

swiper {
    text-align: center;
    width: 100%;
    height: 90%;

}

/* 患者 */
.doctor {
    width: 100%;
    /* height: 1.48rem; */
    background: #fff;
    padding: .18rem .25rem;
    padding-bottom: .8rem;
    box-sizing: border-box;
    margin-top: 1px;
    overflow: hidden;
    position: relative;
}

.doctor_img {
    width: .90rem;
    height: .90rem;
    float: left;
    border-radius: 50%;
    margin-top: .10rem;
}

.doctor_text {
    width: 87%;
    height: 100%;
    float: right;
    position: absolute;
    left: .82rem;
    padding-left: .50rem;
    box-sizing: border-box;
}

.doctor .delChat {
    position: absolute;
    right: .26rem;
    top: .22rem;
    width: 1rem;
    height: .4rem;
    text-align: center;
    line-height: .4rem;
    color: #fff;
    font-size: .26rem;
    border-radius: .2rem;
    background: #00b0c2;
    z-index: 999;
}

.doctor_text div:nth-child(1) {
    color: #808080;
    font-size: .32rem;
    float: left;
    line-height: .37rem;
    margin-top: .10rem;
}

.doctor_text div:nth-child(3) {
    color: #717171;
    font-size: .28rem;
    clear: both;
    float: left;
    margin-top: .1rem;
}

.doctor_text div:nth-child(2) {
    padding: 0.06rem;
    height: .33rem;
    border-radius: .10rem;
    font-size: 0.32rem;
    color: #838282;
    line-height: .32rem;
    float: left;
    margin-top: .06rem;
    margin-bottom: .10rem;
}

.doctor_text div:nth-child(2) img {
    width: .20rem;
    height: .21rem;
    margin-top: 2%;
    display: block;
    float: left;
    margin-right: .05rem;
    margin-left: .03rem;
}

.doctor_text div:nth-child(4) {
    margin-top: .12rem;
    color: #717171;
    font-size: .26rem;
    float: left;
    // margin-left: .08rem;
}

.doctor_text div:nth-child(5) {
    margin-top: .29rem;
    color: #717171;
    font-size: .26rem;
    float: left;
    margin-left: .08rem;
}

.doctor_text div:nth-child(6) {
    margin-top: .28rem;
    color: #717171;
    font-size: .26rem;
    float: left;
    margin-left: .08rem;
}

.doctor_text div:nth-child(7) {
    margin-top: .29rem;
    color: #717171;
    font-size: .26rem;
    float: right;
    margin-right: .08rem;
}

.doctor_text div:nth-child(7) {
    margin-top: .4rem;
    color: #717171;
    font-size: .26rem;
    float: right;
    margin-right: .1rem;
}

.doctor_text div:nth-child(8) {
    margin-top: .4rem;
    color: red;
    font-size: .26rem;
    float: right;

}

.doctor_text div:nth-child(9) {
    margin-top: .4rem;
    color: #717171;
    font-size: .26rem;
    float: right;
    margin-right: .08rem;
}

.wrap {
    width: 100%;
    height: 100%;
    background: #fff;
    position: fixed;
    top: 14%;
    left: 0;
}

.jlu {
    width: 1.60rem;
    height: 1.60rem;
    display: block;
    margin: 0 auto;
    padding-top: 48%;
}

/* 无内容显示 */
.hidden div {
    color: #a5a4a4;
    font-size: .30rem;
    text-align: center;
    line-height: .90rem;
    margin-bottom: 2.54rem;
}

.generate {
    width: 100%;
    height: .90rem;
    background: #fff;
    padding: .10rem .23rem;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;

}

.generate div {
    color: #fff;
    background: #00b0c2;
    text-align: center;
    line-height: .72rem;
    height: .72rem;
    width: 100%;
    border-radius: .10rem;
    font-size: .32rem;
}

.zanwuxinxi {
    width: 3.30rem;
    height: 4.17rem;
    margin-left: calc((100% - 33.0rem) / 2);
    margin-top: calc((100vh - 41.7rem) / 3)
}
</style>
