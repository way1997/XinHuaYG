<template>
<transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
        <div class="confirm-wrapper">
            <div class="confirm-content">
                <p class="text">
                    <span style="font-size:.23rem">请输入提现金额</span>
                    <van-field v-model="value" label="¥" placeholder="请输入金额" />
                </p>
                <p class="text-tit">
                    您的账户余额 {{text}} 元, <span @click="allMoney">全部提现</span>
                </p>
                <div class="operate">
                    <div class="operate-btn left" @click="cancel" v-if="cancelHide">{{cancelBtnText}}</div>
                    <div class="operate-btn" @click="confirm">{{confirmBtnText}}</div>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import {
    Toast
} from 'vant'
export default {

    props: {
        text: {
            type: String,
            default: ''
        },
        confirmBtnText: {
            type: String,
            default: '确定'
        },
        cancelBtnText: {
            type: String,
            default: '取消'
        },
        cancelHide: {
            type: Boolean,
            default: true
        },

    },
    created() {},
    data() {
        return {
            showFlag: false,
            value: ''
        }
    },
    methods: {
        show() {
            this.showFlag = true
        },
        hide() {
            this.showFlag = false
        },
        cancel() {
            this.hide()
            this.$emit('cancel')
        },
        confirm() {
            //this.hide()  操作成功在隐藏
            //console.log(isNaN(this.value))
            if (isNaN(this.value)) {
                Toast.fail('您没有输入金额，无法提现');
            } else {
                let celMoney = Number(this.text)
                let valMoney = Number(this.value)

                if (!this.value) {
                    Toast.fail('您没有输入金额，无法提现');
                } else {
                    if (valMoney == NaN) {
                        Toast.fail('您输入有误，无法提现');
                    }
                    if (valMoney <= 0) {
                        Toast.fail('您输入金额有误，无法提现');
                    } else if (valMoney > celMoney) {
                        Toast.fail('您输入金额超过账户总额，无法提现');
                    } else {
                        this.$emit('confirm', valMoney)
                    }
                }
            }

        },
        allMoney() {
            this.value = this.text
        }
    }
}
</script>

<style lang="less" scoped>
/deep/.van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 20px 0px;
    margin-top: .2rem;
    overflow: hidden;
    color: #323233;
    font-size: .32rem;
    line-height: .32rem;
    background-color: #fff;
    border-bottom: 1px solid #eee
}

/deep/.van-field__label {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    box-sizing: border-box;
    width: .8em;
    margin-right: 2px;
    color: #252525;
    text-align: left;
    word-wrap: break-word;
    font-size: .35rem;
    line-height: 0.35rem;
}

/deep/ .van-field__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: #323233;
    line-height: inherit;
    font-size: .35rem;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;
}

.confirm {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .2);

    &.confirm-fade-enter-active {
        animation: confirm-fadein 0.3s;
    }

    .confirm-content {
        animation: confirm-zoom 0.3s;
    }

    .confirm-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
    }

    .confirm-content {
        width: 530px;
        text-align: center;
        border-radius: 13px;
        background: #fff;
        display: flex;
        flex-direction: column;

        .text {
            padding: 30px 40px 0 40px;
            line-height: .35rem;
            text-align: left;
            font-size: 26px;
            color: #333;

        }

        .text-tit {
            padding: 10px 40px;
            line-height: .32rem;
            text-align: left;
            font-size: .28rem;
            color: #333;
            margin-top: .2rem;
            padding-bottom: .2rem;

            span {
                color: #2a62e0;
            }
        }

        .operate {
            display: flex;
            align-items: center;
            text-align: center;
            font-size: 28px;

            .operate-btn {
                flex: 1;
                line-height: 130px;
                border-top: 1px solid #dedede;
                color: #666;

                &.left {
                    border-right: 1px solid #dedede;
                }
            }
        }
    }
}

@keyframes confirm-fadein {
    0% {
        opacity: 0
    }

    100% {
        opacity: 1
    }
}

@keyframes confirm-zoom {
    0% {
        transform: scale(0)
    }

    50% {
        transform: scale(1.1)
    }

    100% {
        transform: scale(1)
    }
}
</style>
