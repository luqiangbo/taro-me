import Taro, { useDidShow, useDidHide } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Avatar, Picker, Cell } from '@nutui/nutui-react-taro'
import { Right } from '@nutui/icons-react-taro'
import _ from 'lodash-es'

import CAll from '@/components/all_comp'
import CTabber from '@/components/tabbar_comp'
import { mUser } from '@/store'
import { fetchShopList } from '@/apis'
import { adminList } from './data'

definePageConfig({
  navigationBarTitleText: '我的',
})

export default function MyPage() {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    shopList: [],
    isOpenShop: false,
  })

  useDidShow(() => {
    console.log('useDidShow me')
    init()
  })
  useDidHide(() => {
    console.log('useDidHide me')
  })

  const init = () => {
    console.log('init-page-me')
    onFetchShopList()
  }

  const onFetchShopList = async () => {
    const req = {
      userId: snapUser.userId,
      current: 1,
      pageSize: 10,
    }
    const [err, res] = await fetchShopList(req)
    if (err) return
    const shopList = res.list.map((u) => ({ value: u.id, text: u.name }))
    console.log({ shopList })
    setState({
      shopList,
    })
    if (_.isEmpty(mUser.shop)) {
      mUser.shop = shopList[0]
    }
  }

  return (
    <div className="page-c page-my">
      <CAll />
      <CTabber />
      <div className="bg-blue-200 h-v40 flex justify-between px-2 py-3 text-white items-end mb-2">
        <div>
          <Avatar color="#fff" background="#FA2C19">
            N
          </Avatar>
        </div>
        <div>
          <div>设置</div>
        </div>
      </div>
      <div className="p-2 rounded-lg">
        <Cell
          title="当前店铺"
          extra={_.get(mUser, 'shop.text', ' ')}
          align="center"
          onClick={() => {
            setState({
              isOpenShop: true,
            })
          }}
        />
        <Picker
          defaultValue={snapUser.shop.value}
          visible={state.isOpenShop}
          options={state.shopList}
          onConfirm={(list, values) => {
            console.log({ list, values })
            mUser.shop = list[0]
          }}
          onClose={() => {
            setState({
              isOpenShop: false,
            })
          }}
        />
        {adminList.map((u) => (
          <Cell
            key={u.key}
            title={u.value}
            align="center"
            extra={<Right />}
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/admin/${u.key}/index`,
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}
