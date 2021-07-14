<template>
  <swiper>
    <swiper-item v-for="item in cbanners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="simgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper';

export default {
  name: "HomeSwiper",
  props:{
    cbanners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      isLoad:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    simgLoad(){
      // console.log('----');
      if(!this.isLoad){   //为了让组件只发出一次事件，不需要发出4次，使用isLoad变量进行状态记录
        this.$emit('sImageLoad');
        this.isLoad=true
      }
    }
  }
}
</script>

<style scoped>

</style>
