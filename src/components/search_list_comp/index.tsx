import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState, useUpdateEffect } from 'ahooks'
import { Input, Swipe, Price, Tag, InfiniteLoading, Button } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'

import { mUser } from '@/store'
import { goto, getParams } from '@/utils'
import { fetchCategoryList } from '@/apis/index'

export default function SearchListComp(props) {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    mainList: [],
    total: 0,
    req: {
      current: 1,
      pageSize: 10,
    },
    hasMore: true,
    params: {},
  })
  useDidShow(() => {
    init()
  })

  useUpdateEffect(() => {
    fetchList()
  }, [JSON.stringify(state.req)])

  const init = () => {
    fetchList()
  }

  const fetchList = () => {
    const params = getParams()
    console.log('search-list init', { params: getParams() })
    if (params.key === 'category') {
      onFetchCategoryList()
    }
  }

  const onFetchCategoryList = async () => {
    const req = {
      shopId: snapUser.shop?.id,
      ...state.req,
    }
    const [err, res] = await fetchCategoryList(req)
    if (err) return
    const mainList = [...state.mainList, ...res.list]
    const hasMore = mainList.length !== res.total
    console.log({ hasMore, mainList })
    setState({
      mainList,
      hasMore,
    })
  }

  return (
    <div className="page-list">
      <div className="all-search page-list-search ">
        <Input placeholder="搜索您想要的内容~" />
      </div>
      <div className="page-list-body">
        <InfiniteLoading
          loadingText="加载中···"
          loadMoreText="没有啦～"
          pullRefresh={false}
          hasMore={state.hasMore}
          onLoadMore={() => {
            setState({
              req: {
                ...state.req,
                current: state.req.current + 1,
              },
            })
          }}
        >
          <div className="page-list-main">
            {state.mainList.map((u) => (
              <Swipe
                key={u.id}
                rightAction={
                  <Button type="danger" shape="square">
                    删除
                  </Button>
                }
              >
                {props.renderList(u)}
              </Swipe>
            ))}
          </div>
        </InfiniteLoading>
      </div>
    </div>
  )
}
