import { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Button, Image, Price } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CSearchList from '@/components/search_list_comp'
import CGoAdd from '@/components/go_add_comp'
import { mUser, mCommon } from '@/store'
import { getParams, goto } from '@/utils'

definePageConfig({
  navigationBarTitleText: '规格管理',
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
      <div className="flex justify-between items-center rounded-lg bg-white h-v20 p-4 mb-3">
        <div className="flex-1 flex">
          <div className="w-v12 h-v12 mr-1">
            <Image mode="widthFix" src={u.imageMain[0]} />
          </div>
          <div className="flex flex-col justify-between">
            <div>{u.name}</div>
            <div className="flex text-gray-400 text-sm">
              <div className="mr-2 flex">
                <div className="">价格:</div>
                <Price price={u.price} size="normal" thousands />
              </div>
              <div className="">数量:{u.inventory}</div>
            </div>
          </div>
        </div>
        <div className="h-v8">
          <Button
            color={mCommon.colorMain}
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
