<template>
<transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
        <div class="confirm-wrapper">
            <div class="confirm-content">
                <div class="text-tit">
                    请选择提现方式
                </div>
                <div class="text">
                    <van-button plain type="info" :class="{isActive1}" size="large" @click="actiSubmit(1)">线上提现</van-button>
                </div>
                <div class="text">
                    <van-button plain type="info" :class="{isActive2}" size="large" @click="actiSubmit(2)">线下提现</van-button>
                </div>
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
            value: '',
            subMethod: '', //提现方式
            isActive1: false, //激活提现按钮css
            isActive2: false, //激活提现按钮css
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
            //console.log(this.subMethod == '')
            if (this.subMethod) {
                this.$emit('confirm', this.subMethod)
            } else {
                Toast.fail('请选择提现方式')
            }

        },
        allMoney() {
            this.value = this.text
        },
        //选择提现方式
        actiSubmit(val) {
            if (val == 1) {
                this.isActive1 = true
                this.isActive2 = false
            } else if (val == 2) {
                this.isActive1 = false
                this.isActive2 = true
            }
            // console.log(val)
            this.subMethod = val

        }
    }
}
</script>

<style lang="less" scoped>
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

        /deep/.van-button--plain.van-button--info {
            color: #27cdd0;
            border: 1px solid #27cdd0;
        }

        .text {
            padding: 30px 40px 0 40px;
            line-height: .35rem;
            text-align: left;
            font-size: 26px;
            color: #333;

            .isActive1 {
                color: #fff;
                background-color: #27cdd0;
            }

            .isActive2 {
                color: #fff;
                background-color: #27cdd0;
            }
        }

        .text-tit {
            padding: 10px 40px;
            line-height: .32rem;
            text-align: left;
            font-size: .28rem;
            color: #333;
            margin-top: .2rem;
            padding-bottom: .2rem;
        }

        .operate {
            margin-top: .2rem;
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
