import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Swiper, SwiperItem, SearchBar, Popup, Image } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'
import { find } from 'lodash-es'

import CAll from '@/components/all_comp'
import CTitle from '@/components/title_comp'
import CTabber from '@/components/tabbar_comp'
import { fetchShopOpenList, fetchHomeDetail } from '@/apis/index'
import { mUser, mCommon } from '@/store'
import { goto } from '@/utils'

definePageConfig({
  navigationStyle: 'custom', // custom:隐藏标题栏  default
})

export default function HomePage() {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    bannerList: [],
    detail: {},
    isOpenContent: false,
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
    mCommon.shopOpenList = res.list
    let one = res.list[0]
    if (mUser.shopOpen) {
      const sole = find(res.list, { id: mUser.shopOpen.id })
      if (sole) {
        one = sole
      }
    }
    mUser.shopOpen = one
    onFetchHomeDetail(one.id)
  }

  const onFetchHomeDetail = async (shopId) => {
    const [err, res] = await fetchHomeDetail({ shopId })
    if (err) return
    setState({
      detail: res,
    })
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
      {state.detail?.id ? (
        <div>
          <div className="page-home-header px-2 py-2">
            <div className="bg"></div>
            <div className="page-home-banner">
              <Swiper defaultValue={0} loop>
                {state.detail?.imageBanner.map((u) => {
                  return (
                    <SwiperItem key={u}>
                      <Image src={u} mode="widthFix" />
                    </SwiperItem>
                  )
                })}
              </Swiper>
            </div>
          </div>

          <div className="">
            <div
              className="flex items-center bg-white p-3 rounded-lg overflow-hidden "
              onClick={() => {
                setState({
                  isOpenContent: true,
                })
              }}
            >
              <div className="w-v12 h-v12 mr-1">
                <Image mode="widthFix" src={'https://qiniu.commok.com/pcigo/202307201605751.svg'} />
              </div>
              <div className="right">{state.detail.title}</div>
            </div>
          </div>

          <div className=""></div>
          {state.detail.imageDetail.map((u) => (
            <div key={u}>
              <Image src={u} mode="widthFix" />
            </div>
          ))}
          <Popup
            visible={state.isOpenContent}
            className="h-v100"
            position="bottom"
            round
            onClose={() => {
              setState({
                isOpenContent: false,
              })
            }}
          >
            <div className="py-4 px-2 overflow-y-auto">
              <div className="text-2xl text-center mb-4">{state.detail.title}</div>
              <div className="pb-20">{state.detail.content}</div>
            </div>
          </Popup>
        </div>
      ) : null}
    </div>
  )
}
