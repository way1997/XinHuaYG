<template>
<div class="page2">
    <div class="backHome" @click="goBack">返回上一级</div>

    <div class="bg-white mb-1 flex flex__v" v-for="(value,index) in list" :key="index">
        <div class="border-bottom">
            <div class="mt-1 ml-1 f-600 mb-1">{{value.title}}</div>
        </div>
        <div class="mt-1 ml-1 mr-1 mb-1" style="font-size: 0.3rem;">
            <div class="flex flex__justify">
                <div style="margin-top: 0.1rem;color:#a09797">发布日期 - {{value.proclamationDate}}</div>
                <div class="godetailBtn" @click="goProclamation(value.proclamationId)">查看公告</div>
            </div>
            <div style='font-size:.28rem;line-height:.4rem' class="mt-1">{{value.proclamationContent}}</div>
        </div>
    </div>
    <confirm :text="tipText" ref="confirm" @cancel="cancel" @confirm="confirm"></confirm>
</div>
</template>

<script>
import {
    proclamationList
} from "api/patient";

import HeadTop from 'base/header/header'
import router from '../router'
import $ from 'jquery'
import cookie from "js-cookie"
import confirm from 'base/confirm/confirm'
export default {
    name: "page2",
    data() {
        return {
            list: '',
            cardid: '',
            tipText: '’',
            doctorId: ''
        };
    },
    created() {
        //$('html').css('font-size', '15px');
        this.doctorId = this.$route.query.doctorId
        this.showgonggao();
        console.log(this.doctorId)
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        showgonggao() {
            let token = this.$route.query.token;
            let doctorId = this.doctorId
            //console.log(this.doctorId)
            let list = {
                token: token,
                doctorId: doctorId,
            };
            console.log(list)
            proclamationList(list).then((res) => {
                console.log(res)
                this.list = res.data;
            });

        },
        goProclamation(id) {
            //console.log(id, this.token)
            this.proclamationId = id
            this.$router.push({
                name: 'proclamation',
                query: {
                    proclamationId: this.proclamationId,
                }
            })
        },
        tixian() {
            this.$refs.confirm.show();
        },
        cancel() {
            this.$refs.confirm.hide();
        },
        confirm() {
            let cardid = this.cardid;
            let token = cookie.get("token");
            if (cardid != "") {
                let list = {
                    token: token,
                    proclamationId: cardid,
                };
                deleteProclamation(list).then((res) => {
                    console.log(res)
                    alert(res.massage);
                    this.cancel();
                    this.$router.go(0);
                });
            }
        },
        detial() {
            this.$router.push("/gonggaodetail")
        },
        del(card) {
            console.log(card);
            this.cardid = card;
            this.tipText = "您确定删除此公告吗？";
            this.$refs.confirm.show();
        },
        edit(card) {
            console.log(card);
            this.$router.push({
                name: 'gonggaoedit',
                params: {
                    proclamationId: card
                }
            })
        },
    },
    components: {
        confirm
    }
};
</script>

<style lang="less" scoped>
.backHome {
    width: 81.666%;
    height: 0.76rem;
    background: #00afc2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    color: #fff;
    font-size: 0.3rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
}

.page2 {
    font-size: .2rem;

    .flex {
        display: flex;
    }

    .flex__v {
        flex-direction: column;
    }

    .flex__justify {
        justify-content: space-between;
    }

    .flex__center {
        justify-content: center;
        align-items: center;
    }

    .bg-white {
        background: #fff;
    }

    .mt-1 {
        margin-top: 0.3rem;
    }

    .ml-1 {
        margin-left: 0.3rem;
    }

    .mr-1 {
        margin-right: 0.3rem;
    }

    .mb-1 {
        margin-bottom: 0.2rem;
    }

    .f-600 {
        font-weight: 600;
    }

    .border-bottom {
        border-bottom: 1px solid #eee;
    }

    .img {
        display: inline-block;
        width: 1rem;
        height: 1rem;

        img {
            width: 1rem;
            height: 1rem;
        }
    }

    .icon-1 {
        width: .3rem;
        height: .3rem;
        margin-left: 0.3rem;
    }

    .border-radius {
        width: .8rem;
        height: .8rem;
        border-radius: 100%;
        background: #0cb4c5;
        line-height: 3rem;

        img {
            width: 80%;
            height: 80%;
        }
    }

    .f-3 {
        font-size: 3rem;
        color: #fff;
    }

    .godetailBtn {
        width: 23%;
        height: 0.42rem;
        background: #00afc2;
        border-radius: 0.13rem;
        text-align: center;
        line-height: 0.44rem;
        font-size: 0.26rem;
        color: #fff;
        padding-left: 0;
        margin-top: .04rem;
    }

}
</style>
