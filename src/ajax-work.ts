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
			init: (...args: Array<any>) => {
				this.locationOrigin = args[0];
				// execute("loaded");
			},
			action: () => {
				// console.log('')
			},
			fetch:  (args: Array<any>) => {
				// args ---------------------------------------
				var url : string = args[0];
				var options = args[1];
				// default options ---------------------------
				var defaultOptions: Interface.RequestOptions = {
					method: "GET",
					keepalive: true,
					referrerPolicy: "no-referrer",
					mode: "cors",
				}
				var newOptions = Object.assign(defaultOptions, options);
				var fetchReturn : Interface.ResponseOptions = {
					url: url,
					status: 404,
					statusText: "Error on Ajax-Worker!"
				};
				var fe = fetch(url, newOptions);
				fe.then(function (response) {
					fetchReturn.status = response.status;
					fetchReturn.statusText = response.statusText;
					console.warn(response.status, response.statusText);

					return response.text();
				});
				fe.then((value) => {
					console.log(value);
					execute("fetchReturn", "success");
				})
				fe.catch(function (error) {
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
					response.headers.forEach((value: string, key: string) => {
						console.log(key, value);
					});
					// console.log(response.url);
					// console.log(response.status, response.statusText);
					// console.log(response.headers.values());
					// console.time("head");
					return response.text()//.blob();
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
		}
		var requestStore = {

		};
		function execute(actionName: string, ...args: Array<Interface.JsonObject | Interface.JsonArray | string | number | boolean | any>) {
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