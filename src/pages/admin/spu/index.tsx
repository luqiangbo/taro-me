import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Input, Card, Price, Tag, InfiniteLoading } from '@nutui/nutui-react-taro'
import { Plus } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'
import qs from 'qs'

import CAll from '@/components/all_comp'
import { fetchSpuList } from '@/apis/index'
import { mUser } from '@/store'

definePageConfig({
  navigationBarTitleText: '商品管理',
})

export default function AdminProductPage() {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    spuList: [],
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
    onFetchSpuList()
  }

  const onFetchSpuList = async () => {
    const req = {
      shopId: snapUser.shop.value,
      ...state.reqList,
    }
    const [err, res] = await fetchSpuList(req)
    if (err) return
    setState({
      spuList: res.list,
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
            {state.spuList.map((u) => (
              <div key={u.id} className="rounded-lg bg-white mb-2">
                {u.name}
              </div>
            ))}
          </InfiniteLoading>
        </div>
        <div
          className="fixed right-2 bottom-2 w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center"
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/admin/spu/add_edit/index?${qs.stringify({ type: 'add' })}`,
            })
          }}
        >
          <Plus color="white" /> 添加
        </div>
      </div>
    </div>
  )
}
