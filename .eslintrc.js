module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    "no-unused-vars": "off",
    "camelcase": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/jsx-key": "off",
    "max-len": "off",
    "require-jsdoc": "off",
    "new-cap": "off"
  },
};
