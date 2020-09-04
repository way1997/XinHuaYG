<template>
<div class="center">
    <div class="wrap">
        <div class="head">
            <img :src="doctorImgUrl" alt="" @touchstart="genrenxinxi">
            <p>{{doctorName}}</p>
            <!--<div class="renzheng" @touchstart='goRenzheng'>已认证</div> -->
            // <div class="renzheng">{{renzhentext}}</div>
            <div class="renzheng" @touchstart='goRenzheng'>{{renzhengtate}}</div>
        </div>
        <div class="tabBtn">
            <div @touchstart="gochufang">
                <span>{{prescriptionSum}}</span>
                <span>处方数</span>
            </div>
            <div @touchstart="goHuanzhe">
                <span>{{patientDoctorSum}}</span>
                <span>患者数</span>
            </div>
            <div @touchstart="goliwu">
                <span>{{givingSum}}</span>
                <span>礼物数</span>
            </div>
        </div>
        <div style="clear:both"></div>
        <div class="list">
            <p @click="goJifen"><span>我的积分</span><img src="../assets/img/you.png" alt=""></p>
            <p @click="goMoban"><span>药方模板</span><img src="../assets/img/you.png" alt=""></p>
            <p @click="goQueren"><span>确认处方</span><img src="../assets/img/you.png" alt=""><em v-if="chufangNum!=0">{{chufangNum}}</em></p>
            <p @click="goBukejian"><span>不可见患者</span><img src="../assets/img/you.png" alt=""></p>
            <p @click="xiugaiPsd"><span>修改密码</span><img src="../assets/img/you.png" alt=""></p>
            <!-- <p @click="chongzhiZh"><span>重置账户</span><img src="../assets/img/you.png" alt=""></p> -->
            <p @click="lianxiKf"><span>联系客服</span><img src="../assets/img/you.png" alt=""></p>
            <p @click="tuichuDl"><span>退出登录</span><img src="../assets/img/you.png" alt=""></p>
        </div>
    </div>
    <!--热线电话-->
    <div class="dianZhe" v-show="dianhua">
        <div class="dianhua">
            <div class="headDian">热线电话<img src="../assets/img/quxiao.png" alt="" @touchstart="quxiao"></div>
            <p><span>客服热线：400-188-1081</span><a href="tel:400-188-1081"><button>拨打热线</button></a></p>
        </div>
    </div>
    <!--退出登录-->
    <div class="tuichu" v-show="tuichu">
        <div class="queren">
            <div class="headTui">消息提示</div>
            <p>是否确认退出登录？</p>
            <button @touchstart="quxiaoTc">取消</button>
            <button @touchstart="querenTui">退出登录</button>
        </div>
    </div>
    <!--重置-->
    <div class="tuichu" v-show="chongzhi">
        <div class="queren">
            <div class="headTui">消息提示</div>
            <p class="zhiSucces">账户重置成功</p>
            <button class="chongQue" @touchstart="quedingCz">确定</button>
        </div>
    </div>
    <!--修改密码-->
    <div class="xiugaimima" v-show="xiugai">
        <div class="xiugai">
            <div class="headXiu">修改密码</div>
            <div class="mima">
                <span>手机号:</span><input type="tel" placeholder="输入手机号" v-model="zhucePhone">
            </div>
            <div class="mima">
                <span>原始密码</span><input type="text" placeholder="输入当前密码" v-model="jiupassword">
            </div>
            <div class="mima">
                <span>新密码</span><input type="text" placeholder="输入新密码" v-model="password">
            </div>
            <div class="mima">
                <span>重复密码</span><input type="text" placeholder="再次输入新密码" v-model="passwordAgin">
            </div>
            <button @touchstart="quxiaoPsd">取消</button>
            <button @touchstart="doctorUpdPassword">确认修改</button>
        </div>
    </div>
    <!--登录-->
    <div class="xiugaimima" v-if="ifToken">
        <div class="xiugai">
            <div class="fangshi">
                <p :class="{lineD:lineIdx==0}" @touchstart="changeLine(0)">登录</p>
                <p :class="{lineD:lineIdx==1}" @touchstart="changeLine(1)">注册</p>
            </div>
            <div v-if="lineIdx==0&&mimadenglu">
                <div class="mima dengluPhone">
                    <span>手机号:</span><input type="tel" placeholder="输入手机号" v-model="dengluPhone">
                </div>
                <div class="mima">
                    <span>验证码:</span><input type="number" placeholder="输入验证码" v-model="dengluYzm" class="yanZm"><em @touchstart="yzmGet">{{countDownNum}}</em>
                </div>
                <div class="denglu" @touchstart="formSubmit(0)">登录</div>
                <p class="mimaDl" @touchstart="shoumima">密码登录</p>
            </div>
            <div v-if="!mimadenglu&&lineIdx==0">
                <div class="mima">
                    <span>手机号:</span><input type="tel" placeholder="输入手机号" v-model="mimaPhone">
                </div>
                <div class="mima">
                    <span>密码:</span><input type="password" placeholder="输入密码" v-model="mimaDlu">
                </div>
                <div class="denglu" @touchstart="formSubmit(1)">登录</div>
                <p class="mimaDl" @touchstart="shouYzm">验证码登录</p>
            </div>
            <div v-if="lineIdx==1">
                <div class="mima">
                    <span>姓名:</span><input type="text" placeholder="输入姓名" v-model="zhuceName">
                </div>
                <div class="mima">
                    <span>手机号:</span><input type="tel" placeholder="输入手机号" v-model="zhucePhone">
                </div>
                <div class="mima">
                    <span>验证码:</span><input type="number" placeholder="输入验证码" v-model="zhuceYzm" class="yanZm"><em @touchstart="doctorRegisteredNum">{{yanText}}</em>
                </div>
                <div class="denglu">注册</div>
            </div>
        </div>
    </div>

    <tabBar />
</div>
</template>

<script>
import {
    homePage,
    openIdMsg,
    delOpenId,
    doctorLoginNum,
    doctorLogin,
    doctorRegisteredNum,
    doctorUpdPassword,
    doctorRegister,
    findPhotoPrescription,
    getOpendIdString,
    saveMsg
} from "api/doctor"
import router from '../router'
import cookie from "js-cookie"
import tabBar from '../components/patientTabBar'
export default {
    name: "center",
    data() {
        return {
            pageName: '个人中心',
            dianhua: false,
            tuichu: false,
            chongzhi: false,
            xiugai: false,
            token: "",
            doctorId: '',
            // token: '13121557865:1595277654852:1e7a2d010716874a108ac59e82080baa',
            // patientId: '8101155e0f1d48eb96c3fb31100bdf20',
            state: '',
            doctorName: '点击登录',
            renzhengtate: '去认证 >',
            renzhentext: '医疗资质未认证',
            renzhenhide: true,
            doctorImgUrl: require("../assets/img/head1.jpg"),
            prescriptionSum: '0',
            patientDoctorSum: '0',
            givingSum: '0',
            jiupassword: '',
            password: '',
            passwordAgin: '',
            lineIdx: 0,
            ifToken: false,
            dengluPhone: '',
            dengluYzm: '',
            yanzhengmaD: '',
            zhuceName: '',
            zhucePhone: '',
            zhuceYzm: '',
            yanzhengmaZ: '',
            yanText: '获取验证码',
            countdown: 60,
            disBtn: false,
            countDownNum: '获取验证码',
            mimadenglu: false,
            mimaPhone: '',
            mimaDlu: '',
            hospitalId: '',
            code: '',
            appid: 'wxa7fbb44a5513322e',
            secret: '7d9ae84538caf6ae7b70800aa02716d0',
            chufangNum: 0,
            openId: ''

        }
    },
    created() {
        this.openId = this.$route.query.openid;
        //      alert(this.openId);
        this.token = cookie.get('token')
        this.doctorId = cookie.get('doctorId')
        // console.log(this.token, this.doctorId)
        this.openIdMsg();
        // cookie.set("token",this.token)
        // cookie.set("doctorId",this.doctorId)

        if (!cookie.get('token') && !cookie.get('doctorId')) {
            this.ifToken = true;
        } else {
            this.homePage();
        }

    },
    mounted() {
        let state = this.$route.params.state
        console.log(state)
        if (state) {
            this.state = state
            if (this.state == 0) {

                this.renzhengtate = '审核中'

            } else if (this.state == 3) {

                this.renzhengtate = '去认证 >'

            } else if (this.state == 2) {

                this.renzhengtate = '去认证 >'

            } else if (this.state == 1) {

                this.renzhengtate = '已认证'

            }
        }
    },
    computed: {

    },

    methods: {
        openIdMsg() {
            if (this.openId == '' || this.openId == null || this.openId == 'null' || this.openId == 'undefined') {
                // window.location.href = 'https://www.mfzhosp.com/mkkMoblie/accessToken/openIdMsg?type=2&token=123456&id=123456&uri=https://www.mfzhosp.com/H5/@/homePage';

            }
        },
        GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        shoumima() {
            this.mimadenglu = false;
        },
        shouYzm() {
            this.mimadenglu = true;
        },
        changeLine(index) {
            this.lineIdx = index;
        },
        findPhotoPrescription() {
            let list = {
                token: cookie.get('token'),
                doctorId: cookie.get('doctorId')
            }
            findPhotoPrescription(list).then((res) => {
                //console.log(res);
                let numArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].sendStatus == 0) {
                        numArr.push(res.data[i]);
                    }
                }
                this.chufangNum = numArr.length;
                console.log(this.chufangNum, numArr)
            })
        },
        genrenxinxi() {
            if (this.doctorName == '点击登录') {
                this.ifToken = true;
            } else {
                this.ifToken = false;
                this.$router.push('/bianjiCenter')
            }
        },
        goliwu() {
            this.$router.push('/liwushu')
        },
        gochufang() {
            this.$router.push('/chufangshu')
        },
        goQueren() {
            this.$router.push('/querenchufang')
        },
        goJifen() {
            this.$router.push('/myjifen')
        },
        goBukejian() {
            this.$router.push('/bukejian')
        },
        doctorRegister() {
            if (this.test1()) {
                let list = {
                    doctorName: this.zhuceName,
                    phone: this.zhucePhone,
                    yzm: this.zhuceYzm,
                    hospitalId: this.hospitalId,
                    code: this.area,
                    appid: this.appid,
                    secret: this.secret
                }
                doctorRegister(list).then((res) => {
                    if (res.info == 1005) {
                        this.$toast('注册成功,请先登录');
                        this.lineIdx = 0;
                    } else {
                        this.$toast(res.massage)
                    }
                })
            }
        },
        testR() {

        },
        homePage() {
            let list = {
                type: 1,
                token: cookie.get('token'),
                doctorId: cookie.get('doctorId')
            }
            homePage(list).then((res) => {
                console.log(res);
                if (res.type == true) {
                    this.doctorName = res.data.doctorName;
                    this.doctorImgUrl = res.data.doctorImgUrl;
                    if (res.data.doctorImgUrl == '') {
                        this.doctorImgUrl = require("../assets/img/head1.jpg");
                    }
                    cookie.set("token", res.token)
                    cookie.set("doctorId", res.data.doctorId)
                    cookie.set('doctorImgUrl', res.data.doctorImgUrl);
                    cookie.set('doctorName', this.doctorName);
                    this.prescriptionSum = res.data.prescriptionSum;
                    this.patientDoctorSum = res.data.patientDoctorSum;
                    this.givingSum = res.data.givingSum;
                    this.state = res.data.state
                    this.findPhotoPrescription();
                    this.saveMsg();

                    // let state = this.$route.params.state
                    // console.log(state)

                    //------------
                    if (this.state == 0) {

                        this.renzhengtate = '审核中',
                            this.renzhentext = '已完成资料上传',
                            this.renzhenhide = false

                    } else if (this.state == 3) {

                        this.renzhengtate = '去认证 >',
                            this.renzhentext = '医疗资质未认证',
                            this.renzhenhide = true

                    } else if (this.state == 2) {

                        this.renzhengtate = '去认证 >',
                            this.renzhentext = '审核未通过',
                            this.renzhenhide = false

                    } else if (this.state == 1) {

                        this.renzhengtate = '已认证',
                            this.renzhenhide = false,
                            this.renzhentext = ''

                    }
                } else {
                    // this.genrenxinxi();
                }

            })
        },
        saveMsg() {
            let list = {
                doctorId: cookie.get('doctorId'),
                openId: this.openId,
                unionId: ''
            }
            saveMsg(list).then((res) => {

            })
        },
        xiugaiPsd() {
            this.xiugai = true;
        },
        chongzhiZh() {
            let list = {
                token: this.token,
                tel: cookie.get('doctorPhone'),
                type: 2
            }
            delOpenId(list).then((res) => {
                if (res.type == true) {
                    this.chongzhi = true;
                }
            })
        },
        goHuanzhe() {
            this.$router.push('/huanzhe')
        },
        goMoban() {
            this.$router.push('/moban')
        },
        lianxiKf() {
            this.dianhua = true;
        },
        tuichuDl() {
            this.tuichu = true;
        },
        quxiao() {
            this.dianhua = false;
        },
        quxiaoTc() {
            this.tuichu = false;
        },
        querenTui() {
            cookie.set('token', "");
            cookie.set('doctorId', "");
            window.location.reload()
            this.ifToken = true;
        },
        quedingCz() {
            this.chongzhi = false;

        },
        quxiaoPsd() {
            this.xiugai = false;
        },
        yzmGet() {
            if (this.testD) {
                let list = {
                    phone: this.dengluPhone
                }
                doctorLoginNum(list).then((res) => {
                    //if(res.info == 1008){
                    this.$toast('发送成功');
                    this.yanzhengmaD = res.info;
                    this.timeOutD();
                    // }
                    //if(res.info == 1007){
                    // this.$toast('请先注册哦');
                    //}
                })
            }
        },
        formSubmits() { //密码登录
            if (this.test) {
                let phone = '';
                let list = {
                    phone: this.mimaPhone,
                    passWord: this.mimaDlu,
                    loginType: 2
                }
                doctorLogin(list).then((res) => {
                    if (res.info == 1008) {
                        cookie.set('token', res.token);
                        cookie.set('doctorId', res.doctorId);
                        cookie.set('doctorName', res.doctorName);
                        this.ifToken = false;
                        this.homePage();
                    } else if (res.info == 1007) {
                        this.$toast('密码错误或该用户不存在')
                    }
                })
            }
        },
        formSubmit(index) { //验证码登录
            if (index == 0) {
                if (this.test1 && this.testMi1) {
                    let list = {
                        phone: this.dengluPhone,
                        yzm: this.dengluYzm,
                        loginType: 1
                    }
                    doctorLogin(list).then((res) => {
                        if (res.info == 1008) {
                            cookie.set('token', res.token);
                            cookie.set('doctorId', res.doctorId);
                            cookie.set('doctorName', res.doctorName);
                            cookie.set('doctorPhone', this.dengluPhone);
                            this.ifToken = false;
                            this.saveMsg();
                            this.homePage();
                        } else if (res.info == 1007) {
                            this.$toast('登录失败')
                        }
                    })
                }
            } else {
                this.formSubmits();
            }
        },
        test() {
            if (this.mimaPhone == '') {
                this.$toast('请输入手机号')
                return false;
            } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.mimaPhone))) {
                this.$toast('手机号码格式不正确');
                return false;
            } else if (this.mimaDlu == '') {
                this.$toast('请输入密码')
                return false;
            } else {
                return true
            }
        },
        testD() {
            if (this.dengluPhone == '') {
                this.$toast('请输入手机号')
                return false;
            } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.dengluPhone))) {
                this.$toast('手机号码格式不正确');
                return false;
            } else {
                return true
            }
        },
        doctorRegisteredNum() { //注册获取验证码
            if (this.testZ()) {
                let list = {
                    phone: this.zhucePhone
                }
                doctorRegisteredNum(list).then((res) => {
                    this.$toast('发送成功');
                    this.yanzhengmaZ = res.info;
                    this.timeOutZ();
                })
            }
        },
        doctorUpdPassword() { //修改密码
            if (this.testZ()) {
                let list = {
                    passWord: this.jiupassword,
                    newPassWord: this.password,
                    newPassWord2: this.passwordAgin,
                    doctorId: this.doctorId,
                    token: this.token
                }
                console.log(list);
                doctorUpdPassword(list).then((res) => {
                    if (res.type == true) {
                        this.$toast('修改成功')
                        this.xiugai = false;
                    } else {
                        this.$toast(res.massage)
                    }
                })
            }
        },
        test1() {
            if (this.zhuceName == '') {
                this.$toast('请输入姓名')
                return false;
            } else if (this.zhucePhone == '') {
                this.$toast('请输入手机号')
                return false;
            } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.zhucePhone))) {
                this.$toast('手机号码格式不正确');
                return false;
            } else if (this.zhuceYzm == '') {
                this.$toast('请输入验证码')
                return false;
            } else if (this.zhuceYzm != this.yanzhengmaZ) {
                this.$toast('验证码错误')
                return false;
            } else {
                return true
            }
        },
        testZ() {
            if (this.zhucePhone == '') {
                this.$toast('请输入手机号')
                return false;
            } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.zhucePhone))) {
                this.$toast('手机号码格式不正确');
                return false;
            } else {
                return true
            }
        },
        timeOutD() {
            let _this = this;
            _this.countdown = 60;
            _this.disBtn = true;
            if (_this.countdown == 0) {
                _this.disBtn = false;
                _this.countDownNum = "获取验证码";
                _this.countdown = 60;
            } else {
                _this.disBtn = true;
                _this.countdown--;
                _this.countDownNum = "重新发送" + _this.countdown + "s";
                setTimeout(function () {
                    _this.timeOutD();
                }, 1000)
            }
        },
        timeOutZ() {
            let _this = this;
            _this.countdown = 60;
            _this.disBtn = true;
            if (_this.countdown == 0) {
                _this.disBtn = false;
                _this.yanText = "获取验证码";
                _this.countdown = 60;
            } else {
                _this.disBtn = true;
                _this.countdown--;
                _this.yanText = "重新发送" + _this.countdown + "s";
                setTimeout(function () {
                    _this.timeOutZ();
                }, 1000)
            }
        },
        goRenzheng() {
            this.$router.push({
                name: 'renzhengUser',
                params: {
                    token: this.token,
                    doctorId: this.doctorId
                }
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

.wrap {
    width: 704px;
    height: 100%;
    margin: 0 auto;
    padding-bottom: 200px;
}

.head {
    width: 706px;
    height: 244px;
    background: linear-gradient(-47deg, rgba(188, 247, 233, 1), rgba(84, 202, 204, 1), rgba(110, 156, 222, 1));
    box-shadow: 1px 10px 39px 0px rgba(4, 0, 0, 0.35);
    border-radius: 13px;
    padding-top: 37px;
    margin-top: 16px;

    img {
        width: 132px;
        height: 132px;
        display: block;
        margin: 0 auto;
        border-radius: 50%;
    }

    p {
        width: 100%;
        text-align: center;
        font-size: 25px;
        color: #fff;
        padding-top: 33px;
    }

    .renzheng {
        width: 108px;
        height: 50px;
        background: linear-gradient(-47deg, rgba(253, 226, 114, 1), rgba(254, 128, 124, 1));
        border-radius: 7px;
        color: #fff;
        font-size: 25px;
        position: absolute;
        right: 29px;
        top: 29px;
        text-align: center;
        line-height: 50px;
    }
}

.tabBtn {
    width: 706px;
    height: 127px;
    background: linear-gradient(-47deg, rgba(188, 247, 233, 1), rgba(84, 202, 204, 1), rgba(110, 156, 222, 1));
    box-shadow: 1px 10px 39px 0px rgba(4, 0, 0, 0.35);
    border-radius: 13px;
    margin-top: 10px;

    div {
        color: #fff;
        font-size: 25px;
        width: 33%;
        text-align: center;
        line-height: 37px;
        float: left;
        padding-top: 25px;

        span {
            display: block;
        }
    }
}

.list {
    width: 100%;
    padding-top: 34px;

    p {
        width: 100%;
        height: 84px;
        border-bottom: 1px solid #ebebeb;
        line-height: 84px;
        clear: both;

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
            opacity: 0.5;
        }

        &:last-child {
            border-bottom: none;
        }

        em {
            float: right;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            color: #fff;
            background: red;
            font-size: 22px;
            text-align: center;
            line-height: 30px;
            margin-top: 20px;
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

.tuichu {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);

    .queren {
        width: 658px;
        height: 393px;
        background: rgba(255, 255, 255, 1);
        border-radius: 13px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .headTui {
            width: 100%;
            height: 86px;
            border-bottom: 1px solid #a7a7a7;
            text-align: center;
            line-height: 86px;
            font-size: 25px;
            color: #878787;
        }

        p {
            font-size: 25px;
            color: #878787;
            width: 100%;
            text-align: center;
            line-height: 160px;
        }

        button {
            width: 275px;
            height: 65px;
            background: rgba(84, 213, 210, 1);
            border-radius: 13px;
            color: #fff;
            font-size: 25px;
            border: none;

            &:nth-of-type(1) {
                margin-left: 36px;
            }

            &:nth-of-type(2) {
                background: rgba(253, 126, 126, 1);
            }
        }
    }
}

.tuichu .queren .chongQue:nth-of-type(1) {
    width: 299px;
    height: 65px;
    background: rgba(84, 213, 210, 1);
    border-radius: 13px;
    margin-left: 170px;
}

.tuichu .queren .zhiSucces {
    line-height: 80px;
    padding-top: 40px;
}

.xiugaimima {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;

    .xiugai {
        width: 658px;
        height: 696px;
        background: rgba(255, 255, 255, 1);
        border-radius: 13px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .headXiu {
            width: 100%;
            height: 86px;
            border-bottom: 1px solid #a7a7a7;
            text-align: center;
            line-height: 86px;
            font-size: 25px;
            color: #878787;
        }

        .mima {
            height: 70px;
            line-height: 70px;
            font-size: 25px;
            color: #878787;
            padding-top: 30px;
            padding-left: 42px;

            span {
                float: left;
                width: 111px;
            }

            input {
                width: 414px;
                height: 68px;
                border: 1px solid #c9c9c9;
                font-size: 25px;
                border-radius: 68px;
                padding-left: 20px;
                color: #878787;
                background: none;
                -webkit-appearance: none;
            }

            input::-webkit-input-placeholder {
                color: #c9c9c9;
                font-size: 25px;
            }

            input.yanZm {
                width: 260px;
            }

            em {
                font-size: 25px;
                color: #42cac6;
                float: right;
                padding-right: 60px;
            }
        }

        .dengluPhone {
            padding-top: 80px;
        }

        button {
            width: 275px;
            height: 65px;
            background: rgba(84, 213, 210, 1);
            border-radius: 13px;
            color: #fff;
            font-size: 25px;
            border: none;
            margin-top: 80px;

            &:nth-of-type(1) {
                margin-left: 36px;
            }

            &:nth-of-type(2) {
                background: rgba(253, 126, 126, 1);
            }
        }
    }

    .mimaDl {
        color: #42cac6;
        font-size: 25px;
        padding-top: 40px;
        float: right;
        width: 150px;
    }

    .fangshi {
        width: 570px;
        height: 96px;
        color: #828282;
        font-size: 27px;
        margin: 0 auto;

        p {
            width: 50%;
            height: 100%;
            line-height: 96px;
            text-align: center;
            float: left;
        }

        p.lineD {
            border-bottom: 1px solid #42cac6;
            color: #42cac6;
        }
    }

    .denglu {
        width: 570px;
        height: 75px;
        background: #42cac6;
        color: #fff;
        text-align: center;
        line-height: 75px;
        margin: 0 auto;
        font-size: 27px;
        margin-top: 60px;
    }
}
</style>
