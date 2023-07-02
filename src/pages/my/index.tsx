import Taro, { useDidShow, useDidHide } from '@tarojs/taro'
import { useSnapshot } from 'valtio'
import { Avatar, Badge, Cell } from '@nutui/nutui-react-taro'
import { Right } from '@nutui/icons-react-taro'

import CAll from '@/components/all_comp'
import CTabber from '@/components/tabbar_comp'
import { mUser } from '@/store'
import { adminList } from './data'

definePageConfig({
  navigationBarTitleText: '我的',
})

export default function MyPage() {
  useDidShow(() => {
    console.log('useDidShow me')
    init()
  })
  useDidHide(() => {
    console.log('useDidHide me')
  })

  const init = () => {
    console.log('init-page-me')

    mUser.count++
  }

  return (
    <div className="page-c page-my">
      <CAll />
      <CTabber />
      <div className="bg-lime-300 h-v40 flex justify-between px-2 py-3 text-white items-end mb-2">
        <div>
          {/* <Badge value="8">
            
          </Badge> */}

          <Avatar color="#fff" background="#FA2C19">
            N
          </Avatar>
        </div>
        <div>
          <div>设置</div>
        </div>
      </div>
      <div className="p-2 rounded-lg">
        {adminList.map((u) => (
          <Cell
            key={u.key}
            className="nutui-cell--clickable"
            title={u.value}
            align="center"
            extra={<Right />}
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/admin/${u.key}/index`,
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}
