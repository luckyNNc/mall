import axios from 'axios'

// 3.Promise更简便写法，推荐（重要）
export function request(config){
  // 1.创建axios实例
  const instance=axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })

  // 2.axios拦截
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
    // console.log(err);
  })

  instance.interceptors.response.use(res=>{
    return res.data //只返回从服务器拿到的数据就行了
  },err=>{
    console.log(err);
  })

  //3.发送真正的网络请求,这里返回的就是一个Promise
  return instance(config)
}
