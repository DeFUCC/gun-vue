import{a as b,br as p,Y as v,bs as c,bt as k,bu as y,bv as w}from"./components.BF3VL1wl.js";import"./theme.DNNfahvK.js";import{d as $,p as C,q as g,o as a,c as m,G as n,w as d,b as f,j as r,k as s,e as x,r as B,a as U,N}from"./framework.D0CZGv0r.js";const V={class:"flex flex-col items-center w-full"},S={key:1,class:"flex flex-col"},j={class:"p-4 flex flex-col items-start"},E=$({__name:"UserHome",emits:["user","room","close","chat","browse"],setup(A,{emit:L}){const{user:o}=b();function u(){o.db.get("safe").get("saved").put(!0)}const i=C(!1);return g(()=>o.is,()=>{o.db.get("safe").get("saved").on(t=>i.value=t)},{immediate:!0}),(t,e)=>(a(),m("div",V,[n(s(v),{open:s(o).is&&!i.value,"close-button":"",onClose:e[1]||(e[1]=l=>u())},{default:d(()=>[i.value?x("",!0):(a(),f(s(p),{key:0},{default:d(()=>[r("button",{class:"button mx-8 justify-center",onClick:e[0]||(e[0]=l=>u())},e[5]||(e[5]=[r("div",{class:"i-la-check"},null,-1),r("div",{class:"ml-2"},"I've stored my key securely",-1)]))]),_:1}))]),_:1},8,["open"]),s(o).is?(a(),m("div",S,[n(s(k),{onBrowse:e[2]||(e[2]=l=>{t.$emit("browse",l),t.$emit("close")})}),r("div",j,[n(s(y)),n(s(w),{onBrowse:e[3]||(e[3]=l=>t.$emit("room",l))})]),r("button",{class:"p-4 m-4 rounded-xl font-bold text-lg shadow-md",style:N({backgroundColor:s(o).color}),onClick:e[4]||(e[4]=l=>{t.$emit("user",s(o).pub),t.$emit("close")})},[B(t.$slots,"default",{},()=>[e[6]||(e[6]=U(" My public profile"))])],4)])):(a(),f(s(c),{key:0}))]))}});export{E as default};
