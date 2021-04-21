declare namespace Address {
	interface Ikeys {
		addressId: string;
		userId: string;
	}

	interface IParams {
		query?: string;
		tags?: string;
		requiredTags?: string;
		metaData?: boolean;
		internalData?: boolean;
		limit?: number;
		page?: number;
		next?: number;
		previous?: number;
		options?: any;
	}

	interface IForwardedAddress {
		/**
		* Key of the Address
		* @type {string
		*/
		key?: string;
		/**
		* ID of the Address
		* @type {string
		*/
		id: string;
		/**
		 * Identity name
		 * @type {string}
		 */
		name: string;
		/**
		 * E-mail address string
		 * @type {string}
		 */
		address: string;
		/**
		 * User ID this address belongs to if this is a User address
		 * @type {string}
		 */
		user?: string;
		/**
		 * If true then it is a forwarded address
		 * @type {boolean}
		 */
		forwarded: boolean;
		/**
		 * If true then the forwarded address is disabled
		 * @type {boolean}
		 */
		forwardedDisabled: boolean;
		/**
		 * List of forwarding targets
		 * @type {Array<string>}
		 */
		target?: Array<string>;
	}

	type IForwardedAddressList = Array<IForwardedAddress>;

	interface IUserAddress {
		/**
		 * Key of the Address
		 * @type {string}
		 */
		key: string;
		/**
		 * ID of the Address
		 * @type {string}
		 */
		id: string;
		/**
		 * Identity name
		 * @type {string}
		 */
		name: string;
		/**
		 * E-mail address string
		 * @type {string}
		 */
		address: string;
		/**
		 * Indicates if this is the default address for the User
		 * @type {boolean}
		 */
		main: boolean;
		/**
		 * Datestring of the time the address was created
		 * @type {string}
		 */
		created: string;
		/**
		 * List of tags associated with the Address
		 * @type {Array<string>}
		 */
		tags: Array<string>;
		/**
		 * Metadata object (if available)
		 * @type {object}
		 */
		metaData?: Record<string, unknown>;
		/**
		 * Internal metadata object (if available), not included for user-role requests
		 * @type {object}
		 */
		internalData?: Record<string, unknown>;
	}

	type IUserAddressList = Array<IUserAddress>;

	interface IAddressInfo {
		success: boolean;
		id: string;
		name: string;
		address: string;
		tags: Array<string>;
		metaData?: Record<string, unknown> | string;
		internalData?: Record<string, unknown> | string;
		main: boolean;
		created: string;
	}

	interface ICreateNewAddress {
		user: string;
		address: string;
		name: string;
		tags: Array<string>;
		main: boolean;
		allowWildcard: boolean;
		metaData: Record<string, unknown> | string;
		internalData: Record<string, unknown> | string;
	}

	interface IForwardedAddressInfo {
		success: boolean;
		id: string;
		address: string;
		name: string;
		targets: Array<string>;
		limits: {
			forwards: {
				allowed: number;
				used: number;
				ttl: number;
			};
		};
		autoreply: {
			status: boolean;
			name: string;
			subject: string;
			text: string;
			html: string;
		};
		created: string;
		tags: Array<string>;
		forwardedDisabled: boolean;
	}

	interface IUpdateForwardedAddressInfo {
		id: string;
		address?: string;
		name?: string;
		targets?: Array<string>;
		forwards?: number;
		tags?: Array<string>;
		metaData?: Record<string, unknown> | string;
		internalData?: Record<string, unknown> | string;
		forwardedDisabled?: boolean;
		autoreply?: {
			status?: boolean;
			start?: string;
			end?: string;
			name?: string;
			subject?: string;
			text?: string;
			html?: string;
		};
	}

	interface IUpdateAddressInfo {
		id: string;
		name?: string;
		address?: string;
		main: boolean;
		metaData?: Record<string, unknown> | string;
		internalData?: Record<string, unknown> | string;
		tags: Array<string>;
	}
}
