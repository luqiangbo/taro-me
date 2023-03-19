import Taro from '@tarojs/taro'
import { useEffect } from 'react'
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
        <div className="item">21312</div>
      </div>
      <h1>123</h1>
      <div>
        <Button
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/essay/index',
            })
          }}
        >
          爱安卓
        </Button>
      </div>
      <div>
        <Button>处理</Button>
      </div>
    </div>
  )
}
