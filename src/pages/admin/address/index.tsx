import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Input, Card, Price, Tag, InfiniteLoading } from '@nutui/nutui-react-taro'
import { Plus } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'
import qs from 'qs'

import CAll from '@/components/all_comp'
import CGoAdd from '@/components/go_add_comp'
import { fetchAddressList } from '@/apis/index'
import { mUser } from '@/store'

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

  return (
    <div className="page-c page-a-spu">
      <CAll />
      <div className="spu-main p-2" id="scrollDemo" style={{ height: '90vh' }}>
        <div style={{ height: '100%' }}>
          {state.mainList.map((u) => (
            <div key={u.id} className="rounded-lg bg-white mb-2">
              <div>
                {u.receiver} :{u.phone}
              </div>
              <div>
                {u.summary} {u.detail}
              </div>
            </div>
          ))}
        </div>
        <CGoAdd />
      </div>
    </div>
  )
}
