<template>
<div class="xinxi">
    <HeadTop :title="pageName" :backBlack="true"></HeadTop>
    <!--pages1/jiankangdangan/chengyuanxinxi.wxml-->
    <div class="topXinxiBox">
        <div class="topLeftBox">
            <div class="name">{{chengyuanName}}<span style="font-size:0.26rem;">（{{chengyuanGuanxi == '自 己'?'自己':(chengyuanGuanxi == '父 母'?'父母':(chengyuanGuanxi == '子 女'?'子女':(chengyuanGuanxi == '爱 人'?'爱人':'其他')))}}）</span></div>
            <div class="sexBox">
                <div class="sex">{{chengyuanSex == 0?'男':'女'}}</div>
                <div class="age">{{chengyuanAge}}岁</div>
                <div class="shengri">{{chengyuanBirth}}</div>
            </div>
        </div>
        <div class="topRightBox" @touchstart="chakanxinxi">
            <div class="chakanTit">修改/完善资料</div>
            <img src="../assets/img/you2.png" class="youjiantou">
        </div>
    </div>

    <div class="xinxiBigBox">
        <div class="xinxiTittle">身体状况</div>
        <div class="xinxiItemBox" style="margin-top:0.2rem;border-top:1px dashed #999999;">
            <div class="xinxiItemTittle">身高</div>
            <div class="xinxiItemText">{{chengyuanTall}} cm</div>
        </div>
        <div class="xinxiItemBox">
            <div class="xinxiItemTittle">体重</div>
            <div class="xinxiItemText">{{chengyuanTizhong}} kg</div>
        </div>
        <div class="xinxiItemBox">
            <div class="xinxiItemTittle">BIM</div>
            <div class="xinxiItemText">{{chengyuanBim}} kg/㎡</div>
        </div>
        <div class="xinxiItemBox">
            <div class="xinxiItemTittle">腰围</div>
            <div class="xinxiItemText">{{chengyuanYaowei}} cm</div>
        </div>
        <div style="width:100%;height:0.1rem;background-color:#f2f2f2;"></div>
        <div class="xinxiBox2">
            <div class="xinxiTittle2">慢性病</div>
            <div class="xinxiTextBox">
                <div class="bingshiItem" v-for="(item,index) in manxingbing" :key="index">{{item.chronicName}}</div>
            </div>
        </div>
        <!-- <div class="xinxiBox2">
            <div class="xinxiTittle2">既往病史</div>
            <div class="xinxiTextBox">
                <div class="bingshiItem" v-for="(item,index) in jiwangbingshi" :key="index">{{item.sickType}}</div>
            </div>
        </div>
        <div class="xinxiBox2">
            <div class="xinxiTittle2">家族病史</div>
            <div class="xinxiTextBox">
                <div class="bingshiItem" v-for="(item,index) in jiazubingshi" :key="index">{{item.name}}</div>
            </div>
        </div>
        <div class="xinxiBox2">
            <div class="xinxiTittle2">过敏病史</div>
            <div class="xinxiTextBox">
                <div class="bingshiItem" v-for="(item,index) in guominbingshi" :key="index">{{item.allergicType}}</div>
            </div>
        </div>
        <div style="width:100%;height:0.1rem;background-color:#f2f2f2;"></div>
        <div class="xinxiItemBox">
            <div class="xinxiItemTittle">吸烟史</div>
            <div class="xinxiItemText">{{xiyanshi == 0?'待完善':(xiyanshi == 1?'无':(xiyanshi ==2?'有':'已戒烟'))}}</div>
        </div>
        <div class="xinxiItemBox">
            <div class="xinxiItemTittle">饮酒史</div>
            <div class="xinxiItemText">{{yinjiushi == 0?'待完善':(yinjiushi == 1?'无':(yinjiushi == 2?'有':'已戒酒'))}}</div>
        </div>
        <div class="xinxiItemBox">
            <div class="xinxiItemTittle">肝功能</div>
            <div class="xinxiItemText">{{gangongneng == 0?'待完善':(gangongneng == 1?'正常':'异常')}}</div>
        </div>
        <div class="xinxiItemBox">
            <div class="xinxiItemTittle">肾功能</div>
            <div class="xinxiItemText">{{shengongneng == 0?'待完善':(shengongneng == 1?'正常':'异常')}}</div>
        </div>
        <div class="xinxiItemBox">
            <div class="xinxiItemTittle">婚姻状况</div>
            <div class="xinxiItemText">{{hunyinzhuangkuang == 0?'待完善':(hunyinzhuangkuang == 1?'未婚':(hunyinzhuangkuang == 2?'已婚':'其他'))}}</div>
        </div>
        <div class="xinxiItemBox">
            <div class="xinxiItemTittle">生育状况</div>
            <div class="xinxiItemText">{{shengyuzhuangkuang == 0?'待完善':(shengyuzhuangkuang == 1?'未生育':(shengyuzhuangkuang == 2?'备孕期':(shengyuzhuangkuang == 3?'怀孕中':'已生育')))}}</div>
        </div> -->
        <div style="width:100%;height:0.8rem;background-color:#f2f2f2;"></div>
    </div>

</div>
</template>

<script>
import {
    selectById
} from 'api/patient'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "xinxi",
    data() {
        return {
            pageName: '成员信息',
            token: '',
            patientId: '',
            chengyuanName: '',
            chengyuanGuanxi: '',
            chengyuanSex: '',
            chengyuanAge: '',
            chengyuanBirth: '',
            chengyuanid001: '',
            array: [],
            chengyuanTall: '0',
            chengyuanTizhong: '0',
            chengyuanBim: '0',
            chengyuanYaowei: '0',
            manxingbing: '',
            jiwangbingshi: '',
            jiazubingshi: '',
            guominbingshi: '',
            xiyanshi: '0',
            yinjiushi: '0',
            gangongneng: '0',
            shengongneng: '0',
            hunyinzhuangkuang: '0',
            shengyuzhuangkuang: '0',
            id: ''
        }
    },
    created() {
        this.token = cookie.get("token");
        this.patientId = cookie.get("patientId");
        this.id = this.$route.query.id;
        this.selectById();
    },
    computed: {

    },

    methods: {
        selectById() {
            let list = {
                token: this.token,
                id: this.id
            }
            selectById(list).then((res) => {
                if (res.archives.height) {
                    this.chengyuanTall = res.archives.height;
                }
                if (res.archives.weight) {
                    this.chengyuanTizhong = res.archives.weight;
                }
                if (res.archives.bmi) {
                    this.chengyuanBim = res.archives.bmi;
                }
                if (res.archives.waist) {
                    this.chengyuanYaowei = res.archives.waist;
                }
                if (res.archives.smoke) {
                    this.xiyanshi = res.archives.smoke;
                }
                if (res.archives.wine) {
                    this.yinjiushi = res.archives.wine;
                }
                if (res.archives.liver) {
                    this.gangongneng = res.archives.liver;
                }
                if (res.archives.kidney) {
                    this.shengongneng = res.archives.kidney;
                }
                if (res.archives.marriage) {
                    this.hunyinzhuangkuang = res.archives.marriage;
                }
                if (res.archives.birth) {
                    this.shengyuzhuangkuang = res.archives.birth;
                }

                this.chengyuanName = res.archives.archivesName;
                this.chengyuanGuanxi = res.archives.relationship;
                this.chengyuanSex = res.archives.gender;
                this.chengyuanAge = res.archives.age;
                this.chengyuanBirth = res.archives.birthDate;
                this.manxingbing = res.chronicDiseases;
                this.jiwangbingshi = res.patientSicks;
                this.jiazubingshi = res.archivesAttributes;
                this.guominbingshi = res.patientAllergics;

            })
        },
        chakanxinxi() {
            this.$router.push({
                path: '/chengyuanadd',
                query: {
                    id: this.id,
                    ifMyself: this.$route.query.ifMyself
                }
            })
        }
    },
    components: {
        HeadTop
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.xinxi {
    height: 100%;
    width: 100%;
    background: #ffffff;
    position: relative;
}

/*成员信息*/
.topXinxiBox {
    width: 100%;
    min-height: 1.50rem;
    background: linear-gradient(#00b0c2, #1bd8bf);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: .40rem;
}

.topLeftBox {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: .28rem;
    /* margin-bottom: 8rem; */
}

.name {
    font-size: .40rem;
    color: #fff;
}

.sexBox {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-top: .20rem;
}

.sex {
    font-size: .23rem;
    color: #fff;
}

.age {
    font-size: .23rem;
    color: #fff;
    margin-left: .1rem;
}

.shengri {
    font-size: .23rem;
    color: #fff;
    margin-left: .1rem;
}

.topRightBox {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    margin-right: .18rem;
    padding-top: .50rem;
}

.chakanTit {
    font-size: .23rem;
    color: #fff;
}

.youjiantou {
    width: .22rem;
    height: .22rem;
    margin-left: .10rem;
}

/*信息*/
.xinxiBigBox {
    width: 100%;
    min-height: .80rem;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

.xinxiTittle {
    font-size: .23rem;
    color: #828282;
    border-left: 4px solid #00b0c2;
    padding-left: .20rem;
    /* padding-bottom: 10rem; */
    margin-bottom: .10rem;
    margin-top: .40rem;
    margin-left: .30rem;
}

.xinxiItemBox {
    width: calc(100% - 14rem);
    height: .80rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f2f2f2;
    padding: 0 .30rem;
}

.xinxiItemTittle {
    font-size: .23rem;
    color: #828282;
}

.xinxiItemText {
    font-size: .23rem;
    color: #828282;
}

.xinxiBox2 {
    width: calc(100% - 19rem);
    min-height: .90rem;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #f2f2f2;
    padding: 0 .40rem .20rem;
}

.xinxiTittle2 {
    font-size: .23rem;
    color: #828282;
    margin-top: .30rem;
}

.xinxiTextBox {
    width: calc(100% - 4.0rem);
    background-color: #f1f1f1;
    border-radius: .08rem;
    margin-top: .10rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: .20rem .20rem 0 .20rem;
    min-height: 1.20rem;
}

.bingshiItem {
    font-size: .23rem;
    color: #828282;
    padding: .12rem .20rem;
    border: 1px solid #8ed7dd;
    border-radius: .08rem;
    margin-right: .20rem;
    margin-bottom: .20rem;
}
</style>
