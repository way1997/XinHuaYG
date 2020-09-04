<template>
<div>
    <!--pages/renzheng/zhengshurenzheng.wxml-->

    <view class='select_pharmacy'>
        <image src='../../image/sanjiaox.png'></image>
        <view>请上传
            <view>医师执业证书</view>
        </view>
    </view>
    <view class='shangp'>
        <view style='width:100%;height:39rpx;clear:both'></view>
        <view class='pf_but'>
            <view class="img" wx:for="{{imgs}}" wx:for-item="item" wx:key="*this">
                <image src="{{item}}" data-index="{{index}}" mode="aspectFill" class='touxaing' />
                <view class="guanbian" data-index="{{index}}" catchtap="deleteImg">
                    <image src='../../image/guanbian.png' catchtap="deleteImg"></image>
                </view>
            </view>
            <image src='../../image/jiahao.png' bindtap='addyi' class='jiahao'> </image>
            <view bindtap='addyi'>添加第一页</view>
            <progress percent="100" active class='jindutiao' wx:if="{{jindutiao}}" />
        </view>

        <view class='pf_but'>
            <view class="img" wx:for="{{imgs1}}" wx:for-item="item1" wx:key="*this">
                <image src="{{item1}}" data-index="{{index1}}" mode="aspectFill" class='touxaing' />
                <view class="guanbian" data-index="{{index1}}" catchtap="deleteImg1">
                    <image src='../../image/guanbian.png' catchtap="deleteImg1"></image>
                </view>
            </view>
            <image src='../../image/jiahao.png' bindtap='adder' class='jiahao'> </image>
            <view bindtap='adder'>添加第二页</view>
            <progress percent="100" active class='jindutiao' wx:if="{{jindutiao1}}" />

        </view>
        <view style='width:100%;height:39rpx;clear:both'></view>
    </view>

    <!-- 资格证书 -->
    <view class='select_pharmacy'>
        <image src='../../image/sanjiaox.png'></image>
        <view>请上传
            <view>医师资格证书</view>
        </view>
    </view>
    <view class='shangp'>
        <view style='width:100%;height:39rpx;clear:both'></view>
        <view class='pf_but'>
            <view class="img" wx:for="{{picurl1}}" wx:for-item="item" wx:key="*this">
                <image src="{{item}}" data-index="{{index}}" mode="aspectFill" class='touxaing' />
                <view class="guanbian" data-index="{{index}}" catchtap="deleteImgpicurl1">
                    <image src='../../image/guanbian.png' catchtap="deleteImgpicurl1"></image>
                </view>
            </view>
            <image src='../../image/jiahao.png' bindtap='picbut' class='jiahao'> </image>
            <view bindtap='picbut'>添加第一页</view>
            <progress percent="100" active class='jindutiao' wx:if="{{jindutiao}}" />
        </view>

        <view class='pf_but'>
            <view class="img" wx:for="{{picurl22}}" wx:for-item="item1" wx:key="*this">
                <image src="{{item1}}" data-index="{{index1}}" mode="aspectFill" class='touxaing' />
                <view class="guanbian" data-index="{{index1}}" catchtap="deleteImgpicurl2">
                    <image src='../../image/guanbian.png' catchtap="deleteImgpicurl2"></image>
                </view>
            </view>
            <image src='../../image/jiahao.png' bindtap='picbbut' class='jiahao'> </image>
            <view bindtap='picbbut'>添加第二页</view>
            <progress percent="100" active class='jindutiao' wx:if="{{jindutiao1}}" />

        </view>
        <view style='width:100%;height:39rpx;clear:both'></view>
    </view>

    <!-- 专业资格证书 -->
    <view class='select_pharmacy'>
        <image src='../../image/sanjiaox.png'></image>
        <view>请上传
            <view>专业技术资格证书</view>即职称证书（选填）
        </view>
    </view>
    <view class='shangp'>
        <view style='width:100%;height:39rpx;clear:both'></view>

        <view class="img" class='touxaing1' wx:for="{{imgs2}}" wx:for-item="item2" wx:key="*this">
            <image src="{{item2}}" data-index="{{index2}}" mode="aspectFill" class='touxaing1' />
            <view class="guanbian" data-index="{{index2}}" catchtap="deleteImg2">
                <image src='../../image/guanbian.png' catchtap="deleteImg2"></image>
            </view>
        </view>

        <view class='pf_but' wx:if="{{duoxuanpic}}">
            <image src='../../image/jiahao.png' class='jiahao' bindtap='addpic'> </image>
            <view bindtap='addpic'>添加照片</view>
        </view>
        <view style='width:100%;height:39rpx;clear:both'></view>

    </view>

    <!-- 案例 -->
    <view class='case'>
        <view class='zssl'>
            证书示例
        </view>
        <view class='zssl_tit'>* 确保姓名、照片、编号、执业范围、签发机关等清晰可见 </view>
        <view class='zssl_tit'>* 需上传证书第一、第二页，确保包含执业地点以及变更记录</view>
        <view class='zsspic'>
            <!-- <image src='../../image/touxiang.jpg'></image> -->
        </view>
        <view class='zsspic zsspic1'>
            <!-- <image src='../../image/touxiang.jpg'></image> -->
        </view>
        <view style='width:100%;clear:both'></view>

    </view>
    <view style='width:100%;height:90rpx;clear:both'></view>
    <view class='generate' bindtap='generate'>
        <view>完成并提交审核</view>
    </view>

    <view class='zhezhao' bindtap='sctouxiang1' wx:if="{{sctouxiangz}}"></view>
    <view class='enter' wx:if="{{sctouxiang}}">
        <view class='guanbi' bindtap='sctouxiang1'>
            <image src='../../image/bianbia.png'></image>
        </view>
        <view class='sele_pic' bindtap='chooseImg'>相册</view>
        <view class='sele_pic' style='border:none' bindtap='photograph1'>拍照</view>
    </view>
    <view class='enter' wx:if="{{sctouxiang1}}">
        <view class='guanbi' bindtap='sctouxiang1'>
            <image src='../../image/bianbia.png'></image>
        </view>
        <view class='sele_pic' bindtap='photo1'>相册</view>
        <view class='sele_pic' style='border:none' bindtap='photograph2'>拍照</view>
    </view>

    <view class='enter' wx:if="{{sctouxiang2}}">
        <view class='guanbi' bindtap='sctouxiang1'>
            <image src='../../image/bianbia.png'></image>
        </view>
        <view class='sele_pic' bindtap='photo2'>相册</view>
        <view class='sele_pic' style='border:none' bindtap='photograph3'>拍照</view>
    </view>

    <view class='enter' wx:if="{{picbut}}">
        <view class='guanbi' bindtap='sctouxiang1'>
            <image src='../../image/bianbia.png'></image>
        </view>
        <view class='sele_pic' bindtap='picbut1'>相册</view>
        <view class='sele_pic' style='border:none' bindtap='picbut12'>拍照</view>
    </view>

    <view class='enter' wx:if="{{picbut13}}">
        <view class='guanbi' bindtap='sctouxiang1'>
            <image src='../../image/bianbia.png'></image>
        </view>
        <view class='sele_pic' bindtap='picbut2'>相册</view>
        <view class='sele_pic' style='border:none' bindtap='picbut22'>拍照</view>
    </view>
    <!-- <view class='enter' wx:if="{{sctouxiang2}}">
  <view class='guanbi' bindtap='sctouxiang1'>
    <image src='../../image/bianbia.png'></image>
  </view>
  <view class='sele_pic' bindtap='photo2'>相册</view>
  <view class='sele_pic' style='border:none' bindtap='photograph3'>拍照</view>
</view> -->
</div>
</template>

<script>
export default {
    name: 'zhengshurenzheng'
}
</script>

<style scoped>
/* pages/renzheng/zhengshurenzheng.wxss */
page {
    height: 100%;
    background: #f1f1f1;
}

.select_pharmacy {
    width: 100%;
    height: 76px;
    background: #fff;
    margin-top: 17px;
    padding-right: 20px;
    box-sizing: border-box;
    clear: both;
}

.select_pharmacy image:nth-child(1) {
    width: 20px;
    height: 18px;
    float: left;
    transform: rotate(90deg);
    margin-top: 28px;
    display: block;
    margin-right: 10px;
}

.select_pharmacy view:nth-child(2) {
    color: #434242;
    font-size: 30px;
    float: left;
    line-height: 76px;
}

.select_pharmacy view:nth-child(2) view {
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

.pf_but view {
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

.zsspic image {
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

.generate view {
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

.guanbi1 image {
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

.enter_but view {
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

.enter_but view:nth-child(2) {

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

.guanbi image {
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

.guanbian image {
    width: 43px;
    height: 41px;
    position: absolute;
    top: 7px;
    left: 14px;

}
</style>
