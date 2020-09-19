<template>
<div class="zitidian">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian"></div>
    <div class="four">
        <h1>处方信息</h1>
        <div class="info">
            <p><span>开方时间:</span><label>{{list.createDate}}</label></p>
            <p><span>开方医生:</span><label>{{list.doctorName}}</label></p>
            <p><span>开方金额:</span><label></label></p>
            <!-- <div class="chakan">查看详情</div> -->
        </div>
        <h1>药方信息</h1>
        <div class="info">
            <p><span>辩证:</span><label>{{item.symptom}}</label></p>
            <p><span>类型:</span><label>中药</label></p>
            <p><span>品牌:</span><label></label></p>
            <p><span>药态:</span><label>{{item.shapeName}}</label></p>
            <p class="yaofang"><span>药方:</span><label class="yaoList"><em v-for="(item,index) in item.medicine" :key="index">{{item.medicineName}}{{item.howWeight}}</em></label></p>
        </div>
        <div class="xian"></div>
        <h1>其他信息</h1>
        <div class="info">
            <p><span>购药前查看药方:</span><label v-if="item.isPayLook==0">不可看</label><label v-if="item.isPayLook==1">可看</label></p>
            <p class="fuyaojinji"><span>服药禁忌:</span><label v-for="(item,index) in item.taboo" :key="index">{{item.tabooName}}、</label></p>
            <p><span>补充说明:</span><label>{{item.sickName}}</label></p>
        </div>
        <div class="xian"></div>
        <h1>配送信息</h1>
        <div class="info">
            <p><span>收件人:</span><label>刘患者</label></p>
            <p><span>联系方式:</span><label>13344445555</label></p>
            <p><span>收件地址:</span><label>山西省长治市潞城区富民小区3号楼3单元101</label></p>
            <p><span>物流状态:</span><label>配送中</label></p>
            <p><span>运单号:</span><label>ER223345566</label></p>
        </div>
    </div>
</div>
</template>

<script>
//import {lookPrescription} from "api/patient"
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "zitidian",
    data() {
        return {
            token: '',
            patientId: '',
            prescriptionId: '',
            medicineType: '',
            list: '',
            item: '',
            pageInd: '',
        }
    },
    created() {
        this.token = cookie.get("token")
        this.patientId = cookie.get("patientId")
        this.item = JSON.parse(this.$route.query.item)
        console.log(this.item.createDate)
    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },
    },
    components: {

    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.backHome {
    width: 81.46%;
    height: 0.76rem;
    background: #00afc2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    color: #fff;
    font-size: 0.25rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
}

.xian {
    width: 100%;
    height: 0.1rem;
    background: #efefef;
    clear: both;
}

.four {
    width: 100%;
    padding-bottom: .233333rem;

    h1 {
        width: 1.9rem;
        height: 0.53rem;
        line-height: 0.53rem;
        text-align: center;
        font-size: 0.24rem;
        color: #fff;
        background: #00afc2;
        border-radius: 0 0.27rem 0.27rem 0;
        margin-top: 0.2rem;
    }

    .info {
        widows: 100%;
        //height:268px;
        background: #fff;

        p {
            width: 90.93%;
            height: 0.77rem;
            border-bottom: 0.01rem solid #f5f5f5;
            color: #828282;
            font-size: 0.24rem;
            line-height: 0.77rem;
            margin: 0 auto;
            padding: 0 0.1rem;

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
            margin-left: 0.34rem;
            line-height: 0.5rem;
        }

        .yaoList {
            width: 70%;
        }

        p.jiFu {
            float: left;
            margin-left: 0.34rem;
        }

        div {
            font-size: .25rem;
            color: #00afc2;
            width: 100%;
            text-align: center;
            line-height: .8rem;
        }
    }
}
</style>
