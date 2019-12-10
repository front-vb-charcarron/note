const path = require('path');

module.exports = {
  title: '🌎 🤣 从零开始的前端异世界~',
  description: 'a frontend note book',
  base: '/notebook/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    displayAllHeaders: false,
    nav: [
      { text: 'HTML', link: '/html/block.html' },
      { text: 'CSS', link: '/css/layout/css.html' },
      { text: 'JS', link: '/js/javascript.html' },
      { text: 'VUE', link: '/vue/experience.html' },
      { text: 'NODE', link: '/node/WhatIsNode.js.html' },
      { text: 'HTTP', link: '/http/http.html' },
      { text: 'EventLoop', link: '/eventLoop.html' }
    ],
    sidebar: [{
        title: 'Html',
        children: [
          '/html/block',
          '/html/inline',
          '/html/inlineblock',
          '/html/charactor',
          '/html/Emmet'
        ]
      },
      {
        title: 'Css',
        children: [
          '/css/layout/css',
          '/css/layout/layout'
        ]
      },
      '/vue/experience.md',
      {
        title: 'JavaScript',
        children: [
          '/js/javascript',
          '/js/variate',
          '/js/tools'
        ]
      },
      '/regExp',
      {
        title: 'Node',
        children: [
          '/node/WhatIsNode.js',
          '/node/module',
          '/node/NPM-Package',
          '/node/EventEmitter',
          '/node/nodeCase'
        ]
      },
      {
        title: 'Http',
        children: [
          '/http/http',
          '/http/options'
        ]
      },
      '/eventLoop',
      '/article',
      '/unresolved'
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': path.join(__dirname)
      }
    }
  }
};