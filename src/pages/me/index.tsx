import { useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'

import { mUser } from '@/store'

definePageConfig({
  navigationBarTitleText: '个人中心页面',
})

export default function HomePage() {
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
      <h1>个人中心</h1>
    </div>
  )
}
