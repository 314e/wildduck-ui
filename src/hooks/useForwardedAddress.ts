/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useForwadedAddress
 */

import { useQuery } from 'react-query';
import _ from 'lodash';

import { addKey } from 'app-ui/utils/logicUtils';
import api from 'client/RequestClient';

/**
 * useForwadedAddress
 */
const useForwadedAddress = (params?: Address.IParams) => {
	return useQuery(['useForwardedAddress', params?.query], async () => {
		let addressList: any = [];
		let response = await api.addressApi.getAddresses(
			_.get(params, 'query', ' '),
			_.get(params, 'tags', ' '),
			_.get(params, 'requiredTags', ' '),
			_.get(params, 'metaData', false),
			_.get(params, 'internalData', false),
			_.get(params, 'limit', 250),
			_.get(params, 'page', 1),
			_.get(params, 'next'),
			_.get(params, 'previous'),
		);

		addressList = _.get(response, 'data.results', []);

		while (!_.isEmpty(_.get(response, 'nextCursor'))) {
			response = await api.addressApi.getAddresses(
				_.get(params, 'query', ' '),
				_.get(params, 'tags', ' '),
				_.get(params, 'requiredTags', ' '),
				_.get(params, 'metaData', false),
				_.get(params, 'internalData', false),
				_.get(params, 'limit', 250),
				_.get(params, 'page', 1),
				_.get(params, 'next'),
				_.get(params, 'previous'),
			);

			_.concat(addressList, _.get(response, 'data.results', []));
		}
		return addKey(addressList);
	});
};

export default useForwadedAddress;
