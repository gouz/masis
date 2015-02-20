Masis.prototype.populate = ->
  @children = []
  for i in @element.children
    @children.push i if i.nodeType isnt 8
  @actives = @children
  @view()
