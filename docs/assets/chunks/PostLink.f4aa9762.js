import{n as c,I as m}from"./components.de9791ff.js";import{s as p,g as u,o as i,c as l,t as g,e as d}from"./framework.1b08ecce.js";import"../app.c42b6c21.js";import"./theme.e88ecc74.js";const f={key:0,class:"m-1 flex items-center items-center px-2 py-1 bg-light-700 dark-bg-dark-50 rounded-lg"},x={__name:"PostLink",props:{hash:{type:String,default:""}},setup(n){const r=n,a=c(),t=p({});a.user(m.pub).get("posts").map().once((s,e)=>{e.indexOf(r.hash)==0&&s?t[e.substring(45,87)]=s:delete t[e]});const o=u(()=>Object.keys(t).length);return(s,e)=>o.value>0?(i(),l("button",f,g(o.value),1)):d("",!0)}};export{x as default};
