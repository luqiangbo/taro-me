//  新增 编辑
import Taro, { useDidShow } from '@tarojs/taro'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CForm from '@/components/form_item'
import { fetchSpuAdd, fetchSpuUpdate, fetchCategoryList } from '@/apis'
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

  useDidShow(() => {
    init()
  })

  const init = () => {
    const params = getParams()
    console.log({ params })

    if (params.type === 'edit') {
      setState({
        resValue: {
          name: params.name,
          imageMain: [params.imageMain],
          categoryId: params.categoryId,
          describe: params.describe,
        },
      })
    }
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

  const onFetchAddEdit = async (data) => {
    const params = getParams()
    let req
    let fetchUrl
    if (params.type === 'edit') {
      req = {
        id: params.id,
        ...data,
      }
      fetchUrl = fetchSpuUpdate
    } else {
      req = {
        shopId: snapUser.shop?.id,
        ...data,
      }
      fetchUrl = fetchSpuAdd
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
