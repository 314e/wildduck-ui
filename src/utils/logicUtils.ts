import _ from 'lodash';
import AppEvents, { Events } from './AppEvents';

/**
 * gets the specified value using key
 * @param key
 */
const get = <T>(key: string, defaults?: T) => (state: T, payload: Record<string, T>): T => {
	return _.get(payload, key, !_.isUndefined(defaults) ? defaults : state);
};

/**
 * creates an object from specified keys
 * @param key
 */
const pick = <T, K extends keyof T>(keys: K[]) => (state: T, payload: { [k in K]: T[k] }): { [k in K]: T[k] } => {
	return _.pick(payload, keys);
};

/**
 * creates an array of object with keys
 * @param arrayOfObject
 */
const addKey = (
	arrayOfObject: Array<Record<string, any>>,
	keys: Array<string> = ['id'],
): Array<Record<string, any>> => {
	return _.map(arrayOfObject, (obj) => {
		let mkey = '';
		return {
			...obj,
			key: _.map(keys, (tkey: string) => {
				mkey += _.get(obj, tkey, '');
				return mkey;
			}),
		};
	});
};

const handleError = (error = '', success = 'Successfull !'): void => {
	_.isEmpty(error) ? AppEvents.publish(Events.Success, success) : AppEvents.publish(Events.Error, `${error}`);
};

export { get, pick, addKey, handleError };
