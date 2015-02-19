(function() {
  var Masis;

  Masis = (function() {
    function Masis(selector, options) {
      var elements, l, returns;
      if (options == null) {
        options = {};
      }
      this.options = options;
      elements = document.querySelectorAll(selector);
      returns = [];
      Array.prototype.forEach.call(elements, (function(_this) {
        return function(el, i) {
          return returns.push(_this._init(el));
        };
      })(this));
      l = returns.length;
      if (!l) {
        return null;
      }
      if (l === 1) {
        return returns[0];
      }
      returns;
    }

    Masis.prototype._init = function(element) {
      this.element = element;
      this.populate();
      return this;
    };

    return Masis;

  })();

  this.Masis = Masis;

  Masis.prototype.filter = function(selector) {
    var found, i, j, matches, _i, _j, _len, _len1, _ref;
    if (selector == null) {
      selector = '*';
    }
    if (selector === '*') {
      this.actives = this.children;
    } else {
      matches = [];
      found = this.element.querySelectorAll(selector);
      _ref = this.actives;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        for (_j = 0, _len1 = found.length; _j < _len1; _j++) {
          j = found[_j];
          if (i === j) {
            matches.push(i);
            break;
          }
        }
      }
      this.actives = matches;
    }
    this.view();
    return this;
  };

  Masis.prototype.populate = function() {
    this.children = this.element.querySelectorAll('*');
    this.actives = this.children;
    return this.view();
  };

  Masis.prototype.position = function(opts) {
    var hs, i, max, w, _i;
    w = parseInt(this.element.offsetWidth);
    this.element.style.position = 'relative';
    hs = [];
    for (i = _i = 0; 0 <= w ? _i <= w : _i >= w; i = 0 <= w ? ++_i : --_i) {
      hs[i] = 0;
    }
    max = function(x, w, hs) {
      var j;
      i = w;
      j = hs[x];
      while (i--) {
        if (j < hs[x + i]) {
          j = hs[x + i];
        }
      }
      return j;
    };
    Array.prototype.forEach.call(this.actives, (function(_this) {
      return function(el, i) {
        var $ih, $iw, h, j, k, x, _h, _k, _r, _results, _s, _w;
        el.style.position = 'absolute';
        _s = getComputedStyle(el);
        _r = el.getBoundingClientRect();
        $iw = parseInt(_r.width + parseInt(_s.marginLeft + parseInt(_s.marginRight)));
        $ih = parseInt(_r.height + parseInt(_s.marginTop + parseInt(_s.marginBottom)));
        x = 0;
        j = 0;
        h = Infinity;
        _h = h;
        while (j <= w) {
          k = j - 1;
          _w = j + $iw;
          while (k++ <= _w) {
            _k = k + $iw;
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
        el.style.top = (h - $ih) + 'px';
        j = $iw;
        _results = [];
        while (j--) {
          _results.push(hs[j + x] = h);
        }
        return _results;
      };
    })(this));
    this.element.style.height = (Math.max.apply(Math, hs)) + 'px';
    return this;
  };

  Masis.prototype.scroll = function(opts) {
    var content, dragH, dragV, horizontal, move, moving, previous, redraw, rh, rw, trackH, trackV, vertical, xy;
    if (opts == null) {
      opts = {};
    }
    if (opts.mode == null) {
      opts.mode = 'vertical';
    }
    if (opts.gutter == null) {
      opts.gutter = 10;
    }
    if (opts.pad == null) {
      opts.pad = 10;
    }
    this.element.style.position = 'relative';
    this.element.style.overflow = 'hidden';
    this.element.innerHTML = '<div class="mscr-content">' + this.element.innerHTML + '</div>';
    horizontal = opts.mode.indexOf('horizontal') !== -1;
    vertical = opts.mode.indexOf('vertical') !== -1;
    if (horizontal) {
      this.element.innerHTML += '<div class="mscr-track-h"><div class="mscr-drag-h"/></div>';
    }
    if (vertical) {
      this.element.innerHTML += '<div class="mscr-track-v"><div class="mscr-drag-v"/></div>';
    }
    content = this.element.querySelector('.mscr-content');
    trackH = this.element.querySelector('.mscr-track-h');
    dragH = this.element.querySelector('.mscr-drag-h');
    trackV = this.element.querySelector('.mscr-track-v');
    dragV = this.element.querySelector('.mscr-drag-v');
    content.style.position = 'absolute';
    content.style.top = content.style.left = 0;
    rw = parseInt(content.offsetWidth) / parseInt(this.element.offsetWidth);
    rh = parseInt(this.element.offsetHeight) / parseInt(content.offsetHeight);
    previous = null;
    moving = false;
    xy = {
      X: 0,
      Y: 0
    };
    document.addEventListener('mouseup', (function(_this) {
      return function(e) {
        e.preventDefault();
        moving = false;
        _this.element.classList.remove('show-scrollbar');
        if (horizontal) {
          dragH.classList.remove('moving');
          xy.X = parseInt(dragH.style.left);
        }
        if (vertical) {
          dragV.classList.remove('moving');
          return xy.Y = parseInt(dragV.style.top);
        }
      };
    })(this));
    document.addEventListener('mousemove', (function(_this) {
      return function(e) {
        if (moving && (previous != null)) {
          return move(parseInt(e['page' + moving]) - parseInt(previous['page' + moving]));
        }
      };
    })(this));
    this.element.addEventListener('mousewheel', (function(_this) {
      return function(e) {
        if (e.originalEvent != null) {
          e = e.originalEvent;
        }
        _this.element.classList.add('show-scrollbar');
        moving = e.shiftKey || e.wheelDeltaX ? 'X' : 'Y';
        move(opts.pad * (e.wheelDelta < 0 ? 1 : -1));
        moving = false;
        _this.element.classList.remove('show-scrollbar');
        if (horizontal) {
          xy.X = parseInt(dragH.style.left);
        }
        if (vertical) {
          return xy.Y = parseInt(dragV.style.top);
        }
      };
    })(this));
    this.element.addEventListener('DOMMouseScroll', (function(_this) {
      return function(e) {
        if (e.originalEvent != null) {
          e = e.originalEvent;
        }
        _this.element.classList.add('show-scrollbar');
        moving = e.shiftKey ? 'X' : 'Y';
        move(opts.pad * (-e.detail < 0 ? 1 : -1));
        moving = false;
        _this.element.classList.remove('show-scrollbar');
        if (horizontal) {
          xy.X = parseInt(dragH.style.left);
        }
        if (vertical) {
          return xy.Y = parseInt(dragV.style.top);
        }
      };
    })(this));
    if (horizontal) {
      trackH.style.position = 'absolute';
      trackH.style.bottom = trackH.style.left = 0;
      trackH.style.height = opts.gutter + 'px';
      dragH.style.position = 'absolute';
      dragH.style.top = dragH.style.left = 0;
      dragH.style.height = opts.gutter + 'px';
      dragH.addEventListener('mousedown', (function(_this) {
        return function(e) {
          e.preventDefault();
          moving = 'X';
          previous = e;
          _this.element.classList.add('show-scrollbar');
          return _this.classList.add('moving');
        };
      })(this));
    }
    if (vertical) {
      trackV.style.position = 'absolute';
      trackV.style.top = trackV.style.right = 0;
      trackV.style.width = opts.gutter + 'px';
      dragV.style.position = 'absolute';
      dragV.style.top = dragV.style.left = 0;
      dragV.style.width = opts.gutter + 'px';
      dragV.addEventListener('mousedown', (function(_this) {
        return function(e) {
          e.preventDefault();
          moving = 'Y';
          previous = e;
          _this.element.classList.add('show-scrollbar');
          return _this.classList.add('moving');
        };
      })(this));
    }
    redraw = (function(_this) {
      return function() {
        var h, w;
        w = parseInt(_this.element.offsetWidth);
        h = parseInt(_this.element.offsetHeight);
        if (horizontal) {
          trackH.style.width = w + 'px';
          dragH.style.width = ~~(w * rw) + 'px';
        }
        if (vertical) {
          trackV.style.height = h + 'px';
          return dragV.style.height = ~~(h * rh) + 'px';
        }
      };
    })(this);
    redraw();
    window.addEventListener('resize', function() {
      return redraw();
    });
    move = function(pad) {
      var left, max, top;
      pad += xy[moving];
      if (moving === 'X') {
        left = pad;
        max = parseInt(trackH.offsetWidth) - parseInt(dragH.offsetWidth);
        if (left > max) {
          left = max;
        }
        if (left < 0) {
          left = 0;
        }
        dragH.style.left = left + 'px';
        return content.style.marginLeft = -left / rw + 'px';
      } else {
        top = pad;
        max = parseInt(trackV.offsetHeight) - parseInt(dragV.offsetHeight);
        if (top > max) {
          top = max;
        }
        if (top < 0) {
          top = 0;
        }
        dragV.style.top = top + 'px';
        return content.style.marginTop = -top / rh + 'px';
      }
    };
    return this;
  };

  Masis.prototype.sort = function(opts) {
    var actives, i, type, way;
    type = opts[0], way = opts[1];
    if (type == null) {
      type = 'text';
    }
    if (way == null) {
      way = 'ASC';
    }
    way = way.toUpperCase();
    if (type !== 'text') {
      this.filter(type);
    }
    actives = Array.prototype.slice.call(this.actives, 0);
    actives.sort(function(a, b) {
      var r, t, va, vb;
      t = type.slice(1, -1);
      va = type !== 'text' ? a.getAttribute(t) : a.innerHTML;
      vb = type !== 'text' ? b.getAttribute(t) : b.innerHTML;
      r = way === 'ASC' ? 1 : -1;
      return r * va.localeCompare(vb);
    });
    for (i in actives) {
      this.element.appendChild(actives[i]);
    }
    if (type !== 'text') {
      this.filter(type);
    }
    return this;
  };

  Masis.prototype.view = function(nb) {
    if (nb == null) {
      nb = 0;
    }
    nb = parseInt(nb);
    Array.prototype.forEach.call(this.children, function(el, i) {
      return el.style.display = 'none';
    });
    Array.prototype.forEach.call(this.actives, (function(_this) {
      return function(el, i) {
        if (!nb || (nb && (_this.current <= i && i < _this.current + nb))) {
          return el.style.display = '';
        }
      };
    })(this));
    return this;
  };

}).call(this);
