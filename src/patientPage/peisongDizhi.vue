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
            <p><span>类型:</span><label>中药</label></p>
            <p><span>品牌:</span><label></label></p>
            <p><span>药态:</span><label>{{item.shapeName}}</label></p>
            <p class="yaofang"><span>药方:</span><label class="yaoList"><em v-for="(item,index) in item.medicine" :key="index">{{item.medicineName}}{{item.howWeight}}</em></label></p>
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
            <p><span>补充说明:</span><label>{{item.sickName}}</label></p>
        </div>
        <div class="xian"></div>
        <h1>配送信息</h1>
        <div class="info">
            <p><span>收件人:</span><label>{{item.recipient}}</label></p>
            <p><span>联系方式:</span><label>{{item.phone}}</label></p>
            <p><span>收件地址:</span><label>{{item.receiptPlace}}</label></p>
            <p><span>物流状态:</span><label>
                <em v-if="item.indentStatus==2">待支付</em>
                    <em v-if="item.indentStatus==4 && item.takeWay == 1">待配送</em>
                    <em v-if="item.indentStatus==4 && item.takeWay == 0">待取货</em>
                    <em v-if="item.indentStatus==5 || item.indentStatus==6">待收货</em>
                    <em v-if="item.indentStatus==6">待备药</em>
                    <em v-if="item.indentStatus==7">已完成</em>

            </label></p>
            <p><span>运单号:</span><label>ER223345566</label></p>
        </div>
    </div>
    <div  style="overflow:hidden">
        <van-divider>已到底</van-divider>
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
            active: '',
            receiptPlace:'',//收件地址
        }
    },
    created() {
        this.token = cookie.get("token")
        this.patientId = cookie.get("patientId")
        this.pageInd = this.$route.query.pageInd
        this.active = this.$route.query.active
        console.log(this.pageInd, this.active)
        this.item = JSON.parse(this.$route.query.item)
        console.log(this.item)
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
        }
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
<template>
<div class="zitidian">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian"></div>
    <div class="four">
        <h1>处方信息</h1>
        <div class="info">
            <p><span>开方时间:</span><label>{{item.createDate}}</label></p>
            <p><span>开方医生:</span><label>{{item.doctorName}}</label></p>
            <p>
                <span>开方金额:</span>
                <label v-if="item.isPatientPrescription == 0">{{item.totalMoneyTrue}}</label>
                <label v-if="item.isPatientPrescription == 1" style="color:rgb(113 105 105);font-size:.25rem;font-weight: 600;">折扣价:{{item.totalMoneyTrue}}</label>
                <label v-if="item.isPatientPrescription == 1" style="text-decoration:line-through;margin-right:.2rem;font-size:.24rem;color:#8a8a8a">
                    <span>原价:</span>{{item.totalMoney}}
                </label>
                
            </p>
            <!-- <div class="chakan">查看详情</div> -->
        </div>
        <h1>药方信息</h1>
        <div class="info">
            <p><span>辩证:</span><label>{{item.symptom}}</label></p>
            <p><span>类型:</span><label>中药</label></p>
            <p><span>药态:</span><label>{{item.shapeName}}</label></p>
            <section style="clear:both"></section>
            <p class="yaofang"><span>药方:</span><label class="yaoList"><em v-for="(item,index) in item.medicine" :key="index">{{item.medicineName}}{{item.howWeight}}</em></label></p>
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
            <p><span>补充说明:</span><label>{{item.sickName}}</label></p>
        </div>
        <div class="xian"></div>
        <h1>配送信息</h1>
        <div class="info">
            <p><span>收件人:</span><label>{{item.recipient}}</label></p>
            <p><span>联系方式:</span><label>{{item.phone}}</label></p>
            <p><span>收件地址:</span><label>{{item.receiptPlace}}</label></p>
            <p><span>物流状态:</span><label>
                <em v-if="item.indentStatus==2">待支付</em>
                    <em v-if="item.indentStatus==4 && item.takeWay == 1">待配送</em>
                    <em v-if="item.indentStatus==4 && item.takeWay == 0">待取货</em>
                    <em v-if="item.indentStatus==5 || item.indentStatus==6">待收货</em>
                    <em v-if="item.indentStatus==6">待备药</em>
                    <em v-if="item.indentStatus==7">已完成</em>

            </label></p>
        </div>
    </div>
    <div  style="overflow:hidden;margin:.4rem  0 .2rem 0">
        <van-divider>已到底</van-divider>
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
            active: '',
            receiptPlace:'',//收件地址
        }
    },
    created() {
        this.token = cookie.get("token")
        this.patientId = cookie.get("patientId")
        this.pageInd = this.$route.query.pageInd
        this.active = this.$route.query.active
        console.log(this.pageInd, this.active)
        this.item = JSON.parse(this.$route.query.item)
        console.log(this.item)
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
        }
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
