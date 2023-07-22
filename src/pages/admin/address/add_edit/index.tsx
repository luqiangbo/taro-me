//  新增 编辑
import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CForm from '@/components/form_item'
import { fetchAddressAdd, fetchAddressUpdate } from '@/apis'
import { mUser } from '@/store'
import { getParams } from '@/utils'

definePageConfig({
  navigationBarTitleText: '添加/编辑 地址',
})

export default function AddEditPage() {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    formList: [
      {
        key: 'receiver',
        label: '收件人名称',
        placeholder: '请输入',
        type: 'input',
        required: true,
      },
      {
        key: 'phone',
        label: '手机号',
        placeholder: '请输入',
        type: 'input',
        required: true,
      },
      {
        key: 'pcas',
        label: '地址',
        placeholder: '请输入',
        type: 'address',
        required: true,
      },
      {
        key: 'detail',
        label: '详细地址',
        placeholder: '请输入',
        type: 'input',
        required: true,
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
    if (params.type === 'edit') {
      setState({
        resValue: {
          name: params.name,
        },
      })
    }
  }

  const onFetchAddEdit = async (data) => {
    const params = getParams()
    let req = {
      province: data.pcas[0],
      city: data.pcas[1],
      area: data.pcas[2],
      street: data.pcas[3],
      receiver: data.receiver,
      phone: data.phone,
      detail: data.detail,
    }
    let fetchUrl
    if (params.type === 'edit') {
      req.id = params.id
      fetchUrl = fetchAddressUpdate
    }
    if (params.type === 'add') {
      req.customId = snapUser.custom?.id
      fetchUrl = fetchAddressAdd
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
