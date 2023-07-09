import request from '@/utils/request'

const baseUrl = 'http://localhost:7001/mm'

export const urlUpload = `${baseUrl}/base/upload`

// 店铺列表
export const fetchShopList = (data) => request({ url: `${baseUrl}/shop/list`, data })

// 分类列表
export const fetchCategoryList = (data) => request({ url: `${baseUrl}/category/list`, data })

// 添加分类
export const fetchCategoryAdd = (data) => request({ url: `${baseUrl}/category/add`, data })

// 商品列表
export const fetchSpuList = (data) => request({ url: `${baseUrl}/spu/list`, data })

// 添加商品
export const fetchSpuAdd = (data) => request({ url: `${baseUrl}/spu/add`, data })
