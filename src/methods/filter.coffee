Masis.prototype.filter = (selector) ->
  selector ?= '*'
  if selector is '*'
    @actives = @children
  else
    matches = []
    found = @element.querySelectorAll selector
    for i in @actives
      for j in found
        if i is j
          matches.push i
          break
    @actives = matches
  @view()
  @
