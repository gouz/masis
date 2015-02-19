Masis.prototype.populate = ->
  @children = @element.querySelectorAll '*'
  @actives = @children
  @view()
