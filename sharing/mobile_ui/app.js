/* Copyright (c) INTEGRA EMPRESAS 2016. All rights reserved. */

angular.module("Initialization",["WebAPIService"]).factory("Init",["$state","WebAPI","$rootScope",function(a,e,h){var i;function b(j){if(j.redirect_type==="always"||j.redirect_type==="url_param"&&angular.urlDecode(location.search.substr(1)).redirect==="true"){if(j.redirect_uri.indexOf("?")!==-1){j.redirect_uri+="&"}else{j.redirect_uri+="?"}j.redirect_uri+='_sharing_id="'+_S("sharing_id")+'"';j.redirect_uri=".."+j.redirect_uri;if(h.$broadcast("beforeredirect",j).defaultPrevented===true){return true}window.location.href=j.redirect_uri;return true}return false}function d(){if(h.$broadcast("beforeinitdata").defaultPrevented===true){return}e.sendWebAPI({api:"SYNO.Core.Sharing.Initdata",method:"get",version:1,headers:{"X-SYNO-SHARING":_S("sharing_id")},callback:function(k,m,l){if(k){var j=m.Sharing;if(h.$broadcast("initdata",m).defaultPrevented===true){return}if(b(j)){return}c();g(m,function(){a.go(m.Sharing.project_name.toLowerCase().replace(/\./g,"_"),m.Sharing)})}else{console.error("Init Data Failed"+m)}}})}function f(){if(i===undefined){var j="(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)";if(window.devicePixelRatio>=1.5||window.matchMedia&&window.matchMedia(j).matches){i=true}}return i}function c(){e.sendWebAPI({api:"SYNO.Core.Sharing.Initdata",method:"get",version:1,headers:{"X-SYNO-SHARING":_S("sharing_id")},params:{action:"external_ip"},callback:function(j,l,k){if(j){SYNO.SDS.Session.external_ip=l.external_ip;SYNO.SDS.Session.ddns_hostname=l.ddns_hostname}else{console.error("Get External IP Failed"+l)}}})}function g(q,s,t){var l=q.Session.lang,o=["webapi/entry.cgi?api=SYNO.Core.Desktop.JSUIString&version=1&method=getjs&lang="+l,"webapi/entry.cgi?api=SYNO.FileStation.UIString&version=1&method=getjs&lang="+l,"webapi/entry.cgi?api=SYNO.Core.Desktop.UIString&version=1&method=getjs&lang="+l],n=0;function r(){n++;if(n>=o.length&&s){s.call(t||window,q)}}if(l==="def"||l===_S("sys_lang")){if(s){s.call(t||window,q)}return}var m=document.getElementsByTagName("head")[0];for(var p=0;p<o.length;p++){var j=o[p],k=document.createElement("script");k.type="text/javascript";k.onload=r;k.src=j;m.appendChild(k)}}return{initerrorstr:SYNO.API.AssignErrorStr,initdata:d,queryapi:e.queryWebAPI,getRetinaStatus:f}}]);var baseUrl="sharing/mobile_ui/",orgModules=["ionic","Initialization","Component","Login"],injectModules=["starter.sharing","starter.request"];angular.module("starter",angular.initInjectModules(orgModules,injectModules)).run(["$ionicPlatform","$rootScope",function(b,a){window.addEventListener("orientationchange",function(){a.$broadcast("orientationchange",window.orientation)},false);b.ready(function(){if(window.cordova&&window.cordova.plugins.Keyboard){window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)}if(window.StatusBar){window.StatusBar.styleDefault()}})}]).directive("sharingApp",function(){return{restrict:"E",templateUrl:baseUrl+"view/app.html",controller:"SharingCtrl",controllerAs:"sharingApp"}}).config(["$stateProvider","$urlRouterProvider","$ionicConfigProvider",function(d,b,a){var c={templateUrl:baseUrl+"view/app.html"};c["abstract"]=true;a.views.swipeBackEnabled(false);d.state("app",c).state("error_page",{templateUrl:baseUrl+"view/error.html"})}]).controller("SharingCtrl",["$scope","$state","Init",function(d,f,g){function c(){if(g.getRetinaStatus()){angular.element(document.documentElement).addClass("synohdpack")}}function e(){switch(_S("sharing_status")){case"password":case"user":f.go("login_dialog");break}return}function b(){return _S("sharing_error")!==undefined}function a(){g.initerrorstr();g.queryapi();c();e()}function h(){a();if(b()){f.go("error_page");return}if("none"===_S("sharing_status")){g.initdata()}}h();d.request_info="";d.your_name=_WFT("sharing","uploader_name")}]);var baseUrl="sharing/mobile_ui/";angular.module("Login",["WebAPIService","Initialization"]).config(["$stateProvider","$urlRouterProvider",function(b,a){b.state("login_dialog",{views:{sharingContent:{templateUrl:baseUrl+"view/three_part_pane.html",controller:"LoginCtrl"},"middleView@login_dialog":{templateUrl:baseUrl+"view/login_dialog.html"},"bottomView@login_dialog":{template:['<div class="loading-msg" ng-show="processing"> {{loading_text}} </div>','<div class="error-msg" ng-show="login_info.error"> {{login_info.error}} </div>'].join("")}}})}]).controller("LoginCtrl",["$scope","$state","WebAPI","Init","$rootScope","$ionicHistory",function(n,a,f,e,j,l){var i=n,b=_S("sharing_status"),h=SYNO.SDS.ExtraSession,g=angular.element(document.getElementsByClassName("syno-mobile-wrapper")),d="#3a83cc",k="../scripts/ext-3/resources/images/default/s.gif",c=h.enable_custom_setting,m=c&&h.enable_background;l.nextViewOptions({disableAnimate:true,disableBack:true});angular.apply(i,{is_pswd_type:b==="password",user_empty_text:_T("common","username"),pswd_empty_text:_T("common","password"),bg_info:{bg_path:(m)?h.background_path:k,bg_color:(m)?h.background_color:d,bg_pos:(m)?h.background_position:"center",tpl_type:(c)?h.tpl_type:"dark"},login_info:{ERRCODE_MAP:{1000:_T("error","error_error_system"),1001:_T("common","err_pass"),1002:_T("error","error_privilege_not_enough"),1003:_T("login","error_cantlogin"),1008:_T("login","error_maxtried"),1012:_T("sharing","err_expire_times")}},title:_WFT("sharing","protect_access"),login_text:_T("common","enter"),loading_text:_T("common","loading"),enter_text:(_S("sharing_status")==="password")?_WFT("sharing","passwd_access_desc"):_WFT("sharing","dsm_access_desc"),ClearLoginError:function(){i.login_info.error=null}});g.addClass(i.bg_info.bg_pos);i.Login=function(){document.activeElement.blur();i.processing=true;var o={sharing_id:_S("sharing_id")};if(i.is_pswd_type){angular.apply(o,{password:i.login_info.password})}else{angular.apply(o,{dsm_username:i.login_info.username,dsm_password:i.login_info.password})}f.sendWebAPI({api:"SYNO.Core.Sharing.Login",method:"login",version:1,params:o,callback:function(p,r,q){i.processing=false;if(p){e.initdata()}else{if(r.error){i.login_info.error=i.login_info.ERRCODE_MAP[r.error.code]||SYNO.API.Errors.common[r.error.code]}i.login_info.error=i.login_info.error||_T("common","commfail")}},encryption:["password","dsm_username","dsm_password","sharing_id"]})}}]);