import{d as c,h as d,o as t,c as o,G as f,w as k,F as b,C as v,b as y,N as C,k as a,aP as _,a0 as w,j as i,e as x}from"./framework.BtfQKcS5.js";import{a as B,m as G,a_ as N}from"./components.DbnZk3WN.js";import{u as V}from"./useGuests.o0X1Y5nu.js";import"./theme.B2FxFXkD.js";const $={class:"flex flex-wrap"},R=c({__name:"GuestList",props:{state:{type:String,default:"online"}},emits:["user"],setup(l,{emit:g}){const{user:n}=B(),r=V(),u=d(()=>r.guests[n.pub]);return(m,s)=>(t(),o("div",$,[f(_,{name:"fade"},{default:k(()=>[(t(!0),o(b,null,v(a(r)[l.state],(e,p)=>(t(),y(a(G),{class:"shadow-md m-1",key:p,size:30,pub:e.pub,style:C({opacity:e.online?1:.5,order:e.order}),onClick:h=>m.$emit("user",e.pub)},null,8,["pub","style","onClick"]))),128))]),_:1}),a(n).is&&!u.value?(t(),o("button",{key:0,class:"button flex items-center m-4 p-2",onClick:s[0]||(s[0]=w(e=>a(N)(),["stop","prevent"]))},s[1]||(s[1]=[i("div",{class:"i-la-plus"},null,-1),i("div",{class:"ml-2"},"Join",-1)]))):x("",!0)]))}});export{R as default};
