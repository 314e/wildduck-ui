/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useUpdateAutoreply
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';
import { UpdateAutoreplyRequest } from 'app-redux/client/wildduck-api';
import handleError from 'app-ui/utils/handleError';

interface IParams {
	userId: string;
	updateAutoreply: UpdateAutoreplyRequest;
}
/**
 * useUpdateAutoreply
 */
const useUpdateAutoreply = () => {
	const queryClient = useQueryClient();

	return useMutation((params: IParams) => api.autorepliesApi.updateAutoreply(params.userId, params.updateAutoreply), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: ({ data }) => {
			handleError(data);
			queryClient.invalidateQueries('useAutoreplyDetails');
		},
	});
};

export default useUpdateAutoreply;
