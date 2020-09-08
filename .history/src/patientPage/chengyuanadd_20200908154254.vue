<template>
<div class="addchengyuan">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian" style="clear:both;"></div>
    <form>
        <div class="tianjiaBox">

            <div class="tittleBigBox">
                <div class="jianhuTit">成员信息</div>
                <div class="jianhuTishi">*此项为必填项</div>
            </div>

            <!--<div class="tianjiaItem" style="border-top:1px solid #dbdbdb;">
                <div class="tianjiaTit">关　系</div>
                <div class="guanxiRightBox">
                    <div class="tianjiaInput" @click="showGuanxi">
                        {{guanxi}}
                    </div>
                    <img src="../assets/img/you.png" class="youjiantouImg">
                </div>
            </div>
            <div class="tianjiaItem">
                <div class="tianjiaTit">姓　名</div>
                <input class="tianjiaInput" name="peopleName" v-model="name" type="text" placeholder="请输入真实姓名">
            </div>
            <div class="tianjiaItem">
                <div class="tianjiaTit">性　别</div>
                <div class='choosesex'>
                    <div :class="(sexN==index+1 ? 'check':'')" v-for="(item,index) in sexs" :key="index" @click="sexChoose(index)">
                        {{item.sex}}
                    </div>
                </div>
            </div>
            <div class="tianjiaItem">
                <div class="tianjiaTit">年　龄</div>
                <input class="tianjiaInput" name="peopleAge" v-model="age" type="number" placeholder="请输入年龄">
            </div>
            <div class="tianjiaItem">
                <div class="tianjiaTit">出生日期</div>
                <div class="tianjiaInput" @click="showDate">
                    {{date}}
                </div>
            </div> -->

            <div class="jianhurenBox" v-show="jhrHidden">
                <!--  <div style="height:0.2rem;width:100%;background-color:#f9f9f9;"></div>
                <div class="tittleBigBox">
                    <div class="jianhuTit">身体状况</div>
                    <div class="jianhuTishi2">此项为非必填项</div>
                </div>

                <div class="xinxiBox" style="border-top:1px solid #dbdbdb;" v-show="tiaozhuanType0001 == 0?true:false" @click="goGai(1)">
                    <div class="xinxiTittle">慢性病</div>
                    <img src="../assets/img/you.png" class="youjiantou">
                </div>

                <div class="xinxiBox" v-show="tiaozhuanType0001 == 0?true:false" @click="goGai(2)">
                    <div class="xinxiTittle">既往病史</div>
                    <img src="../assets/img/you.png" class="youjiantou">
                </div>

                <div class="xinxiBox" v-show="tiaozhuanType0001 == 0?true:false" @click="goGai(3)">
                    <div class="xinxiTittle">家族病史</div>
                    <img src="../assets/img/you.png" class="youjiantou">
                </div>

                <div class="xinxiBox" v-show="tiaozhuanType0001 == 0?true:false" @click="goGai(4)">
                    <div class="xinxiTittle">过敏病史</div>
                    <img src="../assets/img/you.png" class="youjiantou">
                </div>

                <div style="height:10rpx;width:100%;background-color:#f9f9f9;" v-show="tiaozhuanType0001 == 0?true:false"></div>

                <div class="tianjiaItem">
                    <div class="tianjiaTit">身高(cm)</div>
                    <input style="margin-right:0.1rem" class="tianjiaInput" v-model="list2.height" type="number" name="tall" placeholder="请输入身高" @input="shenBim">
                </div>
                <div class="tianjiaItem">
                    <div class="tianjiaTit">体重(kg)</div>
                    <input style="margin-right:0.1rem" class="tianjiaInput" v-model="list2.weight" type="number" name="weight" placeholder="请输入体重" @input="tiBim">
                </div>
                <div class="tianjiaItem">
                    <div class="tianjiaTit">BMI(kg/㎡)</div>
                    <input style="margin-right:0.1rem" class="tianjiaInput" type="number" name="bmi" disabled="true" v-model="bMI" placeholder="BMI">
                </div>
                <div class="tianjiaItem">
                    <div class="tianjiaTit">腰围(cm)</div>
                    <input style="margin-right:0.1rem" class="tianjiaInput" v-model="list2.waist" name="yaowei" type="number" placeholder="请输入腰围">
                </div>

                <div style="height:0.1rem;width:100%;background-color:#f9f9f9;"></div>

                <div class="xinxiBox2">
                    <div class="xinxiTittle2">吸烟史</div>
                    <div class="radio-group2" name="xiyanshi">
                        <div v-for="(item,index) in xiyanshi" :key="index" @click="xiyan(item.value)">
                            <input type="radio" class="radio2" name="smoke" :value="item.value" :checked="item.value==list2.smoke?'true':''" />
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
                <div class="xinxiBox2">
                    <div class="xinxiTittle2">饮酒史</div>
                    <div class="radio-group2" name="yinjiushi">
                        <div v-for="(item,index) in yinjiushi" :key="index" @click="yinjiu(item.value)">
                            <input type="radio" class="radio2" name="wine" :value="item.value" :checked="item.value==list2.wine?'true':''" />
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>

                <div style="height:0.1rem;width:100%;background-color:#f9f9f9;"></div>

                <div class="xinxiBox2">
                    <div class="xinxiTittle2">肝功能</div>
                    <div class="radio-group2" name="gangongneng">
                        <div v-for="(item,index) in gangongneng" :key="index" @click="gangongn(item.value)">
                            <input type="radio" class="radio2" name="liver" :value="item.value" :checked="item.value==list2.liver?'true':''" />
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>

                <div class="xinxiBox2">
                    <div class="xinxiTittle2">肾功能</div>
                    <div class="radio-group2" name="shengongneng">
                        <div v-for="(item,index) in shengongneng" :key="index" @click="shengongn(item.value)">
                            <input type="radio" class="radio2" name="kidney" :value="item.value" :checked="item.value==list2.kidney?'true':''" />
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>

                <div class="xinxiBox2">
                    <div class="xinxiTittle2">婚姻状况</div>
                    <div class="radio-group2" name="hunyinzhuangkuang">
                        <div v-for="(item,index) in hunyinzhuangkuang" :key="index" @click="hunyin(item.value)">
                            <input type="radio" class="radio2" name="marriage" :value="item.value" :checked="item.value==list2.marriage?'true':''" />
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>

                <div class="xinxiBox2">
                    <div class="xinxiTittle2">生育状况</div>
                    <div class="radio-group2" name="shengyuzhuangkuang">
                        <div v-for="(item,index) in shengyuzhuangkuang" :key="index" @click="shengyu(item.value)">
                            <input type="radio" class="radio2" name="birth" :value="item.value" :checked="item.value==list2.birth?'true':''" />
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>-->
            </div>

            <div class="tianjiaBtn" :style="{backgroundColor:backcolor}" @click="insertArchives">保存</div>
        </div>
    </form>
    <div class="chooseren" v-show="chooseR">
        <mt-picker :slots="array" @change="onValuesChange"></mt-picker>
    </div>
    <div class="dateTime" v-show="pickerVisible">
        <mt-datetime-picker type="date" v-model="pickerValue" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :startDate="startDate" @cancel="hideDate" @confirm="handleConfirm" style="display:block;">
        </mt-datetime-picker>
    </div>
</div>
</template>

<script>
import {
    insertArchives,
    selectById
} from 'api/patient'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import {
    Picker,
    DatetimePicker
} from 'mint-ui'
export default {
    name: "addchengyuan",
    data() {
        return {
            pageName: '添加成员',
            token: '',
            patientId: '',
            name: '',
            age: '',
            jhrHidden: true,
            list2: '',
            height: '',
            bMI: '',
            backcolor: '',
            baocundisabled: '',
            myselfmyself: '',
            tiaozhuanType0001: 0,
            guanxi: '选择成员关系',
            array: [{
                values: ['选择成员关系', '自 己', '父 母', '子 女', '爱 人', '其 他']
            }],
            chooseR: false,
            index: 0,
            sexs: [{
                sex: '男'
            }, {
                sex: "女"
            }],
            date: '选择日期',
            pickerValue: "",
            pickerVisible: false,
            startDate: new Date('1968-01-01'),
            sexN: 0,
            xiyanshi: [{
                    value: '1',
                    name: '无'
                },
                {
                    value: '2',
                    name: '有'
                },
                {
                    value: '3',
                    name: '已戒烟'
                },
            ],
            yinjiushi: [{
                    value: '1',
                    name: '无'
                },
                {
                    value: '2',
                    name: '有'
                },
                {
                    value: '3',
                    name: '已戒酒'
                },
            ],
            gangongneng: [{
                    value: '1',
                    name: '正常'
                },
                {
                    value: '2',
                    name: '异常'
                },
            ],
            shengongneng: [{
                    value: '1',
                    name: '正常'
                },
                {
                    value: '2',
                    name: '异常'
                },
            ],
            hunyinzhuangkuang: [{
                    value: '1',
                    name: '未婚'
                },
                {
                    value: '2',
                    name: '已婚'
                },
                {
                    value: '3',
                    name: '其他'
                },
            ],
            shengyuzhuangkuang: [{
                    value: '1',
                    name: '未生育'
                },
                {
                    value: '2',
                    name: '备孕期'
                },
                {
                    value: '3',
                    name: '怀孕中'
                },
                {
                    value: '4',
                    name: '已生育'
                },
            ],
            height: '',
            weight: '', //体重
            xiyan1: '',
            yinjiu1: '',
            gangongn1: '',
            shengongn1: '',
            hunyin1: '',
            shengyu1: '',
            idCheng: '',
            chengyuanId: ''
        }
    },
    created() {
        this.token = cookie.get("token");
        this.patientId = cookie.get("patientId");
        if (this.$route.query.id) {
            this.idCheng = this.$route.query.id;
            this.tiaozhuanType0001 = 0;
            this.selectById();
            this.pageName = '完善成员信息';
        } else {
            this.pageName = '添加成员';
            this.tiaozhuanType0001 = 1;
        }
    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.push('/jiankangda')
        },
        insertArchives() {
            let list = {
                token: this.token,
                patientId: this.patientId,
                id: this.idCheng,
                relationship: this.guanxi,
                archivesName: this.name,
                gender: this.sexN,
                age: this.age,
                birthDate: this.date,
                height: this.list2.height,
                weight: this.list2.weight,
                bmi: this.bMI,
                waist: this.list2.waist,
                smoke: this.xiyan1,
                wine: this.yinjiu1,
                liver: this.gangongn1,
                kidney: this.shengongn1,
                marriage: this.hunyin1,
                birth: this.shengyu1,
            }
            insertArchives(list).then((res) => {
                if (res.type == true) {
                    if (this.$route.query.id) {
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
        },
        selectById() {
            let list = {
                token: this.token,
                id: this.idCheng
            }
            selectById(list).then((res) => {
                if (res.archives.relationship == 1) {
                    this.guanxi = '自己'
                } else {
                    this.guanxi = res.archives.relationship;
                }

                this.name = res.archives.archivesName
                this.sexN = res.archives.gender
                this.age = res.archives.age
                this.date = res.archives.birthDate
                this.chengyuanId = res.archives.id
                //console.log(this.date)
                if (this.date == '' || this.date == undefined) {
                    this.date = '选择日期';
                }
                this.bMI = res.archives.bmi
                this.list2 = res.archives
            })
        },
        xiyan(value) {
            this.xiyan1 = value;
        },
        yinjiu(value) {
            this.yinjiu1 = value;
        },
        gangongn(value) {
            this.gangongn1 = value;
        },
        shengongn(value) {
            this.shengongn1 = value;
        },
        hunyin(value) {
            this.hunyin1 = value;
        },
        shengyu(value) {
            this.shengyu1 = value;
        },
        showGuanxi() {
            this.chooseR = true;
        },
        goGai(num) {
            if (num == 1) {
                this.$router.push({
                    path: '/jibingAdd',
                    query: {
                        num: num,
                        id: this.chengyuanId
                    }
                })
            } else if (num == 2) {
                this.$router.push({
                    path: '/jiwangbingshi',
                    query: {
                        num: num,
                        id: this.chengyuanId
                    }
                })
            } else if (num == 3) {
                this.$router.push({
                    path: '/jiazubingshi',
                    query: {
                        num: num,
                        id: this.chengyuanId
                    }
                })
            } else if (num == 4) {
                this.$router.push({
                    path: '/guominshi',
                    query: {
                        num: num,
                        id: this.chengyuanId
                    }
                })
            }

        },
        onValuesChange(picker, values) {
            if (this.$route.query.ifMyself == true && this.guanxi != '自 己' && values == '自 己') {
                this.$toast('不能重复建立自己的健康档案');
                return false;
            }
            this.guanxi = values[0];
            this.chooseR = false;
        },
        handleConfirm(data) {
            this.date = this.getdate(data);
            this.pickerVisible = false;
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
        sexChoose(index) {
            this.sexN = index + 1;
        },
        shenBim() {
            if (this.list2.weight != '') {
                this.bMI = (this.list2.weight * 50 / this.list2.height).toFixed(2);
                //console.log(this.list2.weight , this.list2.weight)
            }
        },
        tiBim() {
            if (this.list2.height != '') {
                this.bMI = (this.list2.weight * 50 / this.list2.height).toFixed(2);
                //console.log(this.list2.weight,this.list2.weight)
            }
        }
    },
    components: {
        HeadTop,
        Picker,
        DatetimePicker
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.backHome {
    width: 81.46%;
    height: 0.76rem;
    background: #00afc2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    color: #fff;
    font-size: 0.25rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
}

.xian {
    width: 100%;
    height: .1rem;
    background: #efefef;
    clear: both;
}

input {
    background: none;
}

.chooseren {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.picker {
    width: 100%;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
}

.dateTime {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999999;
}

.tianjiaBox {
    width: calc(100% - 6rem);
    min-height: 3.00rem;
    background-color: #fff;
    border-radius: .16rem;
    box-shadow: .10rem .10rem .20rem #dbdbdb;
    margin: .30rem;
    margin-left: .18rem;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1.00rem;
}

.tittleBigBox {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;

}

.jianhuTishi {
    font-size: 25px;
    color: #ff5f5f;
    margin-right: .40rem;
}

.jianhuTishi2 {
    font-size: 25px;
    color: #828282;
    margin-right: .40rem;
}

.tianjiaItem {
    width: calc(100% - 8rem);
    min-height: .90rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    font-size: 25px;
    padding: 0 .40rem;
    border-bottom: 1px solid #f2f2f2;
}

.tianjiaTit {
    color: #828282;
    font-size: 25px;
}

.tianjiaInput {
    text-align: right;
    color: #828282;
    font-size: 25px;
}

.choosesex {
    width: 2.00rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
}

.guanxiRightBox {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-end;
}

.youjiantouImg {
    width: .40rem;
    height: .40rem;
    margin-left: .10rem;
}

.choosesex div {
    width: .60rem;
    height: .50rem;
    border-radius: .04rem;
    text-align: center;
    line-height: .50rem;
    border: 1px solid #00b0c2;
    color: #828282;
}

.choosesex div:nth-of-type(2) {
    margin-left: .40rem;
}

.choosesex .check {
    background: #00b0c2;
    color: #ffffff;
}

.picker {
    color: #666666;
}

.bigBox-item2 {
    width: 100%;
    min-height: .90rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    font-size: 25px;
    margin-top: .20rem;
}

.card-msg2 {
    text-align: left;
    background-color: #ececec;
    height: .80rem;
    padding-left: .20rem;
    border-radius: .8rem;
    width: 55%;
}

.yanzhengma {
    background-color: #00b0c2;
    height: .80rem;
    color: #fff;
    border-radius: .08rem;
    width: calc(45% - 5rem);
    text-align: center;
    line-height: .80rem;
}

.yanzhengma:active {
    background-color: #009eaf;
}

.jianhurenBox {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
}

.jianhuTit {
    font-size: .25rem;
    color: #828282;
    border-left: 3px solid #00b0c2;
    padding-left: .20rem;
    margin: .20rem .40rem .20rem .20rem;
}

.tianjiaBtn {
    width: calc(100% - 8rem);
    margin: .40rem;
    background-color: #00b0c2;
    height: .80rem;
    line-height: .80rem;
    text-align: center;
    color: #fff;
    border-radius: .08rem;
    font-size: .32rem;
    border: none;
}

.tianjiaBtn:active {
    background-color: #009eaf;
}

.xinxiBox2 {
    width: calc(100% - 8rem);
    min-height: .90rem;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #f2f2f2;
    padding: 0 .40rem;
}

.xinxiTittle2 {
    font-size: 25px;
    color: #828282;
    margin-top: .30rem;
}

/*单选*/
.radio .wx-radio-input {
    width: .30rem;
    height: .30rem;
    border-radius: 50%;
}

.radio {
    font-size: 25px;
    color: #828282;
    margin-left: .20rem;
}

.radio-group2 {
    margin-top: .20rem;
}

.radio-group2 span {
    font-size: 25px;
    color: #828282;
}

.radio-group2 div {
    float: left;
}

.radio2 {
    color: #666666;
    margin-left: .40rem;
    margin-bottom: .30rem;
    background: url('../assets/img/danxuang1.png') no-repeat 0 0;
}

.radio2:checked {
    color: #666666;
    margin-left: .40rem;
    margin-bottom: .30rem;
    background: url('../assets/img/danxuan.png') no-repeat 0 0;
}

/*多选*/
.checkbox {
    margin-bottom: .30rem;
}

.checkbox .wx-checkbox-input {
    width: .30rem;
    height: .30rem;
}

.checkbox {
    font-size: .30rem;
    color: #666666;
    margin-left: .40rem;
}

.checkbox-group {
    margin-top: .20rem;
}

.xinxiBox {
    width: calc(100% - 8rem);
    min-height: .90rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    padding: 0 .40rem;
}

.xinxiTittle {
    font-size: 25px;
    color: #828282;
}

.youjiantou {
    width: 30px;
    height: 30px;
    font-size: 25px;
    color: #828282;
}

input::-webkit-input-placeholder {
    color: #c9c9c9;
    font-size: 25px;
}
</style>
