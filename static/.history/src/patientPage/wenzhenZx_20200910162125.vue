<template>
<div class="liaotian">
    <HeadTop :title="pageName" :backBlack="true"></HeadTop>
    <div class='page' ref="page">
        <div class='pages'>
            <div v-for="(item,index) in doctorIdList" :key="index">
                <div class='left_liao'>
                    <!-- 患者文字 -->
                    <div v-if="item.chatType==1">
                        <div v-if="item.sponsor==0">
                            <img :src='doctorImg' class='head_pic'>
                            <div class='liaotian_ck'>
                                <img class='ltjt' src='../assets/img/ltjt.png'>
                                <div class='liaotzs_wrap'>
                                    <div class='liaotzs'>{{item.chartComment}}</div>
                                </div>
                                <div class='lefttime'>{{item.sendTime}}</div>
                            </div>
                        </div>
                        <!-- 医生文字 -->
                        <div v-if="item.sponsor==1">
                            <img :src='imgUrl' class='head_pic head_pic1'>
                            <div class='liaotian_ck liaotian_ck1'>
                                <img class='ltjt ltjt1' src='../assets/img/ltjt.png'>
                                <div class='liaotzs_wrap1'>
                                    <div class='liaotzs1'>{{item.chartComment}}</div>
                                </div>
                                <div class='lefttime' style='float:right;margin-right:0.50rem'>{{item.sendTime}}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 图片 -->
                    <div v-if="item.chatType==2">
                        <!-- 医生图片 -->
                        <div v-if="item.sponsor==1">
                            <img :src='imgUrl' class='head_pic head_pic1'>
                            <img class='ltjt ltjt1' src='../assets/img/ltjt.png'>
                            <div class='liaotian_ck liaotian_ck1'>
                                <div class='liaotzs_wrap2' style='margin-right:20px;'>
                                    <img class='picurl' mode="widthFix" :src='item.chatPics' @touchstart="changebig(item.chatPics)">
                                </div>
                                <div class='lefttime' style='float:right;margin-right:0.26rem;'>{{item.sendTime}}</div>
                            </div>
                        </div>
                        <!-- 患者图片 -->
                        <div v-if="item.sponsor==0">
                            <img :src='doctorImg' class='head_pic'>

                            <div class='liaotian_ck'>
                                <div class='liaotzs_wrap2' style='margin-right:0.1rem;float:left;'>
                                    <img class='picurl' mode="widthFix" :src='item.chatPics' @touchstart="changebig(item.chatPics)">
                                </div>
                                <div class='lefttime' style='float:left'>{{item.sendTime}}</div>
                            </div>
                        </div>
                    </div>

                    <div v-if="item.chatType==3">
                        <!-- 医生语音 -->
                        <div v-if="item.sponsor==1" style="height: 0.4rem;" @touchstart="play(item.chatRoute1)">
                            <img :src='imgUrl' class='head_pic head_pic1'>
                            <div class='liaotian_ck liaotian_ck1'>
                                <img class='ltjt ltjt1' src='../assets/img/ltjt.png'>
                                <div class='liaotzs_wrap1'>
                                    <div class='liaotzs liaotzspi2' style='float:right;margin-top:0.03rem;margin-right:-0.4rem;text-aling:left;'>
                                        <img class='yuyinpic1' style='right:5px' src='../assets/img/yuyin1.png'>
                                        {{item.chartComment}}"
                                    </div>
                                    <div class='lefttime' style='float:right'>{{item.sendTime}}</div>
                                </div>
                            </div>
                        </div>
                        <!-- 患者语音 -->
                        <div v-if="item.sponsor==0" @touchstart="play(item.chatRoute1)" style="height: 0.4rem;">
                            <img :src='doctorImg' class='head_pic'>
                            <div class='liaotian_ck'>
                                <img class='ltjt' src='../assets/img/ltjt.png'>
                                <div class='liaotzs_wrap'>
                                    <div class='liaotzs liaotzspi'>
                                        <img class='yuyinpic' src='../assets/img/yuyin1.png'>
                                        {{item.chartComment}}"
                                    </div>
                                    <div class='lefttime'>{{item.sendTime}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 文章 -->
                    <div v-if="item.chatType==9||item.chatType==13">
                        <!-- 患者 -->
                        <div v-if="item.sponsor==0" bindtap='article'>
                            <img :src='doctorImg' class='head_pic'>
                            <div class='liaotian_ck'>
                                <img class='ltjt' src='../assets/img/tiaolijt.png'>
                                <div class='liaotzs_wrap1' bindtap='lookwenzhen'>
                                    <div class='liaotzs1 tiaoli_bac tiaoli' style='float:left;margin-left:-0.06rem;margin-top:-0.19rem;'>
                                        <div class='tiaoli_top'>
                                            <img class='tiaoli_top_img' src='../assets/img/l12.png'>
                                            <div class='tiaoli_top_div'>这是文章推送，文章精选帮助你解决病痛困扰，认真阅读一定可以帮助到你，多谢！</div>
                                        </div>
                                        <div class='tiaoli_bot'>
                                            查看详情
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='lefttime' style='float:left;margin-left:0.93rem;'>{{item.sendTime}}</div>
                        </div>
                    </div>
                    <!-- 评价 -->
                    <div v-if="item.chatType==7">

                        <!-- 患者 -->
                        <div v-if="item.sponsor==0&&item.state==0" bindtap='comment'>
                            <img :src='doctorImg' class='head_pic'>
                            <div class='liaotian_ck'>
                                <img class='ltjt' src='../assets/img/tiaolijt.png'>
                                <div class='liaotzs_wrap1' bindtap='lookwenzhen'>
                                    <div class='liaotzs1 tiaoli_bac tiaoli' style='float:left;margin-left:-0.06rem;margin-top:-0.19rem;'>
                                        <div class='tiaoli_top'>
                                            <img class='tiaoli_top_img' src='../assets/img/l8.png' style="height:30px;margin-top:0.04rem;">
                                            <div class='tiaoli_top_div'>欢迎对服务进行评价</div>
                                        </div>
                                        <div class='tiaoli_bot'>
                                            邀请评价
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class='lefttime' style='float:left;margin-left:0.95rem;'>{{item.sendTime}}</div>
                        </div>
                    </div>

                    <!-- 坐诊 -->
                    <div v-if="item.chatType==8">
                        <!-- 医生 -->
                        <div v-if="item.sponsor==0" bindtap='visit'>
                            <img :src='doctorImg' class='head_pic'>
                            <div class='liaotian_ck'>
                                <img class='ltjt' src='../assets/img/tiaolijt.png'>
                                <div class='liaotzs_wrap1' bindtap='lookwenzhen'>
                                    <div class='liaotzs1 tiaoli_bac tiaoli' style='float:left;margin-left:-0.06rem;margin-top:-0.19rem;'>
                                        <div class='tiaoli_top'>
                                            <img class='tiaoli_top_img' src='../assets/img/xt2.jpg'>
                                            <div class='tiaoli_top_div'>请关注我的坐诊信息</div>
                                        </div>
                                        <div class='tiaoli_bot'>
                                            关注坐诊信息
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='lefttime' style='float:left;margin-left:0.93rem;'>{{item.sendTime}}</div>
                        </div>

                    </div>

                    <!-- 开方 -->
                    <div v-if="item.chatType==4">
                        <!-- 患者 -->
                        <div v-if="item.sponsor==0" bindtap='medicine'>
                            <img :src='doctorImg' class='head_pic'>
                            <div class='liaotian_ck'>
                                <img class='ltjt' src='../assets/img/tiaolijt.png'>
                                <div class='liaotzs_wrap1' bindtap='lookwenzhen' @touchstart="medicine(item.entityId)">
                                    <div class='liaotzs1 tiaoli_bac tiaoli' style='float:left;margin-left:-0.06rem;margin-top:-0.19rem;'>
                                        <div class='tiaoli_top'>
                                            <img class='tiaoli_top_img' src='../assets/img/tiaoli.jpg'>
                                            <div class='tiaoli_top_div'> 已为您制定药方</div>
                                        </div>
                                        <div class='tiaoli_bot'>
                                            点此选择药店完成购药
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='lefttime' style='float:left;margin-left:0.99rem;'>{{item.sendTime}}</div>
                        </div>
                    </div>

                    <div v-if="item.chatType==12">
                        <!-- 医生正 -->
                        <div v-if="item.sponsor==0" bindtap='gonggao'>
                            <img :src='doctorImg' class='head_pic'>
                            <div class='liaotian_ck'>
                                <img class='ltjt' src='../assets/img/tiaolijt.png'>
                                <div class='liaotzs_wrap1' bindtap='lookwenzhen'>
                                    <div class='liaotzs1 tiaoli_bac tiaoli' style='float:left;margin-left:-0.6rem;margin-top:-0.19rem;'>
                                        <div class='tiaoli_top'>
                                            <img class='tiaoli_top_img' src='../assets/img/gonggao.png'>
                                            <div class='tiaoli_top_div'>最新公告</div>
                                        </div>
                                        <div class='tiaoli_bot'>
                                            请查看我的公告
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='lefttime' style='float:left;margin-left:0.94rem;'>{{item.sendTime}}</div>
                    </div>

                    <!-- 问诊单 -->
                    <div v-if="item.chatType==5||item.chatType==10||item.chatType==11">
                        <!-- 患者正 -->
                        <div v-if="item.sponsor==1" bindtap='answerId'>
                            <img :src='imgUrl' class='head_pic head_pic1'>
                            <div class='liaotian_ck liaotian_ck1'>
                                <img class='ltjt ltjt1' src='../assets/img/tiaolijt.png'>
                                <div class='liaotzs_wrap1 tiaoli'>
                                    <div class='liaotzs1 tiaoli_bac tiaoli'>
                                        <div class='tiaoli_top'>
                                            <img class='tiaoli_top_img' src='../assets/img/xt2.jpg'>
                                            <div class='tiaoli_top_div'>{{patientName}}的问诊单</div>
                                        </div>
                                        <div class='tiaoli_bot'>
                                            已提交问诊单请查看
                                        </div>
                                    </div>
                                </div>
                                <div class='lefttime' style='float:right;margin-right:0.50rem;'>{{item.sendTime}}</div>
                            </div>
                        </div>
                        <!-- 医生正 -->
                        <div v-if="item.sponsor==0" bindtap='fillouttext'>
                            <img :src='doctorImg' class='head_pic'>
                            <div class='liaotian_ck'>
                                <img class='ltjt' src='../assets/img/tiaolijt.png'>
                                <div class='liaotzs_wrap1' bindtap='lookwenzhen'>
                                    <div class='liaotzs1 tiaoli_bac tiaoli' style='float:left;margin-left:-0.06rem;margin-top:-0.19rem;'>
                                        <div class='tiaoli_top'>
                                            <img class='tiaoli_top_img' src='../assets/img/tiaoli.jpg'>
                                            <div class='tiaoli_top_div'>{{patientName}}的问诊单</div>
                                        </div>
                                        <div class='tiaoli_bot'>
                                            请填写
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='lefttime' style='float:left;margin-left:0.94rem;'>{{item.sendTime}}</div>
                        </div>
                    </div>
                    <div style='width:100%;clear:both;'>
                    </div>
                </div>
                <div v-if="item.chatType==6&&item.sponsor==0">
                    <div class="zens">医生已向您赠送1次免费诊后咨询机会，
                        <text class="kdc" bindtap='upload'>点此可继续与医生沟通病情</text>
                    </div>
                </div>
                <div class='hist' v-if="item.chatType==0&&item.sponsor==0">
                    {{item.chartComment}}
                </div>
                <div style='width:100%;clear:both;height:1rem;'></div>
            </div>

        </div>

        <div class="foot1" :style="{bottom:he+'px'}">

            <div class='line' v-if="voic2">
                <img src="../assets/img/bof.jpg" class="las"><!--  @touchstart='voice1'-->

                <div class='huihua'>
                    <input style='line-height:o.65rem;height:0.65rem;' name="text" v-model='kongtext' auto-height maxlength='-1'>
                </div>
                <div class="fatu">
                    <div form-type='submit' class='fasong_but' bindtap="tpsumit">发送图片</div>
                    <input ref="input" class="uploadPhoto" type="file" name="upload" accept="image/*" limit="1" @change="handleFileChange">
                </div>
                <div>
                    <div form-type='submit' class='fasong_but1' @touchstart="addChatContent">发送文字</div>
                </div>
            </div>
            <div class='line' v-if="!voic2">
                <img src="../assets/img/jianpan.png" @touchstart='voice2' class='bof'>
                <div class='speakbuton' oncopy="return false" hover-class='speakbuton_1' @touchstart="mytouchstart" @touchend="mytouchend">按住说话-不要单击</div>
                <!-- <div style="position: absolute;
                background: rgb(0, 255, 255);
                width: 5.24rem;
                font-size: 0.26rem;
                height: 0.8rem;
                left: 21%;
                top: 35%;
                opacity: 1"></div> -->
            </div>
        </div>

    </div>

    <div class='zhezhao' v-if="newAnswerGo"></div>
    <div class='enter' v-if="newAnswerGo">
        <div class='guanbi' bindtap="newAnswerGo1">
            <img src='../assets/img/buanbip.png'>
        </div>
        <div class='enter_tit'>您没有剩余次数了</div>
        <div class='enter_but'>
            <button bindtap="newAnswerGo1">取消</button>
            <button bindtap='purchase'>去购买</button>
        </div>
    </div>

    <div class='yuyinT' v-if="yuyinhidden">
        <img class='yuyinTimg' src='../assets/img/huatong.gif'>
    </div>
    <div class="yulanBig" v-if="showbigImg" @touchstart="hideBigPic">
        <img :src="bigPic" alt="">
    </div>

</div>
</template>

<script>
import {
    findPatientMsg,
    getChatContent,
    myArticle,
    addChatContent,
    sendMsg6
} from "api/doctor"
import HeadTop from "base/header/header"
import router from "../router"
import cookie from "js-cookie"
import $ from 'jquery'
import baseURI from 'api/env'
import axios from 'axios'
import wx from "weixin-js-sdk"
var socket;
var date = new Date();
var date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' +
    date.getMinutes() + ':' + date.getSeconds();
export default {
    name: "liaotian",
    data() {
        return {
            pageName: "聊天",
            token: "",
            doctorId: "",
            chartComment: '',
            none: "none",
            pic: 'l13.jpg',
            text: '更多功能',
            qingchu: 'block',
            showModal: false,
            photo: [],
            photos: [],
            list: [],
            speakbutonx: 'none',
            speakbutony: 'none',
            doctorIdList: '',
            kongtext: '',
            showModalH: '',
            article: '',
            completetext: '',
            completetextH: '',
            complete: '',
            yuyinhidden: '',
            patientId: '',
            doctorImg: '',
            imgUrl: '',
            chatId: '',
            doctorName: '',
            patientName: '',
            chatType: 1,
            item: '',
            index: '',
            he: '',
            voic1: true,
            voic2: true,
            newAnswerGo: '',
            tab: 1,
            n: 0,
            list: [],
            photo: [],
            listLiao: [],
            placeholder: '购买复诊后和医生说话',
            disabled: 'false',
            chartComment: '',
            status: true,
            he: 0,
            showbigImg: false,
            bigPic: '',
            timeS: 0,
            localId: '',
            serverId: '',
            timer: null
        }
    },
    created() {
        this.$nextTick(function () {
            this.token = cookie.get("token");
            this.doctorId = this.$route.query.doctorId;
            this.doctorImg = this.$route.query.doctorImg;

            this.doctorName = this.$route.query.doctorName;
            this.patientId = cookie.get("patientId");
            this.imgUrl = cookie.get("patientImgUrl");
            this.patientName = cookie.get("patientName");
            //this.findPatientMsg();
            this.getChatContent();
            this.getWxConfig();
            this.socketOpen();
        });
        //  this.timer = window.setInterval(() => {
        //    setTimeout(this.getChatContent(), 0);
        // }, 3000);
    },
    computed: {

    },
    beforeDestroy() {
        if (this.timer) { //如果定时器还在运行 或者直接关闭
            clearInterval(this.timer); //关闭
        }
    },
    methods: {
        socketOpen() {
            if ("WebSocket" in window) {
                var ws = new WebSocket('wss://www.mfzhosp.com/wss?aa=' + this.patientId, );
                socket = ws;
                ws.onopen = function () {
                    console.log('连接成功');
                };

                ws.onmessage = (evt) => {
                    var received_msg = evt.data;
                    var listLiao = this.doctorIdList;
                    console.log(received_msg);
                    var res_data = JSON.parse(received_msg);
                    var nssz = res_data.content;
                    var nsz = nssz.split('^');
                    console.log(nsz[0])
                    console.log(nsz[1])
                    if (this.doctorId == nsz[1]) {
                        var lsarr = JSON.parse(nsz[0])
                        var wztext = {
                            chartComment: lsarr.chartComment,
                            chatPics: lsarr.chatPics,
                            chatType: lsarr.chatType,
                            entityId: lsarr.entityId,
                            id: lsarr.id,
                            sendTime: lsarr.sendTime,
                            sponsor: lsarr.sponsor,
                            state: lsarr.state,
                            chatRoute: '', //////
                            chatVoices: lsarr.chatVoices
                        }
                        listLiao.push(wztext);
                        this.doctorIdList = listLiao;
                    }
                };
                ws.onclose = function () {
                    console.log("断开了连接");
                };
            } else {
                console.log("浏览器不支持WebSocket");
            }
        },
        findPatientMsg() {
            let list = {
                patientId: this.patientId
            }
            findPatientMsg(list).then((res) => {
                console.log(res);
                this.pageName = res.patient.patientName,
                    this.patientpic = res.patient.imgUrl,
                    this.doctorImgUrl = res.patient doctorImgUrl,
                    //this.patientIds = patient,
                    //this.doctorIdres = doctorId,
                    this.patientName = res.patient.patientName,
                    this.speakbutony = 'none',
                    this.speakbutonx = 'none'
            })
        },
        getChatContent() {
            let list = {
                doctorId: this.doctorId,
                token: this.token,
                patientId: this.patientId,
                version: 1
            }
            getChatContent(list).then((res) => {
                //console.log(res);
                this.doctorIdList = res.chatList;
                this.chatId = res.chatId; //聊天id
            })
        },
        myArticle() {
            let list = {
                doctorId: this.doctorId,
                token: this.token
            }
            myArticle(list).then((res) => {
                //console.log(res);
                this.showModal = true;
                this.showModalH = 8.03;
                this.article = res.data;
                this.n = 1;
                this.none = "none";
                this.pic = 'l13.jpg';
                this.text = '更多功能';
            })
        },
        addChatContent() {
            if (this.kongtext == '') {
                this.$toast('不能发送空白消息');
                return false
            } else {
                let list = {
                    version: 1,
                    token: this.token,
                    chatId: this.chatId,
                    chatType: 1, //文字类型
                    chartComment: this.kongtext,
                    chatPics: '',
                    chatVoices: '',
                };
                var wztext = {
                    chartComment: this.kongtext,
                    chatPics: '',
                    chatType: 1,
                    entityId: '',
                    id: '',
                    sendTime: date1,
                    sponsor: '1',
                    state: '',
                    chatRoute: '',
                    chatVoices: ''
                }
                var testEvent = {
                    eventType: "TEST_EVENT",
                    from: this.patientId,
                    to: this.doctorId,
                    time: date1,
                    content: wztext,
                };
                socket.send(JSON.stringify({
                    testEvent
                }));
                addChatContent(list).then((res) => {
                    //console.log(res);
                    if (res.massage == 'ok') {
                        this.getChatContent();
                        this.kongtext = '';
                        let date = new Date();
                        let date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() +
                            ':' + date.getMinutes() + ':' + date.getSeconds();
                        let json = [{
                            lx: 'ys',
                            id: this.doctorId
                        }]
                        console.log(this.patientName)
                        let listArr = {
                            json: JSON.stringify(json),
                            d1: "您好！您有一条患者给您发来的消息。",
                            d2: "新华医馆问诊平台",
                            d3: this.doctorName,
                            d4: date1,
                            d5: this.patientName,
                            d6: "请您点击详情进入查看。",
                            type: '3',
                            path: "pages/liaotian/liaotian?patientIds=" + this.patientId,
                            appid: 'wxa7fbb44a5513322e',
                            url: 'https://www.mfzhosp.com/H5/#/liaotian?doctorId=' + this.doctorId + '&tab=' + 1 +
                                '&doctorImg=' + this.doctorImgUrl + '&doctorName=' + this.doctorName + '&patientIds=' + this.patientId,
                        }
                        sendMsg6(listArr).then((res) => {

                        })
                    }
                })
            }
        },
        handleFileChange(event) { //上传图片
            var files = this.$refs.input.files;
            var that = this;
            let param = new FormData(); // 创建form对象
            param.append("file", files[0]);
            if (files.length === 0) {
                return false;
            }
            axios.post(baseURI + '/mkkMoblie/uploadFile/picture', param, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                let chatPics = baseURI + '/mkkMoblie/' + response.data;
                this.addChatPic(chatPics);
            }).catch(error => {
                alert('上传图片出错！');
            })
        },
        addChatPic(chatPics) {
            let list = {
                version: 1,
                token: this.token,
                chatId: this.chatId,
                chatType: 2, //图片类型
                chartComment: '',
                chatPics: chatPics,
                chatVoices: '',
            }
            var tptext = {
                chartComment: '02',
                chatPics: chatPics,
                chatType: 2,
                entityId: '',
                id: '',
                sendTime: date1,
                sponsor: '1',
                state: '',
                chatRoute: '',
                chatVoices: ''
            }
            var testEvent = {
                eventType: "TEST_EVENT",
                from: this.patientId,
                to: this.doctorId,
                time: date1,
                content: tptext,
            }
            socket.send(JSON.stringify({
                testEvent
            }));
            addChatContent(list).then((res) => {
                //console.log(res);
                if (res.massage == 'ok') {
                    this.getChatContent();
                    let date = new Date();
                    let date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() +
                        ':' + date.getMinutes() + ':' + date.getSeconds();
                    let json = [{
                        lx: 'ys',
                        id: this.doctorId
                    }]
                    let listArr = {
                        json: JSON.stringify(json),
                        d1: "您好！您有一条患者给您发来的图片。",
                        d2: "新华医馆问诊平台",
                        d3: this.doctorName,
                        d4: date1,
                        d5: this.patientName,
                        d6: "请您点击详情进入查看。",
                        type: '3',
                        path: "pages/liaotian/liaotian?patientIds=" + this.patientId,
                        appid: 'wxa7fbb44a5513322e',
                        url: 'https://www.mfzhosp.com/H5/#/liaotian?doctorId=' + this.doctorId + '&tab=' + 1 +
                            '&doctorImg=' + this.doctorImgUrl + '&doctorName=' + this.doctorName + '&patientIds=' + this.patientId,
                    }
                    sendMsg6(listArr).then((res) => {

                    })
                }
            })
        },
        medicine(prescriptionId) {
            this.$router.push({
                path: "/chufangXq",
                query: {
                    prescriptionId: prescriptionId,
                    indentId: prescriptionId,
                    doctorId: this.doctorId
                }
            });
        },
        voice1() {
            this.voic2 = !this.voic2;
        },
        voice2() {
            this.voic2 = !this.voic2;
        },
        changebig(img) {
            this.showbigImg = true;
            this.bigPic = img;
        },
        hideBigPic() {
            this.showbigImg = false;
            this.bigPic = '';
        },
        getWxConfig() {
            $.ajax({
                url: "https://www.mfzhosp.com/mkkMoblie/accessToken/getWxConfig",
                type: 'post',
                dataType: 'json',
                data: {
                    'url': location.href.split('#')[0]
                },
                success: function (data) {
                    wx.config({
                        debug: false,
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: ['checkJsApi', 'onMenuShareTimeline',
                            'onMenuShareAppMessage', 'onMenuShareQQ',
                            'onMenuShareWeibo', 'hideMenuItems',
                            'showMenuItems', 'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem', 'translateVoice',
                            'startRecord', 'stopRecord', 'onRecordEnd',
                            'playVoice', 'pauseVoice', 'stopVoice',
                            'uploadVoice', 'downloadVoice', 'chooseImage',
                            'previewImage', 'uploadImage', 'downloadImage',
                            'getNetworkType', 'openLocation', 'getLocation',
                            'hideOptionMenu', 'showOptionMenu', 'closeWindow',
                            'scanQRCode', 'chooseWXPay',
                            'openProductSpecificView', 'addCard', 'chooseCard',
                            'openCard'
                        ]
                    });
                    wx.ready(function () {

                    })
                    wx.error(function (res) {
                        //alert(res)
                    })
                }
            });
        },
        mytouchstart() {
            //alert('开始')
            setTimeout(() => {
                this.longPress();
            }, 500)
        },
        longPress() {
            wx.startRecord();
            this.yuyinhidden = true;
            setTimeout(function () {
                this.timeS += 1;
            }, 1000);
        },
        mytouchmove() {
            wx.stopRecord({
                success: function (res) {
                    this.localId = res.localId;
                }
            });
            this.yuyinhidden = false;

        },
        mytouchend() {
            wx.stopRecord({
                success: function (res) {
                    this.localId = res.localId;
                    alert(res.localId, '正常结束录音成功了')
                    this.wxUpload();
                    this.myArticle();
                }
            });
            this.yuyinhidden = false;
        },
        wxUpload() {
            wx.uploadVoice({
                localId: this.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: res => {
                    //alert(res.serverId)
                    this.serverId = res.serverId; // 返回音频的服务器端ID
                    $.ajax({
                        url: 'https://www.mfzhosp.com/mkkMoblie/uploadFile/audio',
                        type: 'post',
                        data: JSON.stringify(res),
                        dataType: "json",
                        success: function (data) {
                            alert(res.data)
                            let imgUrl = baseURI + '/mkkMoblie/' + res.data;
                            let list = {
                                version: 1,
                                token: this.token,
                                chatId: this.chatId,
                                chatType: 3, //语音类型
                                chartComment: this.timeS,
                                chatPics: '',
                                chatVoices: imgUrl,
                                chatRoute1: this.serverId
                            }
                            addChatContent(list).then((res) => {
                                //console.log(res);
                                if (res.massage == 'ok') {
                                    this.getChatContent();
                                    let date = new Date();
                                    let date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
                                        ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                                    let json = [{
                                        lx: 'hz',
                                        id: this.patientId
                                    }]
                                    let listArr = {
                                        json: JSON.stringify(json),
                                        d1: "您好！您有一条患者给您发来的语音。",
                                        d2: "新华医馆问诊平台",
                                        d3: this.doctorName,
                                        d4: date1,
                                        d5: this.patientName,
                                        d6: "请您点击详情进入查看。",
                                        type: '3',
                                        path: "pages/liaotian/liaotian?patientIds=" + this.patientId,
                                        appid: 'wxa7fbb44a5513322e',
                                        url: 'https://www.mfzhosp.com/H5/#/liaotian?doctorId=' + this.doctorId + '&tab=' + 1 + '&doctorImg=' + this.doctorImgUrl +
                                            '&doctorName=' + this.doctorName + '&patientIds=' + this.patientId,
                                    }
                                    sendMsg6(listArr).then((res) => {

                                    })
                                }
                            })
                        },
                        error: function (xhr, errorType, error) {
                            console.log(error);
                        }
                    });

                }
            });
        },
        play(chatRoute1) {
            wx.playVoice({
                localId: chatRoute1 // 需要播放的音频的本地ID，由stopRecord接口获得
            });
            // wx.stopVoice({
            //    localId: chatRoute1 // 需要暂停的音频的本地ID，由stopRecord接口获得
            // });
        }
    },
    components: {
        HeadTop
    },
    watch: { //hotkeyList渲染完后，获取高度
        doctorIdList: function () {
            this.$nextTick(function () {
                document.documentElement.scrollTop = this.$refs.page.offsetHeight;
                document.body.scrollTop = this.$refs.page.offsetHeight
            });
        }
    },
}
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";

/* pages/ysxx/ysxx.wxss */
.backBlack {
    position: fixed !important;
    left: 0;
    top: 0;
}

.yulanBig {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 1);
    z-index: 99999999;

    img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}

.fatu {
    position: relative;
}

.fatu .uploadPhoto {
    width: 24%;
    height: 0.7rem;
    position: absolute;
    right: 1.6rem;
    top: 1.3rem;
    opacity: 0;
}

.liaotian {
    height: 100%;
    width: 100%;
    background: #f1f1f1;
    position: relative;
}

.pages {
    padding: .6rem .23rem;
    box-sizing: border-box;
    width: 100%;
    clear: both;
    margin-top: 0.6rem;
    background: #f1f1f1;
    //padding-bottom:2rem;
    //height:74%;
    //overflow-y:scroll;
}

.pages>div:last-child {
    padding-bottom: 1.5rem;
}

.pages .add-wrap {
    position: fixed;
    bottom: 20;
    display: flex;
    width: 95%;
    justify-content: center;
}

.pages .add-wrap div {
    color: #fff;
    background: #ff0101;
    text-align: center;
    line-height: .72rem;
    height: .62rem;
    width: 20%;
    border-radius: .26rem;
    font-size: .32rem;
}

.pages .add-wrap div img {
    width: 0.31rem;
    height: 0.26rem;

}

.bottom {
    width: 100%;
    /* height: 100rem; */
    background: white;
    position: fixed;
    bottom: 0rem;
    left: 0rem;
    z-index: 999;
}

.duihua {
    width: 100%;
    border-top: 1rem solid #d0d1d0;
    padding: 0 .24rem;
    box-sizing: border-box;
    position: relative;
}

.fasong_but {
    /* width: .64rem; */
    height: .52rem;
    color: #fff;
    text-align: center;
    background: #00b0c2;
    font-size: .33rem;
    line-height: .52rem;
    float: right;
    border-radius: .10rem;
    margin-top: .15rem;
    padding: .05rem .15rem;
}

.speakbuton {
    float: left;
    width: 5.24rem;
    margin: .20rem 0;
    //margin-top:0.8rem;
    margin-left: .58rem;
    border: 1px solid #d0d1d0;
    font-size: .29rem;
    padding: .12rem 0;
    box-sizing: border-box;
    color: #717171;
    text-align: center;
}

.swiper {
    height: 100%;
    width: 100%;
    position: relative;
}

.swiper-tab {
    width: 100%;
    text-align: center;
    line-height: .80rem;
    /* height: 10%; */
    background: #fff;
    font-size: 20px;
    display: flex;
    justify-content: space-around;
    position: fixed;
    z-index: 100;
}

.swiper-boxs {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
}

.on {
    color: #00b0c2;
    border-bottom: .08rem solid #00b0c2;
}

.swiper-tab-list {
    font-size: .34rem;
    display: inline-block;
    width: 26.5%;
}

.tou {
    width: 100%;
    height: 2.98rem;
    background: #fff;
}

.hera {
    width: 100%;
    height: 3.34rem;
    background: #60cad5;
}

.hera .tu {
    width: 1.40rem;
    height: 1.40rem;
    display: block;
    border-radius: .25rem;
    margin: 0 auto;
    padding-top: .40rem;
}

.hera .zal {
    width: 3.14rem;
    height: .34rem;
    display: inline-block;
    color: #f7fcfc;
    line-height: .34rem;
    font-size: .38rem;
    margin-left: .22rem;
}

.hera .zal .zrys {
    display: inline-block;
    font-size: .32rem;
    margin-left: .32rem;
}

.hera .zal1 {
    width: 3.70rem;
    height: .36rem;
    font-size: .30rem;
    margin-left: .22rem;
    color: #fff;
    margin-top: .14rem;
}

.ban1 {
    width: 7.04rem;
    margin: -.50rem auto .20rem;
    background: #fff;
    border-radius: .10rem;
}

.ban {
    width: 7.04rem;
    border-radius: .10rem;
    background: #fff;
}

.zi8 {
    display: inline-block;
    color: #9d9d9d;
    font-size: .28rem;
    line-height: .74rem;
    text-indent: .16rem;
}

.dxt {
    float: right;
    width: 5.00rem;
    height: .74rem;
    margin-right: .96rem;
}

.xinxin {
    display: block;
    width: .40rem;
    height: .30rem;
    margin-top: .24rem;
    margin-left: .20rem;
    float: left;
}

.ban .tu9 {
    width: .36rem;
    height: .36rem;
    display: block;
    border-radius: 25%;
    padding-top: .18rem;
    margin-left: .14rem;
    float: left;
}

.ban .gei {
    width: 3.78rem;
    height: .74rem;
    line-height: .74rem;
    font-size: .30rem;
    color: #868686;
    float: left;
    margin-left: .16rem;
}

.ban .dada {
    width: 1.06rem;
    height: .36rem;
    background: #33c0ce;
    line-height: .36rem;
    font-size: .26rem;
    color: #fff;
    text-align: center;
    border-radius: .24rem;
    float: left;
    margin-top: .20rem;
    margin-left: 1.28rem;
}

.herd_1 {
    width: 100%;
    background: #f1f1f1;
    padding-top: .22rem;
}

.herd_1 .herdzi {
    width: 7.06rem;
    height: 1.36rem;
    margin: 0 auto;
    border-bottom: 1px dashed #d0d1d0;
}

.herd_1 .herdzi .tuw {
    width: 7.06rem;
    height: .40rem;
    font-size: .30rem;
    color: #686868;
}

.herd_1 .herdzi .tuw1 {
    width: 7.06rem;
    height: .24rem;
    color: #707070;
    line-height: .24rem;
    font-size: .26rem;
}

.herd_1 .herdzi .tuw2 {
    width: 5.70rem;
    height: .62rem;
    font-size: .28rem;
    color: #f1a29f;
    line-height: .62rem;
    float: left;
}

.herd_1 .herdzi .dianci {
    width: 1.12rem;
    height: .40rem;
    background: #f43e58;
    text-align: center;
    line-height: .40rem;
    color: #fff;
    font-size: .30rem;
    border-radius: .10rem;
    float: right;
    margin-right: .20rem;
}

.herd_1 .herdzi1 {
    width: 7.06rem;
    border-bottom: 1px dashed #d0d1d0;
    margin: 0 auto;
}

.herd_1 .herdzi1 .men {
    line-height: .74rem;
    font-size: .34rem;
    color: #222;
}

.herd_1 .herdzi1 .cha {
    display: inline-block;
    line-height: .74rem;
    font-size: .28rem;
    color: #8dced7;
    float: right;
}

.herd_1 .herdzi2 {
    width: 7.06rem;
    margin: 0 auto;
    border-bottom: 1px dashed #d0d1d0;
}

.herd_1 .herdzi2 .taiyu {
    width: 7.06rem;
    height: .66rem;
    line-height: .66rem;
    color: #6d6d6d;
    font-size: .28rem;
}

.herd_1 .herdzi2 .taiyu .shij {
    display: inline-block;
    float: right;
}

.herd_1 .herdzi2 .mei {
    width: 7.06rem;
    height: .74rem;
    line-height: .74rem;
    font-size: .34rem;
    color: #222;
}

.herd_1 .herdzi2 .ch {
    display: inline-block;
    line-height: .74rem;
    font-size: .28rem;
    color: #8dced7;
    float: right;
}

.zi0 {
    width: 100%;
    background: #f1f1f1;
    padding-top: .22rem;
    border-bottom: 1px solid #d0d1d0;
}

.zi0 .zi1 {
    width: 7.06rem;
    margin: 0 auto;
}

.zi0 .zi1 .zi2 {
    width: 7.06rem;
    height: .54rem;
    color: #222;
    font-size: .30rem;
}

.zi0 .zi1 .zi3 {
    width: 7.06rem;
    font-size: .28rem;
    text-indent: .42rem;
    color: #979797;
    margin-bottom: .10rem;
}

.shangc {
    padding: 0 .10rem .90rem;
    background: #f1f1f1;
    border-bottom: 1px solid #d0d1d0;
}

.shangc .shangc0 {
    width: 7.06rem;
    height: .58rem;
    margin: 0 auto;
    color: #010101;
    font-size: .34rem;
    line-height: .58rem;
}

.shangc .shangc1 {
    width: 6.86rem;
}

.shangc .shangc1 .shangc2 {
    padding: .07rem .20rem;
    border: 1px solid #00b0c2;
    border-radius: .10rem;
    font-size: .30rem;
    float: left;
    color: #00b0c2;
    margin-left: .34rem;
    margin-top: .15rem;
}

.pinlun {
    width: 100%;
    height: 2.12rem;
    background: #f1f1f1;
}

.pinlun .pinlun0 {
    width: 6.96rem;
    height: .76rem;
    margin: 0 auto;
    line-height: .76rem;
    color: #010101;
    font-size: .34rem;
}

.pinlun .pinlun0 .ca {
    display: inline-block;
    width: .80rem;
    height: .32rem;
    line-height: .32rem;
    color: #fff;
    border-radius: .25rem;
    font-size: .22rem;
    float: right;
    margin-top: .20rem;
    background: #00b0c2;
    text-align: center;
}

.pinlun .anyi {
    width: 6.82rem;
    height: .54rem;
    line-height: .54rem;
    color: #b6b6b6;
    margin: 0 auto;
    font-size: .28rem;
}

.dainhua {
    display: inline-block;
    float: left;
    color: #000;
}

.pinlun .anyi .riqi {
    display: inline-block;
    float: right;
    color: #00b0c2;
}

.xing {
    width: 1.88rem;
    height: .30rem;
    float: left;
    margin-top: .14rem;
    margin-left: .56rem;
}

.hong {
    display: block;
    width: .24rem;
    height: .24rem;
    margin-left: .14rem;
    float: left;
}

.hong:nth-child(1) {
    margin-left: 0;
}

.pinlun .zi {
    width: 6.82rem;
    font-size: .28rem;
    color: #000;
    padding-top: .18rem;
    margin: 0 auto;
}

.pinlun .zi6 {
    width: 7.00rem;
    font-size: .28rem;
    color: #545454;
    padding-top: .38rem;
    margin: 0 auto;
}

.chakan {
    width: 100%;
    height: .60rem;
    line-height: .60rem;
    font-size: .26rem;
    color: #787878;
    text-align: center;
}

.chakan1 {
    width: 100%;
    height: .44rem;
    font-size: .28rem;
    color: #787878;
    text-align: center;
}

.wen {
    width: 100%;
    background: #f1f1f1;
}

.to {
    width: .98rem;
    height: .98rem;
    background: #30bdcb;
    position: fixed;
    right: .22rem;
    bottom: 1.00rem;
    border-radius: 50%;
    padding-top: .10rem;
    box-sizing: border-box;
    transition: all 0.5s;
    z-index: 999999;
}

.yuan {
    width: .98rem;
    height: .98rem;
    background: #30bdcb;
    border-radius: 50%;
    padding-top: .10rem;
    box-sizing: border-box;
    transition: all 0.5s;
    position: fixed;
    right: .22rem;
    bottom: 4.16rem;
    z-index: 999999;
}

.to .yi {
    margin-top: .02rem;
    width: .56rem;
    height: .54rem;
    display: block;
    margin: 0 auto;
}

.to .gy {
    color: #fff;
    font-size: .28rem;
    text-align: center;
}

.yuan .yi {
    margin-top: .02rem;
    width: .56rem;
    height: .54rem;
    display: block;
    margin: 0 auto;
}

.yuan .gy {
    color: #fff;
    font-size: .28rem;
    text-align: center;
}

.wen .tu2 {
    width: 1.42rem;
    height: 1.42rem;
    display: block;
    border-radius: .25rem;
    float: left;
}

.wen .lan {
    width: .42rem;
    height: .46rem;
    display: block;
    float: left;
    margin-top: .40rem;
    /* margin-left: .24rem; */
}

.wen .ctner {
    width: 65%;
    background: #b9e4e8;
    border-radius: .10rem;
    float: left;
    font-size: .28rem;
    color: #565656;
    padding: .23rem;
    box-sizing: border-box;
    margin-bottom: .43rem;
}

.wen .ctner .hyn {
    display: block;
}

.wen .ctner .zkxq {
    display: inline-block;
    float: right;
    color: #00b0c2;
    font-size: .28rem;
    margin-right: .18rem;
}

.wen .sahng {
    width: 3.50rem;
    height: 1.72rem;
    margin: 0 auto;
    background: #66d0da;
    border-radius: .10rem;
    float: left;
}

.wen .sahng .chufang {
    width: 2.16rem;
    height: .62rem;
    font-size: .30rem;
    color: #565656;
    display: inline-block;
    float: left;
    margin-top: .24rem;
    margin-left: .24rem;
}

.wen .sahng .shang {
    display: block;
    width: .60rem;
    height: .70rem;
    padding-top: .30rem;
    margin-left: .26rem;
    float: left;
}

.wen .sahng .sahng1 {
    width: 3.50rem;
    height: 1.16rem;
    background: #fff;
}

.hsang {
    display: inline-block;
    width: 3.50rem;
    height: .60rem;
    color: #fff;
    font-size: .30rem;
    text-align: center;
    line-height: .60rem;
}

.zens {
    width: 100%;
    line-height: .60rem;
    color: #b8b8b8;
    font-size: .26rem;
    text-align: center;
    clear: both;
}

.zens .kdc {
    color: #7cc1e4;
}

.nu {
    height: 1.86rem;
    background: #f1f1f1;
    float: right;
    margin-top: .74rem;
}

.nu .nu0 {
    width: 71%;
    background: #b9e4e8;
    float: right;
    border-radius: .10rem;
}

.nu .nu0 .nu2 {
    display: inline-block;
    font-size: .28rem;
    color: #565656;
    border-radius: .10rem;
    padding: .23rem;
    box-sizing: border-box;
}

.nu .you {
    width: .40rem;
    height: .50rem;
    display: block;
    float: right;
}

.nu .xaing {
    width: 1.40rem;
    height: 1.40rem;
    margin-top: .24rem;
    display: block;
    border-radius: 50%;
    box-sizing: border-box;
    float: right;
}

.foot1 {
    width: 100%;
    border: 1px solid #ededed;
    background: #fff;
    position: fixed;
    left: 0rem;
    z-index: 999;
    height: 2.20rem;
}

.foot1 .cen {
    width: 6.00rem;
    border-radius: .10rem;
    border: 1px solid #bfbfbf;
    margin-top: .14rem;
    float: left;
    margin-left: .16rem;
}

.foot1 .cen .liao {
    width: .60rem;
    height: .52rem;
    display: block;
    margin-top: .06rem;
    margin-left: .12rem;
    float: left;
}

.foot1 .cen .tongh {
    color: #000;
    width: 5.00rem;
    /* height: .62rem; */
    font-size: .34rem;
    line-height: .62rem;
    margin-left: .26rem;
    float: left;
}

.foot1 .fs {
    width: 1.30rem;
    height: .90rem;
    line-height: .90rem;
    font-size: .32rem;
    text-align: center;
    color: #555;
    float: left;
}

.btn {
    width: .70rem;
    height: .40rem;
    background: #f1f1f1;
    border-radius: .14rem .14rem 0rem 0rem;
    margin: 0 auto;
}

.btn .tout {
    width: .70rem;
    display: block;
    height: .40rem;
    border-radius: .14rem .14rem 0rem 0rem;
}

.line {
    width: 100%;
    height: 2.20rem;
    background: #fff;
    /* border-bottom: 1px dashed #bfbfbf; */
}

.line .line_1 {
    width: 4.06rem;
    height: .92rem;
    background: #fff;
    float: left;
    margin-left: .48rem;
}

.line .line_1 .tutu {
    width: 4.06rem;
    height: .50rem;
    color: #b5b5b5;
    font-size: .30rem;
    margin-top: .10rem;
}

.line_9 {
    width: 80%;
    height: .78rem;
    background: #b9e4e8;
    float: left;
    border-radius: .50rem;
    line-height: .76rem;
    color: #525252;
    font-size: .30rem;
    text-align: center;
    margin-top: .20rem;
}

.line_9_bak {
    /* width: calc(100% - 2.98rem); */
    width: 86%;
    /* width: calc(100% - .88rem); */
    height: 1.02rem;
    background: #b9e4e8;
    float: left;
    border-radius: .50rem;
    /* margin-left: .48rem; */
    line-height: 1.10rem;
    color: #525252;
    font-size: .30rem;
    text-align: center;
}

.sheng3 {
    font-size: .28rem;
}

.lansss {
    width: 36px;
    height: .72rem;
    display: block;
    padding-top: .22rem;
    margin-left: .22rem;
    float: left;
}

.las {
    width: .90rem;
    height: .90rem;
    float: left;
    margin-top: .15rem;
    margin-right: .10rem;
    margin-left: .30rem;
}

.las2 {
    width: .68rem;
    height: .70rem;
    float: left;
    margin-top: .24rem;
    margin-left: 15px;
    /* width: .68rem;
  height: .70rem;
  display: block;
  padding-top: .30rem;
  margin-left: .15rem;
  float: left; */
}

.line .line_1 .tutu .tutu1 {
    display: inline-block;
    margin-left: .16rem;
    width: .76rem;
    height: .34rem;
    color: #fff;
    text-align: center;
    font-size: .22rem;
    line-height: .34rem;
    border-radius: .10rem;
    background: #00b0c2;
    border-right: 1px dashed #69d1db;
}

.line .line_1 .tutu .tenn {
    display: inline-block;
    width: .50rem;
    height: .34rem;
    color: #fff;
    text-align: center;
    font-size: .22rem;
    line-height: .34rem;
    border-radius: .10rem;
    background: #00b0c2;
}

.line .line_1 .zytw {
    font-size: .28rem;
    color: #b5b5b5;
}

.line .dcfz0 {
    width: 1.70rem;
    height: .60rem;
    line-height: .60rem;
    color: #fff;
    font-size: .32rem;
    text-align: center;
    border-radius: .10rem;
    background: #00b0c2;
    float: right;
    margin-right: .28rem;
    margin-top: .26rem;
}

.line .lanss {
    display: block;
    width: .78rem;
    height: .66rem;
    padding-top: .22rem;
    margin-left: .18rem;
    float: left;
}

.animate {
    position: fixed;
    bottom: 0;
    left: 0rem;
    width: 100%;
    transition: all 0.5s;
}

.animate1 {
    position: fixed;
    bottom: .94rem;
    left: 0rem;
    width: 100%;
    transition: all 0.5s;
}

.gg {
    width: 7.05rem;
    height: 1.44rem;
    background: #e9e9e9;
    margin: 0 auto;
    margin-top: .18rem;
}

.riqi0 {
    width: .80rem;
    height: 1.44rem;
    float: left;
}

.yi {
    display: inline-block;
    color: #949494;
    font-size: .28rem;
    margin-left: .32rem;
}

.yi0 {
    display: inline-block;
    color: #a0a0a0;
    font-size: .28rem;
    text-indent: .05rem;
}

.ysgg {
    width: 5.00rem;
    float: left;
    padding-top: .16rem;
    margin-left: .34rem;
}

.ysg {
    font-size: .28rem;
    color: #000;
}

.floatclear {
    clear: both;
}

.hwed .gray {
    width: 100%;
    height: .18rem;
    background: #f1f1f1;
}

.grayness {
    width: 7.06rem;
    margin: 0 auto;
    background: #fff;
}

.clothing {
    width: 7.06rem;
    height: .96rem;
    border-bottom: 1px dashed #d2d2d2;
}

.pirc {
    width: .60rem;
    height: .60rem;
    display: block;
    padding-top: .16rem;
    float: left;
}

.typeface {
    height: .96rem;
    line-height: .96rem;
    font-size: .30rem;
    color: #3c3c3c;
    margin-left: .32rem;
    float: left;
}

.time {
    height: .96rem;
    font-size: .30rem;
    color: #9c9c9c;
    line-height: .96rem;
    float: right;
    margin-left: .08rem;
}

.principle {
    width: 1.68rem;
    height: .96rem;
    line-height: .96rem;
    font-size: .30rem;
    color: #717171;
    float: left;
}

.tummy {
    width: 4.90rem;
    height: .96rem;
    line-height: .96rem;
    font-size: .30rem;
    color: #222;
    float: left;
    margin-left: .12rem;
}

.you {
    width: .30rem;
    height: .28rem;
    display: block;
    float: right;
    margin-top: .38rem;
}

.yao {
    width: 7.06rem;
}

.ya {
    font-size: .30rem;
    color: #717171;
    display: inline-block;
    margin-top: .32rem;
    float: left;
}

.gou {
    width: 5.42rem;
    float: left;
    margin-left: .68rem;
}

.zi13 {
    width: 3.96rem;
    line-height: .66rem;
    color: #222;
    font-size: .30rem;
    background: #7fd7e0;
    border-radius: .10rem;
    margin-top: .16rem;
    float: left;
}

.zi73 {
    display: inline-block;
    margin-left: .26rem;
    padding: .02rem .08rem;
}

.zi_19 {
    width: 1.02rem;
    height: .64rem;
    line-height: .64rem;
    background: #00b0c2;
    text-align: center;
    border-radius: .10rem;
    font-size: .30rem;
    color: #fff;
    float: right;
    margin-top: .16rem;
}

page {
    height: 100%;
    background: #f1f1f1;
    width: 100%;
}

// .pages {
//   padding: .6rem .23rem;
//   box-sizing: border-box;
//   width: 100%;
//   clear: both;
//   margin-bottom: 100px;
// }

.look {
    width: 100%;
    text-align: center;
    line-height: .36rem;
    color: #787878;
    font-size: .26rem;
}

.left_liao {
    width: 100%;
    //margin: .68rem 0;
    clear: both;
}

.head_pic {
    width: .95rem;
    height: .95rem;
    border-radius: 50%;
    float: left;
}

.head_pic1 {
    float: right;
}

.liaotian_ck {
    float: left;
    width: 80%;
    //margin-top: .26rem;
}

.liaotian_ck1 {
    float: right;
    width: 80%;
    margin-top: .08rem;
}

.ltjt {
    width: .48rem;
    height: .48rem;
}

.liaotzs_wrap {
    width: 94%;
}

.liaotzs_wrap1 {
    width: 80%;
    /* float: right; */
    margin-left: .66rem;
    margin-top: -.65rem;
}

.liaotzs_wrap2 {
    width: 40%;
    float: right;
    margin-left: .60rem;
    margin-top: -.65rem;
}

.ltjt1 {
    float: right;
    transform: rotateY(180deg);
    margin-top: .20rem;
}

.liaotzs {
    padding: .19rem .30rem;
    box-sizing: border-box;
    background: #b9e4e8;
    border-radius: .10rem;
    color: #565656;
    font-size: .28rem;
    float: left;
    margin-top: -.75rem;
    margin-left: .48rem;
}

.liaotzspic {
    padding: 0;
    background: #f1f1f1;
}

.liaotzs1 {
    padding: .19rem .30rem;
    box-sizing: border-box;
    background: #b9e4e8;
    border-radius: .10rem;
    color: #565656;
    font-size: .28rem;
    float: right;
    margin-right: -0.03rem;
}

/* 调理 */

.tiaoli_top {
    padding: .19rem .30rem;
    box-sizing: border-box;
}

.tiaoli {
    padding: 0;
}

.tiaoli_bac {
    width: 3.59rem;
    background: #fff;
}

.tiaoli_top_img {
    width: .56rem;
    height: .70rem;
    float: left;
}

.tiaoli_top_view {
    color: #565656;
    font-size: .30rem;
    float: right;
    padding-left: .27rem;
    box-sizing: border-box;
    width: 2.41rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.tiaoli_bot {
    line-height: .56rem;
    clear: both;
    height: .56rem;
    text-align: center;
    background: #66d0da;
    color: #fff;
    margin-top: .68rem;
    border-radius: 0 0 .10rem .10rem;
}

.hist {
    padding: .05rem .32rem;
    box-sizing: border-box;
    font-size: .26rem;
    color: #717171;
    line-height: .30rem;
    border-radius: .10rem;
    text-align: center;
    display: table;
    margin: .10rem auto 1.00rem;
}

.dibu_bot {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
}

.duihua {
    width: 100%;
    border-top: 1px solid #d0d1d0;
    padding: 0 .24rem;
    box-sizing: border-box;
    position: relative;
}

.bof {
    width: .90rem;
    height: .90rem;
    float: left;
    margin-top: .60rem;
    margin-left: 10px;
}

.bof2 {
    width: .68rem;
    height: .70rem;
    float: left;
    margin-top: .24rem;
    margin-left: 15px;
}

.huihua {
    float: left;
    width: 5.63rem;
    margin: .20rem 0;
    border-bottom: 1px solid #d0d1d0;
    margin-left: .13rem;
    /* border-radius: .10rem; */
    font-size: .28rem;
    padding: .12rem 0;
    box-sizing: border-box;
}

.fasong_but {
    width: .64rem;
    height: .52rem;
    color: #fff;
    text-align: center;
    background: #00b0c2;
    font-size: .32rem;
    line-height: .52rem;
    float: right;
    border-radius: .10rem;
    margin-top: .20rem;
}

.tan {
    width: 100%;
    padding: 0 .23rem;
    box-sizing: border-box;
    background: #fff;
    display: fixed;
    display: -webkit-flex;
    align-items: center;
    flex-wrap: wrap;
}

.tan1 {
    width: 100%;
    padding: 0 .23rem .12rem .23rem;
    box-sizing: border-box;
    background: #fff;
    display: fixed;
    display: -webkit-flex;
    align-items: center;
    flex-wrap: wrap;
}

.tan_but {
    width: 1.77rem;
    height: 1.10rem;
    margin-top: .26rem;
}

.tan_but image {
    width: .40rem;
    height: .40rem;
    display: block;
    margin: 0 auto;
}

.tan_but view {
    text-align: center;
    font-size: .28rem;
    color: #00b0c2;
    line-height: .60rem;
}

.cont_wrap {
    width: 100%;
    height: 2.28rem;
    background: #fff;
    padding: .17rem;
    box-sizing: border-box;
    line-height: .36rem;
    margin-bottom: .17rem;
    position: relative;
}

.cont_wrap_left {
    width: 92%;
    float: left;
}

.cont_wrap_right {
    float: right;
    width: 6%;
}

.cont_wrap_right image {
    width: .28rem;
    height: .28rem;
    float: right;
    position: absolute;
    top: 0;
    right: .23rem;
    bottom: 0;
    margin: auto;
    display: block;
}

.cont_wrap7 {
    font-size: .34rem;
    color: #222;
    line-height: .56rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.cont_wrap2 {
    width: 100%;
    font-size: .30rem;
    color: #717171;
    text-indent: 1..5rem;
    overflow: hidden;
    /*内容超出后隐藏*/
    text-overflow: ellipsis;
    /* 超出内容显示为省略号*/
    white-space: nowrap;
    /*文本不进行换行*/
}

.cont_wrap3 {
    width: .39rem;
    height: .43rem;
    float: left;
    margin-top: .23rem;
}

.cont_wrap4 {
    font-size: .26rem;
    color: #717171;
    float: left;
    line-height: .92rem;
    margin: 0 .30rem;
}

.cont_wrap5 {
    font-size: .26rem;
    color: #717171;
    float: left;
    line-height: .92rem;
}

.cont_wrap6 {
    font-size: .26rem;
    color: #00b0c2;
    float: right;
    line-height: .92rem;
}

.jia_wrap {
    width: 100%;
    height: 4.41rem;
    padding-top: 21%;
    box-sizing: border-box;
}

.add_pic {
    width: .80rem;
    height: .80rem;
    background: #00b0c2;
    border-radius: 50%;
    padding-top: .19rem;
    box-sizing: border-box;
    margin: 0 auto;
}

.add_pic image {
    width: .47rem;
    height: .47rem;
    /* margin-top: .19rem; */
    display: block;
    margin: 0 auto;
}

.recommend_tit {
    width: 100%;
    color: #00b0c2;
    font-size: .30rem;
    text-align: right;
    line-height: .57rem;
}

.wrap {
    width: 100%;
    padding: 0 .23rem;
    box-sizing: border-box;
    position: relative;
}

.search {
    width: 100%;
    height: .72rem;
    background: rgba(0, 166, 183, 0.7);
    border-radius: .10rem;
}

.search view {
    color: #fff;
    font-size: .30rem;
    text-align: center;
    line-height: .72rem;
}

.search image {
    position: absolute;
    width: .36rem;
    height: .36rem;
    left: 36%;
    top: .19rem;
}

.picurl {
    width: 100%;
    border-radius: .15rem;
    /* margin-left: .20rem; */
}

.speakbuton {
    float: left;
    width: 5.24rem;
    margin: .12rem 0;
    margin-left: .58rem;
    border: 1px solid #d0d1d0;
    font-size: .28rem;
    padding: .2rem 0;
    box-sizing: border-box;
    color: #717171;
    text-align: center;
    margin-top: 0.8rem;
    user-select: none;
}

.speakbuton_1 {
    background-color: #dbdbdb;
}

.liaotzspi {
    width: 1.66rem;
    padding: .16rem;
    text-align: right;
    position: relative;
    margin-top: -.69rem;
    border-radius: .30rem;
    margin-left: .42rem;
}

.liaotzspi2 {
    width: 1.66rem;
    padding: .16rem;
    text-align: left;
    position: relative;
    margin-top: -.69rem;
    border-radius: .30rem;
    margin-left: .42rem;
}

.yuyinpic {
    width: .45rem;
    height: .45rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: .10rem;
    margin: auto;
}

.yuyinpic1 {
    width: .45rem;
    height: .45rem;
    position: absolute;
    top: 0;
    bottom: 0;
    right: .10rem;
    margin: auto;
}

.yuyinT {
    width: 40%;
    height: 22%;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 34%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: .13rem;
}

.yuyinTimg {
    width: 100%;
    height: 63%;
    margin-top: .45rem;
}

.bodongwrao {
    width: 2.00rem;
    height: 100%;
    float: right;
    position: relative;
}

.bokuai {
    width: .25rem;
    border-top: .20rem solid #fff;
    border-right: .10rem solid transparent;
    border-left: .10rem solid #fff;
    position: absolute;
    bottom: .77rem;
    left: 0;
}

.bokuai1 {
    width: .40rem;
    border-top: .20rem solid #fff;
    border-right: .10rem solid transparent;
    border-left: .10rem solid #fff;
    position: absolute;
    left: 0;
    bottom: 1.16rem;
    display: none;
    animation: bokuai1 3s infinite;
}

@keyframes bokuai1 {
    50% {
        display: block;
    }
}

.bokuai2 {
    width: .60rem;
    border-top: .23rem solid #fff;
    border-right: .10rem solid transparent;
    border-left: .10rem solid #fff;
    position: absolute;
    left: 0;
    bottom: 1.51rem;
}

.bokuai3 {
    width: .80rem;
    border-top: .25rem solid #fff;
    border-right: .10rem solid transparent;
    border-left: .10rem solid #fff;
    position: absolute;
    left: 0;
    bottom: 1.86rem;
}

.bokuai4 {
    width: 1.00rem;
    border-top: .25rem solid #fff;
    border-right: .10rem solid transparent;
    border-left: .10rem solid #fff;
    position: absolute;
    left: 0;
    bottom: 2.24rem;
}

.bokuai5 {
    width: 1.20rem;
    border-top: .25rem solid #fff;
    border-right: .10rem solid transparent;
    border-left: .10rem solid #fff;
    position: absolute;
    left: 0;
    bottom: 2.63rem;
}

.bokuai6 {
    width: 1.40rem;
    border-top: .25rem solid #fff;
    border-right: .10rem solid transparent;
    border-left: .10rem solid #fff;
    position: absolute;
    left: 0;
    bottom: 3.02rem;
}

.bokuai7 {
    width: 1.60rem;
    border-top: .25rem solid #fff;
    border-right: .10rem solid transparent;
    border-left: .10rem solid #fff;
    position: absolute;
    left: 0;
    bottom: 3.14rem;
}

.biaotititle {
    font-size: .30rem;
    line-height: 1.97rem;
    color: #222;
}

.flag {
    float: right;
    font-size: .26rem;
    border: 1px solid #f5253e;
    color: #f5253e;
    height: .32rem;
    line-height: .30rem;
    padding: 0. 8rem;
    box-sizing: border-box;
    border-radius: .10rem;
    margin-top: .23rem;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: .70rem;
}

.flag1 {
    border: 1px solid #00b0c2;
    color: #00b0c2;
}

.flag2 {
    border: 1px solid #23b483;
    color: #23b483;
}

.lefttime {
    font-size: .24rem;
    color: #717171;
    margin-left: .50rem;
}

.touch-container {
    position: relative;
}

.msg {
    font-size: .30rem;
    text-align: center;
    color: #717171;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
}

.img {
    width: 100%;
    height: 1.17rem;
}

.loding {
    width: 100%;
    height: 0;
    transition: all 0.5s;
    position: relative;
}

.loding image {
    width: .40rem;
    height: .40rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.tan_content {
    width: 100%;
    height: 92%;
}

::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
}

/* 遮罩 */

.zhezhao {
    z-index: 999999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    bottom: 0;
    left: 0;
}

.enter {
    z-index: 999999;
    width: 5.90rem;
    height: 2.60rem;
    background: #fff;
    border-radius: .10rem;
    position: fixed;
    left: 50%;
    top: 28%;
    transform: translate(-50%, -50%);
}

.enter_tit {
    font-size: .30rem;
    color: #222;
    text-align: center;
    line-height: 1.34rem;
}

.enter_but {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    margin-top: .30rem;
}

.enter_but button {
    font-size: .32rem;
    color: #222;
    width: 2.40rem;
    height: .65rem;
    border-radius: .10rem;
    text-align: center;
    line-height: .65rem;
    border: 1px solid #979797;
    float: left;
}

.enter_but button:nth-child(2) {
    color: #fff;
    border: none;
    background: #00b0c2;
}

.guanbi {
    width: .50rem;
    height: .50rem;
    border-radius: 50%;
    text-align: center;
    line-height: .30rem;
    position: absolute;
    right: .23rem;
    top: -9px;
}

.guanbi image {
    width: 100%;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
}

.showModal1 {
    width: 100%;
    z-index: 999999;
    height: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    transition: all 0.5s;
}

.ball {
    position: absolute;
    top: -8%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.huihua {
    float: left;
    width: 75%;
    margin: .20rem 0 0;
    border-bottom: 1px solid #d0d1d0;
    margin-left: .13rem;
    /* border-radius: .10rem; */
    font-size: .29rem;
    /* padding: .12rem 0; */
    box-sizing: border-box;
    /* height: .50rem; */
}

.fasong_but {
    /* width: .64rem; */
    height: .70rem;
    color: #fff;
    text-align: center;
    background: #00b0c2;
    font-size: .33rem;
    line-height: .7rem;
    float: right;
    border-radius: .10rem;
    margin-top: .15rem;
    padding: .05rem .15rem;
    width: 1.5rem;
    margin-right: 1.6rem;
}

.fasong_but1 {
    /* width: .64rem; */
    height: .70rem;
    color: #fff;
    text-align: center;
    background: #00b0c2;
    font-size: .33rem;
    line-height: .7rem;
    float: right;
    border-radius: .10rem;
    margin-top: .15rem;
    padding: .05rem .15rem;
    width: 1.5rem;
    margin-right: 0.5rem;
}
</style>
