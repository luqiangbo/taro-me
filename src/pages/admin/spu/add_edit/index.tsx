//  新增 编辑
import Taro from '@tarojs/taro'
import { getCurrentInstance } from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CForm from '@/components/form_item'
import { fetchSpuAdd, fetchCategoryList } from '@/apis'
import { mUser } from '@/store'
import { getParams } from '@/utils'
import { find } from 'lodash-es'

definePageConfig({
  navigationBarTitleText: '添加/编辑 商品',
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
        key: 'describe',
        label: '简介',
        placeholder: '请输入',
        type: 'input',
        required: true,
      },
      {
        key: 'categoryId',
        label: '分类',
        placeholder: '请输入',
        type: 'radio',
        required: true,
        list: [],
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

    console.log({ params })
    onFetchCategoryList()
  }

  const onFetchCategoryList = async () => {
    const req = {
      current: 1,
      pageSize: 100,
      shopId: snapUser.shop?.id,
    }
    const [err, res] = await fetchCategoryList(req)
    if (err) return
    const { formList } = state
    const sole = find(formList, { key: 'categoryId' })
    sole.list = res.list
    setState({
      formList: formList,
    })
  }

  const onSubmit = (data) => {
    const req = {
      shopId: snapUser.shop?.id,
      ...data,
    }
    onFetchSpuAdd(req)
  }

  const onFetchSpuAdd = async (req) => {
    const [err, res] = await fetchSpuAdd(req)
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
