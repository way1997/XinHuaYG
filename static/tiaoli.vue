<template>
	<div class="tiaoli">
		<HeadTop :title="pageName" :backBlack="true"></HeadTop>
		<!--pages/tiaoli/tiaoli.wxml-->
        <div class="top">
        <div class="time_Data">
            <div>开方时间：</div>{{createDate}}
        </div>
        </div>
        <div class="dialectical">
        <div class="dialectical_tit">▪辩证▪</div>
        <div class="dialectical_te">
            <div>【患者信息】</div>
            <div>{{patientName}}</div>
            <div v-if="patientSex==1">男</div>
            <div v-if="patientSex==2">女</div>    
            <div>{{patientAge}}岁</div>
        </div>
        <div class="dialectical_te">
            <div>【诊断】</div>
            <div>{{sickName}}</div>
        </div>
        <div style="width:100%;clear:both"></div>
        </div>
        <!-- 开方 -->
        <div class="extraction">
        <div class="dialectical_tit">▪开方▪</div>
        <div class="yaofang2">
            <div class="yaofang2_t">R:</div>
            <div class="tishi">
            <div class="tishiMifang" v-if="modelName"><div>秘方：</div><div>{{modelName}}</div></div>
            <div class="tishi_yaoc" v-for="(item,index) in pd_lists" :key="index">{{item.medicineName}} {{item.howWeight}}{{item.drugUnit}}
            <span style="color:red;font-size:0.3rem;border:1px solid red;border-radius:5rem;">{{item.drugType==11?"秘":"普"}}</span></div>
            
            </div>
        </div>
        <div class="num" v-if="prescriptiontext">共
            <div>{{preNum}}</div> 剂，每日
            <div>{{preOnce}}</div> 剂，1剂分
            <div>{{dayNum}}</div> 次服用</div>
        </div>
        <div style="clear:both;"></div>
        <!-- 选填 -->
        <div class="select_fill">
        <div class="dialectical_tit">▪选填▪</div>
       
        <div class="select_t" style="clear:both">
            <div>【诊金】</div>
            <div v-for="(item,index) in list_price" :key="index" v-show="item.moneyDescribe==5" style="font-size:0.3rem;">￥{{item.money}}</div>
        </div>
        <div class="select_t">
            <div>【购药前可查看药方】</div>
            <div v-if="isPayLook==0">不可看</div>
            <div v-if="isPayLook==1">可看</div>
            
        </div>
        <div class="select_t">
            <div>【服药禁忌】</div>
            <span v-for="(item,index) in taboo" :key="index">{{item.tabooName}}</span>
        </div>
        <div class="select_t">
            <div>【补充说明】</div>
            <div>{{preEnjoin}}</div>
        </div>
        </div>
        <!-- 明细 -->
        <div class="detail">
        <div class="dialectical_tit">▪明细▪</div>
        <div class="detail_T">

            <div class="detail_wrap">
            <div class="detail_wrap_1">诊金</div>
            <div class="num_s" v-for="(item,index) in list_price" :key="index" v-show="item.moneyDescribe==5">
                ¥{{item.money}}
            </div>
            <div class="num_s" v-if="money">
                ¥{{money}}
            </div>
            </div>
        </div>

        <div class="total">
            <div>
            <div>药费</div>
            </div>
            <div>¥ {{price2}}</div>
            
            <div class="reminder">*患者购药时不可变更药房状态</div>
            <div class="reminder">*治疗服务费请根据平台上限收取，超过将仅收取上限值</div>
            <div class="reminder">*患者端仅展示药价和治疗服务费总和，不展示明细</div>
            
        </div>
        <div class="totals">
            <div>总计¥ {{price}}</div>
        </div>
        </div>
        <!-- <div class="zaicikf" bindtap="againExtraction" v-if="doctorHiden">再次开方</div> -->
        <div class="white1" >
        <div>【医生签名】</div>
        <div>{{doctorName}}</div>
        </div>
	</div>
</template>
<script>
	import {doctorFindPatientPlan} from "api/doctor"
	import HeadTop from "base/header/header"
    import router from "../router"
    import cookie from "js-cookie"
	export default {
		name : "tiaoli",
		data (){
			return {
				pageName:"调理方案",
        token:"",
        doctorId:"",
        doctorHiden:false,
        patientIds:[],
        patientName:'',
        patientSex:'',
        patientAge:'',
        prescriptionId:'',
        patientId:'',
        createDate:'',
        prescriptiontext:'',
        isPayLook:0,
        list_price:'',
        taboo:'',
        money:'',
        price:'',
        doctorName:'',
        price2:'',
        preEnjoin:'',
        preNum:'',
        preOnce:'',
        dayNum:'',
        modelName:'',
        pd_lists:'',
        sickName:''
			}
		},
		created(){
			this.token = cookie.get("token");
            this.doctorId = cookie.get("doctorId");
            //this.user = JSON.parse(this.$route.query.user);
            this.prescriptionId = this.$route.query.prescriptionId;
            this.patientId = this.$route.query.patientId;
            this.doctorFindPatientPlan();
		},
		computed :{
			
		},
		
		methods:{
			doctorFindPatientPlan(){
                let list = {
                    doctorId: this.doctorId,
                    token: this.token,
                    patientId: this.patientId,
                    prescriptionId: this.prescriptionId
                }
                doctorFindPatientPlan(list).then((res)=>{
                    this.doctorName = res.map_patient.doctorName,//医生签名
                    this.patientName = res.map_patient.patientName,//病人姓名
                    this.patientSex = res.map_patient.patientSex,//病人性别
                    this.patientAge = res.map_patient.patientAge,//病人年龄
                    this.sickName = res.map_patient.symptom,//症状
                    this.prescriptionNum = res.map_patient.prescriptionNum,//开方次数
                    //this.shopName = res.map_patient.shopName,//药店名
                    this.preNum = res.map_patient.preNum,//一共多少挤
                    this.preOnce = res.map_patient.preOnce,//每剂多少次服
                    this.dayNum = res.map_patient.dayNum,//每天几次
                    this.pd_lists = res.map_patient.pd_lists,//药材
                    this.modelName = res.modelName,//秘方
                    this.serviceCharge = res.map_patient.serviceCharge,//服务费
                    this.preShapeId = res.map_patient.preShapeId,
                    this.preShapeName = res.map_patient.preShapeName,
                    this.brandId = res.map_patient.brandId,
                    this.brandName = res.map_patient.brandName,
                    this.randName = res.map_patient.randName,
                    // this.lists_indent = res.lists_indent,//费用类型(1、药材费  2、制作费用  3、代煎费用 4、配送费用 5、诊金 6、医生服务费   不含代煎费用 和配送费用)
                    this.money = res.map_patient.money,//金额
                    this.isPayLook = res.map_patient.isPayLook,//购药前是否可查看药方 
                    this.taboo = res.map_patient.taboo,//服药禁忌
                    this.preEnjoin = res.map_patient.preEnjoin,//补充说明
                    this.price = res.map_patient.price,//药放
                    this.price2 = res.map_patient.price2,//药材费
                    this.createDate = res.map_patient.createDate,//时间
                    this.list_price = res.map_patient.list_price
                })
            }
		},
		components :{
			 HeadTop
		}
	}
</script>

<style lang="less" scoped>
	@import "../assets/less/base.less";
/* pages/tiaoli/tiaoli.wxss */
.tiaoli{
  background: #f1f1f1;
  //padding: 0 .23rem;
  box-sizing: border-box;
}
.top{
  height: .84rem;
  width: 1005;
  line-height: .84rem;
  padding: .25rem .23rem;
  box-sizing: border-box;
}
.number{
  color: #fff;
  font-size: .30rem;
  width: .94rem;
  height: .36rem;
  line-height: .36rem;
  text-align: center;
  background: #00b0c2;
  border-radius: .10rem;
  float: left;
  margin-right: .15rem;
}
.number div{
  display: inline;
}
.time_Data{
  font-size: .30rem;
  color: #222222;
  float: left;
  line-height: .36rem;
}
.time_Data div{
  display: inline;
}
.dialectical{
  margin: .18rem 0;
  width: 100%;
  /* height: 2.00rem; */
  background: #fff;
  padding:  .26rem .18rem;
  box-sizing: border-box;
}
.dialectical_tit{
  text-align: center;
  color: #222222;
  font-size: .30rem;
}
.dialectical_te{
  float: left;
}
.dialectical_te div{
  color: #222222;
  font-size: .30rem;
  float: left;
  margin-top: .27rem;
  margin-right: .20rem;
}
.dialectical_te div:nth-child(1){
  color: #222222;
  font-size: .30rem;
  float: left;
  margin-top: .27rem;
}
.dialectical_te input{
  font-size: .30rem;
  color: #717171;
  float: left;
  width: 2.41rem;
  margin-left: .26rem;
  margin-top: .21rem;
}
.select{
  float: left;
  margin-top:.04rem;
  margin-right: .43rem;
}
.select div{
  color: #222222;
  font-size: .30rem;
margin-top:.05rem;
}
.select1 div{
  color: #222222;
  font-size: .30rem;

}
.select1{
  float: left;
  margin-top:.04rem;
}
.dialectical_te1{
  float: left;
}
.dialectical_te1 div:nth-child(1){
  color: #222222;
  font-size: .30rem;
  float: left;
  margin-top: .14rem;
}
.dialectical_te1 input{
  font-size: .30rem;
  color: #717171;
  float: left;
  width:5.37rem;
  margin-left: .26rem;
  margin-top:.06rem;

}
/* 开方 */
.extraction{
  width: 100%;
  background: #fff;
  padding: .26rem .23rem; 
  box-sizing: border-box;
}
.num_s {
  float: right;
}
.num_s div{
 float: left
 
}
.yaofang{
  width: 100%;
  height: .70rem;
  margin-top: .23rem;
  border-bottom:1px dashed #d2d2d2;
}
.yaofang div:nth-child(1){
  color: #222222;
  font-size: .30rem;
  float: left;
  line-height: .35rem;
}
.yaofang div:nth-child(3){
  color: #222222;
  font-size: .28rem;
  float: right;
  line-height: .37rem;
}
.yaofang img:nth-child(2){
    margin-left:.08rem;
    width:.40rem;
    height:.40rem;
    float:right;
}
.yaofang div:nth-child(4){
  color: #717171;
  font-size: .28rem;
  clear: both;
  line-height: .70rem;
}
.yaofang1{
  width: 100%;
  height: .70rem;
  border-bottom:1px dashed #d2d2d2;
}
.yaofang1 div:nth-child(1){
  color: #717171;
  font-size: .28rem;
  float: left;
  line-height: .70rem;
}
.yaofang1 div:nth-child(3){
  color: #222222;
  font-size: .28rem;
  float: right;
  line-height: .70rem;
}
.yaofang1 img:nth-child(2){
    width:.40rem;
    height:.40rem;
    float:right;
    margin-top:.17rem;
    margin-left:.08rem;
}
.yaofang2{
  padding: .30rem 0;
  box-sizing: border-box; 
}
.yaofang2_t{
  color: #222222;
  font-size: .34rem;
}
.tishi{
  color: #222222;
  font-size: .30rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: .17rem;
}
.tishiMifang{
width: 100%;
float: left;
height:.50rem;
}
.tishiMifang div{
float: left;
}
.tishi_yaoc{
  float: left;
  margin-right: .53rem;
  line-height: 0.6rem;
}
.tishi_yaoc div{
  display: inline;
}
.tishi3{
  color: #f13a3a;
  font-size: .28rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: .17rem;
}
.tishi1{
  border-bottom:1px dashed #d2d2d2;
  clear: both;
  width: 100%;
  height: .60rem;
}
.tishi1 img{
  width: .30rem;
  height: .30rem;
  float: left;
  margin-top: .18rem;
}
.tishi1 div{
  float: left;
  color: #00b0c2;
  font-size: .28rem;
  margin-left: .18rem;
   margin-top: .18rem;
}
.num{
  color: #717171;
  font-size: .28rem;
  letter-spacing:.02rem;
  padding-bottom: .30rem;
}
.num input{
  color: #f13a3a;
  display:block;
  width: .26rem;
  float: left;
  margin-top:-.10rem;
 text-align: center
}
.input_color{
  color: red;
}
/* 选填 */

.select_fill{
  width: 100%;
  background: #fff;
  padding: .26rem .23rem; 
  box-sizing: border-box;
  margin-top: .17rem;
  display: flex;
  flex-direction:column;
}
.select_t{
  width: 100%;
  line-height: .70rem;
}
.select_t span{
  color: #222222;
  margin-right: .23rem;  
  font-size: .28rem;
  float:left;
}
.select_t div:nth-child(1){
  color: #222222;
  font-size: .30rem;
  float: left;
}
.select_t div:nth-child(2){
  color: #222222;
  font-size: .28rem;
}
.select_t div:nth-child(2) div{
  display: inline;
}
.select_t1{
  width: 100%;
  line-height: .70rem;

}
.checkbox{
  float: left;
  width: .29rem;
  height: .29rem;
  margin: .19rem .20rem 0 .20rem;
}
.select_t1 div:nth-child(2){
  color: #222222;
  font-size: .30rem;
  float: left;
  margin-right: .55rem;
}
.select_t1 div:nth-child(3){
  color: #717171;
  font-size: .28rem;
  margin-left: 29%;
}
/* 明细 */
.detail{
  width: 100%;
  background: #fff;
  padding: .26rem .23rem 0 .23rem; 
  box-sizing: border-box;
  margin-top: .17rem;
  text-align: center;
  margin-bottom: .17rem;
}
.detail_T{
  width: 100%;
  color: #222222;
  font-size: .30rem;
  padding-bottom: .70rem;
  border-bottom:1px dashed #d2d2d2;

}
.detail_wrap{
  width: 100%;
  line-height: .49rem;
  clear: both;
}
.detail_wrap_1{
  float: left;
}
.total{
  width: 100%;
  padding-bottom:40%; 
}
.total div:nth-child(1) div:nth-child(1){
  color: #222222;
  font-size: .30rem;
  float: left;
  line-height: .80rem;
  
}
.total div:nth-child(1) div{
  color: #717171;
  font-size: .26rem;
  float: left;
  line-height: .80rem;
}
.total div:nth-child(2){
  float: right;
  color: #222222;
  font-size: .30rem;
  line-height: .80rem;
}
.reminder{
  font-size: .26rem;
  color: #717171;
  float: left;
  clear: both;
  line-height: .42rem;
}
.yincmx{
  width: 100%;
  height: .69rem;
  line-height: .69rem;
  text-align: center;
  font-size: .28rem;
  color: #717171;
}
.generate{
  width: 100%;
  height: .90rem;
  background: #fff;
  padding:  .10rem .23rem;
  box-sizing: border-box;


}
.generate div{
  color: #fff;
  background: #00b0c2;
  text-align: center;
  line-height: .72rem;
  height: .72rem;
  width: 100%;
  border-radius: .10rem;
  font-size: .32rem;
}
.zaicikf{
  width: 100%;
  font-size: .30rem;
  line-height: .64rem;
  text-align: right;
  color: #00b0c2;
}
.white1{
  background: #fff;
  width: 100%;
  line-height: .90rem;
  color: #222222;
  font-size: .30rem;
}
.white1 div{
  display: inline;
}
.num div{
  color: #f13a3a;
  display: inline;
  
}
.totals{
    font-size:0.34rem;
}
</style>