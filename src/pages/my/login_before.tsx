import Taro, { useDidShow } from '@tarojs/taro'
import { Button } from '@nutui/nutui-react-taro'
import { IconFont } from '@nutui/icons-react-taro'

import { mUser } from '@/store'
import { fetchCustomLogin } from '@/apis'

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
        <IconFont size={150} name="https://qiniu.commok.com/pcigo/undraw_happy_music_g6wc.png" />
        <Button onClick={onLogin} color="#c5a47a" fill="outline">
          一键登录
        </Button>
      </div>
    </div>
  )
}
