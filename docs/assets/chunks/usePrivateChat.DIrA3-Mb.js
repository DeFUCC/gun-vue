import{h,a as d,S as p,R as y}from"./components.DvunW5qa.js";import{ak as w,s as v,h as S}from"./framework.B82iRX0g.js";function C(s){const r=h(),{user:o}=d(),e=w({epub:"",messages:{},sorted:[],async send(a){if(!a)return;const t=new Date,n={timestamp:t.getTime(),text:a},i=t.toLocaleDateString("en-CA"),u=await o.secret(e.epub),g=await p.work(u,void 0,void 0,{salt:i}),f=await p.encrypt(n,g);r.user().get("chat").get(s).get(i).set(f)}});r.user(s).get("epub").once(a=>e.epub=a),r.user(s).get("chat").get(o.pub).map().once(function(a,t){c(a,t,s,this)}),r.user().get("chat").get(s).map().once(function(a,t){c(a,t,o.pub,this)});function c(a,t,n,i){i.map().on(async(u,g)=>{if(typeof u!="number"&&u&&u.startsWith("SEA")){const f=await o.secret(e.epub),b=await p.work(f,void 0,void 0,{salt:t}),m=await p.decrypt(u,b);if(!m||typeof m!="object")return;const l={timestamp:m.timestamp,author:n,text:m.text};e.messages[g]=l}})}return y(()=>e.messages,a=>{e.sorted=Object.values(e.messages||{}).sort((t,n)=>(t==null?void 0:t.timestamp)>(n==null?void 0:n.timestamp)?1:-1)},{debounce:200,immediate:!0,deep:!0}),e}function x(s){const r=h(),{user:o}=d(),e=w({}),c=v(!1);return r.user(s).get("epub").on(t=>c.value=t),r.user(s).get("chat").get(o.pub).map().map().on((t,n)=>{t&&!t.startsWith("SEA")||(e[n]=t)}),r.user().get("chat").get(s).map().map().on((t,n)=>{t&&!t.startsWith("SEA")||(e[n]=t)}),{count:S(()=>Object.keys(e).length),available:c}}function D(){const s=h(),{user:r}=d(),o=w({});return r.is&&(s.user().get("chat").map().on((e,c)=>{o[c]=e}),s.user().get("mates").map().on(async(e,c)=>{await s.user(c).get("epub").then()&&(o[c]=e)})),o}export{x as a,D as b,C as u};
