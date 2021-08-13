import{r as e,o as t,c as a,w as n,a as i,b as s,p as o,d as r,t as l,e as c,f as d,F as u,g as m,h as p,i as h,j as g,k as f,l as b,m as v,n as w,q as y,s as E,u as T,v as k}from"./vendor.166f1d7a.js";var x={f7:null,handleSplashscreen:function(){var e=x.f7;window.Capacitor&&!e.device.electron&&setTimeout((()=>{window.Capacitor.Plugins.SplashScreen.hide()}),2e3)},handleAndroidBackButton:function(){var e=x.f7;const t=e.$;!e.device.electron&&window.Capacitor&&window.Capacitor.Plugins.App.addListener("backButton",(function(){if(t(".actions-modal.modal-in").length)return void e.actions.close(".actions-modal.modal-in");if(t(".dialog.modal-in").length)return void e.dialog.close(".dialog.modal-in");if(t(".sheet-modal.modal-in").length)return void e.sheet.close(".sheet-modal.modal-in");if(t(".popover.modal-in").length)return void e.popover.close(".popover.modal-in");if(t(".popup.modal-in").length){if(t(".popup.modal-in>.view").length){const t=e.views.get(".popup.modal-in>.view");if(t&&t.router&&t.router.history.length>1)return void t.router.back()}return void e.popup.close(".popup.modal-in")}if(t(".login-screen.modal-in").length)return void e.loginScreen.close(".login-screen.modal-in");if(t(".page-current .searchbar-enabled").length)return void e.searchbar.disable(".page-current .searchbar-enabled");if(t(".page-current .card-expandable.card-opened").length)return void e.card.close(".page-current .card-expandable.card-opened");const a=e.views.current;a&&a.router&&a.router.history.length>1?a.router.back():t(".panel.panel-in").length&&e.panel.close(".panel.panel-in")}),!1)},handleKeyboard:function(){var e=x.f7;if(window.Capacitor){var t=e.$,a=window.Capacitor.Plugins.Keyboard;a&&(a.setResizeMode({mode:"native"}),a.setScroll({isDisabled:!0}),a.setAccessoryBarVisible({isVisible:!1}),window.addEventListener("keyboardWillShow",(()=>{e.input.scrollIntoView(document.activeElement,0,!0,!0)})),window.addEventListener("keyboardDidShow",(()=>{e.input.scrollIntoView(document.activeElement,0,!0,!0)})),window.addEventListener("keyboardDidHide",(()=>{document.activeElement&&t(document.activeElement).parents(".messagebar").length||a.setAccessoryBarVisible({isVisible:!0})})),t(document).on("touchstart","input, textarea, select",(function(e){var t=e.target.nodeName.toLowerCase(),n=e.target.type;"select"===t||["datetime-local","time","date","datetime"].indexOf(n)>=0?a.setAccessoryBarVisible({isVisible:!0}):a.setAccessoryBarVisible({isVisible:!1})}),!0))}},init:function(e){x.f7=e,x.handleAndroidBackButton(),x.handleSplashscreen(),x.handleKeyboard();const t=require("capacitor-plugin-permissions");console.log("Class: ",t),window.Capacitor.Plugins.Permissions.query({name:"camera"}).then((e=>{console.log("Permissions: ",e)}))}};const A={props:{f7router:Object}},C=i("div",{class:"navbar"},[i("div",{class:"navbar-bg"}),i("div",{class:"navbar-inner"},[i("div",{class:"title"},"Virtual Assistance App by Link Consulting")])],-1),S=s("Funcionalidades"),M=i("p",null,"Realidade Aumentada    ",-1),R=i("span",{class:"camera-icon"},null,-1),H=i("br",null,null,-1),P=i("p",null,"Assistência Virtual    ",-1),V=i("span",{class:"bot-icon"},null,-1);A.render=function(s,o,r,l,c,d){const u=e("f7-block-title"),m=e("f7-button"),p=e("f7-block"),h=e("f7-page");return t(),a(h,{name:"Home"},{default:n((()=>[C,i(u,null,{default:n((()=>[S])),_:1}),i(p,{strong:""},{default:n((()=>[i(m,{large:"",raised:"",outline:"",href:"/ar/"},{default:n((()=>[M,R])),_:1}),H,i(m,{large:"",raised:"",outline:"",href:"/chat/null"},{default:n((()=>[P,V])),_:1})])),_:1})])),_:1})};var _,D,B,L,j,z,O,q,F=[],I=[{markerPath:"assets/data/hiro.patt",nome:"Impressora",atributos:[{tipo:"percentagem",nome:"Tinta Preta",valor:53},{tipo:"percentagem",nome:"Tinta Vermelha",valor:46},{tipo:"percentagem",nome:"Tinta Azul",valor:97},{tipo:"percentagem",nome:"Tinta Amarela",valor:68},{tipo:"absoluto",nome:"Papel",valor:13,maximo:50}]},{markerPath:"assets/data/kanji.patt",nome:"Fax",atributos:[{tipo:"percentagem",nome:"Tinta Preta",valor:32},{tipo:"absoluto",nome:"Papel",valor:45,maximo:50}]}];const N={data:()=>({seenMachine:"null"}),props:{f7router:Object},methods:{initialize:function(){_=new THREE.Scene;let e=new THREE.AmbientLight(13421772,.5);function t(){O.onResizeElement(),O.copyElementSizeTo(B.domElement),null!==q.arController&&O.copyElementSizeTo(q.arController.canvas)}_.add(e),D=new THREE.Camera,_.add(D),(B=new THREE.WebGLRenderer({antialias:!0,alpha:!0})).setClearColor(new THREE.Color("lightgrey"),0),B.setSize(window.innerWidth,window.innerHeight),B.setPixelRatio(window.devicePixelRatio),document.getElementById("ar-renderer").appendChild(B.domElement),L=new THREE.Clock,j=0,z=0,(q=new THREEx.ArToolkitContext({cameraParametersUrl:"assets/data/camera_para.dat",detectionMode:"mono"})).init((()=>{D.projectionMatrix.copy(q.getProjectionMatrix())})),(O=new THREEx.ArToolkitSource({sourceType:"webcam",sourceWidth:640,sourceHeight:480})).init((()=>{t()})),window.addEventListener("resize",(()=>{t()}));for(let a=0;a<I.length;a++){let e=I[a],t=new THREE.Group;_.add(t),new THREEx.ArMarkerControls(q,t,{type:"pattern",patternUrl:e.markerPath}),e.sprite=$(e,{r:0,g:0,b:0,a:.8}),t.add(e.sprite),F.push(t)}},update:function(){!1!==O.ready&&q.update(O.domElement);for(let e=0;e<F.length;e++)F[e].visible&&(this.seenMachine=I[e].nome,I[e].sprite.position.y=.5-Math.sin(4*z)/10)},render:function(){B.render(_,D)},animate:function(){requestAnimationFrame(this.animate),j=L.getDelta(),z+=j,this.update(),this.render()},callAssistant:function(){this.f7router.navigate(`/chat/${this.seenMachine}`)}},mounted(){F=[],this.initialize(),this.animate()}};function $(e,t){var a=1,n=96,i=114,s=.4,o=t,r=0,l=0,c=0,d=e.nome,u=document.createElement("canvas");u.height=256,u.width=256;var m=u.getContext("2d");m.font="Bold 18px Sans-Serif";var p=m.measureText(d).width;m.fillStyle="rgba("+a+","+n+","+i+","+s+")",m.strokeStyle="rgba("+o.r+","+o.g+","+o.b+","+o.a+")",m.lineWidth=4,W(m,u.width/2-p/2-4,0,p+8,30);let h=0;for(var g=0;g<e.atributos.length;g++){var f=(b=e.atributos[g]).nome+": "+b.valor;switch(b.tipo){case"percentagem":f+="%";break;case"absoluto":f+=" de "+b.maximo}let t=m.measureText(f).width;h=t>h?t:h}W(m,u.width/2-h/2-4,30,h+8,30*e.atributos.length),m.textAlign="center",m.fillStyle="rgba("+r+", "+l+", "+c+", 1.0)",m.fillText(d,u.width/2,22);for(g=0;g<e.atributos.length;g++){var b;f=(b=e.atributos[g]).nome+": "+b.valor;switch(b.tipo){case"percentagem":f+="%";break;case"absoluto":f+=" de "+b.maximo}m.fillText(f,u.width/2,26*(g+2))}var v=new THREE.Texture(u);v.needsUpdate=!0;var w=new THREE.SpriteMaterial({map:v,depthTest:!1}),y=new THREE.Sprite(w);return y.scale.set(.01*u.width,.01*u.height),y}function W(e,t,a,n,i){e.beginPath(),e.moveTo(t,a),e.lineTo(t+n,a),e.lineTo(t+n,a+i),e.lineTo(t,a+i),e.lineTo(t,a),e.closePath(),e.fill()}const U=d("data-v-5b503b7b");o("data-v-5b503b7b");const K={key:0,id:"machineIdentifier",class:"right"},G=s(" Máquina detetada:"),J=i("br",null,null,-1),Q=i("div",{id:"m-container"},[i("video",{id:"video"}),i("div",{id:"ar-renderer"})],-1);r();const X=U(((n,o,r,d,u,m)=>{const p=e("f7-navbar"),h=e("f7-page");return t(),a(h,{name:"ArScene"},{default:U((()=>[i(p,{title:"AR","back-link":"Back"},{default:U((()=>["null"!==u.seenMachine?(t(),a("p",K,[G,J,s(l(u.seenMachine),1)])):c("",!0),i("a",{class:"right",onClick:o[1]||(o[1]=(...e)=>m.callAssistant&&m.callAssistant(...e))},"Falar com o assistente")])),_:1}),Q])),_:1})}));N.render=X,N.__scopeId="data-v-5b503b7b";const Y={},Z=i("p",null,"Sorry",-1),ee=i("p",null,"Requested content not found.",-1);Y.render=function(s,o,r,l,c,d){const u=e("f7-navbar"),m=e("f7-block"),p=e("f7-page");return t(),a(p,null,{default:n((()=>[i(u,{title:"Not found","back-link":"Back"}),i(m,{strong:""},{default:n((()=>[Z,ee])),_:1})])),_:1})};const te={data:()=>({messagesData:[],botName:"(escolher nome)",date:"",hour:""}),props:{f7route:Object,f7router:Object},mounted:function(){this.messagesData.push({name:this.botName,type:"received",text:`Olá, sou o ${this.botName}!`}),"null"===this.f7route.params.machine?this.messagesData.push({name:this.botName,type:"received",text:"Em que posso ser útil?"}):this.messagesData.push({name:this.botName,type:"received",text:`Vejo que foi detetado ${this.f7route.params.machine}`},{name:this.botName,type:"received",text:`Deseja ver os problemas mais comuns de ${this.f7route.params.machine} e as suas soluções?`});let e=new Date;this.date=e.toDateString().substring(0,e.toDateString().length-4),this.hour=`${e.getHours()}:${e.getMinutes()}`},methods:{isFirstMessage(e,t){const a=this.messagesData[t-1];return!e.isTitle&&(!a||a.type!==e.type||a.name!==e.name)},isLastMessage(e,t){const a=this.messagesData[t+1];return!e.isTitle&&(!a||a.type!==e.type||a.name!==e.name)},isTailMessage(e,t){const a=this.messagesData[t+1];return!e.isTitle&&(!a||a.type!==e.type||a.name!==e.name)}}},ae=s("Chat com o Assistente Virtual");te.render=function(o,r,d,p,h,g){const f=e("f7-navbar"),b=e("f7-messages-title"),v=e("f7-message"),w=e("f7-messages"),y=e("f7-page");return t(),a(y,{name:"Chat"},{default:n((()=>[i(f,{"back-link":"Back"},{default:n((()=>[ae])),_:1}),i(w,null,{default:n((()=>[i(b,null,{default:n((()=>[i("b",null,l(h.date),1),s(","+l(h.hour),1)])),_:1}),(t(!0),a(u,null,m(h.messagesData,((e,i)=>(t(),a(v,{key:i,type:e.type,image:e.image,name:e.name,avatar:e.avatar,first:g.isFirstMessage(e,i),last:g.isLastMessage(e,i),tail:g.isTailMessage(e,i)},{text:n((()=>[e.text?(t(),a("span",{key:0,innerHTML:e.text},null,8,["innerHTML"])):c("",!0)])),_:2},1032,["type","image","name","avatar","first","last","tail"])))),128))])),_:1})])),_:1})};const ne=[{path:"/",component:A},{path:"/ar/",component:N},{path:"/chat/:machine",component:te},{path:"(.*)",component:Y}],ie=p({state:{},getters:{},actions:{}}),se={setup(){const e=h(),t={name:"My App",theme:"auto",id:"io.framework7.myapp",store:ie,routes:ne,input:{scrollIntoViewOnFocus:e.capacitor,scrollIntoViewCentered:e.capacitor},statusbar:{iosOverlaysWebView:!0,androidOverlaysWebView:!1}},a=g(""),n=g("");return f((()=>{b((()=>{e.capacitor&&x.init(v)}))})),{f7params:t,username:a,password:n,alertLoginData:()=>{v.dialog.alert("Username: "+a.value+"<br>Password: "+n.value,(()=>{v.loginScreen.close()}))}}}};se.render=function(s,o,r,l,c,d){const u=e("f7-view"),m=e("f7-app");return t(),a(m,w(l.f7params,{"theme-dark":""}),{default:n((()=>[i(u,{main:"",class:"safe-areas",url:"/"})])),_:1},16)},y.use(E);const oe=T(se);k(oe),oe.mount("#app");
