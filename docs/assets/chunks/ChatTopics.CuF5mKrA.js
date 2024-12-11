import{d as B,p as d,o as t,c as l,k as o,t as p,e as f,G as y,w as h,j as s,T as b,aB as $,aC as A,Y as N,F as v,C as g,b as V}from"./framework.D0CZGv0r.js";import{T as z,U as S,A as D}from"./components.BF3VL1wl.js";import{u as F}from"./useChat.tFy8ystB.js";import"./theme.DNNfahvK.js";const K={class:"flex flex-wrap"},L={class:"text-xl font-bold p-2"},M={key:0,class:"i-la-plus"},O={key:1,class:"i-la-times"},P={key:0,class:"flex flex-wrap"},U={class:"flex flex-col p-2 gap-2 h-full"},j=["onClick"],E={class:"flex-1"},H=B({__name:"ChatTopics",props:{title:{type:String,default:"Topics"},topic:{type:String,default:"general"}},emits:["topic"],setup(x){const{addChat:C,chats:w}=F(),r=d(""),n=d(!1),m=d(),i=d(!0),u=z("(min-width: 640px)");return S(m,()=>u.value?null:i.value=!1),(_,e)=>(t(),l(v,null,[!i.value&&!o(u)?(t(),l("button",{key:0,class:"button absolute z-200 top-4 left-4",onClick:e[0]||(e[0]=a=>i.value=!0)},p(x.title),1)):f("",!0),y(b,{name:"fade"},{default:h(()=>[o(u)||i.value&&!o(u)?(t(),l("div",{key:0,class:"px-1 py-2 flex flex-col bg-dark-50 dark-bg-dark-400 bg-opacity-95 gap-2 min-h-full overflow-y-scroll scroll-smooth absolute sm-static z-20 w-220px max-w-full max-h-full text-light-900 backdrop-filter backdrop-blur-xl",ref_key:"chatsPanel",ref:m,style:{flex:"0 1 320px"}},[s("div",K,[s("div",L,p(x.title),1),e[4]||(e[4]=s("div",{class:"flex-1"},null,-1)),s("div",{class:"cursor-pointer self-center text-2xl p-2",onClick:e[1]||(e[1]=a=>n.value=!n.value)},[y(b,{name:"fade",mode:"out-in"},{default:h(()=>[n.value?(t(),l("div",O)):(t(),l("div",M))]),_:1})])]),n.value?(t(),l("div",P,[$(s("input",{class:"p-2 m-2 w-full rounded-xl text-dark-800","onUpdate:modelValue":e[2]||(e[2]=a=>r.value=a),placeholder:"New chat",onKeyup:e[3]||(e[3]=N(a=>{o(C)(r.value),r.value="",n.value=!1},["enter"]))},null,544),[[A,r.value]])])):f("",!0),s("div",U,[(t(!0),l(v,null,g(o(w),(a,c)=>(t(),l("div",{class:"font-bold bg-light-100 bg-opacity-10 rounded-xl px-2 cursor-pointer flex",key:c,onClick:T=>{_.$emit("topic",c),i.value=!1}},[s("div",E,p(c),1),(t(!0),l(v,null,g(a,(T,k)=>(t(),V(o(D),{key:k,size:20,pub:k},null,8,["pub"]))),128))],8,j))),128))])],512)):f("",!0)]),_:1})],64))}});export{H as default};
