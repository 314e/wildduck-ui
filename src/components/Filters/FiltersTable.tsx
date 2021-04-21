/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description Filters Table Component
 */

import React from 'react';
import _ from 'lodash';
import { Space, Tooltip, Button, Table } from 'antd';
import { useActions, useValues } from 'kea';
import { useParams } from 'react-router-dom';

import { EditFilled, DeleteFilled, DiffOutlined } from '@ant-design/icons';
import { GetFiltersResult } from 'app-redux/client/wildduck-api';
import getColumnsWithFilterAndSort from 'app-ui/utils/getColumnsWithFilterAndSort';
import FloatingButton from '../FloatingButton';
import showConfirm from 'app-ui/utils/showConfirm';
import useFilters from 'app-ui/hooks/useFilters';

import filtersLogic from 'app-ui/logic/filtersLogic';

import useDeleteFilter from 'app-ui/hooks/useDeleteFilter';

const FiltersTable: React.FC = () => {
	const { setShowAddFilterForm, setFilterId } = useActions(filtersLogic);
	const { filtersList } = useValues(filtersLogic);

	const params: { id: string } = useParams();
	const { data, isLoading } = useFilters(params.id);
	const { mutate: deleteFilter } = useDeleteFilter();

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			filter: true,
			render: (name: string, record: GetFiltersResult) => {
				return {
					props: {
						style: { background: record.disabled ? '#ffcccb' : null },
					},
					children: <div>{name}</div>,
				};
			},
		},
		{
			title: 'Actions',
			dataIndex: 'action',
			align: 'center' as const,
			render: (text: string, record: GetFiltersResult) => {
				return {
					props: {
						style: { background: record.disabled ? '#ffcccb' : null },
					},
					children: (
						<Space>
							<Tooltip title={'Edit'}>
								<Button className='ant-btn-icon' shape='circle' onClick={() => setFilterId(record.id)}>
									<EditFilled className={'green-color'} />
								</Button>
							</Tooltip>
							<Tooltip title={'Delete'}>
								<Button
									onClick={() =>
										showConfirm(() => deleteFilter({ userId: params.id, filterId: record.id }))
									}
									className='ant-btn-icon'
									shape='circle'
								>
									<DeleteFilled className='red-color' />
								</Button>
							</Tooltip>
						</Space>
					),
				};
			},
		},
	];

	return (
		<>
			<Table
				size='small'
				columns={getColumnsWithFilterAndSort(columns, filtersList)}
				dataSource={data}
				pagination={_.size(filtersList) > 10 ? null : false}
				scroll={{ y: 550 }}
				loading={isLoading}
			></Table>
			<FloatingButton>
				<Tooltip title='Add New Filter'>
					<DiffOutlined
						onClick={() => {
							setShowAddFilterForm(true);
						}}
					/>
				</Tooltip>
			</FloatingButton>
		</>
	);
};

export default FiltersTable;
