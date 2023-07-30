import { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'

import { detail } from './data'

definePageConfig({
  navigationBarTitleText: '隐私协议说明',
})

export default function PageAgreement() {
  const [state, setState] = useSetState({})

  useDidShow(() => {
    init()
  })

  const init = () => {}

  return (
    <div className="p-5">
      {detail.map((u) => (
        <div key={u.key} className="mb-6">
          <div className="text mb-1 text-base">
            {u.key}. {u.title}
          </div>
          <div className="text-gray-600 text-sm pl-5">{u.content}</div>
        </div>
      ))}
    </div>
  )
}
