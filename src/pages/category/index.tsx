import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Tabs, Image, Popup, Radio, Divider, Button, InputNumber, Price, Tag } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'
import { get, find, filter, cloneDeep, sumBy } from 'lodash-es'

import CAll from '@/components/all_comp'
import CTabber from '@/components/tabbar_comp'
import { fetchCategoryList, fetchSpuList } from '@/apis'
import { mUser, mCommon } from '@/store'

definePageConfig({
  navigationBarTitleText: '作品',
})

export default function EssayPage() {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    categoryActive: 0,
    categoryList: [],
    spuList: [],
    isOpenSpu: false,
    spuDetail: {},
    skuActive: {},
    skuQuantity: 1,
  })
  useDidShow(() => {
    init()
  })

  const init = () => {
    onFetchList()
  }

  const onFetchList = async () => {
    const req = {
      shopId: mUser.shopOpen?.id,
      current: 1,
      pageSize: 100,
    }
    const [err, res] = await fetchCategoryList(req)
    if (err) return
    console.log({ err, res })
    setState({
      categoryList: res.list,
      categoryActive: 0,
    })
    onFetchSpuList(res.list[0].id)
  }

  const onFetchSpuList = async (categoryId) => {
    const req = {
      shopId: mUser.shopOpen?.id,
      categoryId,
      current: 1,
      pageSize: 100,
    }
    const [err, res] = await fetchSpuList(req)
    if (err) return
    let spuList = []
    res.list.forEach((u) => {
      if (u.sku.length) {
        spuList.push({
          ...u,
          price: u.sku[0].price,
        })
      }
    })
    console.log({ spuList })
    setState({
      spuList,
    })
  }

  const onGetSkuQuantity = (spuId) => {
    let quantity = 0
    const skuList = cloneDeep(mUser.cart)
    const soleList = filter(skuList, (u) => u.spuId === spuId)
    if (soleList.length) {
      quantity = sumBy(soleList, (u) => u.quantity)
    }
    return quantity
  }

  const onOpenAddCart = (data) => {
    setState({
      isOpenSpu: true,
      spuDetail: data,
      skuActive: data.sku[0],
    })
  }

  const onAddCart = () => {
    const { skuActive, skuQuantity } = state
    const cart = cloneDeep(mUser.cart)
    const shopOpen = mUser.shopOpen
    const sole = find(cart, { id: skuActive.id })
    if (sole) {
      const quantityRes = sole.quantity + skuQuantity
      if (quantityRes > skuActive.inventory) {
        mCommon.onToast('超出最大了')
        return
      }
      sole.quantity = quantityRes
      console.log('库存1', { cart, quantityRes, sole })
      mUser.cart = cart
    } else {
      console.log('库存2', { skuActive, sole })
      if (skuQuantity > skuActive.inventory) {
        mCommon.onToast('超出最大了')
        return
      }
      cart.push({
        shopId: shopOpen.id,
        spuId: skuActive.spuId,
        id: skuActive.id,
        quantity: skuQuantity,
      })
      mUser.cart = cart
    }
    setState({
      isOpenSpu: false,
    })
  }

  return (
    <div className="page-category">
      <CAll />
      <CTabber />
      <div>
        <Tabs
          // style={{ height: 'calc(100vh - 50px)' }}
          style={{ height: '100vh' }}
          value={state.categoryActive}
          onChange={(i) => {
            onFetchSpuList(state.categoryList[i].id)
            setState({
              categoryActive: i,
            })
          }}
          direction="vertical"
        >
          {state.categoryList.map((u) => (
            <Tabs.TabPane key={u.id} title={u.name}>
              {state.spuList.map((h) => (
                <div key={h.id} className="mb-2 flex overflow-hidden items-center rounded-lg px-1">
                  <div className="w-v20 h-v20  bg-gray-400 overflow-hidden rounded-lg ">
                    <Image src={h.imageMain[0]} mode="widthFix" />
                  </div>
                  <div className="flex-1 pl-1 flex flex-col justify-between relative">
                    <div>
                      <div>{h.name}</div>
                      <div>
                        {h.sku.map((h) => (
                          <Tag type="warning" className="mr-1">
                            {h.name}
                          </Tag>
                        ))}
                      </div>
                    </div>
                    <div className="h-v12 flex justify-between items-end overflow-hidden rounded ">
                      <div>
                        <Price price={h.price} size="normal" thousands></Price>
                      </div>
                      <div
                        className="w-v12 h-v12 rounded-full button-add flex justify-center items-center "
                        onClick={() => {
                          onOpenAddCart(h)
                        }}
                      >
                        <IconFont fontClassName="iconfont" classPrefix="icon" name="add" size="16" />
                      </div>
                    </div>
                    <div className="absolute" style={{ right: '5px', bottom: '30px', zIndex: '10' }}>
                      {onGetSkuQuantity(h.id) ? <Tag type="primary">{onGetSkuQuantity(h.id)}</Tag> : null}
                    </div>
                  </div>
                </div>
              ))}
            </Tabs.TabPane>
          ))}
        </Tabs>
        <Popup
          visible={state.isOpenSpu}
          className="h-v100"
          position="bottom"
          round
          onClose={() => {
            setState({
              isOpenSpu: false,
            })
          }}
        >
          {state.spuDetail?.id ? (
            <div className="px-5 pt-5 pb-10 overflow-y-auto relative h-full">
              <div className="flex">
                <div className="w-v12 h-v12 bg-gray-400 rounded-lg overflow-hidden">
                  <Image src={get(state.skuActive, 'imageMain[0]', '')} mode="widthFix" />
                </div>
                <div className="flex-1 pl-3">
                  <div>{get(state.spuDetail, 'name', '')}</div>
                  <div>{get(state.spuDetail, 'detail', '')}</div>
                  <div className="pt-2 text-sm text-gray-400">数量: {get(state.skuActive, 'inventory', '')}</div>
                </div>
              </div>
              <div className="pt-1">
                <div>
                  <Divider contentPosition="left" styles={{ color: mCommon.colorMain, borderColor: mCommon.colorMain }}>
                    规格
                  </Divider>
                </div>
                <Radio.Group
                  defaultValue={get(state.skuActive, 'id', '')}
                  direction="horizontal"
                  onChange={(v) => {
                    const sole = find(state.spuDetail.sku, { id: v })
                    console.log({ v, sole })
                    setState({
                      skuQuantity: 1,
                      skuActive: sole,
                    })
                  }}
                >
                  {state.spuDetail.sku.map((u) => (
                    <Radio key={u.id} shape="button" value={u.id}>
                      {u.name}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
              <div className="flex items-center justify-between">
                <div>收藏数量</div>
                <div>
                  <InputNumber
                    defaultValue={state.skuQuantity}
                    value={state.skuQuantity}
                    min={1}
                    onChange={(v) => {
                      setState({
                        skuQuantity: v * 1,
                      })
                    }}
                  />
                </div>
              </div>
              <div className="safe-area absolute bottom-4 left-0 w-full px-4">
                <Button block type="primary" onClick={onAddCart}>
                  收藏
                </Button>
              </div>
            </div>
          ) : null}
        </Popup>
      </div>
    </div>
  )
}
