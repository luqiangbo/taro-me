import { useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'

import { mUser } from '@/store'

definePageConfig({
  navigationBarTitleText: '我的',
})

export default function HomePage() {
  const snapUser = useSnapshot(mUser)

  useDidShow(() => {
    console.log('useDidShow me')
    init()
  })
  useDidHide(() => {
    console.log('useDidHide me')
  })

  const init = () => {
    console.log('init-page-me')

    mUser.count++
  }

  return (
    <div className="page-404">
      <CAll />
      <h1>个人中心</h1>
    </div>
  )
}
