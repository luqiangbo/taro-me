import { useDidShow } from '@tarojs/taro'
import { useSetState, useUpdateEffect } from 'ahooks'
import { Checkbox, Button, Image, Price, InputNumber, Popup, Radio } from '@nutui/nutui-react-taro'
import { useSnapshot } from 'valtio'
import { filter, find, cloneDeep } from 'lodash-es'

import CAll from '@/components/all_comp'
import CTabber from '@/components/tabbar_comp'
import { mUser, mCommon } from '@/store'
import { fetchSpuCart, fetchAddressList } from '@/apis'
import { add, multiply } from '@/utils'

definePageConfig({
  navigationBarTitleText: '购物车',
})

export default function EssayPage() {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    mainList: [],
    isAdministration: false,
    addressList: [],
    addressActive: {},
    isOpenAddress: false,
    skuIdListActive: [],
    skuIdList: [],
    isAllSkuId: false,
    skuPriceObj: {},
    priceActive: '0',
    resList: [],
  })

  useDidShow(() => {
    init()
  })

  useUpdateEffect(() => {
    onPrice()
  }, [JSON.stringify(state.skuIdListActive), JSON.stringify(snapUser.cart)])

  useUpdateEffect(() => {
    onFetchSpuCart()
  }, [JSON.stringify(snapUser.cart)])

  const init = () => {
    setState({
      mainList: [],
      isAdministration: false,
      addressList: [],
      addressActive: {},
      isOpenAddress: false,
      skuIdListActive: [],
      skuIdList: [],
      isAllSkuId: false,
      skuPriceObj: {},
      priceActive: '0',
      resList: [],
    })
    onFetchSpuCart()
    if (snapUser.custom?.id) {
      onFetchAddressList()
    } else {
    }
  }

  const onPrice = () => {
    const localSku = mUser.cart
    const { skuPriceObj, skuIdListActive } = state
    let priceActive = '0'
    skuIdListActive.forEach((id) => {
      const sole = find(localSku, { id: id })
      if (sole) {
        priceActive = add(priceActive, multiply(skuPriceObj[id], sole.quantity))
      }
    })
    setState({
      priceActive,
    })
  }

  const onFetchSpuCart = async () => {
    const shopOpen = snapUser.shopOpen
    const listClone = cloneDeep(snapUser.cart)
    const localSkuList = filter(listClone, (u) => u.shopId === shopOpen.id)
    console.log({ listClone, localSkuList })
    const req = {
      spuIds: localSkuList.map((u) => u.spuId),
    }
    const [err, res] = await fetchSpuCart(req)
    if (err) return
    let skuIdList = []
    const skuPriceObj = {}
    const resTrim = res.list.map((u) => {
      let sku = []
      u.sku.forEach((h) => {
        const sole = find(localSkuList, { id: h.id })
        if (sole) {
          skuIdList.push(h.id)
          skuPriceObj[h.id] = h.price
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
      skuIdList,
      skuPriceObj,
    })
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

      <div className="fixed top-0 left-0 z-50 w-full bg-white h-v8">
        <div className="px-3 flex justify-between items-center">
          <div
            className="flex-1 flex items-center text-sm text-gray-400"
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
            <div>地址:</div>
            <div>{state.addressActive.id ? state.addressActive.summary : '无'}</div>
          </div>
          <div
            className=""
            onClick={() => {
              setState({
                isAdministration: !state.isAdministration,
              })
            }}
          >
            {state.isAdministration ? <div className="text-red-500"> 退出管理</div> : '管理'}
          </div>
        </div>
      </div>
      <div className="h-v8"></div>
      <div className="p-3">
        <Checkbox.Group
          value={state.skuIdListActive}
          onChange={(v) => {
            setState({
              skuIdListActive: v,
              isAllSkuId: v.length === state.skuIdList.length,
            })
          }}
        >
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
                                defaultValue={h.quantity}
                                min={1}
                                max={h.inventory}
                                onChange={(v) => {
                                  onSetCart(h.id, v)
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
      <div className="safe-area fixed z-50 left-0 w-full  bg-white" style={{ bottom: '50px' }}>
        <div className="flex justify-between items-center p-2 h-v15">
          <div>
            <Checkbox
              checked={state.isAllSkuId}
              onChange={(v) => {
                setState({
                  isAllSkuId: v,
                  skuIdListActive: v ? state.skuIdList : [],
                })
              }}
            >
              全选
            </Checkbox>
          </div>
          {state.isAdministration ? (
            <div>
              <Button
                className="w-v25"
                color="linear-gradient(to right, #cf471e, #e24e58)"
                onClick={() => {
                  const { skuIdListActive } = state
                  const cart = snapUser.cart
                  const list = filter(cart, (u) => skuIdListActive.indexOf(u.id) === -1)
                  mUser.cart = list
                }}
              >
                删除
              </Button>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="mr-2">
                总价: <Price price={state.priceActive} size="large"></Price>
              </div>
              <Button
                className="w-v25"
                color="linear-gradient(to right, #5bae6f, #249543)"
                onClick={() => {
                  if (!mUser.custom?.id) {
                    mCommon.onToast('请登录')
                    return
                  }
                  if (state.skuIdListActive.length === 0) {
                    mCommon.onToast('请选择商品')
                    return
                  }
                }}
              >
                结算
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
