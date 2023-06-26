import { useState, useEffect } from 'react'

definePageConfig({
  navigationBarTitleText: '列表页',
})

export default function EssayPage() {
  useEffect(() => {
    init()
  }, [])

  const init = () => {}

  return (
    <div className="page-404">
      <h1>用户页面</h1>
    </div>
  )
}
