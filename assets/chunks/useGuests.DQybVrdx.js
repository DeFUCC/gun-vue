import{i as p,h as m,u as h}from"./components.f3q26e0v.js";import{ah as l,h as o,s as v}from"./framework.BfubPTv1.js";let a=Date.now();function j({TIMEOUT:r=1e4}={}){const i=p(),t=l({}),s=l({}),c=l({}),f=l({total:o(()=>Object.keys(t).length),online:o(()=>Object.keys(s).length),offline:o(()=>Object.keys(c).length)});return i.user(m.pub).get("space").map().once((u,n)=>{const{account:e}=h(n);t[n]=e,t[n].order=o(()=>a-e.value.pulse<r?1:a-e.value.pulse),t[n].online=o(()=>a-e.value.pulse<r)}),v(()=>{var u,n;for(let e in t)(n=(u=t==null?void 0:t[e])==null?void 0:u.online)!=null&&n.value?(s[e]=t[e],delete c[e]):(c[e]=t[e],delete s[e])}),{guests:t,online:s,offline:c,count:f}}export{j as u};
