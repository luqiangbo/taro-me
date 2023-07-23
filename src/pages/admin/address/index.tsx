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
      <div className="flex justify-between items-center rounded-lg bg-white h-v22 px-2 py-2 mb-3">
        <div className="flex-1 flex items-center">
          <div className=" w-v10 h-v10 rounded-full bg-red-300 text-white flex justify-center items-center mr-2 ">
            {u.receiver.charAt(0)}
          </div>
          <div>
            <div>
              {u.receiver}-{u.phone}
            </div>
            <div className="text-gray-400 text-sm">
              <div>{u.summary}</div>
              <div>{u.detail}</div>
            </div>
          </div>
        </div>
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
                  receiver: u.receiver,
                  phone: u.phone,
                  summary: u.summary,
                  detail: u.detail,
                  province: u.province,
                  city: u.city,
                  area: u.area,
                  street: u.street,
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
