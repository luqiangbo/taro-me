import { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Button } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CGoAdd from '@/components/go_add_comp'
import CSearchList from '@/components/search_list_comp'
import { fetchAddressList } from '@/apis/index'
import { mUser } from '@/store'
import { getParams, goto } from '@/utils'

definePageConfig({
  navigationBarTitleText: '地址管理',
})

export default function AdminTagPage() {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    mainList: [],
    total: 0,
    reqList: {
      current: 1,
      pageSize: 10,
    },
  })

  useDidShow(() => {
    init()
  })

  const init = () => {
    onFetchAddressList()
  }

  const onFetchAddressList = async () => {
    const req = {
      customId: snapUser.custom.id,
      ...state.reqList,
    }
    const [err, res] = await fetchAddressList(req)
    if (err) return
    setState({
      mainList: res.list,
      total: res.total,
    })
  }

  const renderList = (u) => {
    return (
      <div className="flex justify-between items-center rounded-lg bg-white h-v14 p-4 mb-3">
        <div className="flex-1">{u.summary}</div>
        <div className="h-v8">
          <Button
            color="#c5a47a"
            fill="outline"
            className="flex items-center"
            onClick={() => {
              goto({
                url: `/pages/admin/${getParams().key}/add_edit/index`,
                data: { key: getParams().key, type: 'edit', id: u.id, name: u.name },
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
