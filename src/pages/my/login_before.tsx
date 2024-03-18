import Taro, { useDidShow } from '@tarojs/taro'
import { Button, Image } from '@nutui/nutui-react-taro'

import { mUser } from '@/store'
import { fetchCustomLogin } from '@/apis'
import { goto } from '@/utils'

export default function CLoginBefore() {
  useDidShow(() => {
    init()
  })

  const init = () => {}

  const onLogin = () => {
    // 登录
    Taro.login({
      success: function (res) {
        if (res.code) {
          onFetchCustomLogin(res.code)
        } else {
        }
      },
    })
  }

  const onFetchCustomLogin = async (code) => {
    const [err, res] = await fetchCustomLogin({ code })
    if (err) return
    mUser.custom = res.custom
    mUser.user = res.user
  }

  return (
    <div className="c-login-before">
      <div className="flex flex-col justify-center items-center" style={{ height: '80vh' }}>
        <Image width="40%" height="150" src="https://qiniu.cooog.com/pcigo/undraw_happy_music_g6wc.png" />
        <div className="mb-3">
          <Button onClick={onLogin} color="#c5a47a" fill="outline">
            一键登录
          </Button>
        </div>
        <div
          className="p-4 text-gray-400"
          onClick={() => {
            goto({
              url: '/pages/admin/agreement/index',
            })
          }}
        >
          隐私协议说明
        </div>
      </div>
    </div>
  )
}
