<template>
<div class="dingdan">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian" style="clear:both;"></div>
    <div class="list">
        <div v-for="(item,index) in orderlistd" :key="index" @click="goDetail(item.takeWay,item)">
            <div>{{item.doctorName}}医生 的辩证及处方</div>
            <div>取药方式：<em v-if="item.takeWay==0">用户自提</em><em v-if="item.takeWay==1">药店配送</em>
                <span>订单状态：<em v-if="item.indentStatus==5 || item.indentStatus==6">待收货</em>
                    <em v-if="item.indentStatus==2">待支付</em>
                    <em v-if="item.indentStatus==5 && item.takeWay == 1">待配送</em>
                    <em v-if="item.indentStatus==4 && item.takeWay == 0">待取货</em>
                    <em v-if="item.indentStatus==7">已完成</em>
                    <em v-if="item.indentStatus==6">待备药</em>
                    <em v-if="item.indentStatus==7">配送中</em>
                    <em v-if="item.indentStatus==8">待评价</em>
                    <em v-if="item.indentStatus==9">已评价</em>
                </span>
            </div>
        </div>
    </div>
    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp">
    <img class="zanwuxinxi" v-show="orderlistd.length == 0" src='../assets/img/zanwuxinxi.png' />
</div>
</template>

<script>
import {
    findOrder
} from 'api/patient'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "dingdan",
    data() {
        return {
            token: '',
            patientId: '',
            indentStatus: 1,
            index: 1,
            orderlistd: [],
            loadUp: true,
        }
    },
    created() {
        this.token = cookie.get("token")
        this.patientId = cookie.get("patientId")
        this.findOrder();
    },
    computed: {

    },

    methods: {
        findOrder() {
            let list = {
                token: this.token,
                patientId: this.patientId,
                indentStatus: this.indentStatus,
                index: this.index
            }
            findOrder(list).then((res) => {
                if (res.type == true) {
                    this.orderlistd = res.data;
                    this.loadUp = false;
                } else {
                    this.$toast(res.massage)
                    this.loadUp = false;
                }
            })
        },
        goDetail(takeWay, item) {
            let list = JSON.stringify(item)
            if (takeWay == 0) {
                this.$router.push({
                    path: '/zitidian',
                    query: {
                        item: list
                    }
                })
            } else {
                this.$router.push({
                    path: '/peisongDizhi',
                    query: {
                        item: list
                    }
                })
            }
        },
        goBack() {
            this.$router.push('/mine')
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

.list {
    width: 100%;

    >div {
        width: 100%;
        height: 1.65rem;
        border-bottom: 0.01rem solid #E9E9E9;

        div:nth-of-type(1) {
            color: #7E7E7E;
            font-size: 0.25rem;
            padding: 0.35rem 0 0.4rem 0.39rem;
        }

        div:nth-of-type(2) {
            color: #00B0C2;
            font-size: 0.25rem;
            padding: 0 0.36rem;

            span {
                float: right;
            }
        }
    }
}

.loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.zanwuxinxi {
    width: 3.30rem;
    height: 4.17rem;
    display: block;
    margin: 0 auto;
    margin-top: 100px;
}
</style>
