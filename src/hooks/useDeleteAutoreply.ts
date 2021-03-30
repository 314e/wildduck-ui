/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useDeleteAutoreply
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-redux/utils/AppEvents';

/**
 * useDeleteAutoreply
 */
const useDeleteAutoreply = () => {
	const queryClient = useQueryClient();

	return useMutation((userId: string) => api.autorepliesApi.deleteAutoreply(userId), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Success');
			queryClient.invalidateQueries('useAutoreplyDetails');
		},
	});
};

export default useDeleteAutoreply;
