import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Toast, Tabbar } from '@nutui/nutui-react-taro'
import { Cart, Category, Find, Home, My } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'

import { mCommon } from '@/store'

export default function AllComp() {
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({
    tabbarList: [
      {
        key: 'index',
        value: '首页',
        icon: <Home width={18} height={18} />,
      },
      {
        key: 'category',
        value: '分类',
        icon: <Category width={18} height={18} />,
      },
      {
        key: 'cart',
        value: '购物车',
        icon: <Cart width={18} height={18} />,
      },
      {
        key: 'my',
        value: '我的',
        icon: <My width={18} height={18} />,
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

  return (
    <div className="all-comp">
      <Toast
        size="small"
        position={'top'}
        msg={snapCommon.toastMsg}
        visible={snapCommon.toastOpen}
        type={snapCommon.toastType}
        onClose={() => {
          mCommon.toastOpen = false
        }}
      />
    </div>
  )
}
