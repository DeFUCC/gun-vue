import{n as u,b4 as p}from"./components.de9791ff.js";import"../app.c42b6c21.js";import{g as m,s as f,o as n,c as r,k as o,Q as g,l as b,t as i,e as y}from"./framework.1b08ecce.js";import"./theme.e88ecc74.js";const h=["title"],x={class:"text-4xl"},k={class:"px-1 font-bold"},_={key:0,class:"i-la-lock-open text-xs absolute top-1 right-1 opacity-30"},v={class:"absolute bottom-1 right-1 text-xs opacity-30"},R={__name:"RoomFeature",props:{cert:{type:String,default:""},open:{type:[Boolean,String],default:!1},title:{type:String,default:""},type:{type:String,default:""},pub:{type:String,default:"OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk"}},emits:["browse"],setup(t){const s=t,c=m(()=>{const a=u(),e=f({});return a.user(s.pub).get(s.type).map().once((l,d)=>{l&&(e[d]=!0)}),e});return(a,e)=>(n(),r("div",{class:"cursor-pointer flex-1 flex flex-col items-center p-4 relative bg-light-700 dark-bg-dark-200 rounded-lg shadow-sm transition hover-shadow-lg",title:t.cert},[o("div",x,[g(b(p),{icon:t.type},null,8,["icon"])]),o("div",k,i(t.title),1),t.open?(n(),r("div",_)):y("",!0),o("div",v,i(Object.keys(c.value).length),1)],8,h))}};export{R as default};
