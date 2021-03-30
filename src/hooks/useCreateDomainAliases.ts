/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useCreateDomainAliases
 */

import { useMutation } from 'react-query';

import api from 'app-redux/client/RequestClient';
import AppEvents, { Events } from 'app-redux/utils/AppEvents';
import { CreateDomainAliasRequest } from 'app-redux/client/wildduck-api';
import handleError from 'app-ui/utils/handleError';

/**
 * useCreateDomainAliases
 */
const useCreateDomainAliases = () => {
	return useMutation(
		(newDomainAlias: CreateDomainAliasRequest) => api.domainAliasesApi.createDomainAlias(newDomainAlias),
		{
			onError: () => {
				AppEvents.publish(Events.Error, 'Error');
			},
			onSuccess: ({ data }) => {
				handleError(data);
			},
		},
	);
};

export default useCreateDomainAliases;
