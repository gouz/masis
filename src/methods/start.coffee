@Masis.addMethod 'start', (M) ->
  M.options.pulse ?= 0
  if M.options.pulse
    M.timer = setInterval () ->
      M.exec 'next'
    , M.options.pulse
