# babel-plugin-import-replacement

根据自定义规则，替换模块引入路径。

[English](https://www.npmjs.com/package/babel-plugin-import-replacement)

## 安装

```sh
npm install babel-plugin-import-replacement --save-dev
```

## 示例

### js 文件

```js
import React from 'react';
import defaultMember from 'module-name0';
import * as name from 'module-name1';
import { member } from 'module-name2';
import 'module-name3';
import utils from ' my-utils';
```

### babel 配置 babel.config.js

```js
module.exports = {
  plugins: [
    [
      require.resolve('babel-plugin-import-replacement'),
      {
        rules: [
          {
            match: 'react',
            replacement: 'rax',
          },
          {
            match: /module\-name/,
            replacement: 'another-module',
          },
          {
            match: /my-utils/,
            replacement: (source) => {
              if (typeof window !== 'undefined') {
                return `${source}/dist/web`;
              } else {
                return `${source}/dist/default`;
              }
            },
          },
        ],
      },
    ],
  ],
};
```

### 转换后的代码

```js
"use strict";
var _rax = require("rax");
var _rax2 = _interopRequireDefault(_rax);
var _anotherModule = require("another-module0");
var _anotherModule2 = _interopRequireDefault(_anotherModule);
var _anotherModule3 = require("another-module1");
var name = _interopRequireWildcard(_anotherModule3);
var _anotherModule4 = require("another-module2");
require("another-module3");
var _default = require(" my-utils/dist/default");
var _default2 = _interopRequireDefault(_default);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'
```

## API

### rules

`array`

定义引入路径的替换的规则，可以是多个。

#### match

- 字符串 `string`
- 正则表达式 `RegExp`

#### replacement

- 字符串 `string`
- 函数 `(source:string) => string`
  - 如参为匹配到的路径，返回值为替换后的路径

### debug

`boolean`

定义是否开启调试模式，开启后会在控制台打印匹配的引入路径以及替换后的路径，默认值 `false。`
