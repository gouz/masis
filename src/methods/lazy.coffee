Masis.prototype.lazy = (threshold = 0, attr = 'data-src') ->
  wheight = window.innerHeight|| document.documentElement.clientHeight
  imgs = @element.querySelectorAll 'img[' + attr + ']'
  lazyload = () =>
    imgs = @element.querySelectorAll 'img[' + attr + ']'
    Array.prototype.forEach.call imgs, (el) ->
      rect = el.getBoundingClientRect()
      if 0 < (rect.top - threshold) < wheight
        el.setAttribute('src', el.getAttribute attr)
        el.removeAttribute attr
        el.addEventListener 'load', () ->
          @style.opacity = 1
        , false
  window.addEventListener 'scroll', () =>
    lazyload()
  , false
  lazyload()
