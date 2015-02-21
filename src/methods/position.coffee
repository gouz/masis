Masis.prototype.position = (opts = {}) ->
  opts.gutter ?= 1
  w = parseInt @element.offsetWidth
  @element.style.position = 'relative'
  hs = []
  for i in [0..w]
    hs[i] = 0
  max = (x, w, hs) ->
    i = 0
    j = hs[x]
    while (i += opts.gutter) < w
      if j < hs[x + i]
        j = hs[x + i]
    j
  Array.prototype.forEach.call @actives, (el, i) =>
    el.style.position = 'absolute'
    _s = getComputedStyle(el)
    _r = el.getBoundingClientRect()
    $iw = parseInt(_r.width) + parseInt(_s.marginLeft) + parseInt _s.marginRight
    $ih = parseInt(_r.height) + parseInt(_s.marginTop) + parseInt _s.marginBottom
    x = 0
    j = 0
    h = Infinity
    _h = h
    while j <= w
      k = j - opts.gutter
      _w = j + $iw
      while k++ <= _w
        _k = k + $iw
        if _k <= w
          _h = $ih + max k, $iw, hs
          if h > _h
            h = _h
            x = k
      j += $iw
    el.style.left = x + 'px'
    el.style.top = (h - $ih) + 'px'
    j = $iw
    while j--
      hs[j + x] = h
  @element.style.height = (Math.max.apply Math, hs) + 'px'
  @
