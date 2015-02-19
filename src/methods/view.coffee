Masis.prototype.view = (nb = 0) ->
  nb = parseInt nb
  Array.prototype.forEach.call @children, (el, i) ->
    el.style.display = 'none'
  Array.prototype.forEach.call @actives, (el, i) =>
    el.style.display = '' if not nb or (nb and @current <= i < @current + nb)
  @
