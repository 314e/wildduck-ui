/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useAddress
 */

import { useQuery } from 'react-query';
import _ from 'lodash';

import { addKey } from 'app-ui/utils/logicUtils';
import api from 'client/RequestClient';

/**
 * useAddress
 */
const useAddress = (userId: string) => {
	return useQuery(['useAddress'], async () => {
		const { data } = await api.addressApi.getUserAddresses(userId);
		return addKey(_.get(data, 'results', []));
	});
};

export default useAddress;
