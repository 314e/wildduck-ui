/**
 * @author Chirag Kushwaha <chirag.kushwaha@314ecorp.com>
 * @description ForwardedAddressInformationForm Component
 */

import React from 'react';
import { Select, DatePicker, Form, Input, Button, Switch } from 'antd';
import _ from 'lodash';
import { useValues } from 'kea';
import BraftEditor, { BuiltInControlType } from 'braft-editor';

import { layout, tailLayout } from '../FormLayout';
import { SAddress } from '../../lib/constants/constant';
import { updateForwardedAddressInfoFormatter } from 'app-ui/lib/constants/Formatter';

import useUpdateForwardedAddress from 'app-ui/hooks/useUpdateForwardedAddress';

import addressLogic from 'logic/addressLogic';

import 'styles/style.css';
import 'braft-editor/dist/index.css';

const { RangePicker } = DatePicker;

/**
 * ForwardedAddressInformationForm Component
 */
const ForwardedAddressInformationForm: React.FC<{ data: any }> = ({ data }: any): JSX.Element => {
	const { updatableField } = useValues(addressLogic);

	const { mutate } = useUpdateForwardedAddress();

	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		const details = {
			text: _.get(values, 'text', '').toText(),
			html: _.get(values, 'text', '').toHTML(),
		};

		const params = {
			addressId: data.id,
			updateForwardedAddressInformation: updateForwardedAddressInfoFormatter(_.assign(values, details)),
		};
		mutate(params);
	};

	const onReset = () => {
		form.resetFields();
	};

	const excludeControls: BuiltInControlType[] = ['media', 'fullscreen'];

	return _.isUndefined(_.get(data, 'address')) ? null : (
		<Form
			{...layout}
			form={form}
			name='basic'
			initialValues={{
				remember: true,
				...data,
				text: BraftEditor.createEditorState(_.get(data, 'html')),
				forwards: _.get(data, 'allowed'),
			}}
			onFinish={onFinish}
		>
			{_.map(['name', 'address'], (fieldName) => (
				<Form.Item
					key={fieldName}
					label={_.capitalize(fieldName)}
					name={fieldName}
					tooltip={_.get(SAddress, `UpdateForwardedAddressInfo.${fieldName}`)}
				>
					<Input />
				</Form.Item>
			))}
			<Form.Item label='Targets' name='targets' tooltip={_.get(SAddress, 'UpdateForwardedAddressInfo.targets')}>
				<Select mode='tags' style={{ width: '100%' }} placeholder='Enter Targets' />
			</Form.Item>
			<Form.Item label='Tags' name='tags' tooltip={_.get(SAddress, 'UpdateForwardedAddressInfo.tags')}>
				<Select mode='tags' style={{ width: '100%' }} placeholder='Enter Tags' />
			</Form.Item>
			<Form.Item label='Limits > Forwards >'>
				<Form.Item
					name='allowed'
					label='Allowed'
					tooltip={_.get(SAddress, 'RequestForwardedAddressInfo.limits.forwards.allowed')}
				>
					<Input disabled={true} />
				</Form.Item>
				<Form.Item
					name='used'
					label='Used'
					tooltip={_.get(SAddress, 'RequestForwardedAddressInfo.limits.forwards.used')}
				>
					<Input disabled={true} />
				</Form.Item>
				<Form.Item
					name='ttl'
					label='Ttl'
					tooltip={_.get(SAddress, 'RequestForwardedAddressInfo.limits.forwards.ttl')}
				>
					<Input disabled={true} />
				</Form.Item>
			</Form.Item>
			<Form.Item label='Autoreply >' name='autoreply'>
				<Form.Item
					label='Status'
					name='status'
					valuePropName='checked'
					tooltip={_.get(SAddress, 'UpdateForwardedAddressInfo.autoreply.status')}
				>
					<Switch />
				</Form.Item>
				<Form.Item label='Date' name='date'>
					<RangePicker style={{ width: '160%' }} showTime />
				</Form.Item>
				<Form.Item
					label='Username'
					name='autoreplyName'
					tooltip={_.get(SAddress, 'UpdateForwardedAddressInfo.autoreply.name')}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Subject'
					name='subject'
					tooltip={_.get(SAddress, 'UpdateForwardedAddressInfo.autoreply.subject')}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Text'
					name='text'
					tooltip={_.get(SAddress, 'UpdateForwardedAddressInfo.autoreply.text')}
				>
					<BraftEditor
						language='en'
						className='braftEditorCard'
						placeholder='Enter your content here'
						excludeControls={excludeControls}
					/>
				</Form.Item>
			</Form.Item>
			<Form.Item
				label='Forwarded Disabled'
				name='forwardedDisabled'
				valuePropName='checked'
				tooltip={_.get(SAddress, 'UpdateForwardedAddressInfo.forwardedDisabled')}
			>
				<Switch />
			</Form.Item>
			<Form.Item
				label='Forwards'
				name='forwards'
				tooltip={_.get(SAddress, 'UpdateForwardedAddressInfo.forwards')}
			>
				<Input type='number' min={0} />
			</Form.Item>
			<Form.Item label='Created' name='created'>
				<Input disabled={!updatableField} />
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

export default ForwardedAddressInformationForm;
