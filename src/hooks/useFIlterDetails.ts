/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description React hook useFilterDetails
 */

import { useQuery } from 'react-query';
import _ from 'lodash';

import api from 'client/RequestClient';

/*
 * useFilterDetails
 */

const useFilterDetails = (id: string, filterId: string) => {
	return useQuery(
		['query-filterDetails', id, filterId],
		async () => {
			const { data } = await api.filtersApi.getFilter(id, filterId);
			const details = {};
			_.assign(
				details,
				_.get(data, 'query', {}),
				_.get(data, 'action', {}),
				_.pick(data, ['id', 'name', 'disabled']),
			);
			return details;
		},
		{ enabled: !_.isEmpty(filterId) },
	);
};

export default useFilterDetails;
