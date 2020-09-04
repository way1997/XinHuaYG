<template>
<div class="daxieys">
    <div class="backHome" @click="goBack">返回上一级</div>
    <!--<div class="top">
        <div class="tu">
            <img :src="doctorImg" class="tu1">
            <div class="zi">
                <span>{{doctorName}}</span>
            </div>
        </div>
    </div>
    <div class="top1">
        <div class="center">
            <div class="cengter2" v-for="(item,index) in message" :key="index" @click="giveLiwu(item)">
                <img :src="'https://www.mfzhosp.com'+item.pircture" class="tu">
                <div class="zi">{{item.givingName}}</div>
                <div class="zi1">{{item.givingMoney}}元</div>
            </div>
        </div>
    </div>
    <div class="xian"></div>
    <div class="warp">
        <div class="foot">
            <div><img src="../assets/img/hongquan_03.png"> 收到{{list2.number}}次答谢</div>
        </div>
        <div class="liwu_list" v-for="(item,index) in list1" :key="index">
            <img :src="item.patientImgUrl" class="touxiang">
            <div class="name_wrap">
                <div>{{item.patientName}}送出{{item.givingName}}</div>
                <div>{{item.giftTime}}</div>
            </div>
            <img :src="'https://www.mfzhosp.com'+item.giftPircture" class="liwupic">
        </div>
    </div>-->
</div>
</template>

<script>
import {
    giftList
} from "api/patient"
import router from "../router"
import cookie from "js-cookie"
export default {
    name: "daxieys",
    data() {
        return {
            pageName: "答谢医生",
            token: "",
            patientId: "",
            doctorId: '',
            doctorImg: '',
            doctorName: '',
            message1: '',
            list1: '',
            list2: '',
            message: '',
            hidden: false
        }
    },
    created() {
        this.token = cookie.get("token");
        this.patientId = cookie.get("patientId");
        this.doctorId = this.$route.query.doctorId;
        this.doctorImg = this.$route.query.doctorPhoto;
        this.doctorName = this.$route.query.doctorName;
        this.giftList();
    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },
        giftList() {
            let list = {
                patientId: this.patientId,
                token: this.token,
                doctorId: this.doctorId
            }
            giftList(list).then((res) => {
                this.message = res.data;
                this.message1 = res.data;
                this.list1 = res.list_order;
                this.list2 = res;
                this.hidden = false;
            })
        },
        giveLiwu(item) {
            this.$router.push({
                path: '/buyLiwu',
                query: {
                    doctorId: this.doctorId,
                    item: JSON.stringify(item),
                    doctorName: this.doctorName
                }
            })
        }
    },
    components: {

    }
}
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";
/* pages/index/dxys.wxss */

.daxieys {
    height: 100%;
    //background: #f1f1f1;
}

.xian {
    width: 100%;
    height: 10px;
    background: #efefef;
    clear: both;
}

.backHome {
    width: 88.133%;
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

.top {
    width: 100%;
    //height: 2.28rem;
    margin-top: 50px;
    background: #fff;
}

.top .tu {
    width: 600px;
    height: 228px;
    margin: 0 auto;
    color: #828282;
    font-size: 25px;
    text-align: center;
    box-shadow: 1px 10px 39px 2px rgba(4, 0, 0, 0.35);
    border-radius: 13px;
    padding-top: 20px;
}

.top .tu .zi {
    width: 100%;
    color: #828282;
    font-size: 25px;
    text-align: center;
    padding-top: 20px;
}

.top .tu .tu1 {
    width: 1.20rem;
    height: 1.20rem;
    display: block;
    margin: 0 auto;
    border-radius: 50%;
}

.top1 {
    width: 100%;
    height: 550px;
    background: #fff;
    margin-top: .64rem;
}

.top1 .center {
    width: 5.54rem;
    margin: 0 auto;
}

.top1 .center .cengter2 {
    width: 1.28rem;
    height: 2.06rem;
    float: left;
    margin-bottom: .46rem;
    margin-right: 14px;
    margin-top: 20px;
}

.top1 .center .cengter2:nth-of-type(4n) {
    margin-right: 0;
}

.top1 .center .cengter2 .tu {
    width: 126px;
    height: 126px;
    display: block;
    margin: 0 auto;
    border-radius: 50%;
    border: 1px solid #cecece;
    box-shadow: 1px 10px 10px 0px rgba(4, 0, 0, 0.35);
    border-radius: 13px;
}

.top1 .center .cengter2 .zi {
    width: 100%;
    height: .34rem;
    color: #828282;
    text-align: center;
    font-size: 25px;
    line-height: .34rem;
    margin-top: .24rem;
    text-align: center;
}

.top1 .center .cengter2 .zi1 {
    height: .34rem;
    color: #00afc2;
    text-align: center;
    font-size: 22px;
    line-height: .34rem;
    margin-top: .10rem;
}

.warp {
    width: 100%;
    background: #fff;
}

.foot {
    width: 300px;
    text-align: center;
    height: .88rem;
    margin: 0 auto;
}

.foot img {
    width: .40rem;
    height: .40rem;
    margin-left: 25px;
    margin-top: -10px;
    vertical-align: middle;
}

.foot div {
    font-size: 25px;
    color: #00afc2;
    line-height: .88rem;
}

// .foot div div {
// color: #f43e58;
// display: inline;
// }

.liwu_list {
    padding: 0 .23rem;
    box-sizing: border-box;
    width: 100%;
    height: 1.24rem;
    border-top: 1px solid #ddd;
    position: relative;
}

.touxiang {
    width: .60rem;
    height: .60rem;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 50%;
}

.name_wrap {
    width: 66%;
    height: 100%;
    float: left;
    font-size: 25px;
    margin-left: .85rem;
    padding: .20rem 0;
    box-sizing: border-box;
}

.name_wrap div:nth-child(1) {
    color: #828282;
}

.name_wrap div:nth-child(2) {
    color: #bebebe;
    padding-top: 0.15rem;
    font-size: 22px;
}

.liwupic {
    width: 72px;
    height: 72px;
    float: right;
    position: absolute;
    top: 0;
    bottom: 0;
    right: .24rem;
    margin: auto;
}
</style>
