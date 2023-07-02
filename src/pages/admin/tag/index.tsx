import { useState, useEffect } from 'react'

import CAll from '@/components/all_comp'

definePageConfig({
  navigationBarTitleText: '标签管理',
})

export default function EssayPage() {
  useEffect(() => {
    init()
  }, [])

  const init = () => {}

  return (
    <div className="page-c page-a-tag">
      <CAll />
      <h1>标签管理页面</h1>
    </div>
  )
}
