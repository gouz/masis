class Masis
  constructor: ->
    @_methods = {}
  make: (selector, options = {}) ->
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
    @children = element.querySelectorAll '*'
    @actives = @children
    @
  addMethod: (name, func) ->
    @_methods[name] = func
  exec: (name, options...) ->
    @_methods[name](@, options) if @_methods[name]?
    @

@Masis = new Masis
