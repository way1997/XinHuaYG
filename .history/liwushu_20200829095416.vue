<template>
	<div class="liwu">
        <div class="backHome" @click="goBack">返回个人中心</div>
		<div class="warp">
            <div class="foot">
                <div><img src="../assets/img/hongquan_03.png"> 收到{{numbern}}次答谢</div>
            </div>
            <div class="liwu_list" v-for="(item,index) in list" :key="index">
                <img :src="item.patientImgUrl" class="touxiang">
                <div class="name_wrap">
                <div>{{item.patientName}}送出{{item.givingName}}</div>
                <div>{{item.giftTime}}</div>
                </div>
                <img :src="'https://www.mfzhosp.com'+item.giftPircture" class="liwupic"> 
            </div>
        </div>
	</div>
</template>
<script>
	import {giftList} from "api/doctor"
	import HeadTop from 'base/header/header'
    import router from '../router'
    import cookie from "js-cookie"
	export default {
		name : "liwu",
		data (){
			return {
				hidden:false,
                list:[],
                numbern:0,
                token:'',
                doctorId:''
			}
		},
		created(){
			this.token = cookie.get('token');
            this.doctorId = cookie.get('doctorId');
            this.giftList();
		},
		computed :{
			
		},
		
		methods:{
            goBack(){
                this.$router.push('/homePage')
            },
			giftList(){
                let list = {
                    token:this.token,
                    doctorId:this.doctorId
                }
                giftList(list).then((res)=>{
                    this.list = res.list_order;
                    this.numbern = res.number;
                })
            },
		},
		components :{
			 
		}
	}
</script>

<style lang="less" scoped>
	@import '../assets/less/base.less';
	.backHome{
        width:611px;
        height:76px;
        background:#00afc2;
        border-radius:13px;
        text-align: center;
        line-height: 76px;
        color:#fff;
        font-size:25px;
        margin:0 auto;
        margin-top:20px;
        margin-bottom:20px;
    }
    .warp {
    width: 100%;
    background: #fff;
    }

    .foot {
        width: 300px;
        text-align: center;
        height: .88rem;
        margin:0 auto;
    }

    .foot img {
        width: .40rem;
        height: .40rem;
        margin-left:25px;
        margin-top:-10px;
        vertical-align: middle;
    }

    .foot div {
        font-size: 25px;
        color:#00afc2;
        line-height: .88rem;
    }

    // .foot div div {
    // color: #f43e58;
    // display: inline;
    // }

    .liwu_list {
        padding: 0 .23rem;
        box-sizing: border-box;
        width: 100%;
        height: 1.24rem;
        border-bottom:1px solid #cecece;
        position: relative;
        &:last-child{
            border:none;
        }
    }

    .touxiang {
        width: .60rem;
        height: .60rem;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: 50%;
    }

    .name_wrap {
        width: 66%;
        height: 100%;
        float: left;
        font-size: 25px;
        margin-left: .85rem;
        padding: .20rem 0;
        box-sizing: border-box;
    }

    .name_wrap div:nth-child(1) {
        color: #828282;
    }
    .name_wrap div:nth-child(2) {
        color: #bebebe;
        padding-top:0.15rem;
        font-size:22px;
    }

    .liwupic {
        width: 72px;
        height: 72px;
        float: right;
        position: absolute;
        top: 0;
        bottom: 10px;
        right: .24rem;
        margin: auto;
    }
</style>