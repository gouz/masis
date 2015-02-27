Masis.prototype.filter = (selector = '*') ->
  if selector is '*'
    @actives = @children
  else
    match = (el, selector) ->
      (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector)
    matches = []
    for i in @actives
      matches.push i if match i, selector
    @actives = matches
  @view()
