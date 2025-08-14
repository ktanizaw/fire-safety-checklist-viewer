export default {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-rational-order',
  ],
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'order/order': [
      'dollar-variables',
      'custom-properties',
      'declarations',
      'at-rules',
      'rules',
    ],
    'at-rule-no-unknown': null,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'declaration-property-value-disallowed-list': { 'z-index': ['/.*/'] },
  },
};
