<template>
<div>

    <div class="zhezhao" v-if="loadUp">
        <img src="../assets/img/LODING.gif" alt="" class="loading">
    </div>
    <div class="bg-white flex flex__v">
        <div class="ml-10 mt-10 mr-10">
            <textarea v-model="content" class="textarea" cols="47" rows="10" value="">{{content}}</textarea>
        </div>
        <!-- 放UI组件 -->
        <div class="ml-10">
            <van-uploader v-model="fileList" multiple :max-count="3" />
        </div>
    </div>
    <div class="bg-white fixed">
        <div class="bg-button button ml-10 mr-10 mt-10 mb-10" @click="tijiao">发布公告</div>
    </div>
</div>
</template>

<script>
import {
    saveProclamation,
    proclamation
} from "api/doctor";
import HeadTop from 'base/header/header'
import router from '../router'
import $ from 'jquery'
import cookie from "js-cookie"
import baseURI from 'api/env'
import confirm from 'base/confirm/confirm'
export default {
    name: "Page3",
    data() {
        return {
            content: '',
            fileList: [],
            photo: '',
            proclamationId: '',
            loadUp: false
        }
    },
    created() {
        this.proclamationId = this.$route.params.proclamationId;
        console.log(this.proclamationId);
        this.showgonggao();
    },
    methods: {
        showgonggao() {
            let token = cookie.get("token");
            let proclamationId = this.proclamationId;
            let list = {
                token: token,
                proclamationId: proclamationId,
            };
            proclamation(list).then((res) => {
                console.log(res)
                //this.list=res.data;
                this.content = res.data.proclamationContent;
            });
        },
        async tijiao() {
            this.loadUp = true
            console.log(this.fileList);
            var that = this;
            if (this.content == '') {
                alert("公告内容为空");
                return false;
            }
            let token = cookie.get("token");
            let doctorId = cookie.get("doctorId");
            var filelist1 = this.fileList;
            this.photo = '';
            if (filelist1.length >= 1) {
                var file1 = filelist1[0].file;
                let param1 = new FormData(); // 创建form对象
                param1.append("file", file1);
                await that.axios.post(baseURI + '/mkkMoblie/uploadFile/picture', param1, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    //console.log(response)
                    this.photo = this.photo + baseURI + '/mkkMoblie/' + response.data + ',';
                }).catch(error => {
                    alert('上传图片出错！');
                })
            }

            if (filelist1.length >= 2) {
                var file2 = filelist1[1].file;
                let param2 = new FormData(); // 创建form对象
                param2.append("file", file2);
                await that.axios.post(baseURI + '/mkkMoblie/uploadFile/picture', param2, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    //console.log(response)
                    this.photo = this.photo + baseURI + '/mkkMoblie/' + response.data + ',';
                }).catch(error => {
                    alert('上传图片出错！');
                })
            }
            if (filelist1.length >= 3) {
                var file3 = filelist1[2].file;
                let param3 = new FormData(); // 创建form对象
                param3.append("file", file3);

                await that.axios.post(baseURI + '/mkkMoblie/uploadFile/picture', param3, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    //console.log(response)
                    this.photo = this.photo + baseURI + '/mkkMoblie/' + response.data + ',';
                }).catch(error => {
                    alert('上传图片出错！');
                })
            }
            console.log(this.photo);
            let list = {
                token: token,
                doctorId: doctorId,
                proclamationId: this.proclamationId,
                image: this.photo,
                content: this.content
            };
            await saveProclamation(list).then((res) => {
                this.loadUp = false
                console.log(res)
                alert(res.massage);
                this.$router.push("/gonggaolist")
            });
        },
    },
};
</script>

<style lang="less" scoped>
.flex {
    display: flex;
}

.zhezhao {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

.loading {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.flex__v {
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    flex-direction: column;
}

.bg-white {
    background: #fff;
}

.textarea {
    width: 100%;
    height: 3rem;
    font-size: .3rem;
    resize: none;
    background: #eee;
}

.mt-10 {
    margin-top: 0.3rem;
}

.ml-10 {
    margin-left: 0.3rem;
}

.mr-10 {
    margin-right: 0.3rem;
}

.mb-10 {
    margin-bottom: 0.3rem;
}

.bg-button {
    background: #00b0c2;
}

.button {
    border-radius: 0.1rem;
    height: .5rem;
    line-height: .5rem;
    font-size: .2rem;
    text-align: center;
    color: #fff;
}

.fixed {
    width: 100%;
    position: fixed;
    bottom: 0;
}
</style>
