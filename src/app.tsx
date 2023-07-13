import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { ConfigProvider } from '@nutui/nutui-react-taro'
import { useSnapshot } from 'valtio'
import en from '@nutui/nutui-react-taro/dist/locales/en-US'
import zh from '@nutui/nutui-react-taro/dist/locales/zh-CN'

import { mUser } from '@/store'

import './style/app.css'
import './style/theme2.css'
import './assets/font/iconfont.css'
import './style/all.scss'

export default function Main(props) {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    locale: zh,
  })
  useEffect(() => {
    const time = Date.now()
    mUser.hash = time
    let ens = time % 2 === 0
    if (ens) {
      setState({
        locale: zh,
      })
    } else {
      setState({
        locale: en,
      })
    }
  }, [])

  return (
    <ConfigProvider locale={zh}>
      <div className="page-all">{props.children}</div>
    </ConfigProvider>
  )
}
