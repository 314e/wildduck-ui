/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description React hook useAllowedList
 */

import { useQuery } from 'react-query';
import _ from 'lodash';

import api from 'client/RequestClient';

/*
 * useAllowedList
 */

const useAllowedList = (tag: string) => {
	return useQuery(
		['query-allowList', tag],
		async () => {
			const { data } = await api.domainAccessApi.getAllowedDomain(tag);
			return _.get(data, 'results', []);
		},
		{ enabled: !_.isEmpty(tag), staleTime: 3000 },
	);
};

export default useAllowedList;
