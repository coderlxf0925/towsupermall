<template>
  <div id="category">
    <!-- 导航 -->
    <nav-bar class="shang-pin">
      <div slot="center">商品分类</div>
    </nav-bar>
    <!-- 内容 -->
    <div class="content">
      <!-- 分类 -->
      <tab-menu @selectItem="selectItem" :categories="categories"></tab-menu>
      <!-- 分类子 -->
      <scroll class="tab-category">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <!-- 推荐 -->
          <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"></tab-control>
          <tab-content-detail :tabdetail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";

import TabMenu from "./childComps/TabMenu";
import TabContentDetail from "./childComps/TabContentDetail";
import TabContentCategory from "./childComps/TabContentCategory";
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    TabMenu,
    TabContentCategory,
    TabContentDetail,
    TabControl,
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: "pop",
    };
  },
  computed: {
    // 获取分类详情数据
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
    },
  },

  created() {
    // 1.请求分类数据
    this._getCategory();
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        // console.log(res);
        // 获取分类的数据
        this.categories = res.data.category.list;
        // 初始化子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 获取第一页分类数据
        this._getSubcategories(0);
      });
    },
    // 获取maitKey数据
    _getSubcategories(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail('pop');
        this._getCategoryDetail('sell');
        this._getCategoryDetail('new');
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
    },

    // 绑定数据
    selectItem(index) {
      this._getSubcategories(index);
    },
    // 监听
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
    },
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.shang-pin {
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
  display: flex;
}
.tab-category {
  height: 100%;
  flex: 1;
  background-color: beige;
}
</style>