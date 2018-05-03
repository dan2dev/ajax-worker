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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0Qsc0JBQXNCO1FBQ3RCLGlCQUFpQixVQUFrQixFQUFFLElBQXVFO1lBQzFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ2YsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLElBQUk7YUFDTCxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQzlCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzdCLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQztJQUNKLENBQUM7SUE5SGUsZUFBTSxTQThIckIsQ0FBQTtBQUNILENBQUMsRUFsSWdCLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBa0l4QjtBQUNELGtCQUFlLFFBQVEsQ0FBQyIsImZpbGUiOiJhamF4LXdvcmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgQWpheFdvcmtlciBmcm9tIFwiLi9tYWluXCI7XHJcbmRlY2xhcmUgdmFyIHNlbGY6IFdvcmtlcjtcclxuLy8gaW1wb3J0ICogYXMgSW50ZXJmYWNlIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgSUFic3RyYWN0RmV0Y2hPcHRpb25zLCBJQ29tdW5pY2F0aW9uLCBJRmV0Y2hPcHRpb25zLCBJSnNvbkFycmF5LCBJSnNvbk9iamVjdCwgSVJlcXVlc3RJbml0LCBJUmVxdWVzdE9wdGlvbnMsIElSZXNwb25zZU9wdGlvbnMsIElTaGFyZWRNZXRob2RzIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBBamF4V29yayB7XHJcbiAgLy8gVGhlIGZ1Y3Rpb24gYmVsbG93IHdpbGwgYmUgZXhlY3V0ZWQgaW4gd29ya2VyXHJcbiAgLy8gdXNlIGl0IHRvIGV4ZWN1dGUgdGhlIHRocmVhZFxyXG4gIGV4cG9ydCBmdW5jdGlvbiBXb3JrZXIoKSB7XHJcbiAgICBjb25zdCBsb2NhdGlvbk9yaWdpbjogYW55ID0gbnVsbDtcclxuICAgIGNvbnN0IHNoYXJlZE1ldGhvZHM6IElTaGFyZWRNZXRob2RzID0ge1xyXG4gICAgICBvcmRlclN0YWNrOiB7fSxcclxuICAgICAgaW5pdDogKGFyZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbk9yaWdpbiA9IGFyZ3NbMF07XHJcbiAgICAgIH0sXHJcbiAgICAgIGZldGNoOiAoYXJnczogYW55W10pID0+IHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gYXJnc1swXTtcclxuICAgICAgICBhamF4KG9wdGlvbnMpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIC8vIGFqYXggZmV0Y2ggLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBsZXQgc3luY1Jlc3BvbnNlOiB7IFtpZDogc3RyaW5nXTogSVJlc3BvbnNlT3B0aW9uczxhbnk+IH0gPSB7fTtcclxuICAgIGNvbnN0IHN5bmNSZXF1ZXN0U3RhY2s6IElSZXF1ZXN0T3B0aW9uc1tdID0gW107XHJcbiAgICBmdW5jdGlvbiBzZW5kQmFjayhvcHRpb25zOiBJUmVzcG9uc2VPcHRpb25zPGFueT4pIHtcclxuICAgICAgaWYgKG9wdGlvbnMuc3luYyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIC8vIHN0b3JlIGluIHRoZSByZXNwb25zZSBzdG9yZSAtLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHN5bmNSZXNwb25zZVtvcHRpb25zLmhhc2ghXSA9IG9wdGlvbnM7XHJcbiAgICAgICAgLy8gbG9vcCBpbiB0aGUgcmVxdWVzdHMgLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHdoaWxlIChzeW5jUmVxdWVzdFN0YWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGlmIChzeW5jUmVxdWVzdFN0YWNrWzBdLmFib3J0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGV4ZWN1dGUoXCJvbkFib3J0XCIsIFtzeW5jUmVxdWVzdFN0YWNrWzBdXSk7XHJcbiAgICAgICAgICAgIHN5bmNSZXF1ZXN0U3RhY2suc2hpZnQoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChzeW5jUmVzcG9uc2Vbc3luY1JlcXVlc3RTdGFja1swXS5oYXNoIV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHIgPSBzeW5jUmVzcG9uc2Vbc3luY1JlcXVlc3RTdGFja1swXS5oYXNoIV07XHJcbiAgICAgICAgICAgICAgZXhlY3V0ZShcIm9uRG9uZVwiLCBbcl0pO1xyXG4gICAgICAgICAgICAgIHN5bmNSZXF1ZXN0U3RhY2suc2hpZnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjbGVhbiB0aGUgc3luY1Jlc3BvbnNlXHJcbiAgICAgICAgaWYgKHN5bmNSZXF1ZXN0U3RhY2subGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICBzeW5jUmVzcG9uc2UgPSB7fTtcclxuICAgICAgICAgIGV4ZWN1dGUoXCJjbGVhblwiLCBbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGV4ZWN1dGUoXCJvbkRvbmVcIiwgW29wdGlvbnNdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYWpheFJlcXVlc3RTdGFja1B1c2gob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLnN5bmMgPT09IHRydWUpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGkgb2Ygc3luY1JlcXVlc3RTdGFjaykge1xyXG4gICAgICAgICAgaWYgKG9wdGlvbnMuaWQgPT09IGkuaWQgfHwgb3B0aW9ucy5oYXNoID09PSBpLmhhc2gpIHtcclxuICAgICAgICAgICAgaS5hYm9ydCA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN5bmNSZXF1ZXN0U3RhY2sucHVzaChvcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYWpheChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgY29uc3QgZmV0Y2hSZXR1cm46IElSZXNwb25zZU9wdGlvbnM8YW55PiA9IHtcclxuICAgICAgICBpZDogb3B0aW9ucy5pZCxcclxuICAgICAgICB1cmw6IG9wdGlvbnMudXJsLFxyXG4gICAgICAgIHN0YXR1czogNDA0LFxyXG4gICAgICAgIHJldHVyblR5cGU6IG9wdGlvbnMucmV0dXJuVHlwZSxcclxuICAgICAgICBzdGF0dXNUZXh0OiBcIkVycm9yIG9uIEFqYXgtV29ya2VyIVwiLFxyXG4gICAgICAgIGRhdGE6IG51bGwsXHJcbiAgICAgICAgaGVhZGVyczogW10sXHJcbiAgICAgICAgcmVkaXJlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgdXJsUmVkaXJlY3RlZDogbnVsbCxcclxuICAgICAgICBlcnJvck1lc3NhZ2U6IG51bGwsXHJcbiAgICAgICAgZXJyb3I6IGZhbHNlLFxyXG4gICAgICAgIHN5bmM6IG9wdGlvbnMuc3luYyxcclxuICAgICAgICBoYXNoOiBvcHRpb25zLmhhc2gsXHJcbiAgICAgIH07XHJcbiAgICAgIC8vIHN5bmMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAvLyBmZXRjaCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgYWpheFJlcXVlc3RTdGFja1B1c2gob3B0aW9ucyk7XHJcbiAgICAgIGlmIChvcHRpb25zLnVybCA9PT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ1cmwgY2Fubm90IGJlIG51bGxcIik7XHJcbiAgICAgICAgc2VuZEJhY2soZmV0Y2hSZXR1cm4pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBmZXRjaFByb21pc2UgPSBmZXRjaChvcHRpb25zLnVybCwgb3B0aW9ucylcclxuICAgICAgICAudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgZmV0Y2hSZXR1cm4uc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xyXG4gICAgICAgICAgZmV0Y2hSZXR1cm4uc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XHJcbiAgICAgICAgICBmZXRjaFJldHVybi51cmxSZWRpcmVjdGVkID0gcmVzcG9uc2UudXJsO1xyXG4gICAgICAgICAgZmV0Y2hSZXR1cm4ucmVkaXJlY3RlZCA9IChmZXRjaFJldHVybi51cmxSZWRpcmVjdGVkICE9PSBmZXRjaFJldHVybi51cmwpO1xyXG4gICAgICAgICAgZmV0Y2hSZXR1cm4uaGVhZGVycyA9IHJlc3BvbnNlLmhlYWRlcnM7XHJcbiAgICAgICAgICBmZXRjaFJldHVybi5oZWFkZXJzID0gW107XHJcblxyXG4gICAgICAgICAgcmVzcG9uc2UuaGVhZGVycy5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAoZmV0Y2hSZXR1cm4uaGVhZGVycyBhcyBzdHJpbmdbXVtdKS5wdXNoKFtrZXksIHZhbHVlXSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IGhlYWRlckNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIik7XHJcbiAgICAgICAgICBsZXQgY29udGVudFR5cGU6IHN0cmluZyA9IFwidGV4dFwiO1xyXG4gICAgICAgICAgaWYgKGhlYWRlckNvbnRlbnRUeXBlICYmIChoZWFkZXJDb250ZW50VHlwZS5pbmNsdWRlcyhcImFwcGxpY2F0aW9uL2pzb25cIikgfHwgaGVhZGVyQ29udGVudFR5cGUuaW5jbHVkZXMoXCJ0ZXh0L2pzb25cIikpKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlID0gXCJqc29uXCI7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb250ZW50VHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgaWYgKGNvbnRlbnRUeXBlID09PSBcInRleHRcIikge1xyXG4gICAgICAgICAgICBmZXRjaFJldHVybi5yZXR1cm5UeXBlID0gXCJ0ZXh0XCI7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnRUeXBlID09PSBcImpzb25cIikge1xyXG4gICAgICAgICAgICBmZXRjaFJldHVybi5yZXR1cm5UeXBlID0gXCJqc29uXCI7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICBmZXRjaFJldHVybi5kYXRhID0gZGF0YTtcclxuICAgICAgICAgIHNlbmRCYWNrKGZldGNoUmV0dXJuKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICAgICAgZmV0Y2hSZXR1cm4uZXJyb3JNZXNzYWdlID0gZXJyb3I7XHJcbiAgICAgICAgICBmZXRjaFJldHVybi5lcnJvciA9IHRydWU7XHJcbiAgICAgICAgICBzZW5kQmFjayhmZXRjaFJldHVybik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBzYW1lIGZ1bmN0aW9ucyBoZXJlXHJcbiAgICBmdW5jdGlvbiBleGVjdXRlKGFjdGlvbk5hbWU6IHN0cmluZywgYXJnczogQXJyYXk8SUpzb25PYmplY3QgfCBJSnNvbkFycmF5IHwgc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IGFueT4pIHtcclxuICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgbWV0aG9kOiBhY3Rpb25OYW1lLFxyXG4gICAgICAgIGFyZ3MsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2VsZi5vbm1lc3NhZ2UgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBhcmdzID0gZXZlbnQuZGF0YS5hcmdzO1xyXG4gICAgICBzaGFyZWRNZXRob2RzW2V2ZW50LmRhdGEubWV0aG9kXShhcmdzKTtcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEFqYXhXb3JrO1xyXG4iXX0=
