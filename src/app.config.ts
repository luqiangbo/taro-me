export default defineAppConfig({
  pages: ['pages/index/index', 'pages/essay/index', 'pages/me/index'],
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
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/images/new.png',
        selectedIconPath: './assets/images/new_focus.png',
      },
      {
        pagePath: 'pages/me/index',
        text: '个人中心',
        iconPath: './assets/images/me.png',
        selectedIconPath: './assets/images/me_focus.png',
      },
    ],
  },
})
