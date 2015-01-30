@Masis.addMethod 'filter', (M, selector) ->
  selector = if selector.length then selector[0] else '*'
  if selector is '*'
    M.actives = M.children
  else
    matches = []
    found = M.element.querySelectorAll selector
    for i in M.actives
      for j in found
        if i is j
          matches.push i
          break
    M.actives = matches
  M.exec 'view'
