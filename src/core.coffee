class Masis
  constructor: (selector, @options = {}) ->
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
  populate:  ->
    @children = []
    for i in @element.children
      @children.push i if i.nodeType isnt 8
    @actives = @children
    @view()
  view: (nb = 0, start = 0) ->
    nb = parseInt nb
    Array.prototype.forEach.call @children, (el) ->
      el.style.display = 'none'
    Array.prototype.forEach.call @actives, (el, i) =>
      el.style.display = '' if not nb or (nb and start <= i < nb + start)
    @
@Masis = Masis
