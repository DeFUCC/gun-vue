import{as as c,au as f}from"./components.BF3VL1wl.js";import{_ as p,v as _,o as l,c as a,j as t,k as o,F as m,C as v,n as x,N as y,t as n}from"./framework.D0CZGv0r.js";import"./theme.DNNfahvK.js";const g={class:"flex flex-col"},b={class:"flex items-center"},C={class:"flex flex-col font-normal items-start"},R=["onClick"],h={class:"flex-1 underline"},B={class:"font-bold"},L={__name:"GunRelayList",setup(z){const{relay:i,setPeer:d,resetPeer:F}=c(),{relays:u,loadRelays:r}=f();return _(()=>{r()}),(G,s)=>(l(),a("div",g,[t("div",b,[s[2]||(s[2]=t("div",{class:"text-lg text-left"},"Volunteer relay peers:",-1)),s[3]||(s[3]=t("div",{class:"flex-auto"},null,-1)),t("button",{class:"button m-1",onClick:s[0]||(s[0]=e=>o(r)())},s[1]||(s[1]=[t("div",{class:"i-la-redo-alt"},null,-1)]))]),t("ul",C,[(l(!0),a(m,null,v(o(u),e=>(l(),a("li",{class:x(["flex w-full text-left p-1 hover-bg-light-500 cursor-pointer hover-dark-bg-dark-600",{active:e.url==o(i).peer}]),key:e.host,style:y({order:e.ping}),onClick:N=>o(d)(e.url)},[t("div",h,n(e==null?void 0:e.host),1),t("div",B,n(e.ping)+" ms",1)],14,R))),128))])]))}},$=p(L,[["__scopeId","data-v-389c61aa"]]);export{$ as default};
