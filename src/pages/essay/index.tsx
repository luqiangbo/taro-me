import { useState, useEffect } from 'react'
import { useSetState } from 'ahooks'
import { VirtualList } from '@nutui/nutui-react-taro'

import { postArticleList } from '@/apis/index'
import './index.scss'

definePageConfig({
  navigationBarTitleText: '列表页',
})

export default function EssayPage() {
  const [state, setState] = useSetState({
    req: { page: 1 },
    list: [],
    hasMore: false,
  })
  useEffect(() => {
    init()
  }, [])

  const init = () => {
    onFetchList()
  }

  const onFetchList = async () => {
    const [err, res] = await postArticleList(state.req)
    if (err) return
    const list = state.req.page === 1 ? res.datas : [...state.list, ...res.datas]
    console.log({ err, res, list })
    setState({
      list,
    })
  }

  const ItemRender = (u) => (
    <div className="list-item" key={u.data.id}>
      <div className="main">
        <div>头像</div>
        <div>
          <div>{u.data.title}</div>
          <div>
            <div>{u.data.niceDate}</div>
            <div>{u.data.superChapterName}</div>
          </div>
        </div>
      </div>
    </div>
  )

  const onScroll = () => {
    console.log('onScroll')
  }

  return (
    <div className="page-essay">
      <VirtualList itemSize={100} sourceData={state.list} ItemRender={ItemRender} onScroll={onScroll} />
    </div>
  )
}
