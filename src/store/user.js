import { proxyWithPersist } from './index'

export const mUser = proxyWithPersist(
  {
    hash: null,
    count: 0,
    token: '123',
    user: {},
    custom: {},
    shop: {},
    cart: [],
    order: [],
  },
  {
    key: 'mUser',
  },
)
