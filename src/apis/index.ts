import request from '@/utils/request'

const baseUrl = 'http://localhost:7001/mm'

export const urlUpload = `${baseUrl}/base/upload`

// openid
export const fetchBaseJscode2session = (data) => request({ url: `${baseUrl}/base/jscode2session`, data })

// 解密
export const fetchBaseDecrypt = (data) => request({ url: `${baseUrl}/base/decrypt`, data })

// 登录
export const fetchCustomLogin = (data) => request({ url: `${baseUrl}/custom/login`, data })

// 更新
export const fetchCustomUpdate = (data) => request({ url: `${baseUrl}/custom/update`, data })

// 查询
export const fetchCustomFind = (data) => request({ url: `${baseUrl}/custom/find`, data })

// 店铺列表
export const fetchShopList = (data) => request({ url: `${baseUrl}/shop/list`, data })

// 店铺列表
export const fetchShopOpenList = (data) => request({ url: `${baseUrl}/shop/open/list`, data })

// 添加店铺
export const fetchShopAdd = (data) => request({ url: `${baseUrl}/shop/add`, data })

// 分类列表
export const fetchCategoryList = (data) => request({ url: `${baseUrl}/category/list`, data })

// 添加分类
export const fetchCategoryAdd = (data) => request({ url: `${baseUrl}/category/add`, data })

// 商品列表
export const fetchSpuList = (data) => request({ url: `${baseUrl}/spu/list`, data })

// 添加商品
export const fetchSpuAdd = (data) => request({ url: `${baseUrl}/spu/add`, data })

// 商品规格列表
export const fetchSkuList = (data) => request({ url: `${baseUrl}/sku/list`, data })

// 商品规格添加
export const fetchSkuAdd = (data) => request({ url: `${baseUrl}/sku/add`, data })

// 标签列表
export const fetchTagList = (data) => request({ url: `${baseUrl}/tag/list`, data })

// 添加标签
export const fetchTagAdd = (data) => request({ url: `${baseUrl}/tag/add`, data })

// 标签列表
export const fetchAddressList = (data) => request({ url: `${baseUrl}/address/list`, data })

// 添加标签
export const fetchAddressAdd = (data) => request({ url: `${baseUrl}/address/add`, data })

// 地址
export const fetchAddressDivision = (data) => request({ url: `${baseUrl}/address/division`, data })

// 地址
export const fetchAddressPcas = () => request({ url: `${baseUrl}/address/pcas` })
