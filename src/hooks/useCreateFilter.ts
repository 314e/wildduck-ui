/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useCreateFilter
 */

import { useMutation } from 'react-query';

import api from 'client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';
import { CreateFilterRequest } from 'client/wildduck-api';
import handleError from 'app-ui/utils/handleError';

/**
 * useCreateFilter
 */
const useCreateFilter = () => {
	return useMutation(
		({ userId, filterDetails }: { userId: string; filterDetails: CreateFilterRequest }) =>
			api.filtersApi.createFilter(userId, filterDetails),
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

export default useCreateFilter;
