(function(e){function n(n){for(var c,r,a=n[0],i=n[1],f=n[2],d=0,l=[];d<a.length;d++)r=a[d],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&l.push(o[r][0]),o[r]=0;for(c in i)Object.prototype.hasOwnProperty.call(i,c)&&(e[c]=i[c]);h&&h(n);while(l.length)l.shift()();return u.push.apply(u,f||[]),t()}function t(){for(var e,n=0;n<u.length;n++){for(var t=u[n],c=!0,r=1;r<t.length;r++){var a=t[r];0!==o[a]&&(c=!1)}c&&(u.splice(n--,1),e=i(i.s=t[0]))}return e}var c={},r={app:0},o={app:0},u=[];function a(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-11afbfad":"74d4314c","chunk-325ecce8":"d5bdcb1e","chunk-b81d225c":"6a7be92a","chunk-2fcb5385":"657fdb6c","chunk-3fa86e5e":"73e0d3fd","chunk-66fde854":"1c4f777d","chunk-6efa9c2e":"7406f100","chunk-7f916e98":"6fb7e4ea"}[e]+".js"}function i(n){if(c[n])return c[n].exports;var t=c[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-325ecce8":1,"chunk-2fcb5385":1,"chunk-3fa86e5e":1,"chunk-66fde854":1,"chunk-6efa9c2e":1,"chunk-7f916e98":1};r[e]?n.push(r[e]):0!==r[e]&&t[e]&&n.push(r[e]=new Promise((function(n,t){for(var c="css/"+({}[e]||e)+"."+{"chunk-11afbfad":"31d6cfe0","chunk-325ecce8":"2fb492d6","chunk-b81d225c":"31d6cfe0","chunk-2fcb5385":"bdc57c4c","chunk-3fa86e5e":"328f3b9c","chunk-66fde854":"ffc3ef06","chunk-6efa9c2e":"bf40c3ca","chunk-7f916e98":"f4914ccf"}[e]+".css",o=i.p+c,u=document.getElementsByTagName("link"),a=0;a<u.length;a++){var f=u[a],d=f.getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(d===c||d===o))return n()}var l=document.getElementsByTagName("style");for(a=0;a<l.length;a++){f=l[a],d=f.getAttribute("data-href");if(d===c||d===o)return n()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=n,h.onerror=function(n){var c=n&&n.target&&n.target.src||o,u=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=c,delete r[e],h.parentNode.removeChild(h),t(u)},h.href=o;var s=document.getElementsByTagName("head")[0];s.appendChild(h)})).then((function(){r[e]=0})));var c=o[e];if(0!==c)if(c)n.push(c[2]);else{var u=new Promise((function(n,t){c=o[e]=[n,t]}));n.push(c[2]=u);var f,d=document.createElement("script");d.charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.src=a(e);var l=new Error;f=function(n){d.onerror=d.onload=null,clearTimeout(h);var t=o[e];if(0!==t){if(t){var c=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src;l.message="Loading chunk "+e+" failed.\n("+c+": "+r+")",l.name="ChunkLoadError",l.type=c,l.request=r,t[1](l)}o[e]=void 0}};var h=setTimeout((function(){f({type:"timeout",target:d})}),12e4);d.onerror=d.onload=f,document.head.appendChild(d)}return Promise.all(n)},i.m=e,i.c=c,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var c in e)i.d(t,c,function(n){return e[n]}.bind(null,c));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/vue-week6/dist/",i.oe=function(e){throw console.error(e),e};var f=window["webpackJsonp"]=window["webpackJsonp"]||[],d=f.push.bind(f);f.push=n,f=f.slice();for(var l=0;l<f.length;l++)n(f[l]);var h=d;u.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var c=t("7a23"),r={class:"container"};function o(e,n){var t=Object(c["z"])("router-view");return Object(c["s"])(),Object(c["d"])("div",r,[Object(c["g"])(t)])}t("c9b3");const u={};u.render=o;var a=u,i=(t("d3b7"),t("3ca3"),t("ddb0"),t("6c02")),f=[{path:"/",name:"Home",component:function(){return t.e("chunk-66fde854").then(t.bind(null,"bb51"))},children:[{path:"index",component:function(){return t.e("chunk-3fa86e5e").then(t.bind(null,"d504"))}},{path:"products",component:function(){return Promise.all([t.e("chunk-11afbfad"),t.e("chunk-325ecce8")]).then(t.bind(null,"e6dc"))}},{path:"cart",component:function(){return t.e("chunk-6efa9c2e").then(t.bind(null,"b789"))}}]},{path:"/login",name:"Login",component:function(){return t.e("chunk-2fcb5385").then(t.bind(null,"a55b"))}},{path:"/dashboard",name:"Dashboard",component:function(){return t.e("chunk-7f916e98").then(t.bind(null,"7277"))},children:[{path:"products",component:function(){return Promise.all([t.e("chunk-11afbfad"),t.e("chunk-b81d225c")]).then(t.bind(null,"6d09"))}}]}],d=Object(i["a"])({history:Object(i["b"])(),routes:f,linkActiveClass:"active"}),l=d,h=t("bc3a"),s=t.n(h),b=t("7bb1"),p=t("3aa8"),m=t("cbdf"),k=t("9457");t("ce50");Object(b["e"])("email",p["a"]),Object(b["e"])("required",p["d"]),Object(b["e"])("min",p["b"]),Object(b["e"])("numeric",p["c"]),Object(b["d"])({generateMessage:Object(m["a"])({zh_TW:k}),validateOnInput:!0}),Object(m["b"])("zh_TW"),Object(c["c"])(a).use(l,s.a).component("Form",b["c"]).component("Field",b["b"]).component("ErrorMessage",b["a"]).mount("#app")},c249:function(e,n,t){},c9b3:function(e,n,t){"use strict";t("c249")},ce50:function(e,n,t){}});
//# sourceMappingURL=app.fee012d5.js.map