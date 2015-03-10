var tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ           abcdefghijklmnopqrstuvwxyz',
	wh = ['20', '30', '40', '50', '60'],
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
	addMenus = function (n, e) {
		for (var i = 0; i < n; i++)
			e.innerHTML += '<li style="background: rgba(' +
				Math.floor(255*Math.random()) + ', ' +
				Math.floor(255*Math.random()) + ', ' +
				Math.floor(255*Math.random()) + ', 0.6)">' + i + '</li>';
	};
