import Taro, { useDidShow } from '@tarojs/taro'
import { Button, Image, Price } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'

import CAll from '@/components/all_comp'
import CSearchList from '@/components/search_list_comp'
import { dayFrmat, statusOrder } from '@/utils'
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

  const renderList = (h) => {
    return (
      <div key={h.id} className="rounded-lg bg-white p-4 mb-3 relative">
        <div className="flex items-center justify-between mb-2 text-gray-500">
          <div>状态:{statusOrder(h.status)}</div>
          <div>{dayFrmat(h.createdAt)}</div>
        </div>
        <div>
          {h.orderItem.map((u) => (
            <div className=" bg-white rounded-lg mb-1 px-2 py-1" key={u.key}>
              <div className="flex">
                <div className="h-v15 w-v15 bg-gray-400 overflow-hidden rounded-lg mr-3">
                  <Image src={u.sku.imageMain[0]} mode="widthFix" />
                </div>
                <div className="flex-1">
                  <div className="pr-2 flex justify-between items-center">
                    <div className="flex-1">
                      <div>{u.sku.spu.name}</div>
                      <div className="text-gray-400">{u.sku.name}</div>
                    </div>
                    <div className="text-right">
                      <Price price={u.price} size="normal"></Price>
                      <div className="text-sm text-gray-400">x {u.quantity}</div>
                    </div>
                  </div>
                  <div className="pt-2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div></div>
          <div className="text-gray-500 flex items-baseline justify-between">
            <div style={{ color: '#bda57e' }} className="mr-1">
              总价:
            </div>
            <Price price={h.totalPrice} size="large"></Price>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      <CAll />
      <CSearchList renderList={renderList} />
    </div>
  )
}
