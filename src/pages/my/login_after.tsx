import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Avatar, Picker, Cell, Tag } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { isEmpty, get, find } from 'lodash-es'
import qs from 'qs'

import { mUser } from '@/store'
import { fetchShopList } from '@/apis'
import { adminList, basicList } from './data'

export default function CLoginAfter() {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    shopList: [],
    isOpenShop: false,
  })
  useEffect(() => {
    init()
  }, [])

  const init = () => {
    console.log('after init')
    onFetchShopList()
  }

  const onFetchShopList = async () => {
    const req = {
      userId: snapUser.user?.id,
      current: 1,
      pageSize: 10,
    }
    const [err, res] = await fetchShopList(req)
    if (err) return
    const shopList = res.list.map((u) => ({ ...u, value: u.id, text: u.name }))
    setState({
      shopList,
    })
    if (isEmpty(snapUser.shop)) {
      mUser.shop = shopList[0]
    }
  }

  const onRenderLit = (list) => (
    <div className="px-1 rounded-lg bg-white mb-4">
      {list.map((u) => (
        <div
          key={u.key}
          className="flex justify-between items-center items-centet py-2"
          style={{ borderBottom: '1px solid #eee' }}
          onClick={() => {
            if (u.type === 'router') {
              Taro.navigateTo({
                url: `/pages/admin/${u.key}/index`,
              })
            } else if (u.type === 'func') {
              if (u.key === 'logout') {
                mUser.custom = {}
                mUser.user = {}
              }
            }
          }}
        >
          <div className="flex items-center">
            <IconFont name={u.icon} color="#666" size={12} className="mr-1" />
            <div className="text-sm">{u.value}</div>
          </div>
          <IconFont name="right" color="#ccc" size={12} />
        </div>
      ))}
    </div>
  )

  return (
    <div className="c-login-after">
      <div className="flex justify-center">
        <IconFont size={150} name="https://qiniu.commok.com/pcigo/undraw_happy_music_g6wc.png" />
      </div>

      <div className="p-2">
        <div className="flex justify-between items-center px-2 py-3 bg-white text-gray-400 mb-2 rounded-lg">
          <div className="flex items-center">
            <div className="navtion-image">
              {mUser.custom.image ? (
                <IconFont size={45} name={mUser.custom.image} />
              ) : (
                mUser.custom.nickName.substring(0, 1)
              )}
            </div>
            <div className="text-sm mx-2">{mUser.custom.nickName.substring(0, 11)}</div>
            <Tag background="#c5a47a">{snapUser.user?.openId ? '管理员' : 'Vip'}</Tag>
          </div>
          <IconFont
            size={20}
            name="setting"
            color="#ccc"
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/admin/custom/add_edit/index?${qs.stringify({
                  type: 'edit',
                  id: mUser.custom?.id,
                  nickName: mUser.custom?.nickName,
                  image: mUser.custom?.image,
                })}`,
              })
            }}
          />
        </div>

        {snapUser.user?.openId ? (
          <div className="bg-white">
            <Cell
              title="编辑当前店铺"
              extra={snapUser.shop?.name}
              align="center"
              onClick={() => {
                console.log({ snapUser })
                setState({
                  isOpenShop: true,
                })
              }}
            />
            <Picker
              defaultValue={[snapUser.shop?.id]}
              visible={state.isOpenShop}
              options={state.shopList}
              onConfirm={(list, values) => {
                const id = list[0].value
                const sole = find(state.shopList, { id })
                mUser.shop = sole
              }}
              onClose={() => {
                setState({
                  isOpenShop: false,
                })
              }}
            />
            {onRenderLit(adminList)}
          </div>
        ) : null}
        {onRenderLit(basicList)}
      </div>
    </div>
  )
}
