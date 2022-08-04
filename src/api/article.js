/**
 * 文章接口模块
 */
import request from '@/utils/resquest'

/**
 * 获取频道的文章列表
 */
export const getArticle = (parmas) =>
  request({
    method: 'get',
    url: '/v1_0/articles',
    parmas
  })
