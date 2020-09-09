<template>
<transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
        <div class="confirm-wrapper">
            <div class="confirm-content">
                <p class="text">{{text}}</p>
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
        }
    },
    data() {
        return {
            showFlag: false
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
            this.$emit('confirm')
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
        width: 70.66;
        text-align: center;
        border-radius: 13px;
        background: #fff;
        display: flex;
        flex-direction: column;

        .text {
            padding: 70px 0;
            line-height: 22px;
            text-align: center;
            font-size: 26px;
            color: #333;
        }

        .operate {
            display: flex;
            align-items: center;
            text-align: center;
            font-size: 28px;

            .operate-btn {
                flex: 1;
                line-height: 100px;
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
