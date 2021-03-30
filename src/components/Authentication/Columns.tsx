/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description ForwardedAddress Table
 */

import _ from 'lodash';
import moment from 'moment';

import getColumnsWithFilterAndSort from 'app-ui/utils/getColumnsWithFilterAndSort';
import { DATE_TIME_FORMAT_AP } from 'app-ui/utils/constants';

export const getAuthenticatonColumns = ({ dataSource }: { dataSource: any }): any => {
	const columns = [
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			filter: true,
		},
		{
			title: 'Events',
			dataIndex: 'events',
			key: 'events',
			sortable: 'number',
		},
		{
			title: 'Result',
			dataIndex: 'result',
			key: 'result',
			align: 'center',
			filter: true,
		},
		{
			title: 'Protocol',
			dataIndex: 'protocol',
			key: 'protocol',
			filter: true,
		},
		{
			title: 'Source',
			dataIndex: 'source',
			key: 'source',
			align: 'center' as const,
		},
		{
			title: 'Required Scope',
			dataIndex: 'requiredScope',
			key: 'requiredScope',
			align: 'center' as const,
			filter: true,
		},
		{
			title: 'Session id',
			dataIndex: 'sess',
			key: 'sess',
		},
		{
			title: 'ip address',
			dataIndex: 'ip',
			key: 'ip',
			align: 'center' as const,
			filter: true,
		},
		{
			title: 'Session created',
			dataIndex: 'created',
			key: 'created',
			align: 'center' as const,
			sortable: 'date',
			render: (date: string) => moment(date).format(DATE_TIME_FORMAT_AP),
		},
		{
			title: 'Session expires',
			dataIndex: 'expires',
			key: 'expires',
			align: 'center' as const,
			sortable: 'date',
			render: (date: string) => moment(date).format(DATE_TIME_FORMAT_AP),
		},
		{
			title: 'Last activity',
			dataIndex: 'last',
			key: 'last',
			align: 'center' as const,
			sortable: 'date',
			render: (date: string) => moment(date).format(DATE_TIME_FORMAT_AP),
		},
	];

	return getColumnsWithFilterAndSort(columns, dataSource);
};
