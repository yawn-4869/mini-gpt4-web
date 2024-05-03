<template>
  <div :class="{'active-session': active}" @click="setActiveSession(item)">
    <span class="svg-container">
      <svg-icon icon-class="pdf" />
    </span>
    <span class="name">{{ item.topic }}</span>
    <br>
    <span class="time">{{ item.created }}</span>
    <span class="preview">{{ item.brief }}</span>
  </div>
</template>

<script>
export default {
  name: 'SessionItem',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    setActiveSession(session) {
      this.$emit('click', session);
    }
  }
}
</script>

<style lang="scss">
.session-item.active-session {
  margin-top: -1px;
  margin-left: -1px;
  padding-top: 13px;
  border: 0;
  background-color: #671afb;
  width: calc(100% + 2px);
  padding-left: calc(10% + 1px);
  span {
    color: #fff;
    background: transparent;
  }
  &:after {
    display: none;
  }
}
.session-item {
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
  .svg-container {
    float: left;
    width: 40px;
    height: 40px;
    margin-right: 12px;
    border-radius: 50%;
    object-fit: cover;
    .svg-icon {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    font-size: 14px;
    line-height: 22px;
    color: #1a1a1a;
    font-weight: 600;
  }
  .time {
    font-size: 14px;
    position: absolute;
    top: 16px;
    right: 10%;
    padding: 0 0 5px 5px;
    color: #999;
    background-color: #fff;
  }
  .preview {
    font-size: 14px;
    display: inline-block;
    overflow: hidden !important;
    width: 70%;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #999;
  }
}
</style>
