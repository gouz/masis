Masis.prototype.scroll = (opts = {}) ->
  opts.gutter ?= 10
  opts.pad ?= 10
  elmnt = @element
  elmnt.innerHTML = '<div class="mscr-content">' + elmnt.innerHTML + '</div>'
  elmnt.innerHTML += '<div class="mscr-track-h"><div class="mscr-drag-h"/></div>'
  elmnt.innerHTML += '<div class="mscr-track-v"><div class="mscr-drag-v"/></div>'
  content = elmnt.querySelector '.mscr-content'
  content.style.width = elmnt.offsetWidth + 'px'
  content.style.height = elmnt.offsetHeight + 'px'
  elmnt.style.height = opts.height if opts.height?
  elmnt.style.width = opts.width if opts.width?
  cw = parseInt content.offsetWidth
  ch = parseInt content.offsetHeight
  ew = parseInt elmnt.offsetWidth
  eh = parseInt elmnt.offsetHeight
  rw = ew / cw
  rh = eh / ch
  elmnt.style.position = 'relative'
  elmnt.style.overflow = 'hidden'
  content.style.position = 'absolute'
  content.style.top = content.style.left = 0
  horizontal = rw < 1
  vertical = rh < 1
  previous = null
  moving = no
  xy =
    X : 0
    Y : 0
  movingEvent = (e, xy, t) ->
    e.preventDefault()
    moving = xy
    previous = e
    elmnt.classList.add 'show-scrollbar'
    t.classList.add 'moving'
  if horizontal
    trackH = elmnt.querySelector '.mscr-track-h'
    dragH = trackH.querySelector '.mscr-drag-h'
    trackH.style.position = 'absolute'
    trackH.style.bottom = trackH.style.left = 0
    trackH.style.height = opts.gutter + 'px'
    dragH.style.position = 'absolute'
    dragH.style.top = dragH.style.left = 0
    dragH.style.height = opts.gutter + 'px'
    rw = (ew - parseInt opts.gutter) / cw
    w = ew
    if vertical
      w -= parseInt opts.gutter
    trackH.style.width = w + 'px'
    dragH.style.width = ~~(w * rw) + 'px'
    dragH.addEventListener 'mousedown', (e) ->
      movingEvent e, 'X', @
  if vertical
    trackV = elmnt.querySelector '.mscr-track-v'
    dragV = trackV.querySelector '.mscr-drag-v'
    trackV.style.position = 'absolute'
    trackV.style.top = trackV.style.right = 0
    trackV.style.width = opts.gutter + 'px'
    dragV.style.position = 'absolute'
    dragV.style.top = dragV.style.left = 0
    dragV.style.width = opts.gutter + 'px'
    dragV.addEventListener 'mousedown', (e) ->
      movingEvent e, 'Y', @
    rh = (eh - parseInt opts.gutter) / ch
    h = eh
    if horizontal
      h -= opts.gutter
    trackV.style.height = h + 'px'
    dragV.style.height = ~~(h * rh) + 'px'
  document.addEventListener 'mouseup', (e) ->
    e.preventDefault()
    moving = no
    elmnt.classList.remove 'show-scrollbar'
    if horizontal
      dragH.classList.remove 'moving'
      xy.X = parseInt dragH.style.left
    if vertical
      dragV.classList.remove 'moving'
      xy.Y = parseInt dragV.style.top
  document.addEventListener 'mousemove', (e) ->
    if moving and previous?
      move parseInt(e['page' + moving]) - parseInt(previous['page' + moving])
  wheeling = (e) ->
    e = e.originalEvent if e.originalEvent?
    elmnt.classList.add 'show-scrollbar'
    moving = if e.shiftKey || e.wheelDeltaX then 'X' else 'Y'
    if (moving is 'Y') and (parseInt(elmnt.style.height) > parseInt content.style.height)
      return true
    e.preventDefault()
    move(opts.pad * (if (e.wheelDelta || -e.detail) < 0 then 1 else -1))
    moving = no
    elmnt.classList.remove 'show-scrollbar'
    xy.X = parseInt dragH.style.left if horizontal
    xy.Y = parseInt dragV.style.top if vertical
    false
  elmnt.addEventListener 'mousewheel', wheeling, false
  elmnt.addEventListener 'DOMMouseScroll', wheeling, false
  move = (pad) ->
    pad += xy[moving]
    if moving is 'X'
      if trackH? and dragH?
        left = pad
        max = parseInt(trackH.offsetWidth) - parseInt(dragH.offsetWidth)
        left = max if left > max
        left = 0 if left < 0
        dragH.style.left = left + 'px'
        content.style.left = parseInt(-left/rw) + 'px'
    else
      if trackV? and dragV?
        top = pad
        max = parseInt(trackV.offsetHeight) - parseInt(dragV.offsetHeight)
        top = max if top > max
        top = 0 if top < 0
        dragV.style.top = top + 'px'
        content.style.top = parseInt(-top/rh) + 'px'
  @
