<template>
<div class="houzhen">
    <div class="erweima">
        <img src="../assets/img/erweima.png" alt="">
    </div>
    <div class="userList">
        <p class="title"><span></span>候诊区<span></span></p>
        <div class="detail" v-for="(item,index) in list" :key="index">
            <img :src="item.imgUrl||item.patientImgUrl" alt="">
            <div class="info">
                <span>{{item.patientName}}</span>
                <label :class="{nan:item.patientSex==1}">
                    <img :src="item.patientSex==1?require('../assets/img/sex2.png'):require('../assets/img/sex1.png')" alt="">{{item.age||item.patientAge}}岁
                </label>
            </div>
            <div class="shijian">{{item.createDate}}</div>
            <div class="liaotian" @touchstart="goLiaotian(item.patientId)">聊天</div>
            <div class="kaifang" @touchstart="showkf(item.patientId,item.patientName,item.patientSex,item.age)">开方</div>
        </div>
    </div>
    <!--选择开方-->
    <div class="zhezhao" v-show="kaifang" @touchstart.stop="hidekf">
        <div class="choose">
            <p>选择开方方式</p>
            <div @touchstart="goxianshangkf">
                <img src="../assets/img/xianshangkf.png" alt="">
                <span>线上开方</span>
            </div>
            <div @touchstart="paizhaokf">
                <img src="../assets/img/paizhaokf.png" alt="">
                <span>拍照开方</span>
            </div>
        </div>
    </div>
    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp">
    <tabBar />
</div>
</template>

<script>
import {
    doctorChoosepri,
    findPatientByTel,
    findPatient
} from "api/doctor"
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import tabBar from '../components/patientTabBar'
export default {
    name: "houzhen",
    data() {
        return {
            kaifang: false,
            token: '',
            doctorId: '',
            list: '',
            patientId: '',
            patientName: '',
            patientSex: '',
            age: '',
            loadUp: true
        }
    },
    created() {
        this.token = cookie.get('token');
        this.doctorId = cookie.get('doctorId');
        this.doctorChoosepri();
    },
    computed: {

    },

    methods: {
        goLiaotian(patientId) {
            this.$router.push({
                path: '/liaotian',
                query: {
                    patientId: patientId
                }
            })
        },
        doctorChoosepri() {
            let list = {
                token: this.token,
                doctorId: this.doctorId
            }
            doctorChoosepri(list).then((res) => {
                //console.log(res);
                this.list = res.lists_dopa;
                this.loadUp = false;
            })
        },
        showkf(patientId, patientName, patientSex, age) {
            this.kaifang = true;
            this.patientId = patientId;
            this.patientName = patientName;
            this.patientSex = patientSex;
            this.age = age;
        },
        hidekf() {
            this.kaifang = false;
        },
        goxianshangkf() {
            cookie.set('patientId', this.patientId);
            cookie.set('patientName', this.patientName);
            cookie.set('patientSex', this.patientSex);
            cookie.set('age', this.age);
            this.$router.push({
                path: '/zaixiankf',
                query: {}
            })
        },
        paizhaokf() {
            cookie.set('patientId', this.patientId);
            cookie.set('patientName', this.patientName);
            cookie.set('patientSex', this.patientSex);
            cookie.set('age', this.age);
            this.$router.push({
                path: '/paizhaokf',
                query: {}
            })
        }
    },
    components: {
        tabBar
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.houzhen {
    width: 100%;
    height: auto;
    background: url('../assets/img/bg.jpg') repeat-y;
    background-position: 0% 0%;
    padding-top: 74px;
}

.erweima {
    width: 325px;
    height: 325px;
    background: linear-gradient(-47deg, rgba(188, 247, 233, 1), rgba(186, 249, 229, 1), rgba(164, 227, 245, 1));
    box-shadow: 1px 26px 21px 0px rgba(4, 0, 0, 0.24);
    border-radius: 19px;
    margin: 0 auto;

    img {
        width: 283px;
        height: 283px;
        border-radius: 13px;
        margin: 21px;
    }
}

.userList {
    width: 700px;
    background: rgba(255, 255, 255, 0.5);
    padding: 20px 0 210px 0;
    margin: 0 auto;
    border-radius: 10px;
    margin-top: 86px;
}

.title {
    width: 100%;
    text-align: center;
    font-size: 27px;
    color: #7d7d7d;

    span {
        width: 170px;
        border-bottom: 1px solid #bfcfd3;
    }
}

.detail {
    width: 95%;
    height: 150px;
    margin: 0 auto;
    border-bottom: 1px solid #d1ddde;
    position: relative;

    >img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        float: left;
        margin-top: 20px;
    }

    .info {
        width: 58%;
        float: left;
        font-size: 27px;
        padding-left: 20px;
        padding-top: 30px;
        color: #5d5d5d;

        label {
            width: 134px;
            height: 41px;
            display: inline-block;
            background: rgba(247, 124, 124, 1);
            border-radius: 21px;
            line-height: 41px;
            color: #fff;
        }

        label img {
            width: 29px;
            height: 29px;
            margin: 0 10px 0 10px;
            vertical-align: middle;
        }

        label.nan {
            width: 134px;
            height: 41px;
            background: #2eb0d5;
            border-radius: 21px;
            line-height: 41px;
            color: #fff;
        }
    }

    .shijian {
        font-size: 25px;
        padding-left: 20px;
        padding-top: 15px;
        float: left;
        width: 58%;
        color: #7c7c7c;
    }

    .kaifang,
    .liaotian {
        width: 126px;
        height: 49px;
        text-align: center;
        line-height: 49px;
        background: #4bced6;
        border-radius: 7px;
        font-size: 27px;
        color: #fff;
        position: absolute;
        right: 10px;
        top: 50px;
    }

    .kaifang {
        right: 160px;
    }
}

.zhezhao {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);

    .choose {
        width: 643px;
        height: 408px;
        background: rgba(255, 255, 255, 1);
        border-radius: 13px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        p {
            width: 100%;
            height: 86px;
            border-bottom: 1px solid #a7a7a7;
            text-align: center;
            line-height: 86px;
            font-size: 25px;
            color: #878787;
        }

        div {
            width: 224px;
            height: 213px;
            background: linear-gradient(-47deg, rgba(84, 201, 204, 1), rgba(110, 156, 221, 1));
            border-radius: 12px;
            float: left;
            margin-top: 40px;
            margin-left: 65px;

            img {
                width: 73px;
                height: 106px;
                margin: 0 auto;
                display: block;
                padding-top: 23px;
            }

            span {
                width: 100%;
                display: block;
                text-align: center;
                font-size: 27px;
                color: #fff;
                padding-top: 32px;
            }

            &:nth-of-type(2) img {
                width: 90px;
                height: 80px;
                padding-top: 35px;
            }

            &:nth-of-type(2) span {
                padding-top: 46px;
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
</style>
