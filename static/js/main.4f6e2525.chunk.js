(this["webpackJsonpfcav-mvp"]=this["webpackJsonpfcav-mvp"]||[]).push([[0],{135:function(e,t,a){e.exports=a.p+"static/media/nemac_logo_white.b9acf019.png"},136:function(e,t,a){e.exports=a.p+"static/media/nemac_logo_black.f0b63d98.png"},137:function(e,t,a){e.exports=a.p+"static/media/forwarn2-legend.e6734a0a.png"},173:function(e,t,a){e.exports=a(301)},301:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(19),o=a.n(l),i=(a(178),a(100)),c=a.n(i),s=a(132),u=a(11),m=a(3),p=a.n(m),f={juliandates:["001","009","017","025","033","041","049","057","065","073","081","089","097","105","113","121","129","137","145","153","161","169","177","185","193","201","209","217","225","233","241","249","257","265","273","281","289","297","305","313","321","329","337","345","353","361"],wms_template:function(e,t){return[{baseUrl:"https://fswms.nemac.org/forwarn_compare",options:{layers:"FW_".concat(e,"_1YR_FW2"),format:"image/png",transparent:!0,tileSize:2048,uppercase:!0,opacity:0},leafletLayer:""},{baseUrl:"https://fswms.nemac.org/forwarn_compare",options:{layers:"FW_".concat(e,"_ALC_FW2"),format:"image/png",transparent:!0,tileSize:2048,uppercase:!0,opacity:0},leafletLayer:""},{baseUrl:"https://fswms.nemac.org/forwarn_compare",options:{layers:"FW_".concat(e,"_3YR_FW2"),format:"image/png",transparent:!0,tileSize:2048,uppercase:!0,opacity:0},leafletLayer:""},{baseUrl:"https://fswms.nemac.org/forwarn_compare",options:{layers:"FW_".concat(e,"_5YR_FW2"),format:"image/png",transparent:!0,tileSize:2048,uppercase:!0,opacity:0},leafletLayer:""},{baseUrl:"https://fswms.nemac.org/forwarn_compare",options:{layers:"FW_".concat(e,"_MEDIAN_ALL_YEAR_FW2"),format:"image/png",transparent:!0,tileSize:2048,uppercase:!0,opacity:0},leafletLayer:""}][t]},baseLayers:[{name:"Streets",url:"https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHVrZWpheSIsImEiOiJjazVoM3JwaTMwZXJiM2t0ZDZyZnF5bnN3In0.NQ71qNFEXZZzlOhYyWlIPg",attribution:"",layer:"",theme:"light"},{name:"Light",url:"https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHVrZWpheSIsImEiOiJjazVoM3JwaTMwZXJiM2t0ZDZyZnF5bnN3In0.NQ71qNFEXZZzlOhYyWlIPg",attribution:"",layer:"",theme:"light"},{name:"Dark",url:"https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHVrZWpheSIsImEiOiJjazVoM3JwaTMwZXJiM2t0ZDZyZnF5bnN3In0.NQ71qNFEXZZzlOhYyWlIPg",attribution:"",layer:"",theme:"dark"},{name:"Outdoors",url:"https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHVrZWpheSIsImEiOiJjazVoM3JwaTMwZXJiM2t0ZDZyZnF5bnN3In0.NQ71qNFEXZZzlOhYyWlIPg",attribution:"",layer:"",theme:"light"},{name:"Satellite",url:"https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHVrZWpheSIsImEiOiJjazVoM3JwaTMwZXJiM2t0ZDZyZnF5bnN3In0.NQ71qNFEXZZzlOhYyWlIPg",attribution:"",layer:"",theme:"dark"}],productsList:["From Prior Year","Early Detect","From Prior 3-Year Max","From Prior 5-Year 90th Percentile","From All-Prior-Year Median"],themesList:["Dark","Light"]},g=a(333),b=a(343),d=a(336),h=a(342),y=a(338),v=a(135),O=a.n(v),E=a(136),j=a.n(E),x=a(137),I=a.n(x),w=a(341),k=a(346),D=a(350),L=a(348),_=a(24),S=a(344),Z=a(146),T=a(349),F=a(331),M=a(334),C=(a(144),a(101)),N=a.n(C),z=a(145),W=a.n(z),J=a(345),Y=a(337);function A(e,t){e=parseInt(e);var a=0,n=[0,31,59,90,120,151,181,212,243,273,304,334];(function(e){return e%4===0&&e%100!==0||e%400===0})(t)&&(n=[0,31,60,91,121,152,182,213,244,274,305,335]);for(var r=0;r<n.length;r++)e>n[r+1]&&(a=r+1);var l=e-n[a];return new Date(t,a,l)}function P(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=String(e.getFullYear()),n=String(e.getMonth()+1),r=String(e.getDate());n.length<2&&(n="0"+n),r.length<2&&(r="0"+r);return t?a+"-"+n+"-"+r:a+n+r}function R(e){for(var t,a=(t=e.getFullYear(),f.juliandates.map((function(e){return A(parseInt(e)+7,t)}))),n=0;n<a.length;n++)if(a[n]>=e)return a[n];return A(parseInt(f.juliandates[0],e.getFullYear()+1))}Date.prototype.isLeapYear=function(){var e=this.getFullYear();return 0==(3&e)&&(e%100!=0||e%400==0)},Date.prototype.getDOY=function(){var e=this.getMonth(),t=this.getDate(),a=[0,31,59,90,120,151,181,212,243,273,304,334][e]+t;return e>1&&this.isLeapYear()&&a++,a};var V=a(330),H=a(147),X=a(78),U={light:Object(H.a)({palette:{primary:{main:"#f5f5f5"},secondary:{main:"#222222"},error:{main:X.a.A400},background:{default:"#f5f5f5"},appBar:{main:"#556cd6",contrastText:"#222222"},nemacLogo:"./nemac_logo_black.png"}}),dark:Object(H.a)({palette:{type:"dark",primary:{main:"#26292C",light:"rgb(81, 91, 95)",dark:"rgb(26, 35, 39)",contrastText:"#ffffff"},secondary:{main:"#ffffff",light:"rgb(255, 197, 112)",dark:"rgb(200, 147, 89)",contrastText:"rgba(0, 0, 0, 0.87)"},appBar:{main:"#555555",contrastText:"#ffffff"},error:{main:X.a.A400},nemacLogo:"./nemac_logo_white.png"}})};var B=r.a.createContext({currentTheme:"dark",setTheme:null}),q=function(e){var t=e.children,a=localStorage.getItem("appTheme")||"dark",l=Object(n.useState)(a),o=Object(u.a)(l,2),i=o[0],c=o[1],s=function(e){return U[e]}(i),m={currentTheme:i,setTheme:function(e){localStorage.setItem("appTheme",e),c(e)}};return r.a.createElement(B.Provider,{value:m},r.a.createElement(V.a,{theme:s},t))},G=(a(182),a(183),a(139)),Q=(a(184),a(149)),K=a(143),$=a(23),ee=a(148);$.b.register(ee.a);var te=[35,-82];function ae(e,t){var a=Object(n.useState)(e),r=Object(u.a)(a,2),l=r[0],o=r[1];return Object(n.useDebugValue)("".concat(t,": ").concat(l)),[l,o]}var ne=document.getElementById("app");o.a.render(r.a.createElement(q,null,r.a.createElement((function(e){function t(e){return function(e){var t=Object(n.useRef)();return Object(n.useEffect)((function(){t.current=e})),t.current}(e)!==e}var a=Object(n.useContext)(B).setTheme,l=ae(!0),o=Object(u.a)(l,2),i=o[0],m=o[1],v=Object(F.a)({root:{width:300},modal:{display:"flex",alignItems:"center",justifyContent:"center"},paper:{position:"absolute",color:"white",width:"100%",height:"45vh",background:"rgb(26, 35, 39)",boxShadow:24,padding:4}})(),E=ae(!1),x=Object(u.a)(E,2),C=x[0],z=(x[1],ae(!1,"GraphOn")),A=Object(u.a)(z,2),V=A[0],H=A[1],X=ae([0,0],"currentGraphCoords"),U=Object(u.a)(X,2),q=U[0],$=U[1],ee=t(q),ne=ae("90vh","mapHeight"),re=Object(u.a)(ne,2),le=re[0],oe=(re[1],ae("","map")),ie=Object(u.a)(oe,2),ce=ie[0],se=ie[1],ue=function(){H(!V);var e=document.querySelector(".mapContainer");V?e.style.setProperty("height","90vh"):e.style.setProperty("height","45vh"),ce.invalidateSize()},me=ae({labels:["1","2","3","4","5","6"],coordinates:[0,0],datasets:[{label:"# of Votes",data:[],fill:!1,backgroundColor:"rgb(3, 237, 96)",borderColor:"rgba(3, 237, 96, 0.8)",xAxisID:"xAxis"}]},"MODIS CHART DATA"),pe=Object(u.a)(me,2),fe=pe[0],ge=pe[1],be=ae({maintainAspectRatio:!1,plugins:{annotation:{annotations:[{drawTime:"afterDatasetsDraw",type:"line",mode:"vertical",scaleID:"xAxis",value:0,borderWidth:5,borderColor:"white",label:{content:"TODAY",enabled:!0,position:"top"}}]}},scales:{yAxes:[{ticks:{beginAtZero:!0,steps:10,stepValue:5,max:100,fontColor:"white"}}]}},"MODIS CHART CONFIG"),de=Object(u.a)(be,2),he=de[0],ye=de[1],ve=Object(n.useState)(null),Oe=Object(u.a)(ve,2),Ee=(Oe[0],Oe[1],Object(n.useState)(!1)),je=Object(u.a)(Ee,2),xe=(je[0],je[1],Object(n.useState)([])),Ie=Object(u.a)(xe,2),we=(Ie[0],Ie[1],ae(new Date("2020-01-16"),"startDate")),ke=Object(u.a)(we,2),De=ke[0],Le=ke[1],_e=ae(new Date("2021-02-17"),"endDate"),Se=Object(u.a)(_e,2),Ze=Se[0],Te=Se[1],Fe=ae(0,"dateRangeIndex"),Me=Object(u.a)(Fe,2),Ce=Me[0],Ne=Me[1],ze=ae(new Date("2020-01-16"),"currentDate"),We=Object(u.a)(ze,2),Je=(We[0],We[1]),Ye=t(Ce),Ae=t(De),Pe=t(Ze),Re=f.baseLayers,Ve=ae(2,"basemapIndex"),He=Object(u.a)(Ve,2),Xe=He[0],Ue=He[1],Be=Object(n.useRef)(),qe=t(Xe),Ge=ae(0,"productIndex"),Qe=Object(u.a)(Ge,2),Ke=Qe[0],$e=Qe[1],et=t(Ke),tt=f.productsList,at=ae(xt(De,Ze,Ke),"fullWMSLayers"),nt=Object(u.a)(at,2),rt=nt[0],lt=nt[1],ot=f.themesList,it=ae(0,"themeIndex"),ct=Object(u.a)(it,2),st=ct[0],ut=ct[1],mt=ae([],"mapControls"),pt=Object(u.a)(mt,2),ft=(pt[0],pt[1],ae(!0,"initialrender")),gt=Object(u.a)(ft,2),bt=gt[0],dt=gt[1],ht=function(e){var t=e.getDate().toString();t.length<2&&(t="0"+t);var a=(e.getMonth()+1).toString();a.length<2&&(a="0"+a),Le(e);var n=xt(e,Ze,Ke);lt(n),Ne(0)},yt=function(e){var t=e.getDate().toString();t.length<2&&(t="0"+t);var a=(e.getMonth()+1).toString();a.length<2&&(a="0"+a),Te(e);var n=xt(De,e,Ke);lt(n),Ne(0)},vt=function(e){var t=e.target.value;Ue(t)},Ot=function(e){var t=e.target.value;ut(t)},Et=function(e){var t=e.target.value;$e(t);var a=xt(De,Ze,t);lt(a),Ne(0)},jt=function(e,t){t!==Ce&&(Ne(t),Je(rt[t].date))};function xt(e,t,a){for(var n=[],r=R(e);r<=t;){var l=P(r),o=f.wms_template(l,a);o.leafletLayer=p.a.tileLayer.wms(o.baseUrl,o.options),o.date=r,n.push(o),r.setDate(r.getDate()+1),r=R(r)}return n}function It(e,t){return wt.apply(this,arguments)}function wt(){return(wt=Object(s.a)(c.a.mark((function e(t,a){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:kt(t,a).then((function(e){if(null!=e.mugl){console.log("data fetch success"),console.log(e);var n=Dt(e.mugl.data.values),r=Lt(e.mugl.data.values),l=Object.assign({},fe);l.labels=r,l.coordinates=[t,a],l.datasets[0].label=e.mugl.verticalaxis.title,l.datasets[0].data=n,ge(l)}else console.log("invalid coordinates selected, do nothing")}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function kt(e,t){return fetch("https://fcav-ndvi-dev.nemac.org/tsmugl_product.cgi?args=CONUS_NDVI,"+e+","+t).then((function(e){return e.text()})).then((function(e){return Object(K.parse)(e)})).catch((function(e){console.log("invalid coords")}))}function Dt(e){for(var t=e.split("\n"),a=0;a<t.length;a++){var n=t[a];n=n.substr(9,11),t[a]=parseInt(n),t[a]<0&&(t[a]=0)}return t}function Lt(e){for(var t=e.split("\n"),a=0;a<t.length;a++){var n=t[a],r=(n=n.substr(0,8)).substr(0,4),l=n.substr(4,2),o=n.substr(6,2);n=l+"/"+o+"/"+r,t[a]=n}for(var i=0,c=0,s=[t.length],u=0;u<t.length;u++){var m=t[u],p=m.substr(0,2),f=m.substr(3,2),g=m.substr(6,4),b=new Date(parseInt(g),parseInt(p)-1,parseInt(f));s[u]=b}console.log(s);for(var d=0;d<s.length;d++)De>s[d]&&(i=d+1);for(var h=s.length;h>0;h--)Ze<s[h]&&(c=h);return console.log(i+", "+c),t.slice(i,c)}function _t(e){return r.a.createElement(M.a,{letiant:"contained",color:"secondary",className:v.button,startIcon:V?r.a.createElement(N.a,null):r.a.createElement(W.a,null),onClick:ue},V?"Hide Graph":"Show Graph")}var St=function(){return r.a.createElement(J.a,{className:v.paper},r.a.createElement(Y.a,{variant:"h4",align:"center"}," MODIS NDVI ",fe.coordinates[0].toFixed(2)+", "+fe.coordinates[1].toFixed(2)," "),r.a.createElement("div",{style:{height:"35vh"}},r.a.createElement(Q.a,{data:fe,options:he,plugins:[]})))};function Zt(){return r.a.createElement(_.a,{utils:Z.a},r.a.createElement(S.a,{style:{marginRight:16},disableToolbar:!0,letiant:"inline",format:"MM/dd/yyyy",margin:"normal",id:"date-picker-inline",label:"Start Date",value:De,onChange:ht,KeyboardButtonProps:{"aria-label":"change date"}}),r.a.createElement("div",{className:v.root,style:{marginRight:16,marginTop:16}},r.a.createElement(T.a,{color:"secondary",defaultValue:Ce,"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",step:1,marks:!0,min:0,max:rt.length-1,onChangeCommitted:jt})),r.a.createElement(S.a,{style:{marginRight:16},disableToolbar:!0,letiant:"inline",format:"MM/dd/yyyy",margin:"normal",id:"date-picker-inline",label:"End Date",value:Ze,onChange:yt,KeyboardButtonProps:{"aria-label":"change date"}}))}function Tt(){return r.a.createElement(w.a,{letiant:"outlined",style:{marginRight:16}},r.a.createElement(L.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label"},"Basemap"),r.a.createElement(k.a,{labelId:"fcav-basemap-select-label",id:"fcav-basemap-select",value:Xe,onChange:vt,label:"Product"},Re.map((function(e,t){return r.a.createElement(D.a,{key:t,value:t},e.name)}))))}function Ft(){return Object(n.useEffect)((function(){var e=ot[st];e=e.toLowerCase(),a(e),m("dark"===e)}),[st]),r.a.createElement(w.a,{letiant:"outlined",style:{marginRight:16}},r.a.createElement(L.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label"},"Theme"),r.a.createElement(k.a,{labelId:"fcav-theme-select-label",id:"fcav-theme-select",value:st,onChange:Ot,label:"Theme"},ot.map((function(e,t){return r.a.createElement(D.a,{key:t,value:t},e)}))))}function Mt(){return r.a.createElement(w.a,{letiant:"outlined",style:{marginRight:16}},r.a.createElement(L.a,{shrink:!0,id:"demo-simple-select-placeholder-label-label"},"Product"),r.a.createElement(k.a,{labelId:"fcav-product-select-label",id:"fcav-product-select",value:Ke,onChange:Et,label:"Product"},tt.map((function(e,t){return r.a.createElement(D.a,{key:t,value:t},e)}))))}return r.a.createElement("div",null,r.a.createElement(d.a,{container:!0},r.a.createElement((function(){return r.a.createElement(d.a,{item:!0,xs:12},r.a.createElement(h.a,{position:"static",style:{zIndex:"0",flexWrap:"flex",flexDirection:"column"}},r.a.createElement(y.a,null,r.a.createElement("img",{src:i?O.a:j.a,width:"150",alt:"your mom"}),r.a.createElement(Tt,null),r.a.createElement(Zt,null),r.a.createElement(Mt,null),r.a.createElement(Ft,null),r.a.createElement(_t,null))))}),null),r.a.createElement(d.a,{item:!0,xs:12},r.a.createElement(b.a,{className:"mapContainer",whenCreated:function(e){e.on("click",(function(e){var t=e.latlng,a=t.lat,n=t.lng;$([a,n])}))},center:te,zoom:13,style:{height:le,display:"flex"}},r.a.createElement((function(){var e=Object(G.geosearch)(),t=Object(g.a)();se(t);var a=function(){console.log("Clearing map..."),t.eachLayer((function(e){Be.current!==e&&(console.log("Removing layer: "),console.log(e),t.removeLayer(e))}))};if(Object(n.useEffect)((function(){if(qe||bt){console.log("basemap change hook"),null!=Be.current&&t.removeLayer(Be.current);Be.current;var e=Re[Xe],a=new p.a.tileLayer(e.url,{opacity:0,attribution:e.attribution});t.addLayer(a),a.bringToBack(),a.setOpacity(1),Be.current=a}if(qe&&!bt)return function(){}}),[qe,Xe]),Object(n.useEffect)((function(){(et||bt)&&(console.log("Product change hook"),a())}),[et,Ke]),Object(n.useEffect)((function(){if(Ye||bt||et){a();var e=rt[Ce];if(console.log("new layer: "),console.log(e),t.hasLayer(e.leafletLayer)||(console.log("adding layer to the map..."),t.addLayer(e.leafletLayer)),e.leafletLayer.bringToFront(),e.leafletLayer.setOpacity(1),C){var n=Ce+1===rt.length?0:Ce+1,r=setTimeout((function(){Ne(n)}),1e4);return function(){r&&clearTimeout(r)}}if(V){var l=Object.assign({},he);l.plugins.annotation.annotations[0].value=function(){fe.labels[Ce];for(var e=[rt.length],t=0;t<rt.length;t++){var a=rt[t].options.layers,n=a.substr(3,4),r=a.substr(7,2)+"/"+a.substr(9,2)+"/"+n;e[t]=r}return fe.labels.indexOf(e[Ce])}(),l.plugins.annotation.annotations[0].label.content=fe.labels[Ce],ye(l)}}}),[Ye,Ce,Ke]),Object(n.useEffect)((function(){C&&rt.forEach((function(e){e.leafletLayer.setOpacity(0),t.hasLayer(e.leafletLayer)||t.addLayer(e.leafletLayer)}))}),[C]),Object(n.useEffect)((function(){(Ae||Pe)&&V&&It(q[1],q[0])}),[Ae,Pe,De,Ze]),Object(n.useEffect)((function(){ee&&V&&It(q[1],q[0])}),[ee,q]),bt){e.addTo(t);var r=p.a.control({position:"bottomright"});r.onAdd=function(){var e=p.a.DomUtil.create("div","info legend");return e.innerHTML="<img src="+I.a+' width="128.5px" height="210.5px">',e},r.addTo(t),p.a.Control.loading({separate:!0}).addTo(t)}return bt&&dt(!1),null}),null))),r.a.createElement((function(){return r.a.createElement(d.a,{item:!0,xs:12},V?r.a.createElement(St,null):null)}),null)))}),null),","),ne)}},[[173,1,2]]]);
//# sourceMappingURL=main.4f6e2525.chunk.js.map