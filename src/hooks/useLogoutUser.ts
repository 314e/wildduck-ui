/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useLogoutUser
 */

import { useMutation } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-redux/utils/AppEvents';

/**
 * useLogoutUser
 */
const useLogoutUser = () => {
	return useMutation((userId: string) => api.usersApi.logoutUser(userId, { reason: 'you have been logged out' }), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Success');
		},
	});
};

export default useLogoutUser;
