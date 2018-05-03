"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ajax_work_1 = require("./ajax-work");
const resolveRelative = require("resolve-relative-url");
const newHashFrom = require("object-hash");
const utility_collection_1 = require("utility-collection");
const uniqid_1 = require("uniqid");
// // console.log("ajax-worker");
class AjaxWorker {
}
exports.AjaxWorker = AjaxWorker;
(function (AjaxWorker) {
    const nocache = "ajaxworkercache";
    // shared Methods -------------------
    const sharedMethods = {
        onDone: (args) => {
            const options = args[0];
            fetchDone(options);
        },
        onAbort: (args) => {
            const options = args[0];
            fetchAbort(options);
        },
        clean: () => {
            fetchClean();
        },
    };
    function execute(actionName, args) {
        getWorker().postMessage({
            method: actionName,
            args,
        });
    }
    // worker -------------------
    let urlWorker;
    let worker;
    function getWorkerScript() {
        return "(" + ajax_work_1.default.Worker.toString() + ")();";
    }
    function getUrlWorker() {
        if (urlWorker === undefined) {
            const blobData = new Blob([getWorkerScript()], {
                type: "application/javascript",
            });
            urlWorker = window.URL.createObjectURL(blobData);
        }
        return urlWorker;
    }
    function getWorker() {
        if (worker === undefined) {
            worker = new Worker(getUrlWorker());
            worker.onmessage = (event) => {
                sharedMethods[event.data.method](event.data.args);
            };
        }
        return worker;
    }
    // fetch ---------------------------------------------------
    let lastId = 0;
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
        const newOBj = Object.assign({}, obj);
        for (const key in newOBj) {
            if (typeof newOBj[key] === "function") {
                delete newOBj[key];
            }
        }
        return newHashFrom(newOBj);
    }
    let callbackStackOptions = {};
    function fetchDone(options) {
        // remove cache url
        const newUrl = new utility_collection_1.Url(options.url);
        newUrl.deleteQuery(nocache);
        options.url = newUrl.toString();
        const newUrlRedirect = new utility_collection_1.Url(options.url);
        newUrlRedirect.deleteQuery(nocache);
        options.urlRedirected = newUrlRedirect.toString();
        // remove cache url end
        if (callbackStackOptions[options.hash] !== undefined) {
            const item = callbackStackOptions[options.hash];
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
            const item = callbackStackOptions[options.hash];
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
        const defaultOptions = {
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
        const newOptions = Object.assign(defaultOptions, options);
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
        const url = new utility_collection_1.Url(newOptions.url);
        url.setQuery(nocache, uniqid_1.process());
        newOptions.url = url.toString();
        // --------------
        // add to callbackStack -------------------------------
        callbackStackOptions[newOptions.hash] = (Object.assign({}, newOptions));
        for (const key in newOptions) {
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
        const w = window;
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
AjaxWorker.init();
// --------------------------------------
exports.default = AjaxWorker;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQVBlLGVBQUksT0FPbkIsQ0FBQTtJQUNELG9DQUFvQztJQUNwQywrQkFBK0I7SUFDL0IsTUFBTTtJQUNOLElBQUk7QUFDTixDQUFDLEVBaktnQixVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQWlLMUI7QUFDRCxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbEIseUNBQXlDO0FBQ3pDLGtCQUFlLFVBQVUsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFqYXhXb3JrIGZyb20gXCIuL2FqYXgtd29ya1wiO1xyXG5pbXBvcnQgeyBJQWJzdHJhY3RGZXRjaE9wdGlvbnMsIElDb211bmljYXRpb24sIElGZXRjaE9wdGlvbnMsIElKc29uQXJyYXksIElKc29uT2JqZWN0LCBJUmVxdWVzdEluaXQsIElSZXF1ZXN0T3B0aW9ucywgSVJlc3BvbnNlT3B0aW9ucywgSVNoYXJlZE1ldGhvZHMgfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmNvbnN0IHJlc29sdmVSZWxhdGl2ZSA9IHJlcXVpcmUoXCJyZXNvbHZlLXJlbGF0aXZlLXVybFwiKTtcclxuY29uc3QgbmV3SGFzaEZyb20gPSByZXF1aXJlKFwib2JqZWN0LWhhc2hcIik7XHJcbmltcG9ydCB7IFVybCB9IGZyb20gXCJ1dGlsaXR5LWNvbGxlY3Rpb25cIjtcclxuaW1wb3J0IHsgcHJvY2VzcyB9IGZyb20gXCJ1bmlxaWRcIjtcclxuLy8gLy8gY29uc29sZS5sb2coXCJhamF4LXdvcmtlclwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBBamF4V29ya2VyIHsgfVxyXG5leHBvcnQgbmFtZXNwYWNlIEFqYXhXb3JrZXIge1xyXG4gIGNvbnN0IG5vY2FjaGUgPSBcImFqYXh3b3JrZXJjYWNoZVwiO1xyXG4gIC8vIHNoYXJlZCBNZXRob2RzIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBjb25zdCBzaGFyZWRNZXRob2RzOiB7IFthY3Rpb246IHN0cmluZ106IGFueSB9ID0ge1xyXG4gICAgb25Eb25lOiAoYXJnczogYW55W10pID0+IHtcclxuICAgICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3NbMF0gYXMgSVJlc3BvbnNlT3B0aW9uczxhbnk+O1xyXG4gICAgICBmZXRjaERvbmUob3B0aW9ucyk7XHJcbiAgICB9LFxyXG4gICAgb25BYm9ydDogKGFyZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBhcmdzWzBdIGFzIElSZXF1ZXN0T3B0aW9ucztcclxuICAgICAgZmV0Y2hBYm9ydChvcHRpb25zKTtcclxuICAgIH0sXHJcbiAgICBjbGVhbjogKCkgPT4ge1xyXG4gICAgICBmZXRjaENsZWFuKCk7XHJcbiAgICB9LFxyXG4gIH07XHJcbiAgZnVuY3Rpb24gZXhlY3V0ZShhY3Rpb25OYW1lOiBzdHJpbmcsIGFyZ3M6IEFycmF5PElKc29uT2JqZWN0IHwgSUpzb25BcnJheSB8IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBhbnk+KSB7XHJcbiAgICBnZXRXb3JrZXIoKS5wb3N0TWVzc2FnZSh7XHJcbiAgICAgIG1ldGhvZDogYWN0aW9uTmFtZSxcclxuICAgICAgYXJncyxcclxuICAgIH0pO1xyXG4gIH1cclxuICAvLyB3b3JrZXIgLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGxldCB1cmxXb3JrZXI6IHN0cmluZztcclxuICBsZXQgd29ya2VyOiBXb3JrZXI7XHJcbiAgZnVuY3Rpb24gZ2V0V29ya2VyU2NyaXB0KCkge1xyXG4gICAgcmV0dXJuIFwiKFwiICsgQWpheFdvcmsuV29ya2VyLnRvU3RyaW5nKCkgKyBcIikoKTtcIjtcclxuICB9XHJcbiAgZnVuY3Rpb24gZ2V0VXJsV29ya2VyKCkge1xyXG4gICAgaWYgKHVybFdvcmtlciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IGJsb2JEYXRhOiBCbG9iID0gbmV3IEJsb2IoW2dldFdvcmtlclNjcmlwdCgpXSwge1xyXG4gICAgICAgIHR5cGU6IFwiYXBwbGljYXRpb24vamF2YXNjcmlwdFwiLFxyXG4gICAgICB9KTtcclxuICAgICAgdXJsV29ya2VyID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYkRhdGEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVybFdvcmtlcjtcclxuICB9XHJcbiAgZnVuY3Rpb24gZ2V0V29ya2VyKCkge1xyXG4gICAgaWYgKHdvcmtlciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHdvcmtlciA9IG5ldyBXb3JrZXIoZ2V0VXJsV29ya2VyKCkpO1xyXG4gICAgICB3b3JrZXIub25tZXNzYWdlID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICBzaGFyZWRNZXRob2RzW2V2ZW50LmRhdGEubWV0aG9kXShldmVudC5kYXRhLmFyZ3MpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHdvcmtlcjtcclxuICB9XHJcbiAgLy8gZmV0Y2ggLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgbGV0IGxhc3RJZDogbnVtYmVyID0gMDtcclxuICBmdW5jdGlvbiBnZXRJZChpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGxhc3RJZCA9IGxhc3RJZCArIDE7XHJcbiAgICBpZiAoaWQgIT09IHVuZGVmaW5lZCAmJiBpZCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gaWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbGFzdElkLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGdldEhhc2gob2JqOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbmV3T0JqID0gT2JqZWN0LmFzc2lnbih7fSwgb2JqKTtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIG5ld09Caikge1xyXG4gICAgICBpZiAodHlwZW9mIG5ld09CaltrZXldID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBkZWxldGUgbmV3T0JqW2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBuZXdIYXNoRnJvbShuZXdPQmopO1xyXG4gIH1cclxuICBsZXQgY2FsbGJhY2tTdGFja09wdGlvbnM6IHsgW2hhc2g6IHN0cmluZ106IElGZXRjaE9wdGlvbnM8YW55PiB9ID0ge307XHJcbiAgZnVuY3Rpb24gZmV0Y2hEb25lPFREYXRhVHlwZT4ob3B0aW9uczogSVJlc3BvbnNlT3B0aW9uczxURGF0YVR5cGU+KSB7XHJcbiAgICAvLyByZW1vdmUgY2FjaGUgdXJsXHJcbiAgICBjb25zdCBuZXdVcmwgPSBuZXcgVXJsKG9wdGlvbnMudXJsISk7XHJcbiAgICBuZXdVcmwuZGVsZXRlUXVlcnkobm9jYWNoZSk7XHJcbiAgICBvcHRpb25zLnVybCA9IG5ld1VybC50b1N0cmluZygpO1xyXG4gICAgY29uc3QgbmV3VXJsUmVkaXJlY3QgPSBuZXcgVXJsKG9wdGlvbnMudXJsKTtcclxuICAgIG5ld1VybFJlZGlyZWN0LmRlbGV0ZVF1ZXJ5KG5vY2FjaGUpO1xyXG4gICAgb3B0aW9ucy51cmxSZWRpcmVjdGVkID0gbmV3VXJsUmVkaXJlY3QudG9TdHJpbmcoKTtcclxuICAgIC8vIHJlbW92ZSBjYWNoZSB1cmwgZW5kXHJcblxyXG4gICAgaWYgKGNhbGxiYWNrU3RhY2tPcHRpb25zW29wdGlvbnMuaGFzaCFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc3QgaXRlbSA9IGNhbGxiYWNrU3RhY2tPcHRpb25zW29wdGlvbnMuaGFzaCFdO1xyXG4gICAgICBpZiAob3B0aW9ucy5lcnJvciA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGlmIChpdGVtLm9uRXJyb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgaXRlbS5vbkVycm9yKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoaXRlbS5vblN1Y2Nlc3MgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgaXRlbS5vblN1Y2Nlc3Mob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChpdGVtLm9uRG9uZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaXRlbS5vbkRvbmUob3B0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gY2FsbGJhY2tTdGFja09wdGlvbnNbb3B0aW9ucy5oYXNoXSA9IHVuZGVmaW5lZDtcclxuICAgICAgLy8gZGVsZXRlIGNhbGxiYWNrU3RhY2tPcHRpb25zW29wdGlvbnMuaGFzaF07XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGZldGNoQWJvcnQob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSB7XHJcbiAgICBpZiAoY2FsbGJhY2tTdGFja09wdGlvbnNbb3B0aW9ucy5oYXNoIV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCBpdGVtID0gY2FsbGJhY2tTdGFja09wdGlvbnNbb3B0aW9ucy5oYXNoIV07XHJcbiAgICAgIGlmIChvcHRpb25zLmFib3J0ID09PSB0cnVlICYmIGl0ZW0ub25BYm9ydCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaXRlbS5vbkFib3J0KG9wdGlvbnMpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGNhbGxiYWNrU3RhY2tPcHRpb25zW29wdGlvbnMuaGFzaF0gPSB1bmRlZmluZWQ7XHJcbiAgICAgIC8vIGRlbGV0ZSBjYWxsYmFja1N0YWNrT3B0aW9uc1tvcHRpb25zLmhhc2hdO1xyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiBmZXRjaENsZWFuKCk6IHZvaWQge1xyXG4gICAgY2FsbGJhY2tTdGFja09wdGlvbnMgPSB7fTtcclxuICB9XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGZldGNoPFREYXRhVHlwZT4ob3B0aW9uczogSUZldGNoT3B0aW9uczxURGF0YVR5cGU+KSB7XHJcbiAgICAvLyBkZWZhdWx0IG9wdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9uczogSVJlcXVlc3RPcHRpb25zID0ge1xyXG4gICAgICB1cmw6IG51bGwsXHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgcmV0dXJuVHlwZTogXCJqc29uXCIsXHJcbiAgICAgIGNhY2hlOiBcIm5vLWNhY2hlXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgcmVmZXJyZXJQb2xpY3k6IFwibm8tcmVmZXJyZXJcIixcclxuICAgICAgbW9kZTogXCJjb3JzXCIsXHJcbiAgICAgIHN5bmM6IHRydWUsXHJcbiAgICAgIGlkOiBudWxsLFxyXG4gICAgICBhYm9ydDogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgLy8gbmV3IG9wdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBjb25zdCBuZXdPcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMgfCBhbnkgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgIC8vIGZpeCBib2R5IGlmIHN0cmluZ1xyXG4gICAgaWYgKHR5cGVvZiBuZXdPcHRpb25zLmJvZHkgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgbmV3T3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkobmV3T3B0aW9ucy5ib2R5KTtcclxuICAgIH1cclxuICAgIC8vIGNvbnNvbGUubG9nKG5ld09wdGlvbnMpO1xyXG4gICAgLy8gLS0tLS0tLS0tXHJcbiAgICBuZXdPcHRpb25zLnVybCA9IHJlc29sdmVSZWxhdGl2ZShuZXdPcHRpb25zLnVybCwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7IC8vIGdldCB1cmxcclxuXHJcbiAgICBuZXdPcHRpb25zLmhhc2ggPSBnZXRIYXNoKG5ld09wdGlvbnMpOyAvLyBnZXQgaGFkaFxyXG4gICAgbmV3T3B0aW9ucy5pZCA9IGdldElkKG5ld09wdGlvbnMuaWQpOyAvLyBnZXQgaWRcclxuICAgIC8vIHVybCBubyBjYWNoZSAtLS0tLS0tXHJcbiAgICBjb25zdCB1cmwgPSBuZXcgVXJsKG5ld09wdGlvbnMudXJsKTtcclxuICAgIHVybC5zZXRRdWVyeShub2NhY2hlLCBwcm9jZXNzKCkpO1xyXG4gICAgbmV3T3B0aW9ucy51cmwgPSB1cmwudG9TdHJpbmcoKTtcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBhZGQgdG8gY2FsbGJhY2tTdGFjayAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBjYWxsYmFja1N0YWNrT3B0aW9uc1tuZXdPcHRpb25zLmhhc2hdID0gKE9iamVjdC5hc3NpZ24oe30sIG5ld09wdGlvbnMpKTtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIG5ld09wdGlvbnMpIHtcclxuICAgICAgaWYgKHR5cGVvZiBuZXdPcHRpb25zW2tleV0gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGRlbGV0ZSBuZXdPcHRpb25zW2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGNvbnNvbGUubG9nKG5ld09wdGlvbnMpO1xyXG4gICAgZXhlY3V0ZShcImZldGNoXCIsIFtuZXdPcHRpb25zXSk7XHJcbiAgfVxyXG4gIC8vIGluaXQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJhamF4IHdvcmtlciAtLSBcIik7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImFqYXggd29ya2luZ1wiKTtcclxuICAgIGNvbnN0IHcgPSB3aW5kb3cgYXMgYW55O1xyXG4gICAgaWYgKHdbXCJhamF4V29ya2VyXCJdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgd1tcImFqYXhXb3JrZXJcIl0gPSB0aGlzO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBleHBvcnQgZnVuY3Rpb24gbm90aGluZygpOiB2b2lkIHtcclxuICAvLyBcdGNvbnNvbGUubG9nKFwiZGlkIG5vdGhpbmdcIik7XHJcbiAgLy8gXHQvL1xyXG4gIC8vIH1cclxufVxyXG5BamF4V29ya2VyLmluaXQoKTtcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGRlZmF1bHQgQWpheFdvcmtlcjtcclxuIl19
