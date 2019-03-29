/* eslint-disable global-require */
const config = require('./.stylelintrc');

module.exports = {
  plugins: [
    require('stylelint')(config),
    require('postcss-import'),
    require('postcss-preset-env'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('postcss-short'),
    require('precss')
  ],
};

/* eslint-enable global-require */
