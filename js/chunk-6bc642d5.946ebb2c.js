(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6bc642d5"],{"1dde":function(e,t,c){var r=c("d039"),o=c("b622"),a=c("2d00"),d=o("species");e.exports=function(e){return a>=51||!r((function(){var t=[],c=t.constructor={};return c[d]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"65f0":function(e,t,c){var r=c("861d"),o=c("e8b5"),a=c("b622"),d=a("species");e.exports=function(e,t){var c;return o(e)&&(c=e.constructor,"function"!=typeof c||c!==Array&&!o(c.prototype)?r(c)&&(c=c[d],null===c&&(c=void 0)):c=void 0),new(void 0===c?Array:c)(0===t?0:t)}},8418:function(e,t,c){"use strict";var r=c("c04e"),o=c("9bf2"),a=c("5c6c");e.exports=function(e,t,c){var d=r(t);d in e?o.f(e,d,a(0,c)):e[d]=c}},"99af":function(e,t,c){"use strict";var r=c("23e7"),o=c("d039"),a=c("e8b5"),d=c("861d"),s=c("7b0b"),n=c("50c4"),l=c("8418"),i=c("65f0"),b=c("1dde"),u=c("b622"),p=c("2d00"),O=u("isConcatSpreadable"),j=9007199254740991,f="Maximum allowed index exceeded",N=p>=51||!o((function(){var e=[];return e[O]=!1,e.concat()[0]!==e})),V=b("concat"),h=function(e){if(!d(e))return!1;var t=e[O];return void 0!==t?!!t:a(e)},m=!N||!V;r({target:"Array",proto:!0,forced:m},{concat:function(e){var t,c,r,o,a,d=s(this),b=i(d,0),u=0;for(t=-1,r=arguments.length;t<r;t++)if(a=-1===t?d:arguments[t],h(a)){if(o=n(a.length),u+o>j)throw TypeError(f);for(c=0;c<o;c++,u++)c in a&&l(b,u,a[c])}else{if(u>=j)throw TypeError(f);l(b,u++,a)}return b.length=u,b}})},b0c0:function(e,t,c){var r=c("83ab"),o=c("9bf2").f,a=Function.prototype,d=a.toString,s=/^\s*function ([^ (]*)/,n="name";r&&!(n in a)&&o(a,n,{configurable:!0,get:function(){try{return d.call(this).match(s)[1]}catch(e){return""}}})},da3a:function(e,t,c){"use strict";c.r(t);c("b0c0");var r=c("7a23"),o={class:"bg-light"},a={class:"container py-5"},d={class:"row mb-3"},s={class:"col-md-8 mx-auto"},n={class:"progress-bar row list-unstyled justify-content-between text-center"},l=Object(r["createVNode"])("li",{class:"col-4 done"},"確認購物車品項",-1),i=Object(r["createVNode"])("li",{class:"col-4 done"},"填寫資料",-1),b=Object(r["createVNode"])("div",{class:"col-lg-10 mb-3 mx-auto"},[Object(r["createVNode"])("p",{class:"text-primary"},[Object(r["createVNode"])("i",{class:"bi bi-person-check-fill me-2"}),Object(r["createTextVNode"])(" 親愛的客戶您好，訂單已建立成功，請在確認資訊後付款 ")]),Object(r["createVNode"])("h1",{class:"fs-4 text-secondary text-center bg-info py-2"},"訂單資訊")],-1),u={class:"checkout row rounded-3 justify-content-center gy-3 py-3 mt-3"},p={class:"checkout-product col-lg-6 text-primary"},O={class:"h-100 d-flex flex-column"},j=Object(r["createVNode"])("h3",{class:"h6 bg-primary d-inline-block text-white\n              rounded-top align-self-start px-3 py-2 mb-0"}," 商品資訊 ",-1),f={class:"table-responsive bg-white shadow-sm\n              rounded-bottom border border-info h-100 p-3"},N={key:0,class:"table table-borderless mb-0"},V={class:"text-end"},h={class:"small text-muted"},m=Object(r["createVNode"])("br",null,null,-1),y=Object(r["createVNode"])("small",{class:"text-primary me-1"},"折扣價",-1),g={class:"text-primary fw-bold"},v={class:"col-lg-4 border-start border-light d-flex flex-column"},x=Object(r["createVNode"])("h3",{class:"h6 bg-primary d-inline-block text-white\n            rounded-top align-self-start px-3 py-2 mb-0"}," 訂購人資料 ",-1),k={class:"table-responsive bg-white shadow-sm\n            rounded-bottom border border-info p-3 mb-4"},w={class:"table"},S={key:0},B=Object(r["createVNode"])("th",{scope:"row",class:"border-0"},"姓名",-1),$={class:"border-0"},C=Object(r["createVNode"])("th",{scope:"row",class:"border-0"},"電話",-1),D={class:"border-0"},_=Object(r["createVNode"])("th",{scope:"row",class:"border-0"},"地址",-1),L={class:"border-0"},A=Object(r["createVNode"])("th",{scope:"row",class:"border-0"},"Email",-1),M={class:"border-0"},T=Object(r["createVNode"])("h3",{class:"h6 bg-primary d-inline-block text-white\n            rounded-top align-self-start px-3 py-2 mb-0"}," 訂單細節 ",-1),F={class:"table-responsive bg-white shadow-sm rounded-bottom border border-info p-3"},I={class:"table"},E=Object(r["createVNode"])("th",{scope:"row",class:"border-0 align-middle"},"訂單編號",-1),z={class:"border-0"},J={class:"d-flex justify-content-between align-items-center"},U=Object(r["createVNode"])("i",{class:"bi bi-clipboard"},null,-1),q=Object(r["createVNode"])("th",{scope:"row",class:"border-0"},"訂單日期",-1),R={class:"border-0"},G={class:"text-secondary"},H=Object(r["createVNode"])("th",{scope:"row",class:"border-0"},"訂單狀態",-1),K={class:"border-0"},P={key:0,class:"bi bi-check"},Q={key:0},W=Object(r["createVNode"])("th",{scope:"row",class:"border-0"},"付款時間",-1),X={class:"border-0"},Y={class:"fs-5 fw-bold"},Z=Object(r["createVNode"])("th",{scope:"row",class:"border-0"},"總金額",-1),ee={class:"border-0"},te={key:0,class:"col-lg-10 text-center text-lg-end py-3 mx-auto"},ce=Object(r["createTextVNode"])(" 確認並付款 "),re=Object(r["createVNode"])("i",{class:"bi bi-check-lg ms-2"},null,-1),oe={key:1,class:"text-end col-lg-10 py-2 mx-auto"},ae=Object(r["createTextVNode"])("查看歷史訂單"),de=Object(r["createTextVNode"])("回到首頁");function se(e,t,c,se,ne,le){var ie=Object(r["resolveComponent"])("Loading"),be=Object(r["resolveComponent"])("router-link");return Object(r["openBlock"])(),Object(r["createBlock"])(r["Fragment"],null,[Object(r["createVNode"])(ie,{active:ne.isLoading,"z-index":100,loader:"dots",color:"#384D48"},null,8,["active"]),Object(r["createVNode"])("div",o,[Object(r["createVNode"])("div",a,[Object(r["createVNode"])("div",d,[Object(r["createVNode"])("div",s,[Object(r["createVNode"])("ol",n,[l,i,Object(r["createVNode"])("li",{class:["col-4",ne.order.is_paid?"done":"active"]},"確認訂單並付款",2)])])]),b,Object(r["createVNode"])("div",u,[Object(r["createVNode"])("div",p,[Object(r["createVNode"])("div",O,[j,Object(r["createVNode"])("div",f,[ne.order.products?(Object(r["openBlock"])(),Object(r["createBlock"])("table",N,[Object(r["createVNode"])("tbody",null,[(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(ne.order.products,(function(t){return Object(r["openBlock"])(),Object(r["createBlock"])("tr",{key:t.id},[Object(r["createVNode"])("td",null,[Object(r["createVNode"])("img",{src:t.product.imageUrl,alt:t.product.title,class:"img-fluid img-size d-block object-fit-cover"},null,8,["src","alt"])]),Object(r["createVNode"])("td",null,Object(r["toDisplayString"])(t.product.title),1),Object(r["createVNode"])("td",null," x "+Object(r["toDisplayString"])(t.qty),1),Object(r["createVNode"])("td",V,[t.final_total!==t.total?(Object(r["openBlock"])(),Object(r["createBlock"])(r["Fragment"],{key:0},[Object(r["createVNode"])("del",h,"$"+Object(r["toDisplayString"])(e.$filters.currency(t.total)),1),m,y],64)):Object(r["createCommentVNode"])("",!0),Object(r["createVNode"])("span",g," $"+Object(r["toDisplayString"])(e.$filters.currency(t.final_total)),1)])])})),128))])])):Object(r["createCommentVNode"])("",!0)])])]),Object(r["createVNode"])("div",v,[x,Object(r["createVNode"])("div",k,[Object(r["createVNode"])("table",w,[ne.order.user?(Object(r["openBlock"])(),Object(r["createBlock"])("tbody",S,[Object(r["createVNode"])("tr",null,[B,Object(r["createVNode"])("td",$,Object(r["toDisplayString"])(ne.order.user.name),1)]),Object(r["createVNode"])("tr",null,[C,Object(r["createVNode"])("td",D,Object(r["toDisplayString"])(ne.order.user.tel),1)]),Object(r["createVNode"])("tr",null,[_,Object(r["createVNode"])("td",L,Object(r["toDisplayString"])(ne.order.user.address),1)]),Object(r["createVNode"])("tr",null,[A,Object(r["createVNode"])("td",M,Object(r["toDisplayString"])(ne.order.user.email),1)])])):Object(r["createCommentVNode"])("",!0)])]),T,Object(r["createVNode"])("div",F,[Object(r["createVNode"])("table",I,[Object(r["createVNode"])("tbody",null,[Object(r["createVNode"])("tr",null,[E,Object(r["createVNode"])("td",z,[Object(r["createVNode"])("div",J,[Object(r["createVNode"])("code",{class:"text-dark mb-0",ref:ne.order.id},Object(r["toDisplayString"])(ne.order.id),513),Object(r["createVNode"])("button",{type:"button",class:"btn btn-link p-0",title:"點擊複製",onClick:t[1]||(t[1]=function(e){return le.copyOrderId(ne.order.id)})},[U])])])]),Object(r["createVNode"])("tr",null,[q,Object(r["createVNode"])("td",R,[Object(r["createVNode"])("time",G,Object(r["toDisplayString"])(new Date(1e3*ne.order.create_at).toLocaleString()),1)])]),Object(r["createVNode"])("tr",null,[H,Object(r["createVNode"])("td",K,[Object(r["createVNode"])("label",{for:"is_paid",class:["form-label d-inline-block w-auto rounded p-1",ne.order.is_paid?"text-primary bg-info":"text-muted"]},[ne.order.is_paid?(Object(r["openBlock"])(),Object(r["createBlock"])("i",P)):Object(r["createCommentVNode"])("",!0),Object(r["createTextVNode"])(" "+Object(r["toDisplayString"])(ne.order.is_paid?"已付款":"未付款"),1)],2)])]),ne.order.is_paid?(Object(r["openBlock"])(),Object(r["createBlock"])("tr",Q,[W,Object(r["createVNode"])("td",X,Object(r["toDisplayString"])(new Date(1e3*ne.order.paid_date).toLocaleString()),1)])):Object(r["createCommentVNode"])("",!0),Object(r["createVNode"])("tr",Y,[Z,Object(r["createVNode"])("td",ee,"$"+Object(r["toDisplayString"])(e.$filters.currency(ne.order.total)),1)])])])])])]),ne.order.is_paid?ne.order.is_paid?(Object(r["openBlock"])(),Object(r["createBlock"])("div",oe,[Object(r["createVNode"])(be,{to:"/orders",class:"btn btn-outline-primary me-3"},{default:Object(r["withCtx"])((function(){return[ae]})),_:1}),Object(r["createVNode"])(be,{to:"/",class:"btn btn-primary"},{default:Object(r["withCtx"])((function(){return[de]})),_:1})])):Object(r["createCommentVNode"])("",!0):(Object(r["openBlock"])(),Object(r["createBlock"])("div",te,[Object(r["createVNode"])("button",{type:"button",class:"btn btn-primary",onClick:t[2]||(t[2]=function(){return le.payOrder&&le.payOrder.apply(le,arguments)})},[ce,re])]))])])],64)}c("99af");var ne={data:function(){return{order:"",isLoading:!1}},inject:["$httpMessageState"],methods:{getOrder:function(){var e=this;this.isLoading=!0;var t=this.$route.params.orderId,c="/api/".concat("hsinyuuu","/order/").concat(t);this.$http.get(c).then((function(t){if(!t.data.success)return e.$httpMessageState(t,"取得訂單資料"),void(e.isLoading=!1);e.order=t.data.order,e.isLoading=!1})).catch((function(t){e.$httpMessageState(t,"連線錯誤"),e.isLoading=!1}))},payOrder:function(){var e=this,t=this.$route.params.orderId,c="/api/".concat("hsinyuuu","/pay/").concat(t);this.$http.post(c).then((function(c){if(!c.data.success)return e.$httpMessageState("付款失敗，請再試一次","付款"),void(e.isLoading=!1);e.$router.push({path:"/checkoutsuccess/".concat(t)})})).catch((function(t){e.$httpMessageState(t,"連線錯誤")}))},copyOrderId:function(e){var t=this.$refs[e];window.getSelection().selectAllChildren(t),document.execCommand("Copy"),this.$httpMessageState({data:{success:!0,message:"已複製訂單編號： ".concat(e)}},"複製訂單編號")}},created:function(){this.$http.defaults.baseURL="https://vue3-course-api.hexschool.io",this.getOrder()}},le=c("6b0d"),ie=c.n(le);const be=ie()(ne,[["render",se]]);t["default"]=be},e8b5:function(e,t,c){var r=c("c6b6");e.exports=Array.isArray||function(e){return"Array"==r(e)}}}]);
//# sourceMappingURL=chunk-6bc642d5.946ebb2c.js.map