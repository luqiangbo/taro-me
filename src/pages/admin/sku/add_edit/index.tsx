//  新增 编辑
import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CForm from '@/components/form_item'
import { fetchSkuAdd, fetchSkuUpdate } from '@/apis'
import { mUser } from '@/store'
import { getParams } from '@/utils'

definePageConfig({
  navigationBarTitleText: '添加/编辑 型号规格',
})

export default function AddEditPage() {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    formList: [
      {
        key: 'name',
        label: '名称',
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
        maxSize: 10 * 1024,
      },
    ],
    resValue: {},
    type: '',
  })

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    const params = getParams()
    console.log('sku addeedit', { params })
    if (params.type === 'edit') {
      setState({
        resValue: {
          name: params.name,
          price: params.price,
          inventory: params.inventory,
          imageMain: params.imageMain ? [params.imageMain] : [],
        },
      })
    }
  }

  const onFetchAddEdit = async (data) => {
    const params = getParams()
    let req
    let fetchUrl
    if (params.type === 'edit') {
      req = {
        id: params.id,
        ...data,
      }
      fetchUrl = fetchSkuUpdate
    }
    if (params.type === 'add') {
      req = {
        shopId: snapUser.shop?.id,
        spuId: params.spuId,
        ...data,
      }
      fetchUrl = fetchSkuAdd
    }
    const [err, res] = await fetchUrl(req)
    if (err) {
      return
    }
    Taro.navigateBack()
  }

  return (
    <div className="page-c page-a-spu-ae">
      <CAll />
      <div className="spu-main p-2">
        <CForm formList={state.formList} resValue={state.resValue} onSubmit={onFetchAddEdit} />
      </div>
    </div>
  )
}
