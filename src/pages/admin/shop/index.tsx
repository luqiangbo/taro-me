import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Input, InfiniteLoading } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'
import qs from 'qs'

import CAll from '@/components/all_comp'
import CGoAdd from '@/components/go_add_comp'
import { fetchShopList } from '@/apis/index'
import { mUser } from '@/store'

definePageConfig({
  navigationBarTitleText: '店铺管理',
})

export default function AdminProductPage() {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    mainList: [],
    total: 0,
    reqList: {
      current: 1,
      pageSize: 10,
    },
    hasMore: true,
  })

  useDidShow(() => {
    init()
  })

  const init = () => {
    onFetchShopList()
  }

  const onFetchShopList = async () => {
    const req = {
      userId: snapUser.user?.id,
      ...state.reqList,
    }
    const [err, res] = await fetchShopList(req)
    if (err) return
    setState({
      mainList: res.list,
      total: res.total,
      hasMore: true,
    })
  }

  return (
    <div className="page-c page-a-spu">
      <CAll />
      <div className="spu-main p-2" id="scrollDemo" style={{ height: '90vh' }}>
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
            {state.mainList.map((u) => (
              <div key={u.id} className="rounded-lg bg-white p-4 mb-2">
                {u.name}
              </div>
            ))}
          </InfiniteLoading>
        </div>
        <CGoAdd />
      </div>
    </div>
  )
}
