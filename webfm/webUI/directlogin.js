/* Copyright (c) INTEGRA EMPRESAS 2016. All rights reserved. */

Ext.onReady(function(){if(SYNO.SDS.Sharing.LoginDialog){SYNO.SDS.Sharing.LoginDialog.destroy()}SYNO.FileStation.LoginDialog=new SYNO.FileStation.Sharing.AccessPage({_mode:_S("sharing_status"),_data:SYNO.SDS.ExtraSession})});Ext.define("SYNO.FileStation.Sharing.AccessPage",{extend:"Ext.Container",constructor:function(a){var b=[];Ext.apply(this,a||{});if("none"===this._mode&&this._data.is_folder){this.onDownloadFile();return}this.background=this.createBackground();this.dialog=this.createAccessDialog();this.statusField=this.createSatus();this.logo=this.createLogo();b.push(this.background);b.push(this.dialog);b.push(this.statusField);b.push(this.logo);var c={id:"webfm-login",cls:String.format("webfm-login-{0}",this._data.tpl_type||"dark"),renderTo:document.body,items:b,listeners:{afterrender:function(){this.initDownloadPanel();this.background.resize();this.doAlignLogo(500)},scope:this}};this.callParent([c]);this._onResize();Ext.EventManager.onWindowResize(this._onResize,this);Ext.getBody().addKeyListener(13,this.onKeyDown,this);this.bindControllerEvent();if(_S("preview")){this.setFormDisabled(true)}},bindControllerEvent:function(){this.loginController=new SYNO.SDS.Sharing.LoginController();this.mon(this.loginController,"loginerror",this.onLoginError,this);this.mon(this.loginController,"login",this.onLoginSuccess,this);this.mon(SYNO.SDS.Sharing.Init,"beforeinitdata",this.onInitData,this);this.mon(SYNO.SDS.Sharing.Init,"initdata",this.onInitData,this)},onInitData:function(){return false},getTplConfig:function(){var a={tplName:this._data.tpl_type};if(this._data.enable_custom_setting&&this._data.enable_background&&0===this._data.status){a.background_color=this._data.background_color;a.background_path=this._data.background_path;a.background_pos=this._data.background_position}else{a.background_path=Ext.BLANK_IMAGE_URL;a.background_color="#3a8ecc";a.background_pos="center"}return a},createBackground:function(){return SYNO.SDS.LoginUtils.createBackground(this.getTplConfig(),"webfm-login-background")},createLogo:function(){var b=Ext.BLANK_IMAGE_URL;if(this._data.enable_custom_setting&&this._data.enable_logo){b=this._data.logo_path}var a=new Ext.BoxComponent({id:"webfm-logo",xtype:"box",itemId:"webfm-logo",name:"webfm-logo",cls:"webfm-logo",autoEl:{tag:"img",src:b}});return a},createTitle:function(){return new Ext.Container({cls:"webfm-login-dialog-title",html:_WFT("sharing","protect_access")||"Protected Access"})},createAccessDialog:function(){var a=[];if("none"!==this._mode&&0===this._data.status){a.push(this.createLoginPanel())}a.push(this.createDownloadPanel());this.dialog=new Ext.Panel({id:"webfm-access-dialog",cls:"webfm-access-dialog",width:350,layout:"card",activeItem:0,items:a});return this.dialog},createLoginPanel:function(){this.title=this.createTitle();this.descField=this.createDescField();this.userField=this.createUserFields();this.passField=this.createPassFields();this.loginBtn=this.createLoginBtn();this.userField.input.on("focus",this.onFocusHandler,this.userField);this.userField.input.on("blur",this.onBlurHandler,this.userField);this.passField.input.on("focus",this.onFocusHandler,this.passField);this.passField.input.on("blur",this.onBlurHandler,this.passField);var a=[];a.push(this.descField);if("user"===this._mode){a.push(this.userField)}a.push(this.passField);a.push(this.loginBtn);var b={width:350,autoHeight:true,useGradient:false,id:"login-inner-panel",cls:"webfm-inner-panel",items:a,keys:[{key:Ext.EventObject.ENTER,fn:this.onSubmit,scope:this}]};this.loginPanel=new Ext.Container({itemId:"login_panel",autoHeight:true,module:this,items:[this.title,new SYNO.ux.FormPanel(b)]});return this.loginPanel},createDownloadPanel:function(){var a=[];this.downloadBtn=this.createDownloadBtn();this.iconBox=this.createIconBox();this.fileNameField=this.createFileNameField();this.setFileNameClass();a.push(this.iconBox);a.push(this.createEmptyField(8));a.push(this.fileNameField);a.push(this.createEmptyField(10));if(0===this._data.status){a.push(this.downloadBtn)}var b={width:350,itemId:"download_panel",autoHeight:true,useGradient:false,id:"download-inner-panel",cls:"webfm-inner-panel",layout:"vbox",items:a};this.downloadPanel=new SYNO.ux.FormPanel(b);return this.downloadPanel},createIconBox:function(){return new Ext.BoxComponent({xtype:"box",itemId:"thumb",name:"thumb",cls:"webfm-file-icon",height:128,width:128,autoEl:{tag:"div"}})},createEmptyField:function(a){return new SYNO.ux.DisplayField({xtype:"syno_displayfield",height:a,width:318,value:""})},createFileNameField:function(){return new SYNO.ux.DisplayField({xtype:"syno_displayfield",cls:"webfm-download-filename",width:286,value:this._data.filename||_WFT("sharing","unavailable_file")})},createSatus:function(){return new Ext.form.DisplayField({id:"webfm-login-dialog-status",hideLabel:true,hidden:true,value:"",listeners:{afterrender:function(){this.el.setARIA({role:"log",live:"assertive"})},scope:this}})},createLoginBtn:function(a){return new SYNO.ux.Button({cls:"webfm-login-btn margin-top",xtype:"syno_button",btnStyle:"blue",text:_T("common","enter"),width:318,height:40,scope:this,disabled:a,handler:this.onSubmit})},createDownloadBtn:function(){return new SYNO.ux.Button({cls:"webfm-login-btn",xtype:"syno_button",btnStyle:"blue",text:_WFT("filetable","filetable_download"),width:318,height:40,scope:this,handler:this.onDownloadFile})},createUserFields:function(){return new SYNO.SDS.IconTextfield({el:"login_username",fieldLabel:_T("common","username"),iconCls:"user-icon",emptyText:_T("common","username")})},createPassFields:function(){return new SYNO.SDS.IconTextfield({el:"login_passwd",fieldLabel:_T("common","password"),iconCls:"passwd-icon",emptyText:_T("common","password")})},createDescField:function(){var a={xtype:"syno_displayfield",value:("user"===this._mode)?_WFT("sharing","dsm_access_desc"):_WFT("sharing","passwd_access_desc"),cls:"webfm-login-desc"};return new SYNO.ux.DisplayField(a)},onFocusHandler:function(a){this.addClass("x-item-focus")},onBlurHandler:function(a){this.removeClass("x-item-focus")},onLoginSuccess:function(){this.clearMsg();if(this._data.is_folder){this.onDownloadFile()}else{this.dialog.getLayout().setActiveItem(1);this.initDownloadPanel()}},onLoginError:function(a,b){this.setError(b);this.setFormDisabled(false)},onSubmit:function(){this.setFormDisabled(true);this.setMsg(_T("common","msg_waiting"));var a={sharing_id:_S("sharing_id")};if("password"===this._mode){Ext.apply(a,{password:this.passField.getValue()})}else{Ext.apply(a,{dsm_username:this.userField.getValue(),dsm_password:this.passField.getValue()})}this.loginController.submit(a);return false},onKeyDown:function(){var a=this.dialog.getLayout().activeItem.itemId;if(a==="download_panel"&&!this.downloadBtn.disabled){this.onDownloadFile();return}},onDownloadFile:function(){var b=window.location.href.replace("/sharing/","/fsdownload/");var a=b.indexOf("?");if(-1!==a){b=b.substr(0,a)}b+="/"+window.encodeURIComponent(this._data.filename);window.location.href=b;this.downloadBtn.setDisabled(true)},_onResize:function(){var a=0.45;var b=Ext.lib.Dom.getViewHeight()*(a-0.5);Ext.fly("webfm-access-dialog").alignTo(document.body,"c-c",[0,-30+b]);Ext.defer(function(){Ext.fly("webfm-access-dialog").alignTo(document.body,"c-c",[0,-30+b])},500,this)},initDownloadPanel:function(){var b=SYNO.FileStation.Sharing.Utils.GetThumbName(this._data.filename,false);var c='url("../webman/modules/FileBrowser/images/'+b+'")';var a=this.downloadPanel.getComponent("thumb");a.el.setStyle("background-image",c);if(!Ext.isEmpty(this._data.filename)){this.fileNameField.getEl().dom.setAttribute("ext:qtip",Ext.util.Format.htmlEncode(this._data.filename))}this.doAlignLogo(300)},setFileNameClass:function(){var b="15px verdana";var e=this.fileNameField.getValue();var d=this.getTextWidth("a",b);var c=this.getTextWidth(e,b);var a=(0!==d)?(c/d):0;if(a<31){this.fileNameField.addClass("one-line")}else{if(a<62){this.fileNameField.addClass("two-line")}else{this.fileNameField.addClass("three-line")}}},getTextWidth:function(e,a){var b,c,d;b=document.createElement("canvas");if(!b||!b.getContext){return 0}c=b.getContext("2d");if(!c||!c.measureText){return 0}c.font=a;d=c.measureText(e);return d.width},setStatus:function(a){this.statusField.setValue(a);this.statusField.show();this.doAlignDialog(this.statusField.getEl(),this.loginPanel.getEl())},setError:function(a){this.statusField.addClass("error");this.setStatus(a)},setMsg:function(a){this.statusField.removeClass("error");this.setStatus(a)},clearMsg:function(){this.statusField.setValue("");this.statusField.removeClass("error");this.statusField.hide()},setFormDisabled:function(b,a){this.userField.setDisabled(b);this.passField.setDisabled(b);this.loginBtn.setDisabled(b)},doAlignDialog:function(b,a){var c=b.getHeight()+16;b.alignTo(a,"br-br",[0,c]);this.doAlignLogo()},doAlignLogo:function(a){var b="br-br";if(!this._data.enable_custom_setting||0!==this._data.status){this.logo.hide();return}this.logo.el.setStyle("maxWidth","300px");this.logo.el.setStyle("maxHeight","100px");if("rightup"===this._data.logo_position){b="tr-tr"}else{if("leftbottom"==this._data.logo_position){b="bl-bl"}else{if("leftup"===this._data.logo_position){b="tl-tl"}}}this.logo.el.alignTo(document.body,b,[0,0]);if(Ext.isNumber(a)){Ext.defer(function(){this.logo.el.alignTo(document.body,b,[0,0])},a,this)}},destroy:function(){}});Ext.define("SYNO.FileStation.Sharing.Utils",{statics:{icon_type:["acc","ai","avi","bmp","doc","exe","fla","folder","gif","htm","indd","iso","jpg","js","misc","mp3","pdf","png","ppt","psd","rar","swf","tar","ttf","txt","wma","xls","ico","tif","tiff","ufo","raw","arw","srf","sr2","dcr","k25","kdc","cr2","crw","nef","mrw","ptx","pef","raf","3fr","erf","mef","mos","orf","rw2","dng","x3f","jpe","jpeg","html","3gp","3g2","asf","dat","divx","dvr-ms","m2t","m2ts","m4v","mkv","mp4","mts","mov","qt","tp","trp","ts","vob","wmv","xvid","ac3","amr","rm","rmvb","ifo","mpeg","mpg","mpe","m1v","m2v","mpeg1","mpeg2","mpeg4","ogv","webm","aac","flac","m4a","m4b","aif","ogg","pcm","wav","cda","mid","mp2","mka","mpc","ape","ra","ac3","dts","bin","img","mds","nrg","daa","docx","wri","rtf","xla","xlb","xlc","xld","xlk","xll","xlm","xlt","xlv","xlw","xlsx","xlsm","xlsb","xltm","xlam","pptx","pps","ppsx","ade","adp","adn","accdr","accdb","accdt","mdb","mda","mdn","mdt","mdw","mdf","mde","accde","mam","maq","mar","mat","maf","flv","f4v","7z","bz2","gz","zip","tgz","tbz","ttc","otf","css","actproj","ad","akp","applescript","as","asax","asc","ascx","asm","asmx","asp","aspx","asr","bkpi","c","cc","php","jsx","xml","xhtml","mhtml","cpp","cs","cxx"],archive_type:["zip","gz","tar","tgz","tbz","bz2","rar","7z","iso"],image_type:["iso"],DocumentFileTypes:"docx,wri,rtf,xla,xlb,xlc,xld,xlk,xll,xlm,xlt,xlv,xlw,xlsx,xlsm,xlsb,xltm,xlam,pptx,pps,ppsx,pdf,txt,doc,xls,ppt",ImageFileTypes:"ico,tif,tiff,ufo,raw,arw,srf,sr2,dcr,k25,kdc,cr2,crw,nef,mrw,ptx,pef,raf,3fr,erf,mef,mos,orf,rw2,dng,x3f,jpg,jpg,jpeg,png,gif,bmp",VideoFileTypes:"3gp,3g2,asf,dat,divx,dvr-ms,m2t,m2ts,m4v,mkv,mp4,mts,mov,qt,tp,trp,ts,vob,wmv,xvid,ac3,amr,rm,rmvb,ifo,mpeg,mpg,mpe,m1v,m2v,mpeg1,mpeg2,mpeg4,ogv,webm,flv,avi,swf,f4v",AudioFileTypes:"aac,flac,m4a,m4b,aif,ogg,pcm,wav,cda,mid,mp2,mka,mpc,ape,ra,ac3,dts,wma,mp3",WebPageFileTypes:"html,htm,css,actproj,ad,akp,applescript,as,asax,asc,ascx,asm,asmx,asp,aspx,asr,c,cc,php,jsx,xml,xhtml,mhtml,cpp,cs,cxx,js",DiscFileTypes:"bin,img,mds,nrg,daa,iso",ZippedFileTypes:"7z,bz2,gz,zip,tgz,tbz,rar,tar",GetThumbName:function(b,g){var f,e;var d=SYNO.FileStation.Sharing.Utils.isRetina();var c=(d)?"2x":"1x";var a=(d)?"files_ext_256":"files_ext_128";if("true"===g){f=c+"/"+a+"/folder.png"}else{if(Ext.isEmpty(b)){f=c+"/icon_error.png"}else{e=b.substr(b.lastIndexOf(".")+1);e=e.toLowerCase();if(-1!==SYNO.FileStation.Sharing.Utils.icon_type.indexOf(e)){f=e+".png"}else{f="misc.png"}f=c+"/"+a+"/"+f}}return f},isRetina:function(){var a=false;var b="(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)";if(window.devicePixelRatio>=1.5){a=true}if(window.matchMedia&&window.matchMedia(b).matches){a=true}return a}}});