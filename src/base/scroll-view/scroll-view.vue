<template>
	<div class="scroll-view">
		<div class="scrollWrapper">
			<div class="scrollNav" ref="scrollNav">
				<ul>
					<li class="current">公司</li>
					<li 
						v-for="(item,index) in nav" 
						@click="selectTab(index,item.cid)" 
						:class="{active :selectNav === index }">
						{{item.name}}
					</li>
				</ul>
			</div>
			<div class="scrollContent">
				<div class="top">
					<div class="left" :class="{active :selectTop === 0}" @click="topTab(0)">{{topNav[0]}}</div>
					<div class="right" :class="{active :selectTop === 1}" @click="topTab(1)">{{topNav[1]}}</div>
					<div class="line"></div>
				</div>
				<slot name="th"></slot>
				<div class="content" ref="content">
					<slot name="table"></slot>
				</div>
			</div>
		</div>
		<div class="head-bottom" @click="back()">
			<em></em>
			<span>{{title}}</span>
		</div>
	</div>
</template>

<script>
	import HeadTop from 'base/header/header'
	import BScroll from 'better-scroll' 
	import { backPage } from 'common/js/mixin.js'
	export default {
		data(){
			return {
				selectNav : 0,
				selectTop : 0
			}
		},
		mixins :[backPage] ,
		props :{
			title : {
				type :String ,
				default(){
					return ''
				}
			},
			nav :{
				type :Array ,
				default() {
					return [
						{
							name :'竞彩官方',
							cid : 10000 
						},
						{
							name :'威廉希尔',
							cid : 451 
						},
						{
							name :'立博',
							cid : 449 
						},
						{
							name :'澳门',
							cid : 442
						},
						{
							name :'香港马会',
							cid : 196 
						},
						{
							name :'bet365',
							cid : 30 
						},
						{
							name :'interwetten',
							cid : 221 
						},
						{
							name :'SNAI',
							cid : 325 
						},
						{
							name :'易胜博',
							cid : 454 
						},
						{
							name :'伟德',
							cid : 893 
						},
						{
							name :'皇冠',
							cid : 447 
						},
						{
							name :'bwin',
							cid : 116 
						},
						{
							name :'oddset',
							cid : 266 
						},
						{
							name :'Eurobet',
							cid : 156
						},
						{
							name :'gamebookers',
							cid : 175 
						},
						{
							name :'Coral',
							cid : 133 
						},
						{
							name :'利记',
							cid : 310 
						},
						{
							name :'博天堂',
							cid : 444 
						},
						{
							name :'金宝博',
							cid : 448 
						},
						{
							name :'10BET',
							cid : 2
						},
					]
				}
			},
			topNav :{
				type :Array ,
				default(){
					return ['','']
				}
			},
			data :{
				default() {
					return ''
				}
			}
		},
	    mounted(){
	      	setTimeout(()=>{
	        	this._initNavScroll();
	        	this._initContentScroll()
	      	} ,20)
	    },
		methods: {
			_initNavScroll(){
		        this.scroll = new BScroll(this.$refs.scrollNav, {
		          	probeType : 1,
		          	click : true 
		        })		
		        let cid = this.$route.query.cid 
		        let index = 0 
				if(cid != undefined){
			        index = this.nav.findIndex((item)=>{
			        	return item.cid == cid
			        })					
			        this.selectNav = index 
				}
				this.$emit('selectNav',this.nav[index].cid)	
			},
			_initContentScroll(){
		        this.scrollContent = new BScroll(this.$refs.content, {
		          	probeType : 1,
		          	click : true 
		        })		
			},
		    refresh() {
		        this.scrollContent && this.scrollContent.refresh()
		    },
			selectTab(index,cid){
				this.selectNav = index 
				this.$emit('selectNav',cid)
			},
			topTab(index){
				this.selectTop = index 
				this.$emit('selectTop',index)
			}
		},
		watch :{
	      	data() {
	        	setTimeout(()=>{
	          		this.refresh()
	        	} ,20)
	      	}			
		},
		components :{
			HeadTop
		}
	}
</script>

<style scoped lang="less">
	.scroll-view{
	    .scrollWrapper{
	    	font-size:28px;
	    	color: #333;
	    	overflow: hidden;
	    	text-align: center; 
	    	.scrollNav{
	    		position: absolute;
	    		width: 195px;
	    		left: 0 ;
	    		top: 0;
	    		bottom: 90px;
	    		overflow: hidden;
				background-color: #f5f5f5;
	    		ul{
					li{
						width: 100%;
						height: 100px;
						line-height: 100px;
						&.current{
							height: 94px;
							line-height: 94px;
							color: #b2b2b2;
						}
						&.active{
							background-color: #fff;
						}
					}
				}
	    	}
	    	.scrollContent{
				position: absolute;
				width: 555px;
				left: 195px;
				top: 0;
				bottom: 90px;
				.top{
					width: 100%;
					height: 94px;
					line-height: 94px;
					font-size: 30px;
					text-align: center;
					position: relative;
					border-bottom: 1px #dbdbdb solid ;
					box-sizing: border-box;
					.left,.right{
						width: 38%;
						height: 94px;
						margin: 0 6%;
						float: left;
						box-sizing: border-box;
						&.active{
							color: #ff7200;
						    border-bottom: 1px solid #ff7200 ;							
						}
					}
					.line{
						position: absolute;
						width: 1px;
						height: 30px;
						top: 32px;
						left: 277px;
						background-color: #999;
					}
				}
				.content{
					position: absolute;
					width: 100%;
					left: 0 ;
					top: 168px;
					bottom: 0;
					overflow: hidden;
				}
	    	}
	    }
	    .head-bottom{
		    position: absolute;
		    left: 0;
		    bottom: 0;
		    z-index: 999;
		    width: 100%;
		    height: 0.9rem;
		    line-height: 0.9rem;
		    color: white;
		    text-align: center;
		    font-size: 0.32rem;
		    background-color: #0d8059;	
		    em{
			    position: absolute;
			    width: 0.24rem;
			    height: 0.44rem;
			    background: url(../../assets/arrow-return.png) no-repeat;
			    background-size: cover;
			    left: 0.4rem;
			    top: 0.23rem;
		    }
	    }
	}
</style>