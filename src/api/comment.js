import request from '@/utils/request'
/**
 *
 * @param {type:a对文章评论 c对评论的回复}  param0
 * @param {source 源id}  param0
 * @param {offset 偏移量}  param0
 * @param {limit 每页评论个数}  param0
 * @returns
 */
export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
/**
 *
 * @param 点赞{评论id} target
 * @returns
 */
export const addLike = target => {
  return request({
    method: 'POST',
    url: '/comment/likings',
    data: {
      target
    }
  })
}
/**
 *
 * @param 取消点赞{评论id} target
 * @returns
 */
export const delLike = target => {
  return request({
    method: 'DELETE',
    url: `/comment/likings/${target}`
  })
}
/**
 *target 评论id
 *content 评论内容
 *art_id 文章id 回复评论时用到的参数
 * @param {*} data
 * @returns
 */
export const addComment = data => { // 有一个可选参数就不结构参数了
  return request({
    method: 'POST',
    url: '/comments',
    data
  })
}
