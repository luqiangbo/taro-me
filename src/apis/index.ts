import request from '@/utils/request'
// 新闻列表

export const postArticleList = (data) => request({ url: `https://www.wanandroid.com/article/list/1/json`, payload: {} })
