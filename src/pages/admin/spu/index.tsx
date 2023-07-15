import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Input, Card, Price, Tag, InfiniteLoading } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'
import qs from 'qs'

import CAll from '@/components/all_comp'
import { fetchSpuList } from '@/apis/index'
import { mUser } from '@/store'
import CGoAdd from '@/components/go_add_comp'

definePageConfig({
  navigationBarTitleText: '商品管理',
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
    onFetchSpuList()
  }

  const onFetchSpuList = async () => {
    const req = {
      shopId: snapUser.shop?.id,
      ...state.reqList,
    }
    const [err, res] = await fetchSpuList(req)
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
              <div key={u.id} className="rounded-lg bg-white mb-2">
                <div className="">
                  <div>
                    <IconFont size="60" name={u.imageMain[0]} />
                  </div>
                  <div>{u.name}</div>
                </div>
                <div className="flex">
                  <div>
                    <IconFont size="30" name="del" />
                    删除
                  </div>
                  <div
                    onClick={() => {
                      Taro.navigateTo({
                        url: `/pages/admin/sku/index?${qs.stringify({
                          id: u.id,
                        })}`,
                      })
                    }}
                  >
                    <IconFont size="30" name="plus" />
                    添加型号规格
                  </div>
                  <div>
                    <IconFont size="30" name="edit" />
                    编辑
                  </div>
                </div>
              </div>
            ))}
          </InfiniteLoading>
        </div>
        <CGoAdd />
      </div>
    </div>
  )
}
