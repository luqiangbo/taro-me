//  新增 编辑
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { Button, Cell, Sticky } from '@nutui/nutui-react-taro'
import { Plus } from '@nutui/icons-react-taro'

import CAll from '@/components/all_comp'

definePageConfig({
  navigationBarTitleText: '添加/编辑 商品',
})

export default function AddEditPage(props) {
  console.log({ props })
  useEffect(() => {
    init()
  }, [])

  const init = () => {}

  return (
    <div className="page-c page-a-product-ae">
      <CAll />
      <div className="product-main ">
        <h1>添加商品页</h1>
        <div>添加</div>
      </div>
    </div>
  )
}
