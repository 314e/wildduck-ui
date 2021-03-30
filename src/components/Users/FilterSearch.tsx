/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description FilterSearch Component
 */

import React from 'react';
import { Button, Form, Input } from 'antd';
import { useActions } from 'kea';

import usersLogic from 'logic/usersLogic';

/**
 * FilterSearch Component
 */
const FilterSearch: React.FC = () => {
	const { setSearchParams } = useActions(usersLogic);

	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		setSearchParams(values);
	};

	return (
		<Form
			form={form}
			onFinish={onFinish}
			initialValues={{
				metaData: false,
				internalData: false,
			}}
			layout='inline'
			size='small'
		>
			<Form.Item name='query'>
				<Input placeholder='name/address' />
			</Form.Item>
			<Form.Item name='tags'>
				<Input placeholder='Tags' />
			</Form.Item>
			<Form.Item name='requiredTags'>
				<Input placeholder='Required Tags' />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Search
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FilterSearch;
