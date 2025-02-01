import{d as g,o as a,c as d,j as s,n as o,k as n,N as v,F as f,C as y,aD as b,aU as p,e as m,_ as C}from"./framework.BtfQKcS5.js";import{a$ as w}from"./components.DbnZk3WN.js";import"./theme.B2FxFXkD.js";const x={class:"z-10 absolute top-4 left-4 right-4"},$={class:"is-group flex gap-2 px-2 py-1"},z={class:"is-group flex flex-wrap"},D=["onClick"],B={class:"i-carbon-pin-filled transform -rotate-45"},M={class:"i-carbon-pin"},S={class:"i-carbon-error"},j={class:"i-carbon-close-outline"},N=g({__name:"SpaceDraw",setup(F){const{brush:i,drauu:c,draw:t}=w();function r(u){t.mode=u,t.enabled=!0}function k(u){i.color=u,t.enabled=!0}return(u,e)=>(a(),d("div",x,[s("button",{class:o(["text-6xl absolute",{active:n(t).enabled}]),style:v({opacity:n(t).enabled?.2:1}),onClick:e[0]||(e[0]=l=>n(t).enabled=!n(t).enabled)},e[12]||(e[12]=[s("div",{class:"i-carbon-pen"},null,-1)]),6),n(t).enabled?(a(),d("div",{key:0,class:o(["flex flex-wrap text-xl p-2 gap-2 justify-center rounded-md bg-main shadow transition-opacity duration-200 dark-border dark-border-gray-400 dark-border-opacity-10 bg-light-300 dark-bg-dark-300 bg-opacity-90",n(t).enabled?"":n(t).pinned?"opacity-40 hover-opacity-90":"pointer-events-none"]),"storage-key":"slidev-drawing-pos","initial-x":10,"initial-y":10},[s("button",{class:"w-6 flex items-center justify-center",onClick:e[1]||(e[1]=l=>n(i).size=n(t).sizes.next())},[s("div",{class:"bg-current rounded-full",style:v({width:n(i).size+4+"px",height:n(i).size+4+"px",backgroundColor:n(i).color})},null,4)]),s("div",$,[s("button",{class:o({active:n(t).mode=="stylus"}),onClick:e[2]||(e[2]=l=>r("stylus"))},e[13]||(e[13]=[s("div",{class:"i-carbon-pen"},null,-1)]),2),s("button",{class:o({active:n(t).mode=="line"}),onClick:e[3]||(e[3]=l=>r("line"))},e[14]||(e[14]=[s("svg",{class:"-mt-1",width:"1em",height:"1em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},[s("path",{d:"M21.71 3.29a1 1 0 0 0-1.42 0l-18 18a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l18-18a1 1 0 0 0 0-1.42z",fill:"currentColor"})],-1)]),2),s("button",{class:o({active:n(t).mode=="arrow"}),onClick:e[4]||(e[4]=l=>r("arrow"))},e[15]||(e[15]=[s("div",{class:"i-carbon-arrow-up-right"},null,-1)]),2),s("button",{class:o({active:n(t).mode=="ellipse"}),onClick:e[5]||(e[5]=l=>r("ellipse"))},e[16]||(e[16]=[s("div",{class:"i-carbon-radio-button"},null,-1)]),2),s("button",{class:o({active:n(t).mode=="rectangle"}),onClick:e[6]||(e[6]=l=>r("rectangle"))},e[17]||(e[17]=[s("div",{class:"i-carbon-checkbox"},null,-1)]),2)]),s("div",z,[(a(!0),d(f,null,y(n(t).colors,l=>(a(),d("button",{key:l,class:o(n(i).color===l?"active":"shallow"),onClick:R=>k(l)},[s("div",{class:o(["w-6 h-6 transition-all transform border border-gray-400 border-opacity-50",n(i).color!==l?"rounded-1/2 scale-85":"rounded-md"]),style:v(n(t).enabled?{background:l}:{borderColor:l})},null,6)],10,D))),128))]),s("button",{class:o({disabled:!n(t).canUndo}),onClick:e[7]||(e[7]=l=>n(c).undo())},e[18]||(e[18]=[s("div",{class:"i-carbon-undo"},null,-1)]),2),s("button",{class:o({disabled:!n(t).canRedo}),onClick:e[8]||(e[8]=l=>n(c).redo())},e[19]||(e[19]=[s("div",{class:"i-carbon-redo"},null,-1)]),2),s("button",{class:o({disabled:!n(t).canClear}),onClick:e[9]||(e[9]=l=>n(t).clear())},e[20]||(e[20]=[s("div",{class:"i-carbon-delete"},null,-1)]),2),s("button",{class:o({shallow:!n(t).pinned}),onClick:e[10]||(e[10]=l=>n(t).pinned=!n(t).pinned)},[b(s("div",B,null,512),[[p,n(t).pinned]]),b(s("div",M,null,512),[[p,!n(t).pinned]])],2),n(t).enabled?(a(),d("button",{key:0,class:o({shallow:!n(t).enabled}),onClick:e[11]||(e[11]=l=>n(t).enabled=!n(t).enabled)},[b(s("div",S,null,512),[[p,n(t).pinned]]),b(s("div",j,null,512),[[p,!n(t).pinned]])],2)):m("",!0)],2)):m("",!0)]))}}),E=C(N,[["__scopeId","data-v-4f9ae278"]]);export{E as default};
