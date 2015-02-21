masis
=====

Masis is a tiny toolbox in JS, no depencies

Use
---
```
var m = new Masis('#sandbox');
m.sort('[data-foo]', 'DESC').position({
  pad: 10
});
```

Methods
-------

#### filter(selector = '*')
Filter and show the matching children for the selector specified in parameter

```
var m = new Masis('#sandbox').filter('.consonne');
```

#### lazy(threshold = 0, attr = 'data-src')
Create a lazyloading effect on images
```
var m = new Masis('#sandbox').lazy(200);
```

#### populate()
Regenerate the children array
```
var m = new Masis('#sandbox').populate();
```

#### scroll({ gutter: 10, pad: 10 })
Create horizontal and/or vertical scrollbar
Optional params are : width & height
```
var m = new Masis('#sandbox').scroll({
  gutter: 5,      // stroke-width of scrollbar
  pad: 5,         // step when mouse wheeling
  width: '100px', // new width of #sandbox
  height: '100px' // new height of #sandbox
});
```

#### sort(type = 'text', way = 'ASC')
Sort children by type order by way. If type is "text" then, the comparaison will be make through the content, can be an attribute
```
var m = new Masis('#sandbox').sort('src');
```

#### view(nb = 0, start = 0)
Restrict the number of children displayed
```
var m = new Masis('#sandbox').view(3);
```
