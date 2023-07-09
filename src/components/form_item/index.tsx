import Taro from '@tarojs/taro'
import { useEffect, useCallback } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Form, Button, Input, Avatar } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'

import { mCommon } from '@/store'
import { urlUpload } from '@/apis'

export default function FormComp(props) {
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({
    res: {},
    fileList: [
      'https://qiniu.commok.com/mm-test/image/png/1c6a0301-91b4-48f7-b6d5-7f62215aec7e.png',
      'https://qiniu.commok.com/test202305222246011.png',
    ],
    value: '',
  })

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    console.log({ props })
  }

  const onSubmit = (data) => {
    console.log({ data })
  }

  const onUpload = ({ type, maxSize }) => {
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
                        const fileList = state.fileList

                        fileList.push(data.data)
                        console.log({ fileList })

                        setState({
                          fileList,
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
              <Form.Item key={u.key} required={u.required} label={u.label}>
                <Input
                  placeholder={u.placeholder}
                  type="text"
                  onChange={(val) => {
                    setState({
                      res: {
                        [u.key]: val,
                      },
                    })
                  }}
                />
              </Form.Item>
            )
          } else if (u.type === 'uploader') {
            return (
              <Form.Item key={u.key} required={u.required} label={u.label}>
                <div className="flex">
                  {state.fileList.map((h, i) => (
                    <div key={h} className="w-20 h-20 rounded overflow-hidden bg-slate-200 mr-2 relative">
                      <Avatar size="80" src={h} />
                      <div
                        className="absolute bottom-0 right-0 p-1 bg-black bg-opacity-50 rounded"
                        onClick={() => {
                          const { fileList } = state
                          fileList.splice(i)
                          setState({
                            fileList,
                          })
                        }}
                      >
                        <IconFont name="del" size="22" color="#fa2c19" />
                      </div>
                    </div>
                  ))}
                  {state.fileList.length < (u.maxLength || 1) ? (
                    <div
                      className="w-20 h-20 rounded overflow-hidden flex flex-col items-center justify-center bg-slate-200 mr-2"
                      onClick={() => {
                        onUpload({ type: 'image', maxSize: u.maxSize || 200 })
                      }}
                    >
                      <IconFont name="image" />
                      <div> 上传图片</div>
                    </div>
                  ) : null}
                </div>
              </Form.Item>
            )
          }
        })}
      </Form>
      <Button block type="primary" onClick={() => {}}>
        提交
      </Button>
    </div>
  )
}
