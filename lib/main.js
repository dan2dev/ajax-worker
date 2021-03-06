"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ajax_work_1 = require("./ajax-work");
var resolveRelative = require("resolve-relative-url");
var newHashFrom = require("object-hash");
var utility_collection_1 = require("utility-collection");
var uniqid_1 = require("uniqid");
var AjaxWorker = /** @class */ (function () {
    function AjaxWorker() {
    }
    return AjaxWorker;
}());
exports.AjaxWorker = AjaxWorker;
(function (AjaxWorker) {
    var nocache = "ajaxworkercache";
    // shared Methods -------------------
    var sharedMethods = {
        onDone: function (args) {
            var options = args[0];
            fetchDone(options);
        },
        onAbort: function (args) {
            var options = args[0];
            fetchAbort(options);
        },
        clean: function () {
            fetchClean();
        },
    };
    function execute(actionName, args) {
        getWorker().postMessage({
            method: actionName,
            args: args,
        });
    }
    // worker -------------------
    var urlWorker;
    var worker;
    function getWorkerScript() {
        return "(" + ajax_work_1.default.Worker.toString() + ")();";
    }
    function getUrlWorker() {
        if (urlWorker === undefined) {
            var blobData = new Blob([getWorkerScript()], {
                type: "application/javascript",
            });
            urlWorker = window.URL.createObjectURL(blobData);
        }
        return urlWorker;
    }
    function getWorker() {
        if (worker === undefined) {
            worker = new Worker(getUrlWorker());
            worker.onmessage = function (event) {
                sharedMethods[event.data.method](event.data.args);
            };
        }
        return worker;
    }
    // fetch ---------------------------------------------------
    var lastId = 0;
    function getId(id) {
        lastId = lastId + 1;
        if (id !== undefined && id !== null) {
            return id;
        }
        else {
            return lastId.toString();
        }
    }
    function getHash(obj) {
        var newOBj = Object.assign({}, obj);
        for (var key in newOBj) {
            if (typeof newOBj[key] === "function") {
                delete newOBj[key];
            }
        }
        return newHashFrom(newOBj);
    }
    var callbackStackOptions = {};
    function fetchDone(options) {
        // remove cache url
        var newUrl = new utility_collection_1.Url(options.url);
        newUrl.deleteQuery(nocache);
        options.url = newUrl.toString();
        var newUrlRedirect = new utility_collection_1.Url(options.url);
        newUrlRedirect.deleteQuery(nocache);
        options.urlRedirected = newUrlRedirect.toString();
        // remove cache url end
        if (callbackStackOptions[options.hash] !== undefined) {
            var item = callbackStackOptions[options.hash];
            if (options.error === true) {
                if (item.onError !== undefined) {
                    item.onError(options);
                }
            }
            else {
                if (item.onSuccess !== undefined) {
                    item.onSuccess(options);
                }
            }
            if (item.onDone !== undefined) {
                item.onDone(options);
            }
            // callbackStackOptions[options.hash] = undefined;
            // delete callbackStackOptions[options.hash];
        }
    }
    function fetchAbort(options) {
        if (callbackStackOptions[options.hash] !== undefined) {
            var item = callbackStackOptions[options.hash];
            if (options.abort === true && item.onAbort !== undefined) {
                item.onAbort(options);
            }
            // callbackStackOptions[options.hash] = undefined;
            // delete callbackStackOptions[options.hash];
        }
    }
    function fetchClean() {
        callbackStackOptions = {};
    }
    function fetch(options) {
        // default options ---------------------------
        var defaultOptions = {
            url: null,
            method: "GET",
            returnType: "json",
            cache: "no-cache",
            credentials: "include",
            referrerPolicy: "no-referrer",
            mode: "cors",
            sync: true,
            id: null,
            abort: false,
        };
        // new options ---------------------------------------
        var newOptions = Object.assign(defaultOptions, options);
        // fix body if string
        if (typeof newOptions.body !== "string") {
            newOptions.body = JSON.stringify(newOptions.body);
        }
        // console.log(newOptions);
        // ---------
        newOptions.url = resolveRelative(newOptions.url, window.location.origin); // get url
        newOptions.hash = getHash(newOptions); // get hadh
        newOptions.id = getId(newOptions.id); // get id
        // url no cache -------
        var url = new utility_collection_1.Url(newOptions.url);
        url.setQuery(nocache, uniqid_1.process());
        newOptions.url = url.toString();
        // --------------
        // add to callbackStack -------------------------------
        callbackStackOptions[newOptions.hash] = (Object.assign({}, newOptions));
        for (var key in newOptions) {
            if (typeof newOptions[key] === "function") {
                delete newOptions[key];
            }
        }
        // console.log(newOptions);
        execute("fetch", [newOptions]);
    }
    AjaxWorker.fetch = fetch;
    // init -------------------------------------------------------
    function init() {
        // console.log("ajax worker -- ");
        // console.log("ajax working");
        var w = window;
        if (w["ajaxWorker"] === undefined) {
            w["ajaxWorker"] = this;
        }
    }
    AjaxWorker.init = init;
    // export function nothing(): void {
    // 	console.log("did nothing");
    // 	//
    // }
})(AjaxWorker = exports.AjaxWorker || (exports.AjaxWorker = {}));
exports.AjaxWorker = AjaxWorker;
AjaxWorker.init();
// --------------------------------------
exports.default = AjaxWorker;
//# sourceMappingURL=main.js.map