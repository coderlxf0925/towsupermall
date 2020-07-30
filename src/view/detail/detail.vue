<template>
  <div class="detail">
    <!-- 导航 -->
    <detail-Nav-Bar @titleClick="titleClick" ref="denav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- <ul>
        <li :key="item.date" v-for="item in $store.state.cartList">{{item}}</li>
      </ul> -->
      <!-- 轮播 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!-- 商品信息 -->
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <!-- 图片展示 -->
      <detail-image-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-image-info>
      <!-- 参数信息 -->
      <detail-params-info :param-info="itemParams" ref="params"></detail-params-info>
      <!-- 评论信息 -->
      <detail-commen-info :comment-info="commentInfo" ref="comment"></detail-commen-info>
      <!-- 推荐 -->
      <goods-list :goods="recommends" ref="recomment"></goods-list>
    </scroll>
    <!-- 底部 -->
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import detailNavBar from "./childComps/detailNavBAr";
import detailSwiper from "./childComps/detailSwiper";
import detailBaseInfo from "./childComps/DetailBaseInfo";
import detailShopInfo from "./childComps/DetailShopInfo";
import detailBottomBar from "./childComps/DetailBottomBar";
import detailImageInfo from "./childComps/DetailImageInfo";
import detailParamsInfo from "./childComps/DetailParamsInfo";
import detailCommenInfo from "./childComps/DetailCommenInfo";

import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";
import GoodsList from "components/content/goods/GoodsList";

import { getDetail, goods, getRecommend } from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";
import { mapActions } from "vuex";

// import Toast from "components/common/toast/Toast";
export default {
  name: "detail",
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    detailBottomBar,
    detailImageInfo,
    detailParamsInfo,
    detailCommenInfo,
    Scroll,
    GoodsList,
    BackTop,
    // Toast,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      // message: "",
      // show: false,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详细数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      //获取数据
      const data = res.result;
      // 取出轮播图数据
      this.topImages = res.result.itemInfo.topImages;
      // 创建商品对象
      this.goodsInfo = new goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 取出店铺信息
      this.shopInfo = data.shopInfo;
      // 取出详情信息
      this.detailInfo = data.detailInfo;
      //取出参数信息
      this.itemParams = data.itemParams;
      //取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
    // 4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);
      console.log(this.themeTopYs);
    }, 500);
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(["addCart"]),
    // 监听回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    detailImageLoad() {
      // console.log("--------");
      this.newrefresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    contentScroll(position) {
      // console.log(position);
      // 获取y值
      const positoinY = -position.y;
      // positoinY和主题中值就行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positoinY >= this.themeTopYs[i] &&
            positoinY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positoinY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.denav.currentIndex = this.currentIndex;
        }
      }
      // 什么时候显示回到顶部按钮
      this.isShowBackTop = -position.y > 1000;
    },
    // 加入购物车
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.iid = this.iid;

      //将商品加入到购物车里
      // this.$store.commit('addCart',product)
      // this.$store.dispatch("addCart", product);
      //添加到购物车成功
      this.addCart(product).then((res) => {
        this.$toast.show(res)
        // console.log(this.$toast);
        
        // this.show = true;
        // this.message = res;
        // // 定时器
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);
        // console.log(res);
      });
     
    },
  },
};
</script>

<style scoped>
.detail {
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 1;
}
.content {
  overflow: hidden;
  background-color: #fff;
  height: calc(100% - 44px - 49px);
}
</style>