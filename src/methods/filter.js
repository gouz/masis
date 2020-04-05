_Masis.prototype.filter = function (selector = '*') {
  if ('*' == selector)
    this.$actives = this.$children;
  else {
    let match = function($el, selector) {
      return ($el.matches || $el.matchesSelector || $el.msMatchesSelector || $el.mozMatchesSelector || $el.webkitMatchesSelector || $el.oMatchesSelector).call($el, selector);
    };
    let matches = [];
    this.$actives.forEach(($el) => {
      if (match($el, selector))
        matches.push($el);
    });
    this.$actives = matches;
    return this.view();
  }
}
