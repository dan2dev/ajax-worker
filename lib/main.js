import AjaxWork from "./ajax-work";
var resolveRelative = require("resolve-relative-url");
var newHashFrom = require("object-hash");
import { Url } from "utility-collection";
import { process } from "uniqid";
// // console.log("ajax-worker");
var AjaxWorker = /** @class */ (function () {
    function AjaxWorker() {
    }
    return AjaxWorker;
}());
export { AjaxWorker };
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
        return "(" + AjaxWork.Worker.toString() + ")();";
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
        var newUrl = new Url(options.url);
        newUrl.deleteQuery(nocache);
        options.url = newUrl.toString();
        var newUrlRedirect = new Url(options.url);
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
            // keepalive: true,
            referrerPolicy: "no-referrer",
            mode: "cors",
            sync: true,
            id: null,
            abort: false,
        };
        // new options ---------------------------------------
        var newOptions = Object.assign(defaultOptions, options);
        newOptions.url = resolveRelative(newOptions.url, window.location.origin); // get url
        newOptions.hash = getHash(newOptions); // get hadh
        newOptions.id = getId(newOptions.id); // get id
        // url no cache -------
        var url = new Url(newOptions.url);
        url.setQuery(nocache, process());
        newOptions.url = url.toString();
        // --------------
        // add to callbackStack -------------------------------
        callbackStackOptions[newOptions.hash] = (Object.assign({}, newOptions));
        for (var key in newOptions) {
            if (typeof newOptions[key] === "function") {
                delete newOptions[key];
            }
        }
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
})(AjaxWorker || (AjaxWorker = {}));
AjaxWorker.init();
// --------------------------------------
export default AjaxWorker;
//# sourceMappingURL=main.js.map