import { pickBy } from 'lodash-es'
import request from '@/utils/request'

// const baseUrl = 'http://localhost:7001/mm'
const baseUrl = 'https://api-mm-dev.commok.com/mm'

export const urlUpload = `${baseUrl}/base/upload`

// openid
export const fetchBaseJscode2session = (data) => request({ url: `${baseUrl}/base/jscode2session`, data: pickBy(data) })

// 解密
export const fetchBaseDecrypt = (data) => request({ url: `${baseUrl}/base/decrypt`, data: pickBy(data) })

// 登录
export const fetchCustomLogin = (data) => request({ url: `${baseUrl}/custom/login`, data: pickBy(data) })

// 更新
export const fetchCustomUpdate = (data) => request({ url: `${baseUrl}/custom/update`, data: pickBy(data) })

// 查询
export const fetchCustomFind = (data) => request({ url: `${baseUrl}/custom/find`, data: pickBy(data) })

// 店铺列表
export const fetchShopList = (data) => request({ url: `${baseUrl}/shop/list`, data: pickBy(data) })

// 店铺列表
export const fetchShopOpenList = (data) => request({ url: `${baseUrl}/shop/open/list`, data: pickBy(data) })

// 添加店铺
export const fetchShopAdd = (data) => request({ url: `${baseUrl}/shop/add`, data: pickBy(data) })

// 更新店铺
export const fetchShopUpdate = (data) => request({ url: `${baseUrl}/shop/update`, data: pickBy(data) })

// 删除店铺
export const fetchShopDelete = (data) => request({ url: `${baseUrl}/shop/delete`, data: pickBy(data) })

// 分类列表
export const fetchCategoryList = (data) => request({ url: `${baseUrl}/category/list`, data: pickBy(data) })

// 添加分类
export const fetchCategoryAdd = (data) => request({ url: `${baseUrl}/category/add`, data: pickBy(data) })

// 编辑分类
export const fetchCategoryUpdate = (data) => request({ url: `${baseUrl}/category/update`, data: pickBy(data) })

// 删除分类
export const fetchCategoryDelete = (data) => request({ url: `${baseUrl}/category/delete`, data: pickBy(data) })

// 商品列表
export const fetchSpuList = (data) => request({ url: `${baseUrl}/spu/list`, data: pickBy(data) })

// 添加商品
export const fetchSpuAdd = (data) => request({ url: `${baseUrl}/spu/add`, data: pickBy(data) })

// 更新商品
export const fetchSpuUpdate = (data) => request({ url: `${baseUrl}/spu/update`, data: pickBy(data) })

// 添加商品
export const fetchSpuDelete = (data) => request({ url: `${baseUrl}/spu/delete`, data: pickBy(data) })

// 添加商品
export const fetchSpuCart = (data) => request({ url: `${baseUrl}/spu/cart`, data: pickBy(data) })

// 商品规格列表
export const fetchSkuList = (data) => request({ url: `${baseUrl}/sku/list`, data: pickBy(data) })

// 商品规格添加
export const fetchSkuAdd = (data) => request({ url: `${baseUrl}/sku/add`, data: pickBy(data) })

// 商品规格添加
export const fetchSkuUpdate = (data) => request({ url: `${baseUrl}/sku/update`, data: pickBy(data) })

// 商品规格添加
export const fetchSkuDelete = (data) => request({ url: `${baseUrl}/sku/delete`, data: pickBy(data) })

// 标签列表
export const fetchTagList = (data) => request({ url: `${baseUrl}/tag/list`, data: pickBy(data) })

// 添加标签
export const fetchTagAdd = (data) => request({ url: `${baseUrl}/tag/add`, data: pickBy(data) })

// 添加标签
export const fetchTagUpdate = (data) => request({ url: `${baseUrl}/tag/update`, data: pickBy(data) })

// 添加标签
export const fetchTagDelete = (data) => request({ url: `${baseUrl}/tag/delete`, data: pickBy(data) })

// 地址列表
export const fetchAddressList = (data) => request({ url: `${baseUrl}/address/list`, data: pickBy(data) })

// 添加地址
export const fetchAddressAdd = (data) => request({ url: `${baseUrl}/address/add`, data: pickBy(data) })

// 添加地址
export const fetchAddressUpdate = (data) => request({ url: `${baseUrl}/address/update`, data: pickBy(data) })

// 添加地址
export const fetchAddressDelete = (data) => request({ url: `${baseUrl}/address/delete`, data: pickBy(data) })

// 地址
export const fetchAddressDivision = (data) => request({ url: `${baseUrl}/address/division`, data: pickBy(data) })

// 地址
export const fetchAddressPcas = () => request({ url: `${baseUrl}/address/pcas` })
