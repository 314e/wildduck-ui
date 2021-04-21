/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useDeleteMessagesInMailbox
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';

interface IParams {
	userId: string;
	mailboxId: string;
}

/**
 * useDeleteMessagesInMailbox
 */
const useDeleteMessagesInMailbox = () => {
	const queryClient = useQueryClient();

	return useMutation(({ userId, mailboxId }: IParams) => api.messagesApi.deleteMessagesInMailbox(userId, mailboxId), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Success');
			queryClient.invalidateQueries('useMailboxes');
		},
	});
};

export default useDeleteMessagesInMailbox;
