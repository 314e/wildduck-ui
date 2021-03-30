/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description Mailboxes Table Columns
 */

import React from 'react';
import _ from 'lodash';
import { Space, Button, Tag, Tooltip } from 'antd';

import getColumnsWithFilterAndSort from 'app-ui/utils/getColumnsWithFilterAndSort';
import showConfirm from 'app-ui/utils/showConfirm';
import { EditFilled, DeleteTwoTone } from '@ant-design/icons';

export const getMailboxesColumns = ({
	dataSource,
	drilldown,
	edit,
	deleteAllMessages,
}: {
	dataSource: any;
	drilldown(value: any): void;
	edit(value: any): void;
	deleteAllMessages(value: string): void;
}): any => {
	const columns = [
		{
			title: 'Path',
			dataIndex: 'path',
			align: 'center' as const,
			render: (text: string, record: any) => (
				<Space size='middle'>
					<a onClick={() => drilldown(record)}>{text}</a>
				</Space>
			),
		},
		{
			title: 'Name',
			dataIndex: 'name',
			filter: true,
		},
		{
			title: 'Special use',
			dataIndex: 'specialUse',
		},
		{
			title: 'Total',
			dataIndex: 'total',
			sortable: 'number',
		},
		{
			title: 'Unseen',
			dataIndex: 'unseen',
			sortable: 'number',
		},
		{
			title: 'Space Used',
			dataIndex: 'size',
			sortable: 'number',
			render: (size: number) => <>{_.isNaN(_.round(size / 1024000, 3)) ? 0 : _.round(size / 1024000, 3)} MB</>,
		},
		{
			title: 'Modified index',
			dataIndex: 'modifyIndex',
			sortable: 'number',
		},
		{
			title: 'Subscribed',
			dataIndex: 'subscribed',
			align: 'center' as const,
			filter: true,
			render: (subscribed: string) => (
				<Tag color={_.isEqual(subscribed, 'true') ? 'green' : 'red'}>{_.toString(subscribed)}</Tag>
			),
		},
		{
			title: 'Hidden',
			dataIndex: 'hidden',
			align: 'center' as const,
			filter: true,
			render: (hidden: string) => (
				<Tag color={_.isEqual(hidden, 'true') ? 'green' : 'red'}>{_.toString(!hidden)}</Tag>
			),
		},
		{
			title: 'Action',
			key: 'action',
			align: 'center' as const,
			render: (text: string, record: any) => (
				<Space size={'middle'}>
					<Tooltip title={'Edit'}>
						<Button className='ant-btn-icon' shape='circle' onClick={() => edit(record)}>
							<EditFilled className={'green-color'} />
						</Button>
					</Tooltip>
					<Tooltip title={'Purge all messages'}>
						<Button
							onClick={() => {
								showConfirm(
									() => deleteAllMessages(record.id),
									'Are you sure you want to delete all messages in the mailbox?',
								);
							}}
							className='ant-btn-icon'
							shape='circle'
						>
							<DeleteTwoTone />
						</Button>
					</Tooltip>
				</Space>
			),
		},
	];

	return getColumnsWithFilterAndSort(columns, dataSource);
};
