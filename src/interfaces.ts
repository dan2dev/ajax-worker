
export interface IJsonObject {
  [key: string]: Array<IJsonObject | IJsonArray | string | number> | string | number | IJsonObject | IJsonArray;
}
export interface IJsonArray {
  [key: number]: Array<IJsonObject | IJsonArray | string | number> | string | number | IJsonObject | IJsonArray;
}
export interface IComunication {
  method: string;
  args: IJsonObject | IJsonArray;
}
export interface ISharedMethods {
  [action: string]: any;
}
export interface IAbstractFetchOptions {
  id?: string | null;
  sync?: boolean;
  url: string | null;
  returnType?: "text" | "json";
}
export interface IRequestInit {
  body?: any;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  // headers?: Headers | string[][];
  headers?: Headers | string[][]; // { [key: string]: any; };
  integrity?: string;
  keepalive?: boolean;
  method?: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH" | string;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  window?: any;
}
export interface IRequestOptions extends IRequestInit, IAbstractFetchOptions {
  hash?: string;
  abort?: boolean;
}
export interface IFetchOptions<TDataType> extends IRequestInit, IAbstractFetchOptions {
  onAbort?: (response: IRequestOptions) => void;
  // response -----------------------
  onDone?: (response: IResponseOptions<TDataType>) => void;
  onError?: (response: IResponseOptions<TDataType>) => void;
  onSuccess?: (response: IResponseOptions<TDataType>) => void;
}
export interface IResponseOptions<TDataType> extends IAbstractFetchOptions {
  hash?: string;
  urlRedirected?: string | null;
  redirected?: boolean;
  headers?: Headers | string[][];
  data?: TDataType;
  status?: number;
  statusText?: string;
  error?: boolean;
  errorMessage?: string | null;
  abort?: boolean;
}
