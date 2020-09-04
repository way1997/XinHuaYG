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

</style>
