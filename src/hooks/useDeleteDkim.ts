/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description React hook useDeleteDkim
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';

/*
 * useDeleteDkim
 */
const useDeleteDkim = () => {
	const queryClient = useQueryClient();

	return useMutation((dkimId: string) => api.dkimApi.deleteDkimKey(dkimId), {
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Success');
			queryClient.invalidateQueries('query-dkim');
		},
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
	});
};

export default useDeleteDkim;
