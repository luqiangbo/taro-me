import { useEffect } from 'react'
import { IconFont } from '@nutui/icons-react-taro'

import { goto, getParams } from '@/utils'

export default function GoAddComp(props) {
  useEffect(() => {
    init()
  }, [])

  const init = () => {}

  return (
    <div className="safe-area fixed right-3 bottom-4 z-50">
      <div
        className="w-16 h-16 rounded-full bg-main text-white flex items-center justify-center"
        onClick={() => {
          const routerMain = getParams().key
          goto({
            url: `/pages/admin/${routerMain}/add_edit/index`,
            data: { key: routerMain, type: 'add', ...props.qs },
          })
        }}
      >
        <IconFont name="plus" color="white" /> 添加
      </div>
    </div>
  )
}
