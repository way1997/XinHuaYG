<template>
<div>
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
                            <img src='../assets/img/jiahao.png'> </img>
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
    data() {
        return {
            token: "15555208228:1598318516030:36f286dde71cf7fc53ce995e8b5a41cb",
            doctorId: "3c77b651aedd4f0b8e7a80d0786f74c4",
            dqLoading: false,
            xcShow: false, //相册弹窗层
            dqShow: false, //地区弹窗层
            yljgShow: false, //医疗机构弹窗层
            sexShow: false, //性别业务弹窗层
            zcShow: false, //职称业务弹窗层
            ksShow: false, //科室业务弹窗层
            //--------原
            username: "",
            password: "",
            name: '',
            fileList: [], //上传相册
            sctouxiang: false,
            touxiang: false,
            shanchang: false,
            zhezhao: false,
            keshi: false,
            sousuojibing: false,
            yiliaojigou: false,
            region: false,
            hidden: false,
            jibinselect: false,
            histwrapL: false, //擅长提示
            jianjiehidden: true,
            age: "",
            zhengjianNum: '',
            idCard: '',
            shenfenzheng: '',
            sext: [{
                    name: "男",
                    id: 1
                },
                {
                    name: "女",
                    id: 2
                },
            ],
            sheng: [], //省集合
            shis: [], //市集合
            qus: [], //区集合
            shengtext: '', //省
            shitext: '', //市
            qutext: '', //区
            curData: null, //当前省对象
            classNum: 0, //当前省对象index
            shiCurData: null, //当前市对象
            shiClassNum: 0, //当前市对象index
            quCurData: null, //当前区对象
            quClassNum: 0, //当前区对象index
            select: 1,
            id: "1",
            see: [],
            index: [],
            sheng1: false, //省显示
            shi: false, //市显示
            qu: false, //区显示
            yljg: '', //当显医疗机构单位
            yiliaojigoutext: [], //对应区的医疗机构
            can: false, //对应区的医疗机构.length
            sex1: "",
            zhinametext: '', //职称选项
            zhinametitle: "",
            keshitext: "去选择", //科室
            shanchangid: "1",
            catalogSelect: 0, //判断选中
            arr: "",
            selectyangshi: "color:#222", //选择样式
            photo: [],
        }
    },
}
</script>

<style lang="less" scoped>
//上传相册--------------------
.head_wrap {
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    margin-top: 0.17rem;
    padding: 0 0.23rem;

    //头像模块-标题
    .head_tti {
        font-size: 0.3125rem;
        color: #222222;
        line-height: 0.916rem;
        border-bottom: 1px dashed #d2d2d2;

        div {
            display: inline;
            color: #00b0c2;
        }
    }

    //头像模块-cont
    .head_cont {
        width: 100%;
        height: 2.43rem;
        padding: 0.312rem 0;
        box-sizing: border-box;
        position: relative;

        .pf_but {
            width: 100%;
            height: 100%;
            background: #d0d1d0;
            padding-top: 20%;
            box-sizing: border-box;
            float: left;
            text-align: center;
            margin-right: 0.2rem;

            img {
                width: 0.73rem;
                height: 0.73rem;
                display: block;
                margin: 0 auto;

            }

            div {
                font-size: 0.27rem;
                color: #fff;
                text-align: center;
                line-height: 0.6rem;
            }
        }

        .cont_tit {
            font-size: 0.29rem;
            color: #fff;
            background: #00b0c2;
            width: 0.66rem;
            height: 1.7rem;
            padding: 0.10rem 0.2rem 0.38rem 0.2rem;
            box-sizing: border-box;
        }

        .head_pic_box {
            width: 100%;
            height: 100%;

            .head_pic {
                width: 100%;
                height: 100%;

            }
        }

        .tishi {
            width: 2.39rem;
            height: 100%;
            border: 1px solid #d2d2d2;
            border-left: none;
            float: left;
            padding-left: 0.25rem;
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
            font-size: 0.2rem;
            color: #222222;
            line-height: 0.42rem;
            box-sizing: border-box;
        }
    }
}

//详细资料--title------------------
.select_pharmacy {
    width: 100%;
    height: 0.79rem;
    background: #fff;
    margin-top: 0.17rem;
    padding-right: 0.2rem;
    box-sizing: border-box;
    clear: both;

    .xxzlImg {
        width: 0.2rem;
        height: 0.18rem;
        float: left;
        transform: rotate(90deg);
        margin-top: 0.29rem;
        display: block;
        margin-right: 0.1rem;
    }

    .xxzlDiv {
        color: #434242;
        font-size: 0.31rem;
        float: left;
        line-height: 0.79rem;
    }
}

//详细资料--content------------------
.wrap {
    .text_wrap {
        .text_wrap_tit {
            color: #222222;
            font-size: 0.31rem;
            line-height: 0.93rem;
        }

        .name {
            color: #222222;
            font-size: 0.31rem;
            line-height: 0.93rem;
            text-align: right;
            margin-left: -0.46rem;
        }
    }
}

/* -----------------------vant-业务层  style----------*/
//相册弹窗
/deep/ .van-uploader__input-wrapper {
    position: relative;
    width: 100%;
}

/deep/.van-uploader__wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: 100%;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}

/deep/ .van-picker-column__wrapper {}

// 弹出层Style共享 [地区，医疗机构,省份证件，职业证件，性别,科室]
.popup {
    width: 100%;
    height: 80%;
    margin-top: 8%;

    .list {
        width: 90%;
        border-bottom: 1px solid #d0d1d0;
        text-align: center;

        .item {
            color: #222;
            font-size: 0.31rem;
            text-align: center;
        }
    }

}

.sex-list {
    height: 2rem;
}

//-------------------
//备注--style
.tishi1 {
    padding: 0.3rem 0.77rem;
    color: #717171;
    font-size: 0.27rem;
    line-height: 0.31rem;
}

// 科室弹出层
.ks-popup {
    margin-top: 2%;

    .top {
        font-size: 0.33rem;
        color: #222;
        text-align: center;
        border-bottom: 1px solid #d0d1d0;
        line-height: 88px;
    }
}
</style>
