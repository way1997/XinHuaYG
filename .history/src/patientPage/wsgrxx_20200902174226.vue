<template>
<div>
    <div class="backHome" @touchstart="goBack">返回上一级</div>
    <div class="top">
        <div class="herd">
            <img :src=imgUrl class="tu"></image>
            <div class="xxm">{{patientName}}</div>
        </div>
    </div>
    <div class="zi_1">
        <div style="border-top: 1px dashed #d2d2d2;margin:0 auto;">
            请认真填写你的个人信息以方便医生辨认（仅限于医生可见）
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
                    <div :class="sexCur==index+1? 'check':'' " @touchstart='nan(item,index)' v-for="(item,index) in sexs" :key="item.id" :index='index'>
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
    <div class="foot" @touchstart='dibu'>
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
            this.$router.push('/jiankangda')
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
                patientName: this.name,
                patientSex: this.sexCur,
                age: this.age,
                nick: this.nick,
                phone: this.phone_num,
                imgUrl: this.imgUrl,
                doctorId: this.doctorId
            }

            patientAddInfo(list1).then((res) => {
                console.log(res);
                var token = cookie.get("token");;
                var patientId = res.patientId;
                cookie.set(
                    'patientId', res.patientId
                )
                if (res.massage == "该手机号码已经存在，如有疑问请联系管理员") {
                    this.$toast({
                        title: '该手机号码已经存在，如有疑问请联系管理员',
                        icon: 'none'
                    })
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
        this.imgUrl = cookie.get("imgUrl");
        this.nick = cookie.get("nick");
        this.doctorId = this.$route.params.doctorId;
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

.top {
    width: 750px;
    height: 270px;
    background: #fff;
    overflow: hidden;

    .herd {
        width: 708px;
        height: 212px;
        margin-left: 24px;

        .tu {
            width: 138px;
            height: 138px;
            display: block;
            margin-left: 288px;
            border-radius: 50%;
            margin-top: 20px;
        }
    }
}

.xxm {
    margin-top: 32px;
    text-align: center;
    color: #222222;
    font-size: 28px;
}

.zi_1 {
    width: 100%;
    height: 96px;
    line-height: 96px;
    font-size: 24px;
    text-align: center;
    background: #fff;
}

.center {
    width: 100%;
    background: #fff;

    .center_1 {
        width: 626px;
        margin: 0 auto;

        .inp {
            width: 626px;
            height: 90px;
            border-bottom: 1px dashed #d2d2d2;

            .inp_1 {
                width: 190px;
                height: 90px;
                line-height: 90px;
                font-size: 24px;
                float: left;
            }

            .nan {
                width: 58px;
                height: 42px;
                line-height: 42px;
                font-size: 26px;
                text-align: center;
                border: 1px solid #cfcece;
                float: left;
                margin-top: 4px;
                border-radius: 13px;
                color: #fff;
                background: #00b0c2;
            }

            .nv {
                width: 58px;
                height: 42px;
                line-height: 42px;
                font-size: 26px;
                text-align: center;
                border: 1px solid #cfcece;
                float: left;
                margin-top: 4px;
                border-radius: 13px;
                color: #9c9c9c;
                margin-left: 42px;
            }

            .in {
                position: relative;
                top: -39px;
                width: 430px;
                height: 90px;
                font-size: 24px;
                line-height: 90px;
            }

            .nian {
                width: 430px;
                height: 90px;
                font-size: 24px;
                line-height: 90px;
            }

            .int {
                width: 220px;
                height: 90px;
                font-size: 24px;
                line-height: 90px;
                float: left;
            }

            .xiu {
                width: 124px;
                height: 46px;
                line-height: 46px;
                color: #fff;
                font-size: 20px;
                float: left;
                background: #00b0c2;
                text-align: center;
                margin-top: 24px;
                border-radius: 10px;
            }
        }
    }
}

.foot {
    width: 702px;
    height: 80px;
    margin-left: 26px;
    background: #00b0c2;
    text-align: center;
    font-size: 30px;
    color: #fff;
    line-height: 80px;
    border-radius: 18px;

}

.choosesex {
    float: left;

    div {
        width: 58px;
        height: 42px;
        line-height: 42px;
        font-size: 26px;
        text-align: center;
        border: 1px solid #cfcece;
        float: left;
        margin-top: 12px;
        border-radius: 13px;
        color: #000000;
    }

    .check {
        background: #00b0c2;
        color: #ffffff;
    }

    .choosesex div:nth-of-type(2) {
        margin-left: 20px;
    }
}
</style>
