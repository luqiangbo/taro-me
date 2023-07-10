import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Tabs } from '@nutui/nutui-react-taro'

import CAll from '@/components/all_comp'
import CTabber from '@/components/tabbar_comp'
import { tabsList } from './data'

definePageConfig({
  navigationBarTitleText: '分类',
})

export default function EssayPage() {
  const [state, setState] = useSetState({
    tabsIndex: 0,
  })
  useDidShow(() => {
    init()
  })

  const init = () => {
    onFetchList()
  }

  const onFetchList = async () => {}

  return (
    <div className="page-category">
      <CAll />
      <CTabber />
      <div>
        <Tabs
          // style={{ height: 'calc(100vh - 50px)' }}
          style={{ height: '100vh' }}
          value={state.tabsIndex}
          onChange={(value) => {
            setState({
              tabsIndex: value,
            })
          }}
          direction="vertical"
        >
          {tabsList.map((u) => (
            <Tabs.TabPane key={u.key} title={u.value}>
              {u.list.map((h) => (
                <div key={h.key}>{h.value}</div>
              ))}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
