/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useUpdateUserDetails
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-redux/utils/AppEvents';
import { UpdateUserRequest } from 'app-redux/client/wildduck-api';
import handleError from 'app-ui/utils/handleError';

interface IParams {
	userDetails: UpdateUserRequest;
	userId: string;
}

/**
 * useUpdateUserDetails
 */
const useUpdateUserDetails = () => {
	const queryClient = useQueryClient();

	return useMutation((params: IParams) => api.usersApi.updateUser(params.userId, params.userDetails), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: ({ data }) => {
			handleError(data);
			queryClient.invalidateQueries('useUserDetails');
		},
	});
};

export default useUpdateUserDetails;
