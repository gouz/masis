/*!
 * masis.js v2.0.0
 * 2015-2020 Sylvain Gougouzian
 * Licensed under MIT
 * github.com/gouz/masis
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.masis = factory());
}(this, (function () { 'use strict';

  class Masis {
    constructor(selector) {
      let $elements, returns;
      $elements = document.querySelectorAll(selector);
      returns = [];
      let self = this;
      $elements.forEach(($el) => {
        return returns.push(self._init($el));
      });
      if (returns.length == 0) {
        return null;
      }
      if (returns.length === 1) {
        return returns[0];
      }
      return returns;
    }
    _init($element) {
      this.$element = $element;
      return this.populate();
    };
    
    populate() {
      this.$children = [];
      let children = this.$element.children;
      Array.from(children).forEach(($el) => {
        if ($el.nodeType !== 8) this.$children.push($el);
      });
      this.$actives = this.$children;
      return this.view();
    }
    
    view(nb = 0, start = 0) {
      nb = parseInt(nb);
      this.$children.forEach(($el) => {
        $el.style.display = 'none';
      });
      this.$actives.forEach(($el, i) => {
        if (!nb || (nb && start <= i && i < nb + start)) {
          $el.style.display = '';
        }
      });
      return this;
    }
  }

  const _Masis = Masis;

  function MasisFilter() {
    _Masis.filter = function (selector = '*') {
      if ('*' == selector)
        this.$actives = this.$children;
      else {
        let match = function($el, selector) {
          return ($el.matches || $el.matchesSelector || $el.msMatchesSelector || $el.mozMatchesSelector || $el.webkitMatchesSelector || $el.oMatchesSelector).call($el, selector);
        };
        let matches = [];
        this.$actives.forEach(($el) => {
          if (match($el, selector))
            matches.push($el);
        });
        this.$actives = matches;
        return this.view();
      }
    };
  }

  function MasisLazy() {
    _Masis.lazy = function (
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
  }

  function MasisPosition() {
    _Masis.position = function (opts = {}) {
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
  }

  function MasisSort() {
    _Masis.sort = (type = 'text', way = 'ASC') => {
      way = way.toUpperCase();
      let children = Array.from(this.$children);
      children.sort(($a, $b) => {
        let t = type.slice(1, -1);
        let va = type !== 'text' ? $a.getAttribute(t) : a.innerHTML;
        let vb = type !== 'text' ? $b.getAttribute(t) : b.innerHTML;
        let r = way === 'ASC' ? 1 : -1;
        if (va == null)
          va = '';
        if (vb == null)
          vb = '';
        return r * va.localeCompare(vb);
      });
      let self = this;
      chidren.foreach($i => {
        self.$element.appendChild($i);
      });
      return this.populate();
    };
  }

  MasisFilter();
  MasisLazy();
  MasisPosition();
  MasisSort();

  var index = {
    Masis: _Masis
  };

  return index;

})));
