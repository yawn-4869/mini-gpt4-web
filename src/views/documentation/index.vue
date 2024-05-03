<template>
  <div class="app-container">
    <el-row :gutter="50">
      <el-col :span="8" :xs="24">
        <div class="left">
          <div class="top">
            <el-input placeholder="搜索" suffix-icon="el-icon-search" />
          </div>
          <div class="session-list">
            <SessionItem
              v-for="(session, index) in sessionList"
              :key="session.id"
              :active="session.id === activeSession.id"
              :item="sessionList[index]"
              class="session-item"
              @click="setActiveSession(session)"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="16" :xs="24">
        <div class="right">
          <div class="right-top">
            <img class="img-circle" :src="'/favicon.ico'">
            <span class="title">基于多模态大模型的工程结构震害智能评估系统</span>
            <br><br><br>
            <span class="detail">请选择一个问答记录，进行处理和保存。</span>
          </div>
          <div class="chat">
            <div class="chat-messages">
              <ChatDetailRow
                v-for="(message, index) in messageList"
                :key="message.id"
                :message="messageList[index]"
              />
            </div>
            <div class="button-wrapper">
              <el-button @click="chatFormation">问答记录格式化</el-button>
              <el-button @click="chatSave">保存</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SessionItem from '@/views/documentation/components/SessionItem.vue'
import ChatDetailRow from '@/views/documentation/components/ChatDetailRow.vue'

export default {
  components: { SessionItem, ChatDetailRow },
  data() {
    return {
      activeSession: {
        id: '',
        topic: '',
        created: '',
        brief: ''
      },
      messageList: [

      ],
      sessionList: [

      ]
    }
  },
  created() {
    this.$store.dispatch('conversation/list').then((response) => {
        response.data.forEach((message, index) => {
          const {id, title, createTime} = message
          // const timeStr = parseTime(createTime)
          const parsedTime = new Date(createTime);
          const formattedDate = parsedTime.toISOString().split("T")[0];
          const topic = '问答记录' + (index + 1)
          this.sessionList.push({id: id, topic: topic, created: formattedDate, brief: title})
        });
      })
  },
  methods: {
    setActiveSession(session) {
      this.activeSession = session
      this.messageList = []
      this.$store.dispatch('conversation/detail', this.activeSession).then((response) => {
        const {answers, asks, id} = response.data
        const len = Math.max(answers.length, asks.length)
        for(let i = 0; i < len; ++i) {
          if(i < asks.length) {
            this.messageList.push({id: asks[i].id, role: 'user', created: asks[i].createTime, content: asks[i].content})
          }
          if(i < answers.length) {
            this.messageList.push({id: answers[i].id, role: 'robot', created: answers[i].createTime, content: answers[i].content})
          }
        }
      })
    },
    chatFormation() {
      // TODO: 问答记录格式化函数
    },
    chatSave() {
      if(this.activeSession.id === '') {
        this.$message({ message: '请选择一个对话记录后再点击保存导出', type: 'warning' });
        return
      }
      this.$store.dispatch('conversation/download', this.activeSession.id).then((response) => {
        // 创建一个 Blob 对象
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        
        // 获取当前时间
        const currentTime = new Date().toISOString().slice(0, 19).replace(/[-T]/g, '').replace(/:/g, '');
        
        if (confirm('将导出问答记录' +  this.activeSession.id + ', 是否确定')) {
          // 创建一个下载链接
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(blob);
          
          // 设置下载文件的名称为当前时间
          downloadLink.download = currentTime + '.xlsx';
          
          // 点击下载链接
          downloadLink.click();
        }
      }).catch((error) => {
        this.$message({ message: '下载失败', type: 'error' });
        // 处理错误
        console.error('下载失败：', error);
      });
    }

  }
}
</script>

<style lang="scss" scoped>
.left {
  float: left;
  width: 100%;
  min-width: 250px;
  height: 650px;
  overflow: hidden;
  border: 1px solid #e6e6e6;
  border-radius: 20px 20px 20px 20px;
  background-color: #fff;

  .top {
    position: relative;
    width: 100%;
    height: 100px;
    padding: 20px;
  }

  .session-list {
    margin-left: -1px;
    border-right: 1px solid #e6e6e6;
    border-left: 1px solid #e6e6e6;
    width: calc(100% + 2px);
    min-width: 280px;
    height: 550px;
    overflow: auto;
  }
}
.right {
  position: relative;
  float: left;
  width: 100%;
  height: 650px;
  background-color: #f5f9ff;
  .right-top {
    width: 100%;
    height: 130px;
    padding: 20px 20px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 20px 20px 20px 20px;

    .img-circle {
        border-radius: 50%;
        width: 80px;
        height: 80px;
        float: left;
    }

    .title {
        padding: 20px;
        color: #1a1a1a;
        font-weight: 600;
        font-size: 20px;
    }

    .detail {
        display: block;
        margin-left: 100px;
        color: #999;
    }
  }
  .chat {
    width: 100%;
    height: 500px;
    margin-top: 20px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 20px 20px 20px 20px;
    .chat-messages {
      height: 420px;
      max-height: 420px;
      overflow: auto;
      padding: 30px;
    }
    .button-wrapper {
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
  }
}
</style>

