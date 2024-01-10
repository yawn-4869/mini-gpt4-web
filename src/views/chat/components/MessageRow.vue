<template>
  <div :class="['message-wrapper', message.role === 'user' ? 'reverse' : '']">
    <div class="avatar-wrapper">
      <el-avatar v-if="message.role === 'user'" :src="avatar" class="avatar" />
      <el-avatar v-else :src="avatar" class="avatar" />
    </div>
    <div class="message-box-wrapper">
      <div class="message-box">
        {{ message.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageRow',
  props: {
    avatar: {
      type: String,
      default: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    },
    message: {
      type: Object,
      required: true
    }
  }
}

</script>

<style lang="scss" scoped>
.message-wrapper {
  display: flex;
  align-items: flex-start;
  padding-bottom: 20px;

  .avatar-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .message-box {
    background-color: #eff3ff;
    border-radius: 4px;
    padding: 10px;
    font-size: 14px;
    line-height: 16px;
    max-width: 50%;

    &-wrapper {
      margin: 0 12px;
      width: 100%;
      display: flex;

      span {
        font-size: 10px;
        line-height: 16px;
        color: var(--text-light);
        opacity: 0.6;
      }
    }
  }

  &.reverse {
    justify-content: flex-end;

    .message-box {
      background-color: #681afd;
      color: #fff;

      &-wrapper {
        flex-direction: column;
        align-items: flex-end;
      }
    }

    .avatar-wrapper {
      order: 2;
    }
  }
}
</style>
