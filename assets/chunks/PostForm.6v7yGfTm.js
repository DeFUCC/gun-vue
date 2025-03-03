import{_ as B,a$ as P,h as p,p as m,v as S,ah as D,c as x,o as b,aE as k,e as I,j as o,G as a,aF as y,Z as M,a0 as N,n as C,w as g,k as n}from"./framework.Cf-rbDpz.js";import{q as T,ay as $,az as c,aA as A,a9 as w,aB as E}from"./components.BYx5MAPp.js";import{a as K}from"./useZip.drWvnjaY.js";import"./theme.BeDAU7c0.js";import"./useMd.DKi8i8CH.js";import"./useGift.A_Bx8h8t.js";import"./composables.lesYnNqC.js";const L={class:"w-full flex flex-col p-2 shadow-xl m-1 rounded-2xl",action:"javascript:void(0);"},q={class:"flex flex-wrap z-100"},G={class:"flex justify-center flex-1"},H=["disabled"],R={__name:"PostForm",props:{tag:{type:String,default:" "}},emits:["close"],setup(U,{emit:F}){P(u=>({"569a1dcc":z.value}));const i=U,V=F,j=T("deep"),z=p(()=>j.hex(i.tag)),r=m();S(()=>{var u;(u=r.value)==null||u.focus()});const l=m({}),s=D({form:!1,youtube:!1,text:!1}),d=p(()=>l.value.title||l.value.statement||l.value.text||l.value.cover);function v(){if(!d.value)return;const u={...l.value};K(i.tag,u),f()}function f(){s.form=!1,l.value={},V("close")}return(u,t)=>(b(),x("form",L,[s.title?k((b(),x("input",{key:0,class:"font-bold text-xl dark-bg-dark-200",ref_key:"titleInput",ref:r,"onUpdate:modelValue":t[0]||(t[0]=e=>l.value.title=e),placeholder:"Title",autofocus:""},null,512)),[[y,l.value.title]]):I("",!0),k(o("textarea",{class:"text-1rem leading-relaxed dark-bg-dark-200","onUpdate:modelValue":t[1]||(t[1]=e=>l.value.statement=e),placeholder:"Short text statement",onKeyup:t[2]||(t[2]=M(N(e=>v(),["ctrl"]),["enter"]))},null,544),[[y,l.value.statement]]),o("div",q,[o("button",{class:C(["button m-1",{active:l.value.title}]),title:"Add a heading",onClick:t[3]||(t[3]=e=>s.title=!s.title)},"H1",2),a(n($),{field:"icon",options:{picSize:400,preserveRatio:!1},onUpdate:t[4]||(t[4]=e=>l.value.icon=e)},{default:g(()=>t[15]||(t[15]=[o("div",{class:"i-la-info-circle"},null,-1)])),_:1}),a(n($),{onUpdate:t[5]||(t[5]=e=>l.value.cover=e)}),a(n(c),{onUpdate:t[6]||(t[6]=e=>l.value.link=e)}),a(n(A),{onUpdate:t[7]||(t[7]=e=>l.value.youtube=e)}),o("button",{class:C(["m-1 button",{active:l.value.text}]),onClick:t[8]||(t[8]=e=>s.text=!0)},t[16]||(t[16]=[o("div",{class:"i-mdi-text-long"},null,-1)]),2),t[19]||(t[19]=o("div",{class:"flex-1"},null,-1)),o("div",G,[o("button",{class:"plus button flex-1 justify-center m-1",disabled:!d.value,type:"submit",onClick:t[9]||(t[9]=e=>v())},t[17]||(t[17]=[o("div",{class:"i-la-check"},null,-1),o("div",{class:"font-bold ml-2"},"Submit",-1)]),8,H),o("button",{class:"m-1 button text-xl",onClick:t[10]||(t[10]=e=>f())},t[18]||(t[18]=[o("div",{class:"i-la-trash-alt"},null,-1)]))])]),a(n(w),{open:s.youtube,offset:"22vh",onClose:t[11]||(t[11]=e=>s.youtube=!1)},null,8,["open"]),a(n(w),{open:s.text,offset:"22vh",onClose:t[14]||(t[14]=e=>s.text=!1)},{default:g(()=>[a(n(E),{text:l.value.text,"onUpdate:text":t[12]||(t[12]=e=>l.value.text=e),onClose:t[13]||(t[13]=e=>s.text=!1)},null,8,["text"])]),_:1},8,["open"])]))}},_=B(R,[["__scopeId","data-v-c53fdb98"]]);export{_ as default};
