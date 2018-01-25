import { IFetchOptions } from "./interfaces";
export declare class AjaxWorker {
}
export declare namespace AjaxWorker {
    function fetch<TDataType>(options: IFetchOptions<TDataType>): void;
    function init(): void;
}
export default AjaxWorker;
