/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useResetPassword
 */

import { useMutation } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-redux/utils/AppEvents';

/**
 * useResetPassword
 */
const useResetPassword = () => {
	return useMutation((userId: string) => api.usersApi.resetUserPassword(userId), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Success');
		},
	});
};

export default useResetPassword;
