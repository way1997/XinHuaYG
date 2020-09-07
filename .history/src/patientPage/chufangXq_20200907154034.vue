<template>
<div class="chufangxq">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian" style="clear:both;"></div>
    <div class="four">
        <h1>医生信息</h1>
        <div class="info">
            <p><span>医生:</span><label>{{lists.doctorName}}</label></p>
            <p><span>医院:</span><label>{{lists.hospitalName}}</label></p>
            <p><span>职称:</span><label>{{lists.levelName}}</label></p>
            <p><span>科室:</span><label>{{lists.departmentName}}</label></p>
        </div>
        <div class="xian"></div>
        <h1 v-if="lists.isLook!=0">药方信息</h1>
        <div class="info" v-if="lists.isLook!=0">
            <p><span>辩证:</span><label>{{lists.symptom}}</label></p>
            <p><span>类型:</span><label v-if="medicineType==1">中药</label></p>
            <p><span>药态:</span><label>{{lists.preShapeName}}</label></p>
            <p class="yaofang"><span>药方:</span><label class="yaoList" v-for="(item,index) in lists.lists_medicine" :key="index">{{item.medicineName}}{{item.howWeight}}</label></p>
            <p class="jiFu"><span>剂量:</span><label>共{{lists.preNum}}剂</label></p>
        </div>
        <div class="xian" style="clear:both;"></div>
        <h1>其他信息</h1>
        <div class="info">
            <p><span>诊金:</span><label>{{zhenjinT}}</label></p>
            <p><span>购药前查看药方:</span><label v-show="lists.isLook==0">不可看</label><label v-show="lists.isLook==1">可看</label></p>
            <p class="fuyaojinji"><span>服药禁忌:</span><label v-for="(item,index) in lists.taboo" :key="index">{{item.tabooName}}、</label></p>
            <p class="buchongshuoming"><span>补充说明:</span><label>{{lists.sickName}}</label></p>
        </div>
        <div class="xian" style="clear:both;"></div>
        <h1>配送信息</h1>
        <div class="info">
            <div class="chooseWay">
                <label v-for="(item,index) in peisong1" :key="index" @click="peisong(index)"><img :src="content1==index?require('../assets/img/danxuan.png'):require('../assets/img/danxuang1.png')" class="tu2">{{item.name}}</label>
            </div>
            <p><span>最近药房:</span><label>{{yaodiantext}}</label></p>
            <div v-if="content1==1">
                <p><label style="color:#00afc2;" @click="showAdd">更改地址</label></p>
                <p><span>收货人:</span><label>{{userAddress.recipient}}</label></p>
                <p><span>手机号码:</span><label>{{userAddress.tel||userAddress.repPhone}}</label></p>
                <p><span>收货地址:</span><label>{{userAddress.address}}</label></p>
                <p v-if="content1==1"><span>快递费:</span><label>{{prices.price4}}</label></p>
            </div>
        </div>
        <h1 v-if="isAgency == 0">是否代煎</h1>
        <div class="info" v-if="isAgency == 0">
            <div class="chooseWay">
                <label @click="daijian(index)" v-for="(item,index) in daijian1" :key="index"><img :src="content2==index?require('../assets/img/danxuan.png'):require('../assets/img/danxuang1.png')" class="tu2">{{item.name}}</label>
            </div>
            <p><span>代煎费:</span><label>{{prices.price3}}</label></p>
        </div>
        <div class="xian" style="clear:both;"></div>
    </div>
    <div class="total">
        <div>费用：{{prices.price1}}元(药费)+{{zhenjinT}}元(诊金)<em v-if="content1==1">+{{prices.price4}}(邮寄费)</em> <em v-if="content2==1">+{{prices.price3}}元(代煎费)</em></div>
        <div @click="indentPay">支付{{total_sum}}元</div>
    </div>
    <div class="addDizhi" v-if="huanDizhi" @click.stop="hideDizhi"></div>
    <div class="addressL" v-if="huanDizhi">
        <div class="list">
            <div v-for="(item,index) in shou" :key="index" @click="changeAddress(item)">
                <div>{{item.recipient}} {{item.repPhone}}</div>
                <div>{{item.address}}</div>
            </div>
            <div class="addXin" @click="goAdd">使用新地址</div>
        </div>
    </div>

</div>
</template>

<script>
import {
    patientPayPage,
    mateShop,
    indentPay,
    addressList,
    sendMsg7
} from "api/patient"
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import wx from "weixin-js-sdk"
export default {
    name: "chufangxq",
    data() {
        return {
            content1: 0,
            content2: 0,
            token: '',
            patientId: '',
            doctorId: '',
            indentId: '',
            prescriptionId: '',
            lists: '',
            isAgency: '',
            yaodiantext: '',
            recipient: '',
            receiptPlace: '',
            repPhone: '',
            prices: '',
            money: '',
            shopId: '',
            zhenjinT: '',
            total_sum: '',
            addressId: '',
            appid: 'wx60af22e8126cde6a',
            mch_id: '1511807751',
            peisong1: [{
                    name: '到店自提'
                },
                {
                    name: '配送到家'
                }
            ],
            daijian1: [{
                    name: '否'
                },
                {
                    name: '是'
                }
            ],
            shou: '',
            huanDizhi: false,
            userAddress: '',
            medicineType: '1'
        }
    },
    created() {
        this.token = cookie.get('token');
        this.patientId = cookie.get('patientId');
        this.doctorId = this.$route.query.doctorId;
        this.indentId = this.$route.query.indentId;
        this.prescriptionId = this.$route.query.prescriptionId;
        this.addressList();

    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },
        goAdd() {
            this.$router.push('/addDizhi')
        },
        showAdd() {
            this.huanDizhi = true;
        },
        hideDizhi() {
            this.huanDizhi = false;
        },
        changeAddress(item) {
            this.receiptPlace = item.address;
            this.userAddress = item;
            this.huanDizhi = false;
            this.addressId = item.recipientId;
        },
        addressList() {
            let list = {
                token: this.token,
                patientId: this.patientId
            }
            addressList(list).then((res) => {
                this.shou = res.data;
                // for (var i = 0; i < res.data.length; i++) {
                // if (res.data[i].isDefault == "1") {
                //   this.addressId = res.data[i].recipientId;
                this.patientPayPage();
                // }
                //  }

            })
        },
        patientPayPage() {
            let list = {
                token: this.token,
                patientId: this.patientId,
                indentId: this.indentId,
                doctorId: this.doctorId,
                addressId: this.addressId
            }
            patientPayPage(list).then((res) => {
                this.lists = res.data;
                console.log(res.data);
                this.isAgency = res.data.isAgency;
                this.yaodiantext = res.map_return_money.shopName;
                this.recipient = res.data.address.recipient;
                this.receiptPlace = res.data.address.address;
                this.userAddress = res.data.address;
                this.addressId = res.data.address.addressId;
                this.repPhone = res.data.address.tel;
                this.prices = res.big;
                this.money = res.data.list;
                this.shopId = res.map_return_money.medicineShopId;
                for (var i = 0; i < this.money.length; i++) {
                    if (this.money[i].moneyDescribe == 5) {
                        this.zhenjinT = this.money[i].money;
                    }
                }
                this.prescriptionId = res.data.indentId;
                this.medicineType = res.data.medicineType
                this.total_sum = (this.prices.price1 + this.prices.price2 + this.zhenjinT).toFixed(2);
            })
        },
        indentPay() { //去支付
            let that = this;
            let list = {
                token: this.token,
                appid: this.appid,
                indentId: this.prescriptionId,
                mch_id: this.mch_id,
                patientId: this.patientId,
                shopId: this.shopId,
                money: this.total_sum,
                is_dispatching: this.content1,
                dispatchingMoney: this.prices.price4,
                is_to_agency: this.content2,
                agencyMoney: this.prices.price2,
                makeMoney: this.prices.price3,
                medicinalMoney: this.prices.price1,
                addressId: this.addressId,
                recipient: this.recipient,
                receiptPlace: this.receiptPlace,
                phone: this.repPhone
            }
            console.log(list)
            indentPay(list).then((res) => {
                //console.log(res.packageP);
                WeixinJSBridge.invoke("getBrandWCPayRequest", {
                        appId: res.packageP.appId, //公众号名称，由商户传入
                        timeStamp: res.packageP.timeStamp, //时间戳，自1970年以来的秒数
                        nonceStr: res.packageP.nonceStr, //随机串
                        package: res.packageP.package,
                        signType: res.packageP.signType, //微信签名方式：
                        paySign: res.packageP.paySign //微信签名sign
                    },
                    function (res) {
                        //alert(res.err_msg)
                        let json = [{
                            lx: 'hz',
                            id: this.patientId
                        }]
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            alert('付款成功!')
                            let listArr = {
                                json: json,
                                d1: "您好！您有一笔订单支付成功。",
                                d2: this.recipient,
                                d3: this.repPhone,
                                d4: "新华医馆网上问诊平台",
                                d5: this.total_sum,
                                d6: this.receiptPlace,
                                d7: "请您点击详情进入查看。",
                                type: '9',
                                path: "pages/order/order",
                                appid: 'wx2061bee8caa00a0d',
                                url: 'https://www.mfzhosp.com/H5/#/dingdan'
                            }
                            sendMsg7(listArr).then((res) => {

                            })
                            that.submithid = false;
                            that.$router.go(-1)
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            alert('支付失败！');
                            that.submithid = false;
                        } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                            alert('调起微信支付失败');
                            that.submithid = false;
                        }
                    }
                );
            })
        },
        daijian(index) {
            this.content2 = index;
            //console.log(this.content1)
            if (this.content2 == 0 && this.content1 == 1) {
                this.total_sum = (this.prices.price1 + this.prices.price2 + this.prices.price4 + this.zhenjinT).toFixed(2);
            } else if (this.content2 == 1 && this.content1 == 1) {
                this.total_sum = (this.prices.price1 + this.prices.price2 + this.prices.price3 + this.prices.price4 + this.zhenjinT)
                    .toFixed(2);
            } else if (this.content2 == 1 && this.content1 == 0) {
                this.total_sum = (this.prices.price1 + this.prices.price2 + this.prices.price3 + this.zhenjinT).toFixed(2);
            } else if (this.content2 == 0 && this.content1 == 0) {
                this.total_sum = (this.prices.price1 + this.prices.price2 + this.zhenjinT).toFixed(2);
            }
        },
        peisong(index) {
            this.content1 = index;
            //this.price3 = index;
            if (this.content2 == 0 && this.content1 == 1) {
                this.total_sum = (this.prices.price1 + this.prices.price2 + this.prices.price4 + this.zhenjinT).toFixed(2);
            } else if (this.content2 == 1 && this.content1 == 1) {
                this.total_sum = (this.prices.price1 + this.prices.price2 + this.prices.price3 + this.prices.price4 + this.zhenjinT)
                    .toFixed(2);
            } else if (this.content2 == 1 && this.content1 == 0) {
                this.total_sum = (this.prices.price1 + this.prices.price2 + this.prices.price3 + this.zhenjinT).toFixed(2);
            } else if (this.content2 == 0 && this.content1 == 0) {
                this.total_sum = (this.prices.price1 + this.prices.price2 + this.zhenjinT).toFixed(2);
            }
        },
        change1(index) {
            this.content1 = index;
        },
        change2(index) {
            this.content2 = index;
        },
    },
    components: {

    }
}
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";

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

    h1 {
        width: 22%;
        height: 0.53rem;
        line-height: 0.53rem;
        text-align: center;
        font-size: 0.225rem;
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
            width: 90%;
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
            margin-left: .16rem;
            line-height: .50rem;
        }

        p.buchongshuoming {
            margin-top: 10%;
        }

        .yaoList {
            width: 70%;
        }

        p.jiFu {
            float: left;
            margin-left: .20rem;
        }

        div.chooseWay {
            width: 100%;
            height: .77rem;
            font-size: .21rem;
            color: #828282;
            padding-top: .2rem;

            label {
                float: left;
                width: 32%;
                padding-left: 0.4rem;

                &:nth-of-type(2) {
                    padding-left: 1rem;
                }
            }

            img {
                width: 0.38rem;
                height: 0.38rem;
                vertical-align: middle;
                margin: 0.1rem;
            }
        }
    }
}

.total {
    width: 100%;
    height: 1.2rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;

    div:nth-of-type(1) {
        width: 400px;
        font-size: 25px;
        color: #828282;
        line-height: 31px;
        padding: 36px 0 0 32px;
        float: left;
        border-top: 1px solid #f1f1f1;
    }

    div:nth-of-type(2) {
        width: 268px;
        height: 121px;
        float: right;
        background: #00afc2;
        font-size: 27px;
        color: #fff;
        text-align: center;
        line-height: 121px;
    }
}

.addDizhi {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);

}

.addressL {
    width: 100%;
    height: 576px;
    overflow-y: scroll;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;

    .list {
        width: 100%;

        >div {
            width: 100%;
            height: 1.57rem;
            border-bottom: 0.01rem solid #e4e4e4;

            div {
                padding: 0 .3rem;

                span {
                    color: #00B0C2;
                    float: right;

                    img {
                        width: .29rem;
                        height: .3rem;
                        vertical-align: middle;
                        margin: 0 .1rem;
                    }
                }
            }

            div:nth-of-type(1) {
                font-size: 0.25rem;
                color: #757575;
                padding-top: 0.5rem;
            }

            div:nth-of-type(2) {
                font-size: 0.25rem;
                color: #B7B7B7;
                padding-top: 0.25rem;
            }
        }

        .addXin {
            width: 80%;
            height: 0.8rem;
            margin: 0 auto;
            font-size: 0.3rem;
            color: #fff;
            text-align: center;
            line-height: 0.8rem;
            background: #00afc2;
            border-radius: 0.2rem;
            margin-top: 0.2rem;
        }
    }
}

::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
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
    width: 3.3rem;
    height: 4.17rem;
    display: block;
    margin: 0 auto;
    margin-top: 1rem;
}
</style>
