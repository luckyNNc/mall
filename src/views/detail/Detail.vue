<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="detail-content" :cpullupload="true" ref="detailscroll"
            @scroll="contentScroll" :cprobetype="3">

      <detail-swiper :ctopImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"  @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :cgoods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

<!--    <toast :message="message" :show="show"></toast>-->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar';

import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList';
import BackTop from 'components/content/backTop/BackTop'

// import Toast from 'components/common/toast/Toast';  Toast封装-普通方式

import {backTopMixin} from '../../common/mixin.js'

import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail.js';

export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
    // Toast
  },
  mixins:[backTopMixin],
  data(){
    return{
      iid:null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      // isShowBackTop:false
      // message:'',
      // show:false
    }
  },
  created(){
    // 1.保存传入的iid
    this.iid=this.$route.params.iid;

    // 2.根据iid请求详细数据
    getDetail(this.iid).then((res)=>{
      // console.log(res);
      // 1.获取详情页轮播图数据
      this.topImages=res.result.itemInfo.topImages;
      // 2.获取商品信息
      this.goods=new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
      // 3.获取店铺信息
      this.shop=new Shop(res.result.shopInfo)
      //4.获取商品详情图片信息
      this.detailInfo=res.result.detailInfo
      //5.获取参数的信息
      this.paramInfo=new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
      //6.获取评论信息
      if(res.result.rate.cRate!==0){
        this.commentInfo=res.result.rate.list[0]
      }

      // this.$nextTick(()=>{
      //   this.themeTopYs=[]
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //
      //   console.log(this.themeTopYs);
      // })
    })

    //3.请求推荐数据
    getRecommend().then((res)=>{
      console.log(res);
      this.recommends=res.data.list
    })
  },
  // mounted(){
  //   this.$bus.$on('itemImageLoad',()=>{
  //     this.$refs.detailscroll.scroll.refresh()
  //   })
  // },
  // destroyed(){
  //   // console.log('destroyed');
  //   this.$bus.$off('itemImageLoad',()=>{
  //     this.$refs.detailscroll.scroll.refresh()
  //   })
  // },
  updated(){
    this.$refs.detailscroll.scroll.refresh();

    // this.themeTopYs=[]
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    //
    // console.log(this.themeTopYs);
  },
  methods:{
    imageLoad(){
      this.$refs.detailscroll.scroll.refresh()

      this.themeTopYs=[]
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)

      console.log(this.themeTopYs);
    },
    titleClick(index){
      // console.log(index);
      this.$refs.detailscroll.scroll.scrollTo(0,-this.themeTopYs[index],500);
    },
    contentScroll(position){
      // console.log(position);
      const positionY=-position.y;
      for(let i=0;i<this.themeTopYs.length;i++){
        if((i<this.themeTopYs.length-1
          &&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])
          ||(i===this.themeTopYs.length-1&&positionY>=this.themeTopYs[i])){
          this.currentindex=i;
          this.$refs.nav.currentIndex=this.currentindex
        }
      }

      // 判断BackTop是否显示
      // console.log(position);
      this.isShowBackTop=(-position.y)>1000
    },
    backClick(){
      // console.log('回到hhh顶部');
      this.$refs.detailscroll.scroll.scrollTo(0,0,500);
    },
    addToCart(){
      // console.log('加入购物车');
      // 1.获取购物车需要展示的信息
      const product={}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.realPrice
      product.iid=this.iid

      // 2.将商品添加到购物车
      // this.$store.commit('addCart', product);
      this.$store.dispatch('addCart',product).then((res)=>{
        console.log(res);
        // this.show=true
        // this.message=res
        // setTimeout(()=>{
        //   this.show=false
        //   this.message=''
        // },1500)

        console.log(this.$toast);
        this.$toast.show(res,2000)
      })
    }
  }
}
</script>

<style scoped>
.detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-content{
  overflow: hidden;
  height: calc(100% - 44px);
}
</style>
