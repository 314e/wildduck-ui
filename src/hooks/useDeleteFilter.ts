/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useDeleteFilter
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';
import { CreateFilterRequest } from 'app-redux/client/wildduck-api';
import handleError from 'app-ui/utils/handleError';

/**
 * useDeleteFilter
 */
const useDeleteFilter = () => {
	const queryClient = useQueryClient();

	return useMutation(
		({ userId, filterId }: { userId: string; filterId: string }) => api.filtersApi.deleteFilter(userId, filterId),
		{
			onError: () => {
				AppEvents.publish(Events.Error, 'Error');
			},
			onSuccess: ({ data }) => {
				handleError(data);
				queryClient.invalidateQueries('query-filters');
			},
		},
	);
};

export default useDeleteFilter;
