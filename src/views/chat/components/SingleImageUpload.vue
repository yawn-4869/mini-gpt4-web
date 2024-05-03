<template>
  <div class="upload-container">
    <el-upload
      :id="id"
      :ref="id"
      :action="url"
      :http-request="uploadRequest"
      :multiple="false"
      :show-file-list="false"
      :file-list="fileList"
      :auto-upload="false"
      :on-change="uploadImgChanged"
      class="image-uploader"
      drag
      accept=".jpg,.jpeg,.JPG,.JPEG"
      name="image"
    >
      <div v-if="imageUrl.length > 1" class="image-preview">
        <div v-show="imageUrl.length>1" class="image-preview-wrapper">
          <img :src="imageUrl">
          <div class="image-preview-action">
            <i class="el-icon-delete" @click="rmImage" />
          </div>
        </div>
      </div>
      <div v-else class="image-null">
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将图片拖到此处，或<em>点击上传</em>
        </div>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SingleImageUpload',
  props: {
    id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['conversationId']),
  },
  data() {
    return {
      fileList: [

      ],
    }
  },
  computed: {
    imageUrl() {
      return this.imgUrl
    }
  },
  created() {
    const storedImageUrl = localStorage.getItem('imageUrl');
    if (storedImageUrl) {
        // 如果有，将其设置为组件的 imageUrl 属性
        this.imgUrl = storedImageUrl;
        console.log(this.imageUrl)
    }
  },
  watch: {
    value(newValue) {
      // 监听 v-model 的变化，更新 postForm.image_uri
      this.$emit('input', newValue);
    }
  },
  methods: {
    rmImage() {
      this.value = ''
    },
    uploadImgChanged(file, filelist) {
      // this.emitInput(file.files.file)
      const fileSzie = file.size / 1024 / 1204;
      if(fileSzie > 10) {
        this.$message.error(this.inter.sctpdx + ' 2MB!')
      } else {
        this.value = file;
        this.imgUrl = URL.createObjectURL(file.raw);
      }
      this.fileList = filelist.slice(-1)
    },
    beforeImgUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["jpg", "jpeg", "JPG", "JPEG"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error(this.inter.scyyzz);
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.$message.error(this.inter.sctpdx + '3MB!');
        return false;
      }
      this.value = file
    },
    uploadImg() {
      // 使用 ref 获取 el-upload 子组件的实例引用
      const uploadComponent = this.$refs[this.id];
      // 调用 el-upload 组件的 submit 方法来手动触发上传
      uploadComponent.submit();
    },
    latestFile() {
      // 使用 ref 获取 el-upload 子组件的实例引用
      const uploadComponent = this.$refs[this.id];
      // 获取 el-upload 组件中的文件列表
      const fileList = uploadComponent.fileList;
      // 如果文件列表不为空，则返回最后一个文件对象
      if (fileList && fileList.length > 0) {
        return fileList[fileList.length - 1].raw;
      }
      // 如果文件列表为空，则返回 null
      return null;
    },
    uploadRequest(file) {
      // 创建一个新的 FormData 对象
      const formData = new FormData();

      // 添加最新的图片文件到 FormData 对象中
      formData.set('image', file.file);

      // 调用后端接口上传图片
      this.$store.dispatch('conversation/create', formData).then((response) => {
        // 上传成功后的逻辑
        this.$message({ message: '上传成功, 请在右侧对话框输入问题开始聊天', type: 'success' });
        this.imgUrl = `http://localhost:9090/${response.data}.jpg`;
        localStorage.setItem('imageUrl', this.imgUrl);
        console.log(this.imgUrl)

        this.$forceUpdate();
      }).catch(() => {
        // 上传失败后的逻辑
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;
  .image-uploader {
    width: 100%;
    float: left;
  }
  .image-null {

  }
  .image-preview {
    width: 100%;
    height: 400px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center; /* 水平居中 */
      align-items: center; /* 垂直居中 */
      left: 0;
      top: 0;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      cursor: pointer;
      text-align: center;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
  .image-app-preview {
    width: 320px;
    height: 180px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .app-fake-conver {
      height: 44px;
      position: absolute;
      width: 100%; // background: rgba(0, 0, 0, .1);
      text-align: center;
      line-height: 64px;
      color: #fff;
    }
  }
}
</style>
