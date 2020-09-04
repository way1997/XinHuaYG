<template>
<div class="addMoban">
    <div class="name">
        <span>药方名称:</span>
        <input type="text" placeholder="在此输入药方名称" v-model='modelName'>
    </div>
    <div class="yaofang">
        <span>药方详情:</span>
        <div class="list">
            <p v-for="(item,index) in arr" :key="index"><label>{{item.medicineName}} </label>
                <input type="number" v-model='item.howWeight' readonly @input="lengthNum(index)" class="num1" @touchstart="hideYaocai(index)"><em>g</em>
                <img class='guangbiao1' src='../assets/img/gb.gif' v-if="shuzi==index&&jianpanS">
                <img src="../assets/img/delete.png" alt="" @touchstart="deleteYao(index)">
            </p>
            <div class="addMoban" @touchstart="showList">添加</div>
        </div>
    </div>

    <div class="nextStep">
        <div @touchstart="quxiao">取消</div>
        <div @touchstart="saveModel">完成添加</div>
    </div>

    <div class="yaocaiList" v-show="medicinalWraphid">
        <div class="yaocaiselecet">
            <div class="yaocaiselecets" style="white-space: nowrap;">
                <div class="gundong_box">
                    <div class="medicinalWrap" v-for="(item,index) in yaocaiList" :key="index" @touchstart="addYaocai(item)">
                        <div>{{item.drugName}}</div>
                        <div style="font-size:0.24rem;line-height:0.13rem">￥{{item.price}}</div>
                    </div>
                    <div v-if="yaocaiListkong" style="color:#828282;padding-left:20px;line-height:50px;">未查询到药材</div>
                </div>
            </div>
        </div>
        <div class="inputWrap">
            <input :type="typeInput" ref="yaocai" readonly @input="selcettext" @touchstart="inputclick" v-model="valuess" placeholder="请输入药材简称" style="overflow:visible;position:relative;">
            <img class='guangbiao1' src='../assets/img/gb.gif' v-if="gbxs1">
            <span @touchstart="hideYao">取消</span>
        </div>

        <!--键盘-->
        <div class='keyboard' :style='{display:k1}'>
            <div class='left number'>
                <div data-key="1" hover-class='active' hover-stay-time='100' @touchstart='sz1("1")'>1</div>
                <div data-key="2" hover-class='active' hover-stay-time='100' @touchstart='sz2("2")'>2</div>
                <div data-key="3" hover-class='active' hover-stay-time='100' @touchstart='sz3("3")'>3</div>
                <div data-key="4" hover-class='active' hover-stay-time='100' @touchstart='sz4("4")'>4</div>
                <div data-key="5" hover-class='active' hover-stay-time='100' @touchstart='sz5("5")'>5</div>
                <div data-key="6" hover-class='active' hover-stay-time='100' @touchstart='sz6("6")'>6</div>
                <div data-key="7" hover-class='active' hover-stay-time='100' @touchstart='sz7("7")'>7</div>
                <div data-key="8" hover-class='active' hover-stay-time='100' @touchstart='sz8("8")'>8</div>
                <div data-key="9" hover-class='active' hover-stay-time='100' @touchstart='sz9("9")'>9</div>
                <div data-key="X" hover-class='active' hover-stay-time='100' @touchstart='sz10'><img src='../assets/img/sqjp.png' style='width:25px;height:25px;margin-top:12px;'></div>
                <div data-key="0" hover-class='active' hover-stay-time='100' @touchstart='sz0("0")'>0</div>
                <div data-key="." hover-class='active' hover-stay-time='100' @touchstart='sz(".")'>.</div>
            </div>
            <div class='right ctr-btn'>
                <div class='ctr-btn-item' hover-class='active' hover-stay-time='100' @touchstart='clear'><img src='../assets/img/hs.png' style='width:25px;height:25px;margin-top:35px;'></div>
                <div class='ctr-btn-item' hover-class='active' hover-stay-time='100' @touchstart='comfromclick'>确认</div>
            </div>
        </div>

        <div class='keyboard02' :style='{display:k2}'>
            <div class='left02 number'>
                <div class='hang'>
                    <div data-key="q" hover-class='active' hover-stay-time='100' @touchstart='qq("q")'>Q</div>
                    <div data-key="w" hover-class='active' hover-stay-time='100' @touchstart='ww("w")'>W</div>
                    <div data-key="e" hover-class='active' hover-stay-time='100' @touchstart='ee("e")'>E</div>
                    <div data-key="r" hover-class='active' hover-stay-time='100' @touchstart='rr("r")'>R</div>
                    <div data-key="t" hover-class='active' hover-stay-time='100' @touchstart='tt("t")'>T</div>
                    <div data-key="y" hover-class='active' hover-stay-time='100' @touchstart='yy("y")'>Y</div>
                    <div data-key="u" hover-class='active' hover-stay-time='100' @touchstart='uu("u")'>U</div>
                    <div data-key="i" hover-class='active' hover-stay-time='100' @touchstart='ii("i")'>I</div>
                    <div data-key="o" hover-class='active' hover-stay-time='100' @touchstart='oo("o")'>O</div>
                    <div data-key="p" hover-class='active' hover-stay-time='100' @touchstart='pp("p")'>P</div>
                </div>
                <div class='hang' style='margin:5px 0 5px 5%;'>
                    <div data-key="a" hover-class='active' hover-stay-time='100' @touchstart='aa("a")'>A</div>
                    <div data-key="s" hover-class='active' hover-stay-time='100' @touchstart='ss("s")'>S</div>
                    <div data-key="d" hover-class='active' hover-stay-time='100' @touchstart='dd("d")'>D</div>
                    <div data-key="f" hover-class='active' hover-stay-time='100' @touchstart='ff("f")'>F</div>
                    <div data-key="g" hover-class='active' hover-stay-time='100' @touchstart='gg("g")'>G</div>
                    <div data-key="h" hover-class='active' hover-stay-time='100' @touchstart='hh("h")'>H</div>
                    <div data-key="j" hover-class='active' hover-stay-time='100' @touchstart='jj("j")'>J</div>
                    <div data-key="k" hover-class='active' hover-stay-time='100' @touchstart='kk("k")'>K</div>
                    <div data-key="l" hover-class='active' hover-stay-time='100' @touchstart='ll("l")'>L</div>
                </div>
                <div class='hang'>
                    <div data-key="sqjp" hover-class='active' hover-stay-time='100' @touchstart='k2xsclick' style='width:55px'><img src='../assets/img/sqjp.png' style='width:25px;height:25px;margin-top:12px;'></div>
                    <div data-key="z" hover-class='active' hover-stay-time='100' @touchstart='zz("z")'>Z</div>
                    <div data-key="x" hover-class='active' hover-stay-time='100' @touchstart='xx("x")'>X</div>
                    <div data-key="c" hover-class='active' hover-stay-time='100' @touchstart='cc("c")'>C</div>
                    <div data-key="v" hover-class='active' hover-stay-time='100' @touchstart='vv("v")'>V</div>
                    <div data-key="b" hover-class='active' hover-stay-time='100' @touchstart='bb("b")'>B</div>
                    <div data-key="n" hover-class='active' hover-stay-time='100' @touchstart='nn("n")'>N</div>
                    <div data-key="m" hover-class='active' hover-stay-time='100' @touchstart='mm("m")'>M</div>
                    <div data-key="hs" hover-class='active' hover-stay-time='100' @touchstart='delkey' style='width:50px'><img src='../assets/img/hs.png' style='width:25px;height:25px;margin-top:11px;'></div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    saveModel,
    lookModel,
    doctorSelAllDrug
} from 'api/doctor'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import $ from "jquery"
export default {
    name: "addMoban",
    data() {
        return {
            yaoNum: '',
            token: '',
            doctorId: '',
            modelId: '',
            modelName: '',
            arr: [],
            medicinalWraphid: false,
            yaocaiList: [],
            typeInput: 'url',
            valuess: '',
            modelType: 1,
            shapeId: '',
            brandId: '',
            type: 1,
            k1: 'none',
            k2: 'block',
            gbxs1: false,
            yaocaiListkong: false,
            shuzi: 0,
            jianpanS: true
        }
    },
    created() {
        this.token = cookie.get("token");
        this.doctorId = cookie.get("doctorId");
        this.shapeId = this.$route.query.shapeId
        this.brandId = this.$route.query.brandId
        if (this.$route.query.modelId) {
            this.modelId = this.$route.query.modelId
            this.lookModel();
        }

    },
    computed: {

    },

    methods: {
        showList() {
            this.medicinalWraphid = true
            this.yaocaiList = []
            this.valuess = ''
        },
        lengthNum(index) {
            if (this.arr[index].howWeight.length > 2) {
                this.$toast("最高只能输入99")
                this.arr[index].howWeight = this.arr[index].howWeight.substring(-1, 2);
            }
        },
        hideYaocai(index) {
            this.shuzi = index;
            this.jianpanS = true;
            this.k1 = 'block'
            this.k2 = 'none'
            //console.log(index)
        },
        lookModel() {
            let list = {
                token: this.token,
                modelId: this.modelId
            }
            lookModel(list).then((res) => {
                if (res.type == true) {
                    this.arr = res.date.list;
                    this.modelName = res.date.modelName;

                } else {
                    this.$toast(res.massage);
                }
            })
        },
        saveModel() {
            if (this.test()) {
                let list = {
                    doctorId: this.doctorId,
                    token: this.token,
                    modelId: this.modelId,
                    modelName: this.modelName,
                    preType: this.type,
                    json: JSON.stringify(this.arr),
                    shapeId: this.shapeId,
                    modelType: 1,
                    brandId: this.brandId
                }
                saveModel(list).then((res) => {
                    if (res.type == true) {
                        this.$toast('保存成功');
                        this.$router.push({
                            path: '/mobanList',
                            query: {
                                brandId: this.brandId,
                                shapeId: this.shapeId,
                                type: this.type
                            }
                        })
                    } else {
                        this.$toast(res.massage);
                    }
                })
            }
        },
        test() {
            if (this.modelName == '') {
                this.$toast('模版名不能为空');
                return false;
            } else if (this.arr.length == 0) {
                this.$toast('药材不能为空');
                return false;
            } else {
                return true;
            }
        },
        inputclick() {
            this.medicinalWraphid = true;
            this.gbxs1 = true;
        },
        hideYao() {
            this.medicinalWraphid = false;
        },
        selcettext() {
            this.typeInput = 'text';
            if (this.valuess != '') {
                let list = {
                    type: this.modelType,
                    data: this.valuess,
                    doctorId: this.doctorId,
                    shapId: this.shapeId,
                    brandId: this.brandId
                }

                doctorSelAllDrug(list).then((res) => {
                    this.gbxs1 = false;
                    if (res.type == true) {
                        if (res.list.length == 0) {
                            this.yaocaiList = []
                            this.yaocaiListkong = true;
                        } else {
                            this.yaocaiList = res.list;
                            this.medicinalWraphid = true;
                            this.yaocaiListkong = false;
                        }
                    } else if (res.type == false) {
                        this.$toast(res.massage)
                        this.medicinalWraphid = false;
                    }
                })
            } else {
                //this.medicinalWraphid = false;
            }
        },
        addYaocai(data) {
            for (var i = 0; i < this.arr.length; i++) {
                if (data.drugName == this.arr[i].medicineName) {
                    this.$toast('此项已存在，不能再次添加');
                    return false;
                } else if (this.arr[i].howWeight == '') {
                    this.$toast('您有药材未输入数量');
                    return false;
                }
            }
            let listArr = {
                medicineName: data.drugName,
                medicineId: data.drugid,
                drugUnit: data.drugUnit,
                price: data.price,
                howWeight: '',
                drugType: data.drugType
            }
            this.arr.push(listArr);
            this.shuzi = this.arr.length - 1;
            this.jianpanS = true;
            this.k2xsclick()
            this.valuess = '';
            this.yaocaiList = [];
            // // this.k2 = 'none'
            // // this.k1 = 'block'
            // this.$nextTick(function(){
            //     this.k2xsclick()
            //   //$('.num1').eq(this.arr.length-1).focus();
            //   //console.log($('.num1').eq(this.arr.length-1).onfocus)
            // },200)
        },
        deleteYao(index) {
            this.arr.splice(index, 1);
        },
        quxiao() {
            this.$router.go(-1)
        },
        clear() {
            let index = this.arr[this.shuzi].howWeight.length;
            this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substr(0, index - 1)
        },
        comfromclick() {
            this.k2 = 'block'
            this.k1 = 'none'
        },
        k2xsclick() {
            this.k2 = 'none'
            this.k1 = 'block'
            //$('.num1').eq(this.arr.length-1).focus();
        },
        delkey() {
            let index = this.valuess.length
            this.valuess = this.valuess.substr(0, index - 1)
            if (index == 1) {
                this.yaocaiList = []
            }
            //console.log(index)
            this.selcettext()
        },
        sz(num) {

        },
        sz0(num) {
            this.jianpanS = false;
            if (this.arr[this.shuzi].howWeight.length > 2) {
                this.$toast("最高只能输入99")
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
            } else {
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
            }
        },
        sz1(num) {
            this.jianpanS = false;
            //console.log(this.arr[this.shuzi].howWeight.length)
            if (this.arr[this.shuzi].howWeight.length > 2) {
                this.$toast("最高只能输入99")
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
            } else {
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
            }
        },
        sz2(num) {
            this.jianpanS = false;
            if (this.arr[this.shuzi].howWeight.length > 2) {
                this.$toast("最高只能输入99")
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
            } else {
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
            }
        },
        sz3(num) {
            this.jianpanS = false;
            if (this.arr[this.shuzi].howWeight.length > 2) {
                this.$toast("最高只能输入99")
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
            } else {
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
            }
        },
        sz4(num) {
            this.jianpanS = false;
            if (this.arr[this.shuzi].howWeight.length > 2) {
                this.$toast("最高只能输入99")
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
            } else {
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
            }
        },
        sz5(num) {
            this.jianpanS = false;
            if (this.arr[this.shuzi].howWeight.length > 2) {
                this.$toast("最高只能输入99")
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
            } else {
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
            }
        },
        sz6(num) {
            this.jianpanS = false;
            if (this.arr[this.shuzi].howWeight.length > 2) {
                this.$toast("最高只能输入99")
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
            } else {
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
            }
        },
        sz7(num) {
            this.jianpanS = false;
            if (this.arr[this.shuzi].howWeight.length > 2) {
                this.$toast("最高只能输入99")
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
            } else {
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
            }
        },
        sz8(num) {
            this.jianpanS = false;
            if (this.arr[this.shuzi].howWeight.length > 2) {
                this.$toast("最高只能输入99")
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
            } else {
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
            }
        },
        sz9(num) {
            this.jianpanS = false;
            if (this.arr[this.shuzi].howWeight.length > 2) {
                this.$toast("最高只能输入99")
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
            } else {
                this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
            }
        },
        sz10() {
            this.k2 = 'block'
            this.k1 = 'none'
        },
        qq(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        ww(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        ee(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        rr(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        tt(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        yy(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        uu(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        ii(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        oo(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        pp(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        aa(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        ss(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        dd(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        ff(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        gg(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        hh(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        jj(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        kk(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        ll(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        zz(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        xx(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        cc(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        vv(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        bb(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        nn(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
        mm(text) {
            this.valuess = this.valuess + text;
            this.selcettext();
        },
    },
    components: {

    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.name {
    padding: 60px 48px 0 40px;

    span {
        font-size: 24px;
        color: #727272;
    }

    input {
        width: 486px;
        height: 75px;
        padding-left: 33px;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 38px;
        font-size: 24px;
        color: #828282;
    }

    input::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size: 25px;
    }
}

.yaofang {
    width: 688px;
    border: none;
    margin: 40px auto;

    >span {
        font-size: 24px;
        color: #828282;
        float: left;
        padding-left: 10px;
    }

    div.list {
        margin-top: -10px;
        font-size: 25px;
        padding-left: 30px;
        padding-bottom: 700px;
    }

    div {
        float: left;
        border: none;

        p {
            width: 524px;
            height: 55px;
            background: #42cac6;
            border-radius: 55px;
            line-height: 55px;
            margin-top: 10px;
            margin-bottom: 10px;
            position: relative;

            label {
                color: #fff;
                padding-left: 42px;
                float: left;
                width: 280px;
                overflow: hidden;
            }

            input {
                width: 100px;
                height: 40px;
                background: #fff;
                border-radius: 10px;
                //margin-left:170px;
                margin-right: 10px;
                text-align: center;
                background: #fff;
            }

            em {
                color: #fff;
                font-size: 24px;
            }

            img {
                width: 34px;
                height: 34px;
                float: right;
                margin-top: 10px;
                margin-right: 10px;
            }

            .guangbiao1 {
                width: 1px;
                height: 20px;
                position: absolute;
                left: 72%;
                top: 10px;
            }
        }
    }

    .addMoban {
        width: 519px;
        height: 55px;
        border: 1px solid #42cac6;
        font-size: 27px;
        color: #42cac6;
        text-align: center;
        line-height: 55px;
        border-radius: 55px;
        margin-top: 20px;
        float: right;
        padding: 0;
    }
}

.nextStep {
    width: 100%;
    height: 91px;
    position: fixed;
    bottom: 0;
    left: 0;

    div {
        width: 374px;
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

div.yaocaiList {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 600px;
    background: #fff;
    z-index: 9999;
}

div.yaocaiselecet {
    width: 100%;
    font-size: .30rem;
    color: #222;
    height: 1.15rem;
    background: #fff;
    overflow: hidden;
}

.medicinalWrap:active {
    background-color: rgba(0, 0, 0, 0.1)
}

div.yaocaiselecets {
    height: 100%;
    width: 2500%;
    overflow: auto;
}

.inputWrap {
    width: 100%;
    height: .75rem;
    background: #fff;
    z-index: 11;
    float: left;
    border-bottom: 1px solid #e2e2e2;
    position: relative;

    img {
        width: 1px;
        height: 25px;
        float: left;
    }
}

.inputWrap input {
    width: 80%;
    height: .75rem;
    padding: .10rem .23rem;
    box-sizing: border-box;
    font-size: .30rem;
    color: #222;
    float: left;
    background: none;
}

.inputWrap span {
    font-size: 25px;
    color: #fff;
    float: right;
    width: 120px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-radius: 10px;
    background: #42cac6;
    margin-right: 10px;
    margin-top: 10px;
}

div.medicinalWrap {
    line-height: .60rem;
    float: left;
    width: auto;
    height: auto;
    text-align: center;
    padding: 0 .23rem;
    margin-top: .12rem;
}

div.gundong_box {
    width: 2500%;
    height: 100%;
    overflow: hidden;
}

//键盘
.keyboard {
    overflow: hidden;
    width: 100%;
}

.keyboard02 {
    overflow: hidden;
    width: 100%;
}

.left {
    width: 75%;
    float: left;
    background-color: white;
    box-sizing: border-box;
    text-align: center;
    line-height: 100px;
}

.right {
    width: 25%;
    float: left;
    background-color: white;
}

.left div {
    float: left;
    width: calc(100% / 3);
    box-sizing: border-box;
    height: 100px;
    border: 1px solid #eeeeee;
    font-size: 30px;
}

.right div {
    background-color: white;
    height: 200px;
    text-align: center;
    line-height: 200px;
    box-sizing: border-box;
    border: 1px solid #eeeeee;
    font-size: 32px;
}

.left02 {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.03);
    box-sizing: border-box;
    text-align: center;
    overflow: hidden;
    padding: 5px;
}

.hang {
    float: left;
    width: 100%;
}

.hang div {
    height: 100px;
    width: calc(100% / 10);
    box-sizing: border-box;
    border: 2px solid #eeeeee;
    line-height: 100px;
    background-color: white;
    border-radius: 16px;
    float: left;
    font-size: 30px;
}

.shuru_box {
    position: fixed;
    overflow: hidden;
    bottom: 7%;
    width: 100%;
    background: white;
    z-index: 12;
    left: 0;
    padding-bottom: 30px;
}

.guangbiao1 {
    position: absolute;
    width: 1px;
    top: 0;
    margin-top: 18px;
    margin-left: -6px;
    height: 30px;
    left: 20px;
    top: 8px;
}

.guangbiao2 {
    position: absolute;
    width: 1px;
    top: 0;
    margin-top: 6px;
    margin-left: -2px;
    height: 20px;
}

.left div:active {
    background: rgba(0, 0, 0, 0.1);
}

.right div:active {
    background: rgba(0, 0, 0, 0.1);
}

.hang div:active {
    background: rgba(0, 0, 0, 0.1);
}

.show_box {
    width: 100%;
    clear: both;
    overflow: hidden;
    position: relative;
}

.top_box {
    width: 100%;
    overflow: hidden;
}

::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}
</style>
