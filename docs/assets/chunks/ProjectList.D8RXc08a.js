import{h as d,o as l,c as n,j as o,aA as m,aB as v,I as p,w as f,F as h,E as _,b as r,P as x,k,aI as y,e as g}from"./framework.B82iRX0g.js";import{j as w,P as B}from"./components.DvunW5qa.js";import{u as C}from"./useProjects.DMmAJSIb.js";import"./theme.zyIK20Is.js";import P from"./ProjectForm.BOGolACT.js";import"./useProject.DnV1xsrF.js";const V={class:"flex flex-col"},$={class:"p-2 flex flex-col gap-2"},b={class:"flex flex-wrap gap-4 p-2"},N={class:"p-2 flex flex-col gap-2"},D={__name:"ProjectList",emits:["open"],setup(A){const t=d(()=>{var a;return C((a=w)==null?void 0:a.pub)});return(a,s)=>(l(),n("div",V,[o("div",$,[m(o("input",{class:"p-2 rounded-xl shadow dark-bg-dark-400","onUpdate:modelValue":s[0]||(s[0]=e=>t.value.search.value=e),placeholder:"Start typing a project title"},null,512),[[v,t.value.search.value]])]),o("div",b,[p(y,{name:"list"},{default:f(()=>[(l(!0),n(h,null,_(t.value.candidates.value,(e,u)=>{var c;return l(),r(k(B),{key:u,project:e==null?void 0:e.item,path:(c=e==null?void 0:e.item)==null?void 0:c.path,style:x({opacity:1-(e==null?void 0:e.score)}),onClick:E=>{var i;return a.$emit("open",(i=e==null?void 0:e.item)==null?void 0:i.path)}},null,8,["project","path","style","onClick"])}),128))]),_:1})]),o("div",N,[t.value.search.value?(l(),r(P,{key:0,title:t.value.search.value,onAdded:s[1]||(s[1]=e=>t.value.search.value="")},null,8,["title"])):g("",!0)])]))}};export{D as default};
