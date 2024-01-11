<template>
  <div class="app-container">
    <el-row :gutter="20">
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
            <img class="img-circle" :src="'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'">
            <span class="title">基于多模态大模型的工程结构震害智能评估系统</span>
            <br><br><br>
            <span class="detail">请选择一个问答记录，进行处理和保存。</span>
          </div>
          <div class="chat">
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

export default {
  components: { SessionItem },
  data() {
    return {
      activeSession: {
        id: 0,
        topic: '',
        created: '',
        brief: ''
      },
      sessionList: [
        { id: 1, topic: 'topic1', created: '2024-01-08', brief: 'description1' },
        { id: 2, topic: 'topic2', created: '2024-01-08', brief: 'description2' },
        { id: 3, topic: 'topic3', created: '2024-01-08', brief: 'description3' },
        { id: 4, topic: 'topic4', created: '2024-01-08', brief: 'description4' },
        { id: 5, topic: 'topic1', created: '2024-01-08', brief: 'description1' },
        { id: 6, topic: 'topic2', created: '2024-01-08', brief: 'description2' },
        { id: 7, topic: 'topic3', created: '2024-01-08', brief: 'description3' },
        { id: 8, topic: 'topic4', created: '2024-01-08', brief: 'description4' },
        { id: 9, topic: 'topic1', created: '2024-01-08', brief: 'description1' },
        { id: 10, topic: 'topic2', created: '2024-01-08', brief: 'description2' },
        { id: 11, topic: 'topic3', created: '2024-01-08', brief: 'description3' },
        { id: 12, topic: 'topic4', created: '2024-01-08', brief: 'description4' }
      ]
    }
  },
  methods: {
    setActiveSession(session) {
      this.activeSession = session
    },
    chatFormation() {
      // TODO: 问答记录格式化函数
    },
    chatSave() {
      // TODO: 问答记录保存函数
    }

  }
}
</script>

<style lang="scss" scoped>
.left {
  float: left;
  width: 100%;
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
    .button-wrapper {
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
  }
}
</style>

