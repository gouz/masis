import { Masis } from './src/core';

require([
  './src/methods/filter.js',
  './src/methods/lazy.js',
  './src/methods/position.js',
  './src/methods/sort.js',
]);

const _Masis = Masis;
exports.Masis = _Masis;
