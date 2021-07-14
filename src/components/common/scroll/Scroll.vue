<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: "Scroll",
  props:{
    cprobetype:{
      type:Number,
      default:0
    },
    cpullupload:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted(){  //推荐使用ref拿元素，比较准确
    // 1.创建BScroll对象
    this.scroll=new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.cprobetype,
      pullUpLoad:this.cpullupload
    })

    // 2.监听滚动的位置
    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll',position)
    })

    // 3.监听scroll滚动到底部
    this.scroll.on('pullingUp',()=>{
      // console.log('监听滚动到底部');
      this.$emit('pullingUp');
    })

    // console.log(this.scroll);
  }
}
</script>

<style scoped>

</style>
