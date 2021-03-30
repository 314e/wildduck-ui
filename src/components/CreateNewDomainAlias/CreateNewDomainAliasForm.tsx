/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description CreateNewDomainAliasForm Component
 */

import React from 'react';
import { Form, Input, Button } from 'antd';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

import { tailLayout, layout } from '../FormLayout';
import { getBasePath } from '../CustomLink';

import useCreateDomainAliases from 'app-ui/hooks/useCreateDomainAliases';

/**
 * CreateNewDomainAliasForm Component
 */
const CreateNewDomainAliasForm = (): JSX.Element => {
	const { mutate, isSuccess, data } = useCreateDomainAliases();

	const history = useHistory();

	if (isSuccess && !_.get(data, 'data.error')) {
		history.push(`${getBasePath()}/domain-aliases`);
	}

	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		mutate(values);
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Form {...layout} form={form} name='basic' initialValues={{ remember: true }} onFinish={onFinish}>
			<Form.Item label='Domain' name='domain' rules={[{ required: true, message: 'Please input domain!' }]}>
				<Input />
			</Form.Item>
			<Form.Item label='Alias' name='alias' rules={[{ required: true, message: 'Please input alias!' }]}>
				<Input />
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button htmlType='button' onClick={onReset}>
					Reset
				</Button>
				<Button type='primary' htmlType='submit'>
					Create
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CreateNewDomainAliasForm;
