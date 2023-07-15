//  新增 编辑
import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CForm from '@/components/form_item'
import { fetchCustomUpdate } from '@/apis'
import { mUser } from '@/store'
import { getParams } from '@/utils'

definePageConfig({
  navigationBarTitleText: '编辑资料',
})

export default function AddEditPage(props) {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    formList: [
      {
        key: 'nickName',
        label: '昵称',
        placeholder: '请输入',
        type: 'input',
        required: true,
      },
      {
        key: 'image',
        label: '头像',
        type: 'uploader',
        required: true,
        maxLength: 1,
        maxSize: 200,
      },
    ],
    resValue: {},
    params: {},
    type: '',
  })

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    const params = getParams()
    console.log({ params })
    setState({
      params,
      resValue: {
        nickName: params.nickName,
        image: params.image ? [params.image] : [],
      },
    })
  }

  const onSubmit = (data) => {
    const req = {
      id: state.params.id,
      ...data,
      image: data.image[0],
    }
    onFetchCustomUpdate(req)
  }

  const onFetchCustomUpdate = async (req) => {
    const [err, res] = await fetchCustomUpdate(req)
    if (err) {
      return
    }
    mUser.custom = res
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
