/**
    ！！！！ 系统生成
    名称：链尚网数据打点框架(调试模式)
    日期：2017-03-15
    版本：0.0.1
    ！！！！注意：当前文件由系统文件合并生成，仅供调试用，请不要直接更改其中代码，
          如需要更改代码，请找到该代码对应的文件进行修改，然后再重新打包 
*/

//以下代码源文件：(src/venilog2/lib/index.js)如需调整代码，请更改此路径文件 
/**
 * 名称:VeniLog 主对象
 * 日期:2016-03-04
 * 作者:Beven
 * 描述:
 *
 */
(function() {

    /**
     * Venilog 构造函数
     * @constructor
     */
    function Venilog() {}

    /**
     * venilog辅助函数
     * @constructor
     */
    function VenilogUtils() {

    }

    //是否为调试模式
    Venilog.prototype.debug = false;

    //是否启用alert弹出日志信息
    Venilog.prototype.alert = false;

    //打点中心
    Venilog.prototype.center = null;

    //venilog辅助工具
    Venilog.prototype.utils = new VenilogUtils();

    /**
     * 输出日志到浏览器控制台
     * @param message
     * @param arg1
     * @param argN
     */
    Venilog.prototype.console = function(message, arg1, argN) {
        var utils = this.utils;
        var args = Array.prototype.slice.call(arguments, 1, arguments.length);
        if (this.alert) {
            if (utils.isString(message)) {
                alert(utils.format2(message, args));
            } else {
                alert(utils.stringify(message));
            }
        }
        if (this.debug && window.console) {
            if (utils.isString(message)) {
                console.log(utils.format2(message, args));
            } else {
                console.log(message);
            }
        }
    }

    /**
     * 启动打点
     * @param cfg 打点配置对象
     */
    Venilog.prototype.bootstrap = function(cfg) {
        this.center.init(cfg);
    }

    /**
     * 获取当前打点页面实例
     */
    Venilog.prototype.getPage = function() {
        return this.center.getPage();
    }

    /**
     * 设置前打点页面实例id
     * @param newPageId 新的页面id
     */
    Venilog.prototype.setPageId = function(newPageId) {
        var page = this.getPage();
        if (page) {
            page.setPageId(newPageId);
        }
    }

    /**
     * 设置当前通用打点PageRecord对象模板对象
     */
    Venilog.prototype.setTemplateModel = function(model) {
        var page = this.getPage();
        if (page) {
            page.setTemplateModel(model);
        } else {
            this.templateModel = model;
        }
    }

    /**
     * 添加一个页面打点业务
     * @param handler 页面打点配置函数
     */
    Venilog.prototype.business = function(handler) {
        if (this.isFunction(handler)) {
            handler(this.getPage(), this.Behavior, this);
        }
    }

    /**
     * 发送一条打点日志
     * @param eventid 事件id
     * @param message 自定义内容
     * @param entry 业务数据 例如 商品id之类的
     */
    Venilog.prototype.log = function(eventid, message, entry) {
        var page = this.getPage();
        var record = page.getPageRecord(eventid, message, entry);
        return page.log(record);
    }

    /**
     * 发送一个打点日志
     * @param record 日志对象 ,也可以是一个日志对象数组
     */
    Venilog.prototype.logRecord = function(record) {
        var page = this.getPage();
        return page.log(record);
    }

    /**
     * 按照指定间隔进行发送打点请求 只到满足 指定条件即可
     * @param  name 任务名称
     * @param record 可以是打点对象 也可以是一个获取打点数据对象的函数 注意:如果record为一个数组则默认调用pushRecords
     * @param invertal 执行间隔
     */
    Venilog.prototype.task = function(name, record, interval) {
        var page = this.getPage();
        return page.task(name, record, interval);
    }


    /**
     * 名称：指定传入值是否为指定类型
     * @param obj 待检测的数据
     * @param type 目标类型
     */
    VenilogUtils.prototype.isType = function(obj, type) {
        return Object.prototype.toString.call(obj) == "[object " + type + "]";
    }


    /**
     * 名称：检测传入对象是否为数组类型
     * @param obj 待检测对象
     */
    VenilogUtils.prototype.isArray = function(obj) {
        return this.isType(obj, "Array");
    }

    /**
     * 名称：检测传入对象是否为函数类型
     * @param obj 待检测对象
     */
    VenilogUtils.prototype.isFunction = function(obj) {
        return this.isType(obj, "Function");
    }

    /**
     * 名称：检测传入对象是否为Date类型
     * @param obj 待检测对象
     */
    VenilogUtils.prototype.isDate = function(obj) {
        return this.isType(obj, "Date");
    }

    /**
     * 名称：检测传入对象是否为String类型
     * @param obj 待检测对象
     */
    VenilogUtils.prototype.isString = function(obj) {
        return this.isType(obj, "String");
    }

    /**
     * 名称：简单字符串格式化工具
     * @param str 格式化模板字符串
     * @param arg1-argN 每个占位{0}-{N}对应的值
     */
    VenilogUtils.prototype.format = function(str, arg1, arg2, argN) {
        if (this.isString(str)) {
            var args = Array.prototype.slice.call(arguments, 1);
            str = str.replace(/\{\d+\}/g, function(a) {
                var s = args[a.slice(1, a.length - 1)];
                return s == null ? a : s;
            });
        } else {
            return str;
        }
        return str;
    }

    /**
     * 名称：简单字符串格式化工具
     * @param str 格式化模板字符串
     * @param args 每个占位{0}-{N}对应的数组值[1,2,3,4]
     */
    VenilogUtils.prototype.format2 = function(str, args) {
        if (str) {
            args = args || [];
            str = str.replace(/\{\d+\}/g, function(a) {
                var s = args[a.slice(1, a.length - 1)];
                return s == null ? a : s;
            });
        }
        return str;
    }

    /**
     * 名称：字符串空处理函数
     * @param v 待空处理值 当v为null或者空或者多个空字符时 返回bv
     * @param bv 备用值
     */
    VenilogUtils.prototype.ifn = function(v, bv) {
        if (v === null || v === undefined) {
            return bv;
        } else if (typeof v === 'string') {
            var isWhitespace = (v === '') || (v.replace(/\s/g, '') === '');
            return isWhitespace ? bv : v;
        } else {
            return v;
        }
    }

    /**
     * 动态加载指定js
     * @param url jsurl地址
     */
    VenilogUtils.prototype.using = function(url, callback, error) {
        var element = document.createElement("script");
        element.type = "text/javascript";
        element.name = name;
        element.async = this.sync;
        element.src = url;
        element.onerror = error;
        if (element.readyState) {
            element.onreadystatechange = doComplete(callback);
        } else {
            element.onload = callback;
        }
        document.body.appendChild(element);
    }

    /**
     * 名称：将传入的函数转交给指定的对象执行 如果传入的函数不为函数类型 不触发异常
     */
    VenilogUtils.prototype.call = function(object, fn, arg1, arguN) {
        if (this.isFunction(fn) && object) {
            var args = Array.prototype.splice.call(arguments, 2, arguments.length);
            var s = fn.apply(object, args);
            args = object = fn = arg1 = arguN = null;
            return s;
        }
    }

    /**
     * 名称：使指定构造函数继承于指定构造函数
     * 注意：请在构造函数原型没有自定义函数或者属性前使用此方法进行继承，否则会覆盖之前原型的方法
     * 说明：当前仅仅是构造一个面向对象的继承环境，便于以后进行扩展，并不打算建立全面，完整的继承体系
     * @param driverClass 子类构造
     * @param baseClass 父类构造
     */
    VenilogUtils.prototype.extend = function(DriverClass, BaseClass) {
        var origin = DriverClass.prototype;
        DriverClass.prototype = new BaseClass();
        DriverClass.prototype.constructor = DriverClass;
        DriverClass.prototype.__base = DriverClass.prototype;
        this.assign(DriverClass.prototype, origin);
        return DriverClass;
    }

    /**
     * 简单对象tojson
     */
    VenilogUtils.prototype.stringify = function(obj) {
        if (window.JSON) {
            return window.JSON.stringify(obj);
        } else {
            return stringify(obj);
        }
    }

    /**
     * 给指定dom元素添加指定事件
     * @param sender dom元素
     * @param evs 事件名称 例如:click dblclick
     * @param handler 事件函数
     */
    VenilogUtils.prototype.addEventListener = function(sender, evs, handler) {
        if (sender == null || evs == null || !this.isFunction(handler)) {
            return;
        }
        if (sender.attachEvent) {
            sender.attachEvent('on' + evs, handler);
        } else if (sender.addEventListener) {
            sender.addEventListener(evs, handler);
        } else {
            var originHandler = sender['on' + evs];
            var utils = this;
            sender['on' + evs] = function() {
                utils.call(sender, handler, window.event);
                utils.call(sender, originHandler, window.event);
                utils = sender = originHandler = handler = null;
            };
        }
    }

    /**
     * 浅层复制数据
     * @param origin
     * @param target
     * @returns {*}
     */
    VenilogUtils.prototype.assign = function(origin, target) {
        if (origin && target) {
            for (var i in target) {
                origin[i] = target[i];
            }
        }
        return origin;
    }

    VenilogUtils.prototype.simplePromise = function(handler) {
        var successCallback, errorCallback;
        setTimeout(function() {
            handler(function() {
                if (typeof successCallback == 'function') {
                    return successCallback.apply(this, arguments);
                }
            }, function() {
                if (typeof errorCallback == 'function') {
                    return errorCallback.apply(this, arguments);
                }
            });
        }, 20)
        return {
            success: function(handler) {
                successCallback = handler;
            },
            error: function(handler) {
                errorCallback = handler;
            }
        }
    }

    function doComplete(callback) {
        if (this.readyState === 'complete' || this.readyState === 'loaded') {
            this.onreadystatechange = null;
            callback();
        }
    }

    function stringify(data) {
        var contents = [],
            value;
        for (var i in data) {
            value = data[i];
            if (!ignore(value)) {
                contents.push('"' + i + '":' + valueOf(value));
            }
        }
        return '{' + contents.join(',') + '}';
    }

    function ignore(value) {
        return (value === undefined || Object.prototype.toString.call(value) == '[object Function]');
    }

    function valueOf(value) {
        switch (Object.prototype.toString.call(value).replace('[object ', '').replace(']', '')) {
            case 'Number':
                return isFinite(value) ? String(value) : "null";
            case 'Boolean':
            case 'Null':
                return String(value);
            case 'Array':
                var content = "";
                for (var i = 0, k = value.length; i < k; i++) {
                    content += stringify(value);
                }
                return content;
            case 'Object':
                return value ? stringify(value) : 'null';
            default:
                return '"' + String(value) + '"';
        }
    }

    //创建一个Venilog
    window.VeniLog = new Venilog();
}());

//以下代码源文件：(src/venilog2/lib/timer.js)如需调整代码，请更改此路径文件 
/**
 * 名称:计时工具
 * 作者:Beven
 * 日期:2015-11-27
 * 描述: 时间轮询操作工具,例如:包含快速开启一个倒计时操作,以及开启一个计时器操作等等
 */
(function (veniLog) {
    'use strict';

    var identifier = 0;

    /**
     * 计时器工具构造函数
     */
    function TimerLibraryClass(interval) {
        if (isNaN(interval) || interval <= 0) {
            throw new Error("interval 必须为>0的数字  单位为:毫秒");
        }
    }

    /**
     * 计时器工具内部类构造函数
     * @param interval 间隔 单位:毫秒
     */
    function TimerInnerClass(interval) {
        this.id  =identifier++;
        this.emitter = new veniLog.EventEmitterClass();
        this.init.apply(this, arguments);
    }

    //引用附加
    veniLog.Timer = TimerLibraryClass;

    /**
     * 静态函数:开启一个计时器
     * @param interval 间隔时间 单位:毫秒
     */
    TimerLibraryClass.interval = function (millSeconds) {
        return new TimerLibraryClass(millSeconds);
    }

    /**
     * 静态函数:开启一个倒计时
     * @param total 开始数字 默认:秒
     * @type {null}
     */
    TimerLibraryClass.counter = function (total) {
        return new CountDownLibraryClass(total);
    }

    TimerInnerClass.prototype.timerId = 0;

    //setTimeout id
    TimerInnerClass.prototype.id = null;

    //是否能够继续
    TimerInnerClass.prototype.keeping = false;

    //事件容器
    TimerInnerClass.prototype.emitter =null;

    /**
     * 初始化计时器
     */
    TimerInnerClass.prototype.init = function (interval) {
        this.interval = interval;
        if (isNaN(interval) || interval <= 0) {
            throw new Error("interval 必须为>0的数字 单位为:毫秒");
        }
    }

    /**
     * 名称: 开始计时器工具 ,并且调用绑定的step任务
     */
    TimerInnerClass.prototype.start = function () {
        if (!this.keeping) {
            this.keeping = true;
            this.stopif(this.emitter.emit('iterator'));
            this.iterate();
        }
    }

    /**
     * 名称: 停止计时器工具运行
     */
    TimerInnerClass.prototype.stop = function () {
        this.keeping = false;
        clearTimeout(this.timerId);
    }

    /**
     * 名称: 绑定当前计时器每次运行的迭代函数
     */
    TimerInnerClass.prototype.iterate = function (handler) {
        if (this.keepif()) {
            var self = this;
            clearTimeout(this.timerId);
            var id = setTimeout(function () {
                self.stopif(self.emitter.emit('iterator'));
                self.iterate();
            }, this.interval);
            this.timerId = id;
        }
    }

    /**
     * 名称:结束监听
     */
    TimerInnerClass.prototype.stopif = function (r) {
        if (r === false) {
            this.stop();
        }
    }

    /**
     * 名称:是否可以迭代判断
     */
    TimerInnerClass.prototype.keepif = function () {
        if (!this.keeping) {
            return false;
        } else {
            //这里需要自动判断是否有迭代函数 如果没有则停止任务
            return this.emitter.getListeners('iterator').length > 0;
        }
    }

    /**
     * 名称: 绑定当前计时器每次运行的迭代函数
     */
    TimerInnerClass.prototype.iterator = function (handler) {
        this.emitter.on('iterator', handler);
        if (this.keeping) {
            //当新的迭代函数添加进来时,如果当前计时器已经启动 则默认重新开始
            this.keeping = false;
            this.start();
        }
        return this;
    }

}(VeniLog));
;

//以下代码源文件：(src/venilog2/lib/cookie.js)如需调整代码，请更改此路径文件 
/*****************************************************************
 * 名称：用于解析document.cookie字符串的工具
 * 作者：Beven
 * 日期：2015-02-19
 * 版本：0.0.1
 * 描述：无
 ****************************************************************/
(function (venilog) {

    var utils = venilog.utils;

    /**
     * Cookie解析构造函数
     * @constructor
     */
    function CookieParser() {
        initParser.apply(this, arguments);
    }

    venilog.CookieParser = CookieParser;

    /**
     * 名称：根据传入名称获取指定cookie的值
     * @param name cookie名称（可不区分大小写)
     */
    CookieParser.prototype.getCookie = function (name) {
        name = (name || '').toString().toLowerCase();
        return this.__cookies[name];
    }

    /**
     * 清除指定cookie
     */
    CookieParser.prototype.removeCookie = function (name, path) {
        this.setCookie(name, "", -1, path);
    }

    /**
     * 名称：设置一个cookie
     * @param name cookie 名称
     * @param v cookie 对应的值
     * @param expires 过期时间 可以是一个date类型，或者date类型的字符串
     * @param path cookie路径
     */
    CookieParser.prototype.setCookie = function (name, v, expires, path) {
        if (!name || utils.isDate(expires)) {
            expires = expires.toGMTString();
        }
        name = (name || '').toString(/\s/g, '');
        window.document.cookie = utils.format("{0}={1};expires={2};path={3}", name, encodeURI(v), expires, (path || ""));
        this[name] = v;
        this.__cookies[name.toLowerCase()] = v;
    }

    CookieParser.prototype.parse = function (cookie) {
        InitParser.apply(this, cookie);
    }

    CookieParser.cookieKeyValues = function (cookies) {
        cookies = cookies || [];
        var commonCookies = [];
        var cstr = null;
        for (var i = 0, k = cookies.length; i < k; i++) {
            cstr = cookies[i];
            commonCookies.push(cstr.split(';')[0]);
        }
        return commonCookies;
    }

    /**
     * 名称：初始化解析器
     */
    function initParser(docOrCookie) {
        this.__cookies = {};
        if (docOrCookie == null) {
            return;
        }
        var cookie = null;
        if (utils.isString(docOrCookie)) {
            cookie = docOrCookie;
        } else {
            cookie = docOrCookie.cookie;
        }
        cookie = cookie || '';
        var kv = null, name = null, v = null;
        var cookieKvs = cookie.split(';');
        var cookies = {};
        for (var i = 0, k = cookieKvs.length; i < k; i++) {
            kv = cookieKvs[i].split('=');
            name = (kv.shift()).replace(/\s/,'');
            v = decodeURI(trimQuotCookieParamValue(kv.join('=')));
            cookies[name.toLowerCase()] = v;
            if((v).replace(/\s/,'')===''){
                continue;
            }
            this[name] = v;
        }
        this.__cookies = cookies || {};
    }

    /**
     * 格式化cookie参数值
     */
    function trimQuotCookieParamValue(v) {
        if (v[0] == '"') {
            v = v.substring(1, v.length);
        }
        if (v[v.length - 1] == '"') {
            v = v.substring(0, v.length - 1);
        }
        return v;
    }
}(VeniLog));
;

//以下代码源文件：(src/venilog2/lib/emitter.js)如需调整代码，请更改此路径文件 
/*******************************************************
 * 名称：链尚网主框架库文件：自定义事件容器
 * 日期：2015-07-16
 * 版本：0.0.1
 * 作者：Beven
 * 描述：事件容器，通过创建的事件容器实例进行自定义事件注册，以及在对应的时机触发指定事件
 *       例如： var emitter = new core.EventEmitterClass();
 *              //添加事件处理队列函数
 *              emitter.on('change',function(newValue,oldValue){  console.log('something is changed');});
 *              //触发事件，并且实行事件的队列函数
 *              emitter.emit('change',newValue,oldValue);
 *******************************************************/
(function (veniLog) {
    'use strict';
    /**
     * 名称：事件容器构造函数
     * 通过实例化当前容器 可以对其进行添加事件，以及执行指定类型的事件队列
     * 例如： var emitter = new core.EventEmitterClass();
     *              //添加事件处理队列函数
     *              emitter.on('change',function(newValue,oldValue){  console.log('something is changed');});
     *              //触发事件，并且实行事件的队列函数
     *              emitter.emit('change',newValue,oldValue);
     */
    function EventEmitterLibraryClass() {
        this.regHandlers = {};
    }

    //引用附加
    veniLog.EventEmitterClass = EventEmitterLibraryClass;

    //辅助工具
    var utils = veniLog.utils;

    /**
     * 名称：添加衣蛾指定事件的处理函数 该函数仅执行一次
     * @param name 事件名称
     * @param handler 事件函数
     */
    EventEmitterLibraryClass.prototype.once = function (name, handler) {
        if (!name || !utils.isFunction(handler)) {
            return;
        }
        var self = this;
        var onceHandler = function () {
            if (onceHandler.called) {
                self.off(name, onceHandler);
                handler = name = self = onceHandler = null;
            } else {
                onceHandler.called = true;
                handler.apply(this, arguments);
            }
        }
        this.on(name, onceHandler);
    }

    /**
     * 名称：添加一个指定事件的处理函数
     * @param name 事件名称
     * @param handler 事件处理函数
     */
    EventEmitterLibraryClass.prototype.on = function (name, handler) {
        if (name === null || name === '') {
            return;
        }
        var handlers = this.getListeners(name);
        if (typeof handler == 'function') {
            handlers.push(handler);
        }
    }

    /**
     * 名称：移除一个指定事件的处理函数
     * @param name 事件名称
     * @param handler 事件处理函数 如果handler参数为null 则取消当前事件的所有已绑定的函数
     */
    EventEmitterLibraryClass.prototype.off = function (name, handler) {
        var handlers = this.getListeners(name);
        if (arguments.length === 1) {
            handlers.length = 0;
        } else {
            var newHandlers = [];
            for (var i = 0, h = null, k = handlers.length; i < k; i++) {
                h = handlers[i];
                if (h != handler) {
                    newHandlers.push(h);
                }
            }
            handlers.length  =0;
            handlers.push.apply(handlers,newHandlers);
        }
    }

    /**
     * 名称：销毁事件容器
     */
    EventEmitterLibraryClass.prototype.destroy = function () {
        var allHandlers = this.regHandlers || {};
        for (var i in allHandlers) {
            if (utils.isArray(allHandlers[i])) {
                allHandlers[i].length = 0;
            } else {
                allHandlers[i] = null;
            }
        }
    }

    /**
     * 名称：获取指定事件的已注册的事件列表
     */
    EventEmitterLibraryClass.prototype.getListeners = function (name) {
        if (name === null || name === "") {
            return [];
        }
        var handlers = this.regHandlers[name];
        if (handlers == null) {
            handlers = this.regHandlers[name] = [];
        }
        return handlers;
    }

    /**
     * 名称：执行指定事件
     */
    EventEmitterLibraryClass.prototype.emit = function (name, arg1, argN) {
        var handlers = this.getListeners(name);
        var args = Array.prototype.slice.call(arguments, 1);
        var returnValue = null;
        for (var i = 0, handler = null, k = handlers.length; i < k; i++) {
            handler = handlers[i];
            returnValue = handler.apply(window, args);
            if (false === returnValue) {
                break;
            }
        }
        return returnValue;
    }
}(VeniLog));;

//以下代码源文件：(src/venilog2/lib/page.js)如需调整代码，请更改此路径文件 
/**
 * 名称:数据打点页面类定义
 * 日期:2015-10-29
 * 作者:Beven
 * 描述:
 *        用于页面打点数据产生,以及记录,以及发送打点记录用,理论上一个页面只能有一个打点页面类实例
 */
(function() {

    var veniLog = window.VeniLog;

    var escape = window.escape;

    //辅助工具
    var utils = veniLog.utils;

    //上一次请求id
    var referRequestId = null;

    //日志来源
    var veniLogSourceId = null;

    var localStorage = window.localStorage;
    //获取cookie
    var cookieParser = new veniLog.CookieParser(document.cookie);

    /**
     * 页面打点器类构造函数
     * @constructor
     */
    function VeniLogPageClass() {
        initialize.apply(this, arguments);
    }

    veniLog.VeniLogPageClass = VeniLogPageClass;

    /**
     * 当前页面打点日志标记id
     */
    VeniLogPageClass.prototype.logId = 0;

    //当前页面已经装载的打点器
    VeniLogPageClass.prototype.behaviorList = null;

    /**
     * 装载打点器
     * @param name 打点器名称
     */
    VeniLogPageClass.prototype.readyBehavior = function(name) {
        var behaviorList = this.behaviorList;
        VeniLog.Behavior.ready(name, function(behavior) {
            if (behavior) {
                behaviorList.push(behavior);
            }
        });
    }

    /**
     * 名称:保存当前页面必要的保存数据 保存到cookie
     */
    VeniLogPageClass.prototype.savePageStorage = function() {
        this.setParam('referUrl', location.href);
        this.setParam('referId', this.getPageId());
    }

    /**
     * 保存一个数据到本地,作为跨页面缓存数据(使用localStorage与cookie进行存储)
     * @param name 缓存键名称
     */
    VeniLogPageClass.prototype.setParam = function(name, value) {
        if (this.supportLocalStorage) {
            localStorage.setItem(name, value);
        } else {
            var expired = new Date(new Date().getTime() + 7 * 1000 * 3600 * 24);
            this.cookieParser.setCookie(name, value, expired, "/");
        }
    }

    /**
     * 从跨页面数据中获取指定名称的值
     * @param name 缓存数据名称
     */
    VeniLogPageClass.prototype.getParam = function(name) {
        if (this.supportLocalStorage) {
            return localStorage.getItem(name);
        } else {
            var data = this.cookieParser || {};
            return data[name];
        }
    }

    /**
     * 按照指定间隔进行发送打点请求 只到满足 指定条件即可
     * @param  name 任务名称
     * @param record 可以是打点对象 也可以是一个获取打点数据对象的函数 注意:如果record为一个数组则默认调用pushRecords
     * @param invertal 执行间隔
     */
    VeniLogPageClass.prototype.task = function(name, record, interval) {
        var taskMap = this.tasks;
        if (taskMap == null) {
            taskMap = this.tasks = {};
        }
        if (taskMap[name]) {
            throw new Error(utils.format("已经存在名称为{0}的打点任务", name));
        }
        var d = taskMap[name] = {
            name: name,
            timer: null
        };
        var timer = d.timer = veniLog.Timer.interval(interval);
        var page = this;
        var emitter = new veniLog.EventEmitterClass();
        timer.iterator(function() {
            veniLog.console('页面:{0} 开始任务:{1}', page.getPageId(), name);
            page.log(record).complete(function(error, data) {
                veniLog.console('页面:{0} 任务:{1},执行完毕', page.getPageId(), name);
                if (emitter.emit('until', error, data)) {
                    //停止调用
                    timer.stop();
                }
            });
        });
        return getTaskChain(timer, emitter);
    }

    /**
     * 自动发送打点日志
     * @param recordOrRecords 打点参数 ,recordOrRecords为对象则使用push 如果recordOrRecord为数组则使用pushRecords
     */
    VeniLogPageClass.prototype.log = function(recordOrRecords) {
        if (utils.isArray(recordOrRecords)) {
            return this.pushRecords(recordOrRecords);
        } else {
            return this.push(recordOrRecords);
        }
    }

    /**
     * 发送一条点日志
     * @param record 设置一条打点日志记录
     */
    VeniLogPageClass.prototype.push = function(record) {
        if (record == null) {
            this.throwError("record 不能为null ,无法发送打点请求!")
        }
        if (this.tryQueue(record)) {
            return;
        }
        var url = this.getHostUrl() + '/one';
        var context = this;
        if (utils.isFunction(record.then)) {
            return record.then(function(data) {
                return doAjaxPush(url, data, context);
            })
        } else {
            return doAjaxPush(url, record, this);
        }
    }

    /**
     * 发送多条打点日志
     * @param recordList 多条打点记录对象
     */
    VeniLogPageClass.prototype.pushRecords = function(recordList) {
        if (recordList == null) {
            this.throwError('recordList 不能为null ,无法发送打点请求!');
        }
        if (this.tryQueue(recordList)) {
            return;
        }
        var url = this.getHostUrl() + '/batch';
        return ajaxRbi(url, recordList, this);
    }

    /**
     * 尝试添加至队列,如果当前页面没有初始化完成(即是否设置了hostUrl)
     * 如果没有初始化完成 则默认将打点数据添加至队列 否则不进行添加,
     * return true/false (是否添加成功)
     */
    VeniLogPageClass.prototype.tryQueue = function(records) {
        var queues = this.getQueues();
        if (this.getHostUrl) {
            if (queues.length > 0) {
                queues.length = 0;
                //将队列中的资质批量发送至服务器
                this.pushRecords(this.getQueues());
            }
            return false;
        } else {
            queues.push.apply(queues, records);
            return true;
        }
    }

    /**
     * 抛出一个异常消息
     */
    VeniLogPageClass.prototype.throwError = function(message) {
        throw new Error(utils.format("页面:{0}", this.getPageId(), message));
    }

    /**
     * 名称:获取页面日志标准model对象
     * @param eventId 事件id
     */
    VeniLogPageClass.prototype.getPageRecord = function(eventId, messge, entry) {
        var record = {
            "channelID": 0, //业务频道 可参见数据库
            "sourceId": veniLogSourceId, //后台，app，h5 这个属性 -->框架提供
            "timeStamp": 0, //时间戳 -->框架提供
            "sessionId": null, //用于处理用户未登录情况，根据固定算法生成的？
            "userId": null, //用户id 后端赋值
            "agent": null, //客户单代理 -->框架提供
            "userIp": null, //用户ip -->框架提供
            "token": null, //token -->框架提供
            "requestId": 0, //请求id -->框架提供
            "referRequestId": 0, //上一次请求id --> 框架提供
            "debugMessage": null, //调试信息
            "url": '', //url -->框架提供
            "refurl": "", //上一跳url-->框架提供
            "debug": false, //是否 调试
            "appType": 0, //  app 类型：买家，卖家，h5 -->框架提供
            "appVersion": 0, // app版本号 --> 框架提供
            "osPlatform": 0, //  系统版本号-->  框架提供
            "osVersion": 0, // 操作系统 --> 框架提供 --> 框架提供
            "deviceType": 0, //硬件类型，手机，平板？ --> 框架提供
            "network": 0, //网络int类型需要定义一下 --> 框架提供
            "mac": null, //mac地址 --> 框架提供
            "imei": null, //IMEI号(可重写) --> 框架提供
            "deviceId": null, //设备硬件id --> 框架提供
            "eventID": (eventId || 0), //事件id：下载，注册，登录，一键调样，下单等需要监控的行为
            //"message": (messge || ""), //填入补充信息
            "message": (messge || ""),
            "entry": (entry || null), //业务数据
            "mobile": null, //手机号码
            "latitude": null, //维度
            "longitude": null, //经度
            "province": null, //省份
            "city": null, //城市
            "activity": ({ "sourceId": null, "lsContent": null, "activityId": null } || "")
        }
        var mergeProps = this.templModel;
        if (utils.isFunction(this.templModel)) {
            mergeProps = this.templModel();
            if (mergeProps && mergeProps.then) {
                return mergeProps.then(function(data) {
                    return utils.assign(record, data);
                });
            }
        } else {
            return utils.assign(record, mergeProps);
        }
    }

    /**
     *
     * @param hostUrl
     */
    VeniLogPageClass.prototype.init = function(hostUrl, sourceId, pageId) {
        if (!this.getHostUrl) {
            veniLogSourceId = sourceId;
            this.getPageId = getter(pageId);
            //设置当前打点服务器url
            this.getHostUrl = getter(hostUrl);
        }
        this.initUrl = emptyFunction;
    }

    function emptyFunction() {

    }

    /**
     * 设置前打点页面实例id
     * @param newPageId 新的页面id
     */
    VeniLogPageClass.prototype.setPageId = function(newPageId) {
        this.getPageId = getter(newPageId);
    }


    /**
     * 设置当前通用打点PageRecord对象模板对象
     */
    VeniLogPageClass.prototype.setTemplateModel = function(model) {
        this.templModel = model;
    }

    /**
     * 页面初始化
     */
    function initialize(hostUrl, sourceId) {
        veniLogSourceId = sourceId;
        this.behaviorList = [];
        this.supportLocalStorage = isStorageSupported();
        //设置获取页面id函数
        //this.getPageId = getPageIdGeter();
        //获取cookie解析器
        this.cookieParser = new veniLog.CookieParser(document.cookie);
        if (hostUrl) {
            //设置当前打点服务器url
            this.getHostUrl = getter(hostUrl);
        }
        //初始化队列
        this.getQueues = getter([]);
        //设置当前页面标题
        this.pageTitle = document.getElementsByTagName('title').innerText;
        if (referRequestId == null) {
            referRequestId = this.getParam('referRequestId');
        }
        var page = this;
    }

    /**
     * 判断是否支持制定类型存储（可以是localStorage或者sessionStorage)
     */
    function isStorageSupported() {
        var testKey = 'supoort';
        var storage = localStorage;
        try {
            storage.setItem(testKey, 'true');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * 返回一个任务链式调用对象
     */
    function getTaskChain(timer, emitter) {
        var chain = {};
        chain.stop = function() {
            timer.stop();
        }
        chain.start = function() {
            timer.start();
        }
        chain.until = function(handler) {
            return emitter.on('until', handler);
        }
        return chain;
    }

    /**
     * 远程请求打点数据
     */
    function doAjaxPush(url, data, page) {
        var id = page.logId + 1;
        var pageId = page.getPageId();
        dataFormatter(data, page);
        page.setParam('referRequestId', referRequestId);
        page.logId = id;
        page.savePageStorage();
        data.pageId = pageId;
        veniLog.console('页面:{0},打点,编号:{1} 开始...', pageId, id);
        veniLog.console('参数:');
        veniLog.console(data);
        page.ajaxPush = veniLog.center.cfg.ajaxPush || defaultAjaxPush;
        return page.ajaxPush(url, data);
    }

    function defaultAjaxPush(url, data) {
        var pageId = data.pageId;
        var id = data.logId;
        return utils.simplePromise(function(resolve, reject) {
            var image = new Image();
            var src = url + '?jsonRequest=' + toUnicode(utils.stringify({
                data: data
            }));
            image.onload = image.onerror = function() {
                veniLog.console('页面:{0},打点,编号:{1} 结束', pageId, id);
                veniLog.console('参数:');
                veniLog.console(data);
                resolve({
                    status: 1,
                    message: 'ok'
                });
                document.body.removeChild(image);
            };
            image.onerror = function() {
                document.body.removeChild(image);
            }
            delay(function() {
                image.src = src;
                document.body.appendChild(image);
            })
        });
    }

    function delay(handler) {
        if (!document.body) {
            setTimeout(function() {
                delay(handler);
            }, 50)
        } else {
            handler();
        }
    }

    /**
     * url转unicode
     */
    function toUnicode(str) {
        return escape(str).replace(/%u/gi, '\\u')
    }

    /**
     * 获取record或者recordList对象
     */
    function dataFormatter(data, page) {
        if (utils.isFunction(data)) {
            data = data();
        }
        dataRender(data, page);
        return data;
    }

    /**
     * 渲染每个打点对象,设置一些必要复制的属性
     */
    function dataRender(recordOrRecords, page) {
        if (utils.isFunction(recordOrRecords)) {
            for (var i = 0, k = recordOrRecords.length; i < k; i++) {
                recordRender(recordOrRecords[i], page);
            }
        } else {
            recordRender(recordOrRecords, page);
        }
    }

    /**
     * 渲染单个对象 设置一些必要的赋值属性 例如:requestId....
     */
    function recordRender(record, page) {
        var d = new veniLog.CookieParser(document.cookie);
        record.requestId = getRequestId();
        record.timeStamp = (new Date()).getTime();
        record.agent = record.agent || navigator.userAgent;
        record.refurl = document.referrer;
        record.referRequestId = page.getParam('referRequestId');
        record.url = location.href;
        record.deviceId = record.deviceId || getUUId(page);
        record.activity.sourceId = getUrlSourceId();
        record.activity.lsContent = getUrlLsContent();
        record.activity.activityId = getUrlActivityId();
        record.token = d.token || "";
        record.userId = record.userId || 0;
        referRequestId = record.requestId;
    }
    //获取链接中的sourceId，lsContent,activityId开始
    var url = window.location.search;
    var str = url.substr(1);
    var strs = str.split("&");
    var theRequest = {};
    for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }

    function getUrlSourceId() {
        var sourceId = theRequest.ls_source_id;
        if (!sourceId) {
            sourceId = cookieParser.sourceId
        }
        return sourceId;
    }

    function getUrlLsContent() {
        var lsContent = theRequest.ls_content;
        if (!lsContent) {
            lsContent = cookieParser.lsContent
        }
        return lsContent;
    }

    function getUrlActivityId() {
        var activityId = theRequest.ls_activity_id;
        if (!activityId) {
            activityId = cookieParser.activityId
        }
        return activityId;
    }
    //获取链接中的sourceId，lsContent,activityId结束

    /**
     * 生成一个requestId
     */
    function getRequestId() {
        return makeIdentifier('request');
    }

    /**
     * 获取一个用户uuid
     */
    function getUUId(page) {
        var cn = '__uuid';
        var uuid = page.getParam(cn);
        if ((uuid || '').toString().replace(/\s/g, '') === '') {
            uuid = makeIdentifier('user');
            page.setParam(cn, uuid);
        }
        return uuid;
    }

    function createUUID(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [],
            i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }

    /**
     * 生成一个随机唯一id
     */
    function makeIdentifier(prefix) {
        var identifier = utils.format('{0}_{1}', prefix, createUUID(32, 32));
        return identifier;
    }

    /**
     * 获取页面id getter函数
     */
    function getPageIdGeter() {
        var id = makeIdentifier('page');
        return function() {
            return id;
        }
    }

    /**
     * 辅助函数getter生成器
     */
    function getter(paras) {
        return function() {
            return paras;
        }
    }
}());;

//以下代码源文件：(src/venilog2/lib/rbi.js)如需调整代码，请更改此路径文件 
/**
 * 名称:前端数据打点中心
 * 时间:2015-10-29
 * 作者:Beven
 * 描述:
 *      构造一个数据打点中心,用于分配与配置具体页面配置的数据打点业务,
 *      并且 负责动态加载数据打点器.
 *
 *      元数据配置:
 *               在html文件的head中添加标签h5/app/pc
 *               1    其他
 2    app
 3    H5
 4    后台
 5    网站
 <meta rbi="yes" name="open" content="false"/> <!--是否开启打点-->
 <meta rbi="yes" name="sourceId" content="5">   <!--表示当前打点来源配置-->
 <meta rbi="yes" name="hostUrl" content="http://localhost:9133/log"/><!--打点接口地址-->
 <meta rbi="yes" name="resourceUrl" content="${context.staticUrl}/resources/frs/datarbi"/><!--自定义打点文件资源地址-->
 <meta rbi="yes" name="rbiPage" content="${location}"/><!--当前页面唯一标记-->
 <meta rbi="yes" name="rbiCustom" content="${context.rbiCustom}"/><!--是否加载自定义打点配置-->
 */

/**
 * 打点宏定义
 */
(function () {
    VeniLog.LOGEVENTS = {
        'IN': '1',//'进入',
        'OUT': '2',//'离开',
        'CLICK': '3',//'点击',
        'SLIDE': '4',//'滑动',
        'LOGIN': '1',//'统计用户登入登出',
        'REGIST': '1002',//'统计用户注册',
        'FORGOTPWD': '1003',//'用户忘记密码',
        'UPINSIDE': '2001',//'控件点击upinside',
        'TOUCHDOWN': '2002',//'控件点击touchdown',
        'TOUCHDRAGINSIDE': '2003',//'控件点击TouchDragInside',
        'TOUCHDRAGOUTSIDE': '2004',//'控件点击TouchDragOutside',
        'TOUCHDRAGENTER': '2005',//'控件点击TouchDragEnter',
        'TOUCHDRAGEXIT': '2006',//'控件点击TouchDragExit',
        'TOUCHUPINSIDE': '2007',//'控件点击TouchUpInside',
        'TOUCHUPOUTSIDE': '2008',//'控件点击TouchUpOutside',
        'TOUCHCANCEL': '2009',//'控件点击TouchCancel',
        'TAP': '2102',//'手势行为TAP',
        'SWIPE': '2103',//'swipe',
        'PAN': '2104',//'pan',
        'PINCH': '2105',//'pinch',
        'LONGPRESS': '2106',//'longpress',
        'PAGEIN': '3001',//'页面进入',
        'PAGEOUT': '3002',//'页面离开',
        'SELECT': '4001',//'列表行选择',
        'TABS': '5001',//'TAB切换',
        'POSITION': '6001',//'记录位置信息',
        'MSGRECEVIED': '7001',//'消息推送抵达',
        'MSGCLICK': '7002'//'消息推送被点击'
    }
} ());

(function (env) {

    //venilog对象
    var veniLog = window.VeniLog;
    //辅助工具
    var utils = veniLog.utils;
    //打点器资源文件服务器地址
    var resouceHostUrl = null;
    //元数据
    var meta = null;
    var rbiPages = {};
    //当前打点页面实例
    var currentPage = null;

    /**
     * 前端数据打点中心构造函数
     */
    function VeniLogCenter() {

    }

    //构建打点中心实例
    veniLog.center = new VeniLogCenter();

    /**
     * 设置:是否自动自定义配置资源文件
     */
    VeniLogCenter.prototype.custom = false;

    /**
     * 获取当前页面
     */
    VeniLogCenter.prototype.getPage = function () {
        return currentPage;
    }

    /**
     * 添加一个页面打点业务
     * @param handler 页面打点配置函数
     */
    VeniLogCenter.prototype.business = function (handler) {
        if (utils.isFunction(handler)) {
            handler(this.getPage(), this.Behavior, this);
        }
    }

    VeniLogCenter.prototype.init = function (cfg) {
        currentPage = new veniLog.VeniLogPageClass();
        //入口设置
        var meta = this.getMeta();
        var url = utils.ifn(veniLog.customUrl, meta.customUrl);
        //1.优先去customUrl 如果存在则则使用自定义配置进行打点
        if (utils.ifn(url, false)) {
            this.customUrl = url;
            return utils.using(url);
        } else {
            this.bootstrap(cfg);
        }
    }

    /**
     * 启动数据打点
     **/
    VeniLogCenter.prototype.bootstrap = function (cfg) {
        veniLog.console('开始启动打点');
        this.configure(cfg);
        if (meta.open) {
            this.ready();
        } else {
            veniLog.console('打点开关为false 如果需打开打点 ,请设置<meta rbi="yes" name="open" content="true"/>')
        }
    }

    /**
     * 配置当前页面的数据打点
     */
    VeniLogCenter.prototype.configure = function (cfg) {
        meta = this.getMeta();
        meta.open = meta.open == "true";
        meta.rbiCustom = meta.rbiCustom == "true";
        meta.sourceId = parseInt(meta.sourceId);
        utils.assign(meta, cfg);
        this.meta = utils.assign({}, meta);
        this.cfg = cfg;
        this.resouceHostUrl = resouceHostUrl = meta.resourceUrl;
        veniLog.console('配置打点数据');
    }

    /**
     * 加载指定打点器
     */
    VeniLogCenter.prototype.ready = function () {
        veniLog.console('装载打点页面实例');
        var page = currentPage;
        var context = this;
        var pageId = utils.ifn(meta.rbiPageId, meta.rbiPage);
        page.setTemplateModel(veniLog.templateModel);
        //初始化日志服务器参数
        page.init(meta.hostUrl, meta.sourceId, pageId);

        //记录页面进入日志
        page.log(page.getPageRecord(VeniLog.LOGEVENTS.PAGEIN));

        //延迟装载默认通用打点器
        setTimeout(function () { context.readyRbi(page); }, 20);

        if (meta.rbiCustom) {
            //装载自定义打点配置
            using(meta.rbiPage);
        }
    }

    /**
     * 装载配置的打点器
     */
    VeniLogCenter.prototype.readyRbi = function (page) {
        var behaviors = this.cfg.behaviors || { click: true };
        var behavior = null;
        for (var i in behaviors) {
            behavior = behaviors[i];
            veniLog.console('装载行为:' + i);
            //装载按钮点击打点器
            page.readyBehavior(i);
        }
    }

    /**
     *  获取指定名称打点器的配置
     */
    VeniLogCenter.prototype.getBehaviorCfg = function(name){
        var cfg = this.cfg || {};
        var behaviors = cfg.behaviors || {};
        var behavior  =behaviors[name];
        return behavior || {};
    }

    /**
     * 页面加载后
     */
    VeniLogCenter.prototype.readyOnLoad = function (handler) {
        var originLoad = window.onload;
        window.onload = function () {
            handler();
            if (utils.isFunction(originLoad)) {
                originLoad.apply(this, arguments);
            }
        }
    }

    /**
     * 获取打点器资源服务器地址
     */
    VeniLogCenter.prototype.getResouceHostUrl = function () {
        return resouceHostUrl;
    }

    /**
     * 名称:获取配置元数据
     */
    VeniLogCenter.prototype.getMeta = function () {
        var metaList = document.getElementsByTagName("meta");
        var data = {};
        for (var i = 0, meta = null, k = metaList.length; i < k; i++) {
            meta = metaList[i];
            if (meta.getAttribute("rbi") == "yes") {
                data[meta.name] = meta.getAttribute('content');
            }
        }
        return data;
    }

    /**
     * 加载指定页面打点配置
     */
    function using(name) {
        if (!rbiPages[name]) {
            utils.using(utils.format('{0}/pages/{1}.js', veniLog.center.getResouceHostUrl(), name), function () {
                rbiPages[name] = true;
                veniLog.console('装载页面' + name + '自定义配置完毕');
            });
        }
    }
} (window));;

//以下代码源文件：(src/venilog2/lib/rbier.js)如需调整代码，请更改此路径文件 
/**
 * 名称:打点器基类
 * 日期:2016-01-14
 * 作者:Beven
 * 描述:
 *        用于提供打点器规范,以及抽取打点器通用方法通过集成方式进行复用
 *        同时也便于以后统一变更打点器设计.
 */
(function (veniLog) {

    var behaviors = {};

    var utils = veniLog.utils;

    var center = veniLog.center;

    /**
     * 打点器构造函数
     * @constructor
     */
    function VeniLogBehaviorClass() {

    }

    veniLog.Behavior = VeniLogBehaviorClass;

    /**
     * 打点器监听容器 推荐在构造函数中初始化
     * @type {null}
     */
    VeniLogBehaviorClass.prototype.container = null;

    /**
     * 装载指定打点器
     * @param name 打点器名称 默认会在已加载的打点器列表中查找,如果不存在则远程去指定服务器加载rbi目录下载同名的打点器
     */
    VeniLogBehaviorClass.ready = function (name,handler) {
        return using(name).success(handler);
    }

    /**
     * 注册一个打点器
     * @param 打点器名称
     * @param constructor 打点器构造函数
     */
    VeniLogBehaviorClass.register = function (name, constructor) {
        if (behaviors[name]) {
            throw new Error(utils.format('已经存在相同名称的打点器:{0}', name))
        }
        utils.extend(constructor, this);
        behaviors[name] = constructor;
        return constructor;
    }

    /**
     * 自动发送打点日志
     * @param recordOrRecords 打点参数 ,recordOrRecords为对象则使用push 如果recordOrRecord为数组则使用pushRecords
     */
    VeniLogBehaviorClass.prototype.log = function (recordOrRecords) {
        return center.getPage().log(recordOrRecords);
    }

    /**
     * 按照指定间隔进行发送打点请求 直到满足 指定条件即可
     * @param  name 任务名称
     * @param record 可以是打点对象 也可以是一个获取打点数据对象的函数 注意:如果record为一个数组则默认调用pushRecords
     * @param invertal 执行间隔
     * 返回: {start:重新开始方法,stop:停止任务方法,until:添加终止任务判断函数}
     */
    VeniLogBehaviorClass.prototype.task = function (name, record, interval) {
        return center.getPage().task(name, record, interval);
    }

    /**
     * 获取一个默认的打点数据对象
     * @param eventId 事件id
     */
    VeniLogBehaviorClass.prototype.getRecord = function (eventId) {
        return center.getPage().getPageRecord(eventId);
    }

    /**
     * 添加一个监听,绑定指定类型事件
     * @param type 事件类型 例如:click dblclcik blur
     * @param handler 回调函数
     * 注意:当前事件监听父级元素为this.$box
     */
    VeniLogBehaviorClass.prototype.bind = function (type, handler) {
        var self = this;
        var contaienr = this.container || document.body;
        utils.addEventListener(contaienr,type, function (ev) {
            utils.call(self, handler, ev, this);
        });
    }

    /**
     * 加载指定打点器
     */
    function using(name) {
       return utils.simplePromise(function(callback,errorCallback){
           if (behaviors[name]) {
               callback(newInstance(name));
           } else {
               utils.using(utils.format('{0}/rbi/{1}.js', center.getResouceHostUrl(), name), function () {
                   if (behaviors[name]) {
                       callback(newInstance(name));
                   } else {
                       var error = '装载打点器' + name + '失败';
                       center.consoleLog(error);
                       if(errorCallback){
                           errorCallback(error);
                       }
                   }
               });
           }
       });
    }

    function newInstance(name) {
        var Behavior = behaviors[name];
        var cfg = center.getBehaviorCfg(name);
        return new Behavior(cfg);
    }

}(VeniLog));;

//以下代码源文件：(src/venilog2/lib/rbiers/click.js)如需调整代码，请更改此路径文件 
/**
 * 名称:点击行为打点器
 * 日期:2016-03-22
 * 作者:Beven
 * 描述:用于监听页面所有可点击的元素的点击事件
 */
(function(env) {

    var singleRbiderInstance = null;

    var VeniLog = env.VeniLog;

    var utils = VeniLog.utils;

    var allowTags = {
        "a": true,
        "map": true,
        "button": true
    }

    /**
     * 按钮点击 打点器
     * @constructor
     */
    function ButtonClickVenilogRbider(cfg) {
        //这里做单例模式一个页面仅允许出现一次 按钮 点击打点器
        if (null === singleRbiderInstance) {
            singleRbiderInstance = this;
            this.init();
        }
        this.onlyMarke = cfg.onlyMarke;
        return singleRbiderInstance;
    }

    //注册一个打点器
    VeniLog.Behavior.register('click', ButtonClickVenilogRbider);

    //事件id
    ButtonClickVenilogRbider.prototype.eventId = 3003;

    /**
     * 初始化 按钮点击打点器
     */
    ButtonClickVenilogRbider.prototype.init = function() {
        var name = (document.hasOwnProperty && document.hasOwnProperty("ontouchstart")) ? 'touchstart' : 'click';
        this.bind(name, this.onClickRbiButton);
    }

    /**
     * 事件响应:当被监听的打点按钮点击时
     */
    ButtonClickVenilogRbider.prototype.onClickRbiButton = function(ev) {
        var button = ev.srcElement || ev.target;
        var dom = this.getVenilogParentDom(button);
        if (dom) {
            var clickLog = dom.getAttribute("data-click-log");
            var id = clickLog || this.xPath(dom);
            var entry = dom.getAttribute("data-log-entry");
            var ignored = dom.getAttribute("data-log-ignroed");
            if(ignored=="true"){
                return;
            }
            //发送打点日志
            VeniLog.log(this.eventId, id, entry);
        }
    }

    /**
     * 获取有打点标记的父级元素
     */
    ButtonClickVenilogRbider.prototype.getVenilogParentDom = function(dom) {
        if (this.isVenilogClick(dom)) {
            return dom;
        }
        var parent = dom.parentElement;
        var clickDom = null;
        while (parent) {
            if (this.isVenilogClick(parent)) {
                clickDom = parent;
                break;
            }
            parent = parent.parentElement;
        }
        return clickDom;
    }

    /**
     * 发送指定dom元素点击打点
     */
    ButtonClickVenilogRbider.prototype.isVenilogClick = function(button) {
        if (this.onlyMarke) {
            return this.isOnlyMarke(button);
        } else {
            var type = button.type;
            var clickLog = button.getAttribute("data-click-log") !== null;
            var dataTag = button.getAttribute("data-tag") !== null;
            var tagName = button.tagName.toLowerCase();
            return (allowTags[tagName] || (tagName == "input" && (type == "image" || type == "submit" || type == "button")) || clickLog || dataTag);
        }
    }

    /**
     * 发送指定dom元素点击打点
     */
    ButtonClickVenilogRbider.prototype.isOnlyMarke = function(button) {
        var type = button.type;
        return button.getAttribute("data-click-log") !== null;
    }

    /**
     * 获取一个按钮的唯一id
     */
    ButtonClickVenilogRbider.prototype.getButtonId = function(button) {
        var id = button.getAttribute("data-click-log") || button.id;
        if (!id) {
            var text = button.value || "";
            var segments = (button.className).split(' ');
            segments.push(text);
            id = segments.join('_');
            id = id.replace(/\s/g, '');
        }
        return id;
    }

    /**
     * 获取元素的xpath
     */
    ButtonClickVenilogRbider.prototype.xPath = function(element) {
        var xpath = element.tagName;
        var o = element;
        while (o = o.parentNode) {
            xpath = o.tagName + ':' + this.getIndex(o) + '/' + xpath;
            if (o.tagName == 'BODY') {
                break;
            }
        }
        return xpath + ":" + this.getIndex(element) + "." + this.getButtonId(element);
    }

    //获取指定dom在父级元素中的index
    ButtonClickVenilogRbider.prototype.getIndex = function(dom) {
        var parent = dom.parentElement;
        var children = parent.children;
        for (var i = 0, k = children.length; i < k; i++) {
            if (children[i] == dom) {
                return i;
            }
        }
        return -1;
    }

}(window));