(function(){var t,e=[].slice;t=function(){function t(){this._methods={},this._effects={},this._controls={},this._hooks={}}return t.prototype.make=function(t,e){var n,r,i,o,s,l;return null==e&&(e={}),this.options=e,null==(o=this.options).view&&(o.view=0),null==(s=this.options).speed&&(s.speed=0),null==(l=this.options).step&&(l.step=1),n=document.querySelectorAll(t),i=[],Array.prototype.forEach.call(n,function(t){return function(e){return i.push(t._init(e))}}(this)),r=i.length,r?1===r?i[0]:i:null},t.prototype._init=function(t){return this.element=t,this.children=t.querySelectorAll("*"),this.actives=this.children,this.on("reset",function(t){return function(){return t.current=0,t._active()}}(this)),this.on("init",function(t){return function(){return t._active()}}(this)),this.on("next",function(t){return function(){return t.current++,t.current%=t.actives.length,t._active()}}(this)),this["do"]("reset"),this.exec("start"),this},t.prototype._active=function(){return Array.prototype.forEach.call(this.actives,function(t){return function(e,n){return n===t.current?e.classList.add("active"):e.classList.remove("active")}}(this))},t.prototype.addMethod=function(t,e){return this._methods[t]=e},t.prototype.exec=function(){var t,n;return t=arguments[0],n=2<=arguments.length?e.call(arguments,1):[],this._methods[t](this,n),this},t.prototype.on=function(t,e){return null==this._hooks[t]&&(this._hooks[t]=[]),this._hooks[t].push(e)},t.prototype["do"]=function(t){var e,n,r,i,o;if(null!=this._hooks[t]){for(i=this._hooks[t],o=[],n=0,r=i.length;r>n;n++)e=i[n],o.push(e(this));return o}},t}(),this.Masis=new t,this.Masis.addMethod("filter",function(t,e){var n,r,i,o,s,l,u,a,h;if(e=e.length?e[0]:"*","*"===e)t.actives=t.children;else{for(o=[],n=t.element.querySelectorAll(e),h=t.actives,s=0,u=h.length;u>s;s++)for(r=h[s],l=0,a=n.length;a>l;l++)if(i=n[l],r===i){o.push(r);break}t.actives=o}return t.exec("view")}),this.Masis.addMethod("next",function(t){return t["do"]("next")}),this.Masis.addMethod("position",function(t){var e,n,r,i,o;for(i=~~t.element.offsetWidth,t.element.style.position="relative",t.element.style.left=t.element.style.top=0,e=[],n=o=0;i>=0?i>=o:o>=i;n=i>=0?++o:--o)e[n]=0;return r=function(t,e,r){var i;for(n=e,i=r[t];n--;)i<r[t+n]&&(i=r[t+n]);return i},Array.prototype.forEach.call(t.actives,function(){return function(t){var n,o,s,l,u,a,h,c,p,f,d;for(t.style.position="absolute",p=getComputedStyle(t),o=parseInt(t.offsetWidth+parseInt(p.marginLeft+parseInt(p.marginRight))),n=parseInt(t.offsetHeight+parseInt(p.marginTop+parseInt(p.marginBottom))),a=0,l=0,s=1/0,h=s;i>=l;){for(u=l-1,d=l+o;u++<=d;)c=u+o,i>=c&&(h=n+r(u,o,e),s>h&&(s=h,a=u));l+=o}for(t.style.left=a+"px",t.style.top=s-n+"px",l=o,f=[];l--;)f.push(e[l+a]=s);return f}}(this)),t.element.style.height=Math.max.apply(Math,e)}),this.Masis.addMethod("sort",function(t,e){var n,r,i,o;i=e[0],o=e[1],null==i&&(i="text"),null==o&&(o="ASC"),o=o.toUpperCase(),"text"===!i&&t.exec("filter",i),n=Array.prototype.slice.call(t.actives,0),n.sort(function(t,e){var n,r,s,l;return r=i.slice(1,-1),s="text"!==i?t.getAttribute(r):t.innerHTML,l="text"!==i?e.getAttribute(r):e.innerHTML,n="ASC"===o?1:-1,n*s.localeCompare(l)});for(r in n)t.element.appendChild(n[r]);return"text"===!i?t.exec("filter",i):void 0}),this.Masis.addMethod("start",function(t){var e;return null==(e=t.options).pulse&&(e.pulse=0),t.options.pulse?t.timer=setInterval(function(){return t.exec("next")},t.options.pulse):void 0}),this.Masis.addMethod("stop",function(t){return clearInterval(t.timer),t["do"]("stop")}),this.Masis.addMethod("view",function(t,e){return null==e&&(e=0),e.length||(e=0),Array.prototype.forEach.call(t.children,function(t){return t.style.display="none"}),Array.prototype.forEach.call(t.actives,function(n,r){return!e||e&&t.current<=r&&r<t.current+e?n.style.display="":void 0})})}).call(this);