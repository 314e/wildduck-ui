/**
 * @author Lakkanna Walikar <lakkanna.walikar@314ecorp.com>
 */

import _ from 'lodash';

/**
 * index signature for object
 */
interface IIndexSignature {
	[key: string]: any;
}

/**
 * Function to get uniq values based on object key
 *
 * @param {RevenueForecastDetails} data - A revenue forecast detail
 * @param {string} filterFor - This is key in a object
 * @returns {string[]} Uniq values for given filterFor key from the array of object
 */
const getUniqValuesBy = (dataArray: IIndexSignature[], filterFor: string): string[] => {
	if (filterFor) {
		return _.chain(dataArray)
			.map((data) => _.toString( _.get(data, filterFor)))
			.filter((value) => value !== undefined)
			.uniq()
			.sort()
			.value();
	}
	return [];
};

export default getUniqValuesBy;
