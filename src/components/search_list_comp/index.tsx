import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState, useUpdateEffect } from 'ahooks'
import { SearchBar, Swipe, Price, Tag, InfiniteLoading, Button } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'
import { trim } from 'lodash-es'

import { mUser } from '@/store'
import { goto, getParams } from '@/utils'
import { fetchCategoryList, fetchCategoryDelete } from '@/apis/index'

export default function SearchListComp(props) {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    mainList: [],
    total: 0,
    req: {
      current: 1,
      pageSize: 20,
    },
    hasMore: true,
    params: {},
    hash: '',
  })
  useDidShow(() => {
    init()
  })

  useUpdateEffect(() => {
    console.log(11)
    fetchList()
  }, [JSON.stringify(state.req), state.hash])

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

  const fetchDelete = (req) => {
    const params = getParams()
    if (params.key === 'category') {
      onFetchCategoryDelete(req)
    }
  }

  const onFetchCategoryList = async () => {
    const req = {
      shopId: snapUser.shop?.id,
      ...state.req,
    }
    const [err, res] = await fetchCategoryList(req)
    if (err) return
    const mainList = state.req.current === 1 ? res.list : [...state.mainList, ...res.list]
    let hasMore = mainList.length !== res.total
    if (req.name && mainList.length !== state.req.pageSize) {
      hasMore = false
    }
    console.log({ hasMore, mainList })
    setState({
      mainList,
      hasMore,
    })
  }

  const onFetchCategoryDelete = async (req) => {
    const [err, res] = await fetchCategoryDelete(req)
    if (err) {
      return
    }
    setState({
      hasMore: true,
      mainList: [],
      hash: req.id,
      req: {
        current: 1,
        pageSize: 20,
      },
    })
  }

  return (
    <div className="page-list">
      <div className="all-search page-list-search ">
        <SearchBar
          placeholder="搜索您想要的内容~"
          onSearch={(v) => {
            setState({
              hasMore: true,
              mainList: [],
              req: {
                current: 1,
                pageSize: 20,
                name: trim(v),
              },
            })
          }}
        />
      </div>
      <div className="page-list-body">
        <InfiniteLoading
          loadingText="······"
          loadMoreText="······"
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
                  <Button
                    type="danger"
                    shape="square"
                    onClick={() => {
                      fetchDelete({ id: u.id })
                    }}
                  >
                    删除
                  </Button>
                }
              >
                {props.renderList(u)}
              </Swipe>
            ))}
            <div className="text-center p-2 text-gray-400">{state.hasMore ? '加载中...' : '没有拉'}</div>
          </div>
        </InfiniteLoading>
      </div>
    </div>
  )
}
