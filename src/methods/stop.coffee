@Masis.addMethod 'stop', (M) ->
  clearInterval M.timer
  M.do 'stop'
