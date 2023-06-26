import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { Button, Icon, Rate, Pagination, Cell, Avatar } from '@nutui/nutui-react-taro'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import { fetchProductList } from '@/apis/index'
import { mUser } from '@/store'

definePageConfig({
  navigationBarTitleText: '首页',
})

export default function HomePage() {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    list: [],
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
    setState({ list: res })
  }

  return (
    <div className="page-home">
      <CAll />
      <div>123</div>
    </div>
  )
}
