import Taro from '@tarojs/taro'
import { to } from './index'

/**
 * 微信的的request
 */
function request(all) {
  return to(
    new Promise(function (resolve, reject) {
      Taro.request({
        method: 'get',
        header: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        ...all,
        success: function (res) {
          if (res.statusCode === 200) {
            console.log('', { res })
            if (res.data.code === 0) {
              resolve(res.data.res)
            } else {
              reject(res.data)
            }
          } else {
            reject(res)
          }
        },
        fail: function (err) {
          reject(err)
        },
      })
    }),
  )
}

export default request
