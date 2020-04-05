import { version } from './package.json';
import { uglify } from 'rollup-plugin-uglify';
import bundleSize from 'rollup-plugin-bundle-size';

const banner = `/*!
 * masis.js v${version}
 * 2015-2020 Sylvain Gougouzian
 * Licensed under MIT
 * github.com/gouz/masis
 */`;

module.exports = {
  input: 'src/index.js',
  output: [{
    file: 'dist/masis.js',
    format: 'umd',
    name: 'masis',
    banner: banner,
    sourcemap: false
  }].filter(Boolean),
  plugins: [
    bundleSize()
  ].filter(Boolean)
};