Masis.prototype.view = (nb = 0, start = 0) ->
  nb = parseInt nb
  Array.prototype.forEach.call @children, (el) ->
    el.style.display = 'none'
  Array.prototype.forEach.call @actives, (el, i) =>
    el.style.display = '' if not nb or (nb and start <= i < nb + start)
  @
