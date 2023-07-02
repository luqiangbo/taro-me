import request from '@/utils/request'

const baseUrl = 'http://localhost:7001/mm'

// 商品列表
export const fetchProductList = (data) => request({ url: `${baseUrl}/product/list`, data })
