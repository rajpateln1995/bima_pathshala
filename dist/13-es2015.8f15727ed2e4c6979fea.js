(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{LoSX:function(e,t,n){"use strict";n.r(t),n.d(t,"VideosModule",(function(){return W}));var a=n("ofXK"),o=n("tyNb"),r=n("fXoL");let l=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["ngx-videos"]],decls:1,vars:0,template:function(e,t){1&e&&r["\u0275\u0275element"](0,"router-outlet")},directives:[o.h],styles:[""]}),e})();var i=n("tk/3"),s=n("lGQG"),d=n("AytR");let c=(()=>{class e{constructor(e,t){this.http=e,this.auth=t,this.base_url=d.a.base_url}getVideos(e="",t="",n="true",a=""){let o=new i.f;o=o.append("Authorization",this.auth.getToken());let r=new i.g;return r=r.append("limit",e),r=r.append("page",t),r=r.append("all",n),r=r.append("language",a),this.http.get(this.base_url+"/video/all",{headers:o,params:r})}getVideoDetails(e){let t=new i.f;t=t.append("Authorization",this.auth.getToken());let n=new i.g;return n=n.append("_id",e),this.http.get(this.base_url+"/video/detail",{headers:t,params:n})}addMultipleVideo(e){let t=new i.f;return t=t.append("Authorization",this.auth.getToken()),this.http.post(this.base_url+"/video/addMultiple",e,{headers:t})}saveVideo(e){let t=new i.f;return t=t.append("Authorization",this.auth.getToken()),this.http.put(this.base_url+"/video",e,{headers:t})}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275inject"](i.b),r["\u0275\u0275inject"](s.a))},e.\u0275prov=r["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var m=n("IAlr"),u=n("aceb"),g=n("3Pt+"),p=n("oOf3");function h(e,t){if(1&e&&(r["\u0275\u0275elementContainerStart"](0),r["\u0275\u0275elementStart"](1,"option",31),r["\u0275\u0275text"](2),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementContainerEnd"]()),2&e){const e=t.$implicit;r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("value",e.key),r["\u0275\u0275advance"](1),r["\u0275\u0275textInterpolate"](e.value)}}function f(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"th"),r["\u0275\u0275text"](1),r["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit;r["\u0275\u0275advance"](1),r["\u0275\u0275textInterpolate"](e)}}function v(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"tbody"),r["\u0275\u0275elementStart"](1,"tr"),r["\u0275\u0275elementStart"](2,"td",32),r["\u0275\u0275text"](3,"No Data Available"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]())}function b(e,t){1&e&&r["\u0275\u0275element"](0,"tbody")}function S(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementContainerStart"](0),r["\u0275\u0275elementStart"](1,"tr"),r["\u0275\u0275elementStart"](2,"td"),r["\u0275\u0275text"](3),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](4,"td"),r["\u0275\u0275text"](5),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](6,"td"),r["\u0275\u0275text"](7),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](8,"td"),r["\u0275\u0275text"](9),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](10,"td"),r["\u0275\u0275text"](11),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](12,"td"),r["\u0275\u0275elementStart"](13,"a",33),r["\u0275\u0275element"](14,"i",34),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](15,"td",35),r["\u0275\u0275listener"]("click",(function(){r["\u0275\u0275restoreView"](e);const n=t.$implicit;return r["\u0275\u0275nextContext"](2).viewVideo(n._id,n.status)})),r["\u0275\u0275element"](16,"i",34),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementContainerEnd"]()}if(2&e){const e=t.$implicit,n=r["\u0275\u0275nextContext"](2);r["\u0275\u0275advance"](3),r["\u0275\u0275textInterpolate"](e.name),r["\u0275\u0275advance"](2),r["\u0275\u0275textInterpolate"](e.type),r["\u0275\u0275advance"](2),r["\u0275\u0275textInterpolate"](e.length),r["\u0275\u0275advance"](2),r["\u0275\u0275textInterpolate"](n.lang[e.language]),r["\u0275\u0275advance"](2),r["\u0275\u0275textInterpolate"](n.status[e.status]),r["\u0275\u0275advance"](2),r["\u0275\u0275propertyInterpolate"]("href",e.videoUrl,r["\u0275\u0275sanitizeUrl"])}}function x(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"div",7),r["\u0275\u0275elementStart"](1,"div",36),r["\u0275\u0275elementStart"](2,"pagination-controls",37),r["\u0275\u0275listener"]("pageChange",(function(t){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"](2).getPage(t)})),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](3,"div",38),r["\u0275\u0275elementStart"](4,"label",39),r["\u0275\u0275text"](5,"No. of Rows per page :"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](6,"select",40),r["\u0275\u0275listener"]("ngModelChange",(function(t){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"](2).changeLimit(t)})),r["\u0275\u0275elementStart"](7,"option",41),r["\u0275\u0275text"](8,"50"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](9,"option",42),r["\u0275\u0275text"](10,"100"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](11,"option",43),r["\u0275\u0275text"](12,"200"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](13,"option",44),r["\u0275\u0275text"](14,"500"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()}}function E(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"div",45),r["\u0275\u0275elementStart"](1,"input",46),r["\u0275\u0275listener"]("ngModelChange",(function(n){return r["\u0275\u0275restoreView"](e),t.$implicit.value=n})),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](2,"label",47),r["\u0275\u0275text"](3),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()}if(2&e){const e=t.$implicit;r["\u0275\u0275advance"](1),r["\u0275\u0275propertyInterpolate"]("name",e.name),r["\u0275\u0275property"]("ngModel",e.value)("id",e.name)("value",e.name),r["\u0275\u0275advance"](2),r["\u0275\u0275textInterpolate"](e.displayName)}}const y=function(e,t,n){return{id:"pagination",itemsPerPage:e,currentPage:t,totalItems:n}};function w(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementContainerStart"](0),r["\u0275\u0275elementStart"](1,"button",1),r["\u0275\u0275listener"]("click",(function(){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().createvideo()})),r["\u0275\u0275element"](2,"i",2),r["\u0275\u0275text"](3,"Add New Video"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](4,"button",3),r["\u0275\u0275elementStart"](5,"label",4),r["\u0275\u0275elementStart"](6,"b"),r["\u0275\u0275text"](7,"Filter By Language"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](8,"select",5),r["\u0275\u0275listener"]("ngModelChange",(function(t){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().filterSelect=t}))("ngModelChange",(function(){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().changeFilter()})),r["\u0275\u0275template"](9,h,3,2,"ng-container",6),r["\u0275\u0275pipe"](10,"keyvalue"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](11,"div",7),r["\u0275\u0275elementStart"](12,"div",8),r["\u0275\u0275elementStart"](13,"div",9),r["\u0275\u0275elementStart"](14,"div",10),r["\u0275\u0275elementStart"](15,"b"),r["\u0275\u0275text"](16),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](17,"div",11),r["\u0275\u0275elementStart"](18,"div",12),r["\u0275\u0275elementStart"](19,"table",13),r["\u0275\u0275elementStart"](20,"thead"),r["\u0275\u0275elementStart"](21,"tr"),r["\u0275\u0275template"](22,f,2,1,"th",6),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](23,v,4,0,"tbody",0),r["\u0275\u0275template"](24,b,1,0,"tbody",0),r["\u0275\u0275elementStart"](25,"tbody"),r["\u0275\u0275template"](26,S,17,6,"ng-container",6),r["\u0275\u0275pipe"](27,"paginate"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](28,x,15,0,"div",14),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](29,"div",15),r["\u0275\u0275elementStart"](30,"div",16),r["\u0275\u0275elementStart"](31,"div",17),r["\u0275\u0275elementStart"](32,"div",18),r["\u0275\u0275elementStart"](33,"h5",19),r["\u0275\u0275text"](34,"Create new Video"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](35,"button",20),r["\u0275\u0275elementStart"](36,"span",21),r["\u0275\u0275text"](37,"\xd7"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](38,"div",22),r["\u0275\u0275elementStart"](39,"form",null,23),r["\u0275\u0275elementStart"](41,"div",24),r["\u0275\u0275elementStart"](42,"label",25),r["\u0275\u0275text"](43,"Video Languages"),r["\u0275\u0275elementStart"](44,"span",26),r["\u0275\u0275text"](45,"*"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](46,"div",7),r["\u0275\u0275template"](47,E,4,5,"div",27),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](48,"div",28),r["\u0275\u0275elementStart"](49,"button",29),r["\u0275\u0275text"](50,"Close"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](51,"button",30),r["\u0275\u0275listener"]("click",(function(){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().submit()})),r["\u0275\u0275text"](52,"Create"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementContainerEnd"]()}if(2&e){const e=r["\u0275\u0275reference"](40),t=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](8),r["\u0275\u0275property"]("ngModel",t.filterSelect),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngForOf",r["\u0275\u0275pipeBind1"](10,10,t.lang)),r["\u0275\u0275advance"](7),r["\u0275\u0275textInterpolate1"]("Videos [Total : ",t.total,"]"),r["\u0275\u0275advance"](6),r["\u0275\u0275property"]("ngForOf",t.table_head),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",0===t.total),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",0!==t.total),r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("ngForOf",r["\u0275\u0275pipeBind2"](27,12,t.data,r["\u0275\u0275pureFunction3"](15,y,t.limit,t.curr_page,t.total))),r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("ngIf",0!==t.total),r["\u0275\u0275advance"](19),r["\u0275\u0275property"]("ngForOf",t.languages),r["\u0275\u0275advance"](4),r["\u0275\u0275property"]("disabled",e.invalid)}}function I(e,t){if(1&e&&r["\u0275\u0275element"](0,"nb-route-tabset",4),2&e){const e=r["\u0275\u0275nextContext"]();r["\u0275\u0275property"]("tabs",e.tabs)}}function C(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"p",25),r["\u0275\u0275text"](1," This Field is Mandatory !"),r["\u0275\u0275elementEnd"]())}function V(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"p",25),r["\u0275\u0275text"](1,"This Field is Mandatory !"),r["\u0275\u0275elementEnd"]())}function M(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"a",26),r["\u0275\u0275text"](1,"preview"),r["\u0275\u0275elementEnd"]()),2&e){const e=r["\u0275\u0275nextContext"](2);r["\u0275\u0275propertyInterpolate"]("href",e.Data.videoUrl,r["\u0275\u0275sanitizeUrl"])}}function k(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"div",27),r["\u0275\u0275element"](1,"div",28),r["\u0275\u0275elementEnd"]()),2&e){const e=r["\u0275\u0275nextContext"](2);r["\u0275\u0275advance"](1),r["\u0275\u0275styleMapInterpolate1"]("width: ",e.progressVideo,"%")}}function _(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"p",25),r["\u0275\u0275text"](1,"This Field is Mandatory !"),r["\u0275\u0275elementEnd"]())}function D(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"a",26),r["\u0275\u0275text"](1,"preview"),r["\u0275\u0275elementEnd"]()),2&e){const e=r["\u0275\u0275nextContext"](2);r["\u0275\u0275propertyInterpolate"]("href",e.Data.thumb,r["\u0275\u0275sanitizeUrl"])}}function N(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"div",27),r["\u0275\u0275element"](1,"div",28),r["\u0275\u0275elementEnd"]()),2&e){const e=r["\u0275\u0275nextContext"](2);r["\u0275\u0275advance"](1),r["\u0275\u0275styleMapInterpolate1"]("width: ",e.progressThumb,"%")}}function F(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"p",25),r["\u0275\u0275text"](1,"This Field is Mandatory !"),r["\u0275\u0275elementEnd"]())}function L(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementContainerStart"](0),r["\u0275\u0275element"](1,"hr"),r["\u0275\u0275elementStart"](2,"p",1),r["\u0275\u0275elementStart"](3,"span",2),r["\u0275\u0275text"](4,"Current Status :"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275text"](5),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](6,"hr"),r["\u0275\u0275elementStart"](7,"div",1),r["\u0275\u0275elementStart"](8,"button",3),r["\u0275\u0275listener"]("click",(function(){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().changeStatus("2","success")})),r["\u0275\u0275text"](9,"Live"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](10,"button",4),r["\u0275\u0275listener"]("click",(function(){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().changeStatus("3","warning")})),r["\u0275\u0275text"](11,"Disable"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](12,"form",null,5),r["\u0275\u0275elementStart"](14,"div",6),r["\u0275\u0275elementStart"](15,"label",7),r["\u0275\u0275text"](16,"Video Name"),r["\u0275\u0275elementStart"](17,"span",8),r["\u0275\u0275text"](18," *"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](19,"div",9),r["\u0275\u0275elementStart"](20,"input",10,11),r["\u0275\u0275listener"]("ngModelChange",(function(t){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().video_name=t})),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](22,C,2,0,"p",12),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](23,"div",13),r["\u0275\u0275elementStart"](24,"label",7),r["\u0275\u0275text"](25,"Video Description"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](26,"div",9),r["\u0275\u0275elementStart"](27,"textarea",14,15),r["\u0275\u0275listener"]("ngModelChange",(function(t){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().video_description=t})),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](29,V,2,0,"p",12),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](30,"div",13),r["\u0275\u0275elementStart"](31,"label",7),r["\u0275\u0275text"](32,"Select Video "),r["\u0275\u0275elementStart"](33,"span",8),r["\u0275\u0275text"](34," *"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](35,"div",16),r["\u0275\u0275elementStart"](36,"input",17,18),r["\u0275\u0275listener"]("change",(function(t){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().upload(t)})),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](38,M,2,1,"a",19),r["\u0275\u0275template"](39,k,2,3,"div",20),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](40,_,2,0,"p",12),r["\u0275\u0275elementStart"](41,"div",13),r["\u0275\u0275elementStart"](42,"label",7),r["\u0275\u0275text"](43,"Select Thumbnail Image "),r["\u0275\u0275elementStart"](44,"span",8),r["\u0275\u0275text"](45," *"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](46,"div",16),r["\u0275\u0275elementStart"](47,"input",21,22),r["\u0275\u0275listener"]("change",(function(t){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().uploadThumb(t)})),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](49,D,2,1,"a",19),r["\u0275\u0275template"](50,N,2,3,"div",20),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](51,F,2,0,"p",12),r["\u0275\u0275elementStart"](52,"div",23),r["\u0275\u0275elementStart"](53,"button",24),r["\u0275\u0275listener"]("click",(function(){return r["\u0275\u0275restoreView"](e),r["\u0275\u0275nextContext"]().save()})),r["\u0275\u0275text"](54,"Save"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementContainerEnd"]()}if(2&e){const e=r["\u0275\u0275reference"](21),t=r["\u0275\u0275reference"](28),n=r["\u0275\u0275reference"](37),a=r["\u0275\u0275reference"](48),o=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](5),r["\u0275\u0275textInterpolate1"](" ",o.status[o.s],""),r["\u0275\u0275advance"](15),r["\u0275\u0275propertyInterpolate1"]("placeholder","Enter Video Name [In ",o.Data.language,"]"),r["\u0275\u0275property"]("ngModel",o.video_name),r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("ngIf",e.invalid&&e.touched),r["\u0275\u0275advance"](5),r["\u0275\u0275propertyInterpolate1"]("placeholder","Enter Course Description [In ",o.Data.language,"]"),r["\u0275\u0275property"]("ngModel",o.video_description),r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("ngIf",t.invalid&&t.touched),r["\u0275\u0275advance"](9),r["\u0275\u0275property"]("ngIf",o.Data&&null!==o.Data.videoUrl&&o.Data.videoUrl.length>0),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",o.progressVideo>0),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",n.invalid&&n.touched),r["\u0275\u0275advance"](9),r["\u0275\u0275property"]("ngIf",o.Data&&null!==o.Data.thumb&&o.Data.videoUrl.length>0),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",o.progressThumb>0),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",a.invalid&&a.touched)}}const U=[{path:"",component:l,children:[{path:"",redirectTo:"all-videos",pathMatch:"full"},{path:"all-videos",component:(()=>{class e{constructor(e,t,n,a){this.video=e,this.courses=t,this.router=n,this.toaster=a,this.table_head=["Name","Type","Length","Language","Status","Preview","Edit"],this.languages=[],this.curr_page=1,this.limit="50",this.filterSelect="EN",this.lang={},this.status=["Not Completed","Verified","Live","Disabled","Deleted"]}ngOnInit(){this.getAllVideos("1"),this.getLang()}getLang(){this.courses.getLanguages().subscribe(e=>{for(const t of e.data)this.lang[t.name]=t.displayName})}changeFilter(){this.getAllVideos("1")}getAllVideos(e){this.video.getVideos(this.limit,e,"true",this.filterSelect).subscribe(e=>{console.log(e);const t=e;this.data=t.data,this.total=t.total},e=>{console.log(e)})}getPage(e){this.curr_page=e,this.getAllVideos(e)}changeLimit(e){this.limit=e,this.getAllVideos("1")}getLanguages(){this.languages.length>0?document.getElementById("create-video-modal").click():this.courses.getLanguages().subscribe(e=>{let t=e;t=t.data;for(const n of t)this.languages.push({name:n.name,displayName:n.displayName,value:!0});console.log(this.languages),document.getElementById("create-video-modal").click()},e=>{console.log(e),this.toaster.show("Something Went Wrong","Error",{status:"danger"})})}viewVideo(e,t){console.log(e),this.video.getVideoDetails(e).subscribe(n=>{console.log(n),localStorage.setItem("video-list",JSON.stringify({data:n.data.video.otherLanguages})),this.router.navigateByUrl(`pages/videos/edit/id/${e}/${t}`)},e=>{console.log(e),this.toaster.show("Something Went Wrong","Error",{status:"danger"})})}createvideo(){console.log("zsfd"),this.getLanguages()}submit(){let e="";for(const n of this.languages)n.value&&(e=e+n.name+",");const t={type:this.videoType,languages:e.slice(0,e.length-1)};this.video.addMultipleVideo(t).subscribe(e=>{console.log(e);const t=e;localStorage.setItem("video-list",JSON.stringify({data:t.data[0].otherLanguages})),this.router.navigateByUrl(`pages/videos/edit/id/${t.data[0].otherLanguages[0].video}/0`),document.getElementById("close-btn").click(),this.toaster.show("Videos Created Successfully","Videos Created",{status:"success"})},e=>{console.log(e),this.toaster.show("Something Went Wrong","Error",{status:"danger"})})}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](c),r["\u0275\u0275directiveInject"](m.a),r["\u0275\u0275directiveInject"](o.c),r["\u0275\u0275directiveInject"](u.lb))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["ngx-all-videos"]],decls:1,vars:1,consts:[[4,"ngIf"],["nbButton","","status","success",1,"float",3,"click"],["aria-hidden","true",1,"fa","fa-plus","mr-2"],["id","create-video-modal","data-toggle","modal","data-target","#newVideoModal",2,"display","none"],[1,"d-block","bold"],[1,"custom-select","mb-3",2,"width","40%",3,"ngModel","ngModelChange"],[4,"ngFor","ngForOf"],[1,"row"],[1,"col-lg-12"],[1,"card"],[1,"card-header"],[1,"card-body"],[1,"responsive"],[1,"table","table-bordered","table-striped","table-md","text-center"],["class","row",4,"ngIf"],["id","newVideoModal","tabindex","-1","role","dialog","aria-labelledby","exampleModalLabel","aria-hidden","true",1,"modal","fade"],["role","document",1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["id","exampleModalLabel",1,"modal-title"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["aria-hidden","true"],[1,"modal-body"],["createVideo","ngForm"],[1,"form-group"],[1,"label","d-block"],[2,"color","red"],["class","form-check form-check-inline col-3",4,"ngFor","ngForOf"],[1,"modal-footer"],["id","close-btn","data-dismiss","modal","nbButton","","status","basic",1,"btn","btn-secondary"],["nbButton","","status","success",3,"disabled","click"],[3,"value"],[2,"text-align","center"],["target","_blank",3,"href"],["aria-hidden","true",1,"fa","fa-eye"],[2,"color","#28a745","cursor","pointer",3,"click"],[1,"col-md-8","center"],["id","pagination",3,"pageChange"],[1,"col-md-4","center"],[1,"label-margin"],["selected","50","ngModel","",1,"form-control","form-control-width",3,"ngModelChange"],["value","50"],["value","100"],["value","200"],["value","500"],[1,"form-check","form-check-inline","col-3"],["disabled","","type","checkbox",1,"form-check-input",3,"name","ngModel","id","value","ngModelChange"],["for","inlineCheckbox1",1,"form-check-label"]],template:function(e,t){1&e&&r["\u0275\u0275template"](0,w,53,19,"ng-container",0),2&e&&r["\u0275\u0275property"]("ngIf",t.data)},directives:[a.NgIf,u.o,g.SelectControlValueAccessor,g.NgControlStatus,g.NgModel,a.NgForOf,g["\u0275angular_packages_forms_forms_y"],g.NgControlStatusGroup,g.NgForm,g.NgSelectOption,g["\u0275angular_packages_forms_forms_x"],p.c,g.CheckboxControlValueAccessor],pipes:[a.KeyValuePipe,p.b],styles:[".float[_ngcontent-%COMP%]{position:fixed;z-index:10;right:30px;bottom:30px;box-shadow:3px 3px 4px #999}"]}),e})()},{path:"edit",component:(()=>{class e{constructor(e,t,n,a){this.route=e,this.video=t,this.toaster=n,this.course=a,this.tempLang={},this.status=["Not Verified","Verified / Marked as Complete","Live","Disabled","Deleted"]}ngOnInit(){const e=[];this.id=JSON.parse(localStorage.getItem("video-list")),this.course.getLanguages().subscribe(t=>{for(const e of t.data)this.tempLang[e.name]=e.displayName;for(const n of this.id.data)console.log(n),e.push({title:this.tempLang[n.language],route:[`id/${n.video}/${this.s}`]});this.tabs=e}),this.s=window.location.href.slice(-1)}changeStatus(e,t){this.s=e,this.toaster.show("Video Is "+this.status[this.s],this.status[this.s],{status:t}),this.video.saveVideo({_id:this.route.firstChild.snapshot.params.id,status:e}).subscribe(e=>{console.log(e)},e=>{console.log(e),this.toaster.show("Something Went Wrong","Error",{status:"danger"})})}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](o.a),r["\u0275\u0275directiveInject"](c),r["\u0275\u0275directiveInject"](u.lb),r["\u0275\u0275directiveInject"](m.a))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["ngx-edit-video"]],decls:6,vars:1,consts:[[1,"card"],[1,"card-header"],[1,"card-body"],["fullWidth","",3,"tabs",4,"ngIf"],["fullWidth","",3,"tabs"]],template:function(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"div",0),r["\u0275\u0275elementStart"](1,"div",1),r["\u0275\u0275elementStart"](2,"b"),r["\u0275\u0275text"](3,"Edit Video"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](4,"div",2),r["\u0275\u0275template"](5,I,1,1,"nb-route-tabset",3),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()),2&e&&(r["\u0275\u0275advance"](5),r["\u0275\u0275property"]("ngIf",t.tabs))},directives:[a.NgIf,u.V],styles:[".nb-theme-default nb-route-tabset ul{overflow-x:scroll;overflow-y:hidden}"]}),e})(),children:[{path:"id/:id/:status",component:(()=>{class e{constructor(e,t,n,a,o){this.video=e,this.route=t,this.courses=n,this.router=a,this.toaster=o,this.progressVideo="0",this.progressThumb="0",this.status=["Not Verified","Verified / Marked as Complete","Live","Disabled","Deleted"],this.router.routeReuseStrategy.shouldReuseRoute=()=>!1}ngOnInit(){this.getVideoDetails(),this.s=window.location.href.slice(-1)}changeStatus(e,t){this.video.saveVideo({_id:this.route.snapshot.params.id,status:e}).subscribe(n=>{console.log(n),this.toaster.show("Video Is "+this.status[this.s],this.status[this.s],{status:t}),this.s=e},e=>{console.log(e),this.toaster.show("Something Went Wrong !","Error",{status:"danger"})})}getVideoDetails(){console.log(this.route.snapshot.params.id),this.video.getVideoDetails(this.route.snapshot.params.id).subscribe(e=>{console.log(e),this.Data=e.data.video,this.video_name=this.Data.name,this.video_description=this.Data.description,console.log(this.Data)})}upload(e){this.courses.upload(e.target.files[0]).subscribe(e=>{e.type===i.e.UploadProgress?(console.log(e),this.progressVideo=(e.loaded/e.total*100).toString()):e.type===i.e.Response&&(console.log(e),this.mediaUrl=e.body.data[0],this.disableBtn=!1,this.progressVideo="0",this.toaster.show("File Uploaded Successfully","File Uploaded",{status:"success"}))},e=>{console.log(e),this.progressVideo="0",this.toaster.show("Something Went Wrong","Error",{status:"danger"})})}uploadThumb(e){this.courses.upload(e.target.files[0]).subscribe(e=>{if(e.type===i.e.UploadProgress)console.log(e),this.progressThumb=(e.loaded/e.total*100).toString();else if(e.type===i.e.Response){console.log(e);const t=e;this.progressThumb="0",this.thumbUrl=t.body.data[0],this.disableBtn=!1,this.toaster.show("File Uploaded Successfully","File Uploaded",{status:"success"})}},e=>{console.log(e),this.toaster.show("Something Went Wrong","Error",{status:"danger"}),this.progressThumb="0"})}save(){console.log(this.mediaUrl),this.video.saveVideo({name:this.video_name,description:this.video_description,videoUrl:this.mediaUrl,_id:this.Data._id,thumb:this.thumbUrl}).subscribe(e=>{console.log(e),this.getVideoDetails(),this.toaster.show("Details Saved Successfully","Saved Successfully",{status:"success"})},e=>{console.log(e),this.toaster.show("Something Went Wrong","Error",{status:"danger"})})}ngOnDestroy(){this.save()}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](c),r["\u0275\u0275directiveInject"](o.a),r["\u0275\u0275directiveInject"](m.a),r["\u0275\u0275directiveInject"](o.c),r["\u0275\u0275directiveInject"](u.lb))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["ngx-edit-video-route"]],decls:1,vars:1,consts:[[4,"ngIf"],[1,"text-center"],[2,"color","#3366ff"],["size","small","type","button","nbButton","","status","success",1,"mr-2",3,"click"],["size","small","type","button","nbButton","","status","danger",1,"mr-2",3,"click"],["videoForm","ngForm"],[1,"form-group","row","mt-4"],[1,"col-md-4","col-form-label","text-center"],[2,"color","red"],[1,"col-md-8"],["type","text","name","videoName","required","",1,"form-control",3,"ngModel","placeholder","ngModelChange"],["videoName","ngModel"],["class","text-center mb-3 mt-1","style","color: red;",4,"ngIf"],[1,"form-group","row"],["name","videoDescription","rows","5",1,"form-control",3,"ngModel","placeholder","ngModelChange"],["videoDescription","ngModel"],[1,"col-md-8","pt-2"],["type","file","accept","video/*","name","video","ngModel","","required","",1,"d-block","form-control-file",3,"change"],["video","ngModel"],["target","_blank",3,"href",4,"ngIf"],["class","progress mt-4",4,"ngIf"],["type","file","accept","image/*","name","thumbnail","ngModel","","required","",1,"d-block","form-control-file",3,"change"],["thumbnail","ngModel"],[1,"text-right"],["id","close-btn","nbButton","","status","success",1,"btn","btn-secondary",3,"click"],[1,"text-center","mb-3","mt-1",2,"color","red"],["target","_blank",3,"href"],[1,"progress","mt-4"],["role","progressbar","aria-valuenow","0","aria-valuemin","0","aria-valuemax","100",1,"progress-bar","bg-success"]],template:function(e,t){1&e&&r["\u0275\u0275template"](0,L,55,13,"ng-container",0),2&e&&r["\u0275\u0275property"]("ngIf",t.Data)},directives:[a.NgIf,u.o,g["\u0275angular_packages_forms_forms_y"],g.NgControlStatusGroup,g.NgForm,g.DefaultValueAccessor,g.RequiredValidator,g.NgControlStatus,g.NgModel],styles:[""]}),e})()}]}]}];let T=(()=>{class e{}return e.\u0275mod=r["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=r["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[o.g.forChild(U)],o.g]}),e})();var j=n("tR1z");let W=(()=>{class e{}return e.\u0275mod=r["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=r["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[a.CommonModule,T,u.D,j.a,u.p,u.F,g.FormsModule,u.w,u.hb,u.t,u.k,u.W,p.a]]}),e})()}}]);