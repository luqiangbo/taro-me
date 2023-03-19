import { useState, useEffect } from 'react'

import { postArticleList } from '@/apis/index'

definePageConfig({
  navigationBarTitleText: '列表页',
})

export default function EssayPage() {
  useEffect(() => {
    init()
  }, [])

  const init = () => {
    onFetchList()
  }

  const onFetchList = async () => {
    const [err, res] = await postArticleList()
    console.log({ err, res })
  }

  return (
    <div className="page-404">
      <h1>首页</h1>
    </div>
  )
}
