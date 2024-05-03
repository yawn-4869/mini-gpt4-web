<template>
  <div>
    <h3 class="title">模型优化</h3>
    <el-button type="primary" style="width:100%;" @click="dataGet">训练数据获取</el-button>
    <br><br>
    <el-button type="primary" style="width:100%;" @click="dataPreprocess">训练数据预处理</el-button>
    <br><br>
    <el-button type="primary" style="width:100%;" @click="modelStart">开始训练</el-button>
    <br><br>
    <el-button type="primary" style="width:100%;" @click="weightManage">训练权重管理</el-button>
  </div>
</template>

<script>

export default {
  name: 'ModelPrompt',
  data() {
    return {
      modelForm: {
        accuracy: '',
        LLM: '',
        VLM: ''
      },
      modelRules: {

      }
    }
  },
  methods: {
    dataGet() {
      // TODO: 数据获取相关代码
    },

    dataPreprocess() {
      // TODO: 数据预处理相关代码
    },

    modelStart() {
      // TODO: 数据训练相关代码
    },

    weightManage() {
      // TODO: 数据权重管理相关代码
    }
  }
}
</script>
