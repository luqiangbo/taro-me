import { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Tag } from '@nutui/nutui-react-taro'

definePageConfig({
  navigationBarTitleText: '关于',
})

export default function PageAbout() {
  const [state, setState] = useSetState({})

  useDidShow(() => {
    init()
  })

  const init = () => {}

  return (
    <div className="p-5 ">
      <div>哈喽, 大家好, 我是本站站长</div>
      <div>欢迎大家来到我的爱好作品展示网站!</div>
      <div>
        项目技术栈:
        <Tag className="mx-1" type="warning">
          taro
        </Tag>
        <Tag className="mx-1" type="warning">
          react
        </Tag>
        <Tag className="mx-1" type="warning">
          ts
        </Tag>
        <Tag className="mx-1" type="warning">
          node
        </Tag>
      </div>
      <div>
        UI:{' '}
        <Tag className="mx-1" type="warning">
          tailwind
        </Tag>
        <Tag className="mx-1" type="warning">
          nutui-react-taro
        </Tag>
      </div>
      <div>
        后端:{' '}
        <Tag className="mx-1" type="warning">
          midwayjs
        </Tag>
        <Tag className="mx-1" type="warning">
          prisma
        </Tag>
        <Tag className="mx-1" type="warning">
          七牛云
        </Tag>
      </div>
      <div>这个网站是我记录练习一整套店铺的成果展示, 不能付款哈!🤥🤥🤥</div>
    </div>
  )
}
