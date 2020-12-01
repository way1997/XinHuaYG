<template>
<div class="dingdan">
    <div class="backHome" @click="goBack">返回上一级</div>
    <van-tabs v-model="active" swipeable animated @click="tabEvent">
        <van-tab v-for="(item, index) in arr" :title="item.name" :key="item.name">

        </van-tab>
    </van-tabs>
    <div class="xian" style="clear:both;"></div>
    <div class="list">
        <div v-for="(item,index) in orderlistd" :key="index" @click="goDetail(item.takeWay,item)">
            <div>{{item.doctorName}}医生 的辩证及处方 </div>
            <div><span style="float:left;" v-if="hidePath">取药方式：<em v-if="item.takeWay==0">用户自提</em><em v-if="item.takeWay==1">药店配送</em></span>
                <span>订单状态：
                    <em v-if="item.indentStatus==2">待支付</em>
                    <em v-if="item.indentStatus==4 && item.takeWay == 1">待配送</em>
                    <em v-if="item.indentStatus==4 && item.takeWay == 0">待取货</em>
                    <em v-if="item.indentStatus==5 || item.indentStatus==6">待收货</em>
                    <em v-if="item.indentStatus==6">待备药</em>
                    <em v-if="item.indentStatus==7">已完成</em>

                    <!-- <em v-if="item.indentStatus==7">配送中</em>
                    <em v-if="item.indentStatus==8">待评价</em>
               +     <em v-if="item.indentStatus==9">已评价</em>-->
                </span>
            </div>
            <div style="color: #7E7E7E;font-size: 0.25rem;padding: 0.6rem .2rem 0.4rem 0.20rem;text-align: right;">
                <span style="">{{item.createDate}}</span>
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
            dingdanPageQi: 1, // 传输都订单页发送的信号
            active: '',
            arr: [{
                    'name': '待支付',
                    "num": 0
                },
                {
                    'name': '待取货',
                    "num": 1
                }, {
                    'name': '待配送',
                    "num": 2
                }, {
                    'name': '待收货',
                    "num": 3
                }, {
                    'name': '已完成',
                    "num": 4
                }
            ],
            token: '',
            patientId: '',
            indentStatus: 1,
            index: '', //  0[待支付 ]；1 [待取货] ； 2 [待配送]； 3 [待收货] ；4[已完成]
            orderlistd: [],
            loadUp: true,
            hidePath: true,
            createDate:'',//订单时间
        }
    },
    created() {
        let active = Number(this.$route.params.active)
        this.token = cookie.get("token")
        this.patientId = cookie.get("patientId")
        this.index = this.$route.params.pageInd ? this.$route.params.pageInd : 1
        if (active == 0) {
            this.active = active
        } else {
            this.active = active ? active : 1
        }

        // console.log('this.active:' + this.active)
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
            if (this.active == 0) {
                this.hidePath = false
            } else {
                this.hidePath = true
            }
            findOrder(list).then((res) => {
                console.log(res)
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
            // console.log('详情信号值this.index = ' + this.index)
            let xinhao = this.index
            if (xinhao == 0) {
                console.log(item)
                let prescriptionId = item.prescriptionId
                let indentId = item.indentId
                let doctorId = item.doctorId
                this.$router.push({
                    path: "/chufangXq",
                    query: {
                        prescriptionId: indentId,
                        indentId: prescriptionId,
                        doctorId: doctorId,
                        dingdanPageQi: this.dingdanPageQi,
                        pageInd: this.index,
                        active: this.active
                    },
                });

            } else {
                if (takeWay == 0) {
                    this.$router.push({
                        path: '/zitidian',
                        query: {
                            item: list,
                            pageInd: this.index,
                            active: this.active
                        }
                    })
                } else {
                    this.$router.push({
                        path: '/peisongDizhi',
                        query: {
                            item: list,
                            pageInd: this.index,
                            active: this.active
                        }
                    })
                }
            }

        },
        goBack() {
            this.$router.push('/mine')
        },
        tabEvent(index) {
            this.index = index
            this.active = index
            console.log('已改变' + this.active)
            if (this.active == 0) {
                this.hidePath = false
            } else {
                this.hidePath = true
            }
            let list = {
                token: this.token,
                patientId: this.patientId,
                indentStatus: this.indentStatus,
                index: this.index
            }
            this.loadUp = true
            console.log(list)
            findOrder(list).then((res) => {
                console.log(res)
                this.loadUp = false
                console.log(res.data)
                if (res.type == true) {
                    this.orderlistd = res.data;
                    this.loadUp = false;
                } else {
                    this.$toast(res.massage)
                    this.loadUp = false;
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

/deep/ .van-tabs--line .van-tabs__wrap {
    height: .5rem;
}

/deep/ .van-tab--active {
    color: #00B0C2;
}

/deep/ .van-tab__text.van-tab__text--ellipsis {
    font-size: .26rem;
    display: -webkit-box;
    overflow: initial;

}

/deep/ .van-tabs__line {
    position: absolute;
    bottom: .15rem;
    left: 0;
    z-index: 1;
    width: .8rem;
    height: .03rem;
    background-color: #00B0C2;
    border-radius: 3px;
}

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

.list {
    width: 100%;

    >div {
        width: 100%;
        height: 2rem;
        border-bottom: 0.01rem solid #E9E9E9;

        div:nth-of-type(1) {
            color: #7E7E7E;
            font-size: 0.25rem;
            padding: 0.37rem 0 0.4rem 0.20rem;
        }

        div:nth-of-type(2) {
            color: #00B0C2;
            font-size: 0.23rem;
            padding: 0 0.20rem;

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
