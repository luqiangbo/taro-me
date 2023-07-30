import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState, useUpdateEffect } from 'ahooks'
import { SearchBar, Swipe, Price, Tag, InfiniteLoading, Button } from '@nutui/nutui-react-taro'
import { useSnapshot } from 'valtio'
import { trim } from 'lodash-es'

import { mUser } from '@/store'
import { goto, getParams } from '@/utils'
import {
  fetchCategoryList,
  fetchCategoryDelete,
  fetchShopList,
  fetchShopDelete,
  fetchSkuList,
  fetchSkuDelete,
  fetchSpuList,
  fetchSpuDelete,
  fetchTagList,
  fetchTagDelete,
  fetchAddressList,
  fetchAddressDelete,
  fetchOrderListCustom,
} from '@/apis/index'

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
    isOpenSwipe: false,
  })
  useDidShow(() => {
    init()
  })

  useUpdateEffect(() => {
    console.log(1)
    fetchList()
  }, [JSON.stringify(state.req), state.hash])

  const init = () => {
    fetchList()
  }

  const fetchList = async () => {
    let req = {}
    const params = getParams()
    console.log('searchList', { params })
    let fetchUrl
    if (params.key === 'category') {
      req = {
        shopId: snapUser.shop?.id,
        ...state.req,
      }
      fetchUrl = fetchCategoryList
    } else if (params.key === 'shop') {
      req = {
        userId: snapUser.user?.id,
        ...state.req,
      }
      fetchUrl = fetchShopList
    } else if (params.key === 'spu') {
      req = {
        shopId: snapUser.shop?.id,
        ...state.req,
      }
      fetchUrl = fetchSpuList
    } else if (params.key === 'sku') {
      req = {
        spuId: params.spuId,
        ...state.req,
      }
      fetchUrl = fetchSkuList
    } else if (params.key === 'tag') {
      req = {
        shopId: snapUser.shop?.id,
        ...state.req,
      }
      fetchUrl = fetchTagList
    } else if (params.key === 'address') {
      req = {
        customId: snapUser.custom?.id,
        summary: state.req.name,
        current: 1,
        pageSize: 20,
      }
      fetchUrl = fetchAddressList
    } else if (params.key === 'order_my') {
      setState({ isOpenSwipe: true })
      req = {
        customId: snapUser.custom?.id,
        ...state.req,
      }
      fetchUrl = fetchOrderListCustom
    } else {
      return
    }

    const [err, res] = await fetchUrl(req)
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

  const onFetchDelete = async (req) => {
    const params = getParams()
    let fetchUrl
    if (params.key === 'category') {
      fetchUrl = fetchCategoryDelete
    } else if (params.key === 'shop') {
      fetchUrl = fetchShopDelete
    } else if (params.key === 'spu') {
      fetchUrl = fetchSpuDelete
    } else if (params.key === 'sku') {
      fetchUrl = fetchSkuDelete
    } else if (params.key === 'tag') {
      fetchUrl = fetchTagDelete
    } else if (params.key === 'address') {
      fetchUrl = fetchAddressDelete
    } else {
      return
    }

    const [err, res] = await fetchUrl(req)
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
                disabled={state.isOpenSwipe}
                rightAction={
                  <Button
                    type="danger"
                    shape="square"
                    onClick={() => {
                      onFetchDelete({ id: u.id })
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
