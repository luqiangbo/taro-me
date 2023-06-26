export default defineAppConfig({
  pages: ['pages/index/index', 'pages/category/index', 'pages/my/index', 'pages/cart/index'],
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
