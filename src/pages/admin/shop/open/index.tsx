//  新增 编辑
import Taro from '@tarojs/taro'
import { Radio } from '@nutui/nutui-react-taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { find } from 'lodash-es'

import CAll from '@/components/all_comp'
import { mUser, mCommon } from '@/store'

definePageConfig({
  navigationBarTitleText: '切换小区',
})

export default function ShopOpenPage(props) {
  const snapUser = useSnapshot(mUser)
  const snapCommon = useSnapshot(mCommon)

  const [state, setState] = useSetState({})

  useEffect(() => {
    init()
  }, [])

  const init = () => {}

  return (
    <div className="page-c page-a-shop-open">
      <CAll />
      <div className="shop-main p-2">
        <Radio.Group
          direction="vertical"
          value={snapUser.shopOpen?.id}
          onChange={(value) => {
            const sole = find(mCommon.shopOpenList, { id: value })
            mUser.shopOpen = sole
            Taro.navigateBack()
          }}
        >
          {snapCommon.shopOpenList.map((u) => (
            <div className="bg-white rounded mb-2">
              <Radio key={u.id} value={u.id} className="p-4">
                {u.name}
              </Radio>
            </div>
          ))}
        </Radio.Group>
      </div>
    </div>
  )
}
