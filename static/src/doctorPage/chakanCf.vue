<template>
<div class="zitidian">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian"></div>
    <div class="textChu">
        <p>已将调理方案发送给患者</p>
        <p>医馆会致电指导患者完成支付并安排药品配送</p>
    </div>
    <div class="four">
        <h1>处方信息</h1>
        <div class="info">
            <div class="info">
                <p><span>患者姓名:</span><label>{{patientName}}</label></p>
                <p><span>患者性别:</span><label v-if="patientSex==1">男</label><label v-if="patientSex==2">女</label></p>
                <p><span>患者年龄:</span><label>{{patientAge}}</label></p>
            </div>
        </div>
        <h1>药方信息</h1>
        <div class="info">
            <p><span>辩证:</span><label>{{symptom}}</label></p>
            <p><span>类型:</span><label>{{medicineType}}</label></p>
            <p><span>药态:</span><label>{{shopName}}</label></p>
            <p class="yaofang"><span>药方:</span><label class="yaoList"><em v-for="(item,index) in lists_pd" :key="index">{{item.medicineName}}{{item.medicineNum}}、</em></label></p>
            <p class="jiliang">
                <span>剂量:</span><label>共{{preNum}}剂,每日{{preOnce}}剂,1剂分{{dayNum}}次服用</label>
            </p>
        </div>
        <div class="xian"></div>
        <h1>其他信息</h1>
        <div class="info">
            <p><span>诊金:</span><label v-for="(item,index) in lists_indent" v-show="item.moneyDescribe==5" :key="index">{{item.money}}</label></p>
            <p><span>购药前查看药方:</span><label v-if="isPayLook=='no'">不可看</label><label v-if="isPayLook=='yes'">可看</label></p>
            <p class="fuyaojinji"><span>服药禁忌:</span><label v-for="(item,index) in taboo" :key="index">{{item.tabooName}}、</label></p>
            <p><span>补充说明:</span><label>{{preEnjoin}}</label></p>
        </div>
        <div class="xian"></div>
        <h1>订单信息</h1>
        <div class="info">
            <p><span>支付时间:</span><label v-if="indentStatus != '2'">{{payDate}}</label>
                <label v-if="indentStatus == '2'" style="color:#dd0017;">未支付</label>
            </p>
            <p><span>取货方式:</span><label style="color:#dd0017;" v-if="takeWay=='0001'">未支付</label>
                <label v-if="takeWay=='0002'">上门取货</label>
                <label v-if="takeWay=='0003'">药店配送</label>
            </p>
            <p><span>收货地址:</span><label>{{receiptPlace}}</label></p>
            <p><span>当前状态</span><label style="color:#dd0017;" v-if="indentStatus==2">未支付</label>
                <label v-if="indentStatus==4">已支付</label>
                <label v-if="indentStatus==5">已配送</label>
                <label v-if="indentStatus==6">已取货</label>
                <label v-if="indentStatus==7">已收货</label>
            </p>
            <p><span>总计:</span><label>¥{{total}}</label></p>
        </div>
    </div>
</div>
</template>

<script>
import {
    findPayPrescription
} from "api/doctor"
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "zitidian",
    data() {
        return {
            token: '',
            doctorId: '',
            prescriptionId: '',
            show: false,
            hide: true,
            patientName: '张三',
            patientAge: '18',
            patientSex: '1',
            symptom: '测试',
            preNum: '7',
            preOnce: '1',
            dayNum: '2',
            isPayLook: 1,
            preEnjoin: '无',
            payDate: '',
            takeWay: '',
            receiptPlace: '',
            total: '200',
            meDecimal: '',
            lists_pd: [],
            lists_indent: [],
            taboo: [{
                tabooName: ''
            }],
            token: "",
            prescriptionId: '',
            medicineType: '',
            shopName:'',
            indentStatus:0
        }
    },
    created() {
        this.token = cookie.get("token")
        this.doctorId = cookie.get("doctorId")
        this.prescriptionId = this.$route.query.prescriptionId;
        this.findPayPrescription();
    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },
        findPayPrescription() {
            let list = {
                token: this.token,
                prescriptionId: this.prescriptionId
            }
            findPayPrescription(list).then((res) => {
                this.patientName = res.data.patientName, //病人姓名
                    this.patientAge = res.data.patientAge, //病人年龄
                    this.patientSex = res.data.patientSex, //病人性别
                    this.symptom = res.data.symptom, //症状
                    this.decoct = res.data.decoct, //是否简药
                    this.shopName = res.preShapeName, //药店名
                    this.preNum = res.data.preNum, //一共多少挤
                    this.preOnce = res.data.preOnce, //每剂多少次服
                    this.dayNum = res.data.dayNum, //每天几次
                    this.lists_pd = res.data.lists_pd, //药材
                    this.indentStatus = res.data.indentStatus,
                    this.meDecimal = res.data.meDecimal,
                    this.receiptPlace = res.data.receiptPlace, //收货地址
                    this.indentStatus = res.data.indentStatus, //订单状态
                    // this.modelName =  res.modelName,//秘方
                    // moneyDescribe: res.data.data.moneyDescribe,//费用类型(1、药材费  2、制作费用  3、代煎费用 4、配送费用 5、诊金 6、医生服务费   不含代煎费用 和配送费用)
                    this.lists_indent = res.data.lists_indent, //金额们
                    this.isPayLook = res.data.isPayLook, //购药前是否可查看药方
                    this.taboo = res.data.taboo, //服药禁忌
                    this.preEnjoin = res.data.preEnjoin, //补充说明
                    this.payDate = res.data.payDate, //支付时间
                    this.indentStatus = res.data.indentStatus, //订单状态
                    this.total = res.data.total, //总价
                    this.hidden = false
                if (res.data.medicineType == 1) {
                    this.medicineType = '中药'
                }
                if (res.data.medicineType == 2) {
                    this.medicineType = '西药'
                }
                if (res.data.medicineType == 3) {
                    this.medicineType = '中成药'
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

.textChu {
    width: 480px;
    height: 100px;
    margin: 0 auto;
    border: 1px dashed #dd0017;
    color: #dd0017;
    font-size: 24px;
    line-height: 45px;
    text-align: center;
    border-radius: 20px;
    padding: 10px 20px;
    margin-top: 30px;
}

.four {
    width: 100%;
    padding-top: 30px;

    h1 {
        width: 190px;
        height: 53px;
        line-height: 53px;
        text-align: center;
        font-size: 24px;
        color: #fff;
        background: #00afc2;
        border-radius: 0px 27px 27px 0px;
        margin-top: 20px;
    }

    .info {
        widows: 100%;
        //height:268px;
        background: #fff;

        p {
            width: 682px;
            height: 77px;
            border-bottom: 1px solid #f5f5f5;
            color: #828282;
            font-size: 24px;
            line-height: 77px;
            margin: 0 auto;
            padding: 0 10px;

            span {
                float: left;
            }

            label {
                float: right;
            }
        }

        p.yaofang {
            height: auto;
            float: left;
            margin-left: 24px;
            line-height: 50px;
        }

        p.jiFu {
            float: left;
            margin-left: 34px;
        }

        div {
            font-size: 25px;
            color: #00afc2;
            width: 100%;
            text-align: center;
            line-height: 80px;
        }
    }

    .jiliang {
        clear: both;
    }
}
</style>
