<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isFu">
      <slot name="time-icon"></slot>
    </div>
    <div v-else>
      <slot name="time-icon-fu"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="time-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBerItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  computed: {
    isFu() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isFu ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    }
  }
};
</script>

<style>
.tab-bar-item {
  font-size: 14px;
  color: white;
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img {
  margin-top: 3px;
  width: 24px;
  height: 24px;
}
</style>
