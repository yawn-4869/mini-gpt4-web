<template>
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

    <el-row style="align-content: center">
      <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleSelect">开始聊天</el-button>
      <br>
      <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="resetSelect">重新选择</el-button>
    </el-row>
  </el-form>
</template>

<script>

export default {
  name: 'ModelSelect',
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

<style lang="scss">
  .el-select {
    width: 100%;
  }
</style>
