import Taro from '@tarojs/taro'
import { useEffect, useCallback } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Form, Button, Input, Avatar } from '@nutui/nutui-react-taro'
import { Image } from '@nutui/icons-react-taro'

import { mCommon } from '@/store'
import { urlUpload } from '@/apis'

export default function FormComp(props) {
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({
    res: {},
    fileList: [],
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

  const onUpload = (type) => {
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
                    const maxSize = 200 * 1024 // 200k
                    if (fileSize > maxSize) {
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
                  {state.fileList.map((u, i) => (
                    <div key={u} className="w-20 h-20 rounded overflow-hidden bg-slate-200 mr-2">
                      <image size="100" src={u} />
                    </div>
                  ))}
                  <div
                    className="w-20 h-20 rounded overflow-hidden flex flex-col items-center justify-center bg-slate-200 mr-2"
                    onClick={() => {
                      onUpload('image')
                    }}
                  >
                    <Image />
                    <div> 上传图片</div>
                  </div>
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
