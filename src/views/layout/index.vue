<template>
  <!-- 路由挂在 -->
  <router-view />
  <!-- tabbar 标签栏 -->
  <van-tabbar v-model="active" class="layout-tabbar" route>
    <van-tabbar-item :to="{ name: 'home' }">
      <template #icon>
        <i class="icon icon-shouye"></i>
      </template>
      <span class="text">首页</span>
    </van-tabbar-item>

    <van-tabbar-item to="/qa">
      <template #icon>
        <i class="icon icon-wenda"></i>
      </template>
      <span class="text">问答</span>
    </van-tabbar-item>

    <van-tabbar-item to="/video">
      <template #icon>
        <i class="icon icon-shipin"></i>
      </template>
      <span class="text">视频</span>
    </van-tabbar-item>

    <van-tabbar-item to="/my">
      <template #icon>
        <i class="icon icon-wode"></i>
      </template>
      <span class="text">{{ store.state.user ? '我的' : '未登录' }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const active = ref(0)
</script>
<style scoped lang="less">
.layout-tabbar {
  i.toutiao {
    font-size: 40px;
  }
  span.text {
    font-size: 20px;
  }
}
</style>
