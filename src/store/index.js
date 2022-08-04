import { createStore } from 'vuex'

import { getItem, setItem } from '@/utils/storage'
// token的key
const TOKEN_KEY = 'TOUTIAO_USER'

export default createStore({
  state: {
    // 用户的登录状态信息（读取出来是字符串，直接通过parse进行转换为对象）
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    // 一个对象，存储当前登录用户信息（token等数据）
    user: getItem(TOKEN_KEY)
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user
      // 为了防止刷新丢失，我们需要把数据备份到本地存储
      // localStorage只能存储字符串，所以通过stringify将user对象转换为字符串，再存储到localStorage
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
