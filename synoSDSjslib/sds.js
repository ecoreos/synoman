/* Copyright (c) INTEGRA EMPRESAS 2016. All rights reserved. */

SYNO.SDS.UIFeatures = function() {
    var b = {
        previewBox: (!Ext.isIE || Ext.isModernIE),
        expandMenuHideAll: true,
        windowGhost: !Ext.isIE || Ext.isModernIE,
        disableWindowShadow: Ext.isIE && !Ext.isModernIE,
        exposeWindow: (!Ext.isIE || Ext.isIE10p),
        msPointerEnabled: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0,
        isTouch: ("ontouchstart" in window) || (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0),
        isRetina: function() {
            var d = false;
            var c = "(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)";
            if (window.devicePixelRatio >= 1.5) {
                d = true
            }
            if (window.matchMedia && window.matchMedia(c).matches) {
                d = true
            }
            return d
        }(),
        isSupportFullScreen: document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled
    };
    var a = Ext.urlDecode(location.search.substr(1));
    Ext.iterate(a, function(c) {
        var d = a[c];
        if (Ext.isDefined(b[c])) {
            b[c] = (d === "false") ? false : true
        }
    });
    return {
        test: function(c) {
            return !!b[c]
        },
        listAll: function() {
            var c = "== Feature List ==\n";
            Ext.iterate(b, function(d) {
                c += String.format("{0}: {1}\n", d, b[d])
            })
        },
        isFullScreenMode: function() {
            return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement)
        }
    }
}();
Ext.define("SYNO.SDS.UIFeatures.IconSizeManager", {
    statics: {
        PortalIcon: 64,
        GroupView: 24,
        Taskbar: 32,
        GroupViewHover: 48,
        Desktop: 64,
        ClassicalDesktop: 48,
        AppView: 72,
        AppViewClassic: 48,
        Header: 24,
        HeaderV4: 16,
        TreeIcon: 16,
        StandaloneHeader: 24,
        FavHeader: 16,
        isEnableHDPack: false,
        cls: "synohdpack",
        debugCls: "synohdpackdebug",
        getAppPortalIconPath: function(b) {
            var e = this.getRetinaAndSynohdpackStatus();
            var a = e ? 256 : this.PortalIcon;
            var c = e ? "2x" : "1x";
            var d = String.format(b, a, c);
            return d
        },
        getIconPath: function(g, h, a) {
            var k, c, f = "webman/",
                d = "/synohdpack/images/dsm/";
            var i = this.getRetinaAndSynohdpackStatus();
            var e = function(m, o, n, l) {
                return m.replace(o, (o === "48") ? "128" : o * 2)
            };
            var b = function(m, o, n, l) {
                return m.replace(o, (o === "48") ? "128" : o * 2)
            };
            if (0 === g.indexOf("webman/3rdparty/")) {
                var j = String.format("webapi/entry.cgi?api=SYNO.Core.Synohdpack&version=1&method=getHDIcon&res={0}&retina={1}&path={2}", this.getRes(h), i, g);
                return j
            }
            if (-1 === g.indexOf("{1}")) {
                if (i) {
                    a = a || false;
                    if (a || -1 !== g.indexOf("shortcut_icons") || -1 !== g.indexOf("webfm/images")) {
                        c = g
                    } else {
                        if (0 === g.indexOf(f)) {
                            c = d + g.substr(f.length)
                        } else {
                            c = d + g
                        }
                    }
                } else {
                    c = g
                }
            } else {
                c = g.replace("{1}", i ? "2x" : "1x")
            }
            switch (h) {
                case "Taskbar":
                    k = String.format(c, i ? this.Taskbar * 2 : this.Taskbar);
                    break;
                case "Desktop":
                    if (-1 != c.indexOf("files_ext_48")) {
                        c = c.replace("files_ext_48", "files_ext_64")
                    }
                    if (-1 != c.indexOf("files_ext_")) {
                        c = c.replace(/webfm\/images/, i ? "images/2x" : "images/1x");
                        k = i ? c.replace(/.*\/files_ext_(\d+)\/.*/, e) : c
                    } else {
                        if (-1 != c.indexOf("shortcut_icons")) {
                            c = c.replace(/images\/shortcut_icons/, i ? "images/default/2x/shortcut_icons" : "images/default/1x/shortcut_icons");
                            k = i ? c.replace(/.*\/.*_(\d+)\.png$/, b) : c
                        } else {
                            k = String.format(c, i ? 256 : this.Desktop)
                        }
                    }
                    break;
                case "ClassicalDesktop":
                    if (-1 != c.indexOf("files_ext_")) {
                        c = c.replace(/webfm\/images/, i ? "images/2x" : "images/1x");
                        k = i ? c.replace(/.*\/files_ext_(\d+)\/.*/, e) : c
                    } else {
                        if (-1 != c.indexOf("shortcut_icons")) {
                            c = c.replace(/images\/shortcut_icons/, i ? "images/default/2x/shortcut_icons" : "images/default/1x/shortcut_icons");
                            k = i ? c.replace(/.*\/.*_(\d+)\.png$/, b) : c
                        } else {
                            k = String.format(c, i ? 256 : this.ClassicalDesktop)
                        }
                    }
                    break;
                case "AppView":
                    k = String.format(c, i ? 256 : this.AppView);
                    break;
                case "AppViewClassic":
                    k = String.format(c, i ? 256 : this.AppViewClassic);
                    break;
                case "Header":
                    k = String.format(c, i ? this.Header * 2 : this.Header);
                    break;
                case "HeaderV4":
                    k = String.format(c, i ? this.HeaderV4 * 2 : this.HeaderV4);
                    break;
                case "StandaloneHeader":
                    k = String.format(c, i ? this.StandaloneHeader * 2 : this.StandaloneHeader);
                    break;
                case "FavHeader":
                    k = String.format(c, i ? this.FavHeader * 2 : this.FavHeader);
                    break;
                case "FileType":
                    k = (i) ? c.replace(/.*\/files_ext_(\d+)\/.*/, e) : c;
                    break;
                case "TreeIcon":
                    k = String.format(c, i ? this.TreeIcon * 3 : this.TreeIcon);
                    break;
                default:
                    k = c;
                    break
            }
            if (-1 == k.indexOf(String.format("?v={0}", _S("fullversion"))) && ".png" === k.substr(k.length - 4)) {
                k += "?v=" + _S("fullversion")
            }
            k = encodeURI(k);
            return k
        },
        enableHDDisplay: function(a) {
            SYNO.SDS.UIFeatures.IconSizeManager.isEnableHDPack = a
        },
        getRetinaAndSynohdpackStatus: function() {
            return SYNO.SDS.UIFeatures.test("isRetina") && (this.isEnableHDPack || SYNO.SDS.Session.SynohdpackStatus || false)
        },
        addHDClsAndCSS: function(a) {
            if (a && SYNO.SDS.UIFeatures.test("isRetina")) {
                Ext.get(document.documentElement).addClass(this.cls)
            }
        },
        enableRetinaDisplay: function() {
            Ext.get(document.documentElement).removeClass(this.debugCls);
            Ext.get(document.documentElement).addClass(this.cls);
            SYNO.SDS.UIFeatures.IconSizeManager.isEnableHDPack = true
        },
        enableRetinaDebugMode: function() {
            Ext.get(document.documentElement).removeClass(this.cls);
            Ext.get(document.documentElement).addClass(this.debugCls);
            SYNO.SDS.UIFeatures.IconSizeManager.isEnableHDPack = true
        },
        disableRetinaDisplay: function() {
            Ext.get(document.documentElement).removeClass(this.cls);
            Ext.get(document.documentElement).removeClass(this.debugCls);
            SYNO.SDS.UIFeatures.IconSizeManager.isEnableHDPack = false
        },
        getRes: function(b) {
            switch (b) {
                case "Taskbar":
                    return this.Taskbar;
                case "Desktop":
                    return this.Desktop;
                case "ClassicalDesktop":
                    return this.ClassicalDesktop;
                case "AppView":
                    var a = SYNO.SDS.UserSettings.getProperty("Desktop", "appMenuStyle");
                    if (a === "classical") {
                        return this.AppViewClassic
                    }
                    return this.AppView;
                case "Header":
                    return this.Header;
                case "HeaderV4":
                    return this.HeaderV4;
                case "StandaloneHeader":
                    return this.StandaloneHeader;
                case "FileType":
                    return this.FileType;
                case "PortalIcon":
                    return this.PortalIcon;
                case "TreeIcon":
                    return this.TreeIcon;
                case "FavHeader":
                    return this.FavHeader;
                default:
                    return -1
            }
        }
    }
});
Ext.namespace("SYNO.SDS._StatusNotifier");
Ext.define("SYNO.SDS._StatusNotifier", {
    extend: "Ext.util.Observable",
    constructor: function() {
        this.addEvents("beforeunload");
        this.callParent(arguments)
    },
    isAppEnabled: function(a) {
        if (this.isSupportedApp(a) !== true) {
            return false
        }
        if (!SYNO.SDS.StatusNotifier.isAppHasPrivilege(a)) {
            return false
        }
        if (!SYNO.SDS.StatusNotifier.isServiceEnabled(a)) {
            return false
        }
        return true
    },
    isSupportedApp: function(e) {
        var d = SYNO.SDS.Config.FnMap[e],
            b, f, c = true,
            a;
        if (!d || !Ext.isDefined(d.config)) {
            return false
        }
        b = d.config;
        if (b.type !== "app" || !Ext.isDefined(b.supportKey)) {
            return true
        }
        f = Ext.isArray(b.supportKey) ? b.supportKey : [b.supportKey];
        Ext.each(f, function(g) {
            a = (Ext.isDefined(g.value) ? (_D(g.key) === g.value) : !Ext.isEmpty(_D(g.key)));
            if (Ext.isDefined(g.cond) && (g.cond === "or")) {
                c = c || a
            } else {
                c = c && a
            }
        }, this);
        return c
    },
    isAppHasPrivilege: function(c) {
        var a, b = SYNO.SDS.Config.FnMap[c];
        if (Ext.isDefined(SYNO.SDS.AppPrivilege[c]) && true !== SYNO.SDS.AppPrivilege[c]) {
            return false
        }
        if (!b) {
            return false
        }
        a = b.config.grantPrivilege;
        if ("all" === a || ("false" === _S("domainUser") && "local" === a) || ("true" === _S("domainUser") && "domain" === a)) {
            return SYNO.SDS.AppPrivilege["SYNO.ALLOW.ALL.APPLICATIONS"] || SYNO.SDS.AppPrivilege[c]
        }
        if (true !== _S("is_admin") && true !== b.config.allUsers) {
            return false
        }
        if (("local" === a && "true" === _S("domainUser")) || ("domain" === a && "false" === _S("domainUser"))) {
            return false
        }
        return true
    },
    isServiceEnabled: function(a) {
        if (Ext.isDefined(SYNO.SDS.ServiceStatus[a]) && true !== SYNO.SDS.ServiceStatus[a]) {
            return false
        }
        return true
    },
    setServiceDisabled: function(c, b, a) {
        if ((!b) !== !!SYNO.SDS.ServiceStatus[c]) {
            SYNO.SDS.ServiceStatus[c] = !b;
            this.fireEvent("servicechanged", c, !b, a)
        }
    },
    checkServiceBlocked: function(a) {
        this.fireEvent("checkserviceblocked", a, "checkserviceblocked")
    },
    setAppPrivilege: function(b, a) {
        if ((!!a) !== !!SYNO.SDS.AppPrivilege[b]) {
            SYNO.SDS.AppPrivilege[b] = !!a;
            this.fireEvent("appprivilegechanged", b, !!a)
        }
    }
});
Ext.namespace("SYNO.SDS._UserSettings");
SYNO.SDS._UserSettings = Ext.extend(Ext.Component, {
    data: null,
    ajaxTask: null,
    delayedTask: null,
    modified: null,
    webapi: {
        get: {
            api: "SYNO.Core.UserSettings",
            method: "get",
            version: 1
        },
        apply: {
            api: "SYNO.Core.UserSettings",
            method: "apply",
            version: 1
        }
    },
    constructor: function() {
        SYNO.SDS._UserSettings.superclass.constructor.apply(this, arguments);
        this.data = SYNO.SDS.initUserSettings || {};
        this.delayedTask = new Ext.util.DelayedTask(this.save, this);
        if (SYNO.SDS.StatusNotifier) {
            this.mon(SYNO.SDS.StatusNotifier, "logout", this.syncSave, this);
            this.mon(SYNO.SDS.StatusNotifier, "halt", this.saveAndUnload, this);
            this.mon(SYNO.SDS.StatusNotifier, "redirect", this.saveAndUnload, this)
        }
        this.registerUnloadEvent()
    },
    getUnloadEventName: function() {
        var c = ("onpagehide" in window),
            b = ("onbeforeunload" in window),
            a = "";
        if (b) {
            a = "beforeunload"
        } else {
            if (c) {
                a = "pagehide"
            } else {
                a = null
            }
        }
        return a
    },
    registerUnloadEvent: function() {
        var a = this.getUnloadEventName();
        if (a) {
            Ext.EventManager.on(window, a, this.syncSave, this)
        }
    },
    unregisterUnloadEvent: function() {
        var a = this.getUnloadEventName();
        if (a) {
            Ext.EventManager.un(window, a, this.syncSave, this)
        }
    },
    saveAndUnload: function() {
        this.syncSave();
        this.unregisterUnloadEvent()
    },
    syncSave: function(a) {
        if (SYNO.SDS.StatusNotifier) {
            SYNO.SDS.StatusNotifier.fireEvent("beforeUserSettingsUnload")
        }
        if (!this.modified || _S("demo_mode")) {
            return
        }
        if (this.ajaxTask) {
            this.ajaxTask.remove()
        }
        this.sendWebAPI(Ext.apply({
            async: false,
            timeout: 10,
            params: {
                data: Ext.encode(this.modified)
            },
            callback: this.onSaveSuccess.createDelegate(this, [a])
        }, this.webapi.apply))
    },
    load: function() {
        this.addWebAPITask(Ext.apply({
            single: true,
            callback: this.onLoadSuccess.createDelegate(this)
        }, this.webapi.get)).start()
    },
    save: function() {
        if (!this.modified || _S("demo_mode")) {
            return
        }
        if (this.ajaxTask) {
            this.ajaxTask.remove()
        }
        this.ajaxTask = this.addWebAPITask(Ext.apply({
            single: true,
            params: {
                data: Ext.encode(this.modified)
            },
            callback: this.onSaveSuccess.createDelegate(this)
        }, this.webapi.apply)).start()
    },
    onLoadSuccess: function(d, b, c, a) {
        if (!d) {
            return
        }
        this.data = b
    },
    onSaveSuccess: function(a) {
        this.modified = null;
        var b;
        if (Ext.isObject(a)) {
            b = a.scope || this;
            var c = a.callback;
            if (Ext.isFunction(c)) {
                c.call(b)
            }
        }
    },
    getProperty: function(c, a) {
        try {
            return this.data[c][a]
        } catch (b) {
            return null
        }
    },
    setProperty: function(c, a, b) {
        this.modified = this.modified || {};
        if (typeof b === "undefined" || b === null) {
            return this.removeProperty(c, a)
        }
        if (!Ext.isObject(this.data[c])) {
            this.data[c] = {}
        }
        this.data[c][a] = b;
        this.modified[c] = this.data[c];
        this.delayedTask.delay(3000)
    },
    removeProperty: function(b, a) {
        if (!this.data[b]) {
            return
        }
        this.modified = this.modified || {};
        this.modified[b] = this.data[b];
        delete this.data[b][a];
        this.delayedTask.delay(3000)
    }
});
SYNO.SDS.UserSettingsProvider = Ext.extend(Ext.state.Provider, {
    constructor: function() {
        SYNO.SDS.UserSettingsProvider.superclass.constructor.apply(this, arguments)
    },
    set: function(a, b) {
        if (typeof b == "undefined" || b === null) {
            this.clear(a);
            return
        }
        SYNO.SDS.UserSettingsProvider.superclass.set.call(this, a, b);
        SYNO.SDS.UserSettings.setProperty("desktop", "stateProvider", this.state)
    },
    clear: function(a) {
        SYNO.SDS.UserSettingsProvider.superclass.clear.call(this, a);
        SYNO.SDS.UserSettings.setProperty("desktop", "stateProvider", this.state)
    }
});
Ext.namespace("SYNO.SDS._GroupSettings");
SYNO.SDS._GroupSettings = Ext.extend(SYNO.SDS._UserSettings, {
    admingrpsetmtime: 0,
    webapi: {
        get: {
            api: "SYNO.Core.GroupSettings",
            method: "get",
            version: 1
        },
        apply: {
            api: "SYNO.Core.GroupSettings",
            method: "apply",
            version: 1
        }
    },
    constructor: function() {
        SYNO.SDS._UserSettings.superclass.constructor.apply(this, arguments);
        this.data = SYNO.SDS.initGroupSettings || {};
        this.delayedTask = new Ext.util.DelayedTask(this.save, this);
        if (SYNO.SDS.StatusNotifier) {
            this.mon(SYNO.SDS.StatusNotifier, "logout", this.syncSave, this)
        }
        this.registerUnloadEvent()
    },
    onSaveSuccess: function(b, a) {
        SYNO.SDS._GroupSettings.superclass.constructor.apply(this, arguments);
        if (Ext.isObject(b) && b.success && b.admingrpsetmtime) {
            this.admingrpsetmtime = b.admingrpsetmtime
        }
    },
    onLoadSuccess: function(d, c, b, a) {
        if (!d || !c) {
            return
        }
        this.data = c.data || {};
        this.admingrpsetmtime = c.admingrpsetmtime || 0;
        if (SYNO.SDS.StatusNotifier) {
            SYNO.SDS.StatusNotifier.fireEvent("syncGroupSettings")
        }
    },
    syncSave: function(a) {
        if (SYNO.SDS.StatusNotifier) {
            SYNO.SDS.StatusNotifier.fireEvent("beforeGroupSettingsUnload")
        }
        if (!this.modified || _S("demo_mode")) {
            return
        }
        if (this.ajaxTask) {
            this.ajaxTask.remove()
        }
        this.sendWebAPI(Ext.apply({
            async: false,
            timeout: 10,
            params: {
                data: Ext.encode(this.modified)
            },
            callback: this.onSaveSuccess.createDelegate(this, [a])
        }, this.webapi.apply))
    },
    reload: function(a) {
        if (_S("is_admin") && (a !== this.admingrpsetmtime)) {
            this.admingrpsetmtime = a || 0;
            this.load()
        }
    }
});
Ext.namespace("SYNO.SDS.TaskRunner");
SYNO.SDS._TaskMgr = function(n) {
    var e = n || 10,
        h = [],
        a = [],
        d = 0,
        i = false,
        l = false,
        j = function(o, q) {
            var p;
            while (q !== 0) {
                p = o % q;
                o = q;
                q = p
            }
            return o
        },
        g = function() {
            var p, o, q = h[0].interval;
            for (p = 1;
                (o = h[p]); p++) {
                q = j(q, o.interval)
            }
            return Math.max(q, n)
        },
        f = function() {
            var o = g();
            if (o !== e) {
                e = o;
                return true
            }
            return false
        },
        c = function() {
            i = false;
            clearTimeout(d);
            d = 0
        },
        k = function() {
            if (!i) {
                i = true;
                f();
                setImmediate(m)
            }
        },
        b = function(o) {
            a.push(o);
            if (o.onStop) {
                o.onStop.apply(o.scope || o)
            }
        },
        m = function() {
            var u, s, r, o, p, w = false,
                q = new Date().getTime();
            for (u = 0;
                (s = a[u]); u++) {
                h.remove(s);
                w = true
            }
            a = [];
            if (!h.length) {
                c();
                return
            }
            for (u = 0;
                (s = h[u]); ++u) {
                s = h[u];
                if (l && s.preventHalt !== true) {
                    b(s);
                    continue
                }
                o = q - s.taskRunTime;
                if (s.interval <= o) {
                    try {
                        p = s.run.apply(s.scope || s, s.args || [++s.taskRunCount])
                    } catch (v) {
                        if (!Ext.isIE) {
                            SYNO.Debug.error("TaskRunner: task " + s.id + " exception: ", v);
                            if (Ext.isDefined(SYNO.SDS.JSDebug)) {
                                s.taskRunTime = q;
                                throw v
                            }
                        }
                    }
                    s.taskRunTime = q;
                    r = s.interval;
                    s.interval = s.adaptiveInterval();
                    if (r !== s.interval) {
                        w = true
                    }
                    if (p === false || s.taskRunCount === s.repeat) {
                        b(s);
                        return
                    }
                }
                if (s.duration && s.duration <= (q - s.taskStartTime)) {
                    b(s)
                }
            }
            if (w) {
                f()
            }
            d = setTimeout(m, e)
        };
    this.start = function(p, o) {
        var q = new Date().getTime();
        h.push(p);
        p.taskStartTime = q;
        p.taskRunTime = (false === o) ? q : 0;
        p.taskRunCount = 0;
        if (!i) {
            k()
        } else {
            f();
            clearTimeout(d);
            setImmediate(m)
        }
        return p
    };
    this.stop = function(o) {
        b(o);
        return o
    };
    this.stopAll = function() {
        var p, o;
        c();
        for (p = 0;
            (o = h[p]); p++) {
            if (o.onStop) {
                o.onStop()
            }
        }
        h = [];
        a = []
    };
    this.setHalt = function(o) {
        l = o
    }
};
SYNO.SDS.TaskMgr = new SYNO.SDS._TaskMgr(100);
SYNO.SDS.TaskRunner = Ext.extend(Ext.util.Observable, {
    tasks: null,
    constructor: function() {
        SYNO.SDS.TaskRunner.superclass.constructor.apply(this, arguments);
        this.addEvents("add", "remove", "beforestart");
        this.tasks = {}
    },
    destroy: function() {
        this.stopAll();
        this.tasks = {};
        this.isDestroyed = true
    },
    start: function(b, a) {
        if (this.isDestroyed) {
            return
        }
        if (!b.running) {
            this.fireEvent("beforestart", b);
            SYNO.SDS.TaskMgr.start(b, a)
        }
        b.running = true;
        return b
    },
    stop: function(a) {
        if (a.running) {
            SYNO.SDS.TaskMgr.stop(a)
        }
        a.running = false;
        return a
    },
    stopAll: function() {
        for (var a in this.tasks) {
            if (this.tasks.hasOwnProperty(a)) {
                if (!this.tasks[a].running) {
                    continue
                }
                SYNO.SDS.TaskMgr.stop(this.tasks[a])
            }
        }
    },
    addTask: function(a) {
        a.id = a.id || Ext.id();
        this.tasks[a.id] = a;
        this.fireEvent("add", a);
        return a
    },
    createTask: function(b) {
        b.id = b.id || Ext.id();
        var a = this.tasks[b.id];
        if (a) {
            a.apply(b)
        } else {
            a = new SYNO.SDS.TaskRunner.Task(b, this);
            this.addTask(a)
        }
        return a
    },
    createAjaxTask: function(b) {
        b.id = b.id || Ext.id();
        var a = this.tasks[b.id];
        if (a) {
            a.apply(b)
        } else {
            a = new SYNO.SDS.TaskRunner.AjaxTask(b, this);
            this.addTask(a)
        }
        return a
    },
    createWebAPITask: function(b) {
        b.id = b.id || Ext.id();
        var a = this.tasks[b.id];
        if (a) {
            a.apply(b)
        } else {
            a = new SYNO.SDS.TaskRunner.WebAPITask(b, this);
            this.addTask(a)
        }
        return a
    },
    removeTask: function(b) {
        var a = this.tasks[b];
        if (a) {
            this.fireEvent("remove", a);
            delete this.tasks[b]
        }
    },
    getTask: function(a) {
        return this.tasks[a] || null
    }
});
SYNO.SDS.TaskRunner.Task = Ext.extend(Ext.util.Observable, {
    INTERVAL_DEFAULT: 60000,
    INTERVAL_FALLBACK: 60000,
    manager: null,
    running: false,
    removed: false,
    taskFirstRunTime: 0,
    constructor: function(a, b) {
        SYNO.SDS.TaskRunner.Task.superclass.constructor.apply(this, arguments);
        this.manager = b;
        this.apply(a)
    },
    apply: function(a) {
        this.applyInterval(a.interval);
        delete a.interval;
        this.applyConfig(a)
    },
    applyConfig: function(a) {
        Ext.apply(this, a)
    },
    applyInterval: function(a) {
        this.intervalData = a;
        if (!Ext.isFunction(this.intervalData) && !Ext.isArray(this.intervalData) && !Ext.isNumber(this.intervalData)) {
            this.intervalData = this.INTERVAL_DEFAULT
        }
        this.interval = this.adaptiveInterval()
    },
    adaptiveInterval: function() {
        var c, b = 0,
            d = this.intervalData,
            a = null;
        if (this.taskFirstRunTime) {
            b = new Date().getTime() - this.taskFirstRunTime
        }
        if (Ext.isNumber(d)) {
            a = d
        } else {
            if (Ext.isFunction(d)) {
                a = d.call(this.scope || this, b)
            } else {
                if (Ext.isArray(d)) {
                    for (c = 0; c < d.length; ++c) {
                        if (d[c].time > b) {
                            break
                        }
                        a = d[c].interval
                    }
                }
            }
        }
        if (!Ext.isNumber(a)) {
            SYNO.Debug.debug("TaskRunner: Task " + this.id + " interval fallback to " + this.INTERVAL_FALLBACK);
            a = this.INTERVAL_FALLBACK
        }
        return a
    },
    start: function(a) {
        var b = new Date().getTime();
        if (this.removed) {
            return
        }
        if (!this.taskFirstRunTime) {
            this.taskFirstRunTime = (false === a) ? b + this.interval : b
        }
        return this.manager.start(this, a)
    },
    stop: function() {
        if (this.removed) {
            return
        }
        return this.manager.stop(this)
    },
    restart: function(a) {
        this.stop();
        this.start(a)
    },
    remove: function() {
        this.stop();
        this.manager.removeTask(this.id);
        this.removed = true
    }
});
SYNO.SDS.TaskRunner.AjaxTask = Ext.extend(SYNO.SDS.TaskRunner.Task, {
    constructor: function(a, b) {
        this.reqId = null;
        this.reqConfig = null;
        this.cbHandler = null;
        this.autoJsonDecode = false;
        this.single = false;
        SYNO.SDS.TaskRunner.AjaxTask.superclass.constructor.call(this, a, b)
    },
    applyConfig: function(a) {
        Ext.apply(this, {
            run: this.run,
            scope: this
        });
        this.autoJsonDecode = (true === a.autoJsonDecode);
        this.single = (true === a.single);
        this.preventHalt = (true === a.preventHalt);
        this.cbHandler = {};
        this.reqConfig = {};
        Ext.copyTo(this.cbHandler, a, ["scope", "callback", "success", "failure"]);
        Ext.apply(this.reqConfig, a);
        Ext.apply(this.reqConfig, {
            success: null,
            failure: null,
            callback: this.onCallback,
            scope: this
        });
        Ext.applyIf(this.reqConfig, {
            method: "GET"
        });
        delete this.reqConfig.id;
        delete this.reqConfig.autoJsonDecode;
        delete this.reqConfig.single
    },
    stop: function() {
        if (this.reqId) {
            Ext.Ajax.abort(this.reqId);
            this.reqId = null
        }
        SYNO.SDS.TaskRunner.AjaxTask.superclass.stop.apply(this, arguments)
    },
    run: function() {
        if (!this.reqConfig.url) {
            this.remove();
            return
        }
        SYNO.SDS.TaskRunner.AjaxTask.superclass.stop.call(this);
        this.reqId = Ext.Ajax.request(this.reqConfig)
    },
    onCallback: function(d, g, b) {
        var a = b,
            c = Ext.apply({}, d);
        Ext.apply(c, {
            scope: this.cbHandler.scope,
            callback: this.cbHandler.callback,
            success: this.cbHandler.success,
            failure: this.cbHandler.failure
        });
        if (g && this.autoJsonDecode) {
            try {
                a = Ext.util.JSON.decode(b.responseText)
            } catch (f) {
                a = {
                    success: false
                };
                g = false
            }
        }
        if (g && c.success) {
            c.success.call(c.scope, a, d)
        } else {
            if (!g && c.failure) {
                c.failure.call(c.scope, a, d)
            }
        }
        if (c.callback) {
            c.callback.call(c.scope, d, g, a)
        }
        this.fireEvent("callback", d, g, a);
        if (g && this.single) {
            this.reqId = null;
            this.remove()
        } else {
            if (this.reqId) {
                this.reqId = null;
                this.start(false)
            }
        }
    }
});
SYNO.SDS.TaskRunner.WebAPITask = Ext.extend(SYNO.SDS.TaskRunner.AjaxTask, {
    constructor: function(a, b) {
        SYNO.SDS.TaskRunner.WebAPITask.superclass.constructor.call(this, a, b)
    },
    applyConfig: function(a) {
        Ext.apply(this, {
            run: this.run,
            scope: this
        });
        this.single = (true === a.single);
        this.preventHalt = (true === a.preventHalt);
        this.cbHandler = {};
        this.reqConfig = {};
        Ext.copyTo(this.cbHandler, a, ["callback", "scope"]);
        Ext.apply(this.reqConfig, a);
        Ext.apply(this.reqConfig, {
            callback: this.onCallback,
            scope: this
        });
        delete this.reqConfig.id;
        delete this.reqConfig.single
    },
    run: function() {
        SYNO.SDS.TaskRunner.AjaxTask.superclass.stop.call(this);
        this.reqId = SYNO.API.Request(this.reqConfig)
    },
    onCallback: function(e, c, d, b) {
        var a = Ext.apply({}, b);
        Ext.apply(a, {
            scope: this.cbHandler.scope,
            callback: this.cbHandler.callback
        });
        if (a.callback) {
            a.callback.call(a.scope, e, c, d, a)
        }
        this.fireEvent("callback", e, c, d, a);
        if (this.single) {
            this.reqId = null;
            this.remove()
        } else {
            if (this.reqId) {
                this.reqId = null;
                this.start(false)
            }
        }
    }
});
Ext.namespace("SYNO.SDS.BackgroundTaskMgr");
SYNO.SDS._BackgroundTaskMgr = Ext.extend(Ext.util.Observable, {
    taskRunner: null,
    pollingTaskRunner: null,
    tasks: null,
    pollingTask: null,
    taskName: "BackgroundTask",
    settings: "SYNO.SDS.UserSettings",
    constructor: function() {
        SYNO.SDS._BackgroundTaskMgr.superclass.constructor.apply(this, arguments);
        this.addEvents("add", "remove", "progress");
        this.taskRunner = new SYNO.SDS.TaskRunner();
        this.tasks = {};
        this.taskRunner.on("remove", this.onTaskRunnerRemove, this);
        if (this.taskName === "BackgroundTask" && SYNO.SDS.StatusNotifier.isAppEnabled("SYNO.SDS.App.FileStation3.Instance")) {
            this.initBackdroundTask()
        } else {
            this.loadUserSettings()
        }
    },
    initBackdroundTask: function() {
        var b = this;
        if (this.pollingTaskRunner) {
            return
        }
        this.pollingTaskRunner = new SYNO.SDS.TaskRunner();
        var a = {
            interval: 300000,
            api: "SYNO.FileStation.BackgroundTask",
            method: "list",
            params: {
                is_list_sharemove: true,
                is_vfs: true,
                bkg_info: true
            },
            version: 3,
            callback: function(d, c) {
                if (d) {
                    Ext.iterate(c.tasks, function(e, f) {
                        if (e.background && e.background.id && Ext.isEmpty(b.taskRunner.getTask(e.background.id)) && !e.finished) {
                            b.addWebAPITask(e.background)
                        }
                    })
                }
            },
            scope: b
        };
        this.pollingTask = this.pollingTaskRunner.createWebAPITask(a);
        this.pollingTask.start(true)
    },
    loadUserSettings: function() {
        var b = Ext.getClassByName(this.settings);
        var d, c = b.getProperty(this.taskName, "tasks");
        for (d in c) {
            if (c.hasOwnProperty(d)) {
                var a = c[d];
                if (!a) {
                    this.removeTask(d);
                    return
                } else {
                    if (a.query && a.query.api) {
                        this.addWebAPITask(c[d])
                    } else {
                        this.addTask(c[d])
                    }
                }
            }
        }
    },
    addTask: function(b) {
        b.id = b.id || Ext.id();
        this.tasks[b.id] = SYNO.Util.copy(Ext.copyTo({}, b, "id,title,query,cancel,options"));
        var a = new SYNO.SDS._BackgroundTaskMgr.Task(b, this.taskRunner);
        a.id = b.id;
        a.addCallback(this.onTaskProgress, this);
        this.taskRunner.addTask(a).start();
        this.fireEvent("add", a);
        if (this.pollingTask) {
            this.pollingTask.restart(true)
        } else {
            var c = Ext.getClassByName(this.settings);
            c.setProperty(this.taskName, "tasks", this.tasks)
        }
        return a
    },
    addWebAPITask: function(b) {
        b.id = b.id || Ext.id();
        this.tasks[b.id] = SYNO.Util.copy(Ext.copyTo({}, b, "id,title,query,cancel,options"));
        var a = new SYNO.SDS._BackgroundTaskMgr.WebAPITask(b, this.taskRunner);
        a.id = b.id;
        a.addCallback(this.onTaskProgress, this);
        this.taskRunner.addTask(a).start();
        this.fireEvent("add", a);
        if (this.pollingTask) {
            this.pollingTask.restart(true)
        } else {
            var c = Ext.getClassByName(this.settings);
            c.setProperty(this.taskName, "tasks", this.tasks)
        }
        return a
    },
    getTask: function(a) {
        return this.taskRunner.getTask(a)
    },
    removeTask: function(b) {
        var a = this.getTask(b);
        if (a) {
            a.remove()
        }
        this.fireEvent("remove", a)
    },
    onTaskRunnerRemove: function(a) {
        delete this.tasks[a.id];
        var b = Ext.getClassByName(this.settings);
        b.setProperty(this.taskName, "tasks", this.tasks)
    },
    onTaskProgress: function(a, d, e, b, c) {
        this.fireEvent("progress", a, d, e, b, c)
    }
});
SYNO.SDS._BackgroundTaskMgr.Task = Ext.extend(SYNO.SDS.TaskRunner.AjaxTask, {
    INTERVAL_DEFAULT: [{
        time: 0,
        interval: 3000
    }, {
        time: 6000,
        interval: 5000
    }, {
        time: 60000,
        interval: 6000
    }, {
        time: 120000,
        interval: 7000
    }, {
        time: 300000,
        interval: 10000
    }],
    constructor: function(a, b) {
        this.addEvents("progress");
        SYNO.SDS._BackgroundTaskMgr.Task.superclass.constructor.apply(this, arguments)
    },
    applyConfig: function(a) {
        this.ajaxTaskConfig = {};
        Ext.copyTo(this.ajaxTaskConfig, a.query, "method,url,params");
        Ext.apply(this.ajaxTaskConfig, {
            autoJsonDecode: true,
            success: this.onQuerySuccess,
            callback: this.onQueryCallback,
            scope: this
        });
        if (a.cancel) {
            this.cancelAjaxConfig = {};
            Ext.copyTo(this.cancelAjaxConfig, a.cancel, "method,url,params");
            Ext.apply(this.cancelAjaxConfig, {
                autoJsonDecode: true,
                success: this.onCancelSuccess,
                scope: this
            })
        }
        Ext.copyTo(this, a, "title,desc");
        SYNO.SDS._BackgroundTaskMgr.Task.superclass.applyConfig.call(this, this.ajaxTaskConfig)
    },
    cancel: function() {
        if (!this.cancelAjaxConfig) {
            this.onCancelSuccess();
            return
        }
        this.stop();
        SYNO.SDS._BackgroundTaskMgr.Task.superclass.applyConfig.call(this, this.cancelAjaxConfig);
        this.start()
    },
    restart: function() {
        SYNO.SDS._BackgroundTaskMgr.Task.superclass.applyConfig.call(this, this.ajaxTaskConfig);
        SYNO.SDS._BackgroundTaskMgr.Task.superclass.restart.apply(this, arguments)
    },
    remove: function() {
        this.purgeListeners();
        SYNO.SDS._BackgroundTaskMgr.Task.superclass.remove.apply(this, arguments)
    },
    addCallback: function(b, a) {
        this.on("progress", b, a)
    },
    removeCallback: function(b, a) {
        this.un("progress", b, a)
    },
    onQuerySuccess: function(b, a) {
        if (b.success) {
            this.fireEvent("progress", this, "query", b.finished, b.progress, b.data, a.params, a)
        }
        if (!b.success || b.finished) {
            if (SYNO.SDS.StatusNotifier) {
                SYNO.SDS.StatusNotifier.fireEvent("checknotify")
            }
            this.remove()
        }
    },
    onQueryCallback: function(a, c, b) {
        if (!c && b && (403 === b.status || 404 === b.status)) {
            this.remove()
        }
    },
    onCancelSuccess: function(b, a) {
        if (SYNO.SDS.StatusNotifier) {
            SYNO.SDS.StatusNotifier.fireEvent("checknotify")
        }
        if (false !== this.fireEvent("progress", this, "cancel", null, null, b.data || b, a.params, a)) {
            this.remove()
        }
    }
});
SYNO.SDS._GroupSettingBackgroundTaskMgr = Ext.extend(SYNO.SDS._BackgroundTaskMgr, {
    taskName: "GroupBackgroundTask",
    settings: "SYNO.SDS.GroupSettings",
    constructor: function() {
        SYNO.SDS._GroupSettingBackgroundTaskMgr.superclass.constructor.apply(this, arguments);
        SYNO.SDS.StatusNotifier.on("syncGroupSettings", this.syncGroupSettings, this)
    },
    syncGroupSettings: function() {
        this.loadGroupSettings()
    },
    loadGroupSettings: function() {
        var a = Ext.getClassByName(this.settings);
        var c, b = a.getProperty(this.taskName, "tasks");
        for (c in b) {
            if (!this.getTask(b[c])) {
                this.addTask(b[c])
            }
        }
    }
});
SYNO.SDS._MailBackgroundTaskMgr = Ext.extend(SYNO.SDS._BackgroundTaskMgr, {
    taskName: "MailTask",
    settings: "SYNO.SDS.UserSettings",
    addWebAPITask: function(b) {
        b.id = b.id || Ext.id();
        this.tasks[b.id] = SYNO.Util.copy(Ext.copyTo({}, b, "id,title,query,cancel,options"));
        var a = new SYNO.SDS._BackgroundTaskMgr.WebAPITask(b, this.taskRunner);
        a.id = b.id;
        a.sender = b.sender;
        a.reciever = b.reciever;
        a.subject = b.subject;
        a.addCallback(this.onTaskProgress, this);
        this.taskRunner.addTask(a).start();
        this.fireEvent("add", a);
        var c = Ext.getClassByName(this.settings);
        c.setProperty(this.taskName, "tasks", this.tasks);
        return a
    }
});
SYNO.SDS._UploadBackgroundTaskMgr = Ext.extend(SYNO.SDS._BackgroundTaskMgr, {
    taskName: "UploadTask",
    settings: "SYNO.SDS.UserSettings"
});
SYNO.SDS._PackageBackgroundTaskMgr = Ext.extend(SYNO.SDS._GroupSettingBackgroundTaskMgr, {
    taskName: "PackageTask",
    settings: "SYNO.SDS.GroupSettings"
});
SYNO.SDS._BackgroundTaskMgr.WebAPITask = Ext.extend(SYNO.SDS.TaskRunner.WebAPITask, {
    INTERVAL_DEFAULT: SYNO.SDS._BackgroundTaskMgr.Task.prototype.INTERVAL_DEFAULT,
    constructor: function(a, b) {
        this.addEvents("progress");
        SYNO.SDS._BackgroundTaskMgr.WebAPITask.superclass.constructor.apply(this, arguments)
    },
    applyConfig: function(a) {
        this.ajaxTaskConfig = {};
        Ext.copyTo(this.ajaxTaskConfig, a.query, "api,method,version,url,params");
        Ext.apply(this.ajaxTaskConfig, {
            callback: this.onQuerySuccess,
            scope: this
        });
        if (a.cancel) {
            this.cancelAjaxConfig = {};
            Ext.copyTo(this.cancelAjaxConfig, a.cancel, "api,method,version,url,params");
            Ext.apply(this.cancelAjaxConfig, {
                callback: this.onCancelSuccess,
                scope: this
            })
        }
        Ext.copyTo(this, a, "title,desc");
        SYNO.SDS._BackgroundTaskMgr.WebAPITask.superclass.applyConfig.call(this, this.ajaxTaskConfig)
    },
    cancel: function() {
        if (!this.cancelAjaxConfig) {
            this.onCancelSuccess();
            return
        }
        this.stop();
        SYNO.SDS._BackgroundTaskMgr.WebAPITask.superclass.applyConfig.call(this, this.cancelAjaxConfig);
        this.start()
    },
    restart: function() {
        SYNO.SDS._BackgroundTaskMgr.WebAPITask.superclass.applyConfig.call(this, this.ajaxTaskConfig);
        SYNO.SDS._BackgroundTaskMgr.WebAPITask.superclass.restart.apply(this, arguments)
    },
    remove: function() {
        this.purgeListeners();
        SYNO.SDS._BackgroundTaskMgr.WebAPITask.superclass.remove.apply(this, arguments)
    },
    addCallback: function(b, a) {
        this.on("progress", b, a)
    },
    removeCallback: function(b, a) {
        this.un("progress", b, a)
    },
    onQuerySuccess: function(d, b, c, a) {
        if (d) {
            this.fireEvent("progress", this, "query", b.finished, b.progress, b, c, a)
        } else {
            this.fireEvent("progress", this, "fail", null, null, b, c, a)
        }
        if (!d || b.finished) {
            if (SYNO.SDS.StatusNotifier) {
                SYNO.SDS.StatusNotifier.fireEvent("checknotify")
            }
            this.remove()
        }
    },
    onCancelSuccess: function(d, b, c, a) {
        if (SYNO.SDS.StatusNotifier) {
            SYNO.SDS.StatusNotifier.fireEvent("checknotify")
        }
        if (false !== this.fireEvent("progress", this, "cancel", null, null, b, c, a)) {
            this.remove()
        }
    }
});
Ext.namespace("SYNO.SDS._AppMgr");
SYNO.SDS._AppMgr = Ext.extend(Ext.util.Observable, {
    list: null,
    constructor: function() {
        SYNO.SDS._AppMgr.superclass.constructor.apply(this, arguments);
        this.list = {};
        SYNO.SDS.StatusNotifier.on("beforeUserSettingsUnload", this.saveStates, this)
    },
    register: function(a) {
        this.list[a.id] = a
    },
    unregister: function(a) {
        delete this.list[a.id]
    },
    get: function(a) {
        return typeof a == "object" ? a : this.list[a]
    },
    getBy: function(b, a) {
        var d = [];
        for (var e in this.list) {
            if (this.list.hasOwnProperty(e)) {
                var c = this.list[e];
                if (b.call(a || c, c) !== false) {
                    d.push(c)
                }
            }
        }
        return d
    },
    getByAppName: function(b) {
        function a(c) {
            if (b === c.jsConfig.jsID) {
                return true
            }
            return false
        }
        return this.getBy(a)
    },
    each: function(b, a) {
        for (var c in this.list) {
            if (this.list[c] && typeof this.list[c] != "function") {
                if (b.call(a || this.list[c], this.list[c]) === false) {
                    return
                }
            }
        }
    },
    saveStates: function() {
        var a = this;
        a.saveAppState();
        a.saveWidgetState()
    },
    saveAppState: function() {
        if (!SYNO.SDS.UserSettings.getProperty("Desktop", "rememberWindowState")) {
            return
        }
        if (_S("standalone")) {
            return
        }
        var a = [];
        this.each(function(b) {
            var c = b.jsConfig.jsID;
            if ("SYNO.SDS.DSMNotify.Application" === c || "SYNO.SDS.App.FileTaskMonitor.Instance" === c) {
                return
            }
            if (true === b.jsConfig.hidden) {
                return
            }
            a.push({
                className: c,
                params: b.getStateParam()
            })
        });
        if (a.length) {
            SYNO.SDS.UserSettings.setProperty("Desktop", "restoreParams", a)
        }
    },
    saveWidgetState: function() {
        if (_S("standalone")) {
            return
        }
        var a = [];
        this.each(function(b) {
            var c = b.jsConfig.jsID;
            if ("SYNO.SDS._Widget.Instance" !== c) {
                return
            }
            a = b.getStateParam();
            if (a) {
                b.setUserSettings("restoreParams", a)
            }
        })
    }
});
Ext.namespace("SYNO.SDS._TaskButtons");
SYNO.SDS._TaskButtons = Ext.extend(Ext.BoxComponent, {
    buttons: null,
    activeIdx: -1,
    constructor: function(a) {
        SYNO.SDS._TaskButtons.superclass.constructor.call(this, Ext.apply({
            id: "sds-taskbuttons-panel",
            region: "center"
        }, a));
        this.buttons = [];
        this.mon(SYNO.SDS.StatusNotifier, "servicechanged", this.onServiceChanged, this);
        this.mon(SYNO.SDS.StatusNotifier, "appprivilegechanged", this.onServiceChanged, this);
        this.mon(SYNO.SDS.StatusNotifier, "jsconfigLoaded", this.onJSConfigLoaded, this);
        this.mon(SYNO.SDS.StatusNotifier, "taskbuttonchanged", this.onButtonChange, this)
    },
    onRender: function() {
        SYNO.SDS._TaskButtons.superclass.onRender.apply(this, arguments);
        this.stripWrap = this.el.createChild({
            id: "sds-taskbuttons-strip-wrap",
            cn: [{
                tag: "ul",
                tabindex: -1,
                role: "menu",
                "aria-label": _T("common", "active_windows"),
                id: "sds-taskbuttons-strip",
                cn: [{
                    tag: "li",
                    cls: "sds-taskbuttons-edge"
                }, {
                    cls: "x-clear"
                }]
            }]
        });
        this.stripSpacer = this.el.createChild({
            cls: "sds-taskbuttons-strip-spacer"
        });
        this.strip = this.stripWrap.first();
        this.edge = this.strip.child("li.sds-taskbuttons-edge");
        this.buttonsUl = this.el.child("#sds-taskbuttons-strip");
        this.loadUserSettings();
        this.buttonsUl.on("keydown", this.onKeyPress, this);
        this.buttonsUl.on("blur", this.onBlur, this)
    },
    onButtonChange: function() {
        var a = (this.buttons.length === 0) ? true : false;
        this.buttonsUl.setARIA({
            tabindex: a ? -1 : 0
        })
    },
    onBlur: function() {
        this.clearActiveCls()
    },
    onKeyPress: function(c) {
        var b = c.getKey();
        var a = this.activeIdx;
        if (!this.buttons || this.buttons.length === 0) {
            return
        }
        if (b === c.ENTER || b === c.SPACE) {
            this.bringFocusWinUp();
            c.preventDefault()
        } else {
            if (b === c.LEFT || b === c.UP) {
                this.setPrevItem(a);
                c.preventDefault()
            } else {
                if (b === c.RIGHT || b === c.DOWN) {
                    this.setNextItem(a);
                    c.preventDefault()
                }
            }
        }
    },
    setNextItem: function(a) {
        a = Ext.isDefined(a) ? a : this.activeIdx;
        var c = this.buttons;
        var b = (a === c.length - 1) ? 0 : a + 1;
        if (b > c.length - 1) {
            return
        } else {
            if (c[b].hidden === true) {
                this.setNextItem(b);
                return
            }
        }
        this.setActiveItem(b)
    },
    setPrevItem: function(a) {
        a = Ext.isDefined(a) ? a : this.activeIdx;
        var c = this.buttons;
        var b = (a === 0) ? c.length - 1 : a - 1;
        if (b < 0) {
            return
        } else {
            if (c[b].hidden === true) {
                this.setPrevItem(b);
                return
            }
        }
        this.setActiveItem(b)
    },
    clearActiveCls: function() {
        var a = this.buttons[this.activeIdx];
        if (a) {
            a.btnEl.removeClass("accessible-active-item")
        }
    },
    setActiveItem: function(a) {
        var b = this.buttons[a];
        if (!b) {
            return
        }
        this.clearActiveCls();
        b.btnEl.addClass("accessible-active-item");
        this.buttonsUl.set({
            "aria-activedescendant": b.btnEl.id
        });
        this.activeIdx = a
    },
    bringFocusWinUp: function() {
        var a = this.activeIdx;
        if (this.buttons[a]) {
            this.buttons[a].bringWinUp()
        } else {
            if (this.buttons[0]) {
                this.activeIdx = 0;
                this.buttons[0].bringWinUp()
            }
        }
    },
    loadUserSettings: function() {
        var b = [],
            a = SYNO.SDS.UserSettings.getProperty("taskbar", "pined") || [];
        Ext.each(a, function(d) {
            if (!SYNO.SDS.StatusNotifier.isAppEnabled(d.appName) || "SYNO.SDS.App.FileTaskMonitor.Instance" === d.appName || "SYNO.SDS.App.WelcomeApp.Instance" === d.appName || "SYNO.SDS.LogViewer.Application" === d.appName || "SYNO.SDS.SystemInfoApp.Application" === d.appName || "SYNO.SDS.ControlPanel.Instance" === d.appName) {
                return
            }
            if (_S("ha_safemode")) {
                if ("SYNO.SDS.HA.Instance" !== d.appName && "SYNO.SDS.SupportForm.Application" !== d.appName && "SYNO.SDS.App.FileStation3.Instance" !== d.appName) {
                    return
                }
            }
            var c = this.add(d.appName, d.windowName);
            if (c) {
                c.pined = true
            }
            b.push(d)
        }, this);
        if (a.length !== b.length) {
            SYNO.SDS.UserSettings.setProperty("taskbar", "pined", b)
        }
    },
    isAppWinExists: function(c, a, b, g, f, e) {
        var d = g ? null : -1;
        e = e || 0;
        Ext.each(c, function(i, h) {
            if (h < e) {
                return
            }
            if ((!a || a === i.appName) && (!b || b === i.windowName) && (!f || f === i.state)) {
                d = g ? i : h;
                return false
            }
        }, this);
        return d
    },
    onServiceChanged: function(d, b) {
        if (b) {
            return
        }
        var c, a = -1;
        while (0 <= (a = this.isAppWinExists(this.buttons, d, null, false, null, a + 1))) {
            c = this.buttons[a];
            if (c.pined) {
                c.onClickUnpin()
            }
        }
    },
    onJSConfigLoaded: function() {
        var a = [];
        Ext.each(this.buttons, function(b) {
            if (!SYNO.SDS.StatusNotifier.isAppEnabled(b.appName)) {
                a.push(b)
            }
        }, this);
        Ext.each(a, function(b) {
            if (b.pined) {
                b.onClickUnpin()
            }
        }, this)
    },
    getPinedBeforeBtn: function(a) {
        var b = 0;
        Ext.each(this.buttons, function(c) {
            if (a === c) {
                return false
            }
            if (c.pined) {
                b++
            }
        });
        return b
    },
    add: function(b, c) {
        var a, d, e = SYNO.SDS.Config.FnMap[c];
        if (!e) {
            return null
        }
        d = this.isAppWinExists(this.buttons, b, c, true, "normal");
        if (d) {
            return d
        }
        a = this.strip.createChild({
            tag: "li"
        }, this.edge);
        d = new SYNO.SDS._TaskButtons.Button(a, b, c);
        this.buttons.push(d);
        return d
    },
    remove: function(b) {
        var a = document.getElementById(b.container.id);
        a.parentNode.removeChild(a);
        this.buttons.remove(b);
        SYNO.SDS.StatusNotifier.fireEvent("taskbuttonchanged")
    },
    getAllAppWins: function() {
        var a = [];
        Ext.each(this.buttons, function(b) {
            if (!b.hidden && b.window) {
                a.push(b.window)
            }
        }, this);
        return a
    },
    getVisibleButtonCount: function() {
        var a = 0;
        Ext.each(this.buttons, function(b) {
            if (b && b.isVisible()) {
                a += 1
            }
        }, this);
        return a
    },
    getWrapWidth: function() {
        var a = Ext.getCmp("sds-taskbar-panel-wrap2");
        return a.getWidth()
    },
    getTotalButtonsWidth: function() {
        return this.buttons.length * this.getOneButtonWidth()
    },
    getOneButtonWidth: function() {
        var a = this.buttons.length;
        if (a === 0) {
            return 0
        }
        var b = this.buttons[0];
        return (b.getWidth() + 2)
    },
    getFirstOverflowIndex: function() {
        var a;
        if (!this.isButtonOverflow()) {
            return -1
        }
        a = Math.ceil((this.getTotalButtonsWidth() - this.getWrapWidth()) / (this.getOneButtonWidth()));
        return (this.buttons.length - a)
    },
    getOverflowedButtons: function() {
        var c, b, a, d = [];
        b = this.getFirstOverflowIndex();
        if (b === -1) {
            return d
        }
        for (c = b, a = this.buttons.length; c < a; c++) {
            d.push(this.buttons[c])
        }
        return d
    },
    isButtonOverflow: function() {
        return (this.getTotalButtonsWidth() > this.getWrapWidth())
    },
    hideOverflowedButtons: function() {
        var a = this.getFirstOverflowIndex();
        if (a === -1) {
            Ext.each(this.buttons, function(c, b) {
                c.removeClass("sds-taskbutton-overflowed")
            }, this)
        } else {
            Ext.each(this.buttons, function(c, b) {
                if (b < a) {
                    c.removeClass("sds-taskbutton-overflowed")
                } else {
                    c.addClass("sds-taskbutton-overflowed")
                }
            }, this)
        }
    },
    switchActiveWindow: function(b, d, h) {
        var g, a, c = "sds-switch-win-gesture-show-force-hidden",
            i = "sds-switch-win-gesture-hide-to",
            e = "sds-switch-win-gesture-show-from",
            f = "sds-switch-win-gesture-show-transition";
        if (h === "right") {
            g = String.format("{0}-right", i);
            a = String.format("{0}-left", e)
        } else {
            if (h === "left") {
                g = String.format("{0}-left", i);
                a = String.format("{0}-right", e)
            }
        }
        if (this.isSwitchingWindow) {
            return
        }
        this.isSwitchingWindow = true;
        SYNO.SDS.Desktop.getEl().addClass("sds-is-gesture-switching");
        b.addClassToAllWindows(g);
        d.addClassToAllWindows(c);
        d.show(false);
        (function() {
            d.addClassToAllWindows(a)
        }).defer(100, this);
        (function() {
            d.removeClassFromAllWindows(c);
            d.addClassToAllWindows(f);
            d.removeClassFromAllWindows(a)
        }).defer(200, this);
        (function() {
            b.removeClassFromAllWindows(g);
            b.hide(false);
            d.removeClassFromAllWindows(f);
            SYNO.SDS.Desktop.getEl().removeClass("sds-is-gesture-switching");
            this.isSwitchingWindow = false
        }).defer(800, this)
    },
    setLeftWindowActive: function() {
        var d = SYNO.SDS.WindowMgr.getActiveAppWindow(),
            c, b, a, e;
        if (!d) {
            return false
        }
        c = this.buttons.indexOf(d.taskButton);
        if (c === -1) {
            return false
        }
        a = this.buttons.length;
        b = c - 1;
        if (b < 0) {
            b = a - 1
        }
        while (b !== c) {
            e = this.buttons[b];
            if (e.window) {
                this.switchActiveWindow(d, e.window, "left");
                return true
            }
            if (b === 0) {
                b = a - 1
            } else {
                b--
            }
        }
        return false
    },
    setRightWindowActive: function() {
        var e = SYNO.SDS.WindowMgr.getActiveAppWindow(),
            d, c, b, a;
        if (!e) {
            return false
        }
        d = this.buttons.indexOf(e.taskButton);
        if (d === -1) {
            return false
        }
        b = this.buttons.length;
        c = d + 1;
        if (c >= b) {
            c = 0
        }
        while (c !== d) {
            a = this.buttons[c];
            if (a.window) {
                this.switchActiveWindow(e, a.window, "right");
                return true
            }
            if (c === b - 1) {
                c = 0
            } else {
                c++
            }
        }
        return false
    }
});
Ext.define("SYNO.SDS._TaskButtons.Button", {
    extend: "Ext.Button",
    initialized: false,
    container: null,
    window: null,
    contextMenu: null,
    appName: "",
    windowName: "",
    state: "normal",
    pined: false,
    constructor: function(b, a, c) {
        var e, d = SYNO.SDS.Config.FnMap[c];
        this.container = b;
        this.jsConfig = d.config;
        this.appName = a;
        this.windowName = c;
        e = this.jsConfig.jsBaseURL + "/" + (this.jsConfig.icon || this.jsConfig.icon_16);
        SYNO.SDS._TaskButtons.Button.superclass.constructor.call(this, {
            menu: null,
            clickEvent: "click",
            renderTo: this.container
        });
        this.setIcon(SYNO.SDS.UIFeatures.IconSizeManager.getIconPath(e, "Taskbar"));
        this.contextMenu = this.initContextMenu();
        this.addManagedComponent(this.contextMenu);
        this.reset()
    },
    show: function() {
        SYNO.SDS._TaskButtons.Button.superclass.show.apply(this, arguments);
        SYNO.SDS.StatusNotifier.fireEvent("taskbuttonchanged")
    },
    hide: function() {
        SYNO.SDS._TaskButtons.Button.superclass.hide.apply(this, arguments);
        SYNO.SDS.StatusNotifier.fireEvent("taskbuttonchanged")
    },
    initButtonEl: function() {
        SYNO.SDS._TaskButtons.Button.superclass.initButtonEl.apply(this, arguments);
        this.mon(this.el, "contextmenu", this.onContextMenu, this);
        this.mon(this.el, "mouseover", this.onMouseOverHandler, this);
        this.mon(this.el, "mouseout", this.onMouseOutHandler, this)
    },
    afterRender: function() {
        SYNO.SDS._TaskButtons.Button.superclass.afterRender.apply(this, arguments);
        this.container.fadeIn({
            duration: 0.6
        });
        var a = this.getWindowTitle();
        this.btnEl.setARIA({
            label: a,
            tabindex: -1,
            role: "menuitem"
        })
    },
    destroy: function() {
        if (this.pined) {
            this.reset();
            return
        }
        this.destroying = true;
        if (Ext.isIE9m) {
            SYNO.SDS.TaskButtons.remove(this);
            SYNO.SDS._TaskButtons.Button.superclass.destroy.call(this);
            SYNO.SDS.StatusNotifier.fireEvent("taskbuttonchanged");
            return
        }
        this.el.setOpacity(0, {
            duration: 0.2,
            scope: this,
            callback: function() {
                this.el.slideOut("l", {
                    duration: 0.2,
                    scope: this,
                    callback: function() {
                        SYNO.SDS.TaskButtons.remove(this);
                        SYNO.SDS._TaskButtons.Button.superclass.destroy.call(this);
                        SYNO.SDS.StatusNotifier.fireEvent("taskbuttonchanged")
                    }
                })
            }
        })
    },
    beforeDestroy: function() {
        SYNO.SDS._TaskButtons.Button.superclass.beforeDestroy.apply(this, arguments);
        this.container = null;
        this.window = null;
        this.contextMenu = null
    },
    reset: function() {
        this.window = null;
        this.initialized = false;
        this.setState("normal");
        this.setActionsEnable(this.contextMenu.launchActions, true);
        this.setActionsEnable(this.contextMenu.requestActions, true);
        this.setActionsEnable(this.contextMenu.defaultActions, true);
        this.setActionsVisible(this.contextMenu.launchActions, true);
        this.setActionsVisible(this.contextMenu.requestActions, false);
        this.setActionsVisible(this.contextMenu.defaultActions, false);
        if (this.contextMenu.launchActions._launch_separator) {
            this.contextMenu.launchActions._launch_separator.hide()
        }
        SYNO.SDS.StatusNotifier.fireEvent("taskbuttonchanged")
    },
    init: function(a) {
        var b = this.contextMenu.defaultActions;
        this.window = a;
        this.setActionsVisible(this.contextMenu.launchActions, false);
        this.setActionsVisible(this.contextMenu.requestActions, true);
        this.setActionsVisible(this.contextMenu.defaultActions, true);
        if (!this.window.maximizable) {
            b.maximize.hide()
        }
        b.restore.setDisabled(!(this.window.maximized && this.window.maximizable));
        if (this.window.maskCnt > 0) {
            b.maximize.disable();
            b.restore.disable()
        }
        this.initialized = true;
        SYNO.SDS.StatusNotifier.fireEvent("taskbuttonchanged")
    },
    setLoading: function(a) {
        if ((a && this.waitEl) || (!a && !this.waitEl)) {
            return
        }
        if (a) {
            this.waitEl = this.container.createChild({
                cls: "loading"
            })
        } else {
            this.waitEl.remove();
            delete this.waitEl
        }
    },
    getWindowTitle: function() {
        return SYNO.SDS.Utils.GetLocalizedString(this.window ? this.window.getTitle() : this.jsConfig.title, this.jsConfig.jsID)
    },
    setState: function(a) {
        switch (a) {
            case "normal":
                this.el.removeClass(["launched", "active"]);
                this.setLoading(false);
                this.state = a;
                this.setTooltip(this.getWindowTitle());
                break;
            case "loading":
                this.el.addClass("launched");
                this.setLoading(true);
                this.state = a;
                break;
            case "active":
                this.el.addClass(["launched", "active"]);
                this.setLoading(false);
                this.state = a;
                break;
            case "deactive":
                this.el.addClass("launched");
                this.el.removeClass("active");
                this.setLoading(false);
                this.state = a;
                break
        }
    },
    getDefaultActions: function() {
        return {
            pin: new Ext.Action({
                text: _T("desktop", "taskbar_pin"),
                scope: this,
                handler: this.onClickPin
            }),
            unpin: new Ext.Action({
                text: _T("desktop", "taskbar_unpin"),
                scope: this,
                handler: this.onClickUnpin
            }),
            maximize: new Ext.Action({
                text: _T("desktop", "maximize"),
                scope: this,
                handler: this.onClickMaximize
            }),
            minimize: new Ext.Action({
                text: _T("desktop", "minimize"),
                scope: this,
                handler: this.onClickMinimize
            }),
            restore: new Ext.Action({
                text: _T("desktop", "restore"),
                scope: this,
                handler: this.onClickRestore
            }),
            close: new Ext.Action({
                text: _T("common", "close"),
                scope: this,
                handler: this.onClickClose
            })
        }
    },
    getLaunchActions: function() {
        var d = this.jsConfig.launchParams || {},
            c = {},
            a;
        for (var b in d) {
            if (d.hasOwnProperty(b)) {
                ++a;
                c[this.id + b] = new Ext.Action({
                    text: SYNO.SDS.Utils.GetLocalizedString(b, this.jsConfig.jsID),
                    handler: this.onClickLaunch.createDelegate(this, [d[b]])
                })
            }
        }
        if (a > 0) {
            c._launch_separator = new Ext.menu.Separator()
        }
        return c
    },
    getRequestActions: function() {
        var c = this.jsConfig.taskbarMenu || {},
            b = {},
            a;
        a = 0;
        for (var d in c) {
            if (c.hasOwnProperty(d)) {
                a++;
                b[this.id + d] = new Ext.Action({
                    text: SYNO.SDS.Utils.GetLocalizedString(d, this.jsConfig.jsID),
                    handler: this.onClickRequest.createDelegate(this, [c[d]])
                })
            }
        }
        if (a > 0) {
            b._request_separator = new Ext.menu.Separator()
        }
        return b
    },
    initContextMenu: function() {
        var b, a = [],
            f = this.getLaunchActions(),
            c = this.getRequestActions(),
            d = this.getDefaultActions();
        for (b in f) {
            if (f.hasOwnProperty(b)) {
                a.push(f[b])
            }
        }
        for (b in c) {
            if (c.hasOwnProperty(b)) {
                a.push(c[b])
            }
        }
        for (b in d) {
            if (d.hasOwnProperty(b)) {
                a.push(d[b])
            }
        }
        var e = new SYNO.ux.Menu({
            items: a
        });
        e.launchActions = f;
        e.requestActions = c;
        e.defaultActions = d;
        return e
    },
    setActionsVisible: function(c, b) {
        var a;
        for (a in c) {
            if (b && Ext.isFunction(c[a].show)) {
                c[a].show()
            } else {
                if (!b && Ext.isFunction(c[a].hide)) {
                    c[a].hide()
                }
            }
        }
    },
    setActionsEnable: function(c, a) {
        var b;
        for (b in c) {
            if (a && Ext.isFunction(c[b].enable)) {
                c[b].enable()
            } else {
                if (!a && Ext.isFunction(c[b].disable)) {
                    c[b].disable()
                }
            }
        }
    },
    getContextMenu: function(a) {
        if (a) {
            this.updatePinState()
        } else {
            this.contextMenu.defaultActions.pin.setHidden(true);
            this.contextMenu.defaultActions.unpin.setHidden(true)
        }
        return this.contextMenu
    },
    updatePinState: function() {
        var a = SYNO.SDS.UserSettings.getProperty("taskbar", "pined") || [],
            c = this.window && (false !== this.window.pinable),
            b = SYNO.SDS.TaskButtons.isAppWinExists(a, this.appName, this.windowName) >= 0;
        this.contextMenu.defaultActions.pin.setHidden(!c || b);
        this.contextMenu.defaultActions.unpin.setHidden(!b || (b && !this.pined))
    },
    setDisableMaximize: function(a) {
        this.preventMax = a ? true : false;
        this.updateContextMenu("unmask")
    },
    updateContextMenu: function(a) {
        var b = this.contextMenu.defaultActions;
        switch (a) {
            case "maximize":
                b.restore.enable();
                b.minimize.enable();
                b.maximize.disable();
                break;
            case "minimize":
                b.restore.enable();
                b.minimize.disable();
                b.maximize.disable();
                break;
            case "restore":
                b.minimize.enable();
                b.maximize.setDisabled(this.window.maximized || this.preventMax === true);
                b.restore.setDisabled(!(this.window.maximized && this.window.maximizable));
                break;
            case "mask":
                b.maximize.disable();
                b.restore.disable();
                break;
            case "unmask":
                b.maximize.setDisabled(this.window.maximized || this.preventMax === true);
                b.restore.setDisabled(!this.window.maximized);
                break
        }
    },
    onClickPin: function() {
        var a = SYNO.SDS.UserSettings.getProperty("taskbar", "pined") || [];
        if (SYNO.SDS.TaskButtons.isAppWinExists(a, this.appName, this.windowName) >= 0) {
            return
        }
        a.splice(SYNO.SDS.TaskButtons.getPinedBeforeBtn(this), 0, {
            appName: this.appName,
            windowName: this.windowName
        });
        SYNO.SDS.UserSettings.setProperty("taskbar", "pined", a);
        this.pined = true
    },
    onClickUnpin: function() {
        var a = SYNO.SDS.UserSettings.getProperty("taskbar", "pined") || [],
            b = SYNO.SDS.TaskButtons.isAppWinExists(a, this.appName, this.windowName, true);
        if (!b) {
            return
        }
        a.remove(b);
        SYNO.SDS.UserSettings.setProperty("taskbar", "pined", a);
        this.pined = false;
        if ("normal" === this.state) {
            this.destroy()
        }
    },
    onClickRestore: function() {
        if (this.window.hidden) {
            this.window.show()
        } else {
            if (this.window.maximized) {
                this.window.restore()
            }
        }
        this.updateContextMenu("restore")
    },
    onClickMaximize: function() {
        this.window.maximize();
        this.window.show();
        this.updateContextMenu("maximize")
    },
    onClickMinimize: function() {
        this.window.minimize();
        this.updateContextMenu("minimize")
    },
    onClickLaunch: function(a) {
        SYNO.SDS.AppLaunch(this.appName, Ext.apply({
            windowName: this.windowName
        }, a), true)
    },
    onClickRequest: function(a) {
        this.window.request(a)
    },
    onClickClose: function() {
        this.window.close()
    },
    bringWinUp: function() {
        this.window.show();
        this.window.focus();
        this.updateContextMenu("restore")
    },
    onClick: function() {
        if ("normal" === this.state) {
            this.onClickLaunch({});
            if (!SYNO.SDS.DeskTopManager.isDesktopOnTop()) {
                SYNO.SDS.DeskTopManager.showDesktop()
            }
            return
        }
        if (!this.initialized || this.destroying) {
            return
        }
        if (SYNO.SDS.WindowMgr.allToggleing) {
            return
        }
        var b = SYNO.SDS.WindowMgr.getActive(),
            a = b && b.getTopWin ? b.getTopWin() : null;
        if (SYNO.SDS.WindowMgr.allHided) {
            SYNO.SDS.WindowMgr.toggleAllWin();
            if (!b || a !== this.window) {
                SYNO.SDS.StatusNotifier.on("allwinrestored", this.bringWinUp, this, {
                    single: true
                })
            }
            return
        }
        SYNO.SDS._TaskButtons.Button.superclass.onClick.apply(this, arguments);
        if (!SYNO.SDS.DeskTopManager.isDesktopOnTop()) {
            SYNO.SDS.DeskTopManager.showDesktop()
        } else {
            if (b && a === this.window) {
                this.window.minimize()
            } else {
                this.bringWinUp.apply(this)
            }
        }
    },
    onContextMenu: function(a) {
        a.preventDefault();
        if (this.destroying) {
            return
        }
        if (this.window && !this.window.hidden) {
            this.window.show()
        }
        Ext.QuickTips.getQuickTip().cancelShow(this.btnEl);
        this.getContextMenu(true).showAt(this.container.getAlignToXY(this.container))
    },
    onMouseOverHandler: function(d) {
        if (this.state === "normal") {
            return
        }
        if (SYNO.SDS.PreviewBox.isEnabled()) {
            this.setTooltip("")
        }
        var c = this.container.getAlignToXY(this.container);
        var a = this.container.getWidth();
        var b = {
            win: this.window,
            centerX: c[0] + (a / 2)
        };
        SYNO.SDS.PreviewBox.showBox(b)
    },
    onMouseOutHandler: function(a) {
        this.setTooltip(this.getWindowTitle());
        SYNO.SDS.PreviewBox.hideBox()
    }
});
Ext.ns("SYNO.SDS.Utils.Notify");
SYNO.SDS.Utils.Notify.BindEvent = function(d) {
    var a, i, h, f, c, g, j;
    if (!d || !d.target || d.target.getAttribute("data-syno-bind") == "false") {
        return
    }
    f = d.target;
    g = f.getAttribute("data-syno-param");
    if (Ext.isString(g)) {
        try {
            c = Ext.decode(g)
        } catch (b) {
            console.debug(b);
            c = {}
        }
    }
    g = f.getAttribute("data-syno-scope");
    if (Ext.isString(g) && !Ext.isEmpty(Ext.getClassByName(g))) {
        j = Ext.getClassByName(g)
    }
    g = f.getAttribute("data-syno-func");
    if (Ext.isString(g) && Ext.isFunction(Ext.getClassByName(g))) {
        Ext.getClassByName(g).call(j, c)
    } else {
        if (Ext.isString(f.getAttribute("data-syno-app"))) {
            h = f.getAttribute("data-syno-app");
            if (Ext.isString(f.getAttribute("data-syno-fn"))) {
                i = f.getAttribute("data-syno-fn");
                c = Ext.apply(c || {}, {
                    fn: i
                })
            }
            if (Ext.isString(f.getAttribute("data-syno-tab"))) {
                a = f.getAttribute("data-syno-tab");
                c = Ext.apply(c || {}, {
                    tab: a
                })
            }
            SYNO.SDS.AppLaunch(h, c)
        } else {
            if (Ext.isString(f.getAttribute("data-syno-win"))) {
                h = f.getAttribute("data-syno-win");
                SYNO.SDS.WindowLaunch(h)
            }
        }
    }
};
Ext.namespace("SYNO.SDS._SystemTray");
SYNO.SDS._SystemTray = Ext.extend(Ext.BoxComponent, {
    constructor: function(b) {
        this.buttons = [];
        this.widgetButtons = [];
        var a = {
            id: "sds-tray-panel"
        };
        if (_S("standalone")) {
            Ext.apply(a, {
                hidden: true,
                renderTo: document.body
            })
        }
        SYNO.SDS._SystemTray.superclass.constructor.call(this, Ext.apply(a, b));
        Ext.EventManager.onWindowResize(SYNO.SDS._SystemTrayMsgMgr.alignAll, SYNO.SDS._SystemTrayMsgMgr)
    },
    onRender: function() {
        SYNO.SDS._SystemTray.superclass.onRender.apply(this, arguments);
        if (_S("standalone")) {
            return
        }
        this.stripWrap = this.el.createChild({
            cls: "sds-tray-strip-wrap",
            cn: [{
                tag: "ul",
                cls: "sds-tray-strip",
                cn: [{
                    tag: "li",
                    cls: "sds-tray-edge"
                }, {
                    tag: "li",
                    cls: "sds-widget-tray-edge"
                }, {
                    cls: "x-clear"
                }]
            }]
        });
        this.stripSpacer = this.el.createChild({
            cls: "sds-tray-strip-spacer"
        });
        this.strip = this.stripWrap.first()
    },
    add: function(b, c) {
        var a, e;
        if (!Ext.isFunction(b.getTaskBarBtnId)) {
            return
        }
        e = b.getTaskBarBtnId();
        a = Ext.isEmpty(e) ? this.strip.createChild({
            tag: "li"
        }, this.strip.child(".sds-tray-edge")) : e;
        var d = new SYNO.SDS._SystemTray.Button(a, b, this);
        this.mon(d, "destroy", function(f) {
            this.buttons.remove(f);
            f.container.remove()
        }, this);
        this.buttons.push(d);
        return d
    },
    addButton: function(f, b) {
        var e = this,
            d = e.strip;
        var a = d.createChild({
            tag: "li",
            cls: "sds-widget-tray"
        }, d.child(".sds-widget-tray-edge"));
        var c = new f({
            renderTo: a,
            instance: b
        });
        e.mon(c, "destroy", function(g) {
            e.widgetButtons.remove(g);
            g.container.remove()
        }, e);
        e.widgetButtons.push(c);
        return c
    },
    notifyMsg: function(k, l, e, i, h) {
        var g = Ext.isNumber(i) ? i : 5000;
        var b = false === h ? false : true;
        var c = new SYNO.SDS._SystemTrayMsg({
            autoDestroy: !!g,
            hideDelay: g
        });
        var a = function() {
            if (SYNO.SDS.Environment.GetEnvironment() === SYNO.SDS.Environment.ESM) {
                return "webman/resources/images/theme/business/icon_esm_64.png?v=4933"
            } else {
                return "webman/resources/images/icon_dsm_64.png?v=4933"
            }
        };
        var f = false;
        var j = SYNO.SDS.UserSettings.getProperty("SYNO.SDS.DSMNotify.Setting.Application", "haveNtAppList") || [];
        Ext.each(j, function(n) {
            if (k === n.jsID && "off" === n.nt) {
                f = true;
                return false
            }
        }, true);
        if (f) {
            return
        }
        c.setTitle(l);
        if (true === b) {
            e = Ext.util.Format.htmlEncode(e)
        }
        e = Ext.util.Format.ellipsis(e, 480, true);
        c.setMessage(e);
        var m = false;
        if (-1 < e.indexOf("<input ") || -1 < e.indexOf("<a ")) {
            m = true
        }
        if (!m && window.Notification && window.Notification.permission === "granted" && SYNO.SDS.UserSettings.getProperty("Desktop", "enableDesktopNotification")) {
            e = Ext.util.Format.stripTags(e);
            var d = new window.Notification(l, {
                body: e,
                icon: a()
            });
            d.onshow = function() {
                setTimeout(function() {
                    d.close()
                }, 10000)
            }
        } else {
            SYNO.SDS.StatusNotifier.fireEvent("systemTrayNotifyMsg");
            c.show(SYNO.SDS.Desktop.getEl())
        }
        return c
    },
    getVisibleButtonCount: function() {
        var a = -1;
        Ext.each(this.buttons, function(b) {
            if (b.isVisible()) {
                a += 1
            }
        }, this);
        return a + this.getVisibleWidgetButtonCount()
    },
    getVisibleWidgetButtonCount: function() {
        var a = 0;
        Ext.each(this.widgetButtons, function(b) {
            if (b.isVisible()) {
                a += 1
            }
        }, this);
        return a
    },
    getTrayButtonWidth: function() {
        var a = 0;
        Ext.each(this.buttons, function(b) {
            if (b.isVisible()) {
                a += b.getWidth() + b.getEl().getMargins("l, r")
            }
        }, this);
        return a
    },
    getWidgetButtonWidth: function() {
        var d = this,
            b = d.strip,
            e = b.child("li.sds-widget-tray"),
            c = e ? e.getMargins("l, r") : 0,
            a = 0;
        Ext.each(this.widgetButtons, function(f) {
            if (f.isVisible()) {
                a += f.getWidth() + c
            }
        }, this);
        return a
    },
    updateLayout: function() {
        var d = Ext.getCmp("sds-taskbar-panel-tray-ct"),
            c = 72,
            b = 0,
            a = d.getEl().child(".x-box-inner");
        b = c + this.getWidgetButtonWidth() + this.getTrayButtonWidth();
        d.setWidth(b);
        if (a) {
            a.setWidth(b)
        }
        Ext.getCmp("sds-taskbar-panel-wrap").doLayout();
        SYNO.SDS.StatusNotifier.fireEvent("taskbuttonchanged")
    }
});
SYNO.SDS._SystemTray.Button = Ext.extend(Ext.Button, {
    container: null,
    instance: null,
    clickTimer: 0,
    clickDelay: 300,
    enableToggle: true,
    constructor: function(b, a) {
        this.container = b;
        this.instance = a;
        SYNO.SDS._SystemTray.Button.superclass.constructor.call(this, {
            menu: null,
            clickEvent: "click",
            renderTo: this.container
        });
        this.mon(this.el, "contextmenu", this.onBtnContextMenu, this);
        if (Ext.emptyFn === this.instance.onDblClick) {
            this.clickDelay = 0
        }
        this.mon(this, "show", this.onTrayShowHide, this);
        this.mon(this, "hide", this.onTrayShowHide, this)
    },
    onTrayShowHide: function() {
        SYNO.SDS.SystemTray.updateLayout()
    },
    onClick: function() {
        SYNO.SDS._SystemTray.Button.superclass.onClick.apply(this, arguments);
        if (this.clickTimer) {
            clearTimeout(this.clickTimer);
            this.clickTimer = 0;
            this.onBtnDblClick();
            return
        }
        this.clickTimer = this.onBtnClick.createDelegate(this).defer(this.clickDelay)
    },
    onBtnClick: function() {
        this.clickTimer = 0;
        this.instance.onClick()
    },
    onBtnDblClick: function() {
        this.instance.onDblClick()
    },
    onBtnContextMenu: function(a) {
        a.preventDefault();
        this.instance.onContextMenu()
    }
});
Ext.define("SYNO.SDS._SystemTray.Component", {
    extend: "Ext.BoxComponent",
    constructor: function(a) {
        var b = this;
        b.instance = a.instance;
        b.callParent(arguments)
    },
    afterRender: function() {
        var a = this;
        a.callParent(arguments);
        a.getEl().on("click", a.onClick, a);
        a.mon(a, "show", a.onTrayShowHide, a);
        a.mon(a, "hide", a.onTrayShowHide, a)
    },
    onClick: function(c, a, d) {
        var b = this;
        if (!SYNO.SDS.DeskTopManager.isDesktopOnTop()) {
            SYNO.SDS.DeskTopManager.showDesktop()
        }
        b.instance.show();
        b.hide()
    },
    onTrayShowHide: function() {
        this.updateLayout()
    },
    updateLayout: function() {
        SYNO.SDS.SystemTray.updateLayout()
    }
});
SYNO.SDS._SystemTrayMsgMgr = {
    wins: [],
    getHeightOffset: function(b) {
        var a = 8;
        while (--b >= 0) {
            if (!this.wins[b]) {
                continue
            }
            a += 6 + this.wins[b].getHeight()
        }
        return a
    },
    alignAll: function() {
        for (var b = 0; b < this.wins.length; ++b) {
            var a = this.wins[b];
            if (!a) {
                continue
            }
            a.el.alignTo(a.animateTarget, "tr-tr", [-8, this.getHeightOffset(b)])
        }
    },
    register: function(a) {
        var b = 0;
        while (this.wins[b]) {
            b++
        }
        this.wins[b] = a;
        a.el.alignTo(a.animateTarget, "tr-tr", [-8, this.getHeightOffset(b)])
    },
    unregister: function(a) {
        var b = this.wins.indexOf(a);
        if (-1 === b) {
            return
        }
        this.wins[b] = null
    }
};
SYNO.SDS._SystemTrayMsg = Ext.extend(Ext.Window, {
    task: null,
    constructor: function(a) {
        SYNO.SDS._SystemTrayMsg.superclass.constructor.call(this, Ext.apply(a || {}, {
            width: 320,
            unstyled: true,
            cls: "sds-tray-msg-window",
            shadow: false,
            autoHeight: true,
            closable: true,
            plain: false,
            draggable: false,
            resizable: false,
            closeAction: "close",
            constrain: true,
            footer: true,
            renderTo: document.body
        }));
        if (this.autoDestroy) {
            this.task = new Ext.util.DelayedTask(this.animHide, this)
        }
        this.mon(SYNO.SDS.StatusNotifier, "taskBarPanelShow", this.animHide, this)
    },
    setMessage: function(a) {
        this.body.dom.setAttribute("role", "alert");
        this.mon(this.body, "click", this.onClickMessage);
        this.body.update(a)
    },
    onDestroy: function() {
        SYNO.SDS._SystemTrayMsgMgr.unregister(this);
        SYNO.SDS._SystemTrayMsg.superclass.onDestroy.apply(this, arguments)
    },
    toFront: function(a) {
        this.manager.bringToFront(this);
        return this
    },
    afterShow: function() {
        SYNO.SDS._SystemTrayMsg.superclass.afterShow.apply(this, arguments);
        if (this.task) {
            this.task.delay(this.hideDelay || 5000)
        }
    },
    animShow: function() {
        SYNO.SDS._SystemTrayMsgMgr.register(this);
        this.el.slideIn("t", {
            duration: 0.3,
            callback: this.afterShow,
            scope: this
        })
    },
    animHide: function() {
        if (this.isDestroyed) {
            return
        }
        this.el.ghost("r", {
            duration: 0.5,
            remove: false,
            callback: this.close,
            scope: this
        })
    },
    onClickMessage: function(a) {
        SYNO.SDS.Utils.Notify.BindEvent(a)
    }
});
Ext.namespace("SYNO.SDS._TaskBar");
Ext.define("SYNO.SDS._TaskBar", {
    extend: "Ext.Container",
    constructor: function() {
        var a = [];
        Ext.getBody().createChild({
            id: "sds-taskbar-shadow"
        });
        a.push(new SYNO.SDS._TaskButtons());
        SYNO.SDS._TaskBar.superclass.constructor.call(this, {
            id: "sds-taskbar",
            layout: "column",
            monitorResize: true,
            items: [this.leftTaskBar = new SYNO.SDS._TaskBar.Left(), new Ext.Container({
                id: "sds-taskbar-panel-wrap",
                boxMinWidth: 210,
                columnWidth: 1,
                layout: "border",
                items: [new Ext.Container({
                    id: "sds-taskbar-panel-wrap2",
                    items: a,
                    layout: "border",
                    region: "center"
                }), new Ext.Container({
                    id: "sds-taskbar-panel-tray-ct",
                    region: "east",
                    width: 38,
                    layout: "hbox",
                    items: [new SYNO.SDS._OverflowButton(), new SYNO.SDS._SystemTray()]
                })]
            }), this.rightTaskBar = new SYNO.SDS._TaskBar.Right(), new Ext.Container({
                id: "sds-taskbar-zoom-buffer",
                width: 2,
                height: 39
            })],
            renderTo: document.body
        })
    },
    addTaskBarButton: function(a) {
        var b = this;
        b.add(a);
        b.doLayout()
    },
    addDesktopViewButton: function(a) {
        var c = this,
            b = null;
        b = c.leftTaskBar.addDesktopViewButton(a);
        c.doLayout();
        return b
    },
    addTrayIconViewButton: function(a) {
        var c = this,
            b = null;
        b = c.rightTaskBar.addTrayIconViewButton(a);
        c.doLayout();
        return b
    }
});
Ext.define("SYNO.SDS._TaskBar.Left", {
    extend: "Ext.BoxComponent",
    buttons: undefined,
    constructor: function() {
        SYNO.SDS._TaskBar.Left.superclass.constructor.call(this, {
            id: "sds-taskbar-left",
            autoWidth: true
        });
        this.buttons = []
    },
    addDesktopViewButton: function(a) {
        var b = null;
        a = a || {};
        a.renderTo = Ext.value(a.renderTo, Ext.id());
        Ext.DomHelper.append(this.getEl(), [{
            id: a.renderTo
        }]);
        Ext.apply(a, {
            listeners: {
                afterrender: {
                    fn: function(c) {
                        c.getEl().child("button").set({
                            "aria-label": c.tooltip
                        })
                    },
                    scope: this
                }
            }
        });
        b = new Ext.Button(a);
        this.buttons.push(b);
        return b
    }
});
SYNO.SDS._TaskBar.Right = Ext.extend(Ext.BoxComponent, {
    buttons: undefined,
    activeIdx: -1,
    constructor: function() {
        this.buttons = [];
        SYNO.SDS._TaskBar.Right.superclass.constructor.call(this, {
            id: "sds-taskbar-right",
            autoWidth: true
        })
    },
    addTrayIconViewButton: function(a) {
        var b = null;
        a = a || {};
        a.renderTo = Ext.value(a.renderTo, Ext.id());
        b = new Ext.Button(a);
        return b
    },
    afterRender: function() {
        SYNO.SDS._TaskBar.Right.superclass.afterRender.apply(this, arguments);
        var a = SYNO.SDS.UserSettings.getProperty("Desktop", "enablePilotView") || false;
        var b = Ext.fly("sds-taskbar-preview-button");
        this.userButton.btnEl.setARIA({
            label: _T("common", "webman_options"),
            tabindex: -1
        });
        if (this.previewButton) {
            this.previewButton.btnEl.setARIA({
                label: _T("desktop", "expose_window"),
                tabindex: -1
            });
            if (!a) {
                b.setVisibilityMode(Ext.Element.DISPLAY);
                b.setVisible(false)
            }
        }
        this.searchButton.btnEl.setARIA({
            label: _T("user", "search_user"),
            tabindex: -1
        });
        this.getEl().on("keydown", this.onKeyPress, this);
        this.toolbarEl.on("blur", this.onBlur, this)
    },
    onBlur: function(b) {
        if (this.activeIdx === -1) {
            return
        }
        var a = this.buttons[this.activeIdx];
        a.btnEl.removeClass("ac-active-item")
    },
    onKeyPress: function(c) {
        var b = c.getKey();
        var a = this.activeIdx;
        if (b === c.ENTER || b === c.SPACE) {
            this.buttons[a].onClick(c);
            this.buttons[a].fireEvent("keydown")
        } else {
            if (b === c.LEFT || b === c.UP) {
                this.setPrevItem(a)
            } else {
                if (b === c.RIGHT || b === c.DOWN) {
                    this.setNextItem(a)
                }
            }
        }
    },
    setPrevItem: function(b) {
        var a = this.buttons.length;
        var c = (b - 1 < 0) ? a - 1 : b - 1;
        while (this.buttons[c].disabled && c != b) {
            c = (c - 1 < 0) ? a - 1 : c - 1
        }
        this.setItemActive(c)
    },
    setNextItem: function(b) {
        var a = this.buttons.length;
        var c = (b + 1 > a - 1) ? 0 : b + 1;
        while (this.buttons[c].disabled && c != b) {
            c = (c + 1 > a - 1) ? 0 : c + 1
        }
        this.setItemActive(c)
    },
    setItemActive: function(a) {
        var b = this.buttons[a];
        var c = this.buttons[this.activeIdx];
        if (!b) {
            return
        }
        var d = b.btnEl.dom.id;
        if (c) {
            c.btnEl.removeClass("ac-active-item")
        }
        b.btnEl.addClass("ac-active-item");
        this.toolbarEl.set({
            "aria-activedescendant": d
        });
        this.activeIdx = a
    },
    onRender: function() {
        SYNO.SDS._TaskBar.Right.superclass.onRender.apply(this, arguments);
        var b = [{
            id: "sds-taskbar-notification-button"
        }, {
            id: "sds-taskbar-user-button"
        }, {
            id: "sds-taskbar-search-button"
        }];
        var c = {
            id: "sds-taskbar-widget-button"
        };
        var a = {
            id: "sds-taskbar-preview-button"
        };
        if ("nsm" !== _D("synoOS")) {
            b = b.concat([c, a])
        }
        Ext.DomHelper.append(this.el, [{
            cls: "sds-taskbar-right-left",
            children: {
                cls: "sds-taskbar-split"
            }
        }, {
            tabindex: 0,
            role: "listbox",
            "aria-label": _T("desktop", "taskbar"),
            cls: "sds-taskbar-right-center",
            children: b
        }, {
            cls: "sds-taskbar-right-right"
        }]);
        this.createOptionBtn();
        this.createSearchBtn();
        if (b.indexOf(a) && SYNO.SDS.UIFeatures.test("exposeWindow")) {
            this.createPilotViewBtn()
        }
        this.toolbarEl = this.getEl().child(".sds-taskbar-right-center")
    },
    createOptionBtn: function(a) {
        var b = {
            scope: this,
            module: this,
            tooltip: _T("common", "webman_options"),
            enableToggle: true,
            renderTo: "sds-taskbar-user-button"
        };
        this.userButton = new Ext.Button(Ext.apply(a || {}, b));
        this.userButton.index = this.buttons.length;
        this.buttons.push(this.userButton);
        this.userMenuPanel = new SYNO.SDS._UserMenu({
            toggleBtn: this.userButton
        })
    },
    createSearchBtn: function(a) {
        var b = {
            tooltip: _T("user", "search_user"),
            module: this,
            enableToggle: true,
            renderTo: "sds-taskbar-search-button"
        };
        this.searchButton = new Ext.Button(Ext.apply(a || {}, b));
        this.searchButton.index = this.buttons.length;
        this.buttons.push(this.searchButton);
        SYNO.SDS.SearchBox = new SYNO.SDS._SearchBox({
            toggleBtn: this.searchButton
        })
    },
    createPilotViewBtn: function(a) {
        var b = {
            scope: SYNO.SDS.WindowMgr,
            module: this,
            disabled: true,
            handler: SYNO.SDS.WindowMgr.exposeWindow,
            tooltip: _T("desktop", "expose_window"),
            enableToggle: true,
            renderTo: "sds-taskbar-preview-button"
        };
        this.previewButton = new Ext.Button(Ext.apply(a || {}, b));
        this.previewButton.index = this.buttons.length;
        this.previewButton.mon(SYNO.SDS.StatusNotifier, "taskbuttonchanged", function() {
            if (!SYNO.SDS.TaskButtons || !Ext.isFunction(SYNO.SDS.TaskButtons.getAllAppWins)) {
                return
            }
            var c = SYNO.SDS.TaskButtons.getAllAppWins();
            this.previewButton.setDisabled((c.length === 0))
        }, this);
        this.previewButton.mon(Ext.getDoc(), "mousedown", function() {
            this.previewButton.toggle(false)
        }, this)
    }
});
SYNO.SDS._UserMenu = Ext.extend(Ext.Panel, {
    constructor: function(a) {
        var b = {
            renderTo: document.body,
            frame: true,
            shadow: false,
            hidden: true,
            baseCls: "sds-user-menu",
            items: [this.menu = new SYNO.ux.Menu({
                floating: false,
                plain: true,
                items: this.initButtonList()
            })],
            listeners: {
                show: {
                    fn: function(c) {
                        this.menu.focusEl.focus()
                    },
                    scope: this
                }
            }
        };
        this.cfg = a;
        this.btn = a.toggleBtn;
        SYNO.SDS._UserMenu.superclass.constructor.call(this, b);
        this.mon(Ext.getDoc(), "mousedown", this.onMouseDown, this);
        this.mon(this.btn, "keydown", this.toggleBox, this);
        this.mon(SYNO.SDS.StatusNotifier, "systemTrayNotifyMsg", this.hide, this);
        this.escNav = new Ext.KeyNav(this.menu.el, {
            esc: function(c) {
                this.hideBox();
                SYNO.SDS.TaskBar.rightTaskBar.toolbarEl.focus()
            },
            scope: this
        })
    },
    initButtonList: function() {
        var a = [{
            xtype: "menutextitem",
            tabindex: -1,
            role: "presentation",
            cls: "sds-user-menu-username",
            text: _S("user")
        }, "-", {
            text: _T("common", "user_setting"),
            iconCls: "sds-user-menu-options",
            overCls: "sds-user-menu-options-over",
            itemId: "user-menu-options",
            scope: this,
            listeners: {
                render: {
                    fn: function(b) {
                        b.el.addClassOnClick("sds-user-menu-options-click")
                    },
                    scope: this
                }
            },
            handler: function() {
                this.hideBox();
                SYNO.SDS.DeskTopManager.showDesktop();
                SYNO.SDS.AppLaunch("SYNO.SDS.App.PersonalSettings.Instance", {}, false)
            }
        }];
        if (true === _S("is_admin")) {
            a.push("-", {
                disabled: _S("demo_mode"),
                tooltip: _S("demo_mode") ? _JSLIBSTR("uicommon", "error_demo") : "",
                text: _T("system", "reboot_opt"),
                iconCls: "sds-user-menu-restart",
                overCls: "sds-user-menu-restart-over",
                scope: this,
                listeners: {
                    render: {
                        fn: function(b) {
                            b.el.addClassOnClick("sds-user-menu-restart-click")
                        },
                        scope: this
                    }
                },
                handler: function() {
                    this.hideBox();
                    SYNO.SDS.System.Reboot()
                }
            });
            a.push({
                disabled: _S("demo_mode"),
                tooltip: _S("demo_mode") ? _JSLIBSTR("uicommon", "error_demo") : "",
                text: ("yes" === _D("support_poweroff")) ? _T("system", "poweroff_opt") : _T("system", "halt_opt"),
                iconCls: "sds-user-menu-shutdown",
                overCls: "sds-user-menu-shutdown-over",
                scope: this,
                listeners: {
                    render: {
                        fn: function(b) {
                            b.el.addClassOnClick("sds-user-menu-shutdown-click")
                        },
                        scope: this
                    }
                },
                handler: function() {
                    this.hideBox();
                    SYNO.SDS.System.PowerOff()
                }
            })
        }
        a.push("-", {
            text: _T("personal_settings", "about"),
            iconCls: "sds-user-menu-about",
            overCls: "sds-user-menu-about-over",
            scope: this,
            listeners: {
                render: {
                    fn: function(b) {
                        b.el.addClassOnClick("sds-user-menu-about-click")
                    },
                    scope: this
                }
            },
            handler: function() {
                this.hideBox();
                SYNO.SDS.DeskTopManager.showDesktop();
                SYNO.SDS.System.About()
            }
        }, "-", {
            text: _T("common", "logout"),
            iconCls: "sds-user-menu-logout",
            overCls: "sds-user-menu-logout-over",
            scope: this,
            listeners: {
                render: {
                    fn: function(b) {
                        b.el.addClassOnClick("sds-user-menu-logout-click")
                    },
                    scope: this
                }
            },
            handler: function() {
                SYNO.SDS.System.Logout()
            }
        });
        return a
    },
    onMouseDown: function(a) {
        if (a.within(this.btn.getEl())) {
            this.toggleBox()
        } else {
            if (this.isVisible() && !a.within(this.el)) {
                this.hideBox()
            }
        }
    },
    hideBox: function() {
        this.hide();
        this.btn.toggle(false)
    },
    showBox: function() {
        this.show()
    },
    toggleBox: function() {
        if (this.isVisible()) {
            this.hide()
        } else {
            SYNO.SDS.StatusNotifier.fireEvent("taskBarPanelShow");
            this.showBox()
        }
    }
});
SYNO.SDS._OverflowButton = Ext.extend(Ext.Button, {
    constructor: function() {
        SYNO.SDS._OverflowButton.superclass.constructor.call(this, {
            cls: "sds-taskbar-overflow-menu-button",
            hidden: true,
            scope: this,
            handler: this.clickHandler
        });
        this.mon(SYNO.SDS.StatusNotifier, "taskbuttonchanged", this.doShowHide, this);
        Ext.EventManager.onWindowResize(this.doShowHide, this, {
            delay: 100
        })
    },
    clickHandler: function() {
        if (!this.panel) {
            this.panel = new SYNO.SDS._OverflowMenu({
                toggleBtn: this
            });
            this.panel.showBox()
        }
    },
    doShowHide: function() {
        if (!SYNO.SDS.TaskButtons) {
            return
        }
        var a = SYNO.SDS.TaskButtons.isButtonOverflow();
        SYNO.SDS.TaskButtons.hideOverflowedButtons();
        this.setVisible(a);
        if (!a && this.panel) {
            this.panel.hide()
        }
    }
});
SYNO.SDS._OverflowMenu = Ext.extend(Ext.Panel, {
    constructor: function(a) {
        var b = {
            renderTo: document.body,
            shadow: false,
            cls: "sds-tray-panel sds-overflow-menu",
            items: [{
                xtype: "menu",
                itemId: "menu",
                floating: false,
                plain: true
            }]
        };
        this.cfg = a;
        this.btn = a.toggleBtn;
        SYNO.SDS._OverflowMenu.superclass.constructor.call(this, b);
        this.mon(Ext.getDoc(), "mousedown", this.onMouseDown, this);
        this.mon(SYNO.SDS.StatusNotifier, "systemTrayNotifyMsg", this.hide, this);
        Ext.EventManager.onWindowResize(this.hideBox, this)
    },
    onMenuItemClick: function(c, a) {
        var b = Ext.getCmp(c.originalBtnId);
        if (b) {
            b.onClick(a)
        }
        this.hideBox()
    },
    onMouseDown: function(a) {
        if (a.within(this.btn.getEl())) {
            this.toggleBox()
        } else {
            if (this.isVisible() && !a.within(this.el)) {
                this.hideBox()
            }
        }
    },
    hideBox: function() {
        this.hide()
    },
    showBox: function() {
        var e = this.btn.el,
            b, d, a = SYNO.SDS.Desktop.getEl(),
            c = a.getWidth();
        this.show();
        this.setMenuItems();
        b = e.getLeft();
        d = this.getWidth();
        if (b + d > c) {
            b = c - d
        }
        this.el.setLeft(b)
    },
    toggleBox: function() {
        if (this.isVisible()) {
            this.hideBox()
        } else {
            SYNO.SDS.StatusNotifier.fireEvent("taskBarPanelShow");
            this.showBox()
        }
    },
    setMenuItems: function() {
        var b;
        if (!SYNO.SDS.TaskButtons) {
            return
        }
        b = this.getComponent("menu");
        b.removeAll(true);
        var a = this.getOverflowedItems();
        b.add(a);
        b.items.each(function(c) {
            if (c && c.el) {
                c.el.set({
                    "ext:qtip": c.text
                });
                c.el.addClassOnClick("sds-overflow-items-click")
            }
        }, this)
    },
    getOverflowedItems: function() {
        var a, b = [];
        if (!SYNO.SDS.TaskButtons) {
            return b
        }
        a = SYNO.SDS.TaskButtons.getOverflowedButtons();
        if (!Ext.isArray(a) || a.length === 0) {
            return b
        }
        Ext.each(a, function(d) {
            var c = d.jsConfig,
                e = c.jsBaseURL + "/" + (c.icon || c.icon_36),
                f = SYNO.SDS.Utils.GetLocalizedString(d.title || c.title, c.jsID);
            b.push({
                text: f,
                icon: SYNO.SDS.UIFeatures.IconSizeManager.getIconPath(e, "Taskbar"),
                originalBtnId: d.id,
                scope: this,
                handler: this.onMenuItemClick
            });
            b.push("-")
        }, this);
        b.splice(b.length - 1, 1);
        return b
    }
});
Ext.namespace("SYNO.SDS._PreviewBox");
SYNO.SDS._PreviewBox = Ext.extend(Ext.BoxComponent, {
    inited: false,
    defaultZIndex: 13000,
    defaultLeft: 0,
    defaultTop: 46,
    hideTop: 25,
    boxWidth: 240,
    cloneWinMaxWidth: 220,
    cloneWinMaxHeight: 116,
    hideDelay: 500,
    showDelay: 500,
    constructor: function() {
        SYNO.SDS._PreviewBox.superclass.constructor.call(this, {
            renderTo: document.body,
            cls: "sds-previewbox",
            hidden: true
        });
        this.inited = false;
        this.hoverCount = 0
    },
    createBoxElements: function() {
        var a = this.getEl(),
            b;
        a.createChild({
            cls: "sds-previewbox-background"
        });
        this.boxMc = a.createChild({
            tag: "div",
            cls: "sds-previewbox-mc"
        });
        this.arrow = a.createChild({
            tag: "div",
            cls: "sds-previewbox-arrow"
        });
        b = this.boxMc;
        this.desc = b.createChild({
            tag: "div",
            cls: "sds-previewbox-desc"
        });
        this.win = b.createChild({
            tag: "div",
            cls: "sds-previewbox-win"
        });
        this.inited = true;
        this.mon(Ext.get("sds-taskbar"), "click", this.onTaskbarClick, this);
        this.mon(Ext.get("sds-taskbar"), "contextmenu", this.onTaskbarClick, this)
    },
    onTaskbarClick: function() {
        this.hideBox(true)
    },
    showBox: function(a) {
        if (!this.isEnabled()) {
            return
        }
        this.needShowBox = true;
        this.hoverCount += 1;
        this.increaseTaskbarZIndex();
        this.doShowBox.defer(300, this, [a, this.hoverCount])
    },
    doShowBox: function(e, d) {
        var c, g, a, b, f;
        if (!e || !e.win || !e.centerX) {
            SYNO.Debug.error("required parameters not exist, obj:", e);
            return
        }
        if (this.hoverCount !== d) {
            return
        }
        if (!this.needShowBox) {
            return
        }
        if (!this.inited) {
            this.createBoxElements()
        }
        b = Ext.isNumber(e.centerX) ? e.centerX : this.defaultLeft;
        c = e.win;
        g = c.getEl();
        if (c.jsConfig && c.getTitle()) {
            f = SYNO.SDS.Utils.GetLocalizedString(c.getTitle(), c.jsConfig.jsID)
        } else {
            f = c.title || ""
        }
        if (c.titleEncoded !== false) {
            f = Ext.util.Format.htmlEncode(f)
        }
        this.desc.update(f || "");
        if (this.clonedEl) {
            this.clonedEl.remove()
        }
        this.clonedEl = this.getClonedEl(c);
        this.clonedEl.show();
        this.win.appendChild(this.clonedEl);
        a = this.getEl();
        if (this.isVisible()) {
            a.setTop(this.defaultTop);
            this.show();
            a.shift({
                left: b - (this.boxWidth / 2),
                opacity: 1,
                duration: 0.3
            })
        } else {
            a.setLeftTop(b - (this.boxWidth / 2), this.hideTop);
            a.setOpacity(0);
            this.show();
            a.shift({
                top: this.defaultTop,
                opacity: 1,
                duration: 0.8
            })
        }
        this.hoverCount = 0
    },
    hideBox: function(a) {
        if (!this.isEnabled()) {
            return
        }
        this.needShowBox = false;
        (function() {
            if (this.needShowBox) {
                return
            }
            this.doHideBox(a)
        }).defer((a === true) ? 0 : 300, this)
    },
    doHideBox: function(b) {
        var c;
        var a = function() {
            if (this.needShowBox) {
                return
            }
            this.hide();
            this.decreaseTaskbarZIndex()
        };
        if (this.clonedEl) {
            this.clonedEl.remove()
        }
        this.hoverCount = 0;
        if (b === true) {
            a.call(this);
            return
        }
        c = this.getEl();
        c.shift({
            top: this.hideTop,
            opacity: 0,
            duration: 0.2,
            scope: this,
            callback: a
        })
    },
    getClonedEl: function(e) {
        var c = 0;
        var h = 0;
        var g = e.getEl();
        var b = g.dom.cloneNode(true);
        b.removeAttribute("id");
        var f = Ext.get(b);
        f._previewMask = f.createChild({
            tag: "div",
            cls: "sds-previewbox-win-mask"
        });
        var a = g.getSize();
        var d = this.cloneWinMaxWidth / a.width;
        c = (this.cloneWinMaxHeight - a.height * d) / 2;
        if ((a.height * d) > this.cloneWinMaxHeight) {
            d = this.cloneWinMaxHeight / a.height;
            c = 0;
            h = (this.cloneWinMaxWidth - a.width * d) / 2
        }
        d = Math.min(d, 1);
        f._previewMask.setStyle("boxShadow", String.format("0px {0}px {1}px rgba(0, 0, 0, 0.4)", 3 / d, 6 / d));
        f.addClass("sds-previewbox-win-transform");
        f.setStyle("-webkit-transform", String.format("scale({0})", d));
        f.setStyle("-moz-transform", String.format("scale({0})", d));
        f.setStyle("-o-transform", String.format("scale({0})", d));
        f.setStyle("transform", String.format("scale({0})", d));
        f.setStyle("msTransform", String.format("scale({0})", d));
        f.setStyle("boxShadow", "0 0 0");
        f.setLeftTop(h, c);
        return f
    },
    increaseTaskbarZIndex: function() {
        SYNO.SDS.TaskBar.getEl().setStyle("z-index", this.defaultZIndex + 2)
    },
    decreaseTaskbarZIndex: function() {
        SYNO.SDS.TaskBar.getEl().setStyle("z-index", "")
    },
    isEnabled: function() {
        if (!SYNO.SDS.UIFeatures.test("previewBox")) {
            return false
        }
        if (false === SYNO.SDS.UserSettings.getProperty("Desktop", "enableTaskbarThumbnail")) {
            return false
        }
        return true
    }
});
Ext.define("SYNO.SDS.SearchResultPanel", {
    extend: "Ext.BoxComponent",
    constructor: function(a) {
        Ext.apply(this, a);
        var b = {
            hidden: false,
            tpl: this.getTemplate(),
            cls: "sds-search-result",
            tabindex: 0,
            role: "listbox",
            "aria-label": _T("common", "search_results"),
            getScrollTarget: function() {
                return this.getEl().first()
            },
            listeners: {
                afterrender: {
                    fn: function() {
                        this.bindEvents()
                    },
                    scope: this
                }
            }
        };
        this.callParent([b])
    },
    getTemplate: function() {
        var a = new Ext.XTemplate('<div class="sds-searchbox-result-div">', '<tpl for=".">', "<tpl if=\"type === 'app'\">", '<tpl if="!(this.appSection++)"><div class="section" role="presentation">{[_T("backup", "application")]}</div></tpl>', '<div class="sds-searchbox-result-item" role="option" id="{[Ext.id()]}" aria-label="{[this.getAriaSummary(values)]}" ext:qtip="{desc}">', '<img border=0 align="left" width={this.iconSize} src="{[SYNO.SDS.Utils.GetAppIcon(values.owner || SYNO.SDS.Utils.ParseSearchID(values.id).className, "TreeIcon")]}" />', '<table border="0">', "<tr>", '<td class="topic"><div>{title}</div></td>', '<td class="module"><div>{[this.getModuleName(values.owner)]}</div></td>', "</tr>", "</table>", "</div>", "</tpl>", "<tpl if=\"type === 'help'\">", '<tpl if="!(this.helpSection++)"><div class="sds-searchbox-result-splitline"></div><div class="section">{[_T("helpbrowser", "apptitle")]}</div></tpl>', '<div class="sds-searchbox-result-item" role="option" aria-label="{title}">', '<img border=0 align="left" src="{[SYNO.SDS.Utils.GetAppIcon("SYNO.SDS.HelpBrowser.Application", "TreeIcon")]}" width={this.iconSize} ></img>', '<table border="0">', "<tr>", '<td class="topic"><div>{title}</div></td>', '<td class="module"><div>{[SYNO.SDS.Utils.GetAppTitle(values.owner)]}</div></td>', "</tr>", "</table>", "</div>", "</tpl>", "</tpl>", "</div>", {
            appSection: 0,
            helpSection: 0,
            iconSize: SYNO.SDS.UIFeatures.IconSizeManager.TreeIcon + "px",
            getModuleName: function(b) {
                return SYNO.SDS.Utils.GetAppTitle(b)
            },
            getAriaSummary: function(b) {
                var d = b.title;
                var c = this.getModuleName(b.owner);
                return String.format("{0} - {1}", d, c)
            }
        });
        return a
    },
    bindEvents: function() {
        this.el.on("click", this.onResultClick, this);
        this.el.on("focus", function() {
            this.resultDiv = this.el.query(".sds-searchbox-result-item");
            this.currentActive = -1
        }, this);
        this.resultNav = new Ext.KeyNav(this.el, {
            down: this.selectNext,
            up: this.selectPrev,
            enter: this.onResultLaunch,
            scope: this
        })
    },
    onBlur: function() {
        this.clearActiveCls();
        this.el.set({
            "aria-activedescendant": false
        });
        this.currentActive = -1;
        this.resultDiv = null
    },
    clearActiveCls: function() {
        var a = this.resultDiv[this.currentActive];
        if (a) {
            Ext.fly(a).removeClass("active-item")
        }
    },
    selectPrev: function() {
        var a = this.currentActive - 1;
        if (a < 0) {
            return
        }
        this.setActiveItem(a)
    },
    selectNext: function() {
        var a = this.resultDiv;
        var b = this.currentActive + 1;
        if (b > a.length - 1) {
            return
        }
        this.setActiveItem(b)
    },
    setActiveItem: function(a) {
        var b = this.resultDiv[a];
        this.clearActiveCls();
        Ext.fly(b).addClass("active-item");
        this.el.set({
            "aria-activedescendant": b.id
        });
        this.currentActive = a
    },
    onResultLaunch: function() {
        this.module.onLaunchApp(this.currentActive)
    },
    onResultClick: function(a, g, h) {
        var b = "div.sds-searchbox-result-item",
            e = this.getEl(),
            d = Ext.query(b, e.dom),
            f = a.getTarget(b, e),
            c = d.indexOf(f);
        this.module.onLaunchApp(c)
    },
    setContentNoResult: function() {
        this.setPlainMsg(_T("search", "no_search_result"))
    },
    setContentSearching: function() {
        this.setPlainMsg(_T("common", "searching"))
    },
    setPlainMsg: function(a) {
        this.update(a);
        this.el.setARIA({
            label: a
        })
    },
    setSearchResult: function(a) {
        this.el.setARIA({
            label: _T("common", "search_results")
        });
        this.update(a)
    },
    adjustPanelHeight: function() {
        var c = this.module.getHeight();
        var e = this.getEl().getPadding("t") + this.getEl().getPadding("b");
        var b = Ext.get("sds-desktop").getHeight();
        var f = this.getEl().first();
        if (null !== f) {
            var a = this.getEl().child(".contentwrapper");
            var d = this.module.headerBar.getHeight();
            if (a !== null) {
                c = d + a.getHeight() + e
            }
            if (c > b) {
                f.setHeight(b - (d + e))
            } else {
                f.setHeight(c - (d + e))
            }
        }
        this.updateScrollbar()
    }
});
Ext.namespace("SYNO.SDS._SearchBox");
SYNO.SDS._SearchBox = Ext.extend(Ext.Panel, {
    INIT_STATE_CLS: "sds-searchbox-init-state",
    constructor: function(a) {
        this.store = this.getStore();
        this.searchField = this.getSearchField();
        this.resultPanel = this.getResultPanel();
        this.toggleBtn = a.toggleBtn;
        SYNO.SDS._SearchBox.superclass.constructor.call(this, {
            renderTo: document.body,
            shadow: false,
            baseCls: "sds-searchbox",
            hidden: true,
            header: true,
            headerAsText: false,
            footer: true,
            listeners: {
                scope: this,
                show: function() {
                    this.searchField.focus(false, 100);
                    this.resultPanel.adjustPanelHeight()
                },
                afterrender: this.createFocusTrap
            },
            items: [this.resultPanel]
        });
        this.initToolbar();
        this.addClass(this.INIT_STATE_CLS);
        this.mon(SYNO.SDS.StatusNotifier, "systemTrayNotifyMsg", this.hideBox, this);
        this.mon(Ext.getDoc(), "mousedown", this.onMouseDown, this);
        this.mon(this.toggleBtn, "keydown", this.toggleBox, this);
        Ext.EventManager.onWindowResize(this.hideBox, this);
        this.keyNav = new Ext.KeyNav(this.el, {
            esc: this.onEsc,
            scope: this
        });
        this.focusNav = new Ext.KeyNav(this.searchField.el, {
            enter: this.onFocusResult,
            scope: this
        })
    },
    createFocusTrap: function() {
        this.lastEl = this.el.createChild({
            tag: "div",
            cls: "x-panel-focus-last",
            tabIndex: 0
        });
        this.lastEl.on("focus", function() {
            this.searchField.focus()
        }, this)
    },
    onFocusResult: function(a) {
        this.resultPanel.el.focus()
    },
    onEsc: function(a) {
        this.hideBox();
        SYNO.SDS.TaskBar.rightTaskBar.toolbarEl.focus()
    },
    onMouseDown: function(a) {
        if (a.within(Ext.get("sds-taskbar-search-button"))) {
            this.toggleBox()
        } else {
            if (this.isVisible() && !a.within(this.el)) {
                this.hideBox()
            }
        }
    },
    getSearchField: function() {
        var a = new Ext.form.TextField({
            value: "",
            emptyText: _T("log", "search"),
            cls: "sds-searchbox-input",
            enableKeyEvents: true,
            autoCreate: {
                tag: "input",
                type: "text",
                autocomplete: "off"
            },
            listeners: {
                keyup: {
                    scope: this,
                    fn: this.onInputFieldKeyUp,
                    buffer: 500
                }
            }
        });
        return a
    },
    onInputFieldKeyUp: function(b, a) {
        this.checkSearchField()
    },
    cancelHandler: function() {
        this.searchField.setValue("");
        this.searchField.focus(false, 200);
        this.checkSearchField()
    },
    checkSearchField: function() {
        var a = this.searchField.getValue();
        if (a === this.lastQuery) {
            return
        }
        this.lastQuery = a;
        if (a === "") {
            this.addClass(this.INIT_STATE_CLS)
        } else {
            this.removeClass(this.INIT_STATE_CLS);
            this.resultPanel.setContentSearching();
            this.store.load({
                params: {
                    query: a
                }
            })
        }
    },
    getResultPanel: function() {
        var a = new SYNO.SDS.SearchResultPanel({
            module: this
        });
        a.mon(this.store, "datachanged", function() {
            a.tpl.appSection = 0;
            a.tpl.helpSection = 0
        }, this);
        return a
    },
    initToolbar: function() {
        var a = [{
            xtype: "container",
            cls: "sds-searchbox-input-wrap",
            layout: "absolute",
            items: [{
                xtype: "box",
                cls: "sds-searchbox-input-left"
            }, {
                xtype: "container",
                cls: "sds-searchbox-input-center",
                items: [this.searchField]
            }, {
                xtype: "syno_button",
                scope: this,
                tooltip: _T("common", "clear_input"),
                handler: this.cancelHandler,
                cls: "sds-searchbox-input-cancel"
            }]
        }];
        this.headerBar = new Ext.Toolbar({
            renderTo: this.header,
            items: a
        })
    },
    getStore: function() {
        var a = new SYNO.API.JsonStore({
            autoDestroy: true,
            appWindow: this.findAppWindow() || false,
            api: "SYNO.Core.UISearch",
            method: "uisearch",
            version: 1,
            root: "items",
            id: "_random",
            fields: ["id", "title", "owner", "topic", "type", {
                name: "desc",
                convert: function(c, b) {
                    return String.format(c, _D("product"))
                }
            }],
            baseParams: {
                lang: _S("lang"),
                type: "app"
            },
            listeners: {
                scope: this,
                load: this.onStoreLoad
            }
        });
        return a
    },
    onStoreLoad: function(c, b, e) {
        var a = [];

        function f(h) {
            var i = "";
            switch (h.get("type")) {
                case "app":
                    i = SYNO.SDS.Utils.ParseSearchID(h.get("id")).className;
                    if (SYNO.SDS.Utils.isHiddenControlPanelModule(h.get("id"))) {
                        return false
                    }
                    break;
                case "help":
                    i = "SYNO.SDS.HelpBrowser.Application";
                    break;
                default:
                    return true
            }
            return SYNO.SDS.StatusNotifier.isAppEnabled(i)
        }
        this.removeClass(this.INIT_STATE_CLS);
        c.filterBy(f);
        c.each(function(h) {
            a.push(h.data)
        }, this);
        var g, d;
        if (a.length === 0) {
            if (c.reader.jsonData.noindexdb) {
                g = c.reader.jsonData.msg;
                d = c.reader.jsonData.error;
                if (g) {
                    this.setContent(_T(g.section, g.key))
                } else {
                    if (d) {
                        this.setContent(_T(d.section, d.key))
                    } else {
                        this.setContent(_T("helptoc", "try_download_indexdb") || "Try to download indexdb")
                    }
                }
            } else {
                this.resultPanel.setContentNoResult()
            }
        } else {
            this.resultPanel.setSearchResult(a)
        }
        this.resultPanel.adjustPanelHeight();
        this.resultPanel.show()
    },
    setContent: function(a) {
        this.resultPanel.setPlainMsg(a)
    },
    onLaunchApp: function(b) {
        var a = this.store.getAt(b);
        if (b === -1 || !a) {
            return
        }
        this.launchApp(a, b);
        this.hideBox()
    },
    launchApp: function(a, b) {
        var c = {
            className: null,
            params: {}
        };
        switch (a.get("type")) {
            case "app":
                c = SYNO.SDS.Utils.ParseSearchID(a.get("id"));
                break;
            case "help":
                c.className = "SYNO.SDS.HelpBrowser.Application";
                c.params.topic = a.get("id");
                break;
            default:
        }
        if (c.className) {
            SYNO.SDS.DeskTopManager.showDesktop();
            SYNO.SDS.AppLaunch(c.className, c.params)
        }
    },
    showBox: function() {
        SYNO.SDS.StatusNotifier.fireEvent("taskBarPanelShow");
        this.show()
    },
    hideBox: function() {
        var a = Ext.getCmp("sds-taskbar-right").searchButton;
        a.toggle(false);
        this.hide()
    },
    toggleBox: function() {
        if (this.isVisible()) {
            this.hide()
        } else {
            this.showBox()
        }
    }
});
Ext.namespace("SYNO.SDS.AppInstance");
SYNO.SDS.AppInstance = Ext.extend(Ext.Component, {
    window: null,
    trayItem: null,
    instances: null,
    taskButton: null,
    blMainApp: false,
    constructor: function(a) {
        if (_S("standalone")) {
            this.blMainApp = (this.jsConfig.jsID === _S("standaloneAppName"))
        }
        SYNO.SDS.AppInstance.superclass.constructor.apply(this, arguments);
        SYNO.SDS.AppMgr.register(this)
    },
    beforeDestroy: function() {
        if (this.fullsize === true) {
            SYNO.SDS.StatusNotifier.fireEvent("fullsizeappdestroy")
        }
        SYNO.SDS.AppInstance.superclass.beforeDestroy.apply(this, arguments);
        this.onBeforeDestroy()
    },
    onBeforeDestroy: function() {
        this.instances = null;
        this.window = null;
        this.trayItem = null;
        this.appItem = null;
        this.taskButton = null;
        SYNO.SDS.AppMgr.unregister(this)
    },
    beforeOpen: Ext.emptyFn,
    initInstance: function(c) {
        var b;
        if (!this.window && this.appWindowName) {
            if (this.fullsize === true) {
                var a = (this.shouldLaunch) ? this.shouldLaunch() : false;
                if (!a) {
                    this.destroy();
                    return
                }
            }
            b = Ext.getClassByName(this.appWindowName);
            this.window = new b(Ext.apply({
                appInstance: this,
                fromRestore: c.fromRestore
            }, c.windowState || {}));
            this.addInstance(this.window);
            this.window.init();
            this.window.open(c)
        }
        if (!this.trayItem && this.appTrayItemName) {
            b = Ext.getClassByName(this.appTrayItemName);
            this.trayItem = new b(Ext.apply({
                appInstance: this
            }));
            this.addInstance(this.trayItem);
            this.trayItem.open(c)
        }
        if (!this.appItem && this.appItemName) {
            b = Ext.getClassByName(this.appItemName);
            this.appItem = new b(Ext.apply({
                appInstance: this
            }));
            this.addInstance(this.appItem);
            this.appItem.open(c)
        }
    },
    open: function(a) {
        if (!Ext.isObject(a) || !Ext.isNumber(a.cms_id) || 0 >= a.cms_id) {
            return this.delayOpen(a)
        }
        SYNO.API.Info.UpdateById({
            cms_id: a.cms_id,
            callback: this.delayOpen,
            args: arguments,
            scope: this
        }, true)
    },
    delayOpen: function() {
        if (this.opened) {
            return this.onRequest.apply(this, arguments)
        }
        this.opened = true;
        return this.onOpen.apply(this, arguments)
    },
    onOpen: function(a) {
        if (false === this.beforeOpen(a)) {
            this.destroy();
            return
        }
        this.initInstance(a);
        this.checkAlive()
    },
    onRequest: function(a) {
        if (this.window) {
            this.window.open(a)
        }
        if (this.trayItem) {
            this.trayItem.open(a)
        }
        if (this.appItem) {
            this.appItem.open(a)
        }
    },
    checkAlive: function() {
        if (this.destroying) {
            return
        }
        if (!this.instances || !this.instances.length) {
            this.destroy()
        }
    },
    addInstance: function(a) {
        a.appInstance = this;
        this.instances = this.instances || [];
        this.instances.push(a);
        this.addManagedComponent(a)
    },
    removeInstance: function(a) {
        a.appInstance = null;
        this.instances = this.instances || [];
        this.instances.remove(a);
        this.removeManagedComponent(a);
        this.checkAlive()
    },
    shouldNotifyMsg: function(a, b) {
        return true
    },
    getUserSettings: function(a) {
        return SYNO.SDS.UserSettings.getProperty(this.jsConfig.jsID, a)
    },
    setUserSettings: function(a, b) {
        return SYNO.SDS.UserSettings.setProperty(this.jsConfig.jsID, a, b)
    },
    getStateParam: function() {
        var a = {
            windowState: {}
        };
        if (Ext.isEmpty(this.window)) {
            return a
        }
        Ext.apply(a, {
            windowState: this.window.getStateParam()
        }, this.window.openConfig);
        return a
    }
});
Ext.namespace("SYNO.SDS.BaseWindow");
Ext.define("SYNO.SDS.AbstractWindow", {
    extend: "Ext.Window",
    toolTarget: "toolCt",
    toolCtCls: "x-window-toolCt",
    toolTemplate: new Ext.XTemplate('<div class="x-tool x-tool-{id}" role="option" aria-label="{text}">&#160;</div>'),
    constructor: function(b) {
        var a = Ext.urlDecode(location.search.substr(1));
        this.enableAlertHeight = a.alertHeight;
        var c = SYNO.SDS.Desktop ? SYNO.SDS.Desktop.getEl() : Ext.getBody();
        b = Ext.apply({
            autoFitDesktopHeight: false,
            maximizable: true,
            minimizable: true,
            closable: true,
            onEsc: Ext.emptyFn,
            width: 300,
            height: 300,
            constrain: false,
            constrainHeader: true,
            modal: false,
            renderTo: c,
            manager: SYNO.SDS.WindowMgr
        }, b);
        SYNO.SDS.AbstractWindow.superclass.constructor.call(this, b);
        if ((this.constrain || this.constrainHeader) && this.resizer) {
            this.resizer.constrainTo = this.container
        }
        this.mon(this, "titlechange", this.onWindowTitleChanged, this)
    },
    initEvents: function() {
        SYNO.SDS.AbstractWindow.superclass.initEvents.apply(this, arguments);
        if (this.resizer) {
            var b = Ext.Resizable.positions;
            for (var a in b) {
                if (this.resizer[b[a]]) {
                    this.mon(this.resizer[b[a]].el, "mousedown", this.toFront, this)
                }
            }
        }
        this.mon(this, "beforeclose", this.onClose, this);
        this.mon(this, "maximize", this.onMaximize, this);
        this.mon(this, "minimize", this.onMinimize, this);
        this.mon(this, "restore", this.onRestore, this);
        this.mon(this, "activate", this.onActivate, this);
        this.mon(this, "deactivate", this.onDeactivate, this);
        if (this.header) {
            this.mon(this.header, "contextmenu", this.onHeaderContextMenu, this)
        }
    },
    onClose: Ext.emptyFn,
    onMaximize: Ext.emptyFn,
    onMinimize: Ext.emptyFn,
    onRestore: Ext.emptyFn,
    onActivate: Ext.emptyFn,
    onDeactivate: Ext.emptyFn,
    onHeaderContextMenu: function(a) {
        a.preventDefault()
    },
    onShow: function() {
        this.removeClass("syno-window-hide");
        delete this.hideForMinimize;
        if (this.enableAlertHeight && this.isVisible() && (this.getHeight() > 580)) {
            window.alert(String.format("Height: {0}px, Plz contact your PM to adjust UI.", this.getHeight()))
        }
        if (this.autoFitDesktopHeight) {
            this.adjustHeightByValue(SYNO.SDS.Desktop.getHeight())
        }
    },
    adjustHeightByValue: function(a, b) {
        if (!this.isVisible() && !Ext.isDefined(b)) {
            return
        }
        if (this.getHeight() > a) {
            this.setHeight(a)
        }
    },
    beforeDestroy: function() {
        this.onBeforeDestroy();
        SYNO.SDS.AbstractWindow.superclass.beforeDestroy.apply(this, arguments)
    },
    setIcon: function(a) {
        if (this.header) {
            this.header.setStyle("background-image", a ? "url(" + a + ")" : "")
        }
    },
    onBeforeDestroy: function() {
        if (this.appInstance) {
            this.appInstance.removeInstance(this)
        }
    },
    open: function() {
        if (this.opened) {
            return this.onRequest.apply(this, arguments)
        }
        this.opened = true;
        return this.onOpen.apply(this, arguments)
    },
    onOpen: function() {
        if (!this.minimized) {
            this.show()
        } else {
            this.el.hide()
        }
    },
    onRequest: function() {
        if (!this.isVisible()) {
            this.show();
            return
        }
        this.toFront()
    },
    onWindowTitleChanged: function(a, b) {
        if (!this.rendered) {
            return
        }
        if (this.focusEl instanceof Ext.Element) {
            this.focusEl.set({
                "aria-label": Ext.util.Format.stripTags(b)
            })
        }
    },
    getSizeAndPosition: function() {
        var b, a = {};
        if (this.maximized || this.hidden) {
            if (this.draggable && this.restorePos) {
                a.x = this.restorePos[0];
                a.y = this.restorePos[1]
            } else {
                a.x = this.x;
                a.y = this.y
            }
            if (this.resizable) {
                if (this.restoreSize) {
                    a.width = this.restoreSize.width;
                    a.height = this.restoreSize.height
                } else {
                    a.width = this.width;
                    a.height = this.height
                }
            }
        } else {
            b = this.el.origXY || this.getPosition(false);
            a.pageX = b[0];
            a.pageY = b[1];
            if (this.resizable) {
                a.width = this.getWidth();
                a.height = this.getHeight()
            }
        }
        return a
    },
    setResizable: function(a) {
        this.el[a ? "removeClass" : "addClass"]("no-resize")
    },
    setTitle: function(c, a, b) {
        this.titleEncoded = b;
        this.title = c;
        if (b !== false) {
            c = Ext.util.Format.htmlEncode(c)
        }
        if (this.header && this.headerAsText) {
            this.header.child("span").update(c)
        }
        if (a) {
            this.setIconClass(a)
        }
        this.fireEvent("titlechange", this, this.title);
        return this
    },
    getStateParam: function() {
        var a = {};
        if (this.maximized || this.hidden) {
            a.maximized = this.maximized;
            a.minimized = this.hidden
        }
        Ext.apply(a, this.getSizeAndPosition());
        return a
    },
    getToolSelectedEl: function() {
        var a = this.toolCt.dom.getAttribute("aria-activedescendant");
        if (!a) {
            return null
        }
        return Ext.get(a)
    },
    selectToolNext: function() {
        var b = this.getToolSelectedEl(),
            a;
        if (!b) {
            this.toolCt.set({
                "aria-activedescendant": this.toolCt.first().id
            });
            this.toolCt.first().addClass("x-tool-selected");
            return
        }
        a = b.next();
        while (a && !a.isVisible()) {
            a = a.next()
        }
        if (a) {
            b.removeClass("x-tool-selected");
            this.toolCt.set({
                "aria-activedescendant": a.id
            });
            a.addClass("x-tool-selected")
        }
    },
    selectToolPre: function() {
        var b = this.getToolSelectedEl(),
            a;
        if (!b) {
            this.toolCt.set({
                "aria-activedescendant": this.toolCt.last().id
            });
            this.toolCt.last().addClass("x-tool-selected");
            return
        }
        a = b.prev();
        while (a && !a.isVisible()) {
            a = a.prev()
        }
        if (a) {
            b.removeClass("x-tool-selected");
            this.toolCt.set({
                "aria-activedescendant": a.id
            });
            a.addClass("x-tool-selected")
        }
    },
    onToolCtKenEnter: function() {
        var a = this.getToolSelectedEl();
        if (!a) {
            return
        }
        a.handler.call(this)
    },
    addTool: function() {
        if (this.rendered && !this.toolCt) {
            this.elements += ",toolCt";
            this.toolCt = this.header.createChild({
                cls: "x-window-toolCt"
            }, this.header.first("." + this.headerTextCls, true));
            this.toolCt.setARIA({
                role: "listbox",
                label: _T("desktop", "window_toolbar_list"),
                activedescendant: "false"
            });
            this.toolCt.addKeyListener(Ext.EventObject.LEFT, this.selectToolNext, this);
            this.toolCt.addKeyListener(Ext.EventObject.RIGHT, this.selectToolPre, this);
            this.toolCt.addKeyListener(Ext.EventObject.DOWN, this.selectToolNext, this);
            this.toolCt.addKeyListener(Ext.EventObject.UP, this.selectToolPre, this);
            this.toolCt.addKeyListener(Ext.EventObject.ENTER, this.onToolCtKenEnter, this)
        }
        this.callParent(arguments);
        if (!this.rendered) {
            return
        }
        var d = arguments,
            c = d.length,
            f = this.tools,
            e;
        for (e = 0; e < c; e++) {
            var b = d[e];
            if (!f[b.id].handler) {
                f[b.id].handler = b.handler
            }
        }
    },
    createGhost: function(a, e, b) {
        var d = document.createElement("div");
        d.className = "x-panel-ghost " + (a ? a : "");
        if (this.header) {
            d.appendChild((this.tl || this.el.dom.firstChild).cloneNode(true))
        }
        Ext.fly(d.appendChild(document.createElement("ul"))).setHeight(this.bwrap.getHeight());
        d.style.width = this.el.dom.offsetWidth + "px";
        if (!b) {
            this.container.dom.appendChild(d)
        } else {
            Ext.getDom(b).appendChild(d)
        }
        if (e !== false && this.el.useShim !== false) {
            var c = new Ext.Layer({
                shadow: false,
                useDisplay: true,
                constrain: false
            }, d);
            c.show();
            return c
        } else {
            return new Ext.Element(d)
        }
    },
    initTools: function() {
        if (this.minimizable) {
            this.addTool({
                id: "minimize",
                text: _T("desktop", "minimize"),
                handler: this.minimize.createDelegate(this, [])
            })
        }
        if (this.maximizable) {
            this.addTool({
                id: "maximize",
                text: _T("desktop", "maximize"),
                handler: this.maximize.createDelegate(this, [])
            });
            this.addTool({
                id: "restore",
                text: _T("destop", "restore"),
                handler: this.restore.createDelegate(this, []),
                hidden: true
            })
        }
        if (this.closable) {
            this.addTool({
                id: "close",
                text: _T("common", "close"),
                handler: this[this.closeAction].createDelegate(this, [])
            })
        }
    }
});
SYNO.SDS.BaseWindow = Ext.extend(SYNO.SDS.AbstractWindow, {
    maskCnt: 0,
    maskTask: null,
    siblingWin: null,
    sinkModalWin: null,
    modalWin: null,
    msgBox: null,
    dsmStyle: "v5",
    owner: null,
    useDefualtKey: true,
    constructor: function(b) {
        var c = !!b.owner,
            a;
        this.siblingWin = [];
        this.modalWin = [];
        this.sinkModalWin = [];
        this.updateDsmStyle(b);
        if (b.useStatusBar) {
            b = this.addStatusBar(b)
        }
        a = Ext.urlDecode(location.search.substr(1));
        if (a.dsmStyle) {
            this.dsmStyle = a.dsmStyle
        }
        b.cls = String.format("{0}{1}", (b.cls ? b.cls : ""), (this.isV5Style() ? " sds-window-v5" : " sds-window"));
        if (this.isV5Style()) {
            this.fillPadding(b)
        }
        if (b.useDefualtKey !== false) {
            b.keys = b.keys || [];
            b.keys.push({
                key: 27,
                handler: this[b.closeAction || "close"],
                scope: this
            })
        }
        SYNO.SDS.BaseWindow.superclass.constructor.call(this, Ext.applyIf(b, {
            border: true,
            plain: false,
            shadow: (this.isV5Style() || SYNO.SDS.UIFeatures.test("disableWindowShadow")) ? false : "frame",
            shadowOffset: 6,
            closeAction: "close"
        }));
        if (c && !(b.owner instanceof SYNO.SDS.BaseWindow)) {
            SYNO.Debug.warn(String.format('WARNING! owner of window "{0}" is not BaseWindow', this.title || this.id))
        }
        if (this.isV5Style()) {
            this.centerTitle()
        }
        this.mon(this, "hide", this.restoreWindowFocus, this)
    },
    findTopWin: function() {
        var a = false,
            c = this,
            b;
        while (a === false) {
            if (Ext.isArray(c.modalWin) && c.modalWin.length > 0) {
                for (b = c.modalWin.length - 1; b >= 0; b--) {
                    if (c.modalWin[b] && !(c.modalWin[b].hidden || c.modalWin[b].isDestroyed || c.modalWin[b].destroying)) {
                        c = c.modalWin[b];
                        break
                    } else {
                        if (b === 0) {
                            a = true
                        }
                    }
                }
            } else {
                a = true
            }
        }
        return c
    },
    restoreWindowFocus: function() {
        if (this.focusLeave !== true && SYNO.SDS.FocusMgr) {
            SYNO.SDS.FocusMgr.focusActiveWindow();
            this.focusLeave = true
        }
    },
    focusLastWindowPt: function() {
        var e = this.findTopWin(),
            c;
        c = e.focusStack;
        if (!c) {
            e.focusEl.focus();
            return
        }
        var a, b, d = false;
        for (a = c.length - 1; a >= 0 && d !== true; a--) {
            b = Ext.fly(c[a]);
            if (b && b.dom && b.isVisible() && b.dom.getAttribute("tabIndex") !== -1) {
                b.focus();
                d = true
            }
        }
        if (!d) {
            this.focusEl.focus();
            b = this.focusEl
        }
        e.focusStack = [b.dom]
    },
    addFocusPt: function() {
        var a = document.activeElement,
            b;
        if (!a || !Ext.fly(a).up(".x-window")) {
            return
        }
        b = this.findTopWin();
        if (!b.focusStack) {
            b.focusStack = []
        }
        b.focusStack.push(a)
    },
    updateDsmStyle: function(a) {
        if (!Ext.isDefined(a)) {
            return
        }
        if (a.dsmStyle) {
            this.dsmStyle = a.dsmStyle
        } else {
            if (a.owner) {
                this.setToOwnerDsmStyle(a.owner)
            }
        }
    },
    getDsmStyle: function() {
        return this.dsmStyle
    },
    isV5Style: function() {
        return this.getDsmStyle() === "v5"
    },
    setToOwnerDsmStyle: function(a) {
        if (Ext.isFunction(a.getDsmStyle)) {
            this.dsmStyle = a.getDsmStyle()
        }
    },
    addStatusBar: function(a) {
        var b = {
            xtype: "statusbar",
            defaultText: "&nbsp;",
            statusAlign: "left",
            buttonAlign: "left",
            items: []
        };
        if (this.isV5Style()) {
            b.defaults = {
                xtype: "syno_button",
                btnStyle: "grey"
            }
        }
        if (a.buttons) {
            b.items = b.items.concat(a.buttons);
            delete a.buttons
        }
        Ext.applyIf(a, {
            fbar: b
        });
        return a
    },
    createGhost: function(a, d, b) {
        if (this.isV5Style()) {
            a += " sds-window-v5"
        }
        if (SYNO.SDS.UIFeatures.test("windowGhost")) {
            return SYNO.SDS.BaseWindow.superclass.createGhost.apply(this, arguments)
        }
        var f = this.el.dom,
            e = document.createElement("div"),
            c = e.style;
        e.className = "x-panel-ghost-simple";
        c.width = f.offsetWidth + "px";
        c.height = f.offsetHeight + "px";
        if (!b) {
            this.container.dom.appendChild(e)
        } else {
            Ext.getDom(b).appendChild(e)
        }
        return new Ext.Element(e)
    },
    isModalized: function() {
        return false
    },
    hasOwnerWin: function(b) {
        var a = this;
        do {
            if (b === a) {
                return true
            }
            a = a.owner
        } while (a);
        return false
    },
    getTopWin: function() {
        var a = this;
        while (a.owner) {
            a = a.owner
        }
        return a
    },
    getGroupWinAccessTime: function() {
        var a = this._lastAccess || 0;
        Ext.each(this.modalWin, function(b) {
            if (b && b._lastAccess && b._lastAccess > a) {
                a = b._lastAccess
            }
        });
        Ext.each(this.siblingWin, function(b) {
            if (b && b._lastAccess && b._lastAccess > a) {
                a = b._lastAccess
            }
        });
        return a
    },
    getMsgBox: function(b) {
        if (!this.msgBox || this.msgBox.isDestroyed) {
            var a = (b && b.owner) || this;
            a = a.isDestroyed ? null : a;
            if (this.isV5Style()) {
                this.msgBox = new SYNO.SDS.MessageBoxV5({
                    owner: a,
                    preventDelay: (b) ? b.preventDelay || false : false,
                    draggable: (b) ? b.draggable || false : false
                })
            } else {
                this.msgBox = new SYNO.SDS.MessageBox({
                    owner: a
                })
            }
        }
        return this.msgBox.getWrapper(b)
    },
    getToastBox: function(e, d, c, b) {
        if (this.toastBox && !this.toastBox.isDestroyed) {
            this.toastBox.destroy()
        }
        var a = {
            text: e,
            closable: d,
            owner: this
        };
        if (Ext.isObject(c)) {
            if (Ext.isString(c.text)) {
                a.actionText = c.text
            }
            if (Ext.isFunction(c.fn)) {
                a.actionHandler = c.fn
            }
            if (Ext.isObject(c.scope)) {
                a.actionHandlerScope = c.scope
            }
        }
        if (Ext.isObject(b)) {
            if (Ext.isNumber(b.delay)) {
                a.delay = b.delay
            }
            if (Ext.isNumber(b.offsetY)) {
                a.offsetY = b.offsetY
            }
            if (Ext.isNumber(b.offsetX)) {
                a.offsetX = b.offsetX
            }
            if (Ext.isDefined(b.alignEl)) {
                a.alignEl = b.alignEl
            }
            a.alignBottom = true === b.alignBottom ? true : false
        }
        this.toastBox = new SYNO.SDS.ToastBox(a);
        return this.toastBox
    },
    onBeforeDestroy: function() {
        function a(b) {
            if (b) {
                b.destroy()
            }
        }
        if (this.msgBox) {
            this.msgBox.destroy()
        }
        if (this.toastBox) {
            this.toastBox.destroy()
        }
        Ext.each(this.modalWin, a);
        Ext.each(this.siblingWin, a);
        delete this.msgBox;
        delete this.modalWin;
        delete this.siblingWin;
        delete this.maskTask;
        SYNO.SDS.BaseWindow.superclass.onBeforeDestroy.apply(this, arguments)
    },
    onMinimize: function() {
        function a(b) {
            if (b) {
                b.hideForMinimize = true;
                b.minimize()
            }
        }
        SYNO.SDS.BaseWindow.superclass.onMinimize.apply(this, arguments);
        Ext.each(this.modalWin, a);
        Ext.each(this.siblingWin, a)
    },
    applyToAllWindows: function(a) {
        Ext.each(this.modalWin, a);
        Ext.each(this.siblingWin, a)
    },
    addClassToAllWindows: function(a) {
        function b(c) {
            c.addClassToAllWindows(a)
        }
        this.el.addClass(a);
        this.applyToAllWindows(b)
    },
    removeClassFromAllWindows: function(a) {
        function b(c) {
            c.removeClassFromAllWindows(a)
        }
        this.el.removeClass(a);
        this.applyToAllWindows(b)
    },
    disableAllShadow: function() {
        function a(b) {
            b.disableAllShadow()
        }
        this.el.disableShadow();
        this.applyToAllWindows(a)
    },
    onClose: function() {
        var b;

        function a(c) {
            if (c) {
                c.close();
                return c.isDestroyed
            }
            return true
        }
        Ext.each(this.modalWin, a);
        Ext.each(this.sinkModalWin, a);
        if (!this.modalWin.length) {
            Ext.each(this.siblingWin, a)
        }
        b = !this.modalWin.length && !this.siblingWin.length;
        if (b) {
            b = (false !== SYNO.SDS.BaseWindow.superclass.onClose.apply(this, arguments))
        }
        return b
    },
    onActivate: function() {
        var a = this.getTopWin();
        if (a.taskButton) {
            a.taskButton.setState("active")
        }
        this.el.replaceClass("deactive-win", "active-win");
        SYNO.SDS.BaseWindow.superclass.onActivate.apply(this, arguments)
    },
    onDeactivate: function() {
        var a = this.getTopWin();
        if (a.taskButton) {
            a.taskButton.setState("deactive")
        }
        this.el.replaceClass("active-win", "deactive-win");
        SYNO.SDS.BaseWindow.superclass.onDeactivate.apply(this, arguments);
        if (this.el) {
            this.el.enableShadow(true)
        }
    },
    blinkShadow: function(a) {
        if (this.isV5Style()) {
            return this.blinkShadowV5(a)
        }
        if (!this.shadow || a <= 0) {
            return
        }
        this.el.disableShadow();
        (function() {
            this.el.enableShadow(true);
            this.blinkShadow.createDelegate(this, [--a]).defer(100)
        }).createDelegate(this).defer(100)
    },
    blinkShadowV5: function(a) {
        if (!this.el || !this.el.isVisible() || a <= 0) {
            return
        }
        this.el.addClass("sds-window-v5-no-shadow");
        (function() {
            if (!this.el || !this.el.isVisible()) {
                return
            }
            this.el.removeClass("sds-window-v5-no-shadow");
            this.blinkShadowV5.createDelegate(this, [--a]).defer(100)
        }).createDelegate(this).defer(100)
    },
    delayedMask: function(b, a) {
        a = Ext.isNumber(a) ? a : 200;
        if (!this.maskTask) {
            this.maskTask = new Ext.util.DelayedTask(this.setMaskOpacity, this, [b])
        }
        this.mask(0);
        this.maskTask.delay(a)
    },
    setMaskOpacity: function(b) {
        if (!this.el.dom) {
            return
        }
        var a = Ext.Element.data(this.el.dom, "mask");
        if (a) {
            a.setOpacity(b)
        }
    },
    mask: function(c, e, d, b) {
        if (this.isDestroyed) {
            return
        }
        c = Ext.isNumber(c) ? c : 0;
        this.maskCnt++;
        if (this.maskCnt > 1) {
            this.setMaskOpacity(c, b);
            return
        }
        var a = this.el.mask(e, d);
        a.addClass("sds-window-mask");
        this.mon(a, "mousedown", this.blinkModalChild, this);
        this.setMaskOpacity(c, b)
    },
    unmask: function() {
        if (this.isDestroyed || --this.maskCnt > 0) {
            return
        }
        this.maskCnt = 0;
        if (this.maskTask) {
            this.maskTask.cancel()
        }
        var a = Ext.Element.data(this.el, "mask");
        this.mun(a, "mousedown", this.blinkModalChild, this);
        this.el.unmask()
    },
    blinkModalChild: function() {
        if (!SYNO.SDS.WindowMgr) {
            return
        }
        this.modalWin.sort(SYNO.SDS.WindowMgr.sortWindows);
        var a = this.modalWin[this.modalWin.length - 1];
        if (!a) {
            if (this.isModalized()) {
                this.toFront();
                this.blinkShadow(3)
            }
            return
        }
        a.blinkModalChild()
    },
    clearStatus: function(b) {
        var a = this.getFooterToolbar();
        if (a && Ext.isFunction(a.clearStatus)) {
            a.clearStatus(b)
        }
    },
    clearStatusBusy: function(a) {
        this.unmask();
        if (this.maskCnt === 0) {
            this.clearStatus(a)
        }
    },
    setStatus: function(b) {
        b = b || {};
        var a = this.getFooterToolbar();
        if (a && Ext.isFunction(a.setStatus)) {
            a.setStatus(b)
        }
    },
    setStatusOK: function(a) {
        a = a || {};
        Ext.applyIf(a, {
            text: _T("common", "setting_applied"),
            iconCls: this.isV5Style() ? "syno-ux-statusbar-success" : "x-status-valid",
            clear: true
        });
        this.setStatus(a)
    },
    setStatusError: function(a) {
        a = a || {};
        Ext.applyIf(a, {
            text: _T("common", "error_system"),
            iconCls: this.isV5Style() ? "syno-ux-statusbar-error" : "x-status-error"
        });
        this.setStatus(a)
    },
    setStatusBusy: function(c, b, a) {
        c = c || {};
        Ext.applyIf(c, {
            text: _T("common", "loading"),
            iconCls: this.isV5Style() ? "syno-ux-statusbar-loading" : "x-status-busy"
        });
        this.setStatus(c);
        this.maskForBusy(b, a)
    },
    maskForBusy: function(b, a) {
        b = Ext.isNumber(b) ? b : 0.4;
        a = Ext.isNumber(a) ? a : 400;
        this.delayedMask(b, a)
    },
    hide: function() {
        if (!this.maximized) {
            this.restoreSize = this.getSize();
            this.restorePos = this.getPosition(true)
        }
        this.addClass("syno-window-hide");
        SYNO.SDS.BaseWindow.superclass.hide.apply(this, arguments)
    },
    centerTitle: function() {
        var a = 32,
            b = 0,
            d = ["help", "minimize", "maximize", "close"],
            c;
        if (!this.tools) {
            return
        }
        Ext.each(d, function(e) {
            if (this.tools[e]) {
                b += a
            }
        }, this);
        if (this.header) {
            c = this.header.child(".x-window-header-text");
            if (c) {
                c.setStyle("padding-left", b + "px")
            }
        }
    },
    fillPadding: function(a) {
        var b;
        b = this.getFirstItem(a);
        if (!b) {
            return a
        }
        if (this.isGridPanel(b) || this.isFormPanel(b)) {
            this.fillWindowPadding(a);
            return
        }
        if (this.isTabPanel(b) && this.hasItems(b)) {
            this.fillWindowPadding(a);
            return
        }
    },
    hasItems: function(a) {
        if (Ext.isArray(a.items)) {
            return true
        }
        if (a.items instanceof Ext.util.MixedCollection) {
            return true
        }
        return false
    },
    fillWindowPadding: function(a) {
        Ext.applyIf(a, {
            padding: "0 20px"
        })
    },
    getFirstItem: function(a) {
        var b;
        if (Ext.isArray(a.items) && a.items.length === 1) {
            b = a.items[0]
        } else {
            if (Ext.isObject(a.items)) {
                b = a.items
            }
        }
        return b
    },
    isTabPanel: function(a) {
        return this.isPanelOf(a, Ext.TabPanel, ["tabpanel", "syno_tabpanel"])
    },
    isFormPanel: function(a) {
        return this.isPanelOf(a, Ext.form.FormPanel, ["form", "syno_formpanel"])
    },
    isGridPanel: function(a) {
        return this.isPanelOf(a, Ext.grid.GridPanel, ["grid", "syno_gridpanel"])
    },
    isPanelOf: function(c, e, d) {
        var f, b, a;
        if (!c) {
            return false
        }
        if (c instanceof e) {
            return true
        }
        f = c.xtype;
        for (b = 0, a = d.length; b < a; b++) {
            if (f === d[b]) {
                return true
            }
        }
        return false
    },
    destroy: function() {
        if (!this.isDestroyed) {
            if (this.fireEvent("beforedestroy", this) !== false) {
                this.destroying = true;
                if (this.focusStack) {
                    this.focusStack = null
                }
                this.restoreWindowFocus();
                SYNO.SDS.BaseWindow.superclass.destroy.call(this)
            }
        }
    }
});
Ext.namespace("SYNO.SDS.Window");
SYNO.SDS.Window = Ext.extend(SYNO.SDS.BaseWindow, {
    constructor: function(a) {
        a = Ext.apply({
            minimizable: false
        }, a);
        SYNO.SDS.Window.superclass.constructor.call(this, a);
        if (this.owner && Ext.isArray(this.owner.siblingWin)) {
            this.owner.siblingWin.push(this)
        }
    },
    onBeforeDestroy: function() {
        if (this.owner && Ext.isArray(this.owner.siblingWin)) {
            this.owner.siblingWin.remove(this)
        }
        SYNO.SDS.Window.superclass.onBeforeDestroy.apply(this, arguments)
    },
    onMinimize: function() {
        this.hide();
        SYNO.SDS.Window.superclass.onMinimize.apply(this, arguments)
    },
    isAlwaysOnTop: function() {
        return _S("standalone")
    }
});
Ext.namespace("SYNO.SDS.ModalWindow");
SYNO.SDS.ModalWindow = Ext.extend(SYNO.SDS.BaseWindow, {
    ownerMasked: false,
    constructor: function(a) {
        a = Ext.apply({
            useStatusBar: true,
            closable: false,
            maximizable: false,
            minimizable: false,
            modal: !a.owner
        }, a);
        SYNO.SDS.ModalWindow.superclass.constructor.call(this, a)
    },
    afterRender: function() {
        var d, b, a, c;
        if (SYNO.SDS.Desktop) {
            d = SYNO.SDS.Desktop.getEl().getHeight()
        } else {
            d = Ext.lib.Dom.getViewHeight()
        }
        SYNO.SDS.ModalWindow.superclass.afterRender.apply(this, arguments);
        this.alignTo(this.owner ? this.owner.el : document.body, "c-c");
        b = this.el.getHeight();
        a = this.el.getTop();
        if (a + b > d) {
            c = d - b - 20;
            this.el.setTop.defer(100, this.el, [(c > 0 ? c : 0)])
        }
        if ("emphasized" === this.popupStyle) {
            this.el.addClass("syno-em-window")
        }
    },
    isModalized: function() {
        return true
    },
    hideFromOwner: function() {
        if (this.owner) {
            var a = (this.sinkable) ? "sinkModalWin" : "modalWin";
            if (Ext.isArray(this.owner[a])) {
                this.owner[a].remove(this)
            }
            if (this.ownerMasked) {
                this.owner.unmask(true);
                this.ownerMasked = false
            }
            return true
        }
        return false
    },
    afterShow: function() {
        SYNO.SDS.ModalWindow.superclass.afterShow.apply(this, arguments);
        if (this.owner && this.sinkable) {
            this.owner.sinkModalWin.push(this)
        } else {
            if (!this.ownerMasked && this.owner) {
                this.owner.modalWin.push(this);
                this.owner.mask(0, null, null, true);
                this.ownerMasked = true
            }
        }
    },
    afterHide: function() {
        SYNO.SDS.ModalWindow.superclass.afterHide.apply(this, arguments);
        if (!this.hideForMinimize) {
            this.hideFromOwner()
        }
    },
    onBeforeDestroy: function() {
        if (this.hideFromOwner()) {
            this.owner = null
        }
        SYNO.SDS.ModalWindow.superclass.onBeforeDestroy.apply(this, arguments)
    },
    onMinimize: function() {
        this.hide();
        SYNO.SDS.ModalWindow.superclass.onMinimize.apply(this, arguments)
    },
    onWindowClose: function() {
        if (this.owner) {
            this.owner.focus()
        } else {
            Ext.get("sds-taskbar-startbutton").child("button").focus()
        }
    }
});
Ext.namespace("SYNO.SDS.AppWindow");
Ext.define("SYNO.SDS.FullScreenToolbar", {
    extend: "Ext.Container",
    constructor: function(a) {
        if (!a.appWin || !(a.appWin instanceof SYNO.SDS.AppWindow)) {
            SYNO.Debug.error("Need to add appWin in config!");
            return
        }
        this.offsetX = (a && a.offset) ? a.offset[0] : 0;
        this.offsetY = (a && a.offset) ? a.offset[1] : 0;
        this.callParent([this.fillConfig(a)])
    },
    fillConfig: function(a) {
        this.contentBox = new Ext.BoxComponent({
            cls: "syno-sds-fullscreen-toolbar-content-container"
        });
        var b = {
            hideMode: "offset",
            cls: "syno-sds-fullscreen-toolbar",
            renderTo: SYNO.SDS.Desktop.id,
            items: [this.contentBox]
        };
        return Ext.apply(b, a)
    },
    adjustPos: function() {
        var a = "tl",
            c = [_S("standalone") ? 10 : 0, _S("standalone") ? 10 : 0],
            d = this.appWin.fsHandler,
            b = this.el.parent();
        if (d) {
            b = d.el;
            a = "br";
            c[0] -= this.el.getWidth()
        } else {
            if (this.dir === "b") {
                a = "bl";
                c[1] -= (_S("standalone")) ? (this.el.getHeight() + 10) : this.el.getHeight()
            } else {
                if (this.dir === "r") {
                    a = "tr";
                    c[0] -= (_S("standalone")) ? (this.el.getWidth() + 10) : this.el.getWidth()
                }
            }
        }
        c[0] += this.offsetX;
        c[1] += this.offsetY;
        this.el.alignTo(b, a, c);
        this.el.applyStyles({
            zIndex: parseInt(this.appWin.el.getStyle("zIndex"), 10) + 1
        })
    },
    cancleHideTask: function() {
        if (!this.hideTask) {
            this.hideTask = new Ext.util.DelayedTask(this.hide, this)
        }
        this.hideTask.delay(2000)
    },
    show: function(b, a) {
        this.cancleHideTask();
        this.adjustPos();
        if (!this.el.hasClass("dissolve-in")) {
            this.removeClass("dissolve-out");
            this.addClass("dissolve-in")
        }
    },
    hide: function(a) {
        if (a) {
            Ext.each(this.contentBox.el.dom.childNodes, function(c) {
                var b = Ext.get(c);
                b.orgParent.appendChild(b)
            });
            this.removeParentClsFromContentBox();
            this.callParent();
            return
        }
        if (this.el.hasClass("dissolve-in")) {
            this.removeClass("dissolve-in");
            this.addClass("dissolve-out")
        }
        if (this.hideTask) {
            this.hideTask = null
        }
    },
    addParentClsToContentBox: function(a) {
        if (Ext.isArray(a)) {
            Ext.each(a, this.addParentClsToContentBox, this)
        } else {
            if (Ext.isString(a)) {
                this.contentBox.addClass(a);
                if (!this.contentBox.addedCls) {
                    this.contentBox.addedCls = []
                }
                this.contentBox.addedCls.push(a)
            }
        }
    },
    removeParentClsFromContentBox: function() {
        if (!this.contentBox.addedCls) {
            return
        }
        this.contentBox.addedCls.each(function(a) {
            this.contentBox.removeClass(a)
        }, this)
    },
    addElements: function(a) {
        if (Ext.isArray(a)) {
            Ext.each(a, this.addElements, this)
        } else {
            if (Ext.isObject(a)) {
                if (a instanceof Ext.Element) {
                    a.orgParent = a.parent();
                    this.contentBox.el.appendChild(a)
                }
            }
        }
    }
});
Ext.define("SYNO.SDS.AppWindow", {
    extend: "SYNO.SDS.BaseWindow",
    initialized: false,
    taskButton: null,
    ariaRole: "application",
    constructor: function(d) {
        var e;
        d = Ext.apply({}, d, {
            useStatusBar: Ext.isDefined(d.buttons),
            showHelp: true,
            toggleFullScreen: false
        });
        d = Ext.apply(d, {
            title: null,
            iconCls: "x-panel-icon",
            openConfig: {
                dsm_version: _S("majorversion") + "." + _S("minorversion")
            }
        });
        if (!_S("standalone") && d.appInstance && true !== d.fromRestore && false !== d.autoRestoreSizePos) {
            Ext.apply(d, this.getRestoreSizePos(d))
        }
        d = this.adjustPageXY(d);
        if (!_S("standalone") && d.showHelp) {
            if (!Ext.isArray(d.tools)) {
                d.tools = []
            }
            d.tools.push({
                id: "help",
                text: _T("common", "alt_help"),
                scope: this,
                handler: this.onClickHelp
            })
        }
        if (d.toggleFullScreen && SYNO.SDS.UIFeatures.test("isSupportFullScreen")) {
            this.isFullScreen = false;
            if (!Ext.isArray(d.tools)) {
                d.tools = []
            }
            d.tools.push({
                id: "fullscreen",
                text: _T("personal_settings", "menu_style_fullscreen"),
                scope: this,
                handler: this.onClickFullScrren
            })
        }
        e = Ext.isDefined(d.maximizable) ? d.maximizable : true;
        var c = d.appInstance ? d.appInstance.blMainApp : false;
        if (_S("standalone")) {
            if (c) {
                Ext.apply(d, {
                    maximizable: false,
                    maximized: e,
                    closable: false,
                    modal: false
                });
                d.cls = (d.cls || "") + (this.cls || "") + " sds-standalone-main-window";
                document.title = d.title || document.title
            } else {
                Ext.apply(d, {
                    maximizable: false,
                    maximized: false,
                    closable: true,
                    modal: true
                });
                if (e) {
                    var b = 10,
                        a = 10;
                    Ext.EventManager.onWindowResize(this.onModalWindowResize, this);
                    Ext.apply(d, {
                        x: b,
                        y: a,
                        width: Ext.lib.Dom.getViewWidth() - b * 2,
                        height: Ext.lib.Dom.getViewHeight() - a * 2
                    })
                }
            }
            Ext.apply(d, {
                resizable: false,
                draggable: false,
                minimizable: false
            })
        }
        if ((_S("isMobile") || Ext.isIE10Touch) && e) {
            Ext.apply(d, {
                maximized: true
            })
        }
        d = this.overwriteAppWinConfig(d);
        SYNO.SDS.AppWindow.superclass.constructor.call(this, d);
        if (!d.maximized) {
            if (_S("standalone")) {
                this.anchorTo(this.container, "c-c")
            }
            if ((_S("isMobile") || Ext.isIE10Touch)) {
                this.anchorTo(this.container, "t-t")
            }
        }
        this.mon(this, "move", this.saveRestoreData, this);
        this.mon(this, "resize", this.saveRestoreData, this);
        if (d.toggleFullScreen) {
            this.bindFullScreenEvents()
        }
        if (_S("standalone") && c) {
            SYNO.SDS.Utils.addFavIconLink(this.getSmallIcon(true), "image/png");
            this.mon(this, "titlechange", function() {
                document.title = this.title || document.title
            }, this)
        }
        if (this.splitWindow === true) {
            this.addClass("x-window-split")
        }
    },
    bindFullScreenEvents: function() {
        if (document.fullscreenEnabled) {
            document.addEventListener("fullscreenchange", this.handleFSChange.createDelegate(this), false)
        } else {
            if (document.webkitFullscreenEnabled) {
                document.addEventListener("webkitfullscreenchange", this.handleFSChange.createDelegate(this), false)
            } else {
                if (document.mozFullScreenEnabled) {
                    document.addEventListener("mozfullscreenchange", this.handleFSChange.createDelegate(this), false)
                } else {
                    if (document.msFullscreenEnabled) {
                        document.addEventListener("MSFullscreenChange", this.handleFSChange.createDelegate(this), false)
                    }
                }
            }
        }
    },
    isAlwaysOnTop: function() {
        if (this.toggleFullScreen === true && this.isFullScreen === true) {
            return true
        }
    },
    handleFSChange: function() {
        if (!this.isFullScreen) {
            return
        }
        if (SYNO.SDS.UIFeatures.isFullScreenMode()) {
            if (this.fireEvent("beforeenablefullscreen") === false) {
                return
            }
            if (!_S("standalone")) {
                SYNO.SDS.TaskBar.hide();
                Ext.get("sds-taskbar-shadow").setStyle({
                    display: "none"
                });
                SYNO.SDS.Desktop.el.setStyle({
                    top: "0px",
                    zIndex: 0,
                    height: window.screen.height + "px"
                });
                this.lastStateMaximized = this.maximized;
                if (!this.lastStateMaximized) {
                    this.toggleMaximize()
                }
            }
            this.hideTools();
            this.fireEvent("windowfullscreenenabled")
        } else {
            if (this.fireEvent("beforedisablefullscreen") === false) {
                return
            }
            this.isFullScreen = false;
            this.showTools();
            if (!_S("standalone")) {
                if (!this.lastStateMaximized) {
                    this.toggleMaximize()
                }
                SYNO.SDS.Desktop.el.setStyle({
                    top: "39px",
                    zIndex: "",
                    height: Ext.getBody().getHeight() + "px"
                });
                SYNO.SDS.TaskBar.show();
                Ext.get("sds-taskbar-shadow").setStyle({
                    display: "block"
                })
            }
            this.fireEvent("windowfullscreendisabled")
        }
        SYNO.SDS.WindowMgr.orderWindows()
    },
    showFSToolbar: function() {
        this.fsToolbar.show()
    },
    initFSToolbar: function(e, c, b, a, d) {
        c = c || "t";
        if (!this.fsToolbar) {
            this.fsToolbar = new SYNO.SDS.FullScreenToolbar({
                appWin: this,
                dir: c,
                offset: d
            })
        }
        if (e) {
            this.fsToolbar.addElements(e, b)
        }
        if (b) {
            this.fsToolbar.addParentClsToContentBox(b)
        }
        if (a === true) {
            this.fsToolbar.show()
        }
        this.el.on("mousemove", this.showFSToolbar, this);
        this.el.on("click", this.showFSToolbar, this)
    },
    destroyFSToolbar: function(a) {
        this.el.un("mousemove", this.showFSToolbar, this);
        this.el.un("click", this.showFSToolbar, this);
        if (this.fsToolbar) {
            this.fsToolbar.hide(!a)
        }
    },
    overwriteAppWinConfig: function(a) {
        return a
    },
    genIndPortHeader: function() {
        var c = this.el.createChild({
            tag: "div",
            cls: "sds-standalone-main-window-header"
        }, this.header.dom);
        var b = false === this.showHelp;
        var a = new Ext.Toolbar({
            renderTo: c,
            height: 30,
            toolbarCls: "sds-standalone-main-window-header-toolbar",
            items: [{
                cls: "sds-standalone-welcome-text",
                xtype: "syno_displayfield",
                htmlEncode: false,
                tabIndex: -1,
                hideLabel: true,
                value: _T("common", "welcome") + "&nbsp;<b>" + _S("user") + "</b>",
                hidden: !_S("rewrite_mode")
            }, {
                xtype: "syno_button",
                cls: "sds-standalone-logout",
                iconCls: "sds-standalone-logout-icon",
                text: _T("common", "logout"),
                scope: this,
                hidden: !_S("rewrite_mode") || b,
                handler: function() {
                    SYNO.SDS.StatusNotifier.fireEvent("logout");
                    window.onbeforeunload = SYNO.SDS.onBasicBeforeUnload;
                    try {
                        SYNO.SDS.Utils.Logout.action()
                    } catch (d) {}
                }
            }, {
                xtype: "syno_button",
                cls: "sds-standalone-help",
                iconCls: "sds-standalone-help-icon",
                text: _T("common", "alt_help"),
                hidden: b,
                scope: this,
                handler: this.onClickHelp
            }],
            listeners: {
                scope: this,
                single: true,
                buffer: 80,
                afterlayout: function() {
                    var d = 0;
                    a.items.each(function(e) {
                        if (true !== e.hidden) {
                            d += e.getOuterSize().width
                        }
                    });
                    d += 2;
                    c.setWidth(d)
                }
            }
        })
    },
    afterRender: function() {
        SYNO.SDS.AppWindow.superclass.afterRender.apply(this, arguments);
        var a;
        if (_S("standalone")) {
            this.alignTo(document.body, "c-c");
            if (_S("remove_banner") === "true" && this.appInstance && this.appInstance.blMainApp) {
                this.toggleMaximize();
                this.header.setVisibilityMode(Ext.Element.DISPLAY);
                this.header.hide();
                a = this.el.first("div.x-window-tl");
                if (a) {
                    a.setStyle({
                        "padding-top": "8px"
                    })
                }
                this.toggleMaximize()
            }
        }
        if (this.isStandaloneMainWindow()) {
            this.header.dom.innerHTML = '<div class="sds-standalone-main-window-header-text">' + this.header.dom.innerHTML + "</div>";
            if (_S("remove_banner") !== "true") {
                this.genIndPortHeader()
            }
        }
    },
    destroy: function() {
        if (_S("standalone")) {
            Ext.EventManager.removeResizeListener(this.onModalWindowResize, this)
        }
        if (this.aboutWindow) {
            this.aboutWindow.destroy()
        }
        SYNO.SDS.AppWindow.superclass.destroy.apply(this, arguments)
    },
    onModalWindowResize: function() {
        var b = 10,
            a = 10;
        this.setPosition(b, a);
        this.setSize(Ext.lib.Dom.getViewWidth() - b * 2, Ext.lib.Dom.getViewHeight() - a * 2)
    },
    isStandaloneMainWindow: function() {
        return (_S("standalone") && this.appInstance && this.appInstance.blMainApp)
    },
    getSmallIcon: function(b) {
        var c = this.jsConfig.jsBaseURL + "/" + (this.jsConfig.icon || this.jsConfig.icon_16);
        var d = this.isStandaloneMainWindow();
        var a;
        if (b) {
            a = "FavHeader"
        } else {
            if (d) {
                a = "StandaloneHeader"
            } else {
                if (this.isV5Style()) {
                    a = "Header"
                } else {
                    a = "HeaderV4"
                }
            }
        }
        return SYNO.SDS.UIFeatures.IconSizeManager.getIconPath(c, a)
    },
    init: function() {
        if (this.initialized) {
            return
        }
        if (this.toggleMinimizable !== false) {
            this.setIcon(this.getSmallIcon())
        }
        if (!_S("standalone") && this.toggleMinimizable !== false) {
            this.taskButton = this.appInstance.taskButton || SYNO.SDS.TaskButtons.add(this.appInstance.jsConfig.jsID, this.jsConfig.jsID);
            this.taskButton.init(this);
            this.taskButton.setState("loading");
            this.taskButton.setLoading(false);
            this.addManagedComponent(this.taskButton)
        }
        this.setTitle(SYNO.SDS.Utils.GetLocalizedString(this.getTitle(), this.jsConfig.jsID));
        this.initialized = true
    },
    onBeforeDestroy: function() {
        SYNO.SDS.AppWindow.superclass.onBeforeDestroy.apply(this, arguments);
        this.taskButton = null
    },
    showAboutWindow: function() {
        if (!this.aboutWindow) {
            this.aboutWindow = new SYNO.SDS.AboutWindow({
                owner: this,
                aboutHeader: this.aboutHeader,
                pkgColor: this.aboutTitleColor || "#0086E5"
            })
        }
        this.aboutWindow.show()
    },
    hideAboutWindow: function() {
        if (this.aboutWindow) {
            this.aboutWindow.hide()
        }
    },
    showTools: function() {
        var a, b = this.maximized;
        for (a in this.tools) {
            if (this.tools.hasOwnProperty(a)) {
                if ((!this.maximizable && a === "maximize") || (!this.maximizable && a === "restore") || (b && a === "maximize") || (!b && a === "restore")) {
                    continue
                }
                if (a == "fullscreen") {
                    this.tools[a].removeClass("collapse")
                }
                this.tools[a].show()
            }
        }
    },
    hideTools: function() {
        var a;
        for (a in this.tools) {
            if (this.tools.hasOwnProperty(a)) {
                if (a === "fullscreen") {
                    this.tools[a].addClass("collapse");
                    continue
                }
                this.tools[a].hide()
            }
        }
    },
    onClickFullScrren: function() {
        var a = SYNO.SDS.Desktop.el.dom;
        if (!SYNO.SDS.UIFeatures.isFullScreenMode()) {
            this.isFullScreen = true;
            if (a.requestFullscreen) {
                a.requestFullscreen()
            } else {
                if (a.msRequestFullscreen) {
                    a.msRequestFullscreen()
                } else {
                    if (a.mozRequestFullScreen) {
                        a.mozRequestFullScreen()
                    } else {
                        if (a.webkitRequestFullscreen) {
                            a.webkitRequestFullscreen()
                        }
                    }
                }
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else {
                if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                } else {
                    if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen()
                    } else {
                        if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen()
                        }
                    }
                }
            }
        }
    },
    onClickHelp: function() {
        var a = this.appInstance ? this.appInstance.jsConfig.jsID : this.jsConfig.jsID,
            b = this.getHelpParam();
        if (Ext.isString(b) && b.length) {
            a += ":" + b
        }
        if (_S("standalone")) {
            SYNO.SDS.WindowLaunch("SYNO.SDS.HelpBrowser.Application", {
                topic: a
            })
        } else {
            SYNO.SDS.AppLaunch("SYNO.SDS.HelpBrowser.Application", {
                topic: a
            }, false)
        }
    },
    getHelpParam: Ext.emptyFn,
    setTitle: function(d, a, b) {
        SYNO.SDS.AppWindow.superclass.setTitle.apply(this, arguments);
        if (this.taskButton) {
            var c = (b !== false) ? Ext.util.Format.htmlEncode(d) : d;
            this.taskButton.setTooltip(c)
        }
    },
    getTitle: function() {
        return this.title || this.jsConfig.title
    },
    updateTaskButton: function(a) {
        if (!this.taskButton) {
            return
        }
        this.taskButton.updateContextMenu(a)
    },
    restore: function() {
        if (this.isFullScreen === true) {
            return
        }
        SYNO.SDS.AppWindow.superclass.restore.call(this)
    },
    onHeaderContextMenu: function(a) {
        if (this.isFullScreen === true) {
            return
        }
        SYNO.SDS.AppWindow.superclass.onHeaderContextMenu.apply(this, arguments);
        if (!_S("standalone")) {
            this.taskButton.getContextMenu(false).showAt(a.getXY())
        }
    },
    onMaximize: function() {
        SYNO.SDS.AppWindow.superclass.onMaximize.apply(this, arguments);
        this.updateTaskButton("maximize")
    },
    onMinimize: function() {
        if (_S("standalone")) {
            return
        }
        if (this.minimizable) {
            this.hide((Ext.isIE9m && !Ext.isIE9) ? undefined : this.taskButton.el)
        } else {
            this.el.frame()
        }
        SYNO.SDS.AppWindow.superclass.onMinimize.apply(this, arguments);
        this.updateTaskButton("minimize")
    },
    onRestore: function() {
        SYNO.SDS.AppWindow.superclass.onRestore.apply(this, arguments);
        this.updateTaskButton("restore")
    },
    mask: function() {
        SYNO.SDS.AppWindow.superclass.mask.apply(this, arguments);
        this.updateTaskButton("mask")
    },
    unmask: function() {
        SYNO.SDS.AppWindow.superclass.unmask.apply(this, arguments);
        this.updateTaskButton("unmask")
    },
    saveRestoreData: function() {
        var a = Ext.apply(this.getSizeAndPosition(), {
            fromRestore: true
        });
        this.appInstance.setUserSettings("restoreSizePos", a)
    },
    adjustPageXY: function(a) {
        if (!a) {
            return {}
        }
        if (Ext.isDefined(a.pageX) && a.pageX < 0) {
            a.pageX = 0
        }
        if (Ext.isDefined(a.pageY) && a.pageY < 0) {
            a.pageY = 0
        }
        if (Ext.isDefined(a.x) && a.x < 0) {
            a.x = 0
        }
        if (Ext.isDefined(a.y) && a.y < 0) {
            a.y = 0
        }
        return a
    },
    getRestoreSizePos: function(a) {
        var b = a.appInstance.getUserSettings("restoreSizePos") || {};
        if (Ext.isDefined(a.minWidth) && Ext.isDefined(b.width) && b.width < a.minWidth) {
            b.width = a.width
        }
        if (Ext.isDefined(a.minHeight) && Ext.isDefined(b.height) && b.height < a.minHeight) {
            b.height = a.height
        }
        return b
    },
    onOpen: function(b) {
        var a;
        if (!this.initialized) {
            this.init()
        }
        if (Ext.isObject(b)) {
            for (a in b) {
                if (b.hasOwnProperty(a)) {
                    this.setOpenConfig(a, b[a])
                }
            }
            if (b.title) {
                this.setTitle(b.title)
            }
            SYNO.API.Info.Update(this)
        }
        if (!this.appInstance.skipRecord) {
            this.recordAppOpened()
        }
        SYNO.SDS.AppWindow.superclass.onOpen.apply(this, arguments)
    },
    recordAppOpened: function() {
        if (this.appInstance.appWindowName) {
            this.sendWebAPI({
                api: "SYNO.Core.DataCollect.Application",
                version: 1,
                method: "record",
                params: {
                    app: this.appInstance.appWindowName
                },
                scope: this
            })
        }
    },
    onShow: function() {
        SYNO.SDS.AppWindow.superclass.onShow.apply(this, arguments);
        this.updateTaskButton("restore")
    },
    checkModalOrMask: function() {
        if ((this.modalWin && this.modalWin.length > 0) || (this.maskCnt > 0)) {
            this.blinkModalChild();
            return true
        }
        return false
    },
    setMaskMsgVisible: function(b) {
        if (!this.el.isMasked()) {
            return
        }
        var a = Ext.Element.data(this.el, "maskMsg");
        if (a && a.dom) {
            a.setVisibilityMode(Ext.Element.VISIBILITY);
            a.setVisible(b)
        }
    },
    setMaskOpacity: function(a) {
        SYNO.SDS.AppWindow.superclass.setMaskOpacity.call(this, a);
        this.setMaskMsgVisible(a !== 0)
    },
    delayedMask: function(b, a, d, c) {
        a = a || 200;
        if (!this.maskTask) {
            this.maskTask = new Ext.util.DelayedTask(this.setMaskOpacity, this, [b])
        }
        this.mask(0, d, c);
        this.setMaskMsgVisible(false);
        this.maskTask.delay(a)
    },
    setStatusBusy: function(c, b, a) {
        c = c || {};
        Ext.applyIf(c, {
            text: _T("common", "loading"),
            iconCls: "x-mask-loading"
        });
        b = b || 0.4;
        a = a || 400;
        this.delayedMask(b, a, c.text, c.iconCls);
        this.canClose = false
    },
    clearStatusBusy: function(a) {
        this.unmask();
        this.canClose = true
    },
    onClose: function() {
        if (this.isStandaloneMainWindow() || this.canClose === false) {
            return false
        }
        this.callParent()
    },
    doConstrain: function() {
        var b, a, c;
        if (this.constrainHeader) {
            a = this.getSize();
            b = {
                left: -(a.width - 100),
                right: -(a.width - 100),
                bottom: -(a.height - 25)
            };
            c = this.el.getConstrainToXY(this.container, true, b);
            if (c) {
                if (c[0] < 0 && (c[0] + a.width) < this.container.getWidth()) {} else {
                    this.setPosition(c[0], c[1])
                }
            }
        }
    },
    getOpenConfig: function(a) {
        if (!Ext.isString(a) || Ext.isEmpty(this.openConfig[a])) {
            return
        }
        return this.openConfig[a]
    },
    setOpenConfig: function(a, b) {
        if (!Ext.isString(a) || Ext.isEmpty(a)) {
            return
        }
        this.openConfig[a] = b
    },
    hasOpenConfig: function(a) {
        if (!Ext.isString(a) || Ext.isEmpty(a)) {
            return false
        }
        if (undefined === this.openConfig[a]) {
            return false
        } else {
            return true
        }
    }
});
Ext.namespace("SYNO.SDS.LegacyAppWindow");
SYNO.SDS.LegacyAppWindow = Ext.extend(SYNO.SDS.AppWindow, {
    iframeId: "",
    url: Ext.SSL_SECURE_URL,
    constructor: function(a) {
        this.iframeId = Ext.id();
        SYNO.SDS.LegacyAppWindow.superclass.constructor.call(this, Ext.apply({
            width: this.jsConfig.width || 800,
            height: this.jsConfig.height || 600,
            html: String.format('<iframe id="{0}" src="{1}" frameborder="0" style="border: 0px none; width: 100%; height: 100%;"></iframe>', this.iframeId, Ext.SSL_SECURE_URL)
        }, a));
        this.setURL(this.url)
    },
    onActivate: function() {
        SYNO.SDS.LegacyAppWindow.superclass.onActivate.apply(this, arguments);
        this.unmaskBody()
    },
    onDeactivate: function() {
        SYNO.SDS.LegacyAppWindow.superclass.onDeactivate.apply(this, arguments);
        this.maskBody()
    },
    setURL: function(a) {
        Ext.getDom(this.iframeId).src = a
    },
    getURL: function() {
        return Ext.getDom(this.iframeId).src
    },
    maskBody: function() {
        var a = this.body.mask();
        a.setOpacity(0);
        this.mon(a, "mousedown", this.toFront, this)
    },
    unmaskBody: function() {
        var a = Ext.Element.data(this.body, "mask");
        if (a) {
            this.mun(a, "mousedown", this.toFront, this);
            this.body.unmask()
        }
    }
});
Ext.namespace("SYNO.SDS.TrayItem");
SYNO.SDS.BaseTrayItem = Ext.extend(Ext.Component, {
    appInstance: null,
    constructor: function() {
        SYNO.SDS.BaseTrayItem.superclass.constructor.apply(this, arguments)
    },
    onClose: Ext.emptyFn,
    onClick: Ext.emptyFn,
    onDblClick: Ext.emptyFn,
    onContextMenu: Ext.emptyFn,
    beforeDestroy: function() {
        this.onBeforeDestroy();
        SYNO.SDS.BaseTrayItem.superclass.beforeDestroy.apply(this, arguments)
    },
    onBeforeDestroy: function() {
        if (this.appInstance) {
            this.appInstance.removeInstance(this)
        }
    }
});
SYNO.SDS.TrayItem = Ext.extend(SYNO.SDS.BaseTrayItem, {
    msgBox: null,
    constructor: function() {
        SYNO.SDS.TrayItem.superclass.constructor.apply(this, arguments)
    },
    getMsgBox: function() {
        function a(c, b) {
            return function() {
                return b.apply(c, arguments)
            }
        }
        if (!this.msgBox || this.msgBox.isDestroyed) {
            this.msgBox = new SYNO.SDS.MessageBoxV5({});
            this.msgBoxWrapper = {
                show: a(this.msgBox, this.msgBox.showMsg),
                hide: a(this.msgBox, this.msgBox.doClose),
                progress: a(this.msgBox, this.msgBox.progress),
                wait: a(this.msgBox, this.msgBox.wait),
                alert: a(this.msgBox, this.msgBox.alert),
                confirm: a(this.msgBox, this.msgBox.confirm),
                prompt: a(this.msgBox, this.msgBox.prompt),
                getDialog: (function() {
                    return this
                }).createDelegate(this.msgBox),
                isVisible: a(this.msgBox, this.msgBox.isVisible),
                setIcon: a(this.msgBox, this.msgBox.setIconClass),
                updateProgress: a(this.msgBox, this.msgBox.updateProgress),
                updateText: a(this.msgBox, this.msgBox.updateText)
            }
        }
        return this.msgBoxWrapper
    }
});
Ext.namespace("SYNO.SDS.AppTrayItem");
SYNO.SDS.AppTrayItem = Ext.extend(SYNO.SDS.TrayItem, {
    taskButton: null,
    constructor: function(a) {
        var b = this.jsConfig.iconCls !== undefined ? this.jsConfig.iconCls : null;
        this.taskButton = SYNO.SDS.SystemTray.add(this, {});
        this.addManagedComponent(this.taskButton);
        SYNO.SDS.AppTrayItem.superclass.constructor.apply(this, arguments);
        if (b) {
            this.taskButton.setIconClass(b)
        }
        this.setTitle(SYNO.SDS.Utils.GetLocalizedString(this.jsConfig.title, this.jsConfig.jsID))
    },
    onBeforeDestroy: function() {
        this.taskButton = null;
        SYNO.SDS.AppTrayItem.superclass.onBeforeDestroy.apply(this, arguments)
    },
    setIconClass: function(a) {
        this.taskButton.setIconClass(a)
    },
    setTitle: function(a) {
        this.taskButton.setTooltip(a);
        this.taskButton.btnEl.setARIA({
            label: a,
            role: "button",
            tabindex: -1
        })
    },
    setTaskButtonVisible: function(b) {
        var a = this.taskButton.isVisible();
        if (a !== b) {
            this.taskButton.setVisible(b)
        }
    },
    open: Ext.emptyFn,
    request: Ext.emptyFn,
    getTaskBarBtnId: Ext.emptyFn
});
Ext.define("SYNO.SDS.Tray.ArrowTray", {
    extend: "SYNO.SDS.AppTrayItem",
    arrowCls: "sds-tray-panel-arrow",
    arrowAlignPosition: "t-b",
    arrowToPanelAlignPosition: "b-t",
    constructor: function(a) {
        var b = this;
        b.callParent(arguments);
        b.taskButton.hide();
        b.panel = b.initPanel();
        b.addManagedComponent(b.panel);
        b.mon(Ext.getDoc(), "mousedown", b.onMouseDown, b);
        b.mon(b.panel, "beforeshow", b.onPanelBeforeShow, b)
    },
    initPanel: function() {},
    onPanelBeforeShow: function() {
        var a = this;
        if (!a.panelArrow) {
            a.panelArrow = a.panel.el.createChild({
                tag: "div",
                cls: a.arrowCls
            })
        }
        if (a.panel) {
            a.panelArrow.anchorTo(a.panel.el, a.arrowToPanelAlignPosition, [0, 0])
        }
    },
    containElement: function(a, b) {
        return a[0] <= b[0] && a[1] <= b[1]
    },
    onClose: function() {
        var a = this;
        if (a.panel.isVisible()) {
            a.panel.hide()
        }
    },
    onMouseDown: function(b) {
        var a = this;
        if (b.within(a.taskButton.el)) {
            return
        }
        if (a.panel && a.panel.isVisible() && !b.within(a.panel.el)) {
            a.taskButton.toggle(false);
            a.panel.hide()
        }
    },
    onClick: function() {
        var a = this;
        if (a.panel.isVisible()) {
            a.taskButton.toggle(false);
            a.panel.hide()
        } else {
            a.panel.show();
            a.panel.el.anchorTo(a.taskButton.el, a.arrowAlignPosition, [0, 11])
        }
    }
});
Ext.define("SYNO.SDS.Tray.Panel", {
    extend: "Ext.Panel",
    constructor: function(a) {
        var b = this;
        a = a || {};
        a = Ext.apply({
            hidden: true,
            floating: true,
            shadow: false,
            renderTo: document.body
        }, a);
        a.cls = a.cls ? a.cls + " sds-tray-panel" : " sds-tray-panel";
        b.callParent([a])
    },
    destroy: function() {
        var a = this;
        a.getEl().removeAnchor();
        a.callParent(arguments)
    }
});
Ext.namespace("SYNO.SDS.MessageBox");
SYNO.SDS.MessageBox = Ext.extend(SYNO.SDS.ModalWindow, {
    buttonNames: ["ok", "yes", "no", "cancel"],
    buttonWidth: 0,
    maxWidth: 600,
    minWidth: 300,
    minProgressWidth: 250,
    minPromptWidth: 250,
    emptyText: "&#160;",
    defaultTextHeight: 75,
    mbIconCls: "",
    fbButtons: null,
    opt: null,
    bodyEl: null,
    iconEl: null,
    msgEl: null,
    textboxEl: null,
    textareaEl: null,
    progressBar: null,
    activeTextEl: null,
    passwordEl: null,
    constructor: function(a) {
        this.opt = {};
        this.buttonText = Ext.MessageBox.buttonText;
        this.dsmStyle = a.dsmStyle;
        a = a || {};
        a.cls = (a.cls) ? a.cls + " x-window-dlg" : "x-window-dlg";
        SYNO.SDS.MessageBox.superclass.constructor.call(this, Ext.apply({
            resizable: false,
            minimizable: false,
            maximizable: false,
            closable: true,
            stateful: false,
            buttonAlign: "center",
            width: 400,
            height: 100,
            footer: true,
            fbar: new Ext.Toolbar({
                items: this.getButtons(a),
                enableOverflow: false
            })
        }, a))
    },
    getButtons: function(a) {
        var b = [];
        this.fbButtons = {};
        Ext.each(this.buttonNames, function(c) {
            b.push(this.fbButtons[c] = new Ext.Button({
                hideModE: "offset",
                text: this.buttonText[c],
                handler: this.handleButton.createDelegate(this, [c])
            }))
        }, this);
        return b
    },
    close: function() {
        if (this.opt.canClose === false) {
            return
        }
        if (this.opt.buttons && this.opt.buttons.no && !this.opt.buttons.cancel) {
            this.handleButton("no", "close")
        } else {
            this.handleButton("cancel", "close")
        }
    },
    doClose: function() {
        if (this.activeGhost) {
            var a = Ext.dd.DragDropMgr;
            if (this.dd === a.dragCurrent) {
                a.dragCurrent = null;
                a.dragOvers = {}
            }
            this.unghost(false, false)
        }
        SYNO.SDS.MessageBox.superclass.doClose.apply(this, arguments)
    },
    onRender: function() {
        SYNO.SDS.MessageBox.superclass.onRender.apply(this, arguments);
        var a = Ext.id();
        this.bodyEl = this.body.createChild({
            html: '<div class="ext-mb-icon"></div><div class="ext-mb-content"><span class="ext-mb-text" id=' + a + '></span><br /><div class="ext-mb-fix-cursor"><input type="text" class="ext-mb-input" /><textarea class="ext-mb-textarea"></textarea><input type="password" class="ext-mb-input" /></div></div>'
        });
        this.iconEl = Ext.get(this.bodyEl.dom.childNodes[0]);
        this.msgEl = Ext.get(this.bodyEl.dom.childNodes[1].childNodes[0]);
        this.textboxEl = Ext.get(this.bodyEl.dom.childNodes[1].childNodes[2].childNodes[0]);
        this.textareaEl = Ext.get(this.bodyEl.dom.childNodes[1].childNodes[2].childNodes[1]);
        this.passwordEl = Ext.get(this.bodyEl.dom.childNodes[1].childNodes[2].childNodes[2]);
        this.progressBar = new Ext.ProgressBar({
            renderTo: this.bodyEl
        });
        this.focusEl.set({
            "aria-labelledby": this.msgEl.id
        });
        this.focusEl.dom.removeAttribute("aria-label");
        this.bodyEl.createChild({
            cls: "x-clear"
        });
        this.textboxEl.enableDisplayMode();
        this.textareaEl.enableDisplayMode();
        this.passwordEl.enableDisplayMode();
        this.textboxEl.addKeyListener(Ext.EventObject.ENTER, this.handleButton.createDelegate(this, ["ok"]));
        this.textareaEl.addKeyListener(Ext.EventObject.ENTER, this.handleButton.createDelegate(this, ["ok"]));
        this.passwordEl.addKeyListener(Ext.EventObject.ENTER, this.handleButton.createDelegate(this, ["ok"]));
        this.addManagedComponent(this.progressBar)
    },
    showMsg: function(a) {
        this.opt = a;
        this.setTitle(a.title || this.emptyText);
        if (this.tools.close) {
            this.tools.close.setDisplayed(a.closable !== false && a.progress !== true && a.wait !== true)
        }
        this.activeTextEl = this.textboxEl;
        a.prompt = a.prompt || (a.multiline ? true : false);
        if (a.prompt) {
            if (a.multiline) {
                this.textboxEl.hide();
                this.textareaEl.show();
                this.textareaEl.setHeight(Ext.isNumber(a.multiline) ? a.multiline : this.defaultTextHeight);
                this.activeTextEl = this.textareaEl;
                this.passwordEl.hide()
            } else {
                if (a.password) {
                    this.textboxEl.hide();
                    this.textareaEl.hide();
                    this.activeTextEl = this.passwordEl;
                    this.passwordEl.show()
                } else {
                    this.textboxEl.show();
                    this.textareaEl.hide();
                    this.passwordEl.hide()
                }
            }
        } else {
            this.textboxEl.hide();
            this.textareaEl.hide();
            this.passwordEl.hide()
        }
        this.activeTextEl.dom.value = a.value || "";
        this.setIconClass(Ext.isDefined(a.icon) ? a.icon : null);
        this.buttonWidth = this.updateButtons(a.buttons);
        this.progressBar.setVisible(true === a.progress || true === a.wait);
        this.updateProgress(0, a.progressText);
        this.updateText(a.msg);
        if (a.wait) {
            this.progressBar.wait(a.waitConfig)
        }
        if (a.cls) {
            this.el.addClass(a.cls)
        }
        if (a.progress) {
            this.progressBar.progressBar.set({
                "aria-labelledby": this.msgEl.id
            })
        } else {
            this.progressBar.progressBar.set({
                tabIndex: "-1"
            })
        }
        if (true === a.wait) {
            this.progressBar.wait(a.waitConfig)
        }
        this.show();
        this.focusEl.focus();
        if (this.owner && !this.owner.isVisible()) {
            this.hideForMinimize = true;
            this.minimize()
        }
    },
    show: function() {
        this.alignTo(this.owner ? this.owner.el : document.body, "c-c");
        SYNO.SDS.MessageBox.superclass.show.apply(this, arguments)
    },
    updateText: function(d) {
        if (!this.opt.width) {
            this.setSize(this.maxWidth, 100)
        }
        this.msgEl.update(d || this.emptyText);
        var b = this.mbIconCls !== "" ? (this.iconEl.getWidth() + this.iconEl.getMargins("lr")) : 0,
            f = this.msgEl.getWidth() + this.msgEl.getMargins("lr"),
            c = this.getFrameWidth("lr"),
            e = this.body.getFrameWidth("lr"),
            a;
        if (Ext.isIE && b > 0) {
            b += 3
        }
        a = Math.max(Math.min(this.opt.width || b + f + c + e, this.opt.maxWidth || this.maxWidth), Math.max(this.opt.minWidth || this.minWidth, this.buttonWidth || 0));
        a += 2 * (this.fbar.getBox().x - this.getBox().x);
        if (this.opt.prompt === true) {
            this.activeTextEl.setWidth(a - b - c - e)
        }
        if (true === this.opt.progress || true === this.opt.wait) {
            this.progressBar.setSize(a - b - c - e)
        }
        if (Ext.isIE && a == this.buttonWidth) {
            a += 4
        }
        this.setSize(a, "auto")
    },
    updateProgress: function(b, a, c) {
        this.progressBar.updateProgress(b, a);
        if (c) {
            this.updateText(c)
        }
        return this
    },
    updateButtons: function(c) {
        var b = 0,
            a;
        if (!c) {
            Ext.each(this.buttonNames, function(d) {
                this.fbButtons[d].hide()
            }, this);
            return b
        }
        Ext.iterate(this.fbButtons, function(d, e) {
            a = c[d];
            if (a) {
                e.show();
                e.setText(Ext.isString(a) ? a : this.buttonText[d]);
                b += e.container.getWidth()
            } else {
                e.hide()
            }
        }, this);
        return b
    },
    handleButton: function(a, b) {
        this.fbButtons[a].blur();
        if (this.preventDelay) {
            this.opt.fn.call(this.opt.scope || window, a, this.activeTextEl.dom.value, this.opt, b)
        } else {
            Ext.callback(this.opt.fn, this.opt.scope || window, [a, this.activeTextEl.dom.value, this.opt, b], 1)
        }
        SYNO.SDS.MessageBox.superclass.close.call(this)
    },
    setIconClass: function(a) {
        if (a && a !== "") {
            this.iconEl.removeClass("x-hidden");
            this.bodyEl.addClass("x-dlg-icon");
            this.iconEl.replaceClass(this.mbIconCls, a);
            this.mbIconCls = a;
            return
        }
        this.iconEl.addClass("x-hidden");
        this.bodyEl.removeClass("x-dlg-icon");
        this.iconEl.removeClass(this.mbIconCls);
        this.mbIconCls = ""
    },
    progress: function(c, b, a) {
        this.showMsg({
            title: c,
            msg: b,
            buttons: false,
            progress: true,
            closable: false,
            minWidth: this.minProgressWidth,
            progressText: a
        });
        return this
    },
    wait: function(c, b, a) {
        this.showMsg({
            title: b,
            msg: c,
            buttons: false,
            closable: false,
            wait: true,
            minWidth: this.minProgressWidth,
            waitConfig: a
        });
        return this
    },
    alert: function(d, c, b, a) {
        this.showMsg({
            title: d,
            msg: c,
            buttons: Ext.MessageBox.OK,
            fn: b,
            scope: a,
            minWidth: this.minWidth
        });
        return this
    },
    confirm: function(e, d, b, a, c) {
        this.showMsg({
            title: e,
            msg: d,
            buttons: c || Ext.MessageBox.YESNO,
            fn: b,
            scope: a,
            icon: Ext.MessageBox.QUESTION,
            minWidth: this.minWidth
        });
        return this
    },
    prompt: function(g, f, d, c, a, e, b) {
        this.showMsg({
            title: g,
            msg: f,
            buttons: Ext.MessageBox.OKCANCEL,
            fn: d,
            minWidth: this.minPromptWidth,
            scope: c,
            prompt: true,
            multiline: a,
            value: e,
            password: b
        });
        return this
    },
    getWrapper: function(b) {
        function a(d, c) {
            return function() {
                return c.apply(d, arguments)
            }
        }
        if (!this.msgBoxWrapper) {
            this.msgBoxWrapper = {
                show: a(this, this.showMsg),
                hide: a(this, this.doClose),
                progress: a(this, this.progress),
                wait: a(this, this.wait),
                alert: a(this, this.alert),
                confirm: a(this, this.confirm),
                prompt: a(this, this.prompt),
                getDialog: (function() {
                    return this
                }).createDelegate(this),
                isVisible: a(this, this.isVisible),
                setIcon: a(this, this.setIconClass),
                updateProgress: a(this, this.updateProgress),
                updateText: a(this, this.updateText)
            }
        }
        this.extra = {};
        Ext.apply(this.extra, b || {});
        return this.msgBoxWrapper
    }
});
Ext.define("SYNO.SDS.MessageBoxV5", {
    extend: "SYNO.SDS.MessageBox",
    ariaRole: "alertdialog",
    constructor: function(a) {
        this.callParent([Ext.apply(a, {
            dsmStyle: "v5",
            closable: false,
            header: a.draggable || false,
            draggable: a.draggable || false,
            buttonAlign: "right",
            elements: "body",
            padding: (a.draggable) ? "0 20px" : "20px 20px 0 20px"
        })]);
        if (this.draggable) {
            this.addClass("msgbox-draggable")
        }
    },
    onRender: function() {
        this.callParent(arguments);
        this.progressStatus = this.bodyEl.createChild({
            tag: "span",
            cls: "syno-mb-progress-status"
        }, this.bodyEl.child(".x-clear"));
        this.progressBar.addClass("syno-mb-progress")
    },
    selectBtn: function(a, d, b) {
        var e = Ext.getCmp(Ext.get(a.target).up(".syno-ux-button").id),
            c = e[b + "Sibling"]();
        while (c && c.hidden) {
            c = c[b + "Sibling"]()
        }
        if (!c || c.hidden) {
            return
        }
        c.focus()
    },
    getButtons: function(a) {
        var b = [];
        this.fbButtons = {};
        this.buttonNames = ["custom", "ok", "yes", "no", "cancel"];
        this.buttonText = Ext.MessageBox.buttonText;
        this.buttonText.custom = this.buttonText.no;
        Ext.each(this.buttonNames, function(c) {
            b.push(this.fbButtons[c] = new SYNO.ux.Button({
                hideModE: "offset",
                btnStyle: this.getButtonStyle(c),
                text: this.buttonText[c],
                handler: this.handleButton.createDelegate(this, [c]),
                msgWin: this,
                transitionFocus: function() {
                    var d = "focus-effect",
                        e = this.el.hasClass(d);
                    if (e) {
                        this.el.removeClass(d)
                    } else {
                        this.el.addClass(d)
                    }
                },
                onBtnElFocus: function(d) {
                    this.focusTask = this.focusTask || this.addTask({
                        id: "focus_effect",
                        interval: 0.6 * 1000,
                        run: this.transitionFocus,
                        scope: this
                    });
                    this.focusTask.start()
                },
                onBtnElBlur: function(d) {
                    this.focusTask.stop();
                    this.el.removeClass("focus-effect")
                },
                listeners: {
                    afterrender: function() {
                        if (this.hidden) {
                            return
                        }
                        this.nav = new Ext.KeyNav(this.btnEl, {
                            left: this.msgWin.selectBtn.createDelegate(this.msgWin, ["previous"], true),
                            right: this.msgWin.selectBtn.createDelegate(this.msgWin, ["next"], true)
                        });
                        this.mon(this.btnEl, {
                            focus: this.onBtnElFocus,
                            blur: this.onBtnElBlur,
                            scope: this
                        }, this)
                    }
                }
            }))
        }, this);
        return b
    },
    getButtonStyle: function(a) {
        if ("ok" == a || "yes" == a) {
            return "blue"
        }
        return "grey"
    },
    isModalized: function() {
        return !this.sinkable
    },
    getTopWin: function() {
        if (this.sinkable) {
            return this
        } else {
            return this.callParent()
        }
    },
    setButtonAlign: function() {
        var a = [];
        Ext.iterate(this.fbButtons, function(b, c) {
            if (!c.hidden) {
                a.push(c)
            }
        }, this);
        if (1 == a.length) {
            a[0].el.center(this.footer)
        }
    },
    isCustomBtnVisible: function() {
        return !this.fbButtons.custom.hidden
    },
    updateProgress: function(c, b, d, a) {
        a = a || false;
        this.progressBar.updateProgress(c, b);
        this.progressStatus.update(b);
        if ((d || b) && a !== true) {
            this.updateText(d)
        } else {
            if (d) {
                this.msgEl.update(d)
            }
        }
        return this
    },
    updateButtons: function(d) {
        var c = 0,
            b, e, a;
        this.fbButtons.custom.removeClass("syno-mb-custom-btn");
        if (!d) {
            Ext.each(this.buttonNames, function(f) {
                this.fbButtons[f].hide()
            }, this);
            return c
        }
        Ext.iterate(this.fbButtons, function(f, g) {
            b = d[f];
            if (b) {
                g.show();
                this.updateBtnByCfg(f, g, b);
                if (this.extra && this.extra.btnStyle !== g.btnStyle && ("yes" === f || "ok" === f) && g.el && (!g.el.hasClass(a))) {
                    e = String.format("syno-ux-button-{0}", g.btnStyle);
                    a = String.format("syno-ux-button-{0}", this.extra.btnStyle || "blue");
                    g.removeClass(e);
                    g.addClass(a)
                }
                c += g.container.getWidth()
            } else {
                g.hide()
            }
        }, this);
        if (this.isCustomBtnVisible()) {
            c += this.iconEl.getWidth() + this.iconEl.getMargins("lr");
            this.fbButtons.custom.addClass("syno-mb-custom-btn")
        }
        return c
    },
    updateBtnByCfg: function(b, c, a) {
        var e = this.buttonText[b],
            d = "grey";
        if (!c.el) {
            return
        }
        if (Ext.isString(a)) {
            e = a
        } else {
            if (Ext.isObject(a) && a.text) {
                e = a.text
            }
        }
        c.setText(e);
        c.removeClass("syno-ux-button-blue");
        c.removeClass("syno-ux-button-red");
        c.removeClass("syno-ux-button-grey");
        if (Ext.isObject(a) && a.btnStyle) {
            d = a.btnStyle
        } else {
            if ("yes" === b || "ok" === b) {
                d = "blue"
            }
        }
        c.addClass("syno-ux-button-" + d)
    },
    updateText: function() {
        this.callParent(arguments);
        if (true === this.opt.progress && this.progressStatus.getWidth() > 0) {
            this.setSize(this.getSize().width + (this.progressStatus.getWidth() + 5), "auto")
        }
        this.setButtonAlign()
    },
    confirmDelete: function(e, d, b, a, c) {
        var f = {
            yes: {
                text: _T("common", "delete"),
                btnStyle: "red"
            },
            no: {
                text: this.buttonText.no
            }
        };
        this.showMsg({
            title: e,
            msg: d,
            buttons: c || f,
            fn: b,
            scope: a,
            icon: Ext.MessageBox.QUESTION,
            minWidth: this.minWidth
        });
        return this
    },
    getWrapper: function(b) {
        function a(d, c) {
            return function() {
                return c.apply(d, arguments)
            }
        }
        if (!this.msgBoxWrapper) {
            this.msgBoxWrapper = {
                show: a(this, this.showMsg),
                hide: a(this, this.doClose),
                progress: a(this, this.progress),
                wait: a(this, this.wait),
                alert: a(this, this.alert),
                confirm: a(this, this.confirm),
                confirmDelete: a(this, this.confirmDelete),
                prompt: a(this, this.prompt),
                getDialog: (function() {
                    return this
                }).createDelegate(this),
                isVisible: a(this, this.isVisible),
                setIcon: a(this, this.setIconClass),
                updateProgress: a(this, this.updateProgress),
                updateText: a(this, this.updateText)
            }
        }
        this.extra = {};
        Ext.apply(this.extra, b || {});
        if (this.extra && this.extra.sinkable) {
            Ext.apply(this, {
                sinkable: !!this.extra.sinkable
            })
        }
        return this.msgBoxWrapper
    }
});
SYNO.SDS.MessageBoxV5.YESNOCANCEL = {
    custom: true,
    yes: true,
    cancel: true
};
Ext.define("SYNO.SDS.ToastBox", {
    extend: "Ext.BoxComponent",
    actionTextEl: null,
    alignEl: null,
    closeBtnEl: null,
    closable: "",
    actionHandler: Ext.emptyFn,
    actionHandlerScope: null,
    delay: 3000,
    offsetY: 0,
    offsetX: 0,
    constructor: function(a) {
        if (!a.owner) {
            SYNO.Debug("owner required")
        }
        if (true === a.alignBottom) {
            this.offsetY = 0
        } else {
            this.offsetY = 36
        }
        var c = '<div class="content">{0}{1}{2}</div>',
            f = "",
            e = "",
            d = "";
        if (true === a.closable) {
            d = '<div id={0} class="close-btn" role="button" aria-label="{1}" tabIndex="0"></div>';
            d = String.format(d, this.closeBtnId = Ext.id(), _T("common", "close"))
        }
        if (Ext.isString(a.text)) {
            f = '<span id={0} class="text">{1} </span>';
            f = String.format(f, this.textId = Ext.id(), a.text)
        }
        if (Ext.isString(a.actionText)) {
            e = '<span id={0} class="action-text" role="button" aria-label="{1}" tabIndex="0">{1}</span>';
            e = String.format(e, this.actionTextId = Ext.id(), a.actionText)
        }
        c = String.format(c, f, e, d);
        var b = {
            cls: "syno-sds-toast-box",
            html: c,
            renderTo: a.owner.id,
            listeners: {
                afterrender: {
                    fn: this.defineToastBoxBehavior,
                    scope: this,
                    single: true
                },
                beforedestroy: {
                    fn: this.unbindEvents,
                    scope: this
                }
            }
        };
        Ext.apply(b, a);
        this.callParent([b])
    },
    defineToastBoxBehavior: function() {
        this.alignBox();
        if (Ext.isNumber(this.delay) && -1 !== this.delay) {
            this.destroyBox.defer(this.delay, this)
        }
        this.bindEvents()
    },
    alignBox: function() {
        var a = "t-t";
        if (this.alignBottom) {
            a = "b-b"
        }
        this.getEl().alignTo(this.alignEl || this.owner.getEl(), a, [this.offsetX, this.offsetY])
    },
    bindEvents: function() {
        this.closeBtnEl = Ext.get(this.closeBtnId);
        if (this.closeBtnEl) {
            this.closeBtnEl.on("click", this.destroyBox, this);
            this.closeBtnEl.addKeyListener(Ext.EventObject.ENTER, this.destroyBox, this);
            this.closeBtnEl.addKeyListener(Ext.EventObject.SPACE, this.destroyBox, this)
        }
        this.actionTextEl = Ext.get(this.actionTextId);
        if (this.actionTextEl) {
            this.actionTextEl.on("click", this.actionHandler.createSequence(this.destroyBox, this), this.actionHandlerScope || this);
            this.actionTextEl.addKeyListener(Ext.EventObject.ENTER, this.actionHandler.createSequence(this.destroyBox, this), this.actionHandlerScope || this);
            this.actionTextEl.addKeyListener(Ext.EventObject.SPACE, this.actionHandler.createSequence(this.destroyBox, this), this.actionHandlerScope || this)
        }
    },
    unbindEvents: function() {
        if (this.closeBtnEl) {
            this.closeBtnEl.un("click", this.destroyBox, this)
        }
        if (this.actionTextEl) {
            this.actionTextEl.un("click", this.actionHandler.createSequence(this.destroyBox), this.actionHandlerScope || this)
        }
    },
    destroyBox: function() {
        this.destroy()
    }
});
SYNO.SDS.DefinePageList = function(a, b) {
    Ext.define(a, {
        extend: b,
        layout: "border",
        border: false,
        plain: true,
        listItems: null,
        help: undefined,
        activePage: null,
        pageList: null,
        pageCt: null,
        constructor: function(c) {
            var e, d;
            d = Ext.apply({
                items: [this.getPageList(c), this.getPageCt()]
            }, c);
            this.callParent([d]);
            this.ctMaskCnt = 0;
            e = this.pageList.getSelectionModel();
            this.mon(e, "selectionchange", this.onSelectionChange, this);
            this.mon(e, "beforeselect", this.onBeforeSelect, this);
            this.mon(this.pageList.getLoader(), "load", this.onGetPageList, this, {
                single: true
            })
        },
        onGetPageList: function() {
            this.fireEvent("moduleready", this)
        },
        getPageList: function(c) {
            var d;
            if (!this.pageList) {
                d = {
                    region: "west",
                    width: 240,
                    padding: "4px 16px 0 12px"
                };
                if (c.dataUrl) {
                    d.dataUrl = c.dataUrl
                } else {
                    if (c.listItems) {
                        d.listItems = c.listItems
                    }
                }
                this.pageList = new SYNO.ux.ModuleList(d)
            }
            return this.pageList
        },
        getPageCt: function() {
            if (!this.pageCt) {
                this.pageCt = new Ext.Panel({
                    layout: "card",
                    padding: "0 12px 0 16px",
                    border: false,
                    frame: false,
                    hideMode: "offsets",
                    region: "center"
                })
            }
            return this.pageCt
        },
        mask: function(e, g, f, d) {
            if (d) {
                return this.callParent(arguments)
            }
            if (this.isDestroyed) {
                return
            }
            e = e || 0;
            this.ctMaskCnt++;
            if (this.ctMaskCnt > 1) {
                this.setMaskOpacity(e);
                return
            }
            var c = this.getPageCt().el.mask(g, f);
            c.addClass("sds-window-mask");
            this.mon(c, "mousedown", this.blinkModalChild, this);
            this.setMaskOpacity(e);
            this.updateTaskButton("mask")
        },
        unmask: function(d) {
            if (d) {
                return this.callParent(arguments)
            }
            if (this.isDestroyed || --this.ctMaskCnt > 0) {
                return
            }
            this.ctMaskCnt = 0;
            if (this.maskTask) {
                this.maskTask.cancel()
            }
            var c = Ext.Element.data(this.getPageCt().el, "mask");
            this.mun(c, "mousedown", this.blinkModalChild, this);
            this.getPageCt().el.unmask();
            this.updateTaskButton("unmask")
        },
        setMaskOpacity: function(e, d) {
            if (d) {
                return this.callParent([e])
            }
            if (!this.getPageCt().el.isMasked()) {
                return
            }
            var c = Ext.Element.data(this.getPageCt().el, "mask");
            c.setOpacity(e)
        },
        selectPage: function(d) {
            var e, c;
            if (!d) {
                return false
            }
            c = this.getPageList();
            e = c.getNodeById(d);
            if (e && c.getSelectionModel().isSelected(e)) {
                this.handleOpenParams();
                return true
            } else {
                return c.selectModule(d)
            }
        },
        getActivePage: function() {
            return this.pageCt.layout.activeItem
        },
        getHelpParam: function() {
            var c, e, d;
            c = this.getActivePage();
            if (!c) {
                return this.help
            }
            if (Ext.isFunction(c.getHelpParam)) {
                return c.getHelpParam()
            }
            d = this.getPageList();
            e = d.getNodeById(c.itemId);
            if (!e) {
                return this.help
            }
            if (e.attributes && Ext.isString(e.attributes.help)) {
                return e.attributes.help
            }
            return this.help
        },
        onLoad: function() {},
        onBeforeSelect: function(d, e, h) {
            var c, f = true,
                g = this.getPageCt().el.isMasked();
            if (g) {
                return false
            }
            if (this.isSkipDeactivateCheck()) {
                this.clearSkipDeactivateCheck();
                return true
            }
            if (!e.leaf) {
                return true
            }
            if (!e.attributes.fn) {
                SYNO.Debug.error("Error: not implemented yet!!");
                return false
            }
            if (h && h.leaf) {
                c = this.pageCt.getComponent(h.attributes.fn);
                if (c && Ext.isFunction(c.onPageDeactivate)) {
                    f = c.onPageDeactivate()
                }
            }
            if (false === f) {
                this.pageList.findNext = false;
                this.confirmLostChange(function(i) {
                    if (c && Ext.isFunction(c.onPageConfirm)) {
                        c.onPageConfirm(i)
                    }
                    this.pageList.findNext = true;
                    if (i === "yes") {
                        this.setSkipDeactivateCheck();
                        this.selectPage(e.attributes.fn)
                    }
                }, this)
            }
            return f
        },
        onSelectionChange: function(c, e) {
            var d;
            if (!e.leaf) {
                return
            }
            d = e.attributes.fn;
            if (d) {
                this.launchPage(d)
            }
        },
        onClose: function() {
            var c = this.getActivePage(),
                d = this.callParent(arguments);
            if (this.isSkipDeactivateCheck()) {
                this.clearSkipDeactivateCheck();
                return true
            }
            if (false === d) {
                return false
            }
            if (c && Ext.isFunction(c.onPageDeactivate)) {
                if (false === c.onPageDeactivate()) {
                    this.confirmLostChange(function(e) {
                        if (c && Ext.isFunction(c.onPageConfirm)) {
                            c.onPageConfirm(e)
                        }
                        if (e === "yes") {
                            this.setSkipDeactivateCheck();
                            this.close()
                        }
                    }, this);
                    return false
                }
            }
            return d
        },
        launchPage: function(e) {
            var d = this.pageCt,
                c = d.getComponent(e);
            if (!c) {
                c = this.createPage(e);
                d.add(c)
            }
            if (!c) {
                return false
            }
            d.layout.setActiveItem(e);
            this.activePage = c;
            this.selectTab(0);
            if (c.onPageActivate) {
                c.onPageActivate(this.openParams)
            }
            return true
        },
        handleOpenParams: function() {
            if (Ext.isFunction(this.activePage.onPageFocus)) {
                this.activePage.onPageFocus(this.openParams)
            }
            if (this.openParams && this.openParams.tab) {
                this.selectTab(this.openParams.tab)
            }
        },
        selectTab: function(d) {
            var c = this.getActivePage();
            if (!c || !(c instanceof Ext.TabPanel)) {
                return
            }
            if (Ext.isFunction(c.setActiveTab)) {
                c.setActiveTab(d)
            }
        },
        createPage: function(f) {
            var g, d, e = this.appWin || this,
                c = e.jsConfig;
            g = Ext.getClassByName(f);
            d = new g({
                appWin: e,
                jsConfig: c,
                owner: this
            });
            d.itemId = f;
            return d
        },
        confirmLostChange: function(d, c) {
            this.getMsgBox().confirm("", _T("common", "confirm_lostchange"), d, c)
        },
        isSkipDeactivateCheck: function() {
            return !!this.skipDeactivateCheckFlag
        },
        setSkipDeactivateCheck: function() {
            this.skipDeactivateCheckFlag = true
        },
        clearSkipDeactivateCheck: function() {
            this.skipDeactivateCheckFlag = false
        },
        onOpen: function(c) {
            this.callParent(arguments);
            this.onLaunchPage(c)
        },
        onRequest: function(c) {
            this.callParent(arguments);
            this.onLaunchPage(c)
        },
        onLaunchPage: function(d) {
            var c = this.getPageList().getRootNode();
            if (c && c.childrenRendered && c.childNodes.length > 0) {
                this.launchPageOnOpen(d)
            } else {
                this.mon(this, "moduleready", function() {
                    this.launchPageOnOpen(d)
                }, this, {
                    single: true
                })
            }
        },
        launchPageOnOpen: function(d) {
            var c;
            if (this.checkModalOrMask()) {
                return
            }
            if (d && d.fn) {
                c = d.fn
            } else {
                c = this.activePage
            }
            this.openParams = d;
            if (this.selectPage(c)) {
                this.openParams = null
            }
        },
        setNotification: function(d, c) {
            this.getPageList().setNotification(d, c)
        },
        clearNotification: function(c) {
            this.getPageList().clearNotification(c)
        }
    })
};
SYNO.SDS.DefinePageList("SYNO.SDS.PageListAppWindow", "SYNO.SDS.AppWindow");
SYNO.SDS.DefinePageList("SYNO.SDS.PageListPanel", "SYNO.ux.Panel");
Ext.namespace("SYNO.SDS.Config");
Ext.namespace("SYNO.SDS.JSLoad");
Ext.define("SYNO.SDS.JSLoader", {
    singleton: true,
    requestJSFileByScript: function(d, g, e) {
        var a = document.getElementsByTagName("head")[0];
        var c = document.createElement("script");
        var f = d;

        function b() {
            if ("complete" !== this.readyState && "loaded" !== this.readyState) {
                return
            }
            this.onready.call(e || window)
        }
        f = Ext.urlAppend(f, "v=" + _S("fullversion"));
        if (Ext.isDefined(SYNO.SDS.JSDebug)) {
            f = Ext.urlAppend(f, "_dc=" + (new Date().getTime()))
        }
        SYNO.Debug.debug("JSLoad requesting for  " + d + " by script tag");
        c.type = "text/javascript";
        if (Ext.isIE) {
            c.onready = Ext.createDelegate(this.onJsFileLoaded, this, [d, g, e]);
            c.onreadystatechange = b
        } else {
            c.onload = Ext.createDelegate(this.onJsFileLoaded, this, [d, g, e])
        }
        c.src = f;
        a.appendChild(c)
    },
    requestJSFileByAjax: function(jsFile, callback, scope) {
        var jsStatus = SYNO.SDS.JSLoad.JSStatus[jsFile];
        SYNO.Debug.debug("JSLoad requesting for  " + jsFile + " by ajax");
        Ext.Ajax.request({
            method: "GET",
            disableCaching: Ext.isDefined(SYNO.SDS.JSDebug),
            url: Ext.urlAppend(jsFile, "v=" + (jsStatus.version || _S("fullversion"))),
            extraParams: {
                jsFile: jsFile
            },
            scope: this,
            failure: function(conn, resp) {
                var jsFile = resp.extraParams.jsFile;
                var backoff = Math.round(5 + Math.random() * 5);
                SYNO.Debug.error(jsFile + ": " + conn.status + " " + conn.statusText);
                SYNO.Debug.error("JSLoad request failed: " + jsFile + ", retry after " + backoff + " seconds");
                Ext.defer(this.requestJSFileByAjax, backoff * 1000, this, [jsFile, callback, scope])
            },
            success: function(conn, resp) {
                try {
                    var jsFile = resp.extraParams.jsFile;
                    SYNO.Debug.debug("JSLoad request successed: " + jsFile);
                    if (window.execScript) {
                        window.execScript(conn.responseText, "JavaScript")
                    } else {
                        window.eval(conn.responseText)
                    }
                    this.onJsFileLoaded(jsFile, callback, scope)
                } catch (err) {
                    SYNO.Debug.error("JSLoad import " + jsFile + " failed: ", err);
                    if (Ext.isDefined(SYNO.SDS.JSDebug)) {
                        throw err
                    }
                    return
                }
            }
        })
    },
    onJsFileLoaded: function(a, c, b) {
        if (Ext.isFunction(c)) {
            c.call(b || window, a)
        }
    }
});
SYNO.SDS.JSLoad = function(c, j, k) {
    var b = SYNO.SDS.Config.JSConfig,
        e = SYNO.SDS.Config.FnMap,
        d = e[c],
        a;

    function g(o) {
        var p = b[o],
            r = SYNO.SDS.JSLoad.JSStatus[o];
        for (var m in p) {
            if (p.hasOwnProperty(m)) {
                if (!e[m] || ("app" !== e[m].config.type && "lib" !== e[m].config.type && "widget" !== e[m].config.type && "standalone" !== e[m].config.type)) {
                    continue
                }
                try {
                    Ext.getClassByName(m).prototype.jsConfig = e[m].config
                } catch (q) {
                    SYNO.Debug.error("JSLoad apply JSConfig to " + m + " failed: ", q);
                    if (Ext.isDefined(SYNO.SDS.JSDebug)) {
                        throw q
                    }
                }
            }
        }
        r.loaded = true;
        for (var n = 0; n < r.reqQueue.length; ++n) {
            r.reqQueue[n]()
        }
        delete r.reqQueue
    }

    function i(o, s, q) {
        var p = b[o],
            r = SYNO.SDS.JSLoad.JSStatus[o];
        var m = _S("fullversion");
        for (var n in p) {
            if (!(/\/\.url$/.match(n)) && e[n].config.version) {
                m = e[n].config.version;
                if (r.version != m) {
                    r.loaded = false;
                    r.version = m
                }
                break
            }
        }
        if (r.loaded) {
            r[c] = true;
            if (s) {
                s.call(q || window)
            }
            return
        }
        if (r.reqQueue) {
            if (s) {
                SYNO.Debug.debug("JSLoad enqueue request " + o);
                r.reqQueue.push(s.createDelegate(q || window))
            } else {
                SYNO.Debug.debug("JSLoad skip requesting " + o)
            }
            return
        }
        r.reqQueue = [];
        if (s) {
            r.reqQueue.push(s.createDelegate(q || window))
        }
        switch (SYNO.SDS.JSDebug) {
            case "script":
            case "all":
                SYNO.SDS.JSLoader.requestJSFileByScript(o, g, this);
                break;
            default:
                SYNO.SDS.JSLoader.requestJSFileByAjax(o, g, this)
        }
    }
    if (!d) {
        SYNO.Debug.error("JSLoad cannot find " + c);
        return
    }
    a = d.config.depend || [];
    if (Ext.isArray(a)) {
        for (var f = 0; f < a.length; ++f) {
            var h = a[f];
            var l = e[h];
            if (!l) {
                SYNO.Debug.error("JSLoad cannot find " + h + ", required by " + c);
                return
            }
            if (!SYNO.SDS.JSLoad.JSStatus[l.jsFile][h]) {
                SYNO.SDS.JSLoad(h, SYNO.SDS.JSLoad.createCallback(c, j, k), this);
                return
            }
        }
    }
    i.call(this, d.jsFile, j, k)
};
SYNO.SDS.JSLoad.overrideConfig = function() {
    var a, c = SYNO.SDS.Config.FnMap,
        d = "../../resources/images/package/",
        b = {
            "SYNO.SDS._ThirdParty.Desktop.MailStation": {
                allUsers: true,
                icon: d + "MailStation_{0}.png"
            },
            "SYNO.SDS._ThirdParty.Desktop.SqueezeCenter": {
                icon: d + "SqueezeboxServer_{0}.png"
            },
            "SYNO.SDS._ThirdParty.Desktop.Webalizer": {
                icon: d + "Webalizer_{0}.png"
            },
            "SYNO.SDS._ThirdParty.Desktop.phpMyAdmin": {
                icon: d + "phpMyAdmin_{0}.png"
            },
            "SYNO.SDS.PersonalPhotoStation": {
                title: "Photo Station - " + _S("user")
            }
        };
    if (Ext.isIE7) {
        Ext.apply(b, {
            "SYNO.SDS.DownloadStation.Application": {
                type: "standalone"
            },
            "SYNO.SDS.AudioStation.Application": {
                type: "standalone"
            }
        })
    }
    for (a in b) {
        if (Ext.isObject(c[a])) {
            Ext.apply(c[a].config, b[a])
        }
    }
};
SYNO.SDS.JSLoad.init = function() {
    SYNO.SDS.Config.FnMap = {};
    SYNO.SDS.Config.AutoLaunchFnList = [];
    var e = SYNO.SDS.Config.JSConfig;
    var b = SYNO.SDS.Config.FnMap;
    b["SYNO.SDS.VirtualGroup"] = {
        config: {
            title: "Group Icon",
            jsBaseURL: "resources"
        }
    };

    function a() {
        var l = [],
            n = function(p) {
                if (Ext.isString(p.getIconFn)) {
                    l.push(p.getIconFn)
                }
            };
        for (var i in e) {
            if (e.hasOwnProperty(i)) {
                for (var f in e[i]) {
                    if (e[i].hasOwnProperty(f)) {
                        if (Ext.isObject(b[f])) {
                            SYNO.Debug.warn(f + " Conflict!!! " + b[f].jsFile + ", " + i);
                            continue
                        }
                        b[f] = {
                            jsFile: i,
                            jsFileConfig: e[i],
                            config: e[i][f]
                        };
                        if (Ext.isArray(e[i][f].fb_extern)) {
                            Ext.each(e[i][f].fb_extern, n)
                        }
                    }
                }
                if (!Ext.isObject(SYNO.SDS.JSLoad.JSStatus[i])) {
                    SYNO.SDS.JSLoad.JSStatus[i] = {};
                    if (/\/\.url$/.match(i)) {
                        SYNO.SDS.JSLoad.JSStatus[i].loaded = true
                    }
                } else {
                    var m = SYNO.SDS.JSLoad.JSStatus[i],
                        o = _S("fullversion");
                    for (var k in e[i]) {
                        if (e[i].hasOwnProperty(k)) {
                            if (!(/\/\.url$/.match(k)) && b[k] && b[k].config.version) {
                                o = b[k].config.version;
                                if (m.version != o) {
                                    SYNO.SDS.JSLoad.JSStatus[i][k] = false;
                                    m.loaded = false
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!Ext.isEmpty(l) && b["SYNO.SDS.App.FileStation3.Instance"]) {
            var h = b["SYNO.SDS.App.FileStation3.Instance"].jsFileConfig["SYNO.SDS.App.FileStation3.Instance"];
            h.depend = h.depend.concat(l)
        }
        SYNO.SDS.JSLoad.overrideConfig();
        for (var g in b) {
            if (b.hasOwnProperty(g)) {
                if ("standalone" === b[g].config.type || true === b[g].config.allowStandalone) {
                    var j = Ext.urlDecode(window.location.search.substr(1)) || {};
                    b[g].config.url = Ext.urlAppend(window.location.protocol + "//" + window.location.host + window.location.pathname, Ext.urlEncode(Ext.apply(j, {
                        launchApp: g
                    })), (true === b[g].config.allowURLNoSynoToken) ? false : true)
                }
                d(g, g, []);
                c(g, b[g].config)
            }
        }
    }

    function c(g, f) {
        if (f.type !== "app" || f.autoLaunch !== true) {
            return
        }
        if (f.dependApp) {
            SYNO.SDS.Config.AutoLaunchFnList.push({
                appName: g,
                dependName: f.dependApp
            })
        } else {
            SYNO.SDS.Config.AutoLaunchFnList.push(g)
        }
    }

    function d(g, l, f) {
        var k = b[l].config.depend;
        f.push(l);
        if (Ext.isArray(k)) {
            var i = k.indexOf(g);
            if (i >= 0) {
                SYNO.Debug.warn("Dependency loop detected: " + g + " <--> " + l);
                k.splice(i, 1);
                return
            }
            for (var h = 0; h < k.length; ++h) {
                var j = k[h];
                if (!b[j]) {
                    SYNO.Debug.warn("Dependency missing: " + l + " --> " + j);
                    k.splice(h, 1);
                    --h;
                    continue
                }
                if (f.indexOf(j) < 0) {
                    d(g, j, f)
                }
            }
        }
    }
    a()
};
SYNO.SDS.JSLoad.RemoveJSSatusByAppName = function(b) {
    var a = SYNO.SDS.Config.FnMap[b];
    if (a) {
        delete SYNO.SDS.JSLoad.JSStatus[a.jsFile]
    }
};
SYNO.SDS.JSLoad.JSStatus = {};
Ext.namespace("SYNO.SDS.AppLaunch");
SYNO.SDS.WindowLaunch = function(c, d, a, b) {
    var e = new SYNO.SDS.WindowLauncher(SYNO.SDS.WindowLauncher.Util.parseOptions(c, d, a, b));
    return e.launch()
};
SYNO.SDS.WindowLaunchToWindow = function(a, c, b) {
    var d = new SYNO.SDS.WindowLauncher(SYNO.SDS.WindowLauncher.Util.parseOptions(a, c, false));
    return d.launch(b)
};
Ext.define("SYNO.SDS.WindowLauncher", {
    extend: "Ext.util.Observable",
    validType: ["standalone", "url", "legacy"],
    constructor: function(a) {
        var b = ["className", "param", "url", "type", "isOpenNewWindow", "appConfig"];
        Ext.copyTo(this, a, b);
        if (!this.appConfig) {
            var c = SYNO.SDS.Config.FnMap[a.className];
            this.appConfig = c.config
        }
    },
    launch: function(b) {
        if (!this.isValidType()) {
            return false
        }
        if (this.isLaunchFromURL() && !this.checkLaunchFromURL()) {
            this.alterNotSupport();
            return false
        }
        var a = this.getLaunchURL();
        if (this.isOpenNewWindow) {
            return this.openNewWindow(b, a)
        } else {
            if (!b) {
                this.maskDesktop()
            }(b || window).location = a
        }
        return (b || window)
    },
    isValidType: function() {
        return (this.validType.indexOf(this.type) != -1)
    },
    openNewWindow: function(e, b) {
        var a = this.appConfig;
        var d = a.urlTarget ? (a.urlTarget + (a.allowFixedURLTarget ? "" : SYNO.SDS.LaunchTime)) : "_blank";
        var c = a.windowParam || "";
        return (e || window).open(b, d, c)
    },
    isLaunchFromURL: function() {
        return (this.type === "url")
    },
    checkLaunchFromURL: function() {
        if (SYNO.SDS.QuickConnect.Utils.isInTunnel() && !SYNO.SDS.IsDSMPortalWhiteList(this.className)) {
            return false
        }
        return true
    },
    getLaunchParam: function() {
        if (!this.param) {
            return {}
        }
        var b, a = Ext.urlEncode(this.param);
        if (Ext.isEmpty(a)) {
            return {}
        }
        b = {
            launchParam: a
        };
        if (this.param.ieMode) {
            b.ieMode = this.param.ieMode
        }
        return b
    },
    getLaunchURL: function() {
        var b, a, c;
        b = this.getLaunchParam();
        a = this.resolveRelativeURL(this.url);
        c = this.appendParam(a, b);
        return c
    },
    resolveRelativeURL: function(c) {
        var d = ("http" !== c.substr(0, 4).toLowerCase());
        var a = this.appConfig;
        if (!d) {
            return c
        }
        if (a.port || a.protocol) {
            var e = a.protocol || window.location.protocol;
            var b = a.port || window.location.port || "";
            if (b) {
                b = ":" + b
            }
            if (SYNO.SDS.QuickConnect.Utils.isInTunnel()) {
                e = "https";
                b = ""
            }
            c = e + "://" + window.location.hostname + b + c
        }
        return c
    },
    appendParam: function(a, f) {
        var e = a.split("?"),
            d, g;
        if (e.length > 2) {
            e[1] = e.splice(1, e.length - 1).join("?")
        }
        d = e[1] ? Ext.urlDecode(e[1]) : {};
        g = Ext.apply(d, f);
        var c = e[0];
        var b = Ext.urlEncode(g);
        a = Ext.urlAppend(c, b, false);
        return a
    },
    alterNotSupport: function() {
        var a = new SYNO.SDS.MessageBoxV5({
            modal: true,
            draggable: false,
            renderTo: document.body
        });
        a.alert(_T("relayservice", "package_not_supported"), _T("relayservice", "package_not_supported"))
    },
    maskDesktop: function() {
        var a = SYNO.SDS.Desktop.getEl();
        a.addClass("sds-window-v5");
        a.addClass("sds-standalone-desktop");
        a.mask(_WFT("common", "loading"), "x-mask-loading x-standalone-loading")
    }
});
Ext.define("SYNO.SDS.WindowLauncher.Util", {
    statics: {
        getStandaloneLaunchURL: function(c) {
            var b = SYNO.SDS.Config.FnMap[c];
            if (!b) {
                return
            }
            var a = Ext.urlAppend(window.location.protocol + "//" + window.location.host, Ext.urlEncode({
                launchApp: c
            }), (true === b.config.allowURLNoSynoToken) ? false : true);
            return a
        },
        parseOptions: function(f, g, a, b) {
            var e = SYNO.SDS.Config.FnMap[f];
            if (!e) {
                return false
            }
            var c = "";
            if (b && b.url) {
                c = b.url
            } else {
                if (e.config.url) {
                    c = e.config.url
                } else {
                    if (SYNO.SDS.UrlTag[e.config.urlTag]) {
                        c = SYNO.SDS.UrlTag[e.config.urlTag];
                        if (true === e.config.appendSynoTokenInUrlTag) {
                            c = Ext.urlAppend(c)
                        }
                    }
                }
            }
            var d = e.config.type;
            if (e.config.allowStandalone) {
                d = "standalone"
            }
            if (a !== false) {
                a = true
            }
            return {
                className: f,
                param: g,
                url: c,
                type: d,
                isOpenNewWindow: a,
                appConfig: e.config
            }
        }
    }
});
SYNO.SDS.IsDSMPortalWhiteList = function(b) {
    var a = {
        "SYNO.SDS.PersonalPhotoStation": true,
        "SYNO.SDS.PhotoStation": true,
        "SYNO.SDS.SurveillanceStation": true
    };
    return (b in a)
};
SYNO.SDS.IsHABlackList = function(c) {
    var a = ["SYNO.SDS.EzInternet.Instance"];
    for (var b = 0; b < a.length; b++) {
        if ("SYNO.SDS.EzInternet.Instance" === c) {
            return true
        }
    }
    return false
};
SYNO.SDS.AppLaunch = function(className, param, newInstance, callback, scope) {
    var appCfg, taskButton = null,
        App = SYNO.SDS.Config.FnMap[className],
        matchInstance = null,
        appPrivClassName = className,
        generateLegacyApp = function() {
            var url = appCfg.url,
                tpl = "".concat("Ext.namespace('{0}');", "{0} = Ext.extend(SYNO.SDS.AppInstance, {", "appWindowName: '{0}.MainWindow'", "});", "{0}.MainWindow = Ext.extend(SYNO.SDS.LegacyAppWindow, {", "constructor: function(config) {", "{0}.MainWindow.superclass.constructor.call(this, Ext.apply({", "url: '{1}'", "}, config));", "}", "});", "{0}.prototype.jsConfig = SYNO.SDS.Config.FnMap['{0}'].config;", "{0}.MainWindow.prototype.jsConfig = SYNO.SDS.Config.FnMap['{0}'].config;");
            if (window.execScript) {
                window.execScript(String.format(tpl, className, url), "JavaScript")
            } else {
                window.eval(String.format(tpl, className, url))
            }
        },
        instanceCount = function() {
            var count = 0;
            var oldInstance = SYNO.SDS.AppMgr.getByAppName(className);
            if (true === appCfg.matchInstanceName) {
                oldInstance.each(function(item, index, length) {
                    if (item.instanceName === param.instanceName) {
                        matchInstance = item;
                        count++
                    }
                })
            } else {
                count = oldInstance.length
            }
            return count
        },
        canLaunch = function(classNamem, param) {
            if (Ext.isObject(param) && param.is_cms_open) {
                return true
            }
            return SYNO.SDS.StatusNotifier.isAppEnabled(className)
        },
        canLaunchNewApp = function() {
            var loadingCnt = appCfg.loadingCnt || 0,
                currInst = instanceCount(),
                maxInst = appCfg.allowMultiInstance ? appCfg.maxInstance || 0 : 1;
            return (!maxInst || maxInst > (loadingCnt + currInst))
        },
        requestToOldInstance = function() {
            var oldInstance = null;
            if (matchInstance) {
                matchInstance.open(param);
                return true
            } else {
                oldInstance = SYNO.SDS.AppMgr.getByAppName(className);
                if (oldInstance.length > 0) {
                    oldInstance[oldInstance.length - 1].open(param);
                    return true
                }
            }
            return false
        },
        launchApp = function() {
            if (_S("standalone")) {
                var el = SYNO.SDS.Desktop.getEl();
                el.unmask();
                el.removeClass(["sds-window-v5", "sds-window-init-loading"])
            }
            var appInst;
            try {
                var Fn;
                if (SYNO.SDS.WindowMgr.allHided) {
                    SYNO.SDS.WindowMgr.toggleAllWin();
                    SYNO.SDS.StatusNotifier.on("allwinrestored", launchApp, this, {
                        single: true
                    });
                    return
                }
                appCfg.loadingCnt--;
                try {
                    Fn = Ext.getClassByName(className)
                } catch (err) {}
                if (!Fn && "legacy" === appCfg.type) {
                    generateLegacyApp();
                    Fn = Ext.getClassByName(className)
                }
                if (taskButton || (newInstance && canLaunchNewApp()) || !requestToOldInstance()) {
                    if (!(Fn.prototype instanceof SYNO.SDS.AppInstance)) {
                        SYNO.Debug.error(className + " is not extends from AppInstance.");
                        return
                    }
                    if (canLaunch(className, param) === false) {
                        return
                    }
                    appInst = new Fn(Ext.copyTo({
                        taskButton: taskButton
                    }, param, "instanceName"));
                    appInst.open(param)
                }
            } catch (err) {
                SYNO.Debug.error(className + " launch failed: ", err, err.stack);
                if (Ext.isDefined(SYNO.SDS.JSDebug)) {
                    throw err
                }
                return
            }
            if (callback) {
                callback.call(scope || window, appInst)
            }
        };
    if (!App || !App.config) {
        return
    }
    appCfg = App.config;
    if (_S("ha_running") && SYNO.SDS.IsHABlackList(className)) {
        var msgBox = new SYNO.SDS.MessageBoxV5({
            modal: true,
            draggable: false,
            renderTo: document.body
        });
        msgBox.getWrapper().alert(_D("product"), _TT("SYNO.SDS.HA.Instance", "ui", "warning_forbidden_action"));
        return
    }
    if (SYNO.SDS.Config.CheckCSPRefresh && SYNO.SDS.Config.CheckCSPRefresh.indexOf(className) != -1) {
        SYNO.SDS.Desktop.getMsgBox().confirm(_D("product"), _T("pkgmgr", "csp_need_refresh"), function(btn) {
            if ("yes" === btn) {
                window.location.href = "/";
                return
            }
            var idx = SYNO.SDS.Config.CheckCSPRefresh.indexOf(className);
            SYNO.SDS.Config.CheckCSPRefresh.splice(idx, 1);
            SYNO.SDS.AppLaunch(className, param, newInstance, callback, scope)
        }, this);
        return
    }
    if (param && param.className) {
        appPrivClassName = param.className
    }
    if (!SYNO.SDS.StatusNotifier.isAppEnabled(appPrivClassName)) {
        return
    }
    if ("url" === appCfg.type || ("standalone" === appCfg.type && !_S("standalone")) || ("legacy" === appCfg.type && "url" === appCfg.urlDefMode)) {
        SYNO.SDS.WindowLaunch(className, param, !_S("rewriteApp"));
        return
    }
    if ("standalone" !== appCfg.type && "app" !== appCfg.type && "legacy" !== appCfg.type) {
        SYNO.Debug.error(className + " is not app type.");
        return
    }
    if (SYNO.SDS.WindowMgr.allHided) {
        SYNO.SDS.WindowMgr.toggleAllWin();
        SYNO.SDS.AppLaunch.defer(1000, this, arguments);
        return
    }
    if (SYNO.SDS.WindowMgr.exposeMask) {
        SYNO.SDS.WindowMgr.exposeWindow();
        SYNO.SDS.AppLaunch.defer(1000, this, arguments);
        return
    }
    param = param || {};
    if (Ext.isString(param)) {
        param = Ext.urlDecode(param)
    }
    newInstance = newInstance && (appCfg.allowMultiInstance || false);
    if (!_S("standalone") && (appCfg.hideTaskBtn !== true) && Ext.isDefined(appCfg.appWindow) && ((newInstance && canLaunchNewApp()) || (!instanceCount() && !appCfg.loadingCnt))) {
        taskButton = SYNO.SDS.TaskButtons.add(className, appCfg.appWindow);
        taskButton.setState("loading")
    }
    if (!Ext.isNumber(appCfg.loadingCnt)) {
        appCfg.loadingCnt = 0
    }
    appCfg.loadingCnt++;
    if (_S("standalone")) {
        var oldcallback = callback;
        var el = SYNO.SDS.Desktop.getEl(),
            config = SYNO.SDS.Config.FnMap[SYNO.SDS.Session.standaloneAppName].config,
            cls = ["sds-window-v5", "sds-window-init-loading", "sds-standalone-desktop"];
        if (config && Ext.isString(config.desktopcls)) {
            cls.push(config.desktopcls)
        }
        el.addClass(cls);
        if (config && config.preventDesktopMask !== true) {
            el.mask(_WFT("common", "loading"), "x-mask-loading x-standalone-loading")
        }
        callback = function() {
            if (oldcallback) {
                oldcallback.call(scope || window)
            }
        }
    }
    SYNO.SDS.JSLoad(className, launchApp)
};
Ext.define("SYNO.SDS.Utils.Notify.Badge", {
    extend: "Ext.BoxComponent",
    badgeNum: 0,
    alignPos: "br-br",
    alignOffset: [0, 0],
    badgeClassName: "sds-application-notify-badge-num",
    badgeHeight: 24,
    badgeWidth: 34,
    constructor: function(a) {
        if (a.badgeClassName && a.badgeClassName != this.badgeClassName) {
            this.badgeHeight = 14;
            this.badgeWidth = 19
        }
        this.callParent([a])
    },
    onRender: function(b, a) {
        if (!this.container.badgeEl) {
            this.el = new Ext.Element(document.createElement("div"));
            this.el.id = Ext.id();
            this.container.badgeEl = this.el;
            this.el.addClass(this.badgeClassName)
        }
        this.updateBadgePos();
        this.setNum(this.badgeNum);
        this.container.setARIA({
            describedby: this.el.dom.id
        });
        SYNO.SDS.Utils.Notify.Badge.superclass.onRender.call(this, b, a)
    },
    afterRender: function() {
        SYNO.SDS.Utils.Notify.Badge.superclass.afterRender.call(this);
        this.updateBadgePos()
    },
    bounceBadge: function() {
        if (Ext.isIE9m) {
            this.orgX = this.el.getX();
            this.orgY = this.el.getY();
            this.el.shift({
                x: this.orgX,
                y: this.orgY - 8,
                duration: 0,
                opacity: 0.3
            });
            this.el.shift({
                width: this.badgeWidth,
                height: this.badgeHeight,
                x: this.orgX,
                y: this.orgY,
                easing: "bounceOut",
                duration: 0.6,
                opacity: 1
            })
        } else {
            this.el.setStyle("opacity", 1);
            this.el.addClass("bounce-effect");
            Ext.defer(function() {
                this.el.removeClass("bounce-effect")
            }, 1000, this)
        }
    },
    setNum: function(a) {
        var b = this.badgeNum;
        if (!this.el) {
            return
        }
        a = a || 0;
        this.badgeNum = a;
        if (a <= 0) {
            this.el.setStyle("opacity", 0);
            return
        }
        if (a > 99) {
            a = 100
        }
        if (Math.min(b, 100) === a) {
            this.updateBadgePos();
            return
        }
        this.updateBadgePos();
        this.el.setStyle("background-position", "left -" + (this.badgeHeight * (a - 1)) + "px");
        this.el.setARIA({
            role: "presentation",
            label: String.format(_T("notification", "accessible_unread_messages"), this.badgeNum)
        });
        this.bounceBadge()
    },
    updateBadgePos: function() {
        if (!this.el) {
            return
        }
        this.el.anchorTo(this.container, this.alignPos, this.alignOffset)
    }
});
Ext.namespace("SYNO.SDS.Gesture");
SYNO.SDS.Gesture.EmptyGesture = Ext.extend(Ext.util.Observable, {
    onTouchStart: Ext.emptyFn,
    onTouchMove: Ext.emptyFn,
    onTouchEnd: Ext.emptyFn,
    onTouchCancel: Ext.emptyFn
});
SYNO.SDS.Gesture.BaseGesture = Ext.extend(SYNO.SDS.Gesture.EmptyGesture, {
    constructor: function() {
        SYNO.SDS.Gesture.BaseGesture.superclass.constructor.apply(this, arguments)
    },
    getBrowserEvent: function(a) {
        if (!a || !a.browserEvent) {
            return null
        }
        return a.browserEvent
    },
    getFirstTouch: function(a) {
        var c = null,
            b;
        b = this.getBrowserEvent(a);
        if (b && b.touches && b.touches.length > 0) {
            c = b.touches[0]
        }
        return c
    },
    getFirstChangedTouch: function(a) {
        var c = null,
            b;
        b = this.getBrowserEvent(a);
        if (b && b.changedTouches && b.changedTouches.length > 0) {
            c = b.changedTouches[0]
        }
        return c
    },
    getChangedTouchCount: function(a) {
        var b;
        b = this.getBrowserEvent(a);
        if (!b || !b.changedTouches || !Ext.isNumber(b.changedTouches.length)) {
            return -1
        }
        return b.changedTouches.length
    },
    getTouchCount: function(a) {
        var b;
        b = this.getBrowserEvent(a);
        if (!b || !b.touches || !Ext.isNumber(b.touches.length)) {
            return -1
        }
        return b.touches.length
    }
});
SYNO.SDS.Gesture.Swipe = Ext.extend(SYNO.SDS.Gesture.BaseGesture, {
    config: {
        minDistance: 80,
        maxOffset: 100,
        maxDuration: 1000
    },
    fireSwipe: function(a, e, c, d, b) {
        SYNO.SDS.GestureMgr.fireEvent("swipe", a, e, c, d, b)
    },
    getMinDistance: function() {
        return this.config.minDistance
    },
    getMaxOffset: function() {
        return this.config.maxOffset
    },
    getMaxDuration: function() {
        return this.config.maxDuration
    },
    setInitialXY: function(c) {
        var b, a, d;
        for (b = 0, a = c.changedTouches.length; b < a; b++) {
            d = c.changedTouches[b];
            this.initialTouches[d.identifier] = {
                x: d.pageX,
                y: d.pageY
            }
        }
    },
    getInitialXY: function(b) {
        var a = this.initialTouches[b.identifier];
        return {
            x: a.x,
            y: a.y
        }
    },
    onTouchStart: function(a, b, d) {
        var c = this.getBrowserEvent(a);
        this.startTime = c.timeStamp;
        this.isHorizontal = true;
        this.isVertical = true;
        if (!this.initialTouches) {
            this.initialTouches = {}
        }
        this.setInitialXY(c);
        this.touchCount = this.getTouchCount(a)
    },
    onTouchMove: function(a, b, c) {
        if (3 !== this.getTouchCount(a)) {
            return false
        }
        a.preventDefault();
        return this.checkTouchMove(a, b, c)
    },
    checkTouchXY: function(g, e, c) {
        var b, f, d, a;
        b = g.pageX;
        f = g.pageY;
        d = Math.abs(b - e);
        a = Math.abs(f - c);
        if (this.isVertical && d > this.getMaxOffset()) {
            this.isVertical = false
        }
        if (this.isHorizontal && a > this.getMaxOffset()) {
            this.isHorizontal = false
        }
        if (!this.isHorizontal && !this.isVertical) {
            return this.fail()
        }
    },
    checkTouchMove: function(j, b, d) {
        var g, i, c, h, a, f;
        h = this.getBrowserEvent(j);
        a = h.timeStamp;
        if (a - this.startTime > this.getMaxDuration()) {
            return this.fail()
        }
        for (g = 0, f = h.changedTouches.length; g < f; g++) {
            c = h.changedTouches[g];
            i = this.initialTouches[c.identifier];
            if (!i) {
                SYNO.Debug.error("Error: initial does not exist when handle touchmove, TouchEvent id:" + c.identifier);
                continue
            }
            if (false === this.checkTouchXY(c, i.x, i.y)) {
                return false
            }
        }
    },
    onTouchEnd: function(o, d, j) {
        var i, m, k, b, h, g, e, c, n, f, l, a;
        if (this.getTouchCount(o) !== 0) {
            return false
        }
        if (this.touchCount !== 3) {
            return false
        }
        i = this.getFirstChangedTouch(o);
        if (!i) {
            return false
        }
        m = i.pageX;
        k = i.pageY;
        b = this.getInitialXY(i);
        h = m - b.x;
        g = k - b.y;
        e = Math.abs(h);
        c = Math.abs(g);
        n = this.getMinDistance();
        f = o.browserEvent.timeStamp - this.startTime;
        if (this.isVertical && c < n) {
            this.isVertical = false
        }
        if (this.isHorizontal && e < n) {
            this.isHorizontal = false
        }
        if (this.isHorizontal) {
            l = (h < 0) ? "left" : "right";
            a = e
        } else {
            if (this.isVertical) {
                l = (g < 0) ? "up" : "down";
                a = c
            } else {
                return this.fail()
            }
        }
        this.fireSwipe(o, i, l, a, f)
    },
    fail: function() {
        return false
    }
});
SYNO.SDS.Gesture.LongPress = Ext.extend(SYNO.SDS.Gesture.BaseGesture, {
    config: {
        minDuration: 500
    },
    fireLongPress: function(a, b) {
        SYNO.SDS.GestureMgr.fireEvent("longpress", a, b)
    },
    getMinDuration: function() {
        return this.config.minDuration
    },
    onTouchStart: function(a, c, d) {
        var b = this;
        if (this.timer) {
            this.removeTimer()
        }
        this.timer = setTimeout(function() {
            b.fireLongPress(a, c);
            this.timer = null
        }, this.getMinDuration())
    },
    onTouchMove: function() {
        return this.fail()
    },
    onTouchEnd: function(a, b, c) {
        return this.fail()
    },
    removeTimer: function() {
        clearTimeout(this.timer);
        this.timer = null
    },
    fail: function() {
        this.removeTimer();
        return false
    }
});
SYNO.SDS.Gesture.DoubleTap = Ext.extend(SYNO.SDS.Gesture.BaseGesture, {
    config: {
        maxDuration: 300,
        maxOffset: 50
    },
    singleTapTimer: null,
    fireSingleTap: function(a, b) {},
    fireDoubleTap: function(a, b) {
        a.preventDefault();
        SYNO.SDS.GestureMgr.fireEvent("doubletap", a, b)
    },
    getMaxDuration: function() {
        return this.config.maxDuration
    },
    getMaxOffset: function() {
        return this.config.maxOffset
    },
    onTouchStart: function(a, b, c) {
        if (!a || !a.browserEvent) {
            return
        }
        if (this.isInMaxDuration(a.browserEvent.timeStamp, this.lastTapTime)) {
            a.preventDefault()
        }
    },
    onTouchMove: function() {
        return this.fail()
    },
    onTouchEnd: function(j, d, f) {
        var c, i = this.lastTapTime,
            b = this.lastX,
            a = this.lastY,
            e, h, g;
        if (this.getTouchCount(j) > 0) {
            return this.fail()
        }
        if (j && j.browserEvent) {
            c = j.browserEvent.timeStamp
        }
        this.lastTapTime = c;
        e = this.getFirstChangedTouch(j);
        if (!e) {
            return false
        }
        h = e.pageX;
        g = e.pageY;
        this.lastX = h;
        this.lastY = g;
        if (i && this.checkXY(b, a)) {
            if (this.isInMaxDuration(c, i)) {
                this.lastTapTime = 0;
                this.fireDoubleTap(j, d);
                return
            }
        }
    },
    checkXY: function(b, e) {
        var c = Math.abs(this.lastX - b),
            a = Math.abs(this.lastY - e),
            d = this.getMaxOffset();
        if (c < d && a < d) {
            return true
        }
        return false
    },
    isInMaxDuration: function(b, a) {
        if (!b || !a) {
            return false
        }
        return ((b - a) <= this.getMaxDuration()) ? true : false
    },
    fail: function() {
        this.lastTapTime = 0;
        this.lastX = undefined;
        this.lastY = undefined;
        return false
    }
});
Ext.ns("SYNO.SDS.Gesture.MS");
SYNO.SDS.Gesture.MS.Swipe = Ext.extend(SYNO.SDS.Gesture.Swipe, {
    config: {
        minDistance: 80,
        maxOffset: 500,
        maxDuration: 1000
    },
    constructor: function() {
        var a = this;
        SYNO.SDS.Gesture.MS.Swipe.superclass.constructor.apply(a, arguments)
    },
    setInitialXY: function(a) {
        this.initialTouches[a.pointerId] = {
            x: a.pageX,
            y: a.pageY
        }
    },
    getTouchCount: function() {
        var b, a = 0;
        if (this.initialTouches) {
            for (b in this.initialTouches) {
                if (this.initialTouches.hasOwnProperty(b)) {
                    a++
                }
            }
        }
        return a
    },
    checkTouchXY: function(g, e, c) {
        var b, f, d, a;
        b = g.pageX;
        f = g.pageY;
        d = Math.abs(b - e);
        a = Math.abs(f - c);
        if (this.isVertical && d > this.getMaxOffset()) {
            this.isVertical = false
        }
        if (this.isHorizontal && a > this.getMaxOffset()) {
            this.isHorizontal = false
        }
        if (!this.isHorizontal && !this.isVertical) {
            return this.fail()
        }
    },
    checkTouchMove: function(a, c, g) {
        var i, f, d;
        f = this.getBrowserEvent(a);
        d = f.timeStamp;
        if (d - this.startTime > this.getMaxDuration()) {
            return this.fail()
        }
        for (i in this.initialTouches) {
            if (this.initialTouches.hasOwnProperty(i)) {
                var b = this.initialTouches[i],
                    h;
                if (f && f.touches && f.touches.length > 0) {
                    h = f.touches[0]
                }
                if (!b) {
                    SYNO.Debug.error("Error: initial does not exist when handle touchmove, TouchEvent id:" + h.identifier);
                    continue
                }
                if (false === this.checkTouchXY(f, b.x, b.y)) {
                    return false
                }
            }
        }
    },
    onTouchStart: function(a, b, d) {
        var c = this.getBrowserEvent(a);
        this.startTime = c.timeStamp;
        this.isHorizontal = true;
        this.isVertical = true;
        if (!this.initialTouches) {
            this.initialTouches = {}
        }
        this.setInitialXY(c);
        this.touchCount = this.getTouchCount()
    },
    onTouchMove: function(a, b, c) {
        if (3 !== this.getTouchCount()) {
            return false
        }
        a.preventDefault();
        return this.checkTouchMove(a, b, c)
    },
    onTouchEnd: function(q, d, k) {
        var j, o, m, i, h, f, c, p, g, n, a, b, l = this.getBrowserEvent(q);
        if (!this.initialTouches || !this.initialTouches[l.pointerId]) {
            return false
        }
        b = this.initialTouches[l.pointerId];
        delete this.initialTouches[l.pointerId];
        if (this.getTouchCount() !== 0) {
            return false
        }
        if (this.touchCount !== 3) {
            return false
        }
        o = l.pageX;
        m = l.pageY;
        i = o - b.x;
        h = m - b.y;
        f = Math.abs(i);
        c = Math.abs(h);
        p = this.getMinDistance();
        g = l.timeStamp - this.startTime;
        if (this.isVertical && c < p) {
            this.isVertical = false
        }
        if (this.isHorizontal && f < p) {
            this.isHorizontal = false
        }
        if (this.isHorizontal) {
            n = (i < 0) ? "left" : "right";
            a = f
        } else {
            if (this.isVertical) {
                n = (h < 0) ? "up" : "down";
                a = c
            } else {
                return this.fail()
            }
        }
        this.fireSwipe(q, j, n, a, g)
    },
    onTouchCancel: function() {
        this.fail();
        delete this.initialTouches
    }
});
SYNO.SDS.Gesture.EmptyGestureObject = new SYNO.SDS.Gesture.EmptyGesture();
SYNO.SDS.Gesture.MS.EmptyGestureObject = SYNO.SDS.Gesture.EmptyGestureObject;
SYNO.SDS.Gesture.GestureFactory = Ext.extend(Object, {
    create: function(c) {
        var a = SYNO.SDS.UIFeatures.test("msPointerEnabled"),
            b = "SYNO.SDS.Gesture." + (a ? "MS." : "");
        switch (c) {
            case "Swipe":
                if (a && ((window.navigator.msMaxTouchPoints ? window.navigator.msMaxTouchPoints : 0) < 3)) {
                    return SYNO.SDS.Gesture.MS.EmptyGestureObject
                }
                b += c;
                break;
            case "LongPress":
                if (a) {
                    return SYNO.SDS.Gesture.MS.EmptyGestureObject
                }
                b += c;
                break;
            case "DoubleTap":
                if (a) {
                    return SYNO.SDS.Gesture.MS.EmptyGestureObject
                }
                b += c;
                break;
            default:
                if (a) {
                    return SYNO.SDS.Gesture.MS.EmptyGestureObject
                }
                return SYNO.SDS.Gesture.EmptyGestureObject
        }
        return this.getGestureInstance(b)
    },
    getGestureInstance: function(a) {
        var b = Ext.getClassByName(a);
        return new b()
    }
});
Ext.namespace("SYNO.SDS._GestureMgr");
SYNO.SDS._GestureMgr = Ext.extend(Ext.util.Observable, {
    constructor: function() {
        SYNO.SDS._GestureMgr.superclass.constructor.apply(this, arguments);
        this.gestures = ["Swipe", "LongPress", "DoubleTap"];
        this.init()
    },
    init: function() {
        var b, a, e, d, c = SYNO.SDS.UIFeatures.test("msPointerEnabled");
        e = Ext.getDoc();
        for (b = 0, a = this.gestures.length; b < a; b++) {
            d = this.getGestureInstance(this.gestures[b]);
            Ext.EventManager.on(e, c ? "MSPointerCancel" : "touchcancel", d.onTouchCancel, d);
            Ext.EventManager.on(e, c ? "MSPointerDown" : "touchstart", d.onTouchStart, d);
            Ext.EventManager.on(e, c ? "MSPointerUp" : "touchend", d.onTouchEnd, d);
            Ext.EventManager.on(e, c ? "MSPointerMove" : "touchmove", d.onTouchMove, d)
        }
        this.addGestureHandlers()
    },
    addGestureHandlers: function() {
        this.on("swipe", this.swipeHandler, this, {
            buffer: 10
        });
        this.on("longpress", this.longPressHandler, this);
        this.on("doubletap", this.doubleTapHandler, this)
    },
    getGestureInstance: function(a) {
        this.gestureFactory = this.gestureFactory || new SYNO.SDS.Gesture.GestureFactory();
        return this.gestureFactory.create(a)
    },
    swipeHandler: function(a, f, d, e, c) {
        var b;
        if (d === "right") {
            SYNO.SDS.TaskButtons.setRightWindowActive()
        } else {
            if (d === "left") {
                SYNO.SDS.TaskButtons.setLeftWindowActive()
            } else {
                if (d === "up") {
                    b = SYNO.SDS.WindowMgr.getActiveAppWindow();
                    if (b) {
                        b.minimize()
                    }
                }
            }
        }
    },
    longPressHandler: function(c, e) {
        var d, b, a;
        d = this.findEventHandlers(e, "contextmenu");
        for (b = 0, a = d.length; b < a; b++) {
            d[b](c.browserEvent)
        }
    },
    doubleTapHandler: function(c, e) {
        var d, b, a;
        d = this.findEventHandlers(e, "dblclick");
        for (b = 0, a = d.length; b < a; b++) {
            d[b](c.browserEvent)
        }
    },
    findEventHandlers: function(h, d) {
        var g = Ext.get(h),
            f, b, a, e, c = [];
        while (g) {
            f = Ext.EventManager.getListeners(g, d);
            if (!f) {
                g = g.parent();
                continue
            }
            for (b = 0, a = f.length; b < a; b++) {
                e = f[b];
                c.push(e[1])
            }
            break
        }
        return c
    }
});
Ext.define("SYNO.SDS.About.Window", {
    extend: "SYNO.SDS.ModalWindow",
    constructor: function(a) {
        var b = {
            title: _T("personal_settings", "about"),
            cls: "sds-user-about-window x-window-dlg",
            closable: false,
            useStatusBar: false,
            maximizable: false,
            minimizable: false,
            resizable: false,
            header: false,
            width: 480,
            draggable: false,
            height: 240,
            elements: "body",
            renderTo: Ext.getBody(),
            padding: "20px 20px 0px 20px",
            items: this.configureItems(),
            footerStyle: "padding: 0 0 20px 0",
            modal: false,
            ownerMasked: true,
            fbar: {
                buttonAlign: "center",
                items: new SYNO.ux.Button({
                    text: _T("common", "ok"),
                    handler: this.close,
                    scope: this
                })
            },
            listeners: {
                show: {
                    fn: this.onAfterShow,
                    scope: this
                },
                beforeclose: {
                    fn: this.onBeforeClose,
                    scope: this
                }
            }
        };
        Ext.apply(b, a);
        this.callParent([b]);
        Ext.EventManager.onWindowResize(this.onBrowserWinResize, this)
    },
    onAfterShow: function() {
        SYNO.SDS.Desktop.el.setStyle("zIndex", 0);
        Ext.getBody().mask().addClass("sds-user-about-mask")
    },
    onBrowserWinResize: function() {
        this.center()
    },
    onBeforeClose: function() {
        Ext.EventManager.removeResizeListener(this.onBrowserWinResize, this);
        Ext.getBody().unmask();
        SYNO.SDS.Desktop.el.setStyle("zIndex", "")
    },
    configureItems: function() {
        return [{
            xtype: "box",
            tabIndex: 0,
            role: "article",
            cls: "sds-user-about-desc",
            html: _T("personal_settings", "about_desc")
        }, {
            xtype: "box",
            cls: "sds-user-about-terms-and-cond",
            html: _T("personal_settings", "terms_and_conditions")
        }]
    }
});
Ext.define("SYNO.SDS._System", {
    extend: "Ext.Component",
    Reboot: function() {
        SYNO.SDS.System.RebootWithMsg()
    },
    RebootWithMsg: function(b) {
        var a = SYNO.SDS.System;
        if ("yes" === _D("support_dual_head", "no")) {
            a._launchAHA();
            return
        }
        if (_S("ha_running")) {
            a._launchHA();
            return
        }
        SYNO.SDS.Desktop.hide();
        a.getMsgBox().confirm(_D("product"), b || _JSLIBSTR("uicommon", "reboot_warn"), function(c) {
            if ("yes" === c) {
                a._rebootSystem()
            } else {
                if ("no" === c) {
                    SYNO.SDS.Desktop.show()
                }
            }
        }, a)
    },
    PowerOff: function() {
        SYNO.SDS.System.PowerOffWithMsg()
    },
    PowerOffWithMsg: function(b) {
        var a = SYNO.SDS.System;
        if ("yes" === _D("support_dual_head", "no")) {
            a._launchAHA();
            return
        }
        if (_S("ha_running")) {
            a._launchHA();
            return
        }
        SYNO.SDS.Desktop.hide();
        a.getMsgBox().confirm(_D("product"), b || _JSLIBSTR("uicommon", "shutdown_warn"), function(c) {
            if ("yes" === c) {
                a._shutdownSystem()
            } else {
                if ("no" === c) {
                    SYNO.SDS.Desktop.show()
                }
            }
        }, a)
    },
    WaitForBootUp: function() {
        SYNO.SDS.Desktop.hide();
        SYNO.SDS.System._rebootSystem(false, false, true)
    },
    Logout: function() {
        SYNO.SDS.StatusNotifier.fireEvent("logout");
        window.onbeforeunload = SYNO.SDS.onBasicBeforeUnload;
        try {
            SYNO.SDS.Utils.Logout.action()
        } catch (a) {}
    },
    About: function() {
        var a = new SYNO.SDS.About.Window();
        a.show()
    },
    _launchHA: function() {
        var a = SYNO.SDS.System;
        a.getMsgBox().confirm(_D("product"), _TT("SYNO.SDS.HA.Instance", "ui", "warning_forbid_power_option"), function(b) {
            if ("yes" === b) {
                SYNO.SDS.AppLaunch("SYNO.SDS.HA.Instance")
            }
        })
    },
    _launchAHA: function() {
        var a = SYNO.SDS.System;
        a.getMsgBox().confirm(_D("product"), _TT("SYNO.SDS.AHA.Instance", "uicommon", "warning_forbid_power_option"), function(b) {
            if ("yes" === b) {
                SYNO.SDS.AppLaunch("SYNO.SDS.AHA.Instance")
            }
        })
    },
    _rebootSystem: function(c, a, b) {
        var d;
        this.getMsgBox().show({
            wait: true,
            closable: false,
            maxWidth: 300,
            title: _D("product"),
            msg: (true === b) ? _T("login", "error_system_getting_ready") : _JSLIBSTR("uicommon", "system_reboot").replace(/INTEGRA/g, _D("product"))
        });
        if (false === c && false === a) {
            d = "skip_cmd"
        } else {
            d = "reboot"
        }
        this._haltSystem(d, c, function() {
            var f, e = 0;
            if (d === "skip_cmd") {
                e = 2
            }
            f = this.addAjaxTask({
                preventHalt: true,
                interval: 5000,
                autoJsonDecode: true,
                url: "webman/pingpong.cgi",
                startTime: new Date().getTime(),
                timeLimit: 600000,
                scope: this,
                success: function(g, h) {
                    if (e < 2) {
                        e = 0;
                        return
                    }
                    if (g && g.boot_done) {
                        f.stop();
                        window.location.href = "/"
                    }
                },
                failure: function(i, h) {
                    var g = new Date().getTime();
                    if (!h.timeoutNotified && (g - h.startTime) > h.timeLimit) {
                        this.getMsgBox().show({
                            closable: false,
                            maxWidth: 300,
                            title: _D("product"),
                            msg: _JSLIBSTR("uicommon", "system_reboot_timeout").replace(/INTEGRA/g, _D("product"))
                        });
                        h.timeoutNotified = true
                    }
                    e++
                }
            }).start()
        }, this)
    },
    _shutdownSystem: function(a) {
        this.getMsgBox().show({
            closable: false,
            maxWidth: 300,
            title: _D("product"),
            msg: _JSLIBSTR("uicommon", "system_poweroff").replace(/INTEGRA/g, _D("product"))
        });
        this._haltSystem("shutdown", a)
    },
    _haltSystem: function(d, c, a, b) {
        d = d || "reboot";
        if ("skip_cmd" === d) {
            SYNO.SDS.StatusNotifier.fireEvent("halt");
            window.onbeforeunload = null;
            if (Ext.isFunction(a)) {
                a.apply(b)
            }
            return
        }
        this.addWebAPITask({
            interval: 1000,
            single: true,
            api: "SYNO.Core.System",
            method: d,
            version: 1,
            params: {
                force: c ? true : false,
                local: true
            },
            callback: function(j, h) {
                var g = (d === "reboot") ? _T("system", "running_tasks_confirm_reboot") : _T("system", "running_tasks_confirm_shutdown");
                var f;
                if (j === false) {
                    f = h.errors
                }
                if (j === false && f.blockingTasks) {
                    var e = this.getTasks(f.blockingTasks);
                    this.getMsgBox().alert(_D("product"), _T("system", "running_tasks_warning") + "<br><br>" + e + "<br><br>" + _T("system", "try_later_warning"), function(k) {
                        SYNO.SDS.Desktop.show()
                    }, this);
                    return
                }
                if (j === false && f.runningTasks) {
                    var i = this.getTasks(f.runningTasks);
                    this.getMsgBox().confirm(_D("product"), g + "<br><br>" + i, function(k) {
                        if ("yes" === k) {
                            if (d === "shutdown") {
                                this._shutdownSystem(true)
                            } else {
                                this._rebootSystem(true)
                            }
                        } else {
                            if ("no" === k) {
                                SYNO.SDS.Desktop.show()
                            }
                        }
                    }, this);
                    return
                }
                SYNO.SDS.StatusNotifier.fireEvent("halt");
                window.onbeforeunload = null;
                if (a) {
                    a.apply(b)
                }
            },
            scope: this
        }).start()
    },
    CountCharInStr: function(d, e) {
        var a = 0,
            b = 0;
        for (b = 0; b < d.length; ++b) {
            if (e == d[b]) {
                a++
            }
        }
        return a
    },
    getTasks: function(d) {
        var a = [];
        var b;
        var c;
        Ext.each(d, function(e) {
            if (-1 === e.indexOf(":")) {
                a.push(e)
            } else {
                b = e.split(":");
                if (1 === this.CountCharInStr(e, ":")) {
                    c = (0 === _T(b[0], b[1]).length) ? _JSLIBSTR(b[0], b[1]) : _T(b[0], b[1])
                } else {
                    if (2 === this.CountCharInStr(e, ":")) {
                        c = _TT(b[0], b[1], b[2])
                    } else {
                        return true
                    }
                }
                a.push(c)
            }
        }, this);
        return a.join("<br> ")
    },
    getMsgBox: function(b) {
        var a = SYNO.SDS.System;
        if (!a.msgBox || a.msgBox.isDestroyed) {
            a.msgBox = new SYNO.SDS.MessageBoxV5({
                modal: true,
                draggable: false,
                renderTo: document.body
            })
        }
        return a.msgBox.getWrapper()
    }
});
Ext.define("SYNO.SDS._FocusMgr", {
    extend: "Ext.util.Observable",
    constructor: function() {
        if (Ext.isIE) {
            document.onfocusin = this.onFocusChange
        } else {
            document.addEventListener("focus", this.onFocusChange, true)
        }
        this.callParent(arguments)
    },
    onFocusChange: function() {
        var a = SYNO.SDS.WindowMgr.getActiveAppWindow();
        if (a) {
            a.addFocusPt()
        }
    },
    focusActiveWindow: function() {
        var a = SYNO.SDS.WindowMgr.getActiveAppWindow();
        if (a) {
            a.focusLastWindowPt()
        }
    }
});
Ext.define("SYNO.SDS.BackgroundTpl", {
    extend: "Ext.XTemplate",
    defaultConf: {
        type: "fill",
        imgSrc: Ext.BLANK_IMAGE_URL,
        imgW: 0,
        imgH: 0,
        bgColor: "#FFFFFF",
        winW: Ext.lib.Dom.getViewWidth(),
        winH: Ext.lib.Dom.getViewHeight(),
        cls: ""
    },
    constructor: function(a) {
        Ext.apply(this, this.defaultConf);
        Ext.apply(this, a);
        if (!this.id) {
            this.id = Ext.id()
        }
        if (this.type === "fill" || this.type === "fit") {
            this.useFitFillTpl()
        } else {
            if (this.type === "center") {
                this.useCenterTpl()
            } else {
                if (this.type === "stretch") {
                    this.useStretchTpl()
                } else {
                    if (this.type === "tile") {
                        this.useTileTpl()
                    } else {
                        SYNO.Debug.warn("No such background template")
                    }
                }
            }
        }
    },
    useFitFillTpl: function() {
        SYNO.SDS.BackgroundTpl.superclass.constructor.call(this, '<div id="{id}" class="{cls}"; style="background-color: {bgColor};">', '<tpl if="(this.imgSizeSet)">', '<img id={imgId} style="position: absolute; visibility: visible; width: {bgW}px; height: {bgH}px; left: {left}px; top: {top}px;" src="{imgSrc}" draggable="false">', "</tpl>", '<tpl if="(!this.imgSizeSet)">', '<img id={imgId} style="position: absolute; visibility: visible;" src="{imgSrc}" draggable="false">', "</tpl>", "</div>")
    },
    useStretchTpl: function() {
        SYNO.SDS.BackgroundTpl.superclass.constructor.call(this, '<div id="{id}" class="{cls}"; style="background-color: {bgColor};">', '<img id={imgId} style="position: absolute; visibility: visible; width: 100%; height: 100%" src="{imgSrc}" draggable="false">', "</div>")
    },
    useCenterTpl: function() {
        SYNO.SDS.BackgroundTpl.superclass.constructor.call(this, '<div id="{id}" class="{cls}"; style="width: {winW}px; height: {winH}px; background-color: {bgColor}; background-image: url({imgSrc}); background-position: 50% 50%; background-repeat: no-repeat;"></div>')
    },
    useTileTpl: function() {
        SYNO.SDS.BackgroundTpl.superclass.constructor.call(this, '<div id="{id}" class="{cls}"; style="width: {winW}px; height: {winH}px; background-color: {bgColor}; background-image: url({imgSrc}); background-repeat: repeat;"></div>')
    },
    setImgSize: function(a, b) {
        this.imgW = a;
        this.imgH = b;
        this.imgSizeSet = true
    },
    getFillConfig: function() {
        var c = this.winH,
            b = this.winW;
        var d = this.imgW / this.imgH;
        var a;
        if (b > c * d) {
            a = this.fitByWidth(b, c, d)
        } else {
            a = this.fitByHeight(b, c, d)
        }
        return a
    },
    getFitConfig: function() {
        var c = this.winH,
            b = this.winW;
        var d = this.imgW / this.imgH;
        var a;
        if (b > c * d) {
            a = this.fitByHeight(b, c, d)
        } else {
            a = this.fitByWidth(b, c, d)
        }
        return a
    },
    fitByWidth: function(b, c, d) {
        var a = {
            bgW: b,
            bgH: b / d,
            left: 0,
            top: (c - (b / d)) / 2
        };
        return a
    },
    fitByHeight: function(b, c, d) {
        var a = {
            bgW: c * d,
            bgH: c,
            left: (b - (c * d)) / 2,
            top: 0
        };
        return a
    },
    fill: function(a) {
        var b;
        Ext.apply(this, a);
        switch (this.type) {
            case "fill":
                b = this.getFillConfig();
                break;
            case "fit":
                b = this.getFitConfig();
                break;
            case "center":
            case "stretch":
            case "tile":
                break;
            default:
        }
        Ext.apply(this, b);
        return this.applyTemplate(this)
    }
});
Ext.define("SYNO.SDS.Background", {
    extend: "Ext.Container",
    constructor: function(a) {
        Ext.apply(this, a);
        this.imgId = Ext.id();
        this.backgroundTpl = new SYNO.SDS.BackgroundTpl({
            type: a.type,
            imgSrc: a.imgSrc,
            imgId: this.imgId,
            bgColor: a.bgColor
        });
        this.bgWallpaper = new Ext.BoxComponent({
            html: this.backgroundTpl.fill({
                winW: Ext.lib.Dom.getViewWidth(),
                winH: Ext.lib.Dom.getViewHeight()
            })
        });
        if (this.type === "fit" || this.type === "fill") {
            this.bgWallpaper.on("afterrender", this.updateImgSize, this)
        }
        var b = {
            id: a.id,
            width: Ext.lib.Dom.getViewWidth(),
            height: Ext.lib.Dom.getViewHeight(),
            items: [this.bgWallpaper]
        };
        SYNO.SDS.Background.superclass.constructor.call(this, b)
    },
    updateImgSize: function() {
        var b = Ext.fly(this.imgId);
        if (Ext.isIE || Ext.isModernIE) {
            var a = new Image();
            if (Ext.isIE8) {
                var c = new Date();
                b.dom.src += "&nocache=" + c.getTime()
            }
            a.src = b.dom.src;
            Ext.fly(a).on("load", this.onImgLoad, this)
        } else {
            b.on("load", this.onImgLoad, this)
        }
    },
    onImgLoad: function() {
        var a = Ext.fly(this.imgId);
        this.backgroundTpl.setImgSize(a.getWidth(), a.getHeight());
        this.resize()
    },
    resize: function() {
        this.bgWallpaper.el.dom.innerHTML = this.backgroundTpl.fill({
            winW: Ext.lib.Dom.getViewWidth(),
            winH: Ext.lib.Dom.getViewHeight()
        });
        this.doLayout()
    }
});
Ext.namespace("SYNO.SDS.Wizard");
SYNO.SDS.Wizard.Step = Ext.extend(Ext.Panel, {
    getNext: function() {
        return this.nextId ? this.nextId : null
    },
    checkState: function() {
        if (this.owner.hasHistory()) {
            this.owner.getButton("back").show()
        } else {
            this.owner.getButton("back").hide()
        }
        if (this.nextId === null) {
            this.owner.getButton("next").setText(_T("common", "commit"))
        } else {
            this.owner.getButton("next").setText(_T("common", "next"))
        }
        this.owner.getButton("back").enable();
        if (_S("demo_mode") && this.disableNextInDemoMode) {
            this.owner.getButton("next").disable();
            this.owner.getButton("next").setTooltip(_JSLIBSTR("uicommon", "error_demo"))
        } else {
            this.owner.getButton("next").enable();
            this.owner.getButton("next").setTooltip("")
        }
    }
});
SYNO.SDS.Wizard.WelcomeStep = Ext.extend(SYNO.SDS.Wizard.Step, {
    constructor: function(b) {
        if (!Ext.isObject(b)) {
            throw Error("invalid config of WelcomeStep")
        }
        this.leftTextBox = new Ext.BoxComponent({
            html: ""
        });
        var a = {
            layout: "border",
            padding: 0,
            bwrapCfg: {
                cls: "x-panel-bwrap sds-wizard-welcome-bwrap"
            },
            items: [{
                xtype: "panel",
                region: "west",
                border: false,
                split: false,
                width: 140,
                bodyCssClass: "welcome-image",
                items: [this.leftTextBox]
            }, {
                region: "center",
                border: false,
                layout: "vbox",
                itemId: "wizard_welcome_center",
                layoutConfig: {
                    align: "stretch",
                    pack: "start"
                },
                items: [{
                    border: false,
                    autoHeight: true,
                    role: "article",
                    tabIndex: 0,
                    bodyCssClass: "welcome-headline"
                }, {
                    border: false,
                    flex: 1,
                    role: "article",
                    tabIndex: 0,
                    bodyCssClass: "welcome-text"
                }]
            }]
        };
        if (Ext.isObject(b.imageCls)) {
            Ext.apply(a.items[0], b.imageCls)
        } else {
            if (b.imageCls) {
                a.items[0].bodyCssClass = b.imageCls
            }
        }
        var c = Ext.util.Format.htmlEncode(b.leftTitle);
        var d = String.format('<p class="welcome-image-text">' + c + "</p>");
        if (Ext.isObject(b.leftTitle)) {
            Ext.apply(this.leftTextBox.html, d)
        } else {
            if (b.leftTitle) {
                this.leftTextBox.html = d
            }
        }
        if (Ext.isObject(b.headline)) {
            Ext.apply(a.items[1].items[0], b.headline)
        } else {
            if (b.headline) {
                a.items[1].items[0].html = b.headline
            }
        }
        if (Ext.isObject(b.description)) {
            Ext.apply(a.items[1].items[1], b.description)
        } else {
            if (b.description) {
                a.items[1].items[1].html = b.description
            }
        }
        if (Ext.isDefined(b.headLineHeight)) {
            a.items[1].items[0].height = b.headLineHeight
        }
        delete b.imageCls;
        delete b.headline;
        delete b.description;
        Ext.apply(a, b);
        SYNO.SDS.Wizard.WelcomeStep.superclass.constructor.call(this, a)
    },
    getHeadLine: function() {
        return this.getComponent("wizard_welcome_center").items.items[0]
    },
    activate: function() {
        this.hideBanner()
    },
    deactivate: function() {
        this.showBanner()
    },
    hideBanner: function() {
        if (this.owner.banner) {
            this.owner.getComponent("banner").hide();
            this.owner.doLayout()
        }
    },
    showBanner: function() {
        if (this.owner.banner) {
            this.owner.getComponent("banner").show();
            this.owner.doLayout()
        }
    },
    listeners: {
        afterlayout: function(a) {
            var b = this.getHeight() - 24;
            this.leftTextBox.setWidth(b)
        }
    }
});
SYNO.SDS.Wizard.SummaryStore = Ext.extend(Ext.data.JsonStore, {
    constructor: function() {
        SYNO.SDS.Wizard.SummaryStore.superclass.constructor.call(this, {
            autoDestroy: true,
            root: "data",
            fields: ["key", "value"]
        })
    },
    append: function(a, b) {
        this.loadData({
            data: [{
                key: a,
                value: b
            }]
        }, true)
    },
    appendSub: function(b, c) {
        var a = "&nbsp;&nbsp;&nbsp;&nbsp;{0}";
        this.append(String.format(a, b), c)
    },
    appendNoChange: function(a) {
        this.append(a, String.format("[{0}]", _T("tree", "nochangepage")))
    }
});
SYNO.SDS.Wizard.SummaryStep = Ext.extend(SYNO.ux.GridPanel, {
    showCommitButton: false,
    constructor: function(b) {
        var a = Ext.apply({
            headline: _T("ezinternet", "ezinternet_summary_title"),
            description: _T("wizcommon", "summary_descr"),
            viewConfig: {
                forceFit: false
            },
            columns: [{
                width: 150,
                header: _T("status", "header_item"),
                dataIndex: "key",
                renderer: this.fieldRenderer
            }, {
                id: "value",
                autoExpand: true,
                header: _T("status", "header_value"),
                dataIndex: "value",
                renderer: this.descRenderer,
                scope: this
            }],
            enableHdMenu: false,
            enableColumnMove: false,
            autoExpandColumn: "value",
            store: new SYNO.SDS.Wizard.SummaryStore()
        }, b);
        SYNO.SDS.Wizard.SummaryStep.superclass.constructor.call(this, a)
    },
    fieldRenderer: function(a) {
        return "<b>" + a + "</b>"
    },
    descRenderer: function(e, b, a, g, d, c) {
        var f = Ext.util.Format.htmlEncode(e);
        b.attr = 'ext:qtip="' + Ext.util.Format.htmlEncode(f) + '"';
        return f
    },
    activate: function() {
        var a = this.owner.stepStack;
        var c = null;
        this.getStore().removeAll(true);
        for (var b = 0; b < a.length; b++) {
            c = this.owner.getStep(a[b]);
            if (Ext.isFunction(c.summary)) {
                c.summary(this.getStore())
            }
        }
        this.getView().refresh()
    },
    checkState: function() {
        SYNO.SDS.Wizard.Step.prototype.checkState.apply(this, arguments);
        if (this.showCommitButton) {
            this.owner.getButton("next").setText(_T("common", "commit"))
        }
    }
});
SYNO.SDS.Wizard.TaskStore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        SYNO.SDS.Wizard.TaskStore.superclass.constructor.call(this, Ext.apply({
            autoDestroy: true,
            idProperty: "id",
            root: "data",
            fields: ["id", "text", "config", "option", "status"]
        }, a))
    },
    append: function(e, d, a, b) {
        var c = new this.recordType({
            status: "",
            id: e,
            text: d,
            config: a,
            option: b || {}
        }, e);
        this.add(c);
        c.set("status", "queue");
        c.setStatus = function(f) {
            c.set("status", f);
            c.store.commitChanges()
        };
        return c
    },
    get: function(a) {
        if (Ext.isString(a)) {
            return this.getById(a)
        } else {
            if (Ext.isNumber(a)) {
                return this.getAt(a)
            } else {
                if (Ext.isObject(a) && a.store && this === a.store) {
                    return a
                }
            }
        }
        return undefined
    }
});
SYNO.SDS.Wizard.ApplyStep = Ext.extend(SYNO.ux.GridPanel, {
    currentTask: null,
    stopOnFail: true,
    constructor: function(a) {
        SYNO.SDS.Wizard.ApplyStep.superclass.constructor.call(this, Ext.apply({
            headline: _T("ezinternet", "ezinternet_apply_title"),
            description: _T("ezinternet", "ezinternet_apply_desc"),
            cls: "without-dirty-red-grid",
            store: new SYNO.SDS.Wizard.TaskStore(),
            viewConfig: {
                forceFit: false,
                headersDisabled: true
            },
            hideHeaders: true,
            columns: [{
                header: "",
                align: "center",
                width: 30,
                dataIndex: "status",
                renderer: this.renderStatus
            }, {
                id: "text",
                header: "Activity",
                dataIndex: "text",
                renderer: function(b) {
                    return b
                }
            }],
            draggable: false,
            enableColumnMove: false,
            autoExpandColumn: "text"
        }, a))
    },
    renderStatus: function(a) {
        var b = {
            doing: '<div class="x-status-loading">&nbsp;</div>',
            done: '<div class="x-status-success">&nbsp;</div>',
            fail: '<div class="x-status-fail">&nbsp;</div>'
        };
        if (b[a]) {
            return b[a]
        }
    },
    checkState: function() {
        if (this.owner.hasHistory()) {
            this.owner.getButton("back").show()
        } else {
            this.owner.getButton("back").hide()
        }
        this.owner.getButton("cancel").hide();
        if (this.nextId === null) {
            this.owner.getButton("next").setText(_T("common", "finish"))
        } else {
            this.owner.getButton("next").setText(_T("common", "next"))
        }
    },
    activate: function() {
        var c = this;
        var b = this.getStore();
        var a = this.owner.stepStack;
        var d = null;
        this.owner.clearStatus();
        b.removeAll(true);
        Ext.each(a, function(f) {
            var e = this.owner.getStep(f);
            if (Ext.isFunction(e.appendTask)) {
                b.commitChanges();
                e.appendTask(b);
                d = b.getModifiedRecords();
                Ext.each(d, function(g) {
                    var h = g.get("option");
                    if (h && !h.backId) {
                        h.backId = f
                    }
                    g.report = function(i) {
                        c.report(i)
                    };
                    g.doNextTask = function(i) {
                        c.doNextTask(i)
                    }
                }, this)
            }
        }, this);
        b.commitChanges();
        this.getView().refresh();
        if (b.getCount() > 0) {
            this.start()
        } else {
            this.finish.defer(300, this)
        }
    },
    deactivate: function() {
        if (this.currentTask) {
            SYNO.Debug.error("task is running");
            return false
        }
    },
    report: function(a) {
        if (!a) {
            return
        }
        if (a.success) {
            this.owner.setStatusOK(a)
        } else {
            this.owner.setStatusError(a)
        }
    },
    start: function() {
        this.owner.getButton("back").disable();
        this.owner.getButton("next").disable();
        this.doTask(0)
    },
    finish: function() {
        var a = !Ext.isString(this.getBack());
        if (a) {
            this.owner.getButton("back").disable();
            this.owner.getButton("back").hide();
            this.report({
                success: true
            })
        } else {
            this.owner.getButton("back").enable();
            this.owner.getButton("next").setText(_T("common", "cancel"))
        }
        this.owner.getButton("next").enable();
        this.currentTask = null
    },
    getBack: function() {
        var a = this.getStore();
        var c = null;
        var b = 0;
        for (b = 0; b < a.getCount(); b++) {
            c = a.getAt(b);
            if ("fail" === c.get("status")) {
                return c.get("option").backId
            }
        }
        return false
    },
    doTask: function(a) {
        var b = {};
        a = this.getStore().get(a);
        if (!a) {
            return
        }
        a.setStatus("doing");
        Ext.apply(b, a.get("config"));
        this.currentTask = a;
        this.compound = b.compound;
        this.sendWebAPI(Ext.apply(b, {
            callback: this.taskDone,
            scope: this
        }))
    },
    taskDone: function(e, d, c) {
        var b = this.currentTask.get("config");
        var a;
        if (Ext.isFunction(b.callback)) {
            a = b.callback.call(b.scope || undefined, e, d, c)
        }
        if (false === a || "doing" === a) {
            return
        }
        if (!e || (this.compound && d.has_fail)) {
            this.doNextTask(false);
            return
        }
        this.doNextTask(e)
    },
    doNextTask: function(c) {
        var a = this.currentTask;
        var b = this.getStore().indexOf(a);
        a.setStatus(c ? "done" : "fail");
        if (this.stopOnFail && !c) {
            this.finish();
            return
        }
        if (-1 === b) {
            throw Error("can not found index of current task")
        }
        if (b + 1 < this.getStore().getCount()) {
            this.doTask(b + 1)
        } else {
            this.finish()
        }
    }
});
Ext.namespace("SYNO.SDS.Wizard");
SYNO.SDS.Wizard.AppWindow = Ext.extend(SYNO.SDS.AppWindow, {
    constructor: function(a) {
        this.updateDsmStyle(a);
        this.addClass("sds-wizard-window");
        SYNO.SDS.Wizard.AppWindow.superclass.constructor.call(this, this.configWizard(a));
        if (this.getActiveStep() instanceof SYNO.SDS.Wizard.WelcomeStep) {
            this.footer.addClass("sds-wizard-footer-welcome");
            this.footer.removeClass("sds-wizard-footer")
        } else {
            this.footer.removeClass("sds-wizard-footer-welcome");
            this.footer.addClass("sds-wizard-footer")
        }
        this.stepStack = []
    },
    onOpen: function() {
        SYNO.SDS.Wizard.AppWindow.superclass.onOpen.apply(this, arguments);
        var a = this.getActiveStep();
        if (a && Ext.isFunction(a.activate)) {
            if (false === a.activate()) {
                return
            }
        }
        this.syncView()
    },
    onClose: function() {
        var a = true;
        var b = this.getActiveStep();
        if (b && Ext.isFunction(b.deactivate)) {
            if (false === b.deactivate("close")) {
                return false
            }
        }
        a = SYNO.SDS.Wizard.AppWindow.superclass.onClose.apply(this, arguments);
        return a !== false
    },
    configWizard: function(b) {
        var a = {
            buttonAlign: "left",
            footer: true,
            useStatusBar: false,
            closable: (b.closable !== undefined) ? b.closable : true,
            layout: "border",
            defaults: Ext.apply(b.defaults || {}, {
                owner: this
            }),
            items: [this.configSteps(b.steps)],
            buttons: this.configButtons(b.fbar)
        };
        delete b.steps;
        if (false !== b.banner) {
            var c = this.configBanner(b.banner);
            if (Ext.isDefined(b.bannerHeadLineHeight)) {
                c.items[0].height = b.bannerHeadLineHeight
            }
            if (Ext.isDefined(b.bannerDescHeight)) {
                c.items[1].height = b.bannerDescHeight
            }
            c.height = c.minSize = c.maxSize = c.items[0].height + c.items[1].height;
            a.items.splice(0, 0, c);
            a.banner = true
        }
        if (Ext.isDefined(b.activeStep)) {
            a.items[0].activeItem = b.activeStep;
            delete b.activeStep
        }
        Ext.applyIf(a, b);
        Ext.applyIf(a, {
            resizable: false,
            maximizable: false
        });
        return a
    },
    configBanner: function(a) {
        return Ext.apply({
            itemId: "banner",
            region: "north",
            height: 112,
            minSize: 112,
            maxSize: 112,
            split: false,
            cls: "sds-wizard-banner-wrap",
            bodyCssClass: "sds-wizard-banner",
            layout: "anchor",
            items: [{
                xtype: "box",
                padding: "0px 0px 5px 20px",
                height: 24,
                autoHeight: true,
                itemId: "headline",
                border: false,
                role: "article",
                tabIndex: 0,
                bodyCssClass: "wizard-headline",
                html: ""
            }, {
                xtype: "box",
                padding: "5px 0px 0px 0px",
                height: 18,
                autoHeight: true,
                itemId: "description",
                border: false,
                role: "article",
                bodyCssClass: "wizard-description",
                html: ""
            }]
        }, a)
    },
    setHeadline: function(e) {
        var d = this.getComponent("banner");
        if (d) {
            var c = Ext.util.Format.htmlEncode(e);
            var b = String.format('<div class = "wizard-headline"> {0} </div>', c);
            var a = d.getComponent("headline");
            a.update(b);
            a.el.set({
                "aria-label": c
            })
        }
    },
    getHeadLine: function() {
        var b, a;
        if ((b = this.getComponent("banner"))) {
            if ((a = b.getComponent("headline"))) {
                return a.el
            }
        }
        return null
    },
    setDescription: function(e) {
        var c = this.getComponent("banner"),
            d;
        if (c) {
            var b = Ext.util.Format.htmlEncode(e);
            var a = String.format('<div class = "wizard-description"> {0} </div>', b);
            d = c.getComponent("description");
            d.update(a);
            d.el.set({
                tabIndex: b.length > 0 ? 0 : -1,
                "aria-label": b
            })
        }
    },
    configSteps: function(d) {
        if (Ext.isArray(d)) {
            var a = d;
            d = {
                items: a
            }
        }
        if (!d.items) {
            throw Error("invalid config of wizard steps")
        }
        var c = 0;
        var b = Ext.applyIf({
            itemId: "steps",
            layout: "card",
            region: "center",
            border: false,
            activeItem: 0,
            bodyCssClass: "sds-wizard-step",
            defaults: function(f) {
                var e = d.defaults;
                f.owner = this.owner;
                Ext.applyIf(f, {
                    border: false,
                    bwrapCfg: {
                        cls: "x-panel-bwrap sds-wizard-step-bwrap"
                    }
                });
                if (Ext.isFunction(e)) {
                    e = e.call(this, f)
                }
                return e
            }
        }, d);
        for (c = 0; c < b.items.length; c++) {
            Ext.applyIf(b.items[c], {
                nextId: c + 1 < b.items.length ? c + 1 : null,
                getNext: SYNO.SDS.Wizard.Step.prototype.getNext,
                checkState: SYNO.SDS.Wizard.Step.prototype.checkState
            })
        }
        return b
    },
    appendSteps: function(c) {
        var b = this.getComponent("steps");
        var e, d, f, a = [];
        if (!Ext.isArray(c)) {
            c = [c]
        }
        f = b.items.length + c.length;
        for (e = 0, d = b.items.length; e < c.length; e++, d++) {
            a.push(c[e].itemId || ("append" + d));
            Ext.applyIf(c[e], {
                itemId: "append" + d,
                nextId: d + 1 < f ? ("append" + (d + 1)) : null,
                getNext: SYNO.SDS.Wizard.Step.prototype.getNext,
                checkState: SYNO.SDS.Wizard.Step.prototype.checkState
            });
            b.add(c[e])
        }
        b.doLayout();
        return a
    },
    getStep: function(a) {
        return this.getComponent("steps").getComponent(a)
    },
    getActiveStep: function() {
        var a = this.getComponent("steps");
        if (!a) {
            return
        }
        return a.layout.activeItem
    },
    setActiveStep: function(b) {
        var a;
        if (!this.getStep(b)) {
            throw Error("step is not exist, id: " + b)
        }
        this.getComponent("steps").layout.setActiveItem(b);
        if (this.getActiveStep() instanceof SYNO.SDS.Wizard.WelcomeStep) {
            this.footer.addClass("sds-wizard-footer-welcome");
            this.footer.removeClass("sds-wizard-footer");
            this.getActiveStep().getHeadLine().focus()
        } else {
            this.footer.removeClass("sds-wizard-footer-welcome");
            this.footer.addClass("sds-wizard-footer");
            if ((a = this.getHeadLine())) {
                a.focus()
            }
        }
        return true
    },
    configButtons: function(a) {
        return a || [{
            xtype: "syno_button",
            btnStyle: "grey",
            itemId: "back",
            text: _T("common", "back"),
            handler: function() {
                if (Ext.isFunction(this.getActiveStep().getBack)) {
                    this.goBack(this.getActiveStep().getBack())
                } else {
                    this.goBack()
                }
            },
            scope: this
        }, "->", {
            xtype: "syno_button",
            itemId: "next",
            text: _T("common", "next"),
            btnStyle: "blue",
            handler: function() {
                this.goNext(this.getActiveStep().getNext())
            },
            scope: this
        }, {
            xtype: "syno_button",
            btnStyle: "grey",
            itemId: "cancel",
            text: _T("common", "cancel"),
            handler: this.close,
            scope: this
        }]
    },
    getButton: function(a) {
        return this.getFooterToolbar().getComponent(a)
    },
    goNext: function(a, d) {
        var c = null;
        var b;
        if (a === false) {
            return false
        }
        if (a === null) {
            this.close();
            return true
        }
        c = this.getActiveStep();
        b = c.getItemId();
        if (Ext.isFunction(c.deactivate)) {
            if (false === c.deactivate("next")) {
                return false
            }
        }
        if (false === this.setActiveStep(a)) {
            return false
        }
        if (false !== d) {
            this.stepStack.push(b)
        }
        c = this.getActiveStep();
        if (Ext.isFunction(c.activate)) {
            if (false === c.activate()) {
                return false
            }
        }
        this.syncView();
        return true
    },
    goBack: function(b) {
        var c = null;
        var a;
        if (b === false || !this.hasHistory()) {
            return false
        }
        if (Ext.isDefined(b) && !this.inHistory(b)) {
            return false
        }
        c = this.getActiveStep();
        if (Ext.isFunction(c.deactivate)) {
            if (false === c.deactivate("back")) {
                return false
            }
        }
        a = this.stepStack.pop();
        if (!Ext.isDefined(b)) {
            b = a
        }
        if (false === this.setActiveStep(b)) {
            this.stepStack.push(a);
            return false
        }
        while (a !== b) {
            a = this.stepStack.pop()
        }
        c = this.getActiveStep();
        if (Ext.isFunction(c.activate)) {
            if (false === c.activate()) {
                return false
            }
        }
        this.syncView();
        return true
    },
    inHistory: function(b) {
        for (var a = this.stepStack.length - 1; a >= 0; a--) {
            if (this.stepStack[a] === b) {
                return true
            }
        }
        return false
    },
    hasHistory: function() {
        return this.stepStack.length > 0
    },
    syncView: function() {
        var a = this.getActiveStep();
        if (!a) {
            return
        }
        if (Ext.isFunction(a.checkState)) {
            a.checkState()
        }
        if (this.banner) {
            this.setHeadline(a.headline || "");
            this.setDescription(a.description || "")
        }
    }
});
SYNO.SDS.Wizard.ModalWindow = Ext.extend(SYNO.SDS.ModalWindow, {
    constructor: function(a) {
        this.updateDsmStyle(a);
        SYNO.SDS.Wizard.ModalWindow.superclass.constructor.call(this, this.configWizard(a));
        this.stepStack = [];
        this.addClass("sds-wizard-window");
        if (this.getActiveStep() instanceof SYNO.SDS.Wizard.WelcomeStep) {
            this.footer.addClass("sds-wizard-footer-welcome");
            this.footer.removeClass("sds-wizard-footer")
        } else {
            this.footer.removeClass("sds-wizard-footer-welcome");
            this.footer.addClass("sds-wizard-footer")
        }
    },
    onOpen: function() {
        SYNO.SDS.Wizard.ModalWindow.superclass.onOpen.apply(this, arguments);
        var a = this.getActiveStep();
        if (a && Ext.isFunction(a.activate)) {
            if (false === a.activate()) {
                return
            }
        }
        this.syncView()
    },
    onClose: function() {
        var a = true;
        var b = this.getActiveStep();
        if (b && Ext.isFunction(b.deactivate)) {
            if (false === b.deactivate("close")) {
                return true
            }
        }
        a = SYNO.SDS.Wizard.ModalWindow.superclass.onClose.apply(this, arguments);
        return a !== false
    },
    setMaskMsgVisible: function(b) {
        if (!this.el.isMasked()) {
            return
        }
        var a = Ext.Element.data(this.el, "maskMsg");
        if (a && a.dom) {
            a.setVisibilityMode(Ext.Element.VISIBILITY);
            a.setVisible(b)
        }
    },
    setMaskOpacity: function(a) {
        SYNO.SDS.AppWindow.superclass.setMaskOpacity.call(this, a);
        this.setMaskMsgVisible(a !== 0)
    },
    delayedMask: function(b, a, d, c) {
        a = a || 200;
        if (!this.maskTask) {
            this.maskTask = new Ext.util.DelayedTask(this.setMaskOpacity, this, [b])
        }
        this.mask(0, d, c);
        this.setMaskMsgVisible(false);
        this.maskTask.delay(a)
    },
    setStatusBusy: function(c, b, a) {
        c = c || {};
        Ext.applyIf(c, {
            text: _T("common", "loading"),
            iconCls: "x-mask-loading"
        });
        b = b || 0.4;
        a = a || 400;
        this.delayedMask(b, a, c.text, c.iconCls)
    },
    setStatusError: function(a) {
        a = a || {};
        Ext.applyIf(a, {
            text: _T("common", "error_system")
        });
        this.getMsgBox().alert(_T("error", "error_error"), a.text)
    },
    configWizard: SYNO.SDS.Wizard.AppWindow.prototype.configWizard,
    configBanner: SYNO.SDS.Wizard.AppWindow.prototype.configBanner,
    setHeadline: SYNO.SDS.Wizard.AppWindow.prototype.setHeadline,
    setDescription: SYNO.SDS.Wizard.AppWindow.prototype.setDescription,
    configSteps: SYNO.SDS.Wizard.AppWindow.prototype.configSteps,
    appendSteps: SYNO.SDS.Wizard.AppWindow.prototype.appendSteps,
    getStep: SYNO.SDS.Wizard.AppWindow.prototype.getStep,
    getActiveStep: SYNO.SDS.Wizard.AppWindow.prototype.getActiveStep,
    setActiveStep: SYNO.SDS.Wizard.AppWindow.prototype.setActiveStep,
    configButtons: SYNO.SDS.Wizard.AppWindow.prototype.configButtons,
    getButton: SYNO.SDS.Wizard.AppWindow.prototype.getButton,
    goNext: SYNO.SDS.Wizard.AppWindow.prototype.goNext,
    goBack: SYNO.SDS.Wizard.AppWindow.prototype.goBack,
    inHistory: SYNO.SDS.Wizard.AppWindow.prototype.inHistory,
    hasHistory: SYNO.SDS.Wizard.AppWindow.prototype.hasHistory,
    syncView: SYNO.SDS.Wizard.AppWindow.prototype.syncView,
    getHeadLine: SYNO.SDS.Wizard.AppWindow.prototype.getHeadLine
});
Ext.BLANK_IMAGE_URL = "scripts/ext-3/resources/images/default/s.gif";
Ext.data.Connection.prototype.timeout = 120000;
Ext.form.BasicForm.prototype.timeout = 120;
Ext.QuickTip.prototype.maxWidth = 500;
Ext.override(Ext.QuickTip, {
    hide: function() {
        var a = function() {
            delete this.activeTarget;
            Ext.QuickTip.superclass.hide.call(this);
            this.getEl().setOpacity(1)
        };
        return this.getEl().animate({
            opacity: {
                from: 1,
                to: 0
            }
        }, 0.3, a.createDelegate(this))
    }
});
Ext.apply(SYNO.LayoutConfig.Defaults.combo, {
    getListParent: function() {
        return this.el.up(".sds-window")
    }
});
Ext.override(Ext.Element, {
    addClassOnHover: function(a) {
        var b = this;
        if (("ontouchstart" in window) || (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0)) {
            Ext.getDoc().on("click", function(c) {
                if (c.within(b)) {
                    b.addClass(a)
                } else {
                    b.removeClass(a)
                }
            }, b)
        } else {
            b.addClassOnOver(a)
        }
    }
});
Ext.override(Ext.Component, {
    getTaskRunner: function() {
        if (!this.taskRunner) {
            this.taskRunner = new SYNO.SDS.TaskRunner();
            this.addManagedComponent(this.taskRunner)
        }
        return this.taskRunner
    },
    addTask: function(a) {
        return this.getTaskRunner().createTask(a)
    },
    addAjaxTask: function(a) {
        return this.getTaskRunner().createAjaxTask(a)
    },
    addWebAPITask: function(a) {
        return this.getTaskRunner().createWebAPITask(a)
    },
    getTask: function(a) {
        if (!this.taskRunner) {
            return null
        }
        return this.taskRunner.getTask(a)
    },
    removeTask: function(b) {
        var a = this.getTask(b);
        if (a) {
            a.remove()
        }
        return a
    },
    addManagedComponent: function(a) {
        this.components = this.components || [];
        this.components.push(a);
        return a
    },
    removeManagedComponent: function(a) {
        this.components = this.components || [];
        this.components.remove(a);
        return a
    },
    beforeDestroy: function() {
        this.taskRunner = null;
        this.components = this.components || [];
        for (var a = 0; a < this.components.length; ++a) {
            try {
                this.components[a].destroy()
            } catch (b) {
                if (Ext.isDefined(SYNO.SDS.JSDebug)) {
                    SYNO.Debug.error(this.id, "sub-components[" + a + "] destroy failed.", this.components[a]);
                    throw b
                }
            }
        }
        delete this.components
    },
    findWindow: function() {
        var a = this;
        if (a instanceof SYNO.SDS.BaseWindow) {
            return a
        }
        for (; Ext.isObject(a.ownerCt); a = a.ownerCt) {}
        if (a instanceof SYNO.SDS.BaseWindow) {
            return a
        }
        return
    },
    findAppWindow: function() {
        var a = this,
            b = Ext.getClassByName("SYNO.SDS.AppWindow");
        if (Ext.isEmpty(b)) {
            return
        }
        if (a instanceof b) {
            return a
        }
        if (a._appWindow instanceof b) {
            return a._appWindow
        }
        for (; Ext.isObject(a.ownerCt); a = a.ownerCt) {}
        if (a instanceof b) {
            this._appWindow = a;
            return a
        }
        if (!Ext.isObject(a)) {
            return
        }
        for (; Ext.isObject(a.owner); a = a.owner) {}
        if (a instanceof b) {
            this._appWindow = a;
            return a
        }
        if (a.module && a.module.appWin && a.module.appWin instanceof b) {
            this._appWindow = a.module.appWin;
            return a.module.appWin
        }
        return
    },
    getDsmVersion: function() {
        var a = this.findAppWindow();
        if (a) {
            return a.getOpenConfig("dsm_version")
        } else {
            return null
        }
    },
    getDsmHttpPort: function() {
        var b = this.findAppWindow(),
            a;
        if (b && b.hasOpenConfig("cms_ds_data")) {
            a = b.getOpenConfig("cms_ds_data").http_port
        }
        return a
    },
    getDsmHost: function() {
        var a = this.findAppWindow(),
            b;
        if (a && a.hasOpenConfig("cms_ds_data")) {
            b = a.getOpenConfig("cms_ds_data").host
        }
        return b
    },
    getBaseURL: function(c, a, b) {
        c.appWindow = this.findAppWindow();
        return SYNO.API.GetBaseURL(c, a, b)
    },
    sendWebAPI: function(a) {
        a.appWindow = this.findAppWindow();
        return SYNO.API.Request(a)
    },
    pollReg: function(a) {
        a.appWindow = this.findAppWindow();
        return SYNO.API.Request.Polling.Register(a)
    },
    pollUnreg: function(a) {
        return SYNO.API.Request.Polling.Unregister(a)
    },
    pollList: function(a) {
        a.appWindow = this.findAppWindow();
        return SYNO.API.Request.Polling.List(a)
    },
    downloadWebAPI: function(a) {
        a.appWindow = this.findAppWindow();
        return SYNO.SDS.Utils.IFrame.requestWebAPI(a)
    },
    IsAllowRelay: function() {
        var a = this.findAppWindow();
        if (!Ext.isObject(a)) {
            return false
        }
        return SYNO.SDS.Utils.IsAllowRelay && SYNO.SDS.Utils.IsAllowRelay(a)
    },
    _S: function(b) {
        var a = this.findAppWindow();
        return SYNO.API.Info.GetSession(a, b)
    },
    _D: function(b, c) {
        var a = this.findAppWindow();
        return SYNO.API.Info.GetDefine(a, b, c)
    },
    getKnownAPI: function(b) {
        var a = this.findAppWindow();
        return SYNO.API.Info.GetKnownAPI(a, b)
    },
    IsKnownAPI: function(b, a) {
        var c = SYNO.API.Info.GetKnownAPI(this.findAppWindow(), b);
        if (!Ext.isObject(c)) {
            return false
        }
        if (a < c.minVersion || c.maxVersion < a) {
            return false
        }
        return true
    }
});
Ext.override(Ext.grid.GridView, {
    onLayout: function() {
        var b = this.el.select(".x-grid3-scroller", this);
        var a = b.elements[0];
        if (a.clientWidth === a.offsetWidth) {
            this.scrollOffset = 2
        } else {
            this.scrollOffset = undefined
        }
        this.fitColumns(false)
    }
});
Ext.override(Ext.data.Record, {
    set: function(a, d) {
        var b;
        var c = Ext.isPrimitive(d) ? String : Ext.encode;
        if (c(this.data[a]) == c(d)) {
            return
        }
        this.dirty = true;
        if (!this.modified) {
            this.modified = {}
        }
        if (a in this.modified && this.modified[a] === d) {
            this.dirty = false;
            delete this.modified[a];
            for (b in this.modified) {
                if (this.modified.hasOwnProperty(b)) {
                    this.dirty = true;
                    break
                }
            }
        } else {
            if (!(a in this.modified)) {
                this.modified[a] = this.data[a]
            }
        }
        this.data[a] = d;
        if (!this.editing) {
            this.afterEdit()
        }
    }
});
Ext.override(Ext.data.Store, {
    afterEdit: function(b) {
        var a = this.modified.indexOf(b);
        if (b.dirty && a == -1) {
            this.modified.push(b)
        } else {
            if (!b.dirty && a != -1) {
                this.modified.splice(a, 1)
            }
        }
        this.fireEvent("update", this, b, Ext.data.Record.EDIT)
    }
});
Ext.Element.addMethods(Ext.Fx);
Ext.override(Ext.dd.DragSource, {
    validateTarget: function(b, a, c) {
        if (c === a.getTarget().id || a.within(c)) {
            return true
        }
        this.getProxy().setStatus(this.dropNotAllowed);
        return false
    },
    beforeDragEnter: function(b, a, c) {
        return this.validateTarget(b, a, c)
    },
    beforeDragOver: function(c, b, d) {
        var a = this.validateTarget(c, b, d);
        if (this.proxy) {
            this.proxy.setStatus(a ? this.dropAllowed : this.dropNotAllowed)
        }
        return a
    },
    beforeDragOut: function(b, a, c) {
        return this.validateTarget(b, a, c)
    },
    beforeDragDrop: function(b, a, c) {
        if (this.validateTarget(b, a, c)) {
            return true
        }
        this.onInvalidDrop(b, a, c);
        return false
    }
});
Ext.override(Ext.form.CompositeField, {
    combineErrors: false
});
if (Ext.isIE) {
    Ext.menu.BaseItem.prototype.clickHideDelay = -1
}
Ext.override(Ext.Window, {
    onRender: function(b, a) {
        Ext.Window.superclass.onRender.call(this, b, a);
        if (this.plain) {
            this.el.addClass("x-window-plain")
        }
        this.focusEl = this.el.createChild({
            tag: "div",
            cls: "x-dlg-focus",
            tabIndex: "0",
            role: this.ariaRole || "dialog",
            "aria-label": this.title
        }, this.el.first());
        this.focusEl.swallowEvent("click", true);
        this.focusEl.addKeyListener(Ext.EventObject.TAB, this.onFirstTab, this);
        this.lastEl = this.el.createChild({
            tag: "div",
            cls: "x-dlg-focus",
            tabIndex: 0,
            role: "article",
            html: _T("desktop", "window_last_hint")
        });
        this.lastEl.addKeyListener(Ext.EventObject.TAB, this.onLastTab, this);
        this.proxy = this.el.createProxy("x-window-proxy");
        this.proxy.enableDisplayMode("block");
        if (this.modal) {
            this.maskEl = this.container.createChild({
                cls: "ext-el-mask"
            }, this.el.dom);
            this.maskEl.enableDisplayMode("block");
            this.maskEl.hide();
            this.mon(this.maskEl, "click", this.focus, this)
        }
        if (this.maximizable) {
            this.mon(this.header, "dblclick", this.toggleMaximize, this)
        }
        if (this.frame && this.header) {
            this.tl = this.header.dom.parentNode.parentNode.parentNode
        }
    },
    onLastTab: function(b, a) {
        if (a.shiftKey) {
            return
        }
        a.preventDefault();
        this.focusEl.focus()
    },
    onFirstTab: function(b, a) {
        if (a.shiftKey) {
            a.preventDefault();
            this.lastEl.focus()
        } else {
            if (Ext.isFunction(this.findTopWin)) {
                var c = this.findTopWin();
                if (c !== this) {
                    a.preventDefault();
                    c.focus()
                }
            }
        }
    },
    beforeShow: function() {
        delete this.el.lastXY;
        delete this.el.lastLT;
        if (this.x === undefined || this.y === undefined) {
            var a = this.el.getAlignToXY(this.container, "c-c");
            var b = this.el.translatePoints(a[0], a[1]);
            this.x = this.x === undefined ? b.left : this.x;
            this.y = this.y === undefined ? b.top : this.y
        }
        this.el.setLeftTop(this.x, this.y);
        if (this.expandOnShow) {
            this.expand(false)
        }
        if (this.modal) {
            Ext.getBody().addClass("x-body-masked");
            this.maskEl.setSize(Ext.lib.Dom.getViewWidth(true), Ext.lib.Dom.getViewHeight(true));
            this.maskEl.show()
        }
    },
    onWindowResize: function() {
        if (this.maximized) {
            this.fitContainer()
        }
        if (this.modal) {
            this.maskEl.setSize("100%", "100%");
            this.maskEl.setSize(Ext.lib.Dom.getViewWidth(true), Ext.lib.Dom.getViewHeight(true))
        }
        this.doConstrain()
    },
    setZIndex: function(a) {
        if (this.modal) {
            this.maskEl.setStyle("z-index", a)
        }
        this.el.setZIndex(++a);
        a += 5;
        if (this.resizer) {
            this.resizer.proxy.setStyle("z-index", ++a)
        }
        this.lastZIndex = a
    },
    beforeDestroy: function() {
        if (this.rendered) {
            this.hide();
            this.clearAnchor();
            Ext.destroy(this.focusEl, this.resizer, this.dd, this.proxy, this.maskEl)
        }
        Ext.Window.superclass.beforeDestroy.call(this)
    },
    hide: function(c, a, b) {
        if (this.hidden || this.fireEvent("beforehide", this) === false) {
            return this
        }
        if (a) {
            this.on("hide", a, b, {
                single: true
            })
        }
        this.hidden = true;
        if (c !== undefined) {
            this.setAnimateTarget(c)
        }
        if (this.modal) {
            this.maskEl.hide();
            Ext.getBody().removeClass("x-body-masked")
        }
        if (this.animateTarget) {
            this.animHide()
        } else {
            this.el.hide();
            this.afterHide()
        }
        return this
    },
    getFrameHeight: function() {
        var a = this.el.getFrameWidth("tb") + this.bwrap.getFrameWidth("tb");
        a += (this.tbar ? this.tbar.getHeight() : 0) + (this.bbar ? this.bbar.getHeight() : 0);
        if (this.frame) {
            a += (this.tl || this.el.dom.firstChild).offsetHeight + this.ft.dom.offsetHeight + this.mc.getFrameWidth("tb")
        } else {
            a += (this.header ? this.header.getHeight() : 0) + (this.footer ? this.footer.getHeight() : 0)
        }
        return a
    },
    toFront: function(a) {
        if (this.manager.bringToFront(this)) {
            this.focusLeave = false;
            if (!a || !a.getTarget().focus) {
                this.focus()
            } else {
                a.getTarget().focus();
                if (document.activeElement !== a.getTarget()) {
                    this.focus()
                }
            }
        }
    }
});
Ext.override(Ext.grid.RowSelectionModel, {
    silentMode: false,
    onRefresh: function() {
        var f = this.grid.store,
            d = this.getSelections(),
            c = 0,
            a = d.length,
            b, e;
        this.silent = this.silentMode && true;
        this.clearSelections(true);
        for (; c < a; c++) {
            e = d[c];
            if ((b = f.indexOfId(e.id)) != -1) {
                this.selectRow(b, true)
            }
        }
        if (d.length != this.selections.getCount()) {
            this.fireEvent("selectionchange", this)
        }
        this.silent = false
    }
});
Ext.override(Ext.grid.GridPanel, {
    getValues: function() {
        var b = [],
            a = this.getStore();
        if (!Ext.isObject(a)) {
            return b
        }
        a.each(function(e, d, c) {
            b.push(Ext.apply({}, e.data))
        }, this);
        return b
    },
    setValues: function(c) {
        var b = this.getStore();
        var a = [];
        if (!Ext.isObject(b) || !Ext.isArray(c)) {
            return false
        }
        b.removeAll();
        c.each(function(d) {
            a.push(new Ext.data.Record(d))
        }, this);
        b.add(a)
    }
});
Ext.override(Ext.grid.GridView.ColumnDragZone, {
    getDragData: function(c) {
        var a = Ext.lib.Event.getTarget(c),
            b = this.view.findHeaderCell(a);
        if (b) {
            return {
                ddel: Ext.fly(b).child("div.x-grid3-hd-inner", true),
                header: b
            }
        }
        return false
    }
});
Ext.override(Ext.grid.HeaderDropZone, {
    positionIndicator: function(d, j, i) {
        var a = Ext.lib.Event.getPageX(i),
            f = Ext.lib.Dom.getRegion(Ext.fly(j).child("div.x-grid3-hd-inner", true)),
            c, g, b = f.top + this.proxyOffsets[1];
        if ((f.right - a) <= (f.right - f.left) / 2) {
            c = f.right + this.view.borderWidth;
            g = "after"
        } else {
            c = f.left;
            g = "before"
        }
        if (this.grid.colModel.isFixed(this.view.getCellIndex(j))) {
            return false
        }
        c += this.proxyOffsets[0];
        this.proxyTop.setLeftTop(c, b);
        this.proxyTop.show();
        if (!this.bottomOffset) {
            this.bottomOffset = this.view.mainHd.getHeight()
        }
        this.proxyBottom.setLeftTop(c, b + this.proxyTop.dom.offsetHeight + this.bottomOffset);
        this.proxyBottom.show();
        return g
    },
    onNodeDrop: function(b, l, f, c) {
        var d = c.header;
        if (d != b) {
            var j = this.grid.colModel,
                i = Ext.lib.Event.getPageX(f),
                a = Ext.lib.Dom.getRegion(Ext.fly(b).child("div.x-grid3-hd-inner", true)),
                m = (a.right - i) <= ((a.right - a.left) / 2) ? "after" : "before",
                g = this.view.getCellIndex(d),
                k = this.view.getCellIndex(b);
            if (m == "after") {
                k++
            }
            if (g < k) {
                k--
            }
            j.moveColumn(g, k);
            return true
        }
        return false
    }
});
Ext.override(SYNO.ux.ModuleList, {
    getLocalizedString: function(a) {
        return SYNO.SDS.Utils.GetLocalizedString(a)
    }
});
Ext.override(SYNO.ux.FieldSet, {
    stateful: true,
    stateEvents: ["expand", "collapse"],
    getState: function() {
        return {
            collapsed: this.collapsed
        }
    },
    saveState: function() {
        var a = this.getState();
        this.setUserCollapseState(a.collapsed)
    },
    getUserCollapseState: function() {
        var c = this.getStateId();
        var b = this.findAppWindow();
        if (b && b.appInstance && c) {
            var a = b.appInstance.getUserSettings("fieldset_collapse_status") || {};
            return Ext.isBoolean(a[c]) ? a[c] : this.collapsed
        }
        return this.collapsed
    },
    setUserCollapseState: function(d) {
        var c = this.getStateId();
        var b = this.findAppWindow();
        if (b && b.appInstance && c) {
            var a = b.appInstance.getUserSettings("fieldset_collapse_status") || {};
            a[c] = d;
            b.appInstance.setUserSettings("fieldset_collapse_status", a)
        }
    },
    updateUserCollapseState: function() {
        var a = this.getUserCollapseState();
        var b = {
            collapsed: a
        };
        this.applyState(b)
    }
});
var _urlAppend = Ext.urlAppend;
Ext.urlAppend = function(c, d, b) {
    var a = Ext.urlDecode(d);
    b = typeof b !== "undefined" ? b : true;
    if (b && c.indexOf("SynoToken") === -1 && !Ext.isEmpty(_S("SynoToken"))) {
        a.SynoToken = decodeURIComponent(_S("SynoToken"))
    }
    return _urlAppend(c, Ext.urlEncode(a))
};
Ext.ns("SYNO.SDS");
SYNO.SDS.UpdateSynoToken = function(a) {
    Ext.Ajax.request({
        url: "webman/login.cgi",
        updateSynoToken: true,
        callback: function(c, e, b) {
            var d = Ext.util.JSON.decode(b.responseText);
            if (e && !Ext.isEmpty(d.SynoToken)) {
                SYNO.SDS.Session.SynoToken = encodeURIComponent(d.SynoToken)
            }
            if (Ext.isFunction(a)) {
                a(c, e, b)
            }
        }
    })
};
var _cookie = Ext.util.Cookies.get("id");
Ext.Ajax.on("beforerequest", function(b, a) {
    if (true === a.updateSynoToken) {
        return
    }
    if (!Ext.isEmpty(_cookie) && _cookie !== Ext.util.Cookies.get("id")) {
        b.abort();
        location.reload()
    } else {
        _cookie = Ext.util.Cookies.get("id")
    }
    if (Ext.isEmpty(a.skipSynoToken) && !Ext.isEmpty(_S("SynoToken"))) {
        if (Ext.isEmpty(a.headers)) {
            a.headers = {}
        }
        a.headers["X-SYNO-TOKEN"] = _S("SynoToken")
    }
});
Ext.util.Observable.observeClass(Ext.form.BasicForm);
Ext.form.BasicForm.on("beforeaction", function(a, b) {
    if (a.url) {
        a.url = Ext.urlAppend(a.url)
    }
});
Ext.util.Observable.observeClass(Ext.data.Connection);
Ext.data.Connection.on("beforerequest", function(a, b) {
    if (Ext.isEmpty(b.skipSynoToken) && !Ext.isEmpty(_S("SynoToken"))) {
        if (Ext.isEmpty(b.headers)) {
            b.headers = {}
        }
        b.headers["X-SYNO-TOKEN"] = _S("SynoToken")
    }
});
Ext.define("Ext.data.JsonP", {
    singleton: true,
    requestCount: 0,
    requests: {},
    timeout: 30000,
    disableCaching: true,
    disableCachingParam: "_dc",
    callbackKey: "callback",
    request: function(l) {
        l = Ext.apply({}, l);
        var h = this,
            c = Ext.isDefined(l.disableCaching) ? l.disableCaching : h.disableCaching,
            f = l.disableCachingParam || h.disableCachingParam,
            b = ++h.requestCount,
            j = l.callbackName || "callback" + b,
            g = l.callbackKey || h.callbackKey,
            k = Ext.isDefined(l.timeout) ? l.timeout : h.timeout,
            d = Ext.apply({}, l.params),
            a = l.url,
            e, i;
        if (c && !d[f]) {
            d[f] = new Date().getTime()
        }
        l.params = d;
        d[g] = "Ext.data.JsonP." + j;
        if (l.iframeUrl) {
            i = h.createIframe(a, d, l)
        } else {
            i = h.createScript(a, d, l)
        }
        h.requests[b] = e = {
            url: a,
            params: d,
            script: i,
            id: b,
            scope: l.scope,
            success: l.success,
            failure: l.failure,
            callback: l.callback,
            callbackKey: g,
            callbackName: j
        };
        if (k > 0) {
            e.timeout = setTimeout(Ext.createDelegate(h.handleTimeout, h, [e]), k)
        }
        h.setupErrorHandling(e);
        h[j] = Ext.createDelegate(h.handleResponse, h, [e], true);
        h.loadScript(e);
        return e
    },
    abort: function(c) {
        var b = this,
            d = b.requests,
            a;
        if (c) {
            if (!c.id) {
                c = d[c]
            }
            b.handleAbort(c)
        } else {
            for (a in d) {
                if (d.hasOwnProperty(a)) {
                    b.abort(d[a])
                }
            }
        }
    },
    setupErrorHandling: function(a) {
        a.script.onerror = Ext.createDelegate(this.handleError, this, [a])
    },
    handleAbort: function(a) {
        a.errorType = "abort";
        this.handleResponse(null, a)
    },
    handleError: function(a) {
        a.errorType = "error";
        this.handleResponse(null, a)
    },
    cleanupErrorHandling: function(a) {
        a.script.onerror = null
    },
    handleTimeout: function(a) {
        a.errorType = "timeout";
        this.handleResponse(null, a)
    },
    handleResponse: function(a, b) {
        var c = true;
        if (b.timeout) {
            clearTimeout(b.timeout)
        }
        delete this[b.callbackName];
        delete this.requests[b.id];
        this.cleanupErrorHandling(b);
        Ext.fly(b.script).remove();
        if (b.errorType) {
            c = false;
            Ext.callback(b.failure, b.scope, [b.errorType])
        } else {
            Ext.callback(b.success, b.scope, [a])
        }
        Ext.callback(b.callback, b.scope, [c, a, b.errorType])
    },
    createScript: function(c, d, b) {
        var a = document.createElement("script");
        a.setAttribute("src", Ext.urlAppend(c, Ext.urlEncode(d)));
        a.setAttribute("async", true);
        a.setAttribute("type", "text/javascript");
        return a
    },
    createIframe: function(c, f, b) {
        var d;
        var a = Ext.urlAppend(c, Ext.urlEncode(f), false);
        if (typeof b.iframeUrl === "undefined") {
            SYNO.Debug("no iframe url");
            return
        }
        var e = b.iframeUrl;
        e += "&url=" + encodeURIComponent(a);
        e = Ext.urlAppend(e, "", true);
        d = document.createElement("iframe");
        d.setAttribute("src", e);
        d.setAttribute("style", "visibility: hidden");
        return d
    },
    loadScript: function(a) {
        Ext.get(document.getElementsByTagName("head")[0]).appendChild(a.script)
    }
});
Ext.override(SYNO.ux.Button, {
    getUXMenu: function(b) {
        if (!Ext.menu.MenuMgr.getMenuList) {
            return Ext.menu.MenuMgr.get(b)
        }
        var a = Ext.menu.MenuMgr.getMenuList();
        if (typeof b == "string") {
            if (!a) {
                return null
            }
            return a[b]
        } else {
            if (b.events) {
                return b
            } else {
                if (typeof b.length == "number") {
                    return new SYNO.ux.Menu({
                        items: b
                    })
                } else {
                    return Ext.create(b, "syno_menu")
                }
            }
        }
    },
    initComponent: function() {
        if (this.menu) {
            if (Ext.isArray(this.menu)) {
                this.menu = {
                    items: this.menu
                }
            }
            if (Ext.isObject(this.menu)) {
                this.menu.ownerCt = this
            }
            this.menu = this.getUXMenu(this.menu);
            this.menu.ownerCt = undefined
        }
        SYNO.ux.Button.superclass.initComponent.call(this)
    }
});
Ext.override(SYNO.ux.ComboBox, {
    afterRender: function() {
        SYNO.ux.ComboBox.superclass.afterRender.call(this);
        this.mon(this, "expand", this.onListExpand, this)
    },
    onDestroy: function() {
        this.mun(this, "expand", this.onListExpand, this)
    },
    onListExpand: function() {
        if (!SYNO.SDS.Desktop) {
            return
        }
        var b = SYNO.SDS.UIFeatures.isFullScreenMode(),
            a = Ext.get(SYNO.SDS.Desktop.id);
        if (b && this.list.parent() === Ext.getBody()) {
            a.appendChild(this.list)
        } else {
            if (!b && this.list.parent() === a) {
                Ext.getBody().appendChild(this.list)
            }
        }
    }
});
Ext.override(SYNO.ux.DateField, {
    onDestroy: function() {
        if (this.menu) {
            this.mun(this.menu, "show", this.onMenuShow, this)
        }
        this.callParent(arguments)
    },
    onMenuShow: function() {
        if (!SYNO.SDS.Desktop) {
            return
        }
        var c = SYNO.SDS.UIFeatures.isFullScreenMode(),
            a = Ext.get(SYNO.SDS.Desktop.id),
            b = this.menu.el;
        if (c && b.parent() === Ext.getBody()) {
            a.appendChild(b)
        } else {
            if (!c && b.parent() === a) {
                Ext.getBody().appendChild(b)
            }
        }
    }
});
Ext.override(SYNO.ux.Menu, {
    onMenuShow: function() {
        if (!SYNO.SDS.Desktop) {
            return
        }
        var b = SYNO.SDS.UIFeatures.isFullScreenMode(),
            a = Ext.get(SYNO.SDS.Desktop.id);
        if (b && this.el.parent() === Ext.getBody()) {
            a.appendChild(this.el)
        } else {
            if (!b && this.el.parent() === a) {
                Ext.getBody().appendChild(this.el)
            }
        }
        this.resetWidthForFlexcroll()
    }
});
Ext.namespace("SYNO.API");
SYNO.API.getErrorString = function(c) {
    var b = 100,
        a, d;
    if (Ext.isNumber(c)) {
        b = c
    } else {
        if (Ext.isObject(c)) {
            a = SYNO.API.Util.GetFirstError(c);
            b = Ext.isNumber(a.code) ? a.code : 100
        }
    }
    if (b <= 118) {
        return SYNO.API.Errors.common[b]
    }
    d = Ext.isString(SYNO.API.Errors.core[b]) ? SYNO.API.Errors.core[b] : _T("common", "error_system");
    return d
};
SYNO.API.CheckSpecialError = function(a, d, b) {
    var c;
    if ("SYNO.DSM.Share" === b.api) {
        if ("delete" === b.method && 404 === d.code) {
            c = _T("error", "delete_default_share")
        } else {
            if ("edit" === b.method && 406 === d.code) {
                c = _T("error", "share_mounted_rename")
            }
        }
    }
    return c
};
SYNO.API.CheckResponse = function(a, h, d, g) {
    var b, f;
    if (a) {
        return true
    }
    if (Ext.isEmpty(h) || 0 === h.status) {
        return false
    }
    try {
        b = Ext.isDefined(h.status) ? 0 : (h.code || 100);
        if (b < SYNO.API.Errors.minCustomeError) {
            f = SYNO.API.Errors.common[b]
        } else {
            f = SYNO.API.CheckSpecialError(a, h, d) || SYNO.API.Errors.core[b]
        }
    } catch (c) {} finally {
        if (!f) {
            b = 100;
            f = SYNO.API.Errors.common[b]
        }
    }
    if (b >= 105 && b <= 107 && (!g || Ext.isEmpty(g.getResponseHeader("X-SYNO-SOURCE-ID")))) {
        SYNO.SDS.Utils.Logout.action(true, f, true)
    }
    return f
};
SYNO.API.CheckRelayResponse = function(h, d, g, c, f) {
    var b, a = false,
        e = Ext.getClassByName("SYNO.SDS.AppWindow");
    if (Ext.isEmpty(d) || (Ext.isObject(f) && 0 === f.status)) {
        return a
    }
    if (!SYNO.SDS.Utils.IsAllowRelay(c.appWindow) || Ext.isEmpty(e)) {
        return a
    }
    b = c.appWindow.findAppWindow();
    if (!(b instanceof e) || Ext.isEmpty(b.appInstance)) {
        return a
    }
    if (!Ext.isObject(c.params)) {
        return a
    }
    if (c.params.api === "SYNO.API.Info") {
        a = true
    } else {
        if (c.params.api !== '"SYNO.CMS.DS"' || c.params.method !== '"relay"') {
            return a
        }
    }
    if (true === a) {} else {
        if (Ext.isObject(f) && Ext.isEmpty(f.getResponseHeader("X-SYNO-SOURCE-ID"))) {
            if (Ext.isNumber(d.code) && (414 === d.code || 406 === d.code || 401 === d.code || 423 === d.code)) {
                a = true
            } else {
                if (Ext.isObject(f) && f.status >= 400 && f.status < 600) {
                    a = true
                }
            }
        } else {
            if (Ext.isObject(c.userInfo.params) && Ext.isArray(c.userInfo.params.compound)) {
                d.result.each(function(i) {
                    if (Ext.isObject(i.error) && i.error.code >= 105 && i.error.code <= 107) {
                        a = true;
                        return false
                    }
                }, this)
            } else {
                if (Ext.isNumber(d.code)) {
                    if (d.code >= 105 && d.code <= 107) {
                        a = true
                    }
                } else {
                    if (Ext.isObject(f) && f.status >= 400 && f.status < 600) {
                        a = true
                    }
                }
            }
        }
    }
    if (true === a) {
        b.getMsgBox().alert(_T("error", "error_error"), _T("cms", "relaunch_app"), function() {
            b.close()
        })
    }
    return a
};
SYNO.API.Manager = Ext.extend(Ext.util.Observable, {
    baseURL: "webapi",
    constructor: function() {
        SYNO.API.Manager.superclass.constructor.apply(this, arguments);
        this.jsDebug = Ext.urlDecode(location.search.substr(1)).jsDebug;
        this.knownAPI = {
            "SYNO.API.Info": {
                path: "query.cgi",
                minVersion: 1,
                maxVersion: 1
            }
        }
    },
    queryAPI: function(c, a, e, d) {
        var b = [];
        if (!Ext.isArray(c)) {
            c = [c]
        }
        Ext.each(c, function(f) {
            if (!this.knownAPI.hasOwnProperty(f)) {
                b.push(f)
            }
        }, this);
        this.requestAjaxAPI("SYNO.API.Info", "query", 1, {
            async: Ext.isBoolean(d) ? d : true
        }, {
            query: b.join(",")
        }, Ext.createDelegate(this.onQueryAPI, this, [a, e], true))
    },
    onQueryAPI: function(b, f, e, d, a, c) {
        if (b) {
            if (Ext.isObject(e) && "all" === e.query) {
                this.knownAPI = Ext.apply({}, f)
            } else {
                Ext.apply(this.knownAPI, f)
            }
        }
        if (a) {
            a.call(c, b, f, e, d)
        }
    },
    getKnownAPI: function(b, e) {
        var d = this.knownAPI[b],
            c, a;
        if (!Ext.isDefined(this.jsDebug) || !Ext.isObject(d)) {
            return d
        }
        c = d.path + "/";
        if ("SYNO.Entry.Request" === b && Ext.isObject(e) && Ext.isArray(e.compound)) {
            a = [];
            e.compound.each(function(f) {
                if (Ext.isString(f.api)) {
                    a.push(f.api)
                }
            });
            c += a.join()
        } else {
            c += b
        }
        return Ext.apply({}, {
            path: c
        }, d)
    },
    getBaseURL: function(j, a, l, k, b) {
        var f, h, e, c;
        if (Ext.isObject(j)) {
            h = j;
            k = a;
            b = l;
            if (h.webapi) {
                h = h.webapi
            }
            if (Ext.isObject(h.compound)) {
                if (!Ext.isArray(h.compound.params)) {
                    SYNO.Debug.error("params must be array", h.compound.params);
                    return
                }
                j = "SYNO.Entry.Request";
                a = "request";
                l = 1;
                var d = h.compound.params || [],
                    m = [];
                for (var g = 0; g < d.length; g++) {
                    m.push(Ext.apply({
                        api: d[g].api,
                        method: d[g].method,
                        version: d[g].version
                    }, d[g].params))
                }
                e = {
                    stop_when_error: Ext.isBoolean(h.compound.stopwhenerror) ? h.compound.stopwhenerror : false,
                    mode: Ext.isString(h.compound.mode) ? h.compound.mode : "sequential",
                    compound: m
                }
            } else {
                j = h.api;
                a = h.method;
                l = h.version;
                e = h.params
            }
        }
        f = this.getKnownAPI(j, e);
        if (!f) {
            SYNO.Debug.error("No Such API: " + j);
            return
        }
        c = this.baseURL + "/" + f.path;
        if (Ext.isString(b) && !Ext.isEmpty(b)) {
            c += "/" + window.encodeURIComponent(b)
        }
        if (!a || !l) {
            return c
        }
        h = {
            api: j,
            method: a,
            version: l
        };
        if (e) {
            Ext.apply(h, ("JSON" === f.requestFormat) ? SYNO.API.EncodeParams(e) : e)
        }
        return Ext.urlAppend(c, Ext.urlEncode(h), k)
    },
    requestAjaxAPI: function(l, d, e, b, g, o, c) {
        var h, v = SYNO.Util.copy(g),
            k, w, m = null,
            t;
        var n, s;
        if (Ext.isObject(l)) {
            k = l;
            if (k.webapi) {
                k = k.webapi
            }
            b = {};
            Ext.apply(b, k);
            delete b.api;
            delete b.method;
            delete b.version;
            delete b.scope;
            delete b.callback;
            o = k.callback || l.callback;
            c = k.scope || l.scope;
            b.appWindow = l.appWindow;
            if (Ext.isObject(k.compound)) {
                t = k.compound
            } else {
                l = k.api;
                d = k.method;
                e = k.version;
                v = k.params
            }
        }
        if (b && b.compound) {
            t = b.compound
        }
        if (t) {
            if (!Ext.isArray(t.params)) {
                SYNO.Debug.error("params must be array", t.params);
                return
            }
            l = "SYNO.Entry.Request";
            d = "request";
            e = 1;
            var u = t.params || [],
                a = [];
            for (var r = 0; r < u.length; r++) {
                a.push(Ext.apply({
                    api: u[r].api,
                    method: u[r].method,
                    version: u[r].version
                }, u[r].params))
            }
            v = {
                stop_when_error: Ext.isBoolean(t.stopwhenerror) ? t.stopwhenerror : false,
                mode: Ext.isString(t.mode) ? t.mode : "sequential",
                compound: a
            }
        }
        if (Ext.isObject(b.appWindow) && l !== "SYNO.API.Info") {
            h = SYNO.API.Info.GetKnownAPI(b.appWindow, l, v)
        } else {
            h = this.getKnownAPI(l, v)
        }
        if (!h) {
            s = Ext.isObject(b.appWindow) && b.appWindow.IsAllowRelay();
            SYNO.Debug.error("No Such API: " + l);
            n = {
                error: {
                    code: 101
                }
            };
            if (s) {
                SYNO.API.CheckRelayResponse(false, n, v, b)
            }
            if (Ext.isFunction(o)) {
                o.call(c || window, false, n, v, b)
            }
            return
        }
        if (e < h.minVersion || h.maxVersion < e) {
            SYNO.Debug.warn(String.format("WARN: API({0}) version ({1}) is higher then server ({2})", l, e, h.version))
        }
        if (!Ext.isObject(v) && !Ext.isEmpty(v)) {
            SYNO.Debug.error("params must be object, ", v);
            return
        }
        if (!Ext.isSecure && Ext.isArray(b.encryption)) {
            m = Ext.apply([], b.encryption)
        }
        delete b.encryption;
        var q = {
            api: l,
            method: d,
            version: e
        };
        var f = this.baseURL + "/" + h.path,
            j;
        if (b && b.url) {
            var p = b.url;
            j = Ext.urlDecode(p.substr(p.indexOf("?") + 1));
            if (j && j.api && j.method && j.version) {
                delete j.api;
                delete j.method;
                delete j.version;
                delete j.SynoToken;
                q = j;
                f = b.url
            }
        }
        if (b && Ext.isElement(b.form) && (/multipart\/form-data/i.test(b.form.enctype))) {
            f = SYNO.API.GetBaseURL(q);
            q = {}
        } else {
            if (Ext.isObject(b) && true === b.html5upload) {
                f = SYNO.API.GetBaseURL(Ext.apply({
                    params: v
                }, q));
                q = {};
                b.method = "POST"
            }
        }
        w = Ext.apply((b || {}), {
            url: f,
            params: Ext.apply({}, q, ("JSON" === h.requestFormat) ? SYNO.API.EncodeParams(v) : v),
            callback: this.onRequestAPI,
            userInfo: {
                params: v,
                cb: o,
                scope: c
            }
        });
        if (!Ext.isEmpty(m)) {
            return this.requestAjaxAPI("SYNO.API.Encryption", "getinfo", 1, {
                appWindow: w.appWindow || undefined,
                reqObj: w,
                reqEnc: m
            }, {
                format: "module"
            }, this.onEncryptRequestAPI, this)
        }
        return this.sendRequest(w)
    },
    onEncryptRequestAPI: function(n, k, f, a) {
        var d, h, g, c = a.reqObj,
            b = a.reqEnc,
            m = function(j) {
                for (var i in j) {
                    if (j.hasOwnProperty(i)) {
                        return false
                    }
                }
                return true
            };
        if (!n) {
            return Ext.Ajax.request(c)
        }
        SYNO.Encryption.CipherKey = k.cipherkey;
        SYNO.Encryption.RSAModulus = k.public_key;
        SYNO.Encryption.CipherToken = k.ciphertoken;
        SYNO.Encryption.TimeBias = k.server_time - Math.floor(+new Date() / 1000);
        if (Ext.isEmpty(c.params.compound)) {
            d = SYNO.Encryption.EncryptParam(Ext.copyTo({}, c.params, b));
            for (h = 0; h < b.length; h++) {
                delete c.params[b[h]]
            }
            c.params = Ext.apply(c.params, d);
            return this.sendRequest(c)
        } else {
            var o = Ext.apply({}, c.userInfo.params);
            var l = this,
                e = 5;
            if (Ext.isIE6 || Ext.isIE7 || Ext.isIE8) {
                e = 1
            }
            h = 0;
            var p = function() {
                for (; h < o.compound.length; h++) {
                    var j = Ext.apply({}, o.compound[h], o.compound[h].params);
                    var i = {};
                    d = {};
                    i = SYNO.API.EncodeParams(Ext.copyTo({}, j, b));
                    if (!m(i)) {
                        d = SYNO.Encryption.EncryptParam(i)
                    }
                    for (g = 0; g < b.length; g++) {
                        delete j[b[g]]
                    }
                    o.compound[h] = Ext.apply(j, d);
                    if (h + 1 === o.compound.length) {
                        Ext.apply(c.params, SYNO.API.EncodeParams(o));
                        l.sendRequest(c);
                        return
                    } else {
                        if (h % e === 0) {
                            h++;
                            window.setTimeout(p, 80);
                            return
                        }
                    }
                }
            };
            p()
        }
    },
    sendRequest: function(d) {
        var c = d.appWindow,
            a, f, e = this.getKnownAPI("SYNO.CMS.DS"),
            b;
        if (Ext.isObject(c)) {
            c = c.findAppWindow()
        }
        if (!Ext.isEmpty(e) && SYNO.SDS.Utils.IsAllowRelay(c) && c.hasOpenConfig("cms_id")) {
            f = c.getOpenConfig("cms_timeout") || 120;
            b = {
                api: "SYNO.CMS.DS",
                version: 1,
                method: "relay",
                id: c.getOpenConfig("cms_id"),
                timeout: f
            };
            if (Ext.isElement(d.form) && (/multipart\/form-data/i.test(d.form.enctype))) {
                a = Ext.urlDecode(d.url.substr(d.url.indexOf("?") + 1));
                b.webapi = Ext.encode(Ext.copyTo({}, a, "api,version,method"));
                if (a.SynoToken) {
                    b.SynoToken = a.SynoToken
                }
                d.url = this.baseURL + "/" + e.path + "?" + Ext.urlEncode(b)
            } else {
                d.url = this.baseURL + "/" + e.path;
                b.webapi = Ext.apply({
                    api: d.params.api,
                    version: d.params.version,
                    method: d.params.method
                }, d.userInfo.params);
                d.params = SYNO.API.EncodeParams(b)
            }
            d.timeout = d.timeout || (f + 10) * 1000
        }
        return Ext.Ajax.request(d)
    },
    requestAPI: function(d, f, b, e, a, c) {
        return this.requestAjaxAPI(d, f, b, {}, e, a, c)
    },
    onRequestAPI: function(b, a, g) {
        var h = false,
            d = g,
            f;
        if (a) {
            try {
                f = Ext.decode(g.responseText)
            } catch (c) {}
            if (Ext.isObject(f)) {
                if (f.success) {
                    h = true;
                    d = f.data
                } else {
                    h = false;
                    d = f.error
                }
            }
        }
        SYNO.API.CheckResponse(h, d, b.userInfo.params, g);
        if (SYNO.SDS.Utils.IsAllowRelay(b.appWindow) && SYNO.API.CheckRelayResponse(h, d, undefined, b, g)) {
            return
        }
        if (b.userInfo.cb) {
            b.userInfo.cb.call(b.userInfo.scope, h, d, b.userInfo.params, b)
        }
    }
});
SYNO.API.Store = Ext.extend(Ext.data.Store, {
    defaultParamNames: {
        start: "offset",
        limit: "limit",
        sort: "sort_by",
        dir: "sort_direction"
    },
    constructor: function(a) {
        if ((a.api && a.method && a.version) && !a.proxy) {
            if (!Ext.isObject(a.appWindow) && false !== a.appWindow) {
                SYNO.Debug.error("No appWindow!");
                SYNO.Debug.debug("SYNO.API.Store and SYNO.API.JsonStore require appWindow in config.");
                SYNO.Debug.debug("appWindow can be found by Ext.Component.findAppWindow");
                SYNO.Debug.debug("ex: this.findAppWindow() or config.module.appWin.findAppWindow()");
                return
            }
            this.proxy = new SYNO.API.Proxy({
                api: a.api,
                method: a.method,
                version: a.version,
                appWindow: a.appWindow,
                encryption: a.encryption
            })
        }
        SYNO.API.Store.superclass.constructor.apply(this, arguments)
    }
});
Ext.define("SYNO.API.CompoundReader", {
    extend: "Ext.data.JsonReader",
    constructor: function() {
        this.callParent(arguments)
    },
    readRecords: function(d) {
        var e, c = [],
            b = this.meta.roots,
            a = {
                success: false,
                records: [],
                totalRecords: 0
            };
        this.compoundData = d;
        if (!Ext.isObject(d)) {
            return a
        }
        d.result.each(function(h, g, f) {
            if (Ext.isArray(b)) {
                this.getRoot = this.createAccessor(b[g])
            }
            if (true === h.success) {
                e = this.superclass().readRecords.call(this, h.data)
            } else {
                c.push({
                    response: h,
                    index: g,
                    total: f
                })
            }
            if (Ext.isFunction(this.meta.onCompoundResponse)) {
                e = this.meta.onCompoundResponse(h, e)
            }
            a.records = a.records.concat(e.records);
            a.totalRecords += e.totalRecords
        }, this);
        a.success = !d.has_fail;
        if (false === a.success) {
            throw c
        }
        return a
    }
});
SYNO.API.CompoundStore = Ext.extend(SYNO.API.Store, {
    constructor: function(a) {
        Ext.apply(a, {
            api: "SYNO.Entry.Request",
            version: 1,
            method: "request"
        });
        SYNO.API.JsonStore.superclass.constructor.call(this, Ext.apply(a, {
            reader: new SYNO.API.CompoundReader(a)
        }))
    }
});
SYNO.API.JsonStore = Ext.extend(SYNO.API.Store, {
    constructor: function(a) {
        SYNO.API.JsonStore.superclass.constructor.call(this, Ext.apply(a, {
            reader: new Ext.data.JsonReader(a)
        }))
    }
});
SYNO.API.Proxy = Ext.extend(Ext.util.Observable, {
    constructor: function(c) {
        c = c || {};
        Ext.apply(this, c);
        this.addEvents("exception", "beforeload", "loadexception");
        SYNO.API.Proxy.superclass.constructor.call(this);
        var b = Ext.data.Api.actions;
        this.activeRequest = {};
        for (var a in b) {
            if (b.hasOwnProperty(a)) {
                this.activeRequest[b[a]] = undefined
            }
        }
    },
    request: function(e, b, f, a, g, d, c) {
        if (false !== this.fireEvent("beforeload", this, f)) {
            this.doRequest.apply(this, arguments)
        } else {
            g.call(d || this, null, c, false)
        }
    },
    doRequest: function(f, b, g, a, h, e, c) {
        var d = {
            appWindow: this.appWindow
        };
        if (!c.timeout && this.timeout) {
            Ext.apply(d, {
                timeout: this.timeout
            })
        }
        if (this.encryption) {
            Ext.apply(d, {
                encryption: this.encryption
            })
        }
        if (Ext.isObject(a.meta.compound) && Ext.isArray(a.meta.compound.params)) {
            d.compound = Ext.apply({}, a.meta.compound);
            if (Ext.isObject(g)) {
                d.compound.params.each(function(i) {
                    i.params = Ext.apply(i.params || {}, g)
                }, this)
            }
            g = {}
        }
        this.activeRequest[f] = SYNO.API.currentManager.requestAjaxAPI(this.api, this.method, this.version, d, g, Ext.createDelegate(this.onRequestAPI, this, [a, h, e, c, f], true));
        if (Ext.isEmpty(this.activeRequest[f])) {
            this.onRequestAPI(false, undefined, g, c, a, h, e, c, f)
        }
    },
    onRequestAPI: function(i, f, c, a, g, j, k, m, d) {
        this.activeRequest[d] = undefined;
        var l = null,
            b = null;
        if (i) {
            try {
                l = g.readRecords(f)
            } catch (h) {
                b = h;
                SYNO.Debug.error("Failed to read data, ", h)
            }
        }
        if (!i || b) {
            this.fireEvent("loadexception", this, m, f, b);
            this.fireEvent("exception", this, "response", Ext.data.Api.actions.read, m, f, b)
        } else {
            this.fireEvent("load", this, f, m)
        }
        j.call(k || this, l, m, i)
    }
});
SYNO.API.TreeLoader = Ext.extend(Ext.tree.TreeLoader, {
    load: function(b, c, a) {
        if (this.clearOnLoad) {
            while (b.firstChild) {
                b.removeChild(b.firstChild)
            }
        }
        if (this.doPreload(b)) {
            this.runCallback(c, a || b, [b])
        } else {
            if (this.directFn || (this.method && this.api)) {
                this.requestData(b, c, a || b)
            }
        }
    },
    requestData: function(b, c, a) {
        if (this.fireEvent("beforeload", this, b, c) !== false) {
            this.transId = this.doRequest.apply(this, arguments)
        } else {
            this.runCallback(c, a || b, [])
        }
    },
    doRequest: function(b, d, a) {
        var c = this.getParams(b);
        return SYNO.API.currentManager.requestAjaxAPI(this.api, this.method, this.version, {
            timeout: this.timeout,
            success: this.handleResponse,
            failure: this.handleFailure,
            scope: this,
            appWindow: this.appWindow || false,
            argument: {
                callback: d,
                node: b,
                scope: a
            }
        }, c, Ext.emptyFn)
    },
    processResponse: function(d, c, l, m) {
        var p = d.responseText;
        try {
            var a = d.responseData || Ext.decode(p);
            if (this.dataroot) {
                if (!Ext.isArray(this.dataroot)) {
                    this.dataroot = this.dataroot.split(",")
                }
                var g = this.dataroot;
                for (var k in g) {
                    if (g.hasOwnProperty(k)) {
                        a = a[g[k]]
                    }
                }
            }
            c.beginUpdate();
            for (var f = 0, h = a.length; f < h; f++) {
                var b = this.createNode(a[f], c);
                if (b) {
                    c.appendChild(b)
                }
            }
            c.endUpdate();
            this.runCallback(l, m || c, [c])
        } catch (j) {
            this.handleFailure(d)
        }
    }
});
SYNO.API.Form = {};
SYNO.API.Form.Traverse = function(g, a) {
    if (!g) {
        return
    }
    var f = g.elements || (document.forms[g] || Ext.getDom(g)).elements,
        b = false,
        c, e, d, h;
    Ext.each(f, function(i) {
        c = i.name;
        e = i.type;
        if (!(h = Ext.getCmp(i.id))) {
            return
        }
        if (Ext.isEmpty(c) && Ext.isFunction(h.getName)) {
            c = h.getName()
        }
        if (!i.disabled && c) {
            if (/select-(one|multiple)/i.test(e)) {
                Ext.each(i.options, function(j) {
                    if (j.selected) {
                        d = j.hasAttribute ? j.hasAttribute("value") : j.getAttributeNode("value").specified;
                        a(h, c, d ? j.value : j.text, e)
                    }
                })
            } else {
                if (!(/file|undefined|reset|button/i.test(e))) {
                    if (/radio/i.test(e) || h instanceof SYNO.ux.Radio) {
                        if (h.getValue()) {
                            a(h, c, h.getInputValue() || "", e)
                        }
                    } else {
                        if (/checkbox/i.test(e) || h instanceof SYNO.ux.Checkbox) {
                            a(h, c, h.getValue() ? true : false)
                        } else {
                            if (!(e == "submit" && b)) {
                                if (Ext.isFunction(h.getValue)) {
                                    a(h, c, h.getValue(), e)
                                } else {
                                    a(h, c, i.value, e)
                                }
                                b = /submit/i.test(e)
                            }
                        }
                    }
                }
            }
        }
    });
    return
};
SYNO.API.Form.Serialize = function(a, c) {
    var b = {};
    b = SYNO.API.Form.Retrieve(a, false, c);
    b = SYNO.API.DecodeFlatParams(b);
    b = SYNO.API.EncodeParams(b);
    return Ext.urlEncode(b)
};
SYNO.API.Form.Retrieve = function(b, e, d) {
    var a, f, c = {};
    SYNO.API.Form.Traverse(b, function(h, g, i) {
        if (d) {
            a = SYNO.ux.Utils.getFormFieldApi(h);
            if (!SYNO.ux.Utils.checkApiObjValid(a)) {
                return
            }
            if (d === "get" || d === "load") {
                f = a.method || a.methods.get
            } else {
                f = a.method || a.methods.set
            }
            g = a.api + "|" + f + "|" + a.version + "|" + g
        }
        c[g] = i
    });
    if (e) {
        c = SYNO.API.EncodeParams(c)
    }
    return c
};
SYNO.API.Form.Action = {};
SYNO.API.Form.Action.Load = Ext.extend(Ext.form.Action.Load, {
    run: function() {
        var d = this.options;
        var c = Ext.urlDecode(this.getParams());
        var b = this.form.webapi || this.form;
        var a = b.method || b.methods.get;
        SYNO.API.currentManager.requestAjaxAPI(b.api, a, b.version, Ext.apply(this.createCallback(d), {
            appWindow: this.form.appWindow,
            compound: d.compound,
            method: this.getMethod(),
            url: this.getUrl(false),
            headers: this.options.headers,
            encryption: this.form.encryption
        }), c, d.callback, d.scope)
    }
});
SYNO.API.Form.Action.Submit = Ext.extend(Ext.form.Action.Submit, {
    run: function() {
        var c = this.options;
        if (c.clientValidation === false || this.form.isValid()) {
            var e = Ext.urlDecode(this.getParams());
            var g = Ext.isBoolean(c.fileUpload) ? c.fileUpload : (this.form.fileUpload || (this.form.el && this.form.el.dom && (/multipart\/form-data/i.test(this.form.el.dom.getAttribute("enctype")))));
            var b = this.form.el ? this.form.el.dom : undefined;
            if (g) {
                var f = this.form.items,
                    a = function(l) {
                        if (!l.disabled && (l.inputType !== "file")) {
                            var k = l.getValue();
                            if (Ext.isBoolean(k)) {
                                e[l.getName()] = k
                            }
                            if (l.isComposite && l.rendered) {
                                l.items.each(a)
                            }
                        }
                    };
                f.each(a)
            } else {
                if (c.compound) {} else {
                    var d = SYNO.API.Form.Retrieve(b, false, "submit");
                    for (var i in d) {
                        if (d.hasOwnProperty(i)) {
                            e[i] = d[i]
                        }
                    }
                    e = SYNO.API.DecodeFlatParams(e)
                }
            }
            var h = this.form.webapi || this.form;
            var j = h.method || (h.methods ? h.methods.set : undefined);
            SYNO.API.currentManager.requestAjaxAPI(h.api, j, h.version, Ext.apply(this.createCallback(c), {
                appWindow: this.form.appWindow,
                compound: c.compound,
                form: g ? b : undefined,
                method: this.getMethod(),
                headers: c.headers,
                encryption: this.form.encryption
            }), e, c.callback, c.scope)
        } else {
            if (c.clientValidation !== false) {
                this.failureType = Ext.form.Action.CLIENT_INVALID;
                this.form.afterAction(this, false)
            }
        }
    }
});
SYNO.API.Form.BasicForm = Ext.extend(Ext.form.BasicForm, {
    doAction: function(b, a) {
        if (Ext.isString(b)) {
            if (b !== "load") {
                b = new SYNO.API.Form.Action.Submit(this, a)
            } else {
                b = new SYNO.API.Form.Action.Load(this, a)
            }
        }
        if (this.fireEvent("beforeaction", this, b) !== false) {
            this.beforeAction(b);
            b.run.defer(100, b)
        }
        return this
    },
    submit: function(c) {
        if (this.standardSubmit) {
            var e = {};
            var a = this.items,
                d = function(h) {
                    if (!h.disabled && (h.inputType !== "file")) {
                        var g = h.getValue();
                        if (Ext.isBoolean(g)) {
                            e[h.getName()] = g
                        }
                        if (h.isComposite && h.rendered) {
                            h.items.each(d)
                        }
                    }
                };
            a.each(d);
            var b = this.webapi || this;
            this.url = SYNO.API.GetBaseURL(Ext.apply(e, {
                api: b.api,
                method: b.method || b.methods.set,
                version: b.version
            }));
            return SYNO.API.Form.BasicForm.superclass.submit.call(this, c)
        }
        this.doAction("submit", c);
        return this
    },
    load: function(a) {
        this.doAction("load", a);
        return this
    },
    getValues: function(a, b) {
        if (a === true) {
            return SYNO.API.Form.Serialize(this.el.dom, b)
        }
        return SYNO.API.Form.Retrieve(this.el.dom, false, b)
    },
    loadRecords: function(c, b) {
        for (var a = 0; a < b.length; a++) {
            if (!c[a] || !b[a]) {
                break
            }
            if (!c[a].success) {
                continue
            }
            this.setFieldValues(c[a].data, b[a])
        }
    },
    setFieldValues: function(l, g) {
        var h, e, b, m, d, c, f, a;
        a = function(i) {
            if (this.trackResetOnLoad) {
                i.originalValue = i.getValue()
            }
        };
        if (Ext.isArray(l)) {
            for (d = 0, f = l.length; d < f; d++) {
                var k = l[d];
                m = this.findFields(k.id);
                for (c = 0; c < m.length; c++) {
                    h = m[c];
                    if (h) {
                        if (!SYNO.ux.Utils.checkFieldApiConsistency(h, g, "get")) {
                            continue
                        }
                        e = [h];
                        if ("radio" === h.inputType || h instanceof SYNO.ux.Radio) {
                            e = SYNO.ux.Utils.getRadioGroup(this, k.id)
                        }
                        h.setValue(k.value);
                        Ext.each(e, a, this)
                    }
                }
            }
        } else {
            for (b in l) {
                if (!Ext.isFunction(l[d])) {
                    m = this.findFields(b);
                    for (d = 0; d < m.length; d++) {
                        h = m[d];
                        if (!SYNO.ux.Utils.checkFieldApiConsistency(h, g, "get")) {
                            continue
                        }
                        e = [h];
                        if ("radio" === h.inputType || h instanceof SYNO.ux.Radio) {
                            e = SYNO.ux.Utils.getRadioGroup(this, b)
                        }
                        h.setValue(l[b]);
                        Ext.each(e, a, this)
                    }
                }
            }
        }
        return this
    },
    findFields: function(c) {
        var a = [];
        var b = function(d) {
            if (d.isFormField) {
                if (d.dataIndex == c || d.id == c || d.getName() == c) {
                    a.push(d);
                    return true
                } else {
                    if (d.isComposite) {
                        return d.items.each(b)
                    } else {
                        if (d instanceof Ext.form.CheckboxGroup && d.rendered) {
                            return d.eachItem(b)
                        }
                    }
                }
            }
        };
        this.items.each(b);
        return a
    }
});
SYNO.API.Form.FormPanel = Ext.extend(Ext.form.FormPanel, {
    createForm: function() {
        var a = Ext.applyIf({
            appWindow: this,
            listeners: {}
        }, this.initialConfig);
        return new SYNO.API.Form.BasicForm(null, a)
    }
});
SYNO.API.EncodeFlatParams = function(d) {
    var e = {};
    if (!d) {
        return e
    }
    var a = function(k, h, i) {
        for (var j in k) {
            if (k.hasOwnProperty(j)) {
                var g = k[j],
                    f = h ? (h + "|" + j) : j;
                if (Ext.isFunction(g)) {} else {
                    if (Ext.isObject(g)) {
                        a(k[j], f, i)
                    } else {
                        i[f] = g
                    }
                }
            }
        }
    };
    if (!Ext.isArray(d)) {
        a(d, undefined, e);
        return e
    }
    var c;
    for (var b = 0; b < c.length; b++) {
        if (c[b].api && c[b].method) {
            a(c[b], c[b].api + "|" + c[b].method, e)
        } else {
            a(d, undefined, e)
        }
    }
    return e
};
SYNO.API.DecodeFlatParams = function(b) {
    var d = {};
    var c = function(f, i, h) {
        var g = f.indexOf("|"),
            e;
        if (0 < g) {
            e = f.substring(0, g);
            if (!Ext.isObject(h[e])) {
                h[e] = {}
            }
            c(f.substring(g + 1), i, h[e])
        } else {
            h[f] = i
        }
    };
    for (var a in b) {
        if (!Ext.isObject(b[a])) {
            c(a, b[a], d)
        } else {
            d[a] = b[a]
        }
    }
    return d
};
SYNO.API.EscapeStr = function(a) {
    if (!a) {
        return ""
    }
    return a.replace(/[\\]/g, "\\\\").replace(/[,]/g, "\\,")
};
SYNO.API.EncodeParams = function(d) {
    var b = {};
    for (var a in d) {
        if (d.hasOwnProperty(a)) {
            b[a] = Ext.encode(d[a])
        }
    }
    return b
};
SYNO.API.DecodeParams = function(f) {
    var d = {};
    for (var a in f) {
        if (f.hasOwnProperty(a)) {
            try {
                d[a] = Ext.decode(f[a])
            } catch (b) {
                d[a] = SYNO.Util.copy(f[a])
            }
        }
    }
    return d
};
SYNO.API.Request = function(a) {
    return SYNO.API.currentManager.requestAjaxAPI(a)
};
SYNO.API.GetBaseURL = function(d, a, b) {
    var c = d.appWindow,
        e = function() {
            if (SYNO.ux.Utils.checkApiObjValid(d) && SYNO.SDS.Utils.IsAllowRelay(c) && c.hasOpenConfig("cms_id")) {
                return SYNO.API.currentManager.getBaseURL({
                    api: "SYNO.CMS.DS",
                    version: 1,
                    method: "relay",
                    params: {
                        id: c.getOpenConfig("cms_id"),
                        timeout: c.getOpenConfig("cms_timeout") || 120,
                        webapi: Ext.apply({
                            api: d.api,
                            version: d.version,
                            method: d.method
                        }, d.params)
                    }
                }, a, b)
            } else {
                return SYNO.API.currentManager.getBaseURL(d, a, b)
            }
        };
    return e()
};
SYNO.API.EncodeURL = function(a) {
    a = SYNO.API.EncodeParams(a);
    return Ext.urlEncode.apply(this, arguments)
};
SYNO.API.GetKnownAPI = function(a, b) {
    return SYNO.API.currentManager.getKnownAPI(a, b)
};
SYNO.API.Util = {};
SYNO.API.Util.GetReqByAPI = function(e, d, h, b) {
    var c, g, f;
    if (!Ext.isObject(e)) {
        return
    }
    c = e.compound;
    if (Ext.isObject(c)) {
        if (!Ext.isArray(c.params)) {
            return
        }
        g = c.params;
        for (var a = 0; a < g.length; a++) {
            f = g[a];
            if (d === f.api && h === f.method) {
                if (b) {
                    return Ext.isObject(f.params) ? (Ext.isDefined(f.params[b]) ? f.params[b] : f[b]) : f[b]
                }
                return f
            }
        }
    } else {
        if (Ext.isObject(e.params)) {
            if (b) {
                return e.params[b]
            }
            return e.params
        }
    }
    return
};
SYNO.API.Util.GetReqByIndex = function(d, a, b) {
    var c, e;
    if (!Ext.isObject(d)) {
        return
    }
    c = d.compound;
    if (Ext.isObject(c)) {
        if (!Ext.isArray(c.params)) {
            return
        }
        e = c.params;
        if (!Ext.isObject(e[a])) {
            return
        }
        e = e[a];
        if (b) {
            return Ext.isObject(e.params) ? (Ext.isDefined(e.params[b]) ? e.params[b] : e[b]) : e[b]
        }
        return e
    } else {
        if (Ext.isObject(d.params)) {
            if (b) {
                return d.params[b]
            }
            return d.params
        }
    }
    return
};
SYNO.API.Util.GetValByAPI = function(f, d, g, c) {
    if (Ext.isObject(f)) {
        if (Ext.isArray(f.result)) {
            var a = f.result;
            for (var b = 0; b < a.length; b++) {
                if (d === a[b].api && g === a[b].method) {
                    var e = a[b].data || a[b].error;
                    if (!e) {
                        return
                    }
                    if (c) {
                        return e[c]
                    }
                    return e
                }
            }
            return
        } else {
            if (c) {
                return f[c]
            } else {
                return f
            }
        }
    }
    return
};
SYNO.API.Util.GetValByIndex = function(e, b, c) {
    var a;
    if (!Ext.isObject(e)) {
        return
    }
    a = e.result;
    if (Ext.isArray(a)) {
        if (!Ext.isObject(a[b])) {
            return
        }
        var d = a[b].data || a[b].error;
        if (!d) {
            return
        }
        if (c) {
            return d[c]
        }
        return d
    } else {
        if (c) {
            return e[c]
        } else {
            return e
        }
    }
};
SYNO.API.Util.GetFirstError = function(c) {
    var a;
    if (!Ext.isObject(c)) {
        return
    }
    if (Ext.isBoolean(c.has_fail)) {
        if (c.has_fail && Ext.isArray(c.result)) {
            a = c.result;
            for (var b = 0; b < a.length; b++) {
                if (Ext.isObject(a[b]) && !a[b].success) {
                    return a[b].error
                }
            }
        }
    }
    return c
};
SYNO.API.Util.GetFirstErrorIndex = function(c) {
    var a;
    if (!Ext.isObject(c)) {
        return
    }
    if (Ext.isBoolean(c.has_fail)) {
        if (c.has_fail && Ext.isArray(c.result)) {
            a = c.result;
            for (var b = 0; b < a.length; b++) {
                if (Ext.isObject(a[b]) && !a[b].success) {
                    return b
                }
            }
        }
    }
    return 0
};
SYNO.API.Request.Polling = Ext.extend(Ext.util.Observable, {
    api: "SYNO.Entry.Request.Polling",
    version: 1,
    local: "polling_local_instance",
    queue: null,
    pool: null,
    reg: null,
    pollingId: null,
    jsDebug: undefined,
    constructor: function() {
        SYNO.API.Request.Polling.superclass.constructor.apply(this, arguments);
        this.queue = {};
        this.pool = {};
        this.reg = {};
        this.jsDebug = Ext.urlDecode(location.search.substr(1)).jsDebug
    },
    getInterval: function(e, b) {
        var c, a = 0,
            d;
        if (Ext.isNumber(e.firstRunTime)) {
            a = parseInt(new Date().getTime() / 1000, 10) - e.firstRunTime
        }
        if (Ext.isNumber(b)) {
            c = b
        } else {
            if (Ext.isFunction(b)) {
                c = b.call(e.scope || this, a)
            } else {
                if (Ext.isArray(b)) {
                    for (d = 0; d < b.length; ++d) {
                        if (b[d].time > a) {
                            break
                        }
                        c = b[d].interval
                    }
                }
            }
        }
        if (!Ext.isNumber(c)) {
            return false
        }
        if (c < 1) {
            c = 1
        }
        return c
    },
    addToQueue: function(d, a) {
        var c = this.reg[d],
            b;
        if (Ext.isEmpty(c)) {
            return false
        }
        b = this.getInterval(c, a);
        if (!Ext.isNumber(b)) {
            SYNO.Debug.error("[Polling]Register " + d + " interval is invalid");
            return false
        }
        this.queue[d] = b;
        return true
    },
    addToPool: function(b, a, d) {
        var c = this.getInstanceName(d);
        if (Ext.isEmpty(this.pool[c + b])) {
            this.pool[c + b] = Ext.apply({
                register_id_list: [],
                auto_remove: false,
                finish: false
            }, a || {})
        }
    },
    addToRegister: function(d) {
        var a, b, c, e = Ext.id(undefined, "webapi_polling_register_id");
        if ((Ext.isEmpty(d.task_id) && Ext.isEmpty(d.webapi)) || !Ext.isFunction(d.status_callback)) {
            return
        }
        if (!Ext.isNumber(d.interval) && !Ext.isFunction(d.interval) && !Ext.isArray(d.interval)) {
            return
        }
        if (Ext.isEmpty(d.webapi)) {
            a = this.getTask(d.task_id, d.appWindow);
            if (Ext.isEmpty(a)) {
                return
            }
            a.register_id_list = a.register_id_list.concat(e)
        }
        b = parseInt(new Date().getTime() / 1000, 10);
        c = d.immediate ? b : b + this.getInterval(d, d.interval);
        this.reg[e] = Ext.apply({
            firstRunTime: c
        }, d);
        return e
    },
    getTask: function(a, c) {
        var b = this.getInstanceName(c);
        if (Ext.isEmpty(a)) {
            return
        }
        return this.pool[b + a]
    },
    updateTask: function(b, a, d) {
        var c = this.getTask(b, d) || {
            register_id_list: []
        };
        Ext.copyTo(c, a, "auto_remove,finish")
    },
    removeTask: function(a, d) {
        var b = this.getTask(a, d),
            c = this.getInstanceName(d);
        if (Ext.isEmpty(b)) {
            return false
        }
        if (Ext.isEmpty(b.register_id_list) || !Ext.isArray(b.register_id_list)) {
            delete this.pool[c + a];
            return true
        }
        b.register_id_list.each(function(e) {
            delete this.queue[e];
            delete this.reg[e]
        }, this);
        delete this.pool[c + a];
        return true
    },
    removeRegister: function(c) {
        var a, b;
        if (Ext.isEmpty(c) || Ext.isEmpty(this.reg[c])) {
            SYNO.Debug.error("[Polling]No such register id");
            return false
        }
        b = this.reg[c];
        if (Ext.isEmpty(b.webapi)) {
            a = this.getTask(b.task_id, b.appWindow);
            if (Ext.isEmpty(a)) {
                SYNO.Debug.error("[Polling]No such task");
                return false
            }
            a.register_id_list.remove(c)
        }
        b.status_callback = null;
        delete this.reg[c];
        return true
    },
    convertToTaskUser: function(b) {
        var a;
        if (Ext.isEmpty(b)) {
            a = _S("user")
        } else {
            if ("admin" == b) {
                a = "@administrators"
            } else {
                if ("everyone" == b) {
                    a = "@users"
                }
            }
        }
        return a
    },
    notifyTaskStatus: function(a, e, f, d) {
        var b, c;
        b = this.getTask(a, d.app);
        if (Ext.isEmpty(b)) {
            return
        }
        b.register_id_list.each(function(h) {
            c = this.reg[h];
            if (Ext.isEmpty(c) || !Ext.isFunction(c.status_callback)) {
                return
            }
            try {
                c.status_callback.call(c.scope || this, a, e, f, d)
            } catch (g) {
                SYNO.Debug.error(g)
            }
        }, this)
    },
    notifyWebAPIStatus: function(d, g, e, f, c) {
        var a = this.reg[d];
        if (Ext.isEmpty(a)) {
            return
        }
        if (Ext.isDefined(this.jsDebug)) {
            a.status_callback.call(a.scope || this, g, e, f, c)
        } else {
            try {
                a.status_callback.call(a.scope || this, g, e, f, c)
            } catch (b) {
                SYNO.Debug.error(b)
            }
        }
    },
    beginPolling: function(e) {
        var b, d, g, a, f = false,
            c = {};
        if ("halt" === e) {
            delete this.pollingHalt
        }
        for (d in this.queue) {
            if (this.queue.hasOwnProperty(d)) {
                b = this.reg[d];
                if (Ext.isEmpty(b)) {
                    delete this.queue[d];
                    continue
                }
                if (true === this.pollingHalt && true !== b.preventHalt) {
                    continue
                }
                this.queue[d]--;
                if (this.queue[d] > 0) {
                    continue
                }
                delete this.queue[d];
                if (!Ext.isFunction(b.status_callback)) {
                    continue
                }
                g = b.appWindow || false;
                if (g && true === g.isDestroyed && true !== g.keepPolling) {
                    this.removeRegister(d);
                    continue
                }
                a = this.getInstanceName(g);
                if (Ext.isEmpty(c[a])) {
                    c[a] = {
                        task_id_list: [],
                        webapi: [],
                        reg: [],
                        opts: [],
                        app: g
                    }
                }
                if (!Ext.isEmpty(b.webapi)) {
                    f = true;
                    c[a].webapi.push(b.webapi);
                    c[a].reg.push(d);
                    c[a].opts.push(b.webapi);
                    continue
                }
                if (Ext.isEmpty(this.getTask(b.task_id, b.appWindow))) {
                    continue
                }
                f = true;
                if (c[a].task_id_list.indexOf(b.task_id) < 0) {
                    c[a].task_id_list = c[a].task_id_list.concat(b.task_id)
                }
            }
        }
        this.endPolling();
        if (false === f) {
            this.pollingId = this.beginPolling.defer(1000, this);
            return
        }
        for (a in c) {
            if (c.hasOwnProperty(a)) {
                if (!Ext.isEmpty(c[a].task_id_list)) {
                    c[a].webapi.push({
                        api: this.api,
                        version: this.version,
                        method: "status",
                        params: {
                            task_id_list: c[a].task_id_list
                        }
                    });
                    c[a].reg.push("TASK");
                    c[a].opts.push({
                        app: c[a].app,
                        task_id_list: c[a].task_id_list
                    })
                }
                this.reqId = SYNO.API.Request({
                    compound: {
                        stop_when_error: false,
                        mode: "parallel",
                        params: c[a].webapi
                    },
                    appWindow: c[a].app,
                    callback: this.pollingCompoundCallack,
                    reg_ref: c[a].reg,
                    opts_ref: c[a].opts,
                    timeout: 6000000,
                    scope: this
                })
            }
        }
    },
    endPolling: function(a) {
        if ("halt" === a) {
            this.pollingHalt = true;
            return
        }
        window.clearTimeout(this.pollingId);
        this.pollingId = null;
        if (!Ext.isEmpty(this.reqId)) {
            Ext.Ajax.abort(this.reqId);
            delete this.reqId
        }
    },
    collectToQueue: function(e, f) {
        var c = Ext.isArray(e) ? e : [],
            h, d, a, b, g = function(i) {
                i.each(function(k, j) {
                    d = this.reg[k];
                    if (Ext.isEmpty(d) || !Ext.isFunction(d.status_callback)) {
                        return
                    }
                    this.addToQueue(k, d.interval)
                }, this)
            };
        b = c.indexOf("TASK");
        if (-1 !== b) {
            h = f[b];
            c.splice(b, 1)
        }
        g.call(this, c);
        if (Ext.isObject(h) && Ext.isArray(h.task_id_list)) {
            h.task_id_list.each(function(i) {
                a = this.getTask(i, h.app);
                if (Ext.isEmpty(a)) {
                    return
                }
                if (true === a.finish) {
                    return
                }
                g.call(this, a.register_id_list)
            }, this)
        }
        if (Ext.isEmpty(this.pollingId)) {
            this.pollingId = this.beginPolling.defer(1000, this)
        }
    },
    pollingCompoundCallack: function(k, g, d, a) {
        var f, c, h, l, e, j, b;
        this.reqId = null;
        f = k ? g.result : [];
        c = a.reg_ref;
        h = a.opts_ref;
        if (c.length !== f.length) {
            this.collectToQueue(c, h);
            return
        }
        this.endPolling();
        for (e = 0; e < f.length; e++) {
            if (c[e] === "TASK") {
                this.pollingCallback(k, f[e].data, d.compound[e], h[e])
            } else {
                j = this.reg[c[e]];
                if (Ext.isEmpty(j)) {
                    continue
                }
                if (!Ext.isFunction(j.status_callback)) {
                    this.removeRegister(c[e]);
                    continue
                }
                b = j.appWindow || false;
                if (b && true === b.isDestroyed && true !== b.keepPolling) {
                    this.removeRegister(c[e]);
                    continue
                }
                l = f[e].success;
                this.notifyWebAPIStatus(c[e], l, l ? f[e].data : f[e].error, d.compound[e], h[e])
            }
        }
        this.collectToQueue(c, h)
    },
    pollingCallback: function(f, d, e, c) {
        var b, a;
        if (!f) {
            return
        }
        for (a in d) {
            if (d.hasOwnProperty(a)) {
                this.updateTask(a, d[a], c.app);
                b = this.getTask(a, c.app);
                if (Ext.isEmpty(b)) {
                    continue
                }
                this.notifyTaskStatus(a, d[a], e, c);
                if (b.finish && b.auto_remove) {
                    this.removeTask(a, c.app)
                }
            }
        }
    },
    list: function(a) {
        var c, b;
        b = Ext.apply({
            extra_group_tasks: [],
            task_id_prefix: "",
            callback: null
        }, a);
        if (!Ext.isArray(b.extra_group_tasks)) {
            SYNO.Debug.error("[Polling]Incorrect type parameter: extra_group_tasks");
            return
        }
        b.extra_group_tasks = b.extra_group_tasks.concat("user");
        c = Ext.copyTo({}, b, "extra_group_tasks,task_id_prefix");
        if (!Ext.isFunction(b.callback)) {
            SYNO.Debug.error("[Polling]No required parameter: callback");
            return
        }
        delete c.callback;
        delete c.scope;
        SYNO.API.Request({
            api: this.api,
            version: this.version,
            method: "list",
            params: c,
            appWindow: b.appWindow || false,
            callback: b.callback,
            scope: b.scope || this
        })
    },
    register: function(a) {
        var b;
        if ((Ext.isEmpty(a.task_id) && Ext.isEmpty(a.webapi)) || !Ext.isFunction(a.status_callback)) {
            SYNO.Debug.error("[Polling]register fail, no requried parameters");
            return
        }
        if (!Ext.isNumber(a.interval) && !Ext.isFunction(a.interval) && !Ext.isArray(a.interval)) {
            SYNO.Debug.error("[Polling]register fail, interval is invalid");
            return
        }
        if (!Ext.isEmpty(a.task_id)) {
            this.addToPool(a.task_id, {
                task_id: a.task_id
            }, a.appWindow)
        }
        b = this.addToRegister(a);
        if (true === a.immediate) {
            if (true === this.pollingHalt) {
                this.addToQueue(b, 0)
            } else {
                SYNO.API.Request(Ext.apply({
                    appWindow: a.appWindow,
                    callback: function(f, d, e, c) {
                        this.notifyWebAPIStatus(b, f, d, e, c);
                        this.addToQueue(b, a.interval)
                    },
                    scope: this
                }, a.webapi))
            }
        } else {
            this.addToQueue(b, a.interval)
        }
        return b
    },
    unregister: function(a) {
        return this.removeRegister(a)
    },
    getInstanceName: function(b) {
        var a = this.local;
        if (Ext.isObject(b) && SYNO.SDS.Utils.IsAllowRelay(b)) {
            if (b.hasOpenConfig("cms_id")) {
                a = "cms_ds_" + b.getOpenConfig("cms_id")
            }
        }
        return a
    }
});
SYNO.API.Request.Polling.InitInstance = function(a) {
    if (!a) {
        a = {}
    }
    if (Ext.isEmpty(a._Instance)) {
        a._Instance = new SYNO.API.Request.Polling();
        a._Instance.beginPolling()
    }
    return a._Instance
};
SYNO.API.Request.Polling.Instance = SYNO.API.Request.Polling.InitInstance(SYNO.API.Request.Polling.Instance);
SYNO.API.Request.Polling.List = function(a) {
    return SYNO.API.Request.Polling.Instance.list(a)
};
SYNO.API.Request.Polling.Register = function(a) {
    return SYNO.API.Request.Polling.Instance.register(a)
};
SYNO.API.Request.Polling.Unregister = function(a) {
    return SYNO.API.Request.Polling.Instance.unregister(a)
};
Ext.define("SYNO.API.Info", {
    extend: "Ext.util.Observable",
    local: "info_local",
    constructor: function() {
        this.callParent(arguments);
        this._session = {};
        this._define = {};
        this._knownAPI = {}
    },
    check: function(b) {
        var a;
        if (!Ext.isObject(b)) {
            throw "Error! appwindow is incorrect!"
        }
        if (!Ext.isFunction(b.findAppWindow)) {
            return
        }
        a = b.findAppWindow();
        if (!Ext.isObject(a) || !Ext.isObject(a.openConfig) || !Ext.isFunction(a.hasOpenConfig) || !Ext.isFunction(a.getOpenConfig) || !Ext.isFunction(a.setOpenConfig)) {
            return
        }
        return a
    },
    getInstName: function(c) {
        var b = this.local,
            a = this.check(c);
        if (Ext.isObject(a) && SYNO.SDS.Utils.IsAllowRelay(a)) {
            if (a.hasOpenConfig("cms_id")) {
                b = "cms_ds_" + a.getOpenConfig("cms_id")
            }
        }
        return b
    },
    getInstNameById: function(b) {
        var a = this.local;
        if (Ext.isNumber(b) && 0 <= b) {
            a = "cms_ds_" + b
        }
        return a
    },
    checkInst: function(d, a, b, c, e) {
        if (d === this.local) {
            return false
        }
        if (Ext.isObject(c) && Ext.isObject(b)) {
            this.handleResponse(a, b, c, e);
            return false
        }
        if (d in this._define && d in this._session && b !== true) {
            this.handleResponse({
                cms_id: 0
            }, undefined, undefined, e);
            return false
        }
        return true
    },
    updateInstById: function(b, a, e) {
        var d, c, f;
        if (Ext.isObject(b)) {
            c = b;
            b = c.cms_id;
            d = this.getInstNameById(c.cms_id);
            f = Ext.copyTo({}, c, "callback,args,scope")
        }
        if (false === this.checkInst(d, {
                cms_id: b
            }, a, e, f)) {
            return
        }
        SYNO.API.Request({
            api: "SYNO.CMS.DS",
            version: 1,
            method: "relay",
            timeout: 30000,
            params: {
                id: b,
                timeout: 30,
                webapi: {
                    api: "SYNO.API.Info",
                    version: 1,
                    method: "query"
                }
            },
            appOpt: f,
            cms_id: b,
            callback: function(j, h, i, g) {
                if (true !== j) {
                    this._knownAPI[d] = undefined
                } else {
                    this._knownAPI[d] = h
                }
            },
            scope: this
        });
        SYNO.API.Request({
            api: "SYNO.CMS.DS",
            version: 1,
            method: "relay",
            timeout: 30000,
            params: {
                id: b,
                timeout: 30,
                webapi: {
                    api: "SYNO.Entry.Request",
                    version: 1,
                    method: "request",
                    compound: [{
                        api: "SYNO.Core.System",
                        version: 1,
                        method: "info",
                        type: "define"
                    }, {
                        api: "SYNO.Core.System",
                        version: 1,
                        method: "info",
                        type: "session"
                    }]
                }
            },
            appOpt: f,
            cms_id: b,
            callback: this.onUpdateInst,
            scope: this
        })
    },
    updateInst: function(b, c, e) {
        var a = this.check(b),
            d = this.getInstName(b);
        if (false === this.checkInst(d, {
                appWindow: b
            }, c, e)) {
            return
        }
        a.sendWebAPI({
            api: "SYNO.API.Info",
            version: 1,
            method: "query",
            callback: function(i, g, h, f) {
                if (true !== i) {
                    this._knownAPI[d] = undefined
                } else {
                    this._knownAPI[d] = g
                }
            },
            scope: this
        });
        if (this._knownAPI.hasOwnProperty(d) && Ext.isEmpty(this._knownAPI[d])) {
            return
        }
        a.sendWebAPI({
            compound: {
                stopwhenerror: false,
                params: [{
                    api: "SYNO.Core.System",
                    version: 1,
                    method: "info",
                    params: {
                        type: "define"
                    }
                }, {
                    api: "SYNO.Core.System",
                    version: 1,
                    method: "info",
                    params: {
                        type: "session"
                    }
                }]
            },
            callback: this.onUpdateInst,
            scope: this
        })
    },
    checkUpdateResponse: function(e, c, d, a) {
        var b;
        if (Ext.isNumber(a.cms_id)) {
            b = this.getInstNameById(a.cms_id)
        } else {
            b = this.getInstName(a.appWindow)
        }
        if (!e) {
            SYNO.Debug.error("Update session and define fail");
            return false
        }
        if (b === this.local) {
            return false
        }
        if (c.result.length !== 2) {
            SYNO.Debug.error("Incorrect response:" + Ext.encode(c.result));
            return false
        }
        if (c.result[0].success === false || c.result[1].success === false) {
            delete this._session[b];
            delete this._define[b];
            return false
        }
        return true
    },
    onUpdateInst: function(d, b, c, a) {
        if (this.checkUpdateResponse(d, b, c, a)) {
            this.handleResponse(a, b.result[0].data, b.result[1].data, a.appOpt)
        } else {
            this.handleResponse({
                cms_id: 0
            }, undefined, undefined, a.appOpt)
        }
    },
    handleResponse: function(b, a, d, e) {
        var c;
        if (Ext.isNumber(b.cms_id)) {
            c = this.getInstNameById(b.cms_id)
        } else {
            c = this.getInstName(b.appWindow)
        }
        if (c !== this.local) {
            this._define[c] = Ext.apply({}, a);
            this._session[c] = Ext.apply({}, d)
        }
        if (Ext.isObject(e) && Ext.isFunction(e.callback)) {
            if (c in this._knownAPI) {
                e.callback.apply(e.scope || this, e.args)
            } else {
                e.callback.defer(1000, e.scope || this, e.args)
            }
        }
    },
    removeById: function(a) {
        var b = this.getInstNameById(a);
        if (b === this.local) {
            return
        }
        delete this._define[b];
        delete this._session[b];
        delete this._knownAPI[b]
    },
    getDefine: function(a, b, c) {
        var d = this.getInstName(a);
        if (d === this.local) {
            return _D(b, c)
        }
        if (Ext.isEmpty(this._session[d])) {
            this.updateInst(a);
            SYNO.Debug.error("Please update first");
            return
        }
        if (b in this._define[d]) {
            return this._define[d][b]
        }
        return Ext.isString(c) ? c : ""
    },
    getSession: function(a, b) {
        var c = this.getInstName(a);
        if (c === this.local) {
            return _S(b)
        }
        switch (b) {
            case "lang":
            case "isMobile":
            case "demo_mode":
            case "SynoToken":
                return _S(b);
            default:
                if (Ext.isEmpty(this._session[c])) {
                    this.updateInst(a);
                    SYNO.Debug.error("[Info]Please update first");
                    return
                } else {
                    return this._session[c][b]
                }
        }
    },
    getKnownAPI: function(a, b, d) {
        var c = this.getInstName(a);
        if (c === this.local) {
            return SYNO.API.GetKnownAPI(b, d)
        }
        if (Ext.isEmpty(this._knownAPI[c]) || Ext.isEmpty(this._knownAPI[c][b])) {
            this.updateInst(a);
            SYNO.Debug.error("[Info]Please update first");
            return
        }
        return this._knownAPI[c][b]
    }
});
SYNO.API.Info.InitInstance = function(a) {
    if (!a) {
        a = {}
    }
    if (Ext.isEmpty(a._Instance)) {
        a._Instance = new SYNO.API.Info()
    }
    return a._Instance
};
SYNO.API.Info.Instance = SYNO.API.Info.InitInstance(SYNO.API.Info.Instance);
SYNO.API.Info.GetSession = function(a, b) {
    return SYNO.API.Info.Instance.getSession(a, b)
};
SYNO.API.Info.GetDefine = function(a, b, c) {
    return SYNO.API.Info.Instance.getDefine(a, b, c)
};
SYNO.API.Info.GetKnownAPI = function(a, b, c) {
    return SYNO.API.Info.Instance.getKnownAPI(a, b, c)
};
SYNO.API.Info.Update = function(a, b, c) {
    return SYNO.API.Info.Instance.updateInst(a, b, c)
};
SYNO.API.Info.UpdateById = function(a) {
    return SYNO.API.Info.Instance.updateInstById(a)
};
SYNO.API.Info.RemoveById = function(a) {
    return SYNO.API.Info.Instance.removeById(a)
};
Ext.namespace("SYNO.API");
SYNO.API.GetErrors = function() {
    var a = {};
    a.minCustomeError = 400;
    a.common = {
        0: _T("common", "commfail"),
        100: _T("common", "error_system"),
        101: "Bad Request",
        102: "No Such API",
        103: "No Such Method",
        104: "Not Supported Version",
        105: _T("error", "error_privilege_not_enough"),
        106: _T("error", "error_timeout"),
        107: _T("login", "error_interrupt"),
        108: _T("user", "user_file_upload_fail"),
        109: _T("error", "error_error_system"),
        110: _T("error", "error_error_system"),
        111: _T("error", "error_error_system"),
        112: "Stop Handling Compound Request",
        113: "Invalid Compound Request",
        114: _T("error", "error_invalid"),
        115: _T("error", "error_invalid"),
        116: _JSLIBSTR("uicommon", "error_demo"),
        117: _T("error", "error_error_system"),
        118: _T("error", "error_error_system"),
        122: _T("error", "error_privilege_not_enough"),
        123: _T("error", "error_privilege_not_enough"),
        124: _T("error", "error_privilege_not_enough"),
        125: _T("error", "error_timeout"),
        126: _T("error", "error_privilege_not_enough"),
        127: _T("error", "error_privilege_not_enough")
    };
    a.core = {
        402: _T("share", "no_such_share"),
        403: _T("error", "error_invalid"),
        404: _T("error", "error_privilege_not_enough"),
        1101: _T("error", "error_subject"),
        1102: _T("firewall", "firewall_restore_failed"),
        1103: _T("firewall", "firewall_block_admin_client"),
        1104: _T("firewall", "firewall_rule_exceed_max_number"),
        1105: _T("firewall", "firewall_rule_disable_fail"),
        1198: _T("common", "version_not_support"),
        1201: _T("error", "error_subject"),
        1202: _T("firewall", "firewall_tc_ceil_exceed_system_upper_bound"),
        1203: _T("firewall", "firewall_tc_max_ceil_too_large"),
        1204: _T("firewall", "firewall_tc_restore_failed"),
        1301: _T("error", "error_subject"),
        1302: _T("firewall", "firewall_dos_restore_failed"),
        1402: _T("service", "service_ddns_domain_load_error"),
        1410: _T("service", "service_ddns_operation_fail"),
        1500: _T("common", "error_system"),
        1501: _T("common", "error_apply_occupied"),
        1502: _T("routerconf", "routerconf_external_ip_warning"),
        1503: _T("routerconf", "routerconf_require_gateway"),
        1510: _T("routerconf", "routerconf_update_db_failed"),
        1521: _T("routerconf", "routerconf_exceed_singel_max_port"),
        1522: _T("routerconf", "routerconf_exceed_combo_max_port"),
        1523: _T("routerconf", "routerconf_exceed_singel_range_max_port"),
        1524: _T("routerconf", "routerconf_exceed_max_rule"),
        1525: _T("routerconf", "routerconf_port_conflict"),
        1526: _T("routerconf", "routerconf_add_port_failed"),
        1527: _T("routerconf", "routerconf_apply_failed"),
        1530: _T("routerconf", "routerconf_syntax_version_error"),
        1600: _T("error", "error_error_system"),
        1601: _T("error", "error_error_system"),
        1602: _T("error", "error_error_system"),
        1701: _T("error", "error_port_conflict"),
        1702: _T("error", "error_file_exist"),
        1703: _T("error", "error_no_path"),
        1704: _T("error", "error_error_system"),
        1706: _T("error", "error_volume_ro"),
        1903: _T("error", "error_port_conflict"),
        1904: _T("error", "error_port_conflict"),
        1905: _T("ftp", "ftp_annoymous_root_share_invalid"),
        1951: _T("error", "error_port_conflict"),
        2001: _T("error", "error_error_system"),
        2002: _T("error", "error_error_system"),
        2101: _T("error", "error_error_system"),
        2102: _T("error", "error_error_system"),
        2201: _T("error", "error_error_system"),
        2202: _T("error", "error_error_system"),
        2301: _T("error", "error_invalid"),
        2303: _T("error", "error_port_conflict"),
        2331: _T("nfs", "nfs_key_wrong_format"),
        2332: _T("user", "user_file_upload_fail"),
        2371: _T("error", "error_mount_point_nfs"),
        2372: _T("error", "error_hfs_plus_mount_point_nfs"),
        2401: _T("error", "error_error_system"),
        2402: _T("error", "error_error_system"),
        2403: _T("error", "error_port_conflict"),
        2500: _T("error", "error_unknown_desc"),
        2502: _T("error", "error_invalid"),
        2503: _T("error", "error_error_system"),
        2504: _T("error", "error_error_system"),
        2505: _T("error", "error_error_system"),
        2601: _T("network", "domain_name_err"),
        2602: _T("network", "domain_dns_name_err"),
        2603: _T("network", "domain_kdc_ip_error"),
        2604: _T("network", "error_badgname"),
        2605: _T("network", "domain_unreachserver_err"),
        2606: _T("network", "domain_port_unreachable_err"),
        2607: _T("network", "domain_password_err"),
        2608: _T("network", "domain_acc_revoked_ads"),
        2609: _T("network", "domain_acc_revoked_rpc"),
        2610: _T("network", "domain_acc_err"),
        2611: _T("network", "domain_notadminuser"),
        2612: _T("network", "domain_change_passwd"),
        2613: _T("network", "domain_check_kdcip"),
        2614: _T("network", "domain_error_misc_rpc"),
        2615: _T("network", "domain_join_err"),
        2616: _T("directory_service", "warr_enable_samba"),
        2626: _T("directory_service", "warr_db_not_ready"),
        2702: _T("network", "status_connected"),
        2703: _T("network", "status_disconnected"),
        2704: _T("common", "error_occupied"),
        2705: _T("common", "error_system"),
        2706: _T("ldap_error", "ldap_invalid_credentials"),
        2707: _T("ldap_error", "ldap_operations_error"),
        2708: _T("ldap_error", "ldap_server_not_support"),
        2709: _T("domain", "domain_ldap_conflict"),
        2710: _T("ldap_error", "ldap_operations_error"),
        2712: _T("ldap_error", "ldap_no_such_object"),
        2713: _T("ldap_error", "ldap_protocol_error"),
        2714: _T("ldap_error", "ldap_invalid_dn_syntax"),
        2715: _T("ldap_error", "ldap_insufficient_access"),
        2716: _T("ldap_error", "ldap_insufficient_access"),
        2717: _T("ldap_error", "ldap_timelimit_exceeded"),
        2718: _T("ldap_error", "ldap_inappropriate_auth"),
        2719: _T("ldap_error", "ldap_smb2_enable_warning"),
        2721: _T("ldap_error", "ldap_confidentiality_required"),
        2799: _T("common", "error_system"),
        2800: _T("error", "error_unknown_desc"),
        2801: _T("error", "error_unknown_desc"),
        2900: _T("error", "error_unknown_desc"),
        2901: _T("error", "error_unknown_desc"),
        2902: _T("relayservice", "relayservice_err_network"),
        2903: _T("relayservice", "error_alias_server_internal"),
        2904: _T("relayservice", "relayservice_err_alias_in_use"),
        2905: _T("pkgmgr", "myds_error_account"),
        2906: _T("relayservice", "error_alias_used_in_your_own"),
        3000: _T("error", "error_unknown_desc"),
        3001: _T("error", "error_unknown_desc"),
        3002: _T("relayservice", "relayservice_err_resolv"),
        3003: _T("relayservice", "myds_server_internal_error"),
        3004: _T("error", "error_auth"),
        3005: _T("relayservice", "relayservice_err_alias_in_use"),
        3006: _T("relayservice", "myds_exceed_max_register_error"),
        3009: _T("error", "error_unknown_desc"),
        3010: _T("myds", "already_logged_in"),
        3013: _T("myds", "error_migrate_authen"),
        3106: _T("user", "no_such_user"),
        3107: _T("user", "error_nameused"),
        3108: _T("user", "error_nameused"),
        3109: _T("user", "error_disable_admin"),
        3110: _T("user", "error_too_much_user"),
        3111: _T("user", "homes_not_found"),
        3112: _T("common", "error_apply_occupied"),
        3113: _T("common", "error_occupied"),
        3114: _T("user", "error_nameused"),
        3115: _T("user", "user_cntrmvdefuser"),
        3116: _T("user", "user_set_fail"),
        3117: _T("user", "user_quota_set_fail"),
        3118: _T("common", "error_no_enough_space"),
        3119: _T("user", "error_home_is_moving"),
        3121: _T("common", "err_pass"),
        3191: _T("user", "user_file_open_fail"),
        3192: _T("user", "user_file_empty"),
        3193: _T("user", "user_file_not_utf8"),
        3194: _T("user", "user_upload_no_volume"),
        3202: _T("common", "error_occupied"),
        3204: _T("group", "failed_load_group"),
        3205: _T("group", "failed_load_group"),
        3206: _T("group", "error_nameused"),
        3207: _T("group", "error_nameused"),
        3208: _T("group", "error_badname"),
        3209: _T("group", "error_toomanygr"),
        3210: _T("group", "error_rmmember"),
        3221: _T("share", "error_too_many_acl_rules") + "(" + _WFT("acl_editor", "acl_rules_reach_limit_report").replace(/.*\//, "").trim().replace("_maxCount_", "200") + ")",
        3299: _T("common", "error_system"),
        3301: _T("share", "share_already_exist"),
        3302: _T("share", "share_acl_volume_not_support"),
        3303: _T("share", "error_encrypt_reserve"),
        3304: _T("share", "error_volume_not_found"),
        3305: _T("share", "error_badname"),
        3308: _T("common", "err_pass"),
        3309: _T("share", "error_toomanysh"),
        3313: _T("share", "error_volume_not_found"),
        3314: _T("share", "error_volume_read_only"),
        3319: _T("share", "error_nameused"),
        3320: _T("share", "share_space_not_enough"),
        3321: _T("share", "error_too_many_acl_rules") + "(" + _WFT("acl_editor", "acl_rules_reach_limit_report").replace(/.*\//, "").trim().replace("_maxCount_", "200") + ")",
        3322: _T("share", "mount_point_not_empty"),
        3323: _T("error", "error_mount_point_change_vol"),
        3324: _T("error", "error_mount_point_rename"),
        3326: _T("share", "error_key_file"),
        3327: _T("share", "share_conflict_on_new_volume"),
        3328: _T("share", "get_lock_failed"),
        3329: _T("share", "error_toomanysnapshot"),
        3330: _T("share", "share_snapshot_busy"),
        3332: _T("backup", "is_backing_up_restoring"),
        3334: _T("share", "error_mount_point_restore"),
        3335: _T("share", "share_cannot_move_fstype_not_support"),
        3336: _T("share", "share_cannot_move_replica_busy"),
        3337: _T("snapmgr", "snap_system_preserved"),
        3338: _T("share", "error_mounted_encrypt_restore"),
        3340: _T("snapmgr", "snap_restore_share_conf_err"),
        3341: _T("snapmgr", "err_quota_is_not_enough"),
        3400: _T("error", "error_error_system"),
        3401: _T("error", "error_error_system"),
        3402: _T("error", "error_error_system"),
        3403: _T("app_privilege", "error_no_such_user_or_group"),
        3500: _T("error", "error_invalid"),
        3501: _T("common", "error_badport"),
        3502: _T("ftp", "ftp_port_in_used"),
        3510: _T("error", "error_invalid"),
        3511: _T("app_port_alias", "err_port_dup"),
        3550: _T("volume", "volume_no_volumes"),
        3551: _T("error", "error_no_shared_folder"),
        3552: String.format(_T("volume", "volume_crashed_service_disable"), _T("common", "web_station")),
        3553: _T("volume", "volume_expanding_waiting"),
        3554: _T("error", "error_port_conflict"),
        3555: _T("common", "error_badport"),
        3603: _T("volume", "volume_share_volumeno"),
        3604: _T("error", "error_space_not_enough"),
        3605: _T("usb", "usb_printer_driver_fail"),
        3606: _T("login", "error_cantlogin"),
        3607: _T("common", "error_badip"),
        3608: _T("usb", "net_prntr_ip_exist_error"),
        3609: _T("usb", "net_prntr_ip_exist_unknown"),
        3610: _T("common", "error_demo"),
        3611: _T("usb", "net_prntr_name_exist_error"),
        3700: _T("error", "error_invalid"),
        3701: _T("status", "status_not_available"),
        3702: _T("error", "error_invalid"),
        3710: _T("status", "status_not_available"),
        3711: _T("error", "error_invalid"),
        3712: _T("cms", "fan_mode_not_supported"),
        3720: _T("status", "status_not_available"),
        3721: _T("error", "error_invalid"),
        3730: _T("status", "status_not_available"),
        3731: _T("error", "error_invalid"),
        3740: _T("status", "status_not_available"),
        3741: _T("error", "error_invalid"),
        3750: _T("status", "status_not_available"),
        3751: _T("error", "error_invalid"),
        3760: _T("status", "status_not_available"),
        3761: _T("error", "error_invalid"),
        3800: _T("error", "error_invalid"),
        3801: _T("error", "error_invalid"),
        4000: _T("error", "error_invalid"),
        4001: _T("error", "error_error_system"),
        4002: _T("dsmoption", "error_format"),
        4003: _T("dsmoption", "error_size"),
        4100: _T("error", "error_invalid"),
        4101: _T("error", "error_invalid"),
        4102: _T("app_port_alias", "err_alias_refused"),
        4103: _T("app_port_alias", "err_alias_used"),
        4104: _T("app_port_alias", "err_port_used"),
        4154: _T("app_port_alias", "err_fqdn_duplicated"),
        4156: _T("app_port_alias", "err_invalid_backend_host"),
        4300: _T("error", "error_error_system"),
        4301: _T("error", "error_error_system"),
        4302: _T("error", "error_error_system"),
        4303: _T("error", "error_invalid"),
        4304: _T("error", "error_error_system"),
        4305: _T("error", "error_error_system"),
        4306: _T("error", "error_error_system"),
        4307: _T("error", "error_error_system"),
        4308: _T("error", "error_error_system"),
        4309: _T("error", "error_invalid"),
        4310: _T("error", "error_error_system"),
        4311: _T("network", "interface_not_found"),
        4312: _T("tcpip", "tcpip_ip_used"),
        4313: _T("tcpip", "ipv6_ip_used"),
        4314: _T("tunnel", "tunnel_conn_fail"),
        4315: _T("tcpip", "ipv6_err_link_local"),
        4316: _T("network", "error_applying_network_setting"),
        4317: _T("common", "error_notmatch"),
        4319: _T("error", "error_error_system"),
        4320: _T("vpnc", "name_conflict"),
        4321: _T("service", "service_illegel_crt"),
        4322: _T("service", "service_illegel_key"),
        4323: _T("service", "service_ca_not_utf8"),
        4324: _T("service", "service_unknown_cipher"),
        4325: _T("vpnc", "l2tp_conflict"),
        4326: _T("vpnc", "vpns_conflict"),
        4327: _T("vpnc", "ovpnfile_invalid_format"),
        4340: _T("background_task", "task_processing"),
        4350: _T("tcpip", "ipv6_invalid_config"),
        4351: _T("tcpip", "ipv6_router_bad_lan_req"),
        4352: _T("tcpip", "ipv6_router_err_enable"),
        4353: _T("tcpip", "ipv6_router_err_disable"),
        4354: _T("tcpip", "ipv6_no_public_ip"),
        4370: _T("ovs", "ovs_not_support_bonding"),
        4371: _T("ovs", "ovs_not_support_vlan"),
        4372: _T("ovs", "ovs_not_support_bridge"),
        4500: _T("error", "error_error_system"),
        4501: _T("error", "error_error_system"),
        4502: _T("pkgmgr", "pkgmgr_space_not_ready"),
        4503: _T("error", "volume_creating"),
        4504: _T("pkgmgr", "error_sys_no_space"),
        4506: _T("pkgmgr", "noncancellable"),
        4520: _T("error", "error_space_not_enough"),
        4521: _T("pkgmgr", "pkgmgr_file_not_package"),
        4522: _T("pkgmgr", "broken_package"),
        4529: _T("pkgmgr", "pkgmgr_pkg_cannot_upgrade"),
        4530: _T("pkgmgr", "error_occupied"),
        4531: _T("pkgmgr", "pkgmgr_not_syno_publish"),
        4532: _T("pkgmgr", "pkgmgr_unknown_publisher"),
        4533: _T("pkgmgr", "pkgmgr_cert_expired"),
        4534: _T("pkgmgr", "pkgmgr_cert_revoked"),
        4535: _T("pkgmgr", "broken_package"),
        4540: _T("pkgmgr", "pkgmgr_file_install_failed"),
        4541: _T("pkgmgr", "upgrade_fail"),
        4542: _T("error", "error_error_system"),
        4543: _T("pkgmgr", "pkgmgr_file_not_package"),
        4544: _T("pkgmgr", "pkgmgr_pkg_install_already"),
        4545: _T("pkgmgr", "pkgmgr_pkg_not_available"),
        4548: _T("pkgmgr", "install_version_less_than_limit"),
        4549: _T("pkgmgr", "depend_cycle"),
        4570: _T("common", "error_invalid_serial"),
        4580: _T("pkgmgr", "pkgmgr_pkg_start_failed"),
        4581: _T("pkgmgr", "pkgmgr_pkg_stop_failed"),
        4590: _T("pkgmgr", "invalid_feed"),
        4591: _T("pkgmgr", "duplicate_feed"),
        4592: _T("pkgmgr", "duplicate_certificate"),
        4593: _T("pkgmgr", "duplicate_certificate_sys"),
        4594: _T("pkgmgr", "revoke_certificate"),
        4595: _T("service", "service_illegel_crt"),
        4600: _T("error", "error_error_system"),
        4601: _T("error", "error_error_system"),
        4602: _T("notification", "google_auth_failed"),
        4631: _T("error", "error_error_system"),
        4632: _T("error", "error_error_system"),
        4633: _T("error", "error_error_system"),
        4634: _T("error", "error_error_system"),
        4635: _T("error", "error_error_system"),
        4661: _T("pushservice", "error_update_ds_info"),
        4800: _T("error", "error_invalid"),
        4801: _T("error", "error_error_system"),
        4802: _T("error", "error_error_system"),
        4803: _T("error", "error_error_system"),
        4804: _T("error", "error_error_system"),
        4900: _T("error", "error_invalid"),
        4901: _T("error", "error_error_system"),
        4902: _T("user", "no_such_user"),
        4903: _T("report", "err_dest_share_not_exist"),
        4904: _T("error", "error_file_exist"),
        4905: _T("error", "error_space_not_enough"),
        5000: _T("error", "error_invalid"),
        5001: _T("error", "error_invalid"),
        5002: _T("error", "error_invalid"),
        5003: _T("error", "error_invalid"),
        5004: _T("error", "error_invalid"),
        5005: _T("syslog", "err_server_disconnected"),
        5006: _T("syslog", "service_ca_copy_failed"),
        5007: _T("syslog", "service_ca_copy_failed"),
        5008: _T("error", "error_invalid"),
        5009: _T("error", "error_port_conflict"),
        5010: _T("error", "error_invalid"),
        5011: _T("error", "error_invalid"),
        5012: _T("syslog", "err_name_conflict"),
        5100: _T("error", "error_invalid"),
        5101: _T("error", "error_invalid"),
        5102: _T("error", "error_invalid"),
        5103: _T("error", "error_invalid"),
        5104: _T("error", "error_invalid"),
        5105: _T("error", "error_invalid"),
        5106: _T("error", "error_invalid"),
        5202: _T("update", "error_apply_lock"),
        5203: _T("volume", "volume_busy_waiting"),
        5205: _T("update", "error_bad_dsm_version"),
        5206: _T("update", "update_notice"),
        5207: _T("update", "error_model"),
        5208: _T("update", "error_apply_lock"),
        5211: _T("update", "upload_err_no_space"),
        5213: _T("pkgmgr", "error_occupied"),
        5214: _T("update", "check_new_dsm_err"),
        5215: _T("error", "error_space_not_enough"),
        5216: _T("error", "error_fs_ro"),
        5217: _T("error", "error_dest_no_path"),
        5219: _T("update", "autoupdate_cancel_failed_running"),
        5220: _T("update", "autoupdate_cancel_failed_no_task"),
        5221: _T("update", "autoupdate_cancel_failed"),
        5222: _T("update", "error_verify_patch"),
        5223: _T("update", "error_updater_prehook_failed"),
        5300: _T("error", "error_invalid"),
        5301: _T("user", "no_such_user"),
        5510: _T("service", "service_illegel_crt"),
        5511: _T("service", "service_illegel_key"),
        5512: _T("service", "service_illegal_inter_crt"),
        5513: _T("service", "service_unknown_cypher"),
        5514: _T("service", "service_key_not_match"),
        5515: _T("service", "service_ca_copy_failed"),
        5516: _T("service", "service_ca_not_utf8"),
        5517: _T("certificate", "inter_and_crt_verify_error"),
        5518: _T("certificate", "not_support_dsa"),
        5519: _T("service", "service_illegal_csr"),
        5520: _T("backup", "general_backup_destination_no_response"),
        5521: _T("certificate", "err_connection"),
        5522: _T("certificate", "err_server_not_match"),
        5523: _T("certificate", "err_too_many_reg"),
        5524: _T("certificate", "err_too_many_req"),
        5525: _T("certificate", "err_mail"),
        5526: _T("s2s", "err_invalid_param_value"),
        5600: _T("error", "error_no_path"),
        5601: _T("file", "error_bad_file_content"),
        5602: _T("error", "error_error_system"),
        5603: _T("texteditor", "LoadFileFail"),
        5604: _T("texteditor", "SaveFileFail"),
        5605: _T("error", "error_privilege_not_enough"),
        5606: _T("texteditor", "CodepageConvertFail"),
        5607: _T("texteditor", "AskForceSave"),
        5608: _WFT("error", "error_encryption_long_path"),
        5609: _WFT("error", "error_long_path"),
        5610: _WFT("error", "error_quota_not_enough"),
        5611: _WFT("error", "error_space_not_enough"),
        5612: _WFT("error", "error_io"),
        5613: _WFT("error", "error_privilege_not_enough"),
        5614: _WFT("error", "error_fs_ro"),
        5615: _WFT("error", "error_file_exist"),
        5616: _WFT("error", "error_no_path"),
        5617: _WFT("error", "error_dest_no_path"),
        5618: _WFT("error", "error_testjoin"),
        5619: _WFT("error", "error_reserved_name"),
        5620: _WFT("error", "error_fat_reserved_name"),
        5621: _T("texteditor", "exceed_load_max"),
        5703: _T("time", "ntp_service_disable_warning"),
        5800: _T("error", "error_invalid"),
        5801: _T("share", "no_such_share"),
        5901: _T("error", "error_subject"),
        5902: _T("firewall", "firewall_vpnpassthrough_restore_failed"),
        5903: _T("firewall", "firewall_vpnpassthrough_specific_platform"),
        6000: _T("error", "error_error_system"),
        6001: _T("error", "error_error_system"),
        6002: _T("error", "error_error_system"),
        6003: _T("error", "error_error_system"),
        6004: _T("common", "loadsetting_fail"),
        6005: _T("error", "error_subject"),
        6006: _T("error", "error_service_start_failed"),
        6007: _T("error", "error_service_stop_failed"),
        6008: _T("error", "error_service_start_failed"),
        6009: _T("firewall", "firewall_save_failed"),
        6010: _T("common", "error_badip"),
        6011: _T("common", "error_badip"),
        6012: _T("common", "error_badip"),
        6013: _T("share", "no_such_share"),
        6014: _T("cms", "cms_no_volumes"),
        6200: _T("error", "error_error_system"),
        6201: _WFT("error", "error_acl_volume_not_support"),
        6202: _WFT("error", "error_fat_privilege"),
        6203: _WFT("error", "error_remote_privilege"),
        6204: _WFT("error", "error_fs_ro"),
        6205: _WFT("error", "error_privilege_not_enough"),
        6206: _WFT("error", "error_no_path"),
        6207: _WFT("error", "error_no_path"),
        6208: _WFT("error", "error_testjoin"),
        6209: _WFT("error", "error_privilege_not_enough"),
        6210: _WFT("acl_editor", "admin_cannot_set_acl_perm"),
        6211: _WFT("acl_editor", "error_invalid_user_or_group"),
        6212: _WFT("error", "error_acl_mp_not_support"),
        6213: _WFT("acl_editor", "quota_exceeded"),
        6703: _T("error", "error_port_conflict"),
        6704: _T("error", "error_port_conflict"),
        6705: _T("user", "no_such_user"),
        6706: _T("user", "error_nameused"),
        6708: _T("share", "error_volume_not_found"),
        6709: _T("netbackup", "err_create_service_share")
    };
    return a
};
SYNO.API.AssignErrorStr = function() {
    SYNO.API.Errors = SYNO.API.GetErrors()
};
SYNO.API.AssignErrorStr();
SYNO.API.Erros = function() {
    if (Ext.isIE8) {
        return SYNO.API.Errors
    }
    var c = {},
        b = function(d) {
            Object.defineProperty(c, d, {
                get: function() {
                    SYNO.Debug.error("SYNO.API.Erros is deprecated (typo), please use SYNO.API.Errors instead.");
                    return SYNO.API.Errors[d]
                },
                configurable: false
            })
        };
    for (var a in SYNO.API.Errors) {
        if (SYNO.API.Errors.hasOwnProperty(a)) {
            b(a)
        }
    }
    return c
}();
Ext.namespace("SYNO.SDS.EnforceOTPWizard");
SYNO.SDS.EnforceOTPWizard = Ext.extend(SYNO.SDS.Wizard.ModalWindow, {
    next_step: null,
    WIZRAD_HEIGHT: 500,
    constructor: function(b) {
        this.welcomeStep = new SYNO.SDS.EnforceOTPWizard.WelcomeStep({
            itemId: "welcome",
            nextId: "qrcode"
        });
        this.qrcodeStep = new SYNO.SDS.EnforceOTPWizard.QRcodeStep({
            itemId: "qrcode",
            nextId: "authenticate"
        });
        this.authStep = new SYNO.SDS.EnforceOTPWizard.AuthStep({
            itemId: "authenticate",
            nextId: "finish",
            isAdminGroup: b.isAdminGroup
        });
        this.finishStep = new SYNO.SDS.EnforceOTPWizard.FinishStep({
            itemId: "finish",
            isLDAP: b.isLDAP,
            nextId: null
        });
        var a = [this.welcomeStep, this.qrcodeStep, this.authStep, this.finishStep];
        SYNO.SDS.EnforceOTPWizard.superclass.constructor.call(this, Ext.apply({
            title: _T("personal_settings", "otp_wizard_title"),
            showHelp: false,
            width: 650,
            height: this.WIZRAD_HEIGHT,
            steps: a
        }, b))
    },
    onOpen: function() {
        this.setActiveStep("welcome");
        this.getButton("cancel").hide();
        SYNO.SDS.EnforceOTPWizard.superclass.onOpen.apply(this, arguments)
    },
    getEncryptedParams: function(b) {
        b = Ext.apply({
            username: this.username,
            passwd: this.passwd
        }, b);
        var a = SYNO.Encryption.EncryptParam(b);
        a.client_time = Math.floor((new Date()).getTime() / 1000);
        return a
    },
    close: function() {
        this.finishStep.form.clearInvalid();
        this.setStatusBusy({
            text: _T("common", "loading")
        });
        this.gotoDesktop()
    },
    gotoDesktop: function() {
        SYNO.SDS.initData()
    },
    markInvalid: function(a, b) {
        a.markInvalid();
        if (b) {
            this.getMsgBox().alert(this.title, b);
            this.getMsgBox().getDialog().addClass("enforce-wizard-err-message-dialog")
        }
    },
    displayError: function(a) {
        var b;
        if (a) {
            b = _T(a.section, a.key)
        } else {
            b = _T("error", "error_error_system")
        }
        this.getMsgBox().alert(this.title, b);
        this.getMsgBox().getDialog().addClass("enforce-wizard-err-message-dialog")
    },
    setNextStep: function(a, b) {
        if (0 > this.stepStack.indexOf(a)) {
            this.stepStack.push(a)
        }
        if (Ext.isString(b)) {
            this.stepStack.push(b)
        }
    }
});
SYNO.SDS.EnforceOTPWizard.WelcomeStep = Ext.extend(SYNO.SDS.Wizard.WelcomeStep, {
    constructor: function(b) {
        var a = Ext.apply({
            headline: _T("personal_settings", "otp_welcome_step_title"),
            description: _T("otp_enforcement", "welcome_step_desc"),
            disableNextInDemoMode: true,
            keys: [{
                key: [10, 13],
                scope: this,
                handler: this.getNext
            }]
        }, b);
        SYNO.SDS.EnforceOTPWizard.WelcomeStep.superclass.constructor.call(this, a)
    },
    getNext: function() {
        var b = this.owner.username;
        b = b.replace(/\\/g, "/");
        var a = this.owner.getEncryptedParams({
            action: "getQRcodePage",
            account: b + "@" + _S("hostname")
        });
        this.owner.setStatusBusy({
            text: _T("common", "saving")
        });
        this.sendWebAPI({
            api: "SYNO.API.OTP",
            version: 1,
            method: "setup",
            params: a,
            scope: this,
            callback: function(f, e, d) {
                this.owner.clearStatusBusy();
                if (!f || !e) {
                    this.owner.displayError()
                }
                var c = e;
                if (c && c.success === true) {
                    if (c.errno) {
                        this.owner.getMsgBox().alert(this.title, _T(c.errno.section, c.errno.key))
                    }
                    this.owner.secretKey = c.key;
                    this.owner.QRcodeImg = c.img;
                    this.owner.qrcodeStep.load();
                    this.owner.goNext(this.nextId)
                } else {
                    this.owner.displayError(c ? c.errno : null);
                    return
                }
            }
        });
        return false
    }
});
SYNO.SDS.EnforceOTPWizard.QRcodeStep = Ext.extend(SYNO.ux.FormPanel, {
    constructor: function(b) {
        var a = Ext.apply({
            headline: _T("personal_settings", "otp_qrcode_step_title"),
            items: [{
                xtype: "syno_displayfield",
                value: String.format(_T("personal_settings", "otp_install_app_desc"), _T("personal_settings", "otp_support_apps_link"))
            }, {
                xtype: "syno_displayfield",
                htmlEncode: false,
                value: String.format(_T("personal_settings", "otp_scan_qrcode_desc"), '(<a class="pathlink">' + _T("personal_settings", "otp_enter_manually_link") + "</a>)"),
                listeners: {
                    render: function(d) {
                        var c = d.el.first("a.pathlink");
                        if (c) {
                            this.mon(c, "click", this.launchEditDialog, this)
                        }
                    },
                    scope: this,
                    single: true,
                    buffer: 80
                }
            }, {
                html: '<img id = "qrcode_img" src="" width="120" height="120" />',
                border: false,
                style: "text-align: center;"
            }],
            keys: [{
                key: [10, 13],
                scope: this,
                handler: this.getNext
            }]
        }, b);
        SYNO.SDS.EnforceOTPWizard.QRcodeStep.superclass.constructor.call(this, a)
    },
    load: function() {
        var a = Ext.get("qrcode_img");
        a.dom.src = "data:image/png;base64," + this.owner.QRcodeImg
    },
    getNext: function() {
        this.owner.authStep.load();
        return this.nextId
    },
    launchEditDialog: function() {
        var a = new SYNO.SDS.EnforceOTPWizard.QRcodeStep.EditDialog({
            owner: this.owner
        });
        a.show()
    }
});
SYNO.SDS.EnforceOTPWizard.QRcodeStep.EditDialog = Ext.extend(SYNO.SDS.BaseWindow, {
    constructor: function(a) {
        Ext.apply(this, a || {});
        var b = {
            owner: this.owner,
            id: "edit-otp-dialog",
            width: 430,
            height: 220,
            minWidth: 430,
            minHeight: 220,
            shadow: true,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            draggable: false,
            title: _T("personal_settings", "otp_wizard_title"),
            layout: "fit",
            trackResetOnLoad: true,
            forceSelection: true,
            waitMsgTarget: true,
            border: false,
            items: this.panel = this.initPanel(),
            buttons: [{
                xtype: "syno_button",
                btnStyle: "blue",
                text: _T("common", "apply"),
                scope: this,
                handler: this.onApply
            }, {
                xtype: "syno_button",
                btnStyle: "gray",
                text: _T("common", "cancel"),
                scope: this,
                handler: this.close
            }],
            keys: [{
                key: [10, 13],
                scope: this,
                handler: this.onApply
            }]
        };
        SYNO.SDS.EnforceOTPWizard.QRcodeStep.EditDialog.superclass.constructor.call(this, b)
    },
    initPanel: function() {
        var c = this.owner.username;
        c = c.replace(/\\/g, "/");
        var b = {
            itemId: "otp_edit_panel",
            border: false,
            items: [{
                xtype: "syno_displayfield",
                value: _T("personal_settings", "otp_edit_desc")
            }, {
                xtype: "syno_textfield",
                fieldLabel: _T("personal_settings", "otp_account_name"),
                name: "account_name",
                labelWidth: 150,
                value: c + "@" + _S("hostname"),
                allowBlank: false
            }, {
                xtype: "syno_displayfield",
                labelWidth: 150,
                hideLabel: false,
                fieldLabel: _T("personal_settings", "otp_secret_key"),
                name: "edit_secret_key",
                value: this.owner.secretKey
            }],
            keys: [{
                key: [10, 13],
                scope: this,
                handler: this.getNext
            }]
        };
        var a = new Ext.form.FormPanel(b);
        return a
    },
    getForm: function() {
        return this.panel.form
    },
    onApply: function() {
        if (!this.getForm().findField("account_name").isValid()) {
            return false
        }
        var b = this.getForm().findField("account_name").getValue();
        b = b.replace(/\\/g, "/");
        var a = this.owner.getEncryptedParams({
            action: "editAccountName",
            secretKey: this.getForm().findField("edit_secret_key").getValue(),
            account: b
        });
        this.sendWebAPI({
            api: "SYNO.API.OTP",
            version: 1,
            method: "setup",
            params: a,
            scope: this,
            callback: function(f, e, d) {
                if (!f || !e) {
                    this.owner.displayError()
                }
                var c = e;
                if (c && c.success === true) {
                    this.owner.QRcodeImg = c.img;
                    this.owner.secretKey = c.key;
                    this.owner.qrcodeStep.load();
                    this.close()
                } else {
                    this.owner.displayError(c ? c.errno : null);
                    return
                }
            }
        })
    }
});
SYNO.SDS.EnforceOTPWizard.AuthStep = Ext.extend(SYNO.ux.FormPanel, {
    constructor: function(b) {
        var a = Ext.apply({
            headline: _T("personal_settings", "otp_auth_step_title"),
            items: [{
                xtype: "syno_displayfield",
                value: _T("personal_settings", "otp_auth_step_desc")
            }, {
                xtype: "syno_displayfield",
                value: ""
            }, {
                xtype: "syno_textfield",
                name: "OTP_auth",
                width: 200,
                labelWidth: 230,
                fieldLabel: _T("personal_settings", "otp_auth_field"),
                emptyText: _T("personal_settings", "otp_auth_field"),
                maxLength: 6,
                regex: new RegExp("[0-9]{6}"),
                regexText: _T("personal_settings", "otp_err_auth_code"),
                allowBlank: false
            }],
            keys: [{
                key: [10, 13],
                scope: this,
                handler: this.getNext
            }]
        }, b);
        SYNO.SDS.EnforceOTPWizard.AuthStep.superclass.constructor.call(this, a)
    },
    load: function() {
        this.getForm().findField("OTP_auth").reset()
    },
    getNext: function() {
        if (!this.getForm().findField("OTP_auth").isValid()) {
            return false
        }
        var b = this.form.findField("OTP_auth").getValue();
        var a = this.owner.getEncryptedParams({
            action: "authOTP",
            code: b
        });
        this.owner.setStatusBusy({
            text: _T("common", "saving")
        });
        this.sendWebAPI({
            api: "SYNO.API.OTP",
            version: 1,
            method: "setup",
            params: a,
            scope: this,
            callback: function(f, e, d) {
                this.owner.clearStatusBusy();
                if (!f || !e) {
                    this.owner.displayError()
                }
                var c = e;
                if (c && c.success === true) {
                    if (c.auth_ok === true) {
                        if (Ext.isEmpty(SYNO.SDS.Session)) {
                            SYNO.SDS.Session = {}
                        }
                        if (!Ext.isEmpty(c.SynoToken)) {
                            SYNO.SDS.Session.SynoToken = encodeURIComponent(c.SynoToken)
                        }
                        if (c.mail) {
                            this.owner.finishStep.setMail(c.mail)
                        }
                        this.owner.goNext(this.nextId);
                        this.owner.getButton("back").hide();
                        this.owner.getButton("next").setText(_T("common", "ok"));
                        if (!this.owner.isLDAP) {
                            this.owner.getButton("cancel").setText(_T("common", "skip"));
                            this.owner.getButton("cancel").show()
                        }
                    } else {
                        this.owner.displayError(c.errno)
                    }
                } else {
                    this.owner.displayError();
                    return
                }
            }
        });
        return false
    }
});
SYNO.SDS.EnforceOTPWizard.FinishStep = Ext.extend(SYNO.ux.FormPanel, {
    constructor: function(b) {
        var c = b.isLDAP ? _T("otp_enforcement", "finish_step_desc_ldap") : _T("otp_enforcement", "finish_step_desc");
        var a = Ext.apply({
            headline: _T("personal_settings", "otp_finish_step_title"),
            trackResetOnLoad: true,
            items: [{
                xtype: "syno_displayfield",
                htmlEncode: false,
                value: c
            }, {
                xtype: "syno_textfield",
                fieldLabel: _T("user", "user_email"),
                readOnly: b.isLDAP,
                disabled: b.isLDAP,
                name: "mail",
                maxlength: 512,
                vtype: "email",
                labelWidth: 150
            }],
            keys: [{
                key: [10, 13],
                scope: this,
                handler: this.getNext
            }]
        }, b);
        SYNO.SDS.EnforceOTPWizard.FinishStep.superclass.constructor.call(this, a);
        this.mailField = this.form.findField("mail")
    },
    setMail: function(a) {
        this.form.setValues({
            mail: a
        })
    },
    onSaveMail: function(b) {
        var a = this.owner.getEncryptedParams({
            action: "saveMail",
            mail: b
        });
        this.owner.setStatusBusy({
            text: _T("common", "loading")
        });
        this.sendWebAPI({
            api: "SYNO.API.OTP",
            version: 1,
            method: "setup",
            params: a,
            scope: this,
            callback: function(f, e, d) {
                if (!f || !e) {
                    this.owner.clearStatusBusy();
                    this.owner.displayError();
                    return false
                }
                var c = e;
                if (c && c.success === true) {
                    this.owner.gotoDesktop()
                } else {
                    this.owner.clearStatusBusy();
                    this.owner.displayError();
                    return false
                }
            }
        })
    },
    getNext: function() {
        var a = this.mailField.getValue();
        if (this.owner.isLDAP) {
            this.owner.gotoDesktop()
        } else {
            if (a === "") {
                this.owner.markInvalid(this.mailField, _T("personal_settings", "otp_err_email_required"))
            } else {
                if (!this.mailField.isValid()) {
                    this.owner.markInvalid(this.mailField, _T("common", "error_bademail"))
                } else {
                    if (!this.mailField.isDirty()) {
                        this.owner.gotoDesktop()
                    } else {
                        this.onSaveMail(a)
                    }
                }
            }
        }
        return false
    }
});
Ext.define("SYNO.SDS.CustomizeLogo", {
    extend: "Ext.Container",
    constructor: function(a) {
        Ext.apply(this, a);
        var b = {
            width: a.width,
            height: a.height,
            cls: "sds-login-cuslogo-wrapper",
            items: [{
                xtype: "box",
                id: "sds-login-cuslogo-img",
                autoEl: {
                    tag: "img",
                    draggable: false,
                    src: Ext.BLANK_IMAGE_URL
                },
                listeners: {
                    scope: this,
                    afterrender: function() {
                        this.mon(Ext.get("sds-login-cuslogo-img"), "load", this.initImg, this);
                        Ext.getDom("sds-login-cuslogo-img").src = this.logo_path
                    }
                }
            }]
        };
        SYNO.SDS.CustomizeLogo.superclass.constructor.call(this, b)
    },
    resize: function() {
        this.adjustImgPos()
    },
    getNatural: function(b) {
        var a = new Image();
        var c = b.dom;
        if (Ext.isIE8) {
            a.src = c.src;
            return {
                width: a.width,
                height: a.height
            }
        }
        if (Ext.isEmpty(c.naturalWidth)) {
            return this.getSize()
        }
        return {
            width: c.naturalWidth,
            height: c.naturalHeight
        }
    },
    initImg: function() {
        var a = Ext.fly("sds-login-cuslogo-img");
        this.imgSize = this.getNatural(a);
        this.adjustImgPos()
    },
    adjustImgPos: function() {
        if (!this.imgSize) {
            return
        }
        var c = Ext.fly("sds-login-cuslogo-img");
        var b = this.getWidth(),
            e = this.getHeight();
        var a = this.imgSize.width / b;
        var d = this.imgSize.height / e;
        if (a > 1 || d > 1) {
            if (a > d) {
                c.setSize({
                    width: b,
                    height: "auto"
                })
            } else {
                c.setSize({
                    width: "auto",
                    height: e
                })
            }
        } else {
            c.setSize({
                width: "auto",
                height: "auto"
            })
        }
        if (this.logo_pos === "left") {
            c.alignTo(this.el, "l-l")
        } else {
            if (this.logo_pos === "right") {
                c.alignTo(this.el, "r-r")
            } else {
                c.alignTo(this.el, "c-c")
            }
        }
    }
});
Ext.define("SYNO.SDS.WelcomeInfo", {
    extend: "Ext.Container",
    constructor: function(a) {
        Ext.apply(this, a);
        var b = [];
        if (this.logo_enable) {
            b.push(this.createLogo())
        }
        if (this.hasWelComeMsg()) {
            b.push(this.createWelComeMsg())
        }
        var c = {
            cls: "sds-login-welcome-info",
            items: b
        };
        this.callParent([c])
    },
    createLogo: function() {
        this.logo = new SYNO.SDS.CustomizeLogo({
            width: 304,
            height: 140,
            logo_path: this.logo_path
        });
        return this.logo
    },
    hasWelComeMsg: function() {
        var a = (this.login_welcome_title !== "");
        var b = (this.login_welcome_msg !== "");
        return (a || b)
    },
    createWelComeMsg: function() {
        var a = [];
        if (this.login_welcome_title && this.login_welcome_title !== "") {
            this.login_welcome_title = this.login_welcome_title.replace(/&nbsp;/g, " ");
            a.push(this.createTitle())
        }
        if (this.login_welcome_msg && this.login_welcome_msg !== "") {
            this.login_welcome_msg = this.login_welcome_msg.replace(/&nbsp;/g, " ");
            a.push(this.createMsg())
        }
        this.msgWrapper = new Ext.Container({
            cls: "sds-login-welcome-info-wrapper",
            items: a
        });
        return this.msgWrapper
    },
    createTitle: function() {
        this.title = new Ext.Container({
            cls: "sds-login-welcome-info-container",
            items: [{
                xtype: "box",
                autoEl: {
                    tag: "div",
                    cls: "sds-login-welcome-info-title",
                    html: this.login_welcome_title,
                    "ext:qtip": Ext.util.Format.htmlEncode(this.login_welcome_title)
                }
            }]
        });
        return this.title
    },
    createMsg: function() {
        this.msg = new Ext.Container({
            cls: "sds-login-welcome-info-container",
            items: [{
                xtype: "box",
                autoEl: {
                    tag: "div",
                    cls: "sds-login-welcome-info-msg",
                    html: this.login_welcome_msg,
                    "ext:qtip": Ext.util.Format.htmlEncode(this.login_welcome_msg)
                }
            }]
        });
        return this.msg
    },
    resize: function() {
        if (!this.msgWrapper) {
            return
        }
        var a = this.msgWrapper.getEl();
        var b = Ext.lib.Dom.getViewHeight() - a.getTop() - 20 - 26;
        a.setStyle("max-height", b + "px")
    }
});
Ext.define("SYNO.SDS.WidgetWindow", {
    extend: "SYNO.SDS.BaseWindow",
    widgetCls: "sds-widget-window",
    widgetOverHeaderCls: "sds-widget-over",
    headerTextPadding: 34,
    initialized: false,
    constructor: function(a) {
        a = a || {};
        a.shadow = false;
        a = Ext.applyIf(a, {
            constrain: true,
            boxMaxHeight: 205,
            boxMinHeight: 121,
            boxMaxWidth: 320,
            maximized: true,
            maximizable: false,
            minimizable: false,
            resizable: false
        });
        this.callParent([a])
    },
    fillPadding: Ext.emptyFn,
    initDraggable: function() {
        var a = this;
        a.dd = new Ext.Panel.DD(a, {
            ddGroup: "WidgetReorderAndShortCut",
            validateTarget: function(c, b, d) {
                return true
            },
            endDrag: function(b) {
                this.proxy.hide();
                this.panel.saveState();
                this.panel.el.setStyle({
                    visibility: "inherit"
                })
            }
        })
    },
    init: function() {
        var a = this,
            b = a.widget;
        if (a.initialized) {
            return
        }
        if (b && b.toggleButtonCls) {
            a.taskButton = SYNO.SDS.SystemTray.addButton(b.toggleButtonCls, this);
            b.taskButton = a.taskButton;
            a.setMiniWidgetTaskButton();
            a.addManagedComponent(a.taskButton)
        }
        a.initialized = true
    },
    setMiniWidgetTaskButton: function() {
        var a = this;
        if (Ext.isFunction(a.taskButton.setIcon) && Ext.isFunction(a.taskButton.setTooltip)) {
            a.taskButton.mon(a, "titlechange", function(b, c) {
                a.taskButton.setTooltip(c)
            }, a);
            a.taskButton.setIcon(a.iconURL);
            a.taskButton.setTooltip(a.title)
        }
    },
    onOpen: function(b) {
        var a = this;
        a.init();
        if (!a.minimized) {
            a.hidden = false;
            if (a.taskButton) {
                a.taskButton.hide()
            }
        } else {
            a.show();
            a.hide();
            a.el.setStyle("display", "none");
            if (a.taskButton) {
                a.taskButton.show()
            }
        }
        a.setPinStatus(a.pinned)
    },
    onRender: function(b, a) {
        var c = this;
        c.callParent(arguments);
        c.el.addClass(this.widgetCls);
        c.header[c.onlyView ? "addClass" : "addClassOnHover"](c.widgetOverHeaderCls)
    },
    initTools: function() {
        var a = this;
        if (a.addable) {
            a.addTool({
                id: "add",
                qtip: _T("widget", "add_widget_to_desktop"),
                handler: a.addWidget.createDelegate(this, [])
            })
        }
        if (a.pinable) {
            a.addTool({
                id: "pin",
                handler: a.onPin.createDelegate(this, [])
            })
        }
        a.callParent(arguments)
    },
    setAddToolDisabled: function(a) {
        var b = this;
        if (b.addable) {
            this.tools.add.setVisible(!a);
            this.tools.add[a ? "addClass" : "removeClass"]("x-tool-disabled")
        }
    },
    setPinToolToggled: function(b) {
        var a = this;
        if (a.pinable) {
            this.tools.pin[b ? "addClass" : "removeClass"]("x-tool-toggled")
        }
    },
    isAlwaysOnTop: function() {
        return this.pinned
    },
    setPinStatus: function(a) {
        this[a === true ? "pin" : "unpin"]()
    },
    onPin: function() {
        var a = this;
        a[a.pinned === true ? "unpin" : "pin"]()
    },
    pin: function() {
        this.setPinned(true)
    },
    unpin: function() {
        this.setPinned(false)
    },
    setPinned: function(a) {
        var b = this;
        b.pinned = a;
        b.setPinToolToggled(a);
        b.manager.orderWindows()
    },
    addWidget: function() {
        var a = this;
        a.fireEvent("addWidget", [a])
    },
    createGhost: function(a, c, b) {
        a += " " + this.widgetCls;
        return this.callParent([a, c, b])
    },
    setIcon: function(d) {
        var b = this,
            c = b.widget,
            a = c.widgetParams;
        b.callParent(arguments);
        b.iconURL = d;
        if (b.taskButton && b.taskButton.setIcon) {
            b.taskButton.setIcon(d)
        }
        b.icon = b.header.createChild({
            cls: "icon-click"
        });
        b.mon(b.icon, "click", function(h, g) {
            SYNO.SDS.DeskTopManager.showDesktop();
            if (Ext.isFunction(c.onClickTitle)) {
                c.onClickTitle()
            } else {
                var f = a.launchParam ? Ext.decode(a.launchParam) : undefined;
                SYNO.SDS.AppLaunch(a.appInstance, f)
            }
        }, b)
    },
    onMinimize: function() {
        var a = this;
        if (a.minimizable && a.taskButton) {
            a.taskButton.show();
            a.el.setVisibilityMode(Ext.Element.DISPLAY);
            a.hide((Ext.isIE9m && !Ext.isIE9) ? undefined : a.taskButton.el)
        } else {
            a.close()
        }
        a.callParent(arguments)
    },
    maximize: function() {
        if (!this.maximized) {
            this.expand(false);
            if (this.maximizable) {
                this.tools.maximize.hide();
                this.tools.restore.show()
            }
            this.maximized = true;
            if (this.collapsible) {
                this.tools.toggle.hide()
            }
            this.el.addClass("x-window-maximized");
            this.container.addClass("x-window-maximized-ct");
            this.fitContainer();
            this.fireEvent("maximize", this)
        }
        return this
    },
    fitContainer: function() {
        this.setLargeSize()
    },
    setLargeSize: function() {
        var a = this;
        a.getEl().removeClass("sds-widget-window-medium");
        a.setSize(320, 205);
        if (!a.hidden) {
            a.doExpand()
        }
        a.mediumSize = false
    },
    afterRender: function() {
        var a = this;
        a.callParent(arguments);
        if (!a.maximized) {
            a.setMediumSize()
        }
    },
    setMediumSize: function() {
        var a = this;
        a.doCollapse();
        a.getEl().addClass("sds-widget-window-medium");
        a.setSize(320, 121);
        a.mediumSize = true
    },
    doCollapse: function() {
        var a = this,
            b = a.widget;
        if (b && b.doCollapse) {
            b.doCollapse()
        }
    },
    doExpand: function() {
        var a = this,
            b = a.widget;
        if (b && b.doCollapse) {
            b.doExpand()
        }
    },
    restore: function() {
        if (this.maximized) {
            var a = this.tools;
            this.el.removeClass("x-window-maximized");
            if (a.restore) {
                a.restore.hide()
            }
            if (a.maximize) {
                a.maximize.show()
            }
            this.maximized = false;
            if (this.dd) {
                this.dd.unlock()
            }
            if (this.collapsible && a.toggle) {
                a.toggle.show()
            }
            this.container.removeClass("x-window-maximized-ct");
            this.setMediumSize();
            this.doConstrain();
            this.fireEvent("restore", this)
        }
        return this
    },
    getSizeAndPosition: function() {
        var a = this,
            b = {};
        if (a.maximized || a.hidden || a.mediumSize) {
            if (a.draggable && a.restorePos) {
                b.x = a.restorePos[0];
                b.y = a.restorePos[1];
                b.width = a.getWidth();
                b.height = a.getHeight()
            } else {
                b.x = a.x;
                b.y = a.y
            }
        }
        return b
    },
    getStateParam: function() {
        var a = this,
            b = {};
        b.widgetClassName = a.widgetClassName;
        if (a.maximized || a.hidden || a.mediumSize || a.pinned) {
            b.maximized = a.maximized;
            b.minimized = a.hidden;
            b.mediumSize = a.mediumSize;
            b.pinned = a.pinned
        }
        Ext.apply(b, this.getSizeAndPosition());
        return b
    },
    destroy: function() {
        var a = this;
        Ext.destroy(a.taskButton);
        a.callParent(arguments)
    },
    onActivate: Ext.emptyFn,
    onDeactivate: Ext.emptyFn
});
Ext.namespace("SYNO.SDS._WindowMgr");
SYNO.SDS._WindowMgr = Ext.extend(Ext.util.Observable, {
    zseed: 9000,
    list: null,
    accessList: null,
    minimizedWin: null,
    front: null,
    offsetX: 10,
    offsetY: 10,
    exposeTransformDelayTime: 900,
    exposeRestoreDelayTime: 300,
    exposeIconHeight: 38,
    exposeIconShift: 38,
    constructor: function() {
        this.list = {};
        this.accessList = [];
        this.minimizedWin = [];
        SYNO.SDS._WindowMgr.superclass.constructor.apply(this, arguments);
        Ext.EventManager.onWindowResize(this.onWindowResize, this)
    },
    onWindowResize: function() {
        if (SYNO.SDS.WindowMgr.allHided) {
            SYNO.SDS.WindowMgr.toggleAllWin()
        }
        if (this.exposeMask) {
            this.exposeWindow()
        }
    },
    sortWindows: function(b, a) {
        var e = b.getTopWin ? b.getTopWin() : b,
            c = a.getTopWin ? a.getTopWin() : a,
            j = b.isModalized && b.isModalized() ? 1 : 0,
            i = a.isModalized && a.isModalized() ? 1 : 0,
            f = b.isAlwaysOnTop && b.isAlwaysOnTop() ? 1 : 0,
            d = a.isAlwaysOnTop && a.isAlwaysOnTop() ? 1 : 0,
            h = b.isAlwaysOnBottom && b.isAlwaysOnBottom() ? 1 : 0,
            g = a.isAlwaysOnBottom && a.isAlwaysOnBottom() ? 1 : 0;
        if (h !== g) {
            return g ? 1 : -1
        }
        if (f !== d) {
            return d ? -1 : 1
        }
        if (e !== c) {
            return (e.getGroupWinAccessTime() < c.getGroupWinAccessTime()) ? -1 : 1
        }
        if (j && b.hasOwnerWin(a)) {
            return 1
        }
        if (i && a.hasOwnerWin(b)) {
            return -1
        }
        if (b.sinkable && b.hasOwnerWin(a)) {
            return (b._lastClick < a._lastClick) ? -1 : 1
        }
        if (a.sinkable && a.hasOwnerWin(b)) {
            return (b._lastClick < a._lastClick) ? 1 : -1
        }
        return (!b._lastAccess || b._lastAccess < a._lastAccess) ? -1 : 1
    },
    orderWindows: function() {
        var d = this.accessList,
            b = d.length;
        if (b > 0) {
            d.sort(this.sortWindows);
            var c = d[0].manager.zseed;
            for (var f = 0; f < b; f++) {
                var g = d[f];
                if (g && !g.hidden) {
                    g.setZIndex(c + (f * 10))
                }
            }
        }
        var e = this.activateLast();
        SYNO.SDS.StatusNotifier.fireEvent("allwinordered", this.accessList, e)
    },
    setActiveWin: function(a) {
        if (a === this.front) {
            return
        }
        if (this.front) {
            this.front.setActive(false)
        }
        this.front = a;
        if (a) {
            Ext.each(a.modalWin || [], function(b) {
                if (b && b.hideForMinimize) {
                    delete b.hideForMinimize;
                    b.show()
                }
            });
            Ext.each(a.siblingWin || [], function(b) {
                if (b && b.hideForMinimize) {
                    delete b.hideForMinimize;
                    b.show()
                }
            });
            this.bringToFront(a);
            a.setActive(true)
        }
    },
    activateLast: function() {
        var b;
        for (var a = this.accessList.length - 1; a >= 0; --a) {
            b = this.accessList[a];
            if (!b.hidden) {
                if (b.isSkipActive && b.isSkipActive()) {
                    continue
                }
                this.setActiveWin(this.accessList[a]);
                return this.accessList[a]
            }
        }
        this.setActiveWin(null)
    },
    register: function(a) {
        if (a.manager) {
            a.manager.unregister(a)
        }
        a.manager = this;
        this.list[a.id] = a;
        this.accessList.push(a);
        a.on("hide", this.activateLast, this);
        if (!a.fromRestore && (!a.isModalized || !a.isModalized())) {
            this.cascadeOverlap(a)
        }
    },
    unregister: function(a) {
        delete a.manager;
        delete this.list[a.id];
        a.un("hide", this.activateLast, this);
        this.accessList.remove(a);
        this.minimizedWin.remove(a)
    },
    get: function(a) {
        return typeof a == "object" ? a : this.list[a]
    },
    bringToFront: function(a) {
        a = this.get(a);
        a._lastClick = new Date().getTime();
        if (a === this.front) {
            SYNO.SDS.StatusNotifier.fireEvent("allwinordered", this.accessList, a);
            return false
        }
        do {
            a._lastAccess = new Date().getTime();
            if (a.isModalized && !a.isModalized()) {
                break
            }
            a = a.owner
        } while (a);
        this.orderWindows();
        return true
    },
    sendToBack: function(a) {
        a = this.get(a);
        a._lastAccess = -(new Date().getTime());
        this.orderWindows();
        return a
    },
    hideAll: function() {
        for (var a in this.list) {
            if (this.list[a] && typeof this.list[a] != "function" && this.list[a].isVisible()) {
                this.list[a].hide()
            }
        }
    },
    getActive: function() {
        return this.front
    },
    getActiveAppWindow: function() {
        var a = this.getActive();
        if ((a instanceof SYNO.SDS.AppWindow)) {
            return a
        }
        while (a && !a.appInstance) {
            a = a.owner
        }
        return a
    },
    getBy: function(c, b) {
        var d = [];
        for (var a = this.accessList.length - 1; a >= 0; --a) {
            var e = this.accessList[a];
            if (c.call(b || e, e) !== false) {
                d.push(e)
            }
        }
        return d
    },
    each: function(b, a) {
        for (var c in this.list) {
            if (this.list[c] && typeof this.list[c] != "function" && b.call(a || this.list[c], this.list[c]) === false) {
                return
            }
        }
    },
    cascadeOverlap: function(b) {
        var c = b.container.getSize();
        var a = {
            width: this.offsetX + b.getWidth(),
            height: this.offsetY + b.getHeight()
        };
        if (a.width > c.width && a.height > c.height) {
            this.offsetX = this.offsetY = 10
        } else {
            if (a.width > c.width) {
                if (10 == this.offsetX) {
                    this.offsetY = 10
                }
                this.offsetX = 10
            } else {
                if (a.height > c.height) {
                    this.offsetX += 30;
                    this.offsetY = 10
                }
            }
        }
        b.setPosition(this.offsetX, this.offsetY);
        this.offsetX += 30;
        this.offsetY += 30
    },
    toggleAllWin: function(a) {
        this.showAllButton = this.showAllButton || a;
        this.toggleAllWinMinimize()
    },
    setShowAllButtonDisabled: function(a) {
        if (this.showAllButton) {
            this.showAllButton.setDisabled(a)
        }
    },
    toggleAllWinMinimize: function() {
        this.setShowAllButtonDisabled(true);
        var a = [],
            b = 0,
            c = function() {
                if (--b > 0) {
                    return
                }
                var d = new Date().getTime();
                Ext.each(this.minimizedWin, function(f, e) {
                    f._lastAccess = d + e
                });
                this.orderWindows();
                this.setShowAllButtonDisabled(false)
            };
        Ext.each(this.accessList, function(d) {
            if (d.isVisible()) {
                if (d.toggleMinimizable === false) {
                    d.close()
                } else {
                    a.push(d)
                }
            }
        }, this);
        if (a.length) {
            Ext.invoke(a, "minimize");
            this.minimizedWin = a;
            this.setShowAllButtonDisabled(false)
        } else {
            if (this.minimizedWin.length) {
                Ext.each(this.minimizedWin, function(d) {
                    b++;
                    d.show(undefined, c, this)
                }, this)
            } else {
                this.setShowAllButtonDisabled(false)
            }
        }
    },
    restoreWin: function(a) {
        var b = function() {
            this.allToggleing--;
            if (this.allToggleing <= 0) {
                this.allToggleing = 0;
                SYNO.SDS.StatusNotifier.fireEvent("allwinrestored")
            }
        };
        if (!a.el.origXY) {
            return
        }
        if (Ext.isIE) {
            a.el.setXY([a.el.origXY[0], a.el.origXY[1]]);
            delete a.el.origXY;
            this.allToggleing++;
            b.defer(50, this)
        } else {
            this.allToggleing++;
            a.el.shift({
                x: a.el.origXY[0],
                y: a.el.origXY[1],
                easing: "easeOutStrong",
                duration: this.animDuration,
                scope: this,
                callback: function() {
                    if (!a.el.origShadowDisabled) {
                        a.el.enableShadow(true)
                    }
                    a.unmask();
                    delete a.el.origXY;
                    b.apply(this)
                }
            })
        }
        if (a.childWinMgr) {
            a.childWinMgr.each(this.restoreWin, this)
        }
    },
    exposeWindow: function() {
        if (!SYNO.SDS.UIFeatures.test("exposeWindow")) {
            return
        }
        if (this.exposeMask) {
            this.restoreTransform();
            return
        }
        SYNO.SDS.DeskTopManager.showDesktop();
        if (this.isRestoreTransform) {
            return
        }
        if (SYNO.SDS.WindowMgr.allHided) {
            SYNO.SDS.WindowMgr.toggleAllWin();
            SYNO.SDS.StatusNotifier.on("allwinrestored", this.exposeWindow, this, {
                single: true
            });
            return
        }
        this.shownAppWins = [];
        var d = SYNO.SDS.TaskButtons.getAllAppWins();
        if (d.length === 0) {
            return
        }
        Ext.each(d, function(e) {
            if (!e.isVisible()) {
                if (this.isSkipExposeAppWindow(e)) {
                    return true
                }
                e.show(false);
                this.shownAppWins.push(e)
            }
        }, this);
        this.hiddenNonAppWins = [];
        Ext.each(this.accessList, function(e) {
            if (e.isVisible() && !e.taskButton) {
                e.hide(false);
                this.hiddenNonAppWins.push(e)
            }
        }, this);
        var c = this.calWindowPosition(d);
        var a = c.xyValues;
        this.exposeMask = Ext.getBody().createChild({
            tag: "div",
            cls: "sds-expose-mask"
        });
        this.exposeMask.on("click", this.restoreTransform, this);
        var b = 0;
        Ext.each(d, function(e) {
            if (e.isVisible()) {
                e.el._origPos = {
                    x: e.el.getLeft(true),
                    y: e.el.getTop(true)
                };
                e.el._toWin = a[b];
                this.transformWindow(e, c.noWin);
                b++
            }
        }, this);
        this.exposeMask.setStyle({
            opacity: "0.6",
            "z-index": 1000
        });
        SYNO.SDS.StatusNotifier.fireEvent("allwinexpose")
    },
    transformWindow: function(e, a) {
        if (!e) {
            return false
        }
        var h = e.el;
        h.disableShadow();
        var g = h._toWin;
        if (a === true) {
            h.addClass("sds-expose-win-hidden")
        } else {
            var b = h.getSize();
            var c = g.w / b.width;
            if ((b.height * c) > g.h) {
                c = g.h / b.height
            }
            c = Math.min(c, 1).toFixed(2);
            var f = g.x - h._origPos.x;
            var d = g.y - h._origPos.y;
            h.addClass("sds-expose-win-transform");
            h.setStyle("-webkit-transform", String.format("translate3d({1}px, {2}px, 0) scale3d({0}, {0}, 1)", c, f, d));
            h.setStyle("-moz-transform", String.format("translate({1}px, {2}px) scale({0})", c, f, d));
            h.setStyle("-o-transform", String.format("translate({1}px, {2}px) scale({0})", c, f, d));
            h.setStyle("transform", String.format("translate({1}px, {2}px) scale({0})", c, f, d))
        }
        e._deferTaskId = this.afterTransformWindow.defer((a === true) ? 0 : this.exposeTransformDelayTime, this, [e, a]);
        return e
    },
    afterTransformWindow: function(d, b) {
        if (!d) {
            return false
        }
        var f = d.el;
        var e = f._toWin;
        if (Ext.isEmpty(f.dom)) {
            return false
        }
        f._exposeMask = f.createChild({
            tag: "div",
            cls: "sds-expose-win-mask"
        });
        var c = f._exposeMask;
        d.mon(c, "mousedown", function(g) {
            g.stopEvent()
        }, this);
        d.mon(c, "click", this.onWinMaskClick, this, {
            win: d
        });
        d.mon(c, "mouseenter", function(h) {
            var g = h.getTarget();
            Ext.fly(g).addClass("sds-expose-win-over")
        }, this);
        d.mon(c, "mouseleave", function(h) {
            var g = h.getTarget();
            Ext.fly(g).removeClass("sds-expose-win-over")
        }, this);
        f.iconBadge = new SYNO.SDS.Utils.IconBadge();
        if (d.jsConfig && d.getTitle() && d.jsConfig.icon) {
            var a = d.jsConfig.jsBaseURL + "/" + (d.jsConfig.icon || d.jsConfig.icon_16);
            f.iconBadge.setIconText(SYNO.SDS.UIFeatures.IconSizeManager.getIconPath(a, "Header"), SYNO.SDS.Utils.GetLocalizedString(d.getTitle(), d.jsConfig.jsID))
        } else {
            f.iconBadge.setIconText("", d.title || "")
        }
        f.iconBadge.setXY(e.x, e.y - this.exposeIconHeight + this.exposeIconShift);
        d.mon(f.iconBadge.el, "click", this.onWinMaskClick, this, {
            win: d
        })
    },
    onWinMaskClick: function(a, d, c) {
        this.restoreTransform();
        (function b() {
            c.win.show()
        }).defer(this.exposeRestoreDelayTime, this);
        a.stopEvent();
        return false
    },
    restoreTransform: function() {
        if (this.isRestoreTransform) {
            return
        }
        this.isRestoreTransform = true;
        if (this.exposeMask) {
            this.exposeMask.setStyle("opacity", "0")
        }
        Ext.each(this.accessList, function(a) {
            var c = a.el;
            if (a._deferTaskId) {
                window.clearTimeout(a._deferTaskId);
                a._deferTask = null
            }
            if (!c._origPos) {
                return
            }
            if (c.iconBadge) {
                c.iconBadge.el.hide();
                c.iconBadge.el.remove();
                c.iconBadge = null
            }
            if (c._exposeMask) {
                c._exposeMask.remove();
                delete c._exposeMask;
                c._exposeMask = null
            }
            if (c.hasClass("sds-expose-win-hidden")) {
                c.removeClass("sds-expose-win-hidden")
            } else {
                c.addClass("sds-expose-win-transform-restore");
                c.setStyle("-webkit-transform", "");
                c.setStyle("-moz-transform", "");
                c.setStyle("-o-transform", "");
                c.setStyle("transform", "")
            }
            var b = function() {
                c.removeClass("sds-expose-win-transform");
                c.removeClass("sds-expose-win-transform-restore");
                c.enableShadow(true)
            };
            b.defer(this.exposeRestoreDelayTime, this)
        }, this);
        Ext.each(this.hiddenNonAppWins, function(a) {
            if (!a.isSkipUnexpose || !a.isSkipUnexpose()) {
                a.show(false)
            }
        }, this);
        Ext.each(this.shownAppWins, function(a) {
            a.hide(false);
            a.minimize()
        }, this);
        (function() {
            if (this.exposeMask) {
                this.exposeMask.un("click", this.restoreTransform, this);
                this.exposeMask.remove();
                this.exposeMask = null
            }
            SYNO.SDS.StatusNotifier.fireEvent("allwinunexpose");
            this.isRestoreTransform = false
        }).defer(this.exposeRestoreDelayTime, this)
    },
    calWindowPosition: function(k) {
        var g = 0;
        Ext.each(k, function(h) {
            if (h.isVisible()) {
                g++
            }
        });
        var e = SYNO.SDS.Desktop.getEl().getSize();
        var q = e.width;
        var f = e.height;
        var a = 0;
        var l = 0;
        var p = 50;
        var n = this.exposeIconHeight;
        var s = 1;
        if (g < 3) {
            a = (g === 1) ? q - 2 * p : (q - 3 * p) / 2;
            l = f - 2 * p - n
        } else {
            s = Math.ceil(g / 3);
            a = (q - 4 * p) / 3;
            l = (f - (s + 1) * p - s * n) / s
        }
        a = Math.round(a);
        l = Math.round(l);
        var j = {};
        var b = [];
        for (var d = 0; d < g; ++d) {
            var c = (d % 3) + 1;
            var r = Math.max(Math.ceil((d + 1) / 3), 1);
            var o = 0;
            var m = 0;
            if (g < 3) {
                m = p + n
            } else {
                m = r * (p + n) + (r - 1) * l
            }
            o = (c - 1) * a + c * p;
            b[d] = {
                x: o,
                y: m,
                w: a,
                h: l
            }
        }
        j.xyValues = b;
        if (a < 80 || l < 80 || g > 9) {
            j.noWin = true
        }
        return j
    },
    isSkipExposeAppWindow: function(a) {
        if (a.isSkipExpose && true === a.isSkipExpose()) {
            return true
        }
        if (SYNO.SDS.AudioStation && SYNO.SDS.AudioStation.MainWindow && (a instanceof SYNO.SDS.AudioStation.MainWindow)) {
            if (a.gIsOnMiniPlayerMode === true) {
                return true
            }
        }
        return false
    }
});
Ext.define("SYNO.ux.StorageComboBox", {
    extend: "SYNO.ux.ComboBox",
    constructor: function(a) {
        var b, c;
        this.displayField = a.displayField || "display";
        this.descriptionField = a.descriptionField || "description";
        c = 'ext:qtip="{' + this.descriptionField + ':htmlEncode}"';
        b = {
            tpl: new Ext.XTemplate('<tpl for=".">', "<div " + c + ' class="x-combo-list-item" role="option" aria-label="{' + this.displayField + '}" id="{[Ext.id()]}" style="height: 52px">', "<div " + c + ' class="sds-combo-list-item-name">{' + this.displayField + "}</div>", "<div " + c + ' class="sds-combo-list-item-description">{' + this.descriptionField + "}</div>", "</div>", "</tpl>")
        };
        SYNO.ux.StorageComboBox.superclass.constructor.call(this, Ext.apply(b, a))
    }
});
Ext.reg("syno_storage_combobox", SYNO.ux.StorageComboBox);
Ext.define("SYNO.SDS.AboutWindow", {
    extend: "SYNO.SDS.ModalWindow",
    isBeta: false,
    constructor: function(b) {
        var a, c, d, e, f;
        if (!b || !b.owner) {
            throw "No Owner!"
        }
        a = b.owner;
        c = a.appInstance.jsConfig;
        f = b.owner.isBeta || this.isBeta;
        if (f) {
            e = String.format('<span class="pkg-name" style="color: {0}">{1}</span>', b.pkgColor, SYNO.SDS.Utils.GetLocalizedString(c.title, c.jsID)) + '<span class="beta-icon"></span>'
        } else {
            e = String.format('<span class="pkg-name" style="color: {0}">{1}</span>', b.pkgColor, SYNO.SDS.Utils.GetLocalizedString(c.title, c.jsID))
        }
        d = {
            cls: "about-window",
            layout: "border",
            closable: true,
            resizable: false,
            draggable: false,
            width: 450,
            height: 190,
            header: false,
            useStatusBar: false,
            closeAction: "hide",
            items: [{
                xtype: "box",
                region: "west",
                width: 144,
                cls: "about-west",
                html: String.format('<img alt="" src="{0}" width="96" height="96">', c.jsBaseURL + "/" + String.format(c.icon, 256, SYNO.SDS.UIFeatures.test("isRetina") ? "2x" : "1x"))
            }, {
                xtype: "container",
                region: "center",
                items: [{
                    xtype: "box",
                    cls: "about-syno",
                    html: Ext.isEmpty(b.aboutHeader) ? "Synology" : b.aboutHeader
                }, {
                    xtype: "box",
                    cls: "about-pkgname",
                    html: e
                }, {
                    xtype: "box",
                    cls: "about-version",
                    html: String.format("<b>{0}: </b>{1}", _T("nfs", "nfs_key_version"), c.version)
                }, {
                    xtype: "box",
                    cls: "about-ip",
                    html: String.format("<b>{0}: </b>{1}", _T("common", "integraos"), _S("majorversion") + "." + _S("minorversion") + "-" + _S("version"))
                }]
            }],
            bbar: [{
                xtype: "box",
                cls: "about-copyright",
                width: 402,
                html: String.format(_T("copyright", "copyright"), new Date().getUTCFullYear())
            }]
        };
        Ext.apply(d, b);
        this.callParent([d])
    }
});
Ext.namespace("SYNO.SDS.Utils");
(function() {
    var h = "width: auto;";
    var g = "display: inline;";
    var e = "text-align: left;";
    var d = "overflow: hidden;";
    var b = d + g + e;
    var a = h + "margin-right: 5px;" + g + e;
    var i = b + "width: 0px; visibility: hidden;";
    var c = function(j, k) {
        if (undefined === k) {
            return String.format("margin-left: {0}px;", j)
        } else {
            return String.format("width: {0}px; margin-left: {1}px", k - j, j)
        }
    };
    var f = 167;
    Ext.apply(SYNO.SDS.Utils, {
        labelStyleL0: b + c(0, f),
        labelStyleL1: b + c(Ext.isIE ? 19 : 17, f),
        labelStyleL2: b + c(Ext.isIE ? 36 : 34, f),
        labelStyleL0Auto: a,
        labelStyleL1Auto: a + c(Ext.isIE ? 19 : 17),
        labelStyleL2Auto: a + c(Ext.isIE ? 36 : 34),
        labelStyleL0Hidden: i + c(0),
        labelStyleL1Hidden: i + c(Ext.isIE ? 16 : 14)
    })
})();
SYNO.SDS.Utils.FieldFind = function(b, a) {
    var c = b.findField(a);
    if (c === null) {
        c = Ext.getCmp(a)
    }
    return c
};
SYNO.SDS.Utils.DescribeGroup = function(a, d) {
    var c = function(e, g) {
            var f = e.getAriaEl().dom.getAttribute("aria-describedby") || "";
            f.replace(g.getAriaEl().id, "");
            e.getAriaEl().setARIA({
                describedby: f + " " + g.getAriaEl().id
            });
            g.tabIndex = -1;
            if (g instanceof SYNO.ux.DisplayField) {
                g.customTabIdx = -1
            }
            g.getAriaEl().set({
                tabIndex: -1
            })
        },
        b = function(e, f) {
            if (f.rendered) {
                c(e, f)
            } else {
                e.mon(f, "afterrender", c.createDelegate(e, [e, f]))
            }
        };
    if (Ext.isArray(d)) {
        Ext.each(d, function(e) {
            SYNO.SDS.Utils.DescribeGroup(a, e)
        });
        return
    } else {
        if (a.rendered) {
            b(a, d)
        } else {
            a.mon(a, "afterrender", b.createDelegate(a, [a, d]))
        }
    }
};
SYNO.SDS.Utils.EnableRadioGroup = Ext.extend(Object, {
    constructor: function(e, d, a) {
        this.form = e;
        this.members = a;
        var g = SYNO.SDS.Utils.getRadioGroup(e, d);
        for (var c = 0; c < g.length; c++) {
            var b = g[c];
            var f = b.el.dom.value;
            if (f in a) {
                b.mon(b, "check", this.onRadioCheck, this);
                b.mon(b, "enable", this.onRadioEnable, this, {
                    delay: 50
                });
                b.mon(b, "disable", this.onRadioEnable, this, {
                    delay: 50
                })
            }
        }
    },
    onRadioEnable: function(c) {
        var e = c.getRawValue();
        var a = this.members[e];
        var d = c.getValue();
        var b = d && (!c.disabled);
        Ext.each(a, function(g) {
            var h = SYNO.SDS.Utils.FieldFind(this.form, g);
            h.setDisabled(!b);
            if (Ext.isFunction(h.clearInvalid)) {
                h.clearInvalid()
            }
        }, this)
    },
    onRadioCheck: function(b, c) {
        var d = b.getRawValue();
        var a = this.members[d];
        Ext.each(a, function(e) {
            var g = SYNO.SDS.Utils.FieldFind(this.form, e);
            g.setDisabled(!c);
            if (Ext.isFunction(g.clearInvalid)) {
                g.clearInvalid()
            }
        }, this)
    }
});
SYNO.SDS.Utils.EnableCheckGroup = Ext.extend(Object, {
    constructor: function(c, b, f, e, a) {
        var d = SYNO.SDS.Utils.FieldFind(c, b);
        e = typeof(e) != "undefined" ? e : [];
        a = Ext.isDefined(a) ? a : {};
        this.enable_fields = f;
        this.disable_fields = e;
        this.config = a;
        this.form = c;
        d.mon(d, "check", this.checkHandler, this);
        d.mon(d, "enable", this.enableHandler, this, {
            delay: 50
        });
        d.mon(d, "disable", this.enableHandler, this, {
            delay: 50
        });
        this.checkHandler(d, d.getValue())
    },
    setFieldStatus: function(d, g, c, a) {
        var f, e, b;
        if (g.inputType == "radio") {
            f = SYNO.SDS.Utils.getRadioGroup(d, g.getName());
            for (b = 0; b < f.length; b++) {
                if (a) {
                    e = c ? f[b].disable() : f[b].enable()
                } else {
                    e = c ? f[b].enable() : f[b].disable()
                }
                if (Ext.isFunction(f[b].clearInvalid)) {
                    f[b].clearInvalid()
                }
            }
        } else {
            if (a) {
                e = c ? g.disable() : g.enable()
            } else {
                e = c ? g.enable() : g.disable()
            }
            if (Ext.isFunction(g.clearInvalid)) {
                g.clearInvalid()
            }
        }
    },
    enableField: function(b, c, a) {
        this.setFieldStatus(b, c, a, false)
    },
    IsNeedDisableGroup: function(a) {
        if (true === this.config.disable_group && true === a) {
            return true
        }
        return false
    },
    checkHandler: function(c, b) {
        var a, d;
        var e = this.IsNeedDisableGroup(c.disabled);
        for (a = 0; a < this.enable_fields.length; a++) {
            d = SYNO.SDS.Utils.FieldFind(this.form, this.enable_fields[a]);
            if (e) {
                this.enableField(this.form, d, false)
            } else {
                this.setFieldStatus(this.form, d, b, false)
            }
        }
        for (a = 0; a < this.disable_fields.length; a++) {
            d = SYNO.SDS.Utils.FieldFind(this.form, this.disable_fields[a]);
            if (e) {
                this.enableField(this.form, d, false)
            } else {
                this.setFieldStatus(this.form, d, b, true)
            }
        }
    },
    enableHandler: function(c) {
        var b, d;
        var a = (c.disabled === false && c.getRealValue() === true);
        var e = this.IsNeedDisableGroup(c.disabled);
        for (b = 0; b < this.enable_fields.length; b++) {
            d = SYNO.SDS.Utils.FieldFind(this.form, this.enable_fields[b]);
            if (e) {
                this.enableField(this.form, d, false)
            } else {
                this.setFieldStatus(this.form, d, a, false)
            }
        }
        for (b = 0; b < this.disable_fields.length; b++) {
            d = SYNO.SDS.Utils.FieldFind(this.form, this.disable_fields[b]);
            if (e) {
                this.enableField(this.form, d, false)
            } else {
                this.setFieldStatus(this.form, d, a, true)
            }
        }
    }
});
SYNO.SDS.Utils.DisplayField = function(c, a, g) {
    var f = c.findField(a);
    if (f && f.getEl()) {
        var b = f.getEl().findParent("div[class~=x-form-item]", c.el, true);
        if (b) {
            var e = b.isDisplayed();
            b.setDisplayed(g);
            if (e === false && g === true && f.msgTarget == "under") {
                var d = f.getEl().findParent(".x-form-element", 5, true);
                var h = d.child("div[class~=x-form-invalid-msg]");
                if (h) {
                    h.setWidth(d.getWidth(true) - 20)
                }
            }
        }
    }
};
SYNO.SDS.Utils.getRadioGroup = function(c, b) {
    var e = [];
    var d = c.el.query("input[name=" + b + "]");
    for (var a = 0; a < d.length; a++) {
        e.push(Ext.getCmp(d[a].id))
    }
    return e
};
SYNO.SDS.Utils.SymbolMap = {
    "+": "plus",
    "<": "smaller",
    ">": "greater",
    ",": "comma",
    ":": "colon",
    ";": "semicolon",
    "-": "minus",
    "~": "tilt"
};
SYNO.SDS.Utils.ConvertSingleSymbolToString = function(f, d, c) {
    var a = "g",
        b = "\\" + d,
        e = (c) ? new RegExp(b, a) : new RegExp(b);
    f = f.replace(e, _T("common", SYNO.SDS.Utils.SymbolMap[d] + "_str"));
    return f
};
SYNO.SDS.Utils.ConvertSymbolsToString = function(f) {
    var b = ["+", "<", ">", ",", ":", ";"],
        a = "g",
        d, c, e;
    for (c = 0; c < b.length; c++) {
        d = "\\" + b[c];
        e = new RegExp(d, a);
        f = f.replace(e, _T("common", SYNO.SDS.Utils.SymbolMap[b[c]] + "_str"))
    }
    return f
};
SYNO.SDS.Utils.isBrowserReservedPort = function(e, a) {
    var c = [1, 7, 9, 11, 13, 15, 17, 19, 20, 21, 22, 23, 25, 37, 42, 43, 53, 77, 79, 87, 95, 101, 102, 103, 104, 109, 110, 111, 113, 115, 117, 119, 123, 135, 139, 143, 179, 389, 465, 512, 513, 514, 515, 526, 530, 531, 532, 540, 556, 563, 587, 601, 636, 993, 995, 2049, 3659, 4045, 6000, 6665, 6666, 6667, 6668, 6669];
    var b = 0;
    if (e > a) {
        b = e;
        e = a;
        a = b
    }
    for (var d = 0; d < c.length; d++) {
        if (e <= c[d] && a >= c[d]) {
            return true
        }
    }
    return false
};
SYNO.SDS.Utils.isReservedPort = function(m, c, g) {
    var d = [20, 21, 22, 23, 25, 69, 80, 110, 111, 137, 138, 139, 143, 161, 162, 199, 443, 445, 514, 515, 543, 548, 587, 631, 873, 892, 914, 915, 916, 993, 995, 2049, 3260, 3306, 3493, 4662, 4672, 5000, 5001, 5005, 5006, 5335, 5432, 6281, 7000, 7001, 9000, 9002, 9900, 9901, 9997, 9998, 9999, 50001, 50002];
    var e = [];
    var f = [];
    var n = 0;
    if (c > g) {
        n = c;
        c = g;
        g = n
    }
    switch (m) {
        case "ftp":
            f = [21];
            break;
        case "ssh":
            f = [22];
            break;
        case "http":
            f = [80];
            break;
        case "https":
            f = [443];
            break;
        case "www":
            f = [80, 443];
            break;
        case "webman":
        case "dsm":
            f = [5000, 5001];
            break;
        case "cfs":
            f = [7000, 7001];
            break;
        case "webdav":
            f = [5005, 5006];
            break;
        case "custsurveillance":
            f = [9900, 9901];
            break;
        case "emule":
            f = [4662, 4672];
            break;
        case "syslog":
            f = [514];
            break;
        default:
            break
    }
    for (var l = 0; l < d.length; l++) {
        var k = false;
        for (var h = 0; h < f.length; h++) {
            if (d[l] == f[h]) {
                k = true;
                break
            }
        }
        if (!k) {
            e.push(d[l])
        }
    }
    for (l = 0; l < e.length; l++) {
        if (c <= e[l] && g >= e[l]) {
            return true
        }
    }
    if ("ftp" != m) {
        var b = parseInt(_D("ftp_pasv_def_min_port", "55536"), 10);
        var a = parseInt(_D("ftp_pasv_def_max_port", "55663"), 10);
        if (c <= a && a <= g) {
            return true
        }
        if (b <= g && g <= a) {
            return true
        }
    }
    if ("emule" != m) {
        if (c <= 4662 && 4662 <= g) {
            return true
        }
        if (c <= 4672 && 4672 <= g) {
            return true
        }
    }
    if ("surveillance" != m) {
        if (c <= 55863 && 55863 <= g) {
            return true
        }
        if (55736 <= g && g <= 55863) {
            return true
        }
    }
    if ("custsurveillance" != m) {
        if (c <= 9900 && 9900 <= g) {
            return true
        }
        if (c <= 9901 && 9901 <= g) {
            return true
        }
    }
    if ("cfs" != m) {
        if (c <= 7000 && 7000 <= g) {
            return true
        }
        if (c <= 7001 && 7001 <= g) {
            return true
        }
    }
    if ("webdav" != m) {
        if (c <= 5005 && 5005 <= g) {
            return true
        }
        if (c <= 5006 && 5006 <= g) {
            return true
        }
    }
    if (c <= 55910 && 55910 <= g) {
        return true
    }
    if (55900 <= g && g <= 55910) {
        return true
    }
    if (c <= 3259 && 3259 <= g) {
        return true
    }
    if (3240 <= g && g <= 3259) {
        return true
    }
    return false
};
SYNO.SDS.Utils.getTimeZoneStore = function() {
    if (SYNO.SDS.Utils._timezoneStore) {
        return SYNO.SDS.Utils._timezoneStore
    }
    var a = SYNO.SDS.Utils.getTimeZoneData();
    var c = [];
    Ext.each(a, function(d) {
        c.push([d.value, d.offset, d.display])
    });
    var b = new Ext.data.SimpleStore({
        id: 0,
        fields: ["value", "offset", "display"],
        data: c
    });
    SYNO.SDS.Utils._timezoneStore = b;
    return b
};
SYNO.SDS.Utils.getTimeZoneData = function() {
    if (SYNO.SDS.Utils._timezoneData) {
        return SYNO.SDS.Utils._timezoneData
    }
    var b = [
        ["Midway", -660],
        ["Hawaii", -600],
        ["Alaska", -540],
        ["Pacific", -480],
        ["Arizona", -420],
        ["Chihuahua", -420],
        ["Mountain", -420],
        ["Guatemala", -360],
        ["Central", -360],
        ["MexicoCity", -360],
        ["Saskatchewan", -360],
        ["Bogota", -300],
        ["Eastern", -300],
        ["EastIndiana", -300],
        ["Caracas", -270],
        ["Atlantic", -240],
        ["La_Paz", -240],
        ["Manaus", -240],
        ["Santiago", -240],
        ["Newfoundland", -210],
        ["Brasilia", -180],
        ["BuenosAires", -180],
        ["Godthab", -180],
        ["Montevideo", -180],
        ["South_Georgia", -120],
        ["Azores", -60],
        ["CapeVerde", -60],
        ["Casablanc", 0],
        ["Dublin", 0],
        ["Monrovia", 0],
        ["Amsterdam", 60],
        ["Belgrade", 60],
        ["Brussels", 60],
        ["Sarajevo", 60],
        ["WAT", 60],
        ["Windhoek", 60],
        ["Amman", 120],
        ["Athens", 120],
        ["Beirut", 120],
        ["Egypt", 120],
        ["Harare", 120],
        ["Helsinki", 120],
        ["Israel", 120],
        ["CAT", 120],
        ["EET", 120],
        ["Minsk", 180],
        ["Baghdad", 180],
        ["Kuwait", 180],
        ["Nairobi", 180],
        ["Moscow", 180],
        ["Tehran", 210],
        ["Muscat", 240],
        ["Baku", 240],
        ["Tbilisi", 240],
        ["Yerevan", 240],
        ["Kabul", 270],
        ["Karachi", 300],
        ["Ekaterinburg", 300],
        ["Calcutta", 330],
        ["Katmandu", 345],
        ["Almaty", 360],
        ["Dhaka", 360],
        ["Novosibirsk", 360],
        ["Rangoon", 390],
        ["Jakarta", 420],
        ["Krasnoyarsk", 420],
        ["Taipei", 480],
        ["Beijing", 480],
        ["Ulaanbaatar", 480],
        ["Singapore", 480],
        ["Perth", 480],
        ["Irkutsk", 480],
        ["Tokyo", 540],
        ["Seoul", 540],
        ["Yakutsk", 540],
        ["Adelaide", 570],
        ["Darwin", 570],
        ["Brisbane", 600],
        ["Melbourne", 600],
        ["Guam", 600],
        ["Tasmania", 600],
        ["Vladivostok", 600],
        ["Magadan", 600],
        ["Noumea", 660],
        ["Auckland", 720],
        ["Fiji", 720]
    ];

    function c(e) {
        var f = "";
        var d = Math.floor(Math.abs(e));
        if (d < 10) {
            f += "0"
        }
        return (f += d.toString())
    }
    var a = [];
    Ext.each(b, function(f) {
        var e = f[1];
        var d;
        if (e === 0) {
            d = "(GMT)"
        } else {
            d = String.format("(GMT{0}{1}:{2})", (e > 0) ? "+" : "-", c(e / 60), c(e % 60))
        }
        a.push({
            value: f[0],
            offset: f[1],
            display: _T("timezone", f[0]).replace(/\(GMT.{0,6}\)/g, d)
        })
    });
    SYNO.SDS.Utils._timezoneData = a;
    return a
};
SYNO.SDS.Utils.createTimeItemStore = function(e) {
    var a = [];
    var c = {
        hour: 24,
        min: 60,
        sec: 60
    };
    if (e in c) {
        for (var d = 0; d < c[e]; d++) {
            a.push([d, String.leftPad(String(d), 2, "0")])
        }
        var b = new Ext.data.SimpleStore({
            id: 0,
            fields: ["value", "display"],
            data: a
        });
        return b
    }
    return null
};
SYNO.SDS.Utils.GetLocalizedString = function(b, d) {
    if (!b) {
        return ""
    }
    var e, a, c = b.split(":", 3);
    if (2 < c.length) {
        return b
    }
    e = c[0];
    a = c[1];
    var f;
    if (d) {
        if (!Ext.isArray(d)) {
            d = [d]
        }
        Ext.each(d, function(g) {
            f = _TT(g, e, a);
            if (!Ext.isEmpty(f)) {
                return false
            }
        })
    }
    return f || _T(e, a) || c[2] || b
};
SYNO.SDS.Utils.CapacityRender = function(c, d) {
    var b = _T("common", "size_mb");
    var e = c;
    if (e < 0) {
        e = 0
    }
    if (e >= 1024) {
        e = e / 1024;
        b = _T("common", "size_gb")
    }
    if (e >= 1024) {
        e = e / 1024;
        b = _T("common", "size_tb")
    }
    var a = d || 2;
    return e.toFixed(a) + " " + b
};
Ext.override(Ext.form.Radio, {
    setValue: function(a) {
        if (typeof a == "boolean") {
            Ext.form.Radio.superclass.setValue.call(this, a)
        } else {
            if (this.rendered) {
                var b = this.getCheckEl().select("input[name=" + this.el.dom.name + "]");
                b.each(function(d) {
                    var c = Ext.getCmp(d.dom.id);
                    c.setValue((a === d.dom.value));
                    c.fireEvent("check", c, c.checked)
                }, this)
            }
        }
        return this
    },
    onClick: function() {
        if (this.el.dom.checked != this.checked) {
            this.setValue(this.el.dom.value)
        }
    }
});
SYNO.SDS.Utils.Checkbox = Ext.extend(Ext.form.Checkbox, {
    activeCls: "",
    isMouseOn: false,
    boxEl: null,
    clsStates: {
        check: {
            normal: "check",
            active: "checkActive"
        },
        nocheck: {
            normal: "nocheck",
            active: "nocheckActive"
        }
    },
    initComponent: function() {
        SYNO.SDS.Utils.Checkbox.superclass.initComponent.apply(this, arguments)
    },
    initEvents: function() {
        SYNO.SDS.Utils.Checkbox.superclass.initEvents.call(this);
        this.boxEl = this.el.next();
        this.mon(this, {
            scope: this,
            check: this.onChecked,
            focus: this.onFocus,
            blur: this.onBlur
        });
        this.mon(this.container, {
            scope: this,
            mouseenter: this.mouseOn,
            mouseleave: this.mouseOut
        })
    },
    mouseOn: function() {
        this.isMouseOn = true;
        this.updateStates(this.isMouseOn)
    },
    mouseOut: function() {
        this.isMouseOn = false;
        this.updateStates(this.isMouseOn)
    },
    onBlur: function() {
        this.updateStates(false)
    },
    onFocus: function() {
        this.updateStates(true)
    },
    onChecked: function() {
        this.updateStates(this.isMouseOn)
    },
    updateStates: function(b) {
        if (!this.boxEl) {
            return
        }
        var a = this.clsStates[this.getValue() ? "check" : "nocheck"][b ? "active" : "normal"];
        this.boxEl.removeClass(this.activeCls);
        this.boxEl.addClass(a);
        this.activeCls = a
    }
});
SYNO.SDS.Utils.SearchField = Ext.extend(SYNO.ux.FleXcroll.ComboBox, {
    constructor: function(a) {
        a.listeners = Ext.applyIf(a.listeners || {}, {
            render: {
                fn: function(b) {
                    b.trigger.hide();
                    b.trigger.removeClass("syno-ux-combobox-trigger")
                }
            }
        });
        SYNO.SDS.Utils.SearchField.superclass.constructor.call(this, Ext.apply({
            title: _T("common", "search_results"),
            loadingText: _T("common", "searching"),
            emptyText: _T("user", "search_user"),
            queryParam: "query",
            queryDelay: 500,
            listEmptyText: _T("search", "no_search_result"),
            grow: true,
            width: 200,
            listWidth: 360,
            maxHeight: 360,
            minChars: 1,
            autoSelect: false,
            typeAhead: false,
            editable: true,
            mode: "remote",
            listAlign: ["tr-br?", [16, 0]],
            ctCls: "syno-textfilter",
            cls: "syno-textfilter-text",
            listClass: "sds-search-result",
            triggerConfig: {
                tag: "button",
                "aria-label": _T("common", "clear_input"),
                cls: "x-form-trigger syno-textfilter-trigger"
            },
            store: new SYNO.API.JsonStore({
                autoDestroy: true,
                appWindow: this.findAppWindow() || false,
                api: "SYNO.Core.UISearch",
                method: "uisearch",
                version: 1,
                root: "items",
                id: "_random",
                fields: ["id", "title", "owner", "topic", "type", {
                    name: "desc",
                    convert: function(c, b) {
                        return String.format(c, _D("product"))
                    }
                }],
                baseParams: {
                    lang: _S("lang"),
                    type: a.type || "all"
                }
            })
        }, a))
    },
    initEvents: function() {
        SYNO.SDS.Utils.SearchField.superclass.initEvents.apply(this, arguments);
        this.keyNav.disable();
        this.mon(this.el, "click", this.onClick, this);
        this.mon(this.getStore(), "load", this.onStoreLoad, this);
        this.mon(this.el, "focus", this.setListAria, this, {
            single: true
        });
        this.enterNav = new Ext.KeyNav(this.el, {
            enter: this.focusResult,
            scope: this
        })
    },
    setListAria: function() {
        this.innerList.set({
            role: "listbox",
            tabindex: 0,
            "aria-label": _T("common", "search_results")
        });
        this.setListKeyNav()
    },
    setListKeyNav: function() {
        this.listKeyNav = new Ext.KeyNav(this.innerList, {
            up: function(a) {
                this.inKeyMode = true;
                this.selectPrev()
            },
            down: function(a) {
                if (!this.isExpanded()) {
                    this.onTriggerClick()
                } else {
                    this.inKeyMode = true;
                    this.selectNext()
                }
            },
            enter: function(a) {
                this.onViewClick(false)
            },
            esc: function(a) {
                this.collapse();
                this.getAriaEl().focus()
            },
            tab: function(a) {
                this.collapse();
                this.getAriaEl().focus()
            },
            scope: this,
            doRelay: function(c, b, a) {
                if (a == "down" || this.scope.isExpanded()) {
                    var d = Ext.KeyNav.prototype.doRelay.apply(this, arguments);
                    if (((Ext.isIE9 && Ext.isStrict) || !Ext.isIE) && Ext.EventManager.useKeydown) {
                        this.scope.fireKey(c)
                    }
                    return d
                }
                return true
            },
            forceKeyDown: true,
            defaultEventAction: "stopEvent"
        })
    },
    focusResult: function() {
        var a = this.getStore();
        if (a.getCount() === 0) {
            this.innerList.set({
                tabindex: 0,
                "aria-label": _T("search", "no_search_result")
            });
            this.innerList.dom.removeAttribute("role")
        } else {
            this.innerList.set({
                role: "listbox",
                tabindex: 0,
                "aria-label": _T("common", "search_results")
            })
        }
        this.innerList.focus()
    },
    onClick: function() {
        if (this.getValue().length >= this.minChars) {
            if (!this.hasFocus) {
                this.blur();
                this.focus()
            }
            this.expand()
        }
    },
    onStoreLoad: function(a) {
        function b(c) {
            var d = "";
            switch (c.get("type")) {
                case "app":
                    d = SYNO.SDS.Utils.ParseSearchID(c.get("id")).className;
                    if (SYNO.SDS.Utils.isHiddenControlPanelModule(c.get("id"))) {
                        return false
                    }
                    break;
                case "help":
                    d = "SYNO.SDS.HelpBrowser.Application";
                    break;
                default:
                    return true
            }
            return SYNO.SDS.StatusNotifier.isAppEnabled(d)
        }
        a.filterBy(b)
    },
    onSelect: function(a, b) {
        if (this.fireEvent("beforeselect", this, a, b) !== false) {
            this.collapse();
            this.fireEvent("select", this, a, b)
        }
    },
    select: function(a, d) {
        this.selectedIndex = a;
        this.view.select(a);
        if (d !== false) {
            var b = this.view.getNode(a);
            if (b) {
                this.innerList.scrollChildIntoView(b, false)
            }
        }
        var c = this.view.getSelectedNodes()[0];
        this.innerList.set({
            "aria-activedescendant": c.id
        })
    },
    onViewOver: function(d, b) {
        if (this.inKeyMode) {
            return
        }
        var c = this.view.findItemFromChild(b);
        if (c) {
            var a = this.view.indexOf(c);
            this.select(a, false)
        } else {
            this.view.clearSelections()
        }
    },
    onViewClick: function(b) {
        var a = this.view.getSelectedIndexes()[0],
            c = this.store,
            d = c.getAt(a);
        if (d) {
            this.onSelect(d, a);
            this.view.clearSelections()
        }
        if (b !== false) {
            this.el.focus()
        }
    },
    onKeyUp: function(c) {
        var a = c.getKey(),
            b = this.getValue();
        this.trigger.setVisible(!!b);
        if (b.length < this.minChars) {
            this.collapse()
        } else {
            if (b === this.lastQuery && c.ENTER === a) {
                this.expand()
            } else {
                if (this.editable !== false && this.readOnly !== true && (c.ENTER === a || c.BACKSPACE === a || c.DELETE === a || !c.isSpecialKey())) {
                    this.lastKey = a;
                    this.dqTask.delay(this.queryDelay)
                }
            }
        }
    },
    preFocus: function() {
        var a = this.el;
        if (this.emptyText) {
            if (a.dom.value === this.emptyText && this.el.hasClass(this.emptyClass)) {
                this.setRawValue("")
            }
            a.removeClass(this.emptyClass)
        }
        if (this.selectOnFocus) {
            a.dom.select()
        }
    },
    initQuery: function() {
        this.view.clearSelections();
        this.doQuery(this.getRawValue())
    },
    getRawValue: function() {
        var a = this.rendered ? this.el.getValue() : Ext.value(this.value, "");
        if (a === this.emptyText && this.el.hasClass(this.emptyClass)) {
            a = ""
        }
        return a
    },
    getValue: function() {
        if (!this.rendered) {
            return this.value
        }
        var a = this.el.getValue();
        if ((a === this.emptyText && this.el.hasClass(this.emptyClass)) || a === undefined) {
            a = ""
        }
        return a
    },
    onTriggerClick: function() {
        if (this.getValue()) {
            this.setValue("");
            this.trigger.hide();
            this.collapse()
        }
        this.focus(false, 200)
    }
});
SYNO.SDS.Utils.InnerGroupingView = Ext.extend(Ext.grid.GroupingView, {
    onLayout: function() {
        SYNO.SDS.Utils.InnerGroupingView.superclass.onLayout.call(this);
        Ext.grid.GroupingView.superclass.onLayout.call(this);
        var a = this.getGroups();
        if (a) {
            Ext.each(a, function(b) {
                var c = Ext.get(b.id).child(".x-grid-group-hd");
                if (c) {
                    c.on("mouseover", function() {
                        c.addClass("syno-ux-grid-group-hd-over")
                    });
                    c.on("mouseout", function() {
                        c.removeClass("syno-ux-grid-group-hd-over")
                    });
                    c.on("mousedown", function() {
                        c.addClass("syno-ux-grid-group-hd-click")
                    });
                    c.on("mouseup", function() {
                        c.removeClass("syno-ux-grid-group-hd-click")
                    })
                }
            })
        }
    }
});
SYNO.SDS.DefineGridView("SYNO.SDS.Utils.GroupingView", "SYNO.SDS.Utils.InnerGroupingView");
Ext.override(SYNO.SDS.Utils.GroupingView, {
    toggleGroup: function(e, c) {
        var d = this;
        var a = Ext.get(e),
            f = Ext.util.Format.htmlEncode(a.id);
        c = Ext.isDefined(c) ? c : a.hasClass("x-grid-group-collapsed");
        if (d.state[f] !== c) {
            if (d.cancelEditOnToggle !== false) {
                d.grid.stopEditing(true)
            }
            d.state[f] = c;
            var b = a.child(".x-grid-group-body");
            if (b) {
                b[c ? "slideIn" : "slideOut"]("t", {
                    duration: 0.25,
                    block: true,
                    scope: d,
                    callback: this.afterSlideEffect.createDelegate(this, [e, c])
                })
            } else {
                a[c ? "removeClass" : "addClass"]("x-grid-group-collapsed");
                this.onLayout.call(this);
                this.updateScroller()
            }
        }
    },
    afterSlideEffect: function(d, c) {
        var a = Ext.get(d);
        var b = a.child(".x-grid-group-body");
        b.removeClass("x-grid3-row-over");
        a[c ? "removeClass" : "addClass"]("x-grid-group-collapsed");
        b[c ? "show" : "hide"]("display");
        this.onLayout.call(this);
        this.updateScroller()
    }
});
SYNO.SDS.Utils.StateGridPanel = Ext.extend(SYNO.ux.GridPanel, {
    constructor: function(a) {
        var b = {};
        if (a.stateId) {
            this.stateId = a.stateId;
            b = {
                stateEvents: ["columnmove", "columnresize", "sortchange"],
                stateful: true,
                saveState: (function() {
                    var d = this.getState();
                    if (this.findAppWindow() && this.findAppWindow().appInstance) {
                        this.findAppWindow().appInstance.setUserSettings(this.stateId, d)
                    }
                }).createDelegate(this)
            }
        }
        Ext.apply(b, a);
        SYNO.SDS.Utils.StateGridPanel.superclass.constructor.call(this, b);
        if (a.stateId) {
            var c = function(d) {
                if (this.findAppWindow() && this.findAppWindow().appInstance) {
                    var f = this.findAppWindow().appInstance.getUserSettings(this.stateId);
                    if (f) {
                        try {
                            d.applyState(f)
                        } catch (g) {}
                    }
                }
            };
            this.mon(this, "beforerender", c, this, this);
            this.mon(this, "reconfigure", c, this, this)
        }
    }
});
SYNO.SDS.Utils.GridView = Ext.extend(Ext.grid.GridView, {
    onLayout: function() {}
});
SYNO.SDS.Utils.ParseSearchID = function(c) {
    var b = c.split("?", 2),
        a = {
            className: "",
            params: {}
        };
    a.className = b[0];
    if (2 === b.length) {
        a.params = Ext.urlDecode(b[1])
    }
    return a
};
SYNO.SDS.Utils.isControlPanelModule = function(b, a) {
    if (a === "SYNO.SDS.ControlPanel.Instance" && b !== "SYNO.SDS.ControlPanel.Instance" && !SYNO.SDS.Utils.isHiddenControlPanelModule(b)) {
        return true
    }
    return false
};
SYNO.SDS.Utils.isHiddenControlPanelModule = function(b) {
    var a = SYNO.SDS.Utils.ParseSearchID(b);
    if (a.className === "SYNO.SDS.ControlPanel.Instance") {
        if (a.params && a.params.fn) {
            if (Ext.isDefined(SYNO.SDS.AppPrivilege[a.params.fn]) && false === SYNO.SDS.AppPrivilege[a.params.fn]) {
                return true
            }
        }
    }
    return false
};
SYNO.SDS.Utils.GetAppIcon = function(c, b) {
    if (c in SYNO.SDS.Config.FnMap) {
        var a = SYNO.SDS.Config.FnMap[c].config;
        return SYNO.SDS.UIFeatures.IconSizeManager.getIconPath(a.jsBaseURL + "/" + a.icon, b)
    }
    return ""
};
SYNO.SDS.Utils.GetAppTitle = function(b) {
    if (b in SYNO.SDS.Config.FnMap) {
        var a = SYNO.SDS.Config.FnMap[b].config;
        return SYNO.SDS.Utils.GetLocalizedString(a.title, b)
    }
    return ""
};
SYNO.SDS.Utils.CheckWebapiError = function(e) {
    var c, b, d;
    try {
        if (Ext.isDefined(e.responseText)) {
            c = Ext.decode(e.responseText)
        } else {
            c = e
        }
        if (c.success) {
            return false
        }
        b = c.error.code || 100;
        d = SYNO.API.Errors.common[b]
    } catch (a) {}
    if (!d) {
        b = 100;
        d = SYNO.API.Errors.common[b]
    }
    window.alert(d);
    if (b >= 105) {
        window.onbeforeunload = null;
        window.location.href = "/"
    }
    return true
};
Ext.define("SYNO.SDS.Utils.Logout", {
    statics: {
        logoutTriggered: false,
        reserveQueryString: false,
        action: function(b, c, a) {
            if (a === true) {
                if (SYNO.SDS.Desktop) {
                    SYNO.SDS.Desktop.hide()
                }
                Ext.getBody().mask().addClass("desktop-timeout-mask")
            }
            if (Ext.isSafari && Ext.isMac) {
                this.logout.defer(10, this, [b, c])
            } else {
                this.logout(b, c)
            }
        },
        logout: function(a, b) {
            if (this.logoutTriggered) {
                return
            }
            if (Ext.isDefined(b)) {
                window.alert(b)
            }
            if (a === true) {
                window.onbeforeunload = null
            }
            if ("SYNOSSO" in window && SYNOSSO.logout) {
                SYNO.SDS.SSOUtils.logout(this.redirect)
            }
            if (Ext.isSafari && Ext.isMac) {
                this.redirect.defer(300, this)
            } else {
                this.redirect()
            }
        },
        setConfig: function(a) {
            Ext.apply(this, a)
        },
        redirect: function() {
            var a = "webman/logout.cgi";
            if (this.reserveQueryString) {
                a += window.location.search;
                a += window.location.hash
            }
            window.location.href = a;
            this.logoutTriggered = true
        }
    }
});
SYNO.SDS.Utils.CheckServerError = function(e) {
    var a, d, c;
    if (!e || !e.getResponseHeader) {
        return false
    }
    try {
        a = e.getResponseHeader("x-request-error") || e.getResponseHeader("X-Request-Error")
    } catch (b) {
        a = e.getResponseHeader["x-request-error"] || e.getResponseHeader["X-Request-Error"]
    }
    try {
        c = e.getResponseHeader("X-SYNO-SOURCE-ID")
    } catch (b) {
        c = undefined
    }
    if (a && Ext.isEmpty(c)) {
        a = Ext.util.Format.trim(a);
        switch (a) {
            case "timeout":
                d = _JSLIBSTR("uicommon", "error_timeout");
                break;
            case "unauth":
                d = _JSLIBSTR("uicommon", "error_unauth");
                break;
            case "noprivilege":
                d = _JSLIBSTR("uicommon", "error_noprivilege");
                break;
            case "relogin":
                d = _JSLIBSTR("uicommon", "error_relogin");
                break;
            case "errorip":
                d = undefined;
                break;
            default:
                d = _JSLIBSTR("uicommon", "error_system")
        }
        SYNO.SDS.Utils.Logout.action(true, d, true);
        return true
    }
    return false
};
SYNO.SDS.Utils.CheckServerErrorData = function(b) {
    var d = null,
        c, a;
    if (!Ext.isDefined(b)) {
        return false
    }
    c = b.section;
    a = b.key;
    if (c === "login") {
        switch (a) {
            case "error_timeout":
            case "error_noprivilege":
            case "error_interrupt":
                d = _JSLIBSTR("uicommon", a);
                break;
            default:
                d = _JSLIBSTR("uicommon", "error_system")
        }
    } else {
        if ("error" === c && "error_testjoin" === a) {
            d = _T("error", "error_testjoin")
        }
    }
    if (d) {
        alert(d);
        window.onbeforeunload = null;
        window.location.href = "/";
        return true
    }
    return false
};
SYNO.SDS.Utils.AddTip = function(d, k) {
    var j = document.createElement("a");
    var f = document.createElement("img");
    var a = "vertical-align:bottom; position: relative;";
    var h = Ext.getCmp(d.id);
    var b = Ext.id();
    var g = SYNO.SDS.UIFeatures.test("isRetina") ? SYNO.SDS.ThemeProvider.getPath("synoSDSjslib/images/default/2x/components/icon_information_mini.png") : SYNO.SDS.ThemeProvider.getPath("synoSDSjslib/images/default/1x/components/icon_information_mini.png");
    f.setAttribute("src", g);
    f.setAttribute("width", "24px");
    f.setAttribute("height", "24px");
    f.setAttribute("draggable", "false");
    if (h && h.defaultTriggerWidth) {
        a += " left:" + h.defaultTriggerWidth + "px;"
    }
    f.setAttribute("style", a);
    f.setAttribute("ext:qtip", k);
    f.setAttribute("alt", k);
    f.setAttribute("id", b);
    j.appendChild(f);
    if (h instanceof SYNO.ux.DisplayField) {
        d.appendChild(j)
    } else {
        if (h instanceof SYNO.ux.Button && Ext.getDom(d).nextSibling) {
            var i = d.dom.getAttribute("style") + " margin-right:0px !important;";
            var e = "margin-right:6px !important;";
            var c = Ext.getDom(d);
            c.setAttribute("style", i);
            j.setAttribute("style", e);
            c.parentNode.insertBefore(j, c.nextSibling)
        } else {
            if (h instanceof SYNO.ux.TextArea) {
                Ext.getDom(d).parentNode.parentNode.appendChild(j)
            } else {
                Ext.getDom(d).parentNode.appendChild(j)
            }
        }
    }
    if (h && h.el) {
        h.el.set({
            "aria-describedby": h.el.dom.getAttribute("aria-describedby") + " " + b
        })
    }
    return j
};
SYNO.SDS.Utils.CheckStrongPassword = Ext.extend(Object, {
    passwordPolicy: null,
    isFakePasswd: function(a, b) {
        if (a === "12345678" && b === "87654321") {
            return true
        }
    },
    getForm: null,
    getUserAcc: null,
    getUserDesc: null,
    getPasswd: null,
    getPasswdConfirm: null,
    getStartValidate: null,
    initPasswordChecker: function(a) {
        Ext.each(["getForm", "getUserAcc", "getUserDesc", "getPasswd", "getPasswdConfirm", "getStartValidate"], function(b) {
            this[b] = a[b]
        }, this)
    },
    setValue: function(a, b) {
        this.getForm().findField(this[a]).setValue(b)
    },
    getInfo: function(a) {
        if (Ext.isFunction(this[a])) {
            return this[a].call(this.scope || this)
        } else {
            if (Ext.isString(this[a])) {
                if (Ext.isFunction(this.getForm)) {
                    return this.getForm().findField(this[a]).getValue()
                } else {
                    return this[a]
                }
            }
        }
    },
    isStrongValidator: function() {
        var c = this.getInfo("getUserAcc");
        var b = this.getInfo("getUserDesc");
        var a = this.getInfo("getPasswd");
        var d = this.getInfo("getPasswdConfirm");
        var e = "";
        if (false === this.getStartValidate()) {
            return true
        }
        if (true === this.isFakePasswd(a, d)) {
            return true
        }
        e = this.isPasswordValid(a, c, b);
        return e
    },
    isPasswordValid: function(p, n, b) {
        var j = "abcdefghijklmnopqrstuvwxyz";
        var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var h = "~`!@#$%^&*()-_+={[}]|\\:;\"'<,>.?/ ";
        var m = "1234567890";
        var e = false;
        var l = false;
        var a = {
            mixed_case: false,
            included_special_char: false,
            included_numeric_char: false,
            exclude_username: false,
            min_length_enable: false
        };
        var d = [];
        var g = 0;
        var k = "";
        var f = Ext.util.Format.lowercase(p);
        var q = Ext.util.Format.lowercase(n);
        var c = Ext.util.Format.lowercase(b);
        if (q === "admin" && p.length < 6) {
            return String.format(_T("passwd", "min_length_default"), "admin", 6)
        }
        if (this.passwordPolicy.strong_password_enable === false) {
            return true
        }
        if ((q === "" || f.indexOf(q) === -1) && (c === "" || f.indexOf(c) === -1)) {
            a.exclude_username = true
        }
        for (g = 0; g < p.length; g++) {
            k = p.charAt(g);
            if (j.indexOf(k) !== -1) {
                e = true
            } else {
                if (o.indexOf(k) !== -1) {
                    l = true
                } else {
                    if (h.indexOf(k) !== -1) {
                        a.included_special_char = true
                    } else {
                        if (m.indexOf(k) !== -1) {
                            a.included_numeric_char = true
                        }
                    }
                }
            }
        }
        if (e === true && l === true) {
            a.mixed_case = true
        }
        if (p.length >= this.passwordPolicy.min_length) {
            a.min_length_enable = true
        }
        for (g in a) {
            if (true === this.passwordPolicy[g] && false === a[g]) {
                if (g === "min_length_enable") {
                    d.push(_T("passwd", g) + " " + this.passwordPolicy.min_length)
                } else {
                    d.push(_T("passwd", g))
                }
            }
        }
        if (0 !== d.length) {
            return _T("passwd", "passwd_strength_warn") + d.join(", ") + _T("common", "period")
        }
        return true
    }
});
SYNO.SDS.Utils.ActionGroup = Ext.extend(Object, {
    constructor: function(a) {
        this.list = [];
        this.dict = {};
        if (Ext.isObject(a)) {
            this.dict = a;
            Ext.iterate(a, function(b, c, d) {
                this.list.push(c)
            }, this)
        } else {
            if (Ext.isArray(a)) {
                this.list = a;
                Ext.each(a, function(d, b, c) {
                    this.dict[d.itemId] = d
                }, this)
            } else {
                SYNO.Debug.error("wrong parameters for ActionGroup")
            }
        }
    },
    enableAll: function() {
        Ext.each(this.list, function(c, a, b) {
            c.enable()
        }, this)
    },
    disableAll: function() {
        Ext.each(this.list, function(c, a, b) {
            c.disable()
        }, this)
    },
    enable: function(a) {
        if (this.dict[a]) {
            this.dict[a].enable()
        }
    },
    disable: function(a) {
        if (this.dict[a]) {
            this.dict[a].disable()
        }
    },
    add: function(a) {
        if (!a || !a.itemId) {
            SYNO.Debug.error("Invalid parameter for ActionGroup.add()");
            return
        }
        this.dict[a.itemId] = a;
        this.list.push(a)
    },
    get: function(a) {
        return this.dict[a]
    },
    getArray: function() {
        return this.list
    },
    showAll: function() {
        Ext.each(this.list, function(c, a, b) {
            c.show()
        }, this)
    },
    hideAll: function() {
        Ext.each(this.list, function(c, a, b) {
            c.hide()
        }, this)
    }
});
SYNO.SDS.Utils.isValidExtension = function(d, b) {
    var a = 0;
    var c = d.toLowerCase();
    if (!d.length || !b.length) {
        return false
    }
    a = c.lastIndexOf(b);
    if (-1 == a) {
        return false
    }
    if (c.length != (a + b.length)) {
        return false
    }
    return true
};
SYNO.SDS.Utils.getSupportedLanguage = function(a) {
    var e = {
        enu: _T("common", "language_enu"),
        fre: _T("common", "language_fre"),
        ger: _T("common", "language_ger"),
        ita: _T("common", "language_ita"),
        spn: _T("common", "language_spn"),
        cht: _T("common", "language_cht"),
        chs: _T("common", "language_chs"),
        jpn: _T("common", "language_jpn"),
        krn: _T("common", "language_krn"),
        ptb: _T("common", "language_ptb"),
        rus: _T("common", "language_rus"),
        dan: _T("common", "language_dan"),
        nor: _T("common", "language_nor"),
        sve: _T("common", "language_sve"),
        nld: _T("common", "language_nld"),
        plk: _T("common", "language_plk"),
        ptg: _T("common", "language_ptg"),
        hun: _T("common", "language_hun"),
        trk: _T("common", "language_trk"),
        csy: _T("common", "language_csy")
    };
    var f = [];
    var c = 0;
    for (var d in e) {
        if (e.hasOwnProperty(d)) {
            f[c++] = [d, e[d]]
        }
    }
    var b = function(h, g) {
        if (h[1] > g[1]) {
            return 1
        } else {
            if (h[1] < g[1]) {
                return -1
            } else {
                return 0
            }
        }
    };
    f = f.sort(b);
    if (a) {
        f.unshift(["def", _T("common", "language_def")])
    }
    return f
};
SYNO.SDS.Utils.getSupportedLanguageCodepage = function(a) {
    var e = {
        enu: _T("common", "language_enu"),
        fre: _T("common", "language_fre"),
        ger: _T("common", "language_ger"),
        gre: _T("common", "language_gre"),
        heb: _T("common", "language_heb"),
        ita: _T("common", "language_ita"),
        spn: _T("common", "language_spn"),
        cht: _T("common", "language_cht"),
        chs: _T("common", "language_chs"),
        jpn: _T("common", "language_jpn"),
        krn: _T("common", "language_krn"),
        ptb: _T("common", "language_ptb"),
        rus: _T("common", "language_rus"),
        dan: _T("common", "language_dan"),
        nor: _T("common", "language_nor"),
        sve: _T("common", "language_sve"),
        nld: _T("common", "language_nld"),
        plk: _T("common", "language_plk"),
        ptg: _T("common", "language_ptg"),
        hun: _T("common", "language_hun"),
        trk: _T("common", "language_trk"),
        csy: _T("common", "language_csy"),
        ara: _T("common", "language_ara")
    };
    var f = [];
    var c = 0;
    for (var d in e) {
        if (e.hasOwnProperty(d)) {
            f[c++] = [d, e[d]]
        }
    }
    var b = function(h, g) {
        if (h[1] > g[1]) {
            return 1
        } else {
            if (h[1] < g[1]) {
                return -1
            } else {
                return 0
            }
        }
    };
    f = f.sort(b);
    if (a) {
        f.unshift(["def", _T("common", "language_def")])
    }
    return f
};
SYNO.SDS.Utils.utfencode = function(b) {
    var e, d, a = "";
    b = b.replace(/\r\n/g, "\n");
    for (e = 0; e < b.length; e++) {
        d = b.charCodeAt(e);
        if (d < 128) {
            a += String.fromCharCode(d)
        } else {
            if ((d > 127) && (d < 2048)) {
                a += String.fromCharCode((d >> 6) | 192);
                a += String.fromCharCode((d & 63) | 128)
            } else {
                a += String.fromCharCode((d >> 12) | 224);
                a += String.fromCharCode(((d >> 6) & 63) | 128);
                a += String.fromCharCode((d & 63) | 128)
            }
        }
    }
    return a
};
SYNO.SDS.Utils.bin2hex = function(d) {
    var c, e = 0,
        b = [];
    d = SYNO.SDS.Utils.utfencode(d) + "";
    e = d.length;
    for (c = 0; c < e; c++) {
        b[c] = d.charCodeAt(c).toString(16).replace(/^([\da-f])$/, "0$1")
    }
    return b.join("")
};
SYNO.SDS.Utils.loadUIStrings = function(g, c, h) {
    var f = ["webapi/entry.cgi?api=SYNO.Core.Desktop.JSUIString&version=1&method=getjs&lang=" + g, "webapi/entry.cgi?api=SYNO.FileStation.UIString&version=1&method=getjs&lang=" + g, "webapi/entry.cgi?api=SYNO.Core.Desktop.UIString&version=1&method=getjs&lang=" + g];
    var e = 0;

    function b(i) {
        e++;
        if (e >= f.length) {
            h()
        }
    }

    function d() {
        if ("complete" !== this.readyState && "loaded" !== this.readyState) {
            return
        }
        this.onready()
    }
    if (g === "def" || g === _S("sys_lang")) {
        h();
        return
    }
    var a = document.getElementsByTagName("head")[0];
    Ext.each(f, function(j) {
        var k = j;
        k = Ext.urlAppend(k, "v=" + c);
        if (Ext.isDefined(SYNO.SDS.JSDebug)) {
            k = Ext.urlAppend(k, "_dc=" + (new Date().getTime()))
        }
        var i = document.createElement("script");
        i.type = "text/javascript";
        if (Ext.isIE) {
            i.onready = b.createCallback(j);
            i.onreadystatechange = d
        } else {
            i.onload = b.createCallback(j)
        }
        i.src = k;
        a.appendChild(i)
    })
};
SYNO.SDS.Utils.addFavIconLink = function(g, b) {
    var c = document.getElementsByTagName("link");
    var f = document.createElement("link");
    var e;
    f.rel = "shortcut icon";
    f.href = g;
    if (b) {
        f.type = b
    }
    var a = document.head || document.getElementsByTagName("head")[0];
    for (var d = c.length - 1; d >= 0; d--) {
        if (c[d] && c[d].getAttribute("rel") === "shortcut icon") {
            e = c[d].getAttribute("sizes");
            if (e === "16x16" || e === "32x32" || !e) {
                a.removeChild(c[d])
            }
        }
    }
    a.appendChild(f)
};
SYNO.SDS.Utils.listAllowAltPortApp = function() {
    var b = SYNO.SDS.Config.FnMap;
    var a = [];
    Ext.iterate(b, function(c, d, e) {
        if (d.config && (d.config.type === "app" || d.config.type === "url")) {
            if (d.config.allowAltPort === true) {
                a.push(c)
            }
        }
    });
    return a
};
SYNO.SDS.Utils.IconBadge = Ext.extend(Object, {
    constructor: function() {
        this.container = Ext.DomHelper.createDom({
            tag: "div",
            cls: "sds-expose-desc-ct"
        });
        this.el = Ext.get(this.container);
        this.icon = Ext.DomHelper.createDom({
            tag: "img",
            cls: "sds-expose-desc-img",
            style: String.format("width: {0}px", SYNO.SDS.UIFeatures.IconSizeManager.Header)
        });
        this.title = Ext.DomHelper.createDom({
            tag: "div",
            cls: "sds-expose-desc-text"
        });
        this.el.appendChild(this.icon);
        this.el.appendChild(this.title);
        Ext.get(document.body).appendChild(this.container)
    },
    setIconText: function(a, b) {
        this.icon.src = a;
        this.title.innerHTML = b
    },
    setXY: function(a, b) {
        this.el.setLeft(a);
        this.el.setTop(b)
    }
});
SYNO.SDS.Utils.isCJKLang = function() {
    switch (SYNO.SDS.Session.lang) {
        case "cht":
        case "chs":
        case "jpn":
        case "krn":
            return true;
        default:
            return false
    }
};
SYNO.SDS.Utils.is3rdPartyApp = function(b) {
    var a = SYNO.SDS.Config.FnMap[b];
    return (!a || a.jsFile.indexOf("webman/3rdparty/") === 0)
};
SYNO.SDS.Utils.clone = function(d) {
    if (!d || "object" !== typeof d) {
        return d
    }
    if ("function" === typeof d.clone) {
        return d.clone()
    }
    var e = "[object Array]" === Object.prototype.toString.call(d) ? [] : {};
    var b, a;
    for (b in d) {
        if (d.hasOwnProperty(b)) {
            a = d[b];
            if (a && "object" === typeof a) {
                e[b] = SYNO.SDS.Utils.clone(a)
            } else {
                e[b] = a
            }
        }
    }
    return e
};
SYNO.SDS.Utils.IsCJK = function(c) {
    if (!c) {
        return false
    }
    var e = function(g) {
        return /^[\u4E00-\u9FA5]|^[\uFE30-\uFFA0]/.test(g)
    };
    var f = function(g) {
        return /^[\u0800-\u4e00]/.test(g)
    };
    var b = function(g) {
        return /^[\u3130-\u318F]|^[\uAC00-\uD7AF]/.test(g)
    };
    var d;
    for (var a = 0; a < c.length; a++) {
        d = c[a];
        if (d === " ") {
            continue
        }
        if (d === undefined || (!e(d) && !f(d) && !b(d))) {
            return false
        }
    }
    return true
};
SYNO.SDS.Utils.SelectableCLS = "allowDefCtxMenu selectabletext";
SYNO.SDS.Utils.AutoResizeComboBox = Ext.extend(Ext.form.ComboBox, {
    expand: function() {
        var a = this;
        SYNO.SDS.Utils.AutoResizeComboBox.superclass.expand.call(a);
        if (a.comboBoxGrow === true) {
            a.autoResizeList(a.getWidth(), a.calcWidthFunc)
        }
    },
    doResize: function(a) {
        var b = this;
        if (!Ext.isDefined(b.listWidth) && b.comboBoxGrow === true) {
            b.autoResizeList(a, b.calcWidthFunc)
        }
    },
    autoResizeList: function(a, b) {
        var g = this,
            j = "",
            c = null,
            i = g.getStore();
        if (!i) {
            return
        }
        i.each(function(d) {
            if (j.length < d.data[g.displayField].length) {
                j = d.data[g.displayField];
                c = d
            }
        });
        var e = Ext.util.TextMetrics.createInstance(g.getEl());
        var f = document.createElement("div");
        f.appendChild(document.createTextNode(j));
        j = f.innerHTML;
        Ext.removeNode(f);
        f = null;
        j += "&#160;";
        var h = Math.min(g.comboBoxGrowMax || Number.MAX_VALUE, Math.max(((b && c) ? b(c, e.getWidth(j)) : e.getWidth(j)) + 10, a || 0));
        g.list.setWidth(h);
        g.innerList.setWidth(h - g.list.getFrameWidth("lr"))
    }
});
SYNO.SDS.Utils.IsAllowRelay = function(b) {
    var a, c, d = function(e) {
        if (true === e._relayObject && Ext.isFunction(e.findAppWindow) && Ext.isObject(e.openConfig) && Ext.isFunction(e.hasOpenConfig) && Ext.isFunction(e.getOpenConfig) && Ext.isFunction(e.setOpenConfig)) {
            return true
        }
        return false
    };
    if (!Ext.isObject(b)) {
        return false
    }
    a = Ext.getClassByName("SYNO.SDS.AdminCenter.MainWindow");
    c = Ext.getClassByName("SYNO.SDS.ResourceMonitor.App");
    if ((!Ext.isEmpty(a) && b instanceof a) || (!Ext.isEmpty(c) && b instanceof c) || true === d(b)) {
        if (b.hasOpenConfig("cms_id")) {
            return true
        }
    }
    return false
};
SYNO.SDS.Utils.IFrame = {
    createIFrame: function(d, c) {
        var e = SYNO.SDS.Utils.IFrame.createIFrame.iframeId || Ext.id(),
            a = d.getElementById(e),
            b = a || d.createElement("iframe");
        SYNO.SDS.Utils.IFrame.createIFrame.iframeId = e;
        b.setAttribute("src", "");
        b.setAttribute("id", e);
        b.setAttribute("name", e);
        if (c) {
            b.setAttribute("src", c)
        }
        b.setAttribute("frameBorder", "0");
        b.setAttribute("style", "border:0px none;width:0;height:0;position:absolute;top:-100000px");
        if (!a) {
            d.body.appendChild(b)
        }
        return b
    },
    cleanIframe: function(c, a) {
        try {
            Ext.EventManager.removeAll(a);
            Ext.destroy(a);
            c.body.removeChild(a);
            a = undefined
        } catch (b) {}
    },
    getWebAPIResp: function(a) {
        var c;
        try {
            c = Ext.decode(a.contentDocument.body.firstChild.innerHTML);
            if (Ext.isEmpty(c.success)) {
                c = undefined
            }
        } catch (b) {
            c = undefined
        }
        return c
    },
    request: function(a, d, k, f) {
        var h = document,
            j, e = SYNO.SDS.Utils.IFrame.createIFrame(h, f ? Ext.SSL_SECURE_URL : Ext.urlAppend(a)),
            b = Ext.isIE ? e.contentWindow.document : (e.contentDocument || window.frames[e.id].document),
            c;
        j = setTimeout((function() {
            SYNO.SDS.Utils.IFrame.cleanIframe.call(h, e);
            if (Ext.isFunction(d)) {
                d.call(k || this, "timeout", e)
            }
        }).createDelegate(this), 120000);
        if (f) {
            c = document.createElement("form");
            c.setAttribute("name", "dlform");
            c.setAttribute("action", Ext.urlAppend(a));
            c.setAttribute("method", "POST");
            for (var i in f) {
                if (f.hasOwnProperty(i)) {
                    var g = f[i];
                    c.appendChild(SYNO.SDS.Utils.IFrame.createHiddenInput(i, g))
                }
            }
            b.body.appendChild(c)
        }
        Ext.EventManager.on(e, "load", function() {
            var l;
            if (!Ext.isEmpty(j)) {
                clearTimeout(j)
            }
            SYNO.SDS.Utils.IFrame.cleanIframe.call(h, e);
            if (Ext.isFunction(d)) {
                l = this.getWebAPIResp(e);
                if (Ext.isObject(l)) {
                    d.call(k || this, "load", e, l.success, l.success ? l.data : l.error)
                } else {
                    d.call(k || this, "load", e)
                }
            }
        }, this, {
            single: true
        });
        Ext.EventManager.on(e, "error", function() {
            if (!Ext.isEmpty(j)) {
                clearTimeout(j)
            }
            SYNO.SDS.Utils.IFrame.cleanIframe.call(h, e);
            if (Ext.isFunction(d)) {
                d.call(k || this, "error", e)
            }
        }, this, {
            single: true
        });
        if (f) {
            b.dlform.submit();
            b.dlform.remove()
        }
        return e
    },
    requestWebAPI: function(e) {
        var d, f, c, b, g, a;
        if (!Ext.isObject(e.webapi) || !SYNO.ux.Utils.checkApiObjValid(e.webapi)) {
            SYNO.Debug.error("webapi is invalid");
            return
        }
        b = e.webapi;
        if (Ext.isObject(e.appWindow)) {
            c = e.appWindow.findAppWindow()
        } else {
            c = e.appWindow
        }
        if (SYNO.SDS.Utils.IsAllowRelay(c) && c.hasOpenConfig("cms_id")) {
            f = {
                api: "SYNO.CMS.DS",
                version: 1,
                method: "relay"
            };
            g = {
                id: c.getOpenConfig("cms_id"),
                timeout: c.getOpenConfig("cms_timeout") || 120,
                webapi: Ext.apply({
                    api: b.api,
                    version: b.version,
                    method: b.method
                }, b.params)
            };
            a = b.encryption ? ["webapi"] : null
        } else {
            if (false === c || c instanceof SYNO.SDS.AppWindow) {
                f = {
                    api: b.api,
                    method: b.method,
                    version: b.version
                };
                g = b.params;
                a = b.encryption
            } else {
                SYNO.Debug.error("appWindow is invalid!");
                SYNO.Debug.debug("appWindow can be found by Ext.Component.findAppWindow");
                SYNO.Debug.debug("ex: this.findAppWindow() or config.module.appWin.findAppWindow()");
                return
            }
        }
        if (!a) {
            f.params = g;
            d = SYNO.API.currentManager.getBaseURL(f, false, e.filename);
            return this.request(d, e.callback, e.scope)
        }
        d = SYNO.API.currentManager.getBaseURL(f, false, e.filename);
        g = this.encodeParams(f.api, g);
        return this.sendEncrypedRequest({
            reqObj: {
                url: d,
                params: g
            },
            reqEnc: a,
            config: e
        })
    },
    sendEncrypedRequest: function(a) {
        return SYNO.API.currentManager.requestAPI(Ext.apply({
            api: "SYNO.API.Encryption",
            method: "getinfo",
            version: 1,
            params: {
                format: "module"
            },
            callback: this.onEncryptRequestAPI,
            scope: this
        }, a))
    },
    onEncryptRequestAPI: function(j, h, f, a) {
        var e, g, d = a.config,
            c = a.reqObj,
            b = a.reqEnc;
        if (j) {
            SYNO.Encryption.CipherKey = h.cipherkey;
            SYNO.Encryption.RSAModulus = h.public_key;
            SYNO.Encryption.CipherToken = h.ciphertoken;
            SYNO.Encryption.TimeBias = h.server_time - Math.floor(+new Date() / 1000);
            e = Ext.copyTo({}, c.params, b);
            e = SYNO.Encryption.EncryptParam(e);
            for (g = 0; g < b.length; g++) {
                delete c.params[b[g]]
            }
            c.params = Ext.apply(c.params, e)
        }
        return this.request(c.url, d.callback, d.scope, c.params)
    },
    encodeParams: function(a, c) {
        var b = SYNO.API.GetKnownAPI(a, c);
        return ("JSON" === b.requestFormat) ? SYNO.API.EncodeParams(c) : c
    },
    createHiddenInput: function(b, c) {
        var a = document.createElement("input");
        a.setAttribute("type", "hidden");
        a.setAttribute("name", b);
        a.setAttribute("value", c);
        return a
    }
};
Ext.define("SYNO.SDS.Utils.HiDPI", {
    statics: {
        getRatio: function(b) {
            var a, d, c, e = ((window.matchMedia && (window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches)) ? 1.5 : 1);
            a = window.devicePixelRatio || e;
            d = b.webkitBackingStorePixelRatio || b.mozBackingStorePixelRatio || b.msBackingStorePixelRatio || b.oBackingStorePixelRatio || b.backingStorePixelRatio || 1;
            c = a / d;
            return c
        }
    }
});
SYNO.SDS.Utils.isBSTinEffect = function() {
    var e, c, b, f, a, g = new Date();
    for (e = 31; e > 0; e--) {
        c = new Date(g.getFullYear(), 2, e);
        if (c.getDay() === 0) {
            f = c;
            break
        }
    }
    for (e = 31; e > 0; e--) {
        c = new Date(g.getFullYear(), 9, e);
        if (c.getDay() === 0) {
            a = c;
            break
        }
    }
    b = (g < f || g > a) ? false : true;
    return b
};
SYNO.SDS.Utils.isInVirtualDSM = function() {
    var a = _D("virtual_dsm");
    if (!a) {
        return false
    }
    return "yes" === a.toLowerCase()
};
SYNO.SDS.Utils.GetFeasibilityCheckMsg = function(c) {
    var g = "",
        d, b = c,
        a = [],
        e, f, h = true;
    if (c.isJSON()) {
        d = Ext.util.JSON.decode(c);
        if (d.task_i18n) {
            b = d.task_i18n
        } else {
            b = d.task;
            h = false
        }
        if (!b) {
            return ""
        }
        if (d.args) {
            a = d.args
        }
    }
    if (h) {
        e = b.split(":");
        if (1 === e.length) {
            g = b
        } else {
            if (2 === e.length) {
                g = (0 === _T(e[0], e[1]).length) ? _JSLIBSTR(e[0], e[1]) : _T(e[0], e[1])
            } else {
                if (3 === e.length) {
                    g = _TT(e[0], e[1], e[2])
                } else {
                    g = b
                }
            }
        }
    } else {
        g = b
    }
    if ((!Ext.isDefined(g) || 0 === g.length) && Ext.isObject(d)) {
        g = d.task
    }
    if (0 < a.length) {
        a.unshift(g);
        f = String.format.apply(String, a)
    } else {
        f = g
    }
    return f
};
SYNO.SDS.Utils.GetFeasibilityCheckMsgJoin = function(a, c) {
    var b = [];
    c = c || "<br> ";
    Ext.each(a, function(d) {
        b.push(SYNO.SDS.Utils.GetFeasibilityCheckMsg(d))
    }, this);
    return b.join(c)
};
Ext.define("SYNO.SDS.Utils.StrongPassValidator", {
    extend: "Ext.util.Observable",
    constructor: function(a, b) {
        this.rules = Ext.apply({
            default_admin_min_length: true
        }, a);
        this.username = b || ""
    },
    validate: function(a) {
        var b = this.getMatchError(a);
        if (b.length > 0) {
            return b[0]
        }
        return true
    },
    getStrength: function(a) {
        var b = this.getMatchError(a);
        return Math.max(3 - b.length, 1)
    },
    getMatchError: function(i) {
        var h, d = /[a-z]/,
            j = /[A-Z]/,
            g = /[0-9]/,
            c = /[~`!@#$%^&*()\-_+={[}]|\\:;"'<,>\.\? ]/,
            f, b = [],
            k = this.rules,
            e = this.username.toLowerCase(),
            a = k.min_length;
        for (h in k) {
            if (k[h] === true) {
                f = false;
                switch (h) {
                    case "exclude_username":
                        f = (e.length === 0 || i.toLowerCase().indexOf(e) < 0);
                        break;
                    case "included_numeric_char":
                        f = g.test(i);
                        break;
                    case "included_special_char":
                        f = c.test(i);
                        break;
                    case "min_length_enable":
                        f = (i.length >= a);
                        break;
                    case "mixed_case":
                        f = (d.test(i) && j.test(i));
                        break;
                    case "default_admin_min_length":
                        f = (e == "admin") ? (i.length >= 6) : true;
                        break;
                    default:
                        break
                }
                if (!f) {
                    b.push(this.getErrMsg(h))
                }
            }
        }
        return b
    },
    getErrMsg: function(a) {
        switch (a) {
            case "min_length_enable":
                return _T("passwd", a) + " " + this.rules.min_length;
            case "default_admin_min_length":
                return String.format(_T("passwd", "min_length_default"), "admin", 6);
            default:
                return _T("passwd", a)
        }
    }
});
Ext.form.Action.Apply = Ext.extend(Ext.form.Action.Submit, {
    type: "apply",
    constructor: function(b, a) {
        Ext.form.Action.Apply.superclass.constructor.call(this, b, a)
    },
    success: function(b) {
        var a = this.processResponse(b);
        if (a === true || a.success) {
            if (a.data) {
                this.form.clearInvalid();
                this.form.setValues(a.data)
            }
            this.form.afterAction(this, true);
            return
        }
        if (a.errors) {
            this.form.markInvalid(a.errors)
        }
        this.failureType = Ext.form.Action.SERVER_INVALID;
        this.form.afterAction(this, false)
    }
});
Ext.form.Action.ACTION_TYPES.apply = Ext.form.Action.Apply;
Ext.ns("SYNO.SDS.Utils");
SYNO.SDS.Utils.getPunyHostname = function() {
    var a = [],
        c = location.hostname.split("."),
        b;
    for (b = 0; b < c.length; ++b) {
        a.push(SYNO.SDS.Utils.PunyCode.encode(c[b], true))
    }
    return a.join(".")
};
SYNO.SDS.Utils.getPunyHost = function() {
    var b, a = SYNO.SDS.Utils.getPunyHostname();
    b = location.protocol + "//" + a;
    if (location.port) {
        b += ":" + location.port
    }
    return b + "/"
};
SYNO.SDS.Utils.getPunyBaseURL = function() {
    var a = SYNO.SDS.Utils.getPunyHost();
    a += location.pathname;
    if (a.indexOf("?") != -1) {
        a = a.substring(0, a.indexOf("?"))
    }
    a = a.substring(0, a.lastIndexOf("/"));
    return a + "/"
};
SYNO.SDS.Utils.PunyCode = (function() {
    var g = 128;
    var l = 72;
    var a = "-";
    var c = 36;
    var e = 700;
    var b = 1;
    var h = 26;
    var o = 38;
    var d = 2147483647;

    function m(s) {
        var r = [],
            t = 0,
            q = s.length,
            u, p;
        while (t < q) {
            u = s.charCodeAt(t++);
            if ((u & 63488) === 55296) {
                p = s.charCodeAt(t++);
                if (((u & 64512) !== 55296) || ((p & 64512) !== 56320)) {
                    throw new RangeError("UTF-16(decode): Illegal UTF-16 sequence")
                }
                u = ((u & 1023) << 10) + (p & 1023) + 65536
            }
            r.push(u)
        }
        return r
    }

    function f(r) {
        var q = [],
            s = 0,
            p = r.length,
            t;
        while (s < p) {
            t = r[s++];
            if ((t & 63488) === 55296) {
                throw new RangeError("UTF-16(encode): Illegal UTF-16 value")
            }
            if (t > 65535) {
                t -= 65536;
                q.push(String.fromCharCode(((t >>> 10) & 1023) | 55296));
                t = 56320 | (t & 1023)
            }
            q.push(String.fromCharCode(t))
        }
        return q.join("")
    }

    function k(p) {
        return p - 48 < 10 ? p - 22 : p - 65 < 26 ? p - 65 : p - 97 < 26 ? p - 97 : c
    }

    function n(q, p) {
        return q + 22 + 75 * (q < 26) - ((p !== 0) << 5)
    }

    function j(s, r, q) {
        var p;
        s = q ? Math.floor(s / e) : (s >> 1);
        s += Math.floor(s / r);
        for (p = 0; s > (((c - b) * h) >> 1); p += c) {
            s = Math.floor(s / (c - b))
        }
        return Math.floor(p + (c - b + 1) * s / (s + o))
    }

    function i(q, p) {
        q -= (q - 97 < 26) << 5;
        return q + ((!p && (q - 65 < 26)) << 5)
    }
    return {
        decode: function(x, r) {
            var u = [];
            var I = [];
            var C = x.length;
            var B, G, F, s, q, E, A, p, v, D, z, y, H;
            B = g;
            F = 0;
            s = l;
            q = x.lastIndexOf(a);
            if (q < 0) {
                q = 0
            }
            for (E = 0; E < q; ++E) {
                if (r) {
                    I[u.length] = (x.charCodeAt(E) - 65 < 26)
                }
                if (x.charCodeAt(E) >= 128) {
                    throw new RangeError("Illegal input >= 0x80")
                }
                u.push(x.charCodeAt(E))
            }
            for (A = q > 0 ? q + 1 : 0; A < C;) {
                for (p = F, v = 1, D = c;; D += c) {
                    if (A >= C) {
                        throw new RangeError("punycode_bad_input(1)")
                    }
                    z = k(x.charCodeAt(A++));
                    if (z >= c) {
                        throw new RangeError("punycode_bad_input(2)")
                    }
                    if (z > Math.floor((d - F) / v)) {
                        throw new RangeError("punycode_overflow(1)")
                    }
                    F += z * v;
                    y = D <= s ? b : D >= s + h ? h : D - s;
                    if (z < y) {
                        break
                    }
                    if (v > Math.floor(d / (c - y))) {
                        throw new RangeError("punycode_overflow(2)")
                    }
                    v *= (c - y)
                }
                G = u.length + 1;
                s = j(F - p, G, p === 0);
                if (Math.floor(F / G) > d - B) {
                    throw new RangeError("punycode_overflow(3)")
                }
                B += Math.floor(F / G);
                F %= G;
                if (r) {
                    I.splice(F, 0, x.charCodeAt(A - 1) - 65 < 26)
                }
                u.splice(F, 0, B);
                F++
            }
            if (r) {
                for (F = 0, H = u.length; F < H; F++) {
                    if (I[F]) {
                        u[F] = (String.fromCharCode(u[F]).toUpperCase()).charCodeAt(0)
                    }
                }
            }
            return f(u)
        },
        encode: function(E, p) {
            var v, G, A, D, B, z, w, s, y, H, F, r;
            if (p) {
                r = m(E)
            }
            E = m(E.toLowerCase());
            var C = E.length;
            if (p) {
                for (z = 0; z < C; z++) {
                    r[z] = E[z] != r[z]
                }
            }
            var x = "",
                u = [];
            v = g;
            G = 0;
            B = l;
            for (z = 0; z < C; ++z) {
                if (E[z] < 128) {
                    u.push(String.fromCharCode(r ? i(E[z], r[z]) : E[z]))
                }
            }
            A = D = u.length;
            if (D && D < C) {
                u.push(a)
            }
            if (D < C) {
                x = "xn--"
            }
            while (A < C) {
                for (w = d, z = 0; z < C; ++z) {
                    F = E[z];
                    if (F >= v && F < w) {
                        w = F
                    }
                }
                if (w - v > Math.floor((d - G) / (A + 1))) {
                    throw new RangeError("punycode_overflow (1)")
                }
                G += (w - v) * (A + 1);
                v = w;
                for (z = 0; z < C; ++z) {
                    F = E[z];
                    if (F < v) {
                        if (++G > d) {
                            return Error("punycode_overflow(2)")
                        }
                    }
                    if (F == v) {
                        for (s = G, y = c;; y += c) {
                            H = y <= B ? b : y >= B + h ? h : y - B;
                            if (s < H) {
                                break
                            }
                            u.push(String.fromCharCode(n(H + (s - H) % (c - H), 0)));
                            s = Math.floor((s - H) / (c - H))
                        }
                        u.push(String.fromCharCode(n(s, p && r[z] ? 1 : 0)));
                        B = j(G, A + 1, A == D);
                        G = 0;
                        ++A
                    }
                }++G;
                ++v
            }
            return x + u.join("")
        }
    }
})();
Ext.namespace("SYNO.SDS.Utils.StorageUtils");
SYNO.SDS.Utils.StorageUtils.ISCSITRG_UNIT_GB = 1024 * 1024 * 1024;
SYNO.SDS.Utils.StorageUtils.ISCSIVAAILUN_EP_SIZE = function(c) {
    var g = 1048576;
    var a = 4096;
    var d = 63;
    var e = 512;
    var b;
    var f;
    b = ((c / a + (d - 1)) / d);
    b = Math.floor(b);
    f = ((b * e) + g);
    return f
};
SYNO.SDS.Utils.StorageUtils.SpaceIDParser = function(e) {
    var b = e.split("_");
    var c = "";
    var a = "";
    var d = "";
    if ("hotspare" === e) {
        return {
            type: "hotspare",
            num: "",
            str: _T("volume", "volume_hot_spare")
        }
    }
    if (2 != b.length) {
        return ""
    }
    c = b[0];
    a = b[1];
    switch (c) {
        case "pool":
        case "reuse":
            if ("yes" === _D("supportraidgroup", "no")) {
                d = String.format("{0} {1}", _T("volume", "volume_storage_pool"), a)
            } else {
                d = String.format("{0} {1}", _T("volume", "volume_pool"), a)
            }
            break;
        case "volume":
            d = String.format("{0} {1}", _T("volume", "volume"), a);
            break;
        case "iscsilun":
            c = "iscsi";
            d = String.format("{0} ({1})", _T("volume", "volume_iscsitrg_lun"), a);
            break;
        case "virtual":
            d = String.format("{0} {1}", _T("volume", "volume_virtual_space"), a);
            break;
        case "volumeX":
            c = "volume";
            d = String.format("{0} {1} ({2})", _T("volume", "volume"), a, _T("volume", "volume_expansion"));
            break;
        case "ssd":
            d = String.format("{0} {1}", _T("volume", "ssd_cache"), a);
            break
    }
    return {
        type: c,
        num: a,
        str: d
    }
};
SYNO.SDS.Utils.StorageUtils.GetSizeGB = function(b, f) {
    var e = Ext.isNumber(f);
    var c = Math.pow(10, (e) ? f : 2);
    var d = b / SYNO.SDS.Utils.StorageUtils.ISCSITRG_UNIT_GB;
    var a = d;
    if (c > 1) {
        a = Math.round(d * c) / c
    } else {
        if (c == 1) {
            a = d.floor()
        }
    }
    return a
};
SYNO.SDS.Utils.StorageUtils.UiRenderHelperInitializer = function() {
    var j = "blue-status",
        i = "red-status",
        o = "green-status",
        f = {
            normal: {
                text: _T("volume", "volume_status_normal"),
                color: o
            },
            degrade: {
                text: _T("volume", "volume_status_degrade"),
                color: i
            },
            crashed: {
                text: _T("volume", "volume_status_crashed"),
                color: i
            },
            moving: {
                text: _T("iscsitrg", "iscsitrg_status_moving"),
                color: j
            },
            creating: {
                text: _T("volume", "volume_status_create"),
                color: j
            },
            repairing: {
                text: _T("volume", "volume_status_repair"),
                color: j
            },
            expanding: {
                text: _T("volume", "volume_status_expand"),
                color: j
            },
            migrating: {
                text: _T("volume", "volume_status_upgrade"),
                color: j
            },
            adding_disk: {
                text: _T("volume", "volume_status_add_disk"),
                color: j
            },
            deleting: {
                text: _T("volume", "volume_status_delete"),
                color: j
            },
            raid_syncing: {
                text: _T("volume", "volume_status_resync"),
                color: j
            },
            raid_reshaping: {
                text: _T("volume", "volume_adddisk_progress_reshape"),
                color: j
            },
            raid_parity_checking: {
                text: _T("volume", "volume_status_paritycount"),
                color: j
            },
            background: {
                text: _T("volume", "volume_status_background"),
                color: j,
                warningText: _T("volume", "performance_degraded"),
                warningColor: i
            },
            processing: {
                text: _T("volume", "volume_status_delayed"),
                color: j
            },
            offline: {
                text: _T("iscsitrg", "iscsitrg_status_offline"),
                color: i
            },
            online: {
                text: _T("iscsitrg", "iscsitrg_status_online"),
                color: o
            },
            connected: {
                text: _T("iscsitrg", "iscsitrg_status_connected"),
                color: j
            },
            waiting: {
                text: _T("volume", "volume_status_waiting"),
                color: j
            },
            mount_ssd: {
                text: _T("volume", "volume_ssd_mounting"),
                color: j
            },
            umount_ssd: {
                text: _T("volume", "volume_ssd_unmounting"),
                color: j
            },
            mounting_cache: {
                text: _T("volume", "volume_mounting_cache"),
                color: j
            },
            unmounting_cache: {
                text: _T("volume", "volume_unmounting_cache"),
                color: j
            },
            unavailabling: {
                text: _T("iscsilun", "iscsilun_vaai_lun_bad"),
                color: i
            },
            Healthy: {
                text: _T("iscsilun", "healthy"),
                color: o
            },
            Unhealthy: {
                text: _T("iscsilun", "unhealthy"),
                color: i
            },
            restoring: {
                text: _T("iscsilun", "restoring"),
                color: j
            },
            cloning: {
                text: _T("iscsilun", "cloning"),
                color: j
            },
            be_cloning: {
                text: _T("iscsilun", "using"),
                color: j
            },
            using: {
                text: _T("iscsilun", "using"),
                color: j
            },
            snapshotting: {
                text: _T("iscsilun", "using"),
                color: j
            },
            snapshot_deleting: {
                text: _T("iscsilun", "snapshot_deleting"),
                color: j
            },
            expand_unfinished_shr: {
                text: _T("volume", "volume_status_expand"),
                color: j
            },
            disk_check: {
                text: _T("volume", "volume_status_check_disk"),
                color: j
            },
            data_scrubbing: {
                text: _T("volume", "do_data_scrubbing"),
                color: j
            },
            fs_scrubbing: {
                text: _T("volume", "do_fs_scrubbing"),
                color: j,
                warningText: _T("volume", "performance_may_degraded"),
                warningColor: i
            },
            defrag: {
                text: _T("volume", "do_fs_defrag"),
                color: j,
                warningText: _T("volume", "performance_may_degraded"),
                warningColor: i
            },
            ssd_trimming: {
                text: _T("volume", "volume_ssd_trimming"),
                color: j,
                warningText: _T("volume", "volume_ssd_trimming_warn"),
                warningColor: j
            },
            space_missing: {
                text: _T("volume", "space_missing"),
                color: i
            },
            cache_missing: {
                text: _T("volume", "cache_missing"),
                color: i
            }
        },
        d = {
            mk_filesystem: _T("volume", "volume_status_create_fs"),
            resize_filesystem: _T("volume", "volume_status_expand_fs"),
            initializing_inode_table: _T("volume", "initializing_inode_table"),
            disk_initialize: _T("volume", "volume_status_init_disk"),
            raid_syncing: _T("volume", "volume_status_resync"),
            data_scrubbing: _T("volume", "do_data_scrubbing"),
            fs_scrubbing: _T("volume", "do_fs_scrubbing"),
            defrag: _T("volume", "do_fs_defrag"),
            raid_reshaping: _T("volume", "volume_adddisk_progress_reshape"),
            raid_parity_checking: _T("volume", "volume_status_paritycount"),
            finalize: _T("volume", "volume_status_finalize_vol"),
            stop_services: _T("volume", "volume_status_stop_services"),
            start_services: _T("volume", "volume_status_start_services"),
            disk_check: _T("volume", "volume_status_check_disk"),
            umount_volume: _T("volume", "volume_unmount_volume"),
            mount_volume: _T("volume", "volume_mount_volume"),
            stop_iscsi: _T("iscsilun", "iscsilun_stop_iscsi_service"),
            start_iscsi: _T("iscsilun", "iscsilun_start_iscsi_service"),
            stop_pool: _T("volume", "volume_stop_raid"),
            start_pool: _T("volume", "volume_start_raid"),
            allocate_space: _T("volume", "volume_allocate_space"),
            waiting: _T("volume", "volume_status_waiting"),
            flushing: _T("volume", "ssd_cache_flushing"),
            none: ""
        },
        n = function(p) {
            var q = {};
            var r = 1;
            var s = _T("common", "size_byte");
            if (p >= 1099511627776) {
                r = 1099511627776;
                s = _T("common", "size_tb")
            } else {
                if (p >= 1073741824) {
                    r = 1073741824;
                    s = _T("common", "size_gb")
                } else {
                    if (p >= 1048576) {
                        r = 1048576;
                        s = _T("common", "size_mb")
                    } else {
                        if (p >= 1024) {
                            r = 1024;
                            s = _T("common", "size_kb")
                        } else {
                            r = 1;
                            s = _T("common", "size_byte")
                        }
                    }
                }
            }
            q.unit = r;
            q.strUnit = s;
            return q
        },
        l = {
            media: _T("tree", "leaf_mediaservice"),
            itunes: _T("tree", "leaf_itunes"),
            audio: _T("tree", "leaf_audio"),
            photo: _T("tree", "leaf_photo"),
            netbkp: _T("tree", "leaf_netbkp"),
            web: _T("tree", "leaf_web"),
            download: _T("tree", "node_download"),
            mysql: _T("tree", "leaf_mysql"),
            surveillance: _T("tree", "leaf_surveillance"),
            userhome: _T("user", "user_home")
        },
        k = {
            media: undefined,
            audio: "SYNO.SDS.AudioStation.Application",
            itunes: undefined,
            photo: "SYNO.SDS.PhotoStation",
            web: "SYNO.SDS.WebStation",
            netbkp: undefined,
            download: "SYNO.SDS.DownloadStation",
            mysql: undefined,
            surveillance: "SYNO.SDS.SurveillanceStation",
            userhome: undefined,
            weblocal: undefined
        },
        c = String.format("({0})", _T("volume", "volume_add_tip_dataprotection")),
        b = String.format("({0})", _T("volume", "volume_add_tip_dataprotection_by_1_disk")),
        h = String.format("({0})", _T("volume", "volume_add_tip_dataprotection_by_2_disks")),
        g = String.format("({0})", _T("volume", "volume_add_tip_nodataprotection")),
        a = {
            shr_without_disk_protect: {
                text: _T("volume", "volume_type_raid_shr"),
                tip: g
            },
            shr_with_1_disk_protect: {
                text: _T("volume", "volume_type_raid_shr"),
                tip: b
            },
            shr_with_2_disk_protect: {
                text: _T("volume", "volume_type_raid_shr"),
                tip: h
            },
            basic: {
                text: _T("volume", "volume_generalhd"),
                tip: g
            },
            raid_linear: {
                text: _T("volume", "volume_type_linear"),
                tip: g
            },
            raid_0: {
                text: _T("volume", "volume_type_raid_0"),
                tip: g
            },
            raid_1: {
                text: _T("volume", "volume_type_raid_1"),
                tip: c
            },
            raid_5: {
                text: _T("volume", "volume_type_raid_5"),
                tip: c
            },
            "raid_5+spare": {
                text: _T("volume", "volume_type_raid_5") + "+Spare",
                tip: c
            },
            raid_6: {
                text: _T("volume", "volume_type_raid_6"),
                tip: c
            },
            raid_10: {
                text: _T("volume", "volume_type_raid_10"),
                tip: c
            }
        },
        m = {
            sys_partition_normal: {
                text: _T("volume", "volume_disksysuse"),
                color: "green-status"
            },
            not_use: {
                text: _T("volume", "volume_disknotuse"),
                color: "green-status"
            },
            normal: {
                text: _T("volume", "volume_diskinuse"),
                color: "green-status"
            },
            crashed: {
                text: _T("volume", "volume_diskfailed"),
                color: "red-status"
            },
            system_crashed: {
                text: _T("volume", "volume_diskfailedsys"),
                color: "red-status"
            },
            hotspare: {
                text: _T("volume", "volume_hot_spare"),
                color: "green-status"
            },
            unc_warning: {
                text: _T("disk_info", "disk_bad_sector_thr_warn"),
                color: "orange-status"
            }
        },
        e = {
            safe: {
                text: _T("volume", "volume_status_normal"),
                fullText: _T("volume", "volume_status_normal"),
                color: "green-status"
            },
            damage: {
                text: _T("smart", "smart_status_abnormal"),
                fullText: _T("smart", "smart_status_abnormal_full_text"),
                color: "red-status"
            },
            danger: {
                text: _T("smart", "smart_status_abnormal"),
                fullText: _T("smart", "smart_status_abnormal_full_text"),
                color: "red-status"
            },
            unknown: {
                text: _T("common", "not_support"),
                fullText: _T("volume", "volume_status_normal"),
                color: ""
            }
        };
    return {
        SizeRenderWithFloor: function(q, x) {
            var w = Ext.isNumber(x);
            var s = Math.pow(10, (w) ? x : 2);
            var u = 0;
            var p = 0;
            var t = {
                unit: 1,
                strUnit: ""
            };
            t = n(q);
            u = q / t.unit;
            if (s > 1) {
                p = Math.floor(u * s) / s
            } else {
                p = Math.floor(u)
            }
            if ((p - Math.floor(p)) > 0) {
                p = p.toFixed(2)
            }
            return String.format("{0} {1}", p, t.strUnit)
        },
        GetSizeUnitWithFloor: function(q, x) {
            var w = Ext.isNumber(x);
            var s = Math.pow(10, (w) ? x : 2);
            var u = 0;
            var p = 0;
            var t = {
                unit: 1,
                strUnit: ""
            };
            t = n(q);
            u = q / t.unit;
            if (s > 1) {
                p = Math.floor(u * s) / s
            } else {
                p = Math.floor(u)
            }
            if ((p - Math.floor(p)) > 0) {
                p = p.toFixed(2)
            }
            return {
                size: p,
                unit: t.strUnit
            }
        },
        SizeRender: function(q, x) {
            var w = Ext.isNumber(x);
            var s = Math.pow(10, (w) ? x : 2);
            var u = 0;
            var p = 0;
            var t = {
                unit: 1,
                strUnit: ""
            };
            t = n(q);
            u = q / t.unit;
            if (s > 1) {
                p = Math.round(u * s) / s
            } else {
                p = u
            }
            if ((p - Math.floor(p)) > 0) {
                p = p.toFixed(2)
            }
            return String.format("{0} {1}", p, t.strUnit)
        },
        GetSizeUnit: function(q, x) {
            var w = Ext.isNumber(x);
            var s = Math.pow(10, (w) ? x : 2);
            var u = 0;
            var p = 0;
            var t = {
                unit: 1,
                strUnit: ""
            };
            t = n(q);
            u = q / t.unit;
            if (s > 1) {
                p = Math.round(u * s) / s
            } else {
                p = u
            }
            if ((p - Math.floor(p)) > 0) {
                p = p.toFixed(1)
            }
            return {
                size: p,
                unit: t.strUnit
            }
        },
        StatusRender: function(p, q) {
            return SYNO.SDS.Utils.StorageUtils.UiRenderHelper.StatusNameRender(p) + " " + SYNO.SDS.Utils.StorageUtils.UiRenderHelper.ProgressRender(q)
        },
        LunStatusRender: function(p, q) {
            if (0 === q.percent) {
                return String.format("{0}<span class='blue-status' style='white-space:nowrap'>({1})</span>", SYNO.SDS.Utils.StorageUtils.UiRenderHelper.StatusNameRender(p), f.waiting.text)
            }
            return SYNO.SDS.Utils.StorageUtils.UiRenderHelper.StatusNameRender(p) + " " + SYNO.SDS.Utils.StorageUtils.UiRenderHelper.ProgressRender(q)
        },
        StatusNameRender: function(p) {
            var q;
            if (p in f) {
                q = f[p]
            } else {
                return ""
            }
            return String.format('<span class="{0}">{1}</span>', q.color, q.text)
        },
        ProgressRender: function(p) {
            var q = "";
            if (!p || !p.step || !p.percent) {
                return ""
            } else {
                if ("none" === p.step && "-1" === p.percent) {
                    return ""
                } else {
                    if ("none" !== p.step && "-1" === p.percent) {
                        return String.format("({0})", SYNO.SDS.Utils.StorageUtils.UiRenderHelper.StepNameRender(p.step))
                    } else {
                        if ("none" === p.step && "-1" !== p.percent) {
                            return String.format("({0})", SYNO.SDS.Utils.StorageUtils.UiRenderHelper.PercentRender(p.percent))
                        } else {
                            if ("waiting" === p.step) {
                                if ("-1" !== p.percent) {
                                    return String.format("{0}", SYNO.SDS.Utils.StorageUtils.UiRenderHelper.PercentRender(p.percent))
                                } else {
                                    return ""
                                }
                            } else {
                                if ("initializing_inode_table" === p.step) {
                                    return String.format("({0} {1})<br><span class='blue-status'>{2}</span>", SYNO.SDS.Utils.StorageUtils.UiRenderHelper.StepNameRender(p.step), SYNO.SDS.Utils.StorageUtils.UiRenderHelper.PercentRender(p.percent), _T("volume", "initializing_inode_table_help"))
                                } else {
                                    if ("fs_scrubbing" === p.step) {
                                        return String.format("({0})", SYNO.SDS.Utils.StorageUtils.UiRenderHelper.PercentRender(p.percent))
                                    } else {
                                        if ("defrag" === p.step) {
                                            q = String.format(_T("volume", "fs_defrag_progress"), p.defragged_files, p.analyzed_files);
                                            return String.format("({0})", String.format('<span class="blue-status">{0}</span>', q))
                                        } else {
                                            return String.format("({0} {1})", SYNO.SDS.Utils.StorageUtils.UiRenderHelper.StepNameRender(p.step), SYNO.SDS.Utils.StorageUtils.UiRenderHelper.PercentRender(p.percent))
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        WarningTextRender: function(q, p) {
            var r;
            if (q in f) {
                r = f[q]
            } else {
                return ""
            }
            if (r.warningText) {
                var s = String.format('<br /><span class="{0}">{1}</span><br />', r.warningColor, r.warningText);
                return String.format(s, p)
            } else {
                return ""
            }
        },
        StepNameRender: function(p) {
            if (p in d) {
                return String.format('<span class="blue-status">{0}</span>', d[p])
            } else {
                return ""
            }
        },
        PercentRender: function(p) {
            var q = "";
            if ("-1" == p) {
                q = ""
            } else {
                q = String.format('<span class="blue-status">{0}%</span>', p)
            }
            return q
        },
        RaidLevelRender: function(p) {
            if (-1 < p.indexOf("shr")) {
                return "SHR"
            }
            if (p in a) {
                return a[p].text
            }
            return ""
        },
        SpaceTypeRender: function(s, r) {
            var p = "",
                t = "";
            var q = null;
            if (s in a) {
                p = a[s].text;
                t = a[s].tip
            } else {
                if (0 === s.indexOf("expansion")) {
                    p = _T("volume", "volume_type_expansion");
                    q = s.split(":");
                    t = String.format("({0} + {1})", SYNO.SDS.Utils.StorageUtils.UiRenderHelper.DeviceTypeRender(q[1]), SYNO.SDS.Utils.StorageUtils.UiRenderHelper.DeviceTypeRender(q[2]))
                } else {
                    SYNO.Debug.warn("unknown space type: ", s)
                }
            }
            switch (s) {
                case "shr_without_disk_protect":
                case "basic":
                case "raid_linear":
                case "raid_0":
                    if (r !== false) {
                        return String.format('{0} <font class="red-status">{1}</font>', p, t)
                    }
                    break
            }
            return String.format("{0} {1}", p, t)
        },
        DeviceTypeRender: function(p) {
            if (p in a) {
                return a[p].text
            } else {
                return "unknown"
            }
        },
        ParseID: function(q) {
            var p = {
                id: 0,
                location: ""
            };
            if (!isNaN(q)) {
                p.id = q;
                p.location = "internal"
            } else {
                if ("X" == q.charAt(0)) {
                    p.id = q.substring(1);
                    p.location = "ebox"
                } else {
                    p.id = q;
                    p.location = "internal"
                }
            }
            return p
        },
        DiskIDRender: function(q) {
            var p = "";
            var r = SYNO.SDS.Utils.StorageUtils.UiRenderHelper.ParseID(q);
            if ("ebox" == r.location) {
                p = String.format("{0} {1} ({2})", _T("volume", "volume_disk"), r.id, _T("volume", "volume_expansion"))
            } else {
                p = String.format("{0} {1}", _T("volume", "volume_disk"), r.id)
            }
            return p
        },
        DiskStatusRender: function(p) {
            var q = m[p];
            if (q) {
                return String.format('<span class="{0}">{1}</span>', q.color, q.text)
            } else {
                if (null !== p.match("%")) {
                    return String.format('<span class="blue-status">{0}</span>', _T("disk_info", "disk_secure_erasing") + ": " + p)
                } else {
                    return ""
                }
            }
        },
        DiskSwapStatusRender: function(p) {
            switch (p) {
                case "normal":
                    return '<span class="green-status">' + _T("volume", "volume_diskinuse") + "</span>";
                case "failed":
                case "crashed":
                    return '<span class="red-status">' + _T("volume", "volume_diskfailed") + "</span>";
                case "rebuild":
                    return '<span class="blue-status">' + _T("volume", "volume_disk_rebuild") + "</span>";
                case "spare":
                    return '<span class="blue-status">' + _T("volume", "volume_status_waiting") + "</span>";
                case "deleting":
                    return '<span class="blue-status">' + _T("volume", "swap_device_removing") + "</span>";
                case "none":
                    return "-"
            }
        },
        smartStatusRender: function(p) {
            var q = e[p];
            if (q) {
                return String.format('<span class="{0}">{1}</span>', q.color, q.text)
            } else {
                if (!p) {
                    return String.format('<span class="green-status">{0}</span>', _T("common", "loading"))
                } else {
                    if ("-1" === p) {
                        return String.format('<span class="green-status">{0}</span>', _T("smart", "smart_test_remain") + ": " + _T("background_task", "task_processing"))
                    } else {
                        return String.format('<span class="green-status">{0}</span>', _T("smart", "smart_test_remain") + ": " + p)
                    }
                }
            }
        },
        DiskSummaryStatusRender: function(t, u) {
            var q = m[t],
                s = e[u],
                v = "",
                p = "",
                r = "";
            if ("crashed" === t || "system_crashed" === t || "damage" === u || "danger" === u) {
                p = "red-status"
            } else {
                if ("unc_warning" === t) {
                    p = "orange-status"
                } else {
                    p = "green-status"
                }
            }
            if (!q) {
                if (null !== t.match("%")) {
                    p = "blue-status";
                    r = _T("disk_info", "disk_secure_erasing") + ": " + t
                } else {
                    r = ""
                }
            } else {
                r = q.text
            }
            if (!u) {
                return String.format('<span class="{0}">{1}</span>', p, r)
            }
            if (!s) {
                if ("-1" === u) {
                    v = _T("smart", "smart_test_remain") + ": " + _T("background_task", "task_processing")
                } else {
                    v = _T("smart", "smart_test_remain") + ": " + u
                }
            } else {
                v = s.fullText
            }
            if ("normal" === t) {
                return String.format('<span class="{0}">{1}</span>', p, v)
            }
            if ("safe" === u || "unknown" === u) {
                return String.format('<span class="{0}">{1}</span>', p, r)
            } else {
                return String.format('<span class="{0}">{1}, {2}</span>', p, r, v)
            }
        },
        AddDiskTypeRender: function(p) {
            switch (p) {
                case "repair":
                    return _T("volume", "volume_adddisk2_type_repair");
                case "data_scrubbing":
                    return _T("volume", "volume_scrubbing_type_raid");
                case "repair_sys_partition":
                    return _T("volume", "volume_repair_syspart");
                case "expand_by_disk":
                    return _T("volume", "volume_adddisk2_type_expand_disk");
                case "expand_with_unalloc_size":
                    return _T("volume", "volume_adddisk2_type_expand_size");
                case "migrate":
                    return _T("volume", "volume_adddisk2_type_migrate");
                case "expand_unfinished_shr":
                    return _T("volume", "volume_adddisk2_type_expand_size")
            }
        },
        MigrateTypeRender: function(p) {
            switch (p) {
                case "add_mirror":
                    return _T("volume", "volume_migrate_add_mirror");
                case "to_raid1":
                    return _T("volume", "volume_migrate_to_raid1");
                case "to_raid5":
                    return _T("volume", "volume_migrate_to_raid5");
                case "to_raid5+spare":
                    return _T("volume", "volume_migrate_to_raid5_spare");
                case "to_raid6":
                    return _T("volume", "volume_migrate_to_raid6")
            }
        },
        TargetStatusRender: function(s, t) {
            var p = "";
            var r = false;
            var q;
            switch (s) {
                case "processing":
                case "creating":
                case "deleting":
                    r = true;
                    break
            }
            if (s in f) {
                q = f[s]
            } else {
                return ""
            }
            p = String.format('<span class="{0}">{1}</span>', q.color, q.text);
            if (0 === t && r) {
                p = String.format("{0}<span class='{1}' style='white-space:nowrap'>({2})</span>", p, f.waiting.color, f.waiting.text)
            }
            return p
        },
        SpareStatusRender: function(p, r, q) {
            if ("none" === p) {
                return String.format('<span class="red-status">{0}</span>', _T("volume", "volume_status_deverr"))
            } else {
                if ("repairing" == p) {
                    if (r && q) {
                        return String.format('<span class="blue-status">{0} {1}, {2} {3}</span>', _T("volume", "volume_status_repair"), r, _T("volume", "volume_raid_subgroup"), q)
                    } else {
                        if (r) {
                            return String.format('<span class="blue-status">{0} ({1})</span>', _T("volume", "volume_status_repair"), r)
                        } else {
                            return String.format('<span class="blue-status">{0}</span>', _T("volume", "volume_status_repair"))
                        }
                    }
                } else {
                    if ("standby" == p) {
                        return String.format('<span class="green-status">{0}</span>', _T("volume", "volume_hot_spare"))
                    } else {
                        return "&nbsp;"
                    }
                }
            }
        },
        SnapShotStatusRender: function(p) {
            return SYNO.SDS.Utils.StorageUtils.UiRenderHelper.StatusRender(p.type, p.progress)
        },
        getErrorMsg: function(p) {
            var q = _T("common", "commfail");
            if (p.errinfo && p.errinfo.sec && p.errinfo.key) {
                q = _T(p.errinfo.sec, p.errinfo.key);
                if (Ext.isArray(p.errinfo.params)) {
                    p.errinfo.params.unshift(q);
                    q = String.format.apply(String, p.errinfo.params)
                } else {
                    if (Ext.isString(p.errinfo.params)) {
                        q = String.format(q, p.errinfo.params)
                    }
                }
            }
            return q
        },
        decodeResponse: function(t, p) {
            var r = null;
            var q = {
                success: false,
                text: _T("common", "commfail")
            };
            if (!t || !p) {
                SYNO.Debug.error("response fail");
                return q
            }
            try {
                r = Ext.util.JSON.decode(p.responseText)
            } catch (s) {
                q.text = "json decode error: " + s;
                return q
            }
            if (!r) {
                q.text = "json decode error";
                return q
            }
            if (!r.success) {
                r.text = SYNO.SDS.Utils.StorageUtils.UiRenderHelper.getErrorMsg(r)
            }
            return r
        },
        htmlEncoder: function(p) {
            p = p.replace(/</g, "&lt;");
            p = p.replace(/>/g, "&gt;");
            return p
        },
        htmlDecoder: function(p) {
            if (!p) {
                return ""
            }
            p = p.replace(/&lt;/g, "<");
            p = p.replace(/&gt;/g, ">");
            return p
        },
        getServiceNames: function(p) {
            var r = [];
            var q = [];
            Ext.each(p, function(t) {
                if (t in l) {
                    r.push(l[t])
                } else {
                    if (-1 != t.lastIndexOf(":")) {
                        q = t.split(":");
                        r.push(_T(q[0], q[1]))
                    } else {
                        r.push(t)
                    }
                }
            });
            return r.join(", ")
        },
        getVolumeNames: function(r) {
            var p = this,
                q = [];
            Ext.each(r, function(s) {
                if (Ext.isString(s)) {
                    q.push(p.SpaceIDParser(s).str)
                } else {
                    if (s.name) {
                        q.push(p.SpaceIDParser(s.name).str)
                    } else {
                        if (s.id) {
                            q.push(p.SpaceIDParser(s.id).str)
                        }
                    }
                }
            });
            return q.join(", ")
        },
        getNamesString: function(q) {
            var p = [];
            Ext.each(q, function(r) {
                p.push(r.name)
            });
            return p.join(", ")
        },
        disableServices: function(p) {
            Ext.each(p, function(q) {
                if (Ext.isString(k[q])) {
                    SYNO.SDS.StatusNotifier.setServiceDisabled(k[q], true)
                }
            })
        },
        DiskTemperatureRender: function(p) {
            if (-1 === p) {
                return "-"
            }
            return String.format("{0} {1} / {2} {3}", p, _T("status", "celsius"), (p * 9 / 5 + 32).toFixed(0), _T("status", "fahrenheit"))
        },
        DiskNameRenderer: function(s) {
            var q = s.match(/(\d+)( \((.*)\))*/),
                t, r, p;
            if (!q || 4 != q.length) {
                return s
            }
            t = q[1];
            if (undefined === q[2] || "" === q[2] || undefined === q[3] || "" === q[3]) {
                return String.format("{0} {1}", _T("volume", "volume_disk"), t)
            }
            p = q[3];
            if (0 <= p.indexOf("DX") || 0 <= p.indexOf("RX")) {
                return String.format("{0} {1} ({2})", _T("volume", "volume_disk"), t, p)
            }
            if (-1 === p.indexOf("-")) {
                if ("no" === _D("supportsas", "no")) {
                    return String.format("{0} {1} ({2})", _T("volume", "volume_disk"), t, _T("volume", "volume_expansion"))
                } else {
                    return String.format("{0} {1} ({2})", _T("volume", "volume_disk"), t, _T("volume", "volume_unknown_expansion"))
                }
            }
            r = p.split("-");
            return String.format("{0} {1} ({2} {3})", _T("volume", "volume_disk"), t, _T("volume", "volume_expansion"), r[1])
        }
    }
};
SYNO.SDS.Utils.StorageUtils.UiRenderHelper = SYNO.SDS.Utils.StorageUtils.UiRenderHelperInitializer();
SYNO.SDS.Utils.StorageUtils.VolumeNameRenderer = function(b) {
    var d = /volume\D*(\d+)/,
        c, a;
    if (!Ext.isString(b)) {
        if ("internal" !== b.location) {
            return b.display_name || ""
        }
        if (!Ext.isString(b.volume_path)) {
            return ""
        }
        c = b.volume_path
    } else {
        c = b
    }
    a = c.match(d);
    if (!a || 2 !== a.length) {
        return ""
    }
    return String.format("{0} {1}", _T("volume", "volume"), a[1])
};
SYNO.SDS.Utils.StorageUtils.VolumeNameSizeRenderer = function(c) {
    var a, b;
    a = SYNO.SDS.Utils.StorageUtils.VolumeNameRenderer(c);
    b = SYNO.SDS.Utils.StorageUtils.UiRenderHelper.SizeRender(c.size_free_byte, 10);
    return String.format("{0}({1}{2} {3})", a, _T("volume", "volume_freesize"), _T("common", "colon"), b)
};
Ext.namespace("SYNO.SDS.Utils.Network");
SYNO.SDS.Utils.Network = {
    MacIPAnd: function(d, a) {
        var c;
        var b = [];
        var g, f, e;
        for (e = 0; e < 32; e++) {
            g = d % 2;
            f = a % 2;
            if ((g == 1) && (f == 1)) {
                b[e] = 1
            } else {
                b[e] = 0
            }
            d = (d - g) / 2;
            a = (a - f) / 2
        }
        c = 0;
        for (e = 31; e >= 0; e--) {
            c = c * 2 + b[e]
        }
        return c
    },
    GetIPValue: function(d) {
        var a = d.split(".");
        var c = 0;
        if (4 !== a.length) {
            return false
        }
        for (var b = 0; b <= 3; b++) {
            c *= 256;
            c += parseInt(a[b], 10)
        }
        return c
    },
    GetIPStr: function(b) {
        var c = [];
        for (var a = 0; a <= 3; a++) {
            c.push(Math.floor(b % 256));
            b = Math.floor(b / 256)
        }
        return String.format("{0}.{1}.{2}.{3}", c[3], c[2], c[1], c[0])
    },
    GatewayMatchIP: function(h, b, i) {
        var g = true;
        var d = SYNO.SDS.Utils.Network.GetIPValue(h);
        var a = SYNO.SDS.Utils.Network.GetIPValue(i);
        var c = SYNO.SDS.Utils.Network.GetIPValue(b);
        var f = SYNO.SDS.Utils.Network.MacIPAnd(d, a);
        var e = SYNO.SDS.Utils.Network.MacIPAnd(c, a);
        if (f === 0) {
            g = false
        } else {
            g = (f == e)
        }
        return g
    },
    idToString: function(h, f) {
        var e = "";
        var b = "";
        var c = {
            eth: "lan",
            br: "bridge",
            ovs_eth: "ovseth",
            ovs_bond: "ovsbond",
            wlan: "wificlient",
            gwlan: "wifiguest",
            bond: "bond",
            ppp: "pppoe",
            lbr: "local_bridge",
            gbr: "guest_bridge",
            ap: "wifiap",
            usbmodem: "usbmodem"
        };
        var a = {
            lan: _T("tcpip", "tcpip_lan_port"),
            wan: _T("network", "if_internet"),
            ovseth: _T("tcpip", "tcpip_lan_port"),
            ovsbond: _T("network", "if_bond"),
            wificlient: _T("network", "if_wireless"),
            wifiguest: _T("wireless_ap", "ap_guest_network"),
            bond: _T("network", "if_bond"),
            pppoe: _T("tree", "leaf_pppoe"),
            bridge: _T("tcpip", "tcpip_lan_port"),
            local_bridge: _T("network", "if_wireless_lan"),
            guest_bridge: _T("wireless_ap", "ap_guest_network"),
            wifiap: _T("network", "if_hotspot"),
            usbmodem: _T("network", "usbmodem_name"),
            vpn: _T("vpnc", "app_name"),
            docker: _TT("SYNO.SDS.Docker.Application", "app", "displayname")
        };
        if ("tun0" === h) {
            return a.vpn
        }
        if ("docker0" === h) {
            return a.docker
        }
        if (0 === h.indexOf("ddsm")) {
            return a.docker
        }
        var d = new RegExp(/^ppp[2-3][0-9]{2}$/);
        if (d.match(h)) {
            return a.vpn
        }
        var g = new RegExp(/^ppp1[0-9]{2}$/);
        if (g.match(h)) {
            return a.usbmodem
        }
        if ("pppoe" === h) {
            return a[h]
        }
        if (0 === h.indexOf("6in4-")) {
            return SYNO.SDS.Utils.Network.idToString.apply(this, [h.substring(5)]) + "(" + _T("tree", "leaf_tunnel") + ")"
        }
        e = h.replace(/\.\d+$/, "").replace(/\d+$/, "");
        b = h.replace(/\D+/, "").replace(/\.\d+$/, "");
        if (!f && (e in c)) {
            f = c[e]
        }
        if (f in a) {
            if (!SYNO.SDS.Utils.Network.isMultiLan.apply(this)) {
                switch (f) {
                    case "lan":
                    case "wan":
                        return a[f];
                    default:
                        break
                }
            }
            switch (f) {
                case "pppoe":
                case "bridge":
                case "local_bridge":
                case "guest_bridge":
                case "usbmodem":
                    return a[f];
                default:
                    b = parseInt(b, 10) + 1;
                    return a[f] + " " + b
            }
        } else {
            return "(unknown) " + h
        }
    },
    isPPPoE: function(a) {
        return "ppp0" === a
    },
    isMultiLan: function() {
        var a = "";
        if (SYNO.SDS.Utils.Network === this) {
            a = _D("maxlanport", "1")
        } else {
            a = this._D("maxlanport", "1")
        }
        return 1 < parseInt(a, 10)
    },
    checkExternalIP: function(c) {
        if (!c) {
            return false
        }
        var a, b;
        c = c.toLowerCase();
        if (!Ext.form.VTypes.looseip(c)) {
            return true
        }
        if (c.indexOf(".") < 0 && c.indexOf("fc00:") === 0) {
            return false
        }
        if (c.indexOf(".") < 0) {
            return false
        }
        b = c.split(".");
        for (a in b) {
            if (b.hasOwnProperty(a)) {
                b[a] = parseInt(b[a], 10)
            }
        }
        if (b[0] == 10) {
            return false
        } else {
            if (b[0] == 172 && (b[1] >= 16 && b[1] <= 31)) {
                return false
            } else {
                if (b[0] == 192 && b[1] == 168) {
                    return false
                }
            }
        }
        return true
    },
    getExternalHostName: function(b) {
        var a;
        if (_S("external_host_ip") && _S("external_host_ip") !== "") {
            a = _S("external_host_ip")
        } else {
            if (_S("rewrite_mode") && !Ext.isEmpty(_S("rewrite_host")) && Ext.isString(_S("rewrite_host"))) {
                a = _S("rewrite_host")
            } else {
                if (_S("ddns_hostname") && _S("ddns_hostname") !== "") {
                    a = _S("ddns_hostname")
                } else {
                    if (b && _S("external_ip") && _S("external_ip") !== "") {
                        a = _S("external_ip")
                    } else {
                        a = window.location.hostname
                    }
                }
            }
        }
        return a
    },
    getURLprefix: function(d) {
        var c, b, a;
        c = SYNO.SDS.Utils.Network.getExternalHostName(d);
        a = window.location.protocol + "//" + c;
        b = window.location.port;
        if (!_S("rewrite_mode")) {
            if (window.location.protocol === "https:") {
                b = (_S("external_port_dsm_https") && _S("external_port_dsm_https") !== "") ? _S("external_port_dsm_https") : window.location.port
            } else {
                b = (_S("external_port_dsm_http") && _S("external_port_dsm_http") !== "") ? _S("external_port_dsm_http") : window.location.port
            }
        }
        if (b) {
            a += ":" + b
        }
        return a
    },
    isSupportTopology: function() {
        var a = null;
        if (SYNO.SDS.Utils.Network === this) {
            a = _S("support_net_topology")
        } else {
            a = this._S("support_net_topology")
        }
        return "yes" === a
    }
};
Ext.namespace("SYNO.SDS.Relay");
SYNO.SDS.Relay.GenRelaydStatusStr = function() {
    var b = {
        err_unknown: _T("relayservice", "relayservice_err_unknown"),
        err_config: String.format(_T("relayservice", "relayservice_err_config"), "ERR_CONF"),
        err_register: String.format(_T("relayservice", "relayservice_err_register"), "ERR_REG"),
        err_network: _T("relayservice", "relayservice_err_network"),
        err_not_support: _T("relayservice", "relayservice_status_update_dsm"),
        err_resolv: _T("relayservice", "relayservice_err_resolv"),
        err_lock: String.format(_T("relayservice", "relayservice_err_lock"), "ERR_LOCK"),
        err_auth: _T("error", "error_auth"),
        err_server_limit: _T("relayservice", "relayservice_err_server_limit"),
        err_server_busy: String.format(_T("relayservice", "relayservice_err_server_busy"), "ERR_BUSY"),
        err_server_changed: String.format(_T("relayservice", "relayservice_err_register"), "ERR_REG"),
        success: undefined
    };
    var a = {
        not_running: _T("relayservice", "relayservice_disconnected"),
        starting: _T("relayservice", "relayservice_starting"),
        login: Ext.copyTo({
            success: _T("relayservice", "relayservice_login")
        }, b, "err_network,err_resolv,err_server_limit"),
        connected: Ext.copyTo({
            success: _T("relayservice", "relayservice_connected")
        }, b, "err_network,err_resolv"),
        direct_connect: _T("relayservice", "relayservice_direct_connect"),
        logout: _T("relayservice", "relayservice_stop"),
        stoped: Ext.applyIf({
            success: _T("relayservice", "relayservice_disconnected")
        }, b),
        "--": "--"
    };
    return function(d, c) {
        if (d in a) {
            if (Ext.isString(a[d])) {
                return a[d]
            }
            if (!Ext.isObject(a[d])) {
                throw Error("unknown status config")
            }
            if (c in a[d]) {
                return a[d][c]
            } else {
                return a[d].success
            }
        } else {
            if (c in b) {
                return a.stoped.success + "(" + b[c] + ")"
            } else {
                return a.stoped.success
            }
        }
    }
};
SYNO.SDS.Relay.GetRelaydStatusStr = SYNO.SDS.Relay.GenRelaydStatusStr();
Ext.ns("SYNO.SDS.Utils");
SYNO.SDS.Utils.TabPanel = Ext.extend(SYNO.ux.TabPanel, {
    module: null,
    constructor: function(a) {
        var b;
        b = Ext.apply({
            checkFormDirty: true,
            useStatusBar: !(false === a.useDefaultBtn && !a.buttons),
            useDefaultBtn: true,
            deferredRender: false,
            applyDirtyOnly: false,
            loadDirtyOnly: false,
            buttons: false !== a.useDefaultBtn ? [{
                xtype: "syno_button",
                btnStyle: "blue",
                disabled: _S("demo_mode"),
                tooltip: _S("demo_mode") ? _JSLIBSTR("uicommon", "error_demo") : "",
                text: _T("common", "commit"),
                scope: this,
                handler: this.applyHandler
            }, {
                xtype: "syno_button",
                btnStyle: "grey",
                text: _T("common", "reset"),
                scope: this,
                handler: this.cancelHandler
            }] : null
        }, a);
        b = this.addStatusBar(b);
        SYNO.SDS.Utils.TabPanel.superclass.constructor.call(this, b);
        this.addListener("beforetabchange", this.onBeforeTabChange, this)
    },
    addStatusBar: function(a) {
        if (!a.useStatusBar) {
            return a
        }
        var b = {
            xtype: "statusbar",
            defaultText: "&nbsp;",
            statusAlign: "left",
            buttonAlign: "left",
            items: []
        };
        if (a.buttons) {
            b.items = b.items.concat(a.buttons);
            delete a.buttons
        }
        Ext.applyIf(a, {
            fbar: b
        });
        return a
    },
    applyHandler: function(b, a) {
        this.applyAllForm()
    },
    cancelHandler: function(b, a) {
        this.resetAllForm()
    },
    getApiArray: function(d, c) {
        var b = [];
        this.items.each(function(f, a, e) {
            if (!(f instanceof SYNO.SDS.Utils.FormPanel)) {
                return
            }
            if (c && this.loadDirtyOnly && !f.getForm().isDirty()) {
                return
            }
            b = b.concat(f.getApiArray(d))
        }, this);
        return SYNO.ux.Utils.uniqueApiArray(b)
    },
    getAllForms: function() {
        var a = [];
        this.items.each(function(e, b, d) {
            if (!e.getForm) {
                return
            }
            var c = e.getForm();
            a.push(c)
        }, this);
        return a
    },
    loadAllForm: function(a) {
        var c = "get",
            b;
        if (false === this.onBeforeRequest(c)) {
            return false
        }
        b = this.getApiArray(c);
        b = this.processParams(c, b);
        this.sendAjaxRequest(c, b)
    },
    applyAllForm: function(a) {
        var d = "set",
            c;
        var b = {};
        if (false === this.onBeforeRequest(d)) {
            return false
        }
        this.items.each(function(i, f, h) {
            if (!(i instanceof SYNO.SDS.Utils.FormPanel)) {
                return
            }
            var g = i.getForm();
            if (this.applyDirtyOnly && !g.isDirty()) {
                return
            }
            var e = g.getValues(false, "set");
            Ext.apply(b, e)
        }, this);
        c = this.constructApplyParams(b);
        c = c.concat(this.getApiArray("get", true));
        c = this.processParams(d, c);
        this.sendAjaxRequest(d, c)
    },
    processParams: function(b, a) {
        this.items.each(function(f, c, e) {
            if (!(f instanceof SYNO.SDS.Utils.FormPanel)) {
                return
            }
            var d = f.getForm();
            if ("set" === b && this.applyDirtyOnly && !d.isDirty()) {
                return
            }
            a = f.processParams(b, a)
        }, this);
        return a
    },
    resetAllForm: function() {
        var a = this.getAllForms();
        Ext.each(a, function(d, b, c) {
            d.reset()
        }, this)
    },
    isAnyFormDirty: function() {
        var a = this.getAllForms();
        var b = false;
        Ext.each(a, function(e, c, d) {
            if (e.isDirty()) {
                b = true;
                return false
            }
        }, this);
        return b
    },
    getAjaxCfg: function(a) {
        return {}
    },
    getCompoundCfg: function(a) {
        return {}
    },
    sendAjaxRequest: function(e, d) {
        if ("get" === e) {
            this.setStatusBusy()
        } else {
            this.setStatusBusy({
                text: _T("common", "saving")
            })
        }
        var c = this.getAjaxCfg(e);
        var a = this.getCompoundCfg(e);
        var b = Ext.apply({
            params: {},
            compound: {
                stopwhenerror: false,
                params: d
            },
            scope: this,
            callback: function(h, g, f) {
                this.clearStatusBusy();
                if (h) {
                    this.onApiSuccess(e, g, f)
                } else {
                    this.onApiFailure(e, g, f)
                }
            }
        }, c);
        b.compound = Ext.apply(b.compound, a);
        this.sendWebAPI(b)
    },
    onBeforeRequest: function(e) {
        var b = false;
        this.items.each(function(h, f, g) {
            if (!(h instanceof SYNO.SDS.Utils.FormPanel)) {
                return
            }
            if (!h.onBeforeRequest(e)) {
                b = true;
                return false
            }
        }, this);
        if (b) {
            return false
        }
        if ("get" === e) {
            return true
        }
        if (this.checkFormDirty && !this.isAnyFormDirty()) {
            var d = _T("error", "nochange_subject");
            this.setStatusError({
                text: d,
                clear: true
            });
            return false
        }
        var a = this.getAllForms();
        var c = true;
        Ext.each(a, function(h, f, g) {
            if (!h.isValid()) {
                c = false;
                this.setStatusError({
                    text: _T("common", "forminvalid"),
                    clear: true
                });
                this.setActiveByForm(h, f);
                return false
            }
        }, this);
        return c
    },
    onApiSuccess: function(c, b, a) {
        if ("set" === c) {
            if (!b.has_fail) {
                this.setStatusOK()
            } else {}
        }
        this.processReturnData(c, b, a)
    },
    processReturnData: function(c, b, a) {
        this.items.each(function(g, d, f) {
            if (!(g instanceof SYNO.SDS.Utils.FormPanel)) {
                return
            }
            var e = g.getForm();
            if ("set" === c && this.applyDirtyOnly && !e.isDirty()) {
                return
            }
            g.processReturnData(c, b, a)
        }, this)
    },
    onApiFailure: function(b, a) {},
    onBeforeTabChange: function(d, b, e) {
        if (!b || b.disabled === true) {
            return false
        }
        var c = d.getFooterToolbar();
        if (!c) {
            return true
        }
        var a = c.getEl();
        if (!a) {
            c[b instanceof SYNO.SDS.Utils.FormPanel ? "show" : "hide"]();
            return true
        }
        if (a.parent() && a.parent().hasClass("x-tab-panel-footer")) {
            a = a.parent()
        }
        if (b instanceof SYNO.SDS.Utils.FormPanel) {
            a.show()
        } else {
            a.applyStyles({
                display: "none"
            })
        }
        d.doLayout(false, false);
        return true
    },
    setActiveByForm: function(c, b) {
        var a = this.getAllForms();
        if (Ext.isNumber(b) && this.items.getCount() === a.length) {
            this.setActiveTab(b)
        } else {
            this.items.each(function(g, e, d) {
                if (g.getForm && g.getForm() === c) {
                    this.setActiveTab(e);
                    return false
                }
            }, this)
        }
    },
    onPageDeactivate: function() {
        if (!this.checkFormDirty) {
            return true
        } else {
            if (this.isAnyFormDirty()) {
                return false
            }
        }
        return true
    },
    constructApplyParams: function(g) {
        var h, d = {},
            b = [],
            i, f, c, e, j;
        for (i in g) {
            if (g.hasOwnProperty(i)) {
                h = i.split("|");
                if (h.length != 4) {
                    continue
                }
                f = i.substr(0, i.lastIndexOf("|"));
                c = i.substr(i.lastIndexOf("|") + 1);
                e = g[i];
                if (!d[f]) {
                    d[f] = {}
                }
                d[f][c] = e
            }
        }
        for (f in d) {
            if (d.hasOwnProperty(f)) {
                h = f.split("|");
                j = {
                    api: h[0],
                    method: h[1],
                    version: h[2]
                };
                j.params = SYNO.ux.Utils.getApiParams(j, this.getApiArray("set"));
                for (c in d[f]) {
                    if (d[f].hasOwnProperty(c)) {
                        j.params[c] = d[f][c]
                    }
                }
                b.push(j)
            }
        }
        return b
    },
    clearStatus: function(c) {
        var d = this.getFooterToolbar();
        if (d && Ext.isFunction(d.clearStatus)) {
            d.clearStatus(c)
        }
    },
    clearStatusBusy: function(a) {
        this.clearStatus(a);
        this.unmaskAppWin()
    },
    setStatus: function(d) {
        d = d || {};
        var c = this.getFooterToolbar();
        if (c && Ext.isFunction(c.setStatus)) {
            c.setStatus(d)
        }
    },
    maskAppWin: function() {
        var a = this.findWindow();
        if (a && Ext.isDefined(a.maskForBusy)) {
            a.maskForBusy()
        }
    },
    unmaskAppWin: function() {
        var a = this.findWindow();
        if (a && Ext.isDefined(a.unmask)) {
            a.unmask()
        }
    },
    setStatusBusy: function(b) {
        b = b || {};
        Ext.applyIf(b, {
            text: _T("common", "loading"),
            iconCls: "syno-ux-statusbar-loading"
        });
        this.setStatus(b);
        this.maskAppWin()
    },
    setStatusOK: function(b) {
        b = b || {};
        Ext.applyIf(b, {
            text: _T("common", "setting_applied"),
            iconCls: "syno-ux-statusbar-success",
            clear: true
        });
        this.setStatus(b)
    },
    setStatusError: function(b) {
        b = b || {};
        Ext.applyIf(b, {
            text: _T("common", "error_system"),
            iconCls: "syno-ux-statusbar-error"
        });
        this.setStatus(b)
    }
});
Ext.ns("SYNO.ux");
SYNO.SDS.Utils.FormPanel = Ext.extend(SYNO.ux.FormPanel, {
    module: null,
    constructor: function(a) {
        var b;
        b = Ext.apply({
            checkFormDirty: true,
            trackResetOnLoad: true,
            useStatusBar: a.useDefaultBtn || a.buttons,
            useDefaultBtn: false,
            hideMode: "offsets",
            buttons: true === a.useDefaultBtn ? [{
                xtype: "syno_button",
                btnStyle: "blue",
                disabled: _S("demo_mode"),
                tooltip: _S("demo_mode") ? _JSLIBSTR("uicommon", "error_demo") : "",
                text: _T("common", "commit"),
                scope: this,
                handler: this.applyHandler
            }, {
                xtype: "syno_button",
                btnStyle: "grey",
                text: _T("common", "reset"),
                scope: this,
                handler: this.cancelHandler
            }] : null
        }, a);
        b = this.addStatusBar(b);
        SYNO.SDS.Utils.FormPanel.superclass.constructor.call(this, b)
    },
    addStatusBar: function(a) {
        if (!a.useStatusBar) {
            return a
        }
        var b = {
            xtype: "statusbar",
            defaultText: "&nbsp;",
            statusAlign: "left",
            buttonAlign: "left",
            items: []
        };
        if (a.buttons) {
            b.items = b.items.concat(a.buttons);
            delete a.buttons
        }
        Ext.applyIf(a, {
            fbar: b
        });
        return a
    },
    onBeforeRequest: function(a) {
        return true
    },
    onBeforeAction: function(a, c) {
        if ("get" === c) {
            return true
        }
        if (this.checkFormDirty && !this.isFormDirty()) {
            var b = _T("error", "nochange_subject");
            this.setStatusError({
                text: b,
                clear: true
            });
            return false
        }
        if (!a.isValid()) {
            this.setStatusError({
                text: _T("common", "forminvalid"),
                clear: true
            });
            return false
        }
        return true
    },
    onApiSuccess: function(c, b, a) {
        if ("set" === c) {
            if (!Ext.isBoolean(b.has_fail) || !b.has_fail) {
                this.setStatusOK()
            } else {}
        }
        this.processReturnData(c, b, a)
    },
    processReturnData: function(d, c, b) {
        var a = this.getForm();
        if (b && Ext.isArray(b.compound)) {
            a.loadRecords(c.result, b.compound)
        }
    },
    onApiFailure: function(c, b, a) {
        if ("get" === c) {
            this.reportLoadFail(this.getForm(), c)
        } else {
            if ("set" === c) {
                this.reportFormSubmitFail(this.getForm(), c)
            }
        }
    },
    reportLoadFail: function(a, b) {},
    reportFormSubmitFail: function(a, b) {},
    applyHandler: function(b, a) {
        this.applyForm()
    },
    cancelHandler: function(b, a) {
        this.getForm().reset()
    },
    applyForm: function() {
        var d = "set",
            b = this.getForm();
        if (false === this.onBeforeAction(b, d)) {
            return false
        }
        var a = b.getValues(false, "set");
        var c = this.constructApplyParams(a);
        c = c.concat(this.getApiArray("get"));
        c = this.processParams(d, c);
        this.sendAjaxRequest(d, c)
    },
    upload: function() {
        var b = "set",
            a = this.getForm();
        if (!this.fileUpload || false === this.onBeforeAction(a, b)) {
            return false
        }
        this.setStatusBusy({
            text: _T("common", "saving")
        });
        this.getForm().submit({
            clientValidation: false,
            scope: this,
            callback: function(e, d, c) {
                this.clearStatusBusy();
                if (e) {
                    this.onApiSuccess(b, d, c)
                } else {
                    this.onApiFailure(b, d, c)
                }
            }
        })
    },
    processParams: function(b, a) {
        if ("set" === b) {
            return a
        } else {
            if ("get" === b) {
                return a
            } else {
                return a
            }
        }
    },
    loadForm: function(a) {
        var c = "get",
            b;
        if (false === this.onBeforeAction(this.getForm(), c)) {
            return false
        }
        b = this.getApiArray(c);
        b = this.processParams(c, b);
        this.sendAjaxRequest(c, b)
    },
    getAjaxCfg: function(a) {
        return {}
    },
    getCompoundCfg: function(a) {
        return {}
    },
    sendAjaxRequest: function(e, d) {
        if ("get" === e) {
            this.setStatusBusy()
        } else {
            this.setStatusBusy({
                text: _T("common", "saving")
            })
        }
        var c = this.getAjaxCfg(e);
        var a = this.getCompoundCfg(e);
        var b = Ext.apply({
            fileUpload: false,
            clientValidation: false,
            compound: {
                stopwhenerror: false,
                params: d
            },
            scope: this,
            callback: function(h, g, f) {
                this.clearStatusBusy();
                if (h) {
                    this.onApiSuccess(e, g, f)
                } else {
                    this.onApiFailure(e, g, f)
                }
            }
        }, c);
        b.compound = Ext.apply(b.compound, a);
        this.getForm().submit(b)
    },
    onPageDeactivate: function() {
        if (!this.checkFormDirty) {
            return true
        } else {
            if (this.isFormDirty()) {
                return false
            }
        }
        return true
    },
    isFormDirty: function() {
        return this.getForm().isDirty()
    },
    getAbsoluteURL: function(a) {
        if (!this.module) {
            return a
        }
        return this.module.getAbsoluteURL(a)
    },
    createForm: function() {
        var a = Ext.applyIf({
            appWindow: this,
            listeners: {}
        }, this.initialConfig);
        return new SYNO.API.Form.BasicForm(null, a)
    },
    getApiArray: function(b) {
        var a = SYNO.ux.Utils.getApiArray(this, b, 0, 3);
        a = SYNO.ux.Utils.uniqueApiArray(a);
        return a
    },
    constructApplyParams: function(g) {
        var h, d = {},
            b = [],
            i, f, c, e, j;
        for (i in g) {
            if (g.hasOwnProperty(i)) {
                h = i.split("|");
                if (h.length != 4) {
                    continue
                }
                f = i.substr(0, i.lastIndexOf("|"));
                c = i.substr(i.lastIndexOf("|") + 1);
                e = g[i];
                if (!d[f]) {
                    d[f] = {}
                }
                d[f][c] = e
            }
        }
        for (f in d) {
            if (d.hasOwnProperty(f)) {
                h = f.split("|");
                j = {
                    api: h[0],
                    method: h[1],
                    version: h[2]
                };
                j.params = SYNO.ux.Utils.getApiParams(j, this.getApiArray("set"));
                for (c in d[f]) {
                    if (d[f].hasOwnProperty(c)) {
                        j.params[c] = d[f][c]
                    }
                }
                b.push(j)
            }
        }
        return b
    },
    clearStatus: function(c) {
        var d = this.getFooterToolbar();
        if (d && Ext.isFunction(d.clearStatus)) {
            d.clearStatus(c)
        }
    },
    clearStatusBusy: function(a) {
        this.clearStatus(a);
        this.unmaskAppWin()
    },
    setStatus: function(d) {
        d = d || {};
        var c = this.getFooterToolbar();
        if (c && Ext.isFunction(c.setStatus)) {
            c.setStatus(d)
        }
    },
    maskAppWin: function() {
        var a = this.findWindow();
        if (a && Ext.isDefined(a.maskForBusy)) {
            a.maskForBusy()
        }
    },
    unmaskAppWin: function() {
        var a = this.findWindow();
        if (a && Ext.isDefined(a.unmask)) {
            a.unmask()
        }
    },
    setStatusBusy: function(b) {
        b = b || {};
        Ext.applyIf(b, {
            text: _T("common", "loading"),
            iconCls: "syno-ux-statusbar-loading"
        });
        this.setStatus(b);
        this.maskAppWin()
    },
    setStatusOK: function(b) {
        b = b || {};
        Ext.applyIf(b, {
            text: _T("common", "setting_applied"),
            iconCls: "syno-ux-statusbar-success",
            clear: true
        });
        this.setStatus(b)
    },
    setStatusError: function(b) {
        b = b || {};
        Ext.applyIf(b, {
            text: _T("common", "error_system"),
            iconCls: "syno-ux-statusbar-error"
        });
        this.setStatus(b)
    }
});
SYNO.SDS.CSSTool = {
    supportTransform: function() {
        if (Ext.isIE && !Ext.isIE9p) {
            return false
        }
        return true
    }
};