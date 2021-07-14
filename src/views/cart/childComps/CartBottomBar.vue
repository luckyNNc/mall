<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton';

export default {
  name: "CartBottomBar",
  components:{
    CheckButton
  },
  computed:{
    totalPrice(){
      return '￥'+this.$store.state.cartList.filter(item=>{return item.checked})
        .reduce((preValue,item)=>{return preValue+item.price*item.count},0)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item=>{return item.checked}).length
    },
    isSelectAll(){
      if(this.$store.state.cartList.length===0) return false
      return !this.$store.state.cartList.find(item=>{return !item.checked})
    }
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){ //全部选中
        this.$store.state.cartList.map(item=>{return item.checked=false})
      }else {  //部分选中或全部不选中
        this.$store.state.cartList.map(item=>{return item.checked=true})
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 133px;
  padding-top: 10px;
  font-size: 14px;

  display: flex;

}

.check-content{
  display: flex;
  margin-left: 10px;

}

.check-button{
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.price{
  margin-left: 20px;

  flex: 1;
}

.calculate{
  width: 100px;
  background-color: pink;
  text-align: center;
  color: #fff;
}
</style>
