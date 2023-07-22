import { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Button } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CSearchList from '@/components/search_list_comp'
import CGoAdd from '@/components/go_add_comp'
import { mUser } from '@/store'
import { getParams, goto } from '@/utils'

definePageConfig({
  navigationBarTitleText: '型号规格管理',
})

export default function AdminSkuPage() {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({})

  useDidShow(() => {
    init()
  })

  const init = () => {}

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
                  spuId: getParams().spuId,
                  name: u.name,
                  price: u.price,
                  inventory: u.inventory,
                  imageMain: u.imageMain[0],
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