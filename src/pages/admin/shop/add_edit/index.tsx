//  新增 编辑
import Taro from '@tarojs/taro'
import { getCurrentInstance } from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CForm from '@/components/form_item'
import { fetchShopAdd, fetchShopUpdate } from '@/apis'
import { mUser } from '@/store'
import { getParams } from '@/utils'

definePageConfig({
  navigationBarTitleText: '添加/编辑 店铺',
})

export default function AddEditPage(props) {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    formList: [
      {
        key: 'name',
        label: '店铺名称',
        placeholder: '请输入',
        type: 'input',
        required: true,
      },
      {
        key: 'image',
        label: '店铺logo',
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
    if (params.type === 'edit') {
      setState({
        resValue: {
          name: params.name,
          image: [params.image],
        },
      })
    }
  }

  const onFetchAddEdit = async (data) => {
    const params = getParams()
    let fetchUrl
    let req
    if (params.type === 'add') {
      req = {
        userId: snapUser.user?.id,
        ...data,
        image: data.image[0],
      }
      fetchUrl = fetchShopAdd
    } else if (params.type === 'edit') {
      req = {
        id: params.id,
        ...data,
        image: data.image[0],
      }
      fetchUrl = fetchShopUpdate
    } else {
      return
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
