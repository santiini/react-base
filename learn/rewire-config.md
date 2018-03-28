# 通过 rewire 修改 create-react-app 的 config 配置

## rewire 的使用和准备;

### 安装依赖库

需要安装 rewire, proxyquire:

```bash

  npm install --save rewire proxyquire --save

```

### 添加配置目录和文件： /script/customized-config.js

通过新建 customized-config.js 文件，在文件中使用 rewire 引入 react-scripts 的配置，并作出自定义修改;

可以根据需求分别建立 config-overrides.dev.js" 、 "config-overrides.prod.js" 文件.

```js

  const rewire = require('rewire');
  const proxyquire = require('proxyquire');

  // 根据命令行的参数 process.argv[2] 来执行不同文件;
  switch (process.argv[2]) {
    // yarn start: 开发环境
    case 'start':
      rewireModule('react-scripts/scripts/start.js', loadCustomizer('./config-overrides.dev'));
      break;
    // yarn build: 生产环境
    case 'build':
      rewireModule('react-scripts/scripts/build.js', loadCustomizer('./config-overrides.prod'));
      break;
    default:
      console.log('customized-config only supports "start", "build", and "test" options.');
      process.exit(-1);
  }

```

### 修改 package.json 的 scrits: 改变指令的启动脚本

在 package.json 中:

```json

  "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test --env=jsdom",
      "eject": "react-scripts eject"
    }


```

修改 start, build 脚本，改为通过自定义的脚本文件(customized-build.js)启动，传入参数 start or build:

```json

  "scripts": {
      "start": "node scripts/customized-build start",
      "build": "node scripts/customized-build build",
      "test": "react-scripts test --env=jsdom",
      "eject": "react-scripts eject"
    }

```

## 添加 stylus 支持

### 安装依赖库

需要安装 rewire, proxyquire:

```bash

  npm install --save stylus stylus-loader --save--dev

```

### 修改 config-overrides.dev.js 文件

### 修改 config-overrides.prod.js 文件

## 为 styl 文件和语法添加 autoprefixer 支持

### 安装依赖库

```bash

  npm install proxyquire autoprefixer --save--dev

```

### 修改 config-overrides.dev.js 文件

### 修改 config-overrides.prod.js 文件