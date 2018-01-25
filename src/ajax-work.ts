// import AjaxWorker from "./main";
declare var self: Worker;
// import * as Interface from "./interfaces";
import { IAbstractFetchOptions, IComunication, IFetchOptions, IJsonArray, IJsonObject, IRequestInit, IRequestOptions, IResponseOptions, ISharedMethods } from "./interfaces";

export namespace AjaxWork {
	// The fuction bellow will be executed in worker
	// use it to execute the thread
	export function Worker() {
		const locationOrigin: any = null;
		const sharedMethods: ISharedMethods = {
			orderStack: {},
			init: (args: any[]) => {
				this.locationOrigin = args[0];
			},
			fetch: (args: any[]) => {
				const options = args[0];
				ajax(options);
			},
		};
		// ajax fetch ------------------------------
		let syncResponse: { [id: string]: IResponseOptions<any> } = {};
		const syncRequestStack: IRequestOptions[] = [];
		function sendBack(options: IResponseOptions<any>) {
			if (options.sync === true) {
				// store in the response store -----------------
				syncResponse[options.hash] = options;
				// loop in the requests ----------------
				while (syncRequestStack.length > 0) {
					if (syncRequestStack[0].abort === true ) {
						execute("onAbort", [syncRequestStack[0]]);
						syncRequestStack.shift();
					} else {
						if (syncResponse[syncRequestStack[0].hash] === undefined) {
							break;
						} else {
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
			} else {
				execute("onDone", [options]);
			}
		}
		function ajaxRequestStackPush(options: IRequestOptions) {
			if (options.sync === true) {
				for (const i of syncRequestStack) {
					if (options.id === i.id || options.hash === i.hash) {
						i.abort = true;
					}
				}
				syncRequestStack.push(options);
			}
		}
		function ajax(options: IRequestOptions) {
			const fetchReturn: IResponseOptions<any> = {
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
			.then((response: any) => {
					fetchReturn.status = response.status;
					fetchReturn.statusText = response.statusText;
					fetchReturn.urlRedirected = response.url;
					fetchReturn.redirected = (fetchReturn.urlRedirected !== fetchReturn.url);
					fetchReturn.headers = response.headers;
					fetchReturn.headers = [];

					response.headers.forEach((value: string, key: string) => {
						(fetchReturn.headers as string[][]).push([key, value]);
					});
					const headerContentType = response.headers.get("content-type");
					let contentType: string = "text";
					if (headerContentType && (headerContentType.includes("application/json") || headerContentType.includes("text/json"))) {
						contentType = "json";
					} else {
						contentType = "text";
					}
					// -------------------------------
					if (contentType === "text") {
						fetchReturn.returnType = "text";
						return response.text();
					} else if (contentType === "json") {
						fetchReturn.returnType = "json";
						return response.json();
					}
				})
			.then((data: any) => {
				fetchReturn.data = data;
				sendBack(fetchReturn);
			})
			.catch((error: any) => {
				fetchReturn.errorMessage = error;
				fetchReturn.error = true;
				sendBack(fetchReturn);
			});
		}
		// same functions here
		function execute(actionName: string, args: Array<IJsonObject | IJsonArray | string | number | boolean | any>) {
			self.postMessage({
				method: actionName,
				args,
			});
		}
		self.onmessage = (event: any) => {
			const args = event.data.args;
			sharedMethods[event.data.method](args);
		};
	}
}
export default AjaxWork;
