<template>
  <div class="app-container">
    <el-row :gutter="20" class="row-container">
      <el-col :span="12" :xs="24">
        <div class="left">
          <div class="top">
            <el-input placeholder="搜索" suffix-icon="el-icon-search" />
          </div>
          <div class="image-upload">
            <SingleImageUpload v-model="postForm.image_uri" />
          </div>
          <div class="bottom">
            <el-button :loading="loading" type="primary" style="width:80%; background-color: #671afb" @click="chatStart">开始聊天</el-button>
            <br><br>
            <el-button :loading="loading" type="primary" style="width:80%; background-color: #671afb" @click="chatRestart">重新开始</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="12" :xs="24">
        <div class="right">
          <div class="chat-messages">
            <MessageRow
              v-for="(message, index) in messageList"
              :key="message.id"
              :message="messageList[index]"
            />
          </div>
          <form class="message-input">
            <el-input v-model="input" placeholder="请输入内容" />
            <el-button icon="el-icon-paperclip" circle />
            <el-button type="primary" icon="el-icon-position" circle />
          </form>
          <div class="button-wrapper">
            <el-button>保存</el-button>
            <el-button @click="chatClear">清空</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SingleImageUpload from '@/views/chat/components/SingleImageUpload.vue'
import MessageRow from '@/views/chat/components/MessageRow.vue'

const chatForm = {
  title: '', // 主题
  content: '', // 内容
  brief: '', // 摘要
  image_uri: '', // 图片
  id: undefined,
  time: undefined
}
export default {
  components: { MessageRow, SingleImageUpload },
  data() {
    return {
      postForm: Object.assign({}, chatForm),
      loading: false,
      messageList: [
        { id: 1, role: 'user', created: '2024-01-08', content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur' },
        { id: 1, role: 'robot', created: '2024-01-08', content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur' },
        { id: 1, role: 'user', created: '2024-01-08', content: 'description1' },
        { id: 1, role: 'robot', created: '2024-01-08', content: 'description1' },
        { id: 1, role: 'user', created: '2024-01-08', content: 'description1' },
        { id: 1, role: 'robot', created: '2024-01-08', content: 'description1' },
        { id: 1, role: 'user', created: '2024-01-08', content: 'description1' },
        { id: 1, role: 'robot', created: '2024-01-08', content: 'description1' },
        { id: 1, role: 'user', created: '2024-01-08', content: 'description1' },
        { id: 1, role: 'robot', created: '2024-01-08', content: 'description1' }

      ],
      input: ''
    }
  },
  methods: {
    chatStart() {
      console.log('开始聊天')
    },
    chatRestart() {
      console.log('重新开始')
    },
    chatClear() {
      alert('')
    }
  }
}
</script>

<style lang="scss" scoped>
.left {
  float: left;
  width: 100%;
  height: 650px;
  border: 1px solid #e6e6e6;
  border-radius: 20px 20px 20px 20px;
  background-color: #fff;

  .top {
    position: relative;
    width: 100%;
    height: 96px;
    padding: 20px 10%;
  }

  .image-upload {
    position: relative;
    width: 100%;
    padding: 12px 10% 16px;
    cursor: pointer;
    background-color: #fff;
    &:after {
      position: absolute;
      bottom: 0;
      left: 50%;
      display: block;
      width: 80%;
      height: 1px;
      content: '';
      background-color: #e6e6e6;
      transform: translate(-50%, 0);
    }
  }
  .bottom {
    position: relative;
    padding: 12px 10% 16px;
    text-align: center;
  }
}
.right {
  position: relative;
  float: left;
  width: 100%;
  height: 650px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 20px 20px 20px 20px;
  .chat-messages {
    height: 500px;
    max-height: 500px;
    overflow: auto;
    padding: 30px;
  }
  .message-input {
    position: absolute;
    display: flex;
    left: 10px;
    width: 95%;
    justify-content: center;
    padding: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    background-color: #f5f9ff;
    .input-field {
      font-size: 14px;
      flex: 1;
      border: none;

      &:focus {
        outline: none;
      }
    }
    .submitBtn {

    }
  }
  .button-wrapper {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>

