!function(e){function n(n){for(var o,i,c=n[0],s=n[1],l=n[2],p=0,f=[];p<c.length;p++)i=c[p],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&f.push(r[i][0]),r[i]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);for(u&&u(n);f.length;)f.shift()();return a.push.apply(a,l||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],o=!0,c=1;c<t.length;c++){var s=t[c];0!==r[s]&&(o=!1)}o&&(a.splice(n--,1),e=i(i.s=t[0]))}return e}var o={},r={3:0},a=[];function i(n){if(o[n])return o[n].exports;var t=o[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t=r[e];if(0!==t)if(t)n.push(t[2]);else{var o=new Promise((function(n,o){t=r[e]=[n,o]}));n.push(t[2]=o);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=function(e){return i.p+"templates/"+({0:"Users/noconnor1/Desktop/niall/template-website/src/pages/404",1:"Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon",2:"Users/noconnor1/Desktop/niall/template-website/src/pages/index",5:"vendors~Users/noconnor1/Desktop/niall/template-website/src/pages/index"}[e]||e)+"."+{0:"07ad03bd",1:"0a9e1801",2:"0fa4426c",5:"146a6ecf"}[e]+".js"}(e);var s=new Error;a=function(n){c.onerror=c.onload=null,clearTimeout(l);var t=r[e];if(0!==t){if(t){var o=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;s.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",s.name="ChunkLoadError",s.type=o,s.request=a,t[1](s)}r[e]=void 0}};var l=setTimeout((function(){a({type:"timeout",target:c})}),12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(n)},i.m=e,i.c=o,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)i.d(t,o,function(n){return e[n]}.bind(null,o));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var c=window.webpackJsonp=window.webpackJsonp||[],s=c.push.bind(c);c.push=n,c=c.slice();for(var l=0;l<c.length;l++)n(c[l]);var u=s;a.push([197,4,6]),t()}({108:function(e,n,t){"use strict";t.d(n,"a",(function(){return b}));var o=t(1),r=t.n(o),a=t(174),i=t.n(a),c=t(109),s=t.n(c),l=t(175),u=t.n(l),p=t(176),f=t.n(p);function g(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function m(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?g(Object(t),!0).forEach((function(n){r()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):g(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var d="Cairo, 'Playfair Display', sans-serif",h={color:"#2a2a2a",fontFamily:"'Darker Grotesque', sans-serif"},b={breakpoints:{tablet:768},navigation:{backgroundColor:"#f7c545",color:"white",fontFamily:h.fontFamily,size:"huge",button:{backgroundColor:"#DEAC2C",color:"white"},logoSize:23,logo:i.a},block1:m({height:700,width:728,paddings:[0,20,0,20],backgroundColor:"white",logo:s.a,headingSize:60,headingLineHeight:66,headingMargins:[40,0,0,0],subHeadingLineHeight:27,subHeadingSize:27,subHeadingMargins:[40,0,40,0],buttonSize:"huge"},h),block2:{height:700,image:u.a},block3:m({},h,{height:650,backgroundColor:"white",fontFamily:d,overlay:{backgroundColor:"white",width:1e3,minHeight:500,top:-210,padding:50,headingSize:60,headingLineHeight:66,headingMargins:[40,0,0,0],headingWeight:800,mainText:{fontSize:22,lineHeight:40,fontWeight:400,margins:[40,0,0,0]},button:{size:"huge",margins:[40,0,0,0]},features:{headerPadding:10,headerFontFamily:"'Josefin Sans', 'Archivo Narrow', sans-serif",headerMargins:[40,0,0,0],headerBackgroundColor:"#f7c545",featuresMargins:[40,0,0,0]}}}),block4:m({},h,{fontFamily:d,height:700,backgroundColor:"#f4f4f2",paddings:[0,20,0,20],heading:{size:50,weight:200,lineHeight:57},subHeading:{size:18,lineHeight:25,weight:400,color:"#686868",margins:[-10,0,0,0]},cardContainer:{width:1e3,margins:[60,0,0,0],paddings:[40,40,40,40]},firstCard:{image:{src:f.a,size:"small"}},button:{size:"large",margins:[40,0,0,0]}}),block5:m({},h,{fontFamily:d,height:700,backgroundColor:"white",paddings:[0,20,0,20],quoteContainerPaddings:[60,0,0,0],card:{width:1e3},quote:{size:50,weight:200,lineHeight:57},author:{size:18,lineHeight:25,weight:400,color:"#686868",margins:[-10,0,0,0]},cardContainer:{width:1e3,margins:[60,0,0,0],paddings:[40,40,40,40]},button:{size:"huge",margins:[40,0,0,0],backgroundColor:"#f7c545"}}),footer:m({},h,{size:20,height:400,paddings:[60,0,0,0],backgroundColor:"#f4f4f2",column1:{imageSrc:s.a,imageSize:"mini"},column2:{color:"#2a2a2a",hoverColor:"#f7c545"},column3:{iconColor:"#f7c545",iconSize:"small"}}),comingSoon:m({},h,{width:800,fontFamily:d,backgroundColor:"#f4f4f2",paddings:[0,20,0,20],headingSize:60,headingLineHeight:66,headingMargins:[40,0,0,0],subHeadingLineHeight:27,subHeadingSize:27,subHeadingMargins:[40,0,40,0],signUpWidth:500,button:{size:"large",margins:[40,0,0,0]}})}},109:function(e,n,t){e.exports=t.p+"static/logoColor.f26a6fdd.png"},114:function(e,n,t){"use strict";var o=t(2),r=t.n(o),a=t(103),i=t.n(a),c=t(10),s=t.n(c),l=t(11),u=t.n(l),p=t(12),f=t.n(p),g=t(13),m=t.n(g),d=t(3),h=t.n(d),b=t(14),v=t.n(b),k=t(1),y=t.n(k),w=t(0),j=t.n(w),O=(t(8),t(140));n.a=function(e){return function(n){function t(){var e,n;s()(this,t);for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return n=f()(this,(e=m()(t)).call.apply(e,[this].concat(r))),y()(h()(n),"handleClick",(function(){var e=n.props,t=e.action,o=e.label,r=e.onClick;Object(O.a)(t,o),r&&r.apply(void 0,arguments)})),n}return v()(t,n),u()(t,[{key:"render",value:function(){var n=this.props,t=(n.action,n.label,n.onClick,i()(n,["action","label","onClick"]));return j.a.createElement(e,r()({},t,{onClick:this.handleClick}))}}]),t}(w.Component)}},115:function(e,n,t){"use strict";var o=t(385);t.d(n,"a",(function(){return o.a}))},117:function(e,n,t){"use strict";var o=t(107);t.d(n,"a",(function(){return o.a}))},120:function(e,n,t){"use strict";t.r(n);var o=t(171),r=[{location:"/Users/noconnor1/Desktop/niall/template-website/node_modules/react-static-plugin-source-filesystem",plugins:[],hooks:{}},{location:"/Users/noconnor1/Desktop/niall/template-website/node_modules/react-static-plugin-reach-router",plugins:[],hooks:t.n(o)()({})},{location:"/Users/noconnor1/Desktop/niall/template-website/node_modules/react-static-plugin-sitemap/dist",plugins:[],hooks:{}},{location:"/Users/noconnor1/Desktop/niall/template-website",plugins:[],hooks:{}}];n.default=r},139:function(e,n,t){"use strict";t.r(n),function(e){t.d(n,"notFoundTemplate",(function(){return d}));var o=t(42),r=t.n(o),a=t(43),i=t.n(a),c=t(0),s=t.n(c),l=t(30),u=t.n(l);Object(l.setHasBabelPlugin)();var p={loading:function(){return null},error:function(e){return console.error(e.error),s.a.createElement("div",null,"An error occurred loading this page's template. More information is available in the console.")},ignoreBabelRename:!0},f=u()(i()({id:"/Users/noconnor1/Desktop/niall/template-website/src/pages/404.js",load:function(){return Promise.all([t.e(0).then(t.bind(null,186))]).then((function(e){return e[0]}))},path:function(){return r.a.join(e,"/Users/noconnor1/Desktop/niall/template-website/src/pages/404.js")},resolve:function(){return 186},chunkName:function(){return"Users/noconnor1/Desktop/niall/template-website/src/pages/404"}}),p);f.template="/Users/noconnor1/Desktop/niall/template-website/src/pages/404.js";var g=u()(i()({id:"/Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon.js",load:function(){return Promise.all([t.e(1).then(t.bind(null,188))]).then((function(e){return e[0]}))},path:function(){return r.a.join(e,"/Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon.js")},resolve:function(){return 188},chunkName:function(){return"Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon"}}),p);g.template="/Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon.js";var m=u()(i()({id:"/Users/noconnor1/Desktop/niall/template-website/src/pages/index.js",load:function(){return Promise.all([Promise.all([t.e(5),t.e(2)]).then(t.bind(null,187))]).then((function(e){return e[0]}))},path:function(){return r.a.join(e,"/Users/noconnor1/Desktop/niall/template-website/src/pages/index.js")},resolve:function(){return 187},chunkName:function(){return"Users/noconnor1/Desktop/niall/template-website/src/pages/index"}}),p);m.template="/Users/noconnor1/Desktop/niall/template-website/src/pages/index.js",n.default={"/Users/noconnor1/Desktop/niall/template-website/src/pages/404.js":f,"/Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon.js":g,"/Users/noconnor1/Desktop/niall/template-website/src/pages/index.js":m};var d="/Users/noconnor1/Desktop/niall/template-website/src/pages/404.js"}.call(this,"/")},140:function(e,n,t){"use strict";t.d(n,"a",(function(){return o}));t(108);var o=function(e,n){var t=document.location.pathname.split("/")[1];console.log({ec:""===t?"landing":t,ea:e,el:n})}},174:function(e,n,t){e.exports=t.p+"static/logo.8080d4ca.png"},175:function(e,n,t){e.exports=t.p+"static/block2Image.fb85441a.webp"},176:function(e,n,t){e.exports=t.p+"static/block4FirstImage.1a0aa49e.png"},18:function(e,n,t){"use strict";t.d(n,"d",(function(){return a})),t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return c}));var o=t(170);t.d(n,"e",(function(){return o.a}));var r=t(84);t.d(n,"a",(function(){return r.a})),t.d(n,"f",(function(){return r.b}));var a=function(e){return"".concat((e/16).toFixed(4),"rem")},i=function(e){return"@media (min-width: ".concat(e,"px)")},c=function(e){return Array.isArray(e)?"".concat(a(e[0])," ").concat(a(e[1])," ").concat(a(e[2])," ").concat(a(e[3])):String(e).split(" ").map((function(e){return a(e).join(" ")}))}},197:function(e,n,t){t(198),t(248),e.exports=t(255)},250:function(e,n,t){var o={".":48,"./":48,"./index":48,"./index.js":48};function r(e){var n=a(e);return t(n)}function a(e){if(!t.o(o,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return o[e]}r.keys=function(){return Object.keys(o)},r.resolve=a,e.exports=r,r.id=250},257:function(e,n,t){"use strict";t.r(n),function(e){var o=t(0),r=t.n(o),a=t(31),i=t.n(a),c=t(184),s=(t(262),t(77));if(n.default=s.a,"undefined"!=typeof document){var l=document.getElementById("root"),u=l.hasChildNodes()?i.a.hydrate:i.a.render,p=function(e){u(r.a.createElement(c.AppContainer,null,r.a.createElement(e,null)),l)};p(s.a),e&&e.hot&&e.hot.accept("./App",(function(){p(s.a)}))}}.call(this,t(258)(e))},77:function(e,n,t){"use strict";var o=t(0),r=t.n(o),a=t(55),i=t(53),c=t(18),s=t(21),l=t.n(s),u=t(34),p=t.n(u),f=t(114),g=t(110),m=t(391),d=t(182),h=t(117),b=["About Us","Services","Products","Sign Up"];function v(){var e=p()(["\n  max-width: "," !important;\n"]);return v=function(){return e},e}function k(){var e=p()(["\n    font-family: "," !important;\n    background-color: "," !important;\n    color: "," !important;\n    display: none !important;\n    margin: 0 !important;\n\n    a {\n        color: "," !important;\n    }\n    \n    "," {\n        display: flex !important;\n    }\n"]);return k=function(){return e},e}var y=Object(c.e)(m.a)(k(),(function(e){return e.theme.navigation.fontFamily}),(function(e){return e.theme.navigation.backgroundColor}),(function(e){return e.theme.navigation.color}),(function(e){return e.theme.navigation.color}),(function(e){var n=e.theme.breakpoints;return Object(c.b)(n.tablet)})),w=Object(c.e)(h.a)(v(),(function(e){var n=e.theme.navigation;return Object(c.d)(n.logoSize)})),j=Object(f.a)(g.a),O=function(e){var n=e.theme.navigation,t=Object(o.useState)({activeItem:"home"}),a=l()(t,2),i=a[0].activeItem,c=a[1],s=function(e,n){var t=n.name;return c({activeItem:t})};return r.a.createElement(y,{secondary:!0,size:n.size},r.a.createElement(j,{name:"logo",active:"logo"===i,onClick:s,action:"navigation-logo-click",href:"/"},r.a.createElement(w,{alt:"idea camels logo",src:n.logo})),r.a.createElement(d.a,{position:"right"},b.map((function(e){return r.a.createElement(j,{key:e,name:e,href:"/coming-soon",active:i===e,onClick:s,action:"".concat(e.replace(" ","-"),"-click").toLowerCase()})}))))},C=t(115);function E(){var e=p()(["\n    background-color: "," !important;\n    color: "," !important;\n\n    &:hover {\n        filter: brightness(0.96)\n    }\n"]);return E=function(){return e},e}function D(){var e=p()(["\n    text-align: center;\n    width: 100%;\n"]);return D=function(){return e},e}function U(){var e=p()(["\n    font-family: "," !important;\n    background-color: "," !important;\n    color: "," !important;\n\n    a {\n        color: "," !important;\n    }\n    \n    "," {\n        display: none !important;\n    }\n"]);return U=function(){return e},e}var x=Object(c.e)(m.a)(U(),(function(e){return e.theme.navigation.fontFamily}),(function(e){return e.theme.navigation.backgroundColor}),(function(e){return e.theme.navigation.color}),(function(e){return e.theme.navigation.color}),(function(e){var n=e.theme.breakpoints;return Object(c.b)(n.tablet)})),P=c.e.div(D()),S=Object(c.e)(C.a)(E(),(function(e){return e.theme.navigation.button.backgroundColor}),(function(e){return e.theme.navigation.button.color})),z=function(e){var n=e.theme.navigation,t=Object(o.useState)({activeItem:"home",isOpen:!1}),a=l()(t,2),i=a[0],c=i.isOpen,s=i.activeItem,u=a[1],p=function(e,n){var t=n.name;return u({activeItem:t})};return r.a.createElement(x,{secondary:!0,size:n.size,stackable:!0},r.a.createElement(g.a,null,r.a.createElement(S,{fluid:!0,onClick:function(){return u({isOpen:!c})},icon:"align justify"})),c&&b.map((function(e){return r.a.createElement(g.a,{key:e,name:e,active:s==={o:e},onClick:p},r.a.createElement(P,null,e))})))},H=Object(c.f)((function(e){var n=e.theme;return[r.a.createElement(O,{theme:n}),r.a.createElement(z,{theme:n})]})),F=t(108);Object(a.addPrefetchExcludes)(["dynamic"]);n.a=function(){return r.a.createElement(c.a,{theme:F.a},r.a.createElement(a.Root,null,r.a.createElement(H,null),"undefined"!=typeof document&&r.a.createElement("div",{className:"content"},r.a.createElement(r.a.Suspense,{fallback:r.a.createElement("em",null,"Loading...")},r.a.createElement(i.Router,null,r.a.createElement(a.Routes,{path:"*"}))))))}}});