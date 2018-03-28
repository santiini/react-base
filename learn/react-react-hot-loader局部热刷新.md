#  webpack配置react-hot-loader热加载局部更新

webpack-dev-server: 是开发人员修改了代码，代码经过打包，重新刷新了整个页面。

react-hot-loader: 不会刷新整个页面，它只替换了修改的代码，做到了页面的局部刷新,但它需要依赖 webpack 的 HotModuleReplacement 热加载插件。

## 步骤1：

 安装 react-hot-loader 

```bash

  npm install --save-dev react-hot-loader  
```

## 步骤2：

在 webpack.config.js 的 entry 值里加上 react-hot-loader/patch，一定要写在entry 的最前面，如果有 babel-polyfill 就写在

babel-polyfill 的后面

```js

  entry: [  
        'babel-polyfill',   
        'react-hot-loader/patch', //设置这里  
        __dirname + '/app/main.js'  
  ]

```

## 步骤3：

在 webpack.config.js 中设置 devServer 的 hot 为 true

```js

  devServer: {  
        contentBase: './build',   
        port: '1188',   
        historyApiFallback: true,    
        inline: true,    
        hot: true,  //设置这里  
    },

```

## 步骤4：

在 .babelrc 里添加 plugin

```js
{  
    "presets": ['es2015', 'react'],  
    "plugins": ["react-hot-loader/babel"]   //设置这里  
}

```
## 步骤5：

在 webpack.config.js 的 plugins 里添加依赖的 HotModuleReplacement 插件

```js

  plugins: [  
        new HtmlWebpackPlugin({  
            template: __dirname + "/app/index.tmpl.html"  
        }),  
        new webpack.HotModuleReplacementPlugin() //设置这里  
  ]

```
## 步骤6：

最后这个操作就是在页面的主入口，比如我的是 main.js 添加些代码

```js

  import React from 'react';  
  import ReactDOM from 'react-dom';  
  import Greeter from './greeter';  
  import "./main.css";  
  import { AppContainer } from 'react-hot-loader'; //设置这里  
    
  const render = (App) => {  
      ReactDOM.render(  
          <AppContainer>  
              <App />  
          </AppContainer>,  
      document.getElementById('root')  
      )  
  }  
    
  render(Greeter)  
    
  // Hot Module Replacement API   
  if (module.hot) {  
      module.hot.accept('./greeter', () => {  
          render(require('./greeter').default)  
      })  
  }

```

简写成这样试了一下也能成功:

```js


import React from 'react';  
import ReactDOM from 'react-dom';  
import Greeter from './greeter';  
import "./main.css";  
  
ReactDOM.render(  
    <App />,  
    document.getElementById('root')  
)  
   
if (module.hot) {  
    module.hot.accept()  
}

```

按顺序做完上面6个步骤，恭喜你，React 的 react-hot-loader 已经配置好了。