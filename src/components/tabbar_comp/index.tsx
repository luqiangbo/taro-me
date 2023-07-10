import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Toast, Tabbar } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'

import { mCommon } from '@/store'

export default function TabbarComp() {
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({
    tabbarList: [
      {
        key: 'index',
        value: '首页',
        icon: <IconFont width={18} height={18} name="home" />,
      },
      {
        key: 'category',
        value: '分类',
        icon: <IconFont width={18} height={18} name="category" />,
      },
      {
        key: 'cart',
        value: '购物车',
        icon: <IconFont width={18} height={18} name="cart" />,
      },
      {
        key: 'my',
        value: '我的',
        icon: <IconFont width={18} height={18} name="my" />,
      },
    ],
    activeIndex: '',
    activeColor: '#1989fa',
    inactiveColor: '#7d7e80',
  })
  useEffect(() => {
    init()
  }, [])

  const init = () => {}

  const onColor = () => {
    return '#1677ff'
  }

  return (
    <div className="all-comp-tabbar">
      <Tabbar
        fixed
        value={snapCommon.tabbarActiveIndex}
        inactiveColor={state.inactiveColor}
        activeColor={state.activeColor}
        onSwitch={(idx) => {
          mCommon.tabbarActiveIndex = idx
          const url = `/pages/${state.tabbarList[idx].key}/index`
          Taro.switchTab({
            url,
          })
        }}
      >
        {state.tabbarList.map((u) => (
          <Tabbar.Item key={u.key} title={u.value} icon={u.icon} />
        ))}
      </Tabbar>
    </div>
  )
}
