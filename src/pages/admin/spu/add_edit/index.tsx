//  新增 编辑
import Taro from '@tarojs/taro'
import { getCurrentInstance } from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CForm from '@/components/form_item'
import { fetchSpuAdd } from '@/apis'
import { mUser } from '@/store'

definePageConfig({
  navigationBarTitleText: '添加/编辑 商品',
})

export default function AddEditPage(props) {
  const snapUser = useSnapshot(mUser)

  const [state, setState] = useSetState({
    formList: [
      {
        key: 'name',
        label: '名字',
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
        key: 'category',
        label: '分类',
        placeholder: '请输入',
        type: 'radio',
        required: true,
      },
      {
        key: 'imgsMain',
        label: '商品图',
        type: 'uploader',
        required: true,
        maxLength: 1,
        maxSize: 200,
      },
    ],
    resValue: {},
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
      categoryId: '63c85046-247b-4d9a-aaff-697f298934c8',
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
