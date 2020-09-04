<template>
<div class="zaixian">
    <div class="backHome" @touchstart="goBack">返回上一级</div>
    <div class="xian"></div>

    <div class='tan_content' style=" white-space: nowrap;">
        <div style='width:100%;height:0px;'></div>
        <div v-for="(item,index) in list2" :key="index">
            <div class='wrap002' @touchstart='chufang_xq(item.prescriptionId)'>
                <div class='wrap_tit'>
                    <div class='wrap_tit1'>{{item.patientName}}</div>
                    <div class='wrap_tit1 wrap_tit2' v-if="item.patientSex==2">女</div>
                    <div class='wrap_tit1 wrap_tit2' v-if="item.patientSex==1">男</div>

                    <div class='wrap_tit1 wrap_tit2'>{{item.age}}</div>
                    <image src='../../image/youjiantou.png' class='wrap_tit4'></image>
                    <div class='wrap_tit3'>查看详情</div>
                </div>

                <div class='wrap_tit5'>
                    【辩证】{{item.symptom}}
                </div>
                <div class='wrap_tit6'>{{item.createDate}}</div>
                <div class='wrap_tit7' v-if="item.sendStatus==0">待发送给患者</div>
                <div class='wrap_tit7' v-if="item.sendStatus==1">已发送给患者</div>
            </div>
        </div>

        <div class='wrapwu' v-if='list2.length==0'>
            <div class='hidden'>
                <image class='jlu' src='../../image/mobanwu.png'></image>
                <div>您还没有通过拍照开过处方哦</div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import {
    doctorChoosepri,
    findPatientByTel,
    findPatient,
    findPhotoPrescription
} from "api/doctor"
import HeadTop from "base/header/header";
import cookie from 'js-cookie'
import router from "../router";
export default {
    name: "zaixian",
    data() {
        return {
            pageName: "确认处方",
            showModal: false,
            list: [

            ],
            tongxunhidden: true,
            huanzhelist: true,
            phone: '',
            page: '',
            names: '',
            currentTab: 0,
            list2: []
        };
    },
    created() {
        this.token = cookie.get('token');
        this.doctorId = cookie.get('doctorId');
        this.page = this.$route.query.page;
        this.findPhotoPrescription();
    },
    beforeRouterEnter(to, from, next) {
        next(vm => {
            vm.user = JSON.parse(to.query.user);
        })
    },
    computed: {},

    methods: {
        goBack() {
            this.$router.push('/homePage')
        },
        findPhotoPrescription() {
            let list = {
                token: this.token,
                doctorId: this.doctorId
            }
            findPhotoPrescription(list).then((res) => {
                //console.log(res);
                this.list2 = res.data;
            })
        },
        chufang_xq(prescriptionId) {
            this.$router.push({
                path: '/paizhaoXq',
                query: {
                    prescriptionId: prescriptionId
                }
            })
        },
        phoneSearch() {
            this.showModal = true;
        },
        hidePhone() {
            this.showModal = false;
        }
    },
    components: {
        HeadTop
    }
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

.backGo {
    position: absolute;
    left: 0.34rem;
    top: 0.32rem;
    width: 0.3rem;
    height: 0.38rem;
    //background:#fff;
    z-index: 99999999;
}

.swiper-tab {
    background: #fff;
    width: 100%;
    height: .57rem;
    line-height: .57rem;
    font-size: .30rem;
    padding-top: .30rem;
    margin-bottom: .05rem;
    padding-bottom: .20rem;
}

.swiper-tab-item {
    color: #00b0c2;
    width: 2.50rem;
    text-align: center;
    height: .57rem;
    border: 1px solid #00b0c2;
    float: left;
}

.swiper-tab-item:nth-child(1) {
    margin-left: calc((100% - 65.0rem) / 2);
    border-radius: .10rem 0 0 .10rem;
}

.swiper-tab-item:nth-child(2) {
    border-radius: 0 .10rem .10rem 0;
}

.active {
    color: #fff;
    /* border-bottom:. 4rem solid #00b0c2; */
    background: #00b0c2;
    display: inline-block;
}

.zaixian {
    height: 100%;
    //background: #f1f1f1;
}

.huanzheList::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}

.huanzheList {
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
}

.seek {
    width: 100%;
    height: .9rem;
    background: #fff;
    padding: .16rem .26rem;
    box-sizing: border-box;
}

.seek_s {
    width: 100%;
    height: 100%;
    border-radius: .1rem;
    background: #5ddae7;
}

.seek_s img {
    width: .46rem;
    height: .43rem;
    float: left;
    margin: .1rem .19rem;

}

.seek_s input {
    font-size: .30rem;
    float: left;
    margin-top: 0.1rem;
    background: none;
}

.input_color {
    color: #fff;
}

/* 患者分组 */
.huanzhe {
    width: 100%;
    height: .70rem;
    margin: .14rem 0;
    background: #fff;
    padding: 0 .30rem;
    box-sizing: border-box;
}

.huanzhe img:nth-child(1) {
    width: .42rem;
    height: .42rem;
    float: left;
    transform: rotateY(180deg);
    margin-top: .12rem;
}

.huanzhe div:nth-child(3) {
    color: #222222;
    font-size: .30rem;
    float: left;
    text-align: right;
    line-height: .70rem;
    margin-left: .40rem;
}

.huanzhe img:nth-child(2) {
    width: .40rem;
    height: .40rem;
    float: right;
    margin-top: .16rem;
    margin-left: .12rem;
}

/* 开方,方式 */

.kffs {

    width: 100%;
    height: 1.26rem;
    background: #fff;
    padding: .31rem .23rem 0 .23rem;
    text-align: center;
    box-sizing: border-box;

}

.kffs_left {
    width: 50%;
    height: 100%;
    float: left;
}

.kffs_left div:nth-child(1) {
    color: #222222;
    font-size: .30rem;

}

.kffs_left div:nth-child(2) {
    color: #717171;
    font-size: .26rem;
    line-height: .50rem;
}

.kffs_right {
    width: 50%;
    height: 100%;
    background: red;
    float: right;
}

/* 患者 */
.patient {
    width: 100%;
    height: 1.40rem;
    background: #fff;
    padding: .18rem .25rem;
    box-sizing: border-box;
    margin-top: .10rem;
}

.patient_img {
    width: .90rem;
    height: .90rem;
    float: left;
    border-radius: 50%;
}

.patient_text {
    width: 86%;
    height: 100%;
    float: right;
    padding-left: .50rem;
    box-sizing: border-box;
}

.patient_text div:nth-child(1) {
    color: #222222;
    font-size: .32rem;
    float: left;
    line-height: .37rem;
}

.patient_text div:nth-child(2) {
    color: #ffffff;
    font-size: .24rem;
    float: right;
    width: 1.20rem;
    height: .42rem;
    background: #00b0c2;
    border-radius: .10rem;
    text-align: center;
    line-height: .42rem;
}

.patient_text div:nth-child(3) {
    color: #717171;
    font-size: .28rem;
    clear: both;
    float: left;
    margin-top: .24rem;
}

.patient_text div:nth-child(4) {
    padding: 0 .05rem;

    height: .25rem;
    border: 1px solid #d2d2d2;
    border-radius: .10rem;
    font-size: .23rem;
    color: #222222;
    line-height: .25rem;
    float: left;
    margin-top: .28rem;
    margin-left: .28rem;
}

.patient_text div:nth-child(4) img {
    width: .20rem;
    height: .21rem;
    margin-top: 2%;
    display: block;
    float: left;
    margin-right: .05rem;
    margin-left: .03rem;
}

.patient_text div:nth-child(5) {
    margin-top: .29rem;
    color: #717171;
    font-size: .26rem;
    float: right;
}

/* 遮罩 */
.zhezhao {
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    bottom: 0;
    left: 0;
}

.enter {
    z-index: 999;

    width: 5.90rem;
    height: 4rem;
    background: #fff;
    border-radius: .10rem;
    position: fixed;
    left: 50%;
    top: 28%;
    transform: translate(-50%, -50%)
}

.enter_tit {
    font-size: .31rem;
    color: #222222;
    text-align: center;
    line-height: .85rem;

}

.enter_but {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    margin-top: .30rem;
    padding: 0 .30rem;
    box-sizing: border-box;
}

.enter_but div {
    font-size: .32rem;
    color: #fff;
    width: 100%;
    height: .65rem;
    border-radius: .10rem;
    text-align: center;
    line-height: .65rem;
    float: left;
    background: #00b0c2;
}

.guanbi {
    width: .50rem;
    height: .50rem;
    border-radius: 50%;
    text-align: center;
    line-height: .30rem;
    position: absolute;
    right: .23rem;
    top: -0.08px;

}

.guanbi img {
    width: 100%;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
}

.enter_tit1 {
    font-size: .28rem;
    color: #222222;
    text-align: center;
    line-height: .34rem;
}

.tel {
    width: 100%;
    background: #d2d2d2;
    font-size: .28rem;
    color: #717171;
    text-align: center;
    height: .64rem;
    caret-color: #00b0c2;
}

.tel_wrap {
    width: 100%;
    padding: 0 .30rem;
    box-sizing: border-box;
    margin-top: .38rem;
}

.wrap {
    width: 100%;
    height: 82.2%;
    background: #fff;
    padding-top: 1rem;
}

.jlu {
    width: 1.60rem;
    height: 1.60rem;
    display: block;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   bottom: 0;
    //   right: 0;
    margin: auto;
}

/* 无内容显示 */
.hidden div {
    color: #a5a4a4;
    font-size: .30rem;
    text-align: center;
    line-height: .90rem;
    //margin-bottom: 2.54rem;
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

.qu_but {
    float: right;
    font-size: .30rem;
    color: #a5a4a4;
    line-height: .90rem;
}

.text_wrap {
    width: 100%;
    height: .90rem;
    background: #fff;
    padding: 0 .23rem;
    box-sizing: border-box;
}

.text_wrap div:nth-child(1) {
    color: #222;
    font-size: .30rem;
    line-height: .90rem;
    float: left;
}

.text_wrap img:nth-child(2) {
    width: .40rem;
    height: .40rem;
    float: right;
    margin-top: .26rem;
}

.tan_content {
    width: 100%;
    height: 100%;

}

.wrap002 {
    width: 100%;
    height: 2.40rem;
    background: #fff;
    padding: 0 .24rem;
    box-sizing: border-box;
    margin-bottom: .17rem;
}

::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
}

.wrap_tit {
    width: 100%;
    height: .92rem;
    border-bottom: 1px dashed #d2d2d2;
    font-size: .30rem;
    color: #828282;
    line-height: .92rem;
}

.wrap_tit1 {
    float: left;
    margin-right: .36rem;
}

.wrap_tit2 {
    color: #717171;
    font-size: .30rem;

}

.wrap_tit3 {
    float: right;
}

.wrap_tit4 {
    width: .40rem;
    height: .40rem;
    float: right;
    margin-top: .27rem;
    margin-left: .08rem;
}

.wrap_tit5 {
    float: left;
    font-size: .30rem;
    color: #828282;
    line-height: .92rem;

}

.wrap_tit6 {
    float: left;
    clear: both;
    color: #717171;
    font-size: .30rem;
}

.wrap_tit6 view {
    display: inline;

}

.wrap_tit7 {
    color: #00b0c2;
    font-size: .30rem;
    float: right;
}

.wrapwu {
    width: 100%;
    height: 98.5%;
    background: #fff;
}
</style>
