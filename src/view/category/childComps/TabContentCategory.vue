<template>
  <div id="tob-content">
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list"></grid-view>
    <div class="item" :key="index" v-for="(item,index) in subcategories.list">
      <a href="item.link">
        <img class="item-img" :src="item.image" alt />
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
import GridView from "components/common/gridView/GridView";
export default {
  name: "TabContentCategory",
  components: {
    GridView,
  },
  props: {
    subcategories: {
      type: Object,
      default() {
        return [];
      },
    },
  },
  
};
</script>

<style scoped>

.item{
    
    width: 40%;
  text-align: center;
  font-size: 12px;
margin-left: 15px;
    display:inline-block;
}
.item-img {
    border-radius: 10px;
  width: 80%;
  box-shadow: 0px 10px 10px rgba(0,0,0,0.3)
}

.item-text {
  margin-top: 15px;
}
</style>