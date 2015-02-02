@Masis.addControl 'keys', (M) ->
  M.options.keyPrev ?= 37
  M.options.keyNext ?= 39
  document.addEventListener 'keydown', (event) ->
    M.do 'prev' if event.keyCode is M.options.keyPrev
    M.do 'next' if event.keyCode is M.options.keyNext
