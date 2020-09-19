<template>
<div class="mobanList">
    <div class="back" @click="goBack">返回上一级</div>
    <div class="search"><input type="text" placeholder="输入药方名称进行搜索" v-model="modelName"><em class="searchEm" @click="findModelByShape">搜索</em></div>
    <div class="xian" style="clear:both;"></div>
    <div class="detail">
        <div v-for="(item,index) in moban" :key="index">
            <div><span>名称:</span>{{item.modelName}}　<p><em @click="deleteM(item.modelId)">删除</em><em @click="xiugaiM(item.modelId)">修改</em></p>
            </div>
            <div>
                <span>内容:</span>
                <label> <em v-for="(item,index) in item.list" :key="index">{{item.medicineName}}{{item.howWeight}}g、</em> </label>
            </div>
        </div>
    </div>
    <div class="add" @click="goAddm">新增药方</div>
    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp">
    <confirm :text="tipText" ref="confirm" @cancel="cancel" @confirm="confirm"></confirm>
</div>
</template>

<script>
import {
    findModelByShape,
    deleteModel
} from "api/doctor"
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import confirm from 'base/confirm/confirm'
export default {
    name: "mobanList",
    data() {
        return {
            token: '',
            doctorId: '',
            moban: [],
            tipText: '确定要删除此药方模版吗？',
            modelId: '',
            loadUp: true,
            modelName: ''
        }
    },
    created() {
        this.token = cookie.get("token");
        this.doctorId = cookie.get("doctorId");
        this.findModelByShape()
    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.push('/moban')
        },
        goAddm() {
            this.$router.push({
                path: '/addMoban',
                query: {
                    shapeId: this.$route.query.shapeId,
                    brandId: this.$route.query.brandId
                }
            })
        },
        xiugaiM(modelId) {
            this.$router.push({
                path: '/addMoban',
                query: {
                    modelId: modelId,
                    shapeId: this.$route.query.shapeId,
                    brandId: this.$route.query.brandId
                }
            })
        },
        findModelByShape() {
            let list = {
                token: this.token,
                doctorId: this.doctorId,
                modelName: this.modelName,
                shapeId: this.$route.query.shapeId,
                brandId: this.$route.query.brandId,
                type: this.$route.query.type
            }
            findModelByShape(list).then((res) => {
                this.moban = res.lists;
                this.loadUp = false;
            })
        },

        cancel() {
            this.$refs.confirm.hide();
        },
        deleteM(modelId) {
            this.modelId = modelId;
            this.$refs.confirm.show();
        },
        confirm() {
            let list = {
                token: this.token,
                modelId: this.modelId
            }
            deleteModel(list).then((res) => {
                if (res.type == true) {
                    this.$toast('删除成功')
                    this.$refs.confirm.hide();
                    this.findModelByShape();
                } else {
                    this.$toast(res.massage)
                }
            })
        },
    },
    components: {
        confirm
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.mobanList {
    padding-bottom: 110px;
}

.back {
    width: 200px;
    height: 76px;
    background: #00afc2;
    border-radius: 13px;
    text-align: center;
    line-height: 76px;
    color: #fff;
    font-size: 25px;
    float: left;
    margin: 15px 20px 15px 20px;
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
    border-radius: 38px;
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
        border: 1px solid #cecece;
    }

    input::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size: 25px;
    }
}

.detail {
    width: 100%;

    >div {
        padding: 0 32px 0 44px;
        height: 247px;
        border-bottom: 1px solid #f5f5f5;

        div {
            font-size: 24px;
            color: #727272;
            padding-top: 30px;

            &:nth-of-type(1) {
                padding-top: 40px;

                p {
                    float: right;
                    margin-top: -20px;
                }

                em {
                    width: 116px;
                    height: 47px;
                    float: left;
                    background: #42CAC6;
                    border-radius: 13px;
                    margin-right: 12px;
                    color: #fff;
                    text-align: center;
                    line-height: 47px;
                }
            }

            span {
                float: left;
                padding-right: 10px;
            }

            label {
                float: left;
                width: 90%;
                line-height: 43px;
                margin-top: -10px;
            }
        }
    }
}

.add {
    width: 748px;
    height: 102px;
    background: #42CAC6;
    text-align: center;
    line-height: 102px;
    color: #fff;
    font-size: 27px;
    position: fixed;
    bottom: 0;
    left: 0;
}

.loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.searchEm {
    position: absolute;
    right: 40px;
    top: 30px;
    width: 100px;
    height: 50px;
    line-height: 50px;
    color: #00afc2;
    font-size: 24px;
    text-align: center;
    border: 1px solid #00afc2;
    ;
    border-radius: 20px;
}
</style>
