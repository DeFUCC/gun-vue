import{d as m,o as n,c as l,j as t,k as s,e as i,aA as p,aJ as u}from"./framework.B82iRX0g.js";import{D as h}from"./components.DvunW5qa.js";import"./theme.zyIK20Is.js";const _={class:"flex flex-col mt-4 bg-light-700 dark-bg-dark-400 p-4 m-2 shadow-lg rounded-xl"},f=t("div",{class:"flex items-center mb-4"},[t("div",{class:"mx-2"},[t("div",{class:"i-la-asterisk"})]),t("div",{class:"px-1"},"Enter a passphrase to encrypt your key with")],-1),k={class:"flex items-center px-4"},v={class:"ml-1 flex flex-col items-center"},x={key:0,class:"i-la-check text-green-600 m-1"},w=["type","placeholder"],y=t("div",{class:"i-la-check"},null,-1),g=t("div",{class:"ml-2"},"Set",-1),b=[y,g],C=t("div",{class:"i-la-eye"},null,-1),A=t("div",{class:"ml-2"},"Show",-1),B=[C,A],N=m({__name:"AuthPass",setup(D){const{pass:e}=h();return(V,o)=>{var c,r,d;return n(),l("div",_,[f,t("div",k,[t("div",v,[(c=s(e).safe)!=null&&c.enc?(n(),l("div",x)):i("",!0)]),p(t("input",{class:"p-2 mx-4 rounded-xl w-full dark-bg-dark-200","onUpdate:modelValue":o[0]||(o[0]=a=>s(e).input=a),autocomplete:"current-password",type:s(e).show?"text":"password",placeholder:`Your passphrase of ${s(e).minLength} or more letters`},null,8,w),[[u,s(e).input]]),s(e).input.length>=s(e).minLength?(n(),l("button",{key:0,class:"button items-center",onClick:o[1]||(o[1]=a=>s(e).set())},b)):i("",!0),(d=(r=s(e))==null?void 0:r.safe)!=null&&d.enc?(n(),l("button",{key:1,class:"button items-center",onClick:o[2]||(o[2]=a=>s(e).show=!s(e).show)},B)):i("",!0)])])}}});export{N as default};
