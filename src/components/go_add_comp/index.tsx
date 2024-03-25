import { useEffect } from 'react'
import { IconFont } from '@nutui/icons-react-taro'

import { goto, getParams } from '@/utils'

export default function GoAddComp() {
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
            data: { key: routerMain, ...getParams(), type: 'add' },
          })
        }}
      >
        <IconFont fontClassName="iconfont" classPrefix="icon" name="add_light" size="16" />
      </div>
    </div>
  )
}
