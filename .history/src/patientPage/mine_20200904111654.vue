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
        <p @click="lxkf"><span>联系客服</span><img src="../assets/img/you.png" alt=""></p>
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
    height: 320px;
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
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }

        p {
            font-size: 25px;
            color: #606060;
            padding-top: 10px;
            text-align: center;
        }
    }
}

.list {
    width: 667px;
    margin: 0 auto;
    padding-top: 34px;

    p {
        width: 100%;
        height: 84px;
        border-bottom: 1px solid #ebebeb;
        line-height: 84px;

        span {
            font-size: 25px;
            color: #7B7B7B;
            float: left;
            padding-left: 20px;
        }

        img {
            width: 34px;
            height: 40px;
            float: right;
            margin-top: 15px;
            margin-right: 10px;
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
        width: 658px;
        height: 279px;
        background: rgba(255, 255, 255, 1);
        border-radius: 13px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .headDian {
        width: 100%;
        height: 86px;
        border-bottom: 1px solid #a7a7a7;
        text-align: center;
        line-height: 86px;
        font-size: 25px;
        color: #878787;

        img {
            width: 33px;
            height: 33px;
            float: right;
            margin: 10px 10px 0 0;
        }
    }

    p {
        width: 100%;
        height: 104px;
        border-bottom: 1px solid #f1f1f1;
        color: #878787;
        font-size: 25px;
        line-height: 104px;

        span {
            padding-left: 10px;
        }

        button {
            width: 160px;
            height: 65px;
            background: rgba(84, 213, 210, 1);
            border-radius: 13px;
            font-size: 25px;
            color: #fff;
            border: none;
            float: right;
            margin: 20px 10px 0 0;
        }
    }
}
</style>
