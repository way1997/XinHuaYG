<template>
  <div class="zaixiankf">
    <div class="buzhou">
      <img src="../assets/img/buzhou1.png" alt="" v-show="step1==0">
      <img src="../assets/img/buzhou2.png" alt="" v-show="step1==1">
      <img src="../assets/img/buzhou3.png" alt="" v-show="step1==2">
      <img src="../assets/img/buzhou4.png" alt="" v-show="step1==3">
    </div>
    <div class="xian"></div>
    <div class="first" v-show="step1==0">
      <div class="info">
        <p><span>患者姓名:</span><label>{{patientName}}</label></p>
        <p><span>患者性别:</span><label>{{patientSex}}</label></p>
        <p><span>患者年龄:</span><label>{{age}}</label></p>
      </div>
      <div class="xian"></div>
      <div class="bianz">
        <p>编写辩证内容</p>
        <textarea name="" id="" cols="" rows="" placeholder="请输入辩证内容" v-model="sickName" @focus="scroollT"></textarea>
      </div>
    </div>
    <div class="second" v-show="step1==1">
      <div class="yangshi"><label>类型:</label>
        <p><span :class="{choose:chooseidx==0}" v-for="(item,index) in yaotype" :key="index" @click="changeType(index,item.label)">{{item.label}}</span></p>
      </div>
      <div class="yangshi"><label>品牌:</label>
        <p><span @click="changePinpai(index,item.id,item.lable)" v-for="(item,index) in medicineManner" :key="index"
            :class="{choose:pinpaiIdx==index}">{{item.lable}}</span></p>
      </div>
      <div class="yangshi"><label>药态:</label>
        <p><span @click="changeYaotai(index,item.shapeId,item.shapeName)" v-for="(item,index) in yaotaiList" :key="index"
            :class="{choose:yaotaiIdx==index}">{{item.shapeName}}</span></p>
      </div>
      <div class="yaofang">
        <span>药方:</span>
        <div class="list">
          </br></br>
          <p v-for="(item,index) in arr" :key="index"><label>{{item.medicineName}}</label><input type="number" readonly
              v-model='item.howWeight' @input="lengthNum(index)" @click="hideYaocai(index)"><em>g</em>
            <img class='guangbiao1' src='../assets/img/gb.gif' v-if="shuzi==index&&jianpanS">
            <img src="../assets/img/delete.png" alt="" @click="deleteYao(index)">
          </p>
          <div class="addMoban" @click="showMedi">编辑药材</div>
          <div class="addMoban" @click="findModelByShape">使用模版/历史</div>

          <div class="jiliang">
            剂量:
          </div>
          <div class="jiliang2">
            </br>共<input type="number" v-model="preNum" :placeholder="preNum1" @focus="qingchu1" @blur="huifu1" @input="shuru1">剂,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;每日<input
              type="number" :placeholder="preOnce1" v-model="preOnce" @focus="qingchu2" @blur="huifu2" @input="shuru2">剂,</br></br>1剂分<input
              type="number" :placeholder="dayNum1" v-model="dayNum" @focus="qingchu3" @blur="huifu3" @input="shuru3">次服用
          </div>
        </div>
      </div>

      <div class="addYao" v-if="showAdd">
        <div id="scrolldIV">
          <p v-for="(item,index) in arr" :key="index">
            <label>{{item.medicineName}}</label>

            <input type="number" readonly v-model='item.howWeight' @input="lengthNum(index)" @click="hideYaocai(index)">
            <img class='guangbiao1' src='../assets/img/gb.gif' v-if="shuzi==index&&jianpanS">
            <em>g</em>

            <img src="../assets/img/delete.png" alt="" @click="deleteYao(index)">
          </p>
        </div>
      </div>
      <div class="yaocaiList" v-show="medicinalWraphid">
        <div class="yaocaiselecet">
          <div class="yaocaiselecets" style="white-space: nowrap;">
            <div class="gundong_box">
              <div class="medicinalWrap" v-for="(item,index) in yaocaiList" :key="index" @click="addYaocai(item)">
                <div>{{item.drugName}}</div>
                <div style="font-size:0.24rem;line-height:0.13rem">￥{{item.price}}</div>
              </div>
              <div v-if="yaocaiListkong" style="color:#828282;padding-left:20px;line-height:50px;">未查询到药材</div>
            </div>
          </div>
        </div>
        <div class="inputWrap">
          <input :type="typeInput" ref="yaocai" readonly @input="selcettext" @click="inputclick" v-model="valuess"
            placeholder="请输入药材简称" style="overflow:visible;position:relative;">
          <img class='guangbiao1' src='../assets/img/gb.gif' v-if="gbxs1">
          <span @click="hideYao">完成</span>
        </div>
        <!--键盘-->
        <div class='keyboard' :style='{display:k1}'>
          <div class='left number'>
            <div data-key="1" hover-class='active' hover-stay-time='100' @click='sz1("1")'>1</div>
            <div data-key="2" hover-class='active' hover-stay-time='100' @click='sz2("2")'>2</div>
            <div data-key="3" hover-class='active' hover-stay-time='100' @click='sz3("3")'>3</div>
            <div data-key="4" hover-class='active' hover-stay-time='100' @click='sz4("4")'>4</div>
            <div data-key="5" hover-class='active' hover-stay-time='100' @click='sz5("5")'>5</div>
            <div data-key="6" hover-class='active' hover-stay-time='100' @click='sz6("6")'>6</div>
            <div data-key="7" hover-class='active' hover-stay-time='100' @click='sz7("7")'>7</div>
            <div data-key="8" hover-class='active' hover-stay-time='100' @click='sz8("8")'>8</div>
            <div data-key="9" hover-class='active' hover-stay-time='100' @click='sz9("9")'>9</div>
            <div data-key="X" hover-class='active' hover-stay-time='100' @click='sz10'><img src='../assets/img/sqjp.png'
                style='width:25px;height:25px;margin-top:12px;'></div>
            <div data-key="0" hover-class='active' hover-stay-time='100' @click='sz0("0")'>0</div>
            <div data-key="." hover-class='active' hover-stay-time='100' @click='sz(".")'>.</div>
          </div>
          <div class='right ctr-btn'>
            <div class='ctr-btn-item' hover-class='active' hover-stay-time='100' @click='clear'><img src='../assets/img/hs.png'
                style='width:25px;height:25px;margin-top:35px;'></div>
            <div class='ctr-btn-item' hover-class='active' hover-stay-time='100' @click='comfromclick'>确认</div>
          </div>
        </div>

        <div class='keyboard02' :style='{display:k2}'>
          <div class='left02 number'>
            <div class='hang'>
              <div data-key="q" hover-class='active' hover-stay-time='100' @click='qq("q")'>Q</div>
              <div data-key="w" hover-class='active' hover-stay-time='100' @click='ww("w")'>W</div>
              <div data-key="e" hover-class='active' hover-stay-time='100' @click='ee("e")'>E</div>
              <div data-key="r" hover-class='active' hover-stay-time='100' @click='rr("r")'>R</div>
              <div data-key="t" hover-class='active' hover-stay-time='100' @click='tt("t")'>T</div>
              <div data-key="y" hover-class='active' hover-stay-time='100' @click='yy("y")'>Y</div>
              <div data-key="u" hover-class='active' hover-stay-time='100' @click='uu("u")'>U</div>
              <div data-key="i" hover-class='active' hover-stay-time='100' @click='ii("i")'>I</div>
              <div data-key="o" hover-class='active' hover-stay-time='100' @click='oo("o")'>O</div>
              <div data-key="p" hover-class='active' hover-stay-time='100' @click='pp("p")'>P</div>
            </div>
            <div class='hang' style='margin:5px 0 5px 5%;'>
              <div data-key="a" hover-class='active' hover-stay-time='100' @click='aa("a")'>A</div>
              <div data-key="s" hover-class='active' hover-stay-time='100' @click='ss("s")'>S</div>
              <div data-key="d" hover-class='active' hover-stay-time='100' @click='dd("d")'>D</div>
              <div data-key="f" hover-class='active' hover-stay-time='100' @click='ff("f")'>F</div>
              <div data-key="g" hover-class='active' hover-stay-time='100' @click='gg("g")'>G</div>
              <div data-key="h" hover-class='active' hover-stay-time='100' @click='hh("h")'>H</div>
              <div data-key="j" hover-class='active' hover-stay-time='100' @click='jj("j")'>J</div>
              <div data-key="k" hover-class='active' hover-stay-time='100' @click='kk("k")'>K</div>
              <div data-key="l" hover-class='active' hover-stay-time='100' @click='ll("l")'>L</div>
            </div>
            <div class='hang'>
              <div data-key="sqjp" hover-class='active' hover-stay-time='100' @click='k2xsclick' style='width:55px'><img
                  src='../assets/img/sqjp.png' style='width:25px;height:25px;margin-top:12px;'></div>
              <div data-key="z" hover-class='active' hover-stay-time='100' @click='zz("z")'>Z</div>
              <div data-key="x" hover-class='active' hover-stay-time='100' @click='xx("x")'>X</div>
              <div data-key="c" hover-class='active' hover-stay-time='100' @click='cc("c")'>C</div>
              <div data-key="v" hover-class='active' hover-stay-time='100' @click='vv("v")'>V</div>
              <div data-key="b" hover-class='active' hover-stay-time='100' @click='bb("b")'>B</div>
              <div data-key="n" hover-class='active' hover-stay-time='100' @click='nn("n")'>N</div>
              <div data-key="m" hover-class='active' hover-stay-time='100' @click='mm("m")'>M</div>
              <div data-key="hs" hover-class='active' hover-stay-time='100' @click='delkey' style='width:50px'><img src='../assets/img/hs.png'
                  style='width:35px;height:35px;margin-top:8px;'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="third" v-show="step1==2">
      <div class="feiyong">
        <span>费用:{{total.toFixed(2)}}元(药费)+{{zhenjinte}}元(诊金)</span><label></br>合计:{{total1.toFixed(2)}}元</label>
      </div>
      <div class="fenlei">
        <div class="qianF" style="height:100px;">
          <label style="color:red">诊金:</label>
          <p><span>{{zhenjinte}}元</span></p>
          <p><span @click="showJin">点击选择</span><label v-show="chooseZhen"><em v-for="(item,index) in kekzhenjinana"
                :key="index" @click="choosePrice(item.price)">{{item.price}}</em></label></p>
        </div>
        <div class="qianF">
          <label>购药前查看药方:</label>
          <p><span v-for="(item,index) in chakan" :key="index" @click="changeChakan(index,item.name)" :class="{choose:chakanIdx==index}">{{item.name}}</span></p>
        </div>
        <div class="jinji">
          <p><label>服药禁忌:</label><em @click="hideList">({{textJinji}})</em></p>
          <div class="list" v-show="hidejinji">
            <span v-for='(item,index) in list' :key="index" :class="{chooseJin:selectIndex[index].sureid}" @click="xuanJinji(index,item.tabooName,item.tabooId)">{{item.tabooName}}</span>
          </div>
        </div>
        <div class="buchong">
          <span>补充说明:</span>
          <textarea name="" id="" cols="" rows="" placeholder="输入文字内容" v-model="preEnjoin"></textarea>
        </div>
      </div>
    </div>
    <div class="four" v-show="step1==3">
      <h1>患者信息</h1>
      <div class="info">
        <p><span>患者姓名:</span><label>{{patientName}}</label></p>
        <p><span>患者性别:</span><label>{{patientSex}}</label></p>
        <p><span>患者年龄:</span><label>{{age}}</label></p>
      </div>
      <div class="xian"></div>
      <h1>药方信息</h1>
      <div class="info">
        <p><span>辩证:</span><label>{{sickName}}</label></p>
        <p><span>类型:</span><label>{{yaofangspan}}</label></p>
        <p><span>品牌:</span><label>{{pinpaiType}}</label></p>
        <p><span>药态:</span><label>{{shopspan}}</label></p>
        <p class="yaofang"><span>药方:</span><label class="yaoList"><em v-for="(item,index) in arr" :key="index">{{item.medicineName}}{{item.howWeight}}g</em></label></p>
        <p class="jiFu"><span>剂量:</span><label>共{{preNum}}剂，每日{{preOnce}}剂，1剂分{{dayNum}}次服用</label></p>
      </div>
      <div class="xian" style="clear:both;"></div>
      <h1>其他信息</h1>
      <div class="info">
        <p><span>诊金:</span><label>{{zhenjinte}}</label></p>
        <p><span>购药前查看药方:</span><label>{{chakanText}}</label></p>
        <p class="fuyaojinji"><span>服药禁忌:</span><label v-for="(item,index) in json" :key="index">{{item.tabooName}}、</label><label
            v-if="json.length==0">无</label></p>
        <p><span>补充说明:</span><label>{{preEnjoin}}</label></p>
      </div>
      <div class="xian" style="clear:both;"></div>
    </div>
    <div class="nextStep">
      <div v-if="step1==0" @click="backHome">返回上一页</div>
      <div v-if="step1!=0" @click="backstep">上一步</div>
      <div @click="stepGo" v-if="step1!=3">下一步</div>
      <div v-if="step1==3" @click="linePrescription">确认开方</div>
    </div>
    <div class="moban" v-if="showMoban">
      <div class="quxiaoMo" @click="quxiaoMo">取消</div>
      <div class="detail">
        <div v-for="(item,index) in moban" :key="index" @click="chooseMo(item.list)">
          <div><span>名称:</span>{{item.modelName}}</div>
          <div>
            <span>内容:</span>
            <label> <em v-for="(item,index) in item.list" :key="index">{{item.medicineName}}{{item.howWeight}}g、</em>
            </label>
          </div>
        </div>
      </div>
    </div>
    <confirm :text="tipText" ref="confirm" @cancel="cancel" @confirm="confirm"></confirm>

  </div>
</template>

<script>
  import {
    taboo,
    priceList,
    prescriptionType,
    modelType,
    sendMsg6,
    findBrandList,
    linePrescription,
    doctorSelAllDrug,
    findModelByShape,
    tabooType
  } from "api/doctor"
  import HeadTop from 'base/header/header'
  import router from '../router'
  import cookie from "js-cookie"
  import confirm from 'base/confirm/confirm'
  export default {
    name: "zaixiankf",
    data() {
      return {
        step1: false,
        chooseidx: 0,
        jinjichoose: 0,
        patientName: '',
        patientSex: '',
        patientId: '',
        age: '',
        sickName: '',
        yaofangspan: '',
        pinpaiType: '',
        shopspan: '',
        pinpaiIdx: 0,
        yaotaiIdx: 0,
        chakan: [{
            name: '不可看'
          },
          {
            name: '可看'
          }
        ],
        chakanText: '不可看',
        chakanIdx: 0,
        yaoNum: '',
        chooseZhen: false,
        hidejinji: true,
        textJinji: '点击收起',
        yaotype: '',
        medicineManner: '',
        brandId: '',
        yaotaiList: '',
        kekzhenjinana: '',
        zhenjinte: '0',
        total1: 0.00,
        total: 0.00,
        list: [],
        selectIndex: [],
        arr: [],
        shapeId: '',
        isPayLook: 0,
        preEnjoin: '',
        preNum: '7',
        preOnce: '1',
        dayNum: '3',
        json: [],
        taboos: [],
        isModel: 0,
        modelName: '',
        isAgent: 0,
        token: '',
        doctorId: '',
        medicinalWraphid: false,
        modelType: '1',
        valuess: '',
        yaocaiList: [],
        typeInput: 'url',
        modelId: '',
        preNum1: '',
        shijiao1: 0,
        preOnce1: '',
        shijiao2: 0,
        dayNum1: '',
        shijiao3: 0,
        moban: [],
        showMoban: false,
        k1: 'none',
        k2: 'block',
        gbxs1: false,
        yaocaiListkong: false,
        shuzi: 0,
        jianpanS: true,
        confirmList: [],
        tipText: '',
        zaiciItem: [],
        showAdd: false
      }
    },
    created() {
      this.token = cookie.get('token');
      this.doctorId = cookie.get('doctorId');
      this.patientId = cookie.get('patientId');
      this.patientName = cookie.get('patientName');
      this.patientSex = cookie.get('patientSex');
      if (this.patientSex == 1) {
        this.patientSex = '男'
      } else {
        this.patientSex = '女'
      }
      this.age = cookie.get('age');
      if (this.$route.query.modelId) {
        this.modelId = this.$route.query.modelId;
      }
      this.zaiciKf()
      this.prescriptionType();
      this.modelTypes();
      this.findBrandList();
      this.priceList();
      this.taboo();
      this.pinpaiIdx = 100;
      this.brandId = '';
      this.pinpaiType = '';
      this.yaotaiIdx = 100;
      this.shapeId = '';
      this.shopspan = '';
      window.scrollTo(0, 0);
    },
    computed: {

    },

    methods: {
      zaiciKf() {
        if (this.$route.query.item) {
          this.zaiciItem = JSON.parse(this.$route.query.item)
          this.sickName = this.zaiciItem.symptom
          this.arr = this.zaiciItem.pd_lists;
          this.preNum = this.zaiciItem.preNum;
          this.preOnce = this.zaiciItem.preOnce;
          this.dayNum = this.zaiciItem.dayNum;
          this.chakanIdx = this.zaiciItem.isPayLook
          this.preEnjoin = this.zaiciItem.preEnjoin
          this.zhenjinte = this.zaiciItem.money
          // for(var i=0;i<this.zaiciItem.list_price.length;i++){
          //     if(this.zaiciItem.list_price[i].moneyDescribe == 5){
          //         this.zhenjinte = this.zaiciItem.list_price[i].money;
          //     }
          // }
          console.log(this.zaiciItem)
        }
      },
      backHome() {
        this.$router.go(-1)
      },
      scroollT() {
        this.gundong2();
      },
      gundong1() {
        document.documentElement.scrollTop = 600;
        document.body.scrollTop = 600;
        //console.log(document.body.scrollTop,document.documentElement.scrollTop)
      },
      gundong2() {
        document.documentElement.scrollTop = 300;
        document.body.scrollTop = 300;
        //console.log(document.body.scrollTop,document.documentElement.scrollTop)
      },
      qingchu1() {
        this.preNum1 = this.preNum;
        this.preNum = '';
        this.gundong()
        //console.log(this.preNum1,this.preNum)
      },
      huifu1() {
        if (this.shijiao1 == 0) {
          this.preNum = this.preNum1
        } else {
          this.preNum1 = this.preNum
        }
      },
      shuru1() {
        this.shijiao1 = 1
        this.preNum1 = this.preNum
      },
      qingchu2() {
        this.preOnce1 = this.preOnce;
        this.preOnce = '';
        this.gundong()
      },
      huifu2() {
        if (this.shijiao2 == 0) {
          this.preOnce = this.preOnce1
        } else {
          this.preOnce1 = this.preOnce
        }
      },
      shuru2() {
        this.shijiao2 = 1
        this.preOnce1 = this.preOnce
      },
      qingchu3() {
        this.dayNum1 = this.dayNum;
        this.dayNum = '';
        this.gundong()
      },
      huifu3() {
        if (this.shijiao3 == 0) {
          this.dayNum = this.dayNum1
        } else {
          this.dayNum1 = this.dayNum
        }
      },
      shuru3() {
        this.shijiao3 = 1
        this.dayNum1 = this.dayNum
      },
      stepGo() {
        if (this.sickName == '') {
          this.$toast('请输入辩证内容')
          return false;
        }
        if (this.step1 == 1) {
          if (this.arr.length == 0) {
            this.$toast('请选择药方');
            return false;
          }
          for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].howWeight == '') {
              this.$toast('您有药材未输入数量');
              return false;
            }
          }
        }
        this.step1++;
        if (this.step1 == 2) {
          if (this.arr.length != 0) {
            for (var i = 0; i < this.arr.length; i++) {
              this.total += this.arr[i].price * this.arr[i].howWeight * 1
            }
            this.total = this.total * this.preNum
            this.total1 = this.total + this.zhenjinte * 1;
          }
          //console.log(this.total1)
        }
        if (this.step1 == 3) {
          if (this.preEnjoin == '') {
            this.preEnjoin = '无'
          }
          this.step1 = 3;
        }
        window.scrollTo(0, 0);
      },
      backstep() {
        this.step1--;
        if (this.step1 == 0) {
          this.step1 = 0;
        }
        if (this.step1 == 1) {
          this.total = 0.00
          this.total1 = 0.00
        }
        window.scrollTo(0, 0);
      },
      showMedi() {

        if (this.pinpaiIdx == 100 || this.yaotaiIdx == 100) {
          alert("未选择品牌和药态，不能编辑药品");
        } else {
          this.showAdd = true;
          this.medicinalWraphid = true;
          this.showMoban = false;
          this.yaocaiList = []
          this.valuess = ''
          this.k1 = 'none';
          this.k2 = 'block';
        }

      },
      inputclick() {
        this.medicinalWraphid = true;
        this.gbxs1 = true;
      },
      hideYao() {
        this.showAdd = false;
        this.medicinalWraphid = false;
        this.jianpanS = false;
      },
      hideYaocai(index) {
        this.gundong2()
        this.shuzi = index;
        this.jianpanS = true;
        this.medicinalWraphid = true;
        this.k1 = 'block'
        this.k2 = 'none'
        //console.log(this.shuzi,this.arr[this.shuzi])
      },
      quxiaoMo() {
        this.showMoban = false;
      },
      chooseMo(list) {
        this.arr = list;
        this.medicinalWraphid = true;
        this.k1 = 'block';
        this.k2 = 'none';
        this.showMoban = false;
      },
      findModelByShape() {
        this.medicinalWraphid = false;
        this.showMoban = true;
        let list = {
          token: this.token,
          doctorId: this.doctorId,
          modelName: this.modelName,
          shapeId: this.shapeId,
          brandId: this.brandId,
          type: this.modelType
        }
        findModelByShape(list).then((res) => {
          console.log(res)
          this.moban = res.lists;
        })
      },
      selcettext() {
        this.typeInput = 'text';
        if (this.valuess != '') {
          let list = {
            type: this.modelType,
            data: this.valuess,
            doctorId: this.doctorId,
            shapId: this.shapeId,
            brandId: this.brandId
          }

          doctorSelAllDrug(list).then((res) => {
            this.gbxs1 = false;
            if (res.type == true) {
              if (res.list.length == 0) {
                this.yaocaiList = []
                this.yaocaiListkong = true;
              } else {
                this.yaocaiList = res.list;
                this.medicinalWraphid = true;
                this.yaocaiListkong = false;
              }
            } else if (res.type == false) {
              this.$toast(res.massage)
              this.medicinalWraphid = false;
            }
          })
        } else {
          //this.medicinalWraphid = false;
        }
      },
      cancel() {
        this.$refs.confirm.hide();
        this.valuess = '';
        this.yaocaiList = [];
      },
      confirm() {
        this.arr.push(this.confirmList);
        this.shuzi = this.arr.length - 1;
        this.jianpanS = true;
        this.valuess = '';
        this.yaocaiList = [];
        this.k2xsclick()
        this.$refs.confirm.hide();
      },
      addYaocai(data) {
        var div = document.getElementById('scrolldIV');
        console.log(div.scrollTop)
        console.log(div.scrollHeight)

        div.scrollTop = div.scrollHeight;
        for (var i = 0; i < this.arr.length; i++) {
          if (data.drugName == this.arr[i].medicineName) {
            this.$toast('此项已存在，不能再次添加');
            return false;
          } else if (this.arr[i].howWeight == '') {
            this.$toast('您有药材未输入数量');
            return false;
          }
        }
        let listArr = {
          medicineName: data.drugName,
          medicineId: data.drugid,
          drugUnit: data.drugUnit,
          price: data.price,
          howWeight: '',
          drugType: data.drugType
        }
        this.confirmList = listArr;
        let list = {
          token: this.token,
          json: JSON.stringify(this.arr),
          medicineName: data.drugName
        }
        tabooType(list).then((res) => {
          console.log(res);
          if (res.status == 3) {
            this.arr.push(listArr);
            this.shuzi = this.arr.length - 1;
            this.jianpanS = true;
            this.valuess = '';
            this.yaocaiList = [];
            this.k2xsclick()
          } else if (res.status == 0) {
            this.$refs.confirm.show();
            this.tipText = '您选择的药品与已开药品相反，确定开药吗？'
          } else if (res.status == 1) {
            this.$refs.confirm.show();
            this.tipText = '您选择的药品与已开药品相畏，确定开药吗？'
          } else if (res.status == 2) {
            this.$refs.confirm.show();
            this.tipText = '您选择的药品妊娠禁忌，确定开药吗？'
          }
        })

      },
      lengthNum(index) {
        if (this.arr[index].howWeight.length > 2) {
          this.$toast("最高只能输入99")
          this.arr[index].howWeight = this.arr[index].howWeight.substring(-1, 2);
        }
      },
      deleteYao(index) {
        this.arr.splice(index, 1);
      },
      linePrescription() { //生成药方
        let that = this;
        if (this.patientSex == '男') {
          this.patientSex = 1
        } else {
          this.patientSex = 2
        }

        this.json.forEach(function(item, index) {
          that.taboos.push(item.tabooId);
        })

        if (this.taboos.length == 0) {
          this.taboos = '6f8b2ff0b12a4158a0b6f623893b2ab4'
        }

        let list = {
          doctorId: this.doctorId,
          token: this.token,
          patientId: this.patientId, //患者信息
          patientName: this.patientName, //患者姓名
          patientAge: this.age, //患者年龄
          patientSex: this.patientSex, //性别
          sickName: this.sickName, //辩证
          medicineType: 1, //药方类型
          shapeId: this.shapeId, //药态
          json: JSON.stringify(this.arr), //药材
          preNum: this.preNum, //多少剂
          preOnce: this.preOnce, //每剂多少服
          dayNum: this.dayNum, //每日多少次
          serviceCharge: 0, //治疗服务费
          diagnoseMoney: this.zhenjinte, //诊金
          isPayLook: this.isPayLook, //购买前是否可查看药方
          taboo: this.taboos.toString(), //服药禁忌
          preEnjoin: this.preEnjoin, //医嘱
          isModel: Number(this.isModel), //是否保存模板
          modelName: this.modelName, //模板名
          isAgent: this.isAgent, //是否待煎
          countPrice: this.total1, //总价
          modelPreId: this.modelId, //模板ID
          brandId: this.brandId //品牌ID
        }
        linePrescription(list).then((res) => {
          //console.log(res);
          let that = this;
          if (res.type == true) {
            this.$toast('开方成功');
            setTimeout(function() {
              that.$router.push('/houzhen')
            }, 1500)
            let date = new Date();
            let date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() +
              ':' + date.getMinutes() + ':' + date.getSeconds();
            let json = [{
              lx: 'hz',
              id: this.patientId
            }]
            let listArr = {
              json: JSON.stringify(json),
              d1: "您好！医生为您开出一张专属药方。",
              d2: this.patientName,
              d3: "您收到一张处方",
              d4: "新华医馆问诊平台",
              d5: cookie.get("doctorName"),
              d6: "请您点击详情进入小程序查看。",
              type: '8',
              path: "pages/order/order",
              appid: 'wx2061bee8caa00a0d',
              url: 'https://www.mfzhosp.com/H5/#/chachufang'
            }
            sendMsg6(listArr).then((res) => {

            })
          } else {
            this.$toast(res.massage)
          }
        })
      },
      hideList() {
        this.hidejinji = !this.hidejinji;
        if (this.hidejinji == true) {
          this.textJinji = '点击收起'
        } else {
          this.textJinji = '点击展开'
        }
      },
      showJin() {
        this.chooseZhen = !this.chooseZhen;
      },
      changeType(index, value) {
        if (this.arr.length != 0) {
          return false;
        }
        this.chooseidx = index;
        this.yaofangspan = value;
      },
      changePinpai(index, brandId, value) {
        if (this.arr.length != 0) {
          return false;
        }
        this.pinpaiIdx = index;
        this.brandId = brandId;
        this.pinpaiType = value;
        console.log(this.brandId)
        console.log(this.pinpaiType)
        this.yaotaiIdx = 100;
        this.shapeId = '';
        this.shopspan = '';
      },
      changeYaotai(index, id, value) {
        if (this.arr.length != 0) {
          return false;
        }
        console.log(this.pinpaiIdx)
        console.log(index)
        if (index == 1 && this.pinpaiIdx != 2) {
          this.pinpaiIdx = 2;
          this.brandId = 'e3da571c41a641aea32vfvn931b89ea98ce';
          this.pinpaiType = "新华社区";
          this.yaotaiIdx = index;
          this.shapeId = id;
          this.shopspan = value;
        } else {
          this.yaotaiIdx = index;
          this.shapeId = id;
          this.shopspan = value;
        }
      },
      changeChakan(index, value) {
        this.chakanIdx = index;
        this.isPayLook = index;
        this.chakanText = value;
      },
      prescriptionType() { //药方类型
        let list = {
          token: this.token
        }
        prescriptionType(list).then((res) => {
          //console.log(res);
          this.yaotype = res.date;
          this.yaofangspan = this.yaotype[0].label;
          if (this.$route.query.item) {
            this.medicineType = this.zaiciItem.medicineType
            if (this.medicineType == 1) {
              this.chooseidx = 0;
            }
          }

        })
      },
      findBrandList() { //药态品牌
        let list = {
          doctorId: this.doctorId,
          token: this.token
        }
        findBrandList(list).then((res) => {
          console.log(res);
          this.medicineManner = res.list;
          this.brandId = res.list[0].id;
          this.pinpaiType = res.list[0].lable;
          if (this.$route.query.item) {
            for (var i = 0; i < this.medicineManner.length; i++) {
              if (this.medicineManner[i].id == this.zaiciItem.brandId) {
                this.pinpaiIdx = i;
                this.brandId = this.zaiciItem.brandId
              }
            }
          }
          //console.log(res.list)
        })
      },
      modelTypes() { //药态类型
        let list = {
          token: this.token
        }
        modelType(list).then((res) => {
          //console.log(res);
          this.yaotaiList = res.data;
          this.shapeId = this.yaotaiList[0].shapeId;
          this.shopspan = this.yaotaiList[0].shapeName;
          if (this.$route.query.item) {
            for (var i = 0; i < this.yaotaiList.length; i++) {
              if (this.yaotaiList[i].shapeId == this.zaiciItem.preShapeId) {
                this.yaotaiIdx = i;
                this.shapeId = this.zaiciItem.preShapeId
              }
            }
          }
        })
      },
      priceList() { //诊金列表
        let list = {
          token: this.token
        }
        priceList(list).then((res) => {
          //console.log(res);
          this.kekzhenjinana = res.data;
        })
      },
      taboo() { //禁忌
        let list = {
          token: this.token
        }
        let that = this;
        taboo(list).then((res) => {
          ///console.log(res);
          this.list = res.data;
          res.data.forEach(function(item, index) {
            that.selectIndex.push({
              sureid: 0
            });
          })
          if (this.$route.query.item) {
            this.json = this.zaiciItem.taboo
            for (var i = 0; i < res.data.length; i++) {
              for (var j = 0; j < this.zaiciItem.taboo.length; j++) {
                if (res.data[i].tabooId == this.zaiciItem.taboo[j].tabooId) {
                  that.selectIndex[i].sureid = 1
                }
              }
            }
          }
          //console.log(this.selectIndex)
        })
      },
      xuanJinji(index, text, id) {
        this.jinjichoose = index;
        this.selectIndex[index].sureid = !this.selectIndex[index].sureid;
        let flag = this.selectIndex[index].sureid;
        if (flag == 0) {
          for (var i = 0; i < this.json.length; i++) {
            if (this.json[i].tabooName == text) {
              this.json.splice(i, 1);
            }
          }
        } else {
          var obj = {}
          obj.tabooId = id
          obj.tabooName = text
          this.json.push(obj);
          //console.log(this.arr)
        }
      },
      choosePrice(value) {
        this.zhenjinte = value;
        this.chooseZhen = false;
        this.total1 = this.total + value;
      },
      clear() {
        let index = this.arr[this.shuzi].howWeight.toString().length;
        //console.log(this.arr[this.shuzi].howWeight.toString().length)
        this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.toString().substr(0, index - 1)
      },
      comfromclick() {
        this.k2 = 'block'
        this.k1 = 'none'
        this.jianpanS = false;
      },
      k2xsclick() {
        this.k2 = 'none'
        this.k1 = 'block'
        //$('.num1').eq(this.arr.length-1).focus();
      },
      delkey() {
        let index = this.valuess.length
        this.valuess = this.valuess.substr(0, index - 1)
        if (index == 1) {
          this.yaocaiList = []
        }
        //console.log(index)
        this.selcettext()
      },
      sz(num) {

      },
      sz0(num) {
        // this.jianpanS = false;
        if (this.arr[this.shuzi].howWeight.length >= 2) {
          this.$toast("最高只能输入99")
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
        } else {
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
        }
      },
      sz1(num) {
        // this.jianpanS = false;
        //console.log(this.arr[this.shuzi].howWeight.length)
        if (this.arr[this.shuzi].howWeight.length >= 2) {
          this.$toast("最高只能输入99")
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
        } else {
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
        }
      },
      sz2(num) {
        // this.jianpanS = false;
        if (this.arr[this.shuzi].howWeight.length >= 2) {
          this.$toast("最高只能输入99")
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
        } else {
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
        }
      },
      sz3(num) {
        // this.jianpanS = false;
        if (this.arr[this.shuzi].howWeight.length >= 2) {
          this.$toast("最高只能输入99")
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
        } else {
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
        }
      },
      sz4(num) {
        // this.jianpanS = false;
        if (this.arr[this.shuzi].howWeight.length >= 2) {
          this.$toast("最高只能输入99")
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
        } else {
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
        }
      },
      sz5(num) {
        // this.jianpanS = false;
        if (this.arr[this.shuzi].howWeight.length >= 2) {
          this.$toast("最高只能输入99")
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
        } else {
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
        }
      },
      sz6(num) {
        // this.jianpanS = false;
        if (this.arr[this.shuzi].howWeight.length >= 2) {
          this.$toast("最高只能输入99")
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
        } else {
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
        }
      },
      sz7(num) {
        // this.jianpanS = false;
        if (this.arr[this.shuzi].howWeight.length >= 2) {
          this.$toast("最高只能输入99")
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
        } else {
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
        }
      },
      sz8(num) {
        // this.jianpanS = false;
        if (this.arr[this.shuzi].howWeight.length >= 2) {
          this.$toast("最高只能输入99")
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
        } else {
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
        }
      },
      sz9(num) {
        // this.jianpanS = false;
        if (this.arr[this.shuzi].howWeight.length >= 2) {
          this.$toast("最高只能输入99")
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight.substring(-1, 2);
        } else {
          this.arr[this.shuzi].howWeight = this.arr[this.shuzi].howWeight + num;
        }
      },
      sz10() {
        this.k2 = 'block'
        this.k1 = 'none'
        this.jianpanS = false;
      },
      qq(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      ww(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      ee(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      rr(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      tt(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      yy(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      uu(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      ii(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      oo(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      pp(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      aa(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      ss(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      dd(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      ff(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      gg(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      hh(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      jj(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      kk(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      ll(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      zz(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      xx(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      cc(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      vv(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      bb(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      nn(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
      mm(text) {
        this.valuess = this.valuess + text;
        this.selcettext();
      },
    },
    components: {
      confirm
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/less/base.less';

  .zaixiankf {
    width: 100%;
    height: 100%;
    //background:#efefef;
    padding-bottom: 170px;
  }

  .addYao {
    width: 100%;
    height: 70%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;

    div {
      width: 100%;
      height: 45%;
      overflow: auto;
      //background:rgba(255,255,255,0.5);
      padding-bottom: 80px;
    }

    p {
      width: 2.8rem;
      height: 1.4rem;
      background: #42cac6;
      margin-top: 20px;
      margin-left: 20px;
      font-size: 25px;
      float: left;
      position: relative;
      border-radius: 0.1rem;

      label {
        color: #fff;
        padding-left: 20px;
        width: 3rem;
        float: left;
        padding-top: 20px;
        text-align: -webkit-center;

      }

      input {
        width: 0.5rem;
        height: 50px;
        background: #fff;
        border-radius: 10px;
        text-align: center;
        margin-left: 0.8rem;
        margin-top: 0.2rem;
      }

      em {
        color: #fff;
        font-size: 0.4rem;
        margin-left: 0.2rem;
      }

      img {
        width: 0.5rem;
        height: 0.5rem;
        margin-top: 0.2rem;
        margin-left: 0.4rem;
        float: left;
      }

      .guangbiao1 {
        width: 0.01rem;
        height: 0.3rem;
        position: absolute;
        margin-top: 0.7rem;
        margin-left: 1.89rem;

      }
    }
  }

  .confirm {
    z-index: 9999 !important;
  }

  .xian {
    width: 100%;
    height: 10px;
    background: #efefef;
  }

  .first {
    width: 100%;
    height: 100%;
    padding-bottom: 200px;

    .info {
      widows: 100%;
      height: 268px;
      background: #fff;

      p {
        width: 90%;
        height: 77px;
        border-bottom: 1px solid #f5f5f5;
        color: #828282;
        font-size: 24px;
        line-height: 77px;
        margin: 0 auto;
        padding: 0 10px;
        clear: both;

        span {
          float: left;
        }

        label {
          float: right;
        }
      }
    }

    .bianz {
      width: 100%;
      background: #fff;
      margin-top: 10px;
      clear: both;

      p {
        font-size: 24px;
        color: #828282;
        padding-left: 43px;
        line-height: 80px;
      }

      textarea {
        width: 75%;
        height: 214px;
        background: rgba(246, 246, 246, 1);
        border: 1px solid rgba(170, 170, 170, 1);
        border-radius: 12px;
        resize: none;
        border: 1px solid #c3c3c3;
        color: #b4b4b4;
        padding: 30px;
        margin-left: 43px;
      }
    }
  }

  .second {
    width: 100%;
    height: 100%;

    div.yangshi {
      width: 100%;
      height: 80px;
      border-bottom: 1px solid #e9e9e9;
      color: #828282;
      font-size: 24px;
      line-height: 80px;
      margin: 0 auto;
      padding: 0 10px;

      label {
        float: left;
        clear: both;
      }

      p {
        float: right;

        span {
          width: 1.6rem;
          height: 57px;
          background: #d4d4d4;
          color: #fff;
          text-align: center;
          line-height: 57px;
          float: left;
          margin-right: 20px;
          border-radius: 57px;
          margin-top: 10px;
        }

        span.choose {
          width: 1.6rem;
          height: 57px;
          background: #42cac6;
          color: #fff;
          text-align: center;
          line-height: 57px;
          float: left;
          margin-right: 20px;
          border-radius: 57px;
          margin-top: 10px;
        }
      }
    }

    .yaofang {
      width: 110%;
      border: none;
      margin: 0 auto;
      margin-top: 35px;
      clear: both;

      >span {
        font-size: 24px;
        color: #828282;
        float: left;
        padding-left: 10px;
      }

      div.list {
        margin-top: -50px;
        padding-bottom: 700px;
        margin-right: 0.7rem;
      }

      div {
        float: left;
        border: none;

        p {
          width: 2.8rem;
          height: 55px;
          background: #42cac6;
          border-radius: 55px;
          line-height: 55px;
          margin-top: 10px;
          margin-bottom: 10px;
          font-size: 25px;
          float: right;
          position: relative;

          label {
            color: #fff;
            padding-left: 0.2rem;
            width: 1.3rem;
            float: left;
          }

          input {
            width: 0.5rem;
            height: 40px;
            background: #fff;
            border-radius: 10px;
            //margin-left:170px;
            margin-right: 10px;
            text-align: center;
          }

          em {
            color: #fff;
            font-size: 0.3rem;
          }

          img {
            width: 34px;
            height: 34px;
            float: right;
            margin-top: 10px;
            margin-right: 10px;
          }

          .guangbiao1 {
            width: 1px;
            height: 20px;
            position: absolute;
            left: 66%;
            top: 5px;
          }
        }
      }

      .addMoban {
        width: 3rem;
        height: 55px;
        border: 1px solid #42cac6;
        font-size: 27px;
        color: #42cac6;
        text-align: center;
        line-height: 55px;
        border-radius: 55px;
        margin-top: 20px;
        float: right;
        padding: 0;
        margin-right: 0.7rem;
      }
    }

    .jiliang {
      width: 100%;
      font-size: 24px;
      color: #828282;
      padding-top: 20px;

      input {
        width: 85px;
        height: 45px;
        border: 1px solid #42cac6;
        margin: 0 10px;
        border-radius: 10px;
        text-align: center;
        color: #828282;
      }

      input::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size: 25px;
      }
    }

    .jiliang2 {
      width: 100%;
      font-size: 24px;
      color: #828282;
      padding-top: 20px;
      margin-left: 50px;

      input {
        width: 85px;
        height: 45px;
        border: 1px solid #42cac6;
        margin: 0 10px;
        border-radius: 10px;
        text-align: center;
        color: #828282;
      }

      input::-webkit-input-placeholder {
        color: #c9c9c9;
        font-size: 25px;
      }
    }
  }

  .second div.yaocaiList {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 600px;
    background: #fff;
    z-index: 9999;
  }

  .second div.yaocaiselecet {
    width: 100%;
    font-size: .30rem;
    color: #222;
    height: 1.15rem;
    background: #fff;
    overflow: hidden;
  }

  .medicinalWrap:active {
    background-color: rgba(0, 0, 0, 0.1)
  }

  .second div.yaocaiselecets {
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  .inputWrap {
    width: 100%;
    height: .75rem;
    background: #fff;
    z-index: 11;
    float: left;
    border-bottom: 1px solid #e2e2e2;
    position: relative;

    img {
      width: 1px;
      height: 25px;
      float: left;
    }
  }

  .inputWrap input {
    width: 80%;
    height: .75rem;
    padding: .10rem .23rem;
    box-sizing: border-box;
    font-size: .30rem;
    color: #222;
    float: left;
  }

  .inputWrap span {
    font-size: 25px;
    color: #fff;
    float: right;
    width: 120px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-radius: 10px;
    background: #42cac6;
    margin-right: 10px;
    margin-top: -0.6rem;
  }

  .second div.medicinalWrap {
    line-height: .60rem;
    float: left;
    width: auto;
    height: auto;
    text-align: center;
    padding: 0 .23rem;
    margin-top: .12rem;
  }

  .second div.gundong_box {
    width: 100%;
    height: 50px;
    white-space: nowrap;
    display: inline-flex;
  }

  .third {
    width: 100%;
    height: 100%;
    padding-bottom: 100px;

    .feiyong {
      width: 100%;
      height: 80px;
      background: #f6f6f6;
      margin: 0 auto;
      font-size: 24px;
      line-height: 80px;
      border-radius: 10px;
      margin-top: 10px;

      span {
        color: #42cac6;
        padding-left: 20px;
      }

      label {
        color: #fd7d7d;
        float: right;
        padding-right: 20px;
      }
    }

    .fenlei {
      width: 694px;
      margin: 0 auto;

      div.qianF {
        width: 100%;
        float: left;
        height: 80px;
        border-bottom: 1px solid #eeeeee;
        line-height: 80px;
        margin-left: 0.2rem;
        margin-bottom: 0.5rem;

        >label {
          font-size: 24px;
          color: #828282;
          float: left;
        }

        &:nth-of-type(1) p {
          width: 3rem;
          height: 45px;
          //border: 1px solid #42cac6;
          margin-top: 15px;
          text-align: center;
          font-size: 25px;
          line-height: 45px;
          color: #fff;
          float: right;
          border-radius: 10px;
          position: relative;
          background: #fd7d7d;
          margin-right: 100px;

          label {
            position: absolute;
            top: 47px;
            left: 0;
            width: 286px;
            font-size: 24px;
            color: #42cac6;
            text-align: center;
            line-height: 45px;
            background: #fff;
            border: 1px solid #42cac6;
            border-radius: 10px;

            em {
              width: 100%;
              float: left;
              height: 45px;
              border-bottom: 1px solid #42cac6;

              &:last-child {
                border-bottom: none;
              }
            }
          }
        }

        &:nth-of-type(2) p {
          float: right;
          font-size: 24px;
          margin-right: 0.8rem;

          span {
            width: 140px;
            height: 57px;
            background: #d4d4d4;
            color: #fff;
            text-align: center;
            line-height: 57px;
            float: left;
            margin-right: 20px;
            border-radius: 57px;
            margin-top: 10px;
          }

          span.choose {
            width: 140px;
            height: 57px;
            background: #42cac6;
            color: #fff;
            text-align: center;
            line-height: 57px;
            float: left;
            margin-right: 20px;
            border-radius: 57px;
            margin-top: 10px;
          }
        }
      }

      .jinji {
        width: 90%;
        height: 80px;
        line-height: 80px;
        margin: 0 auto;
        border-bottom: none;
        margin-top: 1rem;

        p {
          padding: 20px 10px;
          font-size: 24px;
          color: #828282;

          em {
            float: right;
            color: #42cac6;
            margin-right: 0.8rem;
          }
        }

        .list {
          border: none;
          width: 100%;
          height: 400px;

          span {
            float: left;
            width: 1.5rem;
            height: 1.2rem;
            padding: 5px 15px;
            //height: 55px;
            text-align: center;
            line-height: 45px;
            border-radius: 30px;
            color: #fff;
            background: #d4d4d4;
            font-size: 24px;
            margin-right: 15px;
            margin-bottom: 15px;
            overflow: hidden;
          }

          span.chooseJin {
            float: left;
            width: 170px;
            padding: 5px 15px;
            //height: 55px;
            text-align: center;
            line-height: 45px;
            border-radius: 30px;
            color: #fff;
            background: #42cac6;
            font-size: 24px;
            margin-right: 15px;
            margin-bottom: 15px;
            overflow: hidden;
          }
        }
      }

      .buchong {
        width: 694px;
        margin: 0 auto;
        border: none;
        float: left;
        padding-top: 20px;
        clear: both;
        margin-bottom: 1rem;
        margin-left: 0.45rem;

        span {
          float: left;
          color: #828282;
          font-size: 24px;
          padding-right: 20px;
        }

        textarea {
          float: left;
          width: 524px;
          height: 130px;
          resize: none;
          border: 1px solid #d4d4d4;
          color: #828282;
          padding: 10px;
          margin-top: 0.4rem;
          margin-left: 0.1rem;
        }

        textarea::-webkit-input-placeholder {
          color: #c9c9c9;
          font-size: 25px;
        }
      }
    }

  }

  .four {
    width: 100%;
    height: 100%;
    padding-bottom: 300px;

    h1 {
      width: 190px;
      height: 53px;
      line-height: 53px;
      text-align: center;
      font-size: 30px;
      color: #fff;
      background: rgba(66, 202, 198, 1);
      border-radius: 0px 27px 27px 0px;
      margin-top: 20px;
    }

    .info {
      widows: 100%;
      height: 4rem;
      background: #fff;

      p {
        width: 90%;
        height: 77px;
        border-bottom: 1px solid #f5f5f5;
        color: #828282;
        font-size: 27px;
        line-height: 77px;
        margin: 0 auto;
        padding: 0 10px;
        clear: both;

        span {
          float: left;
        }

        label {
          float: right;
        }

        &:last-child {
          border-top: 1px solid #f5f5f5;
        }
      }

      p.yaofang {
        height: auto;
        float: left;
        margin-left: 24px;
        line-height: 50px;
      }

      .yaoList {
        width: 70%;
        text-align: right;
      }

      p.jiFu {
        float: left;
        margin-left: 24px;
      }

      .fuyaojinji {
        height: auto;
        border-bottom: none;
      }
    }
  }

  .nextStep {
    width: 100%;
    height: 91px;
    position: fixed;
    bottom: 0;
    left: 0;

    div {
      width: 50%;
      height: 91px;
      color: #fff;
      font-size: 24px;
      float: left;
      text-align: center;
      line-height: 91px;
      background: #858585;

      &:nth-of-type(2) {
        background: #42cac6;
      }
    }
  }

  // input,
  // textarea {
  //     outline: none;
  // }

  .moban {
    width: 100%;
    height: 550px;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    border-top: 1px solid #cecece;
    overflow-y: scroll;

    .quxiaoMo {
      position: fixed;
      right: 30px;
      bottom: 500px;
      color: #42cac6;
      font-size: 25px;
    }

    .detail {
      width: 100%;
      padding-top: 50px;

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
            margin-top: 10px;
          }
        }
      }
    }
  }

  //键盘
  .keyboard {
    overflow: hidden;
    width: 100%;
  }

  .keyboard02 {
    overflow: hidden;
    width: 100%;
  }

  .left {
    width: 75%;
    float: left;
    background-color: white;
    box-sizing: border-box;
    text-align: center;
    line-height: 100px;
  }

  .right {
    width: 25%;
    float: left;
    background-color: white;
  }

  .left div {
    float: left;
    width: calc(100% / 3);
    box-sizing: border-box;
    height: 100px;
    border: 1px solid #eeeeee;
    font-size: 30px;
  }

  .right div {
    background-color: white;
    height: 200px;
    text-align: center;
    line-height: 200px;
    box-sizing: border-box;
    border: 1px solid #eeeeee;
    font-size: 32px;
  }

  .left02 {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.03);
    box-sizing: border-box;
    text-align: center;
    overflow: hidden;
    padding: 5px;
  }

  .hang {
    float: left;
    width: 100%;
  }

  .hang div {
    height: 100px;
    width: calc(100% / 10);
    box-sizing: border-box;
    border: 2px solid #eeeeee;
    line-height: 100px;
    background-color: white;
    border-radius: 16px;
    float: left;
    font-size: 30px;
  }

  .shuru_box {
    position: fixed;
    overflow: hidden;
    bottom: 7%;
    width: 100%;
    background: white;
    z-index: 12;
    left: 0;
    padding-bottom: 30px;
  }

  .guangbiao1 {
    position: absolute;
    width: 1px;
    top: 0;
    margin-top: 18px;
    margin-left: -6px;
    height: 30px;
    left: 20px;
    top: 8px;
  }

  .guangbiao2 {
    position: absolute;
    width: 1px;
    top: 0;
    margin-top: 6px;
    margin-left: -2px;
    height: 20px;
  }

  .left div:active {
    background: rgba(0, 0, 0, 0.1);
  }

  .right div:active {
    background: rgba(0, 0, 0, 0.1);
  }

  .hang div:active {
    background: rgba(0, 0, 0, 0.1);
  }

  .show_box {
    width: 100%;
    clear: both;
    overflow: hidden;
    position: relative;
  }

  .top_box {
    width: 100%;
    overflow: hidden;
  }

  ::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }

  .info span,
  .info label,
  .info input,
  textarea,
  .first .bianz p {
    font-size: 30px;
  }

  div,
  span,
  p,
  label {
    font-size: 30px !important;
  }
</style>
