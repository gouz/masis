class Masis {
  constructor(selector) {
    let $elements, returns;
    $elements = document.querySelectorAll(selector);
    returns = [];
    let self = this;
    $elements.forEach(($el) => {
      return returns.push(self._init($el));
    });
    if (returns.length == 0) {
      return null;
    }
    if (returns.length === 1) {
      return returns[0];
    }
    return returns;
  }
  _init($element) {
    this.$element = $element;
    return this.populate();
  };
  
  populate() {
    this.$children = [];
    let children = this.$element.children;
    Array.from(children).forEach(($el) => {
      if ($el.nodeType !== 8) this.$children.push($el);
    });
    this.$actives = this.$children;
    return this.view();
  }
  
  view(nb = 0, start = 0) {
    nb = parseInt(nb);
    this.$children.forEach(($el) => {
      $el.style.display = 'none';
    });
    this.$actives.forEach(($el, i) => {
      if (!nb || (nb && start <= i && i < nb + start)) {
        $el.style.display = '';
      }
    });
    return this;
  }
};


const _Masis = Masis;
export { _Masis as Masis };