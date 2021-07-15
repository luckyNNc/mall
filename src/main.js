import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'

import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/index.js'

Vue.config.productionTip = false

Vue.prototype.$bus=new Vue()

//安装toast插件
Vue.use(toast)

//使用图片懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
