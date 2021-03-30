/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description ForwardedAddress Table Columns
 */

import React from 'react';
import _ from 'lodash';
import { Space, Button, Tag, Tooltip } from 'antd';

import { DeleteFilled, EditFilled } from '@ant-design/icons';
import getColumnsWithFilterAndSort from 'app-ui/utils/getColumnsWithFilterAndSort';
import showConfirm from 'app-ui/utils/showConfirm';
import { ForwardedAddressLink } from '../Widgets/Link';

export const getForwardedAddressColumns = ({
	dataSource,
	deleteAddress,
}: {
	dataSource: any;
	deleteAddress(value: string): void;
}): any => {
	const columnsForwarded = [
		{
			title: 'Forwarded address',
			dataIndex: 'address',
			key: 'address',
			filter: true,
			render: (text: string, record: Address.IForwardedAddress) => (
				<Space size='middle'>
					<ForwardedAddressLink id={record.id} name={text} />
				</Space>
			),
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			filter: true,
		},
		{
			title: 'Tags',
			key: 'tags',
			dataIndex: 'tags',
			filter: true,
			align: 'center' as const,
			render: (tags: string[]) => (
				<>
					{_.map(tags, (tag) => {
						return <Tag key={tag}>{tag}</Tag>;
					})}
				</>
			),
		},
		{
			title: 'Action',
			key: 'action',
			align: 'center' as const,
			width: 100,
			render: (text: string, record: Address.IForwardedAddress) => (
				<Space size={'middle'}>
					<Tooltip title={'Edit'}>
						<ForwardedAddressLink
							id={record.id}
							name={
								<Button className='ant-btn-icon' shape='circle'>
									<EditFilled className={'green-color'} />
								</Button>
							}
						/>
					</Tooltip>
					<Tooltip title={'Delete'}>
						<Button
							onClick={() =>
								showConfirm(() => deleteAddress(record.id), 'Are you sure you want to delete?')
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

	return getColumnsWithFilterAndSort(columnsForwarded, dataSource);
};
