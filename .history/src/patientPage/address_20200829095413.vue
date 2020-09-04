<template>
	<div class="userAddress">
		<div class="backHome" @click="goBack">返回上一级</div>
        <div class="xian"></div>
        <div class="list">
            <div v-for="(item,index) in shou" :key="index">
                <div>{{item.recipient}} {{item.repPhone}}<span @click="deleteAdd(item.recipientId)"><img src="../assets/img/delete1.png" alt="">删除</span></div>
                <div>{{item.address}}<span @click="goDizhi(item)"><img src="../assets/img/bianji.png" alt="">编辑</span></div>
            </div>
        </div>
        <div class="queren" @click="goAdd">
            添加新地址
        </div>
        <confirm :text="tipText" ref="confirm" @cancel="cancel" @confirm="confirm"></confirm>
	</div>
</template>
<script>
	import {addressList,deleteAddress} from "api/patient"
	import HeadTop from 'base/header/header'
    import router from '../router'
    import cookie from "js-cookie"
    import confirm from 'base/confirm/confirm'
	export default {
		name : "userAddress",
		data (){
			return {
				token:'',
                patientId:'',
                shou:[],
                tipText:'确定要删除此地址吗？',
                addressId:''
			}
		},
		created(){
			this.token = cookie.get('token');
            this.patientId = cookie.get('patientId');
            this.addressList();
		},
		computed :{
			
		},
		
		methods:{
            addressList(){
                let list = {
                    token:this.token,
                    patientId:this.patientId
                }
                addressList(list).then((res)=>{
                    //console.log(res);
                    this.shou = res.data;
                })
            },
            cancel(){
                this.$refs.confirm.hide();
            },
            confirm(){
                let list = {
                    token:this.token,
                    addressId:this.addressId
                }
                deleteAddress(list).then((res)=>{
                    if(res.type == true){
                      this.$refs.confirm.hide();
                      this.addressList();
                    }else{
                      this.$refs.confirm.hide();
                      this.$toast(res.massage)
                    }
                })
            },
            deleteAdd(addressId){
              this.addressId = addressId;
              this.$refs.confirm.show();
            },
			goDizhi(item){
                this.$router.push({path:'/addDizhi',query:{item:JSON.stringify(item)}})
            },
            goBack(){
                this.$router.push('/mine')
            },
            goAdd(){
                this.$router.push('/addDizhi')
            }
		},
		components :{
            confirm
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
    .xian{
        width:100%;
        height:10px;
        background:#efefef;
        clear: both;
    }
    .list{
        width:100%;
        >div{
            width:100%;
            height:157px;
            border-bottom:1px solid #e4e4e4;
            div{
                padding:0 30px;
                span{
                    color:#00B0C2;
                    float:right;
                    img{
                        width:29px;
                        height:30px;
                        vertical-align: middle;
                        margin:0 10px;
                    }
                }
            }
            div:nth-of-type(1){
                font-size:25px;
                color:#757575;
                padding-top:50px;
            }
            div:nth-of-type(2){
                font-size:25px;
                color:#B7B7B7;
                padding-top:25px;
            }
        }
    }
    .queren{
        width:611px;
        height:76px;
        background:#00B0C2;
        border-radius:13px;
        text-align: center;
        line-height: 76px;
        font-size:30px;
        color:#fff;
        margin:0 auto;
        margin-top:80px;
    }
</style>