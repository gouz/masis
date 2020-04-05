import { Masis } from '../core';

Masis.prototype.lazy = function (
  threshold = 0,
  attr = 'data-src',
  callback = null
) {
  let wHeight = window.innerHeight || document.documentElement.clientHeight;
  let self = this;
  let lazyload = () => {
    self.$element
      .querySelectorAll('img[' + attr + ']')
      .array.forEach(($img) => {
        let rect = $img.getBoundingClientRect();
        let top = rect.top;
        if ((-threshold <= (top - threshold) && top <= wheight)) {
          $img.setAttribute('src', $img.getAttribute(attr));
          $img.removeAttribute(attr);
          $img.style.opacity = 1;
          return $img.addEventListener('load', function() {
            if (callback != null) {
              return callback($img);
            }
          }, false);
        }
      });
    };
  let lazytime = null;
  window.addEventListener('scroll', function() {
    clearTimeout(lazytime);
    lazytime = setTimeout(function() {
      lazyload();
    }, 10);
  }, false);
  lazyload();
  return this;
};

const _Masis = Masis;
export { _Masis as Masis };
