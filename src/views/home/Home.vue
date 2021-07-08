<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content"
            ref="scrollcon"
            :cprobetype="3"
            @scroll="scrollcontent"
            :cpullupload="true" @pullingUp="loadMore">
      <home-swiper v-bind:cbanners="banners"></home-swiper>
      <recommend-view v-bind:crecommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="ptabClick"></tab-control>
      <goods-list :cgoods="goods[currentType].list"></goods-list>
      <ul>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
        <li>列表4</li>
        <li>列表5</li>
        <li>列表6</li>
        <li>列表7</li>
        <li>列表8</li>
        <li>列表9</li>
        <li>列表10</li>
        <li>列表11</li>
        <li>列表12</li>
        <li>列表13</li>
        <li>列表14</li>
        <li>列表15</li>
        <li>列表16</li>
        <li>列表17</li>
        <li>列表18</li>
        <li>列表19</li>
        <li>列表20</li>
        <li>列表21</li>
        <li>列表22</li>
        <li>列表23</li>
        <li>列表24</li>
        <li>列表25</li>
        <li>列表26</li>
        <li>列表27</li>
        <li>列表28</li>
        <li>列表29</li>
        <li>列表30</li>
        <li>列表31</li>
        <li>列表32</li>
        <li>列表33</li>
        <li>列表34</li>
        <li>列表35</li>
        <li>列表36</li>
        <li>列表37</li>
        <li>列表38</li>
        <li>列表39</li>
        <li>列表40</li>
        <li>列表41</li>
        <li>列表42</li>
        <li>列表43</li>
        <li>列表44</li>
        <li>列表45</li>
        <li>列表46</li>
        <li>列表47</li>
        <li>列表48</li>
        <li>列表49</li>
        <li>列表50</li>
      </ul>
      <ul>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
        <li>列表4</li>
        <li>列表5</li>
        <li>列表6</li>
        <li>列表7</li>
        <li>列表8</li>
        <li>列表9</li>
        <li>列表10</li>
        <li>列表11</li>
        <li>列表12</li>
        <li>列表13</li>
        <li>列表14</li>
        <li>列表15</li>
        <li>列表16</li>
        <li>列表17</li>
        <li>列表18</li>
        <li>列表19</li>
        <li>列表20</li>
        <li>列表21</li>
        <li>列表22</li>
        <li>列表23</li>
        <li>列表24</li>
        <li>列表25</li>
        <li>列表26</li>
        <li>列表27</li>
        <li>列表28</li>
        <li>列表29</li>
        <li>列表30</li>
        <li>列表31</li>
        <li>列表32</li>
        <li>列表33</li>
        <li>列表34</li>
        <li>列表35</li>
        <li>列表36</li>
        <li>列表37</li>
        <li>列表38</li>
        <li>列表39</li>
        <li>列表40</li>
        <li>列表41</li>
        <li>列表42</li>
        <li>列表43</li>
        <li>列表44</li>
        <li>列表45</li>
        <li>列表46</li>
        <li>列表47</li>
        <li>列表48</li>
        <li>列表49</li>
        <li>列表50</li>
      </ul>
      <ul>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
        <li>列表4</li>
        <li>列表5</li>
        <li>列表6</li>
        <li>列表7</li>
        <li>列表8</li>
        <li>列表9</li>
        <li>列表10</li>
        <li>列表11</li>
        <li>列表12</li>
        <li>列表13</li>
        <li>列表14</li>
        <li>列表15</li>
        <li>列表16</li>
        <li>列表17</li>
        <li>列表18</li>
        <li>列表19</li>
        <li>列表20</li>
        <li>列表21</li>
        <li>列表22</li>
        <li>列表23</li>
        <li>列表24</li>
        <li>列表25</li>
        <li>列表26</li>
        <li>列表27</li>
        <li>列表28</li>
        <li>列表29</li>
        <li>列表30</li>
        <li>列表31</li>
        <li>列表32</li>
        <li>列表33</li>
        <li>列表34</li>
        <li>列表35</li>
        <li>列表36</li>
        <li>列表37</li>
        <li>列表38</li>
        <li>列表39</li>
        <li>列表40</li>
        <li>列表41</li>
        <li>列表42</li>
        <li>列表43</li>
        <li>列表44</li>
        <li>列表45</li>
        <li>列表46</li>
        <li>列表47</li>
        <li>列表48</li>
        <li>列表49</li>
        <li>列表50</li>
      </ul>
    </scroll>
    <div>呵呵呵🙂</div>

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
      isShowBackTop:false
    }
  },
  created(){
    // 请求多个数据
    this.getHomeM();
    // 请求商品数据
    this.getHomeG('pop');
    this.getHomeG('new');
    this.getHomeG('sell');
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
    },

    backClick(){
      // console.log('回到hhh顶部');
      this.$refs.scrollcon.scroll.scrollTo(0,0,500);
    },
    scrollcontent(position){
      // console.log(position);
      this.isShowBackTop=(-position.y)>1000
    },
    loadMore(){
      // console.log('上拉上拉');
      this.getHomeG(this.currentType)
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
        console.log(res);
        // this.goods[type].list.push[...res.data.list];
        this.goods[type].page+=1;

        this.$refs.scrollcon.scroll.finishPullUp();   //上拉加载更多页
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

.tab-control{
  position: sticky;
  top:44px;
  z-index: 9;
}

.content{
  /*height: 300px;*/
  /*overflow: hidden;*/

  position: absolute;
  top:44px;
  bottom:49px;
  left: 0;
  right: 0;
}
</style>
