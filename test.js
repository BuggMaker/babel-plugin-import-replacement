const babel = require('babel-core');
const { env } = require('yargs');

it('import replacement', () => {
  const input = `
    import React from 'react'
    import defaultMember from "module-name0";
    import * as name from "module-name1";
    import { member } from "module-name2";
    import "module-name3";
    import utils from ' my-utils'
    `;

  const opts = {
    presets: ['es2015'],
    plugins: [
      [
        require.resolve('./index.js'),
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

  /**
   * transformed code
  ```
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
   * */

  const result = babel.transform(input, opts);
  expect(result.code.indexOf('react')).toBe(-1);
  expect(result.code.indexOf('rax')).toBeGreaterThan(-1);
  expect(result.code.indexOf('module-name')).toBe(-1);
  expect(result.code.indexOf('another-module')).toBeGreaterThan(-1);
  expect(result.code.indexOf('my-utils/dist/default')).toBeGreaterThan(-1);
});
