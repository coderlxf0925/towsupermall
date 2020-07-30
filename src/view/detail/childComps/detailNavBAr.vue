<template>
   
      <!-- 导航 -->
      <nav-bar class="nav-bar">
          <div slot="left" class="back" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
              </div>
          <div slot="center" class="title">
              <div 
              :key="item" 
              v-for="(item,index) in title" 
              class="title-time"
              :class="{active:index === currentIndex}"
              @click="titleClick(index)"
              >{{item}}</div>
          </div>
          </nav-bar>
  
</template>

<script>
import NavBar from"components/common/navbar/NavBar";
export default {
    name:'detailNavBar',
     components:{
        NavBar
    },
    data(){
        return{
            title:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    methods:{
        titleClick(index){
            this.currentIndex =index
            this.$emit('titleClick',index)
        },
        backClick(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.nav-bar{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
}
.title{
    display:flex;
    font-size: 13px;
}
.title-time{
    flex: 1;
}
.active{
    color: var(--color-high-text);
}
.back img{
    margin-left: 10px;
    margin-top: 10px;
}
</style>