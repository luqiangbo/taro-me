//  新增 编辑
import Taro from '@tarojs/taro'
import { getCurrentInstance } from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CForm from '@/components/form_item'
import { fetchTagAdd } from '@/apis'
import { mUser } from '@/store'

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
        value: '',
        disabled: false,
        required: true,
      },
      {
        key: 'image',
        label: '头像',
        type: 'uploader',
        disabled: false,
        required: true,
        rules: [],
        list: [],
        maxLength: 1,
        maxSize: 200,
      },
    ],
    type: '',
  })

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    const router = getCurrentInstance().router
    const params = router?.params
    console.log({ params })
    const { formList } = state
    formList[0].value = params.nickName
    formList[1].list = [params.image]
    setState({
      formList: formList,
    })
  }

  const onSubmit = (data) => {
    const req = {
      shopId: snapUser.shop?.id,
      ...data,
    }
    onFetchTagAdd(req)
  }

  const onFetchTagAdd = async (req) => {
    const [err, res] = await fetchTagAdd(req)
    if (err) {
      return
    }
    Taro.navigateBack()
  }

  return (
    <div className="page-c page-a-spu-ae">
      <CAll />
      <div className="spu-main p-2">
        <CForm formList={state.formList} onSubmit={onSubmit} />
      </div>
    </div>
  )
}
