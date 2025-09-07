const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-C6WG9ifC.js","assets/router-B5VeUpr9.js","assets/vendor-DMBppH6t.js","assets/truck-LVb1-fVr.js","assets/anchor-DkhLQJKY.js","assets/animation-Agc6SoMy.js","assets/chevron-right-DpcqOf13.js","assets/phone-CXOH19Le.js","assets/users-B2FHgbtY.js","assets/utils-B5GYf9PD.js","assets/Login-v9tEcPBA.js","assets/user-BHTD4cFH.js","assets/Dashboard-DVGQTA_m.js","assets/Vessels-CM6ssNJf.js","assets/VesselDetail-BxJ67e5T.js","assets/NotFound-Dtk122jz.js","assets/arrow-left-C30gamW7.js","assets/About-DSf4vtxh.js","assets/globe-DzotZ5He.js","assets/calendar-CoFD0KYX.js","assets/Contact-BXj_i_IB.js","assets/EServices-C235dwiB.js","assets/search-yjNYPQHe.js","assets/EServiceDetail-B5EWx4Ua.js","assets/Tracking-CKPLX0wx.js","assets/VesselDataEntry-Gb9-JP6C.js","assets/forms-iUPkNky-.js"])))=>i.map(i=>d[i]);
var ge=Object.defineProperty;var ve=(e,t,r)=>t in e?ge(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var P=(e,t,r)=>ve(e,typeof t!="symbol"?t+"":t,r);import{r as d,b as be,a as g}from"./vendor-DMBppH6t.js";import{u as re,B as je,R as we,a as x,N as Ee}from"./router-B5VeUpr9.js";import{a as Ne}from"./utils-B5GYf9PD.js";import{A as se,m as L}from"./animation-Agc6SoMy.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=r(i);fetch(i.href,n)}})();var ae={exports:{}},z={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ke=d,Ae=Symbol.for("react.element"),_e=Symbol.for("react.fragment"),Re=Object.prototype.hasOwnProperty,Oe=ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Le={key:!0,ref:!0,__self:!0,__source:!0};function oe(e,t,r){var a,i={},n=null,o=null;r!==void 0&&(n=""+r),t.key!==void 0&&(n=""+t.key),t.ref!==void 0&&(o=t.ref);for(a in t)Re.call(t,a)&&!Le.hasOwnProperty(a)&&(i[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)i[a]===void 0&&(i[a]=t[a]);return{$$typeof:Ae,type:e,key:n,ref:o,props:i,_owner:Oe.current}}z.Fragment=_e;z.jsx=oe;z.jsxs=oe;ae.exports=z;var s=ae.exports,F={},X=be;F.createRoot=X.createRoot,F.hydrateRoot=X.hydrateRoot;const Ce="modulepreload",Ie=function(e){return"/"+e},J={},j=function(t,r,a){let i=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(r.map(l=>{if(l=Ie(l),l in J)return;J[l]=!0;const u=l.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${m}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":Ce,u||(p.as="script"),p.crossOrigin="",p.href=l,c&&p.setAttribute("nonce",c),document.head.appendChild(p),u)return new Promise((h,y)=>{p.addEventListener("load",h),p.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function n(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return i.then(o=>{for(const c of o||[])c.status==="rejected"&&n(c.reason);return t().catch(n)})};let Pe={data:""},Te=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Pe,$e=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,De=/\/\*[^]*?\*\/|  +/g,Q=/\n+/g,_=(e,t)=>{let r="",a="",i="";for(let n in e){let o=e[n];n[0]=="@"?n[1]=="i"?r=n+" "+o+";":a+=n[1]=="f"?_(o,n):n+"{"+_(o,n[1]=="k"?"":t)+"}":typeof o=="object"?a+=_(o,t?t.replace(/([^,])+/g,c=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,c):c?c+" "+l:l)):n):o!=null&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=_.p?_.p(n,o):n+":"+o+";")}return r+(t&&i?t+"{"+i+"}":i)+a},N={},ie=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+ie(e[r]);return t}return e},Se=(e,t,r,a,i)=>{let n=ie(e),o=N[n]||(N[n]=(l=>{let u=0,m=11;for(;u<l.length;)m=101*m+l.charCodeAt(u++)>>>0;return"go"+m})(n));if(!N[o]){let l=n!==e?e:(u=>{let m,p,h=[{}];for(;m=$e.exec(u.replace(De,""));)m[4]?h.shift():m[3]?(p=m[3].replace(Q," ").trim(),h.unshift(h[0][p]=h[0][p]||{})):h[0][m[1]]=m[2].replace(Q," ").trim();return h[0]})(e);N[o]=_(i?{["@keyframes "+o]:l}:l,r?"":"."+o)}let c=r&&N.g?N.g:null;return r&&(N.g=N[o]),((l,u,m,p)=>{p?u.data=u.data.replace(p,l):u.data.indexOf(l)===-1&&(u.data=m?l+u.data:u.data+l)})(N[o],t,a,c),o},ze=(e,t,r)=>e.reduce((a,i,n)=>{let o=t[n];if(o&&o.call){let c=o(r),l=c&&c.props&&c.props.className||/^go/.test(c)&&c;o=l?"."+l:c&&typeof c=="object"?c.props?"":_(c,""):c===!1?"":c}return a+i+(o??"")},"");function V(e){let t=this||{},r=e.call?e(t.p):e;return Se(r.unshift?r.raw?ze(r,[].slice.call(arguments,1),t.p):r.reduce((a,i)=>Object.assign(a,i&&i.call?i(t.p):i),{}):r,Te(t.target),t.g,t.o,t.k)}let ne,H,W;V.bind({g:1});let A=V.bind({k:1});function Ve(e,t,r,a){_.p=t,ne=e,H=r,W=a}function R(e,t){let r=this||{};return function(){let a=arguments;function i(n,o){let c=Object.assign({},n),l=c.className||i.className;r.p=Object.assign({theme:H&&H()},c),r.o=/ *go\d+/.test(l),c.className=V.apply(r,a)+(l?" "+l:"");let u=e;return e[0]&&(u=c.as||e,delete c.as),W&&u[0]&&W(c),ne(u,c)}return i}}var Me=e=>typeof e=="function",S=(e,t)=>Me(e)?e(t):e,Ue=(()=>{let e=0;return()=>(++e).toString()})(),le=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Be=20,G="default",ce=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(o=>o.id===t.toast.id?{...o,...t.toast}:o)};case 2:let{toast:a}=t;return ce(e,{type:e.toasts.find(o=>o.id===a.id)?1:0,toast:a});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(o=>o.id===i||i===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(o=>o.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+n}))}}},D=[],de={toasts:[],pausedAt:void 0,settings:{toastLimit:Be}},E={},ue=(e,t=G)=>{E[t]=ce(E[t]||de,e),D.forEach(([r,a])=>{r===t&&a(E[t])})},pe=e=>Object.keys(E).forEach(t=>ue(e,t)),qe=e=>Object.keys(E).find(t=>E[t].toasts.some(r=>r.id===e)),M=(e=G)=>t=>{ue(t,e)},Fe={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},He=(e={},t=G)=>{let[r,a]=d.useState(E[t]||de),i=d.useRef(E[t]);d.useEffect(()=>(i.current!==E[t]&&a(E[t]),D.push([t,a]),()=>{let o=D.findIndex(([c])=>c===t);o>-1&&D.splice(o,1)}),[t]);let n=r.toasts.map(o=>{var c,l,u;return{...e,...e[o.type],...o,removeDelay:o.removeDelay||((c=e[o.type])==null?void 0:c.removeDelay)||(e==null?void 0:e.removeDelay),duration:o.duration||((l=e[o.type])==null?void 0:l.duration)||(e==null?void 0:e.duration)||Fe[o.type],style:{...e.style,...(u=e[o.type])==null?void 0:u.style,...o.style}}});return{...r,toasts:n}},We=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||Ue()}),C=e=>(t,r)=>{let a=We(t,e,r);return M(a.toasterId||qe(a.id))({type:2,toast:a}),a.id},f=(e,t)=>C("blank")(e,t);f.error=C("error");f.success=C("success");f.loading=C("loading");f.custom=C("custom");f.dismiss=(e,t)=>{let r={type:3,toastId:e};t?M(t)(r):pe(r)};f.dismissAll=e=>f.dismiss(void 0,e);f.remove=(e,t)=>{let r={type:4,toastId:e};t?M(t)(r):pe(r)};f.removeAll=e=>f.remove(void 0,e);f.promise=(e,t,r)=>{let a=f.loading(t.loading,{...r,...r==null?void 0:r.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let n=t.success?S(t.success,i):void 0;return n?f.success(n,{id:a,...r,...r==null?void 0:r.success}):f.dismiss(a),i}).catch(i=>{let n=t.error?S(t.error,i):void 0;n?f.error(n,{id:a,...r,...r==null?void 0:r.error}):f.dismiss(a)}),e};var Ke=1e3,Ge=(e,t="default")=>{let{toasts:r,pausedAt:a}=He(e,t),i=d.useRef(new Map).current,n=d.useCallback((p,h=Ke)=>{if(i.has(p))return;let y=setTimeout(()=>{i.delete(p),o({type:4,toastId:p})},h);i.set(p,y)},[]);d.useEffect(()=>{if(a)return;let p=Date.now(),h=r.map(y=>{if(y.duration===1/0)return;let I=(y.duration||0)+y.pauseDuration-(p-y.createdAt);if(I<0){y.visible&&f.dismiss(y.id);return}return setTimeout(()=>f.dismiss(y.id,t),I)});return()=>{h.forEach(y=>y&&clearTimeout(y))}},[r,a,t]);let o=d.useCallback(M(t),[t]),c=d.useCallback(()=>{o({type:5,time:Date.now()})},[o]),l=d.useCallback((p,h)=>{o({type:1,toast:{id:p,height:h}})},[o]),u=d.useCallback(()=>{a&&o({type:6,time:Date.now()})},[a,o]),m=d.useCallback((p,h)=>{let{reverseOrder:y=!1,gutter:I=8,defaultPosition:Y}=h||{},U=r.filter(w=>(w.position||Y)===(p.position||Y)&&w.height),xe=U.findIndex(w=>w.id===p.id),Z=U.filter((w,B)=>B<xe&&w.visible).length;return U.filter(w=>w.visible).slice(...y?[Z+1]:[0,Z]).reduce((w,B)=>w+(B.height||0)+I,0)},[r]);return d.useEffect(()=>{r.forEach(p=>{if(p.dismissed)n(p.id,p.removeDelay);else{let h=i.get(p.id);h&&(clearTimeout(h),i.delete(p.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:l,startPause:c,endPause:u,calculateOffset:m}}},Ye=A`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ze=A`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Xe=A`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Je=R("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ye} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ze} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Xe} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Qe=A`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,et=R("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Qe} 1s linear infinite;
`,tt=A`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,rt=A`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,st=R("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${tt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${rt} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,at=R("div")`
  position: absolute;
`,ot=R("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,it=A`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,nt=R("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${it} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,lt=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return t!==void 0?typeof t=="string"?d.createElement(nt,null,t):t:r==="blank"?null:d.createElement(ot,null,d.createElement(et,{...a}),r!=="loading"&&d.createElement(at,null,r==="error"?d.createElement(Je,{...a}):d.createElement(st,{...a})))},ct=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,dt=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,ut="0%{opacity:0;} 100%{opacity:1;}",pt="0%{opacity:1;} 100%{opacity:0;}",mt=R("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,ht=R("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ft=(e,t)=>{let r=e.includes("top")?1:-1,[a,i]=le()?[ut,pt]:[ct(r),dt(r)];return{animation:t?`${A(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${A(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},yt=d.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?ft(e.position||t||"top-center",e.visible):{opacity:0},n=d.createElement(lt,{toast:e}),o=d.createElement(ht,{...e.ariaProps},S(e.message,e));return d.createElement(mt,{className:e.className,style:{...i,...r,...e.style}},typeof a=="function"?a({icon:n,message:o}):d.createElement(d.Fragment,null,n,o))});Ve(d.createElement);var xt=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let n=d.useCallback(o=>{if(o){let c=()=>{let l=o.getBoundingClientRect().height;a(e,l)};c(),new MutationObserver(c).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return d.createElement("div",{ref:n,className:t,style:r},i)},gt=(e,t)=>{let r=e.includes("top"),a=r?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:le()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...a,...i}},vt=V`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,T=16,bt=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:n,containerStyle:o,containerClassName:c})=>{let{toasts:l,handlers:u}=Ge(r,n);return d.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:T,left:T,right:T,bottom:T,pointerEvents:"none",...o},className:c,onMouseEnter:u.startPause,onMouseLeave:u.endPause},l.map(m=>{let p=m.position||t,h=u.calculateOffset(m,{reverseOrder:e,gutter:a,defaultPosition:t}),y=gt(p,h);return d.createElement(xt,{id:m.id,key:m.id,onHeightUpdate:u.updateHeight,className:m.visible?vt:"",style:y},m.type==="custom"?S(m.message,m):i?i(m):d.createElement(yt,{toast:m,position:p}))}))},K=f;const q={},jt=(q==null?void 0:q.VITE_API_URL)||"http://localhost:5000",wt=()=>{const e=Ne.create({baseURL:`${jt}/api`,timeout:3e4,withCredentials:!0,headers:{"Content-Type":"application/json",Accept:"application/json"}});return e.interceptors.request.use(t=>(t.params={...t.params,_t:Date.now()},t),t=>Promise.reject(t)),e.interceptors.response.use(t=>t,t=>{var a;const r=Et(t);return((a=t.response)==null?void 0:a.status)!==401&&K.error(r.message),Promise.reject(r)}),e},Et=e=>{var t,r,a,i;if((t=e.response)!=null&&t.data){const n=e.response.data;return{code:((r=n.error)==null?void 0:r.code)||"API_ERROR",message:((a=n.error)==null?void 0:a.message)||n.message||"An unexpected error occurred",details:(i=n.error)==null?void 0:i.details}}return e.code==="ECONNABORTED"?{code:"TIMEOUT_ERROR",message:"Request timed out. Please check your connection and try again."}:e.code==="ERR_NETWORK"?{code:"NETWORK_ERROR",message:"Network error. Please check your internet connection."}:{code:"UNKNOWN_ERROR",message:e.message||"An unexpected error occurred"}},b=wt(),$={login:async e=>{const t=await b.post("/auth/login",e);return t.data.data||t.data},logout:async()=>{const e=await b.post("/auth/logout");return e.data.data||e.data},getMe:async()=>{const e=await b.get("/auth/me");return e.data.data||e.data},refreshToken:async()=>{const e=await b.post("/auth/refresh");return e.data.data||e.data},checkAuth:async()=>{const e=await b.get("/auth/check");return e.data.data||e.data}},sr={getVessels:async(e={})=>(await b.get("/vessels",{params:e})).data,getVessel:async e=>{const t=await b.get(`/vessels/${e}`);return t.data.data||t.data},createVessel:async e=>{const t=await b.post("/vessels",e);return t.data.data||t.data},updateVessel:async(e,t)=>{const r=await b.put(`/vessels/${e}`,t);return r.data.data||r.data},deleteVessel:async e=>{const t=await b.delete(`/vessels/${e}`);return t.data.data||t.data},bulkDelete:async e=>{const t=await b.delete("/vessels/bulk",{data:{ids:e}});return t.data.data||t.data},getStats:async()=>(await b.get("/vessels/stats")).data},me=d.createContext(null),Nt=({children:e})=>{const[t,r]=d.useState({user:null,isAuthenticated:!1,isLoading:!0}),a=re(),i=d.useCallback(async l=>{try{r(m=>({...m,isLoading:!0}));const u=await $.login(l);r({user:u.user,isAuthenticated:!0,isLoading:!1}),K.success(`Welcome back, ${u.user.userId}!`),a("/vessel-data-entry",{replace:!0})}catch(u){throw r({user:null,isAuthenticated:!1,isLoading:!1}),u}},[a]),n=d.useCallback(async()=>{try{await $.logout()}catch(l){console.warn("Logout API call failed:",l)}finally{r({user:null,isAuthenticated:!1,isLoading:!1}),K.success("Logged out successfully"),a("/login",{replace:!0})}},[a]),o=d.useCallback(async()=>{try{const l=await $.refreshToken();r(u=>({...u,user:l.user,isAuthenticated:!0}))}catch(l){throw r({user:null,isAuthenticated:!1,isLoading:!1}),l}},[]),c=d.useCallback(async()=>{try{const l=await $.checkAuth();r({user:l.user,isAuthenticated:l.authenticated,isLoading:!1})}catch{r({user:null,isAuthenticated:!1,isLoading:!1})}},[]);return d.useEffect(()=>{c()},[c]),d.useEffect(()=>{if(t.isAuthenticated){const l=setInterval(()=>{o().catch(()=>{})},5184e5);return()=>clearInterval(l)}},[t.isAuthenticated,o]),s.jsx(me.Provider,{value:{auth:t,login:i,logout:n,refreshToken:o,checkAuth:c},children:e})},he=()=>{const e=d.useContext(me);if(!e)throw new Error("useAuth must be used within an AuthProvider");return e},ar=(e="/login")=>{const{auth:t}=he(),r=re();return d.useEffect(()=>{!t.isLoading&&!t.isAuthenticated&&r(e,{replace:!0})},[t.isAuthenticated,t.isLoading,r,e]),t};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var kt={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),O=(e,t)=>{const r=d.forwardRef(({color:a="currentColor",size:i=24,strokeWidth:n=2,absoluteStrokeWidth:o,className:c="",children:l,...u},m)=>d.createElement("svg",{ref:m,...kt,width:i,height:i,stroke:a,strokeWidth:o?Number(n)*24/Number(i):n,className:["lucide",`lucide-${At(e)}`,c].join(" "),...u},[...t.map(([p,h])=>d.createElement(p,h)),...Array.isArray(l)?l:[l]]));return r.displayName=`${e}`,r};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=O("AlertTriangle",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=O("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=O("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=O("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=O("Ship",[["path",{d:"M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"iegodh"}],["path",{d:"M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76",key:"fp8vka"}],["path",{d:"M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6",key:"qpkstq"}],["path",{d:"M12 10v4",key:"1kjpxc"}],["path",{d:"M12 2v3",key:"qbqxhf"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=O("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),It=()=>{const[e,t]=d.useState(!1),{auth:{isAuthenticated:r},logout:a}=he(),i=async()=>{try{await a(),window.location.href="/"}catch(n){console.error("Logout failed:",n)}};return s.jsxs("nav",{className:"bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200",children:[s.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:s.jsxs("div",{className:"flex justify-between items-center h-16",children:[s.jsx("div",{className:"flex items-center",children:s.jsxs("a",{href:"/",className:"flex items-center",children:[s.jsx("div",{className:"bg-primary-600 p-2 rounded-lg mr-3",children:s.jsx(Lt,{className:"h-8 w-8 text-white"})}),s.jsxs("div",{children:[s.jsx("div",{className:"text-xl font-bold text-gray-900",children:"Yaaseen Shipping Lines"}),s.jsx("div",{className:"text-xs text-gray-600",children:"United Oriental Steamship Co."})]})]})}),s.jsxs("div",{className:"hidden lg:flex items-center space-x-1",children:[s.jsx("a",{href:"/",className:"px-3 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors",children:"HOME"}),s.jsx("a",{href:"/about",className:"px-3 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors",children:"ABOUT"}),s.jsx("a",{href:"/eservices",className:"px-3 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors",children:"SERVICES"}),s.jsx("a",{href:"/contact",className:"px-3 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors",children:"CONTACT"}),s.jsx("a",{href:"/tracking",className:"px-3 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors",children:"TRACKING"})]}),s.jsx("div",{className:"hidden lg:flex items-center",children:r?s.jsxs("button",{onClick:i,className:"flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors",children:[s.jsx(ee,{className:"w-4 h-4 mr-2"}),"LOGOUT"]}):s.jsxs("a",{href:"/login",className:"flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors",children:[s.jsx(ee,{className:"w-4 h-4 mr-2"}),"LOGIN"]})}),s.jsx("button",{onClick:()=>t(!e),className:"lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors",children:e?s.jsx(Ct,{className:"w-6 h-6"}):s.jsx(Rt,{className:"w-6 h-6"})})]})}),s.jsx(se,{children:e&&s.jsx(L.div,{className:"lg:hidden bg-white border-t border-gray-200",initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.3},children:s.jsxs("div",{className:"px-4 py-6 space-y-4",children:[s.jsx("a",{href:"/",className:"block text-gray-700 hover:text-primary-600 font-medium",children:"HOME"}),s.jsx("a",{href:"/about",className:"block text-gray-700 hover:text-primary-600 font-medium",children:"ABOUT"}),s.jsx("a",{href:"/eservices",className:"block text-gray-700 hover:text-primary-600 font-medium",children:"SERVICES"}),s.jsx("a",{href:"/contact",className:"block text-gray-700 hover:text-primary-600 font-medium",children:"CONTACT"}),s.jsx("a",{href:"/tracking",className:"block text-gray-700 hover:text-primary-600 font-medium",children:"TRACKING"}),s.jsx("div",{className:"pt-4 border-t border-gray-200 space-y-3",children:r?s.jsxs(s.Fragment,{children:[s.jsx("a",{href:"/dashboard",className:"flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors w-full",children:"Dashboard"}),s.jsx("button",{onClick:i,className:"flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors w-full",children:"Logout"})]}):s.jsx("a",{href:"/login",className:"flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors w-full",children:"LOGIN"})})]})})})]})},k=({children:e})=>s.jsxs("div",{className:"min-h-screen bg-gray-50",children:[s.jsx(It,{}),s.jsx("main",{className:"max-w-7xl mx-auto py-6 sm:px-6 lg:px-8",children:s.jsx(L.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:e})}),s.jsx("footer",{className:"bg-white border-t mt-auto",children:s.jsx("div",{className:"max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8",children:s.jsxs("div",{className:"text-center text-sm text-gray-500",children:[s.jsx("p",{children:"© 2024 Your Shipping Co. All rights reserved."}),s.jsx("p",{className:"mt-2",children:"Professional shipping line management system built with modern web technologies."})]})})})]});function fe(e){var t,r,a="";if(typeof e=="string"||typeof e=="number")a+=e;else if(typeof e=="object")if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(r=fe(e[t]))&&(a&&(a+=" "),a+=r)}else for(r in e)e[r]&&(a&&(a+=" "),a+=r);return a}function te(){for(var e,t,r=0,a="",i=arguments.length;r<i;r++)(e=arguments[r])&&(t=fe(e))&&(a&&(a+=" "),a+=t);return a}const Pt={sm:"w-4 h-4",md:"w-6 h-6",lg:"w-8 h-8",xl:"w-12 h-12"},Tt=({size:e="md",message:t,className:r})=>s.jsxs("div",{className:te("flex flex-col items-center justify-center",r),children:[s.jsx(L.div,{className:te("border-4 border-t-primary-600 border-r-primary-600 border-b-primary-200 border-l-primary-200 rounded-full",Pt[e]),animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"},"aria-label":"Loading"}),t&&s.jsx(L.p,{className:"mt-3 text-sm text-gray-600 font-medium",initial:{opacity:0},animate:{opacity:1},transition:{delay:.2},children:t})]});class $t extends d.Component{constructor(){super(...arguments);P(this,"state",{hasError:!1,error:null,errorInfo:null});P(this,"handleReload",()=>{window.location.reload()});P(this,"handleReset",()=>{this.setState({hasError:!1,error:null,errorInfo:null})})}static getDerivedStateFromError(r){return{hasError:!0,error:r,errorInfo:null}}componentDidCatch(r,a){console.error("ErrorBoundary caught an error:",r,a),this.setState({error:r,errorInfo:a})}render(){return this.state.hasError?this.props.fallback?this.props.fallback:s.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",children:s.jsxs("div",{className:"max-w-md w-full space-y-8",children:[s.jsxs("div",{className:"text-center",children:[s.jsx(_t,{className:"mx-auto h-16 w-16 text-red-500"}),s.jsx("h2",{className:"mt-6 text-3xl font-extrabold text-gray-900",children:"Oops! Something went wrong"}),s.jsx("p",{className:"mt-2 text-sm text-gray-600",children:"We encountered an unexpected error. Please try refreshing the page."})]}),s.jsxs("div",{className:"space-y-4",children:[s.jsxs("button",{onClick:this.handleReload,className:"group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors",children:[s.jsx(Ot,{className:"w-4 h-4 mr-2"}),"Refresh Page"]}),s.jsx("button",{onClick:this.handleReset,className:"group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors",children:"Try Again"})]}),!1]})}):this.props.children}}const Dt=g.lazy(()=>j(()=>import("./Home-C6WG9ifC.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9]))),St=g.lazy(()=>j(()=>import("./Login-v9tEcPBA.js"),__vite__mapDeps([10,2,1,5,11,9]))),zt=g.lazy(()=>j(()=>import("./Dashboard-DVGQTA_m.js"),__vite__mapDeps([12,2,1,9,5]))),Vt=g.lazy(()=>j(()=>import("./Vessels-CM6ssNJf.js"),__vite__mapDeps([13,2,1,9,5]))),Mt=g.lazy(()=>j(()=>import("./VesselDetail-BxJ67e5T.js"),__vite__mapDeps([14,2,1,9,5]))),Ut=g.lazy(()=>j(()=>import("./NotFound-Dtk122jz.js"),__vite__mapDeps([15,1,2,5,16,9]))),Bt=g.lazy(()=>j(()=>import("./About-DSf4vtxh.js"),__vite__mapDeps([17,5,2,8,18,19,3,1,9]))),qt=g.lazy(()=>j(()=>import("./Contact-BXj_i_IB.js"),__vite__mapDeps([20,2,5,7,18,11,19,1,9]))),Ft=g.lazy(()=>j(()=>import("./EServices-C235dwiB.js"),__vite__mapDeps([21,2,1,22,19,5,9]))),Ht=g.lazy(()=>j(()=>import("./EServiceDetail-B5EWx4Ua.js"),__vite__mapDeps([23,2,1,22,19,16,9,5]))),Wt=g.lazy(()=>j(()=>import("./Tracking-CKPLX0wx.js"),__vite__mapDeps([24,2,6,1,9,5]))),Kt=g.lazy(()=>j(()=>import("./VesselDataEntry-Gb9-JP6C.js"),__vite__mapDeps([25,26,2,3,18,4,19,9,1,5]))),Gt=()=>s.jsx("div",{className:"flex items-center justify-center min-h-screen",children:s.jsx(Tt,{size:"lg",message:"Loading page..."})}),Yt={initial:{opacity:0,y:20},in:{opacity:1,y:0},out:{opacity:0,y:-20}},Zt={type:"tween",ease:"anticipate",duration:.4},v=({children:e})=>s.jsx(L.div,{initial:"initial",animate:"in",exit:"out",variants:Yt,transition:Zt,className:"w-full",children:e});function Xt(){return s.jsx($t,{children:s.jsx(je,{children:s.jsx(Nt,{children:s.jsxs("div",{className:"App min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100",children:[s.jsx(bt,{position:"top-right",gutter:8,containerClassName:"z-50",toastOptions:{duration:4e3,className:"bg-white border border-gray-200 shadow-lg rounded-lg",success:{iconTheme:{primary:"#10b981",secondary:"#ffffff"}},error:{iconTheme:{primary:"#ef4444",secondary:"#ffffff"}}}}),s.jsx(d.Suspense,{fallback:s.jsx(Gt,{}),children:s.jsx(se,{mode:"wait",initial:!1,children:s.jsxs(we,{children:[s.jsx(x,{path:"/",element:s.jsx(v,{children:s.jsx(Dt,{})})}),s.jsx(x,{path:"/login",element:s.jsx(v,{children:s.jsx(St,{})})}),s.jsx(x,{path:"/about",element:s.jsx(k,{children:s.jsx(v,{children:s.jsx(Bt,{})})})}),s.jsx(x,{path:"/contact",element:s.jsx(k,{children:s.jsx(v,{children:s.jsx(qt,{})})})}),s.jsx(x,{path:"/eservices",element:s.jsx(k,{children:s.jsx(v,{children:s.jsx(Ft,{})})})}),s.jsx(x,{path:"/eservices/:id",element:s.jsx(k,{children:s.jsx(v,{children:s.jsx(Ht,{})})})}),s.jsx(x,{path:"/tracking",element:s.jsx(k,{children:s.jsx(v,{children:s.jsx(Wt,{})})})}),s.jsx(x,{path:"/dashboard",element:s.jsx(k,{children:s.jsx(v,{children:s.jsx(zt,{})})})}),s.jsx(x,{path:"/vessels",element:s.jsx(k,{children:s.jsx(v,{children:s.jsx(Vt,{})})})}),s.jsx(x,{path:"/vessels/:id",element:s.jsx(k,{children:s.jsx(v,{children:s.jsx(Mt,{})})})}),s.jsx(x,{path:"/vessel-data-entry",element:s.jsx(k,{children:s.jsx(v,{children:s.jsx(Kt,{})})})}),s.jsx(x,{path:"/home",element:s.jsx(Ee,{to:"/",replace:!0})}),s.jsx(x,{path:"*",element:s.jsx(v,{children:s.jsx(Ut,{})})})]})})})]})})})})}const ye=document.getElementById("root");if(!ye)throw new Error("Root element not found");F.createRoot(ye).render(s.jsx(g.StrictMode,{children:s.jsx(Xt,{})}));export{Tt as L,It as N,Lt as S,ar as a,O as c,s as j,he as u,sr as v,K as z};
//# sourceMappingURL=index-DF7_U7F2.js.map
