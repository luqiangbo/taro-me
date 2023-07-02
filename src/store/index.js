import Taro from '@tarojs/taro'
import { proxy, useSnapshot, subscribe, snapshot } from 'valtio'

import { mUser } from './user'
import { mCommon } from './common'

const mState = proxy({ mUser, mCommon })

// 持久化函数
export function proxyWithPersist(val, opts) {
  const local = Taro.getStorageSync(opts.key)
  const state = proxy(local ? JSON.parse(local) : val)
  subscribe(state, () => {
    Taro.setStorageSync(opts.key, JSON.stringify(snapshot(state)))
  })
  return state
}

export { mState, mUser, mCommon }
