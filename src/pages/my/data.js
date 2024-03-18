import {
  Shop,
  Home,
  Category,
  Tips,
  Success,
  Order,
  Find,
  Ask,
  Comment,
  Refresh,
  Footprint,
} from '@nutui/icons-react-taro'

export const adminList = [
  { key: 'shop', value: '店铺管理', icon: <Shop color="#666" size={14} className="mr-2" />, type: 'router' },
  { key: 'home', value: '首页管理', icon: <Home color="#666" size={14} className="mr-2" />, type: 'router' },
  { key: 'category', value: '分类管理', icon: <Category color="#666" size={14} className="mr-2" />, type: 'router' },
  { key: 'tag', value: '标签管理', icon: <Tips color="#666" size={14} className="mr-2" />, type: 'router' },
  { key: 'spu', value: '作品管理', icon: <Success color="#666" size={14} className="mr-2" />, type: 'router' },
  { key: 'order_manage', value: '合集管理', icon: <Order color="#666" size={14} className="mr-2" />, type: 'router' },
]
export const myList = [
  { key: 'order_my', value: '我的收藏', icon: <Order color="#666" size={14} className="mr-2" />, type: 'router' },
  { key: 'address', value: '我的地址', icon: <Find color="#666" size={14} className="mr-2" />, type: 'router' },
]

export const basicList = [
  { key: 'agreement', value: '隐私协议说明', icon: <Ask color="#666" size={14} className="mr-2" />, type: 'router' },
  { key: 'about', value: '关于程序', icon: <Comment color="#666" size={14} className="mr-2" />, type: 'router' },
  { key: 'clear', value: '清除缓存', icon: <Refresh color="#666" size={14} className="mr-2" />, type: 'func' },
  { key: 'logout', value: '退出登录', icon: <Footprint color="#666" size={14} className="mr-2" />, type: 'func' },
]
