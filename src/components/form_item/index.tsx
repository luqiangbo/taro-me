import Taro from '@tarojs/taro'
import { useEffect, useCallback } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Form, Button, Input, Cascader } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'
import { isEmpty, get } from 'lodash-es'

import { mCommon } from '@/store'
import { urlUpload, fetchAddressDivision } from '@/apis'

export default function FormComp(props) {
  const snapCommon = useSnapshot(mCommon)
  const fileList = ['https://qiniu.commok.com/mm-test/image/png/1c6a0301-91b4-48f7-b6d5-7f62215aec7e.png']
  const [state, setState] = useSetState({
    isOpenAddrsss: false,
    addressList: [],
  })

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    onFetchAddressDivision()
    console.log({ props })
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
    for (const u of formList) {
      // console.log({ u })
      if (u.required) {
        if (u.type === 'input') {
          if (isEmpty(get(state, u.key, ''))) {
            Taro.showToast({
              title: `请添加${u.label}`,
              icon: 'none',
            })
            ruleErr = true
            return
          }
        } else if (u.type === 'uploader') {
          if (get(state, u.key, []).length === 0) {
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
      props.onSubmit(state)
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
                          [key]: fileList,
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
    <div className="all-comp-form">
      <Form labelPosition="right">
        {props.formList.map((u) => {
          if (u.type === 'input') {
            return (
              <Form.Item key={u.key} required={u.required} label={u.label} name={u.key}>
                <Input
                  type="text"
                  placeholder={u.placeholder}
                  value={state[u.key]}
                  onChange={(val) => {
                    setState({
                      [u.key]: val,
                    })
                  }}
                />
              </Form.Item>
            )
          } else if (u.type === 'uploader') {
            return (
              <Form.Item key={u.key} required={u.required} label={u.label} name={u.key}>
                <div className="flex">
                  {get(state, u.key, []).map((h, i) => (
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
                            [u.key]: list,
                          })
                        }}
                      >
                        <IconFont name="del" size="22" color="#fa2c19" />
                      </div>
                    </div>
                  ))}
                  {get(state, u.key, []).length < (u.maxLength || 1) ? (
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
              </Form.Item>
            )
          } else if (u.type === 'address') {
            return (
              <Form.Item key={u.key} required={u.required} label={u.label} name={u.key}>
                <div
                  onClick={() => {
                    setState({
                      isOpenAddrsss: true,
                    })
                  }}
                >
                  选择地址
                </div>
              </Form.Item>
            )
          }
        })}
      </Form>
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
            console.log({ vvv })
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
