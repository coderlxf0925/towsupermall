import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>import('../view/home/home')
const Category = () =>import('../view/category/category')
const Cart = () =>import('../view/catr/catr')
const profile = () =>import('../view/profile/profile')
const Detail = () =>import('../view/detail/detail')

// 安装
Vue.use(VueRouter)
// 创建
const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/profile',
        component: profile
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/detail/:iid',
        component: Detail
    },
    
]
const router = new VueRouter({
routes,
mode:'history'
})
export default router