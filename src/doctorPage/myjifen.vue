<template>
<div class="jifen">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian"></div>
    <div class="jifenZ">
        <div class="shuiqiu">
            <p>
                剩余积分:
            </p>
            <p>{{integralResidual}}</p>
        </div>
        <!-- <span>今日增加：0</span> -->
    </div>
    <div class="list_detail">
        <section style="text-align:left">总积分{{zjifen}}</section>
        <section style="text-align:right">使用积分: {{integralUsed}}</section>
        <section class="btn_box">
            <div class="f-c-9 mr-1 botton-t  button botton-fl" @click="tixian">我要兑换</div>
            <div class="f-c-9 button  botton-t botton-fr" @click="jiaoyixq">兑换详情</div>
        </section>
    </div>
    <div class="xian"></div>
    <div class="list">
        <div class="detail" v-for="(item,index) in list" :key="index">
            <div>+{{item.integral}}</div>
            <p>获得 {{item.integral}} 积分</p>
            <p>{{item.patientName}} {{item.symptom}}</p>
            <section class="detail_sect">
                <p>
                    预扣: {{item.expectIntegral}}
                </p>
                <p>
                    剩余: {{item.remainIntegral}}
                </p>
            </section>
            <span style="padding:.2rem 0">{{stateArr[item.status]}}</span>
            <section style="clear:both"></section>
            <span>{{item.createDate}}</span>
        </div>
    </div>
    <confirm1 :text="integralResidual" ref="confirm1" @cancel="cancel1" @confirm="confirm1"></confirm1>
    <confirm2 :text="integralResidual" ref="confirm2" @cancel="cancel2" @confirm="confirm2"></confirm2>
</div>
</template>

<script>
import {
    doctorIntegralMsg,
    saveIntegralMsg
} from "api/doctor"
import HeadTop from 'base/header/header'
import router from '../router'
import {
    Toast
} from 'vant'
import cookie from "js-cookie"
import confirm1 from 'base/confirm/confirmjf1'
import confirm2 from 'base/confirm/confirmjf2'
export default {
    name: "jifen",
    data() {
        return {
            token: "",
            doctorId: "",
            integralId: '', //积分账户id
            list: [],
            zjifen: '',
            ydjifen: '',
            syjifen: '',
            integralResidual: '', //剩余总积分 
            integralUsed: '', //使用总积分
            expectIntegral: '', //预扣
            remainIntegral: '', //剩余
            status: "", // 0--待审核  1--审核成功     2--审核未通过 
            statName: [
                '待审核', '审核成功', '审核未通过', '审核成功，医生待确认'
            ],
            stateArr: [
                '未兑换', '已兑换', '部分兑换'
            ]
        }
    },
    created() {
        this.token = cookie.get("token");
        this.doctorId = cookie.get("doctorId");
        this.doctorIntegralMsg();
    },
    components: {
        confirm1,
        confirm2
    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.push('/homePage')
        },
        doctorIntegralMsg() {
            let list = {
                token: this.token,
                doctorId: this.doctorId
            }
            doctorIntegralMsg(list).then((res) => {
                console.log(res)
                this.list = res.list
                this.zjifen = res.integralTotal
                this.integralResidual = String(res.integralResidual)
                this.integralUsed = res.integralUsed
                this.ydjifen = res.integralUsed
                this.syjifen = res.integralResidual
                this.integralId = res.doctorIntegralId
            })
        },
        tixian() {
            this.$refs.confirm1.show();
        },
        cancel1() {
            this.$refs.confirm1.hide();
        },
        cancel2() {
            this.$refs.confirm2.hide();
        },
        confirm1(msg) {
            this.cancel1();
            console.log(msg)
            this.subMethod = msg
            this.$refs.confirm2.show()
        },
        confirm2(msg) {
            // this.cancel();
            console.log(msg)
            let sendMoney = msg
            let integralId = this.integralId
            if (this.subMethod == 1) {
                this.$router.push({
                    name: 'cardlistJf',
                    params: {
                        money: sendMoney,
                        integralId: integralId
                    }
                });
            } else if (this.subMethod == 2) {
                console.log('线下兑换金额==' + msg)
                let token = cookie.get("token");
                let accountId = this.accountId;
                let integralUsed = String(msg);
                let txmode = this.subMethod - 1
                let list = {
                    token: token,
                    integralId: integralId,
                    integralUsed: integralUsed,
                    cardNo: '',
                    bankCode: '',
                    accountName: '',
                    txmode: txmode
                }
                console.log(list)
                saveIntegralMsg(list).then(res => {
                    console.log(res)
                    if (res.type == false) {
                        this.$toast.center('您有待审核或未确认的单子，暂时无法申请兑换')
                    } else {
                        this.cancel2()
                        Toast.success('申请成功，等待审核')
                    }
                    clearTimeout(this.loop2); //再次清空定时器，防止重复注册定时器
                    this.loop2 = setTimeout(() => {
                        this.$router.push({
                            name: 'jiaoyiJf',
                            params: {
                                integralId: this.integralId
                            }
                        })
                    }, 1800);

                }).catch(error => {
                    console.log(error)
                })

            }

        },
        jiaoyixq() {
            this.$router.push({
                name: "jiaoyiJf",
                params: {
                    integralId: this.integralId
                }
            });
        }

    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.backHome {
    width: 81.4%;
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

.jifen {
    width: 100%;
    height: 100%;
}

.jifenZ {
    width: 2rem;
    height: 2rem;
    background: #00afc2;
    color: #fff;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: .2rem;

    .shuiqiu {
        width: 100%;
        font-size: 40px;
        padding-top: .8rem;
        float: left;
        text-align: center;

        p {
            font-size: .38rem;
        }
    }

    span {
        width: 100%;
        font-size: 25px;
        color: #cecece;
        float: left;
        text-align: center;
        padding-top: 15px;
    }

}

.list_detail {
    background: #fff;
    width: 89.6%;
    height: 1.4rem;
    line-height: .4rem;
    margin: 0 auto;
    position: relative;
    top: 0rem;
    padding-bottom: .2rem;

    section {
        float: left;
        width: 50%;
        color: #666;
        font-size: 0.30rem;
        padding-top: 0.1rem;

    }

    .button {
        background: linear-gradient(#37dad6, #00b0c2);
        color: #fff;
        border-radius: .1rem;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        width: 1.4rem;
        height: .6rem;
        line-height: .6rem;
        font-size: .28rem;
        text-align: center;
        float: left;
    }

    .btn_box {
        width: 100%;
        padding-bottom: .1rem;
        background: #fff;
    }

    .botton-t {
        margin-top: .1rem;
    }

    .botton-fl {
        float: left;
    }

    .botton-fr {
        float: right;
    }
}

.list {
    width: 89.6%;
    height: 58%;
    overflow-y: scroll;
    margin: 0 auto;
    padding-top: 60px;

    .detail {
        width: 100;
        height: 2.4rem;
        border-bottom: 1px solid #cecece;
        font-size: 25px;

        div {
            width: 70px;
            height: 70px;
            background: #00afc2;
            color: #fff;
            font-size: 25px;
            line-height: 70px;
            text-align: center;
            border-radius: 50%;
            float: left;
            margin-top: 25px;
            margin-bottom: 1rem;
        }

        p {
            float: left;
            color: #828282;
            width: 60%;
            padding-left: 30px;
            padding-top: 15px;

            &:nth-of-type(1) {
                padding-top: 30px;
            }
        }

        span {
            float: right;
            color: #828282;
        }

        .detail_sect {
            padding-left: .5rem;

            p {
                padding: .2rem 0 0 .3rem;
            }
        }
    }
}

::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}
</style>
