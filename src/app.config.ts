export default defineAppConfig({
  pages: ['pages/index/index', 'pages/essay/index', 'pages/me/index', 'pages/user/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
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
        pagePath: 'pages/me/index',
        text: '个人中心',
      },
    ],
  },
})
