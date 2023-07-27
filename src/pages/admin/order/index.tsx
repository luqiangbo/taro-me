import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Popup, Radio, Image, Price, TextArea, Button, Ellipsis } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'
import { find, cloneDeep, filter } from 'lodash-es'

import CAll from '@/components/all_comp'
import { fetchAddressList, fetchSpuCart } from '@/apis/index'
import { goto, getParams } from '@/utils'
import { mUser, mCommon } from '@/store'

definePageConfig({
  navigationBarTitleText: '确认订单',
})

export default function AdminOrderPage() {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    isOpenAddress: false,
    addressList: [],
    addressActive: '',
    skuList: [],
    isOpenNotes: false,
    notes: '',
    skuActive: '',
  })

  useEffect(() => {
    init()
    return () => {
      mUser.order = []
    }
  }, [])

  const init = () => {
    onFetchSpuCart()
    if (snapUser.custom?.id) {
      onFetchAddressList()
    } else {
    }
  }

  const onFetchAddressList = async () => {
    const req = {
      current: 1,
      pageSize: 100,
      customId: snapUser.custom?.id,
    }
    const [err, res] = await fetchAddressList(req)
    if (err) return
    if (res.list.length) {
      setState({
        addressList: res.list,
        addressActive: res.list[0],
      })
    }
  }

  const onFetchSpuCart = async () => {
    const shopOpen = snapUser.shopOpen
    const localOrder = cloneDeep(snapUser.order)
    const localSkuList = filter(localOrder, (u) => u.shopId === shopOpen.id)
    const req = {
      spuIds: localSkuList.map((u) => u.spuId),
    }
    const [err, res] = await fetchSpuCart(req)
    if (err) return
    const skuList = []
    res.list.forEach((u) => {
      u.sku.forEach((h) => {
        const sole = find(localSkuList, { id: h.id })
        if (sole) {
          skuList.push({
            ...h,
            quantity: sole.quantity,
            notes: '',
            spu: {
              image: u.imageMain[0],
              name: u.name,
            },
          })
        }
      })
    })
    console.log({ skuList })
    setState({
      skuList,
    })
  }

  return (
    <div className="page-c">
      <CAll />

      <div className="fixed top-0 left-0 z-50 w-full h-v20 p-3">
        <div className="flex items-center rounded bg-white px-4 h-full">
          <div
            className=" flex items-center text-sm text-gray-400"
            onClick={() => {
              if (state.addressList.length) {
                setState({
                  isOpenAddress: true,
                })
              } else {
                if (mUser.custom?.id) {
                  mCommon.onToast('请添加地址')
                } else {
                  mCommon.onToast('请登录')
                }
              }
            }}
          >
            <IconFont name="location2" size={18} className="mr-2"></IconFont>
            {state.addressActive.id ? (
              <div>
                <div className="flex items-center">
                  <div>地址:</div>
                  <div>{state.addressActive.summary}</div>
                </div>
                <div>
                  {state.addressActive.receiver}-{state.addressActive.phone}
                </div>
              </div>
            ) : (
              '地址: 无'
            )}
          </div>
        </div>
      </div>
      <div className="h-v20"></div>
      <div className="px-2 py-2">
        {state.skuList.map((u) => (
          <div className=" bg-white rounded mb-2 p-2" key={u.key}>
            <div className="flex">
              <div className="h-v15 w-v15 bg-gray-400 overflow-hidden rounded-lg mr-3">
                <Image src={u.imageMain[0]} mode="widthFix" />
              </div>
              <div className="flex-1">
                <div className="pr-2 flex justify-between items-center">
                  <div className="flex-1">
                    <div>{u.spu.name}</div>
                    <div>{u.name}</div>
                  </div>
                  <div className="text-right">
                    <Price price={u.price} size="normal"></Price>
                    <div className="text-sm">x {u.quantity}</div>
                  </div>
                </div>
                <div className="pt-2"></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-gray-600 pt-2">
              <div className="w-v18">订单备注</div>
              <div
                className=" flex items-end"
                onClick={() => {
                  setState({
                    isOpenNotes: true,
                    skuActive: u.id,
                  })
                }}
              >
                {/* <Ellipsis content={u.notes ? u.notes : '无备注'} direction="end" /> */}
                <div className="mr-2 w-v50 text-right overflow-hidden">{u.notes ? u.notes : '无备注'}</div>
                <IconFont name="edit" size={14} className="mr-2" color="#4e5562"></IconFont>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Popup
        visible={state.isOpenAddress}
        style={{ height: '70%' }}
        position="bottom"
        round
        onClose={() => {
          setState({
            isOpenAddress: false,
          })
        }}
      >
        {state.addressList?.length !== 0 ? (
          <div className="px-4 py-8">
            <Radio.Group
              defaultValue={state.addressActive.id}
              onChange={(id) => {
                const sole = find(state.addressList, { id: id })
                setState({
                  addressActive: sole,
                  isOpenAddress: false,
                })
              }}
            >
              {state.addressList.map((u) => (
                <div className="flex items-center py-3">
                  <div className="w-v10 flex items-center justify-center">
                    <Radio value={u.id}></Radio>
                  </div>
                  <div>
                    <div>
                      {u.receiver}-{u.phone}
                    </div>
                    <div className="text-gray-400 text-sm">
                      <div>{u.summary}</div>
                      <div>{u.detail}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Radio.Group>
          </div>
        ) : null}
      </Popup>

      <Popup
        visible={state.isOpenNotes}
        style={{ height: '70%' }}
        position="bottom"
        round
        onClose={() => {
          setState({
            isOpenNotes: false,
          })
        }}
      >
        <div className="px-4 py-8 overflow-y-auto relative h-full">
          <div className="text-center text-lg mb-2">备注</div>
          <div className="textarea-my">
            <TextArea
              showCount
              maxLength={200}
              rows={15}
              value={state.notes}
              defaultValue={state.notes}
              onChange={(v) => {
                setState({
                  notes: v,
                })
              }}
            />
          </div>
          <div className="safe-area absolute bottom-4 left-0 w-full px-4">
            <Button
              block
              type="primary"
              onClick={() => {
                const { skuActive, skuList, notes } = state
                const sole = find(skuList, { id: skuActive })
                sole.notes = notes
                setState({
                  skuList,
                  isOpenNotes: false,
                })
              }}
            >
              确定
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  )
}
