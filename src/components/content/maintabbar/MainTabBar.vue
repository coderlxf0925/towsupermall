        <template>
  <tab-ber>
    <tab-ber-item path="/home" activeColor="red">
      <img slot="time-icon" src="~assets/img/tabbar/home.svg" alt />
      <img slot="time-icon-fu" src="~assets/img/tabbar/home_active.svg" alt />
      <div slot="time-text">首页</div>
    </tab-ber-item>
    <tab-ber-item path="/category" activeColor="red">
      <img slot="time-icon" src="~assets/img/tabbar/category.svg" alt />
      <img slot="time-icon-fu" src="~assets/img/tabbar/category_active.svg" alt />
      <div slot="time-text">分类</div>
    </tab-ber-item>
    <tab-ber-item path="/cart" activeColor="red">
      <img slot="time-icon" src="~assets/img/tabbar/cart.svg" alt />
      <img slot="time-icon-fu" src="~assets/img/tabbar/cart_active.svg" alt />
      <div slot="time-text">购物车</div>
    </tab-ber-item>
    <tab-ber-item path="/profile" activeColor="red">
      <img slot="time-icon" src="~assets/img/tabbar/profile.svg" alt />
      <img slot="time-icon-fu" src="~assets/img/tabbar/profile_active.svg" alt />
      <div slot="time-text">我的</div>
    </tab-ber-item>
  </tab-ber>
</template>
		<script>
import TabBer from "components/common/tabbar/TabBer";
import TabBerItem from "components/common/tabbar/TabBerItem";

export default {
  name: "MainTabBar",
  components: {
    TabBer,
    TabBerItem
  }
};
</script>
		<style scoped>
</style>