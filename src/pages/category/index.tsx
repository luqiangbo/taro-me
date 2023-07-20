import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Tabs, Image, Popup, Radio, Divider, Button, InputNumber, Price, Tag } from '@nutui/nutui-react-taro'
import { useSnapshot } from 'valtio'
import { get, find, filter, cloneDeep, sumBy } from 'lodash-es'

import CAll from '@/components/all_comp'
import CTabber from '@/components/tabbar_comp'
import { fetchCategoryList, fetchSpuList } from '@/apis'
import { mUser } from '@/store'
import { IconFont } from '@nutui/icons-react-taro'

definePageConfig({
  navigationBarTitleText: '分类',
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
      shopId: snapUser.shopOpen?.id,
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
      shopId: snapUser.shopOpen?.id,
      categoryId,
      current: 1,
      pageSize: 100,
    }
    const [err, res] = await fetchSpuList(req)
    if (err) return
    setState({
      spuList: res.list.filter((u) => u.sku.length),
    })
  }

  const onGetSkuQuantity = (spuId) => {
    let quantity = 0
    const skuList = cloneDeep(snapUser.cart)
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
    const cart = cloneDeep(snapUser.cart)
    const sole = find(cart, { id: skuActive.id })
    if (sole) {
      sole.quantity = sole.quantity + skuQuantity
      mUser.cart = cart
    } else {
      cart.push({
        ...skuActive,
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
                <div key={h.id} className="mb-2 flex overflow-hidden rounded-lg px-1">
                  <div className="w-v20 h-v20  bg-gray-400 overflow-hidden rounded-lg ">
                    <Image src={h.imageMain[0]} mode="widthFix" />
                  </div>
                  <div className="flex-1 pl-1 flex flex-col justify-between relative">
                    <div>
                      <div>{h.name}</div>
                      <div>{u.tilte}</div>
                    </div>
                    <div className="h-v12 flex justify-between items-end overflow-hidden rounded ">
                      <div>
                        <Price price={123.1} size="normal" thousands></Price>
                      </div>
                      <div
                        className="w-v12 h-v12 rounded-full button-add flex justify-center items-center "
                        onClick={() => {
                          onOpenAddCart(h)
                        }}
                      >
                        <IconFont name="cart" color="#fff"></IconFont>
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
                </div>
              </div>
              <div className="pt-1">
                <div>
                  <Divider contentPosition="left" styles={{ color: '#c5a47a', borderColor: '#c5a47a' }}>
                    规格型号
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
                <div>购买数量</div>
                <div>
                  <InputNumber
                    defaultValue={state.skuQuantity}
                    value={state.skuQuantity}
                    min={1}
                    max={state.skuActive.inventory}
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
                  加入购物车
                </Button>
              </div>
            </div>
          ) : null}
        </Popup>
      </div>
    </div>
  )
}
