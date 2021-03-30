/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description Dkim Table Columns
 */

import React from 'react';
import moment from 'moment';
import { Space, Button, Tooltip } from 'antd';

import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { DATE_TIME_FORMAT_AP } from 'app-ui/utils/constants';
import showConfirm from 'app-ui/utils/showConfirm';
import getColumnsWithFilterAndSort from 'app-ui/utils/getColumnsWithFilterAndSort';
import { GetDkimKeysResult } from 'app-redux/client/wildduck-api';
import { DkimDetailsLink } from '../Widgets/Link';

export const getDkimColumns: any = ({ dataSource, deleteDkim }: { dataSource: any; deleteDkim(id: string): void }) => {
	const columnsDkim = [
		{
			title: 'Domain',
			dataIndex: 'domain',
			filter: true,
			render: (text: string, record: GetDkimKeysResult) => <DkimDetailsLink id={record.id} name={text} />,
		},
		{
			title: 'Selector',
			filter: true,
			dataIndex: 'selector',
		},
		{
			title: 'Description',
			dataIndex: 'description',
		},
		{
			title: 'Created',
			dataIndex: 'created',
			sortable: 'date',
			align: 'center' as const,
			render: (date: string) => moment(date).format(DATE_TIME_FORMAT_AP),
		},
		{
			title: 'Actions',
			dataIndex: 'Action',
			align: 'center' as const,
			render: (text: string, record: GetDkimKeysResult) => (
				<Space>
					<Tooltip title={'View Details'}>
						<DkimDetailsLink
							id={record.id}
							name={
								<Button className='ant-btn-icon' shape='circle'>
									<EditFilled className={'green-color'}></EditFilled>
								</Button>
							}
						/>
					</Tooltip>
					<Tooltip title={'Delete'}>
						<Button
							onClick={() =>
								showConfirm(() => deleteDkim(record.id), 'Are you sure you want to Delete this DKIM ?')
							}
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

	return getColumnsWithFilterAndSort(columnsDkim, dataSource);
};
