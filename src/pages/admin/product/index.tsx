import { useState, useEffect } from 'react'

import CAll from '@/components/all_comp'

definePageConfig({
  navigationBarTitleText: '商品管理',
})

export default function EssayPage() {
  useEffect(() => {
    init()
  }, [])

  const init = () => {}

  return (
    <div className="page-404">
      <CAll />
      <h1>商品管理页面</h1>
    </div>
  )
}
