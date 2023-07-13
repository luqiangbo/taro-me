import Taro from '@tarojs/taro'
import { useEffect, useCallback } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Button, Input, Cascader } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { isEmpty, get } from 'lodash-es'

import { mCommon } from '@/store'
import { urlUpload, fetchAddressDivision } from '@/apis'

export default function FormComp(props) {
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({
    isOpenAddrsss: false,
    addressList: [],
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
    onFetchAddressDivision()
  }

  const onFetchAddressDivision = async () => {
    const req = {
      type: 'province',
      code: '86',
    }
    const [err, res] = await fetchAddressDivision(req)
    if (err) return
    setState({
      addressList: res.map((u) => ({ value: u.code, text: u.name })),
    })
  }

  const onSubmit = () => {
    const { formList } = props
    let ruleErr = false
    console.log('onSubmit', { resValue: state.resValue })
    for (const u of formList) {
      if (u.required) {
        if (u.type === 'input') {
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
                  success(fileInfo) {
                    console.log({ fileInfo })
                    const fileSize = fileInfo.size
                    const max = maxSize * 1024 // 200k
                    if (fileSize > max) {
                      Taro.showToast({
                        title: '文件大小超过限制',
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
                type="text"
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
        } else if (u.type === 'uploader') {
          return (
            <div key={u.key} className="comp-form-item">
              <div className="comp-form-item-label ">
                <span className="mr-1 text-red-400">{u.required ? '*' : ''} </span> {u.label}
              </div>
              <div className="flex">
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
                      onUpload({ key: u.key, type: 'image', maxSize: u.maxSize || 200 })
                    }}
                  >
                    <IconFont name="image" />
                    <div> 上传图片</div>
                  </div>
                ) : null}
              </div>
            </div>
          )
        } else if (u.type === 'address') {
          return (
            <div key={u.key} className="comp-form-item">
              <div className="comp-form-item-label">
                <span className="mr-1 text-red-400">{u.required ? '*' : ''} </span> {u.label}
              </div>
              <div
                onClick={() => {
                  setState({
                    isOpenAddrsss: true,
                  })
                }}
              >
                选择地址
              </div>
            </div>
          )
        }
      })}
      <div>
        <Cascader
          visible={state.isOpenAddrsss}
          title="地址选择"
          closeable
          lazy
          onClose={() => {
            setState({
              isOpenAddrsss: false,
            })
          }}
          onChange={(v) => {
            console.log({ v })
          }}
          onPathChange={(vv) => {
            console.log({ vv })
          }}
          options={state.addressList}
          onLoad={(vvv) => {
            console.log('地址选择', { vvv })
          }}
        />
      </div>
      <div className="pt-3">
        <Button block type="primary" onClick={onSubmit}>
          提交
        </Button>
      </div>
    </div>
  )
}
