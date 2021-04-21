/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useRecalculateQuota
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';

/**
 * useRecalculateQuota
 */
const useRecalculateQuota = () => {
	const queryClient = useQueryClient();

	return useMutation((userId: string) => api.usersApi.recalculateQuota(userId), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Success');
			queryClient.invalidateQueries('useUsers');
		},
	});
};

export default useRecalculateQuota;
