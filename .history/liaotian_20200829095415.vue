<template>
	<div class="liaotian">
		<HeadTop :title="pageName" :backBlack="true"></HeadTop>
     <div class="backGo" @click="goBack()"></div>
        <div class="pages" ref="page" id="pages">
        <div v-for="(item,index) in doctorIdList"  :key="index">
            <div class="left_liao">
            <!-- 患者文字 -->
            <div v-if="item.chatType==1">
                <div v-if="item.sponsor==1">
                <img :src="patientpic" class="head_pic">
                <div class="liaotian_ck">
                    <img class="ltjt" src="../assets/img/ltjt.png">
                    <div class="liaotzs_wrap">
                    <div class="liaotzs">{{item.chartComment}}</div>
                    </div>
                    <div class="lefttime">{{item.sendTime}}</div>
                </div>
                </div>

                <!-- 医生文字 -->
                <div v-if="item.sponsor==0" bindlongtap="delete">
                <img :src="doctorImgUrl" class="head_pic head_pic1">
                <div class="liaotian_ck liaotian_ck1">
                    <img class="ltjt ltjt1" src="../assets/img/ltjt.png">
                    <div class="liaotzs_wrap1">
                    <div class="liaotzs1">{{item.chartComment}}</div>
                    </div>
                    <div class="lefttime" style="float:right;margin-right:0.5rem;">{{item.sendTime}}</div>
                </div>
                </div>
            </div>

            <!-- 图片 -->
            <div v-if="item.chatType==2">
                <!-- 医生图片 -->
                <div v-if="item.sponsor==0" bindlongtap="delete">
                <img :src="doctorImgUrl" class="head_pic head_pic1">
                <div class="liaotian_ck liaotian_ck1">
                    <div class="liaotzs_wrap2" style="margin-right:0.2rem;">
                    <img @click="changebig(item.chatPics)" class="picurl" mode="widthFix" :src="item.chatPics">
                    </div>
                    <div style="clear:both;width:100%;"></div>
                    <div class="lefttime" style="float:right;margin-right:0.5rem;">{{item.sendTime}}</div>
                </div>
                </div>
                <!-- 患者图片 -->
                <div v-if="item.sponsor==1">
                <img :src="patientpic" class="head_pic">
                <div class="liaotian_ck">
                    <div class="liaotzs_wrap2" style="margin-right:0.1rem;float:left;margin-left:0.4rem;">
                    <img @click="changebig(item.chatPics)" class="picurl" mode="widthFix" :src="item.chatPics">
                    </div>
                    <div style="clear:both;width:100%;"></div>
                    <div class="lefttime">{{item.sendTime}}</div>
                </div>
                </div>
            </div>

            <div v-if="item.chatType==3">
                <!-- 医生语音 -->
                <div v-if="item.sponsor==0" @click="play(item.chatRoute1)" bindlongtap="delete">
                <img :src="doctorImgUrl" class="head_pic head_pic1">
                <div class="liaotian_ck liaotian_ck1">
                    <img class="ltjt ltjt1" src="../assets/img/ltjt.png">
                    <div class="liaotzs_wrap1">
                    <div class="liaotzs liaotzspi2" style="float:right;margin-top:0.03rem;margin-right:-0.04rem;text-aling:left;">
                        <img class="yuyinpic1" style="right:0.05rem" src="../assets/img/yuyin1.png">
                        {{item.chartComment}}"
                    </div>
                    <div>{{yuyinru}}</div>
                    <div class="lefttime" style="float:right;margin-top:0.73rem;margin-right:-38%;">{{item.sendTime}}</div>
                    </div>
                </div>
                </div>
                <!-- 患者语音 -->
                <div v-if="item.sponsor==1" @click="play(item.chatRoute1)">
                <img :src="patientpic" class="head_pic">
                <div class="liaotian_ck">
                    <img class="ltjt" src="../assets/img/ltjt.png">
                    <div class="liaotzs_wrap">
                    <div class="liaotzs liaotzspi">
                        <img class="yuyinpic" src="../assets/img/yuyin1.png">
                        {{item.chartComment}}"
                    </div>
                    <div class="lefttime">{{item.sendTime}}</div>
                    </div>
                </div>
                </div>
            </div>
            <!-- 文章 -->
            <div v-if="item.chatType==9||item.chatType==13">
                <!-- 医生 -->
                <div v-if="item.sponsor==0" bindtap="article">
                <img :src="doctorImgUrl" class="head_pic head_pic1">
                <div class="liaotian_ck liaotian_ck1">
                    <img class="ltjt ltjt1" src="../assets/img/tiaolijt.png">
                    <div class="liaotzs_wrap1 tiaoli">
                    <div class="liaotzs1 tiaoli_bac tiaoli">
                        <div class="tiaoli_top">
                        <img class="tiaoli_top_img" src="../assets/img/l12.png">
                        <div class="tiaoli_top_div">已为您制定专属药方，请查收</div>
                        </div>
                        <div class="tiaoli_bot">
                        文章
                        </div>
                    </div>
                    </div>
                    <div class="lefttime" style="float:right;margin-right:0.5rem;">{{item.sendTime}}</div>
                </div>
                </div>
                <!-- 患者 -->
                <div v-if="item.sponsor==1">
                <img :src="patientpic" class="head_pic">
                <div class="liaotian_ck">
                    <img class="ltjt" src="../assets/img/tiaolijt.png">
                    <div class="liaotzs_wrap1">
                    <div class="liaotzs1 tiaoli_bac tiaoli" style="float:left;margin-left:-0.06rem;margin-top:-0.19rem;">
                        <div class="tiaoli_top">
                        <img class="tiaoli_top_img" src="../assets/img/l12.png">
                        <div class="tiaoli_top_div">文章</div>
                        </div>
                        <div class="tiaoli_bot">
                        文章
                        </div>
                    </div>
                    </div>
                </div>
                <div class="lefttime" style="float:right;margin-right:0.5rem;">{{item.sendTime}}</div>
                </div>
            </div>
            <!-- 患者查询问诊单 -->
            <div v-if="item.chatType==11">
                <div v-if="item.sponsor==1" bindtap="lookwenzhen">
                <img :src="patientpic" class="head_pic">
                <div class="liaotian_ck">
                    <img class="ltjt" src="../assets/img/tiaolijt.png">
                    <div class="liaotzs_wrap1">
                    <div class="liaotzs1 tiaoli_bac tiaoli" style="float:left;margin-left:-0.06rem;margin-top:-0.19rem;">
                        <div class="tiaoli_top">
                        <img class="tiaoli_top_img" src="../assets/img/l6.png" style="height:0.3rem;margin-top:0.04rem;">
                        <div class="tiaoli_top_div" style="line-height:0.35rem;">{{patientName}}问诊单</div>
                        </div>
                        <div class="tiaoli_bot">
                        已提交问诊单请查看
                        </div>
                    </div>

                    </div>
                </div>
                <div class="lefttime" style="float:left;margin-left:0.97rem;">{{item.sendTime}}</div>
                </div>
            </div>

            <!-- 评价 -->
            <div v-if="item.chatType==7">
                <!-- 医生 -->
                <div v-if="item.sponsor==0">
                <img :src="doctorImgUrl" class="head_pic head_pic1">
                <div class="liaotian_ck liaotian_ck1">
                    <img class="ltjt ltjt1" src="../assets/img/tiaolijt.png">
                    <div class="liaotzs_wrap1 tiaoli">
                    <div class="liaotzs1 tiaoli_bac tiaoli">
                        <div class="tiaoli_top">
                        <img class="tiaoli_top_img" src="../assets/img/l8.png" style="height:0.3rem;margin-top:0.04rem;">
                        <div class="tiaoli_top_div">欢迎对服务进行评价</div>
                        </div>
                        <div class="tiaoli_bot">
                        邀请评价
                        </div>
                    </div>
                    </div>
                    <div class="lefttime" style="float:right;margin-right:0.5rem;">{{item.sendTime}}</div>
                </div>
                </div>
                <!-- 患者 -->
                <div v-if="item.sponsor==1">
                <img :src="patientpic" class="head_pic">
                <div class="liaotian_ck">
                    <img class="ltjt" src="../assets/img/tiaolijt.png">
                    <div class="liaotzs_wrap1">
                    <div class="liaotzs1 tiaoli_bac tiaoli" style="float:left;margin-left:-0.06rem;margin-top:-0.19rem;">
                        <div class="tiaoli_top">
                        <img class="tiaoli_top_img" src="../assets/img/l8.png" style="height:0.3rem;margin-top:0.04rem;">
                        <div class="tiaoli_top_div">欢迎对服务进行评价</div>
                        </div>
                        <div class="tiaoli_bot">
                        邀请评价
                        </div>
                    </div>

                    </div>
                </div>
                <div class="lefttime" style="float:right;margin-right:0.5rem;">{{item.sendTime}}</div>
                </div>
            </div>

            <!-- 坐诊 -->
            <div v-if="item.chatType==8">
                <!-- 医生 -->
                <div v-if="item.sponsor==0" bindtap="visit">
                <img :src="doctorImgUrl" class="head_pic head_pic1">
                <div class="liaotian_ck liaotian_ck1">
                    <img class="ltjt ltjt1" src="../assets/img/tiaolijt.png">
                    <div class="liaotzs_wrap1 tiaoli">
                    <div class="liaotzs1 tiaoli_bac tiaoli">
                        <div class="tiaoli_top">
                        <img class="tiaoli_top_img" src="../assets/img/xt2.jpg">
                        <div class="tiaoli_top_div">请关注我的坐诊信息</div>
                        </div>
                        <div class="tiaoli_bot">
                        关注坐诊信息
                        </div>
                    </div>
                    </div>
                    <div class="lefttime" style="float:right;margin-right:0.5rem;">{{item.sendTime}}</div>
                </div>
                </div>
            </div>

            <div v-if="item.chatType==12">
                <!-- 医生 -->
                <div v-if="item.sponsor==0">
                <img :src="doctorImgUrl" class="head_pic head_pic1">
                <div class="liaotian_ck liaotian_ck1">
                    <img class="ltjt ltjt1" src="../assets/img/tiaolijt.png">
                    <div class="liaotzs_wrap1 tiaoli">
                    <div class="liaotzs1 tiaoli_bac tiaoli">
                        <div class="tiaoli_top">
                        <img class="tiaoli_top_img" src="../assets/img/gonggao.png">
                        <div class="tiaoli_top_div" style="line-height:35px;">最新公告</div>
                        </div>
                        <div class="tiaoli_bot">
                        请查看我的公告
                        </div>
                    </div>
                    </div>
                    <div class="lefttime" style="float:right;margin-right:0.5rem;">{{item.sendTime}}</div>
                </div>
                </div>
            </div>



            <!-- 开方 -->
            <div v-if="item.chatType==4">
                <!-- 医生 -->
                <div v-if="item.sponsor==0" @click="tiaoli(item.entityId)">
                <img :src="doctorImgUrl" class="head_pic head_pic1">
                <div class="liaotian_ck liaotian_ck1">
                    <img class="ltjt ltjt1" src="../assets/img/tiaolijt.png">
                    <div class="liaotzs_wrap1 tiaoli">
                    <div class="liaotzs1 tiaoli_bac tiaoli">
                        <div class="tiaoli_top">
                        <img class="tiaoli_top_img" src="../assets/img/tiaoli.jpg">
                        <div class="tiaoli_top_div">已为您制定专属药方，请查收</div>
                        </div>
                        <div class="tiaoli_bot">
                        查看调理方案
                        </div>
                    </div>
                    </div>
                    <div class="lefttime" style="float:right;margin-right:0.5rem;">{{item.sendTime}}</div>
                </div>
                </div>
                <!-- 患者 -->
                <div v-if="item.sponsor==1">
                <img :src="patientpic" class="head_pic">
                <div class="liaotian_ck">
                    <img class="ltjt" src="../assets/img/tiaolijt.png">
                    <div class="liaotzs_wrap1">
                    <div class="liaotzs1 tiaoli_bac tiaoli" style="float:left;margin-left:-0.06rem;margin-top:-0.19rem;">
                        <div class="tiaoli_top">
                        <img class="tiaoli_top_img" src="../assets/img/tiaoli.jpg">
                        <div class="tiaoli_top_div">已为您制定专属药方，请查收</div>
                        </div>
                        <div class="tiaoli_bot">
                        查看调理方案
                        </div>
                    </div>
                    </div>
                </div>
                <div class="lefttime" style="float:right;margin-right:0.5rem;">{{item.sendTime}}</div>
                </div>
            </div>

            <div style="width:100%;clear:both;"></div>
            </div>

            <div class="hist" v-if="item.chatType==6&&item.sponsor==0">
            {{item.chartComment}}
            </div>
            <div class="hist" v-if="item.chatType==0&&item.sponsor==0">
            {{item.chartComment}}
            </div>
            <div v-if="item.chatType==5||item.chatType==10&&item.sponsor==0">
            <div class="lefttime" style="text-align:center;margin-left:0;">{{item.sendTime}}</div>
            <div class="hist">
                已将问诊单发送给患者
            </div>
            </div>
            <div style="width:100%;clear:both;"></div>
        </div>
        <div class="loding" :style="{height:lodingH+'px'}">
            <img src="../assets/img/LODING.gif" v-if="loding">
        </div>

        </div>

        <div style="width:100%;height:2.4rem;"></div>
        <!-- 底部 -->
        <div :style="'width:100%;height:100%;display:'+none+';position:fixed;top:0;left:0'">
        </div>
        <div class="dibu_bot">
        <!-- 弹窗 -->

        <form>
            <div class="bottom" catchtouchmove="true">
            <div class="duihua">
                <img :src="yuyinpic" class="bof"><!-- @click="voice" -->
                <div class="huihua" v-show="textarea">
                <input style="line-height:0.65rem;height:0.65rem;" name="text" v-model="kongtext" auto-height maxlength="-1">
                </div>
                <div>
                <div @click="addChatContent" class="fasong_but" v-if="textarea">发送</div>
                </div>
                <div id="ksly" class="speakbuton" hover-class="speakbuton_1" v-show="speakbuton" @touchstart="mytouchstart" @touchend="mytouchend">按住说话</div>
            </div>
            </div>
        </form>


        <div :class="(n==0 ? 'animate1':'animate')">
            <!-- style="display:{{qingchu}}" -->
            <div class="line tan">
            <div class="tan_but" @click="bianzhengkaifang">
                <img src="../assets/img/l1.png">
                <div>辩证开方</div>
            </div>
            <div class="tan_but" @click="picturekaifang">
                <img src="../assets/img/paizhao.png">
                <div>拍照开方</div>
            </div>
            <div class="tan_but">
              <a :href="('tel:'+patientPhone)" class="tel">
                <img src="../assets/img/l2.png">
                <div>电话沟通</div>
              </a>
            </div>
            <div class="tan_but">
                <!-- <img :src="uploadImg"> -->
                <input ref="input" class="uploadPhoto" type="file" name="upload" accept="image/*" multiple="multiple"  @change="handleFileChange">
                <img src="../assets/img/l9.png">
                <div>发送图片</div>
            </div>
           
            </div>
            
            <div class="tan1 line1">
            </div>
        </div>
        <!-- 按钮 -->
        </div>
        <!-- 缓交 -->
        <!-- 弹窗 -->
        <div class="tan_wrap" v-if="showModal" catchtouchmove="true">
        </div>


        <div class="showModalwrap" :style="{height:showModalH+'rem'}">
        <div class="guanbi" bindtap="go">
            <img src="../assets/img/buanbip.png">
        </div>
        <div class="tan_content" catchtouchmove="true" scroll-y="true" style=" white-space: nowrap;">

            <div class="ta_tit">选择我的患教文章</div>

            <!-- 文章 -->
            <div v-for="(item,index) in article"  :key="index">
            <div class="cont_wrap cont_wrap1" bindtap="articleclick">
                <div class="cont_wrap_left">
                <div class="cont_wrap7">{{item.title}}</div>
                <div class="cont_wrap2">导读：{{item.guide}}</div>
                <img class="cont_wrap3" :src="item.state==0?require('../assets/img/bi.png'):require('../assets/img/wenzhang.jpg')">
                <div class="cont_wrap4" v-show="item.state==0">{{item.crateDate}}</div>
                <div class="cont_wrap4" v-show="item.state==1">{{item.sendDate}}</div>
                <div class="cont_wrap5" v-show="item.state==0">添加</div>
                <div class="cont_wrap5" v-show="item.state==1">发送给患者</div>
                <div class="cont_wrap6" v-show="item.state==1">已发送</div>
                <div class="cont_wrap6" v-show="item.state==0">未发送</div>
                </div>
                <div class="cont_wrap_right">
                <img :src="content==index?require('../assets/img/danxuan.png'):require('../assets/img/danxuang1.png')">
                </div>
            </div>
            </div>
            <!-- 文章 -->
        </div>
        <div class="generate" bindtap="confirm">
            <div>确认</div>
        </div>
        </div>

        <!-- 问诊单 -->
        <div class="tan_wrap" catchtouchmove="true" v-if="completetext">
        </div>
        <div class="showModalwrap" :style="{height:completetextH+'rem'}">
        <div class="guanbi" bindtap="completetextgo">
            <img src="../assets/img/buanbip.png">
        </div>
        <div class="tan_content" catchtouchmove="true" scroll-y="true" style=" white-space: nowrap; display: flex">
            <div class="ta_tit">选择发送问诊单</div>
            <div v-for="(item,index) in complete"  :key="index">
            <div class="cont_wrap cont_wrap1" bindtap="completeclick">
                <div class="cont_wrap_left">
                <div class="biaotititle">{{item.name}}</div>
                <text class="flag flag1" v-if="item.first=='man'">成男·默认</text>
                <text class="flag" v-if="item.first=='woman'">成女·默认</text>
                <text class="flag flag2" v-if="item.first=='children'">儿童·默认</text>
                </div>
                <div class="cont_wrap_right">
                <img :src="completecontent==index?require('../assets/img/danxuan.png'):require('../assets/img/danxuang1.png')">
                </div>
            </div>
            </div>
        </div>
        <div class="generate" bindtap="affirmComplete">
            <div>确认</div>
        </div>

        </div>


        <div class="yuyinT" v-if="yuyinhidden">
          <img class="yuyinTimg" src="../assets/img/huatong.gif">
        </div>	
        <div class="yulanBig" v-if="showbigImg" @click="hideBigPic">
          <img :src="bigPic" alt="">
        </div>	
	</div>
</template>
<script>
	import {findPatientMsg,getChatContent,myArticle,addChatContent,sendMsg6,getWxConfig} from "api/doctor"
	import HeadTop from "base/header/header"
    import router from "../router"
    import cookie from "js-cookie"
    import $ from 'jquery'
    import baseURI from 'api/env'
    import axios from 'axios'
    import wx from "weixin-js-sdk"
	export default {
		name : "liaotian",
		data (){
			return {
				pageName:"聊天",
        token:"",
        doctorId:"",
        chartComment: '',
        n: 1,
        none: "none",
        pic: 'l13.jpg',
        text: '更多功能',
        qingchu: 'block',
        showModal: false,
        photo: [],
        photos: [],
        list: [],
        textarea: true,
        yuyinpic: require('../assets/img/bof.jpg'),
        yuyinru:'',
        lastX: 0, //滑动开始x轴位置
        lastY: 0, //滑动开始y轴位置
        currentGesture: 0, //标识手势,
        sendLock: true,
        speakbutonx:'none',
        speakbutony:'none',
        inputShowed:false,
        doctorIdList:'',
        lodingH:'',
        loding:'',
        kongtext:'',
        speakbuton:'',
        showModalH:'',
        article:'',
        completetext:'',
        completetextH:'',
        complete:'',
        yuyinhidden:'',
        patientId:'',
        doctorImgUrl:'',
        chatId:'',
        doctorName:'',
        patientSex:'',
        age:'',
        patientPhone:'',
        patientpic:'',
        showbigImg:false,
        bigPic:'',
        localId:'',
        serverId:'',
        timeS:0,
        timer:null
      }
		},
		created(){
      this.$nextTick(function(){
        this.token = cookie.get("token");
        this.doctorId = cookie.get("doctorId");
        this.patientId = this.$route.query.patientId;
        this.doctorImgUrl = cookie.get("doctorImgUrl");
        this.doctorName = cookie.get("doctorName");
        if(this.$route.query.doctorId){
          this.doctorId = this.$route.query.doctorId;
        }
        if(this.$route.query.doctorImgUrl){
          this.doctorImgUrl = this.$route.query.doctorImgUrl;
        }
        if(this.$route.query.doctorName){
          this.doctorName = this.$route.query.doctorName;
        }
        this.findPatientMsg();
        this.getChatContent();
      })
      
        this.timer = window.setInterval(() => {
            setTimeout(this.getChatContent(), 0);
        }, 3000);

    		},
    		computed :{
    			
        },
        beforeDestroy() {
            if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
                clearInterval(this.timer); //关闭
            }
        },
		methods:{
			findPatientMsg(){
        let list = {
					patientId:this.patientId
				}
				findPatientMsg(list).then((res)=>{
					//console.log(res);
					this.pageName = res.patient.patientName,
          this.patientpic = res.patient.imgUrl,
          this.patientPhone = res.patient.phone,
          this.patientSex = res.patient.patientSex,
          this.age = res.patient.age,
          this.patientName = res.patient.patientName,
          this.speakbutony = 'none',
          this.speakbutonx = 'none'
				})
      },
      getChatContent(){
        let list = {
					doctorId: this.doctorId,
          token: this.token,
          patientId: this.patientId,
          version: 0
				}
				getChatContent(list).then((res)=>{
					//console.log(res);
          this.doctorIdList = res.chatList;
          this.chatId = res.chatId; //聊天id
				})
      },
      myArticle(){
        let list = {
					doctorId: this.doctorId,
          token: this.token
				}
				myArticle(list).then((res)=>{
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
      addChatContent(){
        if(this.kongtext == ''){
          this.$toast('不能发送空白消息');
          return false
        }else{
          let list = {
            version: 0,
            token: this.token,
            chatId: this.chatId,
            chatType: 1, //文字类型
            chartComment: this.kongtext,
            chatPics: '',
            chatVoices: '',
          }
          addChatContent(list).then((res)=>{
            //console.log(res);
            if(res.massage == 'ok'){
              this.getChatContent();
              this.kongtext = '';
              let date = new Date();
              let date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
              let json = [{
                lx:'hz',
                id:this.patientId
              }]
              let listArr = {
                json: JSON.stringify(json),
                d1: "您好！您有一条医生给您发来的消息。",
                d2: "新华医馆问诊平台",
                d3: this.doctorName,
                d4: date1,
                d5: this.patientName,
                d6: "请您点击详情进入查看。",
                type: '3',
                path: 'pages/ysxx/ysxx1?id=' + this.doctorId + '&tab=' + 1+'&doctorImg='+this.doctorImgUrl+'&doctorName='+this.doctorName,
                appid: 'wx2061bee8caa00a0d',
                url:'https://www.mfzhosp.com/H5/#/wenzhenZx?doctorId=' + this.doctorId + '&tab=' + 1+'&doctorImg='+this.doctorImgUrl+'&doctorName='+this.doctorName,
              }
              sendMsg6(listArr).then((res)=>{

              })
            }
          })
        }
      },
      bianzhengkaifang(){
            let user = {
                patientName:this.patientName,
                patientId:this.patientId,
                patientSex:this.patientSex,
                age:this.age,
                patientPhone:this.patientPhone
            }
            cookie.set('patientId',this.patientId);
            cookie.set('patientName',this.patientName);
            cookie.set('patientSex',this.patientSex);
            cookie.set('age',this.age);
            this.$router.push({path:"/zaixiankf",query:{}});
        },
      picturekaifang(){
            let user = {
                patientName:this.patientName,
                patientId:this.patientId,
                patientSex:this.patientSex,
                age:this.age,
                patientPhone:this.patientPhone
            }
            cookie.set('patientId',this.patientId);
            cookie.set('patientName',this.patientName);
            cookie.set('patientSex',this.patientSex);
            cookie.set('age',this.age);
            this.$router.push({path:"/paizhaokf",query:{}});
        },
      handleFileChange(event){//上传图片
            var files = this.$refs.input.files;
            var that = this;
            let param = new FormData(); // 创建form对象
                param.append("file",files[0]);
                if (files.length === 0) {
                  return false;
                }
              axios.post(baseURI+'/mkkMoblie/uploadFile/picture',param,{
                headers:{'Content-Type':'multipart/form-data'}
              }).then(response => {
                //console.log(response)
                let chatPics = baseURI + '/mkkMoblie/'+response.data;
                    this.addChatPic(chatPics);
              }).catch(error => {
                alert('上传图片出错！');
              })
        },
      addChatPic(chatPics){
          let list = {
            version: 0,
            token: this.token,
            chatId: this.chatId,
            chatType: 2, //文字类型
            chartComment: '',
            chatPics: chatPics,
            chatVoices: '',
          }
          addChatContent(list).then((res)=>{
            //console.log(res);
            if(res.massage == 'ok'){
              this.getChatContent();
              let date = new Date();
              let date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
              let json = [{
                lx:'hz',
                id:this.patientId
              }]
              let listArr = {
                json: JSON.stringify(json),
                d1: "您好！您有一条医生给您发来的图片。",
                d2: "新华医馆问诊平台",
                d3: this.doctorName,
                d4: date1,
                d5: this.patientName,
                d6: "请您点击详情进入查看。",
                type: '3',
                path: 'pages/ysxx/ysxx1?id=' + this.doctorId + '&tab=' + 1+'&doctorImg='+this.doctorImgUrl+'&doctorName='+this.doctorName,
                appid: 'wx2061bee8caa00a0d',
                url:'https://www.mfzhosp.com/H5/#/wenzhenZx?doctorId=' + this.doctorId + '&tab=' + 1+'&doctorImg='+this.doctorImgUrl+'&doctorName='+this.doctorName,
             }
              sendMsg6(listArr).then((res)=>{

              })
            }
          })
      },
      changebig(img){
          this.showbigImg = true;
          this.bigPic = img;
      },
      hideBigPic(){
          this.showbigImg = false;
          this.bigPic = '';
      },
      tiaoli(prescriptionId){
        this.$router.push({path:'/tiaoli',query:{prescriptionId:prescriptionId,patientId:this.patientId}})
      },
      goBack(){
          this.$router.push({path:'/zixunHuan',query:{}});
      },
      voice(){
        this.speakbuton = !this.speakbuton;
        this.textarea = !this.textarea;
      },
      getWxConfig(){
        $.ajax({
            url : "https://www.mfzhosp.com/mkkMoblie/accessToken/getWxConfig",
            type : 'post',
            dataType : 'json',
            data : {
                'url' : location.href.split('#')[0]
            },
            success : function(data) {
                wx.config({
                    debug : false,
                    appId : data.appId,
                    timestamp : data.timestamp,
                    nonceStr : data.nonceStr,
                    signature : data.signature,
                    jsApiList : [ 'checkJsApi', 'onMenuShareTimeline',
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
                            'openCard' ]
                });
                wx.ready(function(){

                })
                wx.error(function(res){
                  //alert(res)
                })
            }
        });
      },
      mytouchstart(){
        setTimeout(() => {
          this.longPress();
        },500)      		
      },
      longPress(){
        wx.startRecord();
        this.yuyinhidden = true;
        setTimeout(function(){
            this.timeS += 1;
        }, 1000);
      },
      mytouchmove(){
          wx.stopRecord({
            success: function (res) {
              this.localId = res.localId;
            }
          });
          this.yuyinhidden = false;
          
      },
      mytouchend(){
          wx.stopRecord({
            success: function (res) {
              this.localId = res.localId;
              alert(res.localId,'正常结束录音成功了')
              this.wxUpload();
              this.myArticle();
            }
          });
          this.yuyinhidden = false;
      },
      wxUpload(){
        wx.uploadVoice({
          localId: this.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
        success: res => {
          alert(res.serverId)
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
                version: 0,
                token: this.token,
                chatId: this.chatId,
                chatType: 3, //语音类型
                chartComment: this.timeS,
                chatPics: '',
                chatVoices: imgUrl,
                chatRoute1:this.serverId
              }
              addChatContent(list).then((res)=>{
                console.log(res);
                if(res.massage == 'ok'){
                  this.getChatContent();
                  let date = new Date();
                  let date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                  let json = [{
                    lx:'hz',
                    id:this.patientId
                  }]
                  let listArr = {
                    json: JSON.stringify(json),
                    d1: "您好！您有一条医生给您发来的语音。",
                    d2: "新华医馆问诊平台",
                    d3: this.doctorName,
                    d4: date1,
                    d5: this.patientName,
                    d6: "请您点击详情进入查看。",
                    type: '3',
                    path: 'pages/ysxx/ysxx1?id=' + this.doctorId + '&tab=' + 1+'&doctorImg='+this.doctorImgUrl+'&doctorName='+this.doctorName,
                    appid: 'wx2061bee8caa00a0d',
                  }
                  sendMsg6(listArr).then((res)=>{

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
      play(chatRoute1){
        wx.playVoice({
          localId: chatRoute1 // 需要播放的音频的本地ID，由stopRecord接口获得
        });
        // wx.stopVoice({
        //    localId: chatRoute1 // 需要暂停的音频的本地ID，由stopRecord接口获得
        // });
      }
		},
		components :{
			 HeadTop
    },
    watch: {  //hotkeyList渲染完后，获取高度
          doctorIdList:function() {
              this.$nextTick(function(){
                document.documentElement.scrollTop = this.$refs.page.offsetHeight
                document.body.scrollTop = this.$refs.page.offsetHeight
            });               
          }
        },
	}
</script>

<style lang="less" scoped>
	@import "../assets/less/base.less";
/* pages/liaotian/liaotian.wxss */
.backBlack{
  position:fixed!important;
  left:0;
  top:0;
}
.backGo{
  position: fixed;
  left:0.34rem;
  top:0.32rem;
  width:0.3rem;
  height:0.38rem;
  //background:#fff;
  z-index:99999999;
}
.yulanBig{
  position: fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,1);
  z-index:99999999;
  img{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
}
.liaotian {
  height: 100%;
  background: #f1f1f1;
  width: 100%;
}

.pages {
    padding: .16rem .23rem;
    box-sizing: border-box;
    width: 100%;
    height:auto;
    clear: both;
    margin-top:0.6rem;
    background:#f1f1f1;
  //height:74%;
  //overflow-y:scroll;
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

.look {
  width: 100%;
  text-align: center;
  line-height: .36rem;
  color: #787878;
  font-size: .27rem;
}

.left_liao {
  width: 100%;
  margin: .68rem 0;
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
  margin-top: .26rem;
}

.liaotian_ck1 {
  float: right;
  width: 80%;
  margin-top:.08rem;
}

.ltjt {
  width: .48rem;
  height: .48rem;
}

.liaotzs_wrap {
  width: 94%;
  float:left;
}

.liaotzs_wrap1 {
  width: 90%;
  float: right;
}

.liaotzs_wrap2 {
  width: 40%;
  float: right;
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
  font-size: .29rem;
  float: left;
  margin-top: -0.75rem;
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
  font-size: .29rem;
  float: right;
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

.tiaoli_top_div {
  color: #565656;
  font-size: .31rem;
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
  padding: .10rem .32rem;
  box-sizing: border-box;
  font-size: .27rem;
  color: #717171;
  background: #d0d1d0;
  line-height: 30tpx;
  border-radius: .10rem;
  margin-bottom: .17rem;
  text-align: center;
  display: table;
  margin: .20rem auto;
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
  border-top:1px solid #d0d1d0;
  padding: 0 .24rem;
  box-sizing: border-box;
  position: relative;
}

.bof {
  width: .80rem;
  height: .80rem;
  float: left;
  margin-top: .15rem;
}

.huihua {
  float: left;
  width: 5.00rem;
  margin: .20rem 0 0;
  border-bottom:1px solid #d0d1d0;
  margin-left: .13rem;
  /* border-radius: .10rem; */
  font-size: .29rem;
  /* padding: .12rem 0; */
  box-sizing: border-box;
  /* height: .50rem; */
}

.fasong_but {
  /* width: .64rem; */
  height: .60rem;
  color: #fff;
  text-align: center;
  background: #00b0c2;
  font-size: .33rem;
  line-height: .52rem;
  float: right;
  border-radius: .10rem;
  margin-top: .15rem;
  padding:.05rem .15rem;
  border:none;
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
  width: 25%;
  height: 1.10rem;
  margin-top: .26rem;
  position: relative;
}
.tan_but .uploadPhoto{
  width:90%;
  height:1.1rem;
  position: absolute;
  right:0;
  top:0;
  opacity: 0;
}
.tan_but img {
  width: .40rem;
  height: .40rem;
  display: block;
  margin: 0 auto;
}

.tan_but div {
  text-align: center;
  font-size: .29rem;
  color: #00b0c2;
  line-height: .60rem;
}

.bottom {
  width: 100%;
  height: 1.00rem;
  background: white;
  position: fixed;
  bottom:0rem;
  left:0rem;
  z-index: 999;
  padding: .10rem 0;
}

.line {
  width: 100%;
  position: relative;
}

.animate {
  position: absolute;
  bottom: -1.96rem;
  left:0rem;
  width: 100%;
  transition: all 0.5s;
}

.animate1 {
  position: absolute;
  bottom: .75rem;
  left:0rem;
  width: 100%;
  transition: all 0.5s;
}

.line1 {
  width: 100%;
  height: 3.04rem;
  border-bottom: 1px solid #fff;
  position: relative;
}

/* 弹窗 */

.tan_wrap {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  overflow: hidden;
}

.showModalwrap {
  width: 100%;
  height: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  transition: all 0.5s;
}

.tan_content {
  width: 100%;
  height: 6.94rem;
  background: #fff;
  margin-top: .20rem;
  padding: 0 .23rem;
  box-sizing: border-box;
  overflow: auto;
}

.ta_tit {
  text-align: center;
  color: #222;
  font-size: .33rem;
  line-height: .93rem;
  height: .93rem;
  border-bottom:1px dashed #d0d1d0;
  background: #fff;
  left: 0;
  width: 100%;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.guanbi {
  width: .50rem;
  height: .50rem;
  border-radius: 50%;
  text-align: center;
  line-height: .30rem;
  position: absolute;
  top: 3px;
  right: .23rem;
  z-index: 999999;
}

.guanbi img {
  width: 100%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}

.cont_wrap1 {
  border-bottom:1px solid #d2d2d2;
}

.generate {
  width: 100%;
  height: .90rem;
  background: #fff;
  padding: .10rem .23rem;
  box-sizing: border-box;
}

.generate div {
  color: #fff;
  background: #00b0c2;
  text-align: center;
  line-height: .72rem;
  height: .72rem;
  width: 100%;
  border-radius: .10rem;
  font-size: .33rem;
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

.cont_wrap_right img {
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
  font-size: .35rem;
  color: #222;
  line-height: .56rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cont_wrap2 {
  width: 100%;
  font-size: .31rem;
  color: #717171;
  text-indent: 1.5px;
  overflow: hidden; /*内容超出后隐藏*/
  text-overflow: ellipsis; /* 超出内容显示为省略号*/
  white-space: nowrap; /*文本不进行换行*/
}

.cont_wrap3 {
  width: .39rem;
  height: .43rem;
  float: left;
  margin-top: .23rem;
}

.cont_wrap4 {
  font-size: .27rem;
  color: #717171;
  float: left;
  line-height: .92rem;
  margin: 0 .30rem;
}

.cont_wrap5 {
  font-size: .27rem;
  color: #717171;
  float: left;
  line-height: .92rem;
}

.cont_wrap6 {
  font-size: .27rem;
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

.add_pic img {
  width: .47rem;
  height: .47rem;
  /* margin-top: .19rem; */
  display: block;
  margin: 0 auto;
}

.recommend_tit {
  width: 100%;
  color: #00b0c2;
  font-size: .31rem;
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

.search div {
  color: #fff;
  font-size: .31rem;
  text-align: center;
  line-height: .72rem;
}

.search img {
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
  margin: .10rem 0;
  margin-left: .58rem;
  border:1px solid #d0d1d0;
  font-size: .29rem;
  padding:.2rem 0;
  box-sizing: border-box;
  color: #717171;
  text-align: center;
  user-select:none;
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
  font-size: .31rem;
  line-height: 1.97rem;
  color: #222;
}

.flag {
  float: right;
  font-size: .27rem;
  border:1px solid #f5253e;
  color: #f5253e;
  height: .32rem;
  line-height: .30rem;
  padding: 0 .08rem;
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
  border:1px solid #00b0c2;
  color: #00b0c2;
}

.flag2 {
  border:1px solid #23b483;
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
  font-size: .31rem;
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
  height: 2.00rem;
  transition: all 0.5s;
  position: relative;
}

.loding img {
  width: .40rem;
  height: .40rem;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(0, -50%);
}

.ball {
  width: 100%;
  height: 20px;
  text-align: center;
  font-size: .28rem;
  color: #717171;
  margin-top: 1.00rem;
}
	
</style>