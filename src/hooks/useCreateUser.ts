/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useCreateUser
 */

import { useMutation } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';
import { CreateUserRequest } from 'app-redux/client/wildduck-api';
import handleError from 'app-ui/utils/handleError';

/**
 * useCreateUser
 */
const useCreateUser = () => {
	return useMutation((user: CreateUserRequest) => api.usersApi.createUser(user), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: ({ data }) => {
			handleError(data);
		},
	});
};

export default useCreateUser;
