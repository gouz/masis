class Masis
  constructor: ->
    @_methods = {}
    @_effects = {}
    @_controls = {}
    @_hooks = {}
  make: (selector, options = {}) ->
    @options = options
    @options.view ?= 0
    @options.speed ?= 0
    @options.step ?= 1
    @options.controls ?= ''
    @options.controls = @options.controls.split(',')
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
    @on 'reset', () =>
      @current = 0
      @_active()
    @on 'init', () =>
      @_active()
    @on 'move', () =>
      @current %= @actives.length
      @current += @actives.length if @current < 0
      @_active()
      @exec 'view', @options.view
      @exec 'position'
    @on 'next', () =>
      @current++
      @do 'move'
    @on 'prev', () =>
      @current--
      @do 'move'
    @do 'reset'
    for i in @options.controls
      @_controls[i](@) if i != ''
    @exec 'view', @options.view
    @exec 'start'
    @
  _active: () ->
    Array.prototype.forEach.call @actives, (el, i) =>
      if i is @current
        el.classList.add 'active'
      else
        el.classList.remove 'active'
  addMethod: (name, func) ->
    @_methods[name] = func
  addControl: (name, func) ->
    @_controls[name] = func
  exec: (name, options...) ->
    @_methods[name](@, options) if @_methods[name]?
    @
  on: (hook, func) ->
    @_hooks[hook] = [] if !@_hooks[hook]?
    @_hooks[hook].push func
  do: (hook) ->
    return if !@_hooks[hook]?
    for i in @_hooks[hook]
      i(@)

@Masis = new Masis
