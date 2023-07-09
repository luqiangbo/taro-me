export default defineAppConfig({
  pages: [
    'pages/my/index',
    'pages/admin/address/index',
    'pages/admin/address/add_edit/index',
    'pages/admin/tag/index',
    'pages/admin/tag/add_edit/index',
    'pages/admin/shop/index',
    'pages/admin/shop/add_edit/index',
    'pages/admin/category/index',
    'pages/admin/category/add_edit/index',
    'pages/admin/spu/index',
    'pages/admin/spu/add_edit/index',
    'pages/index/index',
    'pages/category/index',
    'pages/cart/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    custom: true,
    color: '#626567',
    selectedColor: '#2A8CE5',
    backgroundColor: '#FBFBFB',
    borderStyle: 'white',
    // h5 报错
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/category/index',
        text: '分类',
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
      },
    ],
  },
})
