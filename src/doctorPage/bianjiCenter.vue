<template>
<div class="bianji">
    <div class="head">
        <div class="uploadPic">
            <img :src="doctorPhoto" alt="">
            <input ref="input" type="file" accept="image/*" multiple="multiple" @change="handleFileChange">
        </div>
        <p v-if="!ifBianji">更新头像</p>
        <span class="back" v-if="ifBianji" @touchstart="back">返回</span>
        <span class="bianji" v-if="ifBianji" @touchstart="bianji"><img src="../assets/img/bianji.png" alt="">编辑</span>
        <span class="back" v-if="!ifBianji" @touchstart="quxiaoBj">取消编辑</span>
        <span class="bianji" v-if="!ifBianji" @touchstart="querenXiu"><img src="../assets/img/bianji.png" alt="">确认修改</span>
    </div>
    <div class="info">
        <p><span>姓名:</span><input type="text" v-model="name" readonly></p>
        <p><span>职称:</span><input type="text" v-model="doctorLevel" readonly></p>
        <p><span>性别:</span><input type="text" v-model="sex" readonly></p>
        <p><span>科室:</span><input type="text" v-model="doctorDepartment" readonly></p>
        <p><span>第一执业机构:</span><input type="text" v-model="hospital" readonly></p>
    </div>
    <div class="xian"></div>
    <div class="tiaoli">
        <h1>擅长调理</h1>
        <div><span v-for="(item,index) in list_adept" :key="index">{{item.medicineSubjectName}} <img src="../assets/img/delete.png" alt="" v-if="!ifBianji" @touchstart="deletaJb(index)"></span><span class="tianjia" v-if="!ifBianji" @touchstart="showList">+</span></div>
    </div>
    <div class="xian"></div>
    <div class="jianjie">
        <h1>医生简介</h1>
        <p v-if="ifBianji">{{remarks}}</p>
        <textarea name="" id="" v-model="remarks" v-if="!ifBianji"></textarea>
    </div>
    <div class="jbList" v-if="jbHide">
        <span class="quxiaoHide" @touchstart="hideList">取消</span>
        <div v-for="(item,index) in beGood" :key="index">
            <div class="section">
                <div class="section1">{{item.name}}</div>
                <div class="text_wrap7" v-for="(item,index) in item.list" :key="index" @touchstart="addBj(item)">{{item.beGoodName}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    doctorPreviewAllInformation,
    updatePortrait,
    beGoodList,
    doctorEditorGoodAtMedical,
    doctorEditorIntroduction
} from "api/doctor"
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import baseURI from 'api/env'
export default {
    name: "bianji",
    data() {
        return {
            token: '',
            doctorId: '',
            doctorName: '张医生',
            doctorImgUrl: '',
            ifBianji: true,
            doctorPhoto: require("../assets/img/head1.jpg"),
            sex: 1,
            list_adept: [],
            remarks: '',
            name: '',
            doctorLevel: '',
            doctorDepartment: '',
            hospital: '',
            token: '',
            imgDatas: [],
            photo1: '',
            beGood: [],
            jbHide: false,
            num1: 0,
            num2: 0
        }
    },
    created() {
        this.token = cookie.get('token');
        this.doctorId = cookie.get('doctorId');
        this.doctorPreviewAllInformation();
        this.beGoodList()
    },
    computed: {

    },

    methods: {
        back() {
            this.$router.go(-1)
        },
        hideList() {
            this.jbHide = false;
        },
        bianji() {
            this.ifBianji = false;
        },
        quxiaoBj() {
            this.ifBianji = true;
        },
        showList() {
            this.jbHide = true;
        },
        beGoodList() {
            let list = {
                token: this.token
            }
            beGoodList(list).then((res) => {
                this.beGood = res.data;
            })
        },
        addBj(item) {
            for (var i = 0; i < this.list_adept.length; i++) {
                if (item.beGoodName == this.list_adept[i].medicineSubjectName) {
                    this.$toast('此项已存在');
                    return false;
                }
            }
            if (this.list_adept.length >= 10) {
                this.$toast('最多只能添加10项');
                //this.list.pop();
                return false;
            }
            let arr = {
                medicineSubjectName: item.beGoodName,
                medicineSubjectId: item.beGoodId
            }
            this.list_adept.push(arr);
        },
        doctorPreviewAllInformation() {
            let list = {
                token: this.token,
                doctorId: this.doctorId
            }
            doctorPreviewAllInformation(list).then((res) => {
                this.list_adept = res.data.list_adept;
                this.name = res.data.name;
                this.remarks = res.data.remarks;
                this.sex = res.data.sex;
                if (this.sex == 1) {
                    this.sex = '男'
                } else {
                    this.sex = '女'
                }
                this.doctorDepartment = res.data.doctorDepartment;
                this.doctorLevel = res.data.doctorLevel;
                this.doctorPhoto = res.data.doctorPhoto;
                if (res.data.doctorPhoto == '') {
                    this.doctorPhoto = require("../assets/img/head1.jpg");
                }
                this.hospital = res.data.hospital;
            })
        },
        updatePortrait() {
            let list = {
                token: this.token,
                doctorId: this.doctorId,
                doctorPhoto: this.photo1
            }
            updatePortrait(list).then((res) => {
                if (res.type == true) {

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
                            that.doctorPhoto = e.target.result;
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
        doctorEditorIntroduction() {
            let list = {
                token: this.token,
                doctorId: this.doctorId,
                remarks: this.remarks
            }
            doctorEditorIntroduction(list).then((res) => {
                console.log(res)
                if (res.type == true) {
                    this.num1 = 1;
                }
            })
        },
        doctorEditorGoodAtMedical() {
            let arr = [];
            for (var i = 0; i < this.list_adept.length; i++) {
                arr.push({
                    medicineSubjectId: this.list_adept[i].medicineSubjectId
                });
            }
            let list = {
                token: this.token,
                doctorId: this.doctorId,
                json: JSON.stringify(arr)
            }
            doctorEditorGoodAtMedical(list).then((res) => {
                if (res.type == true) {
                    this.num2 = 1;
                }
            })
        },
        querenXiu() {
            this.doctorEditorIntroduction();
            this.updatePortrait();
            this.doctorEditorGoodAtMedical();
            if (this.num1 == 1 || this.num2 == 1) {
                this.$toast('保存成功');
                this.doctorPreviewAllInformation();
                this.ifBianji = true;
            }
        },
        deletaJb(index) {
            this.list_adept.splice(index, 1);
        },

    },
    components: {

    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.head {
    width: 100%;
    height: 240px;
    position: relative;
    padding-top: 40px;

    p {
        width: 100%;
        text-align: center;
        font-size: 25px;
        padding-top: 20px;
        color: #00afc2;
    }

    .uploadPic {
        width: 175px;
        height: 175px;
        margin: 0 auto;
        position: relative;

        input {
            position: absolute;
            left: 0;
            top: 0;
            width: 175px;
            height: 175px;
            border-radius: 50%;
            opacity: 0;
        }
    }

    .uploadPic img {
        width: 175px;
        height: 175px;
        border-radius: 50%;
    }

    span {
        color: #42cac6;
        font-size: 25px;
        position: absolute;
        top: 35px;
    }

    .back {
        left: 50px;
    }

    .bianji {
        right: 50px;

        img {
            width: 30px;
            height: 29px;
            vertical-align: middle;
        }
    }
}

.xian {
    width: 100%;
    height: 10px;
    background: #efefef;
    clear: both;
}

.info {
    widows: 100%;
    height: 268px;
    background: #fff;

    p {
        width: 682px;
        height: 77px;
        //border-bottom:1px solid #f5f5f5;
        color: #828282;
        font-size: 24px;
        line-height: 77px;
        margin: 0 auto;
        padding: 0 10px;
        clear: both;

        input {
            float: right;
            width: 200px;
            height: 75px;
            line-height: 75px;
            color: #828282;
            font-size: 24px;
            text-align: right;
        }
    }
}

.tiaoli {
    width: 693px;
    height: 250px;
    margin: 0 auto;
    border-bottom: 1px solid #ececec;

    h1 {
        font-size: 25px;
        padding: 30px 0 25px 13px;
        color: #7C7C7C;
    }

    div {
        color: #fff;
        font-size: 25px;

        span {
            float: left;
            margin-right: 10px;
            padding: 8px 15px;
            background: #00afc2;
            border-radius: 30px;
            margin-bottom: 10px;

            img {
                width: 30px;
                height: 30px;
            }
        }

        span.tianjia {
            width: 130px;
            text-align: center;
            font-size: 36px;
            line-height: 25px;
            color: #00afc2;
            background: none;
            border: 1px solid #00afc2;
        }
    }
}

.jianjie {
    width: 693px;
    //height:196px;
    padding-bottom: 20px;
    margin: 0 auto;

    //border-bottom:1px solid #ececec;
    h1 {
        font-size: 25px;
        padding: 30px 0 25px 13px;
        color: #7C7C7C;
    }

    p {
        font-size: 24px;
        color: #B4B4B4;
        line-height: 37px;
        padding: 0 10px;
        border: 1px solid #ececec;
        padding: 20px 10px;
    }

    textarea {
        width: 650px;
        padding: 20px;
        height: 200px;
        resize: none;
        color: #B4B4B4;
        font-size: 25px;
        border: 1px solid #ececec;
    }
}

.jbList {
    width: 100%;
    height: 400px;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    overflow-y: scroll;
}

.quxiaoHide {
    position: fixed;
    right: 30px;
    bottom: 350px;
    color: #00afc2;
    font-size: 27px;
}

.section {
    padding: 20px;
}

.section1 {
    font-size: .28rem;
    color: #a9a8b1;
    line-height: .70rem;
}

.text_wrap7 {
    padding: 0.1rem .25rem;
    box-sizing: border-box;
    border: 1px solid #d0d1d0;
    font-size: .28rem;
    color: #828282;
    text-align: center;
    border-radius: .30rem;
    display: inline-block;
    position: relative;
    margin-bottom: .25rem;
    margin-right: .20rem;
}

input,
textarea {
    outline: none;
}
</style>
