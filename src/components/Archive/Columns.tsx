/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description Archive Table Columns
 */

import React from 'react';
import _ from 'lodash';
import { Space, Button, Tooltip } from 'antd';
import moment from 'moment';

import getColumnsWithFilterAndSort from 'app-ui/utils/getColumnsWithFilterAndSort';
import showConfirm from 'app-ui/utils/showConfirm';
import { DATE_TIME_FORMAT_AP } from 'app-ui/utils/constants';
import { RollbackOutlined } from '@ant-design/icons';

const createRecordDisplayList = (record: any, arrayOfObjectName: string, displayField: string) =>
	_.map(_.get(record, arrayOfObjectName), (name, index) => (
		<Space key={displayField + _.get(record, 'id') + index}>{_.get(name, displayField)}</Space>
	));

export const getArchiveColumns = ({
	dataSource,
	restoreMessage,
}: {
	dataSource: any;
	restoreMessage({ message, params }: any): void;
}): any => {
	const columns = [
		{
			title: 'From',
			dataIndex: 'from',
			key: 'from',
			width: 350,
			customDataIndex: 'from.address',
			filter: true,
			children: [
				{
					title: 'Name',
					dataIndex: 'fromName',
					key: 'fromName',
					width: 100,
					fixed: 'left',
					render: (text: any, record: any) => _.get(record, 'from.name'),
				},
				{
					title: 'Address',
					dataIndex: 'fromAddress',
					key: 'fromAddress',
					fixed: 'left',
					width: 230,
					render: (text: any, record: any) => _.get(record, 'from.address'),
				},
			],
		},
		{
			title: 'To',
			dataIndex: 'to',
			key: 'to',
			width: 350,
			children: [
				{
					title: 'Name',
					dataIndex: 'toName',
					key: 'toName',
					width: 100,
					render: (text: any, record: any) => createRecordDisplayList(record, 'to', 'name'),
				},
				{
					title: 'Address',
					dataIndex: 'toAddress',
					key: 'toAddress',
					width: 230,
					render: (text: any, record: any) => createRecordDisplayList(record, 'to', 'address'),
				},
			],
		},
		{
			title: 'Cc',
			dataIndex: 'cc',
			key: 'cc',
			widht: 350,
			children: [
				{
					title: 'Name',
					dataIndex: 'ccName',
					key: 'ccName',
					width: 100,
					render: (text: any, record: any) => createRecordDisplayList(record, 'cc', 'name'),
				},
				{
					title: 'Address',
					dataIndex: 'ccAddress',
					key: 'ccAddress',
					width: 230,
					render: (text: any, record: any) => createRecordDisplayList(record, 'cc', 'address'),
				},
			],
		},
		{
			title: 'Bcc',
			dataIndex: 'bcc',
			key: 'bcc',
			width: 350,
			children: [
				{
					title: 'Name',
					dataIndex: 'bccName',
					key: 'bccName',
					width: 100,
					render: (text: any, record: any) => createRecordDisplayList(record, 'bcc', 'name'),
				},
				{
					title: 'Address',
					dataIndex: 'bccAddress',
					key: 'bccAddress',
					width: 230,
					render: (text: any, record: any) => createRecordDisplayList(record, 'bcc', 'address'),
				},
			],
		},
		{
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
			width: 100,
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			sortable: 'date',
			width: 100,
			render: (date: string) => moment(date).format(DATE_TIME_FORMAT_AP),
		},
		{
			title: 'Intro',
			dataIndex: 'intro',
			key: 'intro',
			width: 100,
		},
		{
			title: 'Attachments',
			dataIndex: 'attachments',
			key: 'attachments',
			filter: true,
			width: 110,
			align: 'center',
			render: (text: string) => _.toString(text),
		},
		{
			title: 'Seen',
			dataIndex: 'seen',
			key: 'seen',
			filter: true,
			width: 70,
			align: 'center',
			render: (text: string) => _.toString(text),
		},
		{
			title: 'Deleted',
			dataIndex: 'deleted',
			key: 'deleted',
			filter: true,
			width: 90,
			align: 'center',
			render: (text: string) => _.toString(text),
		},
		{
			title: 'Flagged',
			dataIndex: 'flagged',
			key: 'flagged',
			filter: true,
			width: 90,
			align: 'center',
			render: (text: string) => _.toString(text),
		},
		{
			title: 'Content type',
			dataIndex: 'contentType',
			key: 'contentType',
			customDataIndex: 'contentType.value',
			filter: true,
			width: 350,
			children: [
				{
					title: 'Value',
					dataIndex: 'value',
					key: 'value',
					width: 100,
					render: (text: any, record: any) => _.get(record, 'contentType.value'),
				},
				{
					title: 'Params',
					dataIndex: 'params',
					key: 'params',
					width: 230,
					render: (text: any, record: any) =>
						_.map(_.get(record, 'contentType.params'), (params, key) => (
							<Space key={key + params}>
								{key} : {params}
							</Space>
						)),
				},
			],
		},
		{
			title: 'Action',
			key: 'action',
			fixed: 'right' as const,
			width: 100,
			align: 'center',
			render: (text: string, record: any) => (
				<Space size={'middle'}>
					<Tooltip title={'Restore Message'}>
						<Button
							onClick={() => {
								showConfirm(
									() =>
										restoreMessage({
											message: _.get(record, 'id'),
											params: { mailbox: _.get(record, 'mailbox') },
										}),
									'Are you sure you want to restore this message?',
								);
							}}
							className='ant-btn-icon'
							shape='circle'
						>
							<RollbackOutlined className='green-color' />
						</Button>
					</Tooltip>
				</Space>
			),
		},
	];

	return getColumnsWithFilterAndSort(columns, dataSource);
};
