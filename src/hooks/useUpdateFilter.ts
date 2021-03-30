/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useUpdateFilter
 */

import { useMutation } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-redux/utils/AppEvents';
import { CreateFilterRequest } from 'app-redux/client/wildduck-api';
import handleError from 'app-ui/utils/handleError';

/**
 * useUpdateFilter
 */
const useUpdateFilter = () => {
	return useMutation(
		({
			userId,
			filterId,
			filterDetails,
		}: {
			userId: string;
			filterId: string;
			filterDetails: CreateFilterRequest;
		}) => api.filtersApi.updateFilter(userId, filterId, filterDetails),
		{
			onError: () => {
				AppEvents.publish(Events.Error, 'Error');
			},
			onSuccess: ({ data }) => {
				handleError(data);
			},
		},
	);
};

export default useUpdateFilter;
