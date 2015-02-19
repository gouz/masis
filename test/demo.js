var tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	wh = ['20', '40', '60', '80', '100'],
	sb = document.querySelector('#sandbox'),
	addBlock = function () {
		var li = document.createElement('li');
		li.innerHTML = tab[Math.floor(26*Math.random())];
		li.style.width = wh[Math.floor(5*Math.random())] + 'px';
		li.style.height = wh[Math.floor(5*Math.random())] + 'px';
		if (li.innerHTML == 'A' || li.innerHTML == 'E' || li.innerHTML == 'I' || li.innerHTML == 'O' || li.innerHTML == 'U' || li.innerHTML == 'Y')
			li.classList.add('voyelle');
		else
			li.classList.add('consonne');
		li.style.backgroundColor = 'rgba(' + Math.floor(255*Math.random()) + ', ' + Math.floor(255*Math.random()) + ', ' + Math.floor(255*Math.random()) + ', 0.6)';
		li.setAttribute('data-foo', Math.random());
		sb.appendChild(li);
	},
	a = document.querySelector('#js-add');
for (var i = 0; i < 20; i++)
	addBlock();
var dylay = new Masis('#sandbox');
dylay.position();
window.addEventListener('resize', function() {
	dylay.position();
});
var scrooly = new Masis('#test_scroll');
scrooly.scroll({
	gutter: 5
});
a.addEventListener('click', function() {
	addBlock();
	dylay.populate().position();
	return false;
});
