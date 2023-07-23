import { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { find, cloneDeep } from 'lodash-es'
import { Checkbox, Button, Image, Price, InputNumber } from '@nutui/nutui-react-taro'
import { useSnapshot } from 'valtio'
import { filter } from 'lodash-es'

import CAll from '@/components/all_comp'
import CTabber from '@/components/tabbar_comp'
import { mUser } from '@/store'
import { fetchSpuCart } from '@/apis'

definePageConfig({
  navigationBarTitleText: '购物车',
})

export default function EssayPage() {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    mainList: [],
  })

  useDidShow(() => {
    init()
  })

  const init = () => {
    onFetchSpuCart()
  }

  const onFetchSpuCart = async () => {
    const shopOpen = snapUser.shopOpen
    const localSkuList = filter(snapUser.cart, (u) => u.shopId === shopOpen.id)
    const req = {
      spuIds: localSkuList.map((u) => u.spuId),
    }
    const [err, res] = await fetchSpuCart(req)
    if (err) return

    const resTrim = res.list.map((u) => {
      let sku = []
      console.log({ u })
      u.sku.forEach((h) => {
        const sole = find(localSkuList, { id: h.id })
        if (sole) {
          sku.push({
            ...h,
            quantity: sole.quantity,
          })
        }
      })
      return {
        ...u,
        sku,
      }
    })
    setState({
      mainList: resTrim,
    })
  }

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
          {state.mainList.length ? (
            state.mainList.map((u) => (
              <div key={u.id} className="mb-2 overflow-hidden rounded-lg bg-white">
                <div className="h-v10 flex items-center border-b2">
                  <div className="w-v10"></div>
                  <div className="flex items-center">
                    <div className="h-v6 w-v6 bg-gray-400 overflow-hidden rounded-lg mr-3">
                      <Image src={u.imageMain[0]} mode="widthFix" />
                    </div>
                    <div>{u.name}</div>
                  </div>
                </div>
                <div className="py-2">
                  {u.sku.map((h) => (
                    <div key={h.id} className="flex justify-between items-center py-2">
                      <div className="w-v10 flex justify-center items-center">
                        <Checkbox value={h.id}></Checkbox>
                      </div>
                      <div className="flex-1 flex">
                        <div className="h-v15 w-v15 bg-gray-400 overflow-hidden rounded-lg mr-3">
                          <Image src={h.imageMain[0]} mode="widthFix" />
                        </div>
                        <div className="flex-1">
                          <div className="pr-2 flex justify-between items-center">
                            <div className="flex-1">{h.name}</div>
                            <div>
                              <InputNumber
                                value={h.quantity}
                                min={1}
                                max={h.inventory}
                                onChange={(v) => {
                                  onSetCart(u.id, v)
                                }}
                              />
                            </div>
                          </div>
                          <div className="pt-2">
                            <Price price={h.price} size="large"></Price>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>
              <div className="w-v100 min-h-v80">
                <Image mode="widthFix" src={'https://qiniu.commok.com/picgo/202307231702486.svg'} />
              </div>
              <div className="text-center text-gray-400 py-5">无数据</div>
            </div>
          )}
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
