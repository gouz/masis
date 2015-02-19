Masis.prototype.sort = (opts) ->
  [type, way] = opts
  type ?= 'text'
  way ?= 'ASC'
  way = way.toUpperCase()
  @filter(type) if type isnt 'text'
  actives = Array.prototype.slice.call @actives, 0
  actives.sort (a, b) ->
    t = type.slice 1, -1
    va = if type != 'text' then a.getAttribute(t) else a.innerHTML
    vb = if type != 'text' then b.getAttribute(t) else b.innerHTML
    r = if way is 'ASC' then 1 else -1
    r * va.localeCompare vb
  for i of actives
    @element.appendChild actives[i]
  @filter(type) if type isnt 'text'
  @
