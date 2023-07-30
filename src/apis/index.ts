import { picked } from '@/utils'
import request from '@/utils/request'

const baseUrl = BaseUrl

export const urlUpload = `${baseUrl}/base/upload`

// openid
export const fetchBaseJscode2session = (data) => request({ url: `${baseUrl}/base/jscode2session`, data: picked(data) })

// 解密
export const fetchBaseDecrypt = (data) => request({ url: `${baseUrl}/base/decrypt`, data: picked(data) })

// 登录
export const fetchCustomLogin = (data) => request({ url: `${baseUrl}/custom/login`, data: picked(data) })

// 更新
export const fetchCustomUpdate = (data) => request({ url: `${baseUrl}/custom/update`, data: picked(data) })

// 查询
export const fetchCustomFind = (data) => request({ url: `${baseUrl}/custom/find`, data: picked(data) })

// 店铺列表
export const fetchShopList = (data) => request({ url: `${baseUrl}/shop/list`, data: picked(data) })

// 店铺列表
export const fetchShopOpenList = (data) => request({ url: `${baseUrl}/shop/open/list`, data: picked(data) })

// 添加店铺
export const fetchShopAdd = (data) => request({ url: `${baseUrl}/shop/add`, data: picked(data) })

// 更新店铺
export const fetchShopUpdate = (data) => request({ url: `${baseUrl}/shop/update`, data: picked(data) })

// 删除店铺
export const fetchShopDelete = (data) => request({ url: `${baseUrl}/shop/delete`, data: picked(data) })

// 分类列表
export const fetchCategoryList = (data) => request({ url: `${baseUrl}/category/list`, data: picked(data) })

// 添加分类
export const fetchCategoryAdd = (data) => request({ url: `${baseUrl}/category/add`, data: picked(data) })

// 编辑分类
export const fetchCategoryUpdate = (data) => request({ url: `${baseUrl}/category/update`, data: picked(data) })

// 删除分类
export const fetchCategoryDelete = (data) => request({ url: `${baseUrl}/category/delete`, data: picked(data) })

// 商品列表
export const fetchSpuList = (data) => request({ url: `${baseUrl}/spu/list`, data: picked(data) })

// 添加商品
export const fetchSpuAdd = (data) => request({ url: `${baseUrl}/spu/add`, data: picked(data) })

// 更新商品
export const fetchSpuUpdate = (data) => request({ url: `${baseUrl}/spu/update`, data: picked(data) })

// 添加商品
export const fetchSpuDelete = (data) => request({ url: `${baseUrl}/spu/delete`, data: picked(data) })

// 添加商品
export const fetchSpuCart = (data) => request({ url: `${baseUrl}/spu/cart`, data: picked(data) })

// 商品规格列表
export const fetchSkuList = (data) => request({ url: `${baseUrl}/sku/list`, data: picked(data) })

// 商品规格添加
export const fetchSkuAdd = (data) => request({ url: `${baseUrl}/sku/add`, data: picked(data) })

// 商品规格添加
export const fetchSkuUpdate = (data) => request({ url: `${baseUrl}/sku/update`, data: picked(data) })

// 商品规格添加
export const fetchSkuDelete = (data) => request({ url: `${baseUrl}/sku/delete`, data: picked(data) })

// 标签列表
export const fetchTagList = (data) => request({ url: `${baseUrl}/tag/list`, data: picked(data) })

// 添加标签
export const fetchTagAdd = (data) => request({ url: `${baseUrl}/tag/add`, data: picked(data) })

// 添加标签
export const fetchTagUpdate = (data) => request({ url: `${baseUrl}/tag/update`, data: picked(data) })

// 添加标签
export const fetchTagDelete = (data) => request({ url: `${baseUrl}/tag/delete`, data: picked(data) })

// 地址列表
export const fetchAddressList = (data) => request({ url: `${baseUrl}/address/list`, data: picked(data) })

// 添加地址
export const fetchAddressAdd = (data) => request({ url: `${baseUrl}/address/add`, data: picked(data) })

// 添加地址
export const fetchAddressUpdate = (data) => request({ url: `${baseUrl}/address/update`, data: picked(data) })

// 添加地址
export const fetchAddressDelete = (data) => request({ url: `${baseUrl}/address/delete`, data: picked(data) })

// 地址
export const fetchAddressDivision = (data) => request({ url: `${baseUrl}/address/division`, data: picked(data) })

// 地址
export const fetchAddressPcas = () => request({ url: `${baseUrl}/address/pcas` })

// 添加订单
export const fetchOrderAdd = (data) => request({ url: `${baseUrl}/order/add`, data: picked(data) })

// 我的订单
export const fetchOrderListCustom = (data) => request({ url: `${baseUrl}/order/list/custom`, data: picked(data) })

// 更新订单
export const fetchOrderUpdate = (data) => request({ url: `${baseUrl}/order/update`, data: picked(data) })

// 订单管理列表
export const fetchOrderListShop = (data) => request({ url: `${baseUrl}/order/list/shop`, data: picked(data) })
