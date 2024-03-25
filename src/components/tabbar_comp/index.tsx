import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Tabbar } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'

import { mCommon, mUser } from '@/store'

export default function TabbarComp() {
  const snapCommon = useSnapshot(mCommon)
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    tabbarList: [
      {
        key: 'index',
        value: '首页',
        icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="home_light" size="16" />,
      },

      {
        key: 'category',
        value: '作品',
        icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="sort" size="16" />,
      },
      {
        key: 'cart',
        value: '收藏',
        icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="deliver" size="16" />,
      },
      {
        key: 'my',
        value: '我的',
        icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="my_light" size="16" />,
      },
    ],
    activeIndex: '',
    activeColor: mCommon.colorMain,
    inactiveColor: '#7d7e80',
  })
  useEffect(() => {
    init()
  }, [])

  const init = () => {}

  const onGetQuantity = () => {
    // let res = 0
    // snapUser.cart.forEach((u) => {
    //   res = res + u.quantity
    // })
    return snapUser.cart.length
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
          <Tabbar.Item
            key={u.key}
            title={u.value}
            icon={u.icon}
            value={u.key === 'cart' && onGetQuantity() ? onGetQuantity() : null}
          />
        ))}
      </Tabbar>
    </div>
  )
}
