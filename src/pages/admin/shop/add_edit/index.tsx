//  新增 编辑
import Taro from '@tarojs/taro'
import { getCurrentInstance } from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CForm from '@/components/form_item'
import { fetchShopAdd } from '@/apis'
import { mUser } from '@/store'

definePageConfig({
  navigationBarTitleText: '添加/编辑 分类',
})

export default function AddEditPage(props) {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    formList: [
      {
        key: 'name',
        label: '店铺名字',
        placeholder: '请输入',
        type: 'input',
        value: '',
        disabled: false,
        required: true,
        rules: [],
      },
      {
        key: 'avatarUrl',
        label: '店铺logo',
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
    const { type } = router?.params
    if (type) {
      setState({
        type,
      })
    }
  }

  const onSubmit = (data) => {
    const req = {
      userId: snapUser.userId,
      ...data,
      avatarUrl: data.avatarUrl[0],
    }
    onFetchShopAdd(req)
  }

  const onFetchShopAdd = async (req) => {
    const [err, res] = await fetchShopAdd(req)
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
