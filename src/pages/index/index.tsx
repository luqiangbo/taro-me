import { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Button } from '@nutui/nutui-react-taro'

import './index.scss'

definePageConfig({
  navigationBarTitleText: '首页123',
})

export default function HomePage() {
  useEffect(() => {
    init()
  }, [])

  const init = () => {}

  return (
    <div className="page-home">
      <div className="nav">
        <div
          className="item"
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/essay/index',
            })
          }}
        >
          爱安卓
        </div>
        <div
          className="item"
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/user/index',
            })
          }}
        >
          用户
        </div>
      </div>
    </div>
  )
}
