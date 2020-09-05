<template>
<div class="zhaoYs">
    <div class="back" @touchstart="goBack">返回上一级</div>
    <div class="search">
        <input type="text" placeholder="输入医生名字" v-model="doctorTel" style="border:1px solid #e9e9e9;" />
        <em class="searchEm" @touchstart="searchYs">搜索</em>
    </div>
    <div class="xian"></div>
    <!--<div class="list">
      <div class="zhonglei">
        <p
          v-for="(item,index) in kemu"
          :key="index"
          :class="{choose:chooIdx==index}"
          @touchstart="change(index,item.departmentId)"
        >
          <span>{{item.departmentName}}</span>
        </p>
      </div> -->
    <!-- <div class="yisheng">
        <div style="color:#828282;font-size:14px;padding:30px 0 20px 70px;" v-if="yishengList.length==0">该科室暂无医生</div>
        <div class="doctor" v-for="(item,index) in yishengList" :key="index" @touchstart="goDetail(item.doctorId)">
            <img :src="item.doctorPhoto" alt />
            <div>{{item.doctorName}} {{item.doctorLevelName}}</div>
            <div>{{item.doctorHospitalName}} {{item.departmentName}}</div>
            <div v-if="item.doctorOnstatus==1">在线</div>
            <div v-if="item.doctorOnstatus==0">离线</div>
        </div>
    </div> -->
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
}

.back {
    width: 22.66%;
    height: 0.76rem;
    background: #00afc2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    color: #fff;
    font-size: 0.25rem;
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
    width: 468px;
    float: left;
    height: 76px;
    line-height: 76px;
    margin-top: 15px;
    margin-bottom: 15px;

    input {
        width: 70%;
        height: 74px;
        border-radius: 38px;
        color: #ccc;
        font-size: 25px;
        float: left;
        text-align: center;
        border: 1px solid rgba(214, 214, 214, 1);
    }

    input::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size: 25px;
    }
}

.searchEm {
    position: absolute;
    right: 40px;
    top: 30px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    color: #00afc2;
    font-size: 24px;
    text-align: center;
    border: 1px solid #00afc2;
    border-radius: 20px;
}

.list {
    width: 100%;
    height: 91%;

    .zhonglei {
        width: 220px;
        height: 100%;
        overflow-y: scroll;
        float: left;

        p {
            width: 100%;
            height: 94px;
            background: #00afc2;
            color: #fff;
            font-size: 25px;

            span {
                display: block;
                width: 192px;
                height: 98%;
                text-align: center;
                line-height: 94px;
                margin: 0 auto;
                border-bottom: 1px solid #99dfe7;
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
        width: 530px;
        height: 100%;
        overflow-y: scroll;
        float: left;

        .doctor {
            width: 94%;
            height: 160px;
            border-bottom: 1px solid #ececec;
            margin: 0 auto;
            position: relative;

            img {
                width: 89px;
                height: 89px;
                border-radius: 50%;
                float: left;
                margin-top: 30px;
            }

            div {
                float: left;
                padding-left: 20px;
            }

            div:nth-of-type(1) {
                color: #808080;
                font-size: 25px;
                width: 60%;
                padding-top: 45px;
            }

            div:nth-of-type(2) {
                color: #bababa;
                font-size: 25px;
                width: 60%;
                padding-top: 15px;
            }

            div:nth-of-type(3) {
                width: 79px;
                height: 37px;
                background: #00afc2;
                border-radius: 19px;
                text-align: center;
                line-height: 37px;
                font-size: 25px;
                color: #fff;
                position: absolute;
                right: 20px;
                top: 55px;
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
