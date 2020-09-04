<template>
<div class="indexPage">
    <div class="head">
        <div><input type="text" placeholder="输入医生或疾病" v-model="doctorTel"><em class="search" @touchstart="searchYs">搜索</em></div>
    </div>
    <div class="xiaoxi">
        <span>消息通知：您有{{dingNum}}笔待支付的处方订单</span><em @touchstart="goChufang">点此快速缴费</em>
    </div>
    <div class="btnList">
        <div class="mineyis" @touchstart="myDoctor">
            <span>我的医生</span>
            <em>新华医馆</em><em>您身边的家庭医生</em>
        </div>
        <div class="zhaoyis" @touchstart="zhaoDoctor">
            <span>找医生</span>
        </div>
        <div class="chachufang" @touchstart="chachufang">
            <span>查处方</span>
        </div>
    </div>
    <div class="xian" style="clear:both;"></div>
    <div class="remenJb">
        <h1>常见疾病 <span class="gengduo" @touchstart="gengduo" v-if="shouqi">更多</span> <span class="gengduo" v-if="!shouqi" @touchstart="shouqiS">收起</span> </h1>
        <div><span v-for="(item,index) in remenJb" :key="index" @touchstart="goremen(item.subjectName)">{{item.subjectName}}</span></div>
    </div>
    <div class="xian" style="clear:both;"></div>
    <div class="tuijian">
        <h1>推荐医生</h1>
        <div @touchstart="goDetail(item.doctorId)" v-for="(item,index) in tuijianYs" :key="index">
            <img :src="item.doctorPhoto" alt="">
            <div>{{item.doctorName}} {{item.doctorLevelName}}</div>
            <div>{{item.doctorHospitalName}} {{item.departmentName}}</div>
            <div><span v-for="(item,index) in item.list_adept" :key="index">{{item.medicineSubjectName}}</span></div>
        </div>
    </div>
    <div class="xian" style="clear:both;"></div>
    <div class="tabList">
        <div class="tab"><span v-for="(item,index) in tab" :key="index" :class="{borderB:botIdx==index}" @touchstart="changeIdx(index)">{{item}}</span></div>
        <div class="detailList">
            <div v-for="(item,index) in quanbuWenzhang" :key="index" @touchstart="gowenxq(item.id,item)">
                <img :src="item.doctorPhoto" alt="">
                <div>{{item.titles}}</div>
                <p>来自：{{item.sources}} {{item.departmentName}}{{item.doctorLevelName}} </p>
                <p>浏览量：123</p>
            </div>
        </div>
    </div>
    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp">
    <tabBar />
</div>
</template>

<script>
import {
    findDoctorBySubject,
    findDoctorHot,
    findArtcleByType,
    myCase,
    addLogin,
    getOpenId,
    openIdMsg,
    saveMsgPatient,
    findPatient
} from "api/patient"
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import tabBar from '../components/tabBar'
export default {
    name: "indexPage",
    data() {
        return {
            tab: ['热点', '医学讲堂', '生活', '母婴', '辟谣'],
            botIdx: 0,
            token: '13121557865:1595277654852:1e7a2d010716874a108ac59e82080baa',
            patientId: '8101155e0f1d48eb96c3fb31100bdf20',
            //              token:'',
            //              patientId:'',
            pageNum: 10,
            pageSize: 0,
            quanbuWenzhang: [],
            remenJb: [],
            tuijianYs: [],
            loadUp: true,
            doctorTel: '',
            dingNum: 0,
            openId: '',
            shouqi: true,
            unionId: ''
        }
    },
    created() {
        this.openId = this.GetQueryString('openid');
        cookie.set("token", this.token)
        cookie.set("patientId", this.patientId)
        //              this.openIdMsg();
        this.addLogin();
        this.findArtcleByType();
        this.findDoctorBySubject();
        this.findDoctorHot();
        this.myCase();
        this.findPatient()
    },
    computed: {

    },
    montued: {

    },
    methods: {
        openIdMsg() {
            if (this.openId == '' || this.openId == null) {
                window.location.href = 'https://www.mfzhosp.com/mkkMoblie/accessToken/openIdMsg?type=2&token=123456&id=123456&uri=https://www.mfzhosp.com/H5/#/indexPage';
            }
        },
        GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        addLogin() {
            let list = {
                openId: this.openId,
                nick: '',
                imgUrl: '',
                doctorId: ''
            }
            addLogin(list).then((res) => {
                //alert('用户token:'+res.token);
                if (res.info == 1008) {
                    cookie.set('token', res.token);
                    cookie.set('patientName', res.patientName);
                    cookie.set('patientId', res.patientId);
                    this.patientId = res.patientId;
                    this.token = res.token;
                    this.saveMsgPatient()
                    this.findArtcleByType();
                    this.findDoctorBySubject();
                    this.findDoctorHot();
                    this.myCase();
                    this.findPatient()
                }
            })
        },
        saveMsgPatient() {
            let list = {
                patientId: this.patientId,
                openId: this.openId,
                unionId: this.unionId
            }
            saveMsgPatient(list).then((res) => {

            })
        },
        findPatient() {
            let list = {
                token: this.token,
                patientId: this.patientId
            }
            findPatient(list).then((res) => {
                cookie.set('patientImgUrl', res.imgUrl);
            })
        },
        myCase() {
            let list = {
                token: this.token,
                patientId: this.patientId
            }
            myCase(list).then((res) => {
                let arr = []
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].indentStates == 0) {
                        arr.push(res.data[i])
                    }
                }
                this.dingNum = arr.length;
            })
        },
        goChufang() {
            this.$router.push('/chachufang')
        },
        searchYs() {
            this.$router.push({
                path: '/remenJb',
                query: {
                    doctorTel: this.doctorTel
                }
            });
            c
        },
        findArtcleByType() { //全部文章列表
            let list = {
                type: this.botIdx + 1,
                token: this.token,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            findArtcleByType(list).then((res) => {
                //console.log(res);
                this.quanbuWenzhang = res.list_return;
            })
        },
        findDoctorBySubject() { //热门疾病
            findDoctorBySubject().then((res) => {
                //console.log(res);
                for (var i = 0; i < 8; i++) {
                    this.remenJb.push(res.list[i]);
                    this.shouqi = true;
                }

            })
        },
        gengduo() {
            findDoctorBySubject().then((res) => {
                //console.log(res);
                this.remenJb = res.list;
                this.shouqi = false;
            })
        },
        shouqiS() {
            this.remenJb = [];
            this.findDoctorBySubject();
        },
        findDoctorHot() { //推荐医生
            let list = {
                token: this.token,
                patientId: this.patientId
            }
            findDoctorHot(list).then((res) => {
                //console.log(res);
                for (var i = 0; i < 5; i++) {
                    this.tuijianYs.push(res.data[i]);
                    this.loadUp = false;
                }
            })
        },
        gowenxq(id, item) {
            let detailItem = JSON.stringify(item);
            this.$router.push({
                path: "/wenzhangXq",
                query: {
                    id: id,
                    item: detailItem
                }
            });
        },
        changeIdx(index) {
            this.botIdx = index;
            this.findArtcleByType();
        },
        myDoctor() {
            this.$router.push("/myDoctor")
        },
        zhaoDoctor() {
            this.$router.push("/zhaoyisheng")
        },
        chachufang() {
            this.$router.push("/chachufang")
        },
        goDetail(doctorId) {
            this.$router.push({
                path: '/yishengXq',
                query: {
                    doctorId: doctorId
                }
            })
        },
        goremen(doctorTel) {
            this.$router.push({
                path: '/remenJb',
                query: {
                    doctorTel: doctorTel
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

.indexPage {
    padding-bottom: 120px;
}

.loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.head {
    width: 100%;
    height: 95px;
    background: #00B0C2;
    text-align: center;

    div {
        width: 656px;
        margin: 0 auto;
        padding-top: 20px;
    }

    input {
        width: 450px;
        height: 56px;
        background: #fff;
        border-radius: 13px;
        color: #828282;
        text-align: center;
        outline: none;
        font-size: 24px;
        float: left;
        margin-left: 100px;
    }

    input::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size: 25px;
    }
}

.search {
    position: absolute;
    right: 30px;
    top: 25px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 24px;
    text-align: center;
    border: 1px solid #efefef;
    border-radius: 20px;
}

.xian {
    width: 100%;
    height: 10px;
    background: #efefef;
    clear: both;
}

.xiaoxi {
    padding: 44px 42px 50px 30px;
    font-size: 24px;

    span {
        color: #E64141;
    }

    em {
        float: right;
        color: #4787F2;
    }
}

.btnList {
    padding: 0 30px 0 25px;

    .mineyis {
        width: 410px;
        height: 228px;
        background: linear-gradient(146deg, rgba(244, 198, 78, 1), rgba(242, 156, 74, 1));
        border-radius: 13px;
        float: left;
        margin-bottom: 30px;

        span {
            font-size: 37px;
            color: #fff;
            float: right;
            width: 80%;
            padding-right: 30px;
            text-align: right;
            padding-top: 48px;
        }

        em {
            font-size: 25px;
            color: #fff;
            float: right;
            padding-right: 30px;
            width: 80%;
            text-align: right;
            padding-top: 10px;

            &:nth-of-type(1) {
                padding-top: 35px;
            }
        }
    }

    .zhaoyis {
        width: 267px;
        height: 103px;
        background: linear-gradient(146deg, rgba(14, 210, 233, 1), rgba(6, 158, 178, 1));
        border-radius: 13px;
        float: right;
        line-height: 103px;
        margin-left: 10px;

        span {
            color: #fff;
            font-size: 37px;
            float: right;
            padding-right: 39px;
        }
    }

    .chachufang {
        width: 267px;
        height: 103px;
        background: linear-gradient(146deg, rgba(2, 204, 252, 1), rgba(52, 128, 216, 1));
        border-radius: 13px;
        float: right;
        line-height: 103px;
        margin-top: 20px;

        span {
            font-size: 37px;
            color: #fff;
            float: right;
            padding-right: 39px;
        }
    }
}

.remenJb {
    padding: 0 30px;
    height: 252px;

    h1 {
        font-size: 25px;
        padding: 30px 0 25px 13px;
        color: #606060;

        .gengduo {
            color: #00afc2;
            font-size: 25px;
            float: right;
        }
    }

    div {
        span {
            float: left;
            width: 156px;
            height: 60px;
            border: 1px solid #E4E4E4;
            text-align: center;
            line-height: 60px;
            margin-right: 15px;
            border-radius: 13px;
            font-size: 24px;
            color: #7B7B7B;
            margin-bottom: 15px;

            &:nth-of-type(4n) {
                margin-right: 0;
            }
        }
    }
}

.tuijian {
    h1 {
        font-size: 25px;
        padding: 30px 0 25px 43px;
        color: #606060;
    }

    >div {
        width: 672px;
        margin: 0 auto;
        height: 300px;
        border-bottom: 1px solid #e9e9e9;
        font-size: 25px;

        img {
            float: left;
            width: 89px;
            height: 89px;
            border-radius: 50%;
            margin-top: 19px;
        }

        div {
            float: left;
            width: 80%;
            padding-left: 20px;

            &:nth-of-type(1) {
                color: #606060;
                padding-top: 28px;
            }

            &:nth-of-type(2) {
                color: #BABABA;
                padding-top: 16px;
                height: 25px;
                line-height: 30px;
                overflow: hidden;
            }

            &:nth-of-type(3) {
                color: #fff;
                padding-top: 19px;

                span {
                    float: left;
                    margin-right: 10px;
                    padding: 8px 15px;
                    background: #00afc2;
                    border-radius: 30px;
                    margin-bottom: 10px;
                }
            }
        }
    }
}

.tabList {
    .tab {
        width: 90%;
        height: 80px;
        margin: 0 auto;
        padding: 10px 0;

        span {
            width: 20%;
            text-align: center;
            line-height: 80px;
            color: #B9B9B9;
            font-size: 25px;
            float: left;
        }

        span.borderB {
            border-bottom: 1px solid #00B0C2;
            color: #00B0C2;
        }
    }
}

.detailList {
    padding: 0 36px;

    >div {
        width: 100%;
        height: 157px;
        border-bottom: 1px solid #f1f1f1;

        div {
            font-size: 25px;
            color: #7A7A7A;
            padding-top: 32px;
            float: left;
            width: 67%;
            height: 30px;
            line-height: 30px;
            overflow: hidden;
        }

        p {
            font-size: 22px;
            color: #BBBBBB;
            padding-top: 10px;
            float: left;
            width: 67%;
        }

        img {
            width: 177px;
            height: 114px;
            border-radius: 13px;
            float: right;
            margin-top: 20px;
        }
    }
}
</style>
