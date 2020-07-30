<template>
  <div class="recommend">
      <div 
      class="recommend-item"
      :key="item.data" 
      v-for="item in recommends">
          <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
          </a>
         
      </div>
  </div>
</template>

<script>
export default {
    naem:'RecommendView',
    props:{
        recommends:{
            type:Array,
            default(){
                return[]
            }
        }
    }
}
</script>

<style>
.recommend{
    width: 100%;
    display: flex;
    padding: 15px 0 20px;
      border-bottom: 10px solid  #eeeeee;
}
.recommend-item{
    
    flex: 1;
    text-align: center;
  
}
.recommend-item img{
    margin-bottom: 5px;
    width: 80px;
}
</style>