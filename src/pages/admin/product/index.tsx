import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Input, Card, Price, Tag, InfiniteLoading } from '@nutui/nutui-react-taro'
import { Plus } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'
import qs from 'qs'

import CAll from '@/components/all_comp'
import {} from './data'
import { fetchProductList } from '@/apis/index'
import { mUser } from '@/store'

definePageConfig({
  navigationBarTitleText: '商品管理',
})

export default function AdminProductPage() {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    productList: [],
    total: 0,
    reqList: {
      current: 1,
      pageSize: 10,
    },
    hasMore: true,
  })

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    onFetchProductList()
  }

  const onFetchProductList = async () => {
    const shopId = snapUser.shopId
    console.log({ shopId })
    const req = {
      shopId,
      ...state.reqList,
    }
    const [err, res] = await fetchProductList(req)
    if (err) return
    setState({
      productList: res.list,
      total: res.total,
      hasMore: true,
    })
  }

  return (
    <div className="page-c page-a-product">
      <CAll />
      <div className="product-main p-2" id="scrollDemo" style={{ height: '90vh' }}>
        <div className="all-search">
          <Input placeholder="搜索您想要的内容~" />
        </div>
        <div style={{ height: '100%' }}>
          <InfiniteLoading
            loadingText="加载中···"
            loadMoreText="没有啦～"
            pullRefresh
            target="scrollDemo"
            hasMore={state.hasMore}
            onLoadMore={() => {
              console.log('onLoadMore')
            }}
            onRefresh={() => {
              console.log('onRefresh')
            }}
          >
            {state.productList.map((u) => (
              <div key={u.id} className="rounded-lg bg-white mb-2">
                <Card
                  src={u.imgsMain[0]}
                  title={u.name}
                  price={u.price}
                  vipPrice={u.price}
                  shopDescription={u.name}
                  delivery={'delivery'}
                  shopName={'shopName'}
                ></Card>
              </div>
            ))}
          </InfiniteLoading>
        </div>
        <div
          className="fixed right-2 bottom-2 w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center"
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/admin/product/add_edit/index?${qs.stringify({ type: 'add' })}`,
            })
          }}
        >
          <Plus color="white" /> 添加
        </div>
      </div>
    </div>
  )
}
