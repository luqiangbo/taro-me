import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { Swiper, SwiperItem } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import { fetchProductList } from '@/apis/index'
import { mUser } from '@/store'
import { catgoryList } from './data'
import './index.scss'

definePageConfig({
  navigationBarTitleText: '首页',
})

export default function HomePage() {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    productList: [],
    bannerList: [
      { key: '1', value: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg' },
      {
        key: '2',
        value: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
      },
      {
        key: '3',
        value: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
      },
      {
        key: '4',
        value: 'https://storage.360buyimg.com/jdc-article/fristfabu.jpg',
      },
    ],
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
      <div className="page-home-banner">
        <Swiper defaultValue={0} height={220} loop previousMargin="20px" nextMargin="20px">
          {state.bannerList.map((u) => {
            return (
              <SwiperItem key={u.key}>
                <img src={u.value} />
              </SwiperItem>
            )
          })}
        </Swiper>
      </div>
      <div>
        <div>最新消息</div>
        <div>活动来拉, 7月活动来拉</div>
      </div>
      <div className="catgory-main">
        {catgoryList.map((u) => (
          <div key={u.key} className="catgory-item">
            <IconFont name={u.url} size="40" />
            <div>{u.value}</div>
          </div>
        ))}
      </div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
    </div>
  )
}
