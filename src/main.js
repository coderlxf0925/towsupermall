import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from'./router'

import FastClick from'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from'components/common/toast'
Vue.config.productionTip = false


//原型
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
//解决移动端300ms延迟
FastClick.attach(document.body)
//使用懒加载插件
Vue.use(VueLazyLoad)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
