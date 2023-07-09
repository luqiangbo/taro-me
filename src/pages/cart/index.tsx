import Taro, { useDidShow } from '@tarojs/taro'

import CAll from '@/components/all_comp'
import CTabber from '@/components/tabbar_comp'

definePageConfig({
  navigationBarTitleText: '购物车',
})

export default function EssayPage() {
  useDidShow(() => {
    init()
  })

  const init = () => {}

  return (
    <div className="page-c page-cat">
      <CAll />
      <CTabber />
      <div>
        <h1>用户页面</h1>
      </div>
    </div>
  )
}
