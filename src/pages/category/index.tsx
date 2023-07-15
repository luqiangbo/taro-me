import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Tabs } from '@nutui/nutui-react-taro'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CTabber from '@/components/tabbar_comp'
import { fetchCategoryList, fetchSpuList } from '@/apis'
import { mUser } from '@/store'

definePageConfig({
  navigationBarTitleText: '分类',
})

export default function EssayPage() {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    categoryActive: 0,
    categoryList: [],
    spuList: [],
  })
  useDidShow(() => {
    init()
  })

  const init = () => {
    onFetchList()
  }

  const onFetchList = async () => {
    const req = {
      shopId: snapUser.shopOpen?.id,
      current: 1,
      pageSize: 100,
    }
    const [err, res] = await fetchCategoryList(req)
    if (err) return
    console.log({ err, res })
    setState({
      categoryList: res.list,
      categoryActive: 0,
    })
    onFetchSpuList(res.list[0].id)
  }

  const onFetchSpuList = async (categoryId) => {
    const req = {
      shopId: snapUser.shopOpen?.id,
      categoryId,
      current: 1,
      pageSize: 100,
    }
    const [err, res] = await fetchSpuList(req)
    if (err) return
    setState({
      spuList: res.list,
    })
  }

  return (
    <div className="page-category">
      <CAll />
      <CTabber />
      <div>
        <Tabs
          // style={{ height: 'calc(100vh - 50px)' }}
          style={{ height: '100vh' }}
          value={state.categoryActive}
          onChange={(i) => {
            onFetchSpuList(state.categoryList[i].id)
            setState({
              categoryActive: i,
            })
          }}
          direction="vertical"
        >
          {state.categoryList.map((u) => (
            <Tabs.TabPane key={u.id} title={u.name}>
              {state.spuList.map((h) => (
                <div key={h.id}>{h.name}</div>
              ))}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
