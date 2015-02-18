(function(){var t,e=[].slice;t=function(){function t(){this._methods={},this._effects={},this._controls={},this._hooks={}}return t.prototype.make=function(t,e){var n,s,r,o,i,l,a;return null==e&&(e={}),this.options=e,null==(o=this.options).view&&(o.view=0),null==(i=this.options).speed&&(i.speed=0),null==(l=this.options).step&&(l.step=1),null==(a=this.options).controls&&(a.controls=""),this.options.controls=this.options.controls.split(","),n=document.querySelectorAll(t),r=[],Array.prototype.forEach.call(n,function(t){return function(e){return r.push(t._init(e))}}(this)),s=r.length,s?1===s?r[0]:r:null},t.prototype._init=function(t){var e,n,s,r;for(this.element=t,this.children=t.querySelectorAll("*"),this.actives=this.children,this.on("reset",function(t){return function(){return t.current=0,t._active()}}(this)),this.on("init",function(t){return function(){return t._active()}}(this)),this.on("move",function(t){return function(){return t.current%=t.actives.length,t.current<0&&(t.current+=t.actives.length),t._active(),t.exec("view",t.options.view),t.exec("position")}}(this)),this.on("next",function(t){return function(){return t.current++,t["do"]("move")}}(this)),this.on("prev",function(t){return function(){return t.current--,t["do"]("move")}}(this)),this["do"]("reset"),r=this.options.controls,n=0,s=r.length;s>n;n++)e=r[n],""!==e&&this._controls[e](this);return this.exec("view",this.options.view),this.exec("start"),this},t.prototype._active=function(){return Array.prototype.forEach.call(this.actives,function(t){return function(e,n){return n===t.current?e.classList.add("active"):e.classList.remove("active")}}(this))},t.prototype.addMethod=function(t,e){return this._methods[t]=e},t.prototype.addControl=function(t,e){return this._controls[t]=e},t.prototype.exec=function(){var t,n;return t=arguments[0],n=2<=arguments.length?e.call(arguments,1):[],this._methods[t](this,n),this},t.prototype.on=function(t,e){return null==this._hooks[t]&&(this._hooks[t]=[]),this._hooks[t].push(e)},t.prototype["do"]=function(t){var e,n,s,r,o;if(null!=this._hooks[t]){for(r=this._hooks[t],o=[],n=0,s=r.length;s>n;n++)e=r[n],o.push(e(this));return o}},t}(),this.Masis=new t,this.Masis.addControl("keys",function(t){var e,n;return null==(e=t.options).keyPrev&&(e.keyPrev=37),null==(n=t.options).keyNext&&(n.keyNext=39),document.addEventListener("keydown",function(e){return e.keyCode===t.options.keyPrev&&t["do"]("prev"),e.keyCode===t.options.keyNext?t["do"]("next"):void 0})}),this.Masis.addMethod("filter",function(t,e){var n,s,r,o,i,l,a,u,c;if(e=e.length?e[0]:"*","*"===e)t.actives=t.children;else{for(o=[],n=t.element.querySelectorAll(e),c=t.actives,i=0,a=c.length;a>i;i++)for(s=c[i],l=0,u=n.length;u>l;l++)if(r=n[l],s===r){o.push(s);break}t.actives=o}return t.exec("view")}),this.Masis.addMethod("next",function(t){return t["do"]("next")}),this.Masis.addMethod("position",function(t){var e,n,s,r,o;for(r=~~t.element.offsetWidth,t.element.style.position="relative",e=[],n=o=0;r>=0?r>=o:o>=r;n=r>=0?++o:--o)e[n]=0;return s=function(t,e,s){var r;for(n=e,r=s[t];n--;)r<s[t+n]&&(r=s[t+n]);return r},Array.prototype.forEach.call(t.actives,function(){return function(t){var n,o,i,l,a,u,c,h,d,p,f,v;for(t.style.position="absolute",f=getComputedStyle(t),d=t.getBoundingClientRect(),o=parseInt(d.width+parseInt(f.marginLeft+parseInt(f.marginRight))),n=parseInt(d.height+parseInt(f.marginTop+parseInt(f.marginBottom))),u=0,l=0,i=1/0,c=i;r>=l;){for(a=l-1,v=l+o;a++<=v;)h=a+o,r>=h&&(c=n+s(a,o,e),i>c&&(i=c,u=a));l+=o}for(t.style.left=u+"px",t.style.top=i-n+"px",l=o,p=[];l--;)p.push(e[l+u]=i);return p}}(this)),t.element.style.height=Math.max.apply(Math,e)+"px"}),this.Masis.addMethod("scroll",function(t,e){var n,s,r,o,i,l,a,u,c,h,d,p,f,v,m;return null==e.mode&&(e.mode="vertical"),null==e.gutter&&(e.gutter="10px"),null==e.pad&&(e.pad=10),t.element.style.position="relative",t.element.style.overflow="hidden",t.element.innerHTML='<div class="mscr-content">'+t.element.innerHTML+"</div>",o=-1!==e.mode.indexOf("horizontal"),m=-1!==e.mode.indexOf("vertical"),o&&(t.element.innerHTML+='<div class="mscr-track-h"><div class="mscr-drag-h"/></div>'),m&&(t.element.innerHTML+='<div class="mscr-track-v"><div class="mscr-drag-v"/></div>'),n=t.element.querySelector(".mscr-content"),f=t.element.querySelector(".mscr-track-h"),s=t.element.querySelector(".mscr-drag-h"),v=t.element.querySelector(".mscr-track-v"),r=t.element.querySelector(".mscr-drag-v"),n.style.position="absolute",n.style.top=n.style.left=0,p=parseInt(n.offsetWidth)/parseInt(t.element.offsetWidth),d=parseInt(t.element.offsetHeight)/parseInt(n.offsetHeight),c=null,a=!1,document.addEventListener("mouseup",function(e){return e.preventDefault(),c=null,a=!1,t.element.classList.remove("show-scrollbar"),o&&s.classList.remove("moving"),m?r.classList.remove("moving"):void 0}),document.addEventListener("mousemove",function(t){return a&&null!=c?l(parseInt(t["page"+a])-parseInt(c["page"+a])):void 0}),u={X:0,Y:0},i={X:parseInt(t.element.offsetWidth),Y:parseInt(t.element.offsetHeight)},t.element.addEventListener("mousewheel",function(n){return null!=n.originalEvent&&(n=n.originalEvent),t.element.classList.add("show-scrollbar"),a=n.shiftKey||n.wheelDeltaX?"X":"Y",u[a]+=e.pad*(n.wheelDelta<0?1:-1),u[a]<0&&(u[a]=0),u[a]>i[a]&&(u[a]=i[a]),l(u[a]),t.element.classList.remove("show-scrollbar")}),t.element.addEventListener("DOMMouseScroll",function(n){return null!=n.originalEvent&&(n=n.originalEvent),t.element.classList.add("show-scrollbar"),a=n.shiftKey?"X":"Y",u[a]+=e.pad*(-n.detail<0?1:-1),u[a]<0&&(u[a]=0),u[a]>i[a]&&(u[a]=i[a]),l(u[a]),t.element.classList.remove("show-scrollbar")}),o&&(f.style.position="absolute",f.style.bottom=f.style.left=0,f.style.height=e.gutter,s.style.position="absolute",s.style.top=s.style.left=0,s.style.height=e.gutter,s.addEventListener("mousedown",function(e){return e.preventDefault(),a="X",c=e,t.element.classList.add("show-scrollbar"),this.classList.add("moving")})),m&&(v.style.position="absolute",v.style.top=v.style.right=0,v.style.width=e.gutter,r.style.position="absolute",r.style.top=r.style.left=0,r.style.width=e.gutter,r.addEventListener("mousedown",function(e){return e.preventDefault(),a="Y",c=e,t.element.classList.add("show-scrollbar"),this.classList.add("moving")})),h=function(){var e,n;return n=parseInt(t.element.offsetWidth),e=parseInt(t.element.offsetHeight),o&&(f.style.width=n+"px",s.style.width=~~(n*p)+"px"),m?(v.style.height=e+"px",r.style.height=~~(e*d)+"px"):void 0},h(),window.addEventListener("resize",function(){return h()}),l=function(t){var e,o,i;return"X"===a?(e=t,o=parseInt(f.offsetWidth)-parseInt(s.offsetWidth),e>o&&(e=o),0>e&&(e=0),s.style.left=e+"px",n.style.marginLeft=-e/p+"px"):(i=t,o=parseInt(v.offsetHeight)-parseInt(r.offsetHeight),i>o&&(i=o),0>i&&(i=0),r.style.top=i+"px",n.style.marginTop=-i/d+"px")}}),this.Masis.addMethod("sort",function(t,e){var n,s,r,o;r=e[0],o=e[1],null==r&&(r="text"),null==o&&(o="ASC"),o=o.toUpperCase(),"text"===!r&&t.exec("filter",r),n=Array.prototype.slice.call(t.actives,0),n.sort(function(t,e){var n,s,i,l;return s=r.slice(1,-1),i="text"!==r?t.getAttribute(s):t.innerHTML,l="text"!==r?e.getAttribute(s):e.innerHTML,n="ASC"===o?1:-1,n*i.localeCompare(l)});for(s in n)t.element.appendChild(n[s]);return"text"===!r?t.exec("filter",r):void 0}),this.Masis.addMethod("start",function(t){var e;return null==(e=t.options).pulse&&(e.pulse=0),t.options.pulse?t.timer=setInterval(function(){return t.exec("next")},t.options.pulse):void 0}),this.Masis.addMethod("stop",function(t){return clearInterval(t.timer),t["do"]("stop")}),this.Masis.addMethod("view",function(t,e){return null==e&&(e=0),e.length||(e=0),e=parseInt(e),Array.prototype.forEach.call(t.children,function(t){return t.style.display="none"}),Array.prototype.forEach.call(t.actives,function(n,s){return!e||e&&t.current<=s&&s<t.current+e?n.style.display="":void 0})})}).call(this);