import { ADD_COUNTER, ADD_TO_CART } from "./mutationsTypes";


export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 查找数组里面是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //判断oldProduct是否有值

      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}