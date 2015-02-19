class Masis
  constructor: (selector, options = {}) ->
    @options = options
    elements = document.querySelectorAll selector
    returns = []
    Array.prototype.forEach.call elements, (el, i) =>
      returns.push @_init el
    l = returns.length
    return null if !l
    return returns[0] if l is 1
    returns
  _init: (element) ->
    @element = element
    @populate()
    @

@Masis = Masis
