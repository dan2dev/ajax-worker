(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AjaxWork;
(function (AjaxWork) {
    // The fuction bellow will be executed in worker
    // use it to execute the thread
    function Worker() {
        const locationOrigin = null;
        const sharedMethods = {
            orderStack: {},
            init: (args) => {
                this.locationOrigin = args[0];
            },
            fetch: (args) => {
                const options = args[0];
                ajax(options);
            },
        };
        // ajax fetch ------------------------------
        let syncResponse = {};
        const syncRequestStack = [];
        function sendBack(options) {
            if (options.sync === true) {
                // store in the response store -----------------
                syncResponse[options.hash] = options;
                // loop in the requests ----------------
                while (syncRequestStack.length > 0) {
                    if (syncRequestStack[0].abort === true) {
                        execute("onAbort", [syncRequestStack[0]]);
                        syncRequestStack.shift();
                    }
                    else {
                        if (syncResponse[syncRequestStack[0].hash] === undefined) {
                            break;
                        }
                        else {
                            const r = syncResponse[syncRequestStack[0].hash];
                            execute("onDone", [r]);
                            syncRequestStack.shift();
                        }
                    }
                }
                // clean the syncResponse
                if (syncRequestStack.length === 0) {
                    syncResponse = {};
                    execute("clean", []);
                }
            }
            else {
                execute("onDone", [options]);
            }
        }
        function ajaxRequestStackPush(options) {
            if (options.sync === true) {
                for (const i of syncRequestStack) {
                    if (options.id === i.id || options.hash === i.hash) {
                        i.abort = true;
                    }
                }
                syncRequestStack.push(options);
            }
        }
        function ajax(options) {
            const fetchReturn = {
                id: options.id,
                url: options.url,
                status: 404,
                returnType: options.returnType,
                statusText: "Error on Ajax-Worker!",
                data: null,
                headers: [],
                redirected: false,
                urlRedirected: null,
                errorMessage: null,
                error: false,
                sync: options.sync,
                hash: options.hash,
            };
            // sync ----------------------------
            // fetch ---------------------------
            options.keepalive = false;
            ajaxRequestStackPush(options);
            if (options.url === null) {
                console.error("url cannot be null");
                sendBack(fetchReturn);
                return;
            }
            const fetchPromise = fetch(options.url, options)
                .then((response) => {
                fetchReturn.status = response.status;
                fetchReturn.statusText = response.statusText;
                fetchReturn.urlRedirected = response.url;
                fetchReturn.redirected = (fetchReturn.urlRedirected !== fetchReturn.url);
                fetchReturn.headers = response.headers;
                fetchReturn.headers = [];
                response.headers.forEach((value, key) => {
                    fetchReturn.headers.push([key, value]);
                });
                const headerContentType = response.headers.get("content-type");
                let contentType = "text";
                if (headerContentType && (headerContentType.includes("application/json") || headerContentType.includes("text/json"))) {
                    contentType = "json";
                }
                else {
                    contentType = "text";
                }
                // -------------------------------
                if (contentType === "text") {
                    fetchReturn.returnType = "text";
                    return response.text();
                }
                else if (contentType === "json") {
                    fetchReturn.returnType = "json";
                    return response.json();
                }
            })
                .then((data) => {
                fetchReturn.data = data;
                sendBack(fetchReturn);
            })
                .catch((error) => {
                fetchReturn.errorMessage = error;
                fetchReturn.error = true;
                sendBack(fetchReturn);
            });
        }
        // same functions here
        function execute(actionName, args) {
            self.postMessage({
                method: actionName,
                args,
            });
        }
        self.onmessage = (event) => {
            const args = event.data.args;
            sharedMethods[event.data.method](args);
        };
    }
    AjaxWork.Worker = Worker;
})(AjaxWork = exports.AjaxWork || (exports.AjaxWork = {}));
exports.default = AjaxWork;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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SUFBSSxDQUFDO2dCQUN6QixRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0Qsc0JBQXNCO1FBQ3RCLGlCQUFpQixVQUFrQixFQUFFLElBQXVFO1lBQzFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ2YsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLElBQUk7YUFDTCxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQzlCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzdCLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQztJQUNKLENBQUM7SUEvSGUsZUFBTSxTQStIckIsQ0FBQTtBQUNILENBQUMsRUFuSWdCLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBbUl4QjtBQUNELGtCQUFlLFFBQVEsQ0FBQyIsImZpbGUiOiJhamF4LXdvcmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgQWpheFdvcmtlciBmcm9tIFwiLi9tYWluXCI7XHJcbmRlY2xhcmUgdmFyIHNlbGY6IFdvcmtlcjtcclxuLy8gaW1wb3J0ICogYXMgSW50ZXJmYWNlIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgSUFic3RyYWN0RmV0Y2hPcHRpb25zLCBJQ29tdW5pY2F0aW9uLCBJRmV0Y2hPcHRpb25zLCBJSnNvbkFycmF5LCBJSnNvbk9iamVjdCwgSVJlcXVlc3RJbml0LCBJUmVxdWVzdE9wdGlvbnMsIElSZXNwb25zZU9wdGlvbnMsIElTaGFyZWRNZXRob2RzIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBBamF4V29yayB7XHJcbiAgLy8gVGhlIGZ1Y3Rpb24gYmVsbG93IHdpbGwgYmUgZXhlY3V0ZWQgaW4gd29ya2VyXHJcbiAgLy8gdXNlIGl0IHRvIGV4ZWN1dGUgdGhlIHRocmVhZFxyXG4gIGV4cG9ydCBmdW5jdGlvbiBXb3JrZXIoKSB7XHJcbiAgICBjb25zdCBsb2NhdGlvbk9yaWdpbjogYW55ID0gbnVsbDtcclxuICAgIGNvbnN0IHNoYXJlZE1ldGhvZHM6IElTaGFyZWRNZXRob2RzID0ge1xyXG4gICAgICBvcmRlclN0YWNrOiB7fSxcclxuICAgICAgaW5pdDogKGFyZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbk9yaWdpbiA9IGFyZ3NbMF07XHJcbiAgICAgIH0sXHJcbiAgICAgIGZldGNoOiAoYXJnczogYW55W10pID0+IHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gYXJnc1swXTtcclxuICAgICAgICBhamF4KG9wdGlvbnMpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIC8vIGFqYXggZmV0Y2ggLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBsZXQgc3luY1Jlc3BvbnNlOiB7IFtpZDogc3RyaW5nXTogSVJlc3BvbnNlT3B0aW9uczxhbnk+IH0gPSB7fTtcclxuICAgIGNvbnN0IHN5bmNSZXF1ZXN0U3RhY2s6IElSZXF1ZXN0T3B0aW9uc1tdID0gW107XHJcbiAgICBmdW5jdGlvbiBzZW5kQmFjayhvcHRpb25zOiBJUmVzcG9uc2VPcHRpb25zPGFueT4pIHtcclxuICAgICAgaWYgKG9wdGlvbnMuc3luYyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIC8vIHN0b3JlIGluIHRoZSByZXNwb25zZSBzdG9yZSAtLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHN5bmNSZXNwb25zZVtvcHRpb25zLmhhc2ghXSA9IG9wdGlvbnM7XHJcbiAgICAgICAgLy8gbG9vcCBpbiB0aGUgcmVxdWVzdHMgLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHdoaWxlIChzeW5jUmVxdWVzdFN0YWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGlmIChzeW5jUmVxdWVzdFN0YWNrWzBdLmFib3J0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGV4ZWN1dGUoXCJvbkFib3J0XCIsIFtzeW5jUmVxdWVzdFN0YWNrWzBdXSk7XHJcbiAgICAgICAgICAgIHN5bmNSZXF1ZXN0U3RhY2suc2hpZnQoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChzeW5jUmVzcG9uc2Vbc3luY1JlcXVlc3RTdGFja1swXS5oYXNoIV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHIgPSBzeW5jUmVzcG9uc2Vbc3luY1JlcXVlc3RTdGFja1swXS5oYXNoIV07XHJcbiAgICAgICAgICAgICAgZXhlY3V0ZShcIm9uRG9uZVwiLCBbcl0pO1xyXG4gICAgICAgICAgICAgIHN5bmNSZXF1ZXN0U3RhY2suc2hpZnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjbGVhbiB0aGUgc3luY1Jlc3BvbnNlXHJcbiAgICAgICAgaWYgKHN5bmNSZXF1ZXN0U3RhY2subGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICBzeW5jUmVzcG9uc2UgPSB7fTtcclxuICAgICAgICAgIGV4ZWN1dGUoXCJjbGVhblwiLCBbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGV4ZWN1dGUoXCJvbkRvbmVcIiwgW29wdGlvbnNdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYWpheFJlcXVlc3RTdGFja1B1c2gob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLnN5bmMgPT09IHRydWUpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGkgb2Ygc3luY1JlcXVlc3RTdGFjaykge1xyXG4gICAgICAgICAgaWYgKG9wdGlvbnMuaWQgPT09IGkuaWQgfHwgb3B0aW9ucy5oYXNoID09PSBpLmhhc2gpIHtcclxuICAgICAgICAgICAgaS5hYm9ydCA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN5bmNSZXF1ZXN0U3RhY2sucHVzaChvcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYWpheChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgY29uc3QgZmV0Y2hSZXR1cm46IElSZXNwb25zZU9wdGlvbnM8YW55PiA9IHtcclxuICAgICAgICBpZDogb3B0aW9ucy5pZCxcclxuICAgICAgICB1cmw6IG9wdGlvbnMudXJsLFxyXG4gICAgICAgIHN0YXR1czogNDA0LFxyXG4gICAgICAgIHJldHVyblR5cGU6IG9wdGlvbnMucmV0dXJuVHlwZSxcclxuICAgICAgICBzdGF0dXNUZXh0OiBcIkVycm9yIG9uIEFqYXgtV29ya2VyIVwiLFxyXG4gICAgICAgIGRhdGE6IG51bGwsXHJcbiAgICAgICAgaGVhZGVyczogW10sXHJcbiAgICAgICAgcmVkaXJlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgdXJsUmVkaXJlY3RlZDogbnVsbCxcclxuICAgICAgICBlcnJvck1lc3NhZ2U6IG51bGwsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlLFxyXG4gICAgICAgIHN5bmM6IG9wdGlvbnMuc3luYyxcclxuICAgICAgICBoYXNoOiBvcHRpb25zLmhhc2gsXHJcbiAgICAgIH07XHJcbiAgICAgIC8vIHN5bmMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAvLyBmZXRjaCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgb3B0aW9ucy5rZWVwYWxpdmUgPSBmYWxzZTtcclxuICAgICAgYWpheFJlcXVlc3RTdGFja1B1c2gob3B0aW9ucyk7XHJcbiAgICAgIGlmIChvcHRpb25zLnVybCA9PT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ1cmwgY2Fubm90IGJlIG51bGxcIik7XHJcbiAgICAgICAgc2VuZEJhY2soZmV0Y2hSZXR1cm4pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBmZXRjaFByb21pc2UgPSBmZXRjaChvcHRpb25zLnVybCwgb3B0aW9ucylcclxuICAgICAgICAudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgZmV0Y2hSZXR1cm4uc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xyXG4gICAgICAgICAgZmV0Y2hSZXR1cm4uc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XHJcbiAgICAgICAgICBmZXRjaFJldHVybi51cmxSZWRpcmVjdGVkID0gcmVzcG9uc2UudXJsO1xyXG4gICAgICAgICAgZmV0Y2hSZXR1cm4ucmVkaXJlY3RlZCA9IChmZXRjaFJldHVybi51cmxSZWRpcmVjdGVkICE9PSBmZXRjaFJldHVybi51cmwpO1xyXG4gICAgICAgICAgZmV0Y2hSZXR1cm4uaGVhZGVycyA9IHJlc3BvbnNlLmhlYWRlcnM7XHJcbiAgICAgICAgICBmZXRjaFJldHVybi5oZWFkZXJzID0gW107XHJcblxyXG4gICAgICAgICAgcmVzcG9uc2UuaGVhZGVycy5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAoZmV0Y2hSZXR1cm4uaGVhZGVycyBhcyBzdHJpbmdbXVtdKS5wdXNoKFtrZXksIHZhbHVlXSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IGhlYWRlckNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIik7XHJcbiAgICAgICAgICBsZXQgY29udGVudFR5cGU6IHN0cmluZyA9IFwidGV4dFwiO1xyXG4gICAgICAgICAgaWYgKGhlYWRlckNvbnRlbnRUeXBlICYmIChoZWFkZXJDb250ZW50VHlwZS5pbmNsdWRlcyhcImFwcGxpY2F0aW9uL2pzb25cIikgfHwgaGVhZGVyQ29udGVudFR5cGUuaW5jbHVkZXMoXCJ0ZXh0L2pzb25cIikpKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlID0gXCJqc29uXCI7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb250ZW50VHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgaWYgKGNvbnRlbnRUeXBlID09PSBcInRleHRcIikge1xyXG4gICAgICAgICAgICBmZXRjaFJldHVybi5yZXR1cm5UeXBlID0gXCJ0ZXh0XCI7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnRUeXBlID09PSBcImpzb25cIikge1xyXG4gICAgICAgICAgICBmZXRjaFJldHVybi5yZXR1cm5UeXBlID0gXCJqc29uXCI7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICBmZXRjaFJldHVybi5kYXRhID0gZGF0YTtcclxuICAgICAgICAgIHNlbmRCYWNrKGZldGNoUmV0dXJuKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICAgICAgZmV0Y2hSZXR1cm4uZXJyb3JNZXNzYWdlID0gZXJyb3I7XHJcbiAgICAgICAgICBmZXRjaFJldHVybi5lcnJvciA9IHRydWU7XHJcbiAgICAgICAgICBzZW5kQmFjayhmZXRjaFJldHVybik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBzYW1lIGZ1bmN0aW9ucyBoZXJlXHJcbiAgICBmdW5jdGlvbiBleGVjdXRlKGFjdGlvbk5hbWU6IHN0cmluZywgYXJnczogQXJyYXk8SUpzb25PYmplY3QgfCBJSnNvbkFycmF5IHwgc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IGFueT4pIHtcclxuICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgbWV0aG9kOiBhY3Rpb25OYW1lLFxyXG4gICAgICAgIGFyZ3MsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2VsZi5vbm1lc3NhZ2UgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBhcmdzID0gZXZlbnQuZGF0YS5hcmdzO1xyXG4gICAgICBzaGFyZWRNZXRob2RzW2V2ZW50LmRhdGEubWV0aG9kXShhcmdzKTtcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEFqYXhXb3JrO1xyXG4iXX0=

},{}],2:[function(require,module,exports){
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

},{"./ajax-work":1,"object-hash":10,"resolve-relative-url":15,"uniqid":16,"utility-collection":22}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],5:[function(require,module,exports){
(function (global){
/*! http://mths.be/punycode v1.2.4 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports;
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings.
	 * @private
	 * @param {String} domain The domain name.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		return map(string.split(regexSeparators), fn).join('.');
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <http://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols to a Punycode string of ASCII-only
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name to Unicode. Only the
	 * Punycoded parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it on a string that has already been converted to
	 * Unicode.
	 * @memberOf punycode
	 * @param {String} domain The Punycode domain name to convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the
	 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it with a domain that's already in ASCII.
	 * @memberOf punycode
	 * @param {String} domain The domain name to convert, as a Unicode string.
	 * @returns {String} The Punycode representation of the given domain name.
	 */
	function toASCII(domain) {
		return mapDomain(domain, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.2.4',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
var os = require('os');

var lib = {};

function parallel(tasks, done) {
    var results = [];
    var errs = [];
    var length = 0;
    var doneLength = 0;
    function doneIt(ix, err, result) {
        if (err) {
            errs[ix] = err;
        } else {
            results[ix] = result;
        }
        doneLength += 1;
        if (doneLength >= length) {
            done(errs.length > 0 ? errs : errs, results);
        }
    }
    Object.keys(tasks).forEach(function (key) {
        length += 1;
        var task = tasks[key];
        (global.setImmediate || global.setTimeout)(function () {
            task(doneIt.bind(null, key), 1);
        });
    });
}

lib.networkInterfaces = function () {
    var ifaces = os.networkInterfaces();
    var allAddresses = {};
    Object.keys(ifaces).forEach(function (iface) {
        addresses = {};
        var hasAddresses = false;
        ifaces[iface].forEach(function (address) {
            if (!address.internal) {
                addresses[(address.family || "").toLowerCase()] = address.address;
                hasAddresses = true;
                if (address.mac) {
                    addresses.mac = address.mac;
                }
            }
        });
        if (hasAddresses) {
            allAddresses[iface] = addresses;
        }
    });
    return allAddresses;
};

var _getMacAddress;
switch (os.platform()) {

    case 'win32':
        _getMacAddress = require('./lib/windows.js');
        break;

    case 'linux':
        _getMacAddress = require('./lib/linux.js');
        break;

    case 'darwin':
    case 'sunos':
        _getMacAddress = require('./lib/unix.js');
        break;
        
    default:
        console.warn("node-macaddress: Unkown os.platform(), defaulting to `unix'.");
        _getMacAddress = require('./lib/unix.js');
        break;

}

lib.one = function (iface, callback) {
    if (typeof iface === 'function') {
        callback = iface;

        var ifaces = lib.networkInterfaces();
        var alleged = [ 'eth0', 'eth1', 'en0', 'en1' ];
        iface = Object.keys(ifaces)[0];
        for (var i = 0; i < alleged.length; i++) {
            if (ifaces[alleged[i]]) {
                iface = alleged[i];
                break;
            }
        }
        if (!ifaces[iface]) {
            if (typeof callback === 'function') {
                callback("no interfaces found", null);
            }
            return null;
        }
        if (ifaces[iface].mac) {
            if (typeof callback === 'function') {
                callback(null, ifaces[iface].mac);
            }
            return ifaces[iface].mac;
        }
    }
    if (typeof callback === 'function') {
        _getMacAddress(iface, callback);
    }
    return null;
};

lib.all = function (callback) {

    var ifaces = lib.networkInterfaces();
    var resolve = {};

    Object.keys(ifaces).forEach(function (iface) {
        if (!ifaces[iface].mac) {
            resolve[iface] = _getMacAddress.bind(null, iface);
        }
    });

    if (Object.keys(resolve).length === 0) {
        if (typeof callback === 'function') {
            callback(null, ifaces);
        }
        return ifaces;
    }

    parallel(resolve, function (err, result) {
        Object.keys(result).forEach(function (iface) {
            ifaces[iface].mac = result[iface];
        });
        if (typeof callback === 'function') {
            callback(null, ifaces);
        }
    });
    return null;
};

module.exports = lib;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./lib/linux.js":7,"./lib/unix.js":8,"./lib/windows.js":9,"os":11}],7:[function(require,module,exports){
var exec = require('child_process').exec;

module.exports = function (iface, callback) {
    exec("cat /sys/class/net/" + iface + "/address", function (err, out) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, out.trim().toLowerCase());
    });
};

},{"child_process":3}],8:[function(require,module,exports){
var exec = require('child_process').exec;

module.exports = function (iface, callback) {
    exec("ifconfig " + iface, function (err, out) {
        if (err) {
            callback(err, null);
            return;
        }
        var match = /[a-f0-9]{2}(:[a-f0-9]{2}){5}/.exec(out.toLowerCase());
        if (!match) {
            callback("did not find a mac address", null);
            return;
        }
        callback(null, match[0].toLowerCase());
    });
};

},{"child_process":3}],9:[function(require,module,exports){
var exec = require('child_process').exec;

var regexRegex = /[-\/\\^$*+?.()|[\]{}]/g;

function escape(string) {
    return string.replace(regexRegex, '\\$&');
}

module.exports = function (iface, callback) {
    exec("ipconfig /all", function (err, out) {
        if (err) {
            callback(err, null);
            return;
        }
        var match = new RegExp(escape(iface)).exec(out);
        if (!match) {
            callback("did not find interface in `ipconfig /all`", null);
            return;
        }
        out = out.substring(match.index + iface.length);
        match = /[A-Fa-f0-9]{2}(\-[A-Fa-f0-9]{2}){5}/.exec(out);
        if (!match) {
            callback("did not find a mac address", null);
            return;
        }
        callback(null, match[0].toLowerCase().replace(/\-/g, ':'));
    });
};

},{"child_process":3}],10:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.objectHash=e()}}(function(){return function e(t,n,r){function o(u,a){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!a&&f)return f(u,!0);if(i)return i(u,!0);throw new Error("Cannot find module '"+u+"'")}var s=n[u]={exports:{}};t[u][0].call(s.exports,function(e){var n=t[u][1][e];return o(n?n:e)},s,s.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){(function(r,o,i,u,a,f,s,c,l){"use strict";function d(e,t){return t=h(e,t),y(e,t)}function h(e,t){if(t=t||{},t.algorithm=t.algorithm||"sha1",t.encoding=t.encoding||"hex",t.excludeValues=!!t.excludeValues,t.algorithm=t.algorithm.toLowerCase(),t.encoding=t.encoding.toLowerCase(),t.ignoreUnknown=t.ignoreUnknown===!0,t.respectType=t.respectType!==!1,t.respectFunctionNames=t.respectFunctionNames!==!1,t.respectFunctionProperties=t.respectFunctionProperties!==!1,t.unorderedArrays=t.unorderedArrays===!0,t.unorderedSets=t.unorderedSets!==!1,t.unorderedObjects=t.unorderedObjects!==!1,t.replacer=t.replacer||void 0,t.excludeKeys=t.excludeKeys||void 0,"undefined"==typeof e)throw new Error("Object argument required.");for(var n=0;n<v.length;++n)v[n].toLowerCase()===t.algorithm.toLowerCase()&&(t.algorithm=v[n]);if(v.indexOf(t.algorithm)===-1)throw new Error('Algorithm "'+t.algorithm+'"  not supported. supported values: '+v.join(", "));if(m.indexOf(t.encoding)===-1&&"passthrough"!==t.algorithm)throw new Error('Encoding "'+t.encoding+'"  not supported. supported values: '+m.join(", "));return t}function p(e){if("function"!=typeof e)return!1;var t=/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i;return null!=t.exec(Function.prototype.toString.call(e))}function y(e,t){var n;n="passthrough"!==t.algorithm?b.createHash(t.algorithm):new w,"undefined"==typeof n.write&&(n.write=n.update,n.end=n.update);var r=g(t,n);if(r.dispatch(e),n.update||n.end(""),n.digest)return n.digest("buffer"===t.encoding?void 0:t.encoding);var o=n.read();return"buffer"===t.encoding?o:o.toString(t.encoding)}function g(e,t,n){n=n||[];var r=function(e){return t.update?t.update(e,"utf8"):t.write(e,"utf8")};return{dispatch:function(t){e.replacer&&(t=e.replacer(t));var n=typeof t;return null===t&&(n="null"),this["_"+n](t)},_object:function(t){var o=/\[object (.*)\]/i,u=Object.prototype.toString.call(t),a=o.exec(u);a=a?a[1]:"unknown:["+u+"]",a=a.toLowerCase();var f=null;if((f=n.indexOf(t))>=0)return this.dispatch("[CIRCULAR:"+f+"]");if(n.push(t),"undefined"!=typeof i&&i.isBuffer&&i.isBuffer(t))return r("buffer:"),r(t);if("object"===a||"function"===a){var s=Object.keys(t);e.unorderedObjects&&(s=s.sort()),e.respectType===!1||p(t)||s.splice(0,0,"prototype","__proto__","constructor"),e.excludeKeys&&(s=s.filter(function(t){return!e.excludeKeys(t)})),r("object:"+s.length+":");var c=this;return s.forEach(function(n){c.dispatch(n),r(":"),e.excludeValues||c.dispatch(t[n]),r(",")})}if(!this["_"+a]){if(e.ignoreUnknown)return r("["+a+"]");throw new Error('Unknown object type "'+a+'"')}this["_"+a](t)},_array:function(t,o){o="undefined"!=typeof o?o:e.unorderedArrays!==!1;var i=this;if(r("array:"+t.length+":"),!o||t.length<=1)return t.forEach(function(e){return i.dispatch(e)});var u=[],a=t.map(function(t){var r=new w,o=n.slice(),i=g(e,r,o);return i.dispatch(t),u=u.concat(o.slice(n.length)),r.read().toString()});return n=n.concat(u),a.sort(),this._array(a,!1)},_date:function(e){return r("date:"+e.toJSON())},_symbol:function(e){return r("symbol:"+e.toString())},_error:function(e){return r("error:"+e.toString())},_boolean:function(e){return r("bool:"+e.toString())},_string:function(e){r("string:"+e.length+":"),r(e)},_function:function(t){r("fn:"),p(t)?this.dispatch("[native]"):this.dispatch(t.toString()),e.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(t.name)),e.respectFunctionProperties&&this._object(t)},_number:function(e){return r("number:"+e.toString())},_xml:function(e){return r("xml:"+e.toString())},_null:function(){return r("Null")},_undefined:function(){return r("Undefined")},_regexp:function(e){return r("regex:"+e.toString())},_uint8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray:function(e){return r("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array:function(e){return r("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array:function(e){return r("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer:function(e){return r("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url:function(e){return r("url:"+e.toString(),"utf8")},_map:function(t){r("map:");var n=Array.from(t);return this._array(n,e.unorderedSets!==!1)},_set:function(t){r("set:");var n=Array.from(t);return this._array(n,e.unorderedSets!==!1)},_blob:function(){if(e.ignoreUnknown)return r("[blob]");throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n')},_domwindow:function(){return r("domwindow")},_process:function(){return r("process")},_timer:function(){return r("timer")},_pipe:function(){return r("pipe")},_tcp:function(){return r("tcp")},_udp:function(){return r("udp")},_tty:function(){return r("tty")},_statwatcher:function(){return r("statwatcher")},_securecontext:function(){return r("securecontext")},_connection:function(){return r("connection")},_zlib:function(){return r("zlib")},_context:function(){return r("context")},_nodescript:function(){return r("nodescript")},_httpparser:function(){return r("httpparser")},_dataview:function(){return r("dataview")},_signal:function(){return r("signal")},_fsevent:function(){return r("fsevent")},_tlswrap:function(){return r("tlswrap")}}}function w(){return{buf:"",write:function(e){this.buf+=e},end:function(e){this.buf+=e},read:function(){return this.buf}}}var b=e("crypto");n=t.exports=d,n.sha1=function(e){return d(e)},n.keys=function(e){return d(e,{excludeValues:!0,algorithm:"sha1",encoding:"hex"})},n.MD5=function(e){return d(e,{algorithm:"md5",encoding:"hex"})},n.keysMD5=function(e){return d(e,{algorithm:"md5",encoding:"hex",excludeValues:!0})};var v=b.getHashes?b.getHashes().slice():["sha1","md5"];v.push("passthrough");var m=["buffer","hex","binary","base64"];n.writeToStream=function(e,t,n){return"undefined"==typeof n&&(n=t,t={}),t=h(e,t),g(t,n).dispatch(e)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_5f1a2fc7.js","/")},{buffer:3,crypto:5,lYpoI2:10}],2:[function(e,t,n){(function(e,t,r,o,i,u,a,f,s){var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(e){"use strict";function t(e){var t=e.charCodeAt(0);return t===i||t===l?62:t===u||t===d?63:t<a?-1:t<a+10?t-a+26+26:t<s+26?t-s:t<f+26?t-f+26:void 0}function n(e){function n(e){s[l++]=e}var r,i,u,a,f,s;if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var c=e.length;f="="===e.charAt(c-2)?2:"="===e.charAt(c-1)?1:0,s=new o(3*e.length/4-f),u=f>0?e.length-4:e.length;var l=0;for(r=0,i=0;r<u;r+=4,i+=3)a=t(e.charAt(r))<<18|t(e.charAt(r+1))<<12|t(e.charAt(r+2))<<6|t(e.charAt(r+3)),n((16711680&a)>>16),n((65280&a)>>8),n(255&a);return 2===f?(a=t(e.charAt(r))<<2|t(e.charAt(r+1))>>4,n(255&a)):1===f&&(a=t(e.charAt(r))<<10|t(e.charAt(r+1))<<4|t(e.charAt(r+2))>>2,n(a>>8&255),n(255&a)),s}function r(e){function t(e){return c.charAt(e)}function n(e){return t(e>>18&63)+t(e>>12&63)+t(e>>6&63)+t(63&e)}var r,o,i,u=e.length%3,a="";for(r=0,i=e.length-u;r<i;r+=3)o=(e[r]<<16)+(e[r+1]<<8)+e[r+2],a+=n(o);switch(u){case 1:o=e[e.length-1],a+=t(o>>2),a+=t(o<<4&63),a+="==";break;case 2:o=(e[e.length-2]<<8)+e[e.length-1],a+=t(o>>10),a+=t(o>>4&63),a+=t(o<<2&63),a+="="}return a}var o="undefined"!=typeof Uint8Array?Uint8Array:Array,i="+".charCodeAt(0),u="/".charCodeAt(0),a="0".charCodeAt(0),f="a".charCodeAt(0),s="A".charCodeAt(0),l="-".charCodeAt(0),d="_".charCodeAt(0);e.toByteArray=n,e.fromByteArray=r}("undefined"==typeof n?this.base64js={}:n)}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js","/node_modules/gulp-browserify/node_modules/base64-js/lib")},{buffer:3,lYpoI2:10}],3:[function(e,t,n){(function(t,r,o,i,u,a,f,s,c){function o(e,t,n){if(!(this instanceof o))return new o(e,t,n);var r=typeof e;if("base64"===t&&"string"===r)for(e=N(e);e.length%4!==0;)e+="=";var i;if("number"===r)i=F(e);else if("string"===r)i=o.byteLength(e,t);else{if("object"!==r)throw new Error("First argument needs to be a number, array or string.");i=F(e.length)}var u;o._useTypedArrays?u=o._augment(new Uint8Array(i)):(u=this,u.length=i,u._isBuffer=!0);var a;if(o._useTypedArrays&&"number"==typeof e.byteLength)u._set(e);else if(O(e))for(a=0;a<i;a++)o.isBuffer(e)?u[a]=e.readUInt8(a):u[a]=e[a];else if("string"===r)u.write(e,0,t);else if("number"===r&&!o._useTypedArrays&&!n)for(a=0;a<i;a++)u[a]=0;return u}function l(e,t,n,r){n=Number(n)||0;var i=e.length-n;r?(r=Number(r),r>i&&(r=i)):r=i;var u=t.length;$(u%2===0,"Invalid hex string"),r>u/2&&(r=u/2);for(var a=0;a<r;a++){var f=parseInt(t.substr(2*a,2),16);$(!isNaN(f),"Invalid hex string"),e[n+a]=f}return o._charsWritten=2*a,a}function d(e,t,n,r){var i=o._charsWritten=W(V(t),e,n,r);return i}function h(e,t,n,r){var i=o._charsWritten=W(q(t),e,n,r);return i}function p(e,t,n,r){return h(e,t,n,r)}function y(e,t,n,r){var i=o._charsWritten=W(R(t),e,n,r);return i}function g(e,t,n,r){var i=o._charsWritten=W(P(t),e,n,r);return i}function w(e,t,n){return 0===t&&n===e.length?G.fromByteArray(e):G.fromByteArray(e.slice(t,n))}function b(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;i<n;i++)e[i]<=127?(r+=J(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+J(o)}function v(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;o++)r+=String.fromCharCode(e[o]);return r}function m(e,t,n){return v(e,t,n)}function _(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=t;i<n;i++)o+=H(e[i]);return o}function E(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function I(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(i=e[t],t+1<o&&(i|=e[t+1]<<8)):(i=e[t]<<8,t+1<o&&(i|=e[t+1])),i}}function A(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(t+2<o&&(i=e[t+2]<<16),t+1<o&&(i|=e[t+1]<<8),i|=e[t],t+3<o&&(i+=e[t+3]<<24>>>0)):(t+1<o&&(i=e[t+1]<<16),t+2<o&&(i|=e[t+2]<<8),t+3<o&&(i|=e[t+3]),i+=e[t]<<24>>>0),i}}function B(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=I(e,t,n,!0),u=32768&i;return u?(65535-i+1)*-1:i}}function L(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=A(e,t,n,!0),u=2147483648&i;return u?(4294967295-i+1)*-1:i}}function U(e,t,n,r){return r||($("boolean"==typeof n,"missing or invalid endian"),$(t+3<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,23,4)}function x(e,t,n,r){return r||($("boolean"==typeof n,"missing or invalid endian"),$(t+7<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,52,8)}function S(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+1<e.length,"trying to write beyond buffer length"),K(t,65535));var i=e.length;if(!(n>=i))for(var u=0,a=Math.min(i-n,2);u<a;u++)e[n+u]=(t&255<<8*(r?u:1-u))>>>8*(r?u:1-u)}function j(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"trying to write beyond buffer length"),K(t,4294967295));var i=e.length;if(!(n>=i))for(var u=0,a=Math.min(i-n,4);u<a;u++)e[n+u]=t>>>8*(r?u:3-u)&255}function C(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+1<e.length,"Trying to write beyond buffer length"),z(t,32767,-32768));var i=e.length;n>=i||(t>=0?S(e,t,n,r,o):S(e,65535+t+1,n,r,o))}function k(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"Trying to write beyond buffer length"),z(t,2147483647,-2147483648));var i=e.length;n>=i||(t>=0?j(e,t,n,r,o):j(e,4294967295+t+1,n,r,o))}function T(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"Trying to write beyond buffer length"),X(t,3.4028234663852886e38,-3.4028234663852886e38));var i=e.length;n>=i||Q.write(e,t,n,r,23,4)}function M(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+7<e.length,"Trying to write beyond buffer length"),X(t,1.7976931348623157e308,-1.7976931348623157e308));var i=e.length;n>=i||Q.write(e,t,n,r,52,8)}function N(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function Y(e,t,n){return"number"!=typeof e?n:(e=~~e,e>=t?t:e>=0?e:(e+=t,e>=0?e:0))}function F(e){return e=~~Math.ceil(+e),e<0?0:e}function D(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function O(e){return D(e)||o.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function H(e){return e<16?"0"+e.toString(16):e.toString(16)}function V(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<=127)t.push(e.charCodeAt(n));else{var o=n;r>=55296&&r<=57343&&n++;for(var i=encodeURIComponent(e.slice(o,n+1)).substr(1).split("%"),u=0;u<i.length;u++)t.push(parseInt(i[u],16))}}return t}function q(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}function P(e){for(var t,n,r,o=[],i=0;i<e.length;i++)t=e.charCodeAt(i),n=t>>8,r=t%256,o.push(r),o.push(n);return o}function R(e){return G.toByteArray(e)}function W(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function J(e){try{return decodeURIComponent(e)}catch(t){return String.fromCharCode(65533)}}function K(e,t){$("number"==typeof e,"cannot write a non-number as a number"),$(e>=0,"specified a negative value for writing an unsigned value"),$(e<=t,"value is larger than maximum value for type"),$(Math.floor(e)===e,"value has a fractional component")}function z(e,t,n){$("number"==typeof e,"cannot write a non-number as a number"),$(e<=t,"value larger than maximum allowed value"),$(e>=n,"value smaller than minimum allowed value"),$(Math.floor(e)===e,"value has a fractional component")}function X(e,t,n){$("number"==typeof e,"cannot write a non-number as a number"),$(e<=t,"value larger than maximum allowed value"),$(e>=n,"value smaller than minimum allowed value")}function $(e,t){if(!e)throw new Error(t||"Failed assertion")}var G=e("base64-js"),Q=e("ieee754");n.Buffer=o,n.SlowBuffer=o,n.INSPECT_MAX_BYTES=50,o.poolSize=8192,o._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(n){return!1}}(),o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.isBuffer=function(e){return!(null===e||void 0===e||!e._isBuffer)},o.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=V(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=R(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},o.concat=function(e,t){if($(D(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new o(0);if(1===e.length)return e[0];var n;if("number"!=typeof t)for(t=0,n=0;n<e.length;n++)t+=e[n].length;var r=new o(t),i=0;for(n=0;n<e.length;n++){var u=e[n];u.copy(r,i),i+=u.length}return r},o.prototype.write=function(e,t,n,r){if(isFinite(t))isFinite(n)||(r=n,n=void 0);else{var o=r;r=t,t=n,n=o}t=Number(t)||0;var i=this.length-t;n?(n=Number(n),n>i&&(n=i)):n=i,r=String(r||"utf8").toLowerCase();var u;switch(r){case"hex":u=l(this,e,t,n);break;case"utf8":case"utf-8":u=d(this,e,t,n);break;case"ascii":u=h(this,e,t,n);break;case"binary":u=p(this,e,t,n);break;case"base64":u=y(this,e,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":u=g(this,e,t,n);break;default:throw new Error("Unknown encoding")}return u},o.prototype.toString=function(e,t,n){var r=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,n=void 0!==n?Number(n):n=r.length,n===t)return"";var o;switch(e){case"hex":o=_(r,t,n);break;case"utf8":case"utf-8":o=b(r,t,n);break;case"ascii":o=v(r,t,n);break;case"binary":o=m(r,t,n);break;case"base64":o=w(r,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":o=E(r,t,n);break;default:throw new Error("Unknown encoding")}return o},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},o.prototype.copy=function(e,t,n,r){var i=this;if(n||(n=0),r||0===r||(r=this.length),t||(t=0),r!==n&&0!==e.length&&0!==i.length){$(r>=n,"sourceEnd < sourceStart"),$(t>=0&&t<e.length,"targetStart out of bounds"),$(n>=0&&n<i.length,"sourceStart out of bounds"),$(r>=0&&r<=i.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var u=r-n;if(u<100||!o._useTypedArrays)for(var a=0;a<u;a++)e[a+t]=this[a+n];else e._set(this.subarray(n,n+u),t)}},o.prototype.slice=function(e,t){var n=this.length;if(e=Y(e,n,0),t=Y(t,n,n),o._useTypedArrays)return o._augment(this.subarray(e,t));for(var r=t-e,i=new o(r,(void 0),(!0)),u=0;u<r;u++)i[u]=this[u+e];return i},o.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},o.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},o.prototype.readUInt8=function(e,t){if(t||($(void 0!==e&&null!==e,"missing offset"),$(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return this[e]},o.prototype.readUInt16LE=function(e,t){return I(this,e,!0,t)},o.prototype.readUInt16BE=function(e,t){return I(this,e,!1,t)},o.prototype.readUInt32LE=function(e,t){return A(this,e,!0,t)},o.prototype.readUInt32BE=function(e,t){return A(this,e,!1,t)},o.prototype.readInt8=function(e,t){if(t||($(void 0!==e&&null!==e,"missing offset"),$(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length)){var n=128&this[e];return n?(255-this[e]+1)*-1:this[e]}},o.prototype.readInt16LE=function(e,t){return B(this,e,!0,t)},o.prototype.readInt16BE=function(e,t){return B(this,e,!1,t)},o.prototype.readInt32LE=function(e,t){return L(this,e,!0,t)},o.prototype.readInt32BE=function(e,t){return L(this,e,!1,t)},o.prototype.readFloatLE=function(e,t){return U(this,e,!0,t)},o.prototype.readFloatBE=function(e,t){return U(this,e,!1,t)},o.prototype.readDoubleLE=function(e,t){return x(this,e,!0,t)},o.prototype.readDoubleBE=function(e,t){return x(this,e,!1,t)},o.prototype.writeUInt8=function(e,t,n){n||($(void 0!==e&&null!==e,"missing value"),$(void 0!==t&&null!==t,"missing offset"),$(t<this.length,"trying to write beyond buffer length"),K(e,255)),t>=this.length||(this[t]=e)},o.prototype.writeUInt16LE=function(e,t,n){S(this,e,t,!0,n)},o.prototype.writeUInt16BE=function(e,t,n){S(this,e,t,!1,n)},o.prototype.writeUInt32LE=function(e,t,n){j(this,e,t,!0,n)},o.prototype.writeUInt32BE=function(e,t,n){j(this,e,t,!1,n)},o.prototype.writeInt8=function(e,t,n){n||($(void 0!==e&&null!==e,"missing value"),$(void 0!==t&&null!==t,"missing offset"),$(t<this.length,"Trying to write beyond buffer length"),z(e,127,-128)),t>=this.length||(e>=0?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},o.prototype.writeInt16LE=function(e,t,n){C(this,e,t,!0,n)},o.prototype.writeInt16BE=function(e,t,n){C(this,e,t,!1,n)},o.prototype.writeInt32LE=function(e,t,n){k(this,e,t,!0,n)},o.prototype.writeInt32BE=function(e,t,n){k(this,e,t,!1,n)},o.prototype.writeFloatLE=function(e,t,n){T(this,e,t,!0,n)},o.prototype.writeFloatBE=function(e,t,n){T(this,e,t,!1,n)},o.prototype.writeDoubleLE=function(e,t,n){M(this,e,t,!0,n)},o.prototype.writeDoubleBE=function(e,t,n){M(this,e,t,!1,n)},o.prototype.fill=function(e,t,n){if(e||(e=0),t||(t=0),n||(n=this.length),"string"==typeof e&&(e=e.charCodeAt(0)),$("number"==typeof e&&!isNaN(e),"value is not a number"),$(n>=t,"end < start"),n!==t&&0!==this.length){$(t>=0&&t<this.length,"start out of bounds"),$(n>=0&&n<=this.length,"end out of bounds");for(var r=t;r<n;r++)this[r]=e}},o.prototype.inspect=function(){for(var e=[],t=this.length,r=0;r<t;r++)if(e[r]=H(this[r]),r===n.INSPECT_MAX_BYTES){e[r+1]="...";break}return"<Buffer "+e.join(" ")+">"},o.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(o._useTypedArrays)return new o(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;t<n;t+=1)e[t]=this[t];return e.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var Z=o.prototype;o._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=Z.get,e.set=Z.set,e.write=Z.write,e.toString=Z.toString,e.toLocaleString=Z.toString,e.toJSON=Z.toJSON,e.copy=Z.copy,e.slice=Z.slice,e.readUInt8=Z.readUInt8,e.readUInt16LE=Z.readUInt16LE,e.readUInt16BE=Z.readUInt16BE,e.readUInt32LE=Z.readUInt32LE,e.readUInt32BE=Z.readUInt32BE,e.readInt8=Z.readInt8,e.readInt16LE=Z.readInt16LE,e.readInt16BE=Z.readInt16BE,e.readInt32LE=Z.readInt32LE,e.readInt32BE=Z.readInt32BE,e.readFloatLE=Z.readFloatLE,e.readFloatBE=Z.readFloatBE,e.readDoubleLE=Z.readDoubleLE,e.readDoubleBE=Z.readDoubleBE,e.writeUInt8=Z.writeUInt8,e.writeUInt16LE=Z.writeUInt16LE,e.writeUInt16BE=Z.writeUInt16BE,e.writeUInt32LE=Z.writeUInt32LE,e.writeUInt32BE=Z.writeUInt32BE,e.writeInt8=Z.writeInt8,e.writeInt16LE=Z.writeInt16LE,e.writeInt16BE=Z.writeInt16BE,e.writeInt32LE=Z.writeInt32LE,e.writeInt32BE=Z.writeInt32BE,e.writeFloatLE=Z.writeFloatLE,e.writeFloatBE=Z.writeFloatBE,e.writeDoubleLE=Z.writeDoubleLE,e.writeDoubleBE=Z.writeDoubleBE,e.fill=Z.fill,e.inspect=Z.inspect,e.toArrayBuffer=Z.toArrayBuffer,e}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/buffer/index.js","/node_modules/gulp-browserify/node_modules/buffer")},{"base64-js":2,buffer:3,ieee754:11,lYpoI2:10}],4:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){if(e.length%p!==0){var n=e.length+(p-e.length%p);e=o.concat([e,y],n)}for(var r=[],i=t?e.readInt32BE:e.readInt32LE,u=0;u<e.length;u+=p)r.push(i.call(e,u));return r}function d(e,t,n){for(var r=new o(t),i=n?r.writeInt32BE:r.writeInt32LE,u=0;u<e.length;u++)i.call(r,e[u],4*u,!0);return r}function h(e,t,n,r){o.isBuffer(e)||(e=new o(e));var i=t(l(e,r),e.length*g);return d(i,n,r)}var o=e("buffer").Buffer,p=4,y=new o(p);y.fill(0);var g=8;t.exports={hash:h}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],5:[function(e,t,n){(function(t,r,o,i,u,a,f,s,c){function l(e,t,n){o.isBuffer(t)||(t=new o(t)),o.isBuffer(n)||(n=new o(n)),t.length>m?t=e(t):t.length<m&&(t=o.concat([t,_],m));for(var r=new o(m),i=new o(m),u=0;u<m;u++)r[u]=54^t[u],i[u]=92^t[u];var a=e(o.concat([r,n]));return e(o.concat([i,a]))}function d(e,t){e=e||"sha1";var n=v[e],r=[],i=0;return n||h("algorithm:",e,"is not yet supported"),{update:function(e){return o.isBuffer(e)||(e=new o(e)),r.push(e),i+=e.length,this},digest:function(e){var i=o.concat(r),u=t?l(n,t,i):n(i);return r=null,e?u.toString(e):u}}}function h(){var e=[].slice.call(arguments).join(" ");throw new Error([e,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}function p(e,t){for(var n in e)t(e[n],n)}var o=e("buffer").Buffer,y=e("./sha"),g=e("./sha256"),w=e("./rng"),b=e("./md5"),v={sha1:y,sha256:g,md5:b},m=64,_=new o(m);_.fill(0),n.createHash=function(e){return d(e)},n.createHmac=function(e,t){return d(e,t)},n.randomBytes=function(e,t){if(!t||!t.call)return new o(w(e));try{t.call(this,void 0,new o(w(e)))}catch(n){t(n)}},p(["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],function(e){n[e]=function(){h("sorry,",e,"is not implemented yet")}})}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./md5":6,"./rng":7,"./sha":8,"./sha256":9,buffer:3,lYpoI2:10}],6:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){e[t>>5]|=128<<t%32,e[(t+64>>>9<<4)+14]=t;for(var n=1732584193,r=-271733879,o=-1732584194,i=271733878,u=0;u<e.length;u+=16){var a=n,f=r,s=o,c=i;n=h(n,r,o,i,e[u+0],7,-680876936),i=h(i,n,r,o,e[u+1],12,-389564586),o=h(o,i,n,r,e[u+2],17,606105819),r=h(r,o,i,n,e[u+3],22,-1044525330),n=h(n,r,o,i,e[u+4],7,-176418897),i=h(i,n,r,o,e[u+5],12,1200080426),o=h(o,i,n,r,e[u+6],17,-1473231341),r=h(r,o,i,n,e[u+7],22,-45705983),n=h(n,r,o,i,e[u+8],7,1770035416),i=h(i,n,r,o,e[u+9],12,-1958414417),o=h(o,i,n,r,e[u+10],17,-42063),r=h(r,o,i,n,e[u+11],22,-1990404162),n=h(n,r,o,i,e[u+12],7,1804603682),i=h(i,n,r,o,e[u+13],12,-40341101),o=h(o,i,n,r,e[u+14],17,-1502002290),r=h(r,o,i,n,e[u+15],22,1236535329),n=p(n,r,o,i,e[u+1],5,-165796510),i=p(i,n,r,o,e[u+6],9,-1069501632),o=p(o,i,n,r,e[u+11],14,643717713),r=p(r,o,i,n,e[u+0],20,-373897302),n=p(n,r,o,i,e[u+5],5,-701558691),i=p(i,n,r,o,e[u+10],9,38016083),o=p(o,i,n,r,e[u+15],14,-660478335),r=p(r,o,i,n,e[u+4],20,-405537848),n=p(n,r,o,i,e[u+9],5,568446438),i=p(i,n,r,o,e[u+14],9,-1019803690),o=p(o,i,n,r,e[u+3],14,-187363961),r=p(r,o,i,n,e[u+8],20,1163531501),n=p(n,r,o,i,e[u+13],5,-1444681467),i=p(i,n,r,o,e[u+2],9,-51403784),o=p(o,i,n,r,e[u+7],14,1735328473),r=p(r,o,i,n,e[u+12],20,-1926607734),n=y(n,r,o,i,e[u+5],4,-378558),i=y(i,n,r,o,e[u+8],11,-2022574463),o=y(o,i,n,r,e[u+11],16,1839030562),r=y(r,o,i,n,e[u+14],23,-35309556),n=y(n,r,o,i,e[u+1],4,-1530992060),i=y(i,n,r,o,e[u+4],11,1272893353),o=y(o,i,n,r,e[u+7],16,-155497632),r=y(r,o,i,n,e[u+10],23,-1094730640),n=y(n,r,o,i,e[u+13],4,681279174),i=y(i,n,r,o,e[u+0],11,-358537222),o=y(o,i,n,r,e[u+3],16,-722521979),r=y(r,o,i,n,e[u+6],23,76029189),n=y(n,r,o,i,e[u+9],4,-640364487),i=y(i,n,r,o,e[u+12],11,-421815835),o=y(o,i,n,r,e[u+15],16,530742520),r=y(r,o,i,n,e[u+2],23,-995338651),n=g(n,r,o,i,e[u+0],6,-198630844),i=g(i,n,r,o,e[u+7],10,1126891415),o=g(o,i,n,r,e[u+14],15,-1416354905),r=g(r,o,i,n,e[u+5],21,-57434055),n=g(n,r,o,i,e[u+12],6,1700485571),i=g(i,n,r,o,e[u+3],10,-1894986606),o=g(o,i,n,r,e[u+10],15,-1051523),r=g(r,o,i,n,e[u+1],21,-2054922799),n=g(n,r,o,i,e[u+8],6,1873313359),i=g(i,n,r,o,e[u+15],10,-30611744),o=g(o,i,n,r,e[u+6],15,-1560198380),r=g(r,o,i,n,e[u+13],21,1309151649),n=g(n,r,o,i,e[u+4],6,-145523070),i=g(i,n,r,o,e[u+11],10,-1120210379),o=g(o,i,n,r,e[u+2],15,718787259),r=g(r,o,i,n,e[u+9],21,-343485551),n=w(n,a),r=w(r,f),o=w(o,s),i=w(i,c)}return Array(n,r,o,i)}function d(e,t,n,r,o,i){return w(b(w(w(t,e),w(r,i)),o),n)}function h(e,t,n,r,o,i,u){return d(t&n|~t&r,e,t,o,i,u)}function p(e,t,n,r,o,i,u){return d(t&r|n&~r,e,t,o,i,u)}function y(e,t,n,r,o,i,u){return d(t^n^r,e,t,o,i,u)}function g(e,t,n,r,o,i,u){return d(n^(t|~r),e,t,o,i,u)}function w(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function b(e,t){return e<<t|e>>>32-t}var v=e("./helpers");t.exports=function(e){return v.hash(e,l,16)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],7:[function(e,t,n){(function(e,n,r,o,i,u,a,f,s){!function(){var e,n,r=this;e=function(e){for(var t,t,n=new Array(e),r=0;r<e;r++)0==(3&r)&&(t=4294967296*Math.random()),n[r]=t>>>((3&r)<<3)&255;return n},r.crypto&&crypto.getRandomValues&&(n=function(e){var t=new Uint8Array(e);return crypto.getRandomValues(t),t}),t.exports=n||e}()}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],8:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var n=Array(80),r=1732584193,o=-271733879,i=-1732584194,u=271733878,a=-1009589776,f=0;f<e.length;f+=16){for(var s=r,c=o,l=i,g=u,w=a,b=0;b<80;b++){b<16?n[b]=e[f+b]:n[b]=y(n[b-3]^n[b-8]^n[b-14]^n[b-16],1);var v=p(p(y(r,5),d(b,o,i,u)),p(p(a,n[b]),h(b)));a=u,u=i,i=y(o,30),o=r,r=v}r=p(r,s),o=p(o,c),i=p(i,l),u=p(u,g),a=p(a,w)}return Array(r,o,i,u,a)}function d(e,t,n,r){return e<20?t&n|~t&r:e<40?t^n^r:e<60?t&n|t&r|n&r:t^n^r}function h(e){return e<20?1518500249:e<40?1859775393:e<60?-1894007588:-899497514}function p(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function y(e,t){return e<<t|e>>>32-t}var g=e("./helpers");t.exports=function(e){return g.hash(e,l,20,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],9:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){var l=e("./helpers"),d=function(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n},h=function(e,t){return e>>>t|e<<32-t},p=function(e,t){return e>>>t},y=function(e,t,n){return e&t^~e&n},g=function(e,t,n){return e&t^e&n^t&n},w=function(e){return h(e,2)^h(e,13)^h(e,22)},b=function(e){
return h(e,6)^h(e,11)^h(e,25)},v=function(e){return h(e,7)^h(e,18)^p(e,3)},m=function(e){return h(e,17)^h(e,19)^p(e,10)},_=function(e,t){var n,r,o,i,u,a,f,s,c,l,h,p,_=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),E=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),I=new Array(64);e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var c=0;c<e.length;c+=16){n=E[0],r=E[1],o=E[2],i=E[3],u=E[4],a=E[5],f=E[6],s=E[7];for(var l=0;l<64;l++)l<16?I[l]=e[l+c]:I[l]=d(d(d(m(I[l-2]),I[l-7]),v(I[l-15])),I[l-16]),h=d(d(d(d(s,b(u)),y(u,a,f)),_[l]),I[l]),p=d(w(n),g(n,r,o)),s=f,f=a,a=u,u=d(i,h),i=o,o=r,r=n,n=d(h,p);E[0]=d(n,E[0]),E[1]=d(r,E[1]),E[2]=d(o,E[2]),E[3]=d(i,E[3]),E[4]=d(u,E[4]),E[5]=d(a,E[5]),E[6]=d(f,E[6]),E[7]=d(s,E[7])}return E};t.exports=function(e){return l.hash(e,_,32,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],10:[function(e,t,n){(function(e,n,r,o,i,u,a,f,s){function c(){}var e=t.exports={};e.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),n.length>0)){var r=n.shift();r()}},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=c,e.addListener=c,e.once=c,e.off=c,e.removeListener=c,e.removeAllListeners=c,e.emit=c,e.binding=function(e){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(e){throw new Error("process.chdir is not supported")}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/process/browser.js","/node_modules/gulp-browserify/node_modules/process")},{buffer:3,lYpoI2:10}],11:[function(e,t,n){(function(e,t,r,o,i,u,a,f,s){n.read=function(e,t,n,r,o){var i,u,a=8*o-r-1,f=(1<<a)-1,s=f>>1,c=-7,l=n?o-1:0,d=n?-1:1,h=e[t+l];for(l+=d,i=h&(1<<-c)-1,h>>=-c,c+=a;c>0;i=256*i+e[t+l],l+=d,c-=8);for(u=i&(1<<-c)-1,i>>=-c,c+=r;c>0;u=256*u+e[t+l],l+=d,c-=8);if(0===i)i=1-s;else{if(i===f)return u?NaN:(h?-1:1)*(1/0);u+=Math.pow(2,r),i-=s}return(h?-1:1)*u*Math.pow(2,i-r)},n.write=function(e,t,n,r,o,i){var u,a,f,s=8*i-o-1,c=(1<<s)-1,l=c>>1,d=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:i-1,p=r?1:-1,y=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,u=c):(u=Math.floor(Math.log(t)/Math.LN2),t*(f=Math.pow(2,-u))<1&&(u--,f*=2),t+=u+l>=1?d/f:d*Math.pow(2,1-l),t*f>=2&&(u++,f/=2),u+l>=c?(a=0,u=c):u+l>=1?(a=(t*f-1)*Math.pow(2,o),u+=l):(a=t*Math.pow(2,l-1)*Math.pow(2,o),u=0));o>=8;e[n+h]=255&a,h+=p,a/=256,o-=8);for(u=u<<o|a,s+=o;s>0;e[n+h]=255&u,h+=p,u/=256,s-=8);e[n+h-p]|=128*y}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/ieee754/index.js","/node_modules/ieee754")},{buffer:3,lYpoI2:10}]},{},[1])(1)});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

},{}],12:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],13:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],14:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":12,"./encode":13}],15:[function(require,module,exports){
'use strict';

var url = require('url');
var pat = /^https?:\/\//i;

exports = module.exports = function(link, source) {
  if (!link) return source;
  if (!source) return;
  return !pat.test(link) ? url.resolve(source, link) : link;
};

},{"url":17}],16:[function(require,module,exports){
(function (process){
/* 
(The MIT License)
Copyright (c) 2014 Halász Ádám <mail@adamhalasz.com>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//  Unique Hexatridecimal ID Generator
// ================================================

//  Dependencies
// ================================================
var pid = process && process.pid ? process.pid.toString(36) : '' ;
var mac = typeof __webpack_require__ !== 'function' ? require('macaddress').one(macHandler) : null ;
var address = mac ? parseInt(mac.replace(/\:|\D+/gi, '')).toString(36) : '' ;

//  Exports
// ================================================
module.exports         = function(prefix){ return (prefix || '') + address + pid + now().toString(36); }
module.exports.process = function(prefix){ return (prefix || '')           + pid + now().toString(36); }
module.exports.time    = function(prefix){ return (prefix || '')                 + now().toString(36); }

//  Helpers
// ================================================
function now(){
    var time = Date.now();
    var last = now.last || time;
    return now.last = time > last ? time : last + 1;
}

function macHandler(error){
    if(module.parent && module.parent.uniqid_debug){
        if(error) console.error('Info: No mac address - uniqid() falls back to uniqid.process().', error)
        if(pid == '') console.error('Info: No process.pid - uniqid.process() falls back to uniqid.time().')
    }
}

}).call(this,require("UYZiDK"))
},{"UYZiDK":4,"macaddress":6}],17:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var punycode = require('punycode');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a puny coded representation of "domain".
      // It only converts the part of the domain name that
      // has non ASCII characters. I.e. it dosent matter if
      // you call it with a domain that already is in ASCII.
      var domainArray = this.hostname.split('.');
      var newOut = [];
      for (var i = 0; i < domainArray.length; ++i) {
        var s = domainArray[i];
        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
            'xn--' + punycode.encode(s) : s);
      }
      this.hostname = newOut.join('.');
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  Object.keys(this).forEach(function(k) {
    result[k] = this[k];
  }, this);

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    Object.keys(relative).forEach(function(k) {
      if (k !== 'protocol')
        result[k] = relative[k];
    });

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      Object.keys(relative).forEach(function(k) {
        result[k] = relative[k];
      });
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especialy happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host) && (last === '.' || last === '..') ||
      last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last == '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especialy happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!isNull(result.pathname) || !isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

function isString(arg) {
  return typeof arg === "string";
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isNull(arg) {
  return arg === null;
}
function isNullOrUndefined(arg) {
  return  arg == null;
}

},{"punycode":5,"querystring":14}],18:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Dom;
(function (Dom) {
    function insertBefore(element, targetElement) {
        targetElement.parentElement.insertBefore(element, targetElement);
    }
    Dom.insertBefore = insertBefore;
    function insertAfter(element, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild === targetElement) {
            parent.appendChild(element);
        }
        else {
            parent.insertBefore(element, targetElement.nextSibling);
        }
    }
    Dom.insertAfter = insertAfter;
    function remove(element) {
        if (element.parentElement !== null) {
            element.parentElement.removeChild(element);
        }
    }
    Dom.remove = remove;
    function htmlToNode(html) {
        if (html instanceof Node) {
            return html;
        }
        else {
            var node = document.createElement("div");
            node.innerHTML = html;
            return node.firstElementChild;
        }
    }
    Dom.htmlToNode = htmlToNode;
    function htmlToElement(html) {
        return htmlToNode(html);
    }
    Dom.htmlToElement = htmlToElement;
    // atributes  ---------------------------------------------
    function getAttributes(element) {
        var attrs = element.attributes;
        var newAttr = {};
        for (var i = 0; i < attrs.length; i++) {
            newAttr[attrs[i].name] = attrs[i].value;
        }
        return newAttr;
    }
    Dom.getAttributes = getAttributes;
    // Loops e giros pelo dom --------------------------------------------
    function childElement(node, each) {
        var child = node.firstChild;
        while (child) {
            if (child.nodeType === 1) {
                each(child);
            }
            child = child.nextSibling;
        }
    }
    Dom.childElement = childElement;
    // element down --------------------------
    function nodeDown(node, each) {
        if (each(node, undefined) !== false) {
            this.childNodeDown(node, each);
        }
    }
    Dom.nodeDown = nodeDown;
    function childNodeDown(node, each) {
        var parent = node;
        var child = node.firstChild;
        while (child) {
            var eachReturn = each(child, parent);
            if (eachReturn !== false) {
                this.childNodeDown(child, each);
            }
            child = child.nextSibling;
        }
    }
    Dom.childNodeDown = childNodeDown;
    function elementDown(node, each) {
        if (each(node, undefined) !== false) {
            this.childElementDown(node, each);
        }
    }
    Dom.elementDown = elementDown;
    function childElementDown(node, each) {
        var parent = node;
        var child = node.firstChild;
        while (child) {
            if (child.nodeType === 1) {
                var eachReturn = each(child, parent);
                if (eachReturn !== false) {
                    this.childElementDown(child, each);
                }
            }
            child = child.nextSibling;
        }
    }
    Dom.childElementDown = childElementDown;
    // element up --------------------------
    function elementUp(node, each) {
        if (each(node) !== false) {
            parentElementUp(node, each);
        }
    }
    Dom.elementUp = elementUp;
    function parentElementUp(node, each) {
        var retorno = true;
        var current = node.parentNode;
        do {
            retorno = each(current);
            current = current.parentNode;
        } while (retorno !== false && current !== null && current !== undefined && node.nodeName !== "BODY");
    }
    Dom.parentElementUp = parentElementUp;
    // dom --------------------------
    function attribute(element, each) {
        // TODO: this still need to be tested
        var attributes = element.attributes;
        for (var i = 0; i < attributes.length; i++) {
            each(attributes[i].name, attributes[i].value);
        }
    }
    Dom.attribute = attribute;
    function findNextSibling(target, validation) {
        var current = target.nextSibling;
        while (current !== null) {
            if (validation(current) === true) {
                return current;
            }
            else {
                current = current.nextSibling;
            }
        }
        return null;
    }
    Dom.findNextSibling = findNextSibling;
    function findPrevSibling(target, validation) {
        var current = target.previousSibling;
        while (current !== null) {
            if (validation(current) === true) {
                return current;
            }
            else {
                current = current.previousSibling;
            }
        }
        return null;
    }
    Dom.findPrevSibling = findPrevSibling;
    function findAllSiblings(target) {
        var siblings = [];
        findPrevSibling(target, function (node) {
            siblings.push(node);
            return false;
        });
        findNextSibling(target, function (node) {
            siblings.push(node);
            return false;
        });
        return siblings;
    }
    Dom.findAllSiblings = findAllSiblings;
    function prependChild(parent, child) {
        var firstChild = parent.firstChild;
        if (firstChild === undefined) {
            parent.appendChild(child);
        }
        else {
            parent.insertBefore(child, firstChild);
        }
    }
    Dom.prependChild = prependChild;
    function appendChild(parent, child) {
        parent.appendChild(child);
    }
    Dom.appendChild = appendChild;
    function replaceElement(oldElement, newElement) {
        oldElement.parentElement.replaceChild(newElement, oldElement);
    }
    Dom.replaceElement = replaceElement;
    function swapNodes(n1, n2) {
        var i1;
        var i2;
        var p1 = n1.parentNode;
        var p2 = n2.parentNode;
        if (p1 === undefined || p1 === null) {
            p1 = document.createElement("div");
            p1.appendChild(n1);
        }
        if (p2 === undefined || p2 === null) {
            p2 = document.createElement("div");
            p2.appendChild(n2);
        }
        if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) {
            return;
        }
        for (var i = 0; i < p1.children.length; i++) {
            if (p1.children[i].isEqualNode(n1)) {
                i1 = i;
            }
        }
        for (var i = 0; i < p2.children.length; i++) {
            if (p2.children[i].isEqualNode(n2)) {
                i2 = i;
            }
        }
        if (p1.isEqualNode(p2) && i1 < i2) {
            i2++;
        }
        p1.insertBefore(n2, p1.children[i1]);
        p2.insertBefore(n1, p2.children[i2]);
    }
    Dom.swapNodes = swapNodes;
})(Dom = exports.Dom || (exports.Dom = {}));
exports["default"] = Dom;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LEtBQUssSUFBSSxDQUFDLEdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuRCxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNsQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ1I7U0FDRjtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNsQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ1I7U0FDRjtRQUVELElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2pDLEVBQUUsRUFBRSxDQUFDO1NBQ047UUFDRCxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFoQ2UsYUFBUyxZQWdDeEIsQ0FBQTtBQUVILENBQUMsRUExTWdCLEdBQUcsR0FBSCxXQUFHLEtBQUgsV0FBRyxRQTBNbkI7QUFDRCxxQkFBZSxHQUFHLENBQUMiLCJmaWxlIjoiZG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IG5hbWVzcGFjZSBEb20ge1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBpbnNlcnRCZWZvcmUoZWxlbWVudDogTm9kZSwgdGFyZ2V0RWxlbWVudDogTm9kZSk6IHZvaWQge1xyXG4gICAgdGFyZ2V0RWxlbWVudC5wYXJlbnRFbGVtZW50IS5pbnNlcnRCZWZvcmUoZWxlbWVudCwgdGFyZ2V0RWxlbWVudCk7XHJcbiAgfVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBpbnNlcnRBZnRlcihlbGVtZW50OiBOb2RlLCB0YXJnZXRFbGVtZW50OiBOb2RlKTogdm9pZCB7XHJcbiAgICBjb25zdCBwYXJlbnQgPSB0YXJnZXRFbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICBpZiAocGFyZW50IS5sYXN0Q2hpbGQgPT09IHRhcmdldEVsZW1lbnQpIHtcclxuICAgICAgcGFyZW50IS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhcmVudCEuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsIHRhcmdldEVsZW1lbnQubmV4dFNpYmxpbmcpO1xyXG4gICAgfVxyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gcmVtb3ZlKGVsZW1lbnQ6IE5vZGUpOiB2b2lkIHtcclxuICAgIGlmIChlbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gaHRtbFRvTm9kZShodG1sOiBzdHJpbmcgfCBFbGVtZW50KTogTm9kZSB8IG51bGwge1xyXG4gICAgaWYgKGh0bWwgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgbm9kZTogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICBub2RlLmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICAgIHJldHVybiBub2RlLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGh0bWxUb0VsZW1lbnQoaHRtbDogc3RyaW5nIHwgRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcclxuICAgIHJldHVybiBodG1sVG9Ob2RlKGh0bWwpIGFzIEhUTUxFbGVtZW50O1xyXG4gIH1cclxuICAvLyBhdHJpYnV0ZXMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRBdHRyaWJ1dGVzKGVsZW1lbnQ6IEVsZW1lbnQgfCBOb2RlKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmc7IH0ge1xyXG4gICAgY29uc3QgYXR0cnMgPSAoZWxlbWVudCBhcyBIVE1MRWxlbWVudCkuYXR0cmlidXRlcztcclxuICAgIGNvbnN0IG5ld0F0dHI6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nOyB9ID0ge307XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG5ld0F0dHJbYXR0cnNbaV0ubmFtZV0gPSBhdHRyc1tpXS52YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdBdHRyO1xyXG4gIH1cclxuXHJcbiAgLy8gTG9vcHMgZSBnaXJvcyBwZWxvIGRvbSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBjaGlsZEVsZW1lbnQobm9kZTogRWxlbWVudCwgZWFjaDogKG5vZGU6IEVsZW1lbnQpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIGxldCBjaGlsZDogTm9kZSB8IG51bGwgPSBub2RlLmZpcnN0Q2hpbGQ7XHJcbiAgICB3aGlsZSAoY2hpbGQpIHtcclxuICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSAxKSB7XHJcbiAgICAgICAgZWFjaChjaGlsZCBhcyBFbGVtZW50KTtcclxuICAgICAgfVxyXG4gICAgICBjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZWxlbWVudCBkb3duIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIG5vZGVEb3duKG5vZGU6IE5vZGUgfCBOb2RlLCBlYWNoOiAobm9kZTogTm9kZSB8IE5vZGUsIHBhcmVudD86IE5vZGUgfCBOb2RlKSA9PiB2b2lkIHwgYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKGVhY2gobm9kZSwgdW5kZWZpbmVkKSAhPT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5jaGlsZE5vZGVEb3duKG5vZGUsIGVhY2gpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGNoaWxkTm9kZURvd24obm9kZTogTm9kZSwgZWFjaDogKG5vZGU6IE5vZGUsIHBhcmVudD86IE5vZGUpID0+IHZvaWQgfCBib29sZWFuKTogdm9pZCB7XHJcbiAgICBjb25zdCBwYXJlbnQ6IE5vZGUgPSBub2RlO1xyXG4gICAgbGV0IGNoaWxkOiBOb2RlIHwgbnVsbCA9IG5vZGUuZmlyc3RDaGlsZDtcclxuICAgIHdoaWxlIChjaGlsZCkge1xyXG4gICAgICBjb25zdCBlYWNoUmV0dXJuOiBib29sZWFuIHwgdm9pZCA9IGVhY2goY2hpbGQsIHBhcmVudCk7XHJcbiAgICAgIGlmIChlYWNoUmV0dXJuICE9PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuY2hpbGROb2RlRG93bihjaGlsZCwgZWFjaCk7XHJcbiAgICAgIH1cclxuICAgICAgY2hpbGQgPSBjaGlsZC5uZXh0U2libGluZztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBlbGVtZW50RG93bihub2RlOiBFbGVtZW50LCBlYWNoOiAobm9kZTogRWxlbWVudCwgcGFyZW50PzogRWxlbWVudCkgPT4gdm9pZCB8IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmIChlYWNoKG5vZGUsIHVuZGVmaW5lZCkgIT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuY2hpbGRFbGVtZW50RG93bihub2RlLCBlYWNoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBjaGlsZEVsZW1lbnREb3duKG5vZGU6IEVsZW1lbnQsIGVhY2g6IChub2RlOiBIVE1MRWxlbWVudCwgcGFyZW50PzogSFRNTEVsZW1lbnQpID0+IHZvaWQgfCBib29sZWFuKTogdm9pZCB7XHJcbiAgICBjb25zdCBwYXJlbnQ6IEVsZW1lbnQgPSBub2RlO1xyXG4gICAgbGV0IGNoaWxkOiBOb2RlIHwgbnVsbCA9IG5vZGUuZmlyc3RDaGlsZDtcclxuICAgIHdoaWxlIChjaGlsZCkge1xyXG4gICAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDEpIHtcclxuICAgICAgICBjb25zdCBlYWNoUmV0dXJuOiBib29sZWFuIHwgdm9pZCA9IGVhY2goY2hpbGQgYXMgSFRNTEVsZW1lbnQsIHBhcmVudCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgaWYgKGVhY2hSZXR1cm4gIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICB0aGlzLmNoaWxkRWxlbWVudERvd24oY2hpbGQgYXMgSFRNTEVsZW1lbnQsIGVhY2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZWxlbWVudCB1cCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBlbGVtZW50VXAobm9kZTogRWxlbWVudCB8IEhUTUxFbGVtZW50LCBlYWNoOiAobm9kZTogRWxlbWVudCB8IEhUTUxFbGVtZW50KSA9PiBib29sZWFuIHwgdm9pZCk6IHZvaWQge1xyXG4gICAgaWYgKGVhY2gobm9kZSkgIT09IGZhbHNlKSB7XHJcbiAgICAgIHBhcmVudEVsZW1lbnRVcChub2RlLCBlYWNoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBwYXJlbnRFbGVtZW50VXAobm9kZTogRWxlbWVudCB8IEhUTUxFbGVtZW50IHwgTm9kZSwgZWFjaDogKG5vZGU6IEVsZW1lbnQgfCBIVE1MRWxlbWVudCB8IE5vZGUgfCBudWxsKSA9PiBib29sZWFuIHwgdm9pZCk6IHZvaWQge1xyXG4gICAgbGV0IHJldG9ybm86IGJvb2xlYW4gfCB2b2lkID0gdHJ1ZTtcclxuICAgIGxldCBjdXJyZW50OiBFbGVtZW50IHwgTm9kZSB8IG51bGwgPSAobm9kZSBhcyBOb2RlKS5wYXJlbnROb2RlO1xyXG4gICAgZG8ge1xyXG4gICAgICByZXRvcm5vID0gZWFjaChjdXJyZW50KTtcclxuICAgICAgY3VycmVudCA9IChjdXJyZW50IGFzIE5vZGUpLnBhcmVudE5vZGU7XHJcbiAgICB9IHdoaWxlIChyZXRvcm5vICE9PSBmYWxzZSAmJiBjdXJyZW50ICE9PSBudWxsICYmIGN1cnJlbnQgIT09IHVuZGVmaW5lZCAmJiBub2RlLm5vZGVOYW1lICE9PSBcIkJPRFlcIik7XHJcbiAgfVxyXG5cclxuICAvLyBkb20gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBleHBvcnQgZnVuY3Rpb24gYXR0cmlidXRlKGVsZW1lbnQ6IEVsZW1lbnQgfCBIVE1MRWxlbWVudCB8IE5vZGUsIGVhY2g6IChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgLy8gVE9ETzogdGhpcyBzdGlsbCBuZWVkIHRvIGJlIHRlc3RlZFxyXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IChlbGVtZW50IGFzIEhUTUxFbGVtZW50KS5hdHRyaWJ1dGVzO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGVhY2goYXR0cmlidXRlc1tpXS5uYW1lLCBhdHRyaWJ1dGVzW2ldLnZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBmaW5kTmV4dFNpYmxpbmcodGFyZ2V0OiBOb2RlIHwgTm9kZSwgdmFsaWRhdGlvbjogKG5vZGU6IE5vZGUgfCBOb2RlKSA9PiBib29sZWFuIHwgdm9pZCk6IE5vZGUgfCBOb2RlIHwgbnVsbCB7XHJcbiAgICBsZXQgY3VycmVudDogTm9kZSB8IE5vZGUgfCBudWxsID0gdGFyZ2V0Lm5leHRTaWJsaW5nO1xyXG4gICAgd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcclxuICAgICAgaWYgKHZhbGlkYXRpb24oY3VycmVudCkgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0U2libGluZztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gZmluZFByZXZTaWJsaW5nKHRhcmdldDogTm9kZSB8IE5vZGUsIHZhbGlkYXRpb246IChub2RlOiBOb2RlIHwgTm9kZSkgPT4gYm9vbGVhbiB8IHZvaWQpOiBOb2RlIHwgTm9kZSB8IG51bGwge1xyXG4gICAgbGV0IGN1cnJlbnQ6IE5vZGUgfCBOb2RlIHwgbnVsbCA9IHRhcmdldC5wcmV2aW91c1NpYmxpbmc7XHJcbiAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xyXG4gICAgICBpZiAodmFsaWRhdGlvbihjdXJyZW50KSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnByZXZpb3VzU2libGluZztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gZmluZEFsbFNpYmxpbmdzKHRhcmdldDogTm9kZSk6IE5vZGVbXSB7XHJcbiAgICBjb25zdCBzaWJsaW5nczogTm9kZVtdID0gW107XHJcbiAgICBmaW5kUHJldlNpYmxpbmcodGFyZ2V0LCAobm9kZSkgPT4ge1xyXG4gICAgICBzaWJsaW5ncy5wdXNoKG5vZGUpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIGZpbmROZXh0U2libGluZyh0YXJnZXQsIChub2RlKSA9PiB7XHJcbiAgICAgIHNpYmxpbmdzLnB1c2gobm9kZSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHNpYmxpbmdzO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHByZXBlbmRDaGlsZChwYXJlbnQ6IEhUTUxFbGVtZW50LCBjaGlsZDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGZpcnN0Q2hpbGQ6IE5vZGUgfCBudWxsID0gcGFyZW50LmZpcnN0Q2hpbGQ7XHJcbiAgICBpZiAoZmlyc3RDaGlsZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlPEhUTUxFbGVtZW50PihjaGlsZCwgZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZChwYXJlbnQ6IEhUTUxFbGVtZW50LCBjaGlsZDogSFRNTEVsZW1lbnQpIHtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gcmVwbGFjZUVsZW1lbnQob2xkRWxlbWVudDogSFRNTEVsZW1lbnQsIG5ld0VsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICBvbGRFbGVtZW50LnBhcmVudEVsZW1lbnQhLnJlcGxhY2VDaGlsZChuZXdFbGVtZW50LCBvbGRFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBzd2FwTm9kZXMobjE6IEhUTUxFbGVtZW50LCBuMjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGxldCBpMTogYW55O1xyXG4gICAgbGV0IGkyOiBhbnk7XHJcbiAgICBsZXQgcDEgPSBuMS5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgbGV0IHAyID0gbjIucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGlmIChwMSA9PT0gdW5kZWZpbmVkIHx8IHAxID09PSBudWxsKSB7XHJcbiAgICAgIHAxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgcDEuYXBwZW5kQ2hpbGQobjEpO1xyXG4gICAgfVxyXG4gICAgaWYgKHAyID09PSB1bmRlZmluZWQgfHwgcDIgPT09IG51bGwpIHtcclxuICAgICAgcDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICBwMi5hcHBlbmRDaGlsZChuMik7XHJcbiAgICB9XHJcbiAgICBpZiAoIXAxIHx8ICFwMiB8fCBwMS5pc0VxdWFsTm9kZShuMikgfHwgcDIuaXNFcXVhbE5vZGUobjEpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBwMS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAocDEuY2hpbGRyZW5baV0uaXNFcXVhbE5vZGUobjEpKSB7XHJcbiAgICAgICAgaTEgPSBpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChwMi5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShuMikpIHtcclxuICAgICAgICBpMiA9IGk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocDEuaXNFcXVhbE5vZGUocDIpICYmIGkxIDwgaTIpIHtcclxuICAgICAgaTIrKztcclxuICAgIH1cclxuICAgIHAxLmluc2VydEJlZm9yZShuMiwgcDEuY2hpbGRyZW5baTFdKTtcclxuICAgIHAyLmluc2VydEJlZm9yZShuMSwgcDIuY2hpbGRyZW5baTJdKTtcclxuICB9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IERvbTtcclxuIl19

},{}],19:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Event;
(function (Event) {
    function once(target, type, listener) {
        var fn = function (ev) {
            target.removeEventListener(type, fn);
            listener(ev);
        };
        target.addEventListener(type, fn);
    }
    Event.once = once;
    function onceOutside(target, type, listener) {
        var fn = function (ev) {
            var inside = target.contains(ev.target);
            if (!inside) {
                listener(ev);
                document.removeEventListener(type, fn);
            }
        };
        document.addEventListener(type, fn);
    }
    Event.onceOutside = onceOutside;
    function bindOutside(target, type, listener) {
        var fn = function (ev) {
            var inside = target.contains(ev.target);
            if (!inside) {
                listener(ev);
            }
        };
        document.addEventListener(type, fn);
    }
    Event.bindOutside = bindOutside;
    function bind(target, type, listener) {
        var fn = function (ev) {
            listener(ev);
        };
        target.addEventListener(type, fn);
    }
    Event.bind = bind;
    // passive supported
    var passiveSupported = false;
    function passive() {
        return (passiveSupported ? { passive: true } : false);
    }
    Event.passive = passive;
    (function Initialize() {
        var _this = this;
        // detect if suport passive event
        try {
            var options = Object.defineProperty({}, "passive", {
                get: function () {
                    _this.passiveSupported = true;
                }
            });
            window.addEventListener("test", function () {
                return null;
            }, options);
        }
        catch (err) {
            //
        }
    })();
})(Event = exports.Event || (exports.Event = {}));
exports["default"] = Event;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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ZXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgbmFtZXNwYWNlIEV2ZW50IHtcclxuICBleHBvcnQgZnVuY3Rpb24gb25jZSh0YXJnZXQ6IE5vZGUsIHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IChldmVudDogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgZm4gPSAoZXY6IGFueSkgPT4ge1xyXG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbik7XHJcbiAgICAgIGxpc3RlbmVyKGV2KTtcclxuICAgIH07XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbik7XHJcbiAgfVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBvbmNlT3V0c2lkZSh0YXJnZXQ6IE5vZGUsIHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IChldmVudDogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgZm4gPSAoZXY6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBpbnNpZGUgPSB0YXJnZXQuY29udGFpbnMoZXYudGFyZ2V0KTtcclxuICAgICAgaWYgKCFpbnNpZGUpIHtcclxuICAgICAgICBsaXN0ZW5lcihldik7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZuKTtcclxuICB9XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGJpbmRPdXRzaWRlKHRhcmdldDogTm9kZSwgdHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogKGV2ZW50OiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBmbiA9IChldjogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IGluc2lkZSA9IHRhcmdldC5jb250YWlucyhldi50YXJnZXQpO1xyXG4gICAgICBpZiAoIWluc2lkZSkge1xyXG4gICAgICAgIGxpc3RlbmVyKGV2KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4pO1xyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gYmluZCh0YXJnZXQ6IE5vZGUsIHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IChldmVudDogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgZm4gPSAoZXY6IGFueSkgPT4ge1xyXG4gICAgICBsaXN0ZW5lcihldik7XHJcbiAgICB9O1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4pO1xyXG4gIH1cclxuICAvLyBwYXNzaXZlIHN1cHBvcnRlZFxyXG4gIGNvbnN0IHBhc3NpdmVTdXBwb3J0ZWQgPSBmYWxzZTtcclxuICBleHBvcnQgZnVuY3Rpb24gcGFzc2l2ZSgpOiBhbnkge1xyXG4gICAgcmV0dXJuIChwYXNzaXZlU3VwcG9ydGVkID8geyBwYXNzaXZlOiB0cnVlIH0gOiBmYWxzZSk7XHJcbiAgfVxyXG4gIChmdW5jdGlvbiBJbml0aWFsaXplKCkge1xyXG4gICAgLy8gZGV0ZWN0IGlmIHN1cG9ydCBwYXNzaXZlIGV2ZW50XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCBcInBhc3NpdmVcIiwge1xyXG4gICAgICAgIGdldDogKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wYXNzaXZlU3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsICgpID0+IHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSwgb3B0aW9ucyk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgLy9cclxuICAgIH1cclxuICB9KSgpO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEV2ZW50O1xyXG4iXX0=

},{}],20:[function(require,module,exports){
"use strict";
exports.__esModule = true;
// import moment from "moment";
var text_1 = require("./text");
// console.log("--> ok");
var Is;
(function (Is) {
    function mobile() {
        if (window.innerWidth < 900) {
            return true;
        }
        else {
            return false;
        }
    }
    Is.mobile = mobile;
    // is null or undefined
    function nullOrUndefined(value) {
        if (value === undefined || value === null) {
            return true;
        }
        else {
            return false;
        }
    }
    Is.nullOrUndefined = nullOrUndefined;
    // id empty
    function empty(value) {
        if (value === undefined || value === null || value === "") {
            return true;
        }
        else {
            return false;
        }
    }
    Is.empty = empty;
    // is Number
    var numberRegex = /\D/;
    function number(value) {
        return !numberRegex.test(value);
    }
    Is.number = number;
    // is Letter
    var letterRegex = /[a-zA-Z]/;
    function letter(value) {
        return letterRegex.test(value);
    }
    Is.letter = letter;
    // --------------------------------
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/m;
    function email(value) {
        return emailRegex.test(value);
    }
    Is.email = email;
    // brazilian validations ----------------------------------------
    // phone
    var brazilianPhoneRegex = /^(?:(?:\+)[0-9]{2}\s?){0,1}(?:\()[0-9]{2}(?:\))\s?[0-9]{0,1}\s?[0-9]{4,}(?:-)[0-9]{4}$/m;
    function brazilianPhone(phone) {
        return brazilianPhoneRegex.test(phone);
    }
    Is.brazilianPhone = brazilianPhone;
    function ddmmyyyy(date) {
        throw new Error("Not implemented.");
        // return moment(date, "DD/MM/YYYY", true).isValid();
    }
    Is.ddmmyyyy = ddmmyyyy;
    function mmddyyyy(date) {
        throw new Error("Not implemented.");
        // return moment(date, "MM/DD/YYYY", true).isValid();
    }
    Is.mmddyyyy = mmddyyyy;
    // CPF
    function cpf(value) {
        value = text_1.Text.stripNonNumber(value);
        var numeros;
        var digitos;
        var soma;
        var i;
        var resultado;
        var digitos_iguais;
        digitos_iguais = 1;
        if (value.length < 11) {
            return false;
        }
        for (i = 0; i < value.length - 1; i++) {
            if (value.charAt(i) !== value.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        }
        if (!digitos_iguais) {
            numeros = value.substring(0, 9);
            digitos = value.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--) {
                soma += +(numeros.charAt(10 - i)) * i;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== +(digitos.charAt(0))) {
                return false;
            }
            numeros = value.substring(0, 10);
            soma = 0;
            for (i = 11; i > 1; i--) {
                soma += +(numeros.charAt(11 - i)) * i;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== +(digitos.charAt(1))) {
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    }
    Is.cpf = cpf;
    // CNPJ
    function cnpj(value) {
        value = text_1.Text.stripNonNumber(value);
        var tamanho;
        var numeros;
        var digitos;
        var soma;
        var pos;
        value = value.replace(/[^\d]+/g, "");
        if (value === "") {
            return false;
        }
        if (value.length !== 14) {
            return false;
        }
        // Elimina CNPJs invalidos conhecidos
        if (value === "00000000000000" ||
            value === "11111111111111" ||
            value === "22222222222222" ||
            value === "33333333333333" ||
            value === "44444444444444" ||
            value === "55555555555555" ||
            value === "66666666666666" ||
            value === "77777777777777" ||
            value === "88888888888888" ||
            value === "99999999999999") {
            return false;
        }
        // Valida DVs
        tamanho = value.length - 2;
        numeros = value.substring(0, tamanho);
        digitos = value.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += +(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== +(digitos.charAt(0))) {
            return false;
        }
        tamanho = tamanho + 1;
        numeros = value.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += +(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== +(digitos.charAt(1))) {
            return false;
        }
        return true;
    }
})(Is = exports.Is || (exports.Is = {}));
exports["default"] = Is;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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SUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQy9DLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtnQkFDWCxHQUFHLEdBQUcsQ0FBQyxDQUFDO2FBQ1Q7U0FDRjtRQUNELFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUMvQyxJQUFJLFNBQVMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7QUFDSCxDQUFDLEVBbEtnQixFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUFrS2xCO0FBQ0QscUJBQWUsRUFBRSxDQUFDIiwiZmlsZSI6ImlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcbmltcG9ydCB7IFRleHQgfSBmcm9tIFwiLi90ZXh0XCI7XHJcblxyXG4vLyBjb25zb2xlLmxvZyhcIi0tPiBva1wiKTtcclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgSXMge1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBtb2JpbGUoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA5MDApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBpcyBudWxsIG9yIHVuZGVmaW5lZFxyXG4gIGV4cG9ydCBmdW5jdGlvbiBudWxsT3JVbmRlZmluZWQodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIGlkIGVtcHR5XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGVtcHR5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBpcyBOdW1iZXJcclxuICBjb25zdCBudW1iZXJSZWdleDogUmVnRXhwID0gL1xcRC87XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIG51bWJlcih2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIW51bWJlclJlZ2V4LnRlc3QodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLy8gaXMgTGV0dGVyXHJcbiAgY29uc3QgbGV0dGVyUmVnZXg6IFJlZ0V4cCA9IC9bYS16QS1aXS87XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGxldHRlcih2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gbGV0dGVyUmVnZXgudGVzdCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGNvbnN0IGVtYWlsUmVnZXggPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkL207XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGVtYWlsKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBlbWFpbFJlZ2V4LnRlc3QodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLy8gYnJhemlsaWFuIHZhbGlkYXRpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBwaG9uZVxyXG4gIGNvbnN0IGJyYXppbGlhblBob25lUmVnZXggPSAvXig/Oig/OlxcKylbMC05XXsyfVxccz8pezAsMX0oPzpcXCgpWzAtOV17Mn0oPzpcXCkpXFxzP1swLTldezAsMX1cXHM/WzAtOV17NCx9KD86LSlbMC05XXs0fSQvbTtcclxuICBleHBvcnQgZnVuY3Rpb24gYnJhemlsaWFuUGhvbmUocGhvbmU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGJyYXppbGlhblBob25lUmVnZXgudGVzdChwaG9uZSk7XHJcbiAgfVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBkZG1teXl5eShkYXRlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgICAvLyByZXR1cm4gbW9tZW50KGRhdGUsIFwiREQvTU0vWVlZWVwiLCB0cnVlKS5pc1ZhbGlkKCk7XHJcbiAgfVxyXG4gIGV4cG9ydCBmdW5jdGlvbiBtbWRkeXl5eShkYXRlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgICAvLyByZXR1cm4gbW9tZW50KGRhdGUsIFwiTU0vREQvWVlZWVwiLCB0cnVlKS5pc1ZhbGlkKCk7XHJcbiAgfVxyXG5cclxuICAvLyBDUEZcclxuICBleHBvcnQgZnVuY3Rpb24gY3BmKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHZhbHVlID0gVGV4dC5zdHJpcE5vbk51bWJlcih2YWx1ZSk7XHJcbiAgICBsZXQgbnVtZXJvczogc3RyaW5nO1xyXG4gICAgbGV0IGRpZ2l0b3M6IGFueTtcclxuICAgIGxldCBzb21hOiBudW1iZXI7XHJcbiAgICBsZXQgaTogYW55O1xyXG4gICAgbGV0IHJlc3VsdGFkbzogYW55O1xyXG4gICAgbGV0IGRpZ2l0b3NfaWd1YWlzOiBhbnk7XHJcbiAgICBkaWdpdG9zX2lndWFpcyA9IDE7XHJcbiAgICBpZiAodmFsdWUubGVuZ3RoIDwgMTEpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZm9yIChpID0gMDsgaSA8IHZhbHVlLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICBpZiAodmFsdWUuY2hhckF0KGkpICE9PSB2YWx1ZS5jaGFyQXQoaSArIDEpKSB7XHJcbiAgICAgICAgZGlnaXRvc19pZ3VhaXMgPSAwO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIWRpZ2l0b3NfaWd1YWlzKSB7XHJcbiAgICAgIG51bWVyb3MgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgOSk7XHJcbiAgICAgIGRpZ2l0b3MgPSB2YWx1ZS5zdWJzdHJpbmcoOSk7XHJcbiAgICAgIHNvbWEgPSAwO1xyXG4gICAgICBmb3IgKGkgPSAxMDsgaSA+IDE7IGktLSkge1xyXG4gICAgICAgIHNvbWEgKz0gKyhudW1lcm9zLmNoYXJBdCgxMCAtIGkpKSAqIGk7XHJcbiAgICAgIH1cclxuICAgICAgcmVzdWx0YWRvID0gc29tYSAlIDExIDwgMiA/IDAgOiAxMSAtIHNvbWEgJSAxMTtcclxuICAgICAgaWYgKHJlc3VsdGFkbyAhPT0gKyhkaWdpdG9zLmNoYXJBdCgwKSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgbnVtZXJvcyA9IHZhbHVlLnN1YnN0cmluZygwLCAxMCk7XHJcbiAgICAgIHNvbWEgPSAwO1xyXG4gICAgICBmb3IgKGkgPSAxMTsgaSA+IDE7IGktLSkge1xyXG4gICAgICAgIHNvbWEgKz0gKyhudW1lcm9zLmNoYXJBdCgxMSAtIGkpKSAqIGk7XHJcbiAgICAgIH1cclxuICAgICAgcmVzdWx0YWRvID0gc29tYSAlIDExIDwgMiA/IDAgOiAxMSAtIHNvbWEgJSAxMTtcclxuICAgICAgaWYgKHJlc3VsdGFkbyAhPT0gKyhkaWdpdG9zLmNoYXJBdCgxKSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIENOUEpcclxuICBmdW5jdGlvbiBjbnBqKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHZhbHVlID0gVGV4dC5zdHJpcE5vbk51bWJlcih2YWx1ZSk7XHJcblxyXG4gICAgbGV0IHRhbWFuaG86IG51bWJlcjtcclxuICAgIGxldCBudW1lcm9zOiBzdHJpbmc7XHJcbiAgICBsZXQgZGlnaXRvczogc3RyaW5nO1xyXG4gICAgbGV0IHNvbWE6IG51bWJlcjtcclxuICAgIGxldCBwb3M6IG51bWJlcjtcclxuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXGRdKy9nLCBcIlwiKTtcclxuICAgIGlmICh2YWx1ZSA9PT0gXCJcIikgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIGlmICh2YWx1ZS5sZW5ndGggIT09IDE0KSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgIC8vIEVsaW1pbmEgQ05QSnMgaW52YWxpZG9zIGNvbmhlY2lkb3NcclxuICAgIGlmICh2YWx1ZSA9PT0gXCIwMDAwMDAwMDAwMDAwMFwiIHx8XHJcbiAgICAgIHZhbHVlID09PSBcIjExMTExMTExMTExMTExXCIgfHxcclxuICAgICAgdmFsdWUgPT09IFwiMjIyMjIyMjIyMjIyMjJcIiB8fFxyXG4gICAgICB2YWx1ZSA9PT0gXCIzMzMzMzMzMzMzMzMzM1wiIHx8XHJcbiAgICAgIHZhbHVlID09PSBcIjQ0NDQ0NDQ0NDQ0NDQ0XCIgfHxcclxuICAgICAgdmFsdWUgPT09IFwiNTU1NTU1NTU1NTU1NTVcIiB8fFxyXG4gICAgICB2YWx1ZSA9PT0gXCI2NjY2NjY2NjY2NjY2NlwiIHx8XHJcbiAgICAgIHZhbHVlID09PSBcIjc3Nzc3Nzc3Nzc3Nzc3XCIgfHxcclxuICAgICAgdmFsdWUgPT09IFwiODg4ODg4ODg4ODg4ODhcIiB8fFxyXG4gICAgICB2YWx1ZSA9PT0gXCI5OTk5OTk5OTk5OTk5OVwiKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWYWxpZGEgRFZzXHJcbiAgICB0YW1hbmhvID0gdmFsdWUubGVuZ3RoIC0gMjtcclxuICAgIG51bWVyb3MgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgdGFtYW5obyk7XHJcbiAgICBkaWdpdG9zID0gdmFsdWUuc3Vic3RyaW5nKHRhbWFuaG8pO1xyXG4gICAgc29tYSA9IDA7XHJcbiAgICBwb3MgPSB0YW1hbmhvIC0gNztcclxuICAgIGZvciAobGV0IGkgPSB0YW1hbmhvOyBpID49IDE7IGktLSkge1xyXG4gICAgICBzb21hICs9ICsobnVtZXJvcy5jaGFyQXQodGFtYW5obyAtIGkpKSAqIHBvcy0tO1xyXG4gICAgICBpZiAocG9zIDwgMikge1xyXG4gICAgICAgIHBvcyA9IDk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCByZXN1bHRhZG86IG51bWJlciA9IHNvbWEgJSAxMSA8IDIgPyAwIDogMTEgLSBzb21hICUgMTE7XHJcbiAgICBpZiAocmVzdWx0YWRvICE9PSArKGRpZ2l0b3MuY2hhckF0KDApKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGFtYW5obyA9IHRhbWFuaG8gKyAxO1xyXG4gICAgbnVtZXJvcyA9IHZhbHVlLnN1YnN0cmluZygwLCB0YW1hbmhvKTtcclxuICAgIHNvbWEgPSAwO1xyXG4gICAgcG9zID0gdGFtYW5obyAtIDc7XHJcbiAgICBmb3IgKGxldCBpID0gdGFtYW5obzsgaSA+PSAxOyBpLS0pIHtcclxuICAgICAgc29tYSArPSArKG51bWVyb3MuY2hhckF0KHRhbWFuaG8gLSBpKSkgKiBwb3MtLTtcclxuICAgICAgaWYgKHBvcyA8IDIpIHtcclxuICAgICAgICBwb3MgPSA5O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXN1bHRhZG8gPSBzb21hICUgMTEgPCAyID8gMCA6IDExIC0gc29tYSAlIDExO1xyXG4gICAgaWYgKHJlc3VsdGFkbyAhPT0gKyhkaWdpdG9zLmNoYXJBdCgxKSkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IElzO1xyXG4iXX0=

},{"./text":25}],21:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var List;
(function (List) {
    // remove item from list if exist
    function removeFromIndex(list, index) {
        list.splice(index, 1);
        return list;
    }
    List.removeFromIndex = removeFromIndex;
    function removeItem(list, item) {
        var index = list.indexOf(item);
        var newList;
        if (index > -1) {
            newList = removeFromIndex(list, index);
        }
        else {
            newList = list;
        }
        return newList;
    }
    List.removeItem = removeItem;
    function setItem(list, item) {
        var index = list.indexOf(item);
        if (index < 0) {
            list.push(item);
        }
        return list;
    }
    List.setItem = setItem;
    function replaceItemWith(baseList, searchItem, newItems) {
        var newItemsToInsert;
        if (Array.isArray(newItems)) {
            newItemsToInsert = newItems.slice(0);
        }
        else {
            newItemsToInsert = [newItems];
        }
        var output = baseList.slice(0);
        var args;
        var replaceIndex = output.indexOf(searchItem);
        if (replaceIndex > -1) {
            args = [replaceIndex, 1];
            args = args.concat(newItemsToInsert);
        }
        else {
            args = [output.length, 0];
            args = args.concat(newItemsToInsert);
        }
        output.splice.apply(output, args);
        return output;
    }
    List.replaceItemWith = replaceItemWith;
})(List = exports.List || (exports.List = {}));
exports["default"] = List;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBaUIsSUFBSSxDQTZDcEI7QUE3Q0QsV0FBaUIsSUFBSTtJQUNuQixpQ0FBaUM7SUFDakMseUJBQW1DLElBQVMsRUFBRSxLQUFhO1FBQ3pELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUhlLG9CQUFlLGtCQUc5QixDQUFBO0lBQ0Qsb0JBQThCLElBQVMsRUFBRSxJQUFPO1FBQzlDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxPQUFZLENBQUM7UUFDakIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDZCxPQUFPLEdBQUcsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN4QzthQUFNO1lBQ0wsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNoQjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFUZSxlQUFVLGFBU3pCLENBQUE7SUFDRCxpQkFBMkIsSUFBUyxFQUFFLElBQU87UUFDM0MsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBTmUsWUFBTyxVQU10QixDQUFBO0lBR0QseUJBQW1DLFFBQWEsRUFBRSxVQUFlLEVBQUUsUUFBcUI7UUFDdEYsSUFBSSxnQkFBdUIsQ0FBQztRQUM1QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0IsZ0JBQWdCLEdBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ0wsZ0JBQWdCLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvQjtRQUNELElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxJQUFXLENBQUM7UUFDaEIsSUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNyQixJQUFJLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN0QzthQUFNO1lBQ0wsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFuQmUsb0JBQWUsa0JBbUI5QixDQUFBO0FBQ0gsQ0FBQyxFQTdDZ0IsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBNkNwQjtBQUNELHFCQUFlLElBQUksQ0FBQyIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IG5hbWVzcGFjZSBMaXN0IHtcclxuICAvLyByZW1vdmUgaXRlbSBmcm9tIGxpc3QgaWYgZXhpc3RcclxuICBleHBvcnQgZnVuY3Rpb24gcmVtb3ZlRnJvbUluZGV4PFQ+KGxpc3Q6IFRbXSwgaW5kZXg6IG51bWJlcik6IFRbXSB7XHJcbiAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICByZXR1cm4gbGlzdDtcclxuICB9XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUl0ZW08VD4obGlzdDogVFtdLCBpdGVtOiBUKTogVFtdIHtcclxuICAgIGNvbnN0IGluZGV4ID0gbGlzdC5pbmRleE9mKGl0ZW0pO1xyXG4gICAgbGV0IG5ld0xpc3Q6IFRbXTtcclxuICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgIG5ld0xpc3QgPSByZW1vdmVGcm9tSW5kZXgobGlzdCwgaW5kZXgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmV3TGlzdCA9IGxpc3Q7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3TGlzdDtcclxuICB9XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHNldEl0ZW08VD4obGlzdDogVFtdLCBpdGVtOiBUKTogVFtdIHtcclxuICAgIGNvbnN0IGluZGV4ID0gbGlzdC5pbmRleE9mKGl0ZW0pO1xyXG4gICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGlzdDtcclxuICB9XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VJdGVtV2l0aDxUPihiYXNlTGlzdDogVFtdLCBzZWFyY2hJdGVtOiBhbnksIG5ld0l0ZW06IGFueSk6IFRbXTtcclxuICBleHBvcnQgZnVuY3Rpb24gcmVwbGFjZUl0ZW1XaXRoPFQ+KGJhc2VMaXN0OiBUW10sIHNlYXJjaEl0ZW06IGFueSwgbmV3SXRlbXM6IGFueVtdKTogVFtdO1xyXG4gIGV4cG9ydCBmdW5jdGlvbiByZXBsYWNlSXRlbVdpdGg8VD4oYmFzZUxpc3Q6IFRbXSwgc2VhcmNoSXRlbTogYW55LCBuZXdJdGVtczogYW55W10gfCBhbnkpOiBUW10ge1xyXG4gICAgbGV0IG5ld0l0ZW1zVG9JbnNlcnQ6IGFueVtdO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmV3SXRlbXMpKSB7XHJcbiAgICAgIG5ld0l0ZW1zVG9JbnNlcnQgPSAgbmV3SXRlbXMuc2xpY2UoMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZXdJdGVtc1RvSW5zZXJ0ID0gW25ld0l0ZW1zXTtcclxuICAgIH1cclxuICAgIGNvbnN0IG91dHB1dCA9IGJhc2VMaXN0LnNsaWNlKDApO1xyXG4gICAgbGV0IGFyZ3M6IGFueVtdO1xyXG4gICAgY29uc3QgcmVwbGFjZUluZGV4ID0gb3V0cHV0LmluZGV4T2Yoc2VhcmNoSXRlbSk7XHJcbiAgICBpZiAocmVwbGFjZUluZGV4ID4gLTEpIHtcclxuICAgICAgYXJncyA9IFtyZXBsYWNlSW5kZXgsIDFdO1xyXG4gICAgICBhcmdzID0gYXJncy5jb25jYXQobmV3SXRlbXNUb0luc2VydCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcmdzID0gW291dHB1dC5sZW5ndGgsIDBdO1xyXG4gICAgICBhcmdzID0gYXJncy5jb25jYXQobmV3SXRlbXNUb0luc2VydCk7XHJcbiAgICB9XHJcbiAgICBvdXRwdXQuc3BsaWNlLmFwcGx5KG91dHB1dCwgYXJncyk7XHJcbiAgICByZXR1cm4gb3V0cHV0O1xyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBMaXN0O1xyXG4iXX0=

},{}],22:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(require("./dom"));
__export(require("./is"));
__export(require("./text"));
__export(require("./reflection"));
__export(require("./url"));
__export(require("./list"));
__export(require("./scroll-switch"));
__export(require("./event"));
var UtilityCollection;
(function (UtilityCollection) {
    var name = "UtilityCollection";
})(UtilityCollection = exports.UtilityCollection || (exports.UtilityCollection = {}));
exports["default"] = UtilityCollection;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkJBQXNCO0FBQ3RCLDBCQUFxQjtBQUNyQiw0QkFBdUI7QUFDdkIsa0NBQTZCO0FBQzdCLDJCQUFzQjtBQUN0Qiw0QkFBdUI7QUFDdkIscUNBQWdDO0FBQ2hDLDZCQUF3QjtBQUN4QixJQUFpQixpQkFBaUIsQ0FFakM7QUFGRCxXQUFpQixpQkFBaUI7SUFDaEMsSUFBTSxJQUFJLEdBQVcsbUJBQW1CLENBQUM7QUFDM0MsQ0FBQyxFQUZnQixpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQUVqQztBQUNELHFCQUFlLGlCQUFpQixDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tIFwiLi9kb21cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vaXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vdGV4dFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9yZWZsZWN0aW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3VybFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9saXN0XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3Njcm9sbC1zd2l0Y2hcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZXZlbnRcIjtcclxuZXhwb3J0IG5hbWVzcGFjZSBVdGlsaXR5Q29sbGVjdGlvbiB7XHJcbiAgY29uc3QgbmFtZTogc3RyaW5nID0gXCJVdGlsaXR5Q29sbGVjdGlvblwiO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFV0aWxpdHlDb2xsZWN0aW9uO1xyXG4iXX0=

},{"./dom":18,"./event":19,"./is":20,"./list":21,"./reflection":23,"./scroll-switch":24,"./text":25,"./url":26}],23:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Reflection;
(function (Reflection) {
    function merge(base, source) {
        for (var i in source) {
            if (source.hasOwnProperty(i)) {
                base[i] = source[i];
            }
        }
    }
    Reflection.merge = merge;
    function fill(target, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                var element = source[key];
                target[key] = element;
            }
        }
        return target;
    }
    Reflection.fill = fill;
})(Reflection = exports.Reflection || (exports.Reflection = {}));
exports["default"] = Reflection;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWZsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBaUIsVUFBVSxDQWlCMUI7QUFqQkQsV0FBaUIsVUFBVTtJQUN6QixlQUFzQixJQUFTLEVBQUUsTUFBVztRQUMxQyxLQUFLLElBQU0sQ0FBQyxJQUFJLE1BQU0sRUFBRTtZQUN0QixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckI7U0FDRjtJQUNILENBQUM7SUFOZSxnQkFBSyxRQU1wQixDQUFBO0lBQ0QsY0FBdUQsTUFBUyxFQUFFLE1BQVc7UUFDM0UsS0FBSyxJQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUU7WUFDeEIsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM5QixJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUM7YUFDdkI7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFSZSxlQUFJLE9BUW5CLENBQUE7QUFDSCxDQUFDLEVBakJnQixVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQWlCMUI7QUFDRCxxQkFBZSxVQUFVLENBQUMiLCJmaWxlIjoicmVmbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBuYW1lc3BhY2UgUmVmbGVjdGlvbiB7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIG1lcmdlKGJhc2U6IGFueSwgc291cmNlOiBhbnkpOiB2b2lkIHtcclxuICAgIGZvciAoY29uc3QgaSBpbiBzb3VyY2UpIHtcclxuICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgIGJhc2VbaV0gPSBzb3VyY2VbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGZpbGw8VCBleHRlbmRzIHsgW2tleTogc3RyaW5nXTogYW55IH0+KHRhcmdldDogVCwgc291cmNlOiBhbnkpOiBUIHtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gc291cmNlW2tleV07XHJcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBlbGVtZW50O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBSZWZsZWN0aW9uO1xyXG4iXX0=

},{}],24:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var event_1 = require("./event");
exports.DATA_SCROLLABLE = "data-scrollable";
exports.CLASS_FOCUS = "scroll--active";
var ScrollSwitch;
(function (ScrollSwitch) {
    var unfreezeDelay;
    var Scrollable = /** @class */ (function () {
        function Scrollable(element) {
            var _this = this;
            this.element = null;
            this.y = 0;
            this.frozen = false;
            this.unfreezing = false;
            this.element = element;
            if (this.element.getAttribute(exports.DATA_SCROLLABLE) === undefined) {
                this.id = newScrollableId();
                this.element.setAttribute(exports.DATA_SCROLLABLE, this.id);
            }
            else {
                this.id = this.element.getAttribute(exports.DATA_SCROLLABLE);
            }
            // register event
            var unfreezeEvent = function (e) {
                window.scrollTo(0, window.scrollY);
                _this.unfreeze();
            };
            var freezeAllEvent = function (e) {
                freezeAllButId(null);
            };
            element.addEventListener("touchstart", unfreezeEvent, event_1.Event.passive());
            element.addEventListener("mouseenter", unfreezeEvent, event_1.Event.passive());
            element.addEventListener("pointermove", unfreezeEvent, event_1.Event.passive());
            element.addEventListener("mouseleave", freezeAllEvent, event_1.Event.passive());
        }
        Scrollable.prototype.getId = function () {
            return this.id;
        };
        Scrollable.prototype.unfreeze = function () {
            if (this.frozen && !this.unfreezing) {
                this.unfreezing = true;
                freezeAllButId(this.id);
                document.body.style.height = this.element.scrollHeight + "px";
                window.scroll(0, this.y);
                this.element.setAttribute("style", "position: absolute; top: 0; z-index: " + this.element.style.zIndex + "; ");
                this.element.classList.add(exports.CLASS_FOCUS);
                document.body.style.height = "";
                this.y = 0;
                this.frozen = false;
                this.unfreezing = false;
                unfreezeDelay = undefined;
            }
        };
        Scrollable.prototype.freeze = function () {
            if (!this.frozen) {
                this.y = window.scrollY + 0;
                this.element.setAttribute("style", "position: fixed; top: -" + this.y + "px; z-index: " + this.element.style.zIndex + "; ");
                this.element.classList.remove(exports.CLASS_FOCUS);
                this.frozen = true;
            }
        };
        return Scrollable;
    }());
    ScrollSwitch.Scrollable = Scrollable;
    var store = {};
    var lastId = 1;
    function newScrollableId() {
        lastId = lastId + 1;
        return lastId.toString();
    }
    function identifyElement(element) {
        if (element.parentElement !== document.body) {
            return null;
        }
        var id = element.getAttribute(exports.DATA_SCROLLABLE);
        if (id === null) {
            return null;
        }
        var stored = (id !== undefined) ? (store[id] !== undefined) : false;
        if (stored) {
            return store[id];
        }
        else {
            var s = new Scrollable(element);
            id = s.getId();
            store[id] = s;
            return store[id];
        }
    }
    function freezeElement(element) {
        var scroll = identifyElement(element);
        if (scroll !== null) {
            scroll.freeze();
        }
    }
    ScrollSwitch.freezeElement = freezeElement;
    function freezeAllButId(id) {
        if (id === void 0) { id = null; }
        for (var i in store) {
            if (i !== id) {
                store[i].freeze();
            }
        }
    }
    ScrollSwitch.freezeAllButId = freezeAllButId;
    function freezeAllButElement(element) {
        var scroll = identifyElement(element);
        if (scroll !== null) {
            freezeAllButId(scroll.getId());
        }
    }
    ScrollSwitch.freezeAllButElement = freezeAllButElement;
    function unfreezeElement(element) {
        var scroll = identifyElement(element);
        if (scroll !== null) {
            scroll.unfreeze();
        }
    }
    ScrollSwitch.unfreezeElement = unfreezeElement;
})(ScrollSwitch = exports.ScrollSwitch || (exports.ScrollSwitch = {}));
exports["default"] = ScrollSwitch;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDO0lBTGUsZ0NBQW1CLHNCQUtsQyxDQUFBO0lBQ0QseUJBQWdDLE9BQW9CO1FBQ2xELElBQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQUxlLDRCQUFlLGtCQUs5QixDQUFBO0FBQ0gsQ0FBQyxFQXpHZ0IsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUF5RzVCO0FBQ0QscUJBQWUsWUFBWSxDQUFDIiwiZmlsZSI6InNjcm9sbC1zd2l0Y2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuL2V2ZW50XCI7XHJcblxyXG5leHBvcnQgY29uc3QgREFUQV9TQ1JPTExBQkxFID0gXCJkYXRhLXNjcm9sbGFibGVcIjtcclxuZXhwb3J0IGNvbnN0IENMQVNTX0ZPQ1VTID0gXCJzY3JvbGwtLWFjdGl2ZVwiO1xyXG5leHBvcnQgbmFtZXNwYWNlIFNjcm9sbFN3aXRjaCB7XHJcbiAgbGV0IHVuZnJlZXplRGVsYXk6IG51bWJlciB8IHVuZGVmaW5lZDtcclxuICBleHBvcnQgY2xhc3MgU2Nyb2xsYWJsZSB7XHJcbiAgICBwcml2YXRlIGlkOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSB5OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBmcm96ZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgdW5mcmVlemluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgaWYgKHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoREFUQV9TQ1JPTExBQkxFKSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IG5ld1Njcm9sbGFibGVJZCgpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoREFUQV9TQ1JPTExBQkxFLCB0aGlzLmlkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmlkID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShEQVRBX1NDUk9MTEFCTEUpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHJlZ2lzdGVyIGV2ZW50XHJcbiAgICAgIGNvbnN0IHVuZnJlZXplRXZlbnQgPSAoZTogRXZlbnQpID0+IHtcclxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgd2luZG93LnNjcm9sbFkpO1xyXG4gICAgICAgIHRoaXMudW5mcmVlemUoKTtcclxuICAgICAgfTtcclxuICAgICAgY29uc3QgZnJlZXplQWxsRXZlbnQgPSAoZTogRXZlbnQpID0+IHtcclxuICAgICAgICBmcmVlemVBbGxCdXRJZChudWxsKTtcclxuICAgICAgfTtcclxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB1bmZyZWV6ZUV2ZW50LCBFdmVudC5wYXNzaXZlKCkpO1xyXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHVuZnJlZXplRXZlbnQsIEV2ZW50LnBhc3NpdmUoKSk7XHJcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIHVuZnJlZXplRXZlbnQsIEV2ZW50LnBhc3NpdmUoKSk7XHJcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZnJlZXplQWxsRXZlbnQsIEV2ZW50LnBhc3NpdmUoKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0SWQoKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHVuZnJlZXplKCkge1xyXG4gICAgICBpZiAodGhpcy5mcm96ZW4gJiYgIXRoaXMudW5mcmVlemluZykge1xyXG4gICAgICAgIHRoaXMudW5mcmVlemluZyA9IHRydWU7XHJcbiAgICAgICAgZnJlZXplQWxsQnV0SWQodGhpcy5pZCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5oZWlnaHQgPSBgJHt0aGlzLmVsZW1lbnQhLnNjcm9sbEhlaWdodH1weGA7XHJcbiAgICAgICAgd2luZG93LnNjcm9sbCgwLCB0aGlzLnkpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCEuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgYHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyB6LWluZGV4OiAke3RoaXMuZWxlbWVudCEuc3R5bGUuekluZGV4fTsgYCk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50IS5jbGFzc0xpc3QuYWRkKENMQVNTX0ZPQ1VTKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmhlaWdodCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICB0aGlzLmZyb3plbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudW5mcmVlemluZyA9IGZhbHNlO1xyXG4gICAgICAgIHVuZnJlZXplRGVsYXkgPSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBmcmVlemUoKSB7XHJcbiAgICAgIGlmICghdGhpcy5mcm96ZW4pIHtcclxuICAgICAgICB0aGlzLnkgPSB3aW5kb3cuc2Nyb2xsWSArIDA7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50IS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBgcG9zaXRpb246IGZpeGVkOyB0b3A6IC0ke3RoaXMueX1weDsgei1pbmRleDogJHt0aGlzLmVsZW1lbnQhLnN0eWxlLnpJbmRleH07IGApO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCEuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19GT0NVUyk7XHJcbiAgICAgICAgdGhpcy5mcm96ZW4gPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnN0IHN0b3JlOiB7IFtrZXk6IHN0cmluZ106IFNjcm9sbGFibGUgfSA9IHt9O1xyXG4gIGxldCBsYXN0SWQ6IG51bWJlciA9IDE7XHJcbiAgZnVuY3Rpb24gbmV3U2Nyb2xsYWJsZUlkKCk6IHN0cmluZyB7XHJcbiAgICBsYXN0SWQgPSBsYXN0SWQgKyAxO1xyXG4gICAgcmV0dXJuIGxhc3RJZC50b1N0cmluZygpO1xyXG4gIH1cclxuICBmdW5jdGlvbiBpZGVudGlmeUVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBTY3JvbGxhYmxlIHwgbnVsbCB7XHJcbiAgICBpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgbGV0IGlkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoREFUQV9TQ1JPTExBQkxFKTtcclxuICAgIGlmIChpZCA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IHN0b3JlZCA9IChpZCAhPT0gdW5kZWZpbmVkKSA/IChzdG9yZVtpZF0gIT09IHVuZGVmaW5lZCkgOiBmYWxzZTtcclxuICAgIGlmIChzdG9yZWQpIHtcclxuICAgICAgcmV0dXJuIHN0b3JlW2lkXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHMgPSBuZXcgU2Nyb2xsYWJsZShlbGVtZW50KTtcclxuICAgICAgaWQgPSBzLmdldElkKCk7XHJcbiAgICAgIHN0b3JlW2lkIV0gPSBzO1xyXG4gICAgICByZXR1cm4gc3RvcmVbaWQhXTtcclxuICAgIH1cclxuICB9XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGZyZWV6ZUVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNjcm9sbCA9IGlkZW50aWZ5RWxlbWVudChlbGVtZW50KTtcclxuICAgIGlmIChzY3JvbGwgIT09IG51bGwpIHtcclxuICAgICAgc2Nyb2xsLmZyZWV6ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gZnJlZXplQWxsQnV0SWQoaWQ6IHN0cmluZyB8IG51bGwgPSBudWxsKTogdm9pZCB7XHJcbiAgICBmb3IgKGNvbnN0IGkgaW4gc3RvcmUpIHtcclxuICAgICAgaWYgKGkgIT09IGlkKSB7XHJcbiAgICAgICAgc3RvcmVbaV0uZnJlZXplKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGZyZWV6ZUFsbEJ1dEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNjcm9sbCA9IGlkZW50aWZ5RWxlbWVudChlbGVtZW50KTtcclxuICAgIGlmIChzY3JvbGwgIT09IG51bGwpIHtcclxuICAgICAgZnJlZXplQWxsQnV0SWQoc2Nyb2xsLmdldElkKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gdW5mcmVlemVFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBzY3JvbGwgPSBpZGVudGlmeUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICBpZiAoc2Nyb2xsICE9PSBudWxsKSB7XHJcbiAgICAgIHNjcm9sbC51bmZyZWV6ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxTd2l0Y2g7XHJcbiJdfQ==

},{"./event":19}],25:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var is_1 = require("./is");
var Text;
(function (Text) {
    function replaceAll(value, search, replacement) {
        return value.split(search).join(replacement);
    }
    Text.replaceAll = replaceAll;
    function pathArray(path) {
        return path.split(".");
    }
    Text.pathArray = pathArray;
    function stripNonNumber(value) {
        return value.replace(/[^0-9]/g, "");
    }
    Text.stripNonNumber = stripNonNumber;
    // -----------------
    var accents = "ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž";
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    function removeAccents(value) {
        if (is_1.Is.empty(value)) {
            return value;
        }
        var strAccents = value.split("");
        var strAccentsOut = new Array();
        var strAccentsLen = strAccents.length;
        for (var y = 0; y < strAccentsLen; y++) {
            if (accents.indexOf(strAccents[y]) !== -1) {
                strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
            }
            else {
                strAccentsOut[y] = strAccents[y];
            }
        }
        return strAccentsOut.join("");
    }
    Text.removeAccents = removeAccents;
})(Text = exports.Text || (exports.Text = {}));
exports["default"] = Text;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQTBCO0FBRTFCLElBQWlCLElBQUksQ0ErQnBCO0FBL0JELFdBQWlCLElBQUk7SUFDbkIsb0JBQTJCLEtBQWEsRUFBRSxNQUFjLEVBQUUsV0FBbUI7UUFDM0UsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRmUsZUFBVSxhQUV6QixDQUFBO0lBQ0QsbUJBQTBCLElBQVk7UUFDcEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFGZSxjQUFTLFlBRXhCLENBQUE7SUFFRCx3QkFBK0IsS0FBYTtRQUMxQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFGZSxtQkFBYyxpQkFFN0IsQ0FBQTtJQUNELG9CQUFvQjtJQUNwQixJQUFNLE9BQU8sR0FBRyxnRUFBZ0UsQ0FBQztJQUNqRixJQUFNLFVBQVUsR0FBRyxnRUFBZ0UsQ0FBQztJQUNwRix1QkFBOEIsS0FBYTtRQUN6QyxJQUFJLE9BQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkMsSUFBTSxhQUFhLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNsQyxJQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBRXhDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN6QyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3pFO2lCQUFNO2dCQUNMLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEM7U0FDRjtRQUNELE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBaEJlLGtCQUFhLGdCQWdCNUIsQ0FBQTtBQUNILENBQUMsRUEvQmdCLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQStCcEI7QUFDRCxxQkFBZSxJQUFJLENBQUMiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElzIH0gZnJvbSBcIi4vaXNcIjtcclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgVGV4dCB7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VBbGwodmFsdWU6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB2YWx1ZS5zcGxpdChzZWFyY2gpLmpvaW4ocmVwbGFjZW1lbnQpO1xyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gcGF0aEFycmF5KHBhdGg6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiBwYXRoLnNwbGl0KFwiLlwiKTtcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBzdHJpcE5vbk51bWJlcih2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bXjAtOV0vZywgXCJcIik7XHJcbiAgfVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgY29uc3QgYWNjZW50cyA9IFwiw4DDgcOCw4PDhMOFw6DDocOiw6PDpMOlw5LDk8OUw5XDlcOWw5jDssOzw7TDtcO2w7jDiMOJw4rDi8Oow6nDqsOrw7DDh8Onw5DDjMONw47Dj8Osw63DrsOvw5nDmsObw5zDucO6w7vDvMORw7HFoMWhxbjDv8O9xb3FvlwiO1xyXG4gIGNvbnN0IGFjY2VudHNPdXQgPSBcIkFBQUFBQWFhYWFhYU9PT09PT09vb29vb29FRUVFZWVlZWVDY0RJSUlJaWlpaVVVVVV1dXV1Tm5Tc1l5eVp6XCI7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUFjY2VudHModmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKElzLmVtcHR5KHZhbHVlKSkge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdHJBY2NlbnRzID0gdmFsdWUuc3BsaXQoXCJcIik7XHJcbiAgICBjb25zdCBzdHJBY2NlbnRzT3V0ID0gbmV3IEFycmF5KCk7XHJcbiAgICBjb25zdCBzdHJBY2NlbnRzTGVuID0gc3RyQWNjZW50cy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBzdHJBY2NlbnRzTGVuOyB5KyspIHtcclxuICAgICAgaWYgKGFjY2VudHMuaW5kZXhPZihzdHJBY2NlbnRzW3ldKSAhPT0gLTEpIHtcclxuICAgICAgICBzdHJBY2NlbnRzT3V0W3ldID0gYWNjZW50c091dC5zdWJzdHIoYWNjZW50cy5pbmRleE9mKHN0ckFjY2VudHNbeV0pLCAxKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzdHJBY2NlbnRzT3V0W3ldID0gc3RyQWNjZW50c1t5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0ckFjY2VudHNPdXQuam9pbihcIlwiKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgVGV4dDtcclxuIl19

},{"./is":20}],26:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var text_1 = require("./text");
var Url = /** @class */ (function () {
    // -------------------
    function Url(url) {
        var _this = this;
        this.QueryList = {};
        this.originPath = "/";
        this.staticPath = url.split("#")[0].split("?")[0];
        var splited = Url.splitOriginPath(this.staticPath);
        this.staticPath = splited.path;
        this.origin = splited.origin;
        this.staticQuery = url.indexOf("?") > -1 ? url.split("?")[1].split("#")[0] : null;
        this.staticHash = url.split("#")[1] || null;
        // queryList
        if (this.staticQuery != null) {
            var queryKeyValueList = this.staticQuery.split("&");
            queryKeyValueList.forEach(function (queryKeyValue) {
                var keyValue = queryKeyValue.split("=");
                var key = keyValue[0];
                var value = keyValue[1];
                _this.QueryList[key] = value;
            });
        }
        // origin
    }
    Url.prototype.setQuery = function (key, value) {
        this.QueryList[key] = value;
        return this;
    };
    Url.prototype.setQueries = function (values) {
        for (var key in values) {
            if (typeof values[key] !== "function" && values[key] !== undefined) {
                this.QueryList[key] = values[key].toString();
            }
        }
        return this;
    };
    Url.prototype.deleteQuery = function (key) {
        if (this.QueryList !== undefined) {
            this.QueryList[key] = undefined;
            delete this.QueryList[key];
        }
        return this;
    };
    Url.prototype.getQuery = function (key) {
        if (this.QueryList !== undefined) {
            return this.QueryList[key];
        }
    };
    Url.prototype.toString = function () {
        var queryLength = Object.keys(this.QueryList).length;
        var query = (Object.keys(this.QueryList).length > 0 ? "?" : "");
        for (var key in this.QueryList) {
            if (this.QueryList.hasOwnProperty(key)) {
                queryLength--;
                var value = this.QueryList[key];
                query = query + key + "=" + value;
                if (queryLength > 0) {
                    query = query + "&";
                }
            }
        }
        var newPath = this.staticPath + query + (this.staticHash ? "#" + this.staticHash : "");
        newPath = Url.absolute(newPath, newPath[0] === "." ? this.originPath : "/");
        if (this.origin !== undefined && this.origin !== null) {
            var newUrl = this.origin + newPath; // Url.absolute(newPath, this.origin);
            return newUrl;
        }
        else {
            return newPath;
        }
    };
    Url.prototype.setOrigin = function (origin, justLocal) {
        if (justLocal === void 0) { justLocal = true; }
        var splited = Url.splitOriginPath(origin || window.location.origin + "/" + window.location.pathname);
        if (this.origin === undefined) {
            this.origin = splited.origin;
            this.originPath = splited.path || "/";
        }
        else if (this.origin === null || this.origin === undefined || justLocal === false) {
            this.origin = splited.origin;
            this.originPath = splited.path || "/";
        }
        else if (justLocal) {
            if (window.location.origin.replace("https", "http").toLowerCase() === this.origin.replace("https", "http").toLowerCase()) {
                this.origin = splited.origin;
            }
            this.originPath = splited.path || "/";
        }
        else {
            this.origin = splited.origin;
            this.originPath = splited.path || "/";
        }
    };
    return Url;
}());
exports.Url = Url;
(function (Url) {
    function splitOriginPath(value) {
        var split = /(https?:\/\/[a-zA-Z0-9-\.]+(?::[0-9]*)?)(\/.*)?/g.exec(value);
        if (split !== null) {
            return {
                origin: split[1],
                path: split[2] || "/"
            };
        }
        else {
            return {
                origin: null,
                path: value || "/"
            };
        }
    }
    Url.splitOriginPath = splitOriginPath;
    function absolute(relative, base) {
        if (base === null) {
            base = "";
        }
        var stack = base.split("/");
        var parts = relative.split("/");
        stack.pop(); // remove current file name (or empty string)
        // (omit if "base" is the current folder without trailing slash)
        for (var i = 0; i < parts.length; i++) {
            if (parts[i] === ".") {
                continue;
            }
            if (parts[i] === "..") {
                stack.pop();
            }
            else {
                stack.push(parts[i]);
            }
        }
        return text_1.Text.replaceAll(stack.join("/"), "//", "/");
    }
    Url.absolute = absolute;
})(Url = exports.Url || (exports.Url = {}));
exports.Url = Url;
exports["default"] = Url;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBOEI7QUFDOUI7SUFPRSxzQkFBc0I7SUFDdEIsYUFBbUIsR0FBVztRQUE5QixpQkFtQkM7UUExQk0sY0FBUyxHQUEwQyxFQUFFLENBQUM7UUFLckQsZUFBVSxHQUFrQixHQUFHLENBQUM7UUFHdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRTdCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNsRixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO1FBQzVDLFlBQVk7UUFDWixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFFO1lBQzVCLElBQU0saUJBQWlCLEdBQWEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQUMsYUFBYTtnQkFDdEMsSUFBTSxRQUFRLEdBQWEsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDcEQsSUFBTSxHQUFHLEdBQVcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFNLEtBQUssR0FBVyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxTQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxTQUFTO0lBQ1gsQ0FBQztJQUVNLHNCQUFRLEdBQWYsVUFBZ0IsR0FBVyxFQUFFLEtBQWE7UUFDeEMsSUFBSSxDQUFDLFNBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ00sd0JBQVUsR0FBakIsVUFBa0IsTUFBOEI7UUFDOUMsS0FBSyxJQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUU7WUFDeEIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDbEUsSUFBSSxDQUFDLFNBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDL0M7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNNLHlCQUFXLEdBQWxCLFVBQW1CLEdBQVc7UUFDNUIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUNoQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDTSxzQkFBUSxHQUFmLFVBQWdCLEdBQVc7UUFDekIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUNoQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBQ00sc0JBQVEsR0FBZjtRQUNFLElBQUksV0FBVyxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUM3RCxJQUFJLEtBQUssR0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEUsS0FBSyxJQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3RDLFdBQVcsRUFBRSxDQUFDO2dCQUNkLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7Z0JBQ2xDLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRTtvQkFDbkIsS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7aUJBQ3JCO2FBQ0Y7U0FDRjtRQUNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1RSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3JELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsc0NBQXNDO1lBQzVFLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7YUFBTTtZQUNMLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQztJQUNNLHVCQUFTLEdBQWhCLFVBQWlCLE1BQWUsRUFBRSxTQUF5QjtRQUF6QiwwQkFBQSxFQUFBLGdCQUF5QjtRQUN6RCxJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDO1NBQ3ZDO2FBQ0MsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsSUFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO1lBQzVFLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDO1NBQ3ZDO2FBQ0MsSUFBSSxTQUFTLEVBQUU7WUFDYixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUN4SCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7YUFDOUI7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDO1NBQ3ZDO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQztTQUN2QztJQUNQLENBQUM7SUFFSCxVQUFDO0FBQUQsQ0FoR0EsQUFnR0MsSUFBQTtBQWhHWSxrQkFBRztBQWlHaEIsV0FBaUIsR0FBRztJQUNsQix5QkFBZ0MsS0FBYTtRQUMzQyxJQUFNLEtBQUssR0FBUSxrREFBa0QsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEYsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xCLE9BQU87Z0JBQ0wsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRzthQUN0QixDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU87Z0JBQ0wsTUFBTSxFQUFFLElBQUk7Z0JBQ1osSUFBSSxFQUFFLEtBQUssSUFBSSxHQUFHO2FBQ25CLENBQUM7U0FDSDtJQUNILENBQUM7SUFiZSxtQkFBZSxrQkFhOUIsQ0FBQTtJQUNELGtCQUF5QixRQUFnQixFQUFFLElBQW1CO1FBQzVELElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtZQUNqQixJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ1g7UUFDRCxJQUFNLEtBQUssR0FBYSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsNkNBQTZDO1FBQzFELGdFQUFnRTtRQUNoRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7Z0JBQ3BCLFNBQVM7YUFDVjtZQUNELElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDckIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2I7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0QjtTQUNGO1FBQ0QsT0FBTyxXQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFuQmUsWUFBUSxXQW1CdkIsQ0FBQTtBQUNILENBQUMsRUFuQ2dCLEdBQUcsR0FBSCxXQUFHLEtBQUgsV0FBRyxRQW1DbkI7QUFwSVksa0JBQUc7QUFxSWhCLHFCQUFlLEdBQUcsQ0FBQyIsImZpbGUiOiJ1cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0IH0gZnJvbSBcIi4vdGV4dFwiO1xyXG5leHBvcnQgY2xhc3MgVXJsIHtcclxuICBwdWJsaWMgUXVlcnlMaXN0OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IHVuZGVmaW5lZCB9ID0ge307XHJcbiAgcHJpdmF0ZSBzdGF0aWNQYXRoPzogc3RyaW5nIHwgbnVsbDtcclxuICBwcml2YXRlIHN0YXRpY1F1ZXJ5Pzogc3RyaW5nIHwgbnVsbDtcclxuICBwcml2YXRlIHN0YXRpY0hhc2g/OiBzdHJpbmcgfCBudWxsO1xyXG4gIHByaXZhdGUgb3JpZ2luPzogc3RyaW5nIHwgbnVsbDtcclxuICBwcml2YXRlIG9yaWdpblBhdGg6IHN0cmluZyB8IG51bGwgPSBcIi9cIjtcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnN0YXRpY1BhdGggPSB1cmwuc3BsaXQoXCIjXCIpWzBdLnNwbGl0KFwiP1wiKVswXTtcclxuICAgIGNvbnN0IHNwbGl0ZWQgPSBVcmwuc3BsaXRPcmlnaW5QYXRoKHRoaXMuc3RhdGljUGF0aCk7XHJcbiAgICB0aGlzLnN0YXRpY1BhdGggPSBzcGxpdGVkLnBhdGg7XHJcbiAgICB0aGlzLm9yaWdpbiA9IHNwbGl0ZWQub3JpZ2luO1xyXG5cclxuICAgIHRoaXMuc3RhdGljUXVlcnkgPSB1cmwuaW5kZXhPZihcIj9cIikgPiAtMSA/IHVybC5zcGxpdChcIj9cIilbMV0uc3BsaXQoXCIjXCIpWzBdIDogbnVsbDtcclxuICAgIHRoaXMuc3RhdGljSGFzaCA9IHVybC5zcGxpdChcIiNcIilbMV0gfHwgbnVsbDtcclxuICAgIC8vIHF1ZXJ5TGlzdFxyXG4gICAgaWYgKHRoaXMuc3RhdGljUXVlcnkgIT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBxdWVyeUtleVZhbHVlTGlzdDogc3RyaW5nW10gPSB0aGlzLnN0YXRpY1F1ZXJ5LnNwbGl0KFwiJlwiKTtcclxuICAgICAgcXVlcnlLZXlWYWx1ZUxpc3QuZm9yRWFjaCgocXVlcnlLZXlWYWx1ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGtleVZhbHVlOiBzdHJpbmdbXSA9IHF1ZXJ5S2V5VmFsdWUuc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgIGNvbnN0IGtleTogc3RyaW5nID0ga2V5VmFsdWVbMF07XHJcbiAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IGtleVZhbHVlWzFdO1xyXG4gICAgICAgIHRoaXMuUXVlcnlMaXN0IVtrZXldID0gdmFsdWU7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gb3JpZ2luXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0UXVlcnkoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBVcmwge1xyXG4gICAgdGhpcy5RdWVyeUxpc3QhW2tleV0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0UXVlcmllcyh2YWx1ZXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBVcmwge1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdmFsdWVzKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWVzW2tleV0gIT09IFwiZnVuY3Rpb25cIiAmJiB2YWx1ZXNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5RdWVyeUxpc3QhW2tleV0gPSB2YWx1ZXNba2V5XS50b1N0cmluZygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgcHVibGljIGRlbGV0ZVF1ZXJ5KGtleTogc3RyaW5nKTogVXJsIHtcclxuICAgIGlmICh0aGlzLlF1ZXJ5TGlzdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuUXVlcnlMaXN0W2tleV0gPSB1bmRlZmluZWQ7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLlF1ZXJ5TGlzdFtrZXldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRRdWVyeShrZXk6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICBpZiAodGhpcy5RdWVyeUxpc3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5RdWVyeUxpc3Rba2V5XTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICBsZXQgcXVlcnlMZW5ndGg6IG51bWJlciA9IE9iamVjdC5rZXlzKHRoaXMuUXVlcnlMaXN0KS5sZW5ndGg7XHJcbiAgICBsZXQgcXVlcnk6IHN0cmluZyA9IChPYmplY3Qua2V5cyh0aGlzLlF1ZXJ5TGlzdCkubGVuZ3RoID4gMCA/IFwiP1wiIDogXCJcIik7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLlF1ZXJ5TGlzdCkge1xyXG4gICAgICBpZiAodGhpcy5RdWVyeUxpc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIHF1ZXJ5TGVuZ3RoLS07XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLlF1ZXJ5TGlzdFtrZXldO1xyXG4gICAgICAgIHF1ZXJ5ID0gcXVlcnkgKyBrZXkgKyBcIj1cIiArIHZhbHVlO1xyXG4gICAgICAgIGlmIChxdWVyeUxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHF1ZXJ5ID0gcXVlcnkgKyBcIiZcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBuZXdQYXRoID0gdGhpcy5zdGF0aWNQYXRoICsgcXVlcnkgKyAodGhpcy5zdGF0aWNIYXNoID8gXCIjXCIgKyB0aGlzLnN0YXRpY0hhc2ggOiBcIlwiKTtcclxuICAgIG5ld1BhdGggPSBVcmwuYWJzb2x1dGUobmV3UGF0aCwgbmV3UGF0aFswXSA9PT0gXCIuXCIgPyB0aGlzLm9yaWdpblBhdGggOiBcIi9cIik7XHJcbiAgICBpZiAodGhpcy5vcmlnaW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLm9yaWdpbiAhPT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBuZXdVcmwgPSB0aGlzLm9yaWdpbiArIG5ld1BhdGg7IC8vIFVybC5hYnNvbHV0ZShuZXdQYXRoLCB0aGlzLm9yaWdpbik7XHJcbiAgICAgIHJldHVybiBuZXdVcmw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbmV3UGF0aDtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHNldE9yaWdpbihvcmlnaW4/OiBzdHJpbmcsIGp1c3RMb2NhbDogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgIGNvbnN0IHNwbGl0ZWQgPSBVcmwuc3BsaXRPcmlnaW5QYXRoKG9yaWdpbiB8fCB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgXCIvXCIgKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xyXG4gICAgaWYgKHRoaXMub3JpZ2luID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5vcmlnaW4gPSBzcGxpdGVkLm9yaWdpbjtcclxuICAgICAgdGhpcy5vcmlnaW5QYXRoID0gc3BsaXRlZC5wYXRoIHx8IFwiL1wiO1xyXG4gICAgfSBlbHNlXHJcbiAgICAgIGlmICh0aGlzLm9yaWdpbiA9PT0gbnVsbCB8fCB0aGlzLm9yaWdpbiA9PT0gdW5kZWZpbmVkIHx8IGp1c3RMb2NhbCA9PT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLm9yaWdpbiA9IHNwbGl0ZWQub3JpZ2luO1xyXG4gICAgICAgIHRoaXMub3JpZ2luUGF0aCA9IHNwbGl0ZWQucGF0aCB8fCBcIi9cIjtcclxuICAgICAgfSBlbHNlXHJcbiAgICAgICAgaWYgKGp1c3RMb2NhbCkge1xyXG4gICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4ucmVwbGFjZShcImh0dHBzXCIsIFwiaHR0cFwiKS50b0xvd2VyQ2FzZSgpID09PSB0aGlzLm9yaWdpbi5yZXBsYWNlKFwiaHR0cHNcIiwgXCJodHRwXCIpLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5vcmlnaW4gPSBzcGxpdGVkLm9yaWdpbjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMub3JpZ2luUGF0aCA9IHNwbGl0ZWQucGF0aCB8fCBcIi9cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5vcmlnaW4gPSBzcGxpdGVkLm9yaWdpbjtcclxuICAgICAgICAgIHRoaXMub3JpZ2luUGF0aCA9IHNwbGl0ZWQucGF0aCB8fCBcIi9cIjtcclxuICAgICAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5leHBvcnQgbmFtZXNwYWNlIFVybCB7XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHNwbGl0T3JpZ2luUGF0aCh2YWx1ZTogc3RyaW5nKTogeyBvcmlnaW46IHN0cmluZyB8IG51bGw7IHBhdGg6IHN0cmluZzsgfSB7XHJcbiAgICBjb25zdCBzcGxpdDogYW55ID0gLyhodHRwcz86XFwvXFwvW2EtekEtWjAtOS1cXC5dKyg/OjpbMC05XSopPykoXFwvLiopPy9nLmV4ZWModmFsdWUpO1xyXG4gICAgaWYgKHNwbGl0ICE9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgb3JpZ2luOiBzcGxpdFsxXSxcclxuICAgICAgICBwYXRoOiBzcGxpdFsyXSB8fCBcIi9cIixcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgb3JpZ2luOiBudWxsLFxyXG4gICAgICAgIHBhdGg6IHZhbHVlIHx8IFwiL1wiLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gYWJzb2x1dGUocmVsYXRpdmU6IHN0cmluZywgYmFzZTogc3RyaW5nIHwgbnVsbCkge1xyXG4gICAgaWYgKGJhc2UgPT09IG51bGwpIHtcclxuICAgICAgYmFzZSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGFjazogc3RyaW5nW10gPSBiYXNlLnNwbGl0KFwiL1wiKTtcclxuICAgIGNvbnN0IHBhcnRzID0gcmVsYXRpdmUuc3BsaXQoXCIvXCIpO1xyXG4gICAgc3RhY2sucG9wKCk7IC8vIHJlbW92ZSBjdXJyZW50IGZpbGUgbmFtZSAob3IgZW1wdHkgc3RyaW5nKVxyXG4gICAgLy8gKG9taXQgaWYgXCJiYXNlXCIgaXMgdGhlIGN1cnJlbnQgZm9sZGVyIHdpdGhvdXQgdHJhaWxpbmcgc2xhc2gpXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChwYXJ0c1tpXSA9PT0gXCIuXCIpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocGFydHNbaV0gPT09IFwiLi5cIikge1xyXG4gICAgICAgIHN0YWNrLnBvcCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0YWNrLnB1c2gocGFydHNbaV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gVGV4dC5yZXBsYWNlQWxsKHN0YWNrLmpvaW4oXCIvXCIpLCBcIi8vXCIsIFwiL1wiKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgVXJsO1xyXG4iXX0=

},{"./text":25}]},{},[2])