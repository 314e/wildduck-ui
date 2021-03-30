/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description ForwardedAddress Table
 */

import React from 'react';
import _ from 'lodash';
import { Space, Button, Tag, Tooltip } from 'antd';
import moment from 'moment';

import getColumnsWithFilterAndSort from 'app-ui/utils/getColumnsWithFilterAndSort';
import showConfirm from 'app-ui/utils/showConfirm';
import { GetUserAddressesResult } from 'app-redux/client/wildduck-api';
import { DATE_TIME_FORMAT } from 'app-ui/utils/constants';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

export const getAddressColumns = ({
	dataSource,
	edit,
	deleteAddress,
}: {
	dataSource: any;
	edit(value: string): void;
	deleteAddress(value: string): void;
}): any => {
	const columns = [
		{
			title: 'Address',
			dataIndex: 'address',
			filter: true,
			render: (text: string, record: GetUserAddressesResult) => (
				<a onClick={() => edit(record.id)}>
					{record.main ? <span style={{ color: 'green' }}>* </span> : null}
					{text}
				</a>
			),
		},
		{
			title: 'Name',
			dataIndex: 'name',
			filter: true,
		},
		{
			title: 'Created',
			dataIndex: 'created',
			sortable: 'date',
			align: 'center' as const,
			render: (date: string) => moment(date).format(DATE_TIME_FORMAT),
		},
		{
			title: 'Tags',
			dataIndex: 'tags',
			filter: true,
			render: (tags: string[]) => (
				<>
					{_.map(tags, (tag) => {
						return <Tag key={tag}>{tag}</Tag>;
					})}
				</>
			),
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			align: 'center' as const,
			render: (text: string, record: GetUserAddressesResult) => (
				<Space size={'middle'}>
					<Tooltip title={'Edit'}>
						<Button className='ant-btn-icon' shape='circle' onClick={() => edit(record.id)}>
							<EditFilled className={'green-color'} />
						</Button>
					</Tooltip>
					{_.get(record, 'main') ? null : (
						<Tooltip title={'Delete'}>
							<Button
								onClick={() => {
									showConfirm(
										() => deleteAddress(record.id),
										'Are you sure you want to Delete this Address ?',
									);
								}}
								className='ant-btn-icon'
								shape='circle'
							>
								<DeleteFilled className='red-color' />
							</Button>
						</Tooltip>
					)}
				</Space>
			),
		},
	];

	return getColumnsWithFilterAndSort(columns, dataSource);
};
