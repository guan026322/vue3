/**
 * 封装 axios 请求模块
 */

import axios from 'axios'
import store from '@/store'
// import router from '@/router'

// axios.create 方法：复制一个 axios
const request = axios.create({
  // create会返回一个新的axios对象
  baseURL: 'http://toutiao.itheima.net' // 基础路径
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const res = store.state
  if (res.user && res.user.token) {
    config.headers.Authorization = `Bearer ${res.user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request
