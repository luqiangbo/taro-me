import { proxyWithPersist } from './index'

export const mUser = proxyWithPersist(
  {
    hash: null,
    count: 0,
    token: '123',
    user: {
      id: '287fa203-e17b-4ff9-9aa6-24add051acec', // 默认的超级管理员
    },
    custom: {},
    shop: {},
  },
  {
    key: 'mUser',
  },
)
