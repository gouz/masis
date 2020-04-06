export function MasisSort(Masis, type = 'text', way = 'ASC') {
  way = way.toUpperCase();
  let children = Array.from(Masis.$children);
  children.sort(($a, $b) => {
    const t = type.slice(1, -1);
    let va = type !== 'text' ? $a.getAttribute(t) : a.innerHTML;
    let vb = type !== 'text' ? $b.getAttribute(t) : b.innerHTML;
    const r = way === 'ASC' ? 1 : -1;
    if (va == null) va = '';
    if (vb == null) vb = '';
    return r * va.localeCompare(vb);
  });
  for (let i = 0; i < children.length; i++)
    Masis.$element.appendChild(children[i]);
  return Masis.populate();
}
