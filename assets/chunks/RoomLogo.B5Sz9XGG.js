import{c as t,o as s,j as l,b as d,e as f,k as e,w as g,a0 as v}from"./framework.BfubPTv1.js";import{h as _,aN as b,a as k,aO as h,aw as x}from"./components.f3q26e0v.js";import"./theme.fBQ8eXbj.js";const y={class:"flex flex-col relative items-center justify-center"},R=["src"],N={class:"text-2xl"},w={key:0,class:"i-la-camera"},P={__name:"RoomLogo",props:{pub:{type:String,default:_.pub},size:{type:Number,default:120},pic:{type:Number,default:200}},setup(u){const{room:c,updateRoomProfile:B}=b(),{user:n}=k(),a=u,{logo:r,uploadLogo:p,removeLogo:m}=h(a.pub);return(L,o)=>(s(),t("div",y,[l("img",{src:e(r)||"https://gun-vue.js.org/media/gun-vue-logo.svg"},null,8,R),e(c).hosts[e(n).pub]?(s(),d(e(x),{key:0,class:"absolute",options:{picSize:a.pic,preserveRatio:!1},onUpdate:o[1]||(o[1]=i=>e(p)(i))},{default:g(()=>[l("div",N,[e(r)?(s(),t("div",{key:1,class:"i-la-trash-alt",onClick:o[0]||(o[0]=v(i=>e(m)(),["stop","prevent"]))})):(s(),t("div",w))])]),_:1},8,["options"])):f("",!0)]))}};export{P as default};
