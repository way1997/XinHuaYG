<template>
<div class="indexPage">
    <div class="head">
        <div><input type="text" placeholder="输入医生或疾病" v-model="doctorTel"><em class="search" @click="searchYs">搜索</em></div>
    </div>
    <div class="xiaoxi">
        <span>消息通知：您有{{dingNum}}笔待支付的处方订单</span><em @click="goChufang">点此快速缴费</em>
    </div>
    <div class="btnList">
        <div class="mineyis" @click="myDoctor">
            <span>我的医生</span>
            <em>新华医馆</em><em>您身边的家庭医生</em>
        </div>
        <div class="zhaoyis" @click="zhaoDoctor">
            <span>找医生</span>
        </div>
        <div class="chachufang" @click="chachufang">
            <span>查处方</span>
        </div>
    </div>
    <div class="xian" style="clear:both;"></div>
    <div class="remenJb">
        <h1>常见疾病 <span class="gengduo" @click="gengduo" v-if="shouqi">更多</span> <span class="gengduo" v-if="!shouqi" @click="shouqiS">收起</span> </h1>
        <div><span v-for="(item,index) in remenJb" :key="index" @click="goremen(item.subjectName)">{{item.subjectName}}</span></div>
    </div>
    <div class="xian" style="clear:both;"></div>
    <div class="tuijian">
        <h1>推荐医生</h1>
        <div v-for="(item,index) in tuijianYs" :key="index">
            <div @click="goDetail(item.doctorId)" style="width: 100%;">
                <img :src="item.doctorPhoto" alt="">
                <div>{{item.doctorName}} {{item.doctorLevelName}}</div>
                <div>{{item.doctorHospitalName}} {{item.departmentName}}</div>
                <div><span v-for="(item,index) in item.list_adept" :key="index">{{item.medicineSubjectName}}</span></div>
            </div>
        </div>
    </div>
    <div class="xian" style="clear:both;"></div>
    <div class="tabList">
        <div class="tab"><span v-for="(item,index) in tab" :key="index" :class="{borderB:botIdx==index}" @click="changeIdx(index)">{{item}}</span></div>
        <div class="detailList">
            <div v-for="(item,index) in quanbuWenzhang" :key="index" @click="gowenxq(item.id,item)">
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
    relation,
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
import $ from 'jquery'
export default {
    name: "indexPage",
    data() {
        return {
            tab: ['热点', '医学讲堂', '生活', '母婴', '辟谣'],
            botIdx: 0,
            // token: '13121557865:1595277654852:1e7a2d010716874a108ac59e82080baa',
            token: '15555208228:1601001477873:37643b6cecbf97397736a9cd66da7778',
            patientId: 'ca8a7d342a804116a7f703b4bdc56002',
            openId: 'oTRY10fRZBmepPFQ1V7tqSBprZqg',

            // patientId: 'baec56f2c12848a3b6f1bdbac12772c1', //测试员 [梁小娟]账号测试号
            // openId: 'oTRY10R3HT5cOG3q91OxAT5RusR8', //测试员 [梁小娟]账号测试号

            // openId: '',
            // token: '',
            // patientId: '',
            pageNum: 10,
            pageSize: 0,
            quanbuWenzhang: [],
            remenJb: [],
            tuijianYs: [],
            loadUp: true,
            doctorTel: '',
            dingNum: 0,
            shouqi: true,
            unionId: '',
            doctorId: ''
        }
    },
    created() {
        // this.openId = this.GetQueryString('openid');
        cookie.set("token", this.token)
        cookie.set("patientId", this.patientId)
        // this.openIdMsg();
        this.addLogin();
        // this.findArtcleByType();
        // this.findDoctorBySubject();
        // this.findDoctorHot();
        // this.myCase();

        // this.findPatient()
        var that = this
        let historyObj = window.history.state

        // if (window.history && window.history.pushState) {
        //     $(window).on('popstate', function () {
        //         var hashLocation = location.hash;
        //         var hashSplit = hashLocation.split("#/");
        //         var hashName = hashSplit[1];
        //         // that.fromPath = that.fromPath == undefined ? '/indexPage' : that.fromPath
        //         // console.log('hashLocation====' + hashLocation)
        //         // console.log('hashSplit====' + hashSplit)
        //         // console.log('hashName====' + hashName)
        //         // console.log('fromPath====' + that.fromPath)
        //         // console.log('toPath====' + that.toPath)
        //         if (hashName !== '') {
        //             var hash = window.location.hash;
        //             // alert('hash====' + hash)
        //             if (hash === '') {
        //                 var bol = confirm("是否退出该页面？");
        //                 if (bol) {
        //                     that.weixinClosePage()
        //                 } else {
        //                     that.$router.go(0);
        //                 }
        //             }
        //         }
        //     });
        //     window.history.pushState('', null, '')
        // }

        // 添加事件
        window.addEventListener('popstate', function (e) {
                    var hashLocation = location.hash;
                    var hashSplit = hashLocation.split("#/");
                    var hashName = hashSplit[1];
                    alert('hashLocation====' + hashLocation)
                    alert('hashSplit====' + hashSplit)
                    alert('hashName====' + hashName)
                    if (hashName !== '') {
                        //             var hash = window.location.hash;
                        //             // alert('hash====' + hash)
                        //             if (hash === '') {
                        //                 var bol = confirm("是否退出该页面？");
                        //                 if (bol) {
                        //                     that.weixinClosePage()
                        //                 } else {
                        //                     that.$router.go(0);
                        //                 }
                        //             }
                        //         }
                        that.unloadHander();
                    }, false);

                // // 移除事件
                // console.log(window.addEventListener)
                // window.removeEventListener('unload', function (e) {
                //     that.unloadHander();
                // }, false);

            },
            computed: {

            },
            montued() {

            },
            methods: {
                pushHistory() {
                    var state = {
                        title: "title",
                        url: "#"
                    };
                    window.history.replaceState(state, state.title, state.url);
                },
                weixinClosePage() {
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', weixin_ClosePage, false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', weixin_ClosePage);
                            document.attachEvent('onWeixinJSBridgeReady', weixin_ClosePage);
                        }
                    } else {
                        this.weixin_ClosePage();
                    }
                },
                weixin_ClosePage() {
                    WeixinJSBridge.call('closeWindow');
                },
                unloadHander(e) {
                    // 获取浏览器信息ua
                    let u = navigator.userAgent;
                    // 判断设备
                    // alert(u)
                    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
                    if (isAndroid) {
                        // 处理事件
                        alert('是否关闭此页面？ *^_^*')
                    }
                },
                //--------
                openIdMsg() {
                    if (this.$route.query.doctorId) {
                        this.doctorId = this.$route.query.doctorId
                        cookie.set("doctorIdSaoma", this.doctorId)
                    }
                    if (this.openId == '' || this.openId == null || this.openId == undefined) {
                        window.location.href =
                            'https://www.mfzhosp.com/mkkMoblie/accessToken/openIdMsg?type=2&token=123456&id=123456&uri=https://www.mfzhosp.com/H5/#/indexPage';
                    } else {
                        this.addLogin();
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
                        // openId: "oTRY10R3HT5cOG3q91OxAT5RusR8",
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

                            this.relation();

                        }
                        if (res.info == 1007 && this.openId != " ") {
                            cookie.set('openId', res.openId);
                            cookie.set('nick', res.nick);
                            cookie.set('imgUrl', res.imgUrl);
                            cookie.set('token', res.token);
                            this.$router.push({
                                name: 'wsgrxx',
                                params: {
                                    doctorId: res.doctorId
                                }
                            })
                        }
                    })
                },
                relation() {
                    let list = {
                        token: this.token,
                        doctorId: cookie.get('doctorIdSaoma'),
                        patientId: this.patientId
                    }
                    relation(list).then((res) => {
                        if (res.type == true) {
                            return true
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
                        // console.log(res);
                        for (var i = 0; i < 5; i++) {
                            this.tuijianYs.push(res.data[i]);
                            this.loadUp = false;
                        }
                    })
                },
                gowenxq(id, item) {
                    let detailItem = JSON.stringify(item);
                    this.$router.push({
                        name: 'wenzhangXq',
                        params: {
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
@import "../assets/less/base.less";

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
    height: 0.98rem;
    background: #00b0c2;
    text-align: center;

    div {
        width: 100%;
        margin: 0 auto;
        padding-top: 0.2rem;
    }

    input {
        width: 62.4%;
        height: 0.583rem;
        background: #fff;
        border-radius: 0.135rem;
        color: #828282;
        text-align: center;
        outline: none;
        font-size: 0.25rem;
        float: left;
        position: absolute;
        left: 45%;
        transform: translateX(-50%);
    }

    input::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size: 0.26rem;
    }
}

.search {
    position: absolute;
    right: 0.2rem;
    top: 0.26rem;
    width: 14.1%;
    height: 0.41rem;
    line-height: 0.41rem;
    color: #fff;
    font-size: 0.25rem;
    text-align: center;
    border: 0.02rem solid #efefef;
    border-radius: 0.2rem;
}

.xian {
    width: 100%;
    height: 0.10416rem;
    background: #efefef;
    clear: both;
}

.xiaoxi {
    // padding: 44px 42px 50px 0.3125rem;
    width: 98%;
    margin: 0.28rem auto;
    font-size: 0.21rem;

    span {
        display: inline-block;
        color: #e64141;
    }

    em {
        display: inline-block;
        float: right;
        color: #4787f2;
    }
}

.btnList {
    // width: 100%;
    padding: 0 0.3125rem 0 0.26rem;

    .mineyis {
        width: 54.6%;
        height: 2.375rem;
        background: linear-gradient(146deg,
                rgba(244, 198, 78, 1),
                rgba(242, 156, 74, 1));
        border-radius: 0.135rem;
        float: left;
        margin-bottom: 0.3125rem;

        span {
            font-size: 0.385rem;
            color: #fff;
            float: right;
            width: 80%;
            padding-right: 0.3125rem;
            text-align: right;
            padding-top: 0.5rem;
        }

        em {
            font-size: 0.24rem;
            color: #fff;
            float: right;
            padding-right: 0.3125rem;
            width: 82%;
            text-align: right;
            padding-top: 0.1rem;

            &:nth-of-type(1) {
                padding-top: 0.364rem;
            }
        }
    }

    .zhaoyis {
        width: 38.544%;
        height: 1.072rem;
        background: linear-gradient(146deg,
                rgba(14, 210, 233, 1),
                rgba(6, 158, 178, 1));
        border-radius: 0.135rem;
        float: right;
        line-height: 1.072rem;
        text-align: center;
        margin-left: 0.104rem;

        span {
            color: #fff;
            font-size: 0.35rem;
            float: right;
            padding-right: 0.40625rem;
        }
    }

    .chachufang {
        width: 38.544%;
        height: 1.072rem;
        background: linear-gradient(146deg,
                rgba(2, 204, 252, 1),
                rgba(52, 128, 216, 1));
        border-radius: 0.135rem;
        float: right;
        text-align: center;
        line-height: 1.072rem;
        margin-top: 0.208rem;

        span {
            font-size: 0.35rem;
            color: #fff;
            float: right;
            padding-right: 0.406rem;
        }
    }
}

.remenJb {
    padding: 0 0.28rem;
    height: 2.625rem;

    h1 {
        font-size: 0.32rem;
        padding: 0.3125rem 0 0.26rem 0.13rem;
        color: #606060;

        .gengduo {
            color: #00afc2;
            font-size: 0.26rem;
            float: right;
        }
    }

    div {
        span {
            float: left;
            width: 31.6%;
            height: 0.7rem;
            border: 2px solid #e4e4e4;
            text-align: center;
            word-wrap: normal;
            line-height: 0.7rem;
            margin-right: 1%;
            vertical-align: middle;
            border-radius: 0.13rem;
            font-size: 0.26rem;
            color: #7b7b7b;
            margin-bottom: 0.15rem;

            &:nth-of-type(3n) {
                margin-right: 0;
            }
        }
    }
}

.tuijian {
    h1 {
        font-size: 0.32rem;
        padding: 0.3125rem 0 0.26rem 0.447rem;
        color: #606060;
    }

    >div {
        width: 96%;
        height: 3.3rem;
        border-bottom: 0.02rem solid #e9e9e9;
        font-size: 0.28rem;
        padding-bottom: .66rem;

        img {
            float: left;
            width: 0.85rem;
            height: 0.85rem;
            border-radius: 50%;
            margin-top: 0.197rem;
        }

        div {
            float: left;
            width: 80%;
            //padding-left: 20px;
            transform: translateX(3%);

            &:nth-of-type(1) {
                color: #606060;
                padding-top: 0.12rem;
            }

            &:nth-of-type(2) {
                color: #bababa;
                padding-top: 0.166rem;
                height: 0.30rem;
                line-height: 0.3125rem;
                overflow: hidden;
            }

            &:nth-of-type(3) {
                color: #fff;
                padding-top: 0.197rem;

                span {
                    float: left;
                    margin-right: 0.1rem;
                    padding: 0.08rem 0.156rem;
                    background: #00afc2;
                    border-radius: 0.3125rem;
                    margin-bottom: 0.1rem;
                }
            }
        }
    }
}

.tabList {
    .tab {
        width: 94%;
        height: 0.83rem;
        margin: 0 auto;
        padding: 0.1rem 0;

        span {
            width: 20%;
            text-align: center;
            line-height: 0.63rem;
            color: #b9b9b9;
            font-size: 0.29rem;
            float: left;
        }

        span.borderB {
            border-bottom: 0.02rem solid #00b0c2;
            color: #00b0c2;
        }
    }
}

.detailList {
    padding: 0 0.375rem;

    >div {
        width: 100%;
        height: 1.63rem;
        padding-bottom: 1rem;
        border-bottom: 0.02rem solid #f1f1f1;

        div {
            font-size: 0.26rem;
            color: #7a7a7a;
            padding-top: 0.33rem;
            float: left;
            width: 70%;
            height: 0.6rem;
            line-height: 0.3125rem;
            overflow: hidden;
        }

        p {
            font-size: 0.24rem;
            color: #bbbbbb;
            padding-top: 0.2333rem;
            float: left;
            width: 65%;
        }

        img {
            // display: block;
            width: 28%;
            height: 114px;
            border-radius: 13px;
            float: right;
            margin-top: 20px;
        }
    }
}
</style>
