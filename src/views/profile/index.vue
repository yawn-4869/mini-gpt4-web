<template>
  <div class="app-container">
    <el-row :gutter="50" type="flex" justify="center" align="middle">
      <el-col :span="12" :xs="12">
        <el-card>
          <span class="el-icon-refresh"></span>
          <span>系统还原</span>
        </el-card>
      </el-col>
      <el-col :span="12" :xs="12">
        <el-card>
          <span class="el-icon-menu"></span>软件初始化
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  .app-container {
    display: flex;
    flex-direction: column; /* 设置为纵向排列，如果需要横向排列可以使用 row */
    justify-content: center; /* 垂直居中 */
  }
</style>

