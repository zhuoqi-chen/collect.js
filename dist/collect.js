!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=3)}([function(e,t,n){var r=new(n(2));e.exports=r},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r);function i(e){if(e.id)return"#"+e.id;var t=e.nodeName.toLowerCase();return e.className?t+"."+e.className.split(" ").sort().join("."):t}n.d(t,"collect",function(){return c});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var s=2,u=1,c=new(function(){function e(t){var n=t.clientId,r=void 0===n?"":n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.clientId=r,this.userInfo={},this._init()}return a(e,[{key:"_init",value:function(){this._afterEnter(),this._addEventListener()}},{key:"_addEventListener",value:function(){var e=this,t=this,n=window.onunload||function(){};window.onunload=function(){e._beforeLeave(),n()};var r=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(e,n,o,i,a){t._dispatch("http",{url:n}),r.call(this,e,n,o,i,a)},document.body.onclick=function(t){var n=t.target,r=n.nodeName,o=n.attributes;e._dispatch("click",{DOMPath:function(e){for(var t=[];e.parentNode&&(t.unshift(i(e)),!e.id);)e=e.parentNode;return t.join(" > ")}(n),DOMRect:n.getBoundingClientRect()}),"a"===r.toLowerCase()&&o&&o.target&&"_blank"===o.target.value.toLowerCase()&&e._beforeLeave(),e._preHandleBehaviors(),console.log(e.behaviors)}}},{key:"_resetData",value:function(){console.log("_resetData"),this.startTime=Date.now(),this.behaviors=[]}},{key:"_beforeLeave",value:function(){console.log("_beforeLeave"),this._saveData()}},{key:"_afterEnter",value:function(){console.log("_afterEnter"),this._getData(),this._resetData()}},{key:"_preHandleBehaviors",value:function(){var e=[];return this.behaviors.reduce(function(t,n){return t&&"http"===t.event&&"click"===n.event&&n.timestamp-t.timestamp<10&&n.weight<s&&(n.weight=s,n.data.requestUrl=t.data.url),"click"===n.event&&e.push(n),n},null),e}},{key:"_saveData",value:function(){console.log("_saveData");var e=window.location.href,t=this.clientId,n=void 0===t?null:t,r=this.userId,o=void 0===r?null:r,i=this._preHandleBehaviors();if(i.length&&n){var a=Date.now(),s={time:a,stayTime:a-this.startTime,userId:o,behaviors:i};window.localStorage.setItem(encodeURIComponent(e),JSON.stringify(s))}}},{key:"_getData",value:function(){console.log("_getData");var e=document.referrer;if(e){var t=encodeURIComponent(e),n=null;try{n=JSON.parse(window.localStorage.getItem(t))}catch(e){return}if(n){var r=Date.now()-n.time<5e6,o=window.location.href;r&&(n.referrer=e,n.target=o,this._post(n),window.localStorage.removeItem(t))}}}},{key:"_post",value:function(e){return console.log("_post",e),o.a.post("http://192.168.8.150:3000/projects/"+this.clientId+"/log",e)}},{key:"_dispatch",value:function(e,t){arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.behaviors.push({event:e,weight:u,timestamp:Date.now(),data:t})}},{key:"config",value:function(e){var t=e.clientId,n=e.userId;t&&(this.clientId=t),n&&(this.userId=n)}}]),e}())({clientId:"a58f9c87-02ff-47ec-887b-adee73e4161b"})},function(e,t,n){var r;r=function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports={type:function(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()},isObject:function(e,t){return t?"object"===this.type(e):e&&"object"===(void 0===e?"undefined":r(e))},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},trim:function(e){return e.replace(/(^\s*)|(\s*$)/g,"")},encode:function(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")},formatParams:function(e){var t="",n=!0,o=this;if("object"!=(void 0===e?"undefined":r(e)))return e;return function e(r,i){var a=o.encode,s=o.type(r);if("array"==s)r.forEach(function(t,n){e(t,i+"%5B%5D")});else if("object"==s)for(var u in r)e(r[u],i?i+"%5B"+a(u)+"%5D":a(u));else n||(t+="&"),n=!1,t+=i+"="+a(r)}(e,""),t},merge:function(e,t){for(var n in t)e.hasOwnProperty(n)?this.isObject(t[n],1)&&this.isObject(e[n],1)&&this.merge(e[n],t[n]):e[n]=t[n];return e}}},,function(e,t,n){var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var o=n(0),i="undefined"!=typeof document,a=function(){function e(t){function n(e){var t;o.merge(e,{lock:function(){t||(e.p=new Promise(function(e){t=e}))},unlock:function(){t&&(t(),e.p=t=null)}})}!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.engine=t||XMLHttpRequest,this.default=this;var r=this.interceptors={response:{use:function(e,t){this.handler=e,this.onerror=t}},request:{use:function(e){this.handler=e}}},i=r.request;n(r.response),n(i),this.config={method:"GET",baseURL:"",headers:{},timeout:0,parseJson:!0,withCredentials:!1}}return r(e,[{key:"request",value:function(e,t,n){var r=this,a=new this.engine,s="Content-Type",u=s.toLowerCase(),c=this.interceptors,f=c.request,l=c.response,p=f.handler,d=new Promise(function(c,d){function h(e){return e&&e.then&&e.catch}function v(e,t){e?e.then(function(){t()}):t()}o.isObject(e)&&(e=(n=e).url),(n=n||{}).headers=n.headers||{},v(f.p,function(){o.merge(n,r.config);var m=n.headers;m[s]=m[s]||m[u]||"",delete m[u],n.body=t||n.body,e=o.trim(e||""),n.method=n.method.toUpperCase(),n.url=e;var y=n;p&&(y=p.call(f,n,Promise)||n),h(y)||(y=Promise.resolve(y)),y.then(function(r){r===n?function(n){t=n.body,e=o.trim(n.url);var r=o.trim(n.baseURL||"");if(e||!i||r||(e=location.href),0!==e.indexOf("http")){var u="/"===e[0];if(!r&&i){var f=location.pathname.split("/");f.pop(),r=location.protocol+"//"+location.host+(u?"":f.join("/"))}if("/"!==r[r.length-1]&&(r+="/"),e=r+(u?e.substr(1):e),i){var p=document.createElement("a");p.href=e,e=p.href}}var m=o.trim(n.responseType||"");a.withCredentials=!!n.withCredentials;var y="GET"===n.method;y&&t&&("string"!==o.type(t)&&(t=o.formatParams(t)),e+=(-1===e.indexOf("?")?"?":"&")+t),a.open(n.method,e);try{a.timeout=n.timeout||0,"stream"!==m&&(a.responseType=m)}catch(e){}if(!y){var g="application/x-www-form-urlencoded";o.trim((n.headers[s]||"").toLowerCase())===g?t=o.formatParams(t):o.isFormData(t)||-1===["object","array"].indexOf(o.type(t))||(g="application/json;charset=utf-8",t=JSON.stringify(t)),n.headers[s]=g}for(var b in n.headers)if(b!==s||!o.isFormData(t)&&t&&!y)try{a.setRequestHeader(b,n.headers[b])}catch(e){}else delete n.headers[b];function w(e,t,r){v(l.p,function(){if(e){r&&(t.request=n);var o=e.call(l,t,Promise);t=void 0===o?t:o}h(t)||(t=Promise[0===r?"resolve":"reject"](t)),t.then(function(e){c(e)}).catch(function(e){d(e)})})}function _(e){e.engine=a,w(l.onerror,e,-1)}function k(e,t){this.message=e,this.status=t}a.onload=function(){var e=a.response||a.responseText;n.parseJson&&-1!==(a.getResponseHeader(s)||"").indexOf("json")&&!o.isObject(e)&&(e=JSON.parse(e));var t={},r=(a.getAllResponseHeaders()||"").split("\r\n");r.pop(),r.forEach(function(e){var n=e.split(":")[0];t[n]=a.getResponseHeader(n)});var i=a.status,u=a.statusText,c={data:e,headers:t,status:i,statusText:u};if(o.merge(c,a._response),i>=200&&i<300||304===i)c.engine=a,c.request=n,w(l.handler,c,0);else{var f=new k(u,i);f.response=c,_(f)}},a.onerror=function(e){_(new k(e.msg||"Network Error",0))},a.ontimeout=function(){_(new k("timeout [ "+a.timeout+"ms ]",1))},a._options=n,setTimeout(function(){a.send(y?null:t)},0)}(r):c(r)},function(e){d(e)})})});return d.engine=a,d}},{key:"all",value:function(e){return Promise.all(e)}},{key:"spread",value:function(e){return function(t){return e.apply(null,t)}}},{key:"lock",value:function(){this.interceptors.request.lock()}},{key:"unlock",value:function(){this.interceptors.request.unlock()}}]),e}();a.default=a,["get","post","put","patch","head","delete"].forEach(function(e){a.prototype[e]=function(t,n,r){return this.request(t,n,o.merge({method:e},r))}}),e.exports=a}])},e.exports=r()},function(e,t,n){e.exports=n(1)}])});
//# sourceMappingURL=collect.js.map