module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-viewport": {
      viewportWidth: 375,  //视窗宽度
      viewportHeight: 667, //视窗高度
      unitPrecision: 5,    //指定px转换为视窗单位
      viewportUnit: 'vw',  //指定需要转换的视窗单位，建议vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],  //指定不需要转换的类
      minPixelValue: 1,    //小于或等于`1px`不转换为视窗单位
      mediaQuery: false,    //允许在媒体查询中转换`px`
      exclude:[/TabBar/]
    }
  }
}
//1.在js中使用正则：/正则相关规则/
//2.exclude存放的元素必须是正则表达式
// 3.按照排除的文件写对应的正则：
// 正确规则：
// 1>^abc:表示匹配的内容,必须以什么内容开头(以abc开头)
// 2>abc$:表示匹配的内容,必须以什么内容结尾(以abc结尾)