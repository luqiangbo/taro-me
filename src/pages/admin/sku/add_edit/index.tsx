//  新增 编辑
import Taro from '@tarojs/taro'
import { getCurrentInstance } from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CForm from '@/components/form_item'
import { fetchSkuAdd, fetchCategoryList } from '@/apis'
import { mUser } from '@/store'
import { getParams } from '@/utils'
import { find } from 'lodash-es'

definePageConfig({
  navigationBarTitleText: '添加/编辑 型号规格',
})

export default function AddEditPage(props) {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    formList: [
      {
        key: 'name',
        label: '名字',
        placeholder: '请输入',
        type: 'input',
        required: true,
      },
      {
        key: 'price',
        label: '价格',
        placeholder: '请输入',
        type: 'input',
        inputType: 'digit',
        required: true,
      },
      {
        key: 'inventory',
        label: '库存',
        placeholder: '请输入',
        type: 'input',
        inputType: 'number',
        required: true,
      },
      {
        key: 'imageMain',
        label: '商品图',
        type: 'uploader',
        required: true,
        maxLength: 1,
        maxSize: 200,
      },
    ],
    resValue: {},
    type: '',
  })

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    console.log({ getParams: getParams() })
  }

  const onSubmit = (data) => {
    const params = getParams()
    const req = {
      shopId: snapUser.shop?.id,
      spuId: params.id,
      ...data,
      price: data.price * 1,
      inventory: data.inventory * 1,
    }
    onFetchSkuAdd(req)
  }

  const onFetchSkuAdd = async (req) => {
    const [err, res] = await fetchSkuAdd(req)
    if (err) {
      return
    }
    Taro.navigateBack()
  }

  return (
    <div className="page-c page-a-spu-ae">
      <CAll />
      <div className="spu-main p-2">
        <CForm formList={state.formList} resValue={state.resValue} onSubmit={onSubmit} />
      </div>
    </div>
  )
}
