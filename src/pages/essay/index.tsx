import { useEffect } from 'react'
import { useSetState } from 'ahooks'

definePageConfig({
  navigationBarTitleText: '列表页',
})

export default function EssayPage() {
  const [state, setState] = useSetState({
    req: { page: 1 },
    hasMore: false,
  })
  useEffect(() => {
    init()
  }, [])

  const init = () => {
    onFetchList()
  }

  const onFetchList = async () => {}

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

  return <div className="page-essay">123</div>
}
