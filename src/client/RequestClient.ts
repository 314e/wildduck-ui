/**
 * @author Lakkanna Walikar <lakkanna.walikar@314ecorp.com>
 * @description Request client to make api requests
 * @exports {Api} api, Client, axiosInstance
 */

import { AxiosRequestConfig } from 'axios';
import AxiosClient, { IApi } from './AxiosClient';
import _ from 'lodash';

/**
 * Class to get axios instance, Client to make api request and generated api's
 *
 * 	axiosInstance - instance of axios with interceptor config and base
 * 	Client - instance to make request
 * 	api - generated api
 */
class RequestClient extends AxiosClient {
	constructor() {
		super();
	}

	/**
	 * method to get axios request with configuration
	 *
	 * can make request's to api using this method
	 * @param {AxiosRequestConfig} config - configuration to make api request,
	 * @example
	 * 	url, method, headers
	 *
	 * @returns {Promise<AxiosResponse<any>>} response after making api request with configuration
	 */
	public request = async (config: AxiosRequestConfig) => {
		return await this.getAxiosInstance().request(config);
	};

	/**
	 * method to get request method to make api requests
	 * @returns {request} request method
	 */
	public getClient = () => {
		return this.request;
	};
}

/**
 * instance of RequestClient
 * @type {RequestClient}
 */
const requestClient = new RequestClient();

/**
 * reference to request method in RequestClient
 *
 * make api calls by passing config
 * @example
 * Client({url: 'example.com', method: 'get'})
 * @returns {Promise<AxiosResponse<any>>} response from requested api
 */
const client = requestClient.getClient();

/**
 * instance of Axios
 */
const axiosInstance = requestClient.getAxiosInstance();

/**
 * generated open-api
 *
 * reference to getApi in RequestClient
 * contains list of api generated from open-api
 * @example
 * result = await api.salesMetricsApi.getRevenueForecastApiV1GetRevenueForecastGet(startDate, endDate);
 * @exports
 */
const api: IApi = new Proxy(({} as unknown) as IApi, {
	get: (__, props) => {
		return _.get(requestClient.getApi(), props);
	},
});

export { client as Client, axiosInstance, api };
export default api;
