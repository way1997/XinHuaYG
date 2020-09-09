<template>
<div class="userAddress">
    <div class="backHome" @touchstart="goBack">返回上一级</div>
    <div class="xian"></div>
    <div class="list">
        <div v-for="(item,index) in shou" :key="index">
            <div>{{item.recipient}} {{item.repPhone}}<span @touchstart="deleteAdd(item.recipientId)"><img src="../assets/img/delete1.png" alt="">删除</span></div>
            <div>{{item.address}}<span @touchstart="goDizhi(item)"><img src="../assets/img/bianji.png" alt="">编辑</span></div>
        </div>
    </div>
    <div class="queren" @touchstart="goAdd">
        添加新地址
    </div>
    <confirm :text="tipText" ref="confirm" @cancel="cancel" @confirm="confirm"></confirm>
</div>
</template>

<script>
import {
    addressList,
    deleteAddress
} from "api/patient"
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
import confirm from 'base/confirm/confirm'
export default {
    name: "userAddress",
    data() {
        return {
            token: '',
            patientId: '',
            shou: [],
            tipText: '确定要删除此地址吗？',
            addressId: ''
        }
    },
    created() {
        this.token = cookie.get('token');
        this.patientId = cookie.get('patientId');
        this.addressList();
    },
    computed: {

    },

    methods: {
        addressList() {
            let list = {
                token: this.token,
                patientId: this.patientId
            }
            addressList(list).then((res) => {
                //console.log(res);
                this.shou = res.data;
            })
        },
        cancel() {
            this.$refs.confirm.hide();
        },
        confirm() {
            let list = {
                token: this.token,
                addressId: this.addressId
            }
            deleteAddress(list).then((res) => {
                if (res.type == true) {
                    this.$refs.confirm.hide();
                    this.addressList();
                } else {
                    this.$refs.confirm.hide();
                    this.$toast(res.massage)
                }
            })
        },
        deleteAdd(addressId) {
            this.addressId = addressId;
            this.$refs.confirm.show();
        },
        goDizhi(item) {
            this.$router.push({
                path: '/addDizhi',
                query: {
                    item: JSON.stringify(item)
                }
            })
        },
        goBack() {
            this.$router.push('/mine')
        },
        goAdd() {
            this.$router.push('/addDizhi')
        }
    },
    components: {
        confirm
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.backHome {
    width: 81.46%;
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
    height: .1rem;
    background: #efefef;
    clear: both;
}

.list {
    width: 100%;

    >div {
        width: 100%;
        height: 1.69rem;
        border-bottom: 0.01rem solid #e4e4e4;

        div {
            padding: 0 .3rem;

            span {
                color: #00B0C2;
                float: right;

                img {
                    width: .29rem;
                    height: .3rem;
                    vertical-align: middle;
                    margin: 0 .1rem;
                }
            }
        }

        div:nth-of-type(1) {
            font-size: 0.25rem;
            color: #757575;
            text-indent: -.1rem;
            padding-top: 0.5rem;
        }

        div:nth-of-type(2) {
            font-size: 0.22rem;
            text-indent: -.1rem;
            color: #B7B7B7;
            padding-top: 0.25rem;
        }
    }
}

.queren {
    width: 81.46%;
    height: 0.76rem;
    background: #00B0C2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    font-size: .3rem;
    color: #fff;
    margin: 0 auto;
    margin-top: 0.8rem;
}
</style>
