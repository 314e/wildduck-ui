/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description DomainAliases Table Columns
 */

import React from 'react';
import { Space, Button, Tooltip } from 'antd';

import { DeleteFilled } from '@ant-design/icons';
import getColumnsWithFilterAndSort from 'app-ui/utils/getColumnsWithFilterAndSort';
import showConfirm from 'app-ui/utils/showConfirm';

export const getDomainAliasesColumns = ({
	dataSource,
	deleteDomainAliases,
}: {
	dataSource: any;
	deleteDomainAliases(value: string): void;
}): any => {
	const columnDomainAliases = [
		{
			title: 'Alias',
			dataIndex: 'alias',
			sortable: 'string',
			filter: true,
		},
		{
			title: 'Domain',
			dataIndex: 'domain',
			sortable: 'string',
			filter: true,
		},
		{
			title: 'Action',
			key: 'action',
			width: 100,
			align: 'center' as const,
			render: (text: string, record: any) => (
				<Space size='middle'>
					<Tooltip title={'Delete'}>
						<Button
							onClick={() => {
								showConfirm(() => deleteDomainAliases(record.id), 'Are you sure you want to delete?');
							}}
							className='ant-btn-icon'
							shape='circle'
						>
							<DeleteFilled className='red-color' />
						</Button>
					</Tooltip>
				</Space>
			),
		},
	];

	return getColumnsWithFilterAndSort(columnDomainAliases, dataSource);
};
