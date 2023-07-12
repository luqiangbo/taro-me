//  新增 编辑
import Taro from '@tarojs/taro'
import { getCurrentInstance } from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CForm from '@/components/form_item'
import { fetchCategoryAdd } from '@/apis'
import { mUser } from '@/store'

definePageConfig({
  navigationBarTitleText: '添加/编辑 分类',
})

export default function AddEditPage(props) {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    formList: [
      {
        key: 'value',
        label: '名字',
        placeholder: '请输入',
        type: 'input',
        value: '',
        disabled: false,
        required: true,
        rules: [],
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
      shopId: snapUser.shop?.id,
      ...data,
    }
    onFetchCategoryAdd(req)
  }

  const onFetchCategoryAdd = async (req) => {
    const [err, res] = await fetchCategoryAdd(req)
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
