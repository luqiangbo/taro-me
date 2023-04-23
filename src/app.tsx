import { Component } from 'react'
import { ConfigProvider, Sticky, Tabbar, TabbarItem } from '@nutui/nutui-react-taro'
import en from '@nutui/nutui-react-taro/dist/locales/en-US'

import './style/app.css'
import './assets/font/iconfont.css'

// 没效果
const darkTheme = {
  nutuiBrandColor: '#fa2c19',
  nutuiBrandColorStart: '#ff404f',
  nutuiBrandColorEnd: '#fa2c19',
  nutuiBrandLinkColor: '#396acc',
}

class App extends Component {
  render() {
    return (
      <ConfigProvider theme={darkTheme} locale={en}>
        <div>
          <div>{this.props.children}</div>
        </div>
      </ConfigProvider>
    )
  }
}
export default App
