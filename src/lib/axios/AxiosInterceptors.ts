/**
 * @author Lakkanna Walikar <lakkanna.walikar@314ecorp.com>
 * @description Axios Interceptors
 */

import log from 'loglevel';
import _ from 'lodash';
import AxiosClient from 'client/AxiosClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';
import { accessTokenString } from 'app-ui/lib/constants/constant';

/**
 * class to create interceptors
 * @class AxiosInterceptor
 * @extends AxiosClient
 */
class AxiosInterceptor extends AxiosClient {
	/**
	 * interceptor to handle request
	 * @static
	 * @param {IAxiosRequestConfig} config - configuration for api request
	 * @returns {Promise<IAxiosRequestConfig>}
	 */
	static requestInterceptor = async (config: IAxiosRequestConfig): Promise<IAxiosRequestConfig> => {
		_.setWith(config, 'headers.X-Access-Token', sessionStorage.getItem(accessTokenString), Object);
		return config;
	};

	/**
	 * interceptor to handle request response
	 * @static
	 * @returns response.data
	 */
	static responseInterceptor = (response: IAxiosResponse) => {
		// According to default config
		// Response interceptor will only be called b/w status code >=200 to < 300
		return response;
	};

	/**
	 * interceptor to handle request rejections
	 * handle erros based on error status code
	 */
	static reject = (error: IAxiosError): Promise<never> => {
		if (error.response) {
			switch (error.response.status) {
				case 400:
					log.error('Bad Request');
					return Promise.reject(error);
				case 401:
					log.error('UnAuthrized');
					return Promise.reject(error);
				case 403:
					log.error('Forbidden');
					AppEvents.publish(Events.N_Error, {
						message: 'Forbidden',
						description: 'Operation ',
					});
					return Promise.reject(error);
				case 404:
					return Promise.reject(error);
			}
			log.error(error.response.status);
		}
		return Promise.reject(error);
	};

	/**
	 * Creates Instance and adds interceptor
	 * @method inject
	 * @param {IAxiosRequestConfig} config
	 */
	inject = (config: IAxiosRequestConfig) => {
		this.create(config);
		this.addInterceptors({
			request: AxiosInterceptor.requestInterceptor,
			response: AxiosInterceptor.responseInterceptor,
			reject: AxiosInterceptor.reject,
		});
	};
}

export default AxiosInterceptor;
