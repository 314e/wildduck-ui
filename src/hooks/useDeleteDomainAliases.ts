/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useDeleteDomainAliases
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-redux/utils/AppEvents';

/**
 * useDeleteDomainAliases
 */
const useDeleteDomainAliases = () => {
	const queryClient = useQueryClient();

	return useMutation((aliasId: string) => api.domainAliasesApi.deleteDomainAlias(aliasId), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Success');
			queryClient.invalidateQueries('useDomainAliases');
		},
	});
};

export default useDeleteDomainAliases;
