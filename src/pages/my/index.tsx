import Taro, { useDidShow, useDidHide } from '@tarojs/taro'
import { useSnapshot } from 'valtio'

import { mUser } from '@/store'
import CAll from '@/components/all_comp'
import CTabber from '@/components/tabbar_comp'
import CLoginBefore from './login_before'
import CLoginAfter from './login_after'

definePageConfig({
  navigationBarTitleText: '我的',
})

export default function MyPage() {
  const snapUser = useSnapshot(mUser)

  useDidShow(() => {
    console.log('useDidShow me')
    init()
  })
  useDidHide(() => {
    console.log('useDidHide me')
  })

  const init = () => {
    const ens = Taro.getStorageSync('mUser')
    console.log('init-page-me', { ens })
  }

  return (
    <div className="page-c page-my">
      <CAll />
      <CTabber />
      {snapUser.custom?.id ? <CLoginAfter /> : <CLoginBefore />}
    </div>
  )
}
