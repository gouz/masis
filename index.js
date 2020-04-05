require([
  './src/core.js',
  './src/methods/filter.js',
  './src/methods/lazy.js',
  './src/methods/position.js',
  './src/methods/sort.js',
]);

export function Masis (selector, options) {
  return new _Masis(selector, options);
}