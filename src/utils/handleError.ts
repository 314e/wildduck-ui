/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description Handle error from the server
 */

import _ from 'lodash';

import AppEvents, { Events } from 'app-redux/utils/AppEvents';

const handleError = (data: any) => {
	let error = _.get(data, 'error', '');
	if (_.isEqual(error, 'Mailbox update failed with code CANNOT')) {
		error = 'Special Mailbox path cannot be changed';
	} else if (_.isEqual(error, 'Mailbox update failed with code ALREADYEXISTS')) {
		error = 'Mailbox with this name already exists';
	}

	_.isEmpty(error) ? AppEvents.publish(Events.Success, 'Success') : AppEvents.publish(Events.Error, `${error}`);
};

export default handleError;
