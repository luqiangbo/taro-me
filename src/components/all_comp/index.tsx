import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Toast } from '@nutui/nutui-react-taro'
import { useSnapshot } from 'valtio'

import { mCommon } from '@/store'

export default function EssayPage() {
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({})
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
    </div>
  )
}
