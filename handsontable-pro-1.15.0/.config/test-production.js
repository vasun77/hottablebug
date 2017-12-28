'use strict';

/**
 * Config responsible for building End-to-End test files (bundled into `test/dist/`). These tests testing `*.full.min.js` files:
 *  - e2e.entry.js
 *  - helpers.entry.js
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const configFactory = require('./test-e2e');
const JasmineHtml = require('./plugin/jasmine-html');

module.exports.create = function create(envArgs) {
  const config = configFactory.create(envArgs);

  config.forEach(function(c) {
    // Remove all 'HtmlWebpackPlugin' instances
    c.plugins = c.plugins.filter(function(plugin) {
      return !(plugin instanceof HtmlWebpackPlugin);
    });

    c.plugins.push(
      new JasmineHtml({
        filename: path.resolve(__dirname, '../test/E2ERunner.html'),
        baseJasminePath: '../',
        externalCssFiles: [
          'lib/normalize.css',
          '../dist/handsontable.full.min.css',
        ],
        externalJsFiles: [
          '../test/lib/phantom-reporter.js',
          'lib/jquery.min.js',
          'lib/jquery.simulate.js',
          'lib/lodash.underscore.js',
          'lib/backbone.js',
          '../dist/handsontable.full.min.js',
          '../dist/numbro/languages.js',
          '../languages/all.js',
        ],
      })
    );
  });

  return [].concat(config);
}
