<template>
<div class="zixun">
    <HeadTop :title="pageName" :backBlack="true" :showBack="false"></HeadTop>
    <div class="swiper-tab">
        <div class="swiper-tab-item" :class="(currentTab==0?'active':'')" @touchstart="changeBtn(0)">
            <img data-current="0" :src="currentTab==0?require('../assets/img/chaxun.png'):require('../assets/img/chaxun1.png')">待问诊
        </div>
        <div class="swiper-tab-item" :class="currentTab==1?'active':''" @touchstart="changeBtn(1)">
            <img data-current="1" :src="currentTab==1?require('../assets/img/kaifang.png'):require('../assets/img/kaifang1.png')">待购药
        </div>
    </div>

    <div style="width:100%;height:78%;overflow-y:scroll;">
        <div v-show="daiwenzhen">
            <div class="tan_content" style=" white-space: nowrap;">
                <img class="zanwuxinxi" :style="{display:display1}" src="../assets/img/zanwuxinxi.png">
                <!-- 患者列表 -->
                <div v-for="(item,index) in huanzhe" :key="index" @click="goLiaotian(item.patientId)">
                    <div class="patient">
                        <img :src="item.patientImgUrl" class="patient_img">
                        <div class="patient_text">
                            <div>{{item.patientName}}</div>
                            <div>
                                <img :src="item.patientSex?require('../assets/img/xbn.png'):require('../assets/img/xbn1.png')">
                                {{item.patientAge}}岁
                            </div>
                            <div>{{item.patientPhone}}</div>

                            <div>条未读消息</div>
                            <div>{{item.sum}}</div>
                            <div>您有</div>
                        </div>
                        <em class="delChat" @click.stop="shoeDelChat(item.patientId)">删除</em>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="daigouyao">
            <div class="tan_content" style=" white-space: nowrap;">
                <img class="zanwuxinxi" :style="{display:display2}" src="../assets/img/zanwuxinxi.png">
                <div v-for="(item,index) in lists" :key="index">
                    <div class="patient">
                        <div class="patient_left">
                            <img :src="item.patientImg">
                            <div class="patient_left_Te">
                                <img :src="item.patientSex==1?require('../assets/img/xbn.png'):require('../assets/img/xbn1.png')">
                                {{item.patientAge}}岁
                            </div>
                        </div>
                        <div class="patient_right patient_right1">
                            <div>{{item.patientName}} ({{item.symptom}})</div>
                            <div class="kfsj">开方时间 {{item.createTime}}</div>
                        </div>
                        <div class="tixinggouyao" v-if="item.check==true?false:true" @touchstart="remindPurchase(item.patientId)">提醒购药</div>
                        <div class="tixinggouyao" v-if="item.check==true?true:false">{{countDownNum}}s</div>

                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="wrap" v-if="beijing">
        <div class="hidden">
            <img class="jlu" src="../assets/img/mobanwu.png">
            <div>近期没有{{beijingtext}}的患者</div>
        </div>
    </div>
    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp">
    <confirm :text="tipText" ref="confirm" @cancel="cancel" @confirm="delChatNum"></confirm>
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
import HeadTop from "base/header/header"
import TabBar from "../components/patientTabBar"
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
            lists: '',
            beijing: '',
            token: '',
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
        this.doctorId = cookie.get("doctorId");
        this.findChatPatient();
        //this.getWxConfig();
    },
    computed: {

    },

    methods: {
        getWxConfig() {
            $.ajax({
                url: "https://www.mfzhosp.com/mkkMoblie/accessToken/getWxConfig",
                type: 'post',
                dataType: 'json',
                data: {
                    'url': location.href.split('#')[0]
                },
                success: function (data) {
                    wx.config({
                        debug: false,
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: ['checkJsApi', 'onMenuShareTimeline',
                            'onMenuShareAppMessage', 'onMenuShareQQ',
                            'onMenuShareWeibo', 'hideMenuItems',
                            'showMenuItems', 'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem', 'translateVoice',
                            'startRecord', 'stopRecord', 'onRecordEnd',
                            'playVoice', 'pauseVoice', 'stopVoice',
                            'uploadVoice', 'downloadVoice', 'chooseImage',
                            'previewImage', 'uploadImage', 'downloadImage',
                            'getNetworkType', 'openLocation', 'getLocation',
                            'hideOptionMenu', 'showOptionMenu', 'closeWindow',
                            'scanQRCode', 'chooseWXPay',
                            'openProductSpecificView', 'addCard', 'chooseCard',
                            'openCard'
                        ],
                        openTagList: ['wx-open-launch-weapp']
                    });
                    wx.ready(function () {

                    })
                    wx.error(function (res) {
                        //alert(res)
                    })
                }
            });
        },
        purchaseList() {
            //if(this.huanzhe.length==0){
            //this.lists = []
            //this.loadUp = false;
            //this.beijing = true;
            //}else{
            let list = {
                token: this.token,
                doctorId: this.doctorId
            }
            purchaseList(list).then((res) => {
                //console.log(res);
                if (res.data.length == 0) {
                    this.beijing = true;
                    this.loadUp = false;
                    this.beijingtext = '待购药'
                } else {
                    this.lists = res.data;
                    this.loadUp = false;
                    this.beijing = false;
                }
            })
            //}
        },
        findChatPatient() {
            let list = {
                token: this.token,
                doctorId: this.doctorId
            }
            findChatPatient(list).then((res) => {
                //console.log(res);
                if (res.data.length == 0) {
                    this.beijing = true;
                    this.loadUp = false;
                    this.beijingtext = '待问诊'
                    this.lists = []
                } else {
                    this.huanzhe = res.data;
                    this.loadUp = false;
                    // for(var i=0;i<res.data.length;i++){
                    //   this.totalNum += (res.data[i].sum)*1
                    // }
                    // console.log(this.totalNum)
                }
            })
        },
        cancel() {
            this.$refs.confirm.hide();
        },
        shoeDelChat(chatId) {
            this.$refs.confirm.show();
            this.chatId = chatId;
        },
        delChatNum() {
            let list = {
                token: this.token,
                patientId: this.chatId,
                doctorId: this.doctorId
            }
            delChatNum(list).then((res) => {
                if (res.type == true) {
                    this.$toast(res.massage)
                    this.$refs.confirm.hide();
                    this.$router.go(0)
                } else {
                    this.$toast(res.massage)
                }
            })
        },
        remindPurchase(patientId) {
            let list = {
                token: this.token,
                doctorId: this.doctorId,
                patientId: patientId
            }
            remindPurchase(list).then((res) => {
                //console.log(res);
                if (res.type == true) {
                    this.$toast(res.massage)
                } else {
                    this.$toast(res.massage)
                }
            })
        },
        changeBtn(index) {
            this.currentTab = index;
            this.loadUp = true;
            //console.log(index)
            if (index == 0) {
                this.findChatPatient();
                this.daiwenzhen = true;
                this.daigouyao = false;
            } else {
                this.purchaseList();
                this.daiwenzhen = false;
                this.daigouyao = true;
            }
        },
        goLiaotian(patientId) {
            this.$router.push({
                path: '/liaotian',
                query: {
                    patientId: patientId,
                    page: 'zixunHuan'
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

/* 头像 */
.patient {
    width: 100%;
    /* height: 1.48rem; */
    background: #fff;
    padding: .18rem .25rem;
    box-sizing: border-box;
    margin-top: 1px;
    overflow: hidden;

}

.patient_left {
    width: .90rem;
    float: left;
}

.patient_left img {
    width: .90rem;
    height: .90rem;
    float: left;
    border-radius: 50%;
}

.patient_left div {
    float: left;
    font-size: 0.24rem;
}

.patient_left_Te {
    width: .80rem;
    height: .25rem;
    border: 1px solid #d2d2d2;
    border-radius: .10rem;
    font-size: 23..33rem;
    color: #222222;
    line-height: .25rem;
    float: left;
    margin-top: .13rem;
    margin-left: .10rem;

}

.patient_left_Te img {
    width: .20rem;
    height: .21rem;
    margin-top: 2%;
    display: block;
    float: left;
    margin-right: .05rem;
    margin-left: .03rem;
}

.patient_right {
    width: 87%;
    height: 100%;
    float: right;
    padding-left: .40rem;
    box-sizing: border-box;
    overflow: hidden;

}

.kfsj {
    clear: both !important;
    color: #717171;
    font-size: .28rem !important;
    float: left !important;
    margin-top: .30rem;
}

.patient_right1 {
    width: 67%;
    float: left;
}

.patient_right div:nth-child(1) {
    color: #717171;
    font-size: .32rem;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: .13rem;
}

.patient_right div:nth-child(2) {
    color: #717171;
    font-size: .26rem;
    float: right;
}

.patient_right div:nth-child(3) {
    color: #717171;
    font-size: .28rem;
    float: left;
    clear: both;
    text-align: left;
    margin-top: .28rem;
    line-height: .28rem;
    width: 100%;
    overflow: hidden;
    /*内容超出后隐藏*/
    text-overflow: ellipsis;
    /* 超出内容显示为省略号*/
    white-space: nowrap;
    /*文本不进行换行*/
}

.tixinggouyao {
    font-size: .26rem;
    color: #00b0c2;
    border-radius: .30rem;
    border: 1px solid #00b0c2;
    width: 1.35rem;
    height: .45rem;
    text-align: center;
    line-height: .45rem;
    float: right;
    margin-top: .35rem;

}

/* 患者 */
.patient {
    width: 100%;
    /* height: 1.48rem; */
    background: #fff;
    padding: .18rem .25rem;
    box-sizing: border-box;
    margin-top: 1px;
    overflow: hidden;
    position: relative;
}

.patient_img {
    width: .90rem;
    height: .90rem;
    float: left;
    border-radius: 50%;
    margin-top: .10rem;
}

.patient_text {
    width: 87%;
    height: 100%;
    float: right;
    padding-left: .50rem;
    box-sizing: border-box;
}

.patient .delChat {
    position: absolute;
    right: 30px;
    top: 20px;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 25px;
    border-radius: 20px;
    background: #00b0c2;
    z-index: 999;
}

.patient_text div:nth-child(1) {
    color: #222222;
    font-size: .32rem;
    float: left;
    line-height: .37rem;
    margin-top: .10rem;
}

/*.patient_text div:nth-child(2){
color: #222;
font-size: .28rem;
float: right;
height: .37rem;
text-align: center;
line-height: .37rem;
}*/
.patient_text div:nth-child(3) {
    color: #717171;
    font-size: .28rem;
    clear: both;
    float: left;
    margin-top: .24rem;
}

.patient_text div:nth-child(2) {
    padding: 0.05rem;
    height: .25rem;
    border: 1px solid #d2d2d2;
    border-radius: .10rem;
    font-size: 0.23rem;
    color: #222222;
    line-height: .25rem;
    float: left;
    margin-top: .17rem;
    margin-bottom: .10rem;
    margin-left: .30rem;
}

.patient_text div:nth-child(2) img {
    width: .20rem;
    height: .21rem;
    margin-top: 2%;
    display: block;
    float: left;
    margin-right: .05rem;
    margin-left: .03rem;
}

.patient_text div:nth-child(4) {
    margin-top: .29rem;
    color: #717171;
    font-size: .26rem;
    float: right;
    margin-left: .08rem;
}

.patient_text div:nth-child(5) {
    margin-top: .29rem;
    color: red;
    font-size: .26rem;
    float: right;

}

.patient_text div:nth-child(6) {
    margin-top: .29rem;
    color: #717171;
    font-size: .26rem;
    float: right;
    margin-right: .08rem;
}

.wrap {
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
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
