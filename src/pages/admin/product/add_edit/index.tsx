//  新增 编辑
import { getCurrentInstance } from '@tarojs/taro'
import { useEffect } from 'react'
import { Form, Button, Input, Uploader } from '@nutui/nutui-react-taro'

import CAll from '@/components/all_comp'

definePageConfig({
  navigationBarTitleText: '添加/编辑 商品',
})

export default function AddEditPage(props) {
  useEffect(() => {
    init()
  }, [])

  const init = () => {
    const router = getCurrentInstance().router
    console.log({ router })
  }

  return (
    <div className="page-c page-a-product-ae">
      <CAll />
      <div className="product-main p-2">
        <Form labelPosition="right">
          <Form.Item required label="产品名">
            <Input
              className="nut-input-text"
              placeholder="请输入"
              type="text"
              onChange={(val) => {
                console.log({ val })
              }}
            />
          </Form.Item>
          <Form.Item required label="详情">
            <Input
              className="nut-input-text"
              placeholder="请输入"
              type="text"
              onChange={(val) => {
                console.log({ val })
              }}
            />
          </Form.Item>
          <Form.Item required label="商品图">
            <Uploader />
          </Form.Item>
        </Form>
        <Button
          nativeType="submit"
          block
          type="primary"
          onClick={() => {
            console.log({})
          }}
        >
          提交
        </Button>
      </div>
    </div>
  )
}
