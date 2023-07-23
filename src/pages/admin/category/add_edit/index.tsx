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
      {
        key: 'sort',
        label: '排序',
        placeholder: '请输入',
        type: 'input',
        required: false,
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
    if (params.type === 'edit') {
      setState({
        resValue: {
          name: params.name,
          sort: params.sort,
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
      fetchUrl = fetchCategoryUpdate
    } else {
      req = {
        shopId: snapUser.shop?.id,
        ...data,
      }
      fetchUrl = fetchCategoryAdd
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
