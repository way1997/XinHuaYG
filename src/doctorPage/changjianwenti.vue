<template>
  <div class="page11">
    <!-- <div class="bg-white-1">
      <div class="align-items flex flex__justify">
        <div class="flex align-items box1">
          <img class="img" src="../../assets/search.png" />
          <div>:处方照片必须包含哪些内容</div>
        </div>
        <div class="img1 box2">
          <img src="../../assets/iconfontjiantou5.png" />
        </div>
      </div>
    </div> -->
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item title="Q : 处方照片必须包含哪些内容" name="index1" icon="search">
        <img src='https://www.mfzhosp.com//img/chufangjian.png'></image>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item title="Q : 如何拍照开方" name="index2" icon="search">
        <div>
          1、点击<label style="color: red;">“点此拍方”</label>按钮。</br>
          2、根据患者所在地区或您的偏好，选择<label style="color: red;">药态及药房。</label></br>
          3、在手机相册中选择已有照片或用手机拍摄照片.</br>
          4、等待照片上传成功.</br>
          5、如有给医师或患者的留言，可在<label style="color: red;">补充内容</label>输入框中填写。</br>
          6、点击<label style="color: red;">生成电子处方</label>按钮。
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item title="Q : 如何拍照开膏方" name="index3" icon="search">
        开膏方时，每味药材剂量需填写总量。
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item title="Q : 如何修改已提交的拍照开方内容" name="index4" icon="search">
        点击页面顶部<label style="color: red;">联系药师</label>按钮，告知药师要修改的内容，药师将为您重新生成电子处方。
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item title="Q : 如何将拍照开方内容发送给患者" name="index5" icon="search">
        1、当您收到电子处方后，请尽快核对信息及处方内容，确认无误后点击<label style="color: red;">确认并发送给患者</label> 按钮，患者即可收到。</br>
        2、当您收到电子处方后，仍有修改需求，可点击页面顶部<label style="color: red;">联系药师</label> 按钮，告知药师需要修改的内容，药师将重新生成电子处方并发送给您。
      </van-collapse-item>
    </van-collapse>
    <div class="bg-white-1">
      <p class="box1">
        ▪ 平台仅支持将完整、清晰的处方笺照片或手写处方照片转至成电子处方，由您确认后发送给患者。</br>
        ▪ 毒性药材用量不得超过药典规定的2倍且须在对应药材后签字确认。</br>
        ▪ 平台当前支持药态:内服中药饮片、膏方、外用中药、粉剂、水丸、蜜丸。拍照开方时同一药态只可上传1张处方照片，如同- -药态有多个处方，请将当前电子处方发送给患者后再次拍照开方。</br>
        ▪ 平台收到您的拍照开方内容后，将尽快生成电子处方并发送给您，请您收到后在48小时内确认并发送给患者。在发送给患者前，如有取消或修改拍照开方内容需求，请及时联系客服或医师。客服电话:<label style="color: red;"> 400-188-1081</label>
      </p>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        activeNames: [],
        list: [{
            title: "处方照片必须包含哪些内容",
            content: " <image src='https://www.mfzhosp.com//img/chufangjian.png' ></image>",
          },
          {
            title: "如何拍照开方",
            content: "如何拍照开方如何拍照开方如何拍照开方",
          },
          {
            title: "如何拍照开方",
            content: "如何拍照开发如何拍照开发如何拍照开发如何拍照开发如何拍照开发",
          },
          {
            title: "如何修改已提交的拍照开方内容",
            content: "如何修改已提交的拍照开方内容如何修改已提交的拍照开方内容如何修改已提交的拍照开方内容如何修改已提交的拍照开方内容如何修改已提交的拍照开方内容",
          },
          {
            title: "如何将拍照开发内容发送给患者",
            content: "如何将拍照开发内容发送给患者如何将拍照开发内容发送给患者如何将拍照开发内容发送给患者如何将拍照开发内容发送给患者",
          },
        ],
        bList: [{
            con: "平台仅支持将完整,清晰的处方照片或手写处方照片清晰的处方照片或手写处方照片清晰的处方照片或手写处方照片",
          },
          {
            con: "平台仅支持将完整平台仅支持将完整平台仅支持将完整",
          },
          {
            con: "平台仅支持将完整平台仅支持将完整平台仅支持将完整平台仅支持将完整平台仅支持将完整平台仅支持将完整平台仅支持将完整平台仅支持将完整平台仅支持将完整",
          },
        ],
      };
    },
    created() {
      window.scrollTo(0, 0);
    }
  };
</script>

<style lang="less" scoped>
  .page11 {
    width: 100%;
    height: 100vh;
    background: #eee;

    .flex {
      display: flex;
    }

    .flex__center {
      justify-content: center;
    }

    .align-items {
      align-items: center;
    }

    .flex__justify {
      justify-content: space-between;
    }

    .bg-white-1 {
      background: #fff;
      border-bottom: 1px solid #eee;
    }

    .box1 {
      margin-left: 0.5rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      margin-right: 0.5rem;
      font-size: 0.3rem;
      line-height: 0.6rem;
      width: 85%;
    }
  }
</style>
