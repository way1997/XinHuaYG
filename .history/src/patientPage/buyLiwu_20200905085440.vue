<template>
<div class="buyLiwu">
    <div>
        <div class="liwu">
            <img :src="'https://www.mfzhosp.com'+message.pircture" alt="">
            <p>{{message.givingName}}</p>
            <p>{{message.givingMoney}}元</p>
        </div>
        <div class="zhifu" @touchstart="savePresentOrder">
            微信支付
        </div>
        <div class="text">
            <p>温馨提示</p>
            <p>· 送出的礼物源于您对医生的祝福和感谢，并不是医生诊疗及提问等服务费用</p>
            <p>· 礼物一经送出不可退回。</p>
            <p>· 您送出的费用将全部用于感谢医生牺牲休息时间为患者进行咨询。</p>
        </div>
    </div>
    <div class="lxkf"><a href="tel:4001881081" class="tel">联系客服</a></div>
</div>
</template>

<script>
import {
    savePresentOrder
} from 'api/patient'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import wx from "weixin-js-sdk"
export default {
    name: "buyLiwu",
    data() {
        return {
            token: '',
            patientId: '',
            doctorId: '',
            doctorName: '',
            message: [],
            bohao: false,
            appid: 'wx60af22e8126cde6a',
            mch_id: '1511807751',
        }
    },
    created() {
        this.token = cookie.get("token");
        this.patientId = cookie.get("patientId");
        this.doctorId = this.$route.query.doctorId;
        this.message = JSON.parse(this.$route.query.item);
        this.doctorName = this.$route.query.doctorName;
    },
    computed: {

    },

    methods: {
        savePresentOrder() {
            let list = {
                token: this.token,
                appid: this.appid,
                doctorId: this.doctorId,
                mch_id: this.mch_id,
                patientId: this.patientId,
                givingId: this.message.givingId,
                price: this.message.givingMoney
            }
            savePresentOrder(list).then((res) => {
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
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            alert('恭喜您，支付成功！')
                            that.submithid = false;
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
    },
    components: {

    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.buyLiwu {
    position: relative;
}

.liwu {
    width: 1.35rem;
    margin: 0 auto;
    padding-top: 0.65rem;

    img {
        width: 100%;
        height: 1.35rem;
        border: 0.01rem solid #cecece;
        -webkit-box-shadow: 0.01rem 0.1rem 0.1rem 0 rgba(4, 0, 0, 0.35);
        box-shadow: 0.01rem 0.1rem 0.1rem 0 rgba(4, 0, 0, 0.35);
        border-radius: 0.13rem;
    }

    p {
        font-size: 0.25rem;
        color: #828282;
        text-align: center;
        padding-top: 0.15rem;

        &:nth-of-type(2) {
            color: #00afc2;
        }
    }
}

.zhifu {
    width: 74.13%;
    height: 0.9rem;
    border-radius: 0.1rem;
    background: #28b84a;
    color: #fff;
    font-size: 0.27rem;
    text-align: center;
    line-height: 0.9rem;
    margin: 0 auto;
    margin-top: 0.7rem;
}

.text {
    width: 80%;
    margin: 0 auto;
    font-size: 0.25rem;
    color: #828282;
    padding-top: 0.86rem;

    p {
        line-height: 0.4rem;

        &:nth-of-type(1) {
            padding: 0 0.2rem
        }
    }
}

.lxkf {
    width: 100%;
    text-align: center;
    font-size: 0.25rem;
    color: #00afc2;
    position: absolute;
    bottom: -.5rem;
    left: 0;

    a {
        color: #00afc2;
    }
}
</style>
