<template>
  <div class="catr">
    <!-- 导航栏 -->
    <catr-nav-bar class="catr-nav-bar">
      <div slot="center">购物车({{length}})</div>
    </catr-nav-bar>
    <!-- 列表 -->
    <cart-list></cart-list>
    <!-- 底部计算 -->
    <cart-button-bar></cart-button-bar>
  </div>
</template>

<script>
import catrNavBar from "components/common/navbar/NavBar";

import cartButtonBar from "./childComps/cartButtonBar";
import cartList from "./childComps/cartList";

import { mapGetters } from "vuex";
export default {
  name: "Catr",
  components: {
    catrNavBar,
    cartList,
    cartButtonBar
  },
  computed: {
    ...mapGetters({
      length: "cartLength",
    })
  }
};
</script>

<style scoped>
.catr-nav-bar {
  background-color: var(--color-tint);
  color: white;
}
</style>