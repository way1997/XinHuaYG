<template>
<div class="recordNum">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian"></div>
    <!-- 辩证 -->
    <div class='bianzhen'>
        <div class='dialectical_tit'>
            <div>▪</div> 诊断
            <div>▪</div>
        </div>
        <div class='bianzhen_message'>【患者信息】{{patientName}}
            <span v-if="patientSex==1">男</span>
            <span v-if="patientSex==2">女</span> {{patientAge}}岁
        </div>
        <div class='bianzhen_message'>【辩证】{{symptom}}</div>
        <div class='unfold' v-if="hide" @click='showS' style='display:block'>展开药方</div>
    </div>
    <!-- 原照片 -->
    <div class='yuanPhoto' v-if="show">
        <div class='dialectical_tit'>
            <div>▪</div> 拍照药方
            <div>▪</div>
        </div>
        <img :src='photo' mode='aspectFit' style='width:100%;'>
    </div>
    <!-- 开方 -->
    <div class='extraction' v-if="show">
        <div class='dialectical_tit'>
            <div>▪</div> 开方
            <div>▪</div>
        </div>
        <div class='yaofang'>
            <div>{{shopName}}</div>
        </div>
        <div class='yaofang2'>
            <div class='yaofang2_t'>R:</div>
            <div class='tishi'>
                <div class='tishi_yaoc' v-for="(item,index) in lists_pd" :key="index">{{item.medicineName}} {{item.medicineNum}}</div>
            </div>
        </div>
        <div class='num'>共
            <div>{{preNum}}</div> 剂，每日
            <div>{{preOnce}}</div> 剂，1剂分
            <div>{{dayNum}}</div> 次服用
        </div>
    </div>
    <!-- 选填 -->
    <div class='select_fill' v-if="show">
        <div class='dialectical_tit'>
            <div>▪</div> 选填
            <div>▪</div>
        </div>

        <div class='select_t' style='clear:both'>
            <div>【诊金】</div>
            <div v-for="(item,index) in lists_indent" :key="index" v-show="item.moneyDescribe==5" style="font-size:0.3rem;">￥{{item.money}}</div>
        </div>
        <div class='select_t'>
            <div>【购药前可查看药方】</div>
            <div v-if="isPayLook=='no'">不可看</div>
            <div v-if="isPayLook=='yes'">可看</div>
        </div>
        <div class='select_t'>
            <div>【服药禁忌】</div>
            <span v-for="(item,index) in taboo" :key="index">{{item.tabooName}}</span>
        </div>
        <div class='select_t'>
            <div>【补充说明】</div>
            <div>{{preEnjoin}}</div>
        </div>
    </div>
    <!-- 订单 -->
    <!-- 选填 -->
    <div class='select_fill_1' v-if="show">
        <div class='dialectical_tit'>
            <div>▪</div> 订单
            <div>▪</div>
        </div>

        <div class='select_t'>
            <div>【支付时间】</div>
            <div v-if="indentStatus != '2'">{{payDate}}</div>
            <div v-if="indentStatus == '2' " style="color:#dd0017;">未支付</div>
        </div>
        <div class='select_t'>
            <div>【取货方式】</div>
            <div style="color:#dd0017;" v-if="takeWay=='0001'">未支付</div>
            <div v-if="takeWay=='0002'">上门取货</div>
            <div v-if="takeWay=='0003'">药店配送</div>
        </div>
        <div class='select_t'>
            <div>【收货地址】</div>
            <div>{{receiptPlace}}</div>
        </div>
        <div class='select_t'>
            <div>【当前状态】</div>
            <div style="color:#dd0017;" v-if="indentStatus==2">未支付</div>
            <div v-if="indentStatus==4">已支付</div>
            <div v-if="indentStatus==5">已配送</div>
            <div v-if="indentStatus==6">已取货</div>
            <div v-if="indentStatus==7">已收货</div>
        </div>
    </div>
    <!-- 明细 -->
    <div class='detail' v-if="show" :style='{marginBottom:marginBottom+"rem"}'>
        <div class='dialectical_tit'>
            <div>▪</div> 明细
            <div>▪</div>
        </div>

        <div class='detail_T'>
            <div v-for="(item,index) in lists_indent" :key="index">
                <div class='detail_wrap' v-if="item.moneyDescribe==1">
                    <div class='detail_wrap_1'>药材</div>
                    <div class='num_s'>
                        ¥ {{item.money}}
                    </div>
                </div>

                <div class='detail_wrap' v-if="item.moneyDescribe==2">
                    <div class='detail_wrap_1'>制作费</div>
                    <div class='num_s'>
                        ¥ {{item.money}}
                    </div>
                </div>
                <!-- <div class='detail_wrap'>
                <div class='detail_wrap_1'>治疗服务费</div>
                <div class='num_s' wx:for="{{lists_indent}}" wx:key="index" wx:if="{{item.moneyDescribe==6}}">
                ¥ {{item.money}}
                </div>
            </div> -->

                <div class='detail_wrap' v-if="item.moneyDescribe==5">
                    <div class='detail_wrap_1'>诊金</div>
                    <div class='num_s'>
                        ¥ {{item.money}}
                    </div>
                </div>
                <div class='detail_wrap' v-if="item.moneyDescribe==3">
                    <div class='detail_wrap_1'>代煎服务费</div>
                    <div class='num_s'>
                        ¥ {{item.money}}
                    </div>
                </div>

                <div class='detail_wrap' v-if="item.moneyDescribe==4">
                    <div class='detail_wrap_1'>快递费</div>
                    <div class='num_s'>
                        ¥ {{item.money}}
                    </div>
                </div>
            </div>
        </div>
        <div class='total' v-if="indentStatus==2">
            <div>
                <div>药材费</div>
            </div>
            <div>
                ¥ {{meDecimal}}
            </div>
        </div>
        <div class='total' v-if="show">
            <div>
                <div>总计</div>
                <div>（含代煎、快递费）</div>
            </div>
            <div>¥ {{total}}</div>
        </div>
    </div>

    <div class='fsyfhj' v-if="prescriptionSendStatus ==0&&show">
        <div @click='fasong' :disabled='disabled'>发送患者</div>
    </div>
</div>
</template>

<script>
import {
    findPhotoPrescriptionDetails,
    updateSendStatus
} from 'api/doctor'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "recordNum",
    data() {
        return {
            pageName: '新华医馆',
            token: '',
            doctorId: '',
            hide: true,
            show: false,
            takeWay: '',
            fasongdisplay: '',
            marginBottom: 0,
            patientName: '',
            patientSex: '',
            patientAge: '',
            symptom: '',
            decoct: '',
            shopName: '',
            preNum: '',
            preOnce: '',
            dayNum: '',
            lists_pd: '',
            indentStatus: '',
            meDecimal: '',
            receiptPlace: '',
            indentStatus: '',
            photo: '',
            lists_indent: '',
            isPayLook: '',
            taboo: '',
            preEnjoin: '',
            payDate: '',
            indentStatus: '',
            total: '',
            prescriptionSendStatus: '',
            disabled: false
        }
    },
    created() {
        this.token = cookie.get("token");
        this.doctorId = cookie.get("doctorId");
        this.findPhotoPrescriptionDetails();
    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },
        findPhotoPrescriptionDetails() {
            let list = {
                token: this.token,
                prescriptionId: this.$route.query.prescriptionId
            }
            findPhotoPrescriptionDetails(list).then((res) => {
                this.patientName = res.data.patientName, //病人姓名
                    this.patientSex = res.data.patientSex, //病人性别
                    this.patientAge = res.data.patientAge, //病人年龄
                    this.symptom = res.data.symptom, //症状
                    this.decoct = res.data.decoct, //是否简药
                    this.shopName = res.data.shopName, //药店名
                    this.preNum = res.data.preNum, //一共多少挤
                    this.preOnce = res.data.preOnce, //每剂多少次服
                    this.dayNum = res.data.dayNum, //每天几次
                    this.lists_pd = res.data.lists_pd, //药材
                    this.meDecimal = res.data.meDecimal,
                    this.receiptPlace = res.data.receiptPlace, //收货地址
                    this.indentStatus = res.data.indentStatus, //订单状态
                    this.photo = res.data.photo, //照片路径
                    // moneyDescribe = res.data.moneyDescribe,//费用类型(1、药材费  2、制作费用  3、代煎费用 4、配送费用 5、诊金 6、医生服务费   不含代煎费用 和配送费用)
                    this.lists_indent = res.data.lists_indent, //金额们
                    this.isPayLook = res.data.isPayLook, //购药前是否可查看药方
                    this.taboo = res.data.taboo, //服药禁忌
                    this.preEnjoin = res.data.preEnjoin, //补充说明
                    this.payDate = res.data.payDate, //支付时间
                    this.total = res.data.total, //总价
                    this.prescriptionSendStatus = res.data.prescriptionSendStatus
            })
        },
        fasong() {
            let list = {
                token: this.token,
                prescriptionId: this.$route.query.prescriptionId,
                sendStatus: 1
            }
            updateSendStatus(list).then((res) => {
                this.$toast('已发送给患者');
                this.disabled = true;
                this.$router.push('/homePage')
            })
        },
        showS() {
            this.hide = false;
            this.show = true;
        }
    },
    components: {
        HeadTop
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

/* pages/paizhaokf/chufang_pzxq.wxss */
page {
    height: 100%;
    background: #f1f1f1;
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

.jindu {
    width: 100%;
    height: 1.26rem;
    background: #fff;
    overflow: hidden;
    margin-bottom: .17rem;
}

.jindu_qiu {
    width: 1.00rem;
    height: 100%;
    float: left;
    margin-right: .63rem;
    position: relative;
}

.jindu_qiu .jindu_q:nth-child(5) {
    margin-right: 0;
}

.jindu_q {
    width: .40rem;
    height: .40rem;
    background: #c4c4c4;
    border-radius: 50%;
    text-align: center;
    line-height: .40rem;
    color: #fff;
    font-size: .30rem;
    display: block;
    margin: 0 auto;
    margin-top: .25rem;
}

.jindu_t {
    font-size: .26rem;
    color: #979797;
    text-align: center;
    line-height: .57rem;
}

.line {
    width: 1.22rem;
    height: 0.04rem;
    background: #c4c4c4;
    top: .45rem;
    float: left;
    position: absolute;
    left: -.90rem;
}

/* 已发送 */
.Sent {
    width: 100%;
    height: 1.46rem;
    background: #fff;
    text-align: center;
    font-size: .26rem;
    color: #979797;
    line-height: .36rem;
    padding-top: .15rem;
}

.Sent div:nth-child(1) {
    font-size: .32rem;
    color: #222222;
    line-height: .65rem;
}

.bianzhen {
    width: 100%;
    background: #fff;
    padding: 0 .23rem;
    box-sizing: border-box;
    margin-bottom: .17rem;
}

.dialectical_tit {
    text-align: center;
    color: #222222;
    font-size: .30rem;
    line-height: .70rem;
    background: #fff;
}

.dialectical_tit div {
    display: inline;
    font-size: .24rem;
    line-height: .70rem;

}

.bianzhen_message {
    font-size: .30rem;
    color: #222222;
    line-height: .60rem;
}

/* 照片 */
.yuanPhoto {
    background-color: #fff;
    //width:calc(100% - .60rem);
    padding: .20rem .30rem .30rem;
}

/* 开方 */
.extraction {
    width: 100%;
    background: #fff;
    padding: .26rem .23rem;
    box-sizing: border-box;
    margin-top: .17rem;
}

.num_s {
    float: right;
}

.num_s div {
    float: left
}

.yaofang {
    width: 100%;
    height: .35rem;
    margin-top: .29rem;
    border-bottom: 1px dashed #d2d2d2;
}

.yaofang div:nth-child(1) {
    color: #222222;
    font-size: .30rem;
    float: left;
    line-height: .35rem;
}

.yaofang div:nth-child(3) {
    color: #222222;
    font-size: .28rem;
    float: right;
    line-height: .37rem;
}

.yaofang img:nth-child(2) {
    margin-left: .08rem;
    width: .40rem;
    height: .40rem;
    float: right;
}

.yaofang div:nth-child(4) {
    color: #717171;
    font-size: .28rem;
    clear: both;
    line-height: .70rem;
}

.yaofang1 {
    width: 100%;
    height: .70rem;
    border-bottom: 1px dashed #d2d2d2;
}

.yaofang1 div:nth-child(1) {
    color: #717171;
    font-size: .28rem;
    float: left;
    line-height: .70rem;
}

.yaofang1 div:nth-child(3) {
    color: #222222;
    font-size: .28rem;
    float: right;
    line-height: .70rem;
}

.yaofang1 img:nth-child(2) {
    width: .40rem;
    height: .40rem;
    float: right;
    margin-top: .17rem;
    margin-left: .08rem;
}

.yaofang2 {
    padding: .30rem 0;
    box-sizing: border-box;
}

.yaofang2_t {
    color: #222222;
    font-size: .34rem;
}

.tishi {
    color: #222222;
    font-size: .30rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: .17rem;
}

.tishi_yaoc {
    float: left;
    margin-right: .53rem;
}

.tishi_yaoc div {
    display: inline;
}

.tishi3 {
    color: #f13a3a;
    font-size: .28rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: .17rem;
}

.tishi1 {
    border-bottom: 1px dashed #d2d2d2;
    clear: both;
    width: 100%;
    height: .60rem;
}

.tishi1 img {
    width: .30rem;
    height: .30rem;
    float: left;
    margin-top: .18rem;
}

.tishi1 div {
    float: left;
    color: #00b0c2;
    font-size: .28rem;
    margin-left: .18rem;
    margin-top: .18rem;
}

.num {
    color: #717171;
    font-size: .28rem;
    letter-spacing: .02rem;
    padding-bottom: .30rem;
}

.num div {
    color: #f13a3a;
    display: inline;

}

.num input {
    color: #f13a3a;
    display: block;
    width: .26rem;
    float: left;
    margin-top: -.10rem;
    text-align: center
}

.input_color {
    color: red;
}

/* 选填 */
.select_fill {
    width: 100%;
    background: #fff;
    padding: .26rem .23rem;
    box-sizing: border-box;
    margin-top: .17rem;
    display: flex;
    flex-direction: column;
}

.select_fill_1 {
    width: 100%;
    background: #fff;
    padding: .26rem .23rem;
    box-sizing: border-box;
    margin-top: .17rem;
    display: flex;
    flex-direction: column;
    /* height:4.00rem; */
}

.select_t {
    width: 100%;
    line-height: .70rem;

}

.select_t div:nth-child(1) {
    color: #222222;
    font-size: .30rem;
    float: left;
}

.select_t div:nth-child(2) {
    color: #222222;
    font-size: .28rem;
}

.select_t span {
    color: #222222;
    font-size: .28rem;
    margin-right: .20rem;
    float: left;
}

.select_t div:nth-child(2) div {
    display: inline;
}

.select_t1 {
    width: 100%;
    line-height: .70rem;

}

.checkbox {
    float: left;
    width: .29rem;
    height: .29rem;
    margin: .19rem .20rem 0 .20rem;
}

.select_t1 div:nth-child(2) {
    color: #222222;
    font-size: .30rem;
    float: left;
    margin-right: .55rem;
}

.select_t1 div:nth-child(3) {
    color: #717171;
    font-size: .28rem;
    margin-left: 29%;
}

/* 明细 */
.detail {
    width: 100%;
    background: #fff;
    padding: .26rem .23rem 0 .23rem;
    box-sizing: border-box;
    margin-top: .17rem;
    text-align: center;
    padding-bottom: .10rem;
}

.detail_T {
    width: 100%;
    color: #222222;
    font-size: .30rem;
    padding-bottom: .70rem;
    border-bottom: 1px dashed #d2d2d2;

}

.detail_wrap {
    width: 100%;
    line-height: .49rem;
    clear: both;
}

.detail_wrap_1 {
    float: left;
}

.total {
    width: 100%;
    padding-bottom: 11%;
}

.total div:nth-child(1) div:nth-child(1) {
    color: #222222;
    font-size: .30rem;
    float: left;
    line-height: .80rem;

}

.total div:nth-child(1) div {
    color: #717171;
    font-size: .26rem;
    float: left;
    line-height: .80rem;
}

.total div:nth-child(2) {
    float: right;
    color: #222222;
    font-size: .30rem;
    line-height: .80rem;
}

.reminder {
    font-size: .26rem;
    color: #717171;
    float: left;
    clear: both;
    line-height: .38rem;
}

.yincmx {
    width: 100%;
    height: .69rem;
    line-height: .69rem;
    text-align: center;
    font-size: .28rem;
    color: #717171;
}

.unfold {
    font-size: .30rem;
    text-align: center;
    border-top: 1px dashed #d2d2d2;
    color: #979797;
    clear: both;
    line-height: .70rem;
}

.fsyfhj {
    width: 100%;
    height: .90rem;
    padding: .10rem .50rem;
    box-sizing: border-box;
    z-index: 9998;
    background: white;
    position: fixed;
    bottom: 0;
    left: 0;
}

.fsyfhj div {
    color: #fff;
    background: #00b0c2;
    text-align: center;
    line-height: .72rem;
    height: .72rem;
    width: 100%;
    border-radius: .10rem;
    font-size: .32rem;
}
</style>
