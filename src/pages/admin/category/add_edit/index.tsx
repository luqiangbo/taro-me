//  新增 编辑
import Taro, { useDidShow } from '@tarojs/taro'
import { getCurrentInstance } from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CForm from '@/components/form_item'
import { fetchCategoryAdd, fetchCategoryUpdate } from '@/apis'
import { mUser } from '@/store'
import { getParams } from '../../../../utils'

definePageConfig({
  navigationBarTitleText: '添加/编辑 分类',
})

export default function AddEditPage(props) {
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
    ],
    resValue: {},
    type: '',
  })

  useDidShow(() => {
    init()
  })

  const init = () => {
    const params = getParams()
    console.log('category edit init', { params })
    if (params.type === 'edit') {
      setState({
        resValue: {
          name: params.name,
        },
      })
    }
  }

  const onSubmit = (data) => {
    if (getParams().type === 'edit') {
      const req = {
        id: getParams().id,
        ...data,
      }
      onFetchCategoryUpdate(req)
    } else {
      const req = {
        shopId: snapUser.shop?.id,
        ...data,
      }
      onFetchCategoryAdd(req)
    }
  }

  const onFetchCategoryAdd = async (req) => {
    const [err, res] = await fetchCategoryAdd(req)
    if (err) {
      return
    }
    Taro.navigateBack()
  }

  const onFetchCategoryUpdate = async (req) => {
    const [err, res] = await fetchCategoryUpdate(req)
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
