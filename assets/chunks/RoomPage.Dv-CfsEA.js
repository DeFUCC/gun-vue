import{aS as F,a as P,i as w,aN as L,q as N,aT as S,aJ as T,o as U,aU as z,aV as V,aB as H,aW as M}from"./components.C7Q4D7A2.js";import{u as j}from"./useMd.Bc8MowbA.js";import{f as A}from"./useRooms.zPG1fr4p.js";import{u as G}from"./useBackground.B0b_8F0E.js";import"./theme.BM2Q9N8i.js";import{h,ah as q,c as n,o as a,j as s,r as D,b as p,k as e,G as f,e as R,t as E,F as _,B as $,N as J}from"./framework.DADfZotI.js";const O={class:"flex flex-col items-stretch"},W={class:"max-w-full flex flex-col items-stretche bg-light-100 bg-opacity-20 dark-bg-dark-800 dark-bg-opacity-40 p-4 md-p-12 shadow-xl backdrop-blur-md backdrop-filter rounded-t-xl"},I={class:"flex flex-wrap items-center gap-8"},K={class:"flex flex-col flex-auto",style:{flex:"100"}},Q={class:"flex gap-2 items-center"},X={key:0,class:"i-la-star"},Y={key:1,class:"i-la-star-solid"},Z={class:"text-md"},ee={class:"flex items-center flex-wrap"},te={class:"flex flex-col items-center bg-light-300 dark-bg-dark-400"},se={class:"flex flex-wrap items-center gap-2 p-4"},oe={class:"relative"},le={key:0,class:"flex items-center"},ae=["innerHTML"],re={class:"p-8"},xe={__name:"RoomPage",props:{pub:{type:String,default:""},titles:{type:Object,default:()=>F}},emits:["rooms","browse","user"],setup(c){const b=c,{user:m}=P(),i=h(()=>b.pub?b.pub:w.pub),{room:o,leaveRoom:ie,updateRoomProfile:x,enterRoom:ne}=L(i.value),B=j(),u=q({name:!1,description:!1,text:!1});N("deep");const C=h(()=>G({pub:i.value,size:1200,attachment:"local"}));return(d,t)=>{var v,k,g,y;return a(),n("div",O,[s("div",{class:"pt-32 px-2 md-px-8 bg-cover relative flex flex-col items-center",style:J({...C.value})},[s("div",W,[s("div",I,[(a(),p(e(S),{class:"flex-1 rounded-2xl overflow-hidden min-w-20",pub:i.value,key:i.value},null,8,["pub"])),s("div",K,[s("div",Q,[f(e(T),{class:"font-bold text-2xl",text:e(o).profile.name||i.value.substring(0,12),editable:e(o).hosts[e(m).pub]&&i.value==e(w).pub&&!u.name,onUpdate:t[0]||(t[0]=r=>e(x)("name",r))},null,8,["text","editable"]),t[7]||(t[7]=s("div",{class:"flex-1"},null,-1)),(v=e(m))!=null&&v.is?(a(),n("button",{key:0,class:"button z-100",onPointerdown:t[1]||(t[1]=r=>e(A)(i.value))},[e(o).isFavourite?(a(),n("div",Y)):(a(),n("div",X))],32)):R("",!0)]),s("div",Z,E(e(o).profile.description),1),s("div",ee,[t[8]||(t[8]=s("div",{class:"font-bold mr-2"},"Hosts: ",-1)),(a(!0),n(_,null,$(e(o).hosts,(r,l)=>(a(),n("div",{class:"p-2 flex flex-col items-start gap-2",key:l},[f(e(U),{pub:l,selectable:!0},null,8,["pub"])]))),128))]),f(e(z),{pub:i.value,onRoom:t[2]||(t[2]=r=>d.$emit("browse","/"))},null,8,["pub"])])])])],4),D(d.$slots,"default"),s("div",te,[s("div",se,[(a(!0),n(_,null,$(c.titles,(r,l)=>(a(),p(e(V),{key:l,cert:e(o).features[l],type:l,title:r,pub:i.value,open:e(o).features[l]||l=="users"&&e(o).features.space||l=="chat"&&e(o).features.chat,onClick:ue=>d.$emit("browse",l)},null,8,["cert","type","title","pub","open","onClick"]))),128))]),s("div",oe,[u.text===!1?(a(),n("div",le,[s("div",{class:"p-4 prose max-w-65ch",innerHTML:e(B).render(((k=e(o).profile)==null?void 0:k.text)||"")},null,8,ae),(g=e(o).hosts)!=null&&g[e(m).pub]?(a(),n("button",{key:0,class:"button absolute top-4 right-4 z-200",onClick:t[3]||(t[3]=r=>{var l;return u.text=((l=e(o).profile)==null?void 0:l.text)||""})},t[9]||(t[9]=[s("div",{class:"i-la-pen"},null,-1)]))):R("",!0)])):(a(),p(e(H),{key:1,text:u.text,"onUpdate:text":t[4]||(t[4]=r=>u.text=r),onClose:t[5]||(t[5]=r=>{e(x)("text",u.text),u.text=!1})},null,8,["text"]))]),s("div",re,[(a(),p(e(M),{state:"offline",onUser:t[6]||(t[6]=r=>d.$emit("user",r)),roomPub:(y=e(o))==null?void 0:y.pub,key:e(o).pub},null,8,["roomPub"]))])])])}}};export{xe as default};
