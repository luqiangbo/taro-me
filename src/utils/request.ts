import Taro from '@tarojs/taro'

import { mCommon, mUser } from '@/store'
import { to } from './index'

/**
 * 微信的的request
 */
function request(all) {
  return to(
    new Promise(function (resolve, reject) {
      mCommon.toast('loading')
      if (mUser.token) {
      }
      Taro.request({
        method: 'post',
        header: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        timeout: 30 * 1000,
        ...all,
        success: function (res) {
          mCommon.toastOpen = false
          // console.log('request', { res })
          if (res.statusCode === 200) {
            if (res.data.code === 0) {
              resolve(res.data.data)
            } else {
              mCommon.toast(`${res.data.code} ! ${res.data.message}`)
              reject(res.data)
            }
          } else {
            mCommon.toast(`${res.statusCode} ! ${res.data.message}`)
            reject(res)
          }
        },
        fail: function (err) {
          mCommon.toastOpen = false
          mCommon.toast(err.errMsg)
          console.log('request', { err })
          reject(err)
        },
      })
    }),
  )
}

export default request
