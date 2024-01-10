<template>
  <div class="app-container">
    <el-row :gutter="20" class="row-container">
      <el-col :span="12" :xs="24">
        <div class="left">
          <el-card>
            <ModelSelect />
          </el-card>
        </div>
      </el-col>
      <el-col :span="12" :xs="24">
        <div class="right">
          <el-card>
            <ModelPrompt />
          </el-card>
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
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSetLineChartData(type) {
    }
  }
}
</script>

<style lang="scss">
  .left {
    height: 650px;
    background-color: #fff;
  }
  .right {
    height: 650px;
    background-color: #fff;
  }
</style>
