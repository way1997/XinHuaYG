<template>
<div class="huanzhe">
    <div class="search">
        <input type="text" placeholder="输入患者姓名" v-model="names" @input="findPatient" @keyup="shuru">
    </div>
    <div class="huanList">
        <div class="detail" v-for="(item,index) in list" :key="index" @click="gohuan(item.patientId,item.patientId2)">
            <img :src="item.imgUrl||item.patientImgUrl" alt="">
            <div class="name">{{item.patientName}}</div>
            <div class="phone">{{item.patientPhone||item.phone}}</div>
            <div class="sexs">
                <img :src="item.patientSex==1?require('../assets/img/sex2.png'):require('../assets/img/sex1.png')" alt="">{{item.age||item.patientAge}}岁
            </div>
        </div>
    </div>
    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp">
    <img class="zanwuxinxi" v-show="display3" src='../assets/img/zanwuxinxi.png' />
    <tabBar />
</div>
</template>

<script>
import {
    doctorChoosepri,
    findPatientByTel,
    findPatient,
    findAllPatient
} from "api/doctor"
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import tabBar from '../components/patientTabBar'
export default {
    name: "huanzhe",
    data() {
        return {
            token: '',
            doctorId: '',
            list: '',
            names: '',
            display3: false,
            loadUp: true,
        }
    },
    created() {
        this.token = cookie.get('token');
        this.doctorId = cookie.get('doctorId');
        this.findAllPatient();
    },
    computed: {

    },

    methods: {
        findAllPatient() {
            let list = {
                token: this.token,
                doctorId: this.doctorId
            }
            findAllPatient(list).then((res) => {
                  console.log(res);
                this.list = res.data;
                this.loadUp = false;
            })
        },
        findPatient() {
            let list = {
                token: this.token,
                doctorId: this.doctorId,
                data: this.names,
                groupId: ''
            }
            findPatient(list).then((res) => {
            	console.log(res);
                if (res.type == true) {
                    this.list = res.data;
                    if (this.list.length != 0) {
                        this.display3 = false;
                    } else {
                        this.display3 = true;
                    }
                }
            })
            if (this.names == '') {
                this.doctorChoosepri();
            }
        },
        shuru() {

        },
        gohuan(patientId, patientId2) {
            this.$router.push({
                path: "/huanzheInfo",
                query: {
                    patientId: patientId,
                    patientId2: patientId2
                }
            });
        }
    },
    components: {
        tabBar
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.huanzhe {
    padding-bottom: 120px;
}

.search {
    width: 100%;
    height: 67px;
    font-size: 30px;
    margin: 0 auto;
    margin-top: 20px;

    input {
        width: 100%;
        height: 67px;
        border: 1px solid rgba(136, 136, 136, 1);
        border-radius: 33px;
        font-size: 30px;
        text-align: center;
    }
}

.huanList {
    width: 100%;
    margin: 0 auto;
    padding-top: 20px;

    >div.detail {
        width: 100%;
        height: 155px;
        border-bottom: 1px solid #e3e3e3;

        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            float: left;
            margin-top: 25px;
            margin-left: 10px;
        }

        .name,
        .phone {
            float: left;
            width: 50%;
            padding-left: 20px;
        }

        .name {
            font-size: 27px;
            color: #5D5D5D;
            padding-top: 40px;
        }

        .phone {
            font-size: 24px;
            color: #B4B4B4;
            padding-top: 20px;
        }

        .sexs {
            float: right;
            width: 134px;
            height: 41px;
            background: #F77B7B;
            border-radius: 21px;
            font-size: 24px;
            line-height: 41px;
            color: #fff;
            margin-right: 10px;

            img {
                width: 29px;
                height: 29px;
                vertical-align: middle;
                margin: 5px 10px 0 20px;
            }
        }

        .nan {
            float: right;
            width: 134px;
            height: 41px;
            background: #42CAC6;
            border-radius: 21px;
            font-size: 24px;
            line-height: 41px;
            color: #fff;
            margin-right: 10px;

            img {
                width: 29px;
                height: 29px;
                vertical-align: middle;
                margin: 0 10px;
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
