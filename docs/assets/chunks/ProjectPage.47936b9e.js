import{g as M,h as U,x as N,C as V,o as n,c as d,k as l,b as z,l as e,e as v,t as b,H as u,N as E,aD as H,aE as I}from"./framework.72a11bd5.js";import{a as S,I as L,al as G,b4 as O,aI as q,b5 as $,b6 as A,b7 as J}from"./components.ede6c998.js";import"../app.6f46eec2.js";import"./theme.091da883.js";const K={class:"flex flex-col max-w-65ch"},Q=["value"],R={class:"rounded p-2 bg-light-100 bg-opacity-80 dark-bg-dark-300 dark-bg-opacity-60 flex items-center"},W={class:"flex flex-col"},X={class:"flex items-center gap-2"},Y={class:"capitalize font-mono text-xs"},Z={class:"px-2 px-1 bg-light-300 dark-bg-dark-300 rounded-lg font-mono text-xs"},ee={class:"px-2 px-1 bg-light-700 dark-bg-dark-700 rounded-lg font-mono text-xs mr-auto"},te=l("div",{class:"flex-1"},null,-1),oe={class:"flex flex-col gap-2 px-4 bg-light-200 dark-bg-dark-400 relative"},se=["innerHTML"],le={class:"text-xs max-w-full overflow-scroll"},ue={__name:"ProjectPage",props:{path:{type:String,default:""}},emits:["gift","user"],setup(r,{emit:ae}){const x=r,{user:w}=S(),T=L(),{project:s,updateField:i,updateCover:_}=G(x.path),a=M(()=>x.path.includes(w.pub)),g=U(!1),c=U(s.content);N(()=>s.content,p=>{c.value=p});const B=O(i,1e3);return(p,t)=>{var m,f,k,y,h,C,j,F,P;const D=V("account-badge");return n(),d("div",K,[l("div",{class:"p-2 relative",style:E({background:`url(${e(s).cover}) center`,backgroundColor:(m=e(s))==null?void 0:m.color,paddingTop:(f=e(s))!=null&&f.cover||(k=e(s))!=null&&k.color?"220px":"60px"})},[a.value?(n(),z(e(q),{key:0,class:"absolute top-2",onUpdate:t[0]||(t[0]=o=>e(_)(o))})):v("",!0),a.value?(n(),d("input",{key:1,class:"absolute top-4 right-4",type:"color",value:(y=e(s))==null?void 0:y.color,onInput:t[1]||(t[1]=o=>e(i)("color",o.target.value))},null,40,Q)):v("",!0),l("div",R,[l("div",W,[l("div",X,[l("div",Y,b((h=e(s))==null?void 0:h.type),1),l("div",Z,b((C=e(s))==null?void 0:C.id),1),l("div",ee,b((j=e(s))==null?void 0:j.status),1)]),u(e($),{class:"text-2xl font-bold",text:(F=e(s))==null?void 0:F.title,editable:a.value,onUpdate:t[2]||(t[2]=o=>e(i)("title",o))},null,8,["text","editable"]),u(e($),{class:"text-md",text:(P=e(s))==null?void 0:P.description,editable:a.value,onUpdate:t[3]||(t[3]=o=>e(i)("description",o))},null,8,["text","editable"])]),te,u(D,{pub:r.path.slice(-87),onClick:t[4]||(t[4]=o=>p.$emit("user",r.path.slice(-87)))},null,8,["pub"])])],4),l("div",oe,[a.value?(n(),d("div",{key:0,class:"i-la-pen cursor-pointer text-2xl absolute top-2 right-2 z-2",onClick:t[5]||(t[5]=o=>g.value=!g.value)})):v("",!0),!g.value||!a.value?(n(),d("div",{key:1,class:"p-2 text-base prose prose-truegray dark-prose-light dark-bg-dark-400",innerHTML:e(T).render(c.value||"")},null,8,se)):H((n(),d("textarea",{key:2,class:"dark-bg-dark-400","onUpdate:modelValue":[t[6]||(t[6]=o=>c.value=o),t[7]||(t[7]=o=>e(B)("content",o))]},null,512)),[[I,c.value]]),l("pre",le,b(Object.keys(e(s))),1)]),u(e(A),{path:r.path,enabled:!!e(s).funding,onEnable:t[8]||(t[8]=o=>e(i)("funding","true")),onGift:t[9]||(t[9]=o=>p.$emit("gift",o))},null,8,["path","enabled"]),u(e(J),{source:r.path},null,8,["source"])])}}};export{ue as default};
