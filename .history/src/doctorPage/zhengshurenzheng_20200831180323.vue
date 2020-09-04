<template>
<div>
    <!--pages/renzheng/zhengshurenzheng.wxml-->

    <div class='select_pharmacy'>
        <img src='../../img/sanjiaox.png'></img>
        <div>请上传
            <div>医师执业证书</div>
        </div>
    </div>
    <div class='shangp'>
        <div style='width:100%;height:39rpx;clear:both'></div>
        <div class='pf_but'>
            <div class="img" v-for="imgs" v-for-item="item" wx:key="*this">
                <img :src="item" data-index="{{index}}" mode="aspectFill" class='touxaing' />
                <div class="guanbian" data-index="{{index}}" catchtap="deleteImg">
                    <img src='../../img/guanbian.png' catchtap="deleteImg"></img>
                </div>
            </div>
            <img src='../../img/jiahao.png' @click='addyi' class='jiahao'> </img>
            <div @click='addyi'>添加第一页</div>
            <progress percent="100" active class='jindutiao' wx:if="{{jindutiao}}" />
        </div>

        <div class='pf_but'>
            <div class="img" v-for="imgs1" v-for-item="item1" wx:key="*this">
                <img :src="item1" data-index="{{index1}}" mode="aspectFill" class='touxaing' />
                <div class="guanbian" data-index="{{index1}}" catchtap="deleteImg1">
                    <img src='../../img/guanbian.png' catchtap="deleteImg1"></img>
                </div>
            </div>
            <img src='../../img/jiahao.png' @click='adder' class='jiahao'> </img>
            <div @click='adder'>添加第二页</div>
            <progress percent="100" active class='jindutiao' wx:if="{{jindutiao1}}" />

        </div>
        <div style='width:100%;height:39rpx;clear:both'></div>
    </div>

    <!-- 资格证书 -->
    <div class='select_pharmacy'>
        <img src='../../img/sanjiaox.png'></img>
        <div>请上传
            <div>医师资格证书</div>
        </div>
    </div>
    <div class='shangp'>
        <div style='width:100%;height:39rpx;clear:both'></div>
        <div class='pf_but'>
            <div class="img" v-for="picurl1" v-for-item="item" wx:key="*this">
                <img :src="item" data-index="{{index}}" mode="aspectFill" class='touxaing' />
                <div class="guanbian" data-index="{{index}}" catchtap="deleteImgpicurl1">
                    <img src='../../img/guanbian.png' catchtap="deleteImgpicurl1"></img>
                </div>
            </div>
            <img src='../../img/jiahao.png' @click='picbut' class='jiahao'> </img>
            <div @click='picbut'>添加第一页</div>
            <progress percent="100" active class='jindutiao' wx:if="{{jindutiao}}" />
        </div>

        <div class='pf_but'>
            <div class="img" v-for="picurl22" v-for-item="item1" wx:key="*this">
                <img :src="item1" data-index="{{index1}}" mode="aspectFill" class='touxaing' />
                <div class="guanbian" data-index="{{index1}}" catchtap="deleteImgpicurl2">
                    <img src='../../img/guanbian.png' catchtap="deleteImgpicurl2"></img>
                </div>
            </div>
            <img src='../../img/jiahao.png' @click='picbbut' class='jiahao'> </img>
            <div @click='picbbut'>添加第二页</div>
            <progress percent="100" active class='jindutiao' wx:if="{{jindutiao1}}" />

        </div>
        <div style='width:100%;height:39rpx;clear:both'></div>
    </div>

    <!-- 专业资格证书 -->
    <div class='select_pharmacy'>
        <img src='../../img/sanjiaox.png'></img>
        <div>请上传
            <div>专业技术资格证书</div>即职称证书（选填）
        </div>
    </div>
    <div class='shangp'>
        <div style='width:100%;height:39rpx;clear:both'></div>

        <div class="img" class='touxaing1' v-for="imgs2" v-for-item="item2" wx:key="*this">
            <img :src="item2" data-index="{{index2}}" mode="aspectFill" class='touxaing1' />
            <div class="guanbian" data-index="{{index2}}" catchtap="deleteImg2">
                <img src='../../img/guanbian.png' catchtap="deleteImg2"></img>
            </div>
        </div>

        <div class='pf_but' wx:if="{{duoxuanpic}}">
            <img src='../../img/jiahao.png' class='jiahao' @click='addpic'> </img>
            <div @click='addpic'>添加照片</div>
        </div>
        <div style='width:100%;height:39rpx;clear:both'></div>

    </div>

    <!-- 案例 -->
    <div class='case'>
        <div class='zssl'>
            证书示例
        </div>
        <div class='zssl_tit'>* 确保姓名、照片、编号、执业范围、签发机关等清晰可见 </div>
        <div class='zssl_tit'>* 需上传证书第一、第二页，确保包含执业地点以及变更记录</div>
        <div class='zsspic'>
            <!-- <img src='../../img/touxiang.jpg'></img> -->
        </div>
        <div class='zsspic zsspic1'>
            <!-- <img src='../../img/touxiang.jpg'></img> -->
        </div>
        <div style='width:100%;clear:both'></div>

    </div>
    <div style='width:100%;height:90rpx;clear:both'></div>
    <!-- <div class='generate' @click='generate'>
        <div>完成并提交审核</div>
    </div>

    <div class='zhezhao' @click='sctouxiang1' wx:if="{{sctouxiangz}}"></div>
    <div class='enter' wx:if="{{sctouxiang}}">
        <div class='guanbi' @click='sctouxiang1'>
            <img src='../../img/bianbia.png'></img>
        </div>
        <div class='sele_pic' @click='chooseImg'>相册</div>
        <div class='sele_pic' style='border:none' @click='photograph1'>拍照</div>
    </div>
    <div class='enter' wx:if="{{sctouxiang1}}">
        <div class='guanbi' @click='sctouxiang1'>
            <img src='../../img/bianbia.png'></img>
        </div>
        <div class='sele_pic' @click='photo1'>相册</div>
        <div class='sele_pic' style='border:none' @click='photograph2'>拍照</div>
    </div>

    <div class='enter' wx:if="{{sctouxiang2}}">
        <div class='guanbi' @click='sctouxiang1'>
            <img src='../../img/bianbia.png'></img>
        </div>
        <div class='sele_pic' @click='photo2'>相册</div>
        <div class='sele_pic' style='border:none' @click='photograph3'>拍照</div>
    </div>

    <div class='enter' wx:if="{{picbut}}">
        <div class='guanbi' @click='sctouxiang1'>
            <img src='../../img/bianbia.png'></img>
        </div>
        <div class='sele_pic' @click='picbut1'>相册</div>
        <div class='sele_pic' style='border:none' @click='picbut12'>拍照</div>
    </div>

    <div class='enter' wx:if="{{picbut13}}">
        <div class='guanbi' @click='sctouxiang1'>
            <img src='../../img/bianbia.png'></img>
        </div>
        <div class='sele_pic' @click='picbut2'>相册</div>
        <div class='sele_pic' style='border:none' @click='picbut22'>拍照</div>
    </div>
    <div class='enter' wx:if="{{sctouxiang2}}">
  <div class='guanbi' @click='sctouxiang1'>
    <img src='../../img/bianbia.png'></img>
  </div>
  <div class='sele_pic' @click='photo2'>相册</div>
  <div class='sele_pic' style='border:none' @click='photograph3'>拍照</div>
</div> -->
</div>
</template>

<script>
export default {
    name: 'zhengshurenzheng'

}
</script>

<style scoped>
/* pages/renzheng/zhengshurenzheng.wxss */

.select_pharmacy {
    width: 100%;
    height: 76px;
    background: #fff;
    margin-top: 17px;
    padding-right: 20px;
    box-sizing: border-box;
    clear: both;
}

.select_pharmacy img:nth-child(1) {
    width: 20px;
    height: 18px;
    float: left;
    transform: rotate(90deg);
    margin-top: 28px;
    display: block;
    margin-right: 10px;
}

.select_pharmacy div:nth-child(2) {
    color: #434242;
    font-size: 30px;
    float: left;
    line-height: 76px;
}

.select_pharmacy div:nth-child(2) div {
    color: #00b0c2;
    display: inline-block;
}

.shangp {
    width: 100%;
    padding: 0 23px;
    box-sizing: border-box;
    border-top: 1px dashed #d2d2d2;
    background: #fff;
}

/* 拍照 */
.pf_but {
    width: 138px;
    height: 138px;
    background: #d0d1d0;
    padding-top: 30px;
    box-sizing: border-box;
    float: left;
    margin-right: 12%;
    position: relative;
}

.pf_but .jiahao {
    width: 55px;
    height: 55px;
    display: block;
    margin: 0 auto;

}

.pf_but div {
    font-size: 26px;
    color: #fff;
    text-align: center;
    line-height: 50px;
}

.case {
    width: 100%;
    padding: 23px;
    box-sizing: border-box;
    background: #fff;
    border-top: 1px dashed #d2d2d2;
    clear: both;
}

.zssl {
    font-size: 26px;
    color: #fff;
    text-align: center;
    background: #66d0da;
    width: 124px;
    height: 40px;
    border-radius: 10px;
    line-height: 40px;
    margin-bottom: 20px;
}

.zssl_tit {
    color: #717171;
    font-size: 26px;
    line-height: 36px;
}

.zsspic {
    width: 46%;
    float: left;
    height: 192px;
    background: #66d0da;
    margin-top: 23px;
}

.zsspic img {
    width: 100%;
    height: 100%;
}

.zsspic1 {
    float: right;
}

.generate {
    width: 100%;
    height: 90px;
    background: #fff;
    padding: 10px 23px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
}

.generate div {
    color: #fff;
    background: #00b0c2;
    /* background: #979797; */
    text-align: center;
    line-height: 72px;
    height: 72px;
    width: 100%;
    border-radius: 10px;
    font-size: 32px;

}

.touxaing {
    width: 138px;
    height: 138px;
    position: absolute;
    top: 0;
    left: 0
}

.img1 {
    position: relative;
}

.touxaing1 {
    width: 138px;
    height: 138px;
    float: left;
    margin-right: 12%;
    margin-bottom: 39px;
    position: relative;
}

.guanbi1 {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: -19px;
    left: -16px;

}

.guanbi1 img {
    width: 43px;
    height: 41px;
    position: absolute;
    top: -1px;
    left: -1.85px;

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

    width: 590px;
    height: 170px;
    background: #fff;
    border-radius: 10px;
    position: fixed;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, -50%)
}

.enter_tit {
    font-size: 31px;
    color: #222222;
    text-align: center;
    line-height: 134px;

}

.enter_but {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    margin-top: 30px;
}

.enter_but div {
    font-size: 32px;
    color: #222222;
    width: 240px;
    height: 65px;
    border-radius: 10px;
    text-align: center;
    line-height: 65px;
    border: 1px solid #979797;
    float: left;
}

.enter_but div:nth-child(2) {

    color: #fff;
    border: none;
    background: #00b0c2;

}

.guanbi {
    width: 40px;
    height: 40px;
    background: #00b0c2;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    position: absolute;
    right: 23px;
    top: -10px;
}

.guanbi img {
    width: 28px;
    height: 28px;
    display: inline-block;
    vertical-align: middle;
}

.sele_pic {
    font-size: 30px;
    color: #222222;
    text-align: center;
    line-height: 85px;
    border-bottom: 1px solid #d0d1d0;
}

.guanbian {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: -19px;
    left: -16px;

}

.guanbian img {
    width: 43px;
    height: 41px;
    position: absolute;
    top: 7px;
    left: 14px;

}
</style>
