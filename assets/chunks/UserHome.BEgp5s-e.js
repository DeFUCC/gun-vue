import{d as v,p as k,q as g,aj as y,c as d,o as n,G as i,b as m,w as f,e as p,k as s,j as t,N as c,T as w}from"./framework.BfubPTv1.js";import{a as x,b6 as C,U as $,b7 as U,b8 as B,b9 as h,ba as N,bb as j}from"./components.f3q26e0v.js";import"./theme.fBQ8eXbj.js";const L={class:"flex flex-col items-center w-full"},P={key:1,class:"flex flex-col"},S={class:"p-4 flex flex-col items-stretch gap-4"},V={class:"flex flex-col items-stretch bg-light-900 dark-bg-dark-500 p-2 rounded-xl"},A={key:0,class:"i-la-angle-down"},M={key:1,class:"i-la-angle-up"},H=v({__name:"UserHome",emits:["user","room","close","chat","browse"],setup(T,{emit:q}){const{user:a}=x();function b(){a.db.get("safe").get("saved").put(!0)}const u=k(!1);g(()=>a.is,()=>{a.db.get("safe").get("saved").on(l=>u.value=l)},{immediate:!0});const r=y("showChats",!0);return(l,e)=>(n(),d("div",L,[i(s($),{open:s(a).is&&!u.value,"close-button":"",onClose:e[1]||(e[1]=o=>b())},{default:f(()=>[u.value?p("",!0):(n(),m(s(C),{key:0},{default:f(()=>[t("button",{class:"button mx-8 justify-center",onClick:e[0]||(e[0]=o=>b())},e[7]||(e[7]=[t("div",{class:"i-la-check"},null,-1),t("div",{class:"ml-2"},"I've stored my key securely",-1)]))]),_:1}))]),_:1},8,["open"]),s(a).is?(n(),d("div",P,[i(s(B),{onBrowse:e[2]||(e[2]=o=>{l.$emit("browse",o),l.$emit("close")})}),t("div",S,[i(s(h)),t("button",{class:"p-2 rounded-xl font-bold text-lg shadow-md",style:c({backgroundColor:s(a).color}),onClick:e[3]||(e[3]=o=>{l.$emit("user",s(a).pub),l.$emit("close")})}," My public profile",4),e[10]||(e[10]=t("hr",{class:"w-full"},null,-1)),i(s(N),{onBrowse:e[4]||(e[4]=o=>l.$emit("room",o))}),t("div",V,[t("button",{class:"items-center w-full flex px-2 pb-2",onClick:e[5]||(e[5]=o=>r.value=!s(r))},[e[8]||(e[8]=t("div",{class:"font-bold text-lg"},"My chats",-1)),e[9]||(e[9]=t("div",{class:"flex-1"},null,-1)),s(r)?(n(),d("div",A)):(n(),d("div",M))]),i(w,{name:"fade",mode:"out-in"},{default:f(()=>[s(r)?(n(),m(s(j),{key:0,onChat:e[6]||(e[6]=o=>l.$emit("chat",o))})):p("",!0)]),_:1})])])])):(n(),m(s(U),{key:0}))]))}});export{H as default};
