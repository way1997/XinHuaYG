<template>
<div class="jiuzhen">
    <div class="backHome" @touchstart="goBack">返回上一级</div>
    <div class="xian"></div>
    <div class="list">
        <div v-for="(item,index) in danganChengyuan" :key="index">
            <p>姓名：{{item.archivesName}}</p>
            <p>性别：<em v-if="item.gender==1">男</em><em v-if="item.gender==2">女</em></p>
            <p>年龄：{{item.age}}</p>
            <p>出生日期：{{item.birth}}</p>
            <span @touchstart="xiugaiXinxi(item)">修改</span><span @touchstart="deleteBTn(item.id)">删除</span>
        </div>
    </div>
    <div class="xiugaimima" v-show="xiugai">
        <div class="xiugai">
            <div class="headXiu">新增就诊人</div>
            <div class="mima">
                <span>姓名</span><input type="text" placeholder="输入姓名" v-model="name">
            </div>
            <div class="mima">
                <span>性别</span>
                <div @touchstart="showSex">{{sex}}</div>
                <p v-show="ifsex"><em @touchstart="chooseSex(1,'男')">男</em><em @touchstart="chooseSex(2,'女')">女</em></p>
            </div>
            <div class="mima">
                <span>年龄</span><input type="text" placeholder="输入年龄" v-model="age">
            </div>
            <div class="mima">
                <span>出生日期</span>
                <div @touchstart="showDate">{{date}}</div>
            </div>
            <button @touchstart="quxiao">取消</button>
            <button @touchstart="insertArchives">{{queren}}</button>
        </div>
    </div>
    <div class="addxin" @touchstart="addxin">
        新增就诊人
    </div>
    <div class="dateTime" v-show="pickerVisible">
        <mt-datetime-picker type="date" v-model="pickerValue" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :startDate="startDate" @cancel="hideDate" @confirm="handleConfirm" style="display:block;">
        </mt-datetime-picker>
    </div>
    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp">
    <img class="zanwuxinxi" v-show="danganChengyuan.length == 0" src='../assets/img/zanwuxinxi.png' />
    <confirm :text="tipText" ref="confirm" @cancel="cancel" @confirm="confirm"></confirm>
</div>
</template>

<script>
import {
    selectByIdArchives,
    deleteArchives,
    insertArchives,
    selectById
} from 'api/patient'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import confirm from 'base/confirm/confirm'
import {
    Picker,
    DatetimePicker
} from 'mint-ui'
export default {
    name: "jiuzhen",
    data() {
        return {
            xiugai: false,
            ifsex: false,
            name: '',
            sex: '请选择性别',
            age: '',
            date: '请选择日期',
            pickerVisible: false,
            startDate: new Date('1968-01-01'),
            pickerValue: '',
            danganChengyuan: '',
            token: '',
            patientId: '',
            tipText: '确定要删除吗？',
            jiuzhenId: '',
            guanxi: '自己',
            queren: '确认添加',
            loadUp: true
        }
    },
    created() {
        this.token = cookie.get("token");
        this.patientId = cookie.get("patientId");
        this.selectByIdArchives();
    },
    computed: {

    },

    methods: {
        insertArchives() {
            if (this.test()) {
                if (this.sex == '男') {
                    this.sex = 1
                } else {
                    this.sex = 2
                }
                let list = {
                    token: this.token,
                    patientId: this.patientId,
                    id: this.jiuzhenId,
                    relationship: this.guanxi,
                    archivesName: this.name,
                    gender: this.sex,
                    age: this.age,
                    birthDate: this.date,
                }
                insertArchives(list).then((res) => {
                    if (res.type == true) {
                        if (this.jiuzhenId != '') {
                            this.$toast('修改成功')
                            this.$router.go(-1);
                        } else {
                            this.$toast('添加成功')
                            this.$router.go(-1);
                        }

                    } else {
                        this.$toast(res.massage)
                    }
                })
            }
        },
        selectByIdArchives() {
            let list = {
                token: this.token,
                patientId: this.patientId
            }
            selectByIdArchives(list).then((res) => {
                this.danganChengyuan = res.archives;
                this.loadUp = false;
            })
        },
        cancel() {
            this.$refs.confirm.hide();
        },
        deleteBTn(id) {
            this.jiuzhenId = id;
            this.$refs.confirm.show();
        },
        confirm() {
            let list = {
                token: this.token,
                id: this.jiuzhenId
            }
            deleteArchives(list).then((res) => {
                if (res.type == true) {
                    this.$toast('删除成功')
                    this.$refs.confirm.hide();
                    this.selectByIdArchives();
                } else {
                    this.$refs.confirm.hide();
                    this.$toast(res.massage)
                }
            })
        },
        showSex() {
            this.ifsex = !this.ifsex;
        },
        chooseSex(index, text) {
            this.sex = text;
            this.ifsex = false;
        },
        xiugaiXinxi(item) {
            this.queren = '确认修改'
            this.xiugai = true;
            this.jiuzhenId = item.id;
            this.selectById();
        },
        selectById() {
            let list = {
                token: this.token,
                id: this.jiuzhenId
            }
            selectById(list).then((res) => {
                this.name = res.archives.archivesName
                if (res.archives.gender == 1) {
                    this.sex = '男'
                } else {
                    this.sex = '女'
                }
                this.age = res.archives.age
                this.date = res.archives.birth
                if (this.date == '' || this.date == undefined) {
                    this.date = '选择日期';
                }
            })
        },
        addxin() {
            this.queren = '确认添加'
            this.xiugai = true;
            this.jiuzhenId = '';
        },
        quxiao() {
            this.xiugai = false;
        },
        showDate() {
            this.pickerVisible = true;
        },
        hideDate() {
            this.pickerVisible = false;
        },
        getdate(data) {
            var now = new Date(data),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " ";
        },
        handleConfirm(data) {
            this.date = this.getdate(data);
            this.pickerVisible = false;
        },
        goBack() {
            this.$router.push('/mine')
        },
        test() {
            if (this.name == '') {
                this.$toast('请输入姓名')
                return false;
            } else if (this.sex == '请选择性别') {
                this.$toast('请选择性别')
                return false;
            } else if (this.age == '') {
                this.$toast('请输入年龄')
                return false;
            } else if (this.date == '请选择日期') {
                this.$toast('请选择日期')
                return false;
            } else {
                return true;
            }
        }
    },
    components: {
        confirm
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.backHome {
    width: 611px;
    height: 76px;
    background: #00afc2;
    border-radius: 13px;
    text-align: center;
    line-height: 76px;
    color: #fff;
    font-size: 25px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
}

.xian {
    width: 100%;
    height: 10px;
    background: #efefef;
    clear: both;
}

.list {
    width: 700px;
    margin: 0 auto;

    >div {
        width: 100%;
        height: 190px;
        border-bottom: 1px solid #cecece;
        position: relative;

        p {
            font-size: 25px;
            color: #828282;
            line-height: 40px;
            padding-left: 20px;

            &:nth-of-type(1) {
                padding-top: 10px;
            }
        }

        span {
            position: absolute;
            right: 20px;
            font-size: 25px;
            color: #fff;
            background: #00afc2;
            width: 120px;
            height: 40px;
            border-radius: 10px;
            text-align: center;
            line-height: 40px;

            &:nth-of-type(1) {
                top: 30px;
            }

            &:nth-of-type(2) {
                bottom: 30px;
            }
        }
    }
}

.xiugaimima {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);

    .xiugai {
        width: 658px;
        height: 650px;
        background: rgba(255, 255, 255, 1);
        border-radius: 13px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .headXiu {
            width: 100%;
            height: 86px;
            border-bottom: 1px solid #a7a7a7;
            text-align: center;
            line-height: 86px;
            font-size: 25px;
            color: #878787;
        }

        .mima {
            height: 70px;
            line-height: 70px;
            font-size: 25px;
            color: #878787;
            padding-top: 30px;
            padding-left: 42px;
            position: relative;

            span {
                float: left;
                width: 111px;
            }

            input {
                width: 414px;
                height: 68px;
                border: 1px solid #c9c9c9;
                font-size: 25px;
                border-radius: 68px;
                padding-left: 20px;
                color: #878787;
                background: none;
                -webkit-appearance: none;
            }

            div {
                width: 414px;
                height: 68px;
                border: 1px solid #c9c9c9;
                font-size: 25px;
                border-radius: 68px;
                padding-left: 20px;
                color: #878787;
                float: left;
            }

            input::-webkit-input-placeholder {
                color: #c9c9c9;
                font-size: 25px;
            }

            input.yanZm {
                width: 260px;
            }

            p {
                position: absolute;
                top: 100px;
                right: 80px;
                width: 414px;
                height: 100px;
                border: 1px solid #00afc2;
                border-bottom: none;
                border-radius: 20px;
                background: #fff;
                z-index: 99;
            }

            em {
                font-size: 25px;
                color: #42cac6;
                float: right;
                width: 100%;
                line-height: 50px;
                border-bottom: 1px solid #00afc2;
                text-align: center;
                border-radius: 20px;
            }
        }

        button {
            width: 275px;
            height: 65px;
            background: rgba(84, 213, 210, 1);
            border-radius: 13px;
            color: #fff;
            font-size: 25px;
            border: none;
            margin-top: 40px;

            &:nth-of-type(1) {
                margin-left: 36px;
            }

            &:nth-of-type(2) {
                background: rgba(253, 126, 126, 1);
            }
        }
    }
}

.addxin {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: #00afc2;
    color: #fff;
    font-size: 30px;
    text-align: center;
    line-height: 100px;
}

.loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.zanwuxinxi {
    width: 3.30rem;
    height: 4.17rem;
    display: block;
    margin: 0 auto;
    margin-top: 100px;
}
</style>
