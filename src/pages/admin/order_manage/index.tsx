import Taro, { useDidShow } from '@tarojs/taro'
import { Button } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'

import { mUser } from '@/store'
import { fetchCustomLogin } from '@/apis'

definePageConfig({
  navigationBarTitleText: '订单管理',
})

export default function PageOrderManage() {
  useDidShow(() => {
    init()
  })

  const init = () => {}

  return <div className="">订单管理</div>
}
