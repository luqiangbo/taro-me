import Taro, { useDidShow } from '@tarojs/taro'
import { Button, Collapse, Image, Price, Picker } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSetState, useUpdate } from 'ahooks'

import CAll from '@/components/all_comp'
import CSearchList from '@/components/search_list_comp'
import { dayFrmat, statusOrder, statusList } from '@/utils'
import { mUser } from '@/store'
import { fetchOrderUpdate } from '@/apis'

definePageConfig({
  navigationBarTitleText: '合集管理',
})

export default function PageOrderMy() {
  const update = useUpdate()
  const [state, setState] = useSetState({
    statusActive: [],
    orderId: '',
    isOpenStatus: false,
    statusList: statusList,
    roload: true,
  })

  useDidShow(() => {
    init()
  })

  const init = () => {}

  const onFetchOrderUpdate = async (req) => {
    const [err, res] = await fetchOrderUpdate(req)
    if (err) return
  }

  const renderList = (h) => {
    return (
      <div key={h.id} className="rounded-lg bg-white p-4 mb-3 relative">
        <div className="flex items-center justify-between mb-2 text-gray-800">
          <div>客户:{h.custom.nickName}</div>
          <div className="text-gray-500 flex items-baseline justify-between">
            {/* <div style={{ color: '#bda57e' }} className="mr-1">
              总价:
            </div>
            <Price price={h.totalPrice} size="large"></Price> */}
          </div>
        </div>
        <div className="flex items-center justify-between mb-2 text-gray-500">
          <div>状态:{statusOrder(h.status)}</div>
          <div>{dayFrmat(h.createdAt)}</div>
        </div>
        <Collapse expandIcon={'🌂'}>
          <Collapse.Item title={`合集号: ${h.code}`}>
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
          </Collapse.Item>
        </Collapse>

        <div className="flex items-center justify-between">
          <div></div>
          <Button
            color="#7232dd"
            fill="outline"
            onClick={() => {
              setState({
                orderId: h.id,
                statusActive: [h.status],
                isOpenStatus: true,
              })
              update()
            }}
          >
            设置状态
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      <CAll />
      {state.roload ? <CSearchList renderList={renderList} /> : null}

      <Picker
        key={state.orderId}
        defaultValue={state.statusActive}
        visible={state.isOpenStatus}
        options={state.statusList}
        onConfirm={(list, values) => {
          const status = list[0].value
          setState({
            roload: false,
          })
          setTimeout(() => {
            setState({
              roload: true,
            })
          }, 300)
          onFetchOrderUpdate({
            id: state.orderId,
            status,
          })
        }}
        onClose={() => {
          setState({
            isOpenStatus: false,
          })
        }}
      />
    </div>
  )
}
