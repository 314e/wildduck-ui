/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description React hook useCreateDkim
 */

import { useMutation, useQueryClient } from 'react-query';
import _ from 'lodash';

import api from 'client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';
import { UpdateDkimKeyRequest } from 'client/wildduck-api';

/*
 * useCreateDkim
 */
const useCreateDkim = () => {
	const queryClient = useQueryClient();

	return useMutation((dkim: UpdateDkimKeyRequest) => api.dkimApi.updateDkimKey(dkim), {
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Success');
			queryClient.invalidateQueries('query-dkim');
		},
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
	});
};

export default useCreateDkim;
