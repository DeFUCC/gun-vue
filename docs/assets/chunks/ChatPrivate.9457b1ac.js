import{u as _,a_ as g,A as v,X as k,o as l,a$ as x}from"./components.ede6c998.js";import"../app.6f46eec2.js";import{d as C,U as h,g as A,C as i,o as S,c as B,k as o,H as t,l as e,t as m,r as D,w as $}from"./framework.72a11bd5.js";import"./theme.091da883.js";const q={class:"m-0 flex flex-col"},H={class:"flex-0 p-4 flex flex-wrap items-center"},U={class:"text-lg font-bold p-2"},w={class:"text-lg"},y=o("div",{class:"flex-1"},null,-1),I={class:"flex-0 bg-light-900 dark-bg-dark-600 p-4"},N=C({__name:"ChatPrivate",props:{pub:{default:"OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk",type:String}},emits:["user"],setup(a){const r=a,{account:u}=_(h(r,"pub")),c=A(()=>g(r.pub));return(p,s)=>{var d;const f=i("chat-messages"),b=i("AccountHome");return S(),B("div",q,[o("div",H,[t(e(v),{class:"cursor-pointer",pub:a.pub,onClick:s[0]||(s[0]=n=>p.$emit("user",a.pub))},null,8,["pub"]),o("div",U,m((d=e(u).profile)==null?void 0:d.name),1),o("div",w,m(e(u).lastSeen),1),y,D(p.$slots,"default")]),t(f,{class:"bg-dark-50 dark-bg-dark-400",messages:c.value.sorted},null,8,["messages"]),o("div",I,[t(e(k),{onSubmit:s[1]||(s[1]=n=>c.value.send(n))})]),t(e(x),{onClose:s[2]||(s[2]=n=>e(l).pub=""),open:!!e(l).pub},{default:$(()=>[t(b,{pub:e(l).pub},null,8,["pub"])]),_:1},8,["open"])])}}});export{N as default};
