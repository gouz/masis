@Masis.addMethod 'view', (M, nb) ->
  nb ?= 0
  nb = 0 if !nb.length
  Array.prototype.forEach.call M.children, (el, i) ->
    el.style.display = 'none'
  Array.prototype.forEach.call M.actives, (el, i) ->
    el.style.display = '' if not nb or nb and M.current <= i < M.current + nb
