/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useRestoreArchiveMessage
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';
import { RestoreMessageRequest } from 'client/wildduck-api';

export interface IRestoreArchiveMessage {
	userId: string;
	message: number | string;
	params?: RestoreMessageRequest;
}

/**
 * useRestoreArchiveMessage
 */
const useRestoreArchiveMessage = () => {
	const queryClient = useQueryClient();

	return useMutation(
		({ userId, message, params }: IRestoreArchiveMessage) =>
			api.archiveApi.restoreMessage(userId, message as number, params),
		{
			onError: () => {
				AppEvents.publish(Events.Error, 'Error');
			},
			onSuccess: () => {
				AppEvents.publish(Events.Success, 'Success');
				queryClient.invalidateQueries('useArchive');
				queryClient.invalidateQueries('useMailboxes');
			},
		},
	);
};

export default useRestoreArchiveMessage;
