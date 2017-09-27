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

	// shared Methods -------------------
	var sharedMethods: { [action: string]: any } = {
		fetchReturn: (args: Array<any>) => {
			console.log(args[0]);
			//console.log(args);
		},
		loaded: (value1: string) => {
			//console.warn("loaded", value1);
		}
	}
	function execute(actionName: string, args: Array<Interface.JsonObject | Interface.JsonArray | string | number | boolean | any>) {
		getWorker().postMessage({
			method: actionName,
			args: args
		});
	}
	// worker -------------------
	var urlWorker: string = undefined;
	var worker: Worker = undefined;
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
	 var lastId: number = 0;
	var callbackStack: { [url: string]: Array<Function> } = {};
	export function fetch(
		url: string,
		callback: (response: Interface.ResponseOptions) => void,
		options?: Interface.RequestOptions) {
		var newUrl: string = resolveRelative(url, window.location.origin);
		execute("fetch", [newUrl, options]);
	}
	// fetch callback


	// init -------------------------------------------------------
	export function init() {
		var w = window as any;
		if (w["ajaxWorker"] === undefined) {
			w["ajaxWorker"] = this;
		}
	}
}
AjaxWorker.init();

// --------------------------------------
export default AjaxWorker;
