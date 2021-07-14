<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="ptabClick" ref="tabcontrol1"
                 class="top-tabcontrol" v-show="isTabFixed"></tab-control>

    <scroll class="content"
            ref="scrollcon"
            :cprobetype="3"
            @scroll="scrollcontent"
            :cpullupload="true" @pullingUp="loadMore">
<!--            :cpullupload="true" @pullingUp="loadMore"-->
      <home-swiper v-bind:cbanners="banners" @sImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view v-bind:crecommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="ptabClick" ref="tabcontrol2"></tab-control>
      <goods-list :cgoods="goods[currentType].list"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home.js';
import {debounce} from '../../common/utils.js';

import {backTopMixin} from '../../common/mixin.js'


export default {
  name: "Home",
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins:[backTopMixin],
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      // isShowBackTop:false,
      taboffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  activated(){
    // console.log('activated');
    this.$refs.scrollcon.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scrollcon.scroll.refresh()
  },
  deactivated(){
    //1.保存y值
    // console.log('deactivated');
    this.saveY=this.$refs.scrollcon.scroll.y;
    //2.取消事件的监听
    this.$bus.$off('itemImageLoad',()=>{
      this.$refs.scrollcon.scroll.refresh()
    })
  },
  created(){
    // 请求多个数据
    this.getHomeM();
    // 请求商品数据
    this.getHomeG('pop');
    this.getHomeG('new');
    this.getHomeG('sell');
  },
  mounted(){
    //1.监听goodslistitem中图片加载完成
    // const refresh=debounce(this.$refs.scrollcon.scroll.refresh,200)
    this.$bus.$on('itemImageLoad',()=>{
      // console.log('-----');
      this.$refs.scrollcon.scroll.refresh()
      // refresh();
    })
  },
  methods:{

    ptabClick(index){
      switch(index){
        case 0:
          this.currentType='pop';
          break;
        case 1:
          this.currentType='new';
          break;
        case 2:
          this.currentType='sell';
          break
      }
      this.$refs.tabcontrol1.currentindex=index;
      this.$refs.tabcontrol2.currentindex=index;
    },

    backClick(){
      // console.log('回到hhh顶部');
      this.$refs.scrollcon.scroll.scrollTo(0,0,500);
    },
    scrollcontent(position){
      // 1，判断BackTop是否显示
      // console.log(position);
      this.isShowBackTop=(-position.y)>1000

      // 2.tabcontrol是否吸顶(position:fixed)
      this.isTabFixed=(-position.y)>this.taboffsetTop;
    },
    loadMore(){
      console.log('上拉加载更多');
      this.getHomeG(this.currentType)
    },
    swiperImageLoad(){
      // 获取tabcontrol的offsetTop；所有的组件对象都有一个$el：用于获取组件中的元素
      // console.log(this.$refs.tabcontrol.$el.offsetTop);

      // 监听轮播图加载完成后，再获取offsetTop值相对准确一些
      this.taboffsetTop=this.$refs.tabcontrol2.$el.offsetTop
    },


    // 关于网络请求的方法
    getHomeM(){
      getHomeMultidata().then((res)=>{
        console.log(res);
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list;
      })
    },
    getHomeG(type){
      const page=this.goods[type].page+1;
      getHomeGoods(type,page).then((res)=>{
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page+=1;

        this.$refs.scrollcon.scroll.finishPullUp();   //上拉加载更多更多的页
      })
    }
  }
}
</script>

<style scoped>
#home{
  padding-top:44px;
  /*height: 100vh;*/

  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  z-index: 9;
}


.content{
  /*height: 300px;*/
  /*overflow: hidden;*/
  /*哈哈哈测试一下*/

  position: absolute;
  top:44px;
  bottom:49px;
  left: 0;
  right: 0;
}

.top-tabcontrol{
  position: relative;
  z-index: 9;
}

</style>
