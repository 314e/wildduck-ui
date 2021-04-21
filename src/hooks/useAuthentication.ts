/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useAuthentication
 */

import { useQuery } from 'react-query';
import _ from 'lodash';

import api from 'client/RequestClient';
import { addKey } from 'app-ui/utils/logicUtils';

/**
 * useAuthentication
 */
const useAuthentication = (userId: string, params: any) => {
	return useQuery(['useAuthentication', userId, params?.limit, params?.page], async () => {
		const { data } = await api.authenticationApi.getAuthlog(
			userId,
			_.get(params, 'action'),
			_.get(params, 'filterIp'),
			_.get(params, 'limit'),
			_.get(params, 'page'),
			_.get(params, 'next'),
			_.get(params, 'previous'),
		);
		return {
			data: addKey(_.get(data, 'results', [])),
			previousCursor: _.get(data, 'previousCursor', ''),
			nextCursor: _.get(data, 'nextCursor', ''),
		};
	});
};

export default useAuthentication;
