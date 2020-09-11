<template>
	<div class="progress-circle" ref="progress">
		<canvas id="canvas" :width="width" :height="height"></canvas>
	</div>
</template>

<script>
	export default {
		props:{
			width :{
				type :Number,
				default : 100
			},
			height :{
				type :Number,
				default :100
			},
			starColor :{//进度条起始颜色
				type :String ,
				default : '#97e969'
			},
			endColor :{//进度条结束颜色
				type :String ,
				default : '#97e969'				
			},
			percent :{//进度条百分比 1-100
				type :Number,
				default : 80
			},
			cirque :{//进度条厚度
				type :Number,
				default : 30
			}
		},
		mounted(){
			this.createProgress()
		},
		methods :{
			createProgress(){
				let progress = this.$refs.progress 	
				let canvas = progress.getElementsByTagName("canvas")[0]
				//console.log(this.percent)
				let ctx = canvas.getContext('2d')
				let w = this.cirque  //圆环宽度
				let startRgb = []
				let endRgb = [] 
				let gradient = {}
				let pos = { //圆心坐标
					x :this.width / 2 ,
					y :this.height / 2 
				}

				//计算颜色
				startRgb = this.color(this.starColor)
				endRgb = this.color(this.endColor)
				// console.log(startRgb +'===' +endRgb)
				//计算 r g b 起始值  结束值的差值  起 》 结 --  else ++ 

				gradient.r = parseInt(startRgb[0]) > parseInt(endRgb[0]) ?  'minus' : parseInt(startRgb[0]) < parseInt(endRgb[0]) ? 'plus' : 'equal'
				gradient.g = parseInt(startRgb[1]) > parseInt(endRgb[1]) ?  'minus' : parseInt(startRgb[1]) < parseInt(endRgb[1]) ? 'plus' : 'equal'
				gradient.b = parseInt(startRgb[2]) > parseInt(endRgb[2]) ?  'minus' : parseInt(startRgb[2]) < parseInt(endRgb[2]) ? 'plus' : 'equal'
				
				// console.log(gradient.r +':'+gradient.g +':'+ gradient.b)
				//绘制第一个圆
				ctx.beginPath()
				ctx.moveTo(pos.x, pos.y)
				ctx.arc(pos.x, pos.y, pos.x, 0, Math.PI * 2, true)
				ctx.closePath()
				ctx.fillStyle = '#f1f1f1'
				ctx.fill()
				
/*				//画圆角 用圆代替 起始圆角
				ctx.beginPath()
				ctx.moveTo(pos.x, 0)  
				ctx.arc(pos.x, w / 2, w / 2, 0, Math.PI * 2, true)
				ctx.closePath()
				ctx.fillStyle = this.starColor
				ctx.fill()*/

				for(var i = 0 ;i < this.percent ;i++){
					// setTimeout(()=>{
						ctx.beginPath()
						ctx.moveTo(pos.x, pos.y)
						ctx.arc(pos.x, pos.y, pos.x, -Math.PI/2 - (Math.PI * 2) * (i-1) / 100, -Math.PI/2 - (Math.PI * 2) * (i + 1) / 100, true)
						ctx.closePath()
						ctx.fillStyle = `rgb(${gradientColor(gradient.r,i,startRgb[0],endRgb[0])},${gradientColor(gradient.g,i,startRgb[1],endRgb[1])},${gradientColor(gradient.b,i,startRgb[2],endRgb[2])})`
						// ctx.fillStyle = `rgb(0,${gradientColor(gradient.g,i,startRgb[1],endRgb[1])},0)})`
						// ctx.fillStyle = this.starColor
						ctx.fill()		
					// }, 100)			
				}
				// //画圆角 结束位置圆角
				// let r = pos.x   //半径
				// let rad = this.percent / 100 * 360
				// let angle = Math.PI/180 * rad // 旋转角度
				// let x ,x1
				// let y ,y1
				// //通过计算可得
				
				// //特殊情况处理 当旋转角度 》 90度时 判断角度所处象限  因按顺时针旋转画圆  象限顺序 4 3 2 1 
				// //< 90 4   90 - 180 3  180 - 270 2  270 - 360 1
				// //
				// if(rad == 0){
				// 	return 
				// }

				// if(rad > 0 && rad <90 ){
				// 	x = r / Math.sqrt(1+1/Math.pow(Math.tan(angle),2))
				// 	y = r / Math.sqrt(Math.pow(Math.tan(angle),2)+1)
				// 	x1 = r - x + w/2 
				// 	y1 = r - y + w/2
				// }

				// if(rad == 90){
				// 	x1 = w/2
				// 	y1 = r
				// }

				// if(rad > 90 && rad < 180){
				// 	rad = this.percent / 100 * 360 - 90 
				// 	angle = Math.PI/180 * rad
				// 	y = r / Math.sqrt(1+1/Math.pow(Math.tan(angle),2))
				// 	x = r / Math.sqrt(Math.pow(Math.tan(angle),2)+1)
				// 	x1 = r - x + w /2 
				// 	y1 = r + y - w /2
				// 	// console.log(x,y)
				// }

				// if(rad == 180){
				// 	x1 = r
				// 	y1 = 2*r - w/2
				// }

				// if(rad > 180 && rad < 270){
				// 	rad = this.percent / 100 * 360 - 180 
				// 	angle = Math.PI/180 * rad
				// 	x = r / Math.sqrt(1+1/Math.pow(Math.tan(angle),2))
				// 	y = r / Math.sqrt(Math.pow(Math.tan(angle),2)+1) + pos.y
				// 	x1 = r + x - w/2 
				// 	y1 = y - w/2 
				// }
				
				// if(rad == 270){
				// 	x1 = 2*r - w/2
				// 	y1 = r 
				// }

				// if(rad >270 && rad < 360 ){
				// 	rad = this.percent / 100 * 360 - 270 
				// 	angle = Math.PI/180 * rad
				// 	y = r / Math.sqrt(1+1/Math.pow(Math.tan(angle),2))
				// 	x = r / Math.sqrt(Math.pow(Math.tan(angle),2)+1)
				// 	// x1 = 2*r - x + w/2 
				// 	// y1 = y + w/2
				// 	x1 = r + x - w/2 
				// 	y1 = r - y + w/2 
				// 	// console.log(x,y)
				// }

				// if(rad == 360){
				// 	x1 = r 
				// 	y1 = w/2
				// }
				// // console.log(x1,y1)
				// // console.log(Math.tan(angle))
				// // console.log(Math.PI)
				// // console.log(x,y)

				// ctx.beginPath()
				// ctx.moveTo(x1, y1)  
				// ctx.arc(x1, y1, w/2, 0, Math.PI * 2, true)
				// ctx.closePath()
				// ctx.fillStyle = `rgb(${gradientColor(gradient.r,this.percent,startRgb[0],endRgb[0])},${gradientColor(gradient.g,this.percent,startRgb[1],endRgb[1])},${gradientColor(gradient.b,this.percent,startRgb[2],endRgb[2])})`
				// ctx.fill()				

				//画圆内部空白
				ctx.beginPath()
				ctx.moveTo(pos.x,pos.y)
				ctx.arc(pos.x, pos.y, pos.x - w, 0, Math.PI * 2, true)
				ctx.closePath()
				ctx.fillStyle = '#fff'
				ctx.fill()	
				
				function gradientColor(status,i,start,end){
					let value 
					if(status == 'minus'){
						if((parseInt(start) - i) > parseInt(end)){
							value = parseInt(start) - i
						} else{
							value = parseInt(end)
						}
					}else if(status == 'plus'){
						if((parseInt(start) + i) < parseInt(end)){
							value = parseInt(start) + i
						}else{
							value = parseInt(end) 
						}
						// console.log(value)
					}else{
						value = start
					}
					return value 
				}
			},
			//颜色换算 #fff 转换成 255,255,255
			colorRgb(color){
			    var sColor = color.toLowerCase();
			    //十六进制颜色值的正则表达式
			    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
			    // 如果是16进制颜色
			    if (sColor && reg.test(sColor)) {
			        if (sColor.length === 4) {
			            var sColorNew = "#";
			            for (var i=1; i<4; i+=1) {
			                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
			            }
			            sColor = sColorNew;
			        }
			        //处理六位的颜色值
			        var sColorChange = [];
			        for (var i=1; i<7; i+=2) {
			            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
			        }
			        return "rgb(" + sColorChange.join(",") + ")";
			    }
			    return sColor;				
			},
			//拆分rgb(...,...,...)里面的数字
			color(c){
				let color 

				if(/rgb/g.test(c)){
					color = c
				}else{
					color = this.colorRgb(c) 
				}
				color = color.replace(/rgb|\(|\)/g,'').split(',')	
				
				return color 				
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>