(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2fcb5385"],{"161c":function(e,t,r){"use strict";r("36fa")},"1dde":function(e,t,r){var n=r("d039"),c=r("b622"),o=r("2d00"),a=c("species");e.exports=function(e){return o>=51||!n((function(){var t=[],r=t.constructor={};return r[a]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"36fa":function(e,t,r){},"65f0":function(e,t,r){var n=r("861d"),c=r("e8b5"),o=r("b622"),a=o("species");e.exports=function(e,t){var r;return c(e)&&(r=e.constructor,"function"!=typeof r||r!==Array&&!c(r.prototype)?n(r)&&(r=r[a],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===t?0:t)}},8418:function(e,t,r){"use strict";var n=r("c04e"),c=r("9bf2"),o=r("5c6c");e.exports=function(e,t,r){var a=n(t);a in e?c.f(e,a,o(0,r)):e[a]=r}},"99af":function(e,t,r){"use strict";var n=r("23e7"),c=r("d039"),o=r("e8b5"),a=r("861d"),s=r("7b0b"),i=r("50c4"),u=r("8418"),d=r("65f0"),l=r("1dde"),f=r("b622"),b=r("2d00"),p=f("isConcatSpreadable"),v=9007199254740991,m="Maximum allowed index exceeded",g=b>=51||!c((function(){var e=[];return e[p]=!1,e.concat()[0]!==e})),h=l("concat"),j=function(e){if(!a(e))return!1;var t=e[p];return void 0!==t?!!t:o(e)},w=!g||!h;n({target:"Array",proto:!0,forced:w},{concat:function(e){var t,r,n,c,o,a=s(this),l=d(a,0),f=0;for(t=-1,n=arguments.length;t<n;t++)if(o=-1===t?a:arguments[t],j(o)){if(c=i(o.length),f+c>v)throw TypeError(m);for(r=0;r<c;r++,f++)r in o&&u(l,f,o[r])}else{if(f>=v)throw TypeError(m);u(l,f++,o)}return l.length=f,l}})},a55b:function(e,t,r){"use strict";r.r(t);var n=r("7a23"),c=Object(n["M"])("data-v-cc4c71d8");Object(n["v"])("data-v-cc4c71d8");var o={class:"login row justify-content-center align-items-center h-100"},a={class:"col-8 col-md-6 col-lg-4"},s=Object(n["g"])("h1",{class:"text-center"}," 請先登入 ",-1),i={action:""},u={class:"mb-3"},d=Object(n["g"])("label",{for:"email",class:"form-label"},"Email",-1),l={class:"mb-3"},f=Object(n["g"])("label",{for:"password",class:"form-label"},"Password",-1),b={class:"d-grid"};Object(n["t"])();var p=c((function(e,t,r,c,p,v){return Object(n["s"])(),Object(n["d"])("div",o,[Object(n["g"])("div",a,[s,Object(n["g"])("form",i,[Object(n["g"])("div",u,[d,Object(n["K"])(Object(n["g"])("input",{type:"email",class:"form-control",id:"email",placeholder:"name@example.com","onUpdate:modelValue":t[1]||(t[1]=function(e){return p.user.username=e}),required:""},null,512),[[n["G"],p.user.username]])]),Object(n["g"])("div",l,[f,Object(n["K"])(Object(n["g"])("input",{type:"password",class:"form-control",id:"password",placeholder:"請輸入密碼","onUpdate:modelValue":t[2]||(t[2]=function(e){return p.user.password=e}),required:""},null,512),[[n["G"],p.user.password]])]),Object(n["g"])("div",b,[Object(n["g"])("button",{type:"button",class:"btn btn-primary mb-3",onClick:t[3]||(t[3]=function(){return v.login&&v.login.apply(v,arguments)})},"登入")])])])])})),v=(r("99af"),r("bc3a")),m=r.n(v),g={data:function(){return{user:{}}},methods:{login:function(){var e=this;m.a.defaults.baseURL="https://dev-vue-course-api.hexschool.io";var t="/admin/signin";m.a.post(t,this.user).then((function(t){if(t.data.success){var r=t.data,n=r.token,c=r.expired;document.cookie="token=".concat(n,";expired=").concat(new Date(c)),e.$router.push("/dashboard")}else alert(t.data.error.message)})).catch((function(e){console.log(e)}))}}};r("161c");g.render=p,g.__scopeId="data-v-cc4c71d8";t["default"]=g},e8b5:function(e,t,r){var n=r("c6b6");e.exports=Array.isArray||function(e){return"Array"==n(e)}}}]);
//# sourceMappingURL=chunk-2fcb5385.f9576ce8.js.map