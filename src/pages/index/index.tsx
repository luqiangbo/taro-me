import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Swiper, SwiperItem, SearchBar, Input, Image } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'
import { find } from 'lodash-es'

import CAll from '@/components/all_comp'
import CTitle from '@/components/title_comp'
import CTabber from '@/components/tabbar_comp'
import { fetchShopOpenList } from '@/apis/index'
import { mUser, mCommon } from '@/store'
import { goto } from '@/utils'
import { bannerList } from './data'

definePageConfig({
  navigationStyle: 'custom', // custom:隐藏标题栏  default
})

export default function HomePage() {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    bannerList: [],
    height: 200,
  })

  useDidShow(() => {
    init()
  })

  const init = () => {
    console.log('init-index')
    onFetchShopOpenList()
  }

  const onFetchShopOpenList = async () => {
    const req = {
      current: 1,
      pageSize: 10,
    }
    const [err, res] = await fetchShopOpenList(req)
    if (err) return
    console.log({ res })
    mCommon.shopOpenList = res.list
    mUser.shopOpen = res.list[0]
    if (snapUser.shopOpen) {
      const sole = find(res.list, { id: snapUser.shopOpen.id })
      if (sole) {
        mUser.shopOpen = sole
      }
    }
  }

  return (
    <div className="page-c page-home">
      <CTitle>
        <div
          className="flex items-center"
          onClick={() => {
            goto({ url: `/pages/admin/shop/open/index`, data: { key: 'shop' } })
          }}
        >
          <IconFont name="shop" className="mr-1" />
          {snapUser.shopOpen?.name}
        </div>
      </CTitle>
      <CAll />
      <CTabber />
      <div className="page-home-header">
        <div className="bg"></div>
        <div className="all-search">
          <Input placeholder="搜索您想要的内容~" />
        </div>
        <div className="page-home-banner">
          <Swiper defaultValue={0} height={175} loop>
            {bannerList.map((u) => {
              return (
                <SwiperItem key={u.key}>
                  <Image src={u.value} mode="widthFix" />
                </SwiperItem>
              )
            })}
          </Swiper>
        </div>
      </div>
      <div className="p-2">
        <div className="flex items-center bg-white p-3 rounded-lg mb-2">
          <div className="w-v12 h-v12 mr-1">
            <Image mode="widthFix" src={'https://qiniu.commok.com/pcigo/202307201605751.svg'} />
          </div>
          <div className="right">活动来拉, 7月活动来拉</div>
        </div>
      </div>

      <div className="h-40">123</div>
      <div className="h-40">123</div>
      <div className="h-40">123</div>
    </div>
  )
}
