// Hack-style redefinition of standard-typescript with all reported as warning

function changeErrorToWarn(sourceRules) {
  rules = {}
  for (const k in sourceRules) {
    let v = sourceRules[k]
    if (v === 'error') {
      v = 'warn'
    } else if ((v instanceof Array) && (v[0] === 'error')) {
      v = ['warn', ...v.slice(1)]
    }
    rules[k] = v
  }
  return rules
}

const config1 = require('eslint-config-standard')

const config2 = require('eslint-config-standard-with-typescript')

module.exports = {
  extends: [
    'standard-with-typescript',
    'plugin:you-dont-need-lodash-underscore/compatible'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        ...changeErrorToWarn(config2.overrides[0].rules),
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          {
            'allowNullable': true
          }
        ],
        'no-case-declarations': 'off' // no a risk in TypeScript
      },
      overrides: [
        {
          files: ['*.test.ts'],
          rules: {
            '@typescript-eslint/explicit-function-return-type': 'off'
          }
        }
      ]
    },
    {
      files: ['bench/**/*.js'],
      rules: {
        'you-dont-need-lodash-underscore/for-each': 'off',
        'you-dont-need-lodash-underscore/map': 'off'
      }
    }
  ],
  rules: {
    ...changeErrorToWarn(config1.rules),
  }
}
