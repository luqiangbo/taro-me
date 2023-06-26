import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Toast, Tabbar, TabbarItem } from '@nutui/nutui-react-taro'
import { useSnapshot } from 'valtio'

import { mCommon } from '@/store'

export default function EssayPage() {
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({
    tabbarList: [
      {
        key: 'home',
        value: '首页',
        icon: 'home',
      },
      {
        key: 'category',
        value: '分类',
        icon: 'category',
      },
      {
        key: 'cart',
        value: '购物车',
        icon: 'cart',
      },
      {
        key: 'my',
        value: '我的',
        icon: 'my',
      },
    ],
    activeIndex: '',
  })
  useEffect(() => {
    init()
  }, [])

  const init = () => {}

  return (
    <div className="all-comp">
      <Toast
        size="small"
        bgColor="rgba(0, 0, 0, 0.2)"
        msg={snapCommon.toastMsg}
        visible={snapCommon.toastOpen}
        type={snapCommon.toastType}
        onClose={() => {
          mCommon.toastOpen = false
        }}
      />
      <div className="all-comp-tabbar">
        <Tabbar
          bottom={true}
          activeVisible={snapCommon.tabbarActiveIndex}
          onSwitch={(child, idx) => {
            mCommon.tabbarActiveIndex = idx
            const url = `/pages/${child.key}/index`
            Taro.switchTab({
              url,
            })
          }}
        >
          {state.tabbarList.map((u) => (
            <TabbarItem key={u.key} tabTitle={u.value} icon={u.icon} />
          ))}
        </Tabbar>
      </div>
    </div>
  )
}
