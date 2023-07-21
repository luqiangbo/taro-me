import { mapValues } from 'lodash-es'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import qs from 'qs'

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
