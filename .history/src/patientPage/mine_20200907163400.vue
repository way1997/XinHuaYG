<template>
<div class="mine">
    <div class="head">
        <img src="../assets/img/bg.png" alt="">
        <div class="info">
            <img :src="imgUrl" alt="">
            <p>{{patientName}}</p>

            <p>{{patientSex}} {{age}}岁</p>
        </div>
    </div>
    <div class="list">
        <p @click="gojiuzhen"><span>健康档案</span><img src="../assets/img/you.png" alt=""></p>
        <p @click="gochufang"><span>处方信息</span><img src="../assets/img/you.png" alt=""></p>
        <p @click="dingdan"><span>订单信息</span><img src="../assets/img/you.png" alt=""></p>
        <p @click="dizhi"><span>地址管理</span><img src="../assets/img/you.png" alt=""></p>
        <p @click="lxkf" style="padding-bottom:.9rem"><span>联系客服</span><img src="../assets/img/you.png" alt=""></p>
    </div>
    <!--热线电话-->
    <div class="dianZhe" v-show="dianhua">
        <div class="dianhua">
            <div class="headDian">热线电话<img src="../assets/img/quxiao.png" alt="" @click="quxiao"></div>
            <p><span>客服热线：400-188-1081</span><a href="tel:400-188-1081"><button>拨打热线</button></a></p>
        </div>
    </div>
    <tabBar />
</div>
</template>

<script>
import {
    findPatient
} from 'api/patient'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import tabBar from '../components/tabBar'
export default {
    name: "mine",
    data() {
        return {
            token: '',
            patientId: '',
            patientName: '',
            imgUrl: '',
            age: '',
            patientSex: '',
            dianhua: false
        }
    },
    created() {
        this.token = cookie.get("token")
        this.patientId = cookie.get("patientId")
        this.findPatient()
    },
    computed: {

    },

    methods: {
        lxkf() {
            this.dianhua = true;
        },
        quxiao() {
            this.dianhua = false;
        },
        findPatient() {
            let list = {
                token: this.token,
                patientId: this.patientId
            }
            findPatient(list).then((res) => {
                this.patientName = res.patientName;
                this.imgUrl = res.imgUrl;
                if (!res.imgUrl) {
                    this.imgUrl = 'https://www.mfzhosp.com/imges/f1ae4c6f0cd444787a911a666796e58.png'
                }
                this.age = res.age;
                if (res.patientSex == 1) {
                    this.patientSex = '男'
                } else {
                    this.patientSex = '女'
                }

            })
        },
        gochufang() {
            this.$router.push('/chachufang')
        },
        dingdan() {
            this.$router.push('/dingdan')
        },
        dizhi() {
            this.$router.push('/address')
        },
        gojiuzhen() {
            this.$router.push('/jiankangda')
        }
    },
    components: {
        tabBar
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.head {
    width: 100%;
    height: 3.33rem;
    position: relative;

    >img {
        width: 100%;
        height: 100%;
    }

    .info {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        img {
            width: 1.08rem;
            height: 1.08rem;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 50%;
        }

        p {
            font-size: 0.26rem;
            color: #606060;
            padding-top: 0.1rem;
            text-align: center;
        }
    }
}

.list {
    width: 100%;
    // margin: 0 auto;
    // padding-top: 0.354rem;
    // padding-bottom: 1.51rem;

    p {
        width: 100%;
        height: 0.3rem;
        border-bottom: 1px solid #ebebeb;
        line-height: 0.3rem;
        padding-bottom: 0.09rem;

        span {
            font-size: 0.4rem;
            color: #7B7B7B;
            float: left;
            padding-left: 0.2rem;
            line-height: 0.3rem;
            transform: translateY(-100%);
        }

        img {
            width: 0.354rem;
            height: 0.416rem;
            float: right;
            position: relative;
            top: 50%;
            transform: translateY(-100%);
            opacity: 1;
        }

        &:last-child {
            border-bottom: none;
        }
    }
}

.dianZhe {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;

    .dianhua {
        width: 94%;
        height: 2.906rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.135rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .headDian {
        width: 100%;
        height: 0.895rem;
        border-bottom: .02rem solid #a7a7a7;
        text-align: center;
        line-height: 0.895rem;
        font-size: 0.26rem;
        color: #878787;

        img {
            width: 0.34375rem;
            height: 0.34375rem;
            float: right;
            margin: 0.1rem 0.1rem 0 0;
        }
    }

    p {
        width: 100%;
        height: 1.083;
        border-bottom: .02rem solid #f1f1f1;
        color: #878787;
        font-size: 0.26rem;
        line-height: 1.083rem;

        span {
            padding-left: 0.1rem;
        }

        button {
            width: 1.66rem;
            height: 0.677rem;
            background: rgba(84, 213, 210, 1);
            border-radius: 0.135rem;
            font-size: 0.26rem;
            line-height: 0.26rem;
            color: #fff;
            border: none;
            float: right;
            margin: 0.2rem 0.1rem 0 0;
        }
    }
}
</style>
