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

#### filter(selector)
Filter and show the matching children for the selector specified in parameter

```
var m = new Masis('#sandbox').filter('.consonne');
```

#### lazy(threshold)
Create a lazyloading effect on images
```
var m = new Masis('#sandbox').lazy(200);
```
