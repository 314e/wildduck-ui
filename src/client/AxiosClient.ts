/**
 * @author Lakkanna Walikar <lakkanna.walikar@314ecorp.com>
 * @description Axios Instance creator and api creator
 */
import axios, { AxiosInstance } from 'axios';
import {
	AddressesApi,
	UsersApi,
	DKIMApi,
	DomainAccessApi,
	FiltersApi,
	DomainAliasesApi,
	AuditApi,
	ArchiveApi,
	AutorepliesApi,
	MailboxesApi,
	TwoFactorAuthApi,
	MessagesApi,
	StorageApi,
	AuthenticationApi,
} from './wildduck-api';

/**
 * interface to contain open-api's
 * @interface IApi
 */
export interface IApi {
	/**
	 * instance of AddressesApi
	 *
	 * @type {AddressesApi}
	 * @memberof IApi
	 */
	addressApi: AddressesApi;
	/**
	 * instance of UsersApi
	 *
	 * @type {UsersApi}
	 * @memberof IApi
	 */
	usersApi: UsersApi;
	/**
	 * instance of AuditApi
	 *
	 * @type {AuditApi}
	 * @memberof IApi
	 */
	auditApi: AuditApi;
	/**
	 * instance of DKIMApi
	 *
	 * @type {DKIMApi}
	 * @memberof IApi
	 */
	dkimApi: DKIMApi;
	/**
	 * instance of DomainAccessApi
	 *
	 * @type {DomainAccessApi}
	 * @memberof IApi
	 */
	domainAccessApi: DomainAccessApi;
	/**
	 * instance of DomainAliasesApi
	 *
	 * @type {DomainAliasesApi}
	 * @memberof IApi
	 */
	domainAliasesApi: DomainAliasesApi;
	/**
	 * instance of FiltersApi
	 *
	 * @type {FiltersApi}
	 * @memberof IApi
	 */
	filtersApi: FiltersApi;
	/**
	 * instance of ArchiveApi
	 *
	 * @type {ArchiveApi}
	 * @memberof IApi
	 */
	archiveApi: ArchiveApi;

	/**
	 * instance of AutorepliesApi
	 *
	 * @type {AutorepliesApi}
	 * @memberof IApi
	 */
	autorepliesApi: AutorepliesApi;

	/**
	 * instance of MailboxesApi
	 *
	 * @type {MailboxesApi}
	 * @memberof IApi
	 */
	mailboxesApi: MailboxesApi;

	/**
	 * instance of TwoFactorAuthApi
	 *
	 * @type {TwoFactorAuthApi}
	 * @memberof IApi
	 */
	twoFactorAuthApi: TwoFactorAuthApi;

	/**
	 * instance of MessageApi
	 *
	 * @type {MessagesApi}
	 * @memberof IApi
	 */
	messagesApi: MessagesApi;

	/**
	 * instance of StorageApi
	 *
	 * @type {StorageApi}
	 * @memberof IApi
	 */
	storageApi: StorageApi;

	/**
	 * instance of AuthenticationApi
	 *
	 * @type {AuthenticationApi}
	 * @memberof IApi
	 */
	authenticationApi: AuthenticationApi;
}

/**
 * Class to create instance and api instances
 */
abstract class AxiosClient {
	private static instance: AxiosInstance;
	private static api: IApi;

	/**
	 * method to get instance of axios
	 * @returns {AxiosInstance} returns axions instance if created else creates new instance and returns
	 */
	public getAxiosInstance = (): AxiosInstance => {
		if (!AxiosClient.instance) {
			// If request made before Interceptor got injected, Use Full URL to make request
			return axios.create();
		}
		return AxiosClient.instance;
	};

	/**
	 * method to get instance of open-api's
	 * @example
	 * const api = { salesMetricsApi: SalesMetricsApi }
	 * const response = await api.salesMetricsApi.getRevenueForecastApiV1GetRevenueForecastGet(startDate, endDate);
	 * @returns {IApi}
	 */
	public getApi = (): IApi => {
		if (!AxiosClient.api) {
			axios.create();
			return AxiosClient.api;
		}
		return AxiosClient.api;
	};

	/**
	 * method to create instance for axios and open api's
	 * @protected
	 */
	protected create = (config: IAxiosRequestConfig): void => {
		AxiosClient.instance = axios.create(config);
		AxiosClient.api = {
			addressApi: new AddressesApi(undefined, config.baseURL, AxiosClient.instance),
			usersApi: new UsersApi(undefined, config.baseURL, AxiosClient.instance),
			dkimApi: new DKIMApi(undefined, config.baseURL, AxiosClient.instance),
			domainAccessApi: new DomainAccessApi(undefined, config.baseURL, AxiosClient.instance),
			domainAliasesApi: new DomainAliasesApi(undefined, config.baseURL, AxiosClient.instance),
			filtersApi: new FiltersApi(undefined, config.baseURL, AxiosClient.instance),
			auditApi: new AuditApi(undefined, config.baseURL, AxiosClient.instance),
			archiveApi: new ArchiveApi(undefined, config.baseURL, AxiosClient.instance),
			autorepliesApi: new AutorepliesApi(undefined, config.baseURL, AxiosClient.instance),
			mailboxesApi: new MailboxesApi(undefined, config.baseURL, AxiosClient.instance),
			twoFactorAuthApi: new TwoFactorAuthApi(undefined, config.baseURL, AxiosClient.instance),
			messagesApi: new MessagesApi(undefined, config.baseURL, AxiosClient.instance),
			storageApi: new StorageApi(undefined, config.baseURL, AxiosClient.instance),
			authenticationApi: new AuthenticationApi(undefined, config.baseURL, AxiosClient.instance),
		};
	};

	/**
	 * method add interceptors to axions instance
	 * @protected
	 * @param {IAxiosInterceptors | undefined} interceptors
	 */
	protected addInterceptors = (interceptors: IAxiosInterceptors | undefined): void => {
		if (interceptors) {
			AxiosClient.instance.interceptors.request.use(interceptors.request, interceptors.reject);
			AxiosClient.instance.interceptors.response.use(interceptors.response, interceptors.reject);
		}
	};
}

export default AxiosClient;
