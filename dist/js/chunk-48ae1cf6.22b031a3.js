(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48ae1cf6"],{"3fca":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",{style:{backgroundImage:"url("+a("0e51")+")"},attrs:{id:"inspire"}},[i("div",{staticClass:"px-2 pb-10",staticStyle:{"bakground-color":"#f5f5f5"}},[i("v-card",{staticClass:"px-10 hidden-md-and-down"},[i("v-card-title",[t._v(" Master Data Pengguna "),i("v-spacer"),i("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),i("v-data-table",{attrs:{headers:t.headers,items:t.users.slice().reverse(),search:t.search},scopedSlots:t._u([{key:"item",fn:function(e){return[i("tr",[i("td",[t._v(t._s(e.item.full_name))]),i("td",[t._v(t._s(e.item.phone))]),"teacher"===e.item.role?i("td",[t._v("Guru")]):"parent"===e.item.role?i("td",[t._v("Orang Tua")]):i("td",[t._v("Admin")]),"true"===e.item.is_verified?i("td",{staticClass:"justify-center"},[i("v-badge",{attrs:{content:"Diverifikasi",color:"green",overlap:""}})],1):i("td",{staticClass:"justify-center",attrs:{cla:""}},[i("v-badge",{attrs:{content:"Belum Diverifikasi",color:"red",overlap:""}})],1),i("td",[i("v-col",{staticClass:"d-flex justify-start"},["true"===e.item.is_verified?i("v-btn",{staticClass:"mr-2",attrs:{fab:"",small:"",color:"warning"},on:{click:function(a){return t.verif(e.item.id,"false")}}},[i("v-icon",[t._v("mdi-close")])],1):i("v-btn",{staticClass:"mr-2",attrs:{fab:"",small:"",color:"warning",disabled:""}},[i("v-icon",[t._v("mdi-close")])],1),"false"===e.item.is_verified?i("v-btn",{attrs:{fab:"",small:"",color:"success"},on:{click:function(a){return t.verif(e.item.id,"true")}}},[i("v-icon",[t._v("mdi-check")])],1):i("v-btn",{attrs:{fab:"",small:"",color:"success",disabled:""}},[i("v-icon",[t._v("mdi-check")])],1)],1)],1)])]}}])})],1),[i("v-text-field",{staticClass:"mx-4 hidden-md-and-up",attrs:{"prepend-icon":"mdi-account-search",label:"Cari nama pengguna"},on:{input:function(e){return t.searchUser()}},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t.isLoading?i("v-progress-circular",{staticStyle:{"margin-left":"40%","margin-right":"50%","margin-top":"50%"},attrs:{size:70,width:7,color:"primary",indeterminate:""}}):t._l(t.users.slice().reverse(),(function(e){return i("v-card",{key:e.id,staticClass:"mx-auto my-2 hidden-md-and-up",attrs:{"max-width":"500"}},[i("v-card-text",[i("p",{staticClass:"text-h6 text--primary"},[t._v(" "+t._s(e.full_name)+" "),"true"===e.is_verified?i("v-chip",{staticClass:"ma-2",attrs:{"x-small":"",color:"green","text-color":"white"}},[t._v(" Diverifikasi ")]):i("v-chip",{staticClass:"ma-2",attrs:{"x-small":"",color:"red","text-color":"white"}},[t._v(" Belum Diverifikasi ")]),i("br"),i("span",["admin"===e.role?i("v-chip",{attrs:{"x-small":"",color:"primary",label:""}},[i("v-icon",{attrs:{"x-small":"",left:""}},[t._v(" mdi-account-circle-outline ")]),t._v(" Admin ")],1):"teacher"===e.role?i("v-chip",{attrs:{"x-small":"",color:"success",label:""}},[i("v-icon",{attrs:{"x-small":"",left:""}},[t._v(" mdi-account-circle-outline ")]),t._v(" Guru ")],1):i("v-chip",{attrs:{"x-small":"",color:"warning",label:""}},[i("v-icon",{attrs:{"x-small":"",left:""}},[t._v(" mdi-account-circle-outline ")]),t._v(" Orang Tua ")],1)],1)],1),i("div",{staticClass:"text--primary"},[i("v-btn",{staticClass:"mr-2",attrs:{fab:"",small:"",color:"red"},on:{click:function(a){return t.deleteUser(e.id,e.full_name)}}},[i("v-icon",{attrs:{color:"white"}},[t._v("mdi-delete-outline")])],1),"true"===e.is_verified?i("v-btn",{staticClass:"mr-2",attrs:{fab:"",small:"",color:"warning"},on:{click:function(a){return t.verif(e.id,"false")}}},[i("v-icon",[t._v("mdi-close")])],1):i("v-btn",{staticClass:"mr-2",attrs:{fab:"",small:"",color:"warning",disabled:""}},[i("v-icon",[t._v("mdi-close")])],1),"false"===e.is_verified?i("v-btn",{attrs:{fab:"",small:"",color:"success"},on:{click:function(a){return t.verif(e.id,"true")}}},[i("v-icon",[t._v("mdi-check")])],1):i("v-btn",{attrs:{fab:"",small:"",color:"success",disabled:""}},[i("v-icon",[t._v("mdi-check")])],1)],1)])],1)}))]],2)])},s=[],n=(a("99af"),a("bc3a")),r=a.n(n),o=a("3d20"),c=a.n(o),l={name:"ManageAccountPage",components:{},data:function(){return{search:"",username:null,headers:[{text:"Full Name",align:"start",sortable:!1,value:"full_name"},{text:"No. HP",value:"phone"},{text:"Role",value:"role"},{text:"Status verifikasi",value:"is_verified"},{text:"Aksi",value:"actions"}],users:[],isLoading:!1}},mounted:function(){this.getUsers()},methods:{deleteUser:function(t,e){var a=this;c.a.fire({title:"Apakah anda yakin?",text:"Ingin menghapus pengguna dengan nama ".concat(e,"!"),icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:"Tidak",confirmButtonText:"Ya"}).then((function(i){i.isConfirmed&&r.a.delete("".concat("https://api.tkbintangpertiwi.com/api/v1/","delete-user?id=").concat(t),{headers:{authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(){c.a.fire("Dihapus!","".concat(e," berhasil dihapus!"),"success"),a.getUsers()})).catch((function(){alert("Terjadi kesalahan!"),a.getUsers()}))}))},searchUser:function(){var t=this;this.isLoading=!0,r.a.get("".concat("https://api.tkbintangpertiwi.com/api/v1/","search-user?name=").concat(this.username),{headers:{authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){t.isLoading=!1,t.users=e.data.data})).catch((function(){t.isLoading=!1,alert("Terjadi kesalahan!")}))},getUsers:function(){var t=this;this.isLoading=!0,r.a.get("".concat("https://api.tkbintangpertiwi.com/api/v1/","users"),{headers:{authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(e){t.isLoading=!1,t.users=e.data})).catch((function(){t.isLoading=!1,alert("Terjadi kesalahan!")}))},verif:function(t,e){var a=this,i={id:t,is_verified:e};r.a.post("".concat("https://api.tkbintangpertiwi.com/api/v1/","verification"),i,{headers:{authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).then((function(){a.isLoading=!1,a.getUsers()})).catch((function(){a.isLoading=!1,alert("Terjadi kesalahan!")}))}}},d=l,u=a("2877"),f=a("6544"),h=a.n(f),m=a("7496"),v=a("15fd"),p=a("5530"),g=(a("a9e3"),a("ff44"),a("132d")),b=a("a9ad"),_=a("7560"),k=a("f2e7"),x=a("f40d"),C=a("fe6c"),B=a("58df"),w=a("80d2"),y=["aria-atomic","aria-label","aria-live","role","title"],S=Object(B["a"])(b["a"],Object(C["b"])(["left","bottom"]),_["a"],k["a"],x["a"]).extend({name:"v-badge",props:{avatar:Boolean,bordered:Boolean,color:{type:String,default:"primary"},content:{required:!1},dot:Boolean,label:{type:String,default:"$vuetify.badge"},icon:String,inline:Boolean,offsetX:[Number,String],offsetY:[Number,String],overlap:Boolean,tile:Boolean,transition:{type:String,default:"scale-rotate-transition"},value:{default:!0}},computed:{classes:function(){return Object(p["a"])({"v-badge--avatar":this.avatar,"v-badge--bordered":this.bordered,"v-badge--bottom":this.bottom,"v-badge--dot":this.dot,"v-badge--icon":null!=this.icon,"v-badge--inline":this.inline,"v-badge--left":this.left,"v-badge--overlap":this.overlap,"v-badge--tile":this.tile},this.themeClasses)},computedBottom:function(){return this.bottom?"auto":this.computedYOffset},computedLeft:function(){return this.isRtl?this.left?this.computedXOffset:"auto":this.left?"auto":this.computedXOffset},computedRight:function(){return this.isRtl?this.left?"auto":this.computedXOffset:this.left?this.computedXOffset:"auto"},computedTop:function(){return this.bottom?this.computedYOffset:"auto"},computedXOffset:function(){return this.calcPosition(this.offsetX)},computedYOffset:function(){return this.calcPosition(this.offsetY)},isRtl:function(){return this.$vuetify.rtl},offset:function(){return this.overlap?this.dot?8:12:this.dot?2:4},styles:function(){return this.inline?{}:{bottom:this.computedBottom,left:this.computedLeft,right:this.computedRight,top:this.computedTop}}},methods:{calcPosition:function(t){return"calc(100% - ".concat(Object(w["h"])(t||this.offset),")")},genBadge:function(){var t=this.$vuetify.lang,e=this.$attrs["aria-label"]||t.t(this.label),a=this.setBackgroundColor(this.color,{staticClass:"v-badge__badge",style:this.styles,attrs:{"aria-atomic":this.$attrs["aria-atomic"]||"true","aria-label":e,"aria-live":this.$attrs["aria-live"]||"polite",title:this.$attrs.title,role:this.$attrs.role||"status"},directives:[{name:"show",value:this.isActive}]}),i=this.$createElement("span",a,[this.genBadgeContent()]);return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[i]):i},genBadgeContent:function(){if(!this.dot){var t=Object(w["s"])(this,"badge");return t||(this.content?String(this.content):this.icon?this.$createElement(g["a"],this.icon):void 0)}},genBadgeWrapper:function(){return this.$createElement("span",{staticClass:"v-badge__wrapper"},[this.genBadge()])}},render:function(t){var e=[this.genBadgeWrapper()],a=[Object(w["s"])(this)],i=this.$attrs,s=(i["aria-atomic"],i["aria-label"],i["aria-live"],i.role,i.title,Object(v["a"])(i,y));return this.inline&&this.left?a.unshift(e):a.push(e),t("span",{staticClass:"v-badge",attrs:s,class:this.classes},a)}}),O=a("8336"),j=a("b0af"),T=a("99d9"),$=a("cc20"),V=a("62ad"),L=a("8fea"),U=a("490a"),A=a("2fa4"),D=a("8654"),I=Object(u["a"])(d,i,s,!1,null,"58c94dfe",null);e["default"]=I.exports;h()(I,{VApp:m["a"],VBadge:S,VBtn:O["a"],VCard:j["a"],VCardText:T["c"],VCardTitle:T["d"],VChip:$["a"],VCol:V["a"],VDataTable:L["a"],VIcon:g["a"],VProgressCircular:U["a"],VSpacer:A["a"],VTextField:D["a"]})},f40d:function(t,e,a){"use strict";var i=a("2b0e");e["a"]=i["a"].extend({name:"transitionable",props:{mode:String,origin:String,transition:String}})},ff44:function(t,e,a){}}]);
//# sourceMappingURL=chunk-48ae1cf6.22b031a3.js.map