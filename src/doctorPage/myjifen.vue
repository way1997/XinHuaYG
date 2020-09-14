<template>
<div class="jifen">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian"></div>
    <div class="jifenZ">
        <p>{{zjifen}}积分</p>
        <!-- <span>今日增加：0</span> -->
    </div>
    <div class="list">
        <div class="detail" v-for="(item,index) in list" :key="index">
            <div>+{{item.integral}}</div>
            <p>获得 {{item.integral}} 积分</p>
            <p>{{item.patientName}} {{item.symptom}}</p>
            <span>{{item.createDate}}</span>
        </div>
    </div>
</div>
</template>

<script>
import {
    doctorIntegralMsg
} from "api/doctor"
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "jifen",
    data() {
        return {
            token: "",
            doctorId: "",
            list: [],
            zjifen: '',
            ydjifen: '',
            syjifen: ''
        }
    },
    created() {
        this.token = cookie.get("token");
        this.doctorId = cookie.get("doctorId");
        this.doctorIntegralMsg();
    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.push('/homePage')
        },
        doctorIntegralMsg() {
            let list = {
                token: this.token,
                doctorId: this.doctorId
            }
            doctorIntegralMsg(list).then((res) => {
                this.list = res.list;
                this.zjifen = res.integralTotal,
                    this.ydjifen = res.integralUsed,
                    this.syjifen = res.integralResidual
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

.jifen {
    width: 100%;
    height: 100%;
}

.jifenZ {
    width: 300px;
    height: 300px;
    background: #00afc2;
    color: #fff;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 50px;

    p {
        width: 100%;
        font-size: 40px;
        padding-top: 120px;
        float: left;
        text-align: center;
    }

    span {
        width: 100%;
        font-size: 25px;
        color: #cecece;
        float: left;
        text-align: center;
        padding-top: 15px;
    }
}

.list {
    width: 672px;
    height: 58%;
    overflow-y: scroll;
    margin: 0 auto;
    padding-top: 60px;

    .detail {
        width: 90%;
        height: 135px;
        border-bottom: 1px solid #cecece;
        font-size: 25px;

        div {
            width: 70px;
            height: 70px;
            background: #00afc2;
            color: #fff;
            font-size: 25px;
            line-height: 70px;
            text-align: center;
            border-radius: 50%;
            float: left;
            margin-top: 25px;
        }

        p {
            float: left;
            color: #828282;
            width: 45%;
            padding-left: 30px;
            padding-top: 15px;

            &:nth-of-type(1) {
                padding-top: 30px;
            }
        }

        span {
            float: right;
            color: #828282;
        }
    }
}

::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}
</style>
