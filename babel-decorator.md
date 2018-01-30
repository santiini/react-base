# 在 create-react-app 中使用 decorator

可以选择两种方式：修改 node_modules 的方式 和 不修改的方式;

## 方式一: 修改 node_modules

需要两个步骤:

1. 安装 babel-plugin-transform-decorators-legacy

```bash

  npm install babel-plugin-transform-decorators-legacy --save-dev

```

2. 修改 node_modules/babel-preset-react-app

在node_modules/babel-preset-react-app/index.js plugins中，修改:

```js

const plugins = [
  // Necessary to include regardless of the environment because
  // in practice some other transforms (such as object-rest-spread)
  // don't work without it: https://github.com/babel/babel/issues/7215
  require.resolve('babel-plugin-transform-es2015-destructuring'),
 // 修饰器： decorator
  require.resolve('babel-plugin-transform-decorators-legacy'),
  // class { handleClick = () => { } }
  require.resolve('babel-plugin-transform-class-properties'),
  // The following two plugins use Object.assign directly, instead of Babel's
  // extends helper. Note that this assumes `Object.assign` is available.
  // { ...todo, completed: true }
  [
    require.resolve('babel-plugin-transform-object-rest-spread'),
    {
      useBuiltIns: true,
    },
  ],
  // Transforms JSX
  [
    require.resolve('babel-plugin-transform-react-jsx'),
    {
      useBuiltIns: true,
    },
  ],
  // Polyfills the runtime needed for async/await and generators
  [
    require.resolve('babel-plugin-transform-runtime'),
    {
      helpers: false,
      polyfill: false,
      regenerator: true,
    },
  ],
];

```

## 方式二：不修改, 通过 yarn eject

这个方法需要 npm run eject 项目

1. npm run eject 项目，暴露出各个配置项

2. 安装依赖项 babel-plugin-transform-decorators-legacy

```bash
  
  npm install babel-plugin-transform-decorators-legacy --save-dev

```

3. 修改 package.json 文件的 babel 配置或者新建 .babelrc 配置;

在 package.json 文件中:

```json

  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": ["transform-decorators-legacy"]
  },

```