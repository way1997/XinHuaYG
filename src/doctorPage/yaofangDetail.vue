<template>
<div class="detail">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian" style="clear:both;"></div>
    <div class="full">
        <h1>药方信息</h1>
        <div class="info">
            <p><span>辩证:</span><label>{{symptom}}</label></p>
            <p><span>类型:</span><label v-show="medicineType == 1">中药</label></p>
            <p><span>品牌:</span><label>{{brandName}}</label></p>
            <p><span>药态:</span><label>{{preShapeName}}</label></p>
            <p class="yaofang"><span>药方:</span><label class="yaoList" v-for="(item,index) in pd_lists" :key="index">{{item.medicineName}} {{item.howWeight}}g</label></p>
            <p class="jiFu"><span>剂量:</span><label>共{{preNum}}剂，每日{{preOnce}}剂，1剂分{{dayNum}}次服用</label></p>
        </div>
        <div class="xian" style="clear:both;"></div>
        <h1>其他信息</h1>
        <div class="info">
            <p><span>诊金:</span><label v-for="(item,index) in list_price" :key="index" v-show="item.moneyDescribe==5">￥{{item.money}}</label></p>
            <p><span>购药前查看药方:</span><label v-if="isPayLook==1">可看</label><label v-if="isPayLook==0">不可看</label></p>
            <p class="fuyaojinji"><span>服药禁忌:</span><label v-for="(item,index) in taboo" :key="index">{{item.tabooName}}</label></p>
            <p><span>补充说明:</span><label>{{preEnjoin}}</label></p>
        </div>
    </div>
    <div style="clear:both;"></div>
    <div class="chexiao" v-if="zaikaif" @click="goZaixian">再次开方</div>
    <confirm :text="tipText" ref="confirm" @cancel="cancel" @confirm="confirm"></confirm>
</div>
</template>

<script>
import {
    doctorFindPatientPlan,
    doctorDelPatientPlan
} from "api/doctor"
import HeadTop from 'base/header/header'
import confirm from 'base/confirm/confirm'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "detail",
    data() {
        return {
            token: "",
            doctorId: "",
            doctorHiden: false,
            zaikaif:false,
            patientIds: [],
            prescriptionId: '',
            patientId: '',
            createDate: '',
            prescriptiontext: '',
            isPayLook: 0,
            list_price: '',
            taboo: '',
            money: '',
            price: '',
            price2: '',
            preEnjoin: '',
            preNum: '',
            preOnce: '',
            dayNum: '',
            modelName: '',
            pd_lists: '',
            preShapeName: '',
            symptom: '',
            brandName: '',
            medicineType: 1,
            tipText: '确定要撤销此药方吗？',
            tiaozhuanItem: []
        }
    },
    created() {
        this.token = cookie.get("token");
        this.doctorId = cookie.get("doctorId");
        this.prescriptionId = this.$route.query.prescriptionId;
        this.patientId = this.$route.query.patientId;
        this.doctorFindPatientPlan();
    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },
        showPull() {
            this.$refs.confirm.show();
        },
        cancel() {
            this.$refs.confirm.hide();
        },
        goZaixian() {
            this.$router.push({
                path: '/zaixiankf',
                query: {
                    item: JSON.stringify(this.tiaozhuanItem)
                }
            })
        },
        confirm() {
            let list = {
                doctorId: this.doctorId,
                patientId: this.patientId,
                token: this.token,
                prescriptionId: this.prescriptionId
            }
            doctorDelPatientPlan(list).then((res) => {
                this.$toast('撤销成功');
                this.$refs.confirm.hide();
                this.$router.go(-1)
            })
        },
        doctorFindPatientPlan() {
            let list = {
                doctorId: this.doctorId,
                token: this.token,
                patientId: this.patientId,
                prescriptionId: this.prescriptionId
            }
            doctorFindPatientPlan(list).then((res) => {
                console.log(res)
                if (res.status == 1){this.zaikaif = true}
                this.tiaozhuanItem = res.map_patient;
                this.symptom = res.map_patient.symptom;
                this.preNum = res.map_patient.preNum, //一共多少挤
                    this.preOnce = res.map_patient.preOnce, //每剂多少次服
                    this.dayNum = res.map_patient.dayNum, //每天几次
                    this.pd_lists = res.map_patient.pd_lists, //药材
                    this.serviceCharge = res.map_patient.serviceCharge, //服务费
                    this.preShapeId = res.map_patient.preShapeId,
                    this.preShapeName = res.map_patient.preShapeName,
                    this.brandId = res.map_patient.brandId,
                    this.brandName = res.map_patient.brandName,
                    this.randName = res.map_patient.randName,
                    // this.lists_indent = res.lists_indent,//费用类型(1、药材费  2、制作费用  3、代煎费用 4、配送费用 5、诊金 6、医生服务费   不含代煎费用 和配送费用)
                    this.money = res.map_patient.money, //金额
                    this.isPayLook = res.map_patient.isPayLook, //购药前是否可查看药方
                    this.taboo = res.map_patient.taboo, //服药禁忌
                    this.preEnjoin = res.map_patient.preEnjoin, //补充说明
                    this.price = res.map_patient.price, //药放
                    this.price2 = res.map_patient.price2, //药材费
                    this.createDate = res.map_patient.createDate, //时间
                    this.list_price = res.map_patient.list_price
                this.medicineType = res.map_patient.medicineType
            })
        }
    },
    components: {
        confirm
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

.full {
    width: 100%;

    h1 {
        width: 190px;
        height: 53px;
        line-height: 53px;
        text-align: center;
        font-size: 24px;
        color: #fff;
        background: rgba(66, 202, 198, 1);
        border-radius: 0px 27px 27px 0px;
        margin-top: 20px;
    }

    .info {
        widows: 100%;
        height: 268px;
        background: #fff;

        p {
            width: 90%;
            height: 77px;
            border-bottom: 1px solid #f5f5f5;
            color: #828282;
            font-size: 24px;
            line-height: 77px;
            margin: 0 auto;
            padding: 0 10px;
            clear: both;

            span {
                float: left;
            }

            label {
                float: right;
            }

            &:last-child {
                border-top: 0.01rem solid #f5f5f5;
            }
        }

        p.fuyaojinji {
            height: auto;
            border-bottom: none;
        }

        p.yaofang {
            height: auto;
            float: left;
            margin-left: 24px;
            line-height: 50px;
        }

        .yaoList {
            width: 70%;
        }

        p.jiFu {
            float: left;
            margin-left: 24px;
        }
    }
}

.chexiao {
    width: 611px;
    height: 76px;
    background: #00afc2;
    border-radius: 13px;
    color: #fff;
    font-size: 25px;
    text-align: center;
    line-height: 76px;
    margin: 100px auto;
}
</style>
