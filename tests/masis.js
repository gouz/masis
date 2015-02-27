describe('Masis', function() {

  var masis, el,
    element = document.createElement('div');
  element.id = 'sandbox';
  document.body.appendChild(element);

  for (var i = 0; i < 10; i++) {
    var e = document.createElement('div');
    e.setAttribute('data-foo', i);
    e.classList.add('test');
    e.classList.add(i%2 ? 'even' : 'odd');
    e.innerHTML = 10-i;
    element.appendChild(e);
  }

  it("should be exists", function() {
    expect(window.Masis).toBeDefined();
  });

  el = document.getElementById('sandbox');
  it("should have a Sandbox is in the DOM", function() {
    expect(el).not.toBeNull();
    expect((el.querySelectorAll('.test')).length).toBe(10);
  });

  masis = new Masis('#sandbox');
  it("should be instanciated", function() {
    expect(masis).not.toBeNull();
    expect(masis.children.length).toBe(10);
  });

  it("should be filtered by even", function() {
    masis.filter('.even');
    expect(masis.actives.length).toBe(5);
  });

  it("should be restored", function() {
    masis.filter('*');
    expect(masis.actives.length).toBe(10);
  });

  it("should be sort by data-foo desc", function() {
    expect(masis.actives[0].getAttribute('data-foo')).toBe('0');
    masis.sort('[data-foo]', 'DESC');
    expect(masis.actives[0].getAttribute('data-foo')).toBe('9');
  });

  it("children should be 11", function() {
    expect(masis.actives.length).toBe(10);
    var e = document.createElement('div');
    element.appendChild(e);
    masis.populate();
    expect(masis.actives.length).toBe(11);
  });

  it("should have 4 children displayed", function() {
    var l = 0, i,
      view = Array.prototype.slice.call(element.children, 0);
    for (i in view)
      if (view[i].style.display === '')
        l++;
    expect(l).toBe(11);
    masis.view(4);
    l = 0;
    view = Array.prototype.slice.call(element.children, 0);
    for (i in view)
      if (view[i].style.display === '')
        l++;
    expect(l).toBe(4);
  });

});
