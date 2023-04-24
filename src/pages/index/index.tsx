import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { Button, Icon, Rate, Pagination, Cell } from '@nutui/nutui-react-taro'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import { fetchGitee123 } from '@/apis/index'
import { mUser } from '@/store'

definePageConfig({
  navigationBarTitleText: '首页123',
})

export default function HomePage() {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    list: [],
  })

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    console.log('init-index')
    onFetchGitee123()
  }

  const onFetchGitee123 = async () => {
    const [err, res] = await fetchGitee123()
    if (err) return
    setState({ list: res })
  }
  const [currentPage1, setCurrentPage1] = useState(1)
  const pageChange1 = (v: any) => {
    const c = v
    setCurrentPage1(c)
  }

  return (
    <div className="page-home">
      <div>
        123
        <h1>{snapUser.count}</h1>
      </div>
      <Rate modelValue={3} />
      <Pagination modelValue={currentPage1} totalItems="25" itemsPerPage="5" onChange={pageChange1} />
      <div className="nav">
        <Icon fontClassName="iconfont" classPrefix="icon" name="xihuan" size="24" color="#000" />
        <Icon name="dongdong" size="16" />
        <div
          className="item flex justify-center items-center border-2 border-solid border-cyan-100"
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/essay/index',
            })
          }}
        >
          爱安卓
        </div>
        <div
          className="item"
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/user/index',
            })
          }}
        >
          用户
        </div>
        <div>
          <Button type="primary">主要按钮</Button>
          <Button type="info">信息按钮</Button>
          <Button type="default">默认按钮</Button>
          <Button type="danger">危险按钮</Button>
          <Button type="warning">警告按钮</Button>
          <Button type="success">成功按钮</Button>
        </div>

        <div>
          {state.list.length ? state.list.map((u) => <Cell key={u.key} title={u.value} desc={u.value} />) : null}
        </div>
      </div>
    </div>
  )
}
