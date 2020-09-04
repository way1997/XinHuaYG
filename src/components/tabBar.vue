<template>
	<div class="TabBar">
		<div class="bottom-tab">
        <div class="tab-item" @click="didClickedItem(0)">
            <img :src="'/indexPage' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="医馆">
            <span :class="{active: '/indexPage' === $route.path}">首页</span>
        </div>
        <div class="tab-item" @click="didClickedItem(1)">
            <img :src="'/mine' === $route.path ? tabBarImgArr[1].selected : tabBarImgArr[1].normal" alt="我的">
            <span :class="{active: '/mine' === $route.path}">个人中心</span>
        </div>
    </div>
	</div>
</template>
<script>
    import {findChatPatient} from "api/doctor"
    import router from '../router'
    import cookie from "js-cookie"
    import wx from "weixin-js-sdk"
    import $ from 'jquery'
	export default {
        name : "TabBar",
        props: [],
		data (){
			return {
				tabBarImgArr:[   //图片切换
                    {normal: require('../assets/img/huanzhe.png'), selected: require('../assets/img/huanzhe1.png')},
                    {normal: require('../assets/img/user.png'), selected: require('../assets/img/user1.png')}
                ],
                actives: [true, false, false,false],
			}
		},
		created(){
			
		},
		computed :{
			
		},
		
		methods:{
            didClickedItem: function (tag) {
                if (tag === 0) {
                    this.actives = this.actives.map(function () {
                        return false;
                    });
                    this.actives[0] = true;
                    this.$router.replace('/indexPage');
                } else if (tag === 1) {
                    this.actives = this.actives.map(function () {
                        return false;
                    });
                    this.actives[1] = true;
                    this.$router.replace('/mine');
                }
            },
		},
		components :{

		}
	}
</script>

<style lang="less" scoped>
	@import '../assets/less/base.less';
	.bottom-tab{
        width:100%;
        height:1.2rem;
        background-color:#fff;
        position:fixed;
        left:0px;
        bottom:0px;
        display:flex;
        z-index:999;
        box-shadow:0px 0px 10px 0px rgba(4,0,0,0.11);
    }
    .tab-item{
        display:flex;
        flex:1;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        font-size:0.18rem;
        color:#979797;
        border-right:1px solid #e9e9e9;
        &:nth-of-type(2){
            border:none;
        }
    }
      
    img{
        width:48px;
        height:48px;
        margin-bottom:0.08rem;
    }
    .active{
    color:#3acbc8;
    }
    .totalNum{
        width:0.3rem;
        height:0.3rem;
        position: fixed;
        bottom:0.7rem;
        left:38%;
        background:rgb(241, 67, 67);
        color:#fff;
        font-size:0.16rem;
        border-radius: 50%;
        text-align: center;
        line-height: 0.3rem;
        z-index:9999999;
    }
</style>