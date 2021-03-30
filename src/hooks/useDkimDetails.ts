/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description React hook useDkimDetails
 */

import { useQuery } from 'react-query';
import _ from 'lodash';

import api from 'app-redux/client/RequestClient';

/*
 * useDkimDetails
 */
const useDkimDetails = (dkimId: string) => {
	return useQuery(
		['query-dkim', dkimId],
		async () => {
			const { data } = await api.dkimApi.getDkimKey(dkimId);
			return data;
		},
		{ enabled: !_.isEmpty(dkimId) },
	);
};

export default useDkimDetails;
