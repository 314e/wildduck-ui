/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useRestoreArchiveMessages
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';
import { RestoreMessagesRequest } from 'app-redux/client/wildduck-api';

interface IParams {
	userId: string;
	params: RestoreMessagesRequest;
}

/**
 * useRestoreArchiveMessages
 */
const useRestoreArchiveMessages = () => {
	const queryClient = useQueryClient();

	return useMutation(async ({ userId, params }: IParams) => await api.archiveApi.restoreMessages(userId, params), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: ({ data }) => {
			AppEvents.publish(Events.Success, data.success ? 'Success' : 'Changes will reflect after 15 sec');
			queryClient.invalidateQueries('useArchive');
		},
	});
};

export default useRestoreArchiveMessages;
