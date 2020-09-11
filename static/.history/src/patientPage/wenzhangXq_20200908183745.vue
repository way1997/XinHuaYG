<template>
<div class="wenzhangXq">
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
        this.titleId = this.$route.params.id;
        this.detailXq = JSON.parse(this.$route.params.item);
        this.findArticleOne();
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
                params: {
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

.tuijian {
    >div {
        width: 100%;
        margin: 0 auto;
        height: 300px;
        border-bottom: 1px solid #e9e9e9;
        font-size: 25px;
        position: relative;

        >img {
            float: left;
            width: 89px;
            height: 89px;
            border-radius: 50%;
            margin-top: 19px;
            margin-left: 30px;
        }

        div {
            float: left;
            width: 80%;
            padding-left: 20px;

            &:nth-of-type(1) {
                color: #606060;
                padding-top: 28px;
            }

            &:nth-of-type(2) {
                color: #BABABA;
                padding-top: 16px;
            }

            &:nth-of-type(3) {
                color: #fff;
                padding-top: 19px;

                span {
                    float: left;
                    margin-right: 10px;
                    padding: 8px 15px;
                    background: #00afc2;
                    border-radius: 30px;
                    margin-bottom: 10px;
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
        margin-right: 10px;
        vertical-align: middle;
    }
}

.wenzhang {
    padding: 10px 30px;
    font-size: 25px;
}

.time {
    font-size: .24rem;
    text-align: right;
    clear: both;
    color: #a9a9a9;
    line-height: .60rem;
    padding: 0 .27rem;
    box-sizing: border-box;
}

.title {
    color: #222;
    font-size: 38px;
    line-height: .61rem;
    padding: .19rem .27rem;
    box-sizing: border-box;
    letter-spacing: 4px;
}
</style>
