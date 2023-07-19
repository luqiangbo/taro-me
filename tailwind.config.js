const onVminObj = () => {
  const vminValues = {}
  for (let i = 1; i <= 100; i++) {
    vminValues[`v${i}`] = `${i}vmin`
  }
  return vminValues
}

module.exports = {
  content: ['./src/**/*.{js,tx,tsx,jsx,vue}'],
  prefixer: false,
  separator: '_',
  compile: false,
  globalUtility: false,
  darkMode: 'media',
  corePlugins: {
    preflight: false,
    divideColor: false,
    divideOpacity: false,
    divideStyle: false,
    divideWidth: false,
    space: false,
    placeholderColor: false,
    placeholderOpacity: false,
    transitionProperty: false,
    preflight: false,
  },
  exclude: [/([0-9]{1,}[.][0-9]*)$/],
  theme: {
    maxHeight: {
      full: '100%',
      screen: '100vh',
    },
    extend: {
      width: onVminObj(),
      height: onVminObj(),
      backgroundColor: {
        main: '#c5a47a',
      },
    },
  },
}
