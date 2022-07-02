import request from '@/utils/request'
/**
 *搜索联想数据列表接口 搜索建议
 * @param {搜索关键词} q
 * @returns
 */
export const getSuggestList = q => {
  return request({
    url: '/suggestion',
    params: {
      q
    }
  })
}
/**
 *搜索结果接口
 *page 当前页数 per_page每页数量 q搜索关键词 三个参数 page=1是表示默认值为1（page没有传值的时候展示默认值）
 */
// eslint-disable-next-line camelcase
export const getSearchResultListApi = ({ page = 1, per_page, q }) => {
  return request({
    url: '/search',
    params: {
      page, per_page, q
    }
  })
}
