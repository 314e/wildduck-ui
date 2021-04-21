/**
 * @author Aditya Negi <aditya.negi@314ecorp.com>
 * @description create dkim screen
 */

import React from 'react';
import _ from 'lodash';
import { Form, Input, Space, Button, Breadcrumb } from 'antd';
import { useValues } from 'kea';
import { useHistory } from 'react-router-dom';

import { layout, tailLayout } from '../FormLayout';
import Page from '../Page';
import Link, { getBasePath } from 'app-ui/components/CustomLink';
import { dkimTooltip } from '../../lib/constants/constant';
import { UpdateDkimKeyRequest } from 'client/wildduck-api';

import dkimLogic from 'app-ui/logic/dkimLogic';

import useCreateDkim from 'app-ui/hooks/useCreateDkim';

/**
 * CreateDkim component
 */
const CreateDkim: React.FC = () => {
	const [form] = Form.useForm();
	const { error } = useValues(dkimLogic);
	const { mutate, data, isSuccess } = useCreateDkim();

	const history = useHistory();

	if (isSuccess && !_.get(data, 'data.error')) {
		history.push(`${getBasePath()}/dkim`);
	}

	const onFinish = (values: UpdateDkimKeyRequest) => {
		mutate(values);
	};

	const reset = () => {
		form.resetFields();
	};

	const pageBreadcrumb = (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to='/dkim'>DKIM</Link>
			</Breadcrumb.Item>

			<Breadcrumb.Item>Create DKIM</Breadcrumb.Item>
		</Breadcrumb>
	);

	return (
		<Page title={pageBreadcrumb} error={error}>
			<Form {...layout} form={form} onFinish={onFinish}>
				<Form.Item
					label='Domain'
					name='domain'
					rules={[
						{
							required: true,
							message: 'Please input Domain',
						},
					]}
					tooltip={dkimTooltip.domain}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Selector'
					name='selector'
					rules={[
						{
							required: true,
							message: 'Please input Selector',
						},
					]}
				>
					<Input placeholder={dkimTooltip.selector} />
				</Form.Item>
				<Form.Item label='Description' name='description'>
					<Input placeholder={dkimTooltip.description} />
				</Form.Item>
				<Form.Item label='PrivateKey' name='privateKey' tooltip={dkimTooltip.privateKey}>
					<Input />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Space size='middle'>
						<Button type='primary' htmlType='submit'>
							Create
						</Button>
						<Button type='default' htmlType='button' onClick={reset}>
							Reset
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Page>
	);
};

export default CreateDkim;
