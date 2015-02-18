/*
var tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	wh = ['20', '40', '60', '80', '100'],
	sb = document.querySelector('#sandbox');
for (var i = 0; i < 50; i++) {
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
}
var mount = Masis.make('#sandbox').exec('position');
window.addEventListener('resize', function() {
	mount.exec('position');
});
*/
Masis.make('#test_scroll').exec('scroll', {
	gutter: 5
});
