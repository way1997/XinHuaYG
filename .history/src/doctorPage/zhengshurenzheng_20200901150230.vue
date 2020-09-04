<template>
<div class="page">
    <img src="../assets/img/LODING.gif" class="loading" alt="" v-if="hidden">
    <div class='select_pharmacy'>
        <img src='../assets/img/sanjiaox.png'></img>
        <div>请上传
            <div>医师执业证书</div>
        </div>
    </div>
    <div class='shangp'>
        <div style='width:100%;height:16px;clear:both'></div>
        <div class='pf_but'>
            <div class="img" v-for="(item,index) in imgs" :key="index">
                <img class='touxaing' :src="item" />
                <div class="guanbian" catchtap="deleteImg">
                    <img src='../assets/img/guanbian.png' v-on:click.stop="deleteImg"></img>
                </div>
            </div>
            <img src='../assets/img/jiahao.png' class='jiahao'> </img>
            <div @touchstart='addyi'>添加第一页</div>
            <progress percent="100" class='jindutiao' v-if="jindutiao" />
        </div>
        <div class="pf_but">
            <div class="img" v-for="(item,index) in imgs1" :key="index">
                <image :src="item" class='touxaing' />
                <div class="guanbian" v-on:click.stop="deleteImg1">
                    <img src='../assets/img/guanbian.png' v-on:click.stop="deleteImg1"></img>
                </div>
            </div>
            <img src="../assets/img/jiahao.png" @touchstart='adder' class='jiahao' alt="">
            <div @touchstart='adder'>添加第二页</div>
            <progress percent="100" class='jindutiao' v-if="jindutiao1" />
        </div>
        <div style='width:100%;height:16px;clear:both'></div>
    </div>

    <!-- 资格证书 -->
    <div class='select_pharmacy'>
        <img src='../assets/img/sanjiaox.png'></img>
        <div>请上传
            <div>医师资格证书</div>
        </div>
    </div>
    <div class='shangp'>
        <div style='width:100%;height:39rpx;clear:both'></div>
        <div class='pf_but'>
            <div class="img">
                <img src="" class='touxaing' />
                <div class="guanbian">
                    <img src='../assets/img/guanbian.png'></img>
                </div>
            </div>
            <img src='../assets/img/jiahao.png' class='jiahao'> </img>
            <div bindtap='picbut'>添加第一页</div>
            <progress percent="100" active class='jindutiao' />
        </div>

        <div style='width:100%;height:39rpx;clear:both'></div>
    </div>
    <!-- 专业资格证书 -->
    <div class='select_pharmacy'>
        <img src='../assets/img/sanjiaox.png'></img>
        <div>请上传
            <div>专业技术资格证书</div>即职称证书（选填）
        </div>
    </div>
    <!-- 案例 -->
    <div class='case'>
        <div class='zssl'>
            证书示例
        </div>
        <div class='zssl_tit'>* 确保姓名、照片、编号、执业范围、签发机关等清晰可见 </div>
        <div class='zssl_tit'>* 需上传证书第一、第二页，确保包含执业地点以及变更记录</div>
        <div class='zsspic'>
            <!-- <img src='../assets/img/touxiang.jpg'></img> -->
        </div>
        <div class='zsspic zsspic1'>
            <!-- <img src='../assets/img/touxiang.jpg'></img> -->
        </div>
        <div style='width:100%;clear:both'></div>

    </div>
    <div style='width:100%;height:90rpx;clear:both'></div>
    <div class='generate'>
        <div>完成并提交审核</div>
    </div>

    <div class='zhezhao' v-if="sctouxiangz"></div>
    <div class='enter'>
        <div class='guanbi'>
            <img src='../assets/img/bianbia.png'></img>
        </div>
        <div class='sele_pic'>相册</div>
        <div class='sele_pic' style='border:none'>拍照</div>
    </div>
    <div class='enter'>
        <div class='guanbi'>
            <img src='../assets/img/bianbia.png'></img>
        </div>
        <div class='sele_pic'>相册</div>
        <div class='sele_pic' style='border:none'>拍照</div>
    </div>

    <div class='enter'>
        <div class='guanbi'>
            <img src='../assets/img/bianbia.png'></img>
        </div>
        <div class='sele_pic'>相册</div>
        <div class='sele_pic' style='border:none'>拍照</div>
    </div>
    <div class='enter'>
        <div class='guanbi'>
            <img src='../assets/img/bianbia.png'></img>
        </div>
        <div class='sele_pic'>相册</div>
        <div class='sele_pic' style='border:none'>拍照</div>
    </div>

    <div class='enter'>
        <div class='guanbi'>
            <img src='../assets/img/bianbia.png'></img>
        </div>
        <div class='sele_pic'>相册</div>
        <div class='sele_pic' style='border:none'>拍照</div>
    </div>
</div>
</template>

<script>
import {
    zsrzLoad
} from '../api/doctor'
import home from '../util/util-sec.js'
import cookie from 'js-cookie'
export default {
    name: 'zhengshurenzheng',
    data() {
        return {
            hidden: false,
            img1: [],
            imgs: [], //医生执业证书第一页
            imgs1: [], //医生执业证书第二页
            imgs2: [], //医生专业技术资格证书
            picurl1: [], //医生资格证书第一页
            picurl22: [], //医生资格证书第二页
            duoxuanpic: true,
            backgroundcolor: '#979797',
            jindutiao: false,
            jindutiao1: false,
            sctouxiangz: false, //遮罩
            sctouxiang: false, //添加第一页
            sctouxiang1: false, //添加第二页
            sctouxiang2: false //添加第三页
        }
    },
    created: function () {
        var that = this;
        var doctorId = cookie.get('doctorId')
        var token = cookie.get('token')
        this.imgs = [];
        this.imgs1 = [];
        this.imgs2 = [];
        this.picurl1 = [];
        this.picurl22 = [];
        let list = {
            doctorId: doctorId,
            token: token
        }
        zsrzLoad(list).then(res => {
            // console.log(res)
            if (res.type == true) {
                var imgs = this.imgs;
                var imgs1 = this.imgs1;
                var picurl1 = this.picurl1;
                var picurl22 = this.picurl22;
                var imgs2 = this.imgs2;
                imgs.push(res.occPic1)
                imgs1.push(res.occPic2)
                picurl1.push(res.quaPic1)
                picurl22.push(res.quaPic2)
                imgs2.push(res.docHonorPic)

                this.imgs = imgs,
                    this.imgs1 = imgs1,
                    this.picurl1 = picurl1,
                    this.picurl22 = picurl22,
                    this.imgs2 = imgs2,
                    this.duoxuanpic = false,
                    this.pho1 = res.occPic1,
                    this.pho2 = res.occPic2,
                    this.picurl1text = res.quaPic1,
                    this.picurl2text = res.quaPic2,
                    this.picurl = res.docHonorPic

                console.log(this.imgs)

            }
        })
    },
}
</script>

<style scoped>
/* pages/renzheng/zhengshurenzheng.wxss */
.page {
    position: relative;
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

.loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9999999;
    transform: translate(-50%, -50%);
}
</style>
