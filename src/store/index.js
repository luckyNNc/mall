import Vue from 'vue';
import Vuex from 'vuex';

// 1.安装插件
Vue.use(Vuex);

// 2.创建Store对象
const store=new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCounter(state,payload){
      payload.count++
    },
    addtoCart(state,payload){
      payload.checked=true
      state.cartList.push(payload)
    }
  },
  actions:{
    addCart(context,payload){
      return new Promise((resolve,reject)=>{
        // 1.查找之前数组中是否有该商品
        let oldProduct=context.state.cartList.find(function(item){
          return item.iid===payload.iid
        })

        // 2.判断oldProduct
        if(oldProduct){
          // oldProduct.count+=1
          context.commit('addCounter',oldProduct)
          resolve('当前商品数量+1')
        }else {
          payload.count=1;
          context.commit('addtoCart',payload)
          resolve('添加新商品')
        }
      })
    }
  },
  getters:{
    cartLength(state){
      return state.cartList.length
    },
    cartList(state){
      return state.cartList
    }
  }
})

// 3.挂载到Vue实例上
export default store;
