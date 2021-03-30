/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useDeleteUser
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-redux/utils/AppEvents';

/**
 * useDeleteUser
 */
const useDeleteUser = () => {
	const queryClient = useQueryClient();

	return useMutation((userId: string) => api.usersApi.deleteUser(userId), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Success');
			queryClient.invalidateQueries('useUsers');
		},
	});
};

export default useDeleteUser;
