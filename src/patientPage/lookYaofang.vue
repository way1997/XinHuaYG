<template>
<div class="zitidian" style="padding-bottom:.23333rem">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian"></div>
    <div class="four">
        <h1>处方信息</h1>
        <div class="info">
            <p><span>开方时间:</span><label>{{list.createDate}}</label></p>
            <p><span>开方医生:</span><label>{{list.doctorName}}</label></p>
            <!-- <div class="chakan">查看详情</div> -->
        </div>
        <h1>药方信息</h1>
        <div class="info">
            <p><span>辩证:</span><label>{{list.symptom}}</label></p>
            <p><span>类型:</span><label>{{medicineType}}</label></p>
            <p><span>用法用量:</span><label>共{{datas.preNum}}剂,1日{{datas.dayNum}}次，每次{{datas.preOnce}}剂</label>
            </p>
            <p><span>医嘱:</span><label>{{list.preEnjoin}}</label></p>
            <section style="clear:both;"></section>
            <p class="yaofang"><span>药方:</span><label class="yaoList"><em v-for="(item,index) in datas.detail" :key="index">{{item.name}}{{item.howWeight}}、</em></label></p>
        </div>
        <div class="xian"></div>
        <section v-if="status">
            <h1>药店信息</h1>
            <div class="info">
                <p style="height:auto"><span>药店地址:</span><label>{{list.data[0].shopName}}</label></p>
                <section style="clear:both"></section>
                <p><span>联系电话:</span><label>{{list.data[0].phone}}</label></p>
            </div>
        </section>
        <div class="xian"></div>
        <h1>其他信息</h1>
        <div class="info">
            <p class="fuyaojinji"><span>服药禁忌:</span><label v-for="(item,index) in list.taboo" :key="index">{{item.tabooName}}、</label></p>
            <!-- <p class="buchongshuoming"><span>补充说明:</span><label>{{list.sickName}}</label></p> -->
        </div>
        <div class="xian"></div>
    </div>
</div>
</template>

<script>
import {
    lookPrescription
} from "api/patient"
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
            datas: '',
            status: '',
        }
    },
    created() {
        this.token = cookie.get("token")
        this.patientId = cookie.get("patientId")
        this.prescriptionId = this.$route.query.prescriptionId;
        this.lookPrescription();
    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },
        lookPrescription() {
            let list = {
                token: this.token,
                prescriptionId: this.prescriptionId
            }
            lookPrescription(list).then((res) => {
                // console.log(res);
                this.list = res;
                this.datas = res.data[0];
                if (this.datas.status == 1) {
                    this.status = true
                    // console.log(this.status)
                } else {
                    this.status = false
                    // console.log(this.status)
                }
                if (res.medicineType == 1) {
                    this.medicineType = '中药'
                }
                if (res.medicineType == 2) {
                    this.medicineType = '西药'
                }
                if (res.medicineType == 3) {
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
    height: .1rem;
    background: #efefef;
    clear: both;
}

.four {
    width: 100%;

    h1 {
        width: 26%;
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

        p.buchongshuoming {
            margin-top: 10%;
        }

        p.yaofang {
            height: auto;
            float: left;
            margin-left: 0.2rem;
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
            font-size: .25rem;
            color: #00afc2;
            width: 100%;
            text-align: center;
            line-height: .8rem;
        }
    }
}
</style>
