import { useState, useEffect } from 'react'

import CAll from '@/components/all_comp'

definePageConfig({
  navigationBarTitleText: '购物车',
})

export default function EssayPage() {
  useEffect(() => {
    init()
  }, [])

  const init = () => {}

  return (
    <div className="page-404">
      <CAll />
      <h1>用户页面</h1>
    </div>
  )
}
