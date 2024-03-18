import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Toast, Tabbar } from '@nutui/nutui-react-taro'
import { useSnapshot } from 'valtio'

import { mCommon } from '@/store'

export default function AllComp() {
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({
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
