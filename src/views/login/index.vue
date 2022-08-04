<template>
  <!-- 导航栏 -->
<van-nav-bar title="登录" class="page-nav-bar">
  <template #left>
    <van-icon name="cross" size="18" @click="$router.back()"/>
  </template>
</van-nav-bar>
<!-- form 表单 -->
  <van-form @submit="onSubmit" ref="loginForm">
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        name="mobile"
        maxlength="11"
        placeholder="请输入手机号"
        :rules="userRules.mobile"
      >
        <template #left-icon>
          <i class="icon icon-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        maxlength="6"
        placeholder="请输入验证码"
        :rules="userRules.code"
      >
        <template #left-icon>
          <i class="icon icon-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down
            :time="60 * 1000"
            format="ss s"
            v-if="isDownShow"
            @finish="isDownShow = false"
          />
          <van-button
            type="default"
            size="small"
            class="send-sms-btn"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
    </van-cell-group>
    <div class="login-btn-wrap">
      <van-button block type="info" class="login-btn" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Toast } from 'vant'
import { login, sendSms } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = reactive({
  mobile: '',
  code: ''
})
const loginForm = ref(null)
// 控制倒计时的显示和隐藏
const isDownShow = ref(false)
// 登录成功以后将后端返回的 token 相关数据存储到容器中
const store = useStore()

const userRules = {
  mobile: [
    { required: true, message: '请填写手机号' },
    { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
  ],
  code: [
    { required: true, message: '请填写验证码' },
    { pattern: /^\d{6}$/, message: '验证码格式错误' }
  ]
}
// 登录模块
const onSubmit = async () => {
  try {
    // 1. 校验数据 vant在submit时自动执行校验
    // 2. 加载loading
    Toast.loading({
      duration: 0, // 持续展示 toast
      message: '加载中...',
      forbidClick: true // 是否禁止背景点击
    })
    // 3. 发起请求
    const res = await login(user)
    console.log(res)
    // 4. 提醒成功
    Toast.success('登录成功')
    // TODO 5. 对成功返回的数据进行使用
    store.commit('setUser', res.data.data)
    // 6. 返回到来的页面
    router.back()
  } catch (err) {
    console.log(err)
    if (err.response.status === 400) {
      console.log(err)
      Toast.fail('手机号或验证码错误')
    } else {
      console.log(err)
      Toast.fail('登录失败，请稍后重试')
    }
  }
}
// 验证手机号
const onSendSms = async () => {
  console.log('onSendSms')
  // 1. 校验手机号
  try {
    // 这里为啥添加await，是因为validate返回一个Promise
    // 参数是van-field的name
    await loginForm.value.validate('mobile') // 调用validate手动校验
  } catch (err) {
    // 这个写法其实就是在执行完log，然后结束代码执行，后续代码不执行
    return console.log('验证失败', err)
  }
  // 2. 验证通过，显示倒计时
  isDownShow.value = true
  // 3. 请求发送验证码
  try {
    await sendSms(user.mobile)
    Toast.success('发送成功')
  } catch (err) {
    // 发送失败，关闭倒计时
    isDownShow.value = false
    if (err.response.status === 429) {
      Toast.fail('发送太频繁了，请稍后重试')
    } else {
      Toast.fail('发送失败，请稍后重试')
    }
  }
}
</script>

<style scoped lang="less">
.toutiao {
  font-size: 37px;
}
.send-sms-btn {
  width: 162px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
    color: #fff;
  }
}
</style>
