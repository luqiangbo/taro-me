import { mapValues } from 'lodash-es'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import qs from 'qs'
import Decimal from 'decimal.js'
import dayjs from 'dayjs'
import { get, find, pickBy } from 'lodash-es'

export const to = (promise) => promise.then((res) => [null, res]).catch((err) => [err, null])

export const decodedObj = (obj) => mapValues(obj, (value) => decodeURIComponent(value))

export const getParams = () => {
  const router = getCurrentInstance().router
  const params = decodedObj(router?.params)
  return params
}

export const goto = ({ url, data = {} }) => {
  Taro.navigateTo({
    url: `${url}?${qs.stringify(data)}`,
  })
}

// 加
export function add(num1, num2) {
  return new Decimal(num1).plus(num2).toString()
}

// 减
export function subtract(num1, num2) {
  return new Decimal(num1).minus(num2).toString()
}

// 乘
export function multiply(num1, num2) {
  return new Decimal(num1).times(num2).toString()
}

// 除
export function divide(num1, num2) {
  return new Decimal(num1).dividedBy(num2).toString()
}

// 时间
export const dayFrmat = (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss')

//
export const statusList = [
  {
    key: -1,
    value: '取消吧',
  },
  {
    key: 0,
    value: '默认',
  },
  {
    key: 1,
    value: '处理吧',
  },
  {
    key: 2,
    value: '结束吧',
  },
]

export const statusOrder = (key) => {
  // -1:删除 0:未支付 1:已支付
  return get(find(statusList, { key }), 'value', '空')
}

export const picked = (data) =>
  pickBy(data, (value, key) => {
    return value != null
  })
