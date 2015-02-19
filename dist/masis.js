(function(){var t;t=function(){function t(t,e){var r,s,n;return null==e&&(e={}),this.options=e,r=document.querySelectorAll(t),n=[],Array.prototype.forEach.call(r,function(t){return function(e){return n.push(t._init(e))}}(this)),s=n.length,s?1===s?n[0]:void 0:null}return t.prototype._init=function(t){return this.element=t,this.populate(),this},t}(),this.Masis=t,t.prototype.filter=function(t){var e,r,s,n,i,l,o,a,u;if(null==t&&(t="*"),"*"===t)this.actives=this.children;else{for(n=[],e=this.element.querySelectorAll(t),u=this.actives,i=0,o=u.length;o>i;i++)for(r=u[i],l=0,a=e.length;a>l;l++)if(s=e[l],r===s){n.push(r);break}this.actives=n}return this.view(),this},t.prototype.populate=function(){return this.children=this.element.querySelectorAll("*"),this.actives=this.children,this.view()},t.prototype.position=function(t){var e,r,s,n,i;for(null==t&&(t={}),null==t.gutter&&(t.gutter=1),n=parseInt(this.element.offsetWidth),this.element.style.position="relative",e=[],r=i=0;n>=0?n>=i:i>=n;r=n>=0?++i:--i)e[r]=0;return s=function(e,s,n){var i;for(r=0,i=n[e];(r+=t.gutter)<s;)i<n[e+r]&&(i=n[e+r]);return i},Array.prototype.forEach.call(this.actives,function(){return function(r){var i,l,o,a,u,p,c,h,f,d,y,v;for(r.style.position="absolute",y=getComputedStyle(r),f=r.getBoundingClientRect(),l=parseInt(f.width+parseInt(y.marginLeft+parseInt(y.marginRight))),i=parseInt(f.height+parseInt(y.marginTop+parseInt(y.marginBottom))),p=0,a=0,o=1/0,c=o;n>=a;){for(u=a-t.gutter,v=a+l;u++<=v;)h=u+l,n>=h&&(c=i+s(u,l,e),o>c&&(o=c,p=u));a+=l}for(r.style.left=p+"px",r.style.top=o-i+"px",a=l,d=[];a--;)d.push(e[a+p]=o);return d}}(this)),this.element.style.height=Math.max.apply(Math,e)+"px",this},t.prototype.scroll=function(t){var e,r,s,n,i,l,o,a,u,p,c,h,f,d,y;return null==t&&(t={}),null==t.mode&&(t.mode="vertical"),null==t.gutter&&(t.gutter=10),null==t.pad&&(t.pad=10),n=this.element,n.style.position="relative",n.style.overflow="hidden",n.innerHTML='<div class="mscr-content">'+n.innerHTML+"</div>",i=-1!==t.mode.indexOf("horizontal"),d=-1!==t.mode.indexOf("vertical"),i&&(n.innerHTML+='<div class="mscr-track-h"><div class="mscr-drag-h"/></div>'),d&&(n.innerHTML+='<div class="mscr-track-v"><div class="mscr-drag-v"/></div>'),e=n.querySelector(".mscr-content"),h=n.querySelector(".mscr-track-h"),r=n.querySelector(".mscr-drag-h"),f=n.querySelector(".mscr-track-v"),s=n.querySelector(".mscr-drag-v"),e.style.position="absolute",e.style.top=e.style.left=0,c=parseInt(e.offsetWidth)/parseInt(n.offsetWidth),p=parseInt(n.offsetHeight)/parseInt(e.offsetHeight),a=null,o=!1,y={X:0,Y:0},document.addEventListener("mouseup",function(t){return t.preventDefault(),o=!1,n.classList.remove("show-scrollbar"),i&&(r.classList.remove("moving"),y.X=parseInt(r.style.left)),d?(s.classList.remove("moving"),y.Y=parseInt(s.style.top)):void 0}),document.addEventListener("mousemove",function(t){return o&&null!=a?l(parseInt(t["page"+o])-parseInt(a["page"+o])):void 0}),n.addEventListener("mousewheel",function(e){return null!=e.originalEvent&&(e=e.originalEvent),n.classList.add("show-scrollbar"),o=e.shiftKey||e.wheelDeltaX?"X":"Y",l(t.pad*(e.wheelDelta<0?1:-1)),o=!1,n.classList.remove("show-scrollbar"),i&&(y.X=parseInt(r.style.left)),d?y.Y=parseInt(s.style.top):void 0}),n.addEventListener("DOMMouseScroll",function(e){return null!=e.originalEvent&&(e=e.originalEvent),n.classList.add("show-scrollbar"),o=e.shiftKey?"X":"Y",l(t.pad*(-e.detail<0?1:-1)),o=!1,n.classList.remove("show-scrollbar"),i&&(y.X=parseInt(r.style.left)),d?y.Y=parseInt(s.style.top):void 0}),i&&(h.style.position="absolute",h.style.bottom=h.style.left=0,h.style.height=t.gutter+"px",r.style.position="absolute",r.style.top=r.style.left=0,r.style.height=t.gutter+"px",r.addEventListener("mousedown",function(t){return t.preventDefault(),o="X",a=t,n.classList.add("show-scrollbar"),this.classList.add("moving")})),d&&(f.style.position="absolute",f.style.top=f.style.right=0,f.style.width=t.gutter+"px",s.style.position="absolute",s.style.top=s.style.left=0,s.style.width=t.gutter+"px",s.addEventListener("mousedown",function(t){return t.preventDefault(),o="Y",a=t,n.classList.add("show-scrollbar"),this.classList.add("moving")})),u=function(){var t,e;return e=parseInt(n.offsetWidth),t=parseInt(n.offsetHeight),i&&(h.style.width=e+"px",r.style.width=~~(e*c)+"px"),d?(f.style.height=t+"px",s.style.height=~~(t*p)+"px"):void 0},u(),window.addEventListener("resize",function(){return u()}),l=function(t){var n,i,l;return t+=y[o],"X"===o?(n=t,i=parseInt(h.offsetWidth)-parseInt(r.offsetWidth),n>i&&(n=i),0>n&&(n=0),r.style.left=n+"px",e.style.marginLeft=-n/c+"px"):(l=t,i=parseInt(f.offsetHeight)-parseInt(s.offsetHeight),l>i&&(l=i),0>l&&(l=0),s.style.top=l+"px",e.style.marginTop=-l/p+"px")},this},t.prototype.sort=function(t){var e,r,s,n;s=t[0],n=t[1],null==s&&(s="text"),null==n&&(n="ASC"),n=n.toUpperCase(),"text"!==s&&this.filter(s),e=Array.prototype.slice.call(this.actives,0),e.sort(function(t,e){var r,i,l,o;return i=s.slice(1,-1),l="text"!==s?t.getAttribute(i):t.innerHTML,o="text"!==s?e.getAttribute(i):e.innerHTML,r="ASC"===n?1:-1,r*l.localeCompare(o)});for(r in e)this.element.appendChild(e[r]);return"text"!==s&&this.filter(s),this},t.prototype.view=function(t){return null==t&&(t=0),t=parseInt(t),Array.prototype.forEach.call(this.children,function(t){return t.style.display="none"}),Array.prototype.forEach.call(this.actives,function(e){return function(r,s){return!t||t&&e.current<=s&&s<e.current+t?r.style.display="":void 0}}(this)),this}}).call(this);