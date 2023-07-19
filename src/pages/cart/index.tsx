import Taro, { useDidShow } from '@tarojs/taro'

import CAll from '@/components/all_comp'
import CTabber from '@/components/tabbar_comp'
import { mUser } from '@/store'
import { Image, Price, InputNumber } from '@nutui/nutui-react-taro'
import { useSnapshot } from 'valtio'

definePageConfig({
  navigationBarTitleText: '购物车',
})

export default function EssayPage() {
  const snapUser = useSnapshot(mUser)

  useDidShow(() => {
    init()
  })

  const init = () => {}

  return (
    <div className="page-c page-cat">
      <CAll />
      <CTabber />
      <div className="p-3">
        {mUser.cart.length
          ? mUser.cart.map((u) => (
              <div key={u.id} className="mb-2 v-v18 flex overflow-hidden rounded-lg bg-white">
                <div className="h-v13 w-v13 bg-gray-400 overflow-hidden rounded-lg ">
                  <Image src={u.imageMain[0]} mode="widthFix" />
                </div>
                <div className="flex-1 pl-1 flex flex-col justify-between relative">
                  <div>
                    <div>{u.name}</div>
                  </div>
                  <div className="p-2 flex justify-between items-center overflow-hidden rounded ">
                    <div>
                      <Price price={123.1} size="small"></Price>
                    </div>
                    <div>
                      <InputNumber value={u.quantity} min={1} max={u.inventory} onChange={(v) => {}} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          : '无'}
      </div>
    </div>
  )
}
