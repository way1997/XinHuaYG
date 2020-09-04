<template>
<div class="moban">
    <div class="backHome" @touchstart="goBack">返回个人中心</div>
    <div class="list">
        <div v-for="(item,index) in medicineManner" :key="index" @touchstart="goDetail(item.shapeId,item.id)">
            <div v-if="item.value==1">T</div>
            <div v-if="item.value==4">x</div>
            <div>{{item.lable}}</div>
            <div>{{item.shapeName}}</div>
            <div>模版数量：{{item.num}}</div>
        </div>
    </div>
</div>
</template>

<script>
import {
    findBrandAndModel
} from 'api/doctor'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "moban",
    data() {
        return {
            token: '',
            doctorId: '',
            medicineManner: [],
            type: 1
        }
    },
    created() {
        this.token = cookie.get("token");
        this.doctorId = cookie.get("doctorId");
        this.findBrandAndModel()
    },
    computed: {

    },

    methods: {
        findBrandAndModel() {
            let list = {
                token: this.token,
                doctorId: this.doctorId
            }
            findBrandAndModel(list).then((res) => {
                this.medicineManner = res.list;
            })
        },
        goDetail(shapeId, brandId) {
            this.$router.push({
                path: "/mobanList",
                query: {
                    brandId: brandId,
                    shapeId: shapeId,
                    type: this.type
                }
            })
        },
        goBack() {
            this.$router.push('/homePage')
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
    background: rgba(66, 202, 198, 1);
    border-radius: 13px;
    text-align: center;
    line-height: 76px;
    color: #fff;
    font-size: 25px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
}

.list {
    >div {
        width: 100%;
        height: 182px;
        border-bottom: 1px solid #e2e2e2;

        div:nth-of-type(1) {
            width: 102px;
            height: 103px;
            background: #42CAC6;
            border-radius: 50%;
            float: left;
            text-align: center;
            line-height: 103px;
            color: #fff;
            margin-top: 40px;
            margin-left: 20px;
        }

        div:nth-of-type(2),
        div:nth-of-type(3) {
            float: left;
            color: #797979;
            font-size: 25px;
            padding-top: 20px;
            padding-left: 30px;
            width: 50%;
        }

        div:nth-of-type(2) {
            padding-top: 55px;
        }

        div:nth-of-type(4) {
            color: #797979;
            font-size: 25px;
            float: right;
            padding-right: 30px;
        }
    }
}
</style>
