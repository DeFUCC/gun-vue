import{d as R,h as C,p as j,v as z,c as m,o as d,aE as I,j as c,aT as U,G as V,k as o,t as x,N as f,b as A,e as H,_ as P}from"./framework.Cf-rbDpz.js";import{a as F,r as G,o as O,T as q}from"./components.B19WRd_4.js";import{u as J}from"./useMd.4YFkeGX0.js";import{g as N}from"./useMates.BsZ6_r9Q.js";import"./theme.DUAaguHb.js";const K=["id","data-pub"],Q={class:"ml-2 text-sm opacity-60 hover-opacity-80 transition cursor-default text-black dark-text-light-400"},W={class:"ml-2 text-sm opacity-60 hover-opacity-80 transition cursor-default text-black dark-text-light-400"},X={key:0,class:"text-8xl"},Y=["innerHTML"],Z=R({__name:"ChatMessage",props:{index:{type:Number,default:0},source:{type:Object,default:()=>({author:"",timestamp:"",text:"empty"})}},setup(e){const r=e,S=J(),p=C(()=>E(Number(r.source.timestamp))),{user:L}=F(),u=C(()=>r.source.author==L.pub);function E(a){if(!a)return;const t=new Date(a),s=t.toLocaleDateString("en-CA"),i=t.toLocaleTimeString("ru-RU");return{full:s+" "+i,date:s,time:i}}const v=j(!0);return z(()=>{var a,t;r.index>1&&((t=(a=document.getElementById(`chat-${r.index-1}`))==null?void 0:a.dataset)==null?void 0:t.pub)==r.source.author&&(v.value=!1)}),(a,t)=>{var s,i,h,b,y,g,k,w,l,T,D,n,M,$,B;return d(),m("div",{class:"px-1 py-2px flex flex-col w-full gap-1",style:f({alignItems:u.value?"end":"start"})},[I(c("div",{class:"flex items-center w-full mt-2 gap-2",id:`chat-${e.index}`,style:f({flexDirection:u.value?"row-reverse":"row"}),"data-pub":e.source.author},[V(o(O),{class:"opacity-50 hover-opacity-90 transition",pub:e.source.author,"show-name":!0,size:20,onClick:t[0]||(t[0]=_=>o(G).pub=e.source.author)},null,8,["pub"]),c("div",Q,x((s=p.value)==null?void 0:s.time),1),t[1]||(t[1]=c("div",{class:"flex-1"},null,-1)),c("div",W,x((i=p.value)==null?void 0:i.date),1)],12,K),[[U,v.value]]),c("div",{class:"px-2 py-1 bg-light-300 dark-bg-dark-200 dark-bg-opacity-80 bg-opacity-80 rounded-b-xl max-w-max break-all overflow-hidden",style:f({borderTopLeftRadius:u.value?"12px":"0px",borderTopRightRadius:u.value?"0px":"12px",fontSize:`${(h=e.source)==null?void 0:h.text}`==o(N)(`${(b=e.source)==null?void 0:b.text}`)?"6em":"1em"})},[((y=e.source)==null?void 0:y.text)==o(N)(`${(g=e.source)==null?void 0:g.text}`)?(d(),m("div",X,x((k=e.source)==null?void 0:k.text),1)):(T=(l=(w=e.source)==null?void 0:w.text)==null?void 0:l.split)!=null&&T.call(l,"#/files/")[1]?(d(),A(o(q),{key:1,id:(M=(n=(D=e.source)==null?void 0:D.text)==null?void 0:n.split)==null?void 0:M.call(n,"#/files/")[1].slice(0,40)},null,8,["id"])):($=e.source)!=null&&$.text?(d(),m("div",{key:2,class:"markdown-body",innerHTML:o(S).render(`${(B=e.source)==null?void 0:B.text}`)},null,8,Y)):H("",!0)],4)],4)}}}),re=P(Z,[["__scopeId","data-v-a679bdee"]]);export{re as default};
