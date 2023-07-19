import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Input, Button, Image, Tag, InfiniteLoading, Row, Col } from '@nutui/nutui-react-taro'
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
              <div key={u.id} className="rounded-lg bg-white mb-2 pt-2 px-2">
                <div className=" flex mb-1">
                  <div className="h-v13 w-v13 bg-gray-400 overflow-hidden rounded-lg ">
                    <Image src={u.imageMain[0]} mode="widthFix" />
                  </div>
                  <div className="p-1">{u.name}</div>
                </div>
                <Row>
                  <Col span="8">
                    <Button block shape="square" type="default">
                      删除
                    </Button>
                  </Col>
                  <Col span="8">
                    <Button
                      block
                      shape="square"
                      type="default"
                      onClick={() => {
                        Taro.navigateTo({
                          url: `/pages/admin/sku/index?${qs.stringify({
                            id: u.id,
                          })}`,
                        })
                      }}
                    >
                      添加型号规格
                    </Button>
                  </Col>
                  <Col span="8">
                    <Button block shape="square" type="default">
                      编辑
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
          </InfiniteLoading>
        </div>
        <CGoAdd />
      </div>
    </div>
  )
}
