import { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Button, Image, Tag } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CSearchList from '@/components/search_list_comp'
import CGoAdd from '@/components/go_add_comp'
import { mUser, mCommon } from '@/store'
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
      <div className="flex justify-between items-center rounded-lg bg-white h-v14 px-2 py-4 mb-3">
        <div className="flex-1 flex">
          <div className="w-v12 h-v12 mr-1">
            <Image mode="widthFix" src={u.imageMain[0]} />
          </div>
          <div>
            <div>{u.name}</div>
            <div>
              {u.sku.map((h) => (
                <Tag type="warning" className="mr-1">
                  {h.name}
                </Tag>
              ))}
            </div>
          </div>
        </div>
        <div className="h-v8">
          <Button
            color={mCommon.colorMain}
            fill="outline"
            className="flex items-center m-1"
            onClick={() => {
              goto({
                url: `/pages/admin/sku/index`,
                data: { key: 'sku', type: 'edit', spuId: u.id },
              })
            }}
          >
            <IconFont fontClassName="iconfont" classPrefix="icon" name="add" size="16" />
          </Button>
          <Button
            color={mCommon.colorMain}
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
            <IconFont fontClassName="iconfont" classPrefix="icon" name="post" size="16" />
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
