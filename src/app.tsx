import { ConfigProvider, Sticky, Tabbar, TabbarItem } from '@nutui/nutui-react-taro'
import en from '@nutui/nutui-react-taro/dist/locales/en-US'
import { useSnapshot } from 'valtio'
import { mUser } from '@/store'

import './style/app.css'
import './assets/font/iconfont.css'

// 没效果
const darkTheme = {
  nutuiBrandColor: '#fa2c19',
  nutuiBrandColorStart: '#ff404f',
  nutuiBrandColorEnd: '#fa2c19',
  nutuiBrandLinkColor: '#396acc',
}

export default function Main(props) {
  mUser.hash = Date.now()
  return (
    <ConfigProvider theme={darkTheme} locale={en}>
      <div>
        <div>{props.children}</div>
      </div>
    </ConfigProvider>
  )
}
