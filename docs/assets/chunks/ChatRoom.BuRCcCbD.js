import"./theme.DNNfahvK.js";import{R as x,j as g,p as l,X as k,Y as _,Z as C,_ as v,$ as S}from"./components.BF3VL1wl.js";import{u as w}from"./useChat.tFy8ystB.js";import{u as B}from"./useBackground.BEpapf7F.js";import{d as N,q as $,h as R,o as d,c as V,G as i,w as j,k as e,b as z,e as A,j as c,t as D,N as E}from"./framework.D0CZGv0r.js";const U={class:"px-4 py-6 flex flex-wrap items-center text-center"},q={class:"flex-1 ml-2 font-bold"},G={class:"p-4 bg-dark-50 bg-opacity-80 flex gap-2 flex sticky bottom-0"},O=N({__name:"ChatRoom",props:{title:{type:String,default:"Topics"},topic:{type:String,default:"general"},clickSound:{type:String,default:"audio/safe.mp3"}},emits:["account"],setup(f,{emit:H}){const r=f;let n;function m(){n||(n=new Audio(r.clickSound),n.volume=.1),n.play()}const{send:b,currentChat:u,sorted:p}=w();$(()=>r.topic,a=>{u.value=a},{immediate:!0}),x(p,(a,s)=>{if(a.length>s.length){m();const t=a.slice(-1)[0],{isSupported:o,notification:I,show:y,close:L,onClick:M,onShow:T,onError:W,onClose:X}=S({title:t==null?void 0:t.text,body:`${t==null?void 0:t.timestamp} by ${t==null?void 0:t.author}`,lang:"en",tag:"chat"});o.value&&y()}},{deep:!0});const h=R(()=>B({pub:g.pub,size:1200}));return(a,s)=>{var t;return d(),V("div",{class:"flex flex-col overflow-y-scroll",style:E([{flex:"1000 1 auto"},{...h.value}])},[i(e(_),{open:!!((t=e(l))!=null&&t.pub),onClose:s[0]||(s[0]=o=>e(l).pub="")},{default:j(()=>{var o;return[(o=e(l))!=null&&o.pub?(d(),z(e(k),{key:0,pub:e(l).pub},null,8,["pub"])):A("",!0)]}),_:1},8,["open"]),c("div",U,[c("div",q,D(e(u)),1)]),i(e(C),{messages:e(p)},null,8,["messages"]),c("div",G,[i(e(v),{class:"flex-auto",onSubmit:s[1]||(s[1]=o=>e(b)(o))})])],4)}}});export{O as default};
