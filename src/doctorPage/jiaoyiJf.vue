<template>
<div class="page9">
    <div class="zhezhao2" v-if="loadUp2">
        <!-- 处理消息撤回 发送消息-->
        <img src="../assets/img/LODING.gif" alt="" class="loading">
    </div>
    <van-tabs v-model="active">
        <van-tab title="待审核/待确认">
            <div v-if="isAuditshow3" class="auditBox">
                <img src="../assets/img/xiaoxi_wuxiaoxi.jpg" alt="">
            </div>
            <div class="flex flex__justify flex__center bg-white" v-for="(value,index) in listAudit3" :key="index">
                <div class="ms num" :class="[value.auditStatus=='0'?'isAuditEmmbg':value.auditStatus=='1'?'':value.auditStatus=='2'?'isnoAuditbg':value.auditStatus=='3'?'isAuditEmOkbg':'']"><span>¥{{value.integralUsed}}</span></div>
                <div style="margin-left:0rem;">
                    <div class="ms mt" :class="[value.auditStatus=='0'?'isAuditEmm':value.auditStatus=='1'?'':value.auditStatus=='2'?'isAuditNok':value.auditStatus=='3'?'isAuditEmOk':'']">{{auditStatName[value.auditStatus]}}
                    </div>
                    <div class="ms mb" style="color:rgb(138 132 132);">{{value.createDate}}</div>
                </div>
                <div style="width:1rem"></div>
                <div v-if="value.auditStatus == 3" class="vant-btn">
                    <p class="info_btn" @click="confirmMsg(value)">确认</p>
                    <!--<van-button type="info" block @click="confirmMsg(value)">确认</van-button> -->
                </div>
            </div>
        </van-tab>
        <van-tab title="审核成功">
            <div v-if="isAuditshow1" class="auditBox">
                <img src="../assets/img/xiaoxi_wuxiaoxi.jpg" alt="">
            </div>
            <div class="flex flex__justify flex__center bg-white" v-for="(value,index) in listAudit1" :key="index">
                <div class="ms num"><span>¥{{value.integralUsed}}</span></div>
                <div style="margin-left:0rem">
                    <div class="ms mt isAuditOk">{{auditStatName[value.auditStatus]}}
                    </div>
                    <div class="ms mb" style="color:rgb(138 132 132);">{{value.createDate}}</div>
                </div>
                <div style="width:1rem"></div>
                <div v-if="value.auditStatus == 3" class="vant-btn">
                    <van-button type="info" block @click="confirmMsg(value)">确认</van-button>
                </div>
            </div>
        </van-tab>
        <van-tab title="审核未通过">
            <div v-if="isAuditshow2" class="auditBox">
                <img src="../assets/img/xiaoxi_wuxiaoxi.jpg" alt="">
            </div>
            <div class="flex flex__justify flex__center bg-white" v-for="(value,index) in listAudit2" :key="index">
                <div class="ms num isnoAuditbg"><span>¥{{value.integralUsed}}</span></div>
                <div style="margin-left:0rem">
                    <div class="ms mt" :class="[value.auditStatus=='0'?'isAuditEmm':value.auditStatus=='1'?'':value.auditStatus=='2'?'isAuditNok':value.auditStatus=='3'?'isAuditEmOk':'']">{{auditStatName[value.auditStatus]}}
                    </div>
                    <div class="ms mb" style="color:rgb(138 132 132);">{{value.createDate}}</div>
                </div>
                <div style="width:1rem"></div>
                <div v-if="value.auditStatus == 3" class="vant-btn">
                    <van-button type="info" block @click="confirmMsg(value)">确认</van-button>
                </div>
            </div>
        </van-tab>
    </van-tabs>
</div>
</template>

<script>
import {
    findIntegralMsgList,
    integralConfirmMsg
} from "api/doctor";
import HeadTop from 'base/header/header'
import router from '../router'
import $ from 'jquery'
import cookie from "js-cookie"
import {
    Toast
} from 'vant';
export default {
    name: "Page9",
    data() {
        return {
            active: 2,
            list: "",
            integralId: '',
            auditStatus: "", // 0--待审核  1--审核成功     2--审核未通过 
            auditStatName: [
                '待审核', '审核成功', '审核未通过', '审核成功，医生待确认'
            ],
            fblock: false,
            active: 0,
            isAuditshow1: false,
            isAuditshow2: false,
            isAuditshow3: false,
            loadUp2: false,
            listAudit1: [], //审核成功
            listAudit2: [], //审核未通过
            listAudit3: [] //待审核或待医生确认
        };
    },
    created() {
        this.integralId = this.$route.params.integralId
        if (!this.integralId) {
            this.$router.push({
                name: 'myjifen'
            })
        }
        this.showmoney();
    },
    methods: {
        showmoney() {
            // this.loadUp2 = true
            let token = cookie.get("token");
            let list = {
                token: token,
                integralId: this.integralId,
            };
            //console.log(list)
            findIntegralMsgList(list).then((res) => {
                this.loadUp2 = false
                //console.log(res)
                this.list = res.list_return;
                let lists = this.list
                lists.map((item, index) => {
                    if (item.auditStatus == 1) {
                        this.listAudit1.push(item)
                    } else if (item.auditStatus == 2) {
                        this.listAudit2.push(item)
                    } else {
                        this.listAudit3.push(item)
                    }
                })
                if (this.listAudit3 == '') {
                    this.isAuditshow3 = true
                }
                if (this.listAudit2 == '') {
                    this.isAuditshow2 = true
                }
                if (this.listAudit1 == '') {
                    this.isAuditshow1 = true
                }

            });
        },
        confirmMsg(item) {
            // this.loadUp2 = true
            let token = cookie.get("token");
            let integralId = item.id
            let list = {
                token: token,
                integralId: integralId,
            };
            console.log(list)
            integralConfirmMsg(list).then((res) => {
                console.log(res)
                this.loadUp2 = false
                Toast.success('已确认')
                clearTimeout(this.loop2); //再次清空定时器，防止重复注册定时器
                this.loop2 = setTimeout(() => {
                    this.$router.push({
                        name: 'myjifen',
                        params: {
                            integralId: this.integralId
                        }
                    })
                }, 1800);
                console.log(res)
            }).catch(error => {
                console.log(error)
            });

        }
    }
};
</script>

<style lang="less">
/deep/.van-button--normal {
    font-size: .3rem;
}

.zhezhao2 {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

.loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.page9 {
    width: 100%;
    height: 100%;
    background: #eee;
    font-size: 0.2rem;

    .van-tab--active {
        color: #00c1de;
    }

    .van-tabs__line {
        background: #00c1de;
    }

    .flex {
        display: flex;
    }

    .flex__justify {
        justify-content: space-between;
    }

    .flex__center {
        align-items: center;
    }

    .bg-white {
        background: #fff;
        margin: .1rem 0;
        border-radius: .2rem;
        box-shadow: 2px 2px 2px #919090;
        border-top: 1px solid #eee;
    }

    .ms {
        margin-left: 0.3rem;
        margin-right: 0.3rem;
    }

    .mt {
        margin-top: 0.28rem;

        font-size: .30rem;
    }

    .mb {
        margin-top: .3rem;
        margin-bottom: .3rem;
        font-size: .28rem;
    }

    .num {
        color: #f3f3f3;
        font-size: .28rem;
        line-height: 1rem;
        text-align: center;
        width: 1.3rem;
        height: 1rem;
        border-radius: 100%;
        background: #71b9c7;
        margin-right: .2rem;
        overflow: hidden;
    }

    .isAuditNok {
        color: #a05050;

    }

    .isAuditEmm {
        color: #c7c071;
    }

    .isAuditEmOk {
        color: #93b57e;
    }

    .isAuditOk {
        color: #71b9c7;
    }

    .isnoAuditbg {
        background: #cc6666;
    }

    .isAuditEmmbg {
        background: #c7c071;
    }

    .isAuditEmOkbg {
        background: #93b57e;
    }

    .icon {
        width: 0.8rem;
        height: 0.8rem;
        display: inline-block;
    }

    .mr {
        margin-right: 0.3rem;
    }

    .ml {
        margin-left: 0.3rem;
    }

    .z {
        margin-left: 0.2rem;
    }

    .auditBox {
        width: 100%;
        height: 100%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .vant-btn {
        width: 1rem;
        font-size: .3rem;
        height: 1.4321rem;
        display: inline-block;
        overflow: hidden;
        line-height: .6rem;
        margin: 0 0;
        border-radius: .2rem;
        position: absolute;
        right: .0123rem;

        .info_btn {
            position: relative;
            display: inline-block;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            font-size: .3rem;
            line-height: 1.2rem;
            text-align: center;
            border-radius: 2px;
            cursor: pointer;
            transition: opacity .2s;
            color: #fff;
            background-color: #93b57e;
        }
    }

    /deep/.van-button {
        font-size: .3rem;
        padding: 0;
        height: 100%;
        background: #93b57e;
        ;
        border: 0;
    }

    /deep/.van-button__text {
        line-height: .6rem;
    }
}
</style>
