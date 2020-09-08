<template>
<div class="dangan">
    <div class="backHome" @click="goBack">返回上一级</div>
    <div class="xian" style="clear:both;"></div>
    <div class="xinxiBox" v-for="(item,index) in danganChengyuan" :key="index" @click="showDeleteButton(item.id)" @touchend="emptyTime">
        <div class="xinxiLeft">
            <div class="name">{{item.archivesName}}</div>
            <div class="sexBox">
                <div class="sex">{{item.gender==0?'男':'女'}}</div>
                <div class="age">{{item.age}}岁</div>
            </div>
        </div>
        <img src="../assets/img/zhuangshi01.png" class="zhuangshi">
        <div class="xinxiRight">
            <img src="../assets/img/chakandangan.png" class="chakan" @click="goDetail(item.id)">
        </div>
    </div>

    <div class="newBankcardBtnBox">
        <div class="newBankcardBtn" @click="goadd">添加家庭联系人</div>
    </div>
    <confirm text="确定删除此条成员信息吗" ref="confirm" @cancel="newAnswerGo" @confirm="deleteBTn"></confirm>
</div>
</template>

<script>
import {
    selectByIdArchives,
    deleteArchives
} from 'api/patient'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import confirm from 'base/confirm/confirm'
export default {
    name: "dangan",
    data() {
        return {
            pageName: '健康档案',
            token: '',
            patientId: '',
            ifMyself: false,
            danganChengyuan: [],
            Loop: null,
            newAnswer: false,
            chengId: ''
        }
    },
    created() {
        this.token = cookie.get("token");
        this.patientId = cookie.get("patientId");
        this.selectByIdArchives();
    },
    computed: {

    },

    methods: {
        goBack() {
            this.$router.push('/mine')
        },
        selectByIdArchives() {
            let list = {
                token: this.token,
                patientId: this.patientId
            }
            selectByIdArchives(list).then((res) => {
                this.danganChengyuan = res.archives;
                for (var i = 0; i < res.archives.length; i++) {
                    if (res.archives[i].relationship == '自 己') {
                        //console.log(res.archives.relationship[i])
                        this.ifMyself = true;
                        return false;
                    }
                }

            })
        },
        showDeleteButton(id) {
            clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
            this.Loop = setTimeout(function () {
                //alert("长按了")
                this.chengId = id;
                this.$refs.confirm.show();
            }.bind(this), 1000);
        },
        emptyTime() {
            clearTimeout(this.Loop);
        },
        newAnswerGo() {
            this.$refs.confirm.hide();
        },
        deleteBTn() {
            let list = {
                token: this.token,
                id: this.chengId
            }
            deleteArchives(list).then((res) => {
                if (res.type == true) {
                    this.$toast('删除成功')
                    this.$refs.confirm.hide();
                    this.selectByIdArchives();
                } else {
                    this.$toast(res.massage)
                }
            })
        },
        goDetail(id) {
            this.$router.push({
                path: "/chengyuanxinxi",
                query: {
                    id: id,
                    ifMyself: this.ifMyself
                }
            });
        },
        goadd() {
            this.$router.push({
                path: "/chengyuanadd",
                query: {
                    ifMyself: this.ifMyself
                }
            });
        }
    },
    components: {
        HeadTop,
        confirm
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

/* pages1/jiankangdangan/jiankangdangan.wxss */
page {

    background: #f1f1f1;
}

.backHome {
    width: 81.4%;
    height: 0.76rem;
    background: #00afc2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    color: #fff;
    font-size: 0.25rem;
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

/*个人信息*/
.xinxiBox {
    width: calc(100% - 6rem);
    min-height: 1.20rem;
    margin: .30rem;
    background-color: #fff;
    border-radius: .16rem;
    -webkit-box-shadow: 0.1rem 0.1rem 0.2rem #dbdbdb;
    box-shadow: 0.1rem 0.1rem 0.2rem #dbdbdb;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.xinxiLeft {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    margin: .30rem 0 .30rem .40rem;
}

.name {
    font-size: .34rem;
    color: #666666;
    letter-spacing: 2px;
}

.sexBox {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    margin-top: .12rem;
    font-size: .30rem;
    color: #999999;
}

.age {
    margin-left: .10rem;
}

.zhuangshi {
    width: 2.68rem;
    height: 1.60rem;
}

.xinxiRight {
    width: 1.60rem;
    height: 1.60rem;
    background-color: #fcbd0e;
    display: flex;
    justify-content: center;
    align-items: center;
}

.xinxiRight:active {
    background-color: #ebae08;
}

.chakan {
    width: 1.10rem;
    height: 1.10rem;
    border: 1px dashed #fff;
    border-radius: .08rem;
}

/*添加按钮*/
.newBankcardBtnBox {
    width: calc(100% - 6rem);
    margin: .30rem;
    background-color: #fff;
    height: 2.60rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .16rem;
    box-shadow: .10rem .10rem .20rem #dbdbdb;
}

.newBankcardBtn {
    width: 60%;
    height: .80rem;
    background-color: #00b0c2;
    color: #fff;
    font-size: .32rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .8rem;
}

.newBankcardBtn:active {
    background-color: #0192b3;
}

.zhezhao {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

.enter {
    width: 90%;
    height: 3rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 99999;
    border-radius: 0.2rem;
}

.enter .guanbi {
    width: 0.45rem;
    height: 0.45rem;
    position: absolute;
    top: -0.4rem;
    right: 0.1rem;
}

.enter .enter_tit {
    width: 100%;
    text-align: center;
    font-size: 0.34rem;
    color: #333;
    padding-top: 0.4rem;
}

.enter .enter_but {
    width: 100%;
    padding-top: 0.4rem;
}

.enter .enter_but button {
    width: 2rem;
    height: 0.8rem;
    background: none;
    color: #333;
    font-size: 0.32rem;
    border-radius: 0.2rem;
    margin-left: 0.6rem;
    border: 1px solid #f1f1f1;

    &:nth-of-type(2) {
        background: #00b0c2;
        border: none;
        color: #fff;
    }
}
</style>
