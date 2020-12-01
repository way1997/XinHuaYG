<template>
  <div class="page11">
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item title="Q : 处方照片必须包含哪些内容" name="index1" icon="search">
        <img src='https://www.mfzhosp.com//img/chufangjian.png'></image>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item title="Q : 如何上传处方？" name="index2" icon="search">
        <div>
          1、点击<label style="color: red;">“点此拍方”</label>按钮。</br>
          2、在手机相册中选择已有照片或用手机拍摄照片。</br>
          3、等待照片上传成功。</br>
          4、点击<label style="color: red;">确认</label>按钮。
        </div>
      </van-collapse-item>
    </van-collapse>
    <div class="bg-white-1">
      <p class="box1">
        ▪此功能仅支持非平台医生开具的处方。<section style="margin:.2rem 0"></section>
        ▪ 平台仅支持将完整、清晰的处方笺照片或手写处方照片转至成电子处方。<section style="margin:.2rem 0"></section>
        ▪ 平台收到您上传的处方照片后，将在10~15分钟内生成电子处方并发送给您。<section style="margin:.2rem 0"></section>

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
