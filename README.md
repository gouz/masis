masis
=====

Masis is a tiny toolbox in JS

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

#### lazy(threshold = 0)
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
```
var m = new Masis('#sandbox').scroll({
  gutter: 5, // stroke-width of scrollbar
  pad: 5     // step when mouse wheeling
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
