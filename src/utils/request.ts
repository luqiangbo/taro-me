import Taro from '@tarojs/taro'
import { to } from './index'

/**
 * 封封微信的的request
 */
function request(all) {
  return to(
    new Promise(function (resolve, reject) {
      Taro.request({
        method: 'get',
        header: {
          'Content-Type': 'application/json',
          'X-Litemall-Token': Taro.getStorageSync('token'),
        },
        ...all,
        success: function (res) {
          console.log({ res })
          if (res.statusCode == 200) {
            if (res.data.errno == 501) {
              // 清除登录相关内容
              try {
                Taro.removeStorageSync('userInfo')
                Taro.removeStorageSync('token')
              } catch (e) {}
              // 切换到登录页面
              Taro.navigateTo({
                url: '/pages/auth/login/login',
              })
            } else if (res.data.errorCode == 0) {
              resolve(res.data.data)
            } else {
              reject(res.data.errorMsg)
            }
          } else {
            reject(res.errMsg)
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
