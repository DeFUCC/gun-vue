import{_ as v,p as b,c as i,o as r,j as t,G as u,e as c,t as o,N as p,k as e,w as x,a as y,aE as _,aF as k}from"./framework.Cf-rbDpz.js";import{am as w,an as g,a9 as C}from"./components.BYx5MAPp.js";import"./theme.BeDAU7c0.js";const R={class:"cursor-pointer relative text-left"},N={key:0,class:"ml-2 font-bold"},V={class:"p-4 min-w-60vw max-w-full"},D={class:"flex flex-col items-start"},G={class:"p-0 flex items-center flex-wrap w-full"},S={key:0,class:"info"},$={class:"p-0"},h={class:"num p-0"},B={class:"num p-0"},P={class:"num p-0"},E={class:"p-0"},L={__name:"GunRelay",props:{text:{type:String,default:""}},setup(d){const{relay:l,setPeer:m,resetPeer:f}=w(),n=b(!1);return(T,s)=>(r(),i("div",R,[t("button",{class:"flex",onClick:s[0]||(s[0]=a=>n.value=!0)},[s[5]||(s[5]=t("div",{class:"i-carbon-bare-metal-server-01 text-xl -mt-1"},null,-1)),d.text?(r(),i("div",N,o(d.text),1)):c("",!0),t("div",{class:"p-1 bottom-0 left-2 rounded-full transition duration-300ms ease-in-out opacity-50 absolute",style:p({backgroundColor:e(l).blink?"white":"black"})},null,4)]),u(e(C),{open:n.value,onClose:s[4]||(s[4]=a=>n.value=!1)},{default:x(()=>[t("div",V,[t("div",{class:"h-2 w-full mb-2 rounded-full transition-all duration-300 ease-in-out opacity-40",style:p({backgroundColor:e(l).blink?"white":"black"})},null,4),t("div",D,[t("div",G,[s[6]||(s[6]=y(" Host: ")),_(t("input",{class:"mx-1 p-2 rounded-lg flex-auto dark-bg-dark-800","onUpdate:modelValue":s[1]||(s[1]=a=>e(l).peer=a)},null,512),[[k,e(l).peer]]),t("button",{class:"button m-1",onClick:s[2]||(s[2]=a=>e(m)(e(l).peer))},"Set"),t("button",{class:"button m-1",onClick:s[3]||(s[3]=a=>e(f)())},"Reset")]),e(l).status!="offline"?(r(),i("div",S,[t("div",$,"Relay server is "+o(e(l).status)+" for "+o(e(l).age),1),t("div",h,"Delay: "+o(e(l).delay)+" ms",1),t("div",B,"Pulse drift: "+o(e(l).lag)+" ms",1),t("div",P,"Active wires: "+o(e(l).activeWires)+" / "+o(e(l).totalConnections),1),t("div",E,"Data storage is "+o(e(l).store?"enabled":"disabled"),1)])):c("",!0)]),u(e(g))])]),_:1},8,["open"])]))}},A=v(L,[["__scopeId","data-v-eb12b5b3"]]);export{A as default};
