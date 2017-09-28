export var AjaxWork;
(function (AjaxWork) {
    // The fuction bellow will be executed in worker
    // use it to execute the thread
    function Worker() {
        var _this = this;
        var locationOrigin = null;
        var sharedMethods = {
            orderStack: {},
            init: function (args) {
                _this.locationOrigin = args[0];
            },
            fetch: function (args) {
                var options = args[0];
                ajax(options);
            }
        };
        // ajax fetch ------------------------------
        var syncResponse = {};
        var syncRequestStack = [];
        function sendBack(options) {
            if (options.sync == true) {
                // store in the response store -----------------
                syncResponse[options.hash] = options;
                // loop in the requests ----------------
                while (syncRequestStack.length > 0) {
                    if (syncRequestStack[0].abort == true) {
                        execute("onAbort", [syncRequestStack[0]]);
                        syncRequestStack.shift();
                    }
                    else {
                        if (syncResponse[syncRequestStack[0].hash] === undefined) {
                            break;
                        }
                        else {
                            var r = syncResponse[syncRequestStack[0].hash];
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
            if (options.sync == true) {
                for (var i = 0; i < syncRequestStack.length; i++) {
                    if (options.id == syncRequestStack[i].id || options.hash == syncRequestStack[i].hash) {
                        syncRequestStack[i].abort = true;
                    }
                }
                syncRequestStack.push(options);
            }
        }
        function ajax(options) {
            var fetchReturn = {
                id: options.id,
                url: options.url,
                status: 404,
                statusText: "Error on Ajax-Worker!",
                data: null,
                headers: {},
                redirected: false,
                urlRedirected: null,
                errorMessage: null,
                error: false,
                sync: options.sync,
                hash: options.hash
            };
            // sync ----------------------------
            // fetch ---------------------------
            ajaxRequestStackPush(options);
            fetch(options.url, options)
                .then(function (response) {
                fetchReturn.status = response.status;
                fetchReturn.statusText = response.statusText;
                fetchReturn.urlRedirected = response.url;
                fetchReturn.redirected = (fetchReturn.urlRedirected != fetchReturn.url);
                response.headers.forEach(function (value, key) {
                    fetchReturn.headers[key] = value;
                });
                return response.text();
            }).then(function (text) {
                fetchReturn.data = text;
                sendBack(fetchReturn);
            }).catch(function (error) {
                fetchReturn.errorMessage = error;
                fetchReturn.error = true;
                sendBack(fetchReturn);
            });
        }
        // same functions here
        function execute(actionName, args) {
            self.postMessage({
                method: actionName,
                args: args
            });
        }
        self.onmessage = function (event) {
            var args = event.data.args;
            sharedMethods[event.data.method](args);
        };
    }
    AjaxWork.Worker = Worker;
})(AjaxWork || (AjaxWork = {}));
export default AjaxWork;
//# sourceMappingURL=ajax-work.js.map