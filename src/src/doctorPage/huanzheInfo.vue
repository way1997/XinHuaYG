<template>
<div class="recordNum">
    <div class="backHome" @click="backHome">返回首页</div>
    <div class="xian"></div>
    <div class="qitaxinxi">
        <h1>患者信息</h1>
        <span class="lahei" @click="showPull">拉入黑名单</span>
        <div class="info">
            <img :src="patientImage" alt="">
            <div>{{patientName}}</div>
            <div>{{patientPhone}}</div>
            <div><span><img :src="patientSex==1?require('../assets/img/sex2.png'):require('../assets/img/sex1.png')" alt="">{{patientAge}}岁</span></div>
        </div>
        <div class="detail">
            <p>过敏病史:{{allergicType}}</p>
            <p>既往病史:{{medicalHistory}}</p>
            <p>备注信息:{{patientRemarkName}}</p>
        </div>
        <div class="liaotian" @click="goLiaotian()">聊天</div>
        <div class="bianji" @click="bianjiBei">编辑</div>
    </div>
    <div class="xian"></div>
    <div class="chufang">
        <h1>历史处方</h1>
        <div class="listD" v-for="(item,index) in lists" :key="index">
            <p>{{item.createDate}} <span @click="lookfangan(item.prescriptionId)">查看</span><span @click="showPull1(item.prescriptionId)">撤销</span></p>
            <div><span>辩证:</span>{{item.symptom}}</div>
            <div><span>处方:</span> <label v-for="(item,index) in item.details" :key="index">{{item.medicineName}}{{item.howWeight}}、</label></div>
            <!-- <div class="chexiao" @click="goZaixian">再次开方</div> -->
            <img src="../assets/img/lineW.png" alt="">
        </div>
    </div>
    <div class="bjxinxi" v-if="beizhu">
        <div>
            <textarea type="text" v-model="patientRemarkName" placeholder="请输入备注信息" />
            <div @click="quxiaoBei">取消</div>
            <div @click="submit">确认</div>
        </div>
    </div>
    <confirm :text="tipText" ref="confirm" @cancel="cancel" @confirm="confirm"></confirm>
</div>
</template>

<script>
import {
    patientArchives,
    pullBlack,
    doctorDelPatientPlan,
    updateRemarks
} from "api/doctor"
import HeadTop from 'base/header/header'
import confirm from 'base/confirm/confirm'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "recordNum",
    data() {
        return {
            token: "",
            doctorId: "",
            patientImage: '',
            patientName: '',
            patientSex: '',
            patientAge: '',
            patientPhone: '',
            patientRemarkName: '无备注',
            allergicType: '无',
            medicalHistory: '无',
            groupNames: '',
            groupName: '',
            lists: '',
            newAnswer: false,
            patientId: '',
            patientDoctorId: '',
            groupId: '',
            symptom: '',
            typeIdx: 0,
            prescriptionId: '',
            tipText: '确定要将患者拉入黑名单吗?',
            beizhu: false,
        }
    },
    created() {
        this.token = cookie.get("token");
        this.doctorId = cookie.get("doctorId");
        this.patientId = this.$route.query.patientId;
        if (this.$route.query.patientId2) {
            this.patientId = this.$route.query.patientId2;
        }
        this.patientArchives();
    },
    computed: {

    },

    methods: {
        goLiaotian() {
            this.$router.push({
                path: '/liaotian',
                query: {
                    patientId: this.patientId,
                    page:'huanzheInfo'
                }
            })
        },
        backHome() {
            this.$router.push('/huanzhe')
        },
        goZaixian() {
            this.$router.push({
                path: '/zaixiankf',
                query: {}
            })
        },
        bianjiBei() {
            this.beizhu = true;
        },
        quxiaoBei() {
            this.beizhu = false;
        },
        submit() {
            let list = {
                remarks: this.patientRemarkName,
                patientDoctorId: this.patientDoctorId,
                token: this.token
            }
            updateRemarks(list).then((res) => {
                this.$toast('保存成功');
                this.beizhu = false;
                this.patientArchives();
            })
        },
        showPull(prescriptionId) {
            this.way = 0;
            this.tipText = '确定要将患者拉入黑名单吗'
            this.$refs.confirm.show();
        },
        showPull1(prescriptionId) {
            this.way = 1;
            this.tipText = '确定要撤销此药方吗？'
            this.$refs.confirm.show();
            this.prescriptionId = prescriptionId;
        },
        cancel() {
            this.$refs.confirm.hide();
        },
        patientArchives() {
            let list = {
                token: this.token,
                doctorId: this.doctorId,
                patientId: this.patientId
            }
            patientArchives(list).then((res) => {
                //console.log(res);
                this.patientAge = res.map_patient.patientAge,
                    this.patientName = res.map_patient.patientName,
                    this.patientRemarkName = res.map_patient.patientRemarkName,
                    this.patientSex = res.map_patient.patientSex,
                    this.patientImage = res.map_patient.patientImage,
                    this.patientPhone = res.map_patient.patientPhone,
                    this.lists = res.map_patient.lists,
                    this.groupName = res.map_patient.groupName,
                    this.symptom = res.map_patient.lists,
                    this.patientId = res.map_patient.patientId,
                    this.groupId = res.map_patient.groupId,
                    this.patientDoctorId = res.map_patient.patientDoctorId,
                    this.allergicType = res.map_patient.allergicType, //患者过敏史
                    this.medicalHistory = res.map_patient.medicalHistory, //患者病史
                    this.hidden = false

            })
        },
        goDetail() {
            let user = {
                patientName: this.patientName,
                patientId: this.patientId,
                patientSex: this.patientSex,
                age: this.patientAge,
                patientPhone: this.patientPhone
            }
            this.$router.push({
                path: "/zaixiankf",
                query: {
                    user: JSON.stringify(user),
                    patientId: this.patientId
                }
            });
        },
        confirm() {
            if (this.way == 0) {
                let list = {
                    token: this.token,
                    patientDoctorId: this.patientDoctorId
                }
                pullBlack(list).then((res) => {
                    if (res.type == true) {
                        this.$toast('拉黑成功');
                        this.$refs.confirm.hide();
                        this.$router.go(-1);
                    } else {
                        this.$toast(res.massage);
                        this.$refs.confirm.hide();
                    }
                })
            } else {
                let list = {
                    doctorId: this.doctorId,
                    patientId: this.patientId,
                    token: this.token,
                    prescriptionId: this.prescriptionId
                }
                doctorDelPatientPlan(list).then((res) => {
                    if (res.dMsg == '删除诊断成功！') {
                        this.$toast('撤销成功');
                        this.$refs.confirm.hide();
                        this.$router.go(-1)
                    } else {
                        this.$toast(res.massage);
                    }

                })
            }
        },
        lookfangan(prescriptionId) {
            let user = {
                patientAge: this.patientAge,
                patientName: this.patientName,
                patientImage: this.patientImage,
                patientId: this.patientId,
                patientSex: this.patientSex
            }
            this.prescriptionId = prescriptionId;
            cookie.set('patientId', this.patientId);
            cookie.set('patientName', this.patientName);
            cookie.set('patientSex', this.patientSex);
            cookie.set('age', this.patientAge);
            this.$router.push({
                path: '/yaofangDetail',
                query: {
                    prescriptionId: this.prescriptionId,
                    patientId: this.patientId,
                    user: JSON.stringify(user)
                }
            })
        },
    },
    components: {
        confirm
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

.qitaxinxi {
    width: 100%;
    height: 460px;
    position: relative;

    h1 {
        width: 190px;
        height: 53px;
        line-height: 53px;
        text-align: center;
        font-size: 24px;
        color: #fff;
        background: rgba(66, 202, 198, 1);
        border-radius: 0px 27px 27px 0px;
        margin-top: 20px;
    }

    .lahei {
        position: absolute;
        right: 20px;
        top: 0;
        color: #ED4242;
        font-size: 24px;
        line-height: 53px;
    }

    .info {
        padding: 40px 20px 20px 20px;

        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            float: left;
            margin-left: 16px;
        }

        div {
            float: left;
            width: 80%;
            padding-left: 20px;

            &:nth-of-type(1) {
                font-size: 27px;
                color: #5E5E5E;
                padding-top: 10px;
            }

            &:nth-of-type(2) {
                font-size: 25px;
                color: #B4B4B4;
                padding-top: 20px;
            }

            &:nth-of-type(3) {
                span {
                    width: 134px;
                    height: 41px;
                    float: left;
                    background: #F77B7B;
                    border-radius: 21px;
                    font-size: 24px;
                    line-height: 41px;
                    color: #fff;
                    margin-right: 10px;
                    margin-top: 15px;

                    img {
                        width: 29px;
                        height: 29px;
                        vertical-align: middle;
                        margin: 5px 10px 0 20px;
                    }
                }
            }
        }
    }

    .detail {
        float: left;
        padding: 36px;

        p {
            color: #828282;
            font-size: 25px;
            line-height: 49px;
        }
    }

    .bianji {
        width:150px;
        height:50px;
        text-align: center;
        line-height: 50px;
        color:#fff;
        background:#00afc2;
        font-size: 30px;
        float: right;
        margin-top: 150px;
        margin-right: 30px;
        border-radius: 20px;
    }

    .liaotian {
        width:150px;
        height:50px;
        text-align: center;
        line-height: 50px;
        color:#fff;
        background:#00afc2;
        position: absolute;
        right: 30px;
        bottom: 170px;
        font-size: 30px;
        border-radius: 20px;
    }
}

.chufang {
    width: 100%;

    h1 {
        width: 190px;
        height: 53px;
        line-height: 53px;
        text-align: center;
        font-size: 24px;
        color: #fff;
        background: rgba(66, 202, 198, 1);
        border-radius: 0px 27px 27px 0px;
        margin-top: 20px;
    }

    .listD {
        width: 95%;
        height: 326px;
        margin: 20px auto;
        background: rgba(255, 255, 255, 1);
        border: 2px solid rgba(214, 214, 214, 1);
        box-shadow: 4px 4px 4px 0px rgba(4, 0, 0, 0.09);
        border-radius: 13px 13px 0px 0px;
        margin-bottom: 40px;
        position: relative;

        p {
            width: 95%;
            height: 77px;
            line-height: 77px;
            color: #828282;
            font-size: 24px;
            border-bottom: 1px solid #D6D6D6;
            margin: 0 auto;

            span {
                float: right;
                color: #42CAC6;
                margin-right: 20px;
                width:100px;
                height:40px;
                background:#00afc2;
                border-radius: 20px;
                color:#fff;
                text-align: center;
                line-height: 40px;
                margin-top:20px;
            }
        }

        div {
            font-size: 24px;
            color: #828282;
            line-height: 43px;
            padding: 5px 20px;

            span {
                float: left;
                margin-right: 10px;
            }

            label {
                float: left;
                //width:90%;
            }
        }

        div.chexiao {
            color: #00afc2;
            font-size: 25px;
            float: right;
            padding-top: 100px;
        }

        img {
            position: absolute;
            bottom: -20px;
            left: 0;
        }
    }
}

.bjxinxi {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;

    >div {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 300px;
        background: #fff;
        border-radius: 20px;

        textarea {
            width: 80%;
            height: 80px;
            border: 1px solid #cecece;
            font-size: 25px;
            color: #828282;
            border-radius: 10px;
            margin-left: 7%;
            resize: none;
            padding: 20px;
            margin-top: 20px;
        }

        div {
            width: 200px;
            height: 60px;
            background: #00afc2;
            color: #fff;
            font-size: 25px;
            text-align: center;
            line-height: 60px;
            border-radius: 60px;
            float: left;
            margin-top: 30px;
            margin-left: 60px;
        }
    }

}
</style>
