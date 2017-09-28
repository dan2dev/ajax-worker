declare function require(name: string): any;
import AjaxWork from "./ajax-work";
import * as Interface from "./interfaces";
const resolveRelative = require('resolve-relative-url');
var newHashFrom = require('object-hash');

export class AjaxWorker {  }
export module AjaxWorker {
	// shared Methods -------------------
	var sharedMethods: { [action: string]: any } = {
		onDone: (args: Array<any>) => {
			var options = args[0] as Interface.ResponseOptions;
			//console.log('done', options.url);
			fetchDone(options);
		},
		onAbort: (args: Array<any>) => {
			var options = args[0] as Interface.RequestOptions;
			//console.log('abort', options.url);
			fetchAbort(options);
		},
		clean: () => {
			fetchClean();
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
	function getId(id: string): string {
		lastId = lastId + 1;
		if (id !== undefined && id !== null) {
			return id;
		} else {
			return lastId.toString();
		}
	}
	function getHash(obj: any): string {
		var newOBj = Object.assign({}, obj);
		for (var key in newOBj) {
			if (typeof newOBj[key] == "function") {
				delete newOBj[key];
			}
		}
		return newHashFrom(newOBj);
	}
	var callbackStackOptions: { [hash: string]: Interface.FetchOptions } = {};
	function fetchDone(options: Interface.ResponseOptions) {
		if (callbackStackOptions[options.hash] != undefined) {
			var item = callbackStackOptions[options.hash];
			if (options.error == true) {
				if (item.onError != undefined) {
					item.onError(options);
				}
			} else {
				if (item.onSuccess != undefined) {
					item.onSuccess(options);
				}
			}
			if (item.onDone != undefined) {
				item.onDone(options);
			}
			//callbackStackOptions[options.hash] = undefined;
			//delete callbackStackOptions[options.hash];
		}
	}
	function fetchAbort(options: Interface.RequestOptions) {
		if (callbackStackOptions[options.hash] != undefined) {
			var item = callbackStackOptions[options.hash];
			if (options.abort == true && item.onAbort != undefined) {
				item.onAbort(options);
			}
			//callbackStackOptions[options.hash] = undefined;
			//delete callbackStackOptions[options.hash];
		}
	}
	function fetchClean() : void {
		callbackStackOptions = {};
	} 
	export function fetch(options: Interface.FetchOptions) {
		// default options ---------------------------
		var defaultOptions: Interface.RequestOptions = {
			url: null,
			method: "GET",
			keepalive: true,
			referrerPolicy: "no-referrer",
			mode: "cors",
			sync: true,
			id: null,
			abort: false
		}
		// new options ---------------------------------------
		var newOptions: Interface.RequestOptions | any = Object.assign(defaultOptions, options);
		newOptions.url = resolveRelative(newOptions.url, window.location.origin); // get url
		newOptions.hash = getHash(newOptions); // get hadh
		newOptions.id = getId(newOptions.id); // get id
		// add to callbackStack -------------------------------
		callbackStackOptions[newOptions.hash] = (Object.assign({}, newOptions));
		for (var key in newOptions) {
			if (typeof newOptions[key] == "function") {
				delete newOptions[key];
			}
		}
		execute("fetch", [newOptions]);
	}
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
