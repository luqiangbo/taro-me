//  新增 编辑
import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CAll from '@/components/all_comp'
import CForm from '@/components/form_item'
import { fetchHomeAdd, fetchHomeUpdate, fetchHomeDetail } from '@/apis'
import { mUser } from '@/store'

definePageConfig({
  navigationBarTitleText: '首页编辑',
})

export default function AddEditPage(props) {
  const [state, setState] = useSetState({
    formList: [
      {
        key: 'imageBanner',
        label: 'banner图',
        type: 'uploader',
        required: true,
        maxLength: 3,
        maxSize: 10 * 1024,
      },
      {
        key: 'imageDetail',
        label: '详情图',
        type: 'uploader',
        required: true,
        maxLength: 9,
        maxSize: 10 * 1024,
      },
      {
        key: 'title',
        label: '标题',
        placeholder: '请输入',
        type: 'input',
        required: true,
      },
      {
        key: 'content',
        label: '内容',
        placeholder: '请输入',
        type: 'TextArea',
        required: true,
      },
    ],
    resValue: {},
    params: {},
    type: '',
    detail: {},
  })

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    onFetchHomeDetail()
  }

  const onFetchHomeDetail = async () => {
    const [err, res] = await fetchHomeDetail({ shopId: mUser.shop.id })
    if (err) return
    if (res.id) {
      setState({
        detail: res,
        resValue: {
          title: res.title,
          content: res.content,
          imageBanner: res.imageBanner,
          imageDetail: res.imageDetail,
        },
      })
    }
  }

  const onSubmit = (data) => {
    onFetchHomeUpdate(data)
  }

  const onFetchHomeUpdate = async (data) => {
    let req = { ...data }
    let fetchUrl
    if (state.detail.id) {
      req.id = state.detail.id
      fetchUrl = fetchHomeUpdate
    } else {
      req.shopId = mUser.shop.id
      fetchUrl = fetchHomeAdd
    }
    const [err, res] = await fetchUrl(req)
    if (err) {
      return
    }
    Taro.navigateBack()
  }

  return (
    <div className="page-c page-a-home">
      <CAll />
      <div className="spu-main p-2">
        <CForm formList={state.formList} resValue={state.resValue} onSubmit={onSubmit} />
      </div>
    </div>
  )
}
