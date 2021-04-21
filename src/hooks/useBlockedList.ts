/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description React hook useBlockedList
 */

import { useQuery } from 'react-query';
import _ from 'lodash';

import api from 'client/RequestClient';

/*
 * useBlockedList
 */

const useBlockedList = (tag: string) => {
	return useQuery(
		['query-blockList', tag],
		async () => {
			const { data } = await api.domainAccessApi.getBlockedDomain(tag);
			return _.get(data, 'results', []);
		},
		{ enabled: !_.isEmpty(tag), staleTime: 3000 },
	);
};

export default useBlockedList;
