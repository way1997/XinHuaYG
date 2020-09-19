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
        <h1>药店信息</h1>
        <div class="info">
            <p><span>{{item.shopName}}</span></p>

        </div>
        <div class="xian"></div>
        <h1>其他信息</h1>
        <div class="info">
            <p><span>购药前查看药方:</span><label v-if="item.isPayLook==0">不可看</label><label v-if="item.isPayLook==1">可看</label></p>
            <p class="fuyaojinji"><span>服药禁忌:</span><label v-for="(item,index) in item.taboo" :key="index">{{item.tabooName}}、</label></p>
            <p style="clear:both;border-top:1px solid #f5f5f5;"><span>补充说明:</span><label>{{item.sickName}}</label></p>
        </div>
        <!--<div class="xian"></div>
        <h1>自提点展示</h1>
        <div class="zitidianD">
            <div>
                <p>{{item.shopName}}<span></span></p>
                <p>距离当前位置米<span>查看地图/导航</span></p>
            </div>
        </div> -->
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
            medicineType: '',
            pageInd: '',
        }
    },
    created() {
        this.token = cookie.get("token")
        this.patientId = cookie.get("patientId")
        this.pageInd = this.$route.query.pageInd
        this.active = this.$route.query.active
        // console.log(this.active)
        this.item = JSON.parse(this.$route.query.item)
        console.log(this.item)
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
            this.$router.push({
                name: 'dingdan',
                params: {
                    pageInd: this.pageInd,
                    active: this.active
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

.zitidian {
    padding-bottom: 100px;
}

.backHome {
    width: 81.466%;
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
    height: 0.1rem;
    background: #efefef;
    clear: both;
}

.four {
    width: 100%;

    h1 {
        width: 1.9rem;
        height: 0.53rem;
        line-height: 0.53rem;
        text-align: center;
        font-size: .26rem;
        color: #fff;
        background: #00afc2;
        border-radius: 0 .277rem .277rem 0;
        margin-top: .2rem;
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
            margin-left: 0.24rem;
            line-height: 0.5rem;
        }

        .yaoList {
            width: 70%;
        }

        p.jiFu {
            float: left;
            margin-left: .34rem;
        }

        div {
            font-size: .27rem;
            color: #00afc2;
            width: 100%;
            text-align: center;
            line-height: .8rem;
        }
    }

    .info p.fuyaojinji {
        height: auto;
        border-bottom: none;
    }
}

.zitidianD {
    padding-top: .1rem;

    >div {
        width: 100%;
        height: 1.07rem;
        padding-bottom: .4rem;
        border-bottom: 0.02rem solid #f8f8f8;

        p {
            padding: 0.1rem 0.4rem;
        }

        p:nth-of-type(1) {
            font-size: .27rem;
            line-height: .3rem;
            color: #828282;
            padding-top: .2rem;

            span {
                float: right;
            }
        }

        p:nth-of-type(2) {
            font-size: .27rem;
            color: #B2B2B2;

            span {
                float: right;
                color: #00B0C2;
            }
        }
    }
}
</style>
