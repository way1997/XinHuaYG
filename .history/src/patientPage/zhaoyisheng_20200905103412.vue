<template>
<div class="zhaoYs">
    <div class="back" @click="goBack">返回上一级</div>
    <div class="search">
        <input type="text" placeholder="输入医生名字" v-model="doctorTel" style="border:1px solid #e9e9e9;" />
        <em class="searchEm" @click="searchYs">搜索</em>
    </div>
    <div class="xian"></div>
    <div class="list">
        <div class="zhonglei">
            <p v-for="(item,index) in kemu" :key="index" :class="{choose:chooIdx==index}" @click="change(index,item.departmentId)">
                <span>{{item.departmentName}}</span>
            </p>
        </div>
        <div class="yisheng">
            <div style="color:#828282;font-size:14px;padding:30px 0 20px 70px;" v-if="yishengList.length==0">该科室暂无医生</div>
            <div class="doctor" v-for="(item,index) in yishengList" :key="index" @click="goDetail(item.doctorId)">
                <img :src="item.doctorPhoto" alt />
                <div>{{item.doctorName}} {{item.doctorLevelName}}</div>
                <div>{{item.doctorHospitalName}} {{item.departmentName}}</div>
                <div v-if="item.doctorOnstatus==1">在线</div>
                <div v-if="item.doctorOnstatus==0">离线</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    sectionList,
    getDoctorByTel,
    relation
} from "api/patient";
import HeadTop from "base/header/header";
import router from "../router";
import cookie from "js-cookie";
export default {
    name: "zhaoYs",
    data() {
        return {
            chooIdx: 0,
            kemu: [],
            yishengList: [],
            departmentId: "",
            token: "",
            patientId: "",
            doctorTel: "",
        };
    },
    created() {
        this.token = cookie.get("token");
        this.patientId = cookie.get("patientId");
        this.sectionList();
    },
    computed: {},

    methods: {
        searchYs() {
            this.$router.push({
                path: "/remenJb",
                query: {
                    doctorTel: this.doctorTel,
                },
            });
        },
        goDetail(doctorId) {
            this.$router.push({
                path: "/yishengXq",
                query: {
                    doctorId: doctorId,
                },
            });
        },
        goBack() {
            this.$router.push("/indexPage");
        },
        sectionList() {
            let list = {
                token: this.token,
            };
            sectionList(list).then((res) => {
                //console.log(res);
                this.kemu = res.data;
                this.departmentId = res.data[0].departmentId;
                this.getDoctorByTel();
            });
        },
        getDoctorByTel() {
            let list = {
                token: this.token,
                patientId: this.patientId,
                doctorTel: this.departmentId,
            };
            getDoctorByTel(list).then((res) => {
                //console.log(res);
                this.yishengList = res.data;
            });
        },
        change(index, departmentId) {
            this.chooIdx = index;
            this.departmentId = departmentId;
            this.getDoctorByTel();
        },
    },
    components: {},
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";

.zhaoYs {
    width: 100%;
    height: 100%;
    position: relative;
}

.back {
    width: 22.66%;
    height: 0.73rem;
    background: #00afc2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.73rem;
    color: #fff;
    font-size: 0.22rem;
    float: left;
    margin: 0.15rem 0.2rem 0.15rem 0.2rem;
}

.xian {
    width: 100%;
    height: 10px;
    background: #efefef;
    clear: both;
}

.search {
    width: 62.4%;
    float: left;
    height: 0.73rem;
    line-height: 0.73rem;
    margin-top: 15px;
    margin-bottom: 15px;

    input {
        width: 70%;
        height: 0.71rem;
        border-radius: 0.38rem;
        color: #ccc;
        font-size: 0.25rem;
        float: left;
        text-align: center;
        border: 0.01rem solid #d6d6d6;
    }

    input::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size: 0.22rem;
    }
}

.searchEm {
    position: absolute;
    right: 0.4rem;
    top: 50%;
    transform: translateY(-50%);
    width: 13.33%;
    height: 0.4rem;
    line-height: 0.4rem;
    color: #00afc2;
    font-size: 0.22rem;
    text-align: center;
    border: 0.01rem solid #00afc2;
    border-radius: 0.2rem;
}

.list {
    width: 100%;
    height: 91%;

    .zhonglei {
        width: 29.33%;
        height: 100%;
        overflow-y: scroll;
        float: left;

        p {
            width: 100%;
            height: 0.94rem;
            background: #00afc2;
            color: #fff;
            font-size: 0.23rem;

            span {
                display: block;
                width: 87.67%;
                height: 98%;
                text-align: center;
                line-height: 0.94rem;
                margin: 0 auto;
                border-bottom: 0.01rem solid #99dfe7;
            }
        }

        p.choose {
            background: #fff;
            color: #00afc2;

            span {
                border: none;
            }
        }
    }

    .yisheng {
        width: 70.66%;
        height: 100%;
        overflow-y: scroll;
        float: left;

        .doctor {
            width: 94%;
            height: 1.6rem;
            border-bottom: 0.01rem solid #ececec;
            margin: 0 auto;
            padding-bottom: 0.5rem;
            position: relative;

            img {
                width: 0.60rem;
                height: 0.60rem;
                border-radius: 50%;
                float: left;
                margin-top: 10%;
            }

            div {
                float: left;
                padding-left: 0.2rem;
            }

            div:nth-of-type(1) {
                color: #808080;
                font-size: 0.22rem;
                width: 60%;
                padding-top: 0.45rem;
            }

            div:nth-of-type(2) {
                color: #bababa;
                font-size: 0.23rem;
                width: 60%;
                padding-top: 0.15rem;
            }

            div:nth-of-type(3) {
                width: 18%;
                height: 0.37rem;
                background: #00afc2;
                border-radius: 0.19rem;
                text-align: center;
                line-height: 0.36rem;
                font-size: 0.21rem;
                color: #fff;
                position: absolute;
                right: 1%;
                top: 22%;
                padding-left: 0;
            }
        }
    }
}

::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}
</style>
