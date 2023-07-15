export default defineAppConfig({
  pages: ['pages/my/index', 'pages/index/index', 'pages/category/index', 'pages/cart/index'],
  subPackages: [
    {
      root: 'pages/admin',
      pages: [
        'custom/add_edit/index',
        'address/index',
        'address/add_edit/index',
        'tag/index',
        'tag/add_edit/index',
        'shop/index',
        'shop/add_edit/index',
        'shop/open/index',
        'category/index',
        'category/add_edit/index',
        'spu/index',
        'spu/add_edit/index',
      ],
    },
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
