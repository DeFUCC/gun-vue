import{d as x,h as c,p as b,o as t,c as s,j as i,t as g,G as a,k as u,w as d,aL as k,F as h,C as y,e as C,T as P}from"./framework.D0CZGv0r.js";import{a as T,l as B}from"./components.BF3VL1wl.js";import{u as L}from"./useReactions.8Z_79OiB.js";import"./theme.DNNfahvK.js";const N={class:"flex flex-col"},R={class:"text-xl font-bold mb-2"},U={class:"flex flex-col gap-4"},V={key:0,class:"flex flex-col bg-light-800 dark-bg-dark-200 rounded-2xl gap-4"},A=x({__name:"AccountReactions",props:{pub:{default:"",type:String}},emits:["post"],setup(p,{emit:w}){const o=p,{user:m}=T(),f=c(()=>o.pub==m.pub),e=b(),r=L(o.pub),_=c(()=>r[e.value]||[]);return(F,n)=>(t(),s("div",N,[i("div",R,g(f.value?"My ":"")+" Posts",1),i("div",U,[a(u(B),{current:e.value,"onUpdate:current":n[0]||(n[0]=l=>e.value=l),reactions:u(r)},null,8,["current","reactions"]),a(P,{name:"fade"},{default:d(()=>[e.value?(t(),s("div",V,[a(k,{name:"fade"},{default:d(()=>[(t(!0),s(h,null,y(_.value,(l,v)=>(t(),s("div",{class:"p-0 relative",key:v}))),128))]),_:1})])):C("",!0)]),_:1})])]))}});export{A as default};
