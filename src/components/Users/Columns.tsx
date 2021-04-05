/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description ForwardedAddress Table
 */

import React from 'react';
import _ from 'lodash';
import { Space, Button, Tag, Tooltip, Progress } from 'antd';

import getColumnsWithFilterAndSort from 'app-ui/utils/getColumnsWithFilterAndSort';
import showConfirm from 'app-ui/utils/showConfirm';
import { UserLink } from '../Widgets/Link';
import ManageActions from './ManageActions';
import { GetUsersResult } from 'app-redux/client/wildduck-api';

export const getUsersColumns = ({
	dataSource,
	deleteUser,
}: {
	dataSource: any;
	deleteUser(value: string): void;
}): any => {
	const columnsUsers = [
		{
			title: 'Username',
			dataIndex: 'username',
			filter: true,
			fixed: 'left',
			render: (text: string, record: GetUsersResult) => <UserLink id={record.id} name={text} />,
		},
		{
			title: 'Name',
			dataIndex: 'name',
			filter: true,
		},
		{
			title: 'Address',
			dataIndex: 'address',
			filter: true,
			width: 250,
		},
		{
			title: 'Tags',
			dataIndex: 'tags',
			render: (tags: string[]) => (
				<>
					{_.map(tags, (tag) => {
						return <Tag key={tag}>{tag}</Tag>;
					})}
				</>
			),
		},
		{
			title: 'Quota Used',
			dataIndex: 'quotaUsed',
			width: 220,
			render: (text: string, record: GetUsersResult) => {
				const fraction = (record.quota.used / record.quota.allowed) * 100;

				return (
					<>
						<Progress
							percent={_.max([fraction, 1])}
							strokeColor='#FF4D4F'
							trailColor='#E0E0E0'
							format={() =>
								`${_.round(record.quota.used / 1024000)} /
								${_.round(record.quota.allowed / 1024000)} MB`
							}
							style={{ width: 100 }}
						/>
					</>
				);
			},
		},
		{
			title: 'Account Disabled',
			dataIndex: 'disabled',
			align: 'center' as const,
			filter: true,
			width: 100,
			render: (active: string) => (
				<>
					<Tag color={active === 'true' ? 'red' : 'green'}>{active === 'true' ? 'Yes' : 'No'}</Tag>
				</>
			),
		},
		{
			title: 'Actions',
			key: 'action',
			fixed: 'right' as const,
			width: 180,
			render: (text: string, record: GetUsersResult) => (
				<>
					<ManageActions user={record} />
					<Tooltip title={'Delete User'}>
						<Button
							type='link'
							danger
							onClick={() =>
								showConfirm(() => deleteUser(record.id), 'Are you sure you want to delete this User ?')
							}
						>
							Delete
						</Button>
					</Tooltip>
				</>
			),
		},
	];

	return getColumnsWithFilterAndSort(columnsUsers, dataSource);
};
