import { proxyWithPersist } from './index'

export const mUser = proxyWithPersist(
  {
    hash: null,
    count: 0,
    token: '123',
    shopId: '381830a6-e94d-43ed-a0d7-6dea1c7bcdda',
  },
  {
    key: 'mUser',
  },
)
