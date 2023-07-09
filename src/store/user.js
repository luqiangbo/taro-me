import { proxyWithPersist } from './index'

export const mUser = proxyWithPersist(
  {
    hash: null,
    count: 0,
    token: '123',
    userId: '40e181cd-4196-44f4-a563-e47c2a6913d4',
    shop: {},
  },
  {
    key: 'mUser',
  },
)
