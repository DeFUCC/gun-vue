import{o,c as r,F as n,E as d,P as p,k as e,a2 as k,b as x,e as v}from"./framework.B82iRX0g.js";import{o as i,a6 as a,p as C,A as b}from"./components.DvunW5qa.js";import"./theme.zyIK20Is.js";const g={class:"flex flex-wrap gap-1 m-1"},_=["onClick"],$={__name:"DictLinkList",props:{links:{type:[Array,Object],default:()=>[]},type:{type:String,default:"def"},avatar:Boolean},emits:["def","word"],setup(l){const u=i("light"),c=i("deep");return(f,w)=>(o(),r("div",g,[(o(!0),r(n,null,d(l.links,(m,t)=>(o(),r("div",{class:"p-2 rounded-xl flex gap-1 flex-wrap",key:t,style:p({backgroundColor:t==e(a).word||t==e(a).def?e(c).hex(t):e(u).hex(t)}),onClick:k(y=>f.$emit(l.type,t),["stop","prevent"])},[(o(!0),r(n,null,d(m,(y,s)=>(o(),r("div",{class:"p-1 rounded-full",key:s,style:p({backgroundColor:e(c).hex(s)})},[t==e(a).word||t==e(a).def?(o(),x(e(b),{key:0,pub:s,size:20,onClick:h=>e(C).pub=s},null,8,["pub","onClick"])):v("",!0)],4))),128))],12,_))),128))]))}};export{$ as default};
