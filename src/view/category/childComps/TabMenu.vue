<template>
  <scroll class="tab-menu">
    <div class="menu-list">
      <div
      @click="itemClick(index)"
        class="menu-list-item"
        :class="{active: index===currentIndex}"
        :key="index"
        v-for="(item,index) in categories"
      >{{item.title}}</div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "TabMenu",
  components: {
    Scroll,
  },
  props: {
    categories: Array,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods:{
      itemClick(index){
          this.currentIndex = index
        this.$emit('selectItem',index)
      }
  }
};
</script>

<style scoped>
/* 滑动 */
.tab-menu {
  background-color: #ffffff;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
}
.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 15px;
  color: black;
}
.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: ghostwhite;
  border-left: 3px solid var(--color-high-text);
}
</style>