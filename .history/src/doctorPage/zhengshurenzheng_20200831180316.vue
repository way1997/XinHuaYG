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
