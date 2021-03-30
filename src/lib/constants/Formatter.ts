import _ from 'lodash';
import moment from 'moment';
import { DATE_TIME_FORMAT_AP } from 'app-ui/utils/constants';

const ForwardedAddressInfoFomatter = (data: Address.IForwardedAddressInfo): any => {
	return {
		id: _.get(data, 'id'),
		address: _.get(data, 'address'),
		name: _.get(data, 'name'),
		targets: _.get(data, 'targets'),
		allowed: _.get(data, 'limits.forwards.allowed'),
		used: _.get(data, 'limits.forwards.used'),
		ttl: _.get(data, 'limits.forwards.ttl'),
		status: _.get(data, 'autoreply.status'),
		date: _.isEmpty(_.get(data, 'autoreply.start', ''))
			? ''
			: [moment(_.get(data, 'autoreply.start')), moment(_.get(data, 'autoreply.end'))],
		autoreplyName: _.get(data, 'autoreply.name'),
		subject: _.get(data, 'autoreply.subject'),
		text: _.get(data, 'autoreply.text'),
		html: _.get(data, 'autoreply.html'),
		created: moment(_.get(data, 'created')).format(DATE_TIME_FORMAT_AP),
		tags: _.get(data, 'tags'),
		forwardedDisabled: _.get(data, 'forwardedDisabled'),
	};
};

const updateForwardedAddressInfoFormatter = (data: any): any => {
	return {
		address: _.get(data, 'address'),
		name: _.get(data, 'name') ? _.get(data, 'name') : '',
		targets: _.get(data, 'targets'),
		forwards: _.get(data, 'forwards'),
		tags: _.get(data, 'tags'),
		forwardedDisabled: _.get(data, 'forwardedDisabled', false),
		autoreply: {
			status: _.get(data, 'status'),
			start: _.get(data, 'date[0]', false),
			end: _.get(data, 'date[1]', false),
			name: _.get(data, 'autoreplyName'),
			subject: _.get(data, 'subject'),
			text: _.get(data, 'text'),
			html: _.get(data, 'html'),
		},
	};
};

const updateAddressInfoFormatter = (data: any): any => {
	return {
		name: _.get(data, 'name'),
		address: _.get(data, 'address'),
		main: _.get(data, 'main') ? true : undefined,
		tags: _.get(data, 'tags'),
	};
};

const updateAutorepliesFormatter = (data: any): any => {
	return {
		status: _.get(data, 'status'),
		name: _.get(data, 'name'),
		subject: _.get(data, 'subject'),
		html: _.get(data, 'html'),
		text: _.get(data, 'text'),
		start: _.get(data, 'date[0]', false),
		end: _.get(data, 'date[1]', false),
	};
};

const createNewAddressFormatter = (data: any): any => {
	return {
		address: _.get(data, 'address'),
		name: _.get(data, 'name'),
		tags: _.get(data, 'tags'),
		allowWildcard: _.get(data, 'allowWildcard', false),
		main: _.get(data, 'main', false),
	};
};

const createForwardedAddressFormatter = (data: any): any => {
	return {
		address: _.get(data, 'address'),
		name: _.get(data, 'name', ''),
		targets: _.get(data, 'targets'),
		allowWildcardoptional: _.get(data, 'allowWildcardoptional'),
		forwards: _.get(data, 'forwards'),
		tags: _.get(data, 'tags'),
		autoreply: {
			status: _.get(data, 'status'),
			start: _.get(data, 'date[0]', false),
			end: _.get(data, 'date[1]', false),
			name: _.get(data, 'autoreplyName'),
			subject: _.get(data, 'subject'),
			text: _.get(data, 'text'),
			html: _.get(data, 'html'),
		},
	};
};

const uploadMessageFormatter = (data: any) => {
	let reference = {};

	if (
		_.isEmpty(_.get(data, 'mailbox')) ||
		_.isEmpty(_.get(data, 'id')) ||
		_.isEmpty(_.get(data, 'mailbox')) ||
		_.isEmpty(_.get(data, 'attachments'))
	) {
		reference = {};
	} else {
		reference = {
			mailbox: _.get(data, 'mailbox'),
			id: _.get(data, 'id'),
			actions: _.get(data, 'mailbox'),
			attachments: _.get(data, 'attachments'),
		};
	}

	return {
		unseen: _.get(data, 'unseen'),
		draft: _.get(data, 'draft'),
		flagged: _.get(data, 'flagged'),
		raw: _.get(data, 'raw'),
		html: _.get(data, 'html'),
		subject: _.get(data, 'subject'),
		text: _.get(data, 'text'),
		files: _.get(data, 'files'),
		sess: _.get(data, 'sess'),
		ip: _.get(data, 'ip'),
		from: {
			name: _.get(data, 'name'),
			address: _.get(data, 'address'),
		},
		to: _.map(_.get(data, 'to', {}), (address) => ({ address: address })),
		cc: _.map(_.get(data, 'cc', {}), (address) => ({ address: address })),
		bcc: _.map(_.get(data, 'bcc', {}), (address) => ({ address: address })),
		reference: reference,
	};
};

export {
	ForwardedAddressInfoFomatter,
	updateForwardedAddressInfoFormatter,
	updateAddressInfoFormatter,
	updateAutorepliesFormatter,
	createNewAddressFormatter,
	createForwardedAddressFormatter,
	uploadMessageFormatter,
};
