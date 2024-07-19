<template>
  <div class="app-container">
    <el-row :gutter="80" class="row-container">
      <el-col :span="12" :xs="24">
        <div class="left">
          <div class="top">
            <el-input placeholder="搜索" suffix-icon="el-icon-search" />
          </div>
          <div class="image-upload">
            <SingleImageUpload ref="imgUpload" id="myImgUpload" url="http://localhost:5001/api/conversation/create" v-model="postForm.image_uri" />
          </div>
          <div class="bottom">
            <el-button :loading="startLoading" type="primary" style="width:40%; background-color: rgb(107, 174, 214); border-color: rgb(107, 174, 214);" @click="chatStart">开始聊天</el-button>
            <el-button :loading="resetLoading" type="primary" style="width:40%; background-color: rgb(107, 174, 214); border-color: rgb(107, 174, 214);" @click="chatRestart">重新开始</el-button>
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
            <el-input v-model="questionForm.content" placeholder="请输入内容" />
            <el-button icon="el-icon-delete" circle  @click="chatClear"/>
            <el-button :loading="askLoading" type="primary" icon="el-icon-position" style="background-color: rgb(107, 174, 214); border-color: rgb(107, 174, 214);" @click="sendQuestion" circle />
          </form>
          <!-- <div class="button-wrapper">
            <el-button @click="chatClear">清空</el-button>
          </div> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SingleImageUpload from '@/views/chat/components/SingleImageUpload.vue'
import MessageRow from '@/views/chat/components/MessageRow.vue'
import { getLastConversation, getLastMessage, removeLastMessage } from '@/utils/auth';
import { setLastMessage } from '@/utils/auth';
import { MessageBox } from 'element-ui'
import { mapGetters } from 'vuex';

const chatForm = {
  title: '', // 主题
  content: '', // 内容
  brief: '', // 摘要
  image_uri: '', // 图片
  id: undefined,
  time: undefined
}

const chatMessage = {
  id: '',
  role: '',
  createdTime:'',
  content: ''
}

export default {
  components: { MessageRow, SingleImageUpload },
  computed: {
    ...mapGetters(['conversationId']),
  },
  data() {
    return {
      postForm: Object.assign({}, chatForm),
      questionForm: Object.assign({}, chatMessage),
      startLoading: false,
      resetLoading: false,
      askLoading: false,
      messageList: [
      ],
      lastMessageId: 0
    }
  },
  created() {
    if(getLastConversation()) {
      this.lastMessageId = getLastMessage() ? getLastMessage() : 0;
      if(this.$store.state.conversation.conversationId != 0) {
        this.questionForm.id = this.$store.state.conversation.conversationId
        this.$store.dispatch('conversation/detail', this.questionForm).then((response) => {
          const {answers, asks, id} = response.data
          const len = Math.max(answers.length, asks.length)
          for(let i = this.lastMessageId; i < len; ++i) {
            if(i < asks.length) {
              this.messageList.push({id: asks[i].id, role: 'user', created: asks[i].createTime, content: asks[i].content})
            }
            if(i < answers.length) {
              this.messageList.push({id: answers[i].id, role: 'robot', created: answers[i].createTime, content: answers[i].content})
            }
          }
        })
      }
    }
  },
  methods: {
    chatStart() {
      this.startLoading = true;
      this.$refs.imgUpload.uploadImg();
      this.messageList = []
      this.startLoading = false;
      removeLastMessage();
      this.lastMessageId = 0;
    },
    chatRestart() {
      this.resetLoading = true;
      this.$refs.imgUpload.uploadImg();
      this.messageList = []
      this.resetLoading = false;
      removeLastMessage();
      this.lastMessageId = 0;
    },
    sendQuestion() {
      console.log(this.$store.state.conversation.conversationId)
      if(this.questionForm.content === '') {
        return
      }
      if(this.$store.state.conversation.conversationId === undefined || this.$store.state.conversation.conversationId == 0) {
        this.$message({ message: '您还未上传图片, 请上传图片后点击左边开始聊天按钮再发送问题', type: 'warning' });
        return
      }
      this.questionForm.role = "user"
      this.askLoading = true;
      this.questionForm.id = this.$store.state.conversation.conversationId
      this.messageList.push({id: this.questionForm.id, role: this.questionForm.role, created: '2024-04-24', content: this.questionForm.content})
      this.$store.dispatch('conversation/ask', this.questionForm).then((response) => {
        console.log(response)
        const answer = response.substring(5).trim();
        console.log(answer)
        this.messageList.push({id: this.questionForm.id, role: 'robot', created: '2024-04-26', content: answer})
        this.askLoading = false
      }).catch(() => {
        this.askLoading = false
      })
      this.questionForm.content = ""
    },
    chatClear() {
      MessageBox.confirm('确认要清空当前聊天吗？这并不会清空您在云端的聊天记录', '清空确认', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(()=>{
        const lastMessageId = this.messageList.length
        setLastMessage(lastMessageId)
        this.messageList = []
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.left {
  float: left;
  width: 100%;
  height: 500px;
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
    height: 330px;
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
    padding: 15px 10% 16px;
    text-align: center;
  }
}
.right {
  position: relative;
  float: left;
  width: 100%;
  height: 500px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 20px 20px 20px 20px;
  .chat-messages {
    height: 400px;
    max-height: 400;
    overflow: auto;
    padding: 30px;
  }
  .message-input {
    position: absolute;
    display: flex;
    left: 20px;
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

