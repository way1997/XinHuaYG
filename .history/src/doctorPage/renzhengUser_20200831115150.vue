<template>
<div>
    <van-form @submit='formSubmit'>
        <!-- <Loading v-if="hidden"></Loading> -->
        <!-- 头像上传 -->
        <section class="head_wrap">
            <div class="head_tti">
                请上传
                <div>头像图片</div>，我们将为您制作漂亮的头像
            </div>
            <div class="head_cont">
                <van-row>
                    <van-col span="6">
                        <div class="pf_but" @click="showPopup">

                            <img src='../assets/img/jiahao.png' v-model="fileList"> </img>
                            <img class="touxaing" :src="fileList" v-if="fileList"> </img>
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
        <!--- 详细资料-tit-->
        <section class="select_pharmacy">
            <img class="xxzlImg" src='../assets/img/sanjiaox.png'></img>
            <div class="xxzlDiv">详细资料</div>
        </section>
        <!--- 详细资料-cont -->
        <section class="wrap">
            <van-cell-group>
                <!-- name -->
                <van-cell center class='text_wrap'>
                    <!-- 使用 title 插槽来自定义标题 -->
                    <template #title>
                        <span class="custom-title text_wrap_tit">姓名</span>
                    </template>
                    <template #default>
                        <input class="name" type="text" v-model="name" placeholder='姓名' id="" style="padding-right:1rem">
                    </template>
                </van-cell>
                <!-- age -->
                <van-cell center class='text_wrap'>
                    <template #title>
                        <span class="custom-title text_wrap_tit">年龄</span>
                    </template>
                    <template #default>
                        <input class="name" type="text" v-model="age" maxlength='2' placeholder='年龄' name="" id="" style="padding-right:1rem">
                    </template>
                </van-cell>
                <!-- 地区 -->
                <van-cell center class='text_wrap' is-link @click="addrShowPopup">
                    <template #title>
                        <span class="custom-title text_wrap_tit">地区</span>
                    </template>
                    <template #default>
                        <div class='name'>{{shengtext}}{{shitext}}{{qutext}}</div>
                    </template>
                </van-cell>
                <!-- 医疗机构 -->
                <van-cell center class='text_wrap' is-link @click="yljgShowPopup">
                    <template #title>
                        <span class="custom-title text_wrap_tit">医疗机构</span>
                    </template>
                    <template #default>
                        <div class='name'>{{yljg}}</div>
                    </template>
                </van-cell>
                <!-- 身份证号码 -->
                <van-cell center class='text_wrap'>
                    <template #title>
                        <span class="custom-title text_wrap_tit">身份证号码</span>
                    </template>
                    <template #default>
                        <input class="name" type="text" v-model="idCard" placeholder='身份证号码' name="" id="" style="padding-right:1rem">
                    </template>
                </van-cell>
                <!-- 执业证件号 -->
                <van-cell center class='text_wrap'>
                    <template #title>
                        <span class="custom-title text_wrap_tit">执业证件号</span>
                    </template>
                    <template #default>
                        <input class="name" type="text" v-model="zhengjianNum" placeholder='证件号' name="" id="" style="padding-right:1rem">
                    </template>
                </van-cell>
                <!-- 性别 -->
                <van-cell center class='text_wrap' is-link @click="sexSelcS">
                    <template #title>
                        <span class="custom-title text_wrap_tit">性别</span>
                    </template>
                    <template #default>
                        <div class='name'>{{sex1}}</div>
                    </template>
                </van-cell>
                <!-- 职称 -->
                <van-cell center class='text_wrap' is-link @click="zcSelcS">
                    <template #title>
                        <span class="custom-title text_wrap_tit">职称</span>
                    </template>
                    <template #default>
                        <div class='name'>{{zhinametitle}}</div>
                    </template>
                </van-cell>
                <!-- 备注 -->
                <van-cell center class='text_wrap'>
                    <template #default>
                        <div class='tishi1'>* 平台接受住院医师（仅接受三甲医院）、主治医师、副主任医师及主任医师进驻</div>
                    </template>
                </van-cell>
            </van-cell-group>
        </section>
        <!--- 科室及擅长-tit-->
        <section class="select_pharmacy">
            <img class="xxzlImg" src='../assets/img/sanjiaox.png'></img>
            <div class="xxzlDiv">科室及擅长</div>
        </section>
        <!--- 科室及擅长-cont-->
        <section class="wrap">
            <van-cell-group>
                <!-- 科室 -->
                <van-cell center class='text_wrap' is-link @click="ksShowPopup">
                    <template #title>
                        <span class="custom-title text_wrap_tit">科室</span>
                    </template>
                    <template #default>
                        <div class='name'>{{keshitext}}</div>
                    </template>
                </van-cell>
                <!-- 擅长 -->
                <van-cell center class='text_wrap' is-link @click="scShowPopup">
                    <template #title>
                        <span class="custom-title text_wrap_tit">擅长</span>
                    </template>
                    <template #default>
                        <div class='name'>去选择</div>
                    </template>
                </van-cell>
                <div class='text_wrap2'>
                    <div class='text_wrap6' v-for="(item,index) in arr">{{item.medicineSubjectName}}</div>

                    <div style='width:100%;clear:both'></div>
                </div>
            </van-cell-group>
        </section>
        <!--- 简介-tit-->
        <section class="select_pharmacy">
            <img class="xxzlImg" src='../assets/img/sanjiaox.png'></img>
            <div class="xxzlDiv">简介</div>
        </section>
        <!--- 简介-cont-->
        <section class="wrap">
            <div>
                <div class='jainjie_content'>
                    <textarea class='jj_content' v-model="jianjietext" value='jianjietext' maxlength='-1'>

                    </textarea>
                </div>
            </div>
        </section>

        <van-button round block type="info" native-type="submit" @click='zhengshurenzheng' class='generate'>
            下一步
        </van-button>
        <!--- 业务______层        -->
        <!--- 相册弹出层-->
        <van-popup v-model="xcShow" position="bottom" closeable close-icon-position="top-right" :style="{ height: '16%' }">
            <van-uploader :after-read='afterRead' style="display:block;height:50%">
                <van-button class='sele_pic' block style="font-size:0.3125rem;width:100%;text-align:center;">相册</van-button>
            </van-uploader>
            <van-uploader :after-read='afterRead' style="display:block;height:50%">
                <van-button class=' sele_pic' block style="font-size:0.3125rem;width:100%;text-align:center;">拍照</van-button>
            </van-uploader>
        </van-popup>
        <!--  地区弹出层 -->
        <van-popup v-model="dqShow" @closed="dqClosed" position="bottom" closeable close-icon-position="top-right" :style="{ height: '70%' }">
            <div class="popup dq-popup">
                <van-row v-if="sheng1" v-for="(item,index) in sheng" :key="item.id" @click="shengSlec(item,index)" type="flex" justify="center">
                    <van-col class="list dq-list">
                        <span class="item dq-item" style="text-align:center;">
                            {{item.name}}
                        </span>
                    </van-col>
                </van-row>
                <van-row v-if="shi" v-for="(item,index) in shis" :key="item.id" @click="shiSlec(item,index)" type="flex" justify="center">
                    <van-col class="list sheng-list">
                        <span class="item sheng-item" style="text-align:center;">
                            {{item.name}}
                        </span>
                    </van-col>
                </van-row>
                <van-row v-if="qu" v-for="(item,index) in qus" :key="item.id" @click="quSlec(item,index)" type="flex" justify="center">
                    <van-col class="list sheng-list">
                        <span class="item sheng-item" style="text-align:center;">
                            {{item.name}}
                        </span>
                    </van-col>
                </van-row>
            </div>
        </van-popup>
        <!--  医疗机构弹出层 -->
        <van-popup v-model="yljgShow" position="bottom" closeable close-icon-position="top-right" :style="{ height: '70%' }">
            <div class="popup yljg-popup">
                <van-row type="flex" v-for="(item,index) in yiliaojigoutext" :key="index" @click="yljgSelc(item)" justify="center">
                    <van-col class="list sheng-list">
                        <span class="item sheng-item" :style='{color:(item.hospitalName==yljg?"#00b0c2":"#222")}'>
                            {{item.hospitalName}}
                        </span>

                    </van-col>

                </van-row>
                <van-row type="flex" v-if="can" justify="center">
                    <van-col class="list yljg-list">
                        <span class="item yljg-item" style='border:none'>该地区暂无医疗机构信息</span>
                    </van-col>
                </van-row>
            </div>
        </van-popup>
        <!--  性别选项弹出层 -->
        <van-popup v-model="sexShow" position="bottom" closeable close-icon-position="top-right" :style="{ height: '35%' }">
            <div class="popup sex-popup">
                <van-row type="flex" v-for="(item,index) in sext" :key="index" @click="sexSelc(item)" justify="center">
                    <van-col class="list sex-list">
                        <span class="item sex-item" :style='{color:(item.name==sex1?"#00b0c2":"#222")}'>
                            {{item.name}}
                        </span>

                    </van-col>
                </van-row>
            </div>
        </van-popup>
        <!--  职称弹出层 -->
        <van-popup v-model="zcShow" position="bottom" closeable close-icon-position="top-right" :style="{ height: '70%' }">
            <div class="popup zc-popup">
                <van-row type="flex" v-for="(item,index) in zhinametext" :key="index" @click="zcSelcC(item)" justify="center">
                    <van-col class="list zc-list">
                        <span class="item zc-item" :style='{color:(item.levellName==zhinametitle?"#00b0c2":"#222")}'>
                            {{item.levellName}}
                        </span>

                    </van-col>
                </van-row>
            </div>
        </van-popup>
        <!-- 科室弹出层 -->
        <van-popup v-model="ksShow" position="bottom" closeable close-icon-position="top-right" :style="{ height: '80%' }">
            <div class="popup ks-popup">
                <van-row>
                    <div class='top'>请选择您所在科室或最擅长科室</div>
                </van-row>
                <van-row class="xuanzekeshi">
                    <div v-for="(item,index) in shanchangt" :key="index" class='zhuanghuanyixia'>
                        <div class='text_wrap7' @click='shanchang_color(item)' :style="{'background':item.departmentName==keshitext? '#00b0c2' : '','color':item.departmentName==keshitext? '#fff' : '#222','border':item.departmentName==keshitext? 'none' : '1px solid #d0d1d0'}">{{item.departmentName}}</div>
                    </div>

                </van-row>
                <van-row>
                    <div class='hist'>
                        <div class='list_text'> *如果没有符合的项目,请联系私人助理或拨打客服电话
                            <div> 4001881081 </div>
                        </div>
                        <div class='generate' @click='keshisave'>
                            <div>保存</div>
                        </div>
                    </div>
                </van-row>
            </div>
        </van-popup>
        <!-- 擅长弹出层 -->
        <van-popup v-model="scShow" position="bottom" closeable close-icon-position="top-right" :style="{ height: '80%' }">
            <div class="popup sc-popup">
                <van-row>
                    <div class='top'>请选择擅长治疗疾病
                        <div> (最多选10个)</div>
                    </div>
                </van-row>
                <van-row>
                    <div class="xuanze" style="display: flex; padding:0">
                        <div class="xuanze_wrap" v-if="jibinselect">
                            <div v-for="(item,index) in arrcur" style="display: inline-block;">
                                <div class="text_wrap7 text_kuang">
                                    {{item.medicineSubjectName}}
                                </div>
                            </div>
                        </div>
                    </div>
                </van-row>
                <van-row>
                    <div class='hist1'>*将按您的选择顺序依次展示在您的主页</div>
                </van-row>
                <van-row>
                    <div v-for="(item,index) in beGood" :key="index">
                        <div class="section">
                            <div class='section1'>{{item.name}}</div>
                        </div>
                        <div class=" text_wrap7" :class="intem.check?'active1':''" @click="selectjib(intem,index)" v-for="(intem,index) in item.list" :key="index">{{intem.beGoodName}}</div>
                    </div>
                </van-row>
                <van-row>
                    <div class='generate1' @click='skilled'>
                        <div>保存</div>
                    </div>
                </van-row>
            </div>
        </van-popup>
    </van-form>
    <div class='histwrap' v-if="histwrap">最多选10个</div>
</div>
</template>

<script>
import {
    regionSlec,
    shengSlec,
    shiSlec,
    yljgQShow,
    zcSelc,
    ksShowData,
    getUser,
    getAreaUser
} from "api/doctor"
import home from '../util/util-sec.js'
import cookie from "js-cookie"
import {
    Toast
} from 'vant'
import Loading from '../base/loading/loading'
export default {
    data() {
        return {
            // token: "15555208228:1598318516030:36f286dde71cf7fc53ce995e8b5a41cb",
            // doctorId: "3c77b651aedd4f0b8e7a80d0786f74c4",
            token: "",
            doctorId: "",
            dqLoading: false,
            xcShow: false, //相册弹窗层
            dqShow: false, //地区弹窗层
            yljgShow: false, //医疗机构弹窗层
            sexShow: false, //性别业务弹窗层
            zcShow: false, //职称业务弹窗层
            ksShow: false, //科室业务弹窗层
            scShow: false, //擅长业务弹窗层
            //--------原
            username: "",
            password: "",
            name: '',
            fileList: false, //上传相册
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
            histwrap: false,
            histwrapL: false, //擅长提示
            shanchangt: '', //科室选项
            beGood: [],
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
            sexs: 1,
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
            levelId: "", //当前职称ID
            zhinametitle: "",
            keshitext: "去选择", //科室
            departmentId: '', //当前科室id
            shanchangid: "1",
            catalogSelect: 0, //判断选中
            arr: [],
            arrcur: [],
            selectyangshi: "color:#222", //选择样式
            photo: [],
            objss: null,
            jianjietext: '', //简介
        }
    },
    created() {
        let token = this.$route.params.token
        let doctorId = this.$route.params.doctorId
        // console.log(this.$route.params)
        this.token = token
        this.doctorId = doctorId
    },
    methods: {
        toToast() {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
        },

        //业务---------
        //相册弹出层
        showPopup() {
            this.xcShow = true;
        },
        afterRead(file) {
            console.log('读取完成')
            console.log(file)
            this.fileList = file.content
            this.xcShow = false;
        },
        //地区弹出层
        addrShowPopup() {
            this.dqShow = true;
            this.regionSlec();
        },
        //地区查省
        regionSlec() {
            this.dqLoading = true
            regionSlec()
                .then(res => {
                    // console.log(res)
                    this.dqLoading = false
                    this.sheng1 = true,
                        this.shi = false
                    this.sheng = res.list
                    // console.log(this.shengItems)
                })
                .catch(err => {
                    console.error(err);
                })

        },
        //省查市
        shengSlec: function (data, num) {
            this.dqLoading = true
            var id = data.id
            this.curData = data;
            this.sheng1 = false
            var shengshutext = this.curData.name
            let list = {
                parentId: id
            }
            shengSlec(list)
                .then(res => {
                    console.log(res)
                    this.sheng1 = false,
                        this.shi = true,
                        this.dqLoading = false,
                        this.shengtext = shengshutext,
                        this.shis = res.list,
                        this.shi = true,

                        this.shitext = '',
                        this.qutext = '',
                        this.sheng1 = false,
                        this.hidden = false
                })
                .catch(error => {
                    console.log(error)
                })

        },
        //市查区县
        shiSlec: function (data, num) {
            this.shiCurData = data;
            this.shiClassNum = num;
            this.dqLoading = true
            var id = this.shiCurData.id
            var shishutext = this.shiCurData.name
            let list = {
                parentId: id
            }
            shiSlec(list)
                .then(res => {
                    // console.log(res)
                    this.dqLoading = true
                    this.shitext = shishutext,
                        this.qutext = '',
                        this.qu = true,
                        this.shi = false,
                        this.qus = res.list,
                        console.log()
                })
                .catch(error => {
                    console.log(error)
                })

        },
        //县查乡镇
        quSlec: function (data, num) {
            //
            this.quCurData = data;
            this.quClassNum = num;
            var id = this.quCurData.id
            var qushutext = this.quCurData.name
            this.qutext = qushutext,
                this.yljgid = id
            this.dqShow = false
        },
        //地区弹出层关闭清理
        dqClosed() {
            this.qu = false,
                this.shi = false
        },
        //医疗机构弹出层
        yljgShowPopup() {
            this.yljgShow = true
            let quid = this.quCurData.id
            this.yljgQShow(quid);
        },
        // 显示当前区医疗机构
        yljgQShow(event) {
            if (this.shengtext == '' || this.shitext == '' || this.qutext == '') {
                this.$toast.center('请选择详细地区')
            } else {
                let id = ''
                if (event) {
                    id = event
                } else {
                    id = this.quCurData.areaId
                }
                let list = {
                    parentId: id
                }
                yljgQShow(list)
                    .then(res => {
                        // console.log(res)
                        var canlen = res.list.length
                        this.yiliaojigoutext = res.list
                        if (canlen == 0) {
                            this.can = true
                        }
                        // console.log(this.can)
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        },
        //选择医疗机构
        yljgSelc(item) {
            var numeshuju = item;
            var numeshujutext = item.hospitalName;
            var id = item.id;
            this.yljg = numeshujutext,
                this.yiyuanid = id,
                this.yljgShow = false

        },
        //性别业务弹窗层
        sexSelcS() {
            this.sexShow = true
        },
        //性别业务选项层
        sexSelc(item) {
            var text = item.name
            this.sex1 = text
            // console.log(item.id)
            this.sexs = item.id
            this.sexShow = false
        },
        //职称业务弹窗层
        zcSelcS() {
            this.zcShow = true;
            this.zcSelc()
        },
        //职称业务开启
        zcSelc() {
            let token = this.token
            let list = {
                token: token
            }
            zcSelc(list)

                .then(res => {
                    this.zhinametext = res.data
                    // console.log(this.zhinametext)
                })
                .catch(err => {
                    console.error(err);
                })
        },
        //职称业务选择
        zcSelcC(item) {
            // console.log(item)
            let text = item.levellName
            let id = item.levelId
            this.zhinametitle = text
            this.levelId = id
            this.zcShow = false;
        },
        //科室业务弹窗层
        ksShowPopup() {
            this.ksShow = true;
            this.ksShowData();
        },
        //科室业务Data获取
        ksShowData() {
            var token = cookie.get("token");
            let list = {
                token: token
            }
            ksShowData(list)
                .then(res => {
                    this.shanchangt = res.data
                    this.shanchang = true
                    this.hidden = false
                    this.jianjiehidden = false
                }).catch(error => {
                    console.log(error)
                })
        },
        //选择科室
        shanchang_color(item) {
            console.log(item)
            let keshitext = item.departmentName
            let id = item.departmentId
            this.keshitext = keshitext
            this.departmentId = id
        },
        //科室save
        keshisave() {
            this.ksShow = false
        },
        //擅长业务弹窗层开启
        scShowPopup() {
            this.scShow = true
        },
        //擅长业务 选择疾病
        selectjib(item, index) {

            let beGood = this.beGood
            let f_index = item.find
            let select = item.beGoodName
            let beGoodId = item.beGoodId
            let arr = this.arrcur
            var that = this
            if (arr.length == 10) {
                var flag = beGood[f_index].list[index].check == false;

                this.beGood = beGood

                this.histwrap = true

                const timer = setTimeout(function () {
                    that.histwrap = false
                    // console.log(that.histwrap)
                }, 800)
                // console.log(flag)
                if (flag == false) {
                    for (var i = 0; i < arr.length; i++) {
                        var name = arr[i].name
                        if (select == name) {
                            arr.splice(i, 1);
                            this.arrcur = arr
                            this.arr = arr

                        }

                    }
                }
            }
            if (arr.length != 10) {

                this.histwrap = false
                this.jibinselect = true
                beGood[f_index].list[index].check = !beGood[f_index].list[index].check
                var flag = beGood[f_index].list[index].check;

                this.beGood = beGood
                // console.log(flag)
                if (flag == true) {
                    var obj = {}
                    obj.medicineSubjectName = select
                    obj.beGoodId = beGoodId
                    arr.push(obj)
                    // console.log(arr)
                    // console.log(beGood)

                } else if (flag == false) {
                    for (var i = 0; i < arr.length; i++) {
                        var name = arr[i].medicineSubjectName
                        if (select == name) {
                            arr.splice(i, 1);
                            this.arrcur = arr
                            this.arr = arr
                        }

                    }
                    console.log(arr.length)
                    if (arr.length == 0) {
                        this.jibinselect = false
                    }
                }
            }
            if (arr.length != 0) {

                this.jibinselect = true

            }
        },
        // 擅长保存
        skilled() {
            var list = this.arrcur
            // console.log(list.length + " **-*-**-*-*-*-*-*-*-*-*-*-*");
            // console.log(this.beGood)
            this.keshi = false
            this.jianjiehidden = true

            this.arr = list
            var objs = []
            for (var i = 0; i < list.length; i++) {
                // console.log(list[i].beGoodId)
                var jss = {
                    "medicineSubjectId": list[i].beGoodId
                }
                objs.push(jss);
            }
            console.log(objs)
            var obj = JSON.stringify(objs)
            this.objss = obj
            this.scShow = false
            // console.log(this.objss)
        },
        zhengshurenzheng() {},
        //表单提交
        formSubmit(e) {
            let arrM = this.arr
            let objs = []
            for (let i = 0; i < arrM.length; i++) {
                // console.log(list[i].beGoodId)
                let jss = {
                    "medicineSubjectId": arrM[i].medicineSubjectId
                }
                objs.push(jss);
            }
            let arrJson = '';
            arrJson = JSON.stringify(objs) //默认擅长选项
            console.log(arrJson)

            var that = this;
            var doctorId = this.doctorId;
            var token = this.token
            var name = this.name;
            var shenfenzheng = this.idCard; //省份证
            var zhengjianhao = this.zhengjianNum; //证件号
            var yljgid = this.yljgid; //地区id
            var yljg = this.yiyuanid; //医疗机构id
            var sexs = this.sexs; //性别
            var age2 = this.age;
            console.log(age2 + "/////////////////////////////////////////");
            var departmentId = this.departmentId; //科室id
            var levelId = this.levelId; //职称id
            var beGoodIds = this.objss ? this.objss : arrJson; //擅长
            var introduction = this.jianjietext ? this.jianjietext : this.jianjietext; //简介
            var picurl = this.fileList ? this.fileList : this.picurl; //头像
            var shenFz = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; //身份证
            if (this.sex1 == '男') {
                this.sexs = 1
            }
            if (this.sex1 == '女') {
                this.sexs = 2
            }

            console.log('医生id------' + doctorId)
            console.log('token------' + token)
            console.log('姓名-----' + name)
            console.log('身份证-----' + shenfenzheng)
            console.log('地区id------' + yljgid)
            console.log('医疗机构id-----' + yljg)
            console.log('性别-------' + sexs)
            console.log('擅长----' + beGoodIds)
            console.log('简介----' + introduction)
            console.log('图片-----' + picurl)
            console.log('职称------' + levelId)
            console.log('年龄-------' + age2)
            console.log('证件号-------' + zhengjianhao)

            if (!name) {

                this.$toast.center('请填写姓名')

            } else if (age2 == '' || age2 == 'undefined' || age2 == null) {

                this.$toast.center('请填写年龄')

            } else if (!yljgid) {

                this.$toast.center('请选择地区')

            } else if (!yljg) {

                this.$toast.center('请选择医疗机构')

            } else if (!shenfenzheng) {

                this.$toast.center('请填写身份证号码')

            } else if (!zhengjianhao) {

                this.$toast.center('请填写证件号')

            } else if (!shenFz.test(shenfenzheng)) {

                this.$toast.center('请填写正确的身份证号')

            } else if (!sexs) {

                this.$toast.center('请选择性别')

            } else if (!levelId) {

                this.$toast.center('请选择职称')

            } else if (!departmentId) {

                this.$toast.center('请选择科室')

            } else if (!beGoodIds) {

                this.$toast.center('请选择擅长')

            } else if (!introduction) {

                this.$toast.center('请填写简介')

            } else if (!picurl) {

                this.$toast.center('请选择头像')

            } else {
                var doctorId = cookie.get('doctorId')
                var token = cookie.get('token');

                this.hidden = true
                this.axios({
                    method: 'post',
                    url: home.home + '/mkkMoblie/doctorSupplyThree/saveDoctorInfo',
                    data: {
                        doctorId: doctorId,
                        token: token,
                        doctorName: name,
                        age: age2,
                        doctorPhoto: picurl,
                        areaId: yljgid,
                        doctorHospitalId: yljg,
                        doctorSex: sexs,
                        jobLevelId: levelId,
                        doctorDepartmentId: departmentId,
                        subjectIds: beGoodIds,
                        remarks: introduction,
                        idCard: shenfenzheng,
                        certificateCoding: zhengjianhao
                    }
                }).then(res => {
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            }

            var doctorIds = [];
            var obj = {
                "doctorId": doctorId, //'医生id------' + doctorId
                "name": name, //'姓名-----' + name
                "shenfenzheng": shenfenzheng, //'身份证-----' + shenfenzheng
                "yljgid": yljgid, // '地区id------' + yljgid
                "yljg": yljg, //'医疗机构id-----' + yljg
                "sexs": sexs, //'性别-------' + sexs
                "beGoodIds": beGoodIds, //'擅长----' + beGoodIds
                "introduction": introduction, //'简介----' + introduction
                "picurl": picurl, //'图片-----' + picurl
                "levelId": levelId, //'职称------' + levelId
                "age2": age2, // '年龄-------' + age2
                "zhengjianhao": zhengjianhao //'证件号-------' + zhengjianhao
            }
            doctorIds.push(obj);
            doctorIds = JSON.stringify(doctorIds)
            console.log(doctorIds)
            cookie.set('doctorId', doctorIds)
        },
        //------------------axios数据加载业务----
        //用户信息获取
        getUser() {
            let that = this
            let token = this.token

            let list = {
                token: token
            }
            getUser(list)

                .then(res => {
                    // console.log(res)
                    for (var i = 0; i < res.data.length; i++) {
                        for (var j = 0; j < res.data[i].list.length; j++) {
                            var beGoodId = res.data[i].list[j].beGoodId;
                            res.data[i].list[j].check = false
                            res.data[i].list[j].find = i
                            var flag = res.data[i].list[j].check
                        }
                    }
                    this.beGood = res.data
                    // console.log(this.beGood);
                })
                .catch(err => {
                    console.error(err);
                })
        },
        //用户地区获取
        getArea() {
            let doctorId = this.doctorId
            let token = this.token
            console.log(doctorId, token)
            let list = {
                doctorId: doctorId,
                token: token
            }
            console.log(list)
            getAreaUser(list)
                .then(res => {
                    console.log(res.data)
                    let photo = this.photo;
                    photo.push(res.data.doctorPhoto);
                    this.name = res.data.doctorName,
                        this.photo = photo,
                        this.touxiang = true,
                        this.hidden = false,
                        this.yljg = res.data.doctorHospitalName,
                        this.yiyuanid = res.data.doctorHospitalId,
                        this.zhinametitle = res.data.jobLevelName,
                        this.keshitext = res.data.doctorDepartmentName,
                        this.arr = res.data.list_adept,
                        this.jianjietext = res.data.remarks,
                        this.idCard = res.data.idCard,
                        this.areaId = res.data.areaId,
                        this.departmentId = res.data.doctorDepartmentId,
                        this.levelId = res.data.jobLevelId,
                        this.shengtext = res.data.areaProName,
                        this.shitext = res.data.cityName,
                        this.qutext = res.data.areaName,
                        this.yljgid = res.data.areaId,
                        this.age = res.data.age,
                        // this.picurl = res.data.doctorPhoto,
                        this.zhengjianNum = res.data.certificateCoding,
                        this.quCurData = res.data,
                        console.log(res.data)
                    if (res.data.doctorSex == 1) { //性别

                        this.sex1 = '男'

                    } else {

                        this.sex1 = '女'
                    }
                    // console.log(this.jianjietext)
                })
                .catch(err => {
                    console.error(err);
                })
        }
    },
    mounted() {
        this.getUser();
        this.getArea();
    },
    components: {
        Loading: Loading
    }
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
            position: relative;

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
            width: 1.9rem;
            height: 100%;
            border: 1px solid #d2d2d2;
            border-left: none;
            float: left;
            margin-left: 2px;
            padding-top: 0.25rem;
            padding-right: 0.25rem;
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

    .top {
        font-size: 0.33rem;
        color: #222;
        text-align: center;
        border-bottom: 1px solid #d0d1d0;
        line-height: 88px;

        div {
            display: inline
        }
    }

    .text_wrap7 {
        padding: 0 0.22rem;
        box-sizing: border-box;
        height: 0.45rem;
        border: 1px solid #d0d1d0;
        font-size: 0.3rem;
        color: #222;
        text-align: center;
        line-height: 0.43rem;
        border-radius: 0.1px;
        display: inline-block;
        position: relative;
        margin-bottom: 0.26rem;
        margin-right: 0.20rem;
    }

    .active1 {
        color: #fff;
        background: #00b0c2;
        border: 1px solid #00b0c2;
    }
}

.text_kuang {
    border-radius: 0.3rem;
    position: relative;

    img {
        width: 0.25rem;
        height: 0.25rem;
        margin: auto;
        margin-right: 0.13rem;
        margin-top: 0.9rem;
        display: block;
        float: left;
    }
}

.text_wrap2 {
    width: 100%;
    border-top: 1px dashed #d2d2d2;
    padding-top: 0.25rem;
    box-sizing: border-box;
}

.text_wrap6 {
    padding: 0 12px;
    box-sizing: border-box;
    height: 40px;
    border: 1px solid #00b0c2;
    font-size: 30px;
    color: #00b0c2;
    text-align: center;
    line-height: 40px;
    border-radius: 10px;
    display: inline-block;

    margin-bottom: 25px;
    margin-right: 20px;
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

    .xuanzekeshi {
        height: 4.82rem;
        box-sizing: border-box;
        position: relative;

        .zhuanghuanyixia {
            display: inline-block;

        }
    }

    .hist {
        width: 100%;
        height: 10%;
        line-height: 0.59rem;
        color: #222;
        font-size: 0.3rem;
        border-top: 1px solid #d0d1d0;
        padding: 0 0.23rem;
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #fff;

        .list_text {
            border-bottom: 1px solid #d0d1d0;

            div {
                color: #00b0c2;
                display: inline;

            }
        }

        .generate {
            width: 100%;
            height: 0.9rem;
            background: #fff;
            padding: 0.1rem 0.23rem;
            box-sizing: border-box;

            div {
                color: #fff;
                background: #00b0c2;
                text-align: center;
                line-height: 0.75rem;
                height: 0.75rem;
                width: 100%;
                border-radius: 0.1rem;
                font-size: 0.32rem;
            }
        }
    }
}

//擅长弹出层
.sc-popup {
    .hist1 {
        font-size: 0.27rem;
        color: #00b0c2;
        margin-top: 0.1rem;
    }

    .section1 {
        font-size: 0.3rem;
        color: #a9a8b1;
        line-height: 0.72rem;
    }

    .generate1 {
        width: 93%;
        height: .9rem;
        background: #fff;
        padding: .1rem 0;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        left: 50%;

        transform: translate(-50%, 0);

        div {
            color: #fff;
            width: 100%;
            background: #00b0c2;
            text-align: center;
            line-height: 0.75rem;
            height: 0.75rem;
            border-radius: 0.1rem;
            font-size: 0.32rem;
        }
    }
}

.generate {
    width: 100%;
    height: .9rem;
    background: #fff;
    padding: .1rem .23rem;
    box-sizing: border-box;
    border: none;

    div {
        color: #fff;
        background: #00b0c2;
        text-align: center;
        line-height: 0.75rem;
        height: 0.75rem;
        width: 100%;
        border-radius: 0.1rem;
        font-size: 0.32rem;
    }
}

.histwrap {
    padding: 12px 20px;
    background: rgba(0, 0, 0, 0.6);
    font-size: 30px;
    text-align: center;
    color: #fff;
    display: inline-block;
    line-height: 41px;
    border-radius: 15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999999;

}

.jainjie_content {
    width: 92%;
    padding: 0 .23rem .23rem .23rem;
    background: #fff;
}

.jj_content {
    width: 90%;
    background: #f1f1f1;
    border-radius: .10rem;
    border: 1px solid #d2d2d2;
    font-size: .28rem;
    color: #000000;
    overflow: hidden;
}

img.touxaing {
    position: absolute;
    width: 100% !important;
    height: 100% !important;
    left: 0;
    top: 0
}
</style>
