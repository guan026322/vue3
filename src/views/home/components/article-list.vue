<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    error-text="请求失败，点击重新加载"
    v-model:error="error"
    @load="onLoad"
  >
    <van-cell v-for="(article, i) in list" :key="i" :title="article.title" />
  </van-list>
</template>
<script setup>
import { ref } from 'vue'

const list = ref([])
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1)
    }

    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true
    }
  }, 1000)
}
</script>
<style scoped lang="less"></style>
