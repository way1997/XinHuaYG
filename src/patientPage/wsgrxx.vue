<template>
<div>
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="top">
        <div class="herd">
            <img :src=imgUrl class="tu"></image>
            <div class="xxm">{{patientName}}</div>
        </div>
    </div>
    <div class="zi_1">
        <div style="border-top: 1px dashed #d2d2d2;margin:0 auto;">
            请认真填写你的个人信息以方便医生辨认 <br>（仅限于医生可见）
        </div>
    </div>
    <div class="center">
        <div class="center_1">
            <div class="inp">
                <div class="inp_1">
                    姓名
                </div>
                <input class="in" v-model="name" name="mz" placeholder='请输入姓名'></input>
            </div>
            <div class="inp">
                <div class="inp_1">
                    性别
                </div>
                <div class='choosesex'>
                    <div :class="sexCur==index+1? 'check':'' " @click='nan(item,index)' v-for="(item,index) in sexs" :key="item.id" :index='index'>
                        <span>{{item.sex}}</span>
                    </div>
                </div>
            </div>
            <div class="inp">
                <div class="inp_1">
                    年龄
                </div>
                <input class="in" type='number' v-model="age" name="niam" placeholder='请输入年龄'></input>
            </div>
            <div class="inp" style='border:none'>
                <div class="inp_1">
                    手机号
                </div>
                <input class="int" type='number' v-model="phone_num" placeholder='请输入手机号' name="sjh"></input>
            </div>
        </div>
    </div>
    <div class="foot" @click='dibu'>
        完成
    </div>
</div>
</template>

<script>
import {
    patientAddInfo,
    relation
} from "api/patient"
import cookie from "js-cookie"
export default {
    name: 'wsgrxx',
    data() {
        return {
            patientName: '',
            sexs: [{
                sex: '男',
                id: 1
            }, {
                sex: "女",
                id: 2
            }],
            checkName: '',
            checkId: '1',
            checkT: true,
            n: 0,
            fun_id: 2,
            time: '获取验证码', //倒计时
            currentTime: 60,
            name: '',
            age: '',
            sexCur: 1,
            phone_num: '',
            interval: null,
            openId: '',
            unionId: '',
            imgUrl: '',
            nick: '',
            doctorId: '',
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        nan(item, index) {
            this.sexCur = index + 1
            this.checkName = item.sex
        },
        dibu: function () {
            var that = this
            let name = this.name
            let sex = this.checkName
            let age = this.age
            let phone_num = this.phone_num
            console.log(this.phone_num)
            if (name == '') {
                this.$toast.center('请填写姓名')
            } else if (sex == '') {
                sex = '1'
            } else if (age == '') {
                this.$toast.center('请填写年龄')
            } else if (age.length > 2) {
                this.$toast.center('请填写正确的年龄')
            } else if (phone_num == '') {
                this.$toast.center('请填写手机号')
            } else if (phone_num.length != 11) {
                this.$toast.center('请输入正确的手机号')
            } else if (!(/^1[34578]\d{9}$/.test(phone_num))) {
                this.$toast.center('请输入正确的手机号')
            }
            let list1 = {
                openId: this.openId,
                // openId: 'oTRY10fRZBmepPFQ1V7tqSBprZqg',
                patientName: this.name,
                patientSex: this.sexCur,
                age: this.age,
                nick: this.nick,
                phone: this.phone_num,
                imgUrl: this.imgUrl,
                doctorId: this.doctorId
            }
            // console.log(list1)
            patientAddInfo(list1).then((res) => {
                console.log(res);
                var token = cookie.get("token");;
                var patientId = res.patientId;
                cookie.set(
                    'patientId', res.patientId
                )
                cookie.set(
                    'token', res.token
                )
                if (res.massage == "该手机号码已经存在，如有疑问请联系管理员") {
                    this.$toast('该手机号码已经存在，如有疑问请联系管理员')
                }
                setTimeout(function () {
                    that.$router.push({
                        path: 'indexPage'
                    })
                }, 2000)
            })
        },
    },
    mounted() {
        console.log(cookie.get("imgUrl"))
        this.openId = cookie.get("openId");
        this.unionId = cookie.get("unionId");
        this.imgUrl = cookie.get("patientImgUrl");
        this.nick = cookie.get("patientName");
        console.log(this.nick)
        this.doctorId = this.$route.params.doctorId;
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.backHome {
    width: 81.66%;
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

.top {
    width: 100%;
    height: 2.7rem;
    background: #fff;
    overflow: hidden;

    .herd {
        width: 94.4%;
        height: 2.12rem;
        margin-left: 0.24rem;

        .tu {
            width: 1.38rem;
            height: 1.38rem;
            display: block;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 50%;
            margin-top: 0.2rem;
        }
    }
}

.xxm {
    margin-top: 0.32rem;
    text-align: center;
    color: #222222;
    font-size: 0.28rem;
}

.zi_1 {
    width: 100%;
    height: 0.96rem;
    line-height: 0.66rem;
    font-size: 0.28rem;
    text-align: center;
    background: #fff;
}

.center {
    width: 100%;
    background: #fff;

    .center_1 {
        width: 83.46%;
        margin: .6rem auto;

        .inp {
            width: 100%;
            height: .9rem;
            margin-top: .3rem;
            border-bottom: 1px dashed #d2d2d2;

            .inp_1 {
                width: 1.6rem;
                height: 0.9rem;
                line-height: 0.9rem;
                font-size: 0.32rem;
                float: left;

            }

            .nan {
                width: .58rem;
                height: .42rem;
                line-height: .42rem;
                font-size: .26rem;
                text-align: center;
                border: .1rem solid #cfcece;
                float: left;
                margin-top: .4rem;
                border-radius: .13rem;
                color: #fff;
                background: #00b0c2;
            }

            .nv {
                width: .58rem;
                height: .42rem;
                line-height: .42rem;
                font-size: .26rem;
                text-align: center;
                border: .1rem solid #cfcece;
                float: left;
                margin-top: .4rem;
                border-radius: .13rem;
                color: #9c9c9c;
                margin-left: .42rem;
            }

            .in {
                position: relative;
                top: -0.34rem;
                width: 3.5rem;
                height: 0.9rem;
                font-size: 0.28rem;

            }

            .nian {
                width: 57.33%;
                height: .9rem;
                font-size: .26rem;
                line-height: .9rem;
            }

            .int {
                width: 220px;
                height: .9rem;
                font-size: .26rem;
                line-height: .9rem;
                float: left;
            }

            .xiu {
                width: 16.53%;
                height: .46rem;
                line-height: .46rem;
                color: #fff;
                font-size: .23rem;
                float: left;
                background: #00b0c2;
                text-align: center;
                margin-top: .26rem;
                border-radius: .1rem;
            }
        }
    }
}

.foot {
    width: 93.6%;
    height: 0.8rem;
    margin-left: 0.26rem;
    background: #00b0c2;
    text-align: center;
    font-size: 0.3rem;
    color: #fff;
    line-height: 0.8rem;
    border-radius: 0.18rem;
    margin-top: 0.3rem;

}

.choosesex {
    float: left;

    div {
        width: 0.58rem;
        height: 0.42rem;
        line-height: 0.42rem;
        font-size: 0.26rem;
        text-align: center;
        border: 0.01rem solid #cfcece;
        float: left;
        margin-top: 0.28rem;
        border-radius: 0.13rem;
        color: #000000;
    }

    .check {
        background: #00b0c2;
        color: #ffffff;
    }

    div:nth-of-type(2) {
        margin-left: .28rem;
    }
}
</style>
