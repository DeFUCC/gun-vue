import{o as g,h as v,a as k,a4 as y,a5 as D,a6 as b,a7 as S}from"./components.DvunW5qa.js";import{_ as w,s as I,o as B,c as C,j as s,t as l,P as L,k as e,r as N,I as f,p as j,l as O}from"./framework.B82iRX0g.js";import{a as P}from"./langs.CLi14XB-.js";import"./theme.zyIK20Is.js";const R=t=>(j("data-v-bd8a1c3b"),t=t(),O(),t),V={class:"flex flex-col rounded-xl text-xl p-2 bg-light-800 dark-bg-dark-400"},z={class:"flex flex-wrap items-center"},E={class:"inline-flex text-sm gap-1"},F={class:"font-bold"},G=R(()=>s("div",{class:"flex-1"},null,-1)),J={__name:"DictDefCard",props:{hash:{type:String,default:""},authors:{type:Object,default:()=>({})}},setup(t){const c=t,x=g("light"),_=v(),{user:m}=k(),a=I();_.get("dict").get("#def").get(c.hash).once(o=>{a.value=JSON.parse(o)});const n=y(c.hash);return(o,U)=>{var r,d,i,u,p,h;return B(),C("div",V,[s("div",{class:"text-lg flex items-center flex-wrap",style:L([{"text-decoration-line":"underline"},{textDecorationStyle:(d=e(P)[(r=a.value)==null?void 0:r.part])==null?void 0:d.underline,textDecorationColor:e(x).hex(t.hash)}])},l((i=a.value)==null?void 0:i.text),5),s("div",z,[s("div",E,[s("div",F,l((u=a.value)==null?void 0:u.lang),1),s("p",null,l((p=a.value)==null?void 0:p.part),1)]),N(o.$slots,"default",{},void 0,!0),G,f(e(D),{links:e(n),type:"word"},null,8,["links"]),f(e(S),{hash:t.hash,type:"def",my:(h=e(n)[e(b).word])==null?void 0:h[e(m).pub]},null,8,["hash","my"])])])}}},K=w(J,[["__scopeId","data-v-bd8a1c3b"]]);export{K as default};
