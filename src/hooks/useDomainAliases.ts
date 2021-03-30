/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useDomainAliases
 */

import { useQuery } from 'react-query';
import _ from 'lodash';

import { addKey } from 'redux-utils/logicUtils';
import api from 'app-redux/client/RequestClient';

/**
 * useDomainAliases
 */
const useDomainAliases = (params: any) => {
	return useQuery(['useDomainAliases', params?.query, params?.limit, params?.page], async () => {
		const { data } = await api.domainAliasesApi.getDomainAliases(
			_.get(params, 'query'),
			_.get(params, 'limit'),
			_.get(params, 'page'),
			_.get(params, 'next'),
			_.get(params, 'previous'),
		);

		return {
			previousCursor: _.get(data, 'previousCursor'),
			nextCursor: _.get(data, 'nextCursor'),
			data: addKey(_.get(data, 'results', [])),
		};
	});
};

export default useDomainAliases;
