/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useUpdateMailbox
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';
import { UpdateMailboxRequest } from 'app-redux/client/wildduck-api';
import handleError from 'app-ui/utils/handleError';

interface IParams {
	userId: string;
	mailboxId: string;
	params: UpdateMailboxRequest;
}
/**
 * useUpdateMailbox
 */
const useUpdateMailbox = () => {
	const queryClient = useQueryClient();

	return useMutation(
		({ userId, mailboxId, params }: IParams) => api.mailboxesApi.updateMailbox(userId, mailboxId, params),
		{
			onError: () => {
				AppEvents.publish(Events.Error, 'Error');
			},
			onSuccess: ({ data }) => {
				handleError(data);
				queryClient.invalidateQueries('useMailboxes');
			},
		},
	);
};

export default useUpdateMailbox;
