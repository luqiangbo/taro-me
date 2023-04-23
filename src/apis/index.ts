import request from '@/utils/request'

// 新闻列表
export const fetchGitee123 = () =>
  request({ url: `https://gitee.com/caniuse/caniuse/raw/main/json/123.json`, payload: {} })
