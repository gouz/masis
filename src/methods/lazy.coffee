Masis.prototype.lazy = (threshold = 0) ->
  wheight = window.innerHeight|| document.documentElement.clientHeight
  imgs = @element.querySelectorAll 'img[data-src]'
  lazyload = () =>
    imgs = @element.querySelectorAll 'img[data-src]'
    Array.prototype.forEach.call imgs, (el) ->
      rect = el.getBoundingClientRect()
      if 0 < (rect.top - threshold) < wheight
        el.setAttribute('src', el.getAttribute 'data-src')
        el.removeAttribute 'data-src'
        el.addEventListener 'load', () ->
          @style.opacity = 1
        , false
  window.addEventListener 'scroll', () =>
    lazyload()
  , false
  lazyload()
