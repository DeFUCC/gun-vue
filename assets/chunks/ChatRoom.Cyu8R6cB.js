import"./theme.BlSwDMow.js";import{W as u,i as m,Z as f,_ as g}from"./components.DDidTy9E.js";import{u as b}from"./useBackground.BMHeYCET.js";import{d as k,q as x,h as _,c as h,o as y,j as e,G as r,t as S,k as t,N as v}from"./framework.BoVd_Pm6.js";const C={class:"backdrop-blur z-100 bg-light-300 bg-op-30 dark-bg-dark-400 dark-bg-op-50 px-4 py-3 flex flex-wrap items-center text-center sticky top-0"},B={class:"flex-1 ml-2 font-bold"},z={class:"p-4 bg-dark-50 bg-opacity-80 flex gap-2 sticky bottom-0"},j=k({__name:"ChatRoom",props:{title:{type:String,default:"Topics"},topic:{type:String,default:"general"},clickSound:{type:String,default:"audio/safe.mp3"}},setup(l){const c=l,{send:i,currentChat:s,sorted:n}=u();x(()=>c.topic,a=>{s.value=a},{immediate:!0});const p=_(()=>b({pub:m.pub,size:1200}));return(a,o)=>(y(),h("div",{class:"flex flex-col",style:v([{flex:"1 1 auto"},{...p.value}])},[e("div",C,[e("div",B,S(t(s)),1)]),r(t(f),{messages:t(n)},null,8,["messages"]),e("div",z,[r(t(g),{class:"flex-auto",onSubmit:o[0]||(o[0]=d=>t(i)(d))})])],4))}});export{j as default};
