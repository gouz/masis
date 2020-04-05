import { Masis } from '../core';

Masis.prototype.position = function (opts = {}) {
  if (opts.pad == null) opts.pad = 1;
  let width = parseInt(this.$element.offsetWidth);
  this.$element.style.position = 'relative';
  let hs = [];
  for (let i = 0; i < width; i++) hs[i] = 0;
  let max = function (x, w, hs) {
    let i = 0,
      j = hs[x];
    while ((i += opts.pad) < w) {
      if (j < hs[x + i]) {
        j = hs[x + i];
      }
    }
    return j;
  };
  this.$actives.forEach(($el) => {
    $el.style.position.absolute;
    const style = getComputedStyle($el);
    const rect = $el.getBoundingClientRect();
    let $iw, $ih;
    $iw =
      parseInt(rect.width) +
      parseInt(style.marginLeft) +
      parseInt(style.marginRight);
    $ih =
      parseInt(rect.height) +
      parseInt(style.marginTop) +
      parseInt(style.marginBottom);
    let x = 0,
      j = 0,
      h = Infinity,
      _h = h;
    while (j <= width) {
      let k = j - opts.pad;
      let _w = j + $iw;
      while (k++ <= _w) {
        let _k = k + $iw;
        if (_k <= w) {
          _h = $ih + max(k, $iw, hs);
          if (h > _h) {
            h = _h;
            x = k;
          }
        }
      }
      j += $iw;
    }
    el.style.left = x + 'px';
    el.style.top = h - $ih + 'px';
    j = $iw;
    while (j--) {
      hs[j + x] = h;
    }
  });
  this.$element.style.height = Math.max.apply(Math, hs) + 'px';
  return this;
};

const _Masis = Masis;
export { _Masis as Masis };
