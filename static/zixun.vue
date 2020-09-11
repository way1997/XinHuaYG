<template>
	<div class="zixun">
		<div class="search">
            <input type="text" placeholder="输入患者姓名">
        </div>
        <div class="huanList">
            <div class="detail" v-for="(item,index) in huanzhe"  :key="index">
                <img :src="item.patientImgUrl" alt="">
                <div class="name">{{item.patientName}}</div>
                <div class="phone">2020-09-09</div>
                <div class="sexs">
                    <span><img :src="item.patientSex==1?require('../assets/img/sex2.png'):require('../assets/img/sex1.png')" alt="">{{item.age||item.patientAge}}岁</span>
                </div>
                <p>吃个饭赶紧回家补补觉...</p>
            </div>
        </div>
        <tabBar/>
	</div>
</template>
<script>
	import {purchaseList,findChatPatient,remindPurchase} from "api/doctor"
	import HeadTop from 'base/header/header'
    import router from '../router'
    import cookie from "js-cookie"
    import tabBar from '../components/patientTabBar'
	export default {
		name : "zixun",
		data (){
			return {
                huanzhe:[],
                token:'',
                doctorId:''
			}
		},
		created(){
			this.token = cookie.get("token");
			this.doctorId = cookie.get("doctorId");
            this.findChatPatient();
		},
		computed :{
			
		},
		
		methods:{
			findChatPatient(){
				let list = {
					token:this.token,
					doctorId:this.doctorId
				}
				findChatPatient(list).then((res)=>{
					//console.log(res);
					if (res.data.length == 0) {
						//this.beijing = true;
                    }else{
                        this.huanzhe = res.data;
                        //this.loadUp = false;
					}
				})
            },
		},
		components :{
			 tabBar
		}
	}
</script>

<style lang="less" scoped>
	@import '../assets/less/base.less';
	.search{
        width:681px;
        height:67px;
        font-size:30px;
        margin:0 auto;
        margin-top:20px;
        input{
            width:100%;
            height:67px;
            border:1px solid rgba(136, 136, 136, 1);
            border-radius:33px;
            font-size:30px;
            text-align: center;
        }
    }
    .huanList{
        width:700px;
        margin:0 auto;
        padding-top:20px;
        >div.detail{
            width:100%;
            height:200px;
            border-bottom:1px solid #e3e3e3;
            img{
                width:100px;
                height:100px;
                border-radius:50%;
                float:left;
                margin-top:45px;
                margin-left:10px;
            }
            .name,.phone{
                width:40%;
                padding-top:40px;
            }
            .name{
                font-size:27px;
                color:#5D5D5D;
                padding-left:20px;
                float:left;
            }
            .phone{
                font-size:24px;
                color:#B4B4B4;
                float:right;
                text-align: right;
                padding-right:10px;
            }
            .sexs,.nan{
                width:80%;
                float:left;
                padding-left:20px;
            }
            .sexs span{
                width:134px;
                height:41px;
                float:left;
                background:#F77B7B;
                border-radius:21px;
                font-size:24px;
                line-height: 41px;
                color:#fff;
                margin-right:10px;
                margin-top:10px;
                img{
                    width:29px;
                    height:29px;
                    vertical-align: middle;
                    margin:5px 10px 0 20px;
                }
            }
            .nan span{
                width:134px;
                height:41px;
                float:left;
                margin-top:10px;
                background:#42CAC6;
                border-radius:21px;
                font-size:24px;
                line-height: 41px;
                color:#fff;
                margin-right:10px;
                img{
                    width:29px;
                    height:29px;
                    vertical-align: middle;
                    margin:0 10px;
                }
            }
            p{
                font-size:2px;
                width:80%;
                float:left;
                color: #bfbfbf;
                padding-top:30px;
                padding-left:20px;
            }
        }
    }
</style>