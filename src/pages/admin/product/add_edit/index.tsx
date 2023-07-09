//  新增 编辑
import { getCurrentInstance } from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'

import CAll from '@/components/all_comp'
import CForm from '@/components/form_item'

definePageConfig({
  navigationBarTitleText: '添加/编辑 商品',
})

export default function AddEditPage(props) {
  const [state, setState] = useSetState({
    formList: [
      {
        key: 'name',
        label: '名字',
        placeholder: '请输入',
        type: 'input',
        value: '',
        disabled: false,
        required: true,
        rules: [],
      },
      {
        key: 'describe',
        label: '介绍',
        placeholder: '请输入',
        type: 'input',
        value: '',
        disabled: false,
        required: true,
        rules: [],
      },
      {
        key: 'imgsMain',
        label: '商品图',
        type: 'uploader',
        disabled: false,
        required: true,
        rules: [],
        list: [],
        maxLength: 1,
        maxSize: 200,
      },
    ],
  })

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
        <CForm
          formList={state.formList}
          onSubmit={(data) => {
            console.log({ data })
          }}
        />
      </div>
    </div>
  )
}
