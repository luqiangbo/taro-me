import { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Button } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CSearchList from '@/components/search_list_comp'
import CGoAdd from '@/components/go_add_comp'
import { mUser } from '@/store'
import { goto, getParams } from '@/utils'

definePageConfig({
  navigationBarTitleText: '商品管理',
})

export default function AdminProductPage() {
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
            className="flex items-center m-1"
            onClick={() => {
              goto({
                url: `/pages/admin/sku/index`,
                data: { key: 'sku', type: 'edit', spuId: u.id },
              })
            }}
          >
            <IconFont name="uploader" size={12}></IconFont>
          </Button>
          <Button
            color="#c5a47a"
            fill="outline"
            className="flex items-center m-1"
            onClick={() => {
              goto({
                url: `/pages/admin/${getParams().key}/add_edit/index`,
                data: {
                  key: getParams().key,
                  type: 'edit',
                  id: u.id,
                  name: u.name,
                  imageMain: u.imageMain[0],
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
