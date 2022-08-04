<template>
  <!-- 未登录头部 -->
  <div class="header not-login" @click="$router.push('/login')" v-if="!user">
    <div class="login-btn">
      <img src="@/assets/mobile.png" alt="" class="mobile-img" />
      <span class="text">登录 / 注册</span>
    </div>
  </div>
  <!-- 已登录头部 -->
  <div class="header user-info" v-else>
    <div class="base-info">
      <div class="left">
        <van-image
          class="avatar"
          fit="cover"
          round
          :src="userInfo.photo"
        />
        <span class="name">{{userInfo.name}}</span>
      </div>
      <div class="right">
        <van-button type="primary" size="mini" round>编辑资料</van-button>
      </div>
    </div>
    <div class="data-stats">
      <div class="data-item">
        <span class="count">{{userInfo.art_count}}</span>
        <span class="text">头条</span>
      </div>
      <div class="data-item">
        <span class="count">{{userInfo.follow_count}}</span>
        <span class="text">关注</span>
      </div>
      <div class="data-item">
        <span class="count">{{userInfo.fans_count}}</span>
        <span class="text">粉丝</span>
      </div>
      <div class="data-item">
        <span class="count">{{userInfo.like_count}}</span>
        <span class="text">获赞</span>
      </div>
    </div>
  </div>
  <!-- /已登录头部 -->
  <!-- 宫格导航
    column-num: 2 ，列数为2列，代表一行两列
    clickable: 是否开启格子点击反馈(点击格子之后，会出现灰色效果)
  -->
  <van-grid clickable :column-num="2" class="grid-nav mb-9">
    <van-grid-item class="grid-item">
      <template #icon>
        <i class="icon icon-shoucang"></i>
      </template>
      <template #text>
        <span class="text">收藏</span>
      </template>
    </van-grid-item>
    <van-grid-item class="grid-item">
      <template #icon>
        <i class="icon icon-lishi"></i>
      </template>
      <template #text>
        <span class="text">历史</span>
      </template>
    </van-grid-item>
  </van-grid>
  <!-- /宫格导航 -->
  <van-cell title="消息通知" is-link />
  <van-cell class="mb-9" title="小智同学" is-link />
  <van-cell
    v-if="user"
    class="logout-cell"
    clickable
    title="退出登录"
    @click="onLogin"
  />
</template>
<script setup>
import { computed, reactive, onMounted } from 'vue'
import { useStore, mapState } from 'vuex'
import { Dialog, Toast } from 'vant'
import { getUser } from '@/api/user'

const store = useStore()
const stateObj = mapState(['user'])
const user = computed(stateObj.user.bind({ $store: store }))
const userInfo = reactive({})

onMounted(async () => {
  if (!user.value) return
  try {
    const res = await getUser()
    console.log(res)
    Object.assign(userInfo, res.data.data)
  } catch (err) {
    console.log(err)
    Toast('获取数据失败，请稍后重试')
  }
})
const onLogin = () => {
  // Dialog 弹出层
  Dialog.confirm({
    title: '确认退出吗？'
  })
    .then(() => {
      // 点击弹框确认执行then
      // on confirm
      // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
      store.commit('setUser', null)
    })
    .catch(() => {
      // 点击弹框取消执行catch
      // on cancel
      console.log('取消执行')
    })
}
</script>
<style scoped lang="less">
.header {
  height: 361px;
  background: url('~@/assets/banner.png'); // css中使用@需要添加~,@代表src
  background-size: cover;
}

.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
}

.user-info {
  .base-info {
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 4px solid #fff;
        margin-right: 23px;
      }
      .name {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .data-stats {
    display: flex;
    .data-item {
      height: 130px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
}

.grid-nav {
  .grid-item {
    height: 141px;
    i.icon {
      font-size: 45px;
    }
    .icon-shoucang {
      color: #eb5253;
    }
    .icon-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }
}

.logout-cell {
  text-align: center;
  color: #d86262;
}

.mb-9 {
  margin-bottom: 9px;
}
</style>
