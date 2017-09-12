
export interface JsonObject {
	[key: string]: Array<JsonObject | JsonArray | string | number> | string | number | JsonObject | JsonArray;
}
export interface JsonArray {
	[key: number]: Array<JsonObject | JsonArray | string | number> | string | number | JsonObject | JsonArray;
}
export interface Comunication {
	method: string;
	args: JsonObject | JsonArray;
}
export interface SharedMethods {
	[action: string]: any;
	// orderStack: { [order: number]: any };
	// action: any;
	// fetch?: any;
}
// ajax interfaces
export interface RequestOptions extends RequestInit {

}
export interface ResponseOptions {
	url?: string;
	urlRedirected?: string;
	redirected?: boolean;
	headers?: { [key: string]: string };
	data?: string | null | undefined;
	status?: number;
	statusText?: string;
}
