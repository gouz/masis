(function() {
  var Masis;

  Masis = (function() {
    function Masis(selector, options) {
      var elements, l, returns;
      this.options = options != null ? options : {};
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
      return this.populate();
    };

    Masis.prototype.populate = function() {
      var i, _i, _len, _ref;
      this.children = [];
      _ref = this.element.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (i.nodeType !== 8) {
          this.children.push(i);
        }
      }
      this.actives = this.children;
      return this.view();
    };

    Masis.prototype.view = function(nb, start) {
      if (nb == null) {
        nb = 0;
      }
      if (start == null) {
        start = 0;
      }
      nb = parseInt(nb);
      Array.prototype.forEach.call(this.children, function(el) {
        return el.style.display = 'none';
      });
      Array.prototype.forEach.call(this.actives, (function(_this) {
        return function(el, i) {
          if (!nb || (nb && (start <= i && i < nb + start))) {
            return el.style.display = '';
          }
        };
      })(this));
      return this;
    };

    return Masis;

  })();

  this.Masis = Masis;

  Masis.prototype.scroll = function(opts) {
    var ch, content, cw, dragH, dragV, eh, elmnt, ew, h, horizontal, move, moving, movingEvent, previous, rh, rw, trackH, trackV, vertical, w, wheeling, xy;
    if (opts == null) {
      opts = {};
    }
    if (opts.gutter == null) {
      opts.gutter = 10;
    }
    if (opts.pad == null) {
      opts.pad = 10;
    }
    elmnt = this.element;
    elmnt.innerHTML = '<div class="mscr-content">' + elmnt.innerHTML + '</div>';
    elmnt.innerHTML += '<div class="mscr-track-h"><div class="mscr-drag-h"/></div>';
    elmnt.innerHTML += '<div class="mscr-track-v"><div class="mscr-drag-v"/></div>';
    content = elmnt.querySelector('.mscr-content');
    content.style.width = elmnt.offsetWidth + 'px';
    content.style.height = elmnt.offsetHeight + 'px';
    if (opts.height != null) {
      elmnt.style.height = opts.height;
    }
    if (opts.width != null) {
      elmnt.style.width = opts.width;
    }
    cw = parseInt(content.offsetWidth);
    ch = parseInt(content.offsetHeight);
    ew = parseInt(elmnt.offsetWidth);
    eh = parseInt(elmnt.offsetHeight);
    rw = ew / cw;
    rh = eh / ch;
    elmnt.style.position = 'relative';
    elmnt.style.overflow = 'hidden';
    content.style.position = 'absolute';
    content.style.top = content.style.left = 0;
    horizontal = rw < 1;
    vertical = rh < 1;
    previous = null;
    moving = false;
    xy = {
      X: 0,
      Y: 0
    };
    movingEvent = function(e, xy, t) {
      e.preventDefault();
      moving = xy;
      previous = e;
      elmnt.classList.add('show-scrollbar');
      return t.classList.add('moving');
    };
    if (horizontal) {
      trackH = elmnt.querySelector('.mscr-track-h');
      dragH = trackH.querySelector('.mscr-drag-h');
      trackH.style.position = 'absolute';
      trackH.style.bottom = trackH.style.left = 0;
      trackH.style.height = opts.gutter + 'px';
      dragH.style.position = 'absolute';
      dragH.style.top = dragH.style.left = 0;
      dragH.style.height = opts.gutter + 'px';
      rw = (ew - parseInt(opts.gutter)) / cw;
      w = ew;
      if (vertical) {
        w -= parseInt(opts.gutter);
      }
      trackH.style.width = w + 'px';
      dragH.style.width = ~~(w * rw) + 'px';
      dragH.addEventListener('mousedown', function(e) {
        return movingEvent(e, 'X', this);
      });
    }
    if (vertical) {
      trackV = elmnt.querySelector('.mscr-track-v');
      dragV = trackV.querySelector('.mscr-drag-v');
      trackV.style.position = 'absolute';
      trackV.style.top = trackV.style.right = 0;
      trackV.style.width = opts.gutter + 'px';
      dragV.style.position = 'absolute';
      dragV.style.top = dragV.style.left = 0;
      dragV.style.width = opts.gutter + 'px';
      dragV.addEventListener('mousedown', function(e) {
        return movingEvent(e, 'Y', this);
      });
      rh = (eh - parseInt(opts.gutter)) / ch;
      h = eh;
      if (horizontal) {
        h -= opts.gutter;
      }
      trackV.style.height = h + 'px';
      dragV.style.height = ~~(h * rh) + 'px';
    }
    document.addEventListener('mouseup', function(e) {
      e.preventDefault();
      moving = false;
      elmnt.classList.remove('show-scrollbar');
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
    wheeling = function(e) {
      e.preventDefault();
      if (e.originalEvent != null) {
        e = e.originalEvent;
      }
      elmnt.classList.add('show-scrollbar');
      moving = e.shiftKey || e.wheelDeltaX ? 'X' : 'Y';
      move(opts.pad * ((e.wheelDelta || -e.detail) < 0 ? 1 : -1));
      moving = false;
      elmnt.classList.remove('show-scrollbar');
      if (horizontal) {
        xy.X = parseInt(dragH.style.left);
      }
      if (vertical) {
        xy.Y = parseInt(dragV.style.top);
      }
      return false;
    };
    elmnt.addEventListener('mousewheel', wheeling, false);
    elmnt.addEventListener('DOMMouseScroll', wheeling, false);
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
        return content.style.left = parseInt(-left / rw) + 'px';
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
        return content.style.top = parseInt(-top / rh) + 'px';
      }
    };
    return this;
  };

}).call(this);
