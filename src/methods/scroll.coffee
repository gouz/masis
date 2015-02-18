@Masis.addMethod 'scroll', (M, opts) ->
  opts = opts[0] if opts?
  opts.mode ?= 'vertical'
  opts.gutter ?= 10
  opts.pad ?= 10
  M.element.style.position = 'relative'
  M.element.style.overflow = 'hidden'
  M.element.innerHTML = '<div class="mscr-content">' + M.element.innerHTML + '</div>'
  horizontal = (opts.mode.indexOf('horizontal') != -1)
  vertical = (opts.mode.indexOf('vertical') != -1)
  if horizontal
    M.element.innerHTML += '<div class="mscr-track-h"><div class="mscr-drag-h"/></div>'
  if vertical
    M.element.innerHTML += '<div class="mscr-track-v"><div class="mscr-drag-v"/></div>'
  content = M.element.querySelector '.mscr-content'
  trackH = M.element.querySelector '.mscr-track-h'
  dragH = M.element.querySelector '.mscr-drag-h'
  trackV = M.element.querySelector '.mscr-track-v'
  dragV = M.element.querySelector '.mscr-drag-v'
  content.style.position = 'absolute'
  content.style.top = content.style.left = 0
  rw = parseInt(content.offsetWidth) / parseInt M.element.offsetWidth
  rh = parseInt(M.element.offsetHeight) / parseInt content.offsetHeight
  previous = null
  moving = no
  xy = {
    X : 0
    Y : 0
  }
  document.addEventListener 'mouseup', (e) ->
    e.preventDefault()
    moving = no
    M.element.classList.remove 'show-scrollbar'
    if horizontal
      dragH.classList.remove 'moving'
      xy.X = parseInt dragH.style.left
    if vertical
      dragV.classList.remove 'moving'
      xy.Y = parseInt dragV.style.top
  document.addEventListener 'mousemove', (e) ->
    if moving and previous?
      move parseInt(e['page' + moving]) - parseInt(previous['page' + moving])
  M.element.addEventListener 'mousewheel', (e) ->
    e = e.originalEvent if e.originalEvent?
    M.element.classList.add 'show-scrollbar'
    moving = if e.shiftKey || e.wheelDeltaX then 'X' else 'Y'
    move opts.pad * (if e.wheelDelta < 0 then 1 else -1)
    moving = no
    M.element.classList.remove 'show-scrollbar'
    xy.X = parseInt dragH.style.left if horizontal
    xy.Y = parseInt dragV.style.top if vertical
  M.element.addEventListener 'DOMMouseScroll', (e) ->
    e = e.originalEvent if e.originalEvent?
    M.element.classList.add 'show-scrollbar'
    moving = if e.shiftKey then 'X' else 'Y'
    move opts.pad * (if -e.detail < 0 then 1 else -1)
    moving = no
    M.element.classList.remove 'show-scrollbar'
    xy.X = parseInt dragH.style.left if horizontal
    xy.Y = parseInt dragV.style.top if vertical
  if horizontal
    trackH.style.position = 'absolute'
    trackH.style.bottom = trackH.style.left = 0
    trackH.style.height = opts.gutter + 'px'
    dragH.style.position = 'absolute'
    dragH.style.top = dragH.style.left = 0
    dragH.style.height = opts.gutter + 'px'
    dragH.addEventListener 'mousedown', (e) ->
      e.preventDefault()
      moving = 'X'
      previous = e
      M.element.classList.add 'show-scrollbar'
      @classList.add 'moving'
  if vertical
    trackV.style.position = 'absolute'
    trackV.style.top = trackV.style.right = 0
    trackV.style.width = opts.gutter + 'px'
    dragV.style.position = 'absolute'
    dragV.style.top = dragV.style.left = 0
    dragV.style.width = opts.gutter + 'px'
    dragV.addEventListener 'mousedown', (e) ->
      e.preventDefault()
      moving = 'Y'
      previous = e
      M.element.classList.add 'show-scrollbar'
      @classList.add 'moving'
  redraw = () ->
    w = parseInt M.element.offsetWidth
    h = parseInt M.element.offsetHeight
    if horizontal
      trackH.style.width = w + 'px'
      dragH.style.width = ~~(w * rw) + 'px'
    if vertical
      trackV.style.height = h + 'px'
      dragV.style.height = ~~(h * rh) + 'px'
  redraw()
  window.addEventListener 'resize', () ->
  	redraw()
  move = (pad) ->
    pad += xy[moving]
    if moving is 'X'
      left = pad
      max = parseInt(trackH.offsetWidth) - parseInt(dragH.offsetWidth)
      left = max if left > max
      left = 0 if left < 0
      dragH.style.left = left + 'px'
      content.style.marginLeft = -left / rw + 'px'
    else
      top = pad
      max = parseInt(trackV.offsetHeight) - parseInt(dragV.offsetHeight)
      top = max if top > max
      top = 0 if top < 0
      dragV.style.top = top + 'px'
      content.style.marginTop = -top / rh + 'px'
