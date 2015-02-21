var tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ           abcdefghijklmnopqrstuvwxyz',
	wh = ['20', '30', '40', '50', '60'],
	sbp = document.querySelector('#sandbox-position'),
	sbs = document.querySelector('#sandbox-scroll'),
	sbl = document.querySelector('#sandbox-lazy'),
	addBlocks = function (n, e) {
		for (var i = 0; i < n; i++) {
			var l = document.createElement('div');
			l.innerHTML = tab[Math.floor((tab.length-1)*Math.random())];
			l.style.height = wh[Math.floor(5*Math.random())] + 'px';
			c = 'consonne';
			if (['A','E','I','O','U','Y','a','e','i','o','u','y'].indexOf(l.innerHTML) > -1)
				c = 'voyelle';
			l.classList.add(c);
			l.style.backgroundColor = 'rgba(' +
				Math.floor(255*Math.random()) + ', ' +
				Math.floor(255*Math.random()) + ', ' +
				Math.floor(255*Math.random()) + ', 0.6)';
			e.appendChild(l);
		}
	},
	addChars = function (n, e) {
		for (var i = 0; i < n; i++)
			e.innerHTML += tab[Math.floor((tab.length-1)*Math.random())];
	},
	addImages = function (n, e) {
		for (var i = 0; i < n; i++)
			e.innerHTML += '<img src="blank.gif" data-src="http://lorempixel.com/100/100/?' + Math.random() + '" width="100" height="100" />';
	},
	dylay = new Masis('#sandbox-position'),
	scrooly,
	lazy;
addBlocks(100, sbp);
for (var i = 0; i <10; i++) {
	addChars(100, sbs);
	addBlocks(10, sbs);
}
addImages(100, sbl);
dylay.populate().position().view(50);
scrooly = new Masis('#sandbox-scroll').scroll({
	gutter: 5,
	width: '350px',
	height: '100px'
});
lazy = new Masis('#sandbox-lazy').lazy(200);
setTimeout(function() {
	addBlocks(10, sbp);
	dylay.populate().sort().filter('.consonne').position();
}, 1000);
