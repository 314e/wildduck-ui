/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description CreateNewAddressForm Component
 */

import React from 'react';
import _ from 'lodash';
import { Form, Input, Button, Switch, Select } from 'antd';
import { useActions } from 'kea';
import { useParams } from 'react-router-dom';

import { tailLayout, layout } from '../FormLayout';
import { SAddress } from '../../lib/constants/constant';
import { createNewAddressFormatter } from 'app-ui/lib/constants/Formatter';

import addressLogic from 'app-ui/logic/addressLogic';
import useCreateAddress from 'app-ui/hooks/useCreateAddress';

/**
 * CreateNewAddressForm Component
 */
const CreateNewAddressForm: React.FC = () => {
	const { setCreatNewAddressToggle } = useActions(addressLogic);

	const { mutate } = useCreateAddress();

	const { id }: any = useParams();

	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		mutate({ userId: id, addressDetails: createNewAddressFormatter(values) });
		setCreatNewAddressToggle(false);
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Form {...layout} form={form} name='basic' initialValues={{ remember: true }} onFinish={onFinish}>
			<Form.Item label='Username' name='name' tooltip={_.get(SAddress, 'CreateAddress.name')}>
				<Input />
			</Form.Item>
			<Form.Item
				label='Email address'
				name='address'
				rules={[{ required: true, message: 'Please input your address!' }]}
				tooltip={_.get(SAddress, 'CreateAddress.address')}
			>
				<Input />
			</Form.Item>
			<Form.Item label='Tags' name='tags' tooltip={_.get(SAddress, 'CreateAddress.tags')}>
				<Select mode='tags' style={{ width: '100%' }} placeholder='Enter Tags' />
			</Form.Item>
			<Form.Item name='main' label='Main' valuePropName='checked' tooltip={_.get(SAddress, 'CreateAddress.main')}>
				<Switch />
			</Form.Item>
			<Form.Item
				name='allow-wildcards'
				label='Allow Wildcards'
				valuePropName='checked'
				tooltip={_.get(SAddress, 'CreateAddress.allowWildcard')}
			>
				<Switch />
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

export default CreateNewAddressForm;
