<template>
  <div>
    <goods-list-item class="tabcontent"  :key="index" v-for="(item,index) in tabdetail " :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GridView from "components/common/gridView/GridView";
import GoodsListItem from "components/content/goods/GoodsListItem";
export default {
  name: "TabContentDetail",
  components: {
    GoodsListItem,
    GridView,
  },
  props: {
    tabdetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.tabcontent{
  width: 40%;
  display:inline-block;
  margin: 13px;
}
</style>