import request from '@/utils/request'

// 新闻列表
export const fetchGitee123 = () => request({ url: `https://caniuse.gitee.io/123.json`, payload: {} })
