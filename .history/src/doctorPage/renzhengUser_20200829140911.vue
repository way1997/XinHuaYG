<template>
<div>
    reh
    <van-form>
        <van-loading size="58px" v-if="hidden">加载中...</van-loading>
        <!-- 头像上传 -->
        <section class="head_wrap">
            <div class="head_tti">
                请上传
                <div>头像图片</div>，我们将为您制作漂亮的头像
            </div>
            <div class="head_cont">
                <van-row>
                    <van-col span="6">
                        <div class="pf_but" @touchstart="showPopup">
                            <img src=''> </img>
                            <div>上传头像</div>
                        </div>
                    </van-col>
                    <van-col offset="1" span="3">
                        <div class="cont_tit">
                            头像示例
                        </div>
                    </van-col>
                    <van-col offset="0" span="6">
                        <div class="head_pic_box">
                            <img class='head_pic' src='../assets/img/xinhua.png'></img>
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class='tishi'>
                            <!-- <div>*正面照片</div>
                    <div>*清晰度高</div>
                    <div>*半身照（胸部以上）</div> -->
                            <div>*请上传头像</div>
                            <div>*大小：1mb</div>
                            <div>*尺寸：64*64</div>
                        </div>
                    </van-col>
                </van-row>

            </div>
        </section>
    </van-form>
</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

</style>
