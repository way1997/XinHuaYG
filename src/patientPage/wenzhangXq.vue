<template>
<div class="wenzhangXq" id="wenzhangXQ" ref="wenzhangXq">
    <div class="backHome" @touchstart="goBack">返回上一级</div>
    <div class="xian" style="clear:both;"></div>
    <div class="tuijian" v-if="detailXq.doctorLevelName">
        <div>
            <img :src="detailXq.doctorPhoto" alt="">
            <div>{{detailXq.sources}} {{detailXq.doctorLevelName}}</div>
            <div>{{detailXq.doctorHospitalName}} {{detailXq.departmentName}}</div>
            <div><span v-for="(item,index) in detailXq.list_adept" :key="index">{{item.medicineSubjectName}}</span></div>
            <span class="zixun" @touchstart="goDetail(item.doctorId)"><img src="../assets/img/xiaoxi1.png" alt="">立即咨询</span>
        </div>
    </div>
    <div class="time">{{time}}</div>
    <div class="title">{{lists}}</div>
    <div v-html="content" class="wenzhang"></div>
</div>
</template>

<script>
import {
    findArticleOne
} from 'api/patient'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import $ from 'jquery'
export default {
    name: "wenzhangXq",
    data() {
        return {
            titleId: '',
            lists: '',
            time: '',
            content: '',
            detailXq: ''
        }
    },
    created() {
        $('#wenzhangXQ').scrollTop(0);
        this.titleId = this.$route.params.id;
        this.detailXq = JSON.parse(this.$route.params.item);
        this.findArticleOne();

    },
    mounted() {
        console.log()

    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },
        findArticleOne() {
            let list = {
                articleId: this.titleId
            }
            findArticleOne(list).then((res) => {
                this.time = res.crateDate;
                this.lists = res.title;
                this.content = res.content
            })
        },
        goDetail() {
            this.$router.push({
                path: '/yishengXq',
                query: {
                    doctorId: doctorId
                }
            })
        }
    },
    components: {

    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.wenzhangXq {
    overflow: hidden;
}

.backHome {
    width: 81.46%;
    height: 0.76rem;
    background: #00afc2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    color: #fff;
    font-size: 0.32rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
}

.xian {
    width: 100%;
    height: 0.1rem;
    background: #efefef;
    clear: both;
}

.tuijian {
    >div {
        width: 100%;
        margin: 0 auto;
        height: 2.5rem;
        border-bottom: 1px solid #e9e9e9;
        font-size: .25rem;
        position: relative;
        padding-bottom: 1.6rem;

        >img {
            float: left;
            width: .89rem;
            height: .89rem;
            border-radius: 50%;
            margin-top: .19rem;
            margin-left: .3rem;
        }

        div {
            float: left;
            width: 80%;
            padding-left: .2rem;

            &:nth-of-type(1) {
                color: #606060;
                padding-top: .28rem;
            }

            &:nth-of-type(2) {
                color: #BABABA;
                padding-top: .16rem;
            }

            &:nth-of-type(3) {
                color: #fff;
                padding-top: .19rem;

                span {
                    float: left;
                    margin-right: .1rem;
                    padding: .1rem .15rem;
                    background: #00afc2;
                    border-radius: .3rem;
                    margin-bottom: .1rem;
                }
            }
        }
    }
}

.zixun {
    position: absolute;
    right: 32px;
    top: 32px;
    font-size: 25px;
    color: #00afc2;

    img {
        width: 29px;
        height: 27px;
        margin-right: .1rem;
        vertical-align: middle;
    }
}

.wenzhang {
    padding: .1rem .5rem;
    font-size: .25rem;
    line-height: .5rem;

    section {
        line-height: .3rem;

    }

}

.time {
    font-size: .24rem;
    text-align: right;
    clear: both;
    color: #a9a9a9;
    line-height: .60rem;
    padding: 0 .27rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.title {
    color: #222;
    font-size: 0.38rem;
    line-height: .61rem;
    padding: .19rem .27rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    letter-spacing: 0.04rem;
}
</style>
