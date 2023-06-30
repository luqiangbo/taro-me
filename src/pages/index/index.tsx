import { useEffect, useState } from 'react'
import { useSetState } from 'ahooks'
import { Swiper, SwiperItem, Input } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CTabber from '@/components/tabbar_comp'
import { fetchProductList } from '@/apis/index'
import { mUser } from '@/store'
import { catgoryList, bannerList } from './data'

definePageConfig({
  navigationBarTitleText: '首页',
})

export default function HomePage() {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    productList: [],
    bannerList: [],
    height: 200,
  })

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    console.log('init-index')
    onfetchProductList()
  }

  const onfetchProductList = async () => {
    const [err, res] = await fetchProductList()
    if (err) return
    console.log({ res })
    setState({ productList: res })
  }

  return (
    <div className="page-home">
      <CAll />
      <CTabber />
      <div className="page-home-header">
        <div className="bg"></div>
        <div className="page-home-search">
          <Input placeholder="搜索您想要的内容~" />
        </div>
        <div className="page-home-banner">
          <Swiper defaultValue={0} height={175} loop>
            {bannerList.map((u) => {
              return (
                <SwiperItem key={u.key}>
                  <img src={u.value} />
                </SwiperItem>
              )
            })}
          </Swiper>
        </div>
      </div>
      <div className="p-2">
        <div className="flex items-center bg-white p-3 rounded-lg mb-2">
          <div className="left m-1">
            <IconFont name="notice" color="#01cb88" size="16" className="mr-2" />
          </div>
          <div className="right">活动来拉, 7月活动来拉</div>
        </div>
        <div className="flex py-3 bg-white rounded-lg">
          {catgoryList.map((u) => (
            <div key={u.key} className="w-v20 text-center ">
              <IconFont name={u.url} size="40" />
              <div>{u.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
