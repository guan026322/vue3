<template>
  <!-- 导航栏 -->
  <van-nav-bar class="page-nav-bar">
    <template #title>
      <van-button
        type="info"
        size="small"
        round
        class="search-btn"
        icon="search"
        >搜索</van-button
      >
    </template>
  </van-nav-bar>
  <!-- /导航栏 -->
  <!-- 视频列表 -->
  <!--
      通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签
      通过animated属性可以开启切换标签内容时的转场动画
      通过swipeable属性可以开启滑动切换标签页
     -->
  <van-tabs v-model:active="active" animated swipeable class="channel-tabs">
    <van-tab
      v-for="channel in channels"
      :key="channel.id"
      :title="channel.name"
      >
      <ArticleList></ArticleList>
      </van-tab
    >
    <template #nav-right>
      <!-- placeholder 占位符 -->
      <div class="placeholder"></div>
      <div class="hamburger-btn">
        <i class="icon icon-gengduo"></i>
      </div>
    </template>
  </van-tabs>
  <!-- /频道列表 -->
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getChannel } from '@/api/user.js'
import { Toast } from 'vant'
import ArticleList from './components/article-list.vue'

const active = ref(0)
const channels = reactive([])

onMounted(async () => {
  try {
    const res = await getChannel()
    channels.push(...res.data.data.channels)
  } catch (err) {
    Toast('获取频道数据失败')
  }
})
</script>
<style scoped lang="less">
/* #这里需要添加deep，这个标签样式并不是我们自己添加的标签所带的样式，所以需要添加/deep/或者全局控制，只有是自己添加的标签才可以直接在scoped中控制样式 */
/deep/ .van-nav-bar__title {
  max-width: unset;
}
.search-btn {
  width: 555px;
  height: 64px;
  background-color: #5babfb;
  border: none;
  font-size: 28px;
  .van-icon {
    font-size: 32px;
  }
}
.channel-tabs {
  /deep/ .van-tabs__wrap {
    height: 82px;
    padding-bottom: 100px;
  }

  /deep/ .van-tab {
    //这个比较特殊，我们在结构中写有van-tab标签，但是在渲染的时候没有data标记，所以也需要deep
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777777;
  }

  /deep/ .van-tab--active {
    color: #333333;
  }

  /deep/ .van-tabs__nav {
    padding-bottom: 0;
  }

  /deep/ .van-tabs__line {
    bottom: 8px;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }
}
// 这里的样式放置在 .channel-tabs {  的内部

.placeholder {
  //占位元素为了解决最后一个tab标签被汉堡盖住问题
  flex-shrink: 0; //此元素不参与flex的
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
  &:before {
    //找到父节点，添加伪元素（这个是汉堡按钮与tab之间的一个竖线）
    content: '';
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
</style>
