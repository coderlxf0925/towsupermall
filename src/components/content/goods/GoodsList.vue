<template>
  <div class="goods">
    <goods-list-item 
    :key="item.data" 
    v-for="item in goods"
    :goods-item="item" 
    />

      </div>
</template>

<script>
import GoodsListItem from"./GoodsListItem";
export default {
  name: "GoodsList",
  components:{
    GoodsListItem
  },
   props:{
     goods:{
       type:Array,
       default(){
         return[]
       }
     }
   }
};
</script>

<style>
.goods{
  display: flex;
  flex-wrap: wrap;
  /* 均等分 */
  justify-content: space-around;
}
</style>