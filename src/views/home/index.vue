<template>
  <div class="app-container">
    <el-row :gutter="80" class="row-container">
      <el-col :span="12" :xs="24">
        <div class="left">
          <div class="top">
            <img class="img-circle" :src="'/favicon.ico'">
            <span class="title">EDA-QA</span>
            <br><br><br>
            <span class="detail">请选择一个合适的模型开始聊天。</span>
          </div>
          <div class="model-select">
            <el-form ref="modelForm" :model="modelForm" :rules="modelRules" class="model-form" label-position="left">

              <h3 class="title">模型选择</h3>

              <el-form-item prop="accuracy">
                <el-select ref="accuracy" v-model="modelForm.accuracy" placeholder="模型精度选择" name="accuracy">
                  <el-option label="4-bit" value="1" />
                  <el-option label="8-bit" value="2" />
                  <el-option label="16-bit" value="3" />
                  <el-option label="混合精度" value="4" />
                </el-select>
              </el-form-item>

              <el-form-item prop="LLM">
                <el-select ref="LLM" v-model="modelForm.LLM" placeholder="文本端大语言模型选择" name="LLM">
                  <el-option label="Vicuna-7B" value="1" />
                  <el-option label="LLaMA2-7B" value="2" />
                  <el-option label="Vicuna-13B" value="3" />
                  <el-option label="LLaMA2-13B" value="4" />
                </el-select>
              </el-form-item>

              <el-form-item prop="VLM">
                <el-select ref="VLM" v-model="modelForm.VLM" placeholder="视觉端模型选择" name="VLM">
                  <el-option label="Vision transformer" value="1" />
                  <el-option label="BLIP2" value="2" />
                  <el-option label="CLIP" value="3" />
                  <el-option label="ALBEF" value="4" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="bottom">
            <el-button type="primary" style="width: 100%; background-color: rgb(107, 174, 214); border-color: rgb(107, 174, 214);" @click="startChat">开始聊天</el-button>
            <br><br>
            <el-button type="primary" style="width: 100%; background-color: rgb(107, 174, 214); border-color: rgb(107, 174, 214);" @click="resetSelect">重置选择</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="12" :xs="24">
        <div class="right">
          <div class="right-top">
            <h3>模型优化</h3>
          </div>
          <div class="model-prompt">
            <div class="button-wrapper">
              <el-button type="primary" style="width:100%; background-color: rgb(107, 174, 214); border-color: rgb(107, 174, 214);" @click="dataGet">训练数据获取</el-button>
              <br><br>
              <el-button type="primary" style="width:100%; background-color: rgb(107, 174, 214); border-color: rgb(107, 174, 214);" @click="dataPreprocess">训练数据预处理</el-button>
              <br><br>
              <el-button type="primary" style="width:100%; background-color: rgb(107, 174, 214); border-color: rgb(107, 174, 214);" @click="modelStart">开始训练</el-button>
              <br><br>
              <el-button type="primary" style="width:100%; background-color: rgb(107, 174, 214); border-color: rgb(107, 174, 214);" @click="weightManage">训练权重管理</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ModelSelect from '@/views/home/components/ModelSelect.vue'
import ModelPrompt from '@/views/home/components/ModelPrompt.vue'
export default {
  name: 'Home',
  components: {
    ModelSelect,
    ModelPrompt
  },
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
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSelect() {
      this.$refs.modelForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.modelForm).then(() => {
            this.$router.push({ path: '/chat' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          alert('请选择模型！')
          return false
        }
      })
    },

    resetSelect() {
      this.modelForm.accuracy = ''
      this.modelForm.LLM = ''
      this.modelForm.VLM = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.left {
  float: left;
  width: 100%;
  height: 650px;
  .top {
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
  .model-select {
    position: relative;
    width: 100%;
    height: 350px;
    margin-top: 20px;
    padding: 20px 20px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 20px 20px 20px 20px;
    align-items: center;
    justify-content: center;
  }
  .bottom {
    position: relative;
    width: 100%;
    height: 130px;
    margin-top: 20px;
    padding: 20px 20px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 20px 20px 20px 20px;
    text-align: center;
  }
}
.right {
  position: relative;
  float: left;
  width: 100%;
  height: 650px;
  .right-top {
    height: 200px;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
  }
  .model-prompt {
    display: flex;
    flex-direction: column; /* 设置为纵向排列，如果需要横向排列可以使用 row */
    justify-content: center; /* 垂直居中 */
    align-items: center; /* 水平居中 */
    height: 400px;
    margin-top: 50px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    padding: 20px;
    .button-wrapper {
      width: 100%;
    }
  }
}
</style>
