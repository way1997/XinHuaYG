<template>
<div class="proclamation">
    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian" style="clear:both;"></div>
    <div class="content">
        <div class="content_text">
            {{proclaContxt}}
        </div>
        <div class="time">{{proclaConDate}}</div>
        <section class="imgList">
            <p v-for="(item,index) in proclamationImage" :key="index" class="imgBox" @click="sceneImg(device,index)">
                <img :src="item.img" alt="">
            </p>
        </section>
    </div>
</div>
</template>

<script>
import {
    getProclamation
} from 'api/patient'
import {
    ImagePreview
} from "vant"; // 引入Vant图片预览组件
import cookie from "js-cookie"
import router from '../router'
export default {
    name: 'proclamation',
    data() {
        return {
            loadUp: false,
            proclamationId: '',
            token: "",
            proclaContent: "",
            proclaContxt: "",
            proclaConDate: "",
            proclamationImage: "",
            type: 1,
            device: '',

        }
    },
    created() {
        this.token = cookie.get("token");
        this.proclamationId = this.$route.query.proclamationId;
        this.type = this.$route.query.type ? this.$route.query.type : 1
        // console.log(this.token, this.proclamationId)
        this.getProclamation()
    },
    mounted() {

    },
    methods: {
        goBack() {
            // 0 判断是否是微信公众号传过来的值
            if (this.type != 0) {
                this.$router.go(-1)
            } else {
                this.$router.push({
                    name: 'indexPage'
                })
            }

        },
        // 图片预览
        sceneImg(images, index) {
            ImagePreview({
                images: images, //需要预览的图片 URL 数组
                showIndex: true, //是否显示页码
                loop: false, //是否开启循环播放
                startPosition: index //图片预览起始位置索引
            })
        },
        getProclamation() {
            let list = {
                proclamationId: this.proclamationId,
                // proclamationId: '17339b26c1ec400187b1c3f65b373158',
                token: this.token,
            }
            // console.log(list)
            getProclamation(list).then((res) => {
                console.log(res)
                this.proclaContent = res.data
                this.proclaContxt = this.proclaContent.proclamationContent
                this.proclaConDate = this.proclaContent.proclamationDate
                this.proclamationImage = this.proclaContent.proclamationImage
                let prolist = []
                let proclamationImage = this.proclamationImage
                //console.log(proclamationImage.map)
                proclamationImage.map((item, index) => {
                    prolist.push(item.img)
                })
                this.device = prolist
                console.log(this.device)
                console.log(this.proclaContent);

            })
        }
    },

}
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";

.proclamation {
    overflow: hidden;
}

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

.xian {
    width: 100%;
    height: 0.1rem;
    background: #efefef;
    clear: both;
}

.content {
    >div {
        width: 100%;
        margin: 0 auto;
        border-bottom: 1px solid #e9e9e9;
        font-size: .25rem;
        position: relative;
        padding-bottom: 1.6rem;
    }

    .imgList {

        p {
            width: 30%;
            height: 2rem;
            margin: .2rem .1rem;
            vertical-align: middle;
            float: left;

            img {
                width: 100%;
                height: 100%;
            }
        }

    }

    .content_text {
        color: rgb(44, 44, 44);
        font-size: 0.33rem;
        line-height: .49rem;
        padding: .19rem .27rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .time {
        font-size: .24rem;
        text-align: right;
        clear: both;
        color: #9c9c9c;
        line-height: .60rem;
        padding: 0 .27rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
}
</style>
