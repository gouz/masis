_Masis.prototype.sort = (type = 'text', way = 'ASC') => {
  way = way.toUpperCase();
  let children = Array.from(this.$children);
  children.sort(($a, $b) => {
    let t = type.slice(1, -1);
    let va = type !== 'text' ? $a.getAttribute(t) : a.innerHTML;
    let vb = type !== 'text' ? $b.getAttribute(t) : b.innerHTML;
    let r = way === 'ASC' ? 1 : -1;
    if (va == null)
      va = '';
    if (vb == null)
      vb = '';
    return r * va.localeCompare(vb);
  });
  let self = this;
  chidren.foreach($i => {
    self.$element.appendChild($i);
  });
  return this.populate();
};
