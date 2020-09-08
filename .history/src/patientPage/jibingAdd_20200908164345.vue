<template>
<div class="addBing">
    <HeadTop :title="pageName" :backBlack="true"></HeadTop>
    <div class="tishi">请添加慢性病症，以方便医生的诊断治疗！</div>
    <div class="zi" v-for="(item,index) in list" :key="index">
        {{item.chronicName}}
        <img src="../assets/img/shanchu.png" @touchstart='shanchu(item.id)' class="tu2">
    </div>
    <div class="tou" v-if="irritability">
        <input class="ipu" v-model='inputtext' placeholder='输入慢性病(仅限7个字)' :disabled="isdisplay" type='text' maxlength='7'>
        <div class="sure" @touchstart='surew'>确定</div>
        <div class="sure1" @touchstart='quxiao'>取消</div>
    </div>
    <img src='../assets/img/tian.png' class="tu" @touchstart='tu1'>

</div>
</template>

<script>
import {
    insertChronicDisease,
    selectByIdChronicDisease,
    deleteChronicDisease
} from 'api/patient'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "addBing",
    data() {
        return {
            pageName: '慢性病',
            token: '',
            patientId: '',
            list: '',
            irritability: '',
            isdisplay: false,
            id: '',
            num: 0,
            inputtext: ''
        }
    },
    created() {
        this.token = cookie.get("token");
        this.patientId = cookie.get("patientId");
        this.id = this.$route.query.id;
        this.num = this.$route.query.num;
        this.selectByIdChronicDisease();
    },
    computed: {

    },

    methods: {
        tu1() {
            this.irritability = true;
        },
        quxiao() {
            this.irritability = false;
        },
        selectByIdChronicDisease() {
            let list = {
                token: this.token,
                archivesId: this.id
            }
            selectByIdChronicDisease(list).then((res) => {
                //console.log(res);
                this.list = res.chronicDiseases;
            })
        },
        surew() {
            let list = {
                token: this.token,
                archivesId: this.id,
                chronicName: this.inputtext
            }
            insertChronicDisease(list).then((res) => {
                //console.log(res);
                if (res.type == true) {
                    this.selectByIdChronicDisease();
                    this.inputtext = '';
                }
            })
        },
        shanchu(id) {
            let list = {
                token: this.token,
                id: id
            }
            deleteChronicDisease(list).then((res) => {
                //console.log(res);
                if (res.type == true) {
                    this.$toast("删除成功");
                    this.selectByIdChronicDisease();
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

/* pages1/manxingbing/manxingbing.wxss */
.tishi {
    width: calc(100% - 6.0rem);
    margin: .20rem;
    font-size: .28rem;
    color: #999999;
}

.tou {
    margin-top: .38rem;
    float: left;
    margin-left: .36rem;
    clear: both;
}

.ipu {
    width: 3.40rem;
    height: .80rem;
    line-height: .80rem;
    font-size: .24rem;
    border-radius: .10rem;
    border: 1px solid #00b0c2;
    float: left;
    padding-left: .12rem;
}

.tu {
    display: block;
    width: .60rem;
    height: .60rem;
    position: absolute;
    ;
    right: 1rem;
    bottom: -3rem;
    margin-top: .48rem;
    margin-left: .44rem;
}

.tu2 {
    width: .40rem;
    height: .40rem;
    position: absolute;
    right: .17rem;
    top: 0;
    bottom: 0;
    margin: auto;
}

.sure {
    width: 1.06rem;
    height: .80rem;
    text-align: center;
    line-height: .80rem;
    font-size: .24rem;
    background-color: #00b0c2;
    float: left;
    border-radius: .10rem;
    color: #fff;
    margin-left: .10rem;
}

.sure1 {
    width: 1.06rem;
    height: .80rem;
    text-align: center;
    line-height: .80rem;
    font-size: .249rem;
    background-color: #fff;
    float: left;
    border-radius: .10rem;
    color: #000;
    border: 1px solid #c3c3c3;
    margin-left: .10rem;
}

.zi {
    width: calc((100% - 9.0rem) / 2);
    height: .80rem;
    line-height: .80rem;
    text-align: center;
    border: 1px solid #00b0c2;
    color: #00b0c2;
    font-size: .32rem;
    margin-top: .24rem;
    border-radius: .10rem;
    margin-left: .30rem;
    float: left;
    position: relative;
}
</style>
