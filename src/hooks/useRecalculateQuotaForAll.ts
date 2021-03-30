/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useRecalculateQuotaForAll
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-redux/utils/AppEvents';

/**
 * useRecalculateQuotaForAll
 */
const useRecalculateQuotaForAll = () => {
	const queryClient = useQueryClient();

	return useMutation(() => api.usersApi.recalculateQuotaAllUsers(), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Success');
			queryClient.invalidateQueries('useUsers');
		},
	});
};

export default useRecalculateQuotaForAll;
