System.register("interfaces", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("ajax-work", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var AjaxWork;
    return {
        setters: [],
        execute: function () {
            (function (AjaxWork) {
                // The fuction bellow will be executed in worker
                // use it to execute the thread
                function Worker() {
                    var _this = this;
                    var locationOrigin = null;
                    var sharedMethods = {
                        orderStack: {},
                        init: function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            _this.locationOrigin = args[0];
                            // execute("loaded");
                        },
                        action: function () {
                            // console.log('')
                        },
                        fetch: function (args) {
                            // args ---------------------------------------
                            var url = args[0];
                            var options = args[1];
                            // default options ---------------------------
                            var defaultOptions = {
                                method: "GET",
                                keepalive: true,
                                referrerPolicy: "no-referrer",
                                mode: "cors",
                            };
                            var newOptions = Object.assign(defaultOptions, options);
                            var fetchReturn = {
                                url: url,
                                status: 404,
                                statusText: "Error on Ajax-Worker!"
                            };
                            var fetchInstance = fetch(url, newOptions);
                            fetchInstance.then(function (response) {
                                fetchReturn.status = response.status;
                                fetchReturn.statusText = response.statusText;
                                console.warn(response.status, response.statusText);
                                return response.text();
                            });
                            fetchInstance.then(function (value) {
                                console.log(value);
                                execute("fetchReturn", "success");
                            });
                            fetchInstance.catch(function (error) {
                                console.warn(error);
                                execute("fetchReturn", "loser");
                            });
                            fetch(url, {
                                method: "GET",
                                keepalive: true,
                                referrerPolicy: "no-referrer",
                                mode: "cors"
                            }).then(function (response) {
                                // console.log(response.json());
                                // console.warn(response.formData());
                                response.headers.forEach(function (value, key) {
                                    console.log(key, value);
                                });
                                // console.log(response.url);
                                // console.log(response.status, response.statusText);
                                // console.log(response.headers.values());
                                // console.time("head");
                                return response.text(); //.blob();
                            }).then(function (myBlob) {
                                execute("loaded", "ajax returned");
                                // console.timeEnd("head");
                                // console.log(myBlob);
                                // console.time("blob");
                                // var objectURL = URL.createObjectURL(myBlob);
                                // var reader = new FileReader();
                                // reader.onload = function() {
                                // 	// console.log(reader.result);
                                // 	console.timeEnd("blob");
                                // }
                                // // reader.readAsText(myBlob);
                                // console.log(objectURL);
                                // myImage.src = objectURL;
                            }).catch(function (error) {
                                // console.error("fetch error");
                                // console.error(error);
                            });
                        }
                    };
                    var requestStore = {};
                    function execute(actionName) {
                        var args = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            args[_i - 1] = arguments[_i];
                        }
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
            exports_2("AjaxWork", AjaxWork);
            exports_2("default", AjaxWork);
        }
    };
});
System.register("teste", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            // console.log("teste ----");
            // class AppDrawer extends HTMLElement {
            // 	// A getter/setter for an open property.
            // 	get open() {
            // 		return this.hasAttribute('open');
            // 	}
            // 	set open(val) {
            // 		// Reflect the value of the open property as an HTML attribute.
            // 		if (val) {
            // 			this.setAttribute('open', '');
            // 		} else {
            // 			this.removeAttribute('open');
            // 		}
            // 		this.toggleDrawer();
            // 	}
            // 	// A getter/setter for a disabled property.
            // 	get disabled() {
            // 		return this.hasAttribute('disabled');
            // 	}
            // 	set disabled(val) {
            // 		// Reflect the value of the disabled property as an HTML attribute.
            // 		if (val) {
            // 			this.setAttribute('disabled', '');
            // 		} else {
            // 			this.removeAttribute('disabled');
            // 		}
            // 	}
            // 	// Can define constructor arguments if you wish.
            // 	constructor() {
            // 		// If you define a ctor, always call super() first!
            // 		// This is specific to CE and required by the spec.
            // 		super();
            // 		// Setup a click listener on <app-drawer> itself.
            // 		this.addEventListener('click', e => {
            // 			// Don't toggle the drawer if it's disabled.
            // 			if (this.disabled) {
            // 				return;
            // 			}
            // 			this.toggleDrawer();
            // 		});
            // 	}
            // 	toggleDrawer() {
            // 		console.log("toggleDrawer");
            // 	}
            // }
            // window.customElements.define('app-drawer', AppDrawer);
            // class MyElement extends HTMLElement {
            // 	// these are standard hooks, called on certain events
            // 	define(name: string, constructor: Function, options?: ElementDefinitionOptions): void {
            // 	}
            // 	get(name: string): any {
            // 		return "ok";
            // 	};
            // 	whenDefined(name: string): PromiseLike<void> {
            // 		return new Promise(() => {
            // 			console.log('ok');
            // 		});
            // 	};
            // 	constructor() {
            // 		super();
            // 		console.log("novo element criado");
            // 	}
            // 	connectedCallback() {
            // 	}
            // 	disconnectedCallback() {
            // 	}
            // 	adoptedCallback() {
            // 	}
            // 	attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
            // 		console.log(attrName);
            // 	}
            // 	// these are custom methods and properties
            // 	get myProp() {
            // 		return "ok";
            // 	}
            // 	set myProp(value: string) {
            // 		console.log(value);
            // 	}
            // 	myMethod() {
            // 		console.log("method teste");
            // 	}
            // }
            // // this registers the Custom Element
            // customElements.define('my-element', MyElement)
            // class FancyDrawer extends HTMLElement {
            // 	constructor() {
            // 		super(); // always call super() first in the ctor. This also calls the extended class' ctor.
            // 		console.log("created");
            // 		this.innerHTML = " okok";
            // 	}
            // 	toggleDrawer() {
            // 		// Possibly different toggle implementation?
            // 		// Use ES2015 if you need to call the parent method.
            // 		// super.toggleDrawer()
            // 	}
            // 	anotherMethod() {
            // 	}
            // }
            // var FancyDrawer2 = function () {
            // 	return FancyDrawer;
            // 	// new() {
            // 	// 	console.log("ok");
            // 	// }
            // }
            // customElements.define('fancy-app-drawer', class extends HTMLElement {
            // 	constructor() {
            // 		super(); // always call super() first in the ctor.
            // 		// Attach a shadow root to <fancy-tabs>.
            // 		const shadowRoot = this.attachShadow({ mode: 'open' });
            // 		shadowRoot.innerHTML = `
            // 		<style>#tabs { ... }</style> <!-- styles are scoped to fancy-tabs! -->
            // 		<div id="tabs">...</div>
            // 		<div id="panels">...</div>
            // 	  `;
            // 	}
            // });
            // // window.customElements.define('fancy-app-drawer', FancyDrawer);
            // var item = window.customElements.whenDefined("fancy-app-drawer");
            // item.then(() => {
            // 	console.log("fancy-app-drawer defined ok");
            // });
            // // var novoElement = {
            // // 	new() {
            // // 	}
            // // }
            // setTimeout(function () {
            // 	// var d = document.createElement("app-drawer");
            // 	// var item = Reflect.construct(HTMLElement, [], FancyDrawer);
            // 	// console.log(item);
            // 	// document.body.innerHTML = "<fancy-app-drawer />"
            // }, 300);
            // // div.innerHTML = "-- okok --";
            // // document.body.appendChild(div); 
        }
    };
});
System.register("main", ["ajax-work", "teste"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var ajax_work_1, resolveRelative, AjaxWorker;
    return {
        setters: [
            function (ajax_work_1_1) {
                ajax_work_1 = ajax_work_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            resolveRelative = require('resolve-relative-url');
            // console.log(resolve);
            // console.log( Util );
            AjaxWorker = /** @class */ (function () {
                function AjaxWorker() {
                }
                return AjaxWorker;
            }());
            exports_4("AjaxWorker", AjaxWorker);
            (function (AjaxWorker) {
                // interfaces ---------------
                // vars ---------------------
                var urlWorker = undefined;
                var worker = undefined;
                // var lastId: number = 0;
                var callbackStack = {};
                // shared Methods -------------------
                var sharedMethods = {
                    fetchReturn: function (args) {
                        console.log(args);
                    },
                    loaded: function (value1) {
                        console.warn("loaded", value1);
                    }
                };
                function execute(actionName) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    getWorker().postMessage({
                        method: actionName,
                        args: args
                    });
                }
                // properties -------------------
                function getWorkerScript() {
                    return "(" + ajax_work_1.default.Worker.toString() + ")();";
                }
                function getUrlWorker() {
                    if (urlWorker === undefined) {
                        var blobData = new Blob([getWorkerScript()], {
                            type: 'application/javascript'
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
                function fetch(url, callback, options) {
                    var newUrl = resolveRelative(url, window.location.origin);
                    execute("fetch", newUrl, options);
                }
                AjaxWorker.fetch = fetch;
                function init() {
                    // execute("init", window.location.origin);
                }
                AjaxWorker.init = init;
            })(AjaxWorker || (AjaxWorker = {}));
            exports_4("AjaxWorker", AjaxWorker);
            // testing ------------------------------
            AjaxWorker.fetch("/teste1.json", function () {
                console.log("callback1");
            }, {
                cache: "no-cache"
            });
            exports_4("default", AjaxWorker);
        }
    };
});
//# sourceMappingURL=ajax-worker.js.map