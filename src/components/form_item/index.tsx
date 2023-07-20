import Taro from '@tarojs/taro'
import { useEffect, useCallback } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Button, Input, Cascader, Radio } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { isEmpty, get, find } from 'lodash-es'

import { mCommon } from '@/store'
import { urlUpload, fetchAddressPcas } from '@/apis'
import { compressor } from '@/utils'

export default function FormComp(props) {
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({
    isOpenAddrsss: false,
    addressList: [],
    addressText: '',
    resValue: {},
  })

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    setState({
      resValue: props.resValue,
    })
  }, [JSON.stringify(props)])

  const init = () => {
    const sole = find(props.formList, { type: 'address' })
    if (sole) {
      onFetchAddressPcas()
    }
  }

  const onFetchAddressPcas = async () => {
    const [err, res] = await fetchAddressPcas()
    if (err) return
    setState({
      addressList: res,
      resValue: {},
    })
  }

  const onGetAddress = (list) => {
    const { addressList } = state
    const sole1 = find(addressList, { code: list[0] })
    const sole2 = find(sole1.children, { code: list[1] })
    const sole3 = find(sole2.children, { code: list[2] })
    const sole4 = find(sole3.children, { code: list[3] })

    setState({
      addressText: `${sole1.name}-${sole2.name}-${sole3.name}-${sole4.name}`,
    })
  }

  const onSubmit = () => {
    const { formList } = props
    let ruleErr = false
    console.log('onSubmit', { resValue: state.resValue })
    for (const u of formList) {
      if (u.required) {
        if (['input', 'radio'].indexOf(u.type) !== -1) {
          if (isEmpty(get(state.resValue, u.key, ''))) {
            Taro.showToast({
              title: `请添加${u.label}`,
              icon: 'none',
            })
            ruleErr = true
            return
          }
        } else if (u.type === 'uploader') {
          if (get(state.resValue, u.key, []).length === 0) {
            Taro.showToast({
              title: `请添加${u.label}`,
              icon: 'none',
            })
            ruleErr = true
            return
          }
        }
      }
    }
    if (!ruleErr) {
      props.onSubmit(state.resValue)
    }
  }

  const onUpload = ({ key, type, maxSize }) => {
    if (type === 'image') {
      Taro.showActionSheet({
        itemList: ['从相册上传'],
        success: (res) => {
          if (res.tapIndex == 0) {
            // 从相册上传
            Taro.chooseImage({
              count: 1,
              sourceType: ['album'],
              sizeType: ['original'],
              success(v) {
                const filePath = v.tempFilePaths[0]

                Taro.getFileInfo({
                  filePath,
                  success: async (fileInfo) => {
                    console.log({ fileInfo })
                    const fileSize = fileInfo.size
                    const max = maxSize * 1024 // 200k
                    if (fileSize > max) {
                      Taro.showToast({
                        title: `文件大小超过限制,${fileSize / 1024} > ${maxSize}  `,
                        icon: 'none',
                      })
                      return
                    }
                    Taro.uploadFile({
                      url: urlUpload, // 仅为示例，非真实的接口地址
                      filePath,
                      name: 'file',
                      success(res) {
                        const data = JSON.parse(res.data)
                        if (data.code !== 0) {
                          Taro.showToast({
                            title: '上传失败',
                            icon: 'none',
                          })
                          return
                        }
                        Taro.showToast({
                          title: '上传成功',
                          icon: 'none',
                        })
                        const fileList = get(state, key, [])
                        fileList.push(data.data)
                        setState({
                          resValue: {
                            ...state.resValue,
                            [key]: fileList,
                          },
                        })
                        return
                      },
                      fail(err) {
                        Taro.showToast({
                          title: err.errMsg,
                          icon: 'none',
                        })
                        return
                      },
                    })
                  },
                })
              },
            })
          }
        },
      })
    }
  }

  return (
    <div className="comp-form">
      {props.formList.map((u) => {
        if (u.type === 'input') {
          return (
            <div key={u.key} className="comp-form-item">
              <div className="comp-form-item-label">
                <span className="mr-1 text-red-400">{u.required ? '*' : ''} </span> {u.label}
              </div>
              <Input
                type={u.inputType || 'text'}
                placeholder={u.placeholder}
                value={state.resValue[u.key]}
                onChange={(val) => {
                  setState({
                    resValue: {
                      ...state.resValue,
                      [u.key]: val,
                    },
                  })
                }}
              />
            </div>
          )
        }
        if (u.type === 'uploader') {
          return (
            <div key={u.key} className="comp-form-item">
              <div className="comp-form-item-label ">
                <span className="mr-1 text-red-400">{u.required ? '*' : ''} </span> {u.label}
              </div>
              <div className="flex comp-form-item-upload">
                {get(state.resValue, u.key, []).map((h, i) => (
                  <div
                    key={h}
                    className="w-20 h-20 rounded overflow-hidden bg-slate-200 border border-gray-300 mr-2 relative"
                  >
                    <IconFont size="80" name={h} />
                    <div
                      className="absolute bottom-0 right-0 p-1 bg-black bg-opacity-50 rounded"
                      onClick={() => {
                        const list = get(state, u.key, [])
                        list.splice(i, 1)
                        setState({
                          resValue: {
                            ...state.resValue,
                            [u.key]: list,
                          },
                        })
                      }}
                    >
                      <IconFont name="del" size="22" color="#fa2c19" />
                    </div>
                  </div>
                ))}
                {get(state.resValue, u.key, []).length < (u.maxLength || 1) ? (
                  <div
                    className="w-20 h-20 rounded overflow-hidden flex flex-col items-center justify-center bg-slate-200 mr-2"
                    onClick={() => {
                      onUpload({ key: u.key, type: 'image', maxSize: u.maxSize || 10 * 1024 })
                    }}
                  >
                    <IconFont name="image" />
                    <div> 上传图片</div>
                  </div>
                ) : null}
              </div>
            </div>
          )
        }
        if (u.type === 'radio') {
          return (
            <div key={u.key} className="comp-form-item">
              <div className="comp-form-item-label ">
                <span className="mr-1 text-red-400">{u.required ? '*' : ''} </span> {u.label}
              </div>

              <Radio.Group
                direction="vertical"
                value={state.resValue[u.key]}
                onChange={(value) => {
                  setState({
                    resValue: {
                      ...state.resValue,
                      [u.key]: value,
                    },
                  })
                }}
              >
                {u.list.map((u) => (
                  <div className="bg-white rounded mb-2">
                    <Radio key={u.id} value={u.id} className="p-2">
                      {u.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          )
        }

        if (u.type === 'address') {
          return (
            <div key={u.key} className="comp-form-item">
              <div className="comp-form-item-label">
                <span className="mr-1 text-red-400">{u.required ? '*' : ''} </span> {u.label}
              </div>
              <div
                className="comp-form-item-input"
                onClick={() => {
                  setState({
                    isOpenAddrsss: true,
                  })
                }}
              >
                {state.addressText || '请选择地址'}
              </div>
              <div>
                <Cascader
                  closeable
                  title="地址选择"
                  optionKey={{
                    textKey: 'name',
                    valueKey: 'code',
                    childrenKey: 'children',
                  }}
                  visible={state.isOpenAddrsss}
                  options={state.addressList}
                  onClose={() => {
                    setState({
                      isOpenAddrsss: false,
                    })
                  }}
                  onChange={(v) => {
                    if (state.isOpenAddrsss) {
                      onGetAddress(v)
                      setState({
                        resValue: {
                          ...state.resValue,
                          [u.key]: v,
                        },
                      })
                    }
                  }}
                />
              </div>
            </div>
          )
        }
      })}
      <div className="h-v100 text-yellow-50 flex justify-center items-center">111</div>
      <div className="h-v100 text-yellow-50 flex justify-center items-center">111</div>

      <div className="safe-area fixed z-10 left-0 bottom-4 px-3 w-full">
        <Button block type="primary" onClick={onSubmit}>
          提交
        </Button>
      </div>
    </div>
  )
}
