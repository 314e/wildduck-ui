/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useDeleteMessage
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-redux/utils/AppEvents';

interface IParams {
	userId: string;
	mailboxId: string;
	messageNumber: number;
}

/**
 * useDeleteMessage
 */
const useDeleteMessage = () => {
	const queryClient = useQueryClient();

	return useMutation(
		({ userId, mailboxId, messageNumber }: IParams) =>
			api.messagesApi.deleteMessage(userId, mailboxId, messageNumber),
		{
			onError: () => {
				AppEvents.publish(Events.Error, 'Error');
			},
			onSuccess: () => {
				AppEvents.publish(Events.Success, 'Success');
				queryClient.invalidateQueries('useMessages');
			},
		},
	);
};

export default useDeleteMessage;
