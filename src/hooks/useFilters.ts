/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description React hook useFilters
 */

import { useQuery } from 'react-query';
import _ from 'lodash';

import { addKey } from 'redux-utils/logicUtils';
import api from 'app-redux/client/RequestClient';

/*
 * useFilters
 */

const useFilters = (id: string) => {
	return useQuery(
		['query-filters', id],
		async () => {
			const { data } = await api.filtersApi.getFilters(id);
			return addKey(_.get(data, 'results', []));
		},
		{ enabled: !_.isEmpty(id) },
	);
};

export default useFilters;
