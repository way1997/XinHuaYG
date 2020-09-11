<template>
<div class="paizhaokf">
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
        <div class="bianz">
            <p>编写辩证内容</p>
            <textarea name="" id="" cols="" rows="" placeholder="请输入辩证内容" v-model="sickName"></textarea>
        </div>
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
            <p> <img :src="uploadImg">
                <input ref="input" type="file" accept="image/*" @change="handleFileChange">
            </p>
        </div>
    </div>
    <div class="xian"></div>
    <div class="third">
        <h1>其他信息</h1>
        <div class="fenlei">
            <div class="qianF" style="height:70px;padding-top:20px">
                <label style="color:red;">诊金:</label>
                <p><span @click="showJin">{{zhenjinte}}元</span><label v-show="chooseZhen"><em v-for="(item,index) in kekzhenjinana" :key="index" @click="choosePrice(item.price)">{{item.price}}</em></label></p>
            </div>
            <div class="qianF">
                <label>购药前查看药方:</label>
                <p><span v-for="(item,index) in chakan" :key="index" @click="changeChakan(index,item.name)" :class="{choose:chakanIdx==index}">{{item.name}}</span></p>
            </div>
            <div class="jinji">
                <p><label>服药禁忌:</label><em @click="hideList">({{textJinji}})</em></p>
                <div class="list" v-show="hidejinji">
                    <span v-for='(item,index) in list' :key="index" :class="{chooseJin:selectIndex[index].sureid}" @click="xuanJinji(index,item.tabooName,item.tabooId)">{{item.tabooName}}</span>
                </div>
            </div>
            <div class="buchong">
                <span>补充说明:</span>
                <textarea name="" id="" cols="" rows="" placeholder="输入文字内容" v-model="preEnjoin"></textarea>
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
            pinpaiType: '',
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
            zhenjinte: '0.00',
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
            medicineType: 1
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
    },
    computed: {

    },

    methods: {
        backHome() {
            this.$router.go(-1)
        },
        saveOnlinePrescribing() {
            let that = this;
            var sexb;
            if (this.patientSex == '男') {
                sexb = 1
            } else {
                sexb = 2
            }
            if (this.sickName == '') {
                this.$toast("请填写辩证内容");
                return false
            }
            that.json.forEach(function (item, index) {
                that.taboos.push(item.tabooId);
                //console.log(item)
            })
            if (this.preEnjoin == '') {
                this.preEnjoin = '无';
            }
            if (this.imgcount == 0) {
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
            saveOnlinePrescribing(list).then((res) => {
                //console.log(res);
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
                this.photo1 = baseURI + '/mkkMoblie/' + response.data;
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
            this.pinpaiIdx = index;
            this.brandId = brandId;
            this.pinpaiType = value;
        },
        changeYaotai(index, id, value) {
            this.yaotaiIdx = index;
            this.shapeId = id;
            this.shopspan = value;
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
                //console.log(res);
                this.medicineManner = res.list;
                this.brandId = res.list[0].id;
                this.pinpaiType = res.list[0].lable;
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
                this.shapeId = this.yaotaiList[0].shapeId;
                this.shopspan = this.yaotaiList[0].shapeName;
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
            width: 682px;
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
            width: 611px;
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
        width: 668px;
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
        width: 688px;
        height: 140px;
        border: none;
        margin: 0 auto;
        margin-top: 35px;
        font-size: 25px;
        color: #828282;

        p {
            position: relative;
            width: 111px;
            height: 111px;
            float: right;
            padding: 20px;

            img {
                position: absolute;
                right: 0;
                top: 0;
                width: 111px;
                height: 111px;
            }

            input {
                position: absolute;
                right: 0;
                top: 0;
                width: 111px;
                height: 111px;
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

            span {
                float: left;
                color: #828282;
                font-size: 24px;
                padding-right: 20px;
            }

            textarea {
                float: left;
                width: 524px;
                height: 130px;
                resize: none;
                border: 1px solid #d4d4d4;
                color: #828282;
                padding: 10px;
                margin-top: 20px;
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
