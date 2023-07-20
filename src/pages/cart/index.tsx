import Taro, { useDidShow } from '@tarojs/taro'
import { find, cloneDeep } from 'lodash-es'
import { Checkbox, Button } from '@nutui/nutui-react-taro'

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

  const onSetCart = (skuId, v) => {
    const cart = cloneDeep(snapUser.cart)
    const sole = find(cart, { id: skuId })
    sole.quantity = v * 1
    mUser.cart = cart
  }

  return (
    <div className="page-c page-cat">
      <CAll />
      <CTabber />
      <div className="p-3">
        <Checkbox.Group>
          {mUser.cart.length
            ? mUser.cart.map((u) => (
                <div key={u.id} className="mb-2 v-v18 flex items-center overflow-hidden rounded-lg bg-white">
                  <div className="flex items-center pl-2">
                    <Checkbox value={u.id}></Checkbox>
                  </div>
                  <div className="h-v13 w-v13 bg-gray-400 overflow-hidden rounded-lg ">
                    <Image src={u.imageMain[0]} mode="widthFix" />
                  </div>
                  <div className="flex-1 pl-1 flex flex-col justify-between relative">
                    <div className="p-1">
                      <div>{u.name}</div>
                    </div>
                    <div className="p-1 flex justify-between items-center overflow-hidden rounded ">
                      <div>
                        <Price price={u.price} size="small"></Price>
                      </div>
                      <div>
                        <InputNumber
                          value={u.quantity}
                          min={1}
                          max={u.inventory}
                          onChange={(v) => {
                            onSetCart(u.id, v)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : '无'}
        </Checkbox.Group>
      </div>
      <div className="safe-area fixed left-0 w-full  bg-white" style={{ bottom: '50px' }}>
        <div className="flex justify-between items-center p-2 h-v15">
          <div>
            <Checkbox> 全选</Checkbox>
          </div>
          <div className="flex items-center">
            <div className="mr-2">总价</div>
            <Button className="w-v20" color="linear-gradient(to right, #5bae6f, #249543)">
              结算
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
