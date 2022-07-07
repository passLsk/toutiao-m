import request from '@/utils/request'
/**
 *根据id查文章
 * @param {文章id} param0
 * @returns
 */
export const getArticleListApi = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}
/**
 * 添加关注用户接口
 * 参数名target{aut_id}
 */
export const addUser = target => {
  return request({
    method: 'POST',
    url: '/user/followings',
    data: {
      target
    }
  })
}
/**
 *删除关注用户接口
 * 路径参数target{aut_id}
 */
export const delUser = target => {
  return request({
    method: 'DELETE',
    url: `/user/followings/${target}`
  })
}

/**
 * 收藏
 * 参数名target{收藏文章的id}
 */
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/article/collections',
    data: {
      target
    }
  })
}
/**
 *取消收藏
 * 路径参数target{收藏文章的id}
 */
export const delCollect = target => {
  return request({
    method: 'DELETE',
    url: `/article/collections/${target}`
  })
}
