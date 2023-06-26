import request from '@/utils/request'

const baseUrl = 'http://localhost:7001/mm'

// 新闻列表
export const fetchProductList = () => request({ url: `${baseUrl}/product/list`, payload: {} })
