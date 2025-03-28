import{p as B,h as C,c as o,e as k,k as s,o as i,j as t,G as g,r as G,t as w,N as O,n as f,w as $,T as L,F as q,B as J}from"./framework.BoVd_Pm6.js";import{E,a as V,G as _,H as I,D as M,I as W,J as Q}from"./components.B1jSCJNL.js";import"./theme.CpRZ4BpD.js";function Y(){const{share:P,isSupported:S}=E();function a(l,n="Bookmark"){return{Win:{content:`[InternetShortcut]
URL=${l}`,extension:".url",mime:"application/internet-shortcut"},Mac:{content:`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>URL</key>
  <string>${l}</string>
</dict>
</plist>`,extension:".webloc",mime:"application/x-apple-plist"},Linux:{content:`[Desktop Entry]
Encoding=UTF-8
Type=Link
Name=${n}
URL=${l}`,extension:".desktop",mime:"application/x-desktop"}}}function d(l,n,c){if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&S){P({title:n,text:c.startsWith("text/")?l:"Your key file",files:[new File([l],n,{type:c})]});return}const y=new Blob([l],{type:c}),r=URL.createObjectURL(y),v=document.createElement("a");v.href=r,v.download=n,document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(r)}return{saveLink:(l,n,c)=>{const r=a(l)[n];!(r!=null&&r.content)||!(r!=null&&r.extension)||d(r.content,`${c||"account"}${r.extension}`,r.mime)},savePng:(l,n)=>{fetch(l).then(c=>c.blob()).then(c=>d(c,`${n||"avatar"}.png`,c.type))},saveJson:(l,n)=>{d(JSON.stringify(l),`${n||"account"}.json`,"application/json")}}}const z={key:0,class:"flex p-4 items-center bg-dark-100 bg-opacity-20 mt-2 shadow-inset"},H={key:0,class:"i-la-lock"},K={key:1,class:"i-la-unlock"},X={class:"text-sm"},Z={class:"flex flex-wrap gap-2 p-2"},ee=["href"],te={key:1,class:"flex w-full justify-center mt-4"},se={class:"p-2 flex flex-col w-full items-start",key:"text"},ne={class:"flex gap-2 items-center mx-4"},le={key:0,class:"px-2"},oe={key:1,class:"px-2"},ie={class:"w-full p-4 text-sm flex-1 rounded-xl break-all select-all",key:"text"},ae={class:"p-2 flex flex-col items-center",key:"png"},re=["src"],ue={class:"p-4 flex flex-col gap-2",key:"link"},de={class:"flex flex-wrap gap-2 items-center mx-4"},ce={key:0,class:"px-2"},ve={key:1,class:"px-2"},pe=["onClick"],me={class:"px-2"},ke=["href"],xe={class:"px-2 font-normal font-mono text-xs"},fe={class:"p-4 flex flex-col gap-2 items-center",key:"qr"},Ce={__name:"AuthCredentials",emits:["close"],setup(P,{emit:S}){const a=B("pass"),{user:d}=V();function l(m){a.value!=m?a.value=m:a.value=null}const{pass:n}=_(),{text:c,copy:y,copied:r,isSupported:v}=I(),{share:h,isSupported:T}=E(),p=B(!0),b=C(()=>{var m;return p.value?(m=n==null?void 0:n.safe)==null?void 0:m.enc:JSON.stringify(d.pair())}),x=C(()=>p.value?n.links.pass:n.links.pair),U=C(()=>M({pub:d.pub,embed:b.value})),{savePng:j,saveLink:A}=Y(),F={Win:"Windows",Mac:"MacOS",Linux:"Linux"};return(m,e)=>{var N,D;return s(d).is?(i(),o("div",{class:"flex flex-col items-stretch pb-4 border-1 border-dark-100 border-opacity-10 max-w-120 mx-auto dark-bg-dark-200",key:s(d).is},[e[26]||(e[26]=t("div",{class:"mt-4 mx-6"},"Please make sure to safely store your cryptographic keypair to be able to use it again later",-1)),g(s(W)),(D=(N=s(n))==null?void 0:N.safe)!=null&&D.enc?(i(),o("div",z,[t("div",{class:"flex flex-col w-34 items-center",style:O({color:p.value?"green":"red"})},[t("button",{class:"m-2 button text-2xl",onClick:e[0]||(e[0]=u=>p.value=!p.value)},[p.value?(i(),o("div",H)):(i(),o("div",K))]),t("div",X,w(p.value?"Encrypted":"Plain Text"),1),e[12]||(e[12]=t("div",{class:"text-m"},"Key Pair",-1))],4),t("div",Z,[t("button",{class:f(["button items-center",{active:a.value=="key"}]),onClick:e[1]||(e[1]=u=>l("key"))},e[13]||(e[13]=[t("div",{class:"i-la-envelope-open-text"},null,-1),t("div",{class:"px-2"},"Text",-1)]),2),t("button",{class:f(["button items-center",{active:a.value=="link"}]),href:x.value,target:"_blank",onClick:e[2]||(e[2]=u=>l("link"))},e[14]||(e[14]=[t("div",{class:"i-la-link"},null,-1),t("div",{class:"px-2"},"Link",-1)]),10,ee),t("button",{class:f(["button items-center",{active:a.value=="qr"}]),onClick:e[3]||(e[3]=u=>l("qr"))},e[15]||(e[15]=[t("div",{class:"i-la-qrcode"},null,-1),t("div",{class:"px-2"},"QR",-1)]),2),t("button",{class:f(["button items-center",{active:a.value=="png"}]),onClick:e[4]||(e[4]=u=>l("png"))},e[16]||(e[16]=[t("div",{class:"i-la-user-circle"},null,-1),t("div",{class:"px-2"},"PNG",-1)]),2)])])):k("",!0),a.value?(i(),o("div",te,[g(L,{name:"fade",mode:"out-in"},{default:$(()=>[a.value=="key"?(i(),o("div",se,[t("div",ne,[s(v)?(i(),o("button",{key:0,class:"button items-center",onClick:e[5]||(e[5]=u=>s(y)(b.value))},[e[17]||(e[17]=t("div",{class:"i-la-copy"},null,-1)),g(L,{name:"fade",mode:"out-in",appear:""},{default:$(()=>[s(r)?(i(),o("div",le,"Copied!")):(i(),o("div",oe,"Copy"))]),_:1})])):k("",!0),s(T)?(i(),o("button",{key:1,class:f(["button items-center",{active:a.value=="pass"}]),onClick:e[6]||(e[6]=u=>s(h)({title:s(d).name||"Gun-Vue keypair",text:b.value}))},e[18]||(e[18]=[t("div",{class:"i-la-share"},null,-1),t("div",{class:"px-1"},"Share",-1)]),2)):k("",!0),t("button",{class:"button items-center",onClick:e[7]||(e[7]=u=>m.downloadJson(b.value))},e[19]||(e[19]=[t("div",{class:"i-la-download"},null,-1),t("div",{class:"px-2"},"Download",-1)]))]),t("div",ie,w(b.value),1)])):a.value=="png"?(i(),o("div",ae,[t("img",{class:"cursor-pointer shadow-lg rounded-full hover-lightness-120 hover-shadow-2xl -hover-translate-y-1 transition active-translate-y-1",src:U.value,onClick:e[8]||(e[8]=u=>s(j)(U.value,s(d).name))},null,8,re),e[20]||(e[20]=t("div",{class:"text-sm op-50 text-center m-4 max-w-50"},"Click the image to download the PNG file with your key embedded. You can use to login later. ",-1))])):a.value=="link"?(i(),o("div",ue,[t("div",de,[s(v)?(i(),o("button",{key:0,class:"button items-center",onClick:e[9]||(e[9]=u=>s(y)(x.value))},[e[21]||(e[21]=t("div",{class:"i-la-copy"},null,-1)),g(L,{name:"fade",mode:"out-in",appear:""},{default:$(()=>[s(r)?(i(),o("div",ce,"Copied!")):(i(),o("div",ve,"Copy"))]),_:1})])):k("",!0),s(T)?(i(),o("button",{key:1,class:f(["button items-center",{active:a.value=="pass"}]),onClick:e[10]||(e[10]=u=>s(h)({title:s(d).name||"Gun-Vue Login link",text:x.value}))},e[22]||(e[22]=[t("div",{class:"i-la-share"},null,-1),t("div",{class:"px-1"},"Share",-1)]),2)):k("",!0),(i(),o(q,null,J(F,(u,R)=>t("button",{class:"button items-center",key:R,onClick:ye=>s(A)(x.value,R,s(d).name)},[e[23]||(e[23]=t("div",{class:"i-la-download"},null,-1)),t("div",me,w(u),1)],8,pe)),64))]),t("a",{class:"m-2 button items-center break-all",href:x.value,target:"_blank",onClick:e[11]||(e[11]=u=>l("links"))},[e[24]||(e[24]=t("div",{class:"i-la-link"},null,-1)),t("div",xe,w(x.value),1)],8,ke)])):a.value=="qr"?(i(),o("div",fe,[g(s(Q),{class:"max-w-600px",data:p.value?s(n).links.pass:s(n).links.pair},null,8,["data"]),e[25]||(e[25]=t("div",{class:"text-sm op-50 text-center mx-4 max-w-80"},"Make a screenshot to save the QR code for logging in later.",-1))])):k("",!0)]),_:1})])):k("",!0),G(m.$slots,"default")])):k("",!0)}}};export{Ce as default};
