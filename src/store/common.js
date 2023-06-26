import { proxy } from 'valtio'

export const mCommon = proxy({
  toastMsg: '',
  toastOpen: true,
  toastType: 'text',
  toast(text) {
    if (text === 'loading') {
      mCommon.toastMsg = 'loading....'
    } else {
      mCommon.toastMsg = text
    }
    mCommon.toastOpen = true
  },
  tabbarActiveIndex: 0,
})
