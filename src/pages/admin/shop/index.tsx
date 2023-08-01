import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Button } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CGoAdd from '@/components/go_add_comp'
import CSearchList from '@/components/search_list_comp'
import { fetchShopList } from '@/apis/index'
import { goto, getParams } from '@/utils'
import { mUser } from '@/store'

definePageConfig({
  navigationBarTitleText: '小区管理',
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
    onFetchShopList()
  }

  const onFetchShopList = async () => {
    const req = {
      userId: snapUser.user?.id,
      ...state.reqList,
    }
    const [err, res] = await fetchShopList(req)
    if (err) return
    setState({
      mainList: res.list,
      total: res.total,
      hasMore: true,
    })
  }

  const renderList = (u) => {
    return (
      <div className="flex justify-between items-center rounded-lg bg-white h-v14 p-4 mb-3">
        <div className="flex-1">{u.name}</div>
        <div className="h-v8">
          <Button
            color="#c5a47a"
            fill="outline"
            className="flex items-center"
            onClick={() => {
              goto({
                url: `/pages/admin/${getParams().key}/add_edit/index`,
                data: {
                  key: getParams().key,
                  type: 'edit',
                  id: u.id,
                  name: u.name,
                  image: u.image[0],
                  categoryId: u.categoryId,
                  describe: u.describe,
                },
              })
            }}
          >
            <IconFont name="edit" size={12}></IconFont>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <CAll />
      <CGoAdd />
      <CSearchList renderList={renderList} />
    </div>
  )
}
