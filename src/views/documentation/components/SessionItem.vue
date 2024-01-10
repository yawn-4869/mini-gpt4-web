<template>
  <div :class="{'active-session': active}">
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
  }
}
</script>

<style lang="scss">
.active-session {
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
</style>
