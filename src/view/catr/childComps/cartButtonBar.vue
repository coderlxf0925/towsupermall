<template>
  <div class="bottom-bar">
    <!-- 按钮 -->
    <div class="check-content">
      <cart-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"></cart-button>
      <span>全选</span>
    </div>
    <!-- 合计 -->
    <div class="heji">合计:{{totalPrice}}</div>
    <div class="calculate" @click="cartClick">
      <strong>去计算({{checkLength}})</strong>
    </div>
  </div>
</template>

<script>
import cartButton from "components/content/CheckButton/CheckButton";
export default {
  name: "cartButtonBar",
  components: {
    cartButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0).toFixed(2)
      );
    },

    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;

      for (let item of this.$store.state.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
    cartClick() {
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品')
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 38px;
  background-color: lightblue;
  position: relative;
  bottom: 38px;
  line-height: 38px;
  display: flex;
}
.check-content {
  margin-left: 10px;
  align-items: center;
  display: flex;
}
.check-content span {
  color: black;
}
.check-button {
  margin-right: 5px;
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.heji {
  flex: 1;
  margin-left: 10px;
}
.calculate {
  padding-left: 10px;
  color: black;
  width: 90px;
  background: orange;
}
</style>