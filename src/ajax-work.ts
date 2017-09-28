//import AjaxWorker from "./main";
declare var self: Worker;
import * as Interface from "./interfaces";

export module AjaxWork {
	// The fuction bellow will be executed in worker
	// use it to execute the thread
	export function Worker() {
		var locationOrigin = null;
		var sharedMethods: Interface.SharedMethods = {
			orderStack: {},
			init: (args: Array<any>) => {
				this.locationOrigin = args[0];
			},
			fetch: (args: Array<any>) => {
				var options = args[0];
				ajax(options);
			}
		}
		// ajax fetch ------------------------------
		var syncResponse: { [id: string]: Interface.ResponseOptions } = {};
		var syncRequestStack: Array<Interface.RequestOptions> = [];
		function sendBack(options: Interface.ResponseOptions) {
			if (options.sync == true) {
				// store in the response store -----------------
				syncResponse[options.hash] = options;
				// loop in the requests ----------------
				while (syncRequestStack.length > 0) {
					if (syncRequestStack[0].abort == true ) {
						execute("onAbort", [syncRequestStack[0]]);
						syncRequestStack.shift();
					} else {
						if (syncResponse[syncRequestStack[0].hash] === undefined) {
							break;
						} else {
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
			} else {
				execute("onDone", [options]);
			}
		}
		function ajaxRequestStackPush(options: Interface.RequestOptions) {
			if (options.sync == true) {
				for (var i = 0; i < syncRequestStack.length; i++) {
					if (options.id == syncRequestStack[i].id || options.hash == syncRequestStack[i].hash) {
						syncRequestStack[i].abort = true;
					}
				}
				syncRequestStack.push(options);
			}
		}
		function ajax(options: Interface.RequestOptions) {
			var fetchReturn: Interface.ResponseOptions = {
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
					response.headers.forEach((value: string, key: string) => {
						fetchReturn.headers[key] = value;
					});
					return response.text();
				}).then(text => {
					fetchReturn.data = text;
					sendBack(fetchReturn);
				}).catch(error => {
					fetchReturn.errorMessage = error;
					fetchReturn.error = true;
					sendBack(fetchReturn);
				});
		}
		// same functions here
		function execute(actionName: string, args: Array<Interface.JsonObject | Interface.JsonArray | string | number | boolean | any>) {
			self.postMessage({
				method: actionName,
				args: args
			});
		}
		self.onmessage = function (event: any) {
			var args = event.data.args;
			sharedMethods[event.data.method](args);
		}
	}
}
export default AjaxWork;
