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
        this.doctorId = this.$route.params.doctorId;
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

.liwu {
    width: 135px;
    margin: 0 auto;
    padding-top: 65px;

    img {
        width: 135px;
        height: 135px;
        border: 1px solid #cecece;
        box-shadow: 1px 10px 10px 0px rgba(4, 0, 0, 0.35);
        border-radius: 13px;
    }

    p {
        font-size: 25px;
        color: #828282;
        text-align: center;
        padding-top: 15px;

        &:nth-of-type(2) {
            color: #00afc2;
        }
    }
}

.zhifu {
    width: 566px;
    height: 90px;
    border-radius: 10px;
    background: #28b84a;
    color: #fff;
    font-size: 27px;
    text-align: center;
    line-height: 90px;
    margin: 0 auto;
    margin-top: 70px;
}

.text {
    width: 600px;
    margin: 0 auto;
    font-size: 25px;
    color: #828282;
    padding-top: 86px;

    p {
        line-height: 40px;

        &:nth-of-type(1) {
            padding: 0 20px;
        }
    }
}

.lxkf {
    width: 100%;
    text-align: center;
    font-size: 25px;
    color: #00afc2;
    position: absolute;
    bottom: 20px;
    left: 0;

    a {
        color: #00afc2;
    }
}
</style>
