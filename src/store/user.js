import { proxyWithPersist } from './index'

export const mUser = proxyWithPersist(
  {
    hash: null,
    count: 0,
    text: 'hello',
  },
  {
    key: 'mUser',
  },
)
