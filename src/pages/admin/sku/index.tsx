import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { Input, Row, Col, Button, Image } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { useSnapshot } from 'valtio'
import qs from 'qs'

import CAll from '@/components/all_comp'
import { fetchSkuList } from '@/apis/index'
import { mUser } from '@/store'
import CGoAdd from '@/components/go_add_comp'
import { getParams } from '@/utils'

definePageConfig({
  navigationBarTitleText: '型号规格管理',
})

export default function AdminSkuPage() {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    mainList: [],
    total: 0,
    reqList: {
      current: 1,
      pageSize: 10,
    },
    hasMore: true,
  })

  useDidShow(() => {
    init()
  })

  const init = () => {
    onFetchSkuList()
  }

  const onFetchSkuList = async () => {
    const params = getParams()
    const req = {
      spuId: params.id,
      ...state.reqList,
    }
    const [err, res] = await fetchSkuList(req)
    if (err) return
    setState({
      mainList: res.list,
      total: res.total,
    })
  }

  return (
    <div className="page-c page-a-spu">
      <CAll />
      <div className="spu-main p-2" id="scrollDemo" style={{ height: '90vh' }}>
        <div className="all-search">
          <Input placeholder="搜索您想要的内容~" />
        </div>
        <div style={{ height: '100%' }}>
          {state.mainList.map((u) => (
            <div key={u.id} className="rounded-lg bg-white p-4 mb-2">
              <div className="flex mb-2">
                <div className="h-v13 w-v13 bg-gray-400 overflow-hidden rounded-lg ">
                  <Image src={u.imageMain[0]} mode="widthFix" />
                </div>
                <div>{u.name}</div>
              </div>
              <Row>
                <Col span="12">
                  <Button block shape="square" type="default">
                    删除
                  </Button>
                </Col>

                <Col span="12">
                  <Button block shape="square" type="default">
                    编辑
                  </Button>
                </Col>
              </Row>
            </div>
          ))}
        </div>
        <CGoAdd qs={{ id: getParams().id }} />
      </div>
    </div>
  )
}
