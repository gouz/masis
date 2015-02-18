(function() {
  var Masis,
    __slice = [].slice;

  Masis = (function() {
    function Masis() {
      this._methods = {};
      this._effects = {};
      this._controls = {};
      this._hooks = {};
    }

    Masis.prototype.make = function(selector, options) {
      var elements, l, returns, _base, _base1, _base2, _base3;
      if (options == null) {
        options = {};
      }
      this.options = options;
      if ((_base = this.options).view == null) {
        _base.view = 0;
      }
      if ((_base1 = this.options).speed == null) {
        _base1.speed = 0;
      }
      if ((_base2 = this.options).step == null) {
        _base2.step = 1;
      }
      if ((_base3 = this.options).controls == null) {
        _base3.controls = '';
      }
      this.options.controls = this.options.controls.split(',');
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
      return returns;
    };

    Masis.prototype._init = function(element) {
      var i, _i, _len, _ref;
      this.element = element;
      this.children = element.querySelectorAll('*');
      this.actives = this.children;
      this.on('reset', (function(_this) {
        return function() {
          _this.current = 0;
          return _this._active();
        };
      })(this));
      this.on('init', (function(_this) {
        return function() {
          return _this._active();
        };
      })(this));
      this.on('move', (function(_this) {
        return function() {
          _this.current %= _this.actives.length;
          if (_this.current < 0) {
            _this.current += _this.actives.length;
          }
          _this._active();
          _this.exec('view', _this.options.view);
          return _this.exec('position');
        };
      })(this));
      this.on('next', (function(_this) {
        return function() {
          _this.current++;
          return _this["do"]('move');
        };
      })(this));
      this.on('prev', (function(_this) {
        return function() {
          _this.current--;
          return _this["do"]('move');
        };
      })(this));
      this["do"]('reset');
      _ref = this.options.controls;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (i !== '') {
          this._controls[i](this);
        }
      }
      this.exec('view', this.options.view);
      this.exec('start');
      return this;
    };

    Masis.prototype._active = function() {
      return Array.prototype.forEach.call(this.actives, (function(_this) {
        return function(el, i) {
          if (i === _this.current) {
            return el.classList.add('active');
          } else {
            return el.classList.remove('active');
          }
        };
      })(this));
    };

    Masis.prototype.addMethod = function(name, func) {
      return this._methods[name] = func;
    };

    Masis.prototype.addControl = function(name, func) {
      return this._controls[name] = func;
    };

    Masis.prototype.exec = function() {
      var name, options;
      name = arguments[0], options = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (this._methods[name] != null) {
        this._methods[name](this, options);
      }
      return this;
    };

    Masis.prototype.on = function(hook, func) {
      if (this._hooks[hook] == null) {
        this._hooks[hook] = [];
      }
      return this._hooks[hook].push(func);
    };

    Masis.prototype["do"] = function(hook) {
      var i, _i, _len, _ref, _results;
      if (this._hooks[hook] == null) {
        return;
      }
      _ref = this._hooks[hook];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(i(this));
      }
      return _results;
    };

    return Masis;

  })();

  this.Masis = new Masis;

  this.Masis.addControl('keys', function(M) {
    var _base, _base1;
    if ((_base = M.options).keyPrev == null) {
      _base.keyPrev = 37;
    }
    if ((_base1 = M.options).keyNext == null) {
      _base1.keyNext = 39;
    }
    return document.addEventListener('keydown', function(event) {
      if (event.keyCode === M.options.keyPrev) {
        M["do"]('prev');
      }
      if (event.keyCode === M.options.keyNext) {
        return M["do"]('next');
      }
    });
  });

  this.Masis.addMethod('filter', function(M, selector) {
    var found, i, j, matches, _i, _j, _len, _len1, _ref;
    selector = selector.length ? selector[0] : '*';
    if (selector === '*') {
      M.actives = M.children;
    } else {
      matches = [];
      found = M.element.querySelectorAll(selector);
      _ref = M.actives;
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
      M.actives = matches;
    }
    return M.exec('view');
  });

  this.Masis.addMethod('next', function(M) {
    return M["do"]('next');
  });

  this.Masis.addMethod('position', function(M, opts) {
    var hs, i, max, w, _i;
    w = ~~M.element.offsetWidth;
    M.element.style.position = 'relative';
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
    Array.prototype.forEach.call(M.actives, (function(_this) {
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
    return M.element.style.height = (Math.max.apply(Math, hs)) + 'px';
  });

  this.Masis.addMethod('scroll', function(M, opts) {
    var content, dragH, dragV, horizontal, move, moving, previous, redraw, rh, rw, trackH, trackV, vertical, xy;
    if (opts != null) {
      opts = opts[0];
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
    M.element.style.position = 'relative';
    M.element.style.overflow = 'hidden';
    M.element.innerHTML = '<div class="mscr-content">' + M.element.innerHTML + '</div>';
    horizontal = opts.mode.indexOf('horizontal') !== -1;
    vertical = opts.mode.indexOf('vertical') !== -1;
    if (horizontal) {
      M.element.innerHTML += '<div class="mscr-track-h"><div class="mscr-drag-h"/></div>';
    }
    if (vertical) {
      M.element.innerHTML += '<div class="mscr-track-v"><div class="mscr-drag-v"/></div>';
    }
    content = M.element.querySelector('.mscr-content');
    trackH = M.element.querySelector('.mscr-track-h');
    dragH = M.element.querySelector('.mscr-drag-h');
    trackV = M.element.querySelector('.mscr-track-v');
    dragV = M.element.querySelector('.mscr-drag-v');
    content.style.position = 'absolute';
    content.style.top = content.style.left = 0;
    rw = parseInt(content.offsetWidth) / parseInt(M.element.offsetWidth);
    rh = parseInt(M.element.offsetHeight) / parseInt(content.offsetHeight);
    previous = null;
    moving = false;
    xy = {
      X: 0,
      Y: 0
    };
    document.addEventListener('mouseup', function(e) {
      e.preventDefault();
      moving = false;
      M.element.classList.remove('show-scrollbar');
      if (horizontal) {
        dragH.classList.remove('moving');
        xy.X = parseInt(dragH.style.left);
      }
      if (vertical) {
        dragV.classList.remove('moving');
        return xy.Y = parseInt(dragV.style.top);
      }
    });
    document.addEventListener('mousemove', function(e) {
      if (moving && (previous != null)) {
        return move(parseInt(e['page' + moving]) - parseInt(previous['page' + moving]));
      }
    });
    M.element.addEventListener('mousewheel', function(e) {
      if (e.originalEvent != null) {
        e = e.originalEvent;
      }
      M.element.classList.add('show-scrollbar');
      moving = e.shiftKey || e.wheelDeltaX ? 'X' : 'Y';
      move(opts.pad * (e.wheelDelta < 0 ? 1 : -1));
      moving = false;
      M.element.classList.remove('show-scrollbar');
      if (horizontal) {
        xy.X = parseInt(dragH.style.left);
      }
      if (vertical) {
        return xy.Y = parseInt(dragV.style.top);
      }
    });
    M.element.addEventListener('DOMMouseScroll', function(e) {
      if (e.originalEvent != null) {
        e = e.originalEvent;
      }
      M.element.classList.add('show-scrollbar');
      moving = e.shiftKey ? 'X' : 'Y';
      move(opts.pad * (-e.detail < 0 ? 1 : -1));
      moving = false;
      M.element.classList.remove('show-scrollbar');
      if (horizontal) {
        xy.X = parseInt(dragH.style.left);
      }
      if (vertical) {
        return xy.Y = parseInt(dragV.style.top);
      }
    });
    if (horizontal) {
      trackH.style.position = 'absolute';
      trackH.style.bottom = trackH.style.left = 0;
      trackH.style.height = opts.gutter + 'px';
      dragH.style.position = 'absolute';
      dragH.style.top = dragH.style.left = 0;
      dragH.style.height = opts.gutter + 'px';
      dragH.addEventListener('mousedown', function(e) {
        e.preventDefault();
        moving = 'X';
        previous = e;
        M.element.classList.add('show-scrollbar');
        return this.classList.add('moving');
      });
    }
    if (vertical) {
      trackV.style.position = 'absolute';
      trackV.style.top = trackV.style.right = 0;
      trackV.style.width = opts.gutter + 'px';
      dragV.style.position = 'absolute';
      dragV.style.top = dragV.style.left = 0;
      dragV.style.width = opts.gutter + 'px';
      dragV.addEventListener('mousedown', function(e) {
        e.preventDefault();
        moving = 'Y';
        previous = e;
        M.element.classList.add('show-scrollbar');
        return this.classList.add('moving');
      });
    }
    redraw = function() {
      var h, w;
      w = parseInt(M.element.offsetWidth);
      h = parseInt(M.element.offsetHeight);
      if (horizontal) {
        trackH.style.width = w + 'px';
        dragH.style.width = ~~(w * rw) + 'px';
      }
      if (vertical) {
        trackV.style.height = h + 'px';
        return dragV.style.height = ~~(h * rh) + 'px';
      }
    };
    redraw();
    window.addEventListener('resize', function() {
      return redraw();
    });
    return move = function(pad) {
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
  });

  this.Masis.addMethod('sort', function(M, opts) {
    var actives, i, type, way;
    type = opts[0], way = opts[1];
    if (type == null) {
      type = 'text';
    }
    if (way == null) {
      way = 'ASC';
    }
    way = way.toUpperCase();
    if (!type === 'text') {
      M.exec('filter', type);
    }
    actives = Array.prototype.slice.call(M.actives, 0);
    actives.sort(function(a, b) {
      var r, t, va, vb;
      t = type.slice(1, -1);
      va = type !== 'text' ? a.getAttribute(t) : a.innerHTML;
      vb = type !== 'text' ? b.getAttribute(t) : b.innerHTML;
      r = way === 'ASC' ? 1 : -1;
      return r * va.localeCompare(vb);
    });
    for (i in actives) {
      M.element.appendChild(actives[i]);
    }
    if (!type === 'text') {
      return M.exec('filter', type);
    }
  });

  this.Masis.addMethod('start', function(M) {
    var _base;
    if ((_base = M.options).pulse == null) {
      _base.pulse = 0;
    }
    if (M.options.pulse) {
      return M.timer = setInterval(function() {
        return M.exec('next');
      }, M.options.pulse);
    }
  });

  this.Masis.addMethod('stop', function(M) {
    clearInterval(M.timer);
    return M["do"]('stop');
  });

  this.Masis.addMethod('view', function(M, nb) {
    if (nb == null) {
      nb = 0;
    }
    if (!nb.length) {
      nb = 0;
    }
    nb = parseInt(nb);
    Array.prototype.forEach.call(M.children, function(el, i) {
      return el.style.display = 'none';
    });
    return Array.prototype.forEach.call(M.actives, function(el, i) {
      if (!nb || (nb && (M.current <= i && i < M.current + nb))) {
        return el.style.display = '';
      }
    });
  });

}).call(this);
