import{_ as u,h as f,g as x,D as i,o as v,c as k,k as t,as as h,at as b,p as g,m as w}from"./framework.1b08ecce.js";import{x as T,aa as y}from"./components.de9791ff.js";import"../app.c42b6c21.js";import"./theme.e88ecc74.js";const o=a=>(g("data-v-a0d4e179"),a=a(),w(),a),S={class:"flex flex-col"},F={class:"flex flex-col text-left"},I={class:"flex flex-wrap bg-dark-100 p-4"},M=o(()=>t("div",{class:"i-la-check"},null,-1)),B=o(()=>t("div",{class:"ml-2"},"Save",-1)),C=[M,B],D=o(()=>t("label",{class:"m-1 button cursor-pointer flex items-center",for:"import-post"},[t("div",{class:"i-la-markdown"}),t("div",{class:"ml-2"},"Load")],-1)),$=o(()=>t("div",{class:"flex-1"},null,-1)),V=o(()=>t("div",{class:"i-la-trash"},null,-1)),E=o(()=>t("div",{class:"ml-2"},"Reset",-1)),L=[V,E],N={__name:"FormText",props:{text:{type:String,default:""}},emits:["update:text","frontmatter","close"],setup(a,{emit:d}){const r=a,c=f(!1),n=x({get(){return r.text},set(l){d("update:text",l)}});i(()=>{});function p(l){var e;T((e=l.target)==null?void 0:e.files,s=>{let{frontmatter:m,content:_}=y(s);d("frontmatter",m),_&&(c.value=!0,i(()=>{}))})}return(l,e)=>(v(),k("div",S,[t("div",F,[h(t("textarea",{class:"dark-bg-dark-200 p-2",id:"myMD",ref:"md","onUpdate:modelValue":e[0]||(e[0]=s=>n.value=s),placeholder:"Main text content (with **markdown** support)"},null,512),[[b,n.value]])]),t("div",I,[t("button",{class:"button m-1",onClick:e[1]||(e[1]=s=>l.$emit("close"))},C),D,t("input",{class:"hidden dark-bg-dark-200",id:"import-post",ref:"file",tabindex:"-1",type:"file",accept:"text/markdown",onChange:e[2]||(e[2]=s=>p(s))},null,544),$,t("button",{class:"button m-1",onClick:e[3]||(e[3]=s=>n.value="")},L)])]))}},q=u(N,[["__scopeId","data-v-a0d4e179"]]);export{q as default};
