<template>
  <swiper class="detailswiper">
      <swiper-item :key="item" v-for="item in topImages">
          <img :src="item" alt="">
      </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from"components/common/swiper";
export default {
    name:'dateilSwiper',
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        topImages:{
            type:Array,
            default(){
                return[]
            }
        }
    }
}
</script>

<style scoped>
.detailswiper{
    height: 400px;
    overflow: hidden;
}
</style>