Masis.prototype.lazy = (threshold = 0, attr = 'data-src', callback = null) ->
  wheight = window.innerHeight|| document.documentElement.clientHeight
  imgs = @element.querySelectorAll 'img[' + attr + ']'
  lazyload = =>
    imgs = @element.querySelectorAll 'img[' + attr + ']'
    Array.prototype.forEach.call imgs, (el) ->
      rect = el.getBoundingClientRect()
      if -threshold <= (rect.top - threshold) <= wheight
        el.setAttribute('src', el.getAttribute attr)
        el.removeAttribute attr
        el.style.opacity = 1
        el.addEventListener 'load', ->
          callback(el) if callback?
        , false
  lazytime = null
  window.addEventListener 'scroll', ->
    clearTimeout lazytime
    lazytime = setTimeout ->
      lazyload()
    , 10
  , false
  lazyload()
