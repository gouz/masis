@Masis.addMethod 'position', (M, opts) ->
  #  gutter = if not opts.length then 1 else ~~ opts[0]
  #  gutter = 1 if not gutter
  w = ~~ M.element.offsetWidth
  M.element.style.position = 'relative'
  M.element.style.left = M.element.style.top = 0
  hs = []
  for i in [0..w]
    hs[i] = 0
  max = (x, w, hs) ->
    i = w
    j = hs[x]
    while i--
      if j < hs[x + i]
        j = hs[x + i]
    j
  Array.prototype.forEach.call M.actives, (el, i) =>
    el.style.position = 'absolute'
    _r = getComputedStyle(el)
    $iw = parseInt el.offsetWidth + parseInt _r.marginLeft + parseInt _r.marginRight
    $ih = parseInt el.offsetHeight + parseInt _r.marginTop + parseInt _r.marginBottom
    x = 0
    j = 0
    h = Infinity
    _h = h
    while j <= w
      k = j - 1
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
  M.element.style.height = Math.max.apply Math, hs