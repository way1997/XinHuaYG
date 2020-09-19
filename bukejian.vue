<template>
<div class="bukejian">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian"></div>
    <div v-for="(item,index) in bukejian" :key="index">
        <div class='patient'>
            <div class='patient_left'>
                <img :src='item.patientImgUrl'>
            </div>
            <div class='patient_text'>
                <div>{{item.patientName}}</div>
                <div class='patient_left_Te'>
                    <label :class="{nan:item.patientSex==1}">
                        <img :src="item.patientSex==1?require('../assets/img/sex2.png'):require('../assets/img/sex1.png')" alt="">{{item.patientAge}}岁
                    </label>
                </div>
                <div class='time'>{{item.createDate}} 设置不可见</div>
            </div>
            <div class='qu_but' @click="quxiao(item.patientId)">取消不可见</div>
        </div>
    </div>

    <div class='wrap' v-if="bukejian.length == 0">
        <div class='hidden'>
            <img class='jlu' src='../assets/img/mobanwu.png'>
            <div>您暂时还没有不可见患者</div>
        </div>
    </div>

</div>
</template>

<script>
import {
    lookPullBlack,
    cancelPullBlack
} from 'api/doctor'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "bukejian",
    data() {
        return {
            pageName: '不可见患者',
            token: '',
            doctorId: '',
            bukejian: [],
        }
    },
    created() {
        this.token = cookie.get("token");
        this.doctorId = cookie.get("doctorId");
        this.lookPullBlack();
    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.push('/homePage')
        },
        lookPullBlack() {
            let list = {
                token: this.token,
                doctorId: this.doctorId
            }
            lookPullBlack(list).then((res) => {
                this.bukejian = res.data;
            })
        },
        quxiao(patientDoctorId) {
            let list = {
                token: this.token,
                doctorId: this.doctorId,
                patientDoctorId: patientDoctorId
            }
            cancelPullBlack(list).then((res) => {
                if (res.type == true) {
                    this.$toast('取消成功');
                    this.lookPullBlack();
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

/* pages/gongao/bianjgong/mygg.wxss */
.bukejian {
    height: 100%;
    //background: #f1f1f1;
    padding-top: .17rem;
    box-sizing: border-box;
}

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

.time {
    float: left;
    font-size: 25px;
    color: #828282;
    clear: both;
    line-height: .39rem;
}

.patient {
    width: 100%;
    height: 1.32rem;
    background: #fff;
    padding: .20rem .25rem;
    box-sizing: border-box;
    margin-bottom: .14rem;
}

.patient_left {
    width: .90rem;
    float: left;
}

.patient_left img {
    width: .90rem;
    height: .90rem;
    float: left;
    border-radius: 50%;
}

.patient_left div {
    float: left;
    font-size: 25px;
    color: #828282;
}

.patient_left_Te {
    /* width: 70rem; */
    height: .25rem;
    //border: 1px solid #d2d2d2;
    //border-radius: .10rem;
    font-size: 22px;
    color: #fff;
    line-height: .25rem;
    float: left;
    margin-top: .1rem;
    margin-left: .60rem;
    //background:#00b0c2;
}

label {
    width: 134px;
    height: 41px;
    display: inline-block;
    background: rgba(247, 124, 124, 1);
    border-radius: 21px;
    line-height: 41px;
    color: #fff;
}

label img {
    width: 29px;
    height: 29px;
    margin: 0 10px 0 10px;
    vertical-align: middle;
}

label.nan {
    width: 134px;
    height: 41px;
    background: #2eb0d5;
    border-radius: 21px;
    line-height: 41px;
    color: #fff;
}

.patient_right {
    width: 87%;
    height: 100%;
    float: right;
    padding-left: .50rem;
    box-sizing: border-box;
}

.patient_right div:nth-child(1) {
    color: #828282;
    font-size: 25px;
    float: left
}

.patient_right div:nth-child(2) {
    color: #828282;
    font-size: 25px;
    float: right;
}

.patient_right div:nth-child(3) {
    color: #828282;
    font-size: 25px;
    float: left;
    clear: both;
    text-align: left;
    margin-top: .28rem;
    line-height: .28rem;
}

.patient_text {
    /* width:68%; */
    height: 100%;
    float: left;
    padding-left: .50rem;
    box-sizing: border-box;

}

.patient_text div:nth-child(1) {
    color: #828282;
    font-size: 25px;
    float: left;
    line-height: .55rem;
}

.wrap {
    width: 100%;
    height: 100%;
    background: #fff;
}

.jlu {
    width: 1.60rem;
    height: 1.60rem;
    display: block;
    margin: 0 auto;
    padding-top: 48%;
}

/* 无内容显示 */
.hidden div {
    color: #828282;
    font-size: .30rem;
    text-align: center;
    line-height: .90rem;
    margin-bottom: 2.54rem;
}

.generate {
    width: 100%;
    height: .90rem;
    background: #fff;
    padding: .10rem .23rem;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;

}

.generate div {
    color: #fff;
    background: #00b0c2;
    text-align: center;
    line-height: .72rem;
    height: .72rem;
    width: 100%;
    border-radius: .10rem;
    font-size: .32rem;
}

.qu_but {
    float: right;
    font-size: 25px;
    color: #828282;
    line-height: .90rem;
}
</style>
