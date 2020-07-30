<template>
  <div id="name">
    <!-- 导航-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 小导航障眼法 -->
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      class="tab-control"
      ref="xtobControl"
      v-show="isTobFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 展示 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 大图展示 -->
      <feature-view></feature-view>
      <!-- 小导航 -->
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tobControl"></tab-control>
      <!-- 商品 -->
      <goods-list :goods="ShowGoods"></goods-list>
    </scroll>
    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 公共
import Scroll from "components/common/scroll/Scroll";
import NavBar from "components/common/navbar/NavBar";
import BackTop from "components/content/backtop/BackTop";
import GoodsList from "components/content/goods/GoodsList";
import TabControl from "components/content/tabcontrol/TabControl";
// 个人
import HomeSwiper from "./childComps/HomeSwiper";
import FeatureView from "./childComps/FeatureView";
import RecommendView from "./childComps/RecommendView";
// 网络请求
import { getHomeMultidata, getHomeGoods } from "network/home";
import {itemListenerMixin} from"common/mixin";
import { debounce } from "common/utils";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
   mixins:[itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      // 设置默认显示页面
      currentType: "pop",
      // 默认为false
      isShowBackTop: false,
      // TobControl
      tobOffsetTop: 0,

      isTobFixed: false,

      saveY: 0,

      
    };
  },
  activated() {
    // console.log(this.saveY);
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
    // console.log('activated');
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  computed: {
    ShowGoods() {
      return this.goods[this.currentType].list;
    },
    destroyed() {
      console.log("no");
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听item中图片加载完成
  },
  methods: {
    //《事件监听相关方法》

    // 流行，新款，精选切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.xtobControl.currentIndex = index;
      this.$refs.tobControl.currentIndex = index;
    },
    // 回到顶部监听
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 回到顶部的隐藏
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      //决定是否吸顶
      this.isTobFixed = -position.y > this.tobOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    //监听轮播图图片
    swiperImageLoad() {
      //2.获取tobcontrol的OffsetTop
      this.tobOffsetTop = this.$refs.tobControl.$el.offsetTop;
    },
    //《 网络请求相关方法》

    // 1.请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 2.请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#name {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999999; */
}
.tab-control {
  z-index: 99999999;
  position: relative;
}
/* .tab-control {
  position: sticky;
  top: 44px;
} */
.content {
  overflow-y: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* height: calc(100% - 93px);
  overflow-y: hidden;
 margin-top: 44px; */
}
</style>