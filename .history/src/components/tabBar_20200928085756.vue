<template>
<div class="TabBar">
    <div class="bottom-tab">
        <div class="tab-item" @click="didClickedItem(0)">
            <img :src="'/indexPage' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="医馆">
            <span :class="{active: '/indexPage' === $route.path}" style="font-size: 0.3rem;">首页</span>
        </div>
        <div class="tab-item" @click="didClickedItem(1)">
            <img :src="'/zixunDoctor' === $route.path ? tabBarImgArr[1].selected : tabBarImgArr[1].normal" alt="咨询">
            <span :class="{active: '/zixunDoctor' === $route.path}" style="font-size: 0.3rem;">咨询</span>
        </div>
        <div class="tab-item" @click="didClickedItem(2)">
            <img :src="'/mine' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal" alt="我的">
            <span :class="{active: '/mine' === $route.path}" style="font-size: 0.3rem;">个人中心</span>
        </div>

    </div>
    <div class="tabNums" v-if="tabBarnum!=0">{{tabBarnum}}</div>
    <div class="totalNum" v-show="totalNum!=0">{{totalNum}}</div>
</div>
</template>

<script>
import {
    findChatPatient,
} from "api/doctor"
import {
    findChatDoctor
} from "api/patient"
import router from '../router'
import cookie from "js-cookie"
import wx from "weixin-js-sdk"
import $ from 'jquery'
export default {
    name: "TabBar",
    props: [],
    data() {
        return {
            tabBarImgArr: [ //图片切换
                {
                    normal: require('../assets/img/huanzhe.png'),
                    selected: require('../assets/img/huanzhe1.png')
                },
                {
                    normal: require('../assets/img/xiaoxi.png'),
                    selected: require('../assets/img/xiaoxi1.png')
                },
                {
                    normal: require('../assets/img/user.png'),
                    selected: require('../assets/img/user1.png')
                }
            ],
            actives: [true, false, false, false],
            tabBarnum: 0,
            totalNum: 0,
            token: '',
            patientId: '',
        }
    },
    created() {
        this.token = cookie.get("token");
        this.patientId = cookie.get("patientId");
        // console.log(this.token);
        // console.log(this.patientId)
        this.findChatDoctor()
    },
    computed: {

    },

    methods: {
        didClickedItem: function (tag) {
            if (tag === 0) {
                this.actives = this.actives.map(function () {
                    return false;
                });
                this.actives[0] = true;
                this.$router.replace('/indexPage');
            } else if (tag === 1) {
                this.actives = this.actives.map(function () {
                    return false;
                });
                this.actives[1] = true;
                this.$router.push('/zixunDoctor');
            } else if (tag === 2) {
                this.actives = this.actives.map(function () {
                    return false;
                });
                this.actives[2] = true;
                this.$router.push('/mine');
            }
        },
        findChatDoctor() {
            let list = {
                token: this.token,
                patientId: this.patientId
            }
            // console.log(list);
            findChatDoctor(list).then((res) => {
                // console.log(res);
                if (res.data.length == 0) {
                    this.totalNum = 0;
                } else {
                    for (var i = 0; i < res.data.length; i++) {
                        this.totalNum += (res.data[i].sum) * 1
                    }
                    //console.log(this.totalNum)
                }
            })
        }
    },
    components: {

    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.bottom-tab {
    width: 100%;
    height: 1.2rem;
    background-color: #fff;
    position: fixed;
    left: 0px;
    bottom: 0px;
    display: flex;
    z-index: 999;
    box-shadow: 0px 0px 10px 0px rgba(4, 0, 0, 0.11);
}

.tab-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.18rem;
    color: #979797;
    border-right: 1px solid #e9e9e9;

    &:nth-of-type(3) {
        border: none;
    }
}

img {
    width: 48px;
    height: 48px;
    margin-bottom: 0.08rem;
}

.active {
    color: #3acbc8;
}

.tabNums {
    position: fixed;
    bottom: .7rem;
    right: .5rem;
    width: .3rem;
    height: .3rem;
    border-radius: 50%;
    color: #fff;
    background: red;
    font-size: .22rem;
    text-align: center;
    line-height: .3rem;
    z-index: 999;
}

.totalNum {
    width: 0.3rem;
    height: 0.3rem;
    position: fixed;
    bottom: 0.7rem;
    right: 40%;
    background: red;
    color: #fff;
    font-size: 22px;
    border-radius: 50%;
    text-align: center;
    line-height: 0.3rem;
    z-index: 999;
}
</style>
