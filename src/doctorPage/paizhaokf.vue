<template>
<div class="paizhaokf">
    <div class="zhezhao2" v-if="loadUp2">
        <!-- 处理消息撤回 发送消息-->
        <img src="../assets/img/LODING.gif" alt="" class="loading">
    </div>
    <div class="buzhou">
        <img src="../assets/img/buzhou4.png" alt="">
    </div>
    <div class="xian"></div>
    <div class="first">
        <h1>患者信息</h1>
        <div class="info">
            <p><span>患者姓名:</span><label>{{patientName}}</label></p>
            <p><span>患者性别:</span><label>{{patientSex}}</label></p>
            <p><span>患者年龄:</span><label>{{age}}</label></p>
        </div>
        <div class="xian"></div>
        <!--   <div class="bianz">
        <p>编写辩证内容</p>
        <textarea name="" id="" cols="" rows="" placeholder="请输入辩证内容" v-model="sickName"></textarea>
      </div>-->
    </div>
    <div class="xian"></div>
    <div class="second">
        <h1>药方信息</h1>
        <div class="yangshi"><label>类型:</label>
            <p><span :class="{choose:chooseidx==0}" v-for="(item,index) in yaotype" :key="index" @click="changeType(index,item.label)">{{item.label}}</span></p>
        </div>
        <div class="yangshi"><label>品牌:</label>
            <p><span @click="changePinpai(index,item.id,item.lable)" v-for="(item,index) in medicineManner" :key="index" :class="{choose:pinpaiIdx==index}">{{item.lable}}</span></p>
        </div>
        <div class="yangshi"><label>药态:</label>
            <p><span @click="changeYaotai(index,item.shapeId,item.shapeName)" v-for="(item,index) in yaotaiList" :key="index" :class="{choose:yaotaiIdx==index}">{{item.shapeName}}</span></p>
        </div>
        <div class="yaofang"><label>药方:</label>
            <p>
                <img src="../assets/img/cfxx.png" class="img1" @click="changjianwenti" />
                <span style="position: absolute;margin-top: 1.4rem;margin-left: 0.4rem;background-color: darkgray;width: 1.6rem;
                      height: 0.4rem;text-align: center;vertical-align: middle;color: white;line-height: 0.4rem;">常见问题</span>
            </p>
            <p>
                <img :src="uploadImg">
                <input ref="input" type="file" accept="image/*" @change="handleFileChange">
            </p>
        </div>
    </div>
    <div class="xian"></div>
    <div class="third">
        <h1>其他信息</h1>
        <div class="fenlei">
            <div class="qianF" style="height:100px;">
                <label style="color:red;">诊金:</label>
                <p><span>{{zhenjinte}}元</span></p>
                <p><span @click="showJin">点击选择诊金</span><label v-show="chooseZhen"><em v-for="(item,index) in kekzhenjinana" :key="index" @click="choosePrice(item.price)">{{item.price}}</em></label></p>
            </div>
            <div class="qianF">
                <label>购药前查看药方:</label>
                <p><span v-for="(item,index) in chakan" :key="index" @click="changeChakan(index,item.name)" :class="{choose:chakanIdx==index}">{{item.name}}</span></p>
            </div>
            <!--      <div class="jinji">
          <p><label>服药禁忌:</label><em @click="hideList">({{textJinji}})</em></p>
          <div class="list" v-show="hidejinji">
            <span v-for='(item,index) in list' :key="index" :class="{chooseJin:selectIndex[index].sureid}" @click="xuanJinji(index,item.tabooName,item.tabooId)">{{item.tabooName}}</span>
          </div>
        </div>-->
            <div class="buchong">
                <span>医嘱:</span>
                <textarea name="" id="" cols="" rows="" placeholder="输入文字内容,如填写服用方法等内容." v-model="preEnjoin"></textarea>
            </div>
        </div>
    </div>
    <div class="nextStep">
        <div @click="backHome">返回上一页</div>
        <div @click="saveOnlinePrescribing">确认开方</div>
    </div>
</div>
</template>

<script>
import {
    taboo,
    priceList,
    prescriptionType,
    modelType,
    findBrandList,
    saveOnlinePrescribing,
    doctorSelAllDrug
} from "api/doctor"
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import baseURI from 'api/env'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'

export default {
    name: "paizhaokf",
    data() {
        return {
            step1: false,
            chooseidx: 0,
            jinjichoose: 0,
            patientName: '',
            patientSex: '',
            patientId: '',
            age: '',
            sickName: '',
            yaofangspan: '',
            showbigImg: false,
            pinpaiType: '',
            loadUp2: false,
            shopspan: '',
            pinpaiIdx: 0,
            yaotaiIdx: 0,
            chakan: [{
                    name: '不可看'
                },
                {
                    name: '可看'
                }
            ],
            chakanText: '不可看',
            chakanIdx: 0,
            yaoNum: '',
            chooseZhen: false,
            hidejinji: true,
            textJinji: '点击收起',
            yaotype: '',
            medicineManner: '',
            brandId: '',
            yaotaiList: '',
            kekzhenjinana: '',
            zhenjinte: '0',
            total1: 0.00,
            total: 0.00,
            list: [],
            selectIndex: [],
            arr: [],
            shapeId: '',
            isPayLook: 0,
            preEnjoin: '',
            preNum: '7',
            preOnce: '1',
            dayNum: '3',
            json: [],
            taboos: [],
            isModel: 0,
            modelName: '',
            isAgent: 0,
            token: '',
            doctorId: '',
            modelType: '1',
            uploadImg: require('../assets/img/addBtn.png'),
            imgDatas: [],
            photo1: '',
            countPrice: 0.00,
            medicineType: 1,
            imgcount: 0
        }
    },
    created() {
        this.token = cookie.get('token');
        this.doctorId = cookie.get('doctorId');
        this.patientId = cookie.get('patientId');
        this.patientName = cookie.get('patientName');
        this.patientSex = cookie.get('patientSex');
        if (this.patientSex == 1) {
            this.patientSex = '男'
        } else {
            this.patientSex = '女'
        }
        this.age = cookie.get('age');
        if (this.$route.query.modelId) {
            this.modelId = this.$route.query.modelId;
        }
        this.prescriptionType();
        this.modelTypes();
        this.findBrandList();
        this.priceList();
        this.taboo();
        this.pinpaiIdx = 100;
        this.brandId = '';
        this.pinpaiType = '';
        this.yaotaiIdx = 100;
        this.shapeId = '';
        this.shopspan = '';
        window.scrollTo(0, 0);
    },
    computed: {

    },

    methods: {
        backHome() {
            this.$router.go(-1)
        },
        changjianwenti() {
            this.$router.push('/changjianwenti')
        },
        saveOnlinePrescribing() {
            let that = this;
            var sexb = '';
            if (this.patientSex == '男') {
                sexb = 1
            } else {
                sexb = 2
            }

            // if (this.sickName == '') {
            //   this.$toast("请填写辩证内容");
            //   return false
            // }
            that.json.forEach(function (item, index) {
                that.taboos.push(item.tabooId);
                //console.log(item)
            })
            if (this.preEnjoin == '') {
                this.preEnjoin = '无';
            }
            console.log(this.shapeId)
            console.log(this.brandId)
            if (this.shapeId == '') {
                alert("未选择药态");
                return false
            }
            if (this.brandId == '') {
                alert("未选择品牌");
                return false
            }
            if (this.imgcount == 0) {
                alert("请上传图片");
                this.$toast("请上传图片");
                return false
            }
            //console.log(that.taboos)
            if (this.taboos.length == 0) {
                this.taboos = '6f8b2ff0b12a4158a0b6f623893b2ab4'
            }
            let list = {
                doctorId: this.doctorId,
                token: this.token,
                patientId: this.patientId, //患者信息
                patientName: this.patientName, //患者姓名
                patientAge: this.age, //患者年龄
                patientSex: sexb, //性别
                medicineType: this.medicineType, //药方类型
                shapeId: this.shapeId, //药态
                serviceCharge: 0, //治疗服务费
                diagnoseMoney: this.zhenjinte, //诊金
                isPayLook: this.isPayLook, //购买前是否可查看药方
                taboo: this.taboos.toString(), //服药禁忌
                preEnjoin: this.preEnjoin, //医嘱
                isAgent: this.isAgent, //是否待煎
                countPrice: this.countPrice, //总价
                photo1: this.photo1, //照片路径
                brandId: this.brandId
            }
            this.loadUp2 = true
            saveOnlinePrescribing(list).then((res) => {
                this.loadUp2 = false
                console.log(res);
                let that = this;
                if (res.type == true) {
                    this.$toast('开方成功')
                    setTimeout(function () {
                        that.$router.push('/houzhen')
                    }, 1500)
                } else {
                    this.$toast(res.massage)
                }
            })
        },
        handleFileChange(event) { //上传图片
            var files = this.$refs.input.files;
            var that = this;

            function readAndPreview(file) {
                if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        // 防止重复上传
                        if (that.imgDatas.indexOf(e.target.result) === -1) {
                            that.imgDatas.push(e.target.result);
                            that.uploadImg = e.target.result;
                            that.imgcount = 1;
                        }
                    };
                    reader.readAsDataURL(file);
                }
            }
            let param = new FormData(); // 创建form对象
            param.append("file", files[0]);
            //console.log(files[0])
            that.axios.post(baseURI + '/mkkMoblie/uploadFile/picture', param, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                //console.log(response)           
                if (escape(response.data).indexOf("%u") < 0) {
                    console.log(response);
                    this.photo1 = baseURI + '/mkkMoblie/' + response.data;

                } else {
                    this.$toast.center("该图片路径包含中文，请修改图片名称在上传");
                }
            }).catch(error => {
                alert('上传图片出错！');
            })
            readAndPreview(files[0])
            if (files.length === 0) {
                return;
            }
        },
        hideList() {
            this.hidejinji = !this.hidejinji;
            if (this.hidejinji == true) {
                this.textJinji = '点击收起'
            } else {
                this.textJinji = '点击展开'
            }
        },
        showJin() {
            this.chooseZhen = !this.chooseZhen;
        },
        changeType(index, value) {
            this.chooseidx = index;
            this.yaofangspan = value;
        },
        changePinpai(index, brandId, value) {
            if (this.arr.length != 0) {
                return false;
            }
            this.pinpaiIdx = index;
            this.brandId = brandId;
            this.pinpaiType = value;
            console.log(this.brandId)
            console.log(this.pinpaiType)
            this.yaotaiIdx = 100;
            this.shapeId = '';
            this.shopspan = '';
        },
        changeYaotai(index, id, value) {
            if (this.arr.length != 0) {
                return false;
            }
            console.log(this.pinpaiIdx)
            console.log(index)
            if (index == 1 && this.pinpaiIdx != 2) {
                this.pinpaiIdx = 2;
                this.brandId = 'e3da571c41a641aea32vfvn931b89ea98ce';
                this.pinpaiType = "新华社区";
                this.yaotaiIdx = index;
                this.shapeId = id;
                this.shopspan = value;
            } else {
                this.yaotaiIdx = index;
                this.shapeId = id;
                this.shopspan = value;
            }
        },
        changeChakan(index, value) {
            this.chakanIdx = index;
            this.isPayLook = index;
            this.chakanText = value;
        },
        prescriptionType() { //药方类型
            let list = {
                token: this.token
            }
            prescriptionType(list).then((res) => {
                //console.log(res);
                this.yaotype = res.date;
                this.yaofangspan = this.yaotype[0].label;
            })
        },
        findBrandList() { //药态品牌
            let list = {
                doctorId: this.doctorId,
                token: this.token
            }
            findBrandList(list).then((res) => {
                console.log(res);
                this.medicineManner = res.list;
                // this.brandId = res.list[0].id;
                // this.pinpaiType = res.list[0].lable;
                //console.log(res.list)
            })
        },
        modelTypes() { //药态类型
            let list = {
                token: this.token
            }
            modelType(list).then((res) => {
                //console.log(res);
                this.yaotaiList = res.data;
                //this.shapeId = this.yaotaiList[0].shapeId;
                // this.shopspan = this.yaotaiList[0].shapeName;
            })
        },
        priceList() { //诊金列表
            let list = {
                token: this.token
            }
            priceList(list).then((res) => {
                //console.log(res);
                this.kekzhenjinana = res.data;
            })
        },
        taboo() { //禁忌
            let list = {
                token: this.token
            }
            let that = this;
            taboo(list).then((res) => {
                ///console.log(res);
                this.list = res.data;
                res.data.forEach(function (item, index) {
                    that.selectIndex.push({
                        sureid: 0
                    });
                })
                //console.log(this.selectIndex)
            })
        },
        xuanJinji(index, text, id) {
            this.jinjichoose = index;
            this.selectIndex[index].sureid = !this.selectIndex[index].sureid;
            let flag = this.selectIndex[index].sureid;
            if (flag == 0) {
                for (var i = 0; i < this.json.length; i++) {
                    if (this.json[i].tabooName == text) {
                        this.json.splice(i, 1);
                    }
                }
            } else {
                var obj = {}
                obj.tabooId = id
                obj.tabooName = text
                this.json.push(obj);
                //console.log(this.arr)
            }
        },
        choosePrice(value) {
            this.zhenjinte = value;
            this.chooseZhen = false;
            this.total1 = this.total + value;
        },

    },
    components: {

    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.zhezhao2 {
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

.img1 {
    width: 1.12rem;
    height: 1.12rem;
    margin-left: 1.9rem;
}

.paizhaokf {
    width: 100%;
    height: 200%;
    padding-bottom: 270px;
}

.xian {
    width: 100%;
    height: 10px;
    background: #efefef;
}

.first {
    width: 100%;

    .info {
        widows: 100%;
        height: 268px;
        background: #fff;

        p {
            width: 90%;
            height: 77px;
            border-bottom: 1px solid #f5f5f5;
            color: #828282;
            font-size: 24px;
            line-height: 77px;
            margin: 0 auto;
            padding: 0 10px;

            span {
                float: left;
            }

            label {
                float: right;
            }
        }
    }

    .bianz {
        width: 100%;
        background: #fff;
        margin-top: 10px;

        p {
            font-size: 24px;
            color: #828282;
            padding-left: 43px;
            line-height: 80px;
        }

        textarea {
            width: 80%;
            height: 214px;
            background: rgba(246, 246, 246, 1);
            border: 1px solid rgba(170, 170, 170, 1);
            border-radius: 12px;
            resize: none;
            border: 1px solid #c3c3c3;
            color: #b4b4b4;
            padding: 30px;
            margin-left: 43px;
        }
    }
}

.second {
    width: 100%;

    div.yangshi {
        width: 90%;
        height: 80px;
        border-bottom: 1px solid #e9e9e9;
        color: #828282;
        font-size: 24px;
        line-height: 80px;
        margin: 0 auto;
        padding: 0 10px;

        label {
            float: left;
        }

        p {
            float: right;

            span {
                width: 140px;
                height: 57px;
                background: #d4d4d4;
                color: #fff;
                text-align: center;
                line-height: 57px;
                float: left;
                margin-right: 20px;
                border-radius: 57px;
                margin-top: 10px;
            }

            span.choose {
                width: 140px;
                height: 57px;
                background: #42cac6;
                color: #fff;
                text-align: center;
                line-height: 57px;
                float: left;
                margin-right: 20px;
                border-radius: 57px;
                margin-top: 10px;
            }
        }
    }

    .yaofang {
        width: 90%;
        height: 2.5rem;
        border: none;
        margin: 0 auto;
        margin-top: 35px;
        font-size: 25px;
        color: #828282;

        p {
            position: relative;
            width: 2rem;
            height: 2rem;
            float: right;
            padding: 20px;
            margin-top: 0.4rem;

            img {
                position: absolute;
                right: 0;
                top: 0;
                width: 2rem;
                height: 2rem;
            }

            input {
                position: absolute;
                right: 0;
                top: 0;
                width: 2rem;
                height: 2rem;
                opacity: 0;
            }
        }

    }

    .jiliang {
        width: 100%;
        font-size: 24px;
        color: #828282;
        padding-top: 20px;

        input {
            width: 85px;
            height: 45px;
            border: 1px solid #42cac6;
            margin: 0 10px;
            border-radius: 10px;
            text-align: center;
            color: #828282;
        }
    }
}

.third {
    width: 100%;

    .feiyong {
        width: 694px;
        height: 80px;
        background: #f6f6f6;
        margin: 0 auto;
        font-size: 24px;
        line-height: 80px;
        border-radius: 10px;
        margin-top: 10px;

        span {
            color: #42cac6;
            padding-left: 20px;
        }

        label {
            color: #fd7d7d;
            float: right;
            padding-right: 20px;
        }
    }

    .fenlei {
        width: 694px;
        margin: 0 auto;

        div.qianF {
            width: 100%;
            float: left;
            height: 80px;
            border-bottom: 1px solid #eeeeee;
            line-height: 80px;
            margin-left: 0.3rem;

            >label {
                font-size: 24px;
                color: #828282;
                float: left;
            }

            &:nth-of-type(1) p {
                width: 288px;
                height: 45px;
                //border: 3px solid #42cac6;
                margin-top: 15px;
                text-align: center;
                font-size: 25px;
                line-height: 45px;
                color: #fff;
                float: right;
                border-radius: 10px;
                position: relative;
                background: #fd7d7d;
                margin-right: 1.2rem;

                label {
                    position: absolute;
                    top: 47px;
                    left: 0;
                    width: 286px;
                    font-size: 24px;
                    color: #42cac6;
                    text-align: center;
                    line-height: 45px;
                    background: #fff;
                    border: 1px solid #42cac6;
                    border-radius: 10px;

                    em {
                        width: 100%;
                        float: left;
                        height: 45px;
                        border-bottom: 1px solid #42cac6;

                        &:last-child {
                            border-bottom: none;
                        }
                    }
                }
            }

            &:nth-of-type(2) p {
                float: right;
                font-size: 24px;
                margin-right: 0.9rem;

                span {
                    width: 140px;
                    height: 57px;
                    background: #d4d4d4;
                    color: #fff;
                    text-align: center;
                    line-height: 57px;
                    float: left;
                    margin-right: 20px;
                    border-radius: 57px;
                    margin-top: 10px;
                }

                span.choose {
                    width: 140px;
                    height: 57px;
                    background: #42cac6;
                    color: #fff;
                    text-align: center;
                    line-height: 57px;
                    float: left;
                    margin-right: 20px;
                    border-radius: 57px;
                    margin-top: 10px;
                }
            }
        }

        .jinji {
            width: 694px;
            height: 80px;
            line-height: 80px;
            margin: 0 auto;
            border-bottom: none;

            p {
                padding: 20px 10px;
                font-size: 24px;
                color: #828282;

                em {
                    float: right;
                    color: #42cac6;
                    margin-right: 0.9rem;
                }
            }

            .list {
                border: none;
                width: 100%;
                height: 400px;

                span {
                    float: left;
                    width: 170px;
                    padding: 5px 15px;
                    //height: 55px;
                    text-align: center;
                    line-height: 45px;
                    border-radius: 30px;
                    color: #fff;
                    background: #d4d4d4;
                    font-size: 24px;
                    margin-right: 15px;
                    margin-bottom: 15px;
                    overflow: hidden;
                    height: 1.2rem;
                }

                span.chooseJin {
                    float: left;
                    width: 170px;
                    padding: 5px 15px;
                    //height: 55px;
                    text-align: center;
                    line-height: 45px;
                    border-radius: 30px;
                    color: #fff;
                    background: #42cac6;
                    font-size: 24px;
                    margin-right: 15px;
                    margin-bottom: 15px;
                    overflow: hidden;
                }
            }
        }

        .buchong {
            width: 694px;
            margin: 0 auto;
            border: none;
            float: left;
            padding-top: 20px;
            clear: both;
            margin-bottom: 1rem;

            span {
                float: left;
                color: #828282;
                font-size: 24px;
                padding-right: 20px;
                margin-left: 0.2rem;
            }

            textarea {
                float: left;
                width: 80%;
                height: 130px;
                resize: none;
                border: 1px solid #d4d4d4;
                color: #828282;
                padding: 10px;
                margin-top: 20px;
                margin-left: 0.2rem;
            }

            textarea::-webkit-input-placeholder {
                color: #c9c9c9;
                font-size: 25px;
            }
        }
    }

}

h1 {
    width: 190px;
    height: 53px;
    line-height: 53px;
    text-align: center;
    font-size: 24px;
    color: #fff;
    background: rgba(66, 202, 198, 1);
    border-radius: 0px 27px 27px 0px;
    margin-top: 20px;
}

.nextStep {
    width: 100%;
    height: 91px;
    position: fixed;
    bottom: 0;
    left: 0;

    div {
        width: 50%;
        height: 91px;
        color: #fff;
        font-size: 24px;
        float: left;
        text-align: center;
        line-height: 91px;
        background: #858585;

        &:nth-of-type(2) {
            background: #42cac6;
        }
    }
}

input,
textarea {
    outline: none;
}

div,
span,
p,
label {
    font-size: 30px !important;
}
</style>
