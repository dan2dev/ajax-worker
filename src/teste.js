export var AjaxWork;
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
})(AjaxWork || (AjaxWork = {}));
export default AjaxWork;
//# sourceMappingURL=ajax-work.js.map