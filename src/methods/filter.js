export function MasisFilter(Masis, selector = '*') {
  if ('*' == selector) Masis.$actives = Masis.$children;
  else {
    let match = function ($el, selector) {
      return (
        $el.matches ||
        $el.matchesSelector ||
        $el.msMatchesSelector ||
        $el.mozMatchesSelector ||
        $el.webkitMatchesSelector ||
        $el.oMatchesSelector
      ).call($el, selector);
    };
    let matches = [];
    Masis.$actives.forEach(($el) => {
      if (match($el, selector)) matches.push($el);
    });
    Masis.$actives = matches;
    return Masis.view();
  }
}
