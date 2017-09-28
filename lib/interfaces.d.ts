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
}
export interface AbstractFetchOptions {
    id?: string | null;
    sync?: boolean;
    url?: string;
}
export interface RequestOptions extends RequestInit, AbstractFetchOptions {
    hash?: string;
    abort?: boolean;
}
export interface FetchOptions extends RequestInit, AbstractFetchOptions {
    onAbort?: (response: RequestOptions) => void;
    onDone?: (response: ResponseOptions) => void;
    onError?: (response: ResponseOptions) => void;
    onSuccess?: (response: ResponseOptions) => void;
}
export interface ResponseOptions extends AbstractFetchOptions {
    hash?: string;
    urlRedirected?: string;
    redirected?: boolean;
    headers?: {
        [key: string]: string;
    };
    data?: string | null | undefined;
    status?: number;
    statusText?: string;
    error?: boolean;
    errorMessage?: string | null;
    abort?: boolean;
}
