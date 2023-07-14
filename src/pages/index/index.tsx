import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Swiper, SwiperItem, Input } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CTitle from '@/components/title_comp'
import CTabber from '@/components/tabbar_comp'
import { fetchSpuList } from '@/apis/index'
import { mUser } from '@/store'
import { catgoryList, bannerList } from './data'

definePageConfig({
  navigationStyle: 'custom', // custom:隐藏标题栏  default
})

export default function HomePage() {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    spuList: [],
    bannerList: [],
    height: 200,
  })

  useDidShow(() => {
    init()
  })

  const init = () => {
    console.log('init-index')
    onFetchSpuList()
  }

  const onFetchSpuList = async () => {
    const req = {}
    const [err, res] = await fetchSpuList(req)
    if (err) return
    console.log({ res })
    setState({ spuList: res })
  }

  return (
    <div className="page-c page-home">
      <CTitle>首页</CTitle>
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
      <div className="h-40">123</div>
      <div className="h-40">123</div>
      <div className="h-40">123</div>
    </div>
  )
}
