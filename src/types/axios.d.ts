declare interface IAxiosInterceptors {
	request: any;
	response: any;
	reject: any;
}

declare type IAxiosInstance = import('axios').AxiosInstance;
declare type IAxiosError = import('axios').AxiosError;
declare type IAxiosRequestConfig = import('axios').AxiosRequestConfig;
declare type IAxiosResponse = import('axios').AxiosResponse;
