import AjaxWorker from "./main";
import * as Interface from "./interfaces";
declare var self: Worker;

export module AjaxWork {
	// The fuction bellow will be executed in worker
	// use it to execute the thread
	export function Worker() {
		var locationOrigin = null;
		var sharedMethods: Interface.SharedMethods = {
			orderStack: {},
			init: (args: Array<any>) => {
				this.locationOrigin = args[0];
				//console.log(this.locationOrigin);
			},
			fetch: (args: Array<any>) => {
				var url: string = args[0];
				var options = args[1];
				ajax(url, options);
			}
		}
		var requestStore = {

		};
		// ajax fetch ------------------------------
		var lastId: number = 0;
		var syncResponse: { [id: string]: Interface.ResponseOptions } = {};
		var syncRequestStack: Array<Interface.RequestOptions> = [];
		function getId(id: string): string {
			lastId = lastId + 1;
			if (id !== undefined && id !== null) {
				return id;
			} else {
				return lastId.toString();
			}
		}
		function ajaxReturn(options: Interface.ResponseOptions) {
			if (options.sync == true) {
				// store in the response store -----------------
				syncResponse[options.url] = options;
				// loop in the requests ----------------
				while (syncRequestStack.length > 0) {
					if (syncRequestStack[0].abort === false && syncResponse[syncRequestStack[0].url] === undefined) {
						break;
					}
					var response = syncResponse[syncRequestStack[0].url];
					if (response != undefined) {
						if (syncRequestStack[0].abort === false) {
							execute("fetchReturn", [response]);
						}
						syncResponse[syncRequestStack[0].url] = undefined;
						delete syncResponse[syncRequestStack[0].url];
					}
					// unshift from the stack -----------------------
					syncRequestStack.shift();
				}
				// clean the syncResponse
				if (syncRequestStack.length === 0) {
					syncResponse = {};
				}
			} else {
				execute("fetchReturn", [options]);
			}
		}
		function ajaxRequestStackPush(options: Interface.RequestOptions) {
			if (options.sync == true) {
				for (var i = 0; i < syncRequestStack.length; i++) {
					if (options.id == syncRequestStack[i].id || options.url == syncRequestStack[i].url) {
						syncRequestStack[i].abort = true;
					}
				}
				syncRequestStack.push(options);
			}
		}
		function ajax(url: any, options: any) {
			// default options ---------------------------
			var defaultOptions: Interface.RequestOptions = {
				url: url,
				method: "GET",
				keepalive: true,
				referrerPolicy: "no-referrer",
				mode: "cors",
				sync: true,
				id: null,
				abort: false
			}
			// new options ------------------------------
			var newOptions: Interface.RequestOptions = Object.assign(defaultOptions, options);
			newOptions.id = getId(newOptions.id); // get id
			var fetchReturn: Interface.ResponseOptions = {
				id: newOptions.id,
				url: url,
				status: 404,
				statusText: "Error on Ajax-Worker!",
				data: null,
				headers: {},
				redirected: false,
				urlRedirected: null,
				errorMessage: null,
				error: false,
				sync: newOptions.sync
			};
			// sync ----------------------------
			// fetch ---------------------------
			ajaxRequestStackPush(newOptions);
			fetch(url, newOptions)
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
					ajaxReturn(fetchReturn);
				}).catch(error => {
					fetchReturn.errorMessage = error;
					fetchReturn.error = true;
					ajaxReturn(fetchReturn);
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
