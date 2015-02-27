Masis.prototype.sort = (type = 'text', way = 'ASC') ->
  way = way.toUpperCase()
  children = Array.prototype.slice.call @children, 0
  children.sort (a, b) ->
    t = type.slice 1, -1
    va = if type != 'text' then a.getAttribute(t) else a.innerHTML
    vb = if type != 'text' then b.getAttribute(t) else b.innerHTML
    r = if way is 'ASC' then 1 else -1
    va ?= ''
    vb ?= ''
    r * va.localeCompare vb
  for i in children
    @element.appendChild i
  @populate()
