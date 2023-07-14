import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'

export default function TitleComp(props) {
  const [state, setState] = useSetState({
    navBarHeight: 0,
    statusBarHeight: 0,
    bgColor: props.bgColor || '#fff',
  })
  useEffect(() => {
    init()
  }, [])

  const init = () => {
    // 获取系统状态栏高度
    const { statusBarHeight } = Taro.getSystemInfoSync()
    // 获取小程序右上角胶囊的大小
    const { height, top } = Taro.getMenuButtonBoundingClientRect()
    /*
       计算出小程序导航栏的整体高度，这里要加上系统状态栏的高度，
       否则小程序顶部内容会顶到状态栏最顶部位置
     */
    const navBarHeight = height + (top - statusBarHeight) * 2 + statusBarHeight

    setState({
      navBarHeight,
      statusBarHeight,
    })
    if (props.bgColor) {
    }
  }

  return (
    <div className="title-comp">
      <div
        style={{
          height: `${state.navBarHeight}px`,
          backgroundColor: `${state.bgColor}`,
        }}
      ></div>
      <div
        className="title-comp-main"
        style={{
          width: '100%',
          height: `${state.navBarHeight}px`,
          paddingTop: `${state.statusBarHeight}px`,
          backgroundColor: `${state.bgColor}`,
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
