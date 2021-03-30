/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description Pagination Component
 */

import React from 'react';
import { Button, Tooltip, Select, Space } from 'antd';
import _ from 'lodash';

import { RightOutlined, LeftOutlined } from '@ant-design/icons';

interface IPagination {
	next: string;
	previous: string;
	limit: number;
	page: number;
	setLimit(value: number): void;
	setPrevious(value: string): void;
	setNext(value: string): void;
	setPage(value: number): void;
}

export const Pagination: React.FC<IPagination> = ({
	limit,
	previous,
	next,
	page,
	setLimit,
	setPrevious,
	setNext,
	setPage,
}: IPagination) => {
	return (
		<Space>
			<Tooltip title={'Previous'}>
				<Button
					className='ant-btn-icon'
					disabled={_.isEmpty(previous)}
					onClick={() => {
						setPrevious(previous);
						setPage(Math.max(page - 1, 1));
					}}
				>
					<LeftOutlined className='blue-color' />
				</Button>
			</Tooltip>
			<Select
				style={{ width: 120 }}
				defaultValue={limit}
				onSelect={(value) => {
					setLimit(value);
				}}
			>
				{_.map([10, 20, 30, 50, 100, 250], (value) => (
					<Select.Option key={value} value={value}>
						{value + ' / page'}
					</Select.Option>
				))}
			</Select>
			<Tooltip title={'Next'}>
				<Button
					className='ant-btn-icon'
					disabled={_.isEmpty(next)}
					onClick={() => {
						setNext(next);
						setPage(page + 1);
					}}
				>
					<RightOutlined className='blue-color' />
				</Button>
			</Tooltip>
		</Space>
	);
};
