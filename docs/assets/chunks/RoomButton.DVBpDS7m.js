import{aY as B,j as r,o as R,aZ as $,b8 as w,aR as y}from"./components.DvunW5qa.js";import{u as C}from"./useBackground.B02xPUTO.js";import"./theme.zyIK20Is.js";import{s as x,h as v,o as l,c as n,j as m,k as t,e as c,t as N,P,I as V,w as k,b as j}from"./framework.B82iRX0g.js";const z={class:"mx-2"},S=["src"],_=m("div",{class:"text-2xl font-normal"},"@",-1),D={key:1,class:"ml-1 text-sm"},Z={__name:"RoomButton",emits:["room","rooms","browse"],setup(E){const s=x(!1),u=v(()=>B(r.pub));R("deep");const g=v(()=>C({pub:r.pub,size:200,attachment:"local"})),{logo:i}=$(r.pub);return(a,o)=>{var p,d,b,f;return l(),n("div",z,[m("button",{class:"button",style:P({...g.value}),onClick:o[0]||(o[0]=e=>s.value=!0)},[t(i)?(l(),n("img",{key:0,class:"h-12 rounded-xl mr-2",src:t(i)},null,8,S)):c("",!0),_,(b=(d=(p=u.value)==null?void 0:p.room)==null?void 0:d.profile)!=null&&b.name?(l(),n("div",D,N((f=u.value)==null?void 0:f.room.profile.name.substring(0,15)),1)):c("",!0)],4),V(t(y),{class:"break-all",open:s.value,"close-button":!1,onClose:o[5]||(o[5]=e=>s.value=!1)},{default:k(()=>[(l(),j(t(w),{key:t(r).pub,onRoom:o[2]||(o[2]=e=>a.$emit("room",e)),onRooms:o[3]||(o[3]=e=>a.$emit("rooms")),onBrowse:o[4]||(o[4]=e=>{a.$emit("browse",e),s.value=!1})},{default:k(()=>[m("button",{class:"button m-4",onClick:o[1]||(o[1]=e=>{a.$emit("rooms"),s.value=!1})},"Browse rooms")]),_:1}))]),_:1},8,["open"])])}}};export{Z as default};
