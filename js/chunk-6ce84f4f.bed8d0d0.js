(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6ce84f4f"],{"5c3a":function(e,t,c){"use strict";c.r(t);var a=c("7a23"),o={class:"w-100 main"},n={class:"bg-white mb-3"},s=Object(a["createVNode"])("i",{class:"bi bi-arrow-bar-left"},null,-1),i={class:"container"};function r(e,t,c,r,d,l){var b=Object(a["resolveComponent"])("Loading"),u=Object(a["resolveComponent"])("ToastMessages"),p=Object(a["resolveComponent"])("Navbar"),j=Object(a["resolveComponent"])("router-view");return Object(a["openBlock"])(),Object(a["createBlock"])(a["Fragment"],null,[Object(a["createVNode"])(b,{active:d.isLoading,"z-index":100,loader:"dots",color:"#384D48"},null,8,["active"]),Object(a["createVNode"])(u),Object(a["createVNode"])("div",{class:["dashboard d-flex",d.isExpand?"expand":""]},[Object(a["createVNode"])(p),Object(a["createVNode"])("main",o,[Object(a["createVNode"])("div",n,[Object(a["createVNode"])("button",{type:"button",class:"btn d-inline-block sticky-top rounded-end bg-light shadow-sm py-2 px-4",onClick:t[1]||(t[1]=function(e){return d.isExpand=!d.isExpand})},[s])]),Object(a["createVNode"])("div",i,[d.isLogin?(Object(a["openBlock"])(),Object(a["createBlock"])(j,{key:0})):Object(a["createCommentVNode"])("",!0)])])],2)],64)}c("ac1f"),c("5319");var d={class:"navbar flex-column align-items-stretch bg-light flex-nowrap"},l=Object(a["createTextVNode"])("前台首頁"),b={class:"navbar-nav overflow-auto"},u={class:"nav-item"},p=Object(a["createVNode"])("div",{class:"ps-4 icon"},[Object(a["createVNode"])("i",{class:"bi bi-clipboard-data rounded-circle p-3 d-block"})],-1),j=Object(a["createTextVNode"])(" 後台首頁 "),h={class:"nav-item"},f=Object(a["createVNode"])("div",{class:"ps-4 icon"},[Object(a["createVNode"])("i",{class:"bi bi-handbag-fill rounded-circle p-3 d-block"})],-1),O=Object(a["createTextVNode"])(" 產品 "),v={class:"nav-item"},m=Object(a["createVNode"])("div",{class:"ps-4 icon"},[Object(a["createVNode"])("i",{class:"bi bi-receipt rounded-circle p-3 d-block"})],-1),g=Object(a["createTextVNode"])(" 訂單 "),N={class:"nav-item"},V=Object(a["createVNode"])("div",{class:"ps-4 icon"},[Object(a["createVNode"])("i",{class:"bi bi-gift-fill rounded-circle p-3 d-block"})],-1),x=Object(a["createTextVNode"])(" 優惠券 "),k={class:"nav-item"},w=Object(a["createVNode"])("div",{class:"ps-4 icon"},[Object(a["createVNode"])("i",{class:"bi bi-card-text rounded-circle p-3 d-block"})],-1),y=Object(a["createTextVNode"])(" 文章 "),$=Object(a["createVNode"])("i",{class:"bi bi-box-arrow-left me-2 ps-3"},null,-1),L=Object(a["createTextVNode"])(" 登出 ");function C(e,t,c,o,n,s){var i=Object(a["resolveComponent"])("router-link");return Object(a["openBlock"])(),Object(a["createBlock"])("nav",d,[Object(a["createVNode"])("div",null,[Object(a["createVNode"])(i,{to:"/",class:"navbar-brand w-100 mb-5"},{default:Object(a["withCtx"])((function(){return[l]})),_:1}),Object(a["createVNode"])("ul",b,[Object(a["createVNode"])("li",u,[Object(a["createVNode"])(i,{to:"/dashboard/charts",class:"nav-link d-flex align-items-center py-0 mb-3"},{default:Object(a["withCtx"])((function(){return[p,j]})),_:1})]),Object(a["createVNode"])("li",h,[Object(a["createVNode"])(i,{to:"/dashboard/products",class:"nav-link d-flex align-items-center py-0 mb-3"},{default:Object(a["withCtx"])((function(){return[f,O]})),_:1})]),Object(a["createVNode"])("li",v,[Object(a["createVNode"])(i,{to:"/dashboard/orders",class:"nav-link d-flex align-items-center py-0 mb-3"},{default:Object(a["withCtx"])((function(){return[m,g]})),_:1})]),Object(a["createVNode"])("li",N,[Object(a["createVNode"])(i,{to:"/dashboard/coupons",class:"nav-link d-flex align-items-center py-0 mb-3"},{default:Object(a["withCtx"])((function(){return[V,x]})),_:1})]),Object(a["createVNode"])("li",k,[Object(a["createVNode"])(i,{to:"/dashboard/articles",class:"nav-link d-flex align-items-center py-0"},{default:Object(a["withCtx"])((function(){return[w,y]})),_:1})])])]),Object(a["createVNode"])("button",{type:"button",onClick:t[1]||(t[1]=function(){return s.logOut&&s.logOut.apply(s,arguments)}),class:"btn btn-transparent text-start ps-4 py-3"},[$,L])])}var T={inject:["$httpMessageState","emitter"],methods:{logOut:function(){var e=this,t="/logout";this.$http.post(t).then((function(t){t.data.success?(document.cookie="token= ;expires=".concat(new Date),e.isLogin=!1,e.$httpMessageState(t,"已登出"),setTimeout((function(){e.$router.push("/")}),3e3)):e.emitter.emit("push-message",{style:"danger",title:"登出失敗",content:"登出失敗，請再試一次"})})).catch((function(t){e.$httpMessageState(t,"連線錯誤")}))}},created:function(){this.$http.defaults.baseURL="https://vue3-course-api.hexschool.io"}},B=c("6b0d"),M=c.n(B);const _=M()(T,[["render",C]]);var E=_,S=c("f367"),z=c("98e4"),A=c("cfb9"),D={data:function(){return{isLogin:!1,isLoading:!1,isExpand:!0}},provide:function(){return{$httpMessageState:z["a"],emitter:A["a"]}},components:{ToastMessages:S["a"],Navbar:E},methods:{checkLogin:function(){var e=this;this.isLoading=!0;var t=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=t;var c="/api/user/check";this.$http.post(c).then((function(t){if(!t.data.success)return Object(z["a"])(t,"登入"),e.isLoading=!1,void e.$router.push("/login");e.isLogin=!0,Object(z["a"])(t,"已登入"),e.isLoading=!1})).catch((function(t){Object(z["a"])(t,"連線錯誤"),e.isLoading=!1}))}},created:function(){this.$http.defaults.baseURL="https://vue3-course-api.hexschool.io";var e=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,"$1");e?this.checkLogin():this.$router.push("/login")}};const J=M()(D,[["render",r]]);t["default"]=J},"98e4":function(e,t,c){"use strict";c("a15b");var a=c("cfb9");t["a"]=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"更新";if(e.data)if(e.data.success)a["a"].emit("push-message",{style:"success",title:"".concat(t,"成功"),content:e.data.message});else{var c="string"===typeof e.data.message?[e.data.message]:e.data.message;a["a"].emit("push-message",{style:"danger",title:"".concat(t,"失敗"),content:c.join("、")})}else a["a"].emit("push-message",{style:"danger",title:"連線錯誤",content:"".concat(e.message,"，請嘗試重新整理")||!1})}},a15b:function(e,t,c){"use strict";var a=c("23e7"),o=c("44ad"),n=c("fc6a"),s=c("a640"),i=[].join,r=o!=Object,d=s("join",",");a({target:"Array",proto:!0,forced:r||!d},{join:function(e){return i.call(n(this),void 0===e?",":e)}})},a640:function(e,t,c){"use strict";var a=c("d039");e.exports=function(e,t){var c=[][e];return!!c&&a((function(){c.call(null,t||function(){throw 1},1)}))}}}]);
//# sourceMappingURL=chunk-6ce84f4f.bed8d0d0.js.map