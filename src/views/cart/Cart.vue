<template>
  <div class="cart">
<!--    导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

<!--    商品列表-->
    <cart-list></cart-list>

<!--    底部工具栏-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar';
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar';

import {mapGetters} from 'vuex';    //mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性

export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    //两种语法
    ...mapGetters(['cartLength','cartList']),
    // ...mapGetters({
    //   length:'cartLength',
    //   list:'cartList'
    // })
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
