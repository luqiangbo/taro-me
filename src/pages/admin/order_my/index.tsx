import Taro, { useDidShow } from '@tarojs/taro'
import { Button } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'

import { mUser } from '@/store'
import { fetchCustomLogin } from '@/apis'

definePageConfig({
  navigationBarTitleText: '我的订单',
})

export default function PageOrderMy() {
  useDidShow(() => {
    init()
  })

  const init = () => {}

  return <div className="">我的订单</div>
}
