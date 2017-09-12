import AjaxWork from "./ajax-work";
import * as Interface from "./interfaces";
import "./teste";

declare function require(name: string): any;
const resolveRelative = require('resolve-relative-url');

// console.log(resolve);

// console.log( Util );


export class AjaxWorker {

}
export module AjaxWorker {
	// interfaces ---------------


	// vars ---------------------
	var urlWorker: string = undefined;
	var worker: Worker = undefined;
	// var lastId: number = 0;
	var callbackStack: { [url: string]: Array<Function> } = {};

	// shared Methods -------------------
	var sharedMethods: { [action: string]: any } = {
		fetchReturn: (args: Array<any>) => {
			console.log(args);
		},
		loaded: (value1: string) => {
			console.warn("loaded", value1);
		}
	}
	function execute(actionName: string, ...args: Array<Interface.JsonObject | Interface.JsonArray | string | number | boolean | any>) {
		getWorker().postMessage({
			method: actionName,
			args: args
		});
	}
	// properties -------------------
	function getWorkerScript() {
		return "(" + AjaxWork.Worker.toString() + ")();";
	}
	function getUrlWorker() {
		if (urlWorker === undefined) {
			var blobData: Blob = new Blob([getWorkerScript()], {
				type: 'application/javascript'
			});
			urlWorker = window.URL.createObjectURL(blobData);
		}
		return urlWorker;
	}
	function getWorker() {
		if (worker === undefined) {
			worker = new Worker(getUrlWorker());
			worker.onmessage = function (event: any) {
				sharedMethods[event.data.method](event.data.args);
			};
		}
		return worker;
	}
	// fetch ---------------------------------------------------
	export function fetch(
		url: string,
		callback: (response: Interface.ResponseOptions) => void,
		options?: Interface.RequestOptions) {
		var newUrl: string = resolveRelative(url, window.location.origin);
		execute("fetch", newUrl, options);
	}
	export function init() {
		// execute("init", window.location.origin);
	}
}
// testing ------------------------------
AjaxWorker.fetch("/teste1.json", () =>
{
	console.log("callback1");
},
{
	cache: "no-cache"
});


// --------------------------------------
export default AjaxWorker;
