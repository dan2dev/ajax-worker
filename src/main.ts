import AjaxWork from "./ajax-work";
import { IAbstractFetchOptions, IComunication, IFetchOptions, IJsonArray, IJsonObject, IRequestInit, IRequestOptions, IResponseOptions, ISharedMethods } from "./interfaces";
const resolveRelative = require("resolve-relative-url");
const newHashFrom = require("object-hash");

export class AjaxWorker {  }
export namespace AjaxWorker {
	// shared Methods -------------------
	const sharedMethods: { [action: string]: any } = {
		onDone: (args: any[]) => {
			const options = args[0] as IResponseOptions;
			// console.log('done', options.url);
			fetchDone(options);
		},
		onAbort: (args: any[]) => {
			const options = args[0] as IRequestOptions;
			// console.log('abort', options.url);
			fetchAbort(options);
		},
		clean: () => {
			fetchClean();
		},
	};
	function execute(actionName: string, args: Array<IJsonObject | IJsonArray | string | number | boolean | any>) {
		getWorker().postMessage({
			method: actionName,
			args,
		});
	}
	// worker -------------------
	let urlWorker: string;
	let worker: Worker;
	function getWorkerScript() {
		return "(" + AjaxWork.Worker.toString() + ")();";
	}
	function getUrlWorker() {
		if (urlWorker === undefined) {
			const blobData: Blob = new Blob([getWorkerScript()], {
				type: "application/javascript",
			});
			urlWorker = window.URL.createObjectURL(blobData);
		}
		return urlWorker;
	}
	function getWorker() {
		if (worker === undefined) {
			worker = new Worker(getUrlWorker());
			worker.onmessage = (event: any) => {
				sharedMethods[event.data.method](event.data.args);
			};
		}
		return worker;
	}
	// fetch ---------------------------------------------------
	let lastId: number = 0;
	function getId(id: string): string {
		lastId = lastId + 1;
		if (id !== undefined && id !== null) {
			return id;
		} else {
			return lastId.toString();
		}
	}
	function getHash(obj: any): string {
		const newOBj = Object.assign({}, obj);
		for (const key in newOBj) {
			if (typeof newOBj[key] === "function") {
				delete newOBj[key];
			}
		}
		return newHashFrom(newOBj);
	}
	let callbackStackOptions: { [hash: string]: IFetchOptions } = {};
	function fetchDone(options: IResponseOptions) {
		if (callbackStackOptions[options.hash] !== undefined) {
			const item = callbackStackOptions[options.hash];
			if (options.error === true) {
				if (item.onError !== undefined) {
					item.onError(options);
				}
			} else {
				if (item.onSuccess !== undefined) {
					item.onSuccess(options);
				}
			}
			if (item.onDone !== undefined) {
				item.onDone(options);
			}
			// callbackStackOptions[options.hash] = undefined;
			// delete callbackStackOptions[options.hash];
		}
	}
	function fetchAbort(options: IRequestOptions) {
		if (callbackStackOptions[options.hash] !== undefined) {
			const item = callbackStackOptions[options.hash];
			if (options.abort === true && item.onAbort !== undefined) {
				item.onAbort(options);
			}
			// callbackStackOptions[options.hash] = undefined;
			// delete callbackStackOptions[options.hash];
		}
	}
	function fetchClean(): void {
		callbackStackOptions = {};
	}
	export function fetch(options: IFetchOptions) {
		// default options ---------------------------
		const defaultOptions: IRequestOptions = {
			url: null,
			method: "GET",
			returnType: "JSON",
			credentials: "include",
			keepalive: true,
			referrerPolicy: "no-referrer",
			mode: "cors",
			sync: true,
			id: null,
			abort: false,
		};
		// new options ---------------------------------------
		const newOptions: IRequestOptions | any = Object.assign(defaultOptions, options);
		newOptions.url = resolveRelative(newOptions.url, window.location.origin); // get url
		newOptions.hash = getHash(newOptions); // get hadh
		newOptions.id = getId(newOptions.id); // get id
		// add to callbackStack -------------------------------
		callbackStackOptions[newOptions.hash] = (Object.assign({}, newOptions));
		for (const key in newOptions) {
			if (typeof newOptions[key] === "function") {
				delete newOptions[key];
			}
		}
		execute("fetch", [newOptions]);
	}
	// init -------------------------------------------------------
	export function init() {
		const w = window as any;
		if (w["ajaxWorker"] === undefined) {
			w["ajaxWorker"] = this;
		}
	}
}
AjaxWorker.init();
// --------------------------------------
export default AjaxWorker;
