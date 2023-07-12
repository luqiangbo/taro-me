import Taro, { getCurrentInstance } from '@tarojs/taro'
import { useEffect } from 'react'
import { IconFont } from '@nutui/icons-react-taro'
import qs from 'qs'

export default function GoAddComp() {
  useEffect(() => {
    init()
  }, [])

  const init = () => {}

  return (
    <div
      className="fixed right-3 bottom-4 w-16 h-16 rounded-full bg-main text-white flex items-center justify-center"
      onClick={() => {
        const router = getCurrentInstance().router
        const routerMain = router.path.split('/')[3]
        Taro.navigateTo({
          url: `/pages/admin/${routerMain}/add_edit/index?${qs.stringify({ type: 'add' })}`,
        })
      }}
    >
      <IconFont name="plus" color="white" /> 添加
    </div>
  )
}
