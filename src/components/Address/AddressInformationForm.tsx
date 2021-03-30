/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description AddressInformationForm Component
 */

import React from 'react';
import _ from 'lodash';
import { Form, Input, Button, Switch, Select } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { SAddress } from '../../lib/constants/constant';
import { GetUserAddressResponse } from 'app-redux/client/wildduck-api';
import { DATE_TIME_FORMAT_AP } from 'app-ui/utils/constants';
import { updateAddressInfoFormatter } from 'app-ui/lib/constants/Formatter';
import { layout, tailLayout } from '../FormLayout';

import useUpdateAddress from 'app-ui/hooks/useUpdateAddress';

/**
 * AddressInformationForm Component
 */
const AddressInformationForm: React.FC<any> = (props: any) => {
	const { data } = props;
	const { id }: any = useParams();
	const { mutate } = useUpdateAddress();

	const [form] = Form.useForm();

	const onFinish = (values: GetUserAddressResponse) => {
		mutate({ userId: id, addressId: data?.id, updateAddressInfo: updateAddressInfoFormatter(values) });
	};

	const onReset = () => {
		form.resetFields();
	};

	return _.isUndefined(data) ? null : (
		<Form
			{...layout}
			form={form}
			name='basic'
			initialValues={{
				remember: true,
				...data,
				name: _.toString(_.get(data, 'name')),
				created: moment(_.get(data, 'created')).format(DATE_TIME_FORMAT_AP),
			}}
			onFinish={onFinish}
		>
			<Form.Item label='Username' name='name' tooltip={_.get(SAddress, 'UpdateAddressInfo.name')}>
				<Input />
			</Form.Item>
			<Form.Item label='Email address' name='address' tooltip={_.get(SAddress, 'UpdateAddressInfo.address2')}>
				<Input />
			</Form.Item>
			<Form.Item
				name='main'
				label='Main'
				valuePropName='checked'
				required
				tooltip={_.get(SAddress, 'UpdateAddressInfo.main')}
			>
				<Switch />
			</Form.Item>
			<Form.Item label='Tags' name='tags' tooltip={_.get(SAddress, 'UpdateAddressInfo.tags')}>
				<Select mode='tags' style={{ width: '100%' }} placeholder='Enter Tags' />
			</Form.Item>
			<Form.Item label='Created' name='created'>
				<Input disabled={true} />
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button htmlType='button' onClick={onReset}>
					Reset
				</Button>
				<Button type='primary' htmlType='submit'>
					Update
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AddressInformationForm;
