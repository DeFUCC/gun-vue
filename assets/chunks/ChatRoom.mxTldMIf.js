import"./theme.BeDAU7c0.js";import{i as d,R as m,U as f}from"./components.BYx5MAPp.js";import{u as g}from"./useChat.Bgw3BWf-.js";import{u as b}from"./useBackground.Bf4IS4kq.js";import{d as k,q as x,h,c as y,o as _,j as e,G as r,t as S,k as t,N as v}from"./framework.Cf-rbDpz.js";const C={class:"backdrop-blur z-100 bg-light-300 bg-op-30 dark-bg-dark-400 dark-bg-op-50 px-4 py-3 flex flex-wrap items-center text-center sticky top-0"},B={class:"flex-1 ml-2 font-bold"},z={class:"p-4 bg-dark-50 bg-opacity-80 flex gap-2 sticky bottom-0"},q=k({__name:"ChatRoom",props:{title:{type:String,default:"Topics"},topic:{type:String,default:"general"},clickSound:{type:String,default:"audio/safe.mp3"}},setup(i){const l=i,{send:c,currentChat:s,sorted:p}=g();x(()=>l.topic,a=>{s.value=a},{immediate:!0});const n=h(()=>b({pub:d.pub,size:1200}));return(a,o)=>(_(),y("div",{class:"flex flex-col",style:v([{flex:"1 1 auto"},{...n.value}])},[e("div",C,[e("div",B,S(t(s)),1)]),r(t(m),{messages:t(p)},null,8,["messages"]),e("div",z,[r(t(f),{class:"flex-auto",onSubmit:o[0]||(o[0]=u=>t(c)(u))})])],4))}});export{q as default};
