<template>
<div>
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian" style="clear:both;"></div>
    <div class="page">
        <img src="../assets/img/LODING.gif" class="loading" alt="" v-if="hidden">

        <div class="zhezhao" v-if="loadUp">
            <img src="../assets/img/LODING.gif" alt="" class="loading">
        </div>
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
                    <div class="guanbian" v-on:click.stop="deleteImg(item,index)">
                        <img src='../assets/img/guanbian.png' ref="yszz01" v-on:click.stop="deleteImg(item,index)"></img>
                    </div>
                </div>
                <van-uploader :max-count="1" :before-read="beforeRead" :after-read='afterRead_yszyz01' style="display:block;" v-if="ffileList_yszhiz01">
                    <div v-if="fileList_yszhiz01" class="neiceng-box">
                        <img src='../assets/img/guanbian.png' class="neiceng-del" style="z-index:11" ref="yszz01" v-on:click.stop="deleteImgN(fileList_yszhiz01)"></img>
                        <img class="touxaing" style="z-index:10" :src="fileList_yszhiz01?fileList_yszhiz01:''" v-if="fileList_yszhiz01"> </img>
                    </div>
                    <div style="padding-top:.25rem">
                        <img src="../assets/img/jiahao.png" ref="yszzLod1" @click='addyi' v-if="ffileList_yszhiz01" class='jiahao'> </img>
                        <div v-if="ffileList_yszhiz01">添加第一页</div>
                    </div>
                </van-uploader>
                <progress percent="100" class='jindutiao' v-if="jindutiao" />
            </div>
            <div class="pf_but">
                <div class="img" v-for="(item,index) in imgs1" :key="index">
                    <img :src="item" class='touxaing' />
                    <div class="guanbian" v-on:click.stop="deleteImg1(item,index)">
                        <img src='../assets/img/guanbian.png' v-on:click.stop="deleteImg1(item,index)"></img>
                    </div>
                </div>
                <van-uploader :max-count="1" :before-read="beforeRead" :after-read='afterRead_yszyz02' style="display:block;" v-if="ffileList_yszhiz02">
                    <div v-if="fileList_yszhiz02" class="neiceng-box">
                        <img src='../assets/img/guanbian.png' class="neiceng-del" style="z-index:11" ref="yszz01" v-on:click.stop="deleteImg1N()"></img>
                        <img class="touxaing" style="z-index:10" :src="fileList_yszhiz02?fileList_yszhiz02:''" v-if="fileList_yszhiz02"> </img>
                    </div>

                    <div style="padding-top:.25rem">
                        <img src="../assets/img/jiahao.png" ref="yszzLod1" v-if="ffileList_yszhiz02" class='jiahao'> </img>
                        <div v-if="ffileList_yszhiz02">添加第二页</div>
                    </div>
                </van-uploader>

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
            <div style='width:100%;height:16px;clear:both'></div>
            <div class='pf_but'>
                <div class="img" v-for="(item,index) in picurl1" :key="index">
                    <img :src="item? item:''" class='touxaing' />
                    <div class="guanbian" v-on:click.stop='deleteImgpicurl1(item,index)'>
                        <img src='../assets/img/guanbian.png' v-on:click.stop='deleteImgpicurl1(item,index)'></img>
                    </div>
                </div>
                <van-uploader :max-count="1" :before-read="beforeRead" :after-read='afterRead_yszgz01' style="display:block;" v-if="ffileList_ysziz01">
                    <div v-if="fileList_ysziz01" class="neiceng-box">
                        <img src='../assets/img/guanbian.png' class="neiceng-del" style="z-index:11" ref="yszz01" v-on:click.stop="deleteImgpicurl1N()"></img>
                        <img class="touxaing" style="z-index:10" :src="fileList_ysziz01?fileList_ysziz01:''" v-if="fileList_ysziz01"> </img>
                    </div>

                    <div style="padding-top:.25rem">
                        <img src='../assets/img/jiahao.png' class='jiahao'> </img>
                        <div>添加第一页</div>
                    </div>
                </van-uploader>
                <progress percent="100" class='jindutiao' v-if="jindutiao" />
            </div>
            <div class='pf_but'>
                <div class="img" v-for="(item,index) in picurl22" :key="index">
                    <img :src="item" class='touxaing' />
                    <div class="guanbian" v-on:click.stop='deleteImgpicurl2(item,index)'>
                        <img src='../assets/img/guanbian.png' v-on:click.stop='deleteImgpicurl2(item,index)'></img>
                    </div>
                </div>
                <van-uploader :max-count="1" :before-read="beforeRead" :after-read='afterRead_yszgz02' style="display:block;" v-if="ffileList_ysziz02">
                    <div v-if="fileList_ysziz02" class="neiceng-box">
                        <img src='../assets/img/guanbian.png' class="neiceng-del" style="z-index:11" ref="yszz02" v-on:click.stop="deleteImgpicurl2N()"></img>
                        <img class="touxaing" style="z-index:10" :src="fileList_ysziz02?fileList_ysziz02:''" v-if="fileList_ysziz02"> </img>
                    </div>
                    <div style="padding-top:.25rem">
                        <img src='../assets/img/jiahao.png' class='jiahao'> </img>
                        <div>添加第二页</div>
                    </div>
                </van-uploader>
                <progress percent="100" class='jindutiao' v-if="jindutiao1" />
            </div>
            <div style='width:100%;height:39rpx;clear:both'></div>
        </div>
        <!-- 专业资格证书 -->
        <div class='select_pharmacy' style="height:1.2rem">
            <img src='../assets/img/sanjiaox.png'></img>
            <div style="width:95%;line-height: .5rem;margin-top:.14rem">请上传
                <div>专业技术资格证书 </div> 即职称证书</br>（选填）
            </div>
        </div>
        <div class='shangp'>
            <div style='width:100%;height:16px;clear:both'></div>

            <div class="img touxaing1" v-for="(item,index) in imgs2" :key="index">

                <img :src="item" class='touxaing1' />
                <div class="guanbian" v-on:click.stop="deleteImg2(item,index)">
                    <img src='../assets/img/guanbian.png' v-on:click.stop="deleteImg2(item,index)"></img>
                </div>
            </div>
            <div class='pf_but' v-if="duoxuanpic">
                <van-uploader :max-count="1" :before-read="beforeRead" :after-read='afterRead_zjziz01' style="display:block;" v-if="ffileList_zjziz01">
                    <div v-if="fileList_zjziz01" class="neiceng-box">
                        <img src='../assets/img/guanbian.png' class="neiceng-del" style="z-index:11" ref="yszz01" v-on:click.stop="deleteImg2N()"></img>
                        <img class="touxaing" style="z-index:10" :src="fileList_zjziz01?fileList_zjziz01:''" v-if="fileList_zjziz01"> </img>
                    </div>
                    <div style="padding-top:.25rem">
                        <img src='../assets/img/jiahao.png' class='jiahao'> </img>
                        <div>添加照片</div>
                    </div>
                </van-uploader>

            </div>
            <div style='width:100%;height:16px;clear:both'></div>

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
        <div style='width:100%;height:38px;clear:both'></div>
        <div class='generate' @click='generate'>
            <div>完成并提交审核</div>
        </div>

        <div class='zhezhao' v-if="sctouxiangz" @click='scTouxiang1'></div>
    </div>
</div>
</template>

<script>
import Home from '../util/util-sec'
import {
    zsrzLoad,
    generateData
} from '../api/doctor'
import {
    Toast,
    Notify
} from 'vant'
import home from '../util/util-sec.js'
import cookie from 'js-cookie'
export default {
    name: 'zhengshurenzheng',
    data() {
        return {
            loadUp: false,
            hidden: false,
            img1: [],
            doctorId: '',
            token: '',
            fileList_yszhiz01: false, //上传相册-医师执证01
            ffileList_yszhiz01: false,
            fileList_yszhiz02: false, //上传相册-医师执证01
            ffileList_yszhiz02: false,
            ffileList_ysziz01: false, //上传相册-医师资格证01
            fileList_ysziz01: false,
            fileList_ysziz02: false, //上传相册-医师资格执证01
            ffileList_ysziz02: false,
            fileList_zjziz01: false, //上传相册-专业执证01
            ffileList_zjziz01: false,
            picbut13: false,
            picbut: false,
            fileDir: '',
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
        // console.log(this.ffileList_yszhiz01)
        var that = this;
        let token = this.$route.params.token //从首页获取认证权限功能
        let doctorId = this.$route.params.doctorId //从首页获取认证权限功能
        if (token == undefined || doctorId == undefined) {
            this.toToast();
            let that = this
            setTimeout(function () {
                that.$router.push({
                    name: 'homePage'
                })
            }, 3000)
        }
        this.token = token
        this.doctorId = doctorId
        this.imgs = [];
        this.imgs1 = [];
        this.imgs2 = [];
        this.picurl1 = [];
        this.picurl22 = [];

        let list = {
            doctorId: doctorId,
            token: token
        }
        console.log(list)
        this.zsrzLoad(list)
    },
    methods: {
        goBack() {
            if (this.dingdanPageQi == 1) {
                this.$router.push({
                    name: 'dingdan',
                    params: {
                        pageInd: this.pageInd,
                        active: this.active
                    }
                })
            } else {
                this.$router.go(-1)
            }
        },
        toToast() {
            // 警告通知
            Notify({
                type: 'warning',
                message: '当前页面为获取到用户认证权限'
            });
        },
        zsrzLoad(list) {
            zsrzLoad(list).then(res => {
                console.log(res)
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

                    // console.log(this.picurl1)

                }
                if (res.type == false) {
                    this.ffileList_yszhiz01 = true
                    this.ffileList_yszhiz02 = true
                    this.ffileList_ysziz01 = true
                    this.ffileList_ysziz02 = true
                    this.ffileList_zjziz01 = true
                }
            })
        },
        addyi() {
            this.sctouxiang = true
            this.sctouxiangz = true
        },
        adder() {
            this.sctouxiang1 = true
            this.sctouxiangz = true
        },
        addpic() {
            this.picbut13 = true
            this.sctouxiangz = true
        },
        picBut() {
            this.sctouxiang2 = true
            this.sctouxiangz = true
        },
        picBBut() {
            this.picbut = true
            this.sctouxiangz = true
        },
        scTouxiang1() {
            this.sctouxiang = false
            this.sctouxiangz = false
            this.sctouxiang1 = false
            this.sctouxiang2 = false
            this.picbut = false
            this.picbut13 = false
        },
        //开始照片上传乱七八糟方法
        /**
         * 上传图片之前判断图片是否符合条件
         */
        beforeRead(file) {
            var that = this;
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                Toast('请上传 jpg/png 格式图片');
                return false;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                that.doctorPhoto = e.target.result;
                that.imgcount = 1;
            };
            reader.readAsDataURL(file);
            // let isLt1M = file.size / 1024 / 1024 <= 1
            // if (!isLt1M) {
            //     Toast('图片大小1M以内');
            //     return false
            // }
            return true;
        },
        /**
         * 上传图片
         */
        uploadImg(file) {
            // 创建form对象
            let formdata1 = new FormData();
            // 通过append向form对象添加数据,可以通过append继续添加数据
            //或formdata1.append('file',file);
            formdata1.append('file', file);
            //设置请求头
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            //this.axios 是因为在main.js写在vue实例里
            const axiosAjax = this.axios.create({
                timeout: 1000 * 60, //时间

            });
            axiosAjax.post(Home.home + '/mkkMoblie/uploadFile/picture', formdata1, config).then((res) => { //这里的url为后端接口

                this.fileDir = Home.home + 'mkkMoblie/' + res.data
                if (escape(res.data).indexOf("%u") < 0) {
                    console.log(res);
                    this.fileDir = Home.home + 'mkkMoblie/' + res.data
                } else {
                    this.$toast.center("该图片路径包含中文，请修改图片名称在上传");
                    this.fileDir = ''
                }
                //res 为接口返回值
            }).catch(() => {

                console.log()
            })
        },
        // 上传医师执业证书1
        afterRead_yszyz01(file) {
            this.uploadImg(file.file)
            setTimeout(() => {
                this.fileList_yszhiz01 = this.fileDir
                console.log(this.fileList_yszhiz01);
            }, 900)
            this.sctouxiang = false
            this.sctouxiangz = false
        },
        //上传医师执业证书2
        afterRead_yszyz02(file) {
            this.uploadImg(file.file)
            setTimeout(() => {
                this.fileList_yszhiz02 = this.fileDir
                console.log(this.fileList_yszhiz02);
            }, 800)
            this.sctouxiang1 = false
            this.sctouxiangz = false
        },
        // 上传资格1
        afterRead_yszgz01(file) {
            this.uploadImg(file.file)
            setTimeout(() => {
                this.fileList_ysziz01 = this.fileDir
                console.log(this.fileList_ysziz01);
            }, 800)
            this.sctouxiang2 = false
            this.sctouxiangz = false
        },
        // 上传资格2
        afterRead_yszgz02(file) {
            this.uploadImg(file.file)
            setTimeout(() => {
                this.fileList_ysziz02 = this.fileDir
                console.log(this.fileList_ysziz02);
            }, 800)
            this.picbut = false
            this.sctouxiangz = false
        },
        // 上传医师资格证书2
        afterRead_zjziz01(file) {
            this.uploadImg(file.file)
            setTimeout(() => {
                this.fileList_zjziz01 = this.fileDir
                console.log(this.fileList_zjziz01);
            }, 820)
            this.picbut13 = false
            this.sctouxiangz = false
        },

        // 删除图片
        deleteImg(e, index) {
            console.log('业务触发')
            this.ffileList_yszhiz01 = true
            var imgs = this.imgs;
            var index = index;
            imgs.splice(index, 1);
            console.log(imgs.length + "*****************************");
            this.imgs = imgs
            this.jindutiao = false
            this.backgroundcolor = '#979797'

        },

        // 删除图片
        deleteImg1(e, index) {
            var imgs1 = this.imgs1;
            this.ffileList_yszhiz02 = true
            var index1 = index;
            imgs1.splice(index1, 1);
            this.imgs1 = imgs1
            this.backgroundcolor = '#979797'

        },
        // 删除图片
        deleteImgpicurl1(e, index) {
            var imgs = this.picurl1;
            var index = index;
            imgs.splice(index, 1);
            this.picurl1 = imgs
            this.jindutiao = false
            this.backgroundcolor = '#979797'
            this.ffileList_ysziz01 = true
        },
        // 删除图片
        deleteImgpicurl2(e, index) {
            var imgs = this.picurl22;
            var index = index;
            imgs.splice(index, 1);
            this.picurl22 = imgs
            this.jindutiao = false
            this.backgroundcolor = '#979797'
            this.ffileList_ysziz02 = true
        },
        // 删除图片
        deleteImg2(e, index) {
            var imgs2 = this.imgs2;
            var index2 = index2;
            imgs2.splice(index2, 1);
            this.imgs2 = imgs2
            this.duoxuanpic = true
            this.ffileList_zjziz01 = true
        },
        // 删除二次上传图片
        deleteImgN(val) {
            console.log(val)
            this.fileList_yszhiz01 = false
        },
        deleteImg1N(val) {
            console.log(val)
            this.fileList_yszhiz02 = false
        },
        deleteImgpicurl1N(val) {
            console.log(val)
            this.fileList_ysziz01 = false
        },
        deleteImgpicurl2N(val) {
            console.log(val)
            this.fileList_ysziz02 = false
        },
        deleteImg2N(val) {
            console.log(val)
            this.fileList_zjziz01 = false
        },

        generate() {
            let img1 = this.fileList_yszhiz01 ? this.fileList_yszhiz01 : this.imgs[0];
            let img2 = this.fileList_yszhiz02 ? this.fileList_yszhiz02 : this.imgs1[0];

            let img3 = this.picurl1;

            let picurl1text = this.fileList_ysziz01 ? this.fileList_ysziz01 : this.picurl1[0];
            let picurl2text = this.fileList_ysziz02 ? this.fileList_ysziz02 : this.picurl22[0];
            let docHonorPic = this.fileList_zjziz01 ? this.fileList_zjziz01 : this.imgs2[0];

            let picurl = ''

            picurl = picurl.slice(1)
            // console.log(picurl)
            // console.log(img1)
            // console.log(img2)
            // console.log(picurl1text)
            // console.log(picurl2text)
            if (!img1) {
                this.$toast.center('请上传医师执业证书')

            } else if (!img2) {
                this.$toast.center('请上传医师执业证书')

            } else if (!picurl1text) {
                this.$toast.center('请上传医师资格证书')

            } else if (!picurl2text) {
                this.$toast.center('请上传医师资格证书')

            } else {
                var that = this;
                var doctorId = cookie.get('doctorId')
                var token = cookie.get('token');
                console.log(doctorId, token)
                this.hidden = true
                let list = {
                    doctorId: doctorId,
                    token: token,
                    img1: img1,
                    img2: img2,
                    picurl1text: picurl1text,
                    picurl2text: picurl2text,
                    picurl: picurl,
                    docHonorPic: docHonorPic
                }
                console.log(list)
                generateData(list).then(res => {
                    this.hidden = false
                    this.$toast.center('审核提交成功')
                    this.$router.push({
                        name: 'homePage'
                    })
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
/* pages/renzheng/zhengshurenzheng.wxss */
.page {
    position: relative;
    height: 100%;
    background: #f1f1f1;
}

.xian {
    width: 100%;
    height: 0.15rem;
    background: #efefef;
    clear: both;
}

.backHome {
    width: 81.666%;
    height: 0.76rem;
    background: #00afc2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    color: #fff;
    font-size: 0.32rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
}

.zhezhao {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

.loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    // padding-top: 30px;
    box-sizing: border-box;
    float: left;
    margin-right: 12%;
    position: relative;
}

.pf_but input {
    position: absolute;
    left: 0;
    top: 0;
    width: 175px;
    height: 175px;
    border-radius: 50%;
    opacity: 0;
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

.pf_but div.img {
    width: 100%;
    height: 100%;
    display: block;
    z-index: 100;
    color: #fff;
    text-align: center;
    line-height: 50px;
}

.neiceng-box {
    position: relative;
}

.neiceng-box img.neiceng-del {
    width: 0.43rem;
    height: 0.41rem;
    position: absolute;
    top: -0.14rem;
    left: -0.21em;
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
    right: 10px;
    z-index: 100;
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

/* -----------------------vant-业务层  style----------*/
/deep/ .van-uploader {
    display: block;
    position: absolute;
    top: 0;
    z-index: 10;
    width: 1.38rem;
    height: 1.38rem;
}

/deep/ .van-uploader__input-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

/deep/ .van-uploader__input {
    /* position: absolute; */
    top: 0;
    left: 0;
    z-index: 9;
    overflow: hidden;
    cursor: pointer;
    opacity: 0;
}

/deep/.van-uploader__wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: 100%;
    // overflow: hidden;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}
</style>
