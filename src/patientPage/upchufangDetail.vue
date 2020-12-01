<template>
<div>
    <div class="backHome" @click="backHome">返回上一级</div>
    <div class="xian"></div>

    <!-- 辩证 -->
    <div class='bianzhen'>
        <div class='dialectical_tit'>
            <div>▪</div> 诊断
            <div>▪</div>
        </div>
        <div class='bianzhen_message'>
            <div><span>【开方医生】 </span><label>{{doctorName}}</label></div>
        </div>
        <div class='bianzhen_message'>
            <div><span>【录入时间】 </span><label>{{createDate}}</label></div>
        </div>
        <div class='bianzhen_message meddageIg'><span>【患者信息】</span>
            <!--<span class="patientImageBox">
                <img class="patientImage" :src="patientImage" style="display:inline-block" alt="">
            </span> -->
            <span class="patientMsg">
                <span>{{patientName}}</span>
                <span v-if="patientSex==1">男</span>
                <span v-if="patientSex==2">女</span> {{patientAge}}岁
            </span>
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
    <section v-if="PatShow">
        <!-- 开方 -->
        <div class='extraction' v-if="show">
            <div class='dialectical_tit'>
                <div>▪</div> 药方信息
                <div>▪</div>
            </div>

            <div class='yaofang'>
                <div><span>类型:</span><label>{{medicineType}}</label></div>
            </div>
            <div class='yaofang'>
                <div><span>药态:</span><label>{{preShapeName}}</label></div>
            </div>

            <div class='yaofang'>
                <div>
                    <span>品牌:</span><label>{{pinpaiName}}</label>
                </div>
            </div>
            <div class='yaofang2'>
                <div class='yaofang2_t'>R:</div>
                <div class='tishi'>
                    <div class='tishi_yaoc' v-for="(item,index) in lists_pd" :key="index">{{item.medicineName}} {{item.howWeight}}{{item.drugUnit}}</div>
                </div>
            </div>
            <div class='num'>共
                <div>{{preNum}}</div> 剂，每日
                <div>{{preOnce}}</div> 剂，1剂分
                <div>{{dayNum}}</div> 次服用
            </div>
        </div>
         <!-- 药店 -->
        <section v-if="show">
            <div class='extraction' v-if="shopName">
            <div class='dialectical_tit'>
                <div>▪</div> 药店信息
                <div>▪</div>
            </div>

            <div class='yaofang'>
                <div>{{shopName}}</div>
            </div>
            <div class='yaofang'>
                <div><span>联系方式:</span><label>{{shopPhone}}</label></div>
            </div>
        </div>
        </section>
        <!-- 选填 -->
        <div class='select_fill' v-if="show">
            <div class='dialectical_tit'>
                <div>▪</div> 其他
                <div>▪</div>
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
        
        <!-- 明细 -->
        <div class='detail' v-if="show" :style='{marginBottom:marginBottom+"rem"}'>
            <div class='dialectical_tit'>
                <div>▪</div> 明细
                <div>▪</div>
            </div>

            <div class='total'>
                <div>
                    <div>诊金</div>
                </div>
                <div>
                    ¥ {{money}}
                </div>
            </div>
            <section style="clear:both"></section>
            <div class='total'>
                <div>
                    <div>药材费</div>
                </div>
                <div v-if="status==0">
                    <span >
                         <span >¥ {{price2}}</span> 
                    </span>
                </div>

                <div v-if="status==1">
                    折扣价：<span>¥ {{pricezk}}</span>
                </div>
                <div v-if="status==1" style="color:rgb(144, 144, 144);font-size: .27rem;margin-right: .234rem;">
                    <span >
                         原价：<span style="text-decoration:line-through">¥ {{price2}}</span> 
                    </span>
                </div>
                
            </div>
            <section style="clear:both"></section>
            <div class='total' v-if="show">
                <div>
                    <div>总计</div>
                    <div>（含代煎、快递费）</div>
                </div>

                <div v-if="status==0">
                    <span >
                         <span >¥ {{price1}}</span> 
                    </span>
                </div>

                 <div v-if="status==1">
                    折扣价：<span>¥ {{pricezkzj}}</span>
                </div>
                <div  v-if="status==1" style="color:rgb(144, 144, 144);font-size: .27rem;margin-right: .234rem;">
                    <span >
                         原价：<span style="text-decoration:line-through">¥ {{price1}}</span> 
                    </span>
                </div>
            </div>
        </div>
        <div v-if="show" style="overflow:hidden;margin-bottom:1rem">
            <van-divider>已到底</van-divider>
        </div>
        <div class='fsyfhj'>
            <div v-if="isPayMoney==0" @click='fasong'>缴费购买</div>
            <div v-if="isPayMoney==1" class="oreadyPay" @click='oreadyPay'>完成购买</div>
        </div>
    </section>

</div>
</template>

<script>
import {
    findPatPreMsg
} from 'api/patient'
import HeadTop from 'base/header/header'
import cookie from "js-cookie"
import baseURI from 'api/env'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
import router from '../router'
export default {
    name: 'upchufangDetail',
    data() {
        return {
            token: '',
            hide: true,
            show: false,
            PatShow: false,
            shopName:false,//支付成功显示 药店名称
            shopPhone:'',
            preStatus: '',
            isPayMoney: '', //是否付款
            doctorId: '',
            patientId: '',
            patPreId: '',
            prescriptionId: '', //订单Id
            PatPreMsg: '',
            createDate: '',
            doctorName: '',
            patientAge: '',
            patientImage: '',
            patientName: '',
            patientSex: '',
            photo: '',
            medicineType: '', //类型:
            preShapeName: '', //药态:
            //---------------
            pageName: '新华医馆',
            takeWay: '',
            fasongdisplay: '',
            marginBottom: 1,
            symptom: '',
            decoct: '',
            createDate: '', //创建时间
            preNum: '',
            money: '', //诊金
            pinpaiName:'',
            price1: '', // 总药费
            pricezkzj:'',//总费用折扣价
            price2: '', //药材费
            pricezk:'',//药材折扣价
            status:'',//折扣状态显示
            statusShow:false,
            preOnce: '',
            dayNum: '',
            lists_pd: '',
            indentStatus: '',
            meDecimal: '',
            receiptPlace: '',
            indentStatus: '',
            lists_indent: '',
            isPayLook: '',
            taboo: '',
            preEnjoin: '',
            payDate: '',
            indentStatus: '',
            total: '',
            prescriptionSendStatus: '',
            disabled: false,
            transmit_paicf: 1, //拍处方跳支付信号
        }
    },
    created() {
        this.token = this.$route.query.token ? this.$route.query.token : cookie.get('token');
        this.patientId = this.$route.query.patientId ? this.$route.query.patientId : cookie.get("patientId");
        this.patPreId = this.$route.query.patPreId
        this.preStatus = this.$route.query.preStatus
        console.log(this.preStatus)
        if (this.preStatus == 3) {
            this.PatShow = true
        } else {
            this.showS()
        }
        this.findPatPreMsg()
    },
    methods: {
        backHome() {
            this.$router.go(-1)
        },
        showS() {
            this.hide = false;
            this.show = true;
        },
        findPatPreMsg() {
            console.log(this.patPreId)
            let list = {
                token: this.token,
                patPreId: this.patPreId
            }
            findPatPreMsg(list).then(res => {
                if (res.type) {
                    // this.$toast.center(res.massage)
                    this.PatPreMsg = res.map_patient
                    this.isPayMoney = res.indentStates
                    this.prescriptionId = res.prescriptionId
                    this.shopName = res.shopName
                    this.shopPhone = res.phone
                    this.createDate = this.PatPreMsg.createDate

                    this.doctorId = this.PatPreMsg.doctorId
                    this.doctorName = this.PatPreMsg.doctorName
                    this.patientAge = this.PatPreMsg.patientAge
                    this.patientImage = this.PatPreMsg.patientImage
                    this.patientName = this.PatPreMsg.patientName
                    this.patientSex = this.PatPreMsg.patientSex
                    this.money = this.PatPreMsg.money
                    this.price1 = this.PatPreMsg.price
                    this.pricezkzj = this.PatPreMsg.pricezkzj
                    this.price2 = this.PatPreMsg.price2
                    this.pricezk = this.PatPreMsg.pricezk
                    this.status = this.PatPreMsg.status
                    this.createDate = this.PatPreMsg.createDate
                    this.preShapeName = this.PatPreMsg.preShapeName
                    //---------嫁接代码
                    this.symptom = this.PatPreMsg.symptom, //症状
                        this.decoct = this.PatPreMsg.decoct, //是否简药
                        this.pinpaiName = this.PatPreMsg.brandName, //品牌名
                        this.preNum = this.PatPreMsg.preNum, //一共多少挤
                        this.preOnce = this.PatPreMsg.preOnce, //每剂多少次服
                        this.dayNum = this.PatPreMsg.dayNum, //每天几次
                        this.lists_pd = this.PatPreMsg.pd_lists, //药材
                        this.meDecimal = this.PatPreMsg.meDecimal,
                        this.photo = this.PatPreMsg.photo, //照片路径
                        // moneyDescribe = this.PatPreMsg.moneyDescribe,//费用类型(1、药材费  2、制作费用  3、代煎费用 4、配送费用 5、诊金 6、医生服务费   不含代煎费用 和配送费用)
                        this.lists_indent = this.PatPreMsg.lists_indent, //金额们
                        this.isPayLook = this.PatPreMsg.isPayLook, //购药前是否可查看药方
                        this.taboo = this.PatPreMsg.taboo, //服药禁忌
                        this.preEnjoin = this.PatPreMsg.preEnjoin, //补充说明
                        this.payDate = this.PatPreMsg.payDate, //支付时间
                        this.total = this.PatPreMsg.total, //总价
                        this.prescriptionSendStatus = this.PatPreMsg.prescriptionSendStatus
                    //-------------
                    if (this.PatPreMsg.medicineType == 1) {
                        this.medicineType = '中药'
                    }
                    if (this.PatPreMsg.medicineType == 2) {
                        this.medicineType = '西药'
                    }
                    if (this.PatPreMsg.medicineType == 3) {
                        this.medicineType = '中成药'
                    }
                    console.log(this.photo)
                }

                console.log(this.PatPreMsg)
            }).catch(error => {
                console.log(error)
            })
        },
        fasong() {
            this.$router.push({
                name: 'chufangXq',
                query: {
                    doctorId: this.doctorId,
                    patientId: this.patientId,
                    indentId: this.prescriptionId,
                    signal: this.transmit_paicf
                }
            })
        },
        oreadyPay() {
            this.$toast.center('已完成购买 *^_^*')
        }
    }
}
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";

.zhezhao {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
}

.backHome {
    width: 81.666%;
    height: 0.76rem;
    background: #00afc2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    color: #fff;
    font-size: 0.32rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
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
    position: relative;
}

.patientMsg {
    display: inline-block;
}

.patientImageBox {
    width: .8rem;
    height: .8rem;
    display: block;
    position: absolute;
    top: 0;
    left: 33%;

    .patientImage {
        width: 100%;
        height: 100%;
        display: inline;
    }

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
    line-height: .35rem;
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

.total div:nth-child(2),.total div:nth-child(3) {
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

.fsyfhj div.oreadyPay {
    color: #fff;
    background: #90a0a2;
}
</style>
