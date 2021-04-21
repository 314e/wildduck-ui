/**
 * Event Bus using pub/sub design pattern
 * @author Harish.R <harish.r@314ecorp.com>
 */

import _ from 'lodash';
import log from 'loglevel';

/**
 * Events
 */
enum Events {
	Loading = 'M_LOADING',
	Warn = 'M_WARN',
	Info = 'M_INFO',
	Success = 'M_SUCCESS',
	Error = 'M_ERROR',
	N_Loading = 'N_LOADING',
	N_Warn = 'N_WARN',
	N_Info = 'N_INFO',
	N_Success = 'N_SUCCESS',
	N_Error = 'N_ERROR',
	MO_Success = 'MO_Success',
	MO_Error = 'MO_Error',
	MO_Info = 'MO_Info',
	MO_Warn = 'MO_Warn',
}

/**
 * App Events
 * @class
 */
class AppEvents {
	/**
	 * All Subscriptions
	 * @member subscribers
	 */
	subscribers: Record<string, any>;
	constructor() {
		this.subscribers = {};
	}

	/**
	 * publish an event
	 * @method publish
	 * @param {string} event
	 * @param rest
	 */
	publish = (event: string, ...rest: any) => {
		if (_.has(this.subscribers, event)) {
			_.forOwn(_.get(this.subscribers, event), (callback: any) => {
				try {
					callback(...rest);
				} catch (ex) {
					log.error(`[Eventbus] ${ex}`);
				}
			});
		}
	};

	/**
	 * Subscribes an event
	 * @method subscribe
	 * @param {event} event
	 * @param {function} callback
	 */
	subscribe = (event: string, callback: any) => {
		if (!_.has(this.subscribers, event)) {
			_.setWith(this.subscribers, event, [], Object);
		}
		if (_.isFunction(callback)) {
			_.get(this.subscribers, event).push(callback);
		} else {
			log.error(`[Eventbus] ${callback} is not a function`);
		}
	};
}

export default new AppEvents();

export { Events };
