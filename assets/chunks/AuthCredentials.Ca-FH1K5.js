import{d as P,p as f,aQ as T,aR as j,h as y,c as a,e as u,k as t,o as l,j as s,G as c,r as q,t as B,N as A,n as E,w as b,T as G,b as O,aO as Q}from"./framework.Cf-rbDpz.js";import{a as V,D as z,E as D,G as J,H as R}from"./components.BMRHwsKO.js";import"./theme.z6pDVX6y.js";const _={key:0,class:"flex p-4 items-center bg-dark-100 bg-opacity-20 mt-2 shadow-inset"},F={key:0,class:"i-la-lock"},H={key:1,class:"i-la-unlock"},K={class:"text-sm"},L={class:"flex flex-wrap"},U={key:0,class:"px-2"},Y={key:1,class:"px-2"},I=["href"],M={key:1,class:"flex w-full justify-center mt-4"},W=["value"],le=P({__name:"AuthCredentials",emits:["close"],setup(X,{emit:Z}){const n=f("pass"),{user:v}=V();function m(r){n.value!=r?n.value=r:n.value=null}const{pass:o}=z(),{text:h,copy:C,copied:w,isSupported:S}=T(),{share:g,isSupported:$}=j(),i=f(!0),p=y(()=>{var r;return i.value?(r=o==null?void 0:o.safe)==null?void 0:r.enc:JSON.stringify(v.pair())}),N=y(()=>i.value?o.links.pass:o.links.pair);return(r,e)=>{var k,x;return t(v).is?(l(),a("div",{class:"flex flex-col items-stretch pb-4 border-1 border-dark-100 border-opacity-10 max-w-120 mx-auto dark-bg-dark-200",key:t(v).is},[e[14]||(e[14]=s("div",{class:"mt-4 mx-6"},"Please make sure to safely store your cryptographic keypair to be able to use it again later",-1)),c(t(D)),(x=(k=t(o))==null?void 0:k.safe)!=null&&x.enc?(l(),a("div",_,[s("div",{class:"flex flex-col w-34 items-center",style:A({color:i.value?"green":"red"})},[s("button",{class:"m-2 button text-2xl",onClick:e[0]||(e[0]=d=>i.value=!i.value)},[i.value?(l(),a("div",F)):(l(),a("div",H))]),s("div",K,B(i.value?"Encrypted":"Plain Text"),1),e[7]||(e[7]=s("div",{class:"text-m"},"Key Pair",-1))],4),s("div",L,[t($)?(l(),a("button",{key:0,class:E(["m-2 button items-center",{active:n.value=="pass"}]),onClick:e[1]||(e[1]=d=>t(g)({title:"Your key pair",text:p.value}))},e[8]||(e[8]=[s("div",{class:"i-la-share"},null,-1),s("div",{class:"px-1"},"Share",-1)]),2)):u("",!0),t(S)?(l(),a("button",{key:1,class:"m-2 button items-center",onClick:e[2]||(e[2]=d=>t(C)(p.value))},[e[9]||(e[9]=s("div",{class:"i-la-copy"},null,-1)),c(G,{name:"fade",mode:"out-in",appear:""},{default:b(()=>[t(w)?(l(),a("div",U,"Copied!")):(l(),a("div",Y,"Copy"))]),_:1})])):u("",!0),s("a",{class:"m-2 button items-center",href:N.value,target:"_blank",onClick:e[3]||(e[3]=d=>m("links"))},e[10]||(e[10]=[s("div",{class:"i-la-link"},null,-1),s("div",{class:"px-2"},"Link",-1)]),8,I),s("button",{class:"m-2 button items-center",onClick:e[4]||(e[4]=d=>m("qr"))},e[11]||(e[11]=[s("div",{class:"i-la-qrcode"},null,-1),s("div",{class:"px-2"},"QR",-1)])),s("button",{class:"m-2 button items-center",onClick:e[5]||(e[5]=d=>m("key"))},e[12]||(e[12]=[s("div",{class:"i-la-envelope-open-text"},null,-1),s("div",{class:"px-2"},"Text",-1)])),s("button",{class:"m-2 button items-center",onClick:e[6]||(e[6]=d=>{t(J)(p.value,"text/json",(t(v).name||"account")+".json",!1),n.value=null})},e[13]||(e[13]=[s("div",{class:"i-la-file-code"},null,-1),s("div",{class:"px-2"},"JSON",-1)]))])])):u("",!0),n.value?(l(),a("div",M,[c(Q,{name:"fade"},{default:b(()=>[n.value=="key"?(l(),a("textarea",{class:"p-4 text-sm flex-1 rounded-xl",key:"text",rows:"9",value:p.value},null,8,W)):u("",!0),n.value=="qr"?(l(),O(t(R),{class:"max-w-600px",key:"qr",data:i.value?t(o).links.pass:t(o).links.pair},null,8,["data"])):u("",!0)]),_:1})])):u("",!0),q(r.$slots,"default")])):u("",!0)}}});export{le as default};
