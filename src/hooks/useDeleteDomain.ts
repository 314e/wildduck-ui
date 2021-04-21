/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description React hook useDeleteDomain
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';

/*
 * useDeleteDomain
 */
const useDeleteDomain = () => {
	const queryClient = useQueryClient();

	return useMutation((id: string) => api.domainAccessApi.deleteDomainListing(id), {
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Deleted !');
			queryClient.invalidateQueries('query-blockList');
			queryClient.invalidateQueries('query-allowList');
		},
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
	});
};

export default useDeleteDomain;
