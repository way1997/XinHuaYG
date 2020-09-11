<template>
<div class="zitidian">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian"></div>
    <div class="four">
        <h1>处方信息</h1>
        <div class="info">
            <p><span>开方时间:</span><label>{{item.createDate}}</label></p>
            <p><span>开方医生:</span><label>{{item.doctorName}}</label></p>
            <p><span>开方金额:</span><label>{{item.totalMoney}}</label></p>
            <!-- <div class="chakan">查看详情</div> -->
        </div>
        <h1>药方信息</h1>
        <div class="info">
            <p><span>辩证:</span><label>{{item.symptom}}</label></p>
            <p><span>类型:</span><label>{{medicineType}}</label></p>
            <p><span>药态:</span><label>{{item.shapeName}}</label></p>
            <p class="yaofang"><span>药方:</span><label class="yaoList"><em v-for="(item,index) in item.medicine" :key="index">{{item.medicineName}}{{item.howWeight||item.medicineHowWeight}}</em></label></p>
        </div>
        <div class="xian"></div>
        <h1>其他信息</h1>
        <div class="info">
            <p><span>购药前查看药方:</span><label v-if="item.isPayLook==0">不可看</label><label v-if="item.isPayLook==1">可看</label></p>
            <p class="fuyaojinji"><span>服药禁忌:</span><label v-for="(item,index) in item.taboo" :key="index">{{item.tabooName}}、</label></p>
            <p style="clear:both;border-top:1px solid #f5f5f5;"><span>补充说明:</span><label>{{item.sickName}}</label></p>
        </div>
        <div class="xian"></div>
        <h1>自提点展示</h1>
        <div class="zitidianD">
            <div>
                <p>{{item.shopName}}<span></span></p>
                <p>距离当前位置米<span>查看地图/导航</span></p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//import {findOrder} from 'api/patient'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "zitidian",
    data() {
        return {
            token: '',
            patientId: '',
            indentId: '',
            index: 2,
            item: '',
            medicineType: ''
        }
    },
    created() {
        this.token = cookie.get("token")
        this.patientId = cookie.get("patientId")
        this.item = JSON.parse(this.$route.query.item)
        //console.log(this.item)
        if (this.item.medicineType == 1) {
            this.medicineType = '中药'
        }
        if (this.item.medicineType == 2) {
            this.medicineType = '西药'
        }
        if (this.item.medicineType == 3) {
            this.medicineType = '中成药'
        }
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

.zitidian {
    padding-bottom: 100px;
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

.four {
    width: 100%;

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

        .yaoList {
            width: 70%;
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

    .info p.fuyaojinji {
        height: auto;
        border-bottom: none;
    }
}

.zitidianD {
    padding-top: 10px;

    >div {
        width: 100%;
        height: 107px;
        border-bottom: 1px solid #f8f8f8;

        p {
            padding: 10px 40px;
        }

        p:nth-of-type(1) {
            font-size: 25px;
            color: #828282;
            padding-top: 20px;

            span {
                float: right;
            }
        }

        p:nth-of-type(2) {
            font-size: 25px;
            color: #B2B2B2;

            span {
                float: right;
                color: #00B0C2;
            }
        }
    }
}
</style>
