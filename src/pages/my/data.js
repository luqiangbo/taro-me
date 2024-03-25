import { IconFont } from '@nutui/icons-react-taro'

export const adminList = [
  {
    key: 'shop',
    value: '店铺管理',
    icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="shop" size="16" />,
    type: 'router',
  },
  {
    key: 'home',
    value: '首页管理',
    icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="mall_light" size="16" />,
    type: 'router',
  },
  {
    key: 'category',
    value: '分类管理',
    icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="sort" size="16" />,
    type: 'router',
  },
  {
    key: 'tag',
    value: '标签管理',
    icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="tag" size="16" />,
    type: 'router',
  },
  {
    key: 'spu',
    value: '作品管理',
    icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="skin" size="16" />,
    type: 'router',
  },
  {
    key: 'order_manage',
    value: '合集管理',
    icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="file" size="16" />,
    type: 'router',
  },
]
export const myList = [
  {
    key: 'order_my',
    value: '我的收藏',
    icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="cart_light" size="16" />,
    type: 'router',
  },
  {
    key: 'address',
    value: '我的地址',
    icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="location" size="16" />,
    type: 'router',
  },
]

export const basicList = [
  {
    key: 'agreement',
    value: '隐私协议说明',
    icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="question" size="16" />,
    type: 'router',
  },
  {
    key: 'about',
    value: '关于程序',
    icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="activity" size="16" />,
    type: 'router',
  },
  {
    key: 'clear',
    value: '清除缓存',
    icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="delete_light" size="16" />,
    type: 'func',
  },
  {
    key: 'logout',
    value: '退出登录',
    icon: <IconFont fontClassName="iconfont" classPrefix="icon" name="footprint" size="16" />,
    type: 'func',
  },
]
