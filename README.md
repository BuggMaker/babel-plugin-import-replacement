# babel-plugin-import-replacement

Replace import path by customize rules.

[中文](https://github.com/BuggMaker/babel-plugin-import-replacement/blob/master/README_zh.md#babel-plugin-import-replacement)

## Installation

```sh
npm install babel-plugin-import-replacement --save-dev
```

## Example

### js file

```js
import React from 'react';
import defaultMember from 'module-name0';
import * as name from 'module-name1';
import { member } from 'module-name2';
import 'module-name3';
import utils from ' my-utils';
```

### babel.config.js

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

### Transformed Code

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

Rules for defining the replacement of import paths, which can be multiple.

#### match

- `string`
- `RegExp`

#### replacement

- `string`
- `(source:string) => string`
  - source: matching import path
  - return: replaced path

### debug

`boolean`

Defines whether to enable debug mode. When enabled, the console will print the matching import path and the replacement path. The default value is `false`. `
