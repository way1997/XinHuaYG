<template>
<div class="addDizhi">
    <img src="../assets/img/LODING.gif" alt="" class="loading" v-if="loadUp">
    <div class="xinxi">
        <label>收货人:</label>
        <input type="text" placeholder="填写收货人姓名" v-model="sxm">
    </div>
    <div class="xinxi">
        <label>联系方式:</label>
        <input type="text" placeholder="填写联系方式" v-model="sjh">
    </div>
    <div class="xinxi">
        <label>所在地区:</label>
        <!-- <input type="text" placeholder="填写所在地区" @click="chooseDizhi "> -->
        <div class="picker" @click="chooseDizhi">
            {{shengtext}}{{shitext}}{{qutext}}
        </div>
    </div>
    <div class="xinxi">
        <label>详细地址:</label>
        <input type="text" placeholder="填写详细地址" v-model="address">
    </div>
    <div class="shezhi">
        <p>设置默认地址</p>
        <p>提醒：每次下单默认推荐使用该地址</p>
        <img :src="kaiguan==0?require('../assets/img/kaiguan.png'):require('../assets/img/kaiguan1.png')" alt="" @click="changeKai">
    </div>
    <div class="queren" @click="patientAddAdress">
        确认保存
    </div>
    <div class='quxiao' @click="goBack">取消并返回</div>

    <div class='zhezhao' v-show="yincang" @click="hideAddress"></div>
    <div class='xinti' v-show="yincang">
        <div class='tan_content'>
            <!-- 省 -->
            <div class='sheng' v-show="sheng1" v-for="(item,index) in sheng" :key="index" @click="getCity(item.id,item.name)">{{item.name}}</div>

            <div class='sheng' v-show="shi1" v-for="(item,index) in shi" :key="index+'1'" @click="getArea(item.id,item.name)">{{item.name}}</div>
            <div class='sheng' v-show="qu1" v-for="(item,index) in qu" :key="index+'2'" @click="chooseXian(item.name,item.id)">{{item.name}}</div>
        </div>
    </div>
</div>
</template>

<script>
import {
    findByAllPay,
    getProvince,
    getCity,
    getArea,
    patientAddAdress,
    addressFindOne,
    patientUpdAdress
} from 'api/patient'
import HeadTop from 'base/header/header'
import router from '../router'
import cookie from "js-cookie"
export default {
    name: "addDizhi",
    data() {
        return {
            loadUp: true,
            yincang: false,
            sheng1: true,
            shi1: false,
            qu1: false,
            loadUp: false,
            sheng: [],
            shi: [],
            qu: [],
            token: '',
            patientId: '',
            sxm: '',
            sjh: '',
            address: '',
            area: '',
            result: '',
            shengtext: '请选择地区',
            shitext: '',
            qutext: '',
            kaiguan: 0,
            item: '',
            recipientId: ''
        }
    },
    created() {
        this.token = cookie.get('token');
        this.patientId = cookie.get('patientId');
        if (this.$route.query.item) {
            this.item = JSON.parse(this.$route.query.item);
            this.sxm = this.item.recipient;
            this.sjh = this.item.repPhone;
            this.recipientId = this.item.recipientId;
            this.addressFindOne();
        }
        this.getProvince();
    },
    computed: {

    },

    methods: {
        changeKai() {
            this.kaiguan = !this.kaiguan;
            //console.log(this.kaiguan)
        },
        chooseDizhi() {
            this.yincang = true;
        },
        hideAddress() {
            this.yincang = false;
        },
        goBack() {
            this.$router.go(-1)
        },
        addressFindOne() {
            this.loadUp = true
            let list = {
                token: this.token,
                recipientId: this.recipientId
            }
            addressFindOne(list).then((res) => {
                //              	alert(JSON.stringify(res));
                console.log(res);
                this.loadUp = false;
                this.shengtext = res.provinceName;
                this.shitext = res.cityName;
                this.qutext = res.areaName;
                this.address = res.address;
                this.area = res.areaId;
                this.kaiguan = res.isDefault;
            })
        },
        patientAddAdress() {

            let addressStr = this.address.replace(/\s+/g, "")
            //console.log(addressStr)
            if (this.test()) {
                if (this.$route.query.item) {

                    let list = {
                        recipient: this.sxm,
                        area: this.area,
                        adress: addressStr,
                        id: this.recipientId,
                        phone: this.sjh,
                        token: this.token,
                        isDefault: Number(this.kaiguan),
                        kaiguan: Number(this.kaiguan)
                    }
                    // console.log(list.adress)
                    console.log(list);
                    //                       alert(JSON.stringify(list));
                    patientUpdAdress(list).then((res) => {
                        if (res.info == 2015) {
                            this.$toast('修改成功')
                            this.$router.go(-1);
                        } else {
                            this.$toast('添加失败')
                        }
                    })
                } else {
                    let list = {
                        recipient: this.sxm,
                        area: this.area,
                        adress: this.address,
                        patientId: this.patientId,
                        phone: this.sjh,
                        token: this.token,
                        isDefault: Number(this.kaiguan),
                        kaiguan: Number(this.kaiguan)
                    }
                    console.log(list)
                    //                      alert(JSON.stringify(list));
                    patientAddAdress(list).then((res) => {
                        if (res.info == 2015) {
                            this.$toast('添加成功')
                            this.$router.go(-1);
                        } else {
                            this.$toast('添加失败')
                        }
                    })
                }
            }
        },
        getProvince() { //省
            getProvince().then((res) => {
                this.sheng = res.list;
            })
        },
        getCity(parentId, name) { //市
            let list = {
                parentId: parentId
            }
            this.shitext = '';
            this.qutext = '';
            this.shi = [];
            this.qu = [];
            this.shengtext = name;
            this.sheng1 = false;
            this.shi1 = true;
            this.qu1 = false;
            getCity(list).then((res) => {
                this.shi = res.list;
            })
        },
        getArea(parentId, name) { //县
            let list = {
                parentId: parentId
            }
            this.area = parentId;
            this.shitext = name;
            this.sheng1 = false;
            this.shi1 = false;
            this.qu1 = true;
            getArea(list).then((res) => {
                this.qu = res.list;
                if (this.qu.length == '') {
                    this.yincang = false;
                    this.sheng1 = true;
                    this.shi1 = false;
                    this.qu1 = false;
                }
            })
        },
        chooseXian(name, area) {
            this.qutext = name;
            if (this.qu.length != 0) {
                this.area = area;
            }
            this.yincang = false;
            this.sheng1 = true;
            this.shi1 = false;
            this.qu1 = false;
        },

        test() {
            if (this.sxm == '') {
                this.$toast('请输入姓名')
                return false;
            } else if (this.sjh == '') {
                this.$toast('请输入手机号')
                return false;
            } else if (!(/^1[3|4|5|7|8|6|9]\d{9}$/.test(this.sjh))) {
                this.$toast('手机号码格式不正确');
                return false;
            } else if (this.area == '' && !this.$route.query.item) {
                this.$toast('请选择地址');
                return false;
            } else if (this.address == '') {
                this.$toast('请填写详细地址');
                return false;
            } else {
                return true;
            }
        }
    },
    components: {

    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

.loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.addDizhi {
    width: 100%;
    padding-top: 0.25rem;

    .xinxi {
        width: 100%;
        height: 1.08rem;
        border-bottom: 0.01rem solid #f5f5f5;
        line-height: 1.08rem;

        label {
            font-size: 0.28rem;
            color: #828282;
            float: left;
            width: 24%;
            padding-left: 0.2rem;
            padding-right: 0.3rem;
        }

        input,
        div {
            float: left;
            width: 52%;
            height: 0.54rem;
            border: 0.01rem solid #dadada;
            font-size: 0.27rem;
            line-height: .27rem;
            padding-left: 0.2rem;
            border-radius: 0.1rem;
            margin-top: 0.25rem;
            color: #828282;
        }

        div {
            line-height: .54rem;
            color: #828282;
        }
    }
}

input::-webkit-input-placeholder {
    color: #c9c9c9;
    font-size: .28rem;
}

.shezhi {
    position: relative;

    p:nth-of-type(1) {
        font-size: .28rem;
        color: #797979;
        padding: 0.38rem 0 0 0.25rem;
    }

    p:nth-of-type(2) {
        font-size: 0.28rem;
        color: #AFAFAF;
        padding: 0.2rem 0 0 0.25rem;
    }

    img {
        width: 1.01rem;
        height: 0.53rem;
        position: absolute;
        right: 0.2rem;
        top: 0.4rem;
    }
}

.queren {
    width: 81.4%;
    height: 0.76rem;
    background: #00B0C2;
    border-radius: 0.13rem;
    text-align: center;
    line-height: 0.76rem;
    font-size: 0.32rem;
    color: #fff;
    margin: 0 auto;
    margin-top: 0.8rem;
}

.quxiao {
    width: 100%;
    text-align: center;
    font-size: .28rem;
    color: #00B0C2;
    padding-top: .50rem;
}

.zhezhao {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 999999;
}

.xinti {
    box-sizing: border-box;
    width: 100%;
    height: 6.64rem;
    float: left;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    z-index: 999999;
    overflow-y: scroll;
}

.tan_content {
    width: 100%;
    box-sizing: border-box;
    padding-top: .20rem;
    margin-top: .10rem;
    height: 6.53rem;
    overflow-y: scroll;

}

::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
}

.tan_content div {
    line-height: .70rem;
    padding: 0 .12rem;
    box-sizing: border-box;
    text-align: center;
    font-size: .30rem;
    border-bottom: 1px dashed #d2d2d2;
}

.sheng {
    width: 100%;
    float: left;
    text-align: center;
    font-size: .30rem;
    line-height: .70rem;
    color: #222;
}
</style>
